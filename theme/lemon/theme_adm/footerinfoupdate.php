<?php
include_once('./_common.php');

@mkdir(G5_DATA_PATH."/cache/theme", G5_DIR_PERMISSION);
@chmod(G5_DATA_PATH."/cache/theme", G5_DIR_PERMISSION);
@mkdir(G5_DATA_PATH."/cache/theme/lemon", G5_DIR_PERMISSION);
@chmod(G5_DATA_PATH."/cache/theme/lemon", G5_DIR_PERMISSION);

$data = array();

function escape_post_data($data)
{
    return str_replace(array("\'", '\"', "'", '"'), '', strip_tags(trim($data)));
}

$tel       = preg_replace('#[^0-9\-\.]#', '', $_POST['tel']);
$etc       = escape_post_data($_POST['etc']);
$depositor = escape_post_data($_POST['depositor']);
$account   = escape_post_data($_POST['account']);

if(!$tel)
    alert('전화번호를 입력해 주십시오.');



$data = array('tel' => $tel, 'etc' => $etc, 'depositor' => $depositor, 'account' => $account);

$save_file = G5_DATA_PATH.'/cache/theme/lemon/footerinfo.php';

// 캐시파일로 저장
$cache_fwrite = true;
if($cache_fwrite) {
    $handle = fopen($save_file, 'w');
    $cache_content = "<?php\nif (!defined('_GNUBOARD_')) exit;";
    $cache_content .= "\n\n\$footerinfo=".var_export($data, true).";";
    fwrite($handle, $cache_content);
    fclose($handle);
}

goto_url('./footerinfo.php');
?>