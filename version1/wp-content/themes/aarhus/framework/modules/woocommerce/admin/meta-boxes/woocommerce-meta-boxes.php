<?php

if ( ! function_exists( 'aarhus_select_map_woocommerce_meta' ) ) {
	function aarhus_select_map_woocommerce_meta() {
		
		$woocommerce_meta_box = aarhus_select_create_meta_box(
			array(
				'scope' => array( 'product' ),
				'title' => esc_html__( 'Product Meta', 'aarhus' ),
				'name'  => 'woo_product_meta'
			)
		);
		
		aarhus_select_create_meta_box_field(
			array(
				'name'        => 'qodef_product_featured_image_size',
				'type'        => 'select',
				'label'       => esc_html__( 'Dimensions for Product List Shortcode', 'aarhus' ),
				'description' => esc_html__( 'Choose image layout when it appears in Select Product List - Masonry layout shortcode', 'aarhus' ),
				'options'     => array(
					''                   => esc_html__( 'Default', 'aarhus' ),
					'small'              => esc_html__( 'Small', 'aarhus' ),
					'large-width'        => esc_html__( 'Large Width', 'aarhus' ),
					'large-height'       => esc_html__( 'Large Height', 'aarhus' ),
					'large-width-height' => esc_html__( 'Large Width Height', 'aarhus' )
				),
				'parent'      => $woocommerce_meta_box
			)
		);
		
		aarhus_select_create_meta_box_field(
			array(
				'name'          => 'qodef_show_title_area_woo_meta',
				'type'          => 'select',
				'default_value' => '',
				'label'         => esc_html__( 'Show Title Area', 'aarhus' ),
				'description'   => esc_html__( 'Disabling this option will turn off page title area', 'aarhus' ),
				'options'       => aarhus_select_get_yes_no_select_array(),
				'parent'        => $woocommerce_meta_box
			)
		);
		
		aarhus_select_create_meta_box_field(
			array(
				'name'          => 'qodef_show_new_sign_woo_meta',
				'type'          => 'yesno',
				'default_value' => 'no',
				'label'         => esc_html__( 'Show New Sign', 'aarhus' ),
				'description'   => esc_html__( 'Enabling this option will show new sign mark on product', 'aarhus' ),
				'parent'        => $woocommerce_meta_box
			)
		);
	}
	
	add_action( 'aarhus_select_action_meta_boxes_map', 'aarhus_select_map_woocommerce_meta', 99 );
}