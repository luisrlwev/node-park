<?php

if ( ! function_exists( 'aarhus_select_register_blog_standard_template_file' ) ) {
	/**
	 * Function that register blog standard template
	 */
	function aarhus_select_register_blog_standard_template_file( $templates ) {
		$templates['blog-standard'] = esc_html__( 'Blog: Standard', 'aarhus' );
		
		return $templates;
	}
	
	add_filter( 'aarhus_select_filter_register_blog_templates', 'aarhus_select_register_blog_standard_template_file' );
}

if ( ! function_exists( 'aarhus_select_set_blog_standard_type_global_option' ) ) {
	/**
	 * Function that set blog list type value for global blog option map
	 */
	function aarhus_select_set_blog_standard_type_global_option( $options ) {
		$options['standard'] = esc_html__( 'Blog: Standard', 'aarhus' );
		
		return $options;
	}
	
	add_filter( 'aarhus_select_filter_blog_list_type_global_option', 'aarhus_select_set_blog_standard_type_global_option' );
}