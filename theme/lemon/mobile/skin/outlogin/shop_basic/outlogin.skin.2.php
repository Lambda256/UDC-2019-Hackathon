<?php
if (!defined("_GNUBOARD_")) exit; // 개별 페이지 접근 불가

// add_stylesheet('css 구문', 출력순서); 숫자가 작을 수록 먼저 출력됨
add_stylesheet('<link rel="stylesheet" href="'.$outlogin_skin_url.'/style.css">', 0);
?>

<!-- 로그인 후 외부로그인 시작 -->
<aside id="ol_after" class="ol">
   
    <h2>나의 회원정보</h2>
    <div id="ol_after_hd">
        <span class="profile_img">
            <?php echo get_member_profile_img($member['mb_id'], 60, 60); ?>
            <a href="<?php echo G5_BBS_URL ?>/member_confirm.php?url=register_form.php" id="ol_after_info"><i class="fa fa-cog" aria-hidden="true"></i><span class="sound_only">정보수정</span></a>
        </span>
        <?php if ($member[mb_id] && $member[mb_level] == 2) { ?>
            <strong>안녕하세요!</strong>
            <strong id="users"><?php echo $nick ?>님, 😊</strong>
        <?php } elseif ($member[mb_id] && $member[mb_level] == 3) { ?>
            <strong>안녕하세요!2</strong>
            <strong id="driver_user"><?php echo $nick ?>기사님, 😊</strong>
        <?php } else { ?>
            <strong>안녕하세요!</strong>
            <strong id="admin_user">관리자님, 😊</strong>
        <?php } ?> 
        <br>
        <?php if ($member[mb_id] && $member[mb_level] >= 2) { ?>
            <?php if ($member['mb_1'] == NULL) { ?>
                <center><button class="new_wallet" onclick="backand_get_wallet();"><img src="<?php echo G5_THEME_MSHOP_URL ?>/img/lnv_white.png" width="18px" height="18px" align="top"> <?php echo $member['mb_id'] ?>(<?php echo $member['mb_no'] ?>)님, 루니버스 지갑 생성하기</button></center>
                <span id="ming1"></span>
            <?php } else { ?>
                <span id="ming1" style="visibility: hidden;"><?php echo $member['mb_1'] ?></span>
            <?php } ?>
        <?php } ?>
        <div id="ol_after_btn">
            <?php if ($is_admin == 'super' || $is_auth) { ?><a href="<?php echo G5_ADMIN_URL ?>" class="btn_admin">관리자</a><?php } ?>
            <a href="<?php echo G5_BBS_URL ?>/logout.php" id="ol_after_logout">로그아웃</a>
        </div>
    </div>

  

</aside>

<script>
// 탈퇴의 경우 아래 코드를 연동하시면 됩니다.
function member_leave()
{
    if (confirm("정말 회원에서 탈퇴 하시겠습니까?"))
        location.href = "<?php echo G5_BBS_URL ?>/member_confirm.php?url=member_leave.php";
}
</script>
<!-- 로그인 후 외부로그인 끝 -->
