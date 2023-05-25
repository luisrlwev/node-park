<?php

if ( ! function_exists( 'aarhus_core_add_portfolio_interactive_showcase_shortcodes' ) ) {
	function aarhus_core_add_portfolio_interactive_showcase_shortcodes( $shortcodes_class_name ) {
		$shortcodes = array(
			'AarhusCore\CPT\Shortcodes\PortfolioInteractiveShowcase\PortfolioInteractiveShowcase'
		);
		
		$shortcodes_class_name = array_merge( $shortcodes_class_name, $shortcodes );
		
		return $shortcodes_class_name;
	}
	
	add_filter( 'aarhus_core_filter_add_vc_shortcode', 'aarhus_core_add_portfolio_interactive_showcase_shortcodes' );
}

if ( ! function_exists( 'aarhus_core_set_portfolio_interactive_showcase_icon_class_name_for_vc_shortcodes' ) ) {
	/**
	 * Function that set custom icon class name for interactive link showcase shortcode to set our icon for Visual Composer shortcodes panel
	 */
	function aarhus_core_set_portfolio_interactive_showcase_icon_class_name_for_vc_shortcodes( $shortcodes_icon_class_array ) {
		$shortcodes_icon_class_array[] = '.icon-wpb-portfolio-interactive-showcase';
		
		return $shortcodes_icon_class_array;
	}
	
	add_filter( 'aarhus_core_filter_add_vc_shortcodes_custom_icon_class', 'aarhus_core_set_portfolio_interactive_showcase_icon_class_name_for_vc_shortcodes' );
}