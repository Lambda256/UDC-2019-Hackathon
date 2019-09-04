<?php
if (!defined('_GNUBOARD_')) exit;

// 설문조사
function poll($skin_dir='basic', $po_id=false)
{
    global $config, $member, $g5, $is_admin;

    // 투표번호가 넘어오지 않았다면 가장 큰(최근에 등록한) 투표번호를 얻는다
    if (!$po_id) {
        $row = sql_fetch(" select MAX(po_id) as max_po_id from {$g5['poll_table']} ");
        $po_id = $row['max_po_id'];
    }

    if(!$po_id)
        return;

    if(preg_match('#^theme/(.+)$#', $skin_dir, $match)) {
        if (G5_IS_MOBILE) {
            $poll_skin_path = G5_THEME_MOBILE_PATH.'/'.G5_SKIN_DIR.'/poll/'.$match[1];
            if(!is_dir($poll_skin_path))
                $poll_skin_path = G5_THEME_PATH.'/'.G5_SKIN_DIR.'/poll/'.$match[1];
            $poll_skin_url = str_replace(G5_PATH, G5_URL, $poll_skin_path);
        } else {
            $poll_skin_path = G5_THEME_PATH.'/'.G5_SKIN_DIR.'/poll/'.$match[1];
            $poll_skin_url = str_replace(G5_PATH, G5_URL, $poll_skin_path);
        }
        //$skin_dir = $match[1];
    } else {
        if (G5_IS_MOBILE) {
            $poll_skin_path = G5_MOBILE_PATH.'/'.G5_SKIN_DIR.'/poll/'.$skin_dir;
            $poll_skin_url  = G5_MOBILE_URL.'/'.G5_SKIN_DIR.'/poll/'.$skin_dir;
        } else {
            $poll_skin_path = G5_SKIN_PATH.'/poll/'.$skin_dir;
            $poll_skin_url  = G5_SKIN_URL.'/poll/'.$skin_dir;
        }
    }

    $po = sql_fetch(" select * from {$g5['poll_table']} where po_id = '$po_id' ");

    ob_start();
    include_once ($poll_skin_path.'/poll.skin.php');
    $content = ob_get_contents();
    ob_end_clean();

    return $content;
}
?>