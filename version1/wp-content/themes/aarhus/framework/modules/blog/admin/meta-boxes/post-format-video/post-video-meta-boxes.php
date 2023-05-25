<?php

if ( ! function_exists( 'aarhus_select_map_post_video_meta' ) ) {
	function aarhus_select_map_post_video_meta() {
		$video_post_format_meta_box = aarhus_select_create_meta_box(
			array(
				'scope' => array( 'post' ),
				'title' => esc_html__( 'Video Post Format', 'aarhus' ),
				'name'  => 'post_format_video_meta'
			)
		);
		
		aarhus_select_create_meta_box_field(
			array(
				'name'          => 'qodef_video_type_meta',
				'type'          => 'select',
				'label'         => esc_html__( 'Video Type', 'aarhus' ),
				'description'   => esc_html__( 'Choose video type', 'aarhus' ),
				'parent'        => $video_post_format_meta_box,
				'default_value' => 'social_networks',
				'options'       => array(
					'social_networks' => esc_html__( 'Video Service', 'aarhus' ),
					'self'            => esc_html__( 'Self Hosted', 'aarhus' )
				)
			)
		);
		
		$qodef_video_embedded_container = aarhus_select_add_admin_container(
			array(
				'parent' => $video_post_format_meta_box,
				'name'   => 'qodef_video_embedded_container'
			)
		);
		
		aarhus_select_create_meta_box_field(
			array(
				'name'        => 'qodef_post_video_link_meta',
				'type'        => 'text',
				'label'       => esc_html__( 'Video URL', 'aarhus' ),
				'description' => esc_html__( 'Enter Video URL', 'aarhus' ),
				'parent'      => $qodef_video_embedded_container,
				'dependency' => array(
					'show' => array(
						'qodef_video_type_meta' => 'social_networks'
					)
				)
			)
		);
		
		aarhus_select_create_meta_box_field(
			array(
				'name'        => 'qodef_post_video_custom_meta',
				'type'        => 'text',
				'label'       => esc_html__( 'Video MP4', 'aarhus' ),
				'description' => esc_html__( 'Enter video URL for MP4 format', 'aarhus' ),
				'parent'      => $qodef_video_embedded_container,
				'dependency' => array(
					'show' => array(
						'qodef_video_type_meta' => 'self'
					)
				)
			)
		);
		
		aarhus_select_create_meta_box_field(
			array(
				'name'        => 'qodef_post_video_image_meta',
				'type'        => 'image',
				'label'       => esc_html__( 'Video Image', 'aarhus' ),
				'description' => esc_html__( 'Enter video image', 'aarhus' ),
				'parent'      => $qodef_video_embedded_container,
				'dependency' => array(
					'show' => array(
						'qodef_video_type_meta' => 'self'
					)
				)
			)
		);
	}
	
	add_action( 'aarhus_select_action_meta_boxes_map', 'aarhus_select_map_post_video_meta', 22 );
}