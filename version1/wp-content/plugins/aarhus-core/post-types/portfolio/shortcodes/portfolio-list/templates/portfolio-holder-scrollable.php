<div class="qodef-portfolio-list-holder <?php echo esc_attr( $holder_classes ); ?>" <?php echo wp_kses( $holder_data, array( 'data' ) ); ?>>
    <div class="qodef-pl-inner qodef-outer-space clearfix">
		<?php
		if ( $query_results->have_posts() ):

			$counter = 0;
			$scrollable_item = '-meta-item';
			$thumb_html = ''; ?>

            <div class="qodef-ptf-list-showcase-meta">
                <div class="qodef-ptf-list-showcase-meta-inner">
                    <div class="qodef-ptf-list-showcase-meta-items-holder">

						<?php while ( $query_results->have_posts() ) : $query_results->the_post();

							echo aarhus_core_get_cpt_shortcode_module_template_part( 'portfolio', 'portfolio-list', 'portfolio-item', 'scrollable-meta-item', $params );

							$thumb_html .= aarhus_core_get_cpt_shortcode_module_template_part( 'portfolio', 'portfolio-list', 'portfolio-item', 'scrollable-preview-item', '', $params );

						endwhile; ?>

                    </div> <!-- close .qodef-ptf-list-showcase-meta-items-holder -->
                </div> <!-- close .qodef-ptf-list-showcase-meta-inner -->
            </div> <!-- close .qodef-ptf-list-showcase-meta -->
            <div class="qodef-ptf-list-showcase-preview">
				<?php print aarhus_select_get_module_part( $thumb_html ); ?>
            </div> <!-- close .qodef-ptf-list-showcase-preview -->

		<?php else:
			echo aarhus_core_get_cpt_shortcode_module_template_part( 'portfolio', 'portfolio-list', 'parts/posts-not-found' );
		endif;

		wp_reset_postdata();
		?>
    </div>
</div>