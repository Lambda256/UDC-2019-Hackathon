import arguments
from agent import Agent
from environment import Env
from mechanisms import incentive_exp, incentive_power, incentive_linear, custom

import random
import sys
import numpy as np
import time
import json
import os


# hardcoding factors
num_stations = 75
num_bikes_per_station = 2
infos = [9, 24, 308, 6, 0, 52, 1]  # 2018/09/04
mapo = [101, 102, 103, 104, 105, 106, 107, 108, 109, 111, 112, 113, 114, 118, 119, 120, 121, 122, 124, 125, 126, 127, 129, 130, 136, 142, 143, 144, 145, 146, 147, 148, 150, 151, 152, 153, 154, 155, 156, 157, 1687, 181, 182, 183, 184, 185, 186, 199, 400, 401, 402, 403, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 424, 425, 426, 427, 432]  # hardcoding


# What we want to watch
# sum of incentives (mints)
# sum of rent fees
# and it's diff.
if __name__ == "__main__":
    args = arguments.parser()
    print("> Setting:", args)

    # Env
    env = Env(num_stations, num_bikes_per_station)

    # Agent
    agents = [Agent(args.defaultBalance) for _ in range(args.users)]

    # logs
    bankrupts = list()
    incentives = list()  # mints
    fees = list()

    # logs for visualization
    log_dict = dict()
    log_dict["log_bankrupts"] = list()
    log_dict["log_total_incentive"] = list()
    log_dict["log_total_fee"] = list()
    log_dict["log_balance"] = list()

    for i in range(args.round):
        print()
        print("> Round %5d" % i, " " * 64)
        tmp_fee = 0
        tmp_incentive = 0

        """return bike"""
        for agent_idx, agent in enumerate(agents):
            # bankrupt passing
            if agent_idx in bankrupts:
                continue
            if agent.rentTime is None:
                continue
            if agent.rentTime + agent.arrivalPred > i:
                continue
            if random.random() < args.missingRatio:
                continue

            """scenario"""
            print("> [Return] Agent %05d" % agent_idx, " " * 64, end="\r")

            res = agent.returnBike(i, args)
            if res is False:
                bankrupts.append(agent_idx)
            else:
                # set parameters
                dests = [agent.returnWhere]
                arriveTimes = [0]

                # cal. incentive
                preds = np.array(env.calIncentive(dests, arriveTimes, infos))

                # cal. number of bikes
                env.bikes[mapo.index(dests[0])] += 1

                # give incentive
                diff = preds[0] - env.bikes[mapo.index(dests[0])]
                if diff >= 0:
                    earn = 0
                    if args.mechanism == 0:
                        earn = incentive_linear((diff + 1), args.incentiveCoef)
                    elif args.mechanism == 1:
                        earn = incentive_power((diff + 1), args.incentiveCoef, args.incentivePower)
                    elif args.mechanism == 2:
                        earn = incentive_exp((diff + 1), args.incentiveCoef, args.incentiveExp)
                    elif args.mechanism == 3:
                        earn = custom((diff + 1), args.incentiveCoef, args.incentiveExp)

                    agent.balance += earn

                    tmp_incentive += earn

                tmp_fee += res

        """rent bike"""
        for agent_idx, agent in enumerate(agents):
            # bankrupt passing
            if agent_idx in bankrupts:
                continue

            # only active users
            if random.random() > args.activeRatio:
                continue

            """scenario"""
            print("> [Rent] Agent %05d" % agent_idx, " " * 64, end="\r")

            # set parameters
            dests = list()
            for station in range(10):
                target_station_id = np.random.randint(num_stations)
                dests.append(mapo[target_station_id])  # get real station ID

            arriveTimes = [np.random.randint(12) for _ in range(10)]

            # cal. incentive
            preds = np.array(env.calIncentive(dests, arriveTimes, infos))
            max_index = np.random.choice(np.flatnonzero(preds == preds.max()))  # randomly pick max value's index
            dest = dests[max_index]

            # rent bike
            # get a starting point
            if env.bikes.count(0) == num_stations:
                env.reset(num_stations, num_bikes_per_station)

            source = None
            while True:
                target_station_id = np.random.randint(num_stations)
                if env.bikes[target_station_id] == 0:
                    continue
                else:
                    source = mapo[target_station_id]
                    break

            res = agent.rentBike(source, dest, i, arriveTimes[max_index], args)
            if res is False:
                bankrupts.append(agent_idx)
            else:
                # cal. number of bikes
                env.bikes[mapo.index(source)] -= 1

                tmp_fee += res

        incentives.append(tmp_incentive)
        fees.append(tmp_fee)

        # print logs
        print("> # of bankrupts      :", len(bankrupts))
        print("> total incentive     :", sum(incentives))
        print("> total fee           :", sum(fees))
        print("> sum of user balances:", sum([agent.balance for agent in agents]))

        log_dict["log_bankrupts"].append(bankrupts)
        log_dict["log_total_incentive"].append(int(sum(incentives)))
        log_dict["log_total_fee"].append(sum(fees))
        log_dict["log_balance"].append(int(sum([agent.balance for agent in agents])))

    # save logs
    PATH = "./data/simulation"
    try:
        os.mkdir(PATH)  # Create target Directory
    except FileExistsError:
        pass

    with open(PATH + "/log_" + str(int(time.time())) + ''.join(sys.argv[1:]).replace("--", "_").replace("=", "_") + ".json", "w") as f:
        json.dump(log_dict, f)
