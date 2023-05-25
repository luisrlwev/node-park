<?php

if ( ! function_exists( 'aarhus_select_footer_top_general_styles' ) ) {
	/**
	 * Generates general custom styles for footer top area
	 */
	function aarhus_select_footer_top_general_styles() {
		$item_styles      = array();
		$background_color = aarhus_select_options()->getOptionValue( 'footer_top_background_color' );
		$border_color     = aarhus_select_options()->getOptionValue( 'footer_top_border_color' );
		$border_width     = aarhus_select_options()->getOptionValue( 'footer_top_border_width' );
		
		if ( ! empty( $background_color ) ) {
			$item_styles['background-color'] = $background_color;
		}
		
		if ( ! empty( $border_color ) ) {
			$item_styles['border-color'] = $border_color;
			
			if ( $border_width === '' ) {
				$item_styles['border-width'] = '1px';
			}
		}
		
		if ( $border_width !== '' ) {
			$item_styles['border-width'] = aarhus_select_filter_px( $border_width ) . 'px';
		}
		
		echo aarhus_select_dynamic_css( '.qodef-page-footer .qodef-footer-top-holder', $item_styles );
	}
	
	add_action( 'aarhus_select_action_style_dynamic', 'aarhus_select_footer_top_general_styles' );
}

if ( ! function_exists( 'aarhus_select_footer_bottom_general_styles' ) ) {
	/**
	 * Generates general custom styles for footer bottom area
	 */
	function aarhus_select_footer_bottom_general_styles() {
		$item_styles      = array();
		$background_color = aarhus_select_options()->getOptionValue( 'footer_bottom_background_color' );
		$border_color     = aarhus_select_options()->getOptionValue( 'footer_bottom_border_color' );
		$border_width     = aarhus_select_options()->getOptionValue( 'footer_bottom_border_width' );
		
		if ( ! empty( $background_color ) ) {
			$item_styles['background-color'] = $background_color;
		}
		
		if ( ! empty( $border_color ) ) {
			$item_styles['border-color'] = $border_color;
			
			if ( $border_width === '' ) {
				$item_styles['border-width'] = '1px';
			}
		}
		
		if ( $border_width !== '' ) {
			$item_styles['border-width'] = aarhus_select_filter_px( $border_width ) . 'px';
		}
		
		echo aarhus_select_dynamic_css( '.qodef-page-footer .qodef-footer-bottom-holder', $item_styles );
	}
	
	add_action( 'aarhus_select_action_style_dynamic', 'aarhus_select_footer_bottom_general_styles' );
}