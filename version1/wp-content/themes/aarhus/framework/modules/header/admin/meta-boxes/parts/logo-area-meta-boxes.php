<?php

if ( ! function_exists( 'aarhus_select_get_hide_dep_for_header_logo_area_meta_boxes' ) ) {
	function aarhus_select_get_hide_dep_for_header_logo_area_meta_boxes() {
		$hide_dep_options = apply_filters( 'aarhus_select_filter_header_logo_area_hide_meta_boxes', $hide_dep_options = array() );
		
		return $hide_dep_options;
	}
}


if ( ! function_exists( 'aarhus_select_header_logo_area_meta_options_map' ) ) {
	function aarhus_select_header_logo_area_meta_options_map( $header_meta_box ) {
		$hide_dep_options = aarhus_select_get_hide_dep_for_header_logo_area_meta_boxes();
		
		$logo_area_container = aarhus_select_add_admin_container_no_style(
			array(
				'type'            => 'container',
				'name'            => 'logo_area_container',
				'parent'          => $header_meta_box,
				'dependency' => array(
					'hide' => array(
						'qodef_header_type_meta'  => $hide_dep_options
					)
				)
			)
		);
		
		aarhus_select_add_admin_section_title(
			array(
				'parent' => $logo_area_container,
				'name'   => 'logo_area_style',
				'title'  => esc_html__( 'Logo Area Style', 'aarhus' )
			)
		);
		
		aarhus_select_create_meta_box_field(
			array(
				'name'          => 'qodef_logo_area_in_grid_meta',
				'type'          => 'select',
				'label'         => esc_html__( 'Logo Area In Grid', 'aarhus' ),
				'description'   => esc_html__( 'Set menu area content to be in grid', 'aarhus' ),
				'parent'        => $logo_area_container,
				'default_value' => '',
				'options'       => aarhus_select_get_yes_no_select_array()
			)
		);
		
		$logo_area_in_grid_container = aarhus_select_add_admin_container(
			array(
				'type'            => 'container',
				'name'            => 'logo_area_in_grid_container',
				'parent'          => $logo_area_container,
				'dependency' => array(
					'show' => array(
						'qodef_logo_area_in_grid_meta'  => 'yes'
					)
				)
			)
		);
		
		aarhus_select_create_meta_box_field(
			array(
				'name'        => 'qodef_logo_area_grid_background_color_meta',
				'type'        => 'color',
				'label'       => esc_html__( 'Grid Background Color', 'aarhus' ),
				'description' => esc_html__( 'Set grid background color for logo area', 'aarhus' ),
				'parent'      => $logo_area_in_grid_container
			)
		);
		
		aarhus_select_create_meta_box_field(
			array(
				'name'        => 'qodef_logo_area_grid_background_transparency_meta',
				'type'        => 'text',
				'label'       => esc_html__( 'Grid Background Transparency', 'aarhus' ),
				'description' => esc_html__( 'Set grid background transparency for logo area (0 = fully transparent, 1 = opaque)', 'aarhus' ),
				'parent'      => $logo_area_in_grid_container,
				'args'        => array(
					'col_width' => 2
				)
			)
		);
		
		aarhus_select_create_meta_box_field(
			array(
				'name'          => 'qodef_logo_area_in_grid_border_meta',
				'type'          => 'select',
				'label'         => esc_html__( 'Grid Area Border', 'aarhus' ),
				'description'   => esc_html__( 'Set border on grid logo area', 'aarhus' ),
				'parent'        => $logo_area_in_grid_container,
				'default_value' => '',
				'options'       => aarhus_select_get_yes_no_select_array()
			)
		);
		
		$logo_area_in_grid_border_container = aarhus_select_add_admin_container(
			array(
				'type'            => 'container',
				'name'            => 'logo_area_in_grid_border_container',
				'parent'          => $logo_area_in_grid_container,
				'dependency' => array(
					'show' => array(
						'qodef_logo_area_in_grid_border_meta'  => 'yes'
					)
				)
			)
		);
		
		aarhus_select_create_meta_box_field(
			array(
				'name'        => 'qodef_logo_area_in_grid_border_color_meta',
				'type'        => 'color',
				'label'       => esc_html__( 'Border Color', 'aarhus' ),
				'description' => esc_html__( 'Set border color for grid area', 'aarhus' ),
				'parent'      => $logo_area_in_grid_border_container
			)
		);
		
		aarhus_select_create_meta_box_field(
			array(
				'name'        => 'qodef_logo_area_background_color_meta',
				'type'        => 'color',
				'label'       => esc_html__( 'Background Color', 'aarhus' ),
				'description' => esc_html__( 'Choose a background color for logo area', 'aarhus' ),
				'parent'      => $logo_area_container
			)
		);
		
		aarhus_select_create_meta_box_field(
			array(
				'name'        => 'qodef_logo_area_background_transparency_meta',
				'type'        => 'text',
				'label'       => esc_html__( 'Transparency', 'aarhus' ),
				'description' => esc_html__( 'Choose a transparency for the logo area background color (0 = fully transparent, 1 = opaque)', 'aarhus' ),
				'parent'      => $logo_area_container,
				'args'        => array(
					'col_width' => 2
				)
			)
		);
		
		aarhus_select_create_meta_box_field(
			array(
				'name'          => 'qodef_logo_area_border_meta',
				'type'          => 'select',
				'label'         => esc_html__( 'Logo Area Border', 'aarhus' ),
				'description'   => esc_html__( 'Set border on logo area', 'aarhus' ),
				'parent'        => $logo_area_container,
				'default_value' => '',
				'options'       => aarhus_select_get_yes_no_select_array()
			)
		);
		
		$logo_area_border_bottom_color_container = aarhus_select_add_admin_container(
			array(
				'type'            => 'container',
				'name'            => 'logo_area_border_bottom_color_container',
				'parent'          => $logo_area_container,
				'dependency' => array(
					'show' => array(
						'qodef_logo_area_border_meta'  => 'yes'
					)
				)
			)
		);
		
		aarhus_select_create_meta_box_field(
			array(
				'name'        => 'qodef_logo_area_border_color_meta',
				'type'        => 'color',
				'label'       => esc_html__( 'Border Color', 'aarhus' ),
				'description' => esc_html__( 'Choose color of header bottom border', 'aarhus' ),
				'parent'      => $logo_area_border_bottom_color_container
			)
		);

		aarhus_select_create_meta_box_field(
			array(
				'name'        => 'qodef_logo_area_height_meta',
				'type'        => 'text',
				'label'       => esc_html__( 'Height', 'aarhus' ),
				'description' => esc_html__( 'Enter logo area height (default is 90px)', 'aarhus' ),
				'parent'      => $logo_area_container,
				'args'        => array(
					'col_width' => 3,
					'suffix'    => esc_html__( 'px', 'aarhus' )
				)
			)
		);
		
		do_action( 'aarhus_select_action_header_logo_area_additional_meta_boxes_map', $logo_area_container );
	}
	
	add_action( 'aarhus_select_action_header_logo_area_meta_boxes_map', 'aarhus_select_header_logo_area_meta_options_map', 10, 1 );
}