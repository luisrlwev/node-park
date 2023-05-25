<?php

if ( ! function_exists( 'aarhus_select_register_icon_widget' ) ) {
	/**
	 * Function that register icon widget
	 */
	function aarhus_select_register_icon_widget( $widgets ) {
		$widgets[] = 'AarhusSelectClassIconWidget';
		
		return $widgets;
	}
	
	add_filter( 'aarhus_select_filter_register_widgets', 'aarhus_select_register_icon_widget' );
}