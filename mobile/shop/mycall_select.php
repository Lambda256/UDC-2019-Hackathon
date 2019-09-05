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
      location.href="/mobile/shop/mycalling.php";
    } else {
      width++; 
      elem.style.width = width + '%'; 
      elem.innerHTML = width * 1  + '%';
    }
  }
}

function insertContract() {
        var abc = '00001/123123';

        //alert( '결과 : ' + abc );

        $.ajax({
            type: 'POST',
            url: '/backand_get.php',
            data: {what: 'insertContract', parameter: abc}
        }).done(function( msg ) {
            alert( '결과 : ' + msg );
            location.href="/mobile/shop/mycall_ok.php";
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
.payment {
    color:#FF4848;
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
    width:45%;
}


label, input { display:block;  }
input.text { margin-bottom:12px; width:100%; padding: .4em; }
fieldset { padding:0; border:0; margin-top:25px; }
</style>

<div id="smb_my">

    <section id="smb_my_ov">
        <h2>회원정보 개요</h2>
        <ul class="my_pocou_calling">
            <br><li class="my_cou">
                        <center><img src="<?php echo G5_THEME_MSHOP_URL ?>/img/3-2.png" width="100%" height="50%;"></center>
                        </li>
                        <br>
            <center><div id="map" style="width:auto;height:250px;"></div></center>                        
            <br><li class="my_cou">
                        [A 탑승자 출발지]
                            <span id="a1"></span>
                        </li>
            <br><li class="my_cou">
                        [B 탑승자 출발지]
                            <span id="a2"></span>
                        </li>
            <br><li class="my_cou">
                        [첫번째 도착지]
                            <span id="a3"></span>
                        </li>
            <br><li class="my_cou">
                        [두번째 도착지]
                            <span id="a4"></span>
                        </li>
            <br><br><li class="my_cou">
                        [드라이버 기사님]
                            <span id="a5"></span>
                        </li>
            <br><li class="my_cou">
                        [기사님의 차종과 번호]
                            <span id="a6">람보르기니 ( 45주 4568 )</span>
                        </li>
            <br><li class="my_cou">
                        [예상가격]
                            <span id="a7">198,000원 ~ 220,000원</span>
                        </li>
            <br><li class="my_cou">
                        [A 탑승자]
                            <span id="a8">73,260원 ~ 89,540원</span>
                        </li>
            <br><li class="my_cou">
                        [B 탑승자]
                            <span id="a9">124,740원 ~ 152,460원</span>
                        </li>
            <br><li class="my_cou">
                        <div class="w3-light-grey w3-round-xlarge">
                        <div id="myBar" class="w3-container w3-blue w3-round-xlarge" style="width:1%">1%</div>
                        </li>
            <br><li class="my_cou">
                        <center><b>'타타타는 승객은 물론, 소중한 가치를 함께 태웁니다'</b></center>
                        </li>
            <br><li class="my_cou">
                        <center><button onclick="insertContract();"> 좋아요! 함께 타타타!</button>　<a href="<?php echo G5_SHOP_URL; ?>/mycalling.php"><button>다른분과 함께 하겠어요</button></a></center>
                        </li></a>
        </ul>
    </section>

    <script>
    
        $(".btn_op_area").on("click", function() {
            $(".my_info").toggle();
            $(".fa-caret-down").toggleClass("fa-caret-up")
        });

    </script>

    <!--
    <section id="smb_my_od">
        <h2>여름이니깐</h2>
        <?php
        // 최근 주문내역
        define("_ORDERINQUIRY_", true);

        $limit = " limit 0, 5 ";
        include G5_MSHOP_PATH.'/orderinquiry.sub.php';
        ?>
        <a href="<?php echo G5_SHOP_URL; ?>/orderinquiry.php" class="btn_more">더보기</a>
    </section>

    <section id="smb_my_od">
        <h2><a href="<?php echo G5_SHOP_URL; ?>/orderinquiry.php">최근 주문내역_mobile_shop_mypage</a></h2>
        <?php
        // 최근 주문내역
        define("_ORDERINQUIRY_", true);

        $limit = " limit 0, 5 ";
        include G5_MSHOP_PATH.'/orderinquiry.sub.php';
        ?>
        <a href="<?php echo G5_SHOP_URL; ?>/orderinquiry.php" class="btn_more">더보기</a>
    </section>

    <section id="smb_my_wish" class="wishlist">
        <h2><a href="<?php echo G5_SHOP_URL; ?>/wishlist.php">최근 위시리스트</a></h2>

        <ul>
            <?php
            $sql = " select *
                       from {$g5['g5_shop_wish_table']} a,
                            {$g5['g5_shop_item_table']} b
                      where a.mb_id = '{$member['mb_id']}'
                        and a.it_id  = b.it_id
                      order by a.wi_id desc
                      limit 0, 6 ";
            $result = sql_query($sql);
            for ($i=0; $row = sql_fetch_array($result); $i++)
            {
                $image_w = 250;
                $image_h = 250;
                $image = get_it_image($row['it_id'], $image_w, $image_h, true);
                $list_left_pad = $image_w + 10;
            ?>

            <li>
                <div class="wish_img"><?php echo $image; ?></div>
                <div class="wish_info">
                    <a href="./item.php?it_id=<?php echo $row['it_id']; ?>" class="info_link"><?php echo stripslashes($row['it_name']); ?></a>
                     <span class="info_date"><?php echo substr($row['wi_time'], 2, 8); ?></span>
                </div>
            </li>

            <?php
            }

            if ($i == 0)
                echo '<li class="empty_list">보관 내역이 없습니다.</li>';
            ?>
        </ul>
         <a href="<?php echo G5_SHOP_URL; ?>/wishlist.php" class="btn_more">더보기</a>
    </section>
    -->

</div>

<script>
$(function() {
    $(".win_coupon").click(function() {
        var new_win = window.open($(this).attr("href"), "win_coupon", "left=100,top=100,width=700, height=600, scrollbars=1");
        new_win.focus();
        return false;
    });
});

function member_leave()
{
    return confirm('정말 회원에서 탈퇴 하시겠습니까?')
}
</script>

<div id="map" style="width:100%;height:350px;"></div>
<script>
var mapContainer = document.getElementById('map'), // 지도를 표시할 div  
    mapOption = { 
        center: new kakao.maps.LatLng(37.44090650590058, 126.58695501242975), // 지도의 중심좌표
        level: 10 // 지도의 확대 레벨
    };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

var geocoder = new kakao.maps.services.Geocoder();

var coord = new kakao.maps.LatLng(37.440492295830225 , 126.45750039937958);
var callback = function(result, status) {
    if (status === kakao.maps.services.Status.OK) {
        console.log('그런 너를 마주칠까 ' + result[0].address.address_name + '을 못가');
        document.getElementById("a1").innerHTML = result[0].address.address_name;
    }
};

geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);

var geocoder = new kakao.maps.services.Geocoder();

var coord = new kakao.maps.LatLng(37.45885520267572 , 126.47709086944374);
var callback = function(result, status) {
    if (status === kakao.maps.services.Status.OK) {
        console.log('그런 너를 마주칠까 ' + result[0].address.address_name + '을 못가');
        document.getElementById("a2").innerHTML = result[0].address.address_name;
    }
};

geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);

var geocoder = new kakao.maps.services.Geocoder();

var coord = new kakao.maps.LatLng(37.49284577967996, 126.49371951601016);
var callback = function(result, status) {
    if (status === kakao.maps.services.Status.OK) {
        console.log('그런 너를 마주칠까 ' + result[0].address.address_name + '을 못가');
        document.getElementById("a3").innerHTML = result[0].address.address_name;
    }
};

geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);

var geocoder = new kakao.maps.services.Geocoder();

var coord = new kakao.maps.LatLng(37.56910482939989, 126.67356022317252);
var callback = function(result, status) {
    if (status === kakao.maps.services.Status.OK) {
        console.log('그런 너를 마주칠까 ' + result[0].address.address_name + '을 못가');
        document.getElementById("a4").innerHTML = result[0].address.address_name;
    }
};

geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);

// 마커를 표시할 위치와 title 객체 배열입니다 
var positions = [
    {
        title: '카카오', 
        latlng: new kakao.maps.LatLng(37.440492295830225 , 126.45750039937958),
        iwContent: '<div style="padding:5px;">[A 탑승]나먼저!</div>',
        imageSrc: "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"
    },
    {
        title: '생태연못', 
        latlng: new kakao.maps.LatLng(37.45885520267572 , 126.47709086944374),
        iwContent: '<div style="padding:5px;">[B 탑승]너도타!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        imageSrc: "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"
    },
    {
        title: '텃밭', 
        latlng: new kakao.maps.LatLng(37.49284577967996, 126.49371951601016),
        iwContent: '<div style="padding:5px;">[A 목적지]내가먼저!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    	imageSrc: "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"
    },
    {
        title: '근린공원',
        latlng: new kakao.maps.LatLng(37.56910482939989, 126.67356022317252),
        iwContent: '<div style="padding:5px;">[B 목적지]마지막!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    	imageSrc: "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"
    }
];

// 마커 이미지의 이미지 주소입니다

for (var i = 0; i < positions.length; i ++) {
    
    var imageSrc =  positions[i].imageSrc;
    // 마커 이미지의 이미지 크기 입니다
    var imageSize = new kakao.maps.Size(24, 35); 
    
    // 마커 이미지를 생성합니다    
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
	var iwPosition = positions[i].latlng; //인포윈도우 표시 위치입니다

    // 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
        position : positions[i].latlng, 
        content : positions[i].iwContent
    });
    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커를 표시할 위치
        title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image : markerImage // 마커 이미지 
    });
    infowindow.open(map, marker);
}

</script>

<?php
include_once(G5_MSHOP_PATH.'/_tail.php');
?>