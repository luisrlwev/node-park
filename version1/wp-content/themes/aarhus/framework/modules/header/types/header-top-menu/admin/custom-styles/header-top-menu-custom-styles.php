<?php

if ( ! function_exists( 'aarhus_select_header_top_menu_logo_area_styles' ) ) {
	/**
	 * Generates styles for menu area
	 */
	function aarhus_select_header_top_menu_logo_area_styles() {
		$menu_area_height = aarhus_select_options()->getOptionValue( 'menu_area_height' );
		
		if ( ! empty( $menu_area_height ) ) {
			echo aarhus_select_dynamic_css( '.qodef-header-top-menu .qodef-page-header .qodef-logo-area', array( 'margin-top' => $menu_area_height . 'px' ) );
		}
	}
	
	add_action( 'aarhus_select_action_style_dynamic', 'aarhus_select_header_top_menu_logo_area_styles' );
}