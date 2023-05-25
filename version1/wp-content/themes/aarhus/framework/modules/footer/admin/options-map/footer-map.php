<?php

if ( ! function_exists( 'aarhus_select_footer_options_map' ) ) {
	function aarhus_select_footer_options_map() {

		aarhus_select_add_admin_page(
			array(
				'slug'  => '_footer_page',
				'title' => esc_html__( 'Footer', 'aarhus' ),
				'icon'  => 'fa fa-sort-amount-asc'
			)
		);

		$footer_panel = aarhus_select_add_admin_panel(
			array(
				'title' => esc_html__( 'Footer', 'aarhus' ),
				'name'  => 'footer',
				'page'  => '_footer_page'
			)
		);

		aarhus_select_add_admin_field(
			array(
				'type'          => 'yesno',
				'name'          => 'footer_in_grid',
				'default_value' => 'yes',
				'label'         => esc_html__( 'Footer in Grid', 'aarhus' ),
				'description'   => esc_html__( 'Enabling this option will place Footer content in grid', 'aarhus' ),
				'parent'        => $footer_panel
			)
		);

        aarhus_select_add_admin_field(
            array(
                'type'          => 'yesno',
                'name'          => 'uncovering_footer',
                'default_value' => 'no',
                'label'         => esc_html__( 'Uncovering Footer', 'aarhus' ),
                'description'   => esc_html__( 'Enabling this option will make Footer gradually appear on scroll', 'aarhus' ),
                'parent'        => $footer_panel
            )
        );

		aarhus_select_add_admin_field(
			array(
				'type'          => 'yesno',
				'name'          => 'show_footer_top',
				'default_value' => 'yes',
				'label'         => esc_html__( 'Show Footer Top', 'aarhus' ),
				'description'   => esc_html__( 'Enabling this option will show Footer Top area', 'aarhus' ),
				'parent'        => $footer_panel
			)
		);
		
		$show_footer_top_container = aarhus_select_add_admin_container(
			array(
				'name'       => 'show_footer_top_container',
				'parent'     => $footer_panel,
				'dependency' => array(
					'show' => array(
						'show_footer_top' => 'yes'
					)
				)
			)
		);

		aarhus_select_add_admin_field(
			array(
				'type'          => 'select',
				'name'          => 'footer_top_columns',
				'parent'        => $show_footer_top_container,
				'default_value' => '3 3 3 3',
				'label'         => esc_html__( 'Footer Top Columns', 'aarhus' ),
				'description'   => esc_html__( 'Choose number of columns for Footer Top area', 'aarhus' ),
				'options'       => array(
					'12' => '1',
					'6 6' => '2',
					'4 4 4' => '3',
                    '3 3 6' => '3 (25% + 25% + 50%)',
					'3 3 3 3' => '4'
				)
			)
		);

		aarhus_select_add_admin_field(
			array(
				'type'          => 'select',
				'name'          => 'footer_top_columns_alignment',
				'default_value' => 'left',
				'label'         => esc_html__( 'Footer Top Columns Alignment', 'aarhus' ),
				'description'   => esc_html__( 'Text Alignment in Footer Columns', 'aarhus' ),
				'options'       => array(
					''       => esc_html__( 'Default', 'aarhus' ),
					'left'   => esc_html__( 'Left', 'aarhus' ),
					'center' => esc_html__( 'Center', 'aarhus' ),
					'right'  => esc_html__( 'Right', 'aarhus' )
				),
				'parent'        => $show_footer_top_container
			)
		);

		aarhus_select_add_admin_field(
			array(
				'type'          => 'text',
				'name'          => 'footer_top_bg_text',
				'default_value' => '',
				'label'         => esc_html__( 'Footer Top Background Text', 'aarhus' ),
				'description'   => esc_html__( 'Text here will be shown in the background', 'aarhus' ),
				'parent'        => $show_footer_top_container,
				'args'          => array(
					'col_width' => 3,
				)
			)
		);
		
		$footer_top_styles_group = aarhus_select_add_admin_group(
			array(
				'name'        => 'footer_top_styles_group',
				'title'       => esc_html__( 'Footer Top Styles', 'aarhus' ),
				'description' => esc_html__( 'Define style for footer top area', 'aarhus' ),
				'parent'      => $show_footer_top_container
			)
		);
		
		$footer_top_styles_row_1 = aarhus_select_add_admin_row(
			array(
				'name'   => 'footer_top_styles_row_1',
				'parent' => $footer_top_styles_group
			)
		);
		
			aarhus_select_add_admin_field(
				array(
					'name'   => 'footer_top_background_color',
					'type'   => 'colorsimple',
					'label'  => esc_html__( 'Background Color', 'aarhus' ),
					'parent' => $footer_top_styles_row_1
				)
			);
			
			aarhus_select_add_admin_field(
				array(
					'name'   => 'footer_top_border_color',
					'type'   => 'colorsimple',
					'label'  => esc_html__( 'Border Color', 'aarhus' ),
					'parent' => $footer_top_styles_row_1
				)
			);
			
			aarhus_select_add_admin_field(
				array(
					'name'   => 'footer_top_border_width',
					'type'   => 'textsimple',
					'label'  => esc_html__( 'Border Width', 'aarhus' ),
					'parent' => $footer_top_styles_row_1,
					'args'   => array(
						'suffix' => 'px'
					)
				)
			);

		aarhus_select_add_admin_field(
			array(
				'type'          => 'yesno',
				'name'          => 'show_footer_bottom',
				'default_value' => 'yes',
				'label'         => esc_html__( 'Show Footer Bottom', 'aarhus' ),
				'description'   => esc_html__( 'Enabling this option will show Footer Bottom area', 'aarhus' ),
				'parent'        => $footer_panel
			)
		);

		$show_footer_bottom_container = aarhus_select_add_admin_container(
			array(
				'name'            => 'show_footer_bottom_container',
				'parent'          => $footer_panel,
				'dependency' => array(
					'show' => array(
						'show_footer_bottom'  => 'yes'
					)
				)
			)
		);

		aarhus_select_add_admin_field(
			array(
				'type'          => 'select',
				'name'          => 'footer_bottom_columns',
				'default_value' => '6 6',
				'label'         => esc_html__( 'Footer Bottom Columns', 'aarhus' ),
				'description'   => esc_html__( 'Choose number of columns for Footer Bottom area', 'aarhus' ),
				'options'       => array(
					'12' => '1',
					'6 6' => '2',
					'4 4 4' => '3'
				),
				'parent'        => $show_footer_bottom_container
			)
		);
		
		$footer_bottom_styles_group = aarhus_select_add_admin_group(
			array(
				'name'        => 'footer_bottom_styles_group',
				'title'       => esc_html__( 'Footer Bottom Styles', 'aarhus' ),
				'description' => esc_html__( 'Define style for footer bottom area', 'aarhus' ),
				'parent'      => $show_footer_bottom_container
			)
		);
		
		$footer_bottom_styles_row_1 = aarhus_select_add_admin_row(
			array(
				'name'   => 'footer_bottom_styles_row_1',
				'parent' => $footer_bottom_styles_group
			)
		);
		
			aarhus_select_add_admin_field(
				array(
					'name'   => 'footer_bottom_background_color',
					'type'   => 'colorsimple',
					'label'  => esc_html__( 'Background Color', 'aarhus' ),
					'parent' => $footer_bottom_styles_row_1
				)
			);
			
			aarhus_select_add_admin_field(
				array(
					'name'   => 'footer_bottom_border_color',
					'type'   => 'colorsimple',
					'label'  => esc_html__( 'Border Color', 'aarhus' ),
					'parent' => $footer_bottom_styles_row_1
				)
			);
			
			aarhus_select_add_admin_field(
				array(
					'name'   => 'footer_bottom_border_width',
					'type'   => 'textsimple',
					'label'  => esc_html__( 'Border Width', 'aarhus' ),
					'parent' => $footer_bottom_styles_row_1,
					'args'   => array(
						'suffix' => 'px'
					)
				)
			);
	}

	add_action( 'aarhus_select_action_options_map', 'aarhus_select_footer_options_map', aarhus_select_set_options_map_position( 'footer' ) );
}