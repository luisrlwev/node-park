<?php

if ( ! function_exists( 'aarhus_core_add_video_button_shortcodes' ) ) {
	function aarhus_core_add_video_button_shortcodes( $shortcodes_class_name ) {
		$shortcodes = array(
			'AarhusCore\CPT\Shortcodes\VideoButton\VideoButton'
		);
		
		$shortcodes_class_name = array_merge( $shortcodes_class_name, $shortcodes );
		
		return $shortcodes_class_name;
	}
	
	add_filter( 'aarhus_core_filter_add_vc_shortcode', 'aarhus_core_add_video_button_shortcodes' );
}

if ( ! function_exists( 'aarhus_core_set_video_button_icon_class_name_for_vc_shortcodes' ) ) {
	/**
	 * Function that set custom icon class name for video button shortcode to set our icon for Visual Composer shortcodes panel
	 */
	function aarhus_core_set_video_button_icon_class_name_for_vc_shortcodes( $shortcodes_icon_class_array ) {
		$shortcodes_icon_class_array[] = '.icon-wpb-video-button';
		
		return $shortcodes_icon_class_array;
	}
	
	add_filter( 'aarhus_core_filter_add_vc_shortcodes_custom_icon_class', 'aarhus_core_set_video_button_icon_class_name_for_vc_shortcodes' );
}

if ( ! function_exists( 'aarhus_core_return_svg_play_button' ) ) {
	function aarhus_core_return_svg_play_button() {
		$html = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
				width="197px" height="197px" viewBox="0 0 197 197" enable-background="new 0 0 197 197" xml:space="preserve">
				<circle class="video-button-stroke" stroke-linecap="round" cx="98.5" cy="98.6" r="97.5"/>
				<circle class="video-button-circle" stroke-linecap="round" cx="98.5" cy="98.6" r="97.5"/>
				<g><path fill="#FFFFFF" d="M88.5,78.6l20,20l-20,20V78.6z"/></g>
				</svg>';

		return $html;
	}
}