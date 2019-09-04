echo "this is test case for scenarioTest contract"
contractAddr="0x86541F02895c5d14434d28dA565E8793E810d848"


echo ""
echo "setBikeNum(5,55)"
curl -X POST 'https://api.luniverse.io/tx/v1.0/transactions/setBikeNum10' \
    --header 'Authorization: Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD' \
    --header 'Content-Type: application/json' \
    --data '{
           "from": "0x7f9e54d53549ba46dbe32ab39fd5fee3fd7cbe78",
           "inputs": {
               "stationID": "5",
               "bikeNum": "55"
           }
       }'

sleep 3
echo ""
echo ""
echo "getBikeNum(5): expect 55 bikes"

curl -X POST 'https://api.luniverse.io/tx/v1.0/transactions/getBikeNum10' \
    --header 'Authorization: Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD' \
    --header 'Content-Type: application/json' \
    --data '{
           "from": "0x7f9e54d53549ba46dbe32ab39fd5fee3fd7cbe78",
           "inputs": {
               "stationID": "5"
           }
       }'

sleep 3
echo ""
echo ""
echo "Approve(contractAddr, 15) by user"

curl -X POST 'https://api.luniverse.io/tx/v1.0/transactions/approve' \
    --header 'Authorization: Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD' \
    --header 'Content-Type: application/json' \
    --data '{
           "from": "0xaf55306cbd1dc71b73a9545f6fe760373fb5687b",
           "inputs": {
               "valueAmount": "15",
               "spender": "0x86541F02895c5d14434d28dA565E8793E810d848"
           }
       }'

sleep 3
echo ""
echo ""
echo "Approve(contractAddr, 15) by owner"

curl -X POST 'https://api.luniverse.io/tx/v1.0/transactions/approve' \
    --header 'Authorization: Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD' \
    --header 'Content-Type: application/json' \
    --data '{
           "from": "0x7f9e54d53549ba46dbe32ab39fd5fee3fd7cbe78",
           "inputs": {
               "valueAmount": "15",
               "spender": "0x86541F02895c5d14434d28dA565E8793E810d848"
           }
       }'


sleep 3
echo ""
echo ""
echo "Allowance(userAddr, contractAddr): expect 15"

curl -X POST 'https://api.luniverse.io/tx/v1.0/transactions/allowance' \
    --header 'Authorization: Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD' \
    --header 'Content-Type: application/json' \
    --data '{
           "from": "0x7f9e54d53549ba46dbe32ab39fd5fee3fd7cbe78",
           "inputs": {
               "owner": "0xaf55306cbd1dc71b73a9545f6fe760373fb5687b",
               "spender": "0x86541F02895c5d14434d28dA565E8793E810d848"
           }
       }'

sleep 3
echo ""
echo ""
echo "Allowance(ownerAddr, contractAddr): expect 15"

curl -X POST 'https://api.luniverse.io/tx/v1.0/transactions/allowance' \
    --header 'Authorization: Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD' \
    --header 'Content-Type: application/json' \
    --data '{
           "from": "0x7f9e54d53549ba46dbe32ab39fd5fee3fd7cbe78",
           "inputs": {
               "owner": "0x7f9e54d53549ba46dbe32ab39fd5fee3fd7cbe78",
               "spender": "0x86541F02895c5d14434d28dA565E8793E810d848"
           }
       }'


sleep 3
echo ""
echo ""
echo "balanceOf(userAddr)"

curl -X POST 'https://api.luniverse.io/tx/v1.0/transactions/balanceOf10' \
    --header 'Authorization: Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD' \
    --header 'Content-Type: application/json' \
    --data '{
           "from": "0xaf55306cbd1dc71b73a9545f6fe760373fb5687b"
       }'


sleep 3
echo ""
echo ""
echo "balanceOf(ownerAddr)"

curl -X POST 'https://api.luniverse.io/tx/v1.0/transactions/balanceOf10' \
    --header 'Authorization: Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD' \
    --header 'Content-Type: application/json' \
    --data '{
           "from": "0x7f9e54d53549ba46dbe32ab39fd5fee3fd7cbe78"
       }'


sleep 3
echo ""
echo ""
echo "requestInference(10, [4,6], [2,3], [1,1,1,1,1,1,1,1])"

curl -X POST 'https://api.luniverse.io/tx/v1.0/transactions/requestInference10' \
    --header 'Authorization: Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD' \
    --header 'Content-Type: application/json' \
    --data '{
           "from": "0xaf55306cbd1dc71b73a9545f6fe760373fb5687b",
           "inputs": {
               "_reqTime": "10",
               "_stations": [4,6],
               "_arriveTimes": [2,3],
               "_infos": [1,1,1,1,1,1,1,1]
           }
       }'



sleep 3
echo ""
echo ""
echo "insertResponse(userAddr10, [4,6], [5,10])"

curl -X POST 'https://api.luniverse.io/tx/v1.0/transactions/insertResponse10' \
    --header 'Authorization: Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD' \
    --header 'Content-Type: application/json' \
    --data '{
           "from": "0x7f9e54d53549ba46dbe32ab39fd5fee3fd7cbe78",
           "inputs": {
               "requestID": "0xaf55306cbd1dc71b73a9545f6fe760373fb5687b10",
               "_stations": [4,6],
               "_bikeNums": [5,10]
           }
       }'


sleep 3
echo ""
echo ""
echo "getResponse(userAddr10): expect 50, 100"

curl -X POST 'https://api.luniverse.io/tx/v1.0/transactions/getResponse10' \
    --header 'Authorization: Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD' \
    --header 'Content-Type: application/json' \
    --data '{
           "from": "0xaf55306cbd1dc71b73a9545f6fe760373fb5687b",
           "inputs": {
               "requestID": "0xaf55306cbd1dc71b73a9545f6fe760373fb5687b10"
           }
       }'




sleep 3
echo ""
echo ""
echo "returnBike(5,15): expect reject"

curl -X POST 'https://api.luniverse.io/tx/v1.0/transactions/returnBike10' \
    --header 'Authorization: Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD' \
    --header 'Content-Type: application/json' \
    --data '{
           "from": "0xaf55306cbd1dc71b73a9545f6fe760373fb5687b",
           "inputs": {
               "stationID": "5",
               "returnTime": "15"
           }
       }'



sleep 3
echo ""
echo ""
echo "rentBike(1,10): expect reject"

curl -X POST 'https://api.luniverse.io/tx/v1.0/transactions/rentBike10' \
    --header 'Authorization: Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD' \
    --header 'Content-Type: application/json' \
    --data '{
           "from": "0xaf55306cbd1dc71b73a9545f6fe760373fb5687b",
           "inputs": {
               "stationID": "1",
               "rentTime": "10"
           }
       }'



sleep 3
echo ""
echo ""
echo "rentBike(5,10)"

curl -X POST 'https://api.luniverse.io/tx/v1.0/transactions/rentBike10' \
    --header 'Authorization: Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD' \
    --header 'Content-Type: application/json' \
    --data '{
           "from": "0xaf55306cbd1dc71b73a9545f6fe760373fb5687b",
           "inputs": {
               "stationID": "5",
               "rentTime": "10"
           }
       }'



sleep 3
echo ""
echo ""
echo "balanceOf(userAddr): expect -5"

curl -X POST 'https://api.luniverse.io/tx/v1.0/transactions/balanceOf10' \
    --header 'Authorization: Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD' \
    --header 'Content-Type: application/json' \
    --data '{
           "from": "0xaf55306cbd1dc71b73a9545f6fe760373fb5687b"
       }'




sleep 3
echo ""
echo ""
echo "balanceOf(ownerAddr): expect +5"

curl -X POST 'https://api.luniverse.io/tx/v1.0/transactions/balanceOf10' \
    --header 'Authorization: Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD' \
    --header 'Content-Type: application/json' \
    --data '{
           "from": "0x7f9e54d53549ba46dbe32ab39fd5fee3fd7cbe78"
       }'




sleep 3
echo ""
echo ""
echo "rentBike(5,10): expect reject"

curl -X POST 'https://api.luniverse.io/tx/v1.0/transactions/rentBike10' \
    --header 'Authorization: Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD' \
    --header 'Content-Type: application/json' \
    --data '{
           "from": "0xaf55306cbd1dc71b73a9545f6fe760373fb5687b",
           "inputs": {
               "stationID": "5",
               "rentTime": "10"
           }
       }'




sleep 3
echo ""
echo ""
echo "returnBike(7,5): expect reject"

curl -X POST 'https://api.luniverse.io/tx/v1.0/transactions/returnBike10' \
    --header 'Authorization: Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD' \
    --header 'Content-Type: application/json' \
    --data '{
           "from": "0xaf55306cbd1dc71b73a9545f6fe760373fb5687b",
           "inputs": {
               "stationID": "7",
               "returnTime": "5"
           }
       }'



sleep 3
echo ""
echo ""
echo "returnBike(7,20)"

curl -X POST 'https://api.luniverse.io/tx/v1.0/transactions/returnBike10' \
    --header 'Authorization: Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD' \
    --header 'Content-Type: application/json' \
    --data '{
           "from": "0xaf55306cbd1dc71b73a9545f6fe760373fb5687b",
           "inputs": {
               "stationID": "7",
               "returnTime": "20"
           }
       }'



sleep 3
echo ""
echo ""
echo "balanceOf(userAddr): expect -10"

curl -X POST 'https://api.luniverse.io/tx/v1.0/transactions/balanceOf10' \
    --header 'Authorization: Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD' \
    --header 'Content-Type: application/json' \
    --data '{
           "from": "0xaf55306cbd1dc71b73a9545f6fe760373fb5687b"
       }'




sleep 3
echo ""
echo ""
echo "balanceOf(ownerAddr): expect +10"

curl -X POST 'https://api.luniverse.io/tx/v1.0/transactions/balanceOf10' \
    --header 'Authorization: Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD' \
    --header 'Content-Type: application/json' \
    --data '{
           "from": "0x7f9e54d53549ba46dbe32ab39fd5fee3fd7cbe78"
       }'




sleep 3
echo ""
echo ""
echo "returnBike(7,20): expect reject"

curl -X POST 'https://api.luniverse.io/tx/v1.0/transactions/returnBike10' \
    --header 'Authorization: Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD' \
    --header 'Content-Type: application/json' \
    --data '{
           "from": "0xaf55306cbd1dc71b73a9545f6fe760373fb5687b",
           "inputs": {
               "stationID": "7",
               "returnTime": "20"
           }
       }'



sleep 3
echo ""
echo ""
echo "requestInference(50, [5], [0], [1,1,1,1,1,1,1,1])"

curl -X POST 'https://api.luniverse.io/tx/v1.0/transactions/requestInference10' \
    --header 'Authorization: Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD' \
    --header 'Content-Type: application/json' \
    --data '{
           "from": "0xaf55306cbd1dc71b73a9545f6fe760373fb5687b",
           "inputs": {
               "_reqTime": "10",
               "_stations": [5],
               "_arriveTimes": [0],
               "_infos": [1,1,1,1,1,1,1,1]
           }
       }'



sleep 3
echo ""
echo ""
echo "getReturnInfo(userAddr): expect 1 bike at 7th station"

curl -X POST 'https://api.luniverse.io/tx/v1.0/transactions/getReturnInfo10' \
    --header 'Authorization: Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD' \
    --header 'Content-Type: application/json' \
    --data '{
           "from": "0xaf55306cbd1dc71b73a9545f6fe760373fb5687b",
           "inputs": {
               "addr": "0xaf55306cbd1dc71b73a9545f6fe760373fb5687b"
           }
       }'



sleep 3
echo ""
echo ""
echo "giveIncentive(userAddr, 15, 100)"

curl -X POST 'https://api.luniverse.io/tx/v1.0/transactions/giveIncentive10' \
    --header 'Authorization: Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD' \
    --header 'Content-Type: application/json' \
    --data '{
           "from": "0x7f9e54d53549ba46dbe32ab39fd5fee3fd7cbe78",
           "inputs": {
               "receiver": "0xaf55306cbd1dc71b73a9545f6fe760373fb5687b",
               "amount": "15",
               "timestamp": "100"
           }
       }'




sleep 3
echo ""
echo ""
echo "balanceOf(userAddr): expect +15"

curl -X POST 'https://api.luniverse.io/tx/v1.0/transactions/balanceOf10' \
    --header 'Authorization: Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD' \
    --header 'Content-Type: application/json' \
    --data '{
           "from": "0xaf55306cbd1dc71b73a9545f6fe760373fb5687b"
       }'



sleep 3
echo ""
echo ""
echo "balanceOf(owner): expect -15"

curl -X POST 'https://api.luniverse.io/tx/v1.0/transactions/balanceOf10' \
    --header 'Authorization: Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD' \
    --header 'Content-Type: application/json' \
    --data '{
           "from": "0x7f9e54d53549ba46dbe32ab39fd5fee3fd7cbe78"
       }'



sleep 3
echo ""
echo ""
echo "getRecord(userAddr): expect 0,1,2 / 5,10,15 / 10,20,100"

curl -X POST 'https://api.luniverse.io/tx/v1.0/transactions/getRecord10' \
    --header 'Authorization: Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD' \
    --header 'Content-Type: application/json' \
    --data '{
           "from": "0xaf55306cbd1dc71b73a9545f6fe760373fb5687b",
           "inputs": {
               "addr": "0xaf55306cbd1dc71b73a9545f6fe760373fb5687b"
           }
       }'


echo "finish"
echo ""































































