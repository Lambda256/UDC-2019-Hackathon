<?php
include_once('./_common.php');
include_once("/phpqrcode/qrlib.php");

// 테마에 mypage.php 있으면 include
if(defined('G5_THEME_SHOP_PATH')) {
    $theme_mypage_file = G5_THEME_MSHOP_PATH.'/mytoken.php';
    if(is_file($theme_mypage_file)) {
        include_once($theme_mypage_file);
        return;
        unset($theme_mypage_file);
    }
}

$g5['title'] = '콜승인';
include_once(G5_MSHOP_PATH.'/_head.php');

// 쿠폰
$cp_count = 0;
$sql = " select cp_id
            from {$g5['g5_shop_coupon_table']}
            where mb_id IN ( '{$member['mb_id']}', '전체회원' )
            and cp_start <= '".G5_TIME_YMD."'
            and cp_end >= '".G5_TIME_YMD."' ";
$res = sql_query($sql);

for($k=0; $cp=sql_fetch_array($res); $k++) {
    if(!is_used_coupon($member['mb_id'], $cp['cp_id']))
        $cp_count++;
}
?>

<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
<link rel="stylesheet" href="/css/w3.css">
<script src="https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js"></script>
<script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=31c23088fddc016694c85d0f42dd0c8d&libraries=services,clusterer"></script>

<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script>
window.onload = function move() {
  var elem = document.getElementById("myBar");   
  var width = 1;
  var id = setInterval(frame, 200);
  function frame() {
    if (width >= 100) {
      clearInterval(id);
      document.getElementById('button_ratings').style.display = 'none';
      document.getElementById('ratings').style.display = 'block';
      location.href="/";
    } else {
      width++; 
      elem.style.width = width + '%'; 
      elem.innerHTML = width * 1  + '%';
    }
  }
}

    function rating_num(num) {
        var user_address = '0x844277191d081be33d9449a398056bdad0d9f89a';
        var plus_rate = num;
        var user_class = 2;
        var abc = user_address + '/' + plus_rate + '/' + user_class;

        //alert( '결과 : ' + abc );

        $.ajax({
            type: 'POST',
            url: '/backand_get.php',
            data: {what: 'insertRate', parameter: abc}
        }).done(function( msg ) {
            alert( '결과 : ' + msg );
            document.getElementById('button_ratings').style.display = 'none';
            document.getElementById('ratings').style.display = 'block';

            $.ajax({
            type: 'POST',
            url: '/backand_get.php',
            data: {what: 'getRate', parameter: user_address}
        }).done(function( msg ) {
            alert( '결과 : ' + user_address );
            document.getElementById('driver_tx').innerHTML = '<span class="address"><b>' + user_address + ' </b></span>';
            document.getElementById('driver_rating').innerHTML = '<b>' + msg + ' 점</b>';
        });

        });
    }

</script>

<style type="text/css">
.address {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 120px;
    color:#0b66ff;
    right:20px;
}
.driver_tx {
    color:#0b66ff;
}
.user_tx {
    color:#0b66ff;
}
.my_pocou_calling{padding:10px 5px;background:#fff}
.my_pocou_calling li{position:relative;padding:0 10px;line-height:30px;border-bottom: 1px solid #efefef;font-size:1.2em}
.my_pocou_calling span{position:absolute;top:0;right:10px;font-size:0.8em } 
.my_pocou_calling p{position:absolute;top:0;right:20px;} 

select { 
    width: 100%; /* 원하는 너비설정 */ 
    padding: .4em .4em; /* 여백으로 높이 설정 */ 
    font-family: inherit; /* 폰트 상속 */ 
    background: url(https://farm1.staticflickr.com/379/19928272501_4ef877c265_t.jpg) no-repeat 95% 50%; /* 네이티브 화살표 대체 */ 
    border: 1px solid #999; 
    border-radius: 0px; /* iOS 둥근모서리 제거 */ 
    -webkit-appearance: none; /* 네이티브 외형 감추기 */ 
    -moz-appearance: none; 
    appearance: none; 
}

button {
    font-size:0.8em;
    height:55px;
    width:30%;
}


label, input { display:block;  }
input.text { margin-bottom:12px; width:100%; padding: .4em; }
fieldset { padding:0; border:0; margin-top:25px; }
</style>


<div id="smb_my">

    <section id="smb_my_ov">
        <h2>회원정보 개요</h2>
        <ul class="my_pocou_calling">
        <div id="button_ratings">
        <br><li class="my_cou">
                        <center><button onclick="rating_num(100);">별로에요!</button>　<button onclick="rating_num(300);">😳<br>좋았어요</button>　<button onclick="rating_num(500);">😍<br>아주 최고!</button></center>
                        </li>
            <br><li class="my_cou">
                        <center><b>'함께 탑승하신분과 기사분에게 평점으로 전달됩니다.'</b></center>
                        </li>
            </div>
            <br><li class="my_cou">
                        <div class="w3-light-grey w3-round-xlarge">
                        <div id="myBar" class="w3-container w3-blue w3-round-xlarge" style="width:1%">1%</div>
                        </li>
            <br><li class="my_cou">
                        <center><b>'타타타는 승객은 물론, 소중한 가치를 함께 태웁니다'</b></center>
                        </li>
            <div id="ratings">
            <br><br><li class="my_cou">
                        [기사님의 매너 평균]
                            <span id="driver_rating"></span>
                        </li>
            <br><li class="my_cou">
                        　　
                            <span id="driver_tx"></span>
                        </li>
            </div>
    </section>

    <script>
    
        $(".btn_op_area").on("click", function() {
            $(".my_info").toggle();
            $(".fa-caret-down").toggleClass("fa-caret-up")
        });

    </script>
</div>

<?php
include_once(G5_MSHOP_PATH.'/_tail.php');
?>