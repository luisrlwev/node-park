<div class="qodef-ptf-list-showcase-meta-item">
	<?php if ( $additional_data == 'year' ) { ?>
        <span class="qodef-ptf-meta-item-date-year"><?php the_time( 'Y' ); ?></span>
	<?php } else {
		print aarhus_select_get_module_part( $category_html );
	} ?>
    <<?php echo esc_attr( $title_tag ) ?> class="qodef-ptf-meta-item-title">
    <a href="<?php echo esc_url( $this_object->getItemLink() ); ?>" target="<?php echo esc_attr( $this_object->getItemLinkTarget() ); ?>"><?php the_title(); ?></a>
</<?php echo esc_attr( $title_tag ) ?>>
<div class="qodef-ptf-view-holder">
	<?php echo aarhus_core_get_cpt_shortcode_module_template_part( 'portfolio', 'portfolio-list', 'parts/category', $item_style, $params ); ?>
</div>
</div>