<?php

if ( ! function_exists( 'aarhus_select_register_header_standard_type' ) ) {
	/**
	 * This function is used to register header type class for header factory file
	 */
	function aarhus_select_register_header_standard_type( $header_types ) {
		$header_type = array(
			'header-standard' => 'AarhusSelectNamespace\Modules\Header\Types\HeaderStandard'
		);
		
		$header_types = array_merge( $header_types, $header_type );
		
		return $header_types;
	}
}

if ( ! function_exists( 'aarhus_select_init_register_header_standard_type' ) ) {
	/**
	 * This function is used to wait header-function.php file to init header object and then to init hook registration function above
	 */
	function aarhus_select_init_register_header_standard_type() {
		add_filter( 'aarhus_select_filter_register_header_type_class', 'aarhus_select_register_header_standard_type' );
	}
	
	add_action( 'aarhus_select_action_before_header_function_init', 'aarhus_select_init_register_header_standard_type' );
}