import json
import requests
import tensorflow as tf
import numpy as np
from sklearn.preprocessing import MinMaxScaler

import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))) + "/FL")

from block import readBlockchain, printBlock
from model import FLModel
import preprocessing


# hardcoding factors
REOA = "0x7f9e54d53549ba46dbe32ab39fd5fee3fd7cbe78"


def curlPost(url, data, headers):
    r = requests.post(url, data=data, headers=headers)
    return r.json()


def getRequest(from_):
    # data
    data = dict()
    data['from'] = from_

    # curl
    url = "https://api.luniverse.io/tx/v1.0/transactions/getRequest2"
    headers = {
        'Content-type': 'application/json',
        'Authorization': 'Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD'
    }
    data = json.dumps(data)

    r = curlPost(url, data, headers)
    return r


def insertResponse(requestId, stations: list, bikeNums: list, from_):
    # data
    data_inputs = dict()
    data_inputs['requestID'] = requestId
    data_inputs['_stations'] = stations
    data_inputs['_bikeNums'] = bikeNums

    data = dict()
    data['from'] = from_
    data['inputs'] = data_inputs

    # curl
    url = "https://api.luniverse.io/tx/v1.0/transactions/insertResponse2"
    headers = {
        'Content-type': 'application/json',
        'Authorization': 'Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD'
    }
    data = json.dumps(data)

    r = curlPost(url, data, headers)
    return r


def insertBlock(flblock, from_):
    # data
    data_inputs = dict()
    data_inputs['_blockNumber'] = flblock.header.blockNumber
    data_inputs['_prevBlockHash'] = "0x" + flblock.header.prevBlockHash
    data_inputs['_weightHash'] = "0x" + flblock.header.weightHash
    data_inputs['_testSetHash'] = "0x" + flblock.header.testsetHash

    data = dict()
    data['from'] = from_
    data['inputs'] = data_inputs

    # curl
    url = "https://api.luniverse.io/tx/v1.0/transactions/insertBlock7"
    headers = {
        'Content-type': 'application/json',
        'Authorization': 'Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD'
    }
    data = json.dumps(data)

    r = curlPost(url, data, headers)
    return r


def readBlock(blockNumber, from_):
    # data
    data_inputs = dict()
    data_inputs['_blockNumber'] = blockNumber

    data = dict()
    data['from'] = from_
    data['inputs'] = data_inputs

    # curl
    url = "https://api.luniverse.io/tx/v1.0/transactions/readBlock7"
    headers = {
        'Content-type': 'application/json',
        'Authorization': 'Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD'
    }
    data = json.dumps(data)

    r = curlPost(url, data, headers)
    return r


def getBlocksLength(from_):
    # data
    data = dict()
    data['from'] = from_

    # curl
    url = "https://api.luniverse.io/tx/v1.0/transactions/getBlocksLength7"
    headers = {
        'Content-type': 'application/json',
        'Authorization': 'Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD'
    }
    data = json.dumps(data)

    r = curlPost(url, data, headers)
    return r


# def getOwner():
#     # data
#     url = "https://api.luniverse.io/tx/v1.0/transactions/getOwner2"
#     headers = {
#         'Content-type': 'application/json',
#         'Authorization': 'Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD'
#     }
#     data = {}

#     r = curlPost(url, data, headers)

#     try:
#         owner = r['data']['res'][0]  # owner
#     except:
#         owner = None
#     return owner


def deleteBlock(blockNumber, from_):
    """
    curl -X POST 'https://api.luniverse.io/tx/v1.0/transactions/deleteBlock7' \
        --header 'Authorization: Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD' \
        --header 'Content-Type: application/json' \
        --data '{
            "from": "Please enter value.",
            "inputs": {
                "_blockNumber": "Please enter value."
            }
        }'
    """
    pass


def create_model(features):
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
            activation=tf.nn.relu)
    ])
    nn_model.compile(
        optimizer='adam',
        loss='mean_absolute_error',
        metrics=['mse'])

    return FLModel(nn_model)


if __name__ == "__main__":
    # read blockchain
    flchain = readBlockchain("./data")

    # Load datasets
    features, min_max_scaler = preprocessing.get_train_test(
        "./data/realworld", getScalar=True)

    # get model for inference
    # set FL model
    # TODO: modified model with concatenate layer
    flmodel = create_model(features)

    # relaying
    chain_len = len(flchain)
    for i in range(chain_len):
        print("Relay block %-5d" % i)

        flblock = flchain.blocks[i]
        # printBlock(flblock)

        # send transactions
        from_ = REOA

        r = getRequest(from_)
        # print(r)
        res = r['data']['res']

        responseId = res[0] + res[1]
        stations = [int(e) for e in res[2]]
        arriveTimes = [int(e) for e in res[3]]
        # month, temperature, windDirection, windSpeed, precipitation, humidity, day
        infos = [int(e) for e in res[4]]
        # print(responseId, stations, arriveTimes, infos)
        month, temperature, windDirection, windSpeed, precipitation, humidity, day = infos

        bikeNums = list()
        for idx, station in enumerate(stations):
            arriveTime = arriveTimes[idx]
            day_encoded = [0 for _ in range(7)]
            day_encoded[day] = 1

            # ['월', '대여시간', '기온(°C)', '풍향(deg)', '풍속(m/s)', '강수량(mm)', '습도(%)', '요일_0', '요일_1', '요일_2', '요일_3', '요일_4', '요일_5', '요일_6']
            inputs = [station]
            inputs += [month, arriveTime, temperature, windDirection, windSpeed, precipitation, humidity]
            inputs += day_encoded
            inputs = np.array(inputs)
            inputs = np.expand_dims(inputs, 0)

            """inference"""
            flmodel.set_weights(flblock.weights)

            X = min_max_scaler.transform(inputs)  # Do normalization
            Y = flmodel.predict(X)
            bikeNums.append(int(Y.tolist()[0][0]))  # 버림

        r = insertResponse(responseId, stations, bikeNums, from_)
        print(r)
        # def insertResponse(requestId, stations: list, bikeNums: list, from_):

        sys.exit(-1)

        # # insertBlock
        # r = insertBlock(flblock, from_)
        # print(r)

        # # readBlock
        # r = readBlock(i, from_)
        # print(r)

        # # getBlocksLength
        # r = getBlocksLength(from_)
        # print(r)
