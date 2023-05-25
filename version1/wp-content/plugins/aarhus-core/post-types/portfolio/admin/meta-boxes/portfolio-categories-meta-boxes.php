<?php

if ( ! function_exists( 'aarhus_select_portfolio_category_additional_fields' ) ) {
	function aarhus_select_portfolio_category_additional_fields() {
		
		$fields = aarhus_select_add_taxonomy_fields(
			array(
				'scope' => 'portfolio-category',
				'name'  => 'portfolio_category_options'
			)
		);
		
		aarhus_select_add_taxonomy_field(
			array(
				'name'   => 'qodef_portfolio_category_image_meta',
				'type'   => 'image',
				'label'  => esc_html__( 'Category Image', 'aarhus-core' ),
				'parent' => $fields
			)
		);
	}
	
	add_action( 'aarhus_select_action_custom_taxonomy_fields', 'aarhus_select_portfolio_category_additional_fields' );
}