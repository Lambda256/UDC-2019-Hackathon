<html>
<head>
<title>?</title>

<script src="https://sw91.net/devops/js-test/waykiBridge.js"></script>
<script type="text/JavaScript" src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=31c23088fddc016694c85d0f42dd0c8d"></script>
<script type="text/javascript">
    document.addEventListener("DOMContentLoaded", function() {
        function getLocation(position) {

            var latitud = position.coords.latitude;
            var longitude = position.coords.longitude;

            var mapContainer = document.getElementById("map")    // 지도를 표시할 DIV
            var mapOption = {
                  center : new daum.maps.LatLng(latitud, longitude)    // 지도의 중심좌표
                , level : 3    // 지도의 확대레벨
            };

            // 지도를 생성
            var map = new daum.maps.Map(mapContainer, mapOption);

            // 마커가 표시될 위치
            var markerPosition = new daum.maps.LatLng(latitud, longitude);

            // 마커를 생성
            var marker = new daum.maps.Marker({ position:markerPosition });

            marker.setMap(map);
        }

        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getLocation, function(error) {
                consol.log(error.message);
            });
        } else {
            consol.log("Geolocation을 지원하지 않는 브라우저 입니다.");
        }
    });
</script>
</head>
<body>
    <div id="map" style="width:500px;height:200px;"></div>
    <div id="wayki" class="inner">
      <span id="address"></span>
      <!--
      <?php
        echo '<span id="server_user1">'.$_SERVER['HTTP_USER_AGENT'].'</span><br>';
        echo '<span id="server_user2">'.$_SERVER['REMOTE_ADDR'].'</span><br>';
      ?>
      -->
      <span id="yourname" name="collaterals"><?php echo '{"IP": "'.$_SERVER['REMOTE_ADDR'].'", "USER_AGENT": "'.$_SERVER['HTTP_USER_AGENT'].'"}';?></span>

      <script type="text/javascript">
        jQuery(document).ready(function() {

            // Geolocation 객체를 사용
            if(navigator.geolocation) {

                navigator.geolocation.getCurrentPosition(function(position) {
                    var latitude = position.coords.latitude;
                    var longitude = position.coords.longitude;

                    jQuery('<span id="yourquote">').html('{"Latitude": "' + latitude + '", "Longitude": "' + longitude + '"}</span><br>').prependTo(".inner");
                });
            }
        });
      </script>
    </div>
    <div id="wayki_post">
      <button onclick="addName()">트랜젝션</button>
      <br>
      <span id="saved"></span>
      <span id="txid"></span>
    </div>
    <!--
    <div id="wayki_get">
      <input id="key"></span>
      <br>
      <button onclick="callName()">트랜젝션 검색하기</button>
      <span id="key2"></span>
    </div>
    -->
</body>

<script>
    // call wallet address
    window.onload = function callAddress() {
        waykiBridge.walletPlugin(
            "getAddressInfo",
            {},
            function (res) {
                console.log(res)
                console.log(res.result.account.testnetAddress)
                document.getElementById("address").innerHTML =
                    `${res.result.account.testnetAddress}<br>`
            },
            function (err) {
                console.log(err)
                document.getElementById('address').innerHTML = `웨이키체인 지갑을 설치해주세요.<br>`
            });
    }

    // add name to contract data
    function addName() {
        var yourname = document.getElementById("yourname").innerHTML;
        var nameLen = document.getElementById("yourname").innerHTML.length;
        console.log(yourname);
        console.log(nameLen);

        var yourquote = document.getElementById("yourquote").innerHTML;
        var ageLen = document.getElementById("yourquote").innerHTML.length;
        console.log(yourquote);
        console.log(nameLen, yourname, ageLen, yourquote);
        console.log(convertToHex(nameLen, yourname, ageLen, yourquote));

        waykiBridge.walletPlugin(
            "walletPluginContractInvoke",

            {
                regId: "1107942-2",
                contractField: convertToHex(nameLen, yourname, ageLen, yourquote),
                inputAmount: "",
                remark: ""

            },
            function (res) {
                function timer() {
                    document.getElementById('saved').innerHTML = `스컨 고고고썽공2`
                }

                function timer2() {
                    document.getElementById('saved').innerHTML = `스컨 고고고썽공2`
                }
                if (res.result.txid){
                    document.getElementById('txid').innerHTML = `스컨 중......`
                    setTimeout(timer, 2000);

                    document.getElementById('txid').innerHTML = `${res.result.txid}`
                    document.getElementById('key').innerHTML = `${res.result.txid}`

                }else{
                    document.getElementById('txid').innerHTML = `스컨 실패, 지갑 설치하셨습니까?`
                }

                console.log(res)
                console.log(res.result.txid)

            },
            function (err) {
                console.log(err)
            }
        );

        setTimeout(function() {
        var aaa = document.getElementById("yourname").innerHTML;
        var bbb = document.getElementById("txid").innerHTML;
    			$.ajax({
    				type: 'POST',
    	            url: './sql.php',
    				data: {collaterals: aaa, hashs: bbb}
    			}).done(function( msg ) {
    				//alert( '결과 : ' + msg );
    			});
        },3000);
    }

    // call contract to get your name
    function callName() {
        // get values from input
        let key2 = document.getElementById("key").value
        console.log(key2)

        document.getElementById("key2").innerHTML = `트랜젝션 뒤지는중....`
        // use the baas api to post json data to get data from contract
        postData('https://baas-test.wiccdev.org/v2/api/transaction/gettxdetail',
            {
                "hash": key2
            })
        // return data and display data
            .then(function (data) {
                console.log(data.data.addr)

                if (JSON.stringify(data.data.key)){
                    JSON.stringify(document.getElementById("key2").innerHTML =
                        `<br>아이피|제품명 : ${data.data.key}<br>트랜젝션 위치기록(decode) : ${data.data.value}`);
                    console.log(JSON.stringify(data.data.value))
                }else{
                    document.getElementById("key2").innerHTML = `아이피|제품명으로 조회된게 없습니다.`
                }


                console.log(JSON.stringify(data));

            })
            .catch(error =>
                console.error(error));
    }


    function postData(url = '', data = {}) {
        // Default options are marked with *
        return fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
            .then(response => response.json()); // parses JSON response into native JavaScript objects
    }

    //convert name and age and lengths into hex
    function convertToHex(num1, str1, num2, str2) {
        var hex1 = '';
        var hex2 = '';
        var hex3 = '';
        var hex4 = '';

        // for number or decemals
        hex1 = (num1 + 0x10000).toString(16).substr(-2).toLowerCase() + "000000";
        console.log(hex1);

        for (var i = 0; i < str1.length; i++) {
            hex2 += '' + str1.charCodeAt(i).toString(16);
            console.log(hex2);
        }
        hex3 = (num2 + 0x10000).toString(16).substr(-2).toLowerCase() + "000000";
        console.log(hex3);

        for (var i = 0; i < str2.length; i++) {
            hex4 += '' + str2.charCodeAt(i).toString(16);
            console.log(hex4);
        }
        return hex1 + hex2 + hex3 + hex4;
    }

    function post_to_url(path, params, method) {
        method = method || "post"; // 전송 방식 기본값을 POST로


        var form = document.createElement("form");
        form.setAttribute("method", method);
        form.setAttribute("action", path);

        //히든으로 값을 주입시킨다.
        for(var key in params) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }

        document.body.appendChild(form);
        form.submit();
    }
</script>

</html>
