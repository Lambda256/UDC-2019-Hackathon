import time


class Agent:
    def __init__(self, balance):
        self.balance = balance
        self.rentWhere = None
        self.rentTime = None

    def rentBike(self, station, when, args):
        if self.balance - args.defaultFee < 0:
            return False

        self.balance -= args.defaultFee
        self.rentWhere = station
        self.rentTime = when
        return True

    def returnBike(self, station, when, args):
        useTime = when - self.rentTime
        if useTime > args.defaultTime:
            if self.balance - (args.additionalFee * useTime) < 0:
                return False
            else:
                self.balance -= (args.additionalFee * useTime)

        self.rentWhere = None
        return True


if __name__ == "__main__":
    agent = Agent(10 ** 18)
    print(agent.address, agent.balance)
