from model import FLModel

import tensorflow as tf
import numpy as np
import random
import csv

# from pprint import pprint


SEED = 950327
random.seed(SEED)
np.random.seed(SEED)


if __name__ == "__main__":
    args = arguments.parser()
    n_nodes = args.nodes
    mecha_dist = args.dist
    mecha_bias = args.bias
    rounds = args.round
    top = args.top
    dataset_size = args.dataset
    gdataset_limit = args.gdataset + dataset_size
    if gdataset_limit > 60000: gdataset_limit = 60000 
    comp = args.comp

    size = 10

    # Set Tensorflow GPU
    tf.device('/device:GPU:0')

    # Load datasets
    mnist = tf.keras.datasets.mnist  # Load MNIST datasets (size: 60,000)
    (x_train, y_train), (x_test, y_test) = mnist.load_data()
    x_train, x_test = x_train / 255.0, x_test / 255.0
    print(">>> Done Loding Datasets")

    # Temp
    global_x_test = x_train[dataset_size:gdataset_limit]
    global_y_test = y_train[dataset_size:gdataset_limit]
    x_train = x_train[:dataset_size]
    y_train = y_train[:dataset_size]

    # for same initial weights
    w = initial_weights()

    # Big one
    cent = Model()
    cent.set_weights(w)
    cent.fit(x_train, y_train, epochs=5)
    cent.evaluate(global_x_test, global_y_test)
    print(">>> Done Training Big one NN")

    x_dist_train, y_dist_train = split_dataset(
        n_nodes, size,
        mecha_dist, mecha_bias,
        x_train, y_train,
        visual=False)
    x_dist_test, y_dist_test = split_dataset(
        n_nodes, size,
        mecha_dist, mecha_bias,
        x_test, y_test,
        visual=False)

    # Set peer nodes
    nodes = list()
    for i in range(n_nodes):
        node = Node()
        node.set_model(Model())  # set model
        node.set_data(
            x_dist_train[i], y_dist_train[i],
            x_dist_test[i], y_dist_test[i])  # set data
        node.neighbors = range(n_nodes)  # assume fully connected with myself
        node.model.set_weights(w)  # for same initial weights
        # print(node.x_train)
        # print(node.y_train)
        # print(node.x_test)
        # print(node.y_test)
        nodes.append(node)

    # Print node distribution
    distribution = list()
    for node in nodes:
        distribution.append(len(node.y_train))
    print(distribution)
    with open('distribution.csv', 'a') as f:
            writer = csv.writer(f)
            writer.writerow(distribution)

    # Test
    for round in range(rounds):
        print(">>> Start round", round + 1, "/", rounds)
        # print(">>> acc before train", [node.model.acc for node in nodes])

        # acc of big one NN
        print(">>> acc of cent.", cent.acc)

        locally_train(nodes, epochs=5, verbose=0)  # local training

        # acc_before_gen is the accuracy before updating weights
        acc_before_gen = [node.model.acc for node in nodes]
        print(">>> acc before GA.",
              avg_and_sd(acc_before_gen),
              acc_before_gen)

        # acc_before_gen_global is the accuracy tested with global testset before updating weights
        acc_before_gen_global = [node.model.evaluate_by_other(global_x_test, global_y_test)[1] for node in nodes]
        print(">>> acc before GA. with Global",
              avg_and_sd(acc_before_gen_global),
              acc_before_gen_global)

        fa = updates(nodes, top=top, comp=comp)  # update; averaging weights
        with open('fa.csv', 'a') as f:
            writer = csv.writer(f)
            writer.writerow(fa)
        
        locally_eval(nodes, verbose=0)  # local evalutation

        # acc_after_gen is the accuracy after updating weights
        acc_after_gen = [node.model.acc for node in nodes]
        print(">>> acc after GA.",
              avg_and_sd(acc_after_gen),
              acc_after_gen)
        with open('local.csv', 'a') as f:
            writer = csv.writer(f)
            writer.writerow(acc_after_gen)

        # acc_after_gen_global is the accuracy tested with global testset after updating weights
        acc_after_gen_global = [node.model.evaluate_by_other(global_x_test, global_y_test)[1] for node in nodes]
        print(">>> acc after GA. with Global",
              avg_and_sd(acc_after_gen_global),
              acc_after_gen_global)
        with open('global.csv', 'a') as f:
            writer = csv.writer(f)
            writer.writerow(acc_after_gen_global)
