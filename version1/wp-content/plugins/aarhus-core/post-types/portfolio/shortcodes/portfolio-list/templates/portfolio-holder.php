<div class="qodef-portfolio-list-holder qodef-grid-list qodef-disable-bottom-space <?php echo esc_attr($holder_classes); ?>" <?php echo wp_kses($holder_data, array('data')); ?>>
	<?php echo aarhus_core_get_cpt_shortcode_module_template_part('portfolio', 'portfolio-list', 'parts/filter', '', $params); ?>
    <div class="qodef-pl-inner-holder">
        <div class="qodef-pl-inner qodef-outer-space <?php echo esc_attr($holder_inner_classes); ?> clearfix">
            <?php
                if($query_results->have_posts()):
                    while ( $query_results->have_posts() ) : $query_results->the_post();
                        echo aarhus_core_get_cpt_shortcode_module_template_part('portfolio', 'portfolio-list', 'portfolio-item', $item_type, $params);
                    endwhile;
                else:
                    echo aarhus_core_get_cpt_shortcode_module_template_part('portfolio', 'portfolio-list', 'parts/posts-not-found');
                endif;

                wp_reset_postdata();
            ?>
        </div>
    </div>
	<?php echo aarhus_core_get_cpt_shortcode_module_template_part('portfolio', 'portfolio-list', 'pagination/'.$pagination_type, '', $params, $additional_params); ?>
</div>