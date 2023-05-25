<?php
$post_link_hover_image_meta = get_post_meta(get_the_ID(), "qodef_post_link_hover_image_meta", true );

if(isset($post_link_hover_image_meta) && $post_link_hover_image_meta != '') {
	$enable_hover_image = 'yes';
} else {
	$enable_hover_image = 'no';
}
?>

<article id="post-<?php the_ID(); ?>" <?php post_class($post_classes); ?>>
    <div class="qodef-post-content">
        <div class="qodef-post-text">
            <div class="qodef-post-text-inner">
				<?php if(aarhus_select_options()->getOptionValue('show_additional_blog_info') === 'yes') { ?>
                    <div class="qodef-post-info-top">
						<?php
						aarhus_select_get_module_template_part('templates/parts/post-info/category', 'blog', '', $part_params);
						aarhus_select_get_module_template_part('templates/parts/post-info/tags', 'blog', '', $part_params);
						?>
                    </div>
				<?php } ?>
                <div class="qodef-post-text-main">
					<?php aarhus_select_get_module_template_part('templates/parts/post-type/link', 'blog', '', $part_params); ?>
                </div>
                <div class="qodef-post-info-bottom clearfix">
					<?php aarhus_select_get_module_template_part('templates/parts/post-info/date', 'blog', '', $part_params); ?>
					<?php aarhus_select_get_module_template_part('templates/parts/post-info/author', 'blog', '', $part_params); ?>
					<?php
					if(aarhus_select_options()->getOptionValue('show_additional_blog_info') === 'yes') {
						aarhus_select_get_module_template_part('templates/parts/post-info/comments', 'blog', '', $part_params);
					} ?>
                </div>
            </div>
        </div>
    </div>
    <div class="qodef-post-content-hover-overlay" style="<?php echo esc_attr(($enable_hover_image === 'yes') ? 'background-image: url("'.$post_link_hover_image_meta.'")' : 'background-image: none'); ?>"></div>
</article>