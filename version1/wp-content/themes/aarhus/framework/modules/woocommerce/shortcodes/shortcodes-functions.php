<?php

if ( ! function_exists( 'aarhus_select_include_woocommerce_shortcodes' ) ) {
	function aarhus_select_include_woocommerce_shortcodes() {
		foreach ( glob( SELECT_FRAMEWORK_MODULES_ROOT_DIR . '/woocommerce/shortcodes/*/load.php' ) as $shortcode_load ) {
			include_once $shortcode_load;
		}
	}
	
	if ( aarhus_select_core_plugin_installed() ) {
		add_action( 'aarhus_core_action_include_shortcodes_file', 'aarhus_select_include_woocommerce_shortcodes' );
	}
}
