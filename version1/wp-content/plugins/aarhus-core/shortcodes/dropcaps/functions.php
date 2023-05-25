<?php

if ( ! function_exists( 'aarhus_core_add_dropcaps_shortcodes' ) ) {
	function aarhus_core_add_dropcaps_shortcodes( $shortcodes_class_name ) {
		$shortcodes = array(
			'AarhusCore\CPT\Shortcodes\Dropcaps\Dropcaps'
		);
		
		$shortcodes_class_name = array_merge( $shortcodes_class_name, $shortcodes );
		
		return $shortcodes_class_name;
	}
	
	add_filter( 'aarhus_core_filter_add_vc_shortcode', 'aarhus_core_add_dropcaps_shortcodes' );
}