<?php

if ( ! function_exists( 'aarhus_select_map_sidebar_meta' ) ) {
	function aarhus_select_map_sidebar_meta() {
		$qodef_sidebar_meta_box = aarhus_select_create_meta_box(
			array(
				'scope' => apply_filters( 'aarhus_select_filter_set_scope_for_meta_boxes', array( 'page' ), 'sidebar_meta' ),
				'title' => esc_html__( 'Sidebar', 'aarhus' ),
				'name'  => 'sidebar_meta'
			)
		);
		
		aarhus_select_create_meta_box_field(
			array(
				'name'        => 'qodef_sidebar_layout_meta',
				'type'        => 'select',
				'label'       => esc_html__( 'Sidebar Layout', 'aarhus' ),
				'description' => esc_html__( 'Choose the sidebar layout', 'aarhus' ),
				'parent'      => $qodef_sidebar_meta_box,
                'options'       => aarhus_select_get_custom_sidebars_options( true )
			)
		);
		
		$qodef_custom_sidebars = aarhus_select_get_custom_sidebars();
		if ( count( $qodef_custom_sidebars ) > 0 ) {
			aarhus_select_create_meta_box_field(
				array(
					'name'        => 'qodef_custom_sidebar_area_meta',
					'type'        => 'selectblank',
					'label'       => esc_html__( 'Choose Widget Area in Sidebar', 'aarhus' ),
					'description' => esc_html__( 'Choose Custom Widget area to display in Sidebar"', 'aarhus' ),
					'parent'      => $qodef_sidebar_meta_box,
					'options'     => $qodef_custom_sidebars,
					'args'        => array(
						'select2' => true
					)
				)
			);
		}
	}
	
	add_action( 'aarhus_select_action_meta_boxes_map', 'aarhus_select_map_sidebar_meta', 31 );
}