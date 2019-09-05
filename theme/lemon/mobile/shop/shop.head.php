<?php
if (!defined("_GNUBOARD_")) exit; // 개별 페이지 접근 불가

include_once(G5_THEME_PATH.'/head.sub.php');
include_once(G5_LIB_PATH.'/outlogin.lib.php');
include_once(G5_LIB_PATH.'/visit.lib.php');
include_once(G5_LIB_PATH.'/connect.lib.php');
include_once(G5_LIB_PATH.'/popular.lib.php');
include_once(G5_LIB_PATH.'/latest.lib.php');

?>
<style type="text/css">
    button{
    background:#0b66ff;
    color:#fff;
    border:none;
    position:relative;
    height:30px;
    width:100%;
    font-size:1.1em;
    padding:0 2em;
    cursor:pointer;
    transition:800ms ease all;
    outline:none;
    }
    button:hover{
    background:#fff;
    color:#0b66ff;
    }
    button:before,button:after{
    content:'';
    position:absolute;
    top:0;
    right:0;
    height:2px;
    width:0;
    background: #0b66ff;
    transition:400ms ease all;
    }
    button:after{
    right:inherit;
    top:inherit;
    left:0;
    bottom:0;
    }
    button:hover:before,button:hover:after{
    width:100%;
    transition:800ms ease all;
    }
</style>

<script>
    function backand_get_wallet() {
        var aaa = '<?php echo $member['mb_id'] ?>';

        $.ajax({
            type: 'POST',
            url: '/backand_get.php',
            data: {what: 'wallet', parameter: aaa}
        }).done(function( msg ) {
            alert( '결과 : ' + msg );
            //document.getElementById("ming3").innerHTML = msg + ` TA`
            $.ajax({
            type: 'POST',
            url: '/backand_get.php',
            data: {what: 'wallet_stake', parameter: aaa}
        }).done(function( msg ) {
            alert( '결과2 : ' + msg );
            document.getElementById("new_wallet").style.display = 'none';
            //document.getElementById("ming3").innerHTML = msg + ` TA`
        });
        });
    }
</script>

<header id="hd">
    <?php if ((!$bo_table || $w == 's' ) && defined('_INDEX_')) { ?><h1><?php echo $config['cf_title'] ?></h1><?php } ?>

    <div id="skip_to_container"><a href="#container">본문 바로가기</a></div>

    <?php if(defined('_INDEX_')) { // index에서만 실행
        include G5_MOBILE_PATH.'/newwin.inc.php'; // 팝업레이어
    } ?>

    <div id="hd_wr">
        <div id="logo"><a href="<?php echo G5_SHOP_URL; ?>/"><img src="<?php echo G5_DATA_URL; ?>/common/mobile_logo_img" alt="<?php echo $config['cf_title']; ?> 메인"></a></div>
    </div>
    <?php echo outlogin('theme/shop_basic'); // 외부 로그인 ?>
    <?php include_once(G5_THEME_MSHOP_PATH.'/category.php'); // 분류 ?>

</header>

<div id="container">
