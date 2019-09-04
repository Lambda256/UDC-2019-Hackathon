import argparse


def parser():
    parser = argparse.ArgumentParser(description='Some hyperparameters')
    # parser.add_argument('--sum', dest='accumulate', action='store_const',
    #                     const=sum, default=max,
    #                     help='sum the integers (default: find the max)')

    parser.add_argument('--block', metavar='N', type=int, default=0,
                        help='number of blocks')

    args = parser.parse_args()
    return args


# main
if __name__ == "__main__":
    args = parser()
    print(args)
