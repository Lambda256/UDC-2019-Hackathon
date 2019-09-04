<?php
include_once('./_common.php');

$save_file = G5_DATA_PATH.'/cache/theme/lemon/keyword.php';

$count = count($_POST['word']);
$words = array();

for($i=0; $i<$count; $i++) {
    $word = str_replace(array("\'", '\"', "'", '"'), '', strip_tags(trim($_POST['word'][$i])));

    if(!$word)
        continue;

    $words[] = $word;
}

// 캐시파일로 저장
$cache_fwrite = true;
if($cache_fwrite) {
    $handle = fopen($save_file, 'w');
    $cache_content = "<?php\nif (!defined('_GNUBOARD_')) exit;";
    $cache_content .= "\n\n\$keyword=".var_export($words, true).";";
    fwrite($handle, $cache_content);
    fclose($handle);
}

goto_url('./keyword.php');
?>