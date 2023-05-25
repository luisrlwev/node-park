<?php

if ( ! function_exists( 'aarhus_select_map_post_gallery_meta' ) ) {
	
	function aarhus_select_map_post_gallery_meta() {
		$gallery_post_format_meta_box = aarhus_select_create_meta_box(
			array(
				'scope' => array( 'post' ),
				'title' => esc_html__( 'Gallery Post Format', 'aarhus' ),
				'name'  => 'post_format_gallery_meta'
			)
		);
		
		aarhus_select_add_multiple_images_field(
			array(
				'name'        => 'qodef_post_gallery_images_meta',
				'label'       => esc_html__( 'Gallery Images', 'aarhus' ),
				'description' => esc_html__( 'Choose your gallery images', 'aarhus' ),
				'parent'      => $gallery_post_format_meta_box,
			)
		);
	}
	
	add_action( 'aarhus_select_action_meta_boxes_map', 'aarhus_select_map_post_gallery_meta', 21 );
}
