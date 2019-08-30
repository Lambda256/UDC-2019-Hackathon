import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))) + "/FL")

from block import readBlockchain

import json
import requests
# import tensorflow as tf


# global variables
REOA = "0x7f9e54d53549ba46dbe32ab39fd5fee3fd7cbe78"


def curlPost(url, data, headers):
    r = requests.post(url, data=data, headers=headers)
    return r.json()


def insertBlock(flblock, from_):
    # data
    data_inputs = dict()
    data_inputs['_blockNumber'] = flblock.header.blockNumber
    data_inputs['_prevBlockHash'] = "0x" + flblock.header.prevBlockHash
    data_inputs['_weightHash'] = "0x" + flblock.header.weightHash
    data_inputs['_testSetHash'] = "0x" + flblock.header.testsetHash

    data = dict()
    data['from'] = from_
    data['inputs'] = data_inputs

    # curl
    url = "https://api.luniverse.io/tx/v1.0/transactions/insertBlock7"
    headers = {
        'Content-type': 'application/json',
        'Authorization': 'Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD'
    }
    data = json.dumps(data)

    r = curlPost(url, data, headers)
    return r


def readBlock(blockNumber, from_):
    # data
    data_inputs = dict()
    data_inputs['_blockNumber'] = blockNumber

    data = dict()
    data['from'] = from_
    data['inputs'] = data_inputs

    # curl
    url = "https://api.luniverse.io/tx/v1.0/transactions/readBlock7"
    headers = {
        'Content-type': 'application/json',
        'Authorization': 'Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD'
    }
    data = json.dumps(data)

    r = curlPost(url, data, headers)
    return r


def getBlocksLength(from_):
    # data
    data = dict()
    data['from'] = from_

    # curl
    url = "https://api.luniverse.io/tx/v1.0/transactions/getBlocksLength7"
    headers = {
        'Content-type': 'application/json',
        'Authorization': 'Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD'
    }
    data = json.dumps(data)

    r = curlPost(url, data, headers)
    return r


# def getOwner():
#     # data
#     url = "https://api.luniverse.io/tx/v1.0/transactions/getOwner2"
#     headers = {
#         'Content-type': 'application/json',
#         'Authorization': 'Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD'
#     }
#     data = {}

#     r = curlPost(url, data, headers)

#     try:
#         owner = r['data']['res'][0]  # owner
#     except:
#         owner = None
#     return owner


if __name__ == "__main__":
    # read blockchain
    flchain = readBlockchain("../FL/data/chain.bin")

    chain_len = len(flchain)
    for i in range(chain_len):
        print("Relay block %-5d" % i)
        flblock = flchain.blocks[i]

        from_ = REOA

        # # insertBlock
        # r = insertBlock(flblock, from_)
        # print(r)

        # readBlock
        r = readBlock(i, from_)
        print(r)

        # # getBlocksLength
        # r = getBlocksLength(from_)
        # print(r)
