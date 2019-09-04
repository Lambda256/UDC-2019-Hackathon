<?php
if (!defined('_GNUBOARD_')) exit; // 개별 페이지 접근 불가
?>

<ul>
<?php
$sql = " select * from {$g5['g5_shop_category_table']} where ca_use = '1' and length(ca_id) = '2' order by ca_id asc ";
$result = sql_query($sql);

for($i=0; $row=sql_fetch_array($result); $i++) {
    if($i == 0)
        $li_first = ' class="menu_li_first"';
    else
        $li_first = '';

    $ca_name = get_text($row['ca_name']);
?>
    <li<?php echo $li_first; ?>>
        <?php echo $ca_name; ?>
        <button type="button" class="btn_1 category_add" data-ca="<?php echo $row['ca_id']; ?>" data-name="<?php echo $ca_name; ?>">추가</button>
    </li>
<?php
}

if($i == 0)
    echo '<li class="empty_category">등록된 분류가 없습니다.</li>';
?>
</ul>