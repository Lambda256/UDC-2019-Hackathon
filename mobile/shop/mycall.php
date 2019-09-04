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

$g5['title'] = '탑승신청';
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
<script src="https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js"></script>
<script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=31c23088fddc016694c85d0f42dd0c8d&libraries=services,clusterer"></script>
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

            var geocoder = new kakao.maps.services.Geocoder();

            var coord = new kakao.maps.LatLng(latitud, longitude);
            var callback = function(result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    console.log('그런 너를 마주칠까 ' + result[0].address.address_name + '을 못가');
                    document.getElementById("address_go").value = `${result[0].address.address_name}`;
                }
            };

            geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
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

    function sample5_execDaumPostcode() {

        var geocoder = new kakao.maps.services.Geocoder();

            new daum.Postcode({
                oncomplete: function(data) {
                    var addr = data.address; // 최종 주소 변수

                    // 주소 정보를 해당 필드에 넣는다.
                    document.getElementById("sample5_address").value = addr;
                    // 주소로 상세 정보를 검색
                    geocoder.addressSearch(data.address, function(results, status) {
                        // 정상적으로 검색이 완료됐으면
                        if (status === daum.maps.services.Status.OK) {

                            var result = results[0]; //첫번째 결과의 값을 활용
                            console.log('그런 너를 마주칠까 ' + result[0] + '을 못가');

                            var mapContainer = document.getElementById("map")    // 지도를 표시할 DIV
                            var mapOption = {
                                center : new daum.maps.LatLng(result.y, result.x),    // 지도의 중심좌표
                                draggable: false, // 지도를 생성할때 지도 이동 및 확대/축소를 막으려면 draggable: false 옵션을 추가하세요
                                level : 3    // 지도의 확대레벨
                            };

                            // 지도를 생성
                            var map = new daum.maps.Map(mapContainer, mapOption);

                            // 마커가 표시될 위치
                            var markerPosition = new daum.maps.LatLng(result.y, result.x);

                            // 마커를 생성
                            var marker = new daum.maps.Marker({ position:markerPosition });

                            marker.setMap(map);
                                        }
                                    });
                                }
                            }).open();
    }

</script>

<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script>
$( function() {

    $( "#number" )
      .selectmenu()
      .selectmenu( "menuWidget" )
        .addClass( "overflow" );
  } );
} );
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

$( function() {
$( "#dialog2" ).dialog({
    height: "auto",
    width: 300,
    modal: true,
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

$( "#opener2" ).on( "click", function() {
    $( "#dialog2" ).dialog( "open" );
});
} );

$( function() {
$( "#dialog3" ).dialog({
    height: "auto",
    width: 300,
    modal: true,
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

$( "#opener3" ).on( "click", function() {
    $( "#dialog3" ).dialog( "open" );
});
} );

$( function() {
$( "#staking" ).dialog({
    height: "auto",
    width: 300,
    modal: true,
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

$( "#staking_opener" ).on( "click", function() {
    $( "#staking" ).dialog( "open" );
});
} );
</script>

<script>
    $(document).ready(function backand_get_balance() {
        var user_address = '<?php echo $member['mb_1'] ?>';
        var stake_address = '<?php echo $member['mb_2'] ?>';

        $.ajax({
            type: 'POST',
            url: '/backand_get.php',
            data: {what: 'balance', parameter: user_address}
        }).done(function( msg ) {
            document.getElementById("user_address_balance").innerHTML = msg + ` TA <i class="fa fa-cubes" aria-hidden="true" style="font-size:1.25em;">`
            
            $.ajax({
            type: 'POST',
            url: '/backand_get.php',
            data: {what: 'balance', parameter: stake_address}
        }).done(function( msg ) {
            document.getElementById("stake_address_balance").innerHTML = msg + ` TA <i class="fa fa-cubes" aria-hidden="true" style="font-size:1.25em;">`
        });
        });
    })

    function post_token() {
        var post_address = '<?php echo $member['mb_1'] ?>';
        var address = document.getElementById("post_token_address").value;
        var amount = document.getElementById("post_token_amount").value;
        var abc = post_address + '/' + address + '/' + amount;

        //alert( '결과 : ' + abc );

        $.ajax({
            type: 'POST',
            url: '/backand_get.php',
            data: {what: 'post_token', parameter: abc}
        }).done(function( msg ) {
            //alert( '결과 : ' + msg );
            location.reload();
        });
    }

    function getCurrentOwner() {
        var abc = '0x36a8cA2a98277feAA97A5cff19e33661be5d6A9A';

        //alert( '결과 : ' + abc );

        $.ajax({
            type: 'POST',
            url: '/backand_get.php',
            data: {what: 'getCurrentOwner', parameter: abc}
        }).done(function( msg ) {
            alert( '결과 : ' + msg );
        });
    }

    function updateOwner() {
        var abc = '0xbd8a78cbea41e477ed3cb8c925de71586c518b8e/0x36a8cA2a98277feAA97A5cff19e33661be5d6A9A';

        //alert( '결과 : ' + abc );

        $.ajax({
            type: 'POST',
            url: '/backand_get.php',
            data: {what: 'updateOwner', parameter: abc}
        }).done(function( msg ) {
            alert( '결과 : ' + msg );
        });
    }

    function getRate() {
        var abc = '0xbd8a78cbea41e477ed3cb8c925de71586c518b8e';

        //alert( '결과 : ' + abc );

        $.ajax({
            type: 'POST',
            url: '/backand_get.php',
            data: {what: 'getRate', parameter: abc}
        }).done(function( msg ) {
            alert( '결과 : ' + msg );
        });
    }

    function updateRate() {
        var abc = '0xbd8a78cbea41e477ed3cb8c925de71586c518b8e/50';

        //alert( '결과 : ' + abc );

        $.ajax({
            type: 'POST',
            url: '/backand_get.php',
            data: {what: 'updateRate', parameter: abc}
        }).done(function( msg ) {
            alert( '결과 : ' + msg );
        });
    }

    function stake_token() {
        var user_address = '<?php echo $member['mb_1'] ?>';
        var stake_address = '<?php echo $member['mb_2'] ?>';
        var amount = document.getElementById("stake_token_amount").value;
        var abc = user_address + '/' + stake_address + '/' + amount;

        //alert( '결과 : ' + abc );

        $.ajax({
            type: 'POST',
            url: '/backand_get.php',
            data: {what: 'stake_token', parameter: abc}
        }).done(function( msg ) {
            alert( '결과 : ' + msg );
            location.reload();
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
}

label, input { display:block;  }
input.text { margin-bottom:12px; width:100%; padding: .4em; }
fieldset { padding:0; border:0; margin-top:25px; }
</style>

<div id="smb_my">

    <section id="smb_my_ov">
        <h2>회원정보 개요</h2>
        <ul class="my_pocou">
            <center><div id="map" style="width:auto;height:200px;"></div></center>
            <br><li class="my_cou">
                        <label for="address_go">출발지</label>
                        <input type="text" name="address_go" id="address_go" value="" class="text ui-widget-content ui-corner-all">
                        <label for="sample5_address">도착지</label>
                        <input type="text" name="sample5_address" id="sample5_address" value="" class="text ui-widget-content ui-corner-all" onclick="sample5_execDaumPostcode();">
                        <button onclick="sample5_execDaumPostcode();">도착지 검색</button>
                        </li>
            <br><li class="my_cou">
                        <select> 
                            <option selected>빠른콜을 원하신다면?</option> 
                            <option>+ 50 TA</option> 
                            <option>+ 100 TA</option> 
                            <option>+ 150 TA</option> 
                        </select>
                        </li>
            <br><a href="<?php echo G5_SHOP_URL; ?>/mycalling.php"><li class="my_cou">
                        <button>함께 타타타 시작할까요?</button>
                        </li></a>
            <br><li class="my_cou">
                        <button onclick="updateRate();">백앤드 테스트야!!</button>
                        </li>
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

<?php
include_once(G5_MSHOP_PATH.'/_tail.php');
?>