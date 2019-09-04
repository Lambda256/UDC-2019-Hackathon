import tensorflow as tf
import numpy as np
from sklearn.preprocessing import MinMaxScaler

import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))) + "/FL")

from block import readBlock, printBlock
from model import FLModel
import luniverseAPI as API
import preprocessing


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


def get_model_and_scaler():
    features, min_max_scaler = preprocessing.get_train_test(
        "./data/realworld", getScalar=True)

    file_list = os.listdir("./data/blocks")
    latestBlock = len(file_list) - 1
    flblock = readBlock("./data/blocks", latestBlock)

    # set FL model
    flmodel = create_model(features)
    flmodel.set_weights(flblock.weights)

    return flmodel, min_max_scaler


class Env:
    def __init__(self, num_stations, num_bikes_per_station):
        self.flmodel, self.scaler = get_model_and_scaler()
        self.stations = list(range(num_stations))
        self.bikes = [num_bikes_per_station for _ in range(num_stations)]

    # TODO: def weather(self):
    def giveIncentive(self, stations, arriveTimes, infos):
        month, temperature, windDirection, windSpeed, precipitation, humidity, day = infos

        bikeNums = list()
        for idx, station in enumerate(stations):
            arriveTime = arriveTimes[idx]

            # one-hot encoding
            day_encoded = [0 for _ in range(7)]
            day_encoded[day] = 1

            # ['월', '대여시간', '기온(°C)', '풍향(deg)', '풍속(m/s)', '강수량(mm)', '습도(%)', '요일_0', '요일_1', '요일_2', '요일_3', '요일_4', '요일_5', '요일_6']
            inputs = [station]
            inputs += [month, arriveTime, temperature, windDirection, windSpeed, precipitation, humidity]
            inputs += day_encoded
            inputs = np.array(inputs)

            """inference"""
            inputs = np.expand_dims(inputs, 0)
            X = self.scaler.transform(inputs)  # Do normalization
            Y = self.flmodel.predict(X)
            bikeNums.append(round(Y.tolist()[0][0]))

        return bikeNums

    def calIncentive(self, stations, arriveTimes, infos):
        month, temperature, windDirection, windSpeed, precipitation, humidity, day = infos

        bikeNums = list()
        for idx, station in enumerate(stations):
            arriveTime = arriveTimes[idx]

            # one-hot encoding
            day_encoded = [0 for _ in range(7)]
            day_encoded[day] = 1

            # ['월', '대여시간', '기온(°C)', '풍향(deg)', '풍속(m/s)', '강수량(mm)', '습도(%)', '요일_0', '요일_1', '요일_2', '요일_3', '요일_4', '요일_5', '요일_6']
            inputs = [station]
            inputs += [month, arriveTime, temperature, windDirection, windSpeed, precipitation, humidity]
            inputs += day_encoded
            inputs = np.array(inputs)

            """inference"""
            inputs = np.expand_dims(inputs, 0)
            X = self.scaler.transform(inputs)  # Do normalization
            Y = self.flmodel.predict(X)
            bikeNums.append(round(Y.tolist()[0][0]))

        return bikeNums


if __name__ == "__main__":
    num_stations = 75
    num_bikes_per_station = 10

    env = Env(num_stations, num_bikes_per_station)
    print(env.calIncentive([3, 5], [6, 8], [1, 1, 1, 1, 1, 1, 1]))
