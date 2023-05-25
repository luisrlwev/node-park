<?php

if ( aarhus_select_contact_form_7_installed() ) {
	include_once SELECT_FRAMEWORK_MODULES_ROOT_DIR . '/widgets/contact-form-7/contact-form-7.php';
	
	add_filter( 'aarhus_select_filter_register_widgets', 'aarhus_select_register_cf7_widget' );
}

if ( ! function_exists( 'aarhus_select_register_cf7_widget' ) ) {
	/**
	 * Function that register cf7 widget
	 */
	function aarhus_select_register_cf7_widget( $widgets ) {
		$widgets[] = 'AarhusSelectClassContactForm7Widget';
		
		return $widgets;
	}
}