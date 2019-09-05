import argparse


def parser():
    parser = argparse.ArgumentParser(description='Some hyperparameters')
    # parser.add_argument('--sum', dest='accumulate', action='store_const',
    #                     const=sum, default=max,
    #                     help='sum the integers (default: find the max)')

    parser.add_argument('--defaultFee', metavar='F', type=int, default=100,
                        help='default rent fee')

    parser.add_argument('--additionalFee', metavar='A', type=int, default=200,
                        help='per 1h')

    parser.add_argument('--defaultTime', metavar='T', type=int, default=0,
                        help='default rent time')

    parser.add_argument('--users', metavar='U', type=int, default=100,
                        help='number of users')

    parser.add_argument('--round', metavar='R', type=int, default=1000,
                        help='number of rounds (h)')

    parser.add_argument('--activeRatio', metavar='P', type=float, default=0.05,
                        help='TBA')

    parser.add_argument('--defaultBalance', metavar='B', type=int, default=10**6,
                        help='TBA')

    parser.add_argument('--missingRatio', metavar='M', type=float, default=0.03,
                        help='TBA')

    # TODO: tx fee if you do

    # mechanisms about incentive system
    # linear        0
    # power         1
    # exponential   2
    # custom        3
    parser.add_argument('--mechanism', metavar='S', type=int, default=0,
                        help='TBA')

    parser.add_argument('--incentiveCoef', metavar='C', type=int, default=1000,
                        help='multiplier')

    parser.add_argument('--incentivePower', metavar='X', type=float, default=2.0,
                        help='multiplier')

    parser.add_argument('--incentiveExp', metavar='E', type=float, default=2.0,
                        help='multiplier')

    args = parser.parse_args()
    return args


# main
if __name__ == "__main__":
    args = parser()
    print(args)
