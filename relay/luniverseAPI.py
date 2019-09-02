import requests
import json


def curlPost(url, data, headers):
    r = requests.post(url, data=data, headers=headers)
    return r.json()


def getRequest(from_):
    # data
    data = dict()
    data['from'] = from_

    # curl
    url = "https://api.luniverse.io/tx/v1.0/transactions/getRequest9"
    headers = {
        'Content-type': 'application/json',
        'Authorization': 'Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD'
    }
    data = json.dumps(data)

    r = curlPost(url, data, headers)
    return r


def insertResponse(requestId, stations: list, bikeNums: list, from_):
    # data
    data_inputs = dict()
    data_inputs['requestID'] = requestId
    data_inputs['_stations'] = stations
    data_inputs['_bikeNums'] = bikeNums

    data = dict()
    data['from'] = from_
    data['inputs'] = data_inputs

    # curl
    url = "https://api.luniverse.io/tx/v1.0/transactions/insertResponse9"
    headers = {
        'Content-type': 'application/json',
        'Authorization': 'Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD'
    }
    data = json.dumps(data)

    r = curlPost(url, data, headers)
    return r


def insertBlock(flblock, from_):
    # data
    data_inputs = dict()
    data_inputs['_blockNumber'] = flblock.header.blockNumber
    data_inputs['_prevBlockHash'] = "0x" + flblock.header.prevBlockHash
    data_inputs['_weightHash'] = "0x" + flblock.header.weightHash
    data_inputs['_testSetHash'] = "0x" + flblock.header.testsetHash
    data_inputs['_participantHash'] = "0x" + flblock.header.participantHash
    data_inputs['_timestamp'] = flblock.header.timestamp

    data = dict()
    data['from'] = from_
    data['inputs'] = data_inputs

    # curl
    url = "https://api.luniverse.io/tx/v1.0/transactions/insertBlock9"
    headers = {
        'Content-type': 'application/json',
        'Authorization': 'Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD'
    }
    data = json.dumps(data)

    r = curlPost(url, data, headers)
    return r


# def getBlock(blockNumber, from_):
#     # data
#     data_inputs = dict()
#     data_inputs['_blockNumber'] = blockNumber

#     data = dict()
#     data['from'] = from_
#     data['inputs'] = data_inputs

#     # curl
#     url = "https://api.luniverse.io/tx/v1.0/transactions/readBlock9"
#     headers = {
#         'Content-type': 'application/json',
#         'Authorization': 'Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD'
#     }
#     data = json.dumps(data)

#     r = curlPost(url, data, headers)
#     return r


def getBlocksLength(from_):
    # data
    data = dict()
    data['from'] = from_

    # curl
    url = "https://api.luniverse.io/tx/v1.0/transactions/getBlocksLength9"
    headers = {
        'Content-type': 'application/json',
        'Authorization': 'Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD'
    }
    data = json.dumps(data)

    r = curlPost(url, data, headers)
    return r


def resetBlocks(from_):
    # data
    data = dict()
    data['from'] = from_

    # curl
    url = "https://api.luniverse.io/tx/v1.0/transactions/resetBlocks"
    headers = {
        'Content-type': 'application/json',
        'Authorization': 'Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD'
    }
    data = json.dumps(data)

    r = curlPost(url, data, headers)
    return r
