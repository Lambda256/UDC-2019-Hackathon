from matplotlib import pyplot as plt
import numpy as np
import json


# hardcoding factor
rounds = 1000

target = "log_1567607992_mechanism_0.json"
# target = "log_1567608579_mechanism_1.json"
# target = "log_1567608704_mechanism_2.json"
# target  = "log_1567609089_mechanism_3.json"

PATH = "./data/simulation/" + target


if __name__ == "__main__":
    with open(PATH, 'r') as f:
        log_dict = json.load(f)

        """
        print("> # of bankrupts      :", len(bankrupts))
        print("> total incentive     :", sum(incentives))
        print("> total fee           :", sum(fees))
        print("> sum of user balances:", sum([agent.balance for agent in agents]))
        """
        log_bankrupts = log_dict["log_bankrupts"]
        log_bankrupts = [len(e) for e in log_bankrupts]

        log_total_incentive = log_dict["log_total_incentive"]
        log_total_fee = log_dict["log_total_fee"]
        log_balance = log_dict["log_balance"]

        x = np.arange(rounds)

        """log_bankrupts"""
        y = log_bankrupts
        fig, ax = plt.subplots()
        ax.plot(x, y)
        ax.set(
            xlabel='Rounds',
            ylabel='Number',
            title='# of bankrupts')
        # ax.grid()
        # fig.savefig("test.png")
        plt.show()

        """log_total_incentive"""
        y = log_total_incentive
        fig, ax = plt.subplots()
        ax.plot(x, y)
        ax.set(
            xlabel='Rounds',
            ylabel='Token',
            title='total incentive')
        # ax.grid()
        # fig.savefig("test.png")
        plt.show()

        """log_total_fee"""
        y = log_total_fee
        fig, ax = plt.subplots()
        ax.plot(x, y)
        ax.set(
            xlabel='Rounds',
            ylabel='Token',
            title='total fee')
        # ax.grid()
        # fig.savefig("test.png")
        plt.show()

        """log_balance"""
        y = log_balance
        fig, ax = plt.subplots()
        ax.plot(x, y)
        ax.set(
            xlabel='Rounds',
            ylabel='Token',
            title='sum of user balances')
        # ax.grid()
        # fig.savefig("test.png")
        plt.show()
