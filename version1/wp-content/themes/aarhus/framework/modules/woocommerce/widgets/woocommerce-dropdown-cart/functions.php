<?php

if ( ! function_exists( 'aarhus_select_register_woocommerce_dropdown_cart_widget' ) ) {
	/**
	 * Function that register dropdown cart widget
	 */
	function aarhus_select_register_woocommerce_dropdown_cart_widget( $widgets ) {
		$widgets[] = 'AarhusSelectClassWoocommerceDropdownCart';
		
		return $widgets;
	}
	
	add_filter( 'aarhus_select_filter_register_widgets', 'aarhus_select_register_woocommerce_dropdown_cart_widget' );
}

if ( ! function_exists( 'aarhus_select_get_dropdown_cart_icon_class' ) ) {
	/**
	 * Returns dropdow cart icon class
	 */
	function aarhus_select_get_dropdown_cart_icon_class() {
		$classes = array(
			'qodef-header-cart'
		);
		
		$classes[] = aarhus_select_get_icon_sources_class( 'dropdown_cart', 'qodef-header-cart' );
		
		return $classes;
	}
}