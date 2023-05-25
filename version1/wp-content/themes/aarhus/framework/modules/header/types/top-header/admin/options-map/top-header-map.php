<?php

if ( ! function_exists( 'aarhus_select_get_hide_dep_for_top_header_options' ) ) {
	function aarhus_select_get_hide_dep_for_top_header_options() {
		$hide_dep_options = apply_filters( 'aarhus_select_filter_top_header_hide_global_option', $hide_dep_options = array() );
		
		return $hide_dep_options;
	}
}

if ( ! function_exists( 'aarhus_select_header_top_options_map' ) ) {
	function aarhus_select_header_top_options_map( $panel_header ) {
		$hide_dep_options = aarhus_select_get_hide_dep_for_top_header_options();
		
		$top_header_container = aarhus_select_add_admin_container_no_style(
			array(
				'type'            => 'container',
				'name'            => 'top_header_container',
				'parent'          => $panel_header,
				'dependency' => array(
					'hide' => array(
						'header_options'  => $hide_dep_options
					)
				)
			)
		);
		
		aarhus_select_add_admin_field(
			array(
				'name'          => 'top_bar',
				'type'          => 'yesno',
				'default_value' => 'no',
				'label'         => esc_html__( 'Top Bar', 'aarhus' ),
				'description'   => esc_html__( 'Enabling this option will show top bar area', 'aarhus' ),
				'parent'        => $top_header_container,
			)
		);
		
		$top_bar_container = aarhus_select_add_admin_container(
			array(
				'name'            => 'top_bar_container',
				'parent'          => $top_header_container,
				'dependency' => array(
					'hide' => array(
						'top_bar'  => 'no'
					)
				)
			)
		);
		
		aarhus_select_add_admin_field(
			array(
				'name'          => 'top_bar_in_grid',
				'type'          => 'yesno',
				'default_value' => 'yes',
				'label'         => esc_html__( 'Top Bar in Grid', 'aarhus' ),
				'description'   => esc_html__( 'Set top bar content to be in grid', 'aarhus' ),
				'parent'        => $top_bar_container
			)
		);
		
		$top_bar_in_grid_container = aarhus_select_add_admin_container(
			array(
				'name'            => 'top_bar_in_grid_container',
				'parent'          => $top_bar_container,
				'dependency' => array(
					'hide' => array(
						'top_bar_in_grid'  => 'no'
					)
				)
			)
		);
		
		aarhus_select_add_admin_field(
			array(
				'name'        => 'top_bar_grid_background_color',
				'type'        => 'color',
				'label'       => esc_html__( 'Grid Background Color', 'aarhus' ),
				'description' => esc_html__( 'Set grid background color for top bar', 'aarhus' ),
				'parent'      => $top_bar_in_grid_container
			)
		);
		
		aarhus_select_add_admin_field(
			array(
				'name'        => 'top_bar_grid_background_transparency',
				'type'        => 'text',
				'label'       => esc_html__( 'Grid Background Transparency', 'aarhus' ),
				'description' => esc_html__( 'Set grid background transparency for top bar', 'aarhus' ),
				'parent'      => $top_bar_in_grid_container,
				'args'        => array( 'col_width' => 3 )
			)
		);
		
		aarhus_select_add_admin_field(
			array(
				'name'        => 'top_bar_background_color',
				'type'        => 'color',
				'label'       => esc_html__( 'Background Color', 'aarhus' ),
				'description' => esc_html__( 'Set background color for top bar', 'aarhus' ),
				'parent'      => $top_bar_container
			)
		);
		
		aarhus_select_add_admin_field(
			array(
				'name'        => 'top_bar_background_transparency',
				'type'        => 'text',
				'label'       => esc_html__( 'Background Transparency', 'aarhus' ),
				'description' => esc_html__( 'Set background transparency for top bar', 'aarhus' ),
				'parent'      => $top_bar_container,
				'args'        => array( 'col_width' => 3 )
			)
		);
		
		aarhus_select_add_admin_field(
			array(
				'name'          => 'top_bar_border',
				'type'          => 'yesno',
				'default_value' => 'yes',
				'label'         => esc_html__( 'Top Bar Border', 'aarhus' ),
				'description'   => esc_html__( 'Set top bar border', 'aarhus' ),
				'parent'        => $top_bar_container
			)
		);
		
		$top_bar_border_container = aarhus_select_add_admin_container(
			array(
				'name'            => 'top_bar_border_container',
				'parent'          => $top_bar_container,
				'dependency' => array(
					'hide' => array(
						'top_bar_border'  => 'no'
					)
				)
			)
		);
		
		aarhus_select_add_admin_field(
			array(
				'name'        => 'top_bar_border_color',
				'type'        => 'color',
				'label'       => esc_html__( 'Top Bar Border Color', 'aarhus' ),
				'description' => esc_html__( 'Set border color for top bar', 'aarhus' ),
				'parent'      => $top_bar_border_container
			)
		);
		
		aarhus_select_add_admin_field(
			array(
				'name'        => 'top_bar_height',
				'type'        => 'text',
				'label'       => esc_html__( 'Top Bar Height', 'aarhus' ),
				'description' => esc_html__( 'Enter top bar height (Default is 46px)', 'aarhus' ),
				'parent'      => $top_bar_container,
				'args'        => array(
					'col_width' => 2,
					'suffix'    => 'px'
				)
			)
		);
		
		aarhus_select_add_admin_field(
			array(
				'name'   => 'top_bar_side_padding',
				'type'   => 'text',
				'label'  => esc_html__( 'Top Bar Side Padding', 'aarhus' ),
				'parent' => $top_bar_container,
				'args'   => array(
					'col_width' => 2,
					'suffix'    => esc_html__( 'px or %', 'aarhus' )
				)
			)
		);
	}
	
	add_action( 'aarhus_select_action_header_top_options_map', 'aarhus_select_header_top_options_map', 10, 1 );
}