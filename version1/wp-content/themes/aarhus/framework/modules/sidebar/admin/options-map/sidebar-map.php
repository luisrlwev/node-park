<?php

if ( ! function_exists( 'aarhus_select_sidebar_options_map' ) ) {
	function aarhus_select_sidebar_options_map() {
		
		aarhus_select_add_admin_page(
			array(
				'slug'  => '_sidebar_page',
				'title' => esc_html__( 'Sidebar Area', 'aarhus' ),
				'icon'  => 'fa fa-indent'
			)
		);
		
		$sidebar_panel = aarhus_select_add_admin_panel(
			array(
				'title' => esc_html__( 'Sidebar Area', 'aarhus' ),
				'name'  => 'sidebar',
				'page'  => '_sidebar_page'
			)
		);
		
		aarhus_select_add_admin_field( array(
			'name'          => 'sidebar_layout',
			'type'          => 'select',
			'label'         => esc_html__( 'Sidebar Layout', 'aarhus' ),
			'description'   => esc_html__( 'Choose a sidebar layout for pages', 'aarhus' ),
			'parent'        => $sidebar_panel,
			'default_value' => 'no-sidebar',
            'options'       => aarhus_select_get_custom_sidebars_options()
		) );
		
		$aarhus_custom_sidebars = aarhus_select_get_custom_sidebars();
		if ( count( $aarhus_custom_sidebars ) > 0 ) {
			aarhus_select_add_admin_field( array(
				'name'        => 'custom_sidebar_area',
				'type'        => 'selectblank',
				'label'       => esc_html__( 'Sidebar to Display', 'aarhus' ),
				'description' => esc_html__( 'Choose a sidebar to display on pages. Default sidebar is "Sidebar"', 'aarhus' ),
				'parent'      => $sidebar_panel,
				'options'     => $aarhus_custom_sidebars,
				'args'        => array(
					'select2' => true
				)
			) );
		}
	}
	
	add_action( 'aarhus_select_action_options_map', 'aarhus_select_sidebar_options_map', aarhus_select_set_options_map_position( 'sidebar' ) );
}