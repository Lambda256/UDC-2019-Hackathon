<?php
include_once('./_common.php');

$g5['title'] = '마이페이지';

include_once(G5_THEME_SHOP_PATH.'/shop.head.php');

?>

<!-- 마이페이지 시작 { -->
<div id="smb_my">

   <section id="smb_my_ov">
        <h2>회원정보 개요1231232?</h2>
        <div class="smb_my_ov_wr">    
            <div class="hello_name">
                <div class="my_name">
                    <strong><?php echo get_member_profile_img($member['mb_id']); ?><?php echo $member['mb_id'] ? $member['mb_name'] : '비회원'; ?></strong>님
                </div>

            </div>
       
            <dl class="my_info">
                <dt>연락처</dt>
                <dd><?php echo ($member['mb_tel'] ? $member['mb_tel'] : '미등록'); ?></dd>
                <dt>E-Mail</dt>
                <dd><?php echo ($member['mb_email'] ? $member['mb_email'] : '미등록'); ?></dd>
                <dt>최종접속일시</dt>
                <dd><?php echo $member['mb_today_login']; ?></dd>
                <dt>회원가입일시</dt>
                <dd><?php echo $member['mb_datetime']; ?></dd>
                <dt class="add">주소</dt>
                <dd class="add"><?php echo sprintf("(%s%s)", $member['mb_zip1'], $member['mb_zip2']).' '.print_address($member['mb_addr1'], $member['mb_addr2'], $member['mb_addr3'], $member['mb_addr_jibeon']); ?></dd>
            </dl>
        </div>

        <ul class="my_cou_wr">
            <li class="my_cou"><a href="<?php echo G5_SHOP_URL; ?>/coupon.php" target="_blank" class="win_coupon"><i class="fa fa-newspaper-o"></i>쿠폰<strong><?php echo number_format($cp_count); ?></strong></a></li>
            <li class="my_po"><a href="<?php echo G5_BBS_URL; ?>/point.php" target="_blank" class="win_point"><i class="fa fa-database"></i> 포인트<strong><?php echo number_format($member['mb_point']); ?></strong></a></li>
            <li><a href="<?php echo G5_BBS_URL ?>/memo.php" target="_blank" id="ol_after_memo" class="win_memo"> <i class="fa fa-envelope-o" aria-hidden="true"></i> 쪽지 <?php echo $memo_not_read ?></a></li>
            <li><a href="<?php echo G5_SHOP_URL; ?>/orderinquiry.php"><i class="fa fa-list-alt" aria-hidden="true"></i>주문내역</a></li>
            <li><a href="<?php echo G5_SHOP_URL; ?>/wishlist.php"><i class="fa fa-heart"></i>위시리스트</a></li>
            <li><a href="<?php echo G5_BBS_URL; ?>/member_confirm.php?url=register_form.php"><i class="fa fa-address-card-o" aria-hidden="true"></i> 정보수정</a></li>
            <li><a href="<?php echo G5_BBS_URL; ?>/member_confirm.php?url=member_leave.php" onclick="return member_leave();"><i class="fa fa-user-times"></i>회원탈퇴</a></li>
        </ul>

    </section>

    <!-- } 회원정보 개요 끝 -->
    <div id="smb_my_wr" >
        <!-- 최근 주문내역 시작 { -->
        <section id="smb_my_od">
            <h2>최근 주문내역123123123</h2>
            <?php
            // 최근 주문내역
            define("_ORDERINQUIRY_", true);

            $limit = " limit 0, 5 ";
            include G5_SHOP_PATH.'/orderinquiry.sub.php';
            ?>

            <div class="smb_my_more">
                <a href="./orderinquiry.php">더보기</a>
            </div>
        </section>
        <!-- } 최근 주문내역 끝 -->

        <!-- 최근 위시리스트 시작 { -->
        <section id="smb_my_wish">
            <h2>최근 위시리스트</h2>

            <ul>

            <?php
            $sql = " select *
                       from {$g5['g5_shop_wish_table']} a,
                            {$g5['g5_shop_item_table']} b
                      where a.mb_id = '{$member['mb_id']}'
                        and a.it_id  = b.it_id
                      order by a.wi_id desc
                      limit 0, 10 ";
            $result = sql_query($sql);
            for ($i=0; $row = sql_fetch_array($result); $i++)
            {
                $image = get_it_image($row['it_id'], 230, 230, true);
            ?>

            <li>
                <div class="smb_my_img"><?php echo $image; ?></div>
                <div class="smb_my_tit"><a href="./item.php?it_id=<?php echo $row['it_id']; ?>"><?php echo stripslashes($row['it_name']); ?></a></div>
                <div class="smb_my_date"><?php echo $row['wi_time']; ?></div>
            </li>

            <?php
            }

            if ($i == 0)
                echo '<li class="empty_li">보관 내역이 없습니다.</li>';
            ?>
            </ul>

            <div class="smb_my_more">
                <a href="./wishlist.php">더보기</a>
            </div>
        </section>
        <!-- } 최근 위시리스트 끝 -->
    </div>
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
<!-- } 마이페이지 끝 -->

<?php
include_once(G5_THEME_SHOP_PATH.'/shop.tail.php');
?>