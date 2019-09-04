<?php
if (!defined('_GNUBOARD_')) exit; // 개별 페이지 접근 불가

function get_mshop_category($ca_id, $len)
{
    global $g5;

    $sql = " select ca_id, ca_name from {$g5['g5_shop_category_table']}
                where ca_use = '1' ";
    if($ca_id)
        $sql .= " and ca_id like '$ca_id%' ";
    $sql .= " and length(ca_id) = '$len' order by ca_order, ca_id ";

    return $sql;
}
?>

<div id="category" class="menu">
    <div class="cate_bg"></div>
    <div class="menu_wr">
        <button type="button" class="menu_close"><i class="fa fa-times" aria-hidden="true"></i><span class="sound_only">카테고리닫기</span></button>
       <?php echo outlogin('theme/shop_basic'); // 외부 로그인 ?>
         <div class="con">
            <ul class="cate">
                <?php
                $sql = " select *
                            from {$g5['menu_table']}
                            where me_use = '1'
                              and length(me_code) = '2'
                            order by me_order, me_id ";
                $result = sql_query($sql, false);
                $gnb_zindex = 999; // gnb_1dli z-index 값 설정용
                $menu_datas = array();

                for ($i=0; $row=sql_fetch_array($result); $i++) {
                    $menu_datas[$i] = $row;

                    $sql2 = " select *
                                from {$g5['menu_table']}
                                where me_use = '1'
                                  and length(me_code) = '4'
                                  and substring(me_code, 1, 2) = '{$row['me_code']}'
                                order by me_order, me_id ";
                    $result2 = sql_query($sql2);
                    for ($k=0; $row2=sql_fetch_array($result2); $k++) {
                        $menu_datas[$i]['sub'][$k] = $row2;
                    }

                }

                $i = 0;
                foreach( $menu_datas as $row ){
                    if( empty($row) ) continue; 
                ?>
                <li class="li_1">
                    <a href="<?php echo $row['me_link']; ?>" target="_<?php echo $row['me_target']; ?>" class="li_a_1"><?php echo $row['me_name'] ?></a>
                    <?php
                    $k = 0;
                    foreach( (array) $row['sub'] as $row2 ){

                        if( empty($row2) ) continue; 

                        if($k == 0)
                            echo '<button class="sub_ct_toggle ct_op">하위분류 열기</button><ul class="sub_cate">'.PHP_EOL;
                    ?>
                        <li class="li_2"><a href="<?php echo $row2['me_link']; ?>" target="_<?php echo $row2['me_target']; ?>"><?php echo $row2['me_name'] ?></a></li>
                    <?php
                    $k++;
                    }   //end foreach $row2

                    if($k > 0)
                        echo '</ul>'.PHP_EOL;
                    ?>
                </li>
                <?php
                $i++;
                }   //end foreach $row

                if ($i == 0) {  ?>
                    <li class="gnb_empty">메뉴 준비 중입니다.<?php if ($is_admin) { ?> <a href="<?php echo G5_ADMIN_URL; ?>/menu_list.php">관리자모드 &gt; 환경설정 &gt; 메뉴설정</a>에서 설정하실 수 있습니다.<?php } ?></li>
                <?php } ?>
            </ul>
        </div>

        <div  class="con">
            <?php
            $mshop_ca_href = G5_SHOP_URL.'/list.php?ca_id=';
            $mshop_ca_res1 = sql_query(get_mshop_category('', 2));
            for($i=0; $mshop_ca_row1=sql_fetch_array($mshop_ca_res1); $i++) {
                if($i == 0)
                    echo '<ul class="cate">'.PHP_EOL;
            ?>
                <li>
                    <a href="<?php echo $mshop_ca_href.$mshop_ca_row1['ca_id']; ?>"><?php echo get_text($mshop_ca_row1['ca_name']); ?></a>
                    <?php
                    $mshop_ca_res2 = sql_query(get_mshop_category($mshop_ca_row1['ca_id'], 4));
                    if(sql_num_rows($mshop_ca_res2))
                        echo '<button class="sub_ct_toggle ct_op">'.get_text($mshop_ca_row1['ca_name']).' 하위분류 열기</button>'.PHP_EOL;

                    for($j=0; $mshop_ca_row2=sql_fetch_array($mshop_ca_res2); $j++) {
                        if($j == 0)
                            echo '<ul class="sub_cate sub_cate1">'.PHP_EOL;
                    ?>
                        <li>
                            <a href="<?php echo $mshop_ca_href.$mshop_ca_row2['ca_id']; ?>"><?php echo get_text($mshop_ca_row2['ca_name']); ?></a>
                            <?php
                            $mshop_ca_res3 = sql_query(get_mshop_category($mshop_ca_row2['ca_id'], 6));
                            if(sql_num_rows($mshop_ca_res3))
                                echo '<button type="button" class="sub_ct_toggle ct_op">'.get_text($mshop_ca_row2['ca_name']).' 하위분류 열기</button>'.PHP_EOL;

                            for($k=0; $mshop_ca_row3=sql_fetch_array($mshop_ca_res3); $k++) {
                                if($k == 0)
                                    echo '<ul class="sub_cate sub_cate2">'.PHP_EOL;
                            ?>
                                <li>
                                    <a href="<?php echo $mshop_ca_href.$mshop_ca_row3['ca_id']; ?>"><?php echo get_text($mshop_ca_row3['ca_name']); ?></a>
                                    <?php
                                    $mshop_ca_res4 = sql_query(get_mshop_category($mshop_ca_row3['ca_id'], 8));
                                    if(sql_num_rows($mshop_ca_res4))
                                        echo '<button type="button" class="sub_ct_toggle ct_op">'.get_text($mshop_ca_row3['ca_name']).' 하위분류 열기</button>'.PHP_EOL;

                                    for($m=0; $mshop_ca_row4=sql_fetch_array($mshop_ca_res4); $m++) {
                                        if($m == 0)
                                            echo '<ul class="sub_cate sub_cate3">'.PHP_EOL;
                                    ?>
                                        <li>
                                            <a href="<?php echo $mshop_ca_href.$mshop_ca_row4['ca_id']; ?>"><?php echo get_text($mshop_ca_row4['ca_name']); ?></a>
                                            <?php
                                            $mshop_ca_res5 = sql_query(get_mshop_category($mshop_ca_row4['ca_id'], 10));
                                            if(sql_num_rows($mshop_ca_res5))
                                                echo '<button type="button" class="sub_ct_toggle ct_op">'.get_text($mshop_ca_row4['ca_name']).' 하위분류 열기</button>'.PHP_EOL;

                                            for($n=0; $mshop_ca_row5=sql_fetch_array($mshop_ca_res5); $n++) {
                                                if($n == 0)
                                                    echo '<ul class="sub_cate sub_cate4">'.PHP_EOL;
                                            ?>
                                                <li>
                                                    <a href="<?php echo $mshop_ca_href.$mshop_ca_row5['ca_id']; ?>"><?php echo get_text($mshop_ca_row5['ca_name']); ?></a>
                                                </li>
                                            <?php
                                            }

                                            if($n > 0)
                                                echo '</ul>'.PHP_EOL;
                                            ?>
                                        </li>
                                    <?php
                                    }

                                    if($m > 0)
                                        echo '</ul>'.PHP_EOL;
                                    ?>
                                </li>
                            <?php
                            }

                            if($k > 0)
                                echo '</ul>'.PHP_EOL;
                            ?>
                        </li>
                    <?php
                    }

                    if($j > 0)
                        echo '</ul>'.PHP_EOL;
                    ?>
                </li>
            <?php
            }

            if($i > 0)
                echo '</ul>'.PHP_EOL;
            else
                echo '<p>등록된 분류가 없습니다.</p>'.PHP_EOL;
            ?>
        </div>
        <div class="con">
            <ul id="hd_tnb" class="cate">
                <li class="bd"><a href="<?php echo G5_SHOP_URL; ?>/mypage.php">마이페이지</a></li>
                <li class="bd"><a href="<?php echo G5_SHOP_URL; ?>/orderinquiry.php">주문내역</a></li>
                <li class="bd"><a href="<?php echo G5_SHOP_URL; ?>/couponzone.php">쿠폰존</a></li>
                <li class="bd"><a href="<?php echo G5_BBS_URL; ?>/faq.php">FAQ</a></li>
                <li><a href="<?php echo G5_BBS_URL; ?>/qalist.php">1:1문의</a></li>
                <li><a href="<?php echo G5_SHOP_URL; ?>/personalpay.php">개인결제</a></li>
            </ul> 
        </div>
    </div>
</div>
<script>
$(function (){

    $("button.sub_ct_toggle").on("click", function() {
        var $this = $(this);
        $sub_ul = $(this).closest("li").children("ul.sub_cate");

        if($sub_ul.size() > 0) {
            var txt = $this.text();

            if($sub_ul.is(":visible")) {
                txt = txt.replace(/닫기$/, "열기");
                $this
                    .removeClass("ct_cl")
                    .text(txt);
            } else {
                txt = txt.replace(/열기$/, "닫기");
                $this
                    .addClass("ct_cl")
                    .text(txt);
            }

            $sub_ul.toggle();
        }
    });


 
     
});
</script>
