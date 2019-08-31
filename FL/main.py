import random
import numpy as np
import tensorflow as tf
import arguments

import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))

from block import Blockchain, Block, printBlock, writeBlockchain
from node import Node, split_dataset
from model import FLModel
import preprocessing


# python main.py --nodes=5 --round=1000 --globalSet=10000
if __name__ == "__main__":
    # parsing hyperparameters
    args = arguments.parser()
    num_nodes = args.nodes
    num_round = args.round
    num_global_testset = args.globalSet
    print(">>> Setting:", args)

    # Set Tensorflow GPU
    # tf.device('/device:GPU:0')

    # Load datasets
    features, x_train, y_train, x_test, y_test = preprocessing.get_train_test(
        "../data/realworld")

    # get global testset by train
    global_x_test = x_train[:num_global_testset]
    global_y_test = y_train[:num_global_testset]
    x_train = x_train[num_global_testset:]
    y_train = y_train[num_global_testset:]

    # set FL model
    # TODO: modified model with concatenate layer
    nn_model = tf.keras.models.Sequential([
        # input & first layer
        tf.keras.layers.Dense(
            64,
            input_shape=(len(features),),
            activation=tf.nn.relu,
            kernel_initializer='he_normal'),
        tf.keras.layers.Dropout(0.5),

        # hidden layer
        tf.keras.layers.Dense(
            64,
            activation=tf.nn.relu,
            kernel_initializer='he_normal'),
        tf.keras.layers.Dropout(0.5),

        # output layer
        tf.keras.layers.Dense(
            1,
            activation='linear')
    ])
    nn_model.compile(
        optimizer='adam',
        loss='mean_absolute_error',
        metrics=['mse'])

    flmodel = FLModel(nn_model)

    """set blockchain"""
    init_weights = flmodel.get_weights()
    genesis = Block(
        0,
        "0" * 64,
        init_weights,
        (global_x_test, global_y_test),
        []
    )
    flchain = Blockchain(genesis)  # set blockchain with genesis block
    writeBlockchain("../data", flchain)  # save blockchain

    """set nodes"""
    # split dataset
    my_x_train = split_dataset(x_train, num_nodes)
    my_y_train = split_dataset(y_train, num_nodes)
    my_x_test = split_dataset(x_test, num_nodes)
    my_y_test = split_dataset(y_test, num_nodes)

    # set nodes
    nodes = list()
    for i in range(num_nodes):
        nodes.append(
            Node(flmodel, (my_x_train[i], my_y_train[i]), (my_x_test[i], my_y_test[i])))

    # set Leader (Primary) @ pBFT
    Leader = Node(flmodel, (None, None), (global_x_test, global_y_test))

    """main"""
    for nextBlockNumber in range(1, num_round + 1):
        currentBlockNumber = nextBlockNumber - 1
        currentBlockWeight = flchain.blocks[currentBlockNumber].weights

        # update weights
        # Request @ pBFT
        peer_weights = list()
        # TODO: set a different reputation per nodes
        peer_reputations = np.ones(num_nodes)
        participants = list()

        for i, node in enumerate(nodes):
            # random selection
            if random.random() < 0.5:
                continue

            participants.append(i)

            node.flmodel.set_weights(currentBlockWeight)  # Pre-Prepare @ pBFT

            # training
            # early_stopping = tf.keras.callbacks.EarlyStopping(
            #     monitor='loss', patience=20)  # loss is 'mae'  # early stopping

            node.flmodel.fit(
                node.x_train, node.y_train,
                # callbacks=[early_stopping],
                epochs=1)  # Prepare and Commit @ pBFT
            peer_weight = node.flmodel.get_weights()
            peer_weights.append(peer_weight)  # Reply @ pBFT

            # eval. each node
            node.flmodel.evaluate(node.x_test, node.y_test)
            print("> node: %-5d" % i, end="\t")
            print("mae: %-8.4f" % node.flmodel.loss, end="\t")
            print("mse: %-8.4f" % node.flmodel.metrics[0], end="\r")

        Leader.raw_update_weights(
            peer_weights, [peer_reputations[p] for p in participants])
        nextBlockWeight = Leader.flmodel.get_weights()

        # create next block
        new_block = Block(
            nextBlockNumber,
            flchain.getBlock(nextBlockNumber - 1).calBlockHash(),
            nextBlockWeight,
            (Leader.x_test, Leader.y_test),
            participants
        )
        flchain.append(new_block)  # append next block

        Leader.flmodel.evaluate(Leader.x_test, Leader.y_test)  # eval.

        # print
        print(" " * 64, end="\r")
        print("round: %-6d" % nextBlockNumber, end="\t")
        print("mae: %-8.4f" % Leader.flmodel.loss, end="\t")
        print("mse: %-8.4f" % Leader.flmodel.metrics[0])
        printBlock(flchain.blocks[-1])

        # save blockchain
        writeBlockchain("../data", flchain)
