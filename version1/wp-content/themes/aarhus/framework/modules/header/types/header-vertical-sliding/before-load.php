<?php

if ( ! function_exists( 'aarhus_select_set_header_vertical_sliding_type_global_option' ) ) {
	/**
	 * This function set header type value for global header option map
	 */
	function aarhus_select_set_header_vertical_sliding_type_global_option( $header_types ) {
		$header_types['header-vertical-sliding'] = array(
			'image' => SELECT_FRAMEWORK_HEADER_TYPES_ROOT . '/header-vertical-sliding/assets/img/header-vertical-sliding.png',
			'label' => esc_html__( 'Vertical - Sliding', 'aarhus' )
		);
		
		return $header_types;
	}
	
	add_filter( 'aarhus_select_filter_header_type_global_option', 'aarhus_select_set_header_vertical_sliding_type_global_option' );
}

if ( ! function_exists( 'aarhus_select_set_header_vertical_sliding_type_meta_boxes_option' ) ) {
	/**
	 * This function set header type value for header meta boxes map
	 */
	function aarhus_select_set_header_vertical_sliding_type_meta_boxes_option( $header_type_options ) {
		$header_type_options['header-vertical-sliding'] = esc_html__( 'Vertical - Sliding', 'aarhus' );
		
		return $header_type_options;
	}
	
	add_filter( 'aarhus_select_filter_header_type_meta_boxes', 'aarhus_select_set_header_vertical_sliding_type_meta_boxes_option' );
}

if ( ! function_exists( 'aarhus_select_set_hide_dep_options_header_vertical_sliding' ) ) {
	/**
	 * This function is used to hide all containers/panels for admin options when this header type is selected
	 */
	function aarhus_select_set_hide_dep_options_header_vertical_sliding( $hide_dep_options ) {
		$hide_dep_options[] = 'header-vertical-sliding';
		
		return $hide_dep_options;
	}
	
	// header global panel options
	add_filter( 'aarhus_select_filter_header_logo_area_hide_global_option', 'aarhus_select_set_hide_dep_options_header_vertical_sliding' );
	add_filter( 'aarhus_select_filter_header_menu_area_hide_global_option', 'aarhus_select_set_hide_dep_options_header_vertical_sliding' );
	add_filter( 'aarhus_select_filter_header_main_menu_hide_global_option', 'aarhus_select_set_hide_dep_options_header_vertical_sliding' );
	add_filter( 'aarhus_select_filter_top_header_hide_global_option', 'aarhus_select_set_hide_dep_options_header_vertical_sliding' );

	// header global panel meta boxes
	add_filter( 'aarhus_select_filter_header_logo_area_hide_meta_boxes', 'aarhus_select_set_hide_dep_options_header_vertical_sliding' );
	add_filter( 'aarhus_select_filter_header_menu_area_hide_meta_boxes', 'aarhus_select_set_hide_dep_options_header_vertical_sliding' );
	add_filter( 'aarhus_select_filter_top_header_hide_meta_boxes', 'aarhus_select_set_hide_dep_options_header_vertical_sliding' );
	
	// header behavior panel options
	add_filter( 'aarhus_select_filter_header_behavior_hide_global_option', 'aarhus_select_set_hide_dep_options_header_vertical_sliding' );
	add_filter( 'aarhus_select_filter_fixed_header_hide_global_option', 'aarhus_select_set_hide_dep_options_header_vertical_sliding' );
	add_filter( 'aarhus_select_filter_sticky_header_hide_global_option', 'aarhus_select_set_hide_dep_options_header_vertical_sliding' );
	
	// header behavior panel meta boxes
	add_filter( 'aarhus_select_filter_header_behavior_hide_meta_boxes', 'aarhus_select_set_hide_dep_options_header_vertical_sliding' );
	
	// header types panel options
	add_filter( 'aarhus_select_filter_full_screen_menu_hide_global_option', 'aarhus_select_set_hide_dep_options_header_vertical_sliding' );
	add_filter( 'aarhus_select_filter_header_centered_hide_global_option', 'aarhus_select_set_hide_dep_options_header_vertical_sliding' );
	add_filter( 'aarhus_select_filter_header_standard_hide_global_option', 'aarhus_select_set_hide_dep_options_header_vertical_sliding' );
	add_filter( 'aarhus_select_filter_header_vertical_closed_hide_global_option', 'aarhus_select_set_hide_dep_options_header_vertical_sliding' );
	
	// header types panel meta boxes
	add_filter( 'aarhus_select_filter_header_centered_hide_meta_boxes', 'aarhus_select_set_hide_dep_options_header_vertical_sliding' );
	add_filter( 'aarhus_select_filter_header_standard_hide_meta_boxes', 'aarhus_select_set_hide_dep_options_header_vertical_sliding' );

	// header widget area meta boxes
	add_filter( 'aarhus_select_filter_header_widget_area_two_hide_meta_boxes', 'aarhus_select_set_hide_dep_options_header_vertical_sliding' );

	// header dropdown styles meta boxes
	add_filter( 'aarhus_select_filter_dropdown_hide_meta_boxes', 'aarhus_select_set_hide_dep_options_header_vertical_sliding' );
}