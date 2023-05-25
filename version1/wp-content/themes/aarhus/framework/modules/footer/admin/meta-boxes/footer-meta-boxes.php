<?php

if ( ! function_exists( 'aarhus_select_map_footer_meta' ) ) {
	function aarhus_select_map_footer_meta() {
		
		$footer_meta_box = aarhus_select_create_meta_box(
			array(
				'scope' => apply_filters( 'aarhus_select_filter_set_scope_for_meta_boxes', array( 'page', 'post' ), 'footer_meta' ),
				'title' => esc_html__( 'Footer', 'aarhus' ),
				'name'  => 'footer_meta'
			)
		);
		
		aarhus_select_create_meta_box_field(
			array(
				'name'          => 'qodef_disable_footer_meta',
				'type'          => 'select',
				'default_value' => '',
				'label'         => esc_html__( 'Disable Footer For This Page', 'aarhus' ),
				'description'   => esc_html__( 'Enabling this option will hide footer on this page', 'aarhus' ),
				'options'       => aarhus_select_get_yes_no_select_array(),
				'parent'        => $footer_meta_box
			)
		);
		
		$show_footer_meta_container = aarhus_select_add_admin_container(
			array(
				'name'       => 'qodef_show_footer_meta_container',
				'parent'     => $footer_meta_box,
				'dependency' => array(
					'hide' => array(
						'qodef_disable_footer_meta' => 'yes'
					)
				)
			)
		);
		
			aarhus_select_create_meta_box_field(
				array(
					'name'          => 'qodef_footer_in_grid_meta',
					'type'          => 'select',
					'default_value' => '',
					'label'         => esc_html__( 'Footer in Grid', 'aarhus' ),
					'description'   => esc_html__( 'Enabling this option will place Footer content in grid', 'aarhus' ),
					'options'       => aarhus_select_get_yes_no_select_array(),
					'parent'        => $show_footer_meta_container
				)
			);
			
			aarhus_select_create_meta_box_field(
				array(
					'name'          => 'qodef_uncovering_footer_meta',
					'type'          => 'select',
					'default_value' => '',
					'label'         => esc_html__( 'Uncovering Footer', 'aarhus' ),
					'description'   => esc_html__( 'Enabling this option will make Footer gradually appear on scroll', 'aarhus' ),
					'options'       => aarhus_select_get_yes_no_select_array(),
					'parent'        => $show_footer_meta_container
				)
			);
		
			aarhus_select_create_meta_box_field(
				array(
					'name'          => 'qodef_show_footer_top_meta',
					'type'          => 'select',
					'default_value' => '',
					'label'         => esc_html__( 'Show Footer Top', 'aarhus' ),
					'description'   => esc_html__( 'Enabling this option will show Footer Top area', 'aarhus' ),
					'options'       => aarhus_select_get_yes_no_select_array(),
					'parent'        => $show_footer_meta_container
				)
			);
		
			$footer_top_styles_group = aarhus_select_add_admin_group(
				array(
					'name'        => 'footer_top_styles_group',
					'title'       => esc_html__( 'Footer Top Styles', 'aarhus' ),
					'description' => esc_html__( 'Define style for footer top area', 'aarhus' ),
					'parent'      => $show_footer_meta_container,
					'dependency'  => array(
						'hide' => array(
							'qodef_show_footer_top_meta' => 'no'
						)
					)
				)
			);
			
			$footer_top_styles_row_1 = aarhus_select_add_admin_row(
				array(
					'name'   => 'footer_top_styles_row_1',
					'parent' => $footer_top_styles_group
				)
			);
		
				aarhus_select_create_meta_box_field(
					array(
						'name'   => 'qodef_footer_top_background_color_meta',
						'type'   => 'colorsimple',
						'label'  => esc_html__( 'Background Color', 'aarhus' ),
						'parent' => $footer_top_styles_row_1
					)
				);
		
				aarhus_select_create_meta_box_field(
					array(
						'name'   => 'qodef_footer_top_border_color_meta',
						'type'   => 'colorsimple',
						'label'  => esc_html__( 'Border Color', 'aarhus' ),
						'parent' => $footer_top_styles_row_1
					)
				);
		
				aarhus_select_create_meta_box_field(
					array(
						'name'   => 'qodef_footer_top_border_width_meta',
						'type'   => 'textsimple',
						'label'  => esc_html__( 'Border Width', 'aarhus' ),
						'parent' => $footer_top_styles_row_1,
						'args'   => array(
							'suffix' => 'px'
						)
					)
				);
			
			aarhus_select_create_meta_box_field(
				array(
					'name'          => 'qodef_show_footer_bottom_meta',
					'type'          => 'select',
					'default_value' => '',
					'label'         => esc_html__( 'Show Footer Bottom', 'aarhus' ),
					'description'   => esc_html__( 'Enabling this option will show Footer Bottom area', 'aarhus' ),
					'options'       => aarhus_select_get_yes_no_select_array(),
					'parent'        => $show_footer_meta_container
				)
			);
		
			$footer_bottom_styles_group = aarhus_select_add_admin_group(
				array(
					'name'        => 'footer_bottom_styles_group',
					'title'       => esc_html__( 'Footer Bottom Styles', 'aarhus' ),
					'description' => esc_html__( 'Define style for footer bottom area', 'aarhus' ),
					'parent'      => $show_footer_meta_container,
					'dependency'  => array(
						'hide' => array(
							'qodef_show_footer_bottom_meta' => 'no'
						)
					)
				)
			);
			
			$footer_bottom_styles_row_1 = aarhus_select_add_admin_row(
				array(
					'name'   => 'footer_bottom_styles_row_1',
					'parent' => $footer_bottom_styles_group
				)
			);
			
				aarhus_select_create_meta_box_field(
					array(
						'name'   => 'qodef_footer_bottom_background_color_meta',
						'type'   => 'colorsimple',
						'label'  => esc_html__( 'Background Color', 'aarhus' ),
						'parent' => $footer_bottom_styles_row_1
					)
				);
				
				aarhus_select_create_meta_box_field(
					array(
						'name'   => 'qodef_footer_bottom_border_color_meta',
						'type'   => 'colorsimple',
						'label'  => esc_html__( 'Border Color', 'aarhus' ),
						'parent' => $footer_bottom_styles_row_1
					)
				);
				
				aarhus_select_create_meta_box_field(
					array(
						'name'   => 'qodef_footer_bottom_border_width_meta',
						'type'   => 'textsimple',
						'label'  => esc_html__( 'Border Width', 'aarhus' ),
						'parent' => $footer_bottom_styles_row_1,
						'args'   => array(
							'suffix' => 'px'
						)
					)
				);
	}
	
	add_action( 'aarhus_select_action_meta_boxes_map', 'aarhus_select_map_footer_meta', 70 );
}