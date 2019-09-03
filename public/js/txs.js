/*
 * Transactions
 */

/*
 * 유저가 자전거를 하나 빌린다
 * 유저가 기본 렌트비를 지불
 */
function rentBike(stationID, time) {
  var querydata = '{"from": "0xaf55306cbd1dc71b73a9545f6fe760373fb5687b", "inputs": {"stationID": "' + stationID + '", "rentTime": "' + time + '"}}'
  console.log("Rent Bike", querydata);
  return $.ajax({
      url: "https://api.luniverse.io/tx/v1.0/transactions/rentBike10",
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD');
      },
      type: 'POST',
      contentType: 'application/json',
      processData: false,
      data: querydata,
      success: function (data) {
        console.log(JSON.stringify(data));
        //alert("SUCCESS");
      },
      error: function(code) {
        console.log(code);
        alert("FAIL");
      }
  });
}

/*
 * 유저가 자전거를 반납한다
 * bikeNums[stationID]++
 * returnInfo[userAddress] = [stationID, bikeNumAfterReturn, 이용시간]   (int list)
 * 유저가 추가 렌트비만큼 토큰을 전송함
 * 인센티브 계산을 위해 requestInference()를 콜함 (아래에서 이어짐)
 */
function returnBike(stationID, time) {
  var querydata = '{"from": "0xaf55306cbd1dc71b73a9545f6fe760373fb5687b", "inputs": {"stationID": "' + stationID + '", "rentTime": "' + time + '"}}'
  console.log("Return Bike", querydata);
  return $.ajax({
      url: "https://api.luniverse.io/tx/v1.0/transactions/returnBike10",
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD');
      },
      type: 'POST',
      contentType: 'application/json',
      processData: false,
      data: querydata,
      success: function (data) {
        console.log(JSON.stringify(data));
        //alert("SUCCESS");
      },
      error: function(code) {
        console.log(code);
        alert("FAIL");
      }
  });
}

/*
 * 유저가 이 트젝을 보내 컨트렉에게 user의 돈을 움직일 권한을 줌
 */
function approve(contractAddr, amount) {
  var querydata = '{"from": "0xaf55306cbd1dc71b73a9545f6fe760373fb5687b", "inputs": {"valueAmount": "' + amount + '", "spender": "' + contractAddr + '"}}'
  console.log("Approve", querydata);
  return $.ajax({
      url: "https://api.luniverse.io/tx/v1.0/transactions/approve",
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD');
      },
      type: 'POST',
      contentType: 'application/json',
      processData: false,
      data: querydata,
      success: function (data) {
        console.log(JSON.stringify(data));
        //alert("SUCCESS");
      },
      error: function(code) {
        console.log(code);
        alert("FAIL");
      }
  });
}

/*
 * 컨트렉이 돈을 움직일 권한을 받았는지 확인
 */
function allowance(userAddr, contractAddr) {
  var querydata = '{"from": "0x7f9e54d53549ba46dbe32ab39fd5fee3fd7cbe78", "inputs": {"owner": "' + userAddr + '", "spender": "' + contractAddr + '"}}'
  console.log("Allowance", querydata);
  return $.ajax({
      url: "https://api.luniverse.io/tx/v1.0/transactions/allowance",
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD');
      },
      type: 'POST',
      contentType: 'application/json',
      processData: false,
      data: querydata,
      success: function (data) {
        console.log(JSON.stringify(data));
        //alert("SUCCESS");
      },
      error: function(code) {
        console.log(code);
        alert("FAIL");
      }
  });
}

/*
 * 잔고 확인
 */
function balanceOf() {
  var querydata = '{"from": "0x7f9e54d53549ba46dbe32ab39fd5fee3fd7cbe78"}'
  console.log("balanceOf", querydata);
  return $.ajax({
      url: "https://api.luniverse.io/tx/v1.0/transactions/balanceOf10",
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD');
      },
      type: 'POST',
      contentType: 'application/json',
      processData: false,
      data: querydata,
      success: function (data) {
        console.log(JSON.stringify(data));
        //alert("SUCCESS");
        return data;
      },
      error: function(code) {
        console.log(code);
        alert("FAIL");
      }
  });
}

/*
 * 활동 내역 확인
 * 0 - 5원 렌트비 at 10초
 * 1 - 10원 추가 렌트비 at 20초
 * 2 - 15원 인센티브 at 100초
 */
function getRecord() {
  var querydata = '{"from": "0xaf55306cbd1dc71b73a9545f6fe760373fb5687b", "inputs": {"addr": "0xaf55306cbd1dc71b73a9545f6fe760373fb5687b"}}'
  console.log("getRecord", querydata);
  return $.ajax({
      url: "https://api.luniverse.io/tx/v1.0/transactions/getRecord10",
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer svYmBRtMt1W2mVYwdkKR9KPuxA65sdqqzg2rcduy2Yerg2wX7jzxX6NP8ceUbpVD');
      },
      type: 'POST',
      contentType: 'application/json',
      processData: false,
      data: querydata,
      success: function (data) {
        console.log(JSON.stringify(data));
        //alert("SUCCESS");
      },
      error: function(code) {
        console.log(code);
        alert("FAIL");
      }
  });
}
