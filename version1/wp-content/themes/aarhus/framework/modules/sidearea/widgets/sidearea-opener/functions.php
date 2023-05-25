<?php

if ( ! function_exists( 'aarhus_select_register_sidearea_opener_widget' ) ) {
	/**
	 * Function that register sidearea opener widget
	 */
	function aarhus_select_register_sidearea_opener_widget( $widgets ) {
		$widgets[] = 'AarhusSelectClassSideAreaOpener';
		
		return $widgets;
	}
	
	add_filter( 'aarhus_select_filter_register_widgets', 'aarhus_select_register_sidearea_opener_widget' );
}