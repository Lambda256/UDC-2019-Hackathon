class Agent:
    def __init__(self, balance):
        self.balance = balance

        self.rentWhere = None
        self.rentTime = None
        self.arrivalPred = None
        self.returnWhere = None
        self.destination = None

    def rentBike(self, src, dest, when, arrivalPred, args):
        if self.balance - args.defaultFee < 0:
            return False

        self.balance -= args.defaultFee

        self.rentWhere = src
        self.rentTime = when
        self.arrivalPred = arrivalPred
        self.returnWhere = None
        self.destination = dest
        return args.defaultFee  # fee

    def returnBike(self, when, args):
        useTime = when - self.rentTime
        if useTime > args.defaultTime:
            if self.balance - (args.additionalFee * useTime) < 0:
                return False
            else:
                self.balance -= (args.additionalFee * useTime)

        self.rentWhere = None
        self.rentTime = None
        self.arrivalPred = None
        self.returnWhere = self.destination
        self.destination = None
        return (args.additionalFee * useTime)  # fee


if __name__ == "__main__":
    agent = Agent(10 ** 18)
    print(agent.balance)
