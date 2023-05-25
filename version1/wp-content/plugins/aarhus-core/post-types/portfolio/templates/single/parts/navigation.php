<?php if(aarhus_select_options()->getOptionValue('portfolio_single_hide_pagination') !== 'yes') : ?>
    <?php
    $back_to_link = get_post_meta(get_the_ID(), 'portfolio_single_back_to_link', true);
    $nav_same_category = aarhus_select_options()->getOptionValue('portfolio_single_nav_same_category') == 'yes';
    ?>
    <div class="qodef-ps-navigation">
        <?php if(get_previous_post() !== '') : ?>
            <div class="qodef-ps-prev">
                <?php if($nav_same_category) {
	                previous_post_link('%link','<span class="qodef-ps-nav-mark lnr lnr-chevron-left"></span>', true, '', 'portfolio-category');
                } else {
	                previous_post_link('%link','<span class="qodef-ps-nav-mark lnr lnr-chevron-left"></span>');
                } ?>
            </div>
        <?php endif; ?>

        <?php if($back_to_link !== '') : ?>
            <div class="qodef-ps-back-btn">
                <a itemprop="url" href="<?php echo esc_url(get_permalink($back_to_link)); ?>">
                    <span class="qodef-ps-square"></span>
                    <span class="qodef-ps-square"></span>
                    <span class="qodef-ps-square"></span>
                    <span class="qodef-ps-square"></span>
                </a>
            </div>
        <?php endif; ?>

        <?php if(get_next_post() !== '') : ?>
            <div class="qodef-ps-next">
                <?php if($nav_same_category) {
                    next_post_link('%link', '<span class="qodef-ps-nav-mark lnr lnr-chevron-right"></span>', true, '', 'portfolio-category');
                } else {
                    next_post_link('%link', '<span class="qodef-ps-nav-mark lnr lnr-chevron-right"></span>');
                } ?>
            </div>
        <?php endif; ?>
    </div>
<?php endif; ?>