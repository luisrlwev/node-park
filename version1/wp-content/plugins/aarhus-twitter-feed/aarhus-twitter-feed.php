<?php
/*
Plugin Name: Aarhus Twitter Feed
Description: Plugin that adds Twitter feed functionality to our theme
Author: Select Themes
Version: 1.0.1
*/

define( 'AARHUS_TWITTER_FEED_VERSION', '1.0.1' );
define( 'AARHUS_TWITTER_ABS_PATH', dirname( __FILE__ ) );
define( 'AARHUS_TWITTER_REL_PATH', dirname( plugin_basename( __FILE__ ) ) );
define( 'AARHUS_TWITTER_URL_PATH', plugin_dir_url( __FILE__ ) );
define( 'AARHUS_TWITTER_ASSETS_PATH', AARHUS_TWITTER_ABS_PATH . '/assets' );
define( 'AARHUS_TWITTER_ASSETS_URL_PATH', AARHUS_TWITTER_URL_PATH . 'assets' );
define( 'AARHUS_TWITTER_SHORTCODES_PATH', AARHUS_TWITTER_ABS_PATH . '/shortcodes' );
define( 'AARHUS_TWITTER_SHORTCODES_URL_PATH', AARHUS_TWITTER_URL_PATH . 'shortcodes' );

include_once 'load.php';

if ( ! function_exists( 'aarhus_twitter_theme_installed' ) ) {
	/**
	 * Checks whether theme is installed or not
	 * @return bool
	 */
	function aarhus_twitter_theme_installed() {
		return defined( 'SELECT_ROOT' );
	}
}

if ( ! function_exists( 'aarhus_twitter_feed_text_domain' ) ) {
	/**
	 * Loads plugin text domain so it can be used in translation
	 */
	function aarhus_twitter_feed_text_domain() {
		load_plugin_textdomain( 'aarhus-twitter-feed', false, AARHUS_TWITTER_REL_PATH . '/languages' );
	}

	add_action( 'plugins_loaded', 'aarhus_twitter_feed_text_domain' );
}