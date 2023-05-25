<?php

if ( ! function_exists( 'aarhus_select_map_post_link_meta' ) ) {
	function aarhus_select_map_post_link_meta() {
		$link_post_format_meta_box = aarhus_select_create_meta_box(
			array(
				'scope' => array( 'post' ),
				'title' => esc_html__( 'Link Post Format', 'aarhus' ),
				'name'  => 'post_format_link_meta'
			)
		);
		
		aarhus_select_create_meta_box_field(
			array(
				'name'        => 'qodef_post_link_link_meta',
				'type'        => 'text',
				'label'       => esc_html__( 'Link', 'aarhus' ),
				'description' => esc_html__( 'Enter link', 'aarhus' ),
				'parent'      => $link_post_format_meta_box
			)
		);

		aarhus_select_create_meta_box_field(
			array(
				'name'        => 'qodef_post_link_hover_image_meta',
				'type'        => 'image',
				'label'       => esc_html__( 'Hover Image', 'aarhus' ),
				'description' => esc_html__( 'Upload image', 'aarhus' ),
				'parent'      => $link_post_format_meta_box
			)
		);
	}
	
	add_action( 'aarhus_select_action_meta_boxes_map', 'aarhus_select_map_post_link_meta', 24 );
}