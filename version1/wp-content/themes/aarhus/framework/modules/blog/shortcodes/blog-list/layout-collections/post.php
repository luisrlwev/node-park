<li class="qodef-bl-item qodef-item-space">
	<div class="qodef-bli-inner">
		<?php if ( $post_info_image == 'yes' ) {
			aarhus_select_get_module_template_part( 'templates/parts/media', 'blog', '', $params );
		} ?>
        <div class="qodef-bli-content">
            <?php if ($post_info_section == 'yes') { ?>
                <div class="qodef-bli-info">
	                <?php
		                if ( $post_info_date == 'yes' ) {
			                aarhus_select_get_module_template_part( 'templates/parts/post-info/date', 'blog', '', $params );
		                }
		                if ( $post_info_category == 'yes' ) {
			                aarhus_select_get_module_template_part( 'templates/parts/post-info/category', 'blog', '', $params );
		                }
		                if ( $post_info_author == 'yes' ) {
			                aarhus_select_get_module_template_part( 'templates/parts/post-info/author', 'blog', '', $params );
		                }
		                if ( $post_info_comments == 'yes' ) {
			                aarhus_select_get_module_template_part( 'templates/parts/post-info/comments', 'blog', '', $params );
		                }
		                if ( $post_info_share == 'yes' ) {
			                aarhus_select_get_module_template_part( 'templates/parts/post-info/share', 'blog', '', $params );
		                }
	                ?>
                </div>
            <?php } ?>
	
	        <?php aarhus_select_get_module_template_part( 'templates/parts/title', 'blog', '', $params ); ?>
	
	        <div class="qodef-bli-excerpt">
                <?php aarhus_select_get_module_template_part('templates/parts/excerpt', 'blog', '', $params); ?>
				<?php if ($read_more_button == 'yes') {
		            aarhus_select_get_module_template_part( 'templates/parts/post-info/read-more', 'blog', '', $params );
                } ?>
	        </div>
	        <?php if ( $enable_link_over == 'yes' ) { ?>
                <a class="qodef-bli-link-over" itemprop="url" href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>"></a>
	        <?php } ?>
        </div>
	</div>
</li>