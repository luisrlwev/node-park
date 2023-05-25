<?php

if ( ! function_exists( 'aarhus_select_register_image_gallery_widget' ) ) {
	/**
	 * Function that register image gallery widget
	 */
	function aarhus_select_register_image_gallery_widget( $widgets ) {
		$widgets[] = 'AarhusSelectClassImageGalleryWidget';
		
		return $widgets;
	}
	
	add_filter( 'aarhus_select_filter_register_widgets', 'aarhus_select_register_image_gallery_widget' );
}