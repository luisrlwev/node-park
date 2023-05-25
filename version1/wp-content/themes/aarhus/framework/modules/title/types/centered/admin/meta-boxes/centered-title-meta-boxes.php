<?php

if ( ! function_exists( 'aarhus_select_centered_title_type_options_meta_boxes' ) ) {
	function aarhus_select_centered_title_type_options_meta_boxes( $show_title_area_meta_container ) {
		
		aarhus_select_create_meta_box_field(
			array(
				'name'        => 'qodef_subtitle_side_padding_meta',
				'type'        => 'text',
				'label'       => esc_html__( 'Subtitle Side Padding', 'aarhus' ),
				'description' => esc_html__( 'Set left/right padding for subtitle area', 'aarhus' ),
				'parent'      => $show_title_area_meta_container,
				'args'        => array(
					'col_width' => 2,
					'suffix'    => 'px or %'
				)
			)
		);
	}
	
	add_action( 'aarhus_select_action_additional_title_area_meta_boxes', 'aarhus_select_centered_title_type_options_meta_boxes', 5 );
}