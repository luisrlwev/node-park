<?php

if ( ! function_exists( 'aarhus_select_search_body_class' ) ) {
	/**
	 * Function that adds body classes for different search types
	 *
	 * @param $classes array original array of body classes
	 *
	 * @return array modified array of classes
	 */
	function aarhus_select_search_body_class( $classes ) {
		$classes[] = 'qodef-fullscreen-search';
		$classes[] = 'qodef-search-fade';
		
		return $classes;
	}
	
	add_filter( 'body_class', 'aarhus_select_search_body_class' );
}

if ( ! function_exists( 'aarhus_select_get_search' ) ) {
	/**
	 * Loads search HTML based on search type option.
	 */
	function aarhus_select_get_search() {
		aarhus_select_load_search_template();
	}
	
	add_action( 'aarhus_select_action_before_page_header', 'aarhus_select_get_search' );
}

if ( ! function_exists( 'aarhus_select_load_search_template' ) ) {
	/**
	 * Loads search HTML based on search type option.
	 */
	function aarhus_select_load_search_template() {
		$parameters = array(
			'search_close_icon_class' 	=> aarhus_select_get_search_close_icon_class(),
			'search_submit_icon_class' 	=> aarhus_select_get_search_submit_icon_class()
		);

        aarhus_select_get_module_template_part( 'types/fullscreen/templates/fullscreen', 'search', '', $parameters );
	}
}