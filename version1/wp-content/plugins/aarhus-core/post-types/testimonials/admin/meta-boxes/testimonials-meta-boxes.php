<?php

if ( ! function_exists( 'aarhus_core_map_testimonials_meta' ) ) {
	function aarhus_core_map_testimonials_meta() {
		$testimonial_meta_box = aarhus_select_create_meta_box(
			array(
				'scope' => array( 'testimonials' ),
				'title' => esc_html__( 'Testimonial', 'aarhus-core' ),
				'name'  => 'testimonial_meta'
			)
		);
		
		aarhus_select_create_meta_box_field(
			array(
				'name'        => 'qodef_testimonial_title',
				'type'        => 'text',
				'label'       => esc_html__( 'Title', 'aarhus-core' ),
				'description' => esc_html__( 'Enter testimonial title', 'aarhus-core' ),
				'parent'      => $testimonial_meta_box,
			)
		);
		
		aarhus_select_create_meta_box_field(
			array(
				'name'        => 'qodef_testimonial_text',
				'type'        => 'text',
				'label'       => esc_html__( 'Text', 'aarhus-core' ),
				'description' => esc_html__( 'Enter testimonial text', 'aarhus-core' ),
				'parent'      => $testimonial_meta_box,
			)
		);
		
		aarhus_select_create_meta_box_field(
			array(
				'name'        => 'qodef_testimonial_author',
				'type'        => 'text',
				'label'       => esc_html__( 'Author', 'aarhus-core' ),
				'description' => esc_html__( 'Enter author name', 'aarhus-core' ),
				'parent'      => $testimonial_meta_box,
			)
		);
		
		aarhus_select_create_meta_box_field(
			array(
				'name'        => 'qodef_testimonial_author_position',
				'type'        => 'text',
				'label'       => esc_html__( 'Author Position', 'aarhus-core' ),
				'description' => esc_html__( 'Enter author job position', 'aarhus-core' ),
				'parent'      => $testimonial_meta_box,
			)
		);
	}
	
	add_action( 'aarhus_select_action_meta_boxes_map', 'aarhus_core_map_testimonials_meta', 95 );
}