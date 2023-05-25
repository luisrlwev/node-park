<?php

if ( ! function_exists( 'aarhus_select_get_title_types_meta_boxes' ) ) {
	function aarhus_select_get_title_types_meta_boxes() {
		$title_type_options = apply_filters( 'aarhus_select_filter_title_type_meta_boxes', $title_type_options = array( '' => esc_html__( 'Default', 'aarhus' ) ) );
		
		return $title_type_options;
	}
}

foreach ( glob( SELECT_FRAMEWORK_MODULES_ROOT_DIR . '/title/types/*/admin/meta-boxes/*.php' ) as $meta_box_load ) {
	include_once $meta_box_load;
}

if ( ! function_exists( 'aarhus_select_map_title_meta' ) ) {
	function aarhus_select_map_title_meta() {
		$title_type_meta_boxes = aarhus_select_get_title_types_meta_boxes();
		
		$title_meta_box = aarhus_select_create_meta_box(
			array(
				'scope' => apply_filters( 'aarhus_select_filter_set_scope_for_meta_boxes', array( 'page', 'post' ), 'title_meta' ),
				'title' => esc_html__( 'Title', 'aarhus' ),
				'name'  => 'title_meta'
			)
		);
		
		aarhus_select_create_meta_box_field(
			array(
				'name'          => 'qodef_show_title_area_meta',
				'type'          => 'select',
				'default_value' => '',
				'label'         => esc_html__( 'Show Title Area', 'aarhus' ),
				'description'   => esc_html__( 'Disabling this option will turn off page title area', 'aarhus' ),
				'parent'        => $title_meta_box,
				'options'       => aarhus_select_get_yes_no_select_array()
			)
		);
		
			$show_title_area_meta_container = aarhus_select_add_admin_container(
				array(
					'parent'          => $title_meta_box,
					'name'            => 'qodef_show_title_area_meta_container',
					'dependency' => array(
						'hide' => array(
							'qodef_show_title_area_meta' => 'no'
						)
					)
				)
			);
		
				aarhus_select_create_meta_box_field(
					array(
						'name'          => 'qodef_title_area_type_meta',
						'type'          => 'select',
						'default_value' => '',
						'label'         => esc_html__( 'Title Area Type', 'aarhus' ),
						'description'   => esc_html__( 'Choose title type', 'aarhus' ),
						'parent'        => $show_title_area_meta_container,
						'options'       => $title_type_meta_boxes
					)
				);
		
				aarhus_select_create_meta_box_field(
					array(
						'name'          => 'qodef_title_area_in_grid_meta',
						'type'          => 'select',
						'default_value' => '',
						'label'         => esc_html__( 'Title Area In Grid', 'aarhus' ),
						'description'   => esc_html__( 'Set title area content to be in grid', 'aarhus' ),
						'options'       => aarhus_select_get_yes_no_select_array(),
						'parent'        => $show_title_area_meta_container
					)
				);
		
				aarhus_select_create_meta_box_field(
					array(
						'name'        => 'qodef_title_area_height_meta',
						'type'        => 'text',
						'label'       => esc_html__( 'Height', 'aarhus' ),
						'description' => esc_html__( 'Set a height for Title Area', 'aarhus' ),
						'parent'      => $show_title_area_meta_container,
						'args'        => array(
							'col_width' => 2,
							'suffix'    => 'px'
						)
					)
				);
				
				aarhus_select_create_meta_box_field(
					array(
						'name'        => 'qodef_title_area_background_color_meta',
						'type'        => 'color',
						'label'       => esc_html__( 'Background Color', 'aarhus' ),
						'description' => esc_html__( 'Choose a background color for title area', 'aarhus' ),
						'parent'      => $show_title_area_meta_container
					)
				);
		
				aarhus_select_create_meta_box_field(
					array(
						'name'        => 'qodef_title_area_background_image_meta',
						'type'        => 'image',
						'label'       => esc_html__( 'Background Image', 'aarhus' ),
						'description' => esc_html__( 'Choose an Image for title area', 'aarhus' ),
						'parent'      => $show_title_area_meta_container
					)
				);
		
				aarhus_select_create_meta_box_field(
					array(
						'name'          => 'qodef_title_area_background_image_behavior_meta',
						'type'          => 'select',
						'default_value' => '',
						'label'         => esc_html__( 'Background Image Behavior', 'aarhus' ),
						'description'   => esc_html__( 'Choose title area background image behavior', 'aarhus' ),
						'parent'        => $show_title_area_meta_container,
						'options'       => array(
							''                    => esc_html__( 'Default', 'aarhus' ),
							'hide'                => esc_html__( 'Hide Image', 'aarhus' ),
							'responsive'          => esc_html__( 'Enable Responsive Image', 'aarhus' ),
							'responsive-disabled' => esc_html__( 'Disable Responsive Image', 'aarhus' ),
							'parallax'            => esc_html__( 'Enable Parallax Image', 'aarhus' ),
							'parallax-zoom-out'   => esc_html__( 'Enable Parallax With Zoom Out Image', 'aarhus' ),
							'parallax-disabled'   => esc_html__( 'Disable Parallax Image', 'aarhus' )
						)
					)
				);
				
				aarhus_select_create_meta_box_field(
					array(
						'name'          => 'qodef_title_area_vertical_alignment_meta',
						'type'          => 'select',
						'default_value' => '',
						'label'         => esc_html__( 'Vertical Alignment', 'aarhus' ),
						'description'   => esc_html__( 'Specify title area content vertical alignment', 'aarhus' ),
						'parent'        => $show_title_area_meta_container,
						'options'       => array(
							''              => esc_html__( 'Default', 'aarhus' ),
							'header-bottom' => esc_html__( 'From Bottom of Header', 'aarhus' ),
							'window-top'    => esc_html__( 'From Window Top', 'aarhus' )
						)
					)
				);
				
				aarhus_select_create_meta_box_field(
					array(
						'name'          => 'qodef_title_area_title_tag_meta',
						'type'          => 'select',
						'default_value' => '',
						'label'         => esc_html__( 'Title Tag', 'aarhus' ),
						'options'       => aarhus_select_get_title_tag( true ),
						'parent'        => $show_title_area_meta_container
					)
				);
				
				aarhus_select_create_meta_box_field(
					array(
						'name'        => 'qodef_title_text_color_meta',
						'type'        => 'color',
						'label'       => esc_html__( 'Title Color', 'aarhus' ),
						'description' => esc_html__( 'Choose a color for title text', 'aarhus' ),
						'parent'      => $show_title_area_meta_container
					)
				);
				
				aarhus_select_create_meta_box_field(
					array(
						'name'          => 'qodef_title_area_subtitle_meta',
						'type'          => 'text',
						'default_value' => '',
						'label'         => esc_html__( 'Subtitle Text', 'aarhus' ),
						'description'   => esc_html__( 'Enter your subtitle text', 'aarhus' ),
						'parent'        => $show_title_area_meta_container,
						'args'          => array(
							'col_width' => 6
						)
					)
				);
		
				aarhus_select_create_meta_box_field(
					array(
						'name'          => 'qodef_title_area_subtitle_tag_meta',
						'type'          => 'select',
						'default_value' => '',
						'label'         => esc_html__( 'Subtitle Tag', 'aarhus' ),
						'options'       => aarhus_select_get_title_tag( true, array( 'p' => 'p' ) ),
						'parent'        => $show_title_area_meta_container
					)
				);
				
				aarhus_select_create_meta_box_field(
					array(
						'name'        => 'qodef_subtitle_color_meta',
						'type'        => 'color',
						'label'       => esc_html__( 'Subtitle Color', 'aarhus' ),
						'description' => esc_html__( 'Choose a color for subtitle text', 'aarhus' ),
						'parent'      => $show_title_area_meta_container
					)
				);
		
		/***************** Additional Title Area Layout - start *****************/
		
		do_action( 'aarhus_select_action_additional_title_area_meta_boxes', $show_title_area_meta_container );
		
		/***************** Additional Title Area Layout - end *****************/
		
	}
	
	add_action( 'aarhus_select_action_meta_boxes_map', 'aarhus_select_map_title_meta', 60 );
}