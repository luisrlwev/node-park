<?php

if ( ! function_exists( 'aarhus_select_register_header_top_menu_type' ) ) {
	/**
	 * This function is used to register header type class for header factory file
	 */
	function aarhus_select_register_header_top_menu_type( $header_types ) {
		$header_type = array(
			'header-top-menu' => 'AarhusSelectNamespace\Modules\Header\Types\HeaderTopMenu'
		);
		
		$header_types = array_merge( $header_types, $header_type );
		
		return $header_types;
	}
}

if ( ! function_exists( 'aarhus_select_init_register_header_top_menu_type' ) ) {
	/**
	 * This function is used to wait header-function.php file to init header object and then to init hook registration function above
	 */
	function aarhus_select_init_register_header_top_menu_type() {
		add_filter( 'aarhus_select_filter_register_header_type_class', 'aarhus_select_register_header_top_menu_type' );
	}
	
	add_action( 'aarhus_select_action_before_header_function_init', 'aarhus_select_init_register_header_top_menu_type' );
}

if ( ! function_exists( 'aarhus_select_header_top_menu_per_page_custom_styles' ) ) {
	/**
	 * Return header per page styles
	 */
	function aarhus_select_header_top_menu_per_page_custom_styles( $style, $class_prefix, $page_id ) {
		$header_area_style    = array();
		$header_area_selector = array( $class_prefix . '.qodef-header-top-menu .qodef-page-header .qodef-logo-area' );
		
		$header_top_menu_logo_area_margin_top = get_post_meta( $page_id, 'qodef_menu_area_height_meta', true );
		
		if ( ! empty( $header_top_menu_logo_area_margin_top ) ) {
			$header_area_style['margin-top'] = aarhus_select_filter_px( $header_top_menu_logo_area_margin_top)  . 'px';
		}
		
		$current_style = '';
		
		if ( ! empty( $header_area_style ) ) {
			$current_style .= aarhus_select_dynamic_css( $header_area_selector, $header_area_style );
		}
		
		$current_style = $current_style . $style;
		
		return $current_style;
	}
	
	add_filter( 'aarhus_select_filter_add_header_page_custom_style', 'aarhus_select_header_top_menu_per_page_custom_styles', 10, 3 );
}