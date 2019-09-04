<?php
if (!defined("_GNUBOARD_")) exit; // 개별 페이지 접근 불가

$admin = get_admin("super");

// 사용자 화면 우측과 하단을 담당하는 페이지입니다.
// 우측, 하단 화면을 꾸미려면 이 파일을 수정합니다.
?>
</div><!-- container End -->

<div id="nav">
    <ul>
        <!--<li class="nav_li"><button type="button" class="cate_btn"><i class="fa fa-bars"></i><span class="txt">카테고리</span></button></li>-->
        <li class="nav_li" class="nav_li"><a href="<?php echo G5_SHOP_URL; ?>/"><img src="/img/tail_1.png" width="25px" height="25px"><span class="txt">　</span></a></li>
        <li class="nav_li" class="nav_li"><a href="<?php echo G5_SHOP_URL; ?>/mytoken.php"><img src="/img/tail_2.png" width="25px" height="25px"><span class="txt">　</span></a></li>
        <li class="nav_li" class="nav_li"><a href="<?php echo G5_SHOP_URL; ?>/mypage.php"><img src="/img/tail_3.png" width="25px" height="25px"><span class="txt">　</span></a></li>
    </ul>

    <?php
    $save_file = G5_DATA_PATH.'/cache/theme/lemon/keyword.php';
    if(is_file($save_file))
        include($save_file);

    if(!empty($keyword)) {
    ?>
    <div id="ppl_word">
        <h4>인기검색어</h4>
        <ol>
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
    <button type="button" class="btn_close"><span class="sound_only">닫기</span><i class="fa fa-times"></i></button>

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
    
    <?php include(G5_MSHOP_SKIN_PATH.'/boxtodayview.skin.php'); // 오늘 본 상품 ?>

</div>

<script>
/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("nav").style.bottom = "0";
  } else {
    document.getElementById("nav").style.bottom = "0";
  }
  prevScrollpos = currentScrollPos;
}
</script>

<?php
$sec = get_microtime() - $begin_time;
$file = $_SERVER['SCRIPT_NAME'];

if ($config['cf_analytics']) {
    echo $config['cf_analytics'];
}
?>
<script>

    $(".cate_btn").on("click", function() {
        $("#category").show();
    });

    $(".menu_close").on("click", function() {
        $(".menu").hide();
    });
     $(".cate_bg").on("click", function() {
        $(".menu").hide();
    });

    $(".menu_close").on("click", function() {
        $(".menu").hide();
    });

    $(".stv_btn").on("click", function() {
        $("#stv").show();
    });

    $("#stv .btn_close").on("click", function() {
        $("#stv").hide();
    });


    $(".sch_btn").on("click", function() {
        $("#hd_sch").show();
    });

    $("#hd_sch .btn_close").on("click", function() {
        $("#hd_sch").hide();
    });

</script>
<script src="<?php echo G5_JS_URL; ?>/sns.js"></script>

<?php
include_once(G5_THEME_PATH.'/tail.sub.php');
?>
