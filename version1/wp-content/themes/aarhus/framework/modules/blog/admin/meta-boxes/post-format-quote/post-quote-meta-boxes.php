<?php

if ( ! function_exists( 'aarhus_select_map_post_quote_meta' ) ) {
	function aarhus_select_map_post_quote_meta() {
		$quote_post_format_meta_box = aarhus_select_create_meta_box(
			array(
				'scope' => array( 'post' ),
				'title' => esc_html__( 'Quote Post Format', 'aarhus' ),
				'name'  => 'post_format_quote_meta'
			)
		);
		
		aarhus_select_create_meta_box_field(
			array(
				'name'        => 'qodef_post_quote_text_meta',
				'type'        => 'text',
				'label'       => esc_html__( 'Quote Text', 'aarhus' ),
				'description' => esc_html__( 'Enter Quote text', 'aarhus' ),
				'parent'      => $quote_post_format_meta_box
			)
		);
		
		aarhus_select_create_meta_box_field(
			array(
				'name'        => 'qodef_post_quote_author_meta',
				'type'        => 'text',
				'label'       => esc_html__( 'Quote Author', 'aarhus' ),
				'description' => esc_html__( 'Enter Quote author', 'aarhus' ),
				'parent'      => $quote_post_format_meta_box
			)
		);
	}
	
	add_action( 'aarhus_select_action_meta_boxes_map', 'aarhus_select_map_post_quote_meta', 25 );
}