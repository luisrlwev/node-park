<?php

if ( ! function_exists( 'aarhus_select_register_recent_posts_widget' ) ) {
	/**
	 * Function that register search opener widget
	 */
	function aarhus_select_register_recent_posts_widget( $widgets ) {
		$widgets[] = 'AarhusSelectClassRecentPosts';
		
		return $widgets;
	}
	
	add_filter( 'aarhus_select_filter_register_widgets', 'aarhus_select_register_recent_posts_widget' );
}