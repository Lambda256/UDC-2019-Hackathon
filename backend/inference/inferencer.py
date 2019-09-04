import arguments

import tensorflow as tf
import numpy as np
from sklearn.preprocessing import MinMaxScaler

import time
import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))) + "/FL")

from block import readBlock, printBlock
from model import FLModel
import luniverseAPI as API
import preprocessing


# hardcoding factors
REOA = "0x128a8b8c9507aec53d949c53d5be57c4d98f9256"
contractAddr = "0xaa7De5581188449339058e5908fC0B06e61db3f9"
waitingInterval = 1.0


def pinwheel(t, keyword=""):
    t = t % 4
    if t == 0:
        print(keyword, "\\", end='\r')
    elif t == 1:
        print(keyword, "|", end='\r')
    elif t == 2:
        print(keyword, "/", end='\r')
    elif t == 3:
        print(keyword, "-", end='\r')


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


allowanceTimes = []
incenTimes = []
popTimes = []


def sendTransaction(from_, flmodel, flblock, min_max_scaler):
    def avgTime(times):
        if len(times) == 0:
            return 0.0
        else:
            return sum(times) / len(times)

    r = API.getRequestLength(from_)
    beforeRequestLength = int(r['data']['res'][0])

    # if no request
    if beforeRequestLength == 0:
        print("> no requests")
        time.sleep(waitingInterval)
        return

    r = API.getRequest(from_)
    res = r['data']['res']

    # get inputs
    userAddr = res[0]
    responseId = userAddr + res[1]
    stations = [int(e) for e in res[2]]
    arriveTimes = [int(e) for e in res[3]]
    infos = [int(e) for e in res[4]]
    month, temperature, windDirection, windSpeed, precipitation, humidity, day = infos

    bikeNums = list()
    for idx, station in enumerate(stations):
        arriveTime = arriveTimes[idx]

        # one-hot encoding
        day_encoded = [0 for _ in range(7)]
        day_encoded[day] = 1

        # ['월', '대여시간', '기온(°C)', '풍향(deg)', '풍속(m/s)', '강수량(mm)', '습도(%)', '요일_0', '요일_1', '요일_2', '요일_3', '요일_4', '요일_5', '요일_6']
        inputs = [station]
        inputs += [month, arriveTime, temperature,
                   windDirection, windSpeed, precipitation, humidity]
        inputs += day_encoded
        inputs = np.array(inputs)

        """inference"""
        inputs = np.expand_dims(inputs, 0)

        flmodel.set_weights(flblock.weights)  # set weights

        X = min_max_scaler.transform(inputs)  # Do normalization
        Y = flmodel.predict(X)
        bikeNums.append(round(Y.tolist()[0][0]))

    """giveIncentive or inserResponse"""
    if len(stations) == 1:
        # CASE 1: giveIncentive
        print("> give incentive to", userAddr)

        r = API.balanceOf(userAddr, REOA)
        beforeBalance = int(r['data']['res'][0])

        r = API.getReturnInfo(userAddr, from_)
        _, bikeNumAfterReturn, _ = r['data']['res']
        bikeNumAfterReturn = int(bikeNumAfterReturn)

        incentive =\
            (bikeNums[0] - bikeNumAfterReturn + 1) * 10 if (bikeNums[0] - bikeNumAfterReturn + 1) > 0 else 0

        # allowance
        r = API.approve(contractAddr, incentive, from_)
        r = API.allowance(userAddr, contractAddr, from_)
        allowedAmount = int(r['data']['res'][0])

        # waiting
        startTime = time.time()
        t = 0
        while allowedAmount < incentive:
            pinwheel(t, keyword="> waiting for allowance... (ETA: %f)" %
                     avgTime(allowanceTimes))
            r = API.allowance(REOA, contractAddr, from_)
            allowedAmount = int(r['data']['res'][0])
            t += 1
        endTime = time.time()
        elapsedTime = endTime - startTime
        allowanceTimes.append(elapsedTime)
        print(" " * 64, end="\r")
        print("> [allowance] Done... (elapsed time: %f)" % elapsedTime)

        # give incentive
        r = API.giveIncentive(userAddr, incentive, int(time.time()), from_)
        r = API.balanceOf(userAddr, REOA)
        afterBalance = int(r['data']['res'][0])

        # waiting
        startTime = time.time()
        t = 0
        while afterBalance < beforeBalance + incentive:
            pinwheel(
                t, keyword="> waiting for earning incentive... (ETA: %f)" % avgTime(incenTimes))
            r = API.balanceOf(userAddr, REOA)
            afterBalance = int(r['data']['res'][0])
            t += 1
        endTime = time.time()
        elapsedTime = endTime - startTime
        incenTimes.append(elapsedTime)
        print(" " * 64, end="\r")
        print("> [incentive] Done... (elapsed time: %f)" % elapsedTime)

    else:
        # CASE 2: insertResponse
        print("> insert response about", responseId)

        r = API.insertResponse(responseId, stations, bikeNums, from_)

    """pop request"""
    r = API.popRequest(from_)

    r = API.getRequestLength(from_)
    afterRequestLength = int(r['data']['res'][0])

    # waiting
    startTime = time.time()
    t = 0
    while afterRequestLength != beforeRequestLength - 1:
        pinwheel(t, keyword="> waiting for popping a request... (ETA: %f)" %
                 avgTime(popTimes))
        r = API.getRequestLength(from_)
        afterRequestLength = int(r['data']['res'][0])
        t += 1
    endTime = time.time()
    elapsedTime = endTime - startTime
    popTimes.append(elapsedTime)
    print(" " * 64, end="\r")
    print("> [pop] Done... (elapsed time: %f)" % elapsedTime)


if __name__ == "__main__":
    args = arguments.parser()
    print("> Setting:", args)

    # set REOA
    from_ = REOA

    # get min_max_scaler
    features, min_max_scaler = preprocessing.get_train_test(
        "./data/realworld", getScalar=True)

    # set FL model
    # TODO: modified model with concatenate layer
    flmodel = create_model(features)

    while True:
        print()
        print("> Start new round")

        # get latest relayed block
        res = API.getBlocksLength(from_)
        latestBlock = int(res['data']['res'][0]) - 1
        print("> latest relayed block: %d" % latestBlock)

        # read block
        flblock = readBlock("./data/blocks", latestBlock)
        # printBlock(flblock)

        """get request"""
        sendTransaction(from_, flmodel, flblock, min_max_scaler)
