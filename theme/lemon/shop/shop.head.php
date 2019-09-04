<?php
if (!defined("_GNUBOARD_")) exit; // 개별 페이지 접근 불가

if(G5_IS_MOBILE) {
    include_once(G5_THEME_MSHOP_PATH.'/shop.head.php');
    return;
}

include_once(G5_THEME_PATH.'/head.sub.php');
include_once(G5_LIB_PATH.'/outlogin.lib.php');
include_once(G5_LIB_PATH.'/poll.lib.php');
include_once(G5_LIB_PATH.'/visit.lib.php');
include_once(G5_LIB_PATH.'/connect.lib.php');
include_once(G5_LIB_PATH.'/popular.lib.php');
include_once(G5_LIB_PATH.'/latest.lib.php');

set_cart_id(0);
$tmp_cart_id = get_session('ss_cart_id');
add_javascript('<script src="'.G5_JS_URL.'/jquery.bxslider.js"></script>', 0);

?>
<?php if ($is_admin) {  ?>
<div class="hd-admin">
    <span><strong>관리자</strong>로 접속하셨습니다.</span>
    <a href="<?php echo G5_THEME_ADM_URL ?>" target="_blank">테마관리</a>
    <a href="<?php echo G5_ADMIN_URL ?>/shop_admin/" target="_blank">관리자</a>
</div>
<?php } ?>
<!-- 상단 시작 { -->
<div id="hd">
    <h1 id="hd_h1"><?php echo $g5['title'] ?></h1>

    <div id="skip_to_container"><a href="#container">본문 바로가기</a></div>

    <?php if(defined('_INDEX_')) { // index에서만 실행
        include G5_BBS_PATH.'/newwin.inc.php'; // 팝업레이어
     } ?>
   
    <div id="hd_wrapper">
        <div id="logo"><a href="<?php echo G5_SHOP_URL; ?>/"><img src="<?php echo G5_DATA_URL; ?>/common/logo_img" alt="<?php echo $config['cf_title']; ?>"></a></div>
        <button type="button" class="btn_hd btn_menu"><i class="fa fa-bars"></i></button>
        <div class="btn_r">
            <button type="button" class="btn_hd btn_user">
            <?php if ($is_member) { ?>
                <?php echo get_member_profile_img($member['mb_id']); ?>
            <?php } else { ?>
                <i class="fa fa-user-o"></i>
            <?php } ?>
            </button>
            <button type="button" class="btn_hd btn_sch"><i class="fa fa-search"></i></button>
           <a href="<?php echo G5_SHOP_URL; ?>/cart.php" class="btn_hd btn_hd_cart"><i class="fa fa-shopping-cart"></i><span class="cart-num"> <?php echo get_cart_count($tmp_cart_id); ?></span></a>
        </div>


        <?php echo outlogin('theme/shop_basic'); // 아웃로그인 ?>

        <div id="hd_sch">
            <h2>쇼핑몰 검색</h2>
            <form name="frmsearch1" id="qk_search" action="<?php echo G5_SHOP_URL; ?>/search.php" onsubmit="return search_submit(this);">

            <label for="sch_str" class="sound_only">검색어<strong class="sound_only"> 필수</strong></label>
            <input type="text" name="q" value="<?php echo stripslashes(get_text(get_search_string($q))); ?>" id="sch_str" class="frm_input" required>
            <button type="submit" id="sch_submit"><i class="fa fa-search" aria-hidden="true"></i><span class="sound_only">검색</span></button>

            </form>
            <script>
            function search_submit(f) {
                if (f.q.value.length < 2) {
                    alert("검색어는 두글자 이상 입력하십시오.");
                    f.q.select();
                    f.q.focus();
                    return false;
                }
                return true;
            }
            </script>
            <?php
            $save_file = G5_DATA_PATH.'/cache/theme/lemon/keyword.php';
            if(is_file($save_file))
                include($save_file);

            if(!empty($keyword)) {
            ?>
            <div id="ppl_word">
                <h4>인기검색어</h4>
                <ol class="slides">
                <?php
                $seq = 1;
                foreach($keyword as $word) {
                ?>
                    <li><span class="word-rank word-rank<?php echo $seq; ?>"><?php echo $seq; ?></span><a href="<?php echo G5_SHOP_URL; ?>/search.php?q=<?php echo urlencode($word); ?>"><?php echo get_text($word); ?></a></li>
                <?php
                    $seq++;
                }
                ?>
                </ol>

            </div>
            <?php } ?>
             <button type="button" class="btn_close"><i class="fa fa-times"></i><span class="sound_only">나의정보 닫기</span></button>
        </div>
    </div>
    <nav id="menu">
        <h2>메인메뉴</h2>
        <ul>
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
            <li class="menu_1dli">
                <a href="<?php echo $row['me_link']; ?>" target="_<?php echo $row['me_target']; ?>" class="menu_1da"><?php echo $row['me_name'] ?></a>
                <?php
                $k = 0;
                foreach( (array) $row['sub'] as $row2 ){

                    if( empty($row2) ) continue; 

                    if($k == 0)
                        echo '<span class="bg"><i class="fa fa-chevron-down"></i></span><ul class="menu_2dul">'.PHP_EOL;
                ?>
                    <li class="menu_2dli"><a href="<?php echo $row2['me_link']; ?>" target="_<?php echo $row2['me_target']; ?>" class="menu_2da"><?php echo $row2['me_name'] ?></a></li>
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
            
    </nav>

    <?php include_once(G5_THEME_SHOP_PATH.'/category.php'); // 분류 ?>
</div>

<script>
$(function(){
    $(".btn_user").click(function(){
        $(".ol").toggle();
    });
     $(".ol .btn_close").click(function(){
        $(".ol").hide();
    });

     $(".btn_sch").click(function(){
        $("#hd_sch").toggle();
    });
     $("#hd_sch .btn_close").click(function(){
        $("#hd_sch").hide();
    });

    $(".btn_menu").click(function(){
        $("#category").show();
    });
});
</script>

<!-- 콘텐츠 시작 { -->
<div id="container">
    <?php if (!defined("_INDEX_")) { ?><div id="wrapper_title"><?php echo $g5['title'] ?></div><?php } ?>
      