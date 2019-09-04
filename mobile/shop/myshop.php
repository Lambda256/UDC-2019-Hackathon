<?php
include_once('./_common.php');
include_once("/phpqrcode/qrlib.php");

// 테마에 mypage.php 있으면 include
if(defined('G5_THEME_SHOP_PATH')) {
    $theme_mypage_file = G5_THEME_MSHOP_PATH.'/myshop.php';
    if(is_file($theme_mypage_file)) {
        include_once($theme_mypage_file);
        return;
        unset($theme_mypage_file);
    }
}

$g5['title'] = '마이샵';
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
    height: "auto",
    width: 200,
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

$( "#opener" ).on( "click", function() {
    $( "#dialog" ).dialog( "open" );
});
} );

$( function() {
$( "#dialog2" ).dialog({
    height: "auto",
    width: 200,
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
</script>

<script>
    $(document).ready(function backand_get_balance() {
        var aaa = document.getElementById("ming1").innerHTML;

        $.ajax({
            type: 'POST',
            url: '/backand_get.php',
            data: {what: 'balance', parameter: aaa}
        }).done(function( msg ) {
            document.getElementById("ming3").innerHTML = msg + ` TA <i class="fa fa-cubes" aria-hidden="true">`
        });
    })

    function giftshop_buy(buy_amount) {
        var aaa = '<?php echo $member['mb_1'] ?>';
        var abc = aaa + '/' + buy_amount;

        $.ajax({
            type: 'POST',
            url: '/backand_get.php',
            data: {what: 'giftshop', parameter: abc}
        }).done(function( msg ) {
            alert( '결과 : ' + msg );
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
</style>

<div id="smb_my">

    <section id="smb_my_ov">
        <h2>회원정보 개요</h2>
        <ul class="my_pocou">
            <br><li class="my_cou">보유하신 타! 토큰
                            <span id="ming3"><?php echo number_format($cp_count); ?> TA</span>
                        </li>
            <br><li class="my_cou">
                        <div id="dialog" title="바나나우유를 드시겠어요?">
                            <p>
                                사용처 : GS25<br>
                                필요한 타 토큰의 개수 : 1 TA<br><br>
                                <button onclick="giftshop_buy(1);">냐옹</button>
                            </p>
                        </div>
                        <a href="#" id="opener"><img src="https://www.giftishow.com/Resource/goods/G00000321203/G00000321203.jpg" width="50px" height="50px" style="vertical-align: bottom">바나나우유(GS25)
                        <span ><i class="fa fa-hand-pointer-o" aria-hidden="true"></i></span></a>
                        </li>
            <br><li class="my_cou">
                        <div id="dialog2" title="456456">
                            <p>456465</p>
                        </div>
                        <a href="#" id="opener2"><img src="https://www.giftishow.com/Resource/goods/G00000182339/G00000182339.jpg" width="50px" height="50px" style="vertical-align: bottom">허쉬초코렛드링크235ML(GS25)
                        <span ><i class="fa fa-hand-pointer-o" aria-hidden="true"></i></span></a>
                        </li>
            <br><li class="my_cou">
                        <img src="https://www.giftishow.com/Resource/goods/G00000008062/G00000008062.jpg" width="50px" height="50px" style="vertical-align: bottom">스타벅스 아이스 카페아메리카노 Tall
                        <span ><i class="fa fa-hand-pointer-o" aria-hidden="true"></i></span>
                        </li>
            <br><li class="my_cou">
                        <img src="https://www.giftishow.com/Resource/goods/G00000263126/G00000263126.jpg" width="50px" height="50px" style="vertical-align: bottom">투썸 아이스 아메리카노(R)
                        <span ><i class="fa fa-hand-pointer-o" aria-hidden="true"></i></span>
                        </li>
            <br><li class="my_cou">
                        <img src="https://www.giftishow.com/Resource/goods/G00000250700/G00000250700.jpg" width="50px" height="50px" style="vertical-align: bottom">설빙 초코브라우니
                        <span ><i class="fa fa-hand-pointer-o" aria-hidden="true"></i></span>
                        </li>
            <br><li class="my_cou">
                        <img src="https://www.giftishow.com/Resource/goods/G00000310849/G00000310849.jpg" width="50px" height="50px" style="vertical-align: bottom">엔제리너스 자바초코렛칩 스노우
                        <span ><i class="fa fa-hand-pointer-o" aria-hidden="true"></i></span>
                        </li>
            <br><li class="my_cou">
                        <img src="https://www.giftishow.com/Resource/goods/G00000340912/G00000340912.jpg" width="50px" height="50px" style="vertical-align: bottom">파리바게트 치즈가 부드러운 시간
                        <span ><i class="fa fa-hand-pointer-o" aria-hidden="true"></i></span>
                        </li>
            <br><li class="my_cou">
                        <img src="https://www.giftishow.com/Resource/goods/G00000183279/G00000183279.jpg" width="50px" height="50px" style="vertical-align: bottom">베스킨라빈스 싱글킹 아이스크림
                        <span ><i class="fa fa-hand-pointer-o" aria-hidden="true"></i></span>
                        </li>
            <br><li class="my_cou">
                        <img src="https://www.giftishow.com/Resource/goods/G00000165240/G00000165240.jpg" width="50px" height="50px" style="vertical-align: bottom">버거킹 와퍼세트
                        <span ><i class="fa fa-hand-pointer-o" aria-hidden="true"></i></span>
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