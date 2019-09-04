<?php
include_once('./_common.php');

$sql_common = " from {$g5['member_table']} ";

$sql_search = " where (1) ";
// $sql_search .= " and mb_id != '{$config[cf_admin]}' "; // 최고관리자 제외

$sql_order = " order by mb_point desc "; // 포인트 순위로 정렬

$sql = " select count(*) as cnt {$sql_common} {$sql_search} {$sql_order} ";
$row = sql_fetch($sql);
$total_count = $row['cnt'];

$rows = 20; // 목록수
$total_page  = ceil($total_count / $rows);  // 전체 페이지 계산
if ($page < 1) $page = 1; // 페이지가 없으면 첫 페이지 (1 페이지)
$from_record = ($page - 1) * $rows; // 시작 열을 구함

$g5['title'] = '회원 전체목록';
include_once(G5_PATH.'/head.php');
?>
<style>
#member_list {font-size:1.2em}
#member_list .member_total {margin:10px 0;padding:15px 10px;margin:10px 0;border:1px solid #ccc;background:#fff;}
#member_list .tbl_head01 thead th {padding:10px 5px;}
#member_list .tbl_head01 td {}
#member_list .td_1 {width:0px;text-align:center}
#member_list .td_2 {width:80px;text-align:center}
</style>

<style type="text/css">
.hello {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 120px;
    color:#0b66ff;
    right:20px;
}
</style>

<div id="member_list">
    <div class="tbl_head01 tbl_wrap">
        <table>
        <thead>
        <tr>
            <th>성함</th>
            <th style="text-align:left">닉네임</th>
            <th>지갑</th>
            <th>토큰 기부하기</th>
        </tr>
        </thead>
       <tbody>
        <?php
        $sql = " select * {$sql_common} {$sql_search} {$sql_order} limit {$from_record}, {$rows} ";
        $result = sql_query($sql);
        for ($i=0; $row=sql_fetch_array($result); $i++) {
            $mb_nick = get_sideview($row['mb_id'], get_text($row['mb_nick']), $row['mb_email'], $row['mb_homepage']);
        ?>
        <tr>
            <td class="td_1"><?php echo $row['mb_name']; ?></td>
            <td><?php echo $mb_nick; ?></td>
            <td class="td_1"><p class="hello"><?php echo $row['mb_1']; ?></p></td>
            <td style="text-align: center;"><i class="fa fa-paper-plane" aria-hidden="true"></i><br>기부</td>
            <!--<td class="td_2"><?php echo $row['mb_level']; ?></td>
            <td class="td_1"><?php echo substr($row['mb_datetime'],2,8); ?></td>
            <td class="td_1"><?php echo number_format($row['mb_point']) ?></td>-->
        </tr>
        <?php } ?>
        </tbody>
        </table>
    </div>
</div>

<?php echo get_paging(G5_IS_MOBILE ? $config['cf_mobile_pages'] : $config['cf_write_pages'], $page, $total_page, '?'.$qstr.'&amp;page='); ?>

<?php
include_once(G5_PATH.'/tail.php');
?>