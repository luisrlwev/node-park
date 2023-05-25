<?php
$month = get_the_time('m');
$year = get_the_time('Y');
$title = get_the_title();
?>
<div itemprop="dateCreated" class="qodef-post-info-date entry-date published updated">
    <?php if(empty($title) && aarhus_select_blog_item_has_link()) { ?>
        <a itemprop="url" href="<?php the_permalink() ?>">
    <?php } else { ?>
        <a itemprop="url" href="<?php echo get_month_link($year, $month); ?>">
    <?php } ?>
            <span class="qodef-post-info-date-date"><?php the_time('j'); ?></span>
            <span class="qodef-post-info-date-month"><?php the_time('M'); ?></span>
        </a>
    <meta itemprop="interactionCount" content="UserComments: <?php echo get_comments_number(aarhus_select_get_page_id()); ?>"/>
</div>