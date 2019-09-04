/*
 * Transactions
 */
 var version = '3';

/*
 * 유저가 자전거를 하나 빌린다
 * 유저가 기본 렌트비를 지불
 */
function rentBike(from, stationID, time) {
  var querydata = '{"from": "' + from + '", "inputs": {"stationID": "' + stationID + '", "rentTime": "' + time + '"}}'
  console.log("Rent Bike", querydata);
  return $.ajax({
      url: "https://api.luniverse.net/tx/v1.0/transactions/rentBike" + version,
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer SfnBZUboFmWwav6CkYJrkyEQGp77qLJzhQ4hcmumhd8CYbp7z9hiRDex7jDaLgvr');
      },
      type: 'POST',
      contentType: 'application/json',
      processData: false,
      data: querydata,
      success: function (data) {
        console.log(JSON.stringify(data));
        alert("결제가 완료되었습니다.");
        document.getElementById("modal-example").style.display = "none";
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
function returnBike(from, stationID, time) {
  var querydata = '{"from": "' + from + '", "inputs": {"stationID": "' + stationID + '", "returnTime": "' + time + '"}}'
  console.log("Return Bike", querydata);
  return $.ajax({
      url: "https://api.luniverse.net/tx/v1.0/transactions/returnBike" + version,
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer SfnBZUboFmWwav6CkYJrkyEQGp77qLJzhQ4hcmumhd8CYbp7z9hiRDex7jDaLgvr');
      },
      type: 'POST',
      contentType: 'application/json',
      processData: false,
      data: querydata,
      success: function (data) {
        console.log(JSON.stringify(data));
        alert("반납에 성공했습니다.");
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
function approve(from, amount, spender) {
  var querydata = '{"from": "' + from + '", "inputs": {"valueAmount": "' + amount + '", "spender": "' + spender + '"}}'
  console.log("Approve", querydata);
  return $.ajax({
      url: "https://api.luniverse.net/tx/v1.0/transactions/approve",
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer SfnBZUboFmWwav6CkYJrkyEQGp77qLJzhQ4hcmumhd8CYbp7z9hiRDex7jDaLgvr');
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
function allowance(from, owner, spender) {
  var querydata = '{"from": "' + from + '", "inputs": {"owner": "' + owner + '", "spender": "' + spender + '"}}'
  console.log("Allowance", querydata);
  return $.ajax({
      url: "https://api.luniverse.net/tx/v1.0/transactions/allowance",
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer SfnBZUboFmWwav6CkYJrkyEQGp77qLJzhQ4hcmumhd8CYbp7z9hiRDex7jDaLgvr');
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
function balanceOf(from, owner) {
  var querydata = '{"from": "' + from + '", "inputs": {"owner": "' + owner + '"}}';
  console.log("balanceOf", querydata);
  return $.ajax({
      url: "https://api.luniverse.net/tx/v1.0/transactions/balanceOf",
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer SfnBZUboFmWwav6CkYJrkyEQGp77qLJzhQ4hcmumhd8CYbp7z9hiRDex7jDaLgvr');
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
function getRecord(from, addr) {
  var querydata = '{"from": "' + from + '", "inputs": {"addr": "' + addr + '"}}'
  console.log("getRecord", querydata);
  return $.ajax({
      url: "https://api.luniverse.net/tx/v1.0/transactions/getRecord" + version,
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer SfnBZUboFmWwav6CkYJrkyEQGp77qLJzhQ4hcmumhd8CYbp7z9hiRDex7jDaLgvr');
      },
      type: 'POST',
      contentType: 'application/json',
      processData: false,
      data: querydata,
      success: function (data) {
        //console.log(JSON.stringify(data));
        //alert("SUCCESS");
      },
      error: function(code) {
        console.log(code);
        alert("FAIL");
      }
  });
}

/*
 * 대여 시간 확인
 * 0 - 대여X
 * Else - 대여시간
 */
function rentTime(from, addr) {
  var querydata = '{"from": "' + from + '", "inputs": {"": "' + addr + '"}}'
  console.log("getRecord", querydata);
  return $.ajax({
      url: "https://api.luniverse.net/tx/v1.0/transactions/rentTimes" + version,
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer SfnBZUboFmWwav6CkYJrkyEQGp77qLJzhQ4hcmumhd8CYbp7z9hiRDex7jDaLgvr');
      },
      type: 'POST',
      contentType: 'application/json',
      processData: false,
      data: querydata,
      success: function (data) {
        //console.log(JSON.stringify(data));
        //alert("SUCCESS");
      },
      error: function(code) {
        console.log(code);
        alert("FAIL");
      }
  });
}
