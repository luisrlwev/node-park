<?php
/*
Plugin Name: Aarhus Instagram Feed
Description: Plugin that adds Instagram feed functionality to our theme
Author: Select Themes
Version: 1.0.1
*/
define( 'AARHUS_INSTAGRAM_FEED_VERSION', '1.0.1' );
define( 'AARHUS_INSTAGRAM_ABS_PATH', dirname( __FILE__ ) );
define( 'AARHUS_INSTAGRAM_REL_PATH', dirname( plugin_basename( __FILE__ ) ) );
define( 'AARHUS_INSTAGRAM_URL_PATH', plugin_dir_url( __FILE__ ) );
define( 'AARHUS_INSTAGRAM_ASSETS_PATH', AARHUS_INSTAGRAM_ABS_PATH . '/assets' );
define( 'AARHUS_INSTAGRAM_ASSETS_URL_PATH', AARHUS_INSTAGRAM_URL_PATH . 'assets' );
define( 'AARHUS_INSTAGRAM_SHORTCODES_PATH', AARHUS_INSTAGRAM_ABS_PATH . '/shortcodes' );
define( 'AARHUS_INSTAGRAM_SHORTCODES_URL_PATH', AARHUS_INSTAGRAM_URL_PATH . 'shortcodes' );

include_once 'load.php';

if ( ! function_exists( 'aarhus_instagram_theme_installed' ) ) {
	/**
	 * Checks whether theme is installed or not
	 * @return bool
	 */
	function aarhus_instagram_theme_installed() {
		return defined( 'SELECT_ROOT' );
	}
}

if ( ! function_exists( 'aarhus_instagram_feed_text_domain' ) ) {
	/**
	 * Loads plugin text domain so it can be used in translation
	 */
	function aarhus_instagram_feed_text_domain() {
		load_plugin_textdomain( 'aarhus-instagram-feed', false, AARHUS_INSTAGRAM_REL_PATH . '/languages' );
	}

	add_action( 'plugins_loaded', 'aarhus_instagram_feed_text_domain' );
}