<?php
include_once('./_common.php');

define("_INDEX_", TRUE);

include_once(G5_THEME_MSHOP_PATH.'/shop.head.php');
?>

<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<link rel="stylesheet" href="/resources/demos/style.css">
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=31c23088fddc016694c85d0f42dd0c8d"></script>
<script type="text/javascript">
    document.addEventListener("DOMContentLoaded", function() {
        function getLocation(position) {

            var latitud = position.coords.latitude;
            var longitude = position.coords.longitude;

            var mapContainer = document.getElementById("map")    // 지도를 표시할 DIV
            var mapOption = {
                center : new daum.maps.LatLng(latitud, longitude),    // 지도의 중심좌표
                draggable: false, // 지도를 생성할때 지도 이동 및 확대/축소를 막으려면 draggable: false 옵션을 추가하세요
                level : 3    // 지도의 확대레벨
            };

            //document.getElementById("ming2").innerHTML = `위도? : ${latitud} 경도? : ${longitude}`;
            //document.getElementById("ming2").innerHTML = ``;

            // 지도를 생성
            var map = new daum.maps.Map(mapContainer, mapOption);

            // 마커가 표시될 위치
            var markerPosition = new daum.maps.LatLng(latitud, longitude);

            // 마커를 생성
            var marker = new daum.maps.Marker({ position:markerPosition });

            marker.setMap(map);
        }

        function setDraggable(draggable) {
            // 마우스 드래그로 지도 이동 가능여부를 설정합니다
            map.setDraggable(draggable);    
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
<script>
$( function() {
$( "#dialog" ).dialog({
    autoOpen: false,
    show: {
    effect: "blind",
    duration: 1000
    },
    hide: {
    effect: "explode",
    duration: 1000
    }
});

$( "#opener" ).on( "click", function() {
    $( "#dialog" ).dialog( "open" );
});
} );
</script>
<script><?php echo $member['mb_1'] ?>

    $(document).ready(function backand_get_balance() {
        var aaa = document.getElementById("ming1").innerHTML;

        $.ajax({
            type: 'POST',
            url: '/backand_get.php',
            data: {what: 'balance', parameter: aaa}
        }).done(function( msg ) {
            document.getElementById("ming3").innerHTML = msg + ` TA`
        });
    })

    // call contract to get your name
    function callName2() {
        // get values from input
        let key2 = document.getElementById("ming1").value
        console.log(key2)

        document.getElementById("ming1").innerHTML = `트랜젝션 뒤지는중....`
        // use the baas api to post json data to get data from contract
        postData('https://api.luniverse.io/tx/v1.0/transactions/like',
            {
                "inputs": {
                    "receiverAddress": "0xCA887cdf492E79D722F2dD256aF7cfDfcED047c9",
                    "valueAmount": 10
                }
            })
        // return data and display data
            .then(function (data) {
                console.log(data.data.addr)

                if (JSON.stringify(data.data.key)){
                    JSON.stringify(document.getElementById("ming1").innerHTML =
                        `<br>아이피|제품명 : ${data.data.key}<br>트랜젝션 위치기록(decode) : ${data.data.value}`);
                    console.log(JSON.stringify(data.data.value))
                }else{
                    document.getElementById("ming1").innerHTML = `아이피|제품명으로 조회된게 없습니다.`
                }


                console.log(JSON.stringify(data));

            })
            .catch(error =>
                console.error(error));
    }

    // call contract to get your name
    function callName() {
        // get values from input
        let key2 = document.getElementById("ming1").value
        console.log(key2)

        // document.getElementById("ming1").innerHTML = `트랜젝션 뒤지는중....`
        // use the baas api to post json data to get data from contract
        getData('https://api.luniverse.io/tx/v1.0/wallets/<?php echo $member['mb_1'] ?>/FT9754/R0842/balance')
        // return data and display data
            .then(function (data) {
                console.log(data.data.addr)
                if (JSON.stringify(data.data.balance)){
                    JSON.stringify(document.getElementById("ming3").innerHTML =
                        `${data.data.balance} TA`);
                    console.log(JSON.stringify(data.data.balance))
                }else{
                    document.getElementById("ming1").innerHTML = `아이피|제품명으로 조회된게 없습니다.`
                }

                console.log(JSON.stringify(data));

            })
            .catch(error =>
                console.error(error));
    }

    function getData(url = '') {
        // Default options are marked with *
        return fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer FrGLHqhQX3KycFfKAyUmVg85HXQAzZjz4pbfPbZufiRXfSHEp5GdkWg3yJsLJKRy'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer' // no-referrer, *client // body data type must match "Content-Type" header
        })
            .then(response => response.json()); // parses JSON response into native JavaScript objects
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
                'Authorization': 'Bearer FrGLHqhQX3KycFfKAyUmVg85HXQAzZjz4pbfPbZufiRXfSHEp5GdkWg3yJsLJKRy'
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
<script src="<?php echo G5_JS_URL; ?>/swipe.js"></script>
<script src="<?php echo G5_JS_URL; ?>/shop.mobile.main.js"></script>

<center><div id="map" style="width:auto;height:100px;"></div></center>

<ul id="ol_after_private">
    <li id="ol_after_memo">
        <a href="<?php echo G5_SHOP_URL; ?>/mycall.php">
            <img src="<?php echo G5_THEME_MSHOP_URL ?>/img/1.png" width="100px" height="100px"><br>
            <strong>택시</strong>
        </a>
    </li>
    <li id="ol_after_pt">
        <a href="#">
        <img src="<?php echo G5_THEME_MSHOP_URL ?>/img/2.png" width="100px" height="100px"><br>
            <strong>버스</strong>
        </a>
    </li>
    <li id="ol_after_pt">
        <a href="#">
        <img src="<?php echo G5_THEME_MSHOP_URL ?>/img/3.png" width="100px" height="100px"><br>
            <strong>기타 모빌리티</strong>
        </a>
    </li>
    <li id="ol_after_pt">
        <a href="<?php echo G5_BBS_URL ?>/board.php?bo_table=notice">
        <img src="<?php echo G5_THEME_MSHOP_URL ?>/img/4.png" width="100px" height="100px"><br>
            <strong>공지사항</strong>
        </a>
    </li>
    <li id="ol_after_pt">
        <div id="dialog" title="<?php echo $member['mb_nick'] ?> 님의 타타타 지갑주소 입니다!">
            <p><img src="https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=<?php echo $member['mb_1'] ?>"><br><?php echo $member['mb_1'] ?></p>
        </div>
        <a id="opener">
        <img src="<?php echo G5_THEME_MSHOP_URL ?>/img/5.png" width="100px" height="100px" ><br>
            <strong id="ming3">0 TA</strong>
            <i class="fa fa-cog fa-spin fa-3x fa-fw" onclick="backand_get_balance();"></i>
        </a>
    </li>
    <li>
        <a href="<?php echo G5_SHOP_URL; ?>/myshop.php">
        <img src="<?php echo G5_THEME_MSHOP_URL ?>/img/6.png" width="100px" height="100px"><br>
        <strong>타타만의 SHOP</strong>
        </a>
    </li>
</ul>

<?php echo display_banner('메인', 'mainbanner.10.skin.php'); ?>

<?php echo display_banner('왼쪽', 'boxbanner.skin.php'); ?>

<?php include_once(G5_MSHOP_SKIN_PATH.'/main.event.skin.php'); // 이벤트 ?>

<?php
include_once(G5_THEME_MSHOP_PATH.'/shop.tail.php');
?>