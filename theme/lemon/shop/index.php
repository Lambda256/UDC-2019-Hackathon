<?php
include_once('./_common.php');

if (G5_IS_MOBILE) {
    include_once(G5_THEME_MSHOP_PATH.'/index.php');
    return;
}

define("_INDEX_", TRUE);

include_once(G5_THEME_SHOP_PATH.'/shop.head.php');
?>


<div id="aside">

    <?php include_once(G5_SHOP_SKIN_PATH.'/boxcategory.skin.php'); // 상품분류 ?>
    <!-- 쇼핑몰 배너 시작 { -->
    <?php echo display_banner('왼쪽'); ?>
        <!-- } 쇼핑몰 배너 끝 -->


    <div id="hd_menu">
        <ul>
            <li class="hd_menu_right"><a href="<?php echo G5_BBS_URL; ?>/faq.php"><i class="fa fa-question"></i>FAQ</a></li>
            <li class="hd_menu_right"><a href="<?php echo G5_BBS_URL; ?>/qalist.php"><i class="fa fa-comments-o"></i>1:1문의</a></li>
            <li class="hd_menu_right"><a href="<?php echo G5_SHOP_URL; ?>/personalpay.php"><i class="fa fa-credit-card"></i>개인결제</a></li>
            <li class="hd_menu_right"><a href="<?php echo G5_SHOP_URL; ?>/itemuselist.php"><i class="fa fa-camera"></i>사용후기</a></li>
            <li class="hd_menu_right"><a href="<?php echo G5_SHOP_URL; ?>/couponzone.php"><i class="fa fa-newspaper-o"></i>쿠폰존</a></li>

        </ul>
    </div>

    <div class="as_cs">
        <h2>고객센터</h2>
        <?php
        $save_file = G5_DATA_PATH.'/cache/theme/lemon/footerinfo.php';
        if(is_file($save_file))
            include($save_file);
        ?>
        <strong class="cs_tel"><?php echo get_text($footerinfo['tel']); ?></strong>
        <p class="cs_info"><?php echo get_text($footerinfo['etc'], 1); ?></p>   
    </div>

    <?php echo latest('theme/shop_basic', 'notice', 5, 30); ?>

    <?php echo poll('theme/shop_basic'); // 설문조사 ?>

</div>
        
<div id="container_right">
    <!-- 메인이미지 시작 { -->
    <?php echo display_banner('메인', 'mainbanner.10.skin.php'); ?>
    <!-- } 메인이미지 끝 -->

    <?php if($default['de_type4_list_use']) { ?>
    <!-- 인기상품 시작 { -->
    <section class="sct_wrap">
        <h2><a href="<?php echo G5_SHOP_URL; ?>/listtype.php?type=4">인기상품</a></h2>
        <?php
        $list = new item_list();
        $list->set_type(4);
        $list->set_view('it_id', false);
        $list->set_view('it_name', true);
        $list->set_view('it_basic', true);
        $list->set_view('it_cust_price', true);
        $list->set_view('it_price', true);
        $list->set_view('it_icon', true);
        $list->set_view('sns', true);
        echo $list->run();

        ?>
    </section>
    <!-- } 인기상품 끝 -->
    <?php } ?>


    <?php if($default['de_type3_list_use']) { ?>
    <!-- 최신상품 시작 { -->
    <section class="sct_wrap">
        <header>
            <h2><a href="<?php echo G5_SHOP_URL; ?>/listtype.php?type=3">최신상품</a></h2>
        </header>
        <?php
        $list = new item_list();
        $list->set_type(3);
        $list->set_view('it_id', false);
        $list->set_view('it_name', true);
        $list->set_view('it_basic', true);
        $list->set_view('it_cust_price', true);
        $list->set_view('it_price', true);
        $list->set_view('it_icon', true);
        $list->set_view('sns', true);
        echo $list->run();
        ?>
    </section>
    <!-- } 최신상품 끝 -->
    <?php } ?>

    <?php include_once(G5_SHOP_SKIN_PATH.'/boxevent.skin.php'); // 이벤트 ?>

    <div class="idx_wr">

        <?php if($default['de_type1_list_use']) { ?>
        <!-- 히트상품 시작 { -->
        <section class="sct_wrap">
            <header>
                <h2><a href="<?php echo G5_SHOP_URL; ?>/listtype.php?type=1">히트상품</a></h2>
            </header>
            <?php
            $list = new item_list();
            $list->set_type(1);
            $list->set_view('it_img', true);
            $list->set_view('it_id', false);
            $list->set_view('it_name', true);
            $list->set_view('it_basic', true);
            $list->set_view('it_cust_price', true);
            $list->set_view('it_price', true);
            $list->set_view('it_icon', true);
            $list->set_view('sns', true);
            echo $list->run();
            ?>
        </section>
        <!-- } 히트상품 끝 -->
        <?php } ?>

        <?php if($default['de_type2_list_use']) { ?>
        <!-- 추천상품 시작 { -->
        <section class="sct_wrap">
            <header>
                <h2><a href="<?php echo G5_SHOP_URL; ?>/listtype.php?type=2">추천상품</a></h2>
            </header>
            <?php
            $list = new item_list();
            $list->set_type(2);
            $list->set_view('it_id', false);
            $list->set_view('it_name', true);
            $list->set_view('it_basic', true);
            $list->set_view('it_cust_price', true);
            $list->set_view('it_price', true);
            $list->set_view('it_icon', true);
            $list->set_view('sns', true);
            echo $list->run();
            ?>
        </section>
        <!-- } 추천상품 끝 -->
        <?php } ?>



        <?php if($default['de_type5_list_use']) { ?>
        <!-- 할인상품 시작 { -->
        <section class="sct_wrap">
            <header>
                <h2><a href="<?php echo G5_SHOP_URL; ?>/listtype.php?type=5">할인상품</a></h2>
            </header>
            <?php
            $list = new item_list();
            $list->set_type(5);
            $list->set_view('it_id', false);
            $list->set_view('it_name', true);
            $list->set_view('it_basic', true);
            $list->set_view('it_cust_price', true);
            $list->set_view('it_price', true);
            $list->set_view('it_icon', true);
            $list->set_view('sns', true);
            echo $list->run();
            ?>
        </section>
        <!-- } 할인상품 끝 -->
        <?php } ?>
    </div>

</div>
<?php
include_once(G5_THEME_SHOP_PATH.'/shop.tail.php');
?>