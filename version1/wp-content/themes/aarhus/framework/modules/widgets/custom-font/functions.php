<?php

if ( ! function_exists( 'aarhus_select_register_custom_font_widget' ) ) {
	/**
	 * Function that register custom font widget
	 */
	function aarhus_select_register_custom_font_widget( $widgets ) {
		$widgets[] = 'AarhusSelectClassCustomFontWidget';
		
		return $widgets;
	}
	
	add_filter( 'aarhus_select_filter_register_widgets', 'aarhus_select_register_custom_font_widget' );
}