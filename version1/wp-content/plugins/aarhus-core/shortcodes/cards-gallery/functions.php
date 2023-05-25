<?php

if ( ! function_exists( 'aarhus_core_add_cards_gallery_shortcodes' ) ) {
	function aarhus_core_add_cards_gallery_shortcodes( $shortcodes_class_name ) {
		$shortcodes = array(
			'AarhusCore\CPT\Shortcodes\CardsGallery\CardsGallery'
		);
		
		$shortcodes_class_name = array_merge( $shortcodes_class_name, $shortcodes );
		
		return $shortcodes_class_name;
	}
	
	add_filter( 'aarhus_core_filter_add_vc_shortcode', 'aarhus_core_add_cards_gallery_shortcodes' );
}

if ( ! function_exists( 'aarhus_core_set_cards_gallery_icon_class_name_for_vc_shortcodes' ) ) {
	/**
	 * Function that set custom icon class name for cards gallery shortcode to set our icon for Visual Composer shortcodes panel
	 */
	function aarhus_core_set_cards_gallery_icon_class_name_for_vc_shortcodes( $shortcodes_icon_class_array ) {
		$shortcodes_icon_class_array[] = '.icon-wpb-cards-gallery';
		
		return $shortcodes_icon_class_array;
	}
	
	add_filter( 'aarhus_core_filter_add_vc_shortcodes_custom_icon_class', 'aarhus_core_set_cards_gallery_icon_class_name_for_vc_shortcodes' );
}