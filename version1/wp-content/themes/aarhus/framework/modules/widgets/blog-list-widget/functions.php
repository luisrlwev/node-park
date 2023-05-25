<?php

if ( ! function_exists( 'aarhus_select_register_blog_list_widget' ) ) {
	/**
	 * Function that register blog list widget
	 */
	function aarhus_select_register_blog_list_widget( $widgets ) {
		$widgets[] = 'AarhusSelectClassBlogListWidget';
		
		return $widgets;
	}
	
	add_filter( 'aarhus_select_filter_register_widgets', 'aarhus_select_register_blog_list_widget' );
}