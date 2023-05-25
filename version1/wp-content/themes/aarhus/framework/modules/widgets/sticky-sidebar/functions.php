<?php

if ( ! function_exists( 'aarhus_select_register_sticky_sidebar_widget' ) ) {
	/**
	 * Function that register sticky sidebar widget
	 */
	function aarhus_select_register_sticky_sidebar_widget( $widgets ) {
		$widgets[] = 'AarhusSelectClassStickySidebar';
		
		return $widgets;
	}
	
	add_filter( 'aarhus_select_filter_register_widgets', 'aarhus_select_register_sticky_sidebar_widget' );
}