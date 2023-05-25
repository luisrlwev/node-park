<?php

if ( ! function_exists( 'aarhus_select_map_post_audio_meta' ) ) {
	function aarhus_select_map_post_audio_meta() {
		$audio_post_format_meta_box = aarhus_select_create_meta_box(
			array(
				'scope' => array( 'post' ),
				'title' => esc_html__( 'Audio Post Format', 'aarhus' ),
				'name'  => 'post_format_audio_meta'
			)
		);
		
		aarhus_select_create_meta_box_field(
			array(
				'name'          => 'qodef_audio_type_meta',
				'type'          => 'select',
				'label'         => esc_html__( 'Audio Type', 'aarhus' ),
				'description'   => esc_html__( 'Choose audio type', 'aarhus' ),
				'parent'        => $audio_post_format_meta_box,
				'default_value' => 'social_networks',
				'options'       => array(
					'social_networks' => esc_html__( 'Audio Service', 'aarhus' ),
					'self'            => esc_html__( 'Self Hosted', 'aarhus' )
				)
			)
		);
		
		$qodef_audio_embedded_container = aarhus_select_add_admin_container(
			array(
				'parent' => $audio_post_format_meta_box,
				'name'   => 'qodef_audio_embedded_container'
			)
		);
		
		aarhus_select_create_meta_box_field(
			array(
				'name'        => 'qodef_post_audio_link_meta',
				'type'        => 'text',
				'label'       => esc_html__( 'Audio URL', 'aarhus' ),
				'description' => esc_html__( 'Enter audio URL', 'aarhus' ),
				'parent'      => $qodef_audio_embedded_container,
				'dependency' => array(
					'show' => array(
						'qodef_audio_type_meta' => 'social_networks'
					)
				)
			)
		);
		
		aarhus_select_create_meta_box_field(
			array(
				'name'        => 'qodef_post_audio_custom_meta',
				'type'        => 'text',
				'label'       => esc_html__( 'Audio Link', 'aarhus' ),
				'description' => esc_html__( 'Enter audio link', 'aarhus' ),
				'parent'      => $qodef_audio_embedded_container,
				'dependency' => array(
					'show' => array(
						'qodef_audio_type_meta' => 'self'
					)
				)
			)
		);
	}
	
	add_action( 'aarhus_select_action_meta_boxes_map', 'aarhus_select_map_post_audio_meta', 23 );
}