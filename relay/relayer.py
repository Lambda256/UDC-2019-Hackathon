import arguments
import luniverseAPI as API

import time
import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))) + "/FL")

from block import readBlock, printBlock


# hardcoding factors
REOA = "0x7f9e54d53549ba46dbe32ab39fd5fee3fd7cbe78"


if __name__ == "__main__":
    args = arguments.parser()
    endBlock = args.block
    print(">>> Setting:", args)

    # set REOA
    from_ = REOA

    # getBlocksLength
    res = API.getBlocksLength(from_)
    startBlock = int(res['data']['res'][0])
    print(startBlock, endBlock)

    # relaying
    for i in range(startBlock, endBlock):
        print("Relay block %-5d" % i)

        flblock = readBlock("./data/blocks", i)
        printBlock(flblock)

        # insertBlock
        res = API.insertBlock(flblock, from_)
        print(res)

        res = API.getBlocksLength(from_)
        currentBlock = int(res['data']['res'][0])
        while currentBlock == i:
            print(currentBlock, i)
            time.sleep(0.1)
            res = API.getBlocksLength(from_)
            currentBlock = int(res['data']['res'][0])
            pass
