<?php
if (!defined("_GNUBOARD_")) exit; // 개별 페이지 접근 불가

// 이벤트 정보
$hsql = " select ev_id, ev_subject, ev_subject_strong from {$g5['g5_shop_event_table']} where ev_use = '1' order by ev_id desc limit 3";
$hresult = sql_query($hsql);

if(sql_num_rows($hresult)) {
    // add_stylesheet('css 구문', 출력순서); 숫자가 작을 수록 먼저 출력됨
    add_stylesheet('<link rel="stylesheet" href="'.G5_MSHOP_SKIN_URL.'/style.css">', 0);

?>
<div id="sev">
    <h2>EVENT</h2>
    <ul class="sev_wr">
    <?php
    for ($i=0; $row=sql_fetch_array($hresult); $i++)
    {
        echo '<li class="ev_li"><div class="ev_li_wr">';
        $href = G5_SHOP_URL.'/event.php?ev_id='.$row['ev_id'];

        $event_img = G5_DATA_PATH.'/event/'.$row['ev_id'].'_m'; // 이벤트 이미지
        echo '<div class="sev_img_wr">'.PHP_EOL;
            echo '<a href="'.$href.'" class="sev_img "><img src="'.G5_DATA_URL.'/event/'.$row['ev_id'].'_m" alt="'.$row['ev_subject'].'"></a>'.PHP_EOL;
        echo '</div>'.PHP_EOL;


        

        if($k > 1) {
            echo '</div>'.PHP_EOL;
        }


        echo '</div></li>'.PHP_EOL;

    }

    if ($i==0)
        echo '<li id="sev_empty">이벤트 없음</li>'.PHP_EOL;
    ?>
    </ul>
</div>
<?php
}
?>



<script>
$(document).ready(function(){
    $('.sev_wr').show().bxSlider({
        minSlides: 2,
        maxSlides: 3,
        slideWidth: 300,
        slideMargin: 10,
        auto: true,
        pager:false
    });
});

</script>
