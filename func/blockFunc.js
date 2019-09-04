var Client = require('node-rest-client').Client;
var client = new Client();

// 블록체인에 후보자를 생성합니다. candidateid를 반환합니다.
module.exports.setCandidate = function(result) {
    var info = { 
        headers : {
            "Content-Type" : "application/json", 
            "Authorization" : "Bearer 234g9KRjrtLhynvKLeUg6KzSjitxakVsBJPzLUzcRDRp8Uuwx1nxKPyeBqC39cLo"
        },
        data : {
            "from" : "0xcd2adc4fc6806848f6dcc7b9fbb7ebc4549022cd"       // REOA user Account
        }
    }
        
    client.post("https://api.luniverse.net/tx/v1.0/transactions/setCandidate_v3", info, function(data, response){
        console.log(data);
        console.log("setCandidate 실행!");
    })
    // except 에러처리 핸들러
    client.on("error",function(err){
        // this will handle request exceptions and reponses with statusCode 500
        console.log("request error", err);
        result(err, null);
    })

    client.post("https://api.luniverse.net/tx/v1.0/transactions/getCandidate_v3", info, function(data, response){
        
        console.log(data);
        console.log(data.data.res[0]);
        result(null, data.data.res[0].toLocaleString());

        // console.log("res는");
        //console.log(response);

        console.log("getCandidate 실행!");
    })

    client.on("error",function(err){
        // this will handle request exceptions and reponses with statusCode 500
        console.log("request error", err);
        result(err, null);
    })

};

module.exports.setVote = function(candidateid, userId, result) {
    var info = {
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : "Bearer 234g9KRjrtLhynvKLeUg6KzSjitxakVsBJPzLUzcRDRp8Uuwx1nxKPyeBqC39cLo"
        },
        data : {
            "from" : "0xcd2adc4fc6806848f6dcc7b9fbb7ebc4549022cd",       // REOA user Account
            "inputs" : {
                "_candidateID" : candidateid,
                "_userName" : userId
            }
        }
    }

    client.post("https://api.luniverse.net/tx/v1.0/transactions/setVote_v3", info, function(data, response){
        console.log('setVote의 data');
        console.log(data);
        result(null, data.data);
    })

    client.on("error",function(err){
        // this will handle request exceptions and reponses with statusCode 500
        console.log("request error", err);
        result(err, null);
    })

};

module.exports.getCheckVoted = function(userId, result) {
    var info = { 
        headers : {
            "Content-Type" : "application/json", 
            "Authorization" : "Bearer 234g9KRjrtLhynvKLeUg6KzSjitxakVsBJPzLUzcRDRp8Uuwx1nxKPyeBqC39cLo"
        },
        data : {
            "from" : "0xcd2adc4fc6806848f6dcc7b9fbb7ebc4549022cd",       // REOA user Account
            "inputs" : {
                "_userName" : userId
            }
        }
    }

    client.post("https://api.luniverse.net/tx/v1.0/transactions/getCheckVoted_v3", info, function(data, response){
        console.log('getChecked data');
        console.log(data.data.res[0]);
        result(null, data.data.res[0]);
    })

    client.on("error",function(err){
        // this will handle request exceptions and reponses with statusCode 500
        console.log("request error", err);
        result(err, null);
    })
}