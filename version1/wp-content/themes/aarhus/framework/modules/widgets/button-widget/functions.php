<?php

if ( ! function_exists( 'aarhus_select_register_button_widget' ) ) {
	/**
	 * Function that register button widget
	 */
	function aarhus_select_register_button_widget( $widgets ) {
		$widgets[] = 'AarhusSelectClassButtonWidget';
		
		return $widgets;
	}
	
	add_filter( 'aarhus_select_filter_register_widgets', 'aarhus_select_register_button_widget' );
}