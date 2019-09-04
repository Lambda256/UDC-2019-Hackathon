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

$g5['title'] = '마이토큰';
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
<link rel="stylesheet" href="/resources/demos/style.css">
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
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
label, input { display:block; }
input.text { margin-bottom:12px; width:95%; padding: .4em; }
fieldset { padding:0; border:0; margin-top:25px; }
</style>

<div id="smb_my">

    <section id="smb_my_ov">
        <h2>회원정보 개요</h2>
        <ul class="my_pocou">
            <br><li class="my_cou">
                        <center><img src="https://songseungwoon.site/data/common/mobile_logo_img"></center>
                        </li>
            <br><br><a href="<?php echo G5_BBS_URL ?>/board.php?bo_table=notice">
                        <li class="my_cou">
                        TA 토큰 간편구매
                                <span><i class="fa fa-credit-card" aria-hidden="true"></i></span>
                        </li>
                    </a>
            <br><li class="my_cou">
                        TA 토큰 거래소
                            <span><i class="fa fa-globe" aria-hidden="true"></i></span>
                        </li>
            <br><li class="my_cou" id="staking_opener"> 
                        <div id="staking" title="토큰을 스테이킹하고 보상을 받으세요!">
                            첫 스테이킹의 경우 약 '48시간' 동안 스테이킹 해제를 할 수 없습니다.
                            <form>
                                <fieldset>
                                <label for="stake_token_amount">스테이킹할 TA 토큰의 개수</label>
                                <input type="text" name="stake_token_amount" id="stake_token_amount" value="1" class="text ui-widget-content ui-corner-all">
                                </fieldset>
                            </form>
                            <button onclick="stake_token();">냐옹</button>
                        </div>
                        <i class="fa fa-btc" aria-hidden="true"></i> TA Staking
                            <span id="stake_address_balance"class="payment">0 TA <i class="fa fa-cubes" aria-hidden="true" style="font-size:1.25em;"></i></span>
                        </li>
            <br><li class="my_cou">
                        <i class="fa fa-btc" aria-hidden="true"></i> TA UnStaking
                            <span id="user_address_balance"><?php echo number_format($cp_count); ?> TA <i class="fa fa-cubes" aria-hidden="true" style="font-size:1.25em;"></i></span>
                        </li>
            <br><br><li class="my_cou">
                        <i class="fa fa-arrow-circle-down" aria-hidden="true"></i> 토큰 입금
                        <?php if ($member['mb_1'] == NULL) { ?>
                            <span>타타타의 지갑을 만들어주세요!</span>
                        <?php } else { ?>
                            <span>
                                <div id="dialog" title="<?php echo $member['mb_nick'] ?> 님의 타타타 지갑주소 입니다!">
                                    <p><img src="https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=<?php echo $member['mb_1'] ?>"><br><?php echo $member['mb_1'] ?></p>
                                </div>
                                <i class="fa fa-qrcode" style="font-size:1.85em; cursor:pointer" id="opener"></i>
                                <!--<i class="fa fa-qrcode" style="font-size:1.85em; cursor:pointer" onclick="window.open('https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=<?php echo $member['mb_1'] ?>','asdfo8or','scrollbars=yes,width=417,height=385,top=10,left=20');"></i>-->
                                <p class="address"><?php echo $member['mb_1'] ?> </p>
                            </span> 
                        <?php } ?>
                        </li>
            <br><a href="#"><li class="my_cou" id="opener3">
                        <div id="dialog3" title="토큰을 출금하실려구요?">
                            <form>
                                <fieldset>
                                <label for="post_token_address">받으실 분의 지갑주소</label>
                                <input type="text" name="post_token_address" id="post_token_address" value="" class="text ui-widget-content ui-corner-all">
                                <label for="post_token_amount">보내실 토큰의 개수</label>
                                <input type="text" name="post_token_amount" id="post_token_amount" value="1" class="text ui-widget-content ui-corner-all">

                                </fieldset>
                            </form>
                            <button onclick="post_token();">냐옹</button>
                        </div>
                        <i class="fa fa-arrow-circle-up" aria-hidden="true"></i> 토큰 출금
                            <span><i class="fa fa-arrow-right" aria-hidden="true"></i></span>
                        </li>
                    </a>
            <br><br><a href="#" id="opener2"><li class="my_cou"><i class="fa fa-television" aria-hidden="true"></i> 광고시청하고 타! 토큰받기
                            <span>
                                <div id="dialog2" title="<?php echo $member['mb_nick'] ?> 님! 광고지만! 즐겁게 봐주세요:)">
                                    <p>
                                        <center>
                                            <video id="myVideo" controls="controls" width="100%">
                                                <source src="/video/mov_bbb.mp4" type="video/mp4">
                                                etc ...
                                            </video>
                                            <script type='text/javascript'>
                                                document.getElementById('myVideo').addEventListener('ended',myHandler,false);
                                                function myHandler(e) {
                                                    if(!e) { e = window.event; }
                                                    //alert("Video Finished");
                                                    var aaa = '<?php echo $member['mb_1'] ?>';

                                                    $.ajax({
                                                        type: 'POST',
                                                        url: '/backand_get.php',
                                                        data: {what: 'video', parameter: aaa}
                                                    }).done(setTimeout(function( msg ) {
                                                        //alert( '결과 : ' + msg );
                                                        //location.href = location.href;
                                                        //document.getElementById("user_address_balance").innerHTML = msg + ` TA`

                                                        var aaa = document.getElementById("ming1").innerHTML;
                                                        $.ajax({
                                                            type: 'POST',
                                                            url: '/backand_get.php',
                                                            data: {what: 'balance', parameter: aaa}
                                                        }).done(function( msg ) {
                                                            document.getElementById("user_address_balance").innerHTML = msg + ` TA <i class="fa fa-cubes" aria-hidden="true">`;
                                                            location.reload();
                                                        });
                                                    },2000));
                                                }
                                            </script>
                                            가나다라?
                                        </center>
                                    </p>
                                </div>
                            </span>
                        </li>
                    </a>
            <br><li class="my_cou"><i class="fa fa-gamepad" aria-hidden="true"></i> 게임하고 타! 토큰받기
                            <span><i class="fa fa-star" aria-hidden="true"></i></span>
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