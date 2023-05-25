<?php

if ( ! function_exists( 'aarhus_select_get_hide_dep_for_breadcrumbs_title_meta_boxes' ) ) {
	function aarhus_select_get_hide_dep_for_breadcrumbs_title_meta_boxes() {
		$hide_dep_options = apply_filters( 'aarhus_select_filter_breadcrumbs_title_hide_meta_boxes', $hide_dep_options = array() );
		
		return $hide_dep_options;
	}
}

if ( ! function_exists( 'aarhus_select_breadcrumbs_title_type_options_meta_boxes' ) ) {
	function aarhus_select_breadcrumbs_title_type_options_meta_boxes( $show_title_area_meta_container ) {
	    $hide_dep_options = aarhus_select_get_hide_dep_for_breadcrumbs_title_meta_boxes();
		
		aarhus_select_create_meta_box_field(
			array(
				'name'        => 'qodef_breadcrumbs_color_meta',
				'type'        => 'color',
				'label'       => esc_html__( 'Breadcrumbs Color', 'aarhus' ),
				'description' => esc_html__( 'Choose a color for breadcrumbs text', 'aarhus' ),
				'parent'      => $show_title_area_meta_container,
                'dependency'  => array(
                    'hide' => array(
                        'qodef_title_area_type_meta' => $hide_dep_options
                    )
                )
			)
		);
	}
	
	add_action( 'aarhus_select_action_additional_title_area_meta_boxes', 'aarhus_select_breadcrumbs_title_type_options_meta_boxes' );
}