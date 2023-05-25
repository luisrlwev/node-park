<?php

if ( ! function_exists( 'aarhus_select_register_separator_widget' ) ) {
	/**
	 * Function that register separator widget
	 */
	function aarhus_select_register_separator_widget( $widgets ) {
		$widgets[] = 'AarhusSelectClassSeparatorWidget';
		
		return $widgets;
	}
	
	add_filter( 'aarhus_select_filter_register_widgets', 'aarhus_select_register_separator_widget' );
}