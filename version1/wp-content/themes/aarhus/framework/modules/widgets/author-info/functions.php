<?php

if ( ! function_exists( 'aarhus_select_register_author_info_widget' ) ) {
	/**
	 * Function that register author info widget
	 */
	function aarhus_select_register_author_info_widget( $widgets ) {
		$widgets[] = 'AarhusSelectClassAuthorInfoWidget';
		
		return $widgets;
	}
	
	add_filter( 'aarhus_select_filter_register_widgets', 'aarhus_select_register_author_info_widget' );
}