<?php if ($enable_parallax === 'yes') {
     if ( has_post_thumbnail() ) { ?>
        <div class="qodef-pvli-image qodef-parallax-row-holder" style="background-image: url('<?php echo get_the_post_thumbnail_url( get_the_ID() ); ?>')" data-parallax-bg-image="<?php echo get_the_post_thumbnail_url( get_the_ID() ); ?>"></div>
    <?php } else { ?>
        <div class="qodef-pvli-image qodef-parallax-row-holder" style="background-image: url('<?php echo AARHUS_CORE_CPT_URL_PATH.'/portfolio/assets/img/portfolio_featured_image.jpg'; ?>')" data-parallax-bg-image="<?php echo AARHUS_CORE_CPT_URL_PATH.'/portfolio/assets/img/portfolio_featured_image.jpg'; ?>"></div>
    <?php }
 } else { ?>
    <div class="qodef-pvli-image">
        <?php if ( has_post_thumbnail() ) {
            echo get_the_post_thumbnail( get_the_ID(), 'full' );
        } else { ?>
        <img itemprop="image" class="qodef-pvl-original-image" width="800" height="600" src="<?php echo AARHUS_CORE_CPT_URL_PATH.'/portfolio/assets/img/portfolio_featured_image.jpg'; ?>" alt="<?php esc_attr_e('Portfolio Featured Image', 'aarhus-core'); ?>" />
        <?php } ?>
    </div>
<?php } ?>
