<?php

if ( ! function_exists( 'aarhus_select_skewed_section_title_meta' ) ) {
	function aarhus_select_skewed_section_title_meta( $show_title_area_container ) {
		
		aarhus_select_add_admin_section_title(
			array(
				'parent' => $show_title_area_container,
				'name'   => 'skewed_section_container',
				'title'  => esc_html__( 'Skewed Section', 'aarhus' )
			)
		);
		
		aarhus_select_create_meta_box_field(
			array(
				'name'          => 'qodef_enable_skewed_section_on_title_area_meta',
				'type'          => 'select',
				'default_value' => '',
				'label'         => esc_html__( 'Enable Skewed Section', 'aarhus' ),
				'description'   => esc_html__( 'This option will enable/disable Skew Section on Title Area', 'aarhus' ),
				'options'       => aarhus_select_get_yes_no_select_array(),
				'parent'        => $show_title_area_container
			)
		);
		
		$show_skewed_section_title_area_container = aarhus_select_add_admin_container(
			array(
				'parent'     => $show_title_area_container,
				'name'       => 'show_skewed_section_title_area_container',
				'dependency' => array(
					'show' => array(
						'qodef_enable_skewed_section_on_title_area_meta' => 'yes'
					)
				)
			)
		);
		
		aarhus_select_create_meta_box_field(
			array(
				'name'          => 'qodef_title_area_skewed_section_type_meta',
				'type'          => 'select',
				'default_value' => '',
				'label'         => esc_html__( 'Position', 'aarhus' ),
				'description'   => esc_html__( 'Specify skewed section position', 'aarhus' ),
				'parent'        => $show_skewed_section_title_area_container,
				'options'       => array(
					''        => esc_html__( 'Default', 'aarhus' ),
					'outline' => esc_html__( 'Outline', 'aarhus' ),
					'inset'   => esc_html__( 'Inset', 'aarhus' )
				)
			)
		);
		
		aarhus_select_create_meta_box_field(
			array(
				'parent'      => $show_skewed_section_title_area_container,
				'type'        => 'textarea',
				'name'        => 'qodef_title_area_skewed_section_svg_path_meta',
				'label'       => esc_html__( 'Skewed Section On Title Area SVG Path', 'aarhus' ),
				'description' => esc_html__( 'Enter your Section On Title Area SVG path here. Please remove version and id attributes from your SVG path because of HTML validation', 'aarhus' ),
			)
		);
		
		aarhus_select_create_meta_box_field(
			array(
				'parent'      => $show_skewed_section_title_area_container,
				'type'        => 'color',
				'name'        => 'qodef_title_area_skewed_section_svg_color_meta',
				'label'       => esc_html__( 'Skewed Section Color', 'aarhus' ),
				'description' => esc_html__( 'Choose a background color for Skewed Section', 'aarhus' ),
			)
		);
	}
	
	add_action( 'aarhus_select_action_additional_title_area_meta_boxes', 'aarhus_select_skewed_section_title_meta', 20 );
}

if ( ! function_exists( 'aarhus_select_skewed_section_header_meta' ) ) {
	function aarhus_select_skewed_section_header_meta( $show_header_area_container ) {
		
		aarhus_select_add_admin_section_title(
			array(
				'parent' => $show_header_area_container,
				'name'   => 'skewed_section_container',
				'title'  => esc_html__( 'Skewed Section', 'aarhus' )
			)
		);
		
		aarhus_select_create_meta_box_field(
			array(
				'name'          => 'qodef_enable_skewed_section_on_header_area_meta',
				'type'          => 'select',
				'default_value' => '',
				'label'         => esc_html__( 'Enable Skewed Section', 'aarhus' ),
				'description'   => esc_html__( 'This option will enable/disable Skew Section on Header Area', 'aarhus' ),
				'options'       => aarhus_select_get_yes_no_select_array(),
				'parent'        => $show_header_area_container
			)
		);
		
		$show_skewed_section_header_area_container = aarhus_select_add_admin_container(
			array(
				'parent'     => $show_header_area_container,
				'name'       => 'show_skewed_section_header_area_container',
				'dependency' => array(
					'show' => array(
						'qodef_enable_skewed_section_on_header_area_meta' => 'yes'
					)
				)
			)
		);
		
		aarhus_select_create_meta_box_field(
			array(
				'parent'      => $show_skewed_section_header_area_container,
				'type'        => 'textarea',
				'name'        => 'qodef_header_area_skewed_section_svg_path_meta',
				'label'       => esc_html__( 'Skewed Section On Header Area SVG Path', 'aarhus' ),
				'description' => esc_html__( 'Enter your Section On Header Area SVG path here. Please remove version and id attributes from your SVG path because of HTML validation', 'aarhus' ),
			)
		);
		
		aarhus_select_create_meta_box_field(
			array(
				'parent'      => $show_skewed_section_header_area_container,
				'type'        => 'color',
				'name'        => 'qodef_header_area_skewed_section_svg_color_meta',
				'label'       => esc_html__( 'Skewed Section Color', 'aarhus' ),
				'description' => esc_html__( 'Choose a background color for Skewed Section', 'aarhus' ),
			)
		);
	}
	
	add_action( 'aarhus_select_action_additional_header_area_meta_boxes', 'aarhus_select_skewed_section_header_meta', 20 );
}