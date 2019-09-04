import arguments
from agent import Agent
from environment import Env

import random
import sys
import numpy as np


if __name__ == "__main__":
    args = arguments.parser()
    print("> Setting:", args)

    # Env
    num_stations = 75
    mapo = []  # hardcoding
    num_bikes_per_station = 10
    env = Env(num_stations, num_bikes_per_station)

    # Agent
    agents = [Agent(args.defaultBalance) for _ in range(args.users)]
    # print([agent.balance for agent in agents])

    for i in range(args.round):
        for agent in agents:
            if random.random() < args.activeRatio:
                """scenario"""
                # set parameters
                stations = list()
                for _ in range(10):
                    stations.append(np.random.randint(num_stations))
                arriveTimes = [np.random.randint(3) for _ in range(10)]  # use 3 hours maximum
                infos = [9, 24, 308, 6, 0, 52, 2]  # 2018/09/04
                
                # cal. incentive
                print(env.calIncentive(stations, arriveTimes, infos))
                

                # agent.rentBike()
