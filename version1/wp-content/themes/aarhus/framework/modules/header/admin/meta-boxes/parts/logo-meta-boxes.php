<?php

if ( ! function_exists( 'aarhus_select_logo_meta_box_map' ) ) {
	function aarhus_select_logo_meta_box_map() {
		
		$logo_meta_box = aarhus_select_create_meta_box(
			array(
				'scope' => apply_filters( 'aarhus_select_filter_set_scope_for_meta_boxes', array( 'page', 'post' ), 'logo_meta' ),
				'title' => esc_html__( 'Logo', 'aarhus' ),
				'name'  => 'logo_meta'
			)
		);
		
		aarhus_select_create_meta_box_field(
			array(
				'name'        => 'qodef_logo_image_meta',
				'type'        => 'image',
				'label'       => esc_html__( 'Logo Image - Default', 'aarhus' ),
				'description' => esc_html__( 'Choose a default logo image to display ', 'aarhus' ),
				'parent'      => $logo_meta_box
			)
		);
		
		aarhus_select_create_meta_box_field(
			array(
				'name'        => 'qodef_logo_image_dark_meta',
				'type'        => 'image',
				'label'       => esc_html__( 'Logo Image - Dark', 'aarhus' ),
				'description' => esc_html__( 'Choose a default logo image to display ', 'aarhus' ),
				'parent'      => $logo_meta_box
			)
		);
		
		aarhus_select_create_meta_box_field(
			array(
				'name'        => 'qodef_logo_image_light_meta',
				'type'        => 'image',
				'label'       => esc_html__( 'Logo Image - Light', 'aarhus' ),
				'description' => esc_html__( 'Choose a default logo image to display ', 'aarhus' ),
				'parent'      => $logo_meta_box
			)
		);
		
		aarhus_select_create_meta_box_field(
			array(
				'name'        => 'qodef_logo_image_sticky_meta',
				'type'        => 'image',
				'label'       => esc_html__( 'Logo Image - Sticky', 'aarhus' ),
				'description' => esc_html__( 'Choose a default logo image to display ', 'aarhus' ),
				'parent'      => $logo_meta_box
			)
		);
		
		aarhus_select_create_meta_box_field(
			array(
				'name'        => 'qodef_logo_image_mobile_meta',
				'type'        => 'image',
				'label'       => esc_html__( 'Logo Image - Mobile', 'aarhus' ),
				'description' => esc_html__( 'Choose a default logo image to display ', 'aarhus' ),
				'parent'      => $logo_meta_box
			)
		);
	}
	
	add_action( 'aarhus_select_action_meta_boxes_map', 'aarhus_select_logo_meta_box_map', 47 );
}