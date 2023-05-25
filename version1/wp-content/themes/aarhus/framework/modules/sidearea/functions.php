<?php

if ( ! function_exists( 'aarhus_select_register_side_area_sidebar' ) ) {
	/**
	 * Register side area sidebar
	 */
	function aarhus_select_register_side_area_sidebar() {
		register_sidebar(
			array(
				'id'            => 'sidearea',
				'name'          => esc_html__( 'Side Area', 'aarhus' ),
				'description'   => esc_html__( 'Side Area', 'aarhus' ),
				'before_widget' => '<div id="%1$s" class="widget qodef-sidearea %2$s">',
				'after_widget'  => '</div>',
				'before_title'  => '<div class="qodef-widget-title-holder"><h5 class="qodef-widget-title">',
				'after_title'   => '</h5></div>'
			)
		);
	}
	
	add_action( 'widgets_init', 'aarhus_select_register_side_area_sidebar' );
}

if ( ! function_exists( 'aarhus_select_side_menu_body_class' ) ) {
	/**
	 * Function that adds body classes for different side menu styles
	 *
	 * @param $classes array original array of body classes
	 *
	 * @return array modified array of classes
	 */
	function aarhus_select_side_menu_body_class( $classes ) {
		
		if ( is_active_widget( false, false, 'qodef_side_area_opener' ) ) {
			
			if ( aarhus_select_options()->getOptionValue( 'side_area_type' ) ) {
				$classes[] = 'qodef-' . aarhus_select_options()->getOptionValue( 'side_area_type' );
			}
		}
		
		return $classes;
	}
	
	add_filter( 'body_class', 'aarhus_select_side_menu_body_class' );
}

if ( ! function_exists( 'aarhus_select_get_side_area' ) ) {
	/**
	 * Loads side area HTML
	 */
	function aarhus_select_get_side_area() {
		
		if ( is_active_widget( false, false, 'qodef_side_area_opener' ) ) {
			$parameters = array(
				'close_icon_classes' => aarhus_select_get_side_area_close_icon_class()
			);
			
			aarhus_select_get_module_template_part( 'templates/sidearea', 'sidearea', '', $parameters );
		}
	}
	
	add_action( 'aarhus_select_action_after_body_tag', 'aarhus_select_get_side_area', 10 );
}

if ( ! function_exists( 'aarhus_select_get_side_area_close_class' ) ) {
	/**
	 * Loads side area close icon class
	 */
	function aarhus_select_get_side_area_close_icon_class() {
		$classes = array(
			'qodef-close-side-menu'
		);
		
		$classes[] = aarhus_select_get_icon_sources_class( 'side_area', 'qodef-close-side-menu' );
		
		return $classes;
	}
}