<div class="qodef-pis-holder qodef-pis-type-slider <?php echo esc_attr( $holder_classes ); ?>">
    <div class="qodef-pis-image-holder" <?php aarhus_select_inline_style( $image_holder_styles ); ?>>
        <?php $j = 0; ?>
        <?php
        if($query_results->have_posts()):
            while ( $query_results->have_posts() ) : $query_results->the_post(); ?>
                <?php
                $item_style   = array();
                $item_style[] = 'background-image: url(' . get_the_post_thumbnail_url( get_the_ID() ) . ')';
                ?>
                <div class="qodef-pis-item-image" data-index="<?php echo esc_attr($j); ?>" <?php aarhus_select_inline_style( $item_style ); ?>>
                    <?php echo get_the_post_thumbnail( get_the_ID(), 'full' ); ?>
                </div>
                <?php $j++; ?>
            <?php endwhile;
        else:
            echo aarhus_core_get_cpt_shortcode_module_template_part('portfolio', 'portfolio-list', 'parts/posts-not-found');
        endif;

        wp_reset_postdata();
        ?>
    </div>
    <div class="qodef-pis-content-holder">
        <div class="qodef-pis-content-inner">
            <div class="qodef-pis-item-content">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <?php $i = 0; ?>
                        <?php
                        if($query_results->have_posts()):
                            while ( $query_results->have_posts() ) : $query_results->the_post(); ?>
                                <div class="qodef-pis-item-content-holder swiper-slide" data-index="<?php echo esc_attr($i); ?>">
                                    <a itemprop="url" class="qodef-pis-item-link" href="<?php echo esc_url( get_permalink( get_the_ID() ) ); ?>" target="_self">
                                        <span class="qodef-pis-item-title"><?php echo esc_attr(get_the_title()); ?></span>
                                    </a>
                                    <?php $categories = wp_get_post_terms(get_the_ID(), 'portfolio-category'); ?>
                                    <?php if(!empty($categories)) { ?>
                                    <div class="qodef-pis-item-category-holder">
                                        <?php foreach ($categories as $cat) { ?>
                                            <a itemprop="url" class="qodef-pis-item-category" href="<?php echo esc_url(get_term_link($cat->term_id)); ?>"><?php echo esc_html($cat->name); ?></a>
                                        <?php } ?>
                                    </div>
                                    <?php } ?>
                                </div>
                                <?php $i++; ?>
                            <?php endwhile;
                        else:
                            echo aarhus_core_get_cpt_shortcode_module_template_part('portfolio', 'portfolio-list', 'parts/posts-not-found');
                        endif;

                        wp_reset_postdata();
                        ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>