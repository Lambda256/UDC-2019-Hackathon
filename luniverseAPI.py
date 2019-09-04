import requests
import json


# hardcoding factors
Authorization = "Bearer SfnBZUboFmWwav6CkYJrkyEQGp77qLJzhQ4hcmumhd8CYbp7z9hiRDex7jDaLgvr"
Version = "3"


def curlPost(url, data, headers):
    r = requests.post(url, data=data, headers=headers)
    return r.json()


def allowance(REAOowner, contractAddr, from_):
    # data
    data_inputs = dict()
    data_inputs['owner'] = REAOowner
    data_inputs['spender'] = contractAddr

    data = dict()
    data['from'] = from_
    data['inputs'] = data_inputs

    # curl
    url = "https://api.luniverse.net/tx/v1.0/transactions/allowance"
    headers = {
        'Content-type': 'application/json',
        'Authorization': Authorization
    }
    data = json.dumps(data)

    r = curlPost(url, data, headers)
    return r


def balanceOf(addr, from_):
    # data
    data_inputs = dict()
    data_inputs['owner'] = addr

    data = dict()
    data['from'] = from_
    data['inputs'] = data_inputs

    # curl
    url = "https://api.luniverse.net/tx/v1.0/transactions/balanceOf"
    headers = {
        'Content-type': 'application/json',
        'Authorization': Authorization
    }
    data = json.dumps(data)

    r = curlPost(url, data, headers)
    return r


def approve(contractAddr, amount, from_):
    # data
    data_inputs = dict()
    data_inputs['spender'] = contractAddr
    data_inputs['valueAmount'] = amount

    data = dict()
    data['from'] = from_
    data['inputs'] = data_inputs

    # curl
    url = "https://api.luniverse.net/tx/v1.0/transactions/approve"
    headers = {
        'Content-type': 'application/json',
        'Authorization': Authorization
    }
    data = json.dumps(data)

    r = curlPost(url, data, headers)
    return r


def getReturnInfo(addr, from_):
    # data
    data_inputs = dict()
    data_inputs['addr'] = addr

    data = dict()
    data['from'] = from_
    data['inputs'] = data_inputs

    # curl
    url = "https://api.luniverse.net/tx/v1.0/transactions/getReturnInfo" + Version
    headers = {
        'Content-type': 'application/json',
        'Authorization': Authorization
    }
    data = json.dumps(data)

    r = curlPost(url, data, headers)
    return r


def giveIncentive(receiver, amount, timestamp, from_):
    # data
    data_inputs = dict()
    data_inputs['receiver'] = receiver
    data_inputs['amount'] = amount
    data_inputs['timestamp'] = timestamp

    data = dict()
    data['from'] = from_
    data['inputs'] = data_inputs

    # curl
    url = "https://api.luniverse.net/tx/v1.0/transactions/giveIncentive" + Version
    headers = {
        'Content-type': 'application/json',
        'Authorization': Authorization
    }
    data = json.dumps(data)

    r = curlPost(url, data, headers)
    return r


def popRequest(from_):
    # data
    data = dict()
    data['from'] = from_

    # curl
    url = "https://api.luniverse.net/tx/v1.0/transactions/popRequest" + Version
    headers = {
        'Content-type': 'application/json',
        'Authorization': Authorization
    }
    data = json.dumps(data)

    r = curlPost(url, data, headers)
    return r


def getRequestLength(from_):
    # data
    data = dict()
    data['from'] = from_

    # curl
    url = "https://api.luniverse.net/tx/v1.0/transactions/getRequestLength" + Version
    headers = {
        'Content-type': 'application/json',
        'Authorization': Authorization
    }
    data = json.dumps(data)

    r = curlPost(url, data, headers)
    return r


def getRequest(from_):
    # data
    data = dict()
    data['from'] = from_

    # curl
    url = "https://api.luniverse.net/tx/v1.0/transactions/getRequest" + Version
    headers = {
        'Content-type': 'application/json',
        'Authorization': Authorization
    }
    data = json.dumps(data)

    r = curlPost(url, data, headers)
    return r


def insertResponse(requestId, stations: list, bikeNums: list, from_):
    # preprocessing
    requestId = requestId.lower()

    # data
    data_inputs = dict()
    data_inputs['requestID'] = requestId
    data_inputs['_stations'] = stations
    data_inputs['_bikeNums'] = bikeNums

    data = dict()
    data['from'] = from_
    data['inputs'] = data_inputs

    # curl
    url = "https://api.luniverse.net/tx/v1.0/transactions/insertResponse" + Version
    headers = {
        'Content-type': 'application/json',
        'Authorization': Authorization
    }
    data = json.dumps(data)

    print(data)

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
    url = "https://api.luniverse.net/tx/v1.0/transactions/insertBlock" + Version
    headers = {
        'Content-type': 'application/json',
        'Authorization': Authorization
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
    url = "https://api.luniverse.net/tx/v1.0/transactions/getBlocksLength" + Version
    headers = {
        'Content-type': 'application/json',
        'Authorization': Authorization
    }
    data = json.dumps(data)

    r = curlPost(url, data, headers)
    return r


# def resetBlocks(from_):
#     # data
#     data = dict()
#     data['from'] = from_

#     # curl
#     url = "https://api.luniverse.io/tx/v1.0/transactions/resetBlocks"
#     headers = {
#         'Content-type': 'application/json',
#         'Authorization': 'Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD'
#     }
#     data = json.dumps(data)

#     r = curlPost(url, data, headers)
#     return r


def getResponse(requestId, from_):
    # data
    data_inputs = dict()
    data_inputs['requestID'] = requestId

    data = dict()
    data['from'] = from_
    data['inputs'] = data_inputs

    # curl
    url = "https://api.luniverse.net/tx/v1.0/transactions/getResponse" + Version
    headers = {
        'Content-type': 'application/json',
        'Authorization': Authorization
    }
    data = json.dumps(data)

    r = curlPost(url, data, headers)
    return r


if __name__ == "__main__":
    REOA = "0x7f9e54d53549ba46dbe32ab39fd5fee3fd7cbe78"
    user = "0xaf55306cbd1dc71b73a9545f6fe760373fb5687b"
    cont = "0x86541F02895c5d14434d28dA565E8793E810d848"

    # res = approve(cont, 15, REOA)
    res = getBlocksLength(REOA)
    print(res)
