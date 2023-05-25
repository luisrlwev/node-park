<?php

if ( ! function_exists( 'aarhus_select_get_hide_dep_for_header_standard_options' ) ) {
	function aarhus_select_get_hide_dep_for_header_standard_options() {
		$hide_dep_options = apply_filters( 'aarhus_select_filter_header_standard_hide_global_option', $hide_dep_options = array() );
		
		return $hide_dep_options;
	}
}

if ( ! function_exists( 'aarhus_select_header_standard_map' ) ) {
	function aarhus_select_header_standard_map( $parent ) {
		$hide_dep_options = aarhus_select_get_hide_dep_for_header_standard_options();
		
		aarhus_select_add_admin_field(
			array(
				'parent'          => $parent,
				'type'            => 'select',
				'name'            => 'set_menu_area_position',
				'default_value'   => 'right',
				'label'           => esc_html__( 'Choose Menu Area Position', 'aarhus' ),
				'description'     => esc_html__( 'Select menu area position in your header', 'aarhus' ),
				'options'         => array(
					'right'  => esc_html__( 'Right', 'aarhus' ),
					'left'   => esc_html__( 'Left', 'aarhus' ),
					'center' => esc_html__( 'Center', 'aarhus' )
				),
				'dependency' => array(
					'hide' => array(
						'header_options'  => $hide_dep_options
					)
				)
			)
		);
	}
	
	add_action( 'aarhus_select_action_additional_header_menu_area_options_map', 'aarhus_select_header_standard_map' );
}