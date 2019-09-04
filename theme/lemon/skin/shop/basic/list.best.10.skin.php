<?php
if (!defined("_GNUBOARD_")) exit; // 개별 페이지 접근 불가

?>

<?php
if($this->total_count > 0) {
    $k = 1;

    for ($i=0; $row=sql_fetch_array($result); $i++) {
        if($i == 0) {
            echo '<section id="best_item">'.PHP_EOL;
            echo '<h2>베스트상품</h2>'.PHP_EOL;
            echo '<ul class="sct_best">'.PHP_EOL;
        }

        if($i > 0 && ($i % $this->list_mod == 0)) {
            echo '</ul>'.PHP_EOL;
            echo '<ul class="sct_best">'.PHP_EOL;
            $k++;
        }

        echo '<li class="sct_li">'.PHP_EOL;

        if ($this->href) {
            echo '<div class="sct_img"><a href="'.$this->href.$row['it_id'].'" class="sct_a">'.PHP_EOL;
        }

        if ($this->view_it_img) {
            echo get_it_image($row['it_id'], $this->img_width, $this->img_height, '', '', stripslashes($row['it_name'])).PHP_EOL;
        }

        if ($this->href) {
            echo '</a></div>'.PHP_EOL;
        }

        if ($this->view_it_id) {
            echo '<div class="sct_id">&lt;'.stripslashes($row['it_id']).'&gt;</div>'.PHP_EOL;
        }

        if ($this->href) {
            echo '<div class="sct_txt"><a href="'.$this->href.$row['it_id'].'" class="sct_a">'.PHP_EOL;
        }

        if ($this->view_it_name) {
            echo stripslashes($row['it_name']).PHP_EOL;
        }

        if ($this->href) {
            echo '</a></div>'.PHP_EOL;
        }

        if ($this->view_it_price) {
            echo '<div class="sct_cost">'.display_price(get_price($row), $row['it_tel_inq']).'</div>'.PHP_EOL;
        }

        echo '</li>'.PHP_EOL;
    }

    if($i > 0) {
        echo '</ul>'.PHP_EOL;
        echo '</section>'.PHP_EOL;
    }
?>



<?php
}
?>