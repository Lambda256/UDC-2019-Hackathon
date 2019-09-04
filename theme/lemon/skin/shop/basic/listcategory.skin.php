<?php
if (!defined("_GNUBOARD_")) exit; // 개별 페이지 접근 불가

$str = '';
$exists = false;

$ca_id_len = strlen($ca_id);
$len2 = $ca_id_len + 2;
$len4 = $ca_id_len + 4;

// 최하위 분류의 경우 상단에 동일한 레벨의 분류를 출력해주는 코드
if (!$exists) {
    $str = '';

    $tmp_ca_id = substr($ca_id, 0, strlen($ca_id)-2);
    $tmp_ca_id_len = strlen($tmp_ca_id);
    $len2 = $tmp_ca_id_len + 2;
    $len4 = $tmp_ca_id_len + 4;

    // 차차기 분류의 건수를 얻음
    $sql = " select count(*) as cnt from {$g5['g5_shop_category_table']} where ca_id like '$tmp_ca_id%' and ca_use = '1' and length(ca_id) = $len4 ";
    $row = sql_fetch($sql);
    $cnt = $row['cnt'];

    $sql = " select ca_id, ca_name from {$g5['g5_shop_category_table']} where ca_id like '$tmp_ca_id%' and ca_use = '1' and length(ca_id) = $len2 order by ca_order, ca_id ";
    $result = sql_query($sql);
    while ($row=sql_fetch_array($result)) {
        $sct_ct_here = '';
        if ($ca_id == $row['ca_id']) // 활성 분류 표시
            $sct_ct_here = 'sct_ct_here';

        $str .= '<li>';
        if ($cnt) {
            $str .= '<a href="./list.php?ca_id='.$row['ca_id'].'" class="sct_ct_parent '.$sct_ct_here.'">'.$row['ca_name'].'</a>';
            $sql2 = " select ca_id, ca_name from {$g5['g5_shop_category_table']} where ca_id like '{$row['ca_id']}%' and ca_use = '1' and length(ca_id) = $len4 order by ca_order, ca_id ";
            $result2 = sql_query($sql2);
            $k=0;
            $add_str = '';
            while ($row2=sql_fetch_array($result2)) {
                $add_str .= '<li><a href="./list.php?ca_id='.$row2['ca_id'].'">'.$row2['ca_name'].'</a></li>';
                $k++;
            }
            if($add_str){       //해당 분류의 하위분류가 있으면
                $str .= '<button type="button" class="mn_op"><i class="fa fa-chevron-down" aria-hidden="true"></i><span class="sound_only">하위분류</span></button><ul class="sct_ct_child">'.$add_str;
                $str .= '</ul>';
            }
        } else {
            $str .= '<a href="./list.php?ca_id='.$row['ca_id'].'" class="sct_ct_parent '.$sct_ct_here.'">'.$row['ca_name'].'</a>';
        }
        $str .= '</li>';
        $exists = true;
    }
}


if ($exists) {

    // add_stylesheet('css 구문', 출력순서); 숫자가 작을 수록 먼저 출력됨
    add_stylesheet('<link rel="stylesheet" href="'.G5_SHOP_CSS_URL.'/style.css">', 0);
?>
<div class="con_left">
    <!-- 상품분류 2 시작 { -->
    <aside id="sct_ct_2" class="sct_ct">
        <h2>카테고리</h2>
        <ul>
            <?php echo $str; ?>
        </ul>
    </aside>
    <!-- } 상품분류 2 끝 -->


    <!-- 상품 정렬 선택 시작 { -->
    <section id="sct_sort">
        <h2>상품 정렬</h2>
        <ul>
            <li><a href="<?php echo $sct_sort_href; ?>it_sum_qty&amp;sortodr=desc">판매많은순</a></li>
            <li><a href="<?php echo $sct_sort_href; ?>it_price&amp;sortodr=asc">낮은가격순</a></li>
            <li><a href="<?php echo $sct_sort_href; ?>it_price&amp;sortodr=desc">높은가격순</a></li>
            <li><a href="<?php echo $sct_sort_href; ?>it_use_avg&amp;sortodr=desc">평점높은순</a></li>
            <li><a href="<?php echo $sct_sort_href; ?>it_use_cnt&amp;sortodr=desc">후기많은순</a></li>
            <li><a href="<?php echo $sct_sort_href; ?>it_update_time&amp;sortodr=desc">최근등록순</a></li>
        </ul>
    </section>
    <?php
    // 분류 Best Item
    $list_mod = (isset($theme_config['ca_list_best_mod']) && $theme_config['ca_list_best_mod']) ? (int)$theme_config['ca_list_best_mod'] : $ca['ca_list_mod'];
    $list_row = (isset($theme_config['ca_list_best_row']) && $theme_config['ca_list_best_row']) ? (int)$theme_config['ca_list_best_row'] : $ca['ca_list_row'];
    $limit = $list_mod * $list_row;
    $best_skin = G5_SHOP_SKIN_PATH.'/list.best.10.skin.php';

    $sql = " select *
                from {$g5['g5_shop_item_table']}
                where ( ca_id like '$ca_id%' or ca_id2 like '$ca_id%' or ca_id3 like '$ca_id%' )
                  and it_use = '1'
                  and it_type4 = '1'
                order by it_order, it_id desc
                limit 0, $limit ";

    $list = new item_list($best_skin, $list_mod, $list_row, $ca['ca_mobile_img_width'], $ca['ca_mobile_img_height']);
    $list->set_query($sql);
    $list->set_mobile(true);
    $list->set_view('it_img', true);
    $list->set_view('it_id', false);
    $list->set_view('it_name', true);
    $list->set_view('it_price', true);
    echo $list->run();

     ?>

   


</div>
<!-- } 상품 정렬 선택 끝 -->



<script>
$(function(){
    $(".mn_op").click(function(){
        $(this).siblings(".sct_ct_child").toggle();
    });

});

</script>



<?php } ?>