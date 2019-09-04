import arguments

import time
import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))) + "/FL")

from block import readBlock, printBlock
import luniverseAPI as API


# hardcoding factors
REOA = "0x128a8b8c9507aec53d949c53d5be57c4d98f9256"
AvgBlockInterval = 3.0


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


# TODO
def pinwheel_with_ETA(t, keyword=""):
    pass


fileTimes = []
respTimes = []


def sendTransaction(currentBlock, i, from_):
    def avgTime(times):
        if len(times) == 0:
            return 0.0
        else:
            return sum(times) / len(times)

    file_list = os.listdir("./data/blocks")
    print()
    print("> Relay block (%d / %d)" % (i, len(file_list) - 1))

    # read block
    startTime = time.time()
    t = 0
    while True:
        try:
            flblock = readBlock("./data/blocks", i)
            break
        except FileNotFoundError:
            pinwheel(t, keyword="> waiting for FL chain to expand... (ETA: %f)" % avgTime(fileTimes))
            t += 1
            time.sleep(AvgBlockInterval)
            pass
    endTime = time.time()
    elapsedTime = endTime - startTime
    if t != 0:
        fileTimes.append(elapsedTime)
        print(" " * 64, end="\r")
        print("> [readBlock] Done... (elapsed time: %f)" % elapsedTime)

    printBlock(flblock)

    # insertBlock
    res = API.insertBlock(flblock, from_)
    # print(res)

    # waiting
    startTime = time.time()
    t = 0
    while currentBlock == i:
        pinwheel(t, keyword="> waiting for Luniverse to be updated... (ETA: %f)" % avgTime(respTimes))
        # print(currentBlock, i)
        # time.sleep(0.1)
        res = API.getBlocksLength(from_)
        currentBlock = int(res['data']['res'][0])
        t += 1
    endTime = time.time()
    elapsedTime = endTime - startTime
    respTimes.append(elapsedTime)
    print(" " * 64, end="\r")
    print("> [relay] Done... (elapsed time: %f)" % elapsedTime)

    return currentBlock


if __name__ == "__main__":
    args = arguments.parser()
    endBlock = args.block
    print("> Setting:", args)

    # set REOA
    from_ = REOA

    # getBlocksLength
    res = API.getBlocksLength(from_)
    startBlock = currentBlock = int(res['data']['res'][0])
    # print(startBlock, endBlock)

    # relaying
    # CASE 1: no limit
    if endBlock == 0:
        i = startBlock
        while True:
            currentBlock = sendTransaction(currentBlock, i, from_)
            i += 1

    # CASE 2: limitation
    for i in range(startBlock, endBlock + 1):
        currentBlock = sendTransaction(currentBlock, i, from_)
