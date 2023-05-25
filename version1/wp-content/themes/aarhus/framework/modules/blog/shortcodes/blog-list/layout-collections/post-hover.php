<?php
$has_featured = has_post_thumbnail();

if ( ( $post_info_image == 'yes' ) && !empty($has_featured) ) {
	$background_image = get_the_post_thumbnail_url();
	$mode = ' qodef-info-image-enabled';
} else {
	$background_image = '';
	$mode = ' qodef-info-image-disabled';
}
?>

<li <?php post_class('qodef-bl-item qodef-item-space'.$mode); ?>>
	<div class="qodef-bli-inner">
		<?php aarhus_select_get_module_template_part( 'templates/parts/title', 'blog', '', $params ); ?>
		<div class="qodef-bli-content">
            <div class="qodef-bli-excerpt">
				<?php aarhus_select_get_module_template_part( 'templates/parts/excerpt', 'blog', '', $params ); ?>
            </div>
			<?php if ($post_info_section == 'yes') { ?>
				<div class="qodef-bli-info">
                    <div class="qodef-bli-info-top">
						<?php
						if ( $post_info_author == 'yes' ) {
							aarhus_select_get_module_template_part( 'templates/parts/post-info/author', 'blog', '', $params );
						}
						if ( $post_info_category == 'yes' ) {
							aarhus_select_get_module_template_part( 'templates/parts/post-info/category', 'blog', '', $params );
						}
						if ( $post_info_share == 'yes' ) {
							aarhus_select_get_module_template_part( 'templates/parts/post-info/share', 'blog', '', $params );
						}
						?>
                    </div>
                    <div class="qodef-bli-info-bottom">
						<?php
						if ( $post_info_date == 'yes' ) {
							aarhus_select_get_module_template_part( 'templates/parts/post-info/date', 'blog', '', $params );
						}
						if ( ( $post_info_date == 'yes' ) && ( $post_info_comments == 'yes' ) ) {
						    echo "<span class='qodef-bli-info-separator'></span>";
                        }
						if ( $post_info_comments == 'yes' ) {
							aarhus_select_get_module_template_part( 'templates/parts/post-info/comments', 'blog', '', $params );
						}
						?>
                    </div>
				</div>
			<?php } ?>
			<?php if ( $enable_link_over == 'yes' ) { ?>
                <a class="qodef-bli-link-over" itemprop="url" href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>"></a>
			<?php } ?>
		</div>
        <div class="qodef-bli-inner-hover-overlay" style="background-image: url('<?php echo esc_attr($background_image); ?>');">
            <div class="qodef-bli-inner-hover-color-overlay"></div>
        </div>
	</div>
</li>