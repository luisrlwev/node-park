<?php

if ( ! function_exists( 'aarhus_select_disable_wpml_css' ) ) {
	function aarhus_select_disable_wpml_css() {
		define( 'ICL_DONT_LOAD_LANGUAGE_SELECTOR_CSS', true );
	}
	
	add_action( 'after_setup_theme', 'aarhus_select_disable_wpml_css' );
}