<?php

if ( ! function_exists( 'aarhus_select_register_social_icon_widget' ) ) {
	/**
	 * Function that register social icon widget
	 */
	function aarhus_select_register_social_icon_widget( $widgets ) {
		$widgets[] = 'AarhusSelectClassSocialIconWidget';
		
		return $widgets;
	}
	
	add_filter( 'aarhus_select_filter_register_widgets', 'aarhus_select_register_social_icon_widget' );
}