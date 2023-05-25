<?php

if ( ! function_exists( 'aarhus_core_add_highlight_shortcodes' ) ) {
	function aarhus_core_add_highlight_shortcodes( $shortcodes_class_name ) {
		$shortcodes = array(
			'AarhusCore\CPT\Shortcodes\Highlight\Highlight'
		);
		
		$shortcodes_class_name = array_merge( $shortcodes_class_name, $shortcodes );
		
		return $shortcodes_class_name;
	}
	
	add_filter( 'aarhus_core_filter_add_vc_shortcode', 'aarhus_core_add_highlight_shortcodes' );
}