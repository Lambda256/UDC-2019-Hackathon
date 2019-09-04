<?php
include_once('../../../common.php');

if($is_admin != 'super')
    alert('최고관리자로 로그인 후 이용해 주십시오.', G5_URL);
?>