<?php

if (!function_exists('aarhus_core_map_portfolio_settings_meta')) {
    function aarhus_core_map_portfolio_settings_meta() {
        $meta_box = aarhus_select_create_meta_box(array(
            'scope' => 'portfolio-item',
            'title' => esc_html__('Portfolio Settings', 'aarhus-core'),
            'name'  => 'portfolio_settings_meta_box'
        ));

        aarhus_select_create_meta_box_field(array(
            'name'        => 'qodef_portfolio_single_template_meta',
            'type'        => 'select',
            'label'       => esc_html__('Portfolio Type', 'aarhus-core'),
            'description' => esc_html__('Choose a default type for Single Project pages', 'aarhus-core'),
            'parent'      => $meta_box,
            'options'     => array(
                ''                  => esc_html__('Default', 'aarhus-core'),
                'huge-images'       => esc_html__('Portfolio Full Width Images', 'aarhus-core'),
                'images'            => esc_html__('Portfolio Images', 'aarhus-core'),
                'small-images'      => esc_html__('Portfolio Small Images', 'aarhus-core'),
                'slider'            => esc_html__('Portfolio Slider', 'aarhus-core'),
                'small-slider'      => esc_html__('Portfolio Small Slider', 'aarhus-core'),
                'gallery'           => esc_html__('Portfolio Gallery', 'aarhus-core'),
                'small-gallery'     => esc_html__('Portfolio Small Gallery', 'aarhus-core'),
                'masonry'           => esc_html__('Portfolio Masonry', 'aarhus-core'),
                'small-masonry'     => esc_html__('Portfolio Small Masonry', 'aarhus-core'),
                'vertical-loop'     => esc_html__('Portfolio Vertical Loop', 'aarhus-core'),
                'custom'            => esc_html__('Portfolio Custom', 'aarhus-core'),
                'full-width-custom' => esc_html__('Portfolio Full Width Custom', 'aarhus-core')
            )
        ));

        /***************** Gallery Layout *****************/

        $gallery_type_meta_container = aarhus_select_add_admin_container(
            array(
                'parent'     => $meta_box,
                'name'       => 'qodef_gallery_type_meta_container',
                'dependency' => array(
                    'show' => array(
                        'qodef_portfolio_single_template_meta' => array(
                            'gallery',
                            'small-gallery'
                        )
                    )
                )
            )
        );

        aarhus_select_create_meta_box_field(
            array(
                'name'          => 'qodef_portfolio_single_gallery_columns_number_meta',
                'type'          => 'select',
                'label'         => esc_html__('Number of Columns', 'aarhus-core'),
                'default_value' => '',
                'description'   => esc_html__('Set number of columns for portfolio gallery type', 'aarhus-core'),
                'parent'        => $gallery_type_meta_container,
                'options'       => aarhus_select_get_number_of_columns_array(true, array('one', 'five', 'six'))
            )
        );

        aarhus_select_create_meta_box_field(
            array(
                'name'          => 'qodef_portfolio_single_gallery_space_between_items_meta',
                'type'          => 'select',
                'label'         => esc_html__('Space Between Items', 'aarhus-core'),
                'description'   => esc_html__('Set space size between columns for portfolio gallery type', 'aarhus-core'),
                'default_value' => '',
                'options'       => aarhus_select_get_space_between_items_array(true),
                'parent'        => $gallery_type_meta_container
            )
        );

        /***************** Gallery Layout *****************/

        /***************** Masonry Layout *****************/

        $masonry_type_meta_container = aarhus_select_add_admin_container(
            array(
                'parent'     => $meta_box,
                'name'       => 'qodef_masonry_type_meta_container',
                'dependency' => array(
                    'show' => array(
                        'qodef_portfolio_single_template_meta' => array(
                            'masonry',
                            'small-masonry'
                        )
                    )
                )
            )
        );

        aarhus_select_create_meta_box_field(
            array(
                'name'          => 'qodef_portfolio_single_masonry_columns_number_meta',
                'type'          => 'select',
                'label'         => esc_html__('Number of Columns', 'aarhus-core'),
                'default_value' => '',
                'description'   => esc_html__('Set number of columns for portfolio masonry type', 'aarhus-core'),
                'parent'        => $masonry_type_meta_container,
                'options'       => aarhus_select_get_number_of_columns_array(true, array('one', 'five', 'six'))
            )
        );

        aarhus_select_create_meta_box_field(
            array(
                'name'          => 'qodef_portfolio_single_masonry_space_between_items_meta',
                'type'          => 'select',
                'label'         => esc_html__('Space Between Items', 'aarhus-core'),
                'description'   => esc_html__('Set space size between columns for portfolio masonry type', 'aarhus-core'),
                'default_value' => '',
                'options'       => aarhus_select_get_space_between_items_array(true),
                'parent'        => $masonry_type_meta_container
            )
        );

        /***************** Masonry Layout *****************/

		/************** Vertical Loop Layout **************/

		$vertical_loop_type_meta_container = aarhus_select_add_admin_container(
			array(
				'parent'     => $meta_box,
				'name'       => 'qodef_vertical_loop_type_meta_container',
				'dependency' => array(
					'show' => array(
						'qodef_portfolio_single_template_meta' => array(
							'vertical-loop'
						)
					)
				)
			)
		);

		aarhus_select_create_meta_box_field(
			array(
				'name'          => 'qodef_portfolio_single_vertical_loop_enable_parallax_meta',
				'type'          => 'yesno',
				'label'         => esc_html__('Enable Parallax on Featured Image', 'aarhus-core'),
				'default_value' => 'no',
				'description'   => esc_html__('Enable parallax on featured image for portfolio vertical loop type', 'aarhus-core'),
				'parent'        => $vertical_loop_type_meta_container
			)
		);

		/************** Vertical Loop Layout **************/

        aarhus_select_create_meta_box_field(
            array(
                'name'          => 'qodef_show_title_area_portfolio_single_meta',
                'type'          => 'select',
                'default_value' => '',
                'label'         => esc_html__('Show Title Area', 'aarhus-core'),
                'description'   => esc_html__('Enabling this option will show title area on your single portfolio page', 'aarhus-core'),
                'parent'        => $meta_box,
                'options'       => aarhus_select_get_yes_no_select_array()
            )
        );

        aarhus_select_create_meta_box_field(
            array(
                'name'        => 'portfolio_info_top_padding',
                'type'        => 'text',
                'label'       => esc_html__('Portfolio Info Top Padding', 'aarhus-core'),
                'description' => esc_html__('Set top padding for portfolio info elements holder. This option works only for Portfolio Images, Slider, Gallery and Masonry portfolio types', 'aarhus-core'),
                'parent'      => $meta_box,
                'args'        => array(
                    'col_width' => 3,
                    'suffix'    => 'px'
                )
            )
        );

        aarhus_select_create_meta_box_field(
            array(
                'name'        => 'portfolio_external_link',
                'type'        => 'text',
                'label'       => esc_html__('Portfolio External Link', 'aarhus-core'),
                'description' => esc_html__('Enter URL to link from Portfolio List page', 'aarhus-core'),
                'parent'      => $meta_box,
                'args'        => array(
                    'col_width' => 3
                )
            )
        );

        aarhus_select_create_meta_box_field(
            array(
                'name'        => 'qodef_portfolio_featured_image_meta',
                'type'        => 'image',
                'label'       => esc_html__('Featured Image', 'aarhus-core'),
                'description' => esc_html__('Choose an image for Portfolio Lists shortcode where Hover Type option is Switch Featured Images', 'aarhus-core'),
                'parent'      => $meta_box
            )
        );

        aarhus_select_create_meta_box_field(
            array(
                'name'          => 'qodef_portfolio_masonry_fixed_dimensions_meta',
                'type'          => 'select',
                'label'         => esc_html__('Dimensions for Masonry - Image Fixed Proportion', 'aarhus-core'),
                'description'   => esc_html__('Choose image layout when it appears in Masonry type portfolio lists where image proportion is fixed', 'aarhus-core'),
                'default_value' => '',
                'parent'        => $meta_box,
                'options'       => array(
                    ''                   => esc_html__('Default', 'aarhus-core'),
                    'small'              => esc_html__('Small', 'aarhus-core'),
                    'large-width'        => esc_html__('Large Width', 'aarhus-core'),
                    'large-height'       => esc_html__('Large Height', 'aarhus-core'),
                    'large-width-height' => esc_html__('Large Width/Height', 'aarhus-core')
                )
            )
        );

        aarhus_select_create_meta_box_field(
            array(
                'name'          => 'qodef_portfolio_masonry_original_dimensions_meta',
                'type'          => 'select',
                'label'         => esc_html__('Dimensions for Masonry - Image Original Proportion', 'aarhus-core'),
                'description'   => esc_html__('Choose image layout when it appears in Masonry type portfolio lists where image proportion is original', 'aarhus-core'),
                'default_value' => '',
                'parent'        => $meta_box,
                'options'       => array(
                    ''            => esc_html__('Default', 'aarhus-core'),
                    'large-width' => esc_html__('Large Width', 'aarhus-core')
                )
            )
        );

        $all_pages = array();
        $pages = get_pages();
        foreach ($pages as $page) {
            $all_pages[$page->ID] = $page->post_title;
        }

        aarhus_select_create_meta_box_field(
            array(
                'name'        => 'portfolio_single_back_to_link',
                'type'        => 'select',
                'label'       => esc_html__('"Back To" Link', 'aarhus-core'),
                'description' => esc_html__('Choose "Back To" page to link from portfolio Single Project page', 'aarhus-core'),
                'parent'      => $meta_box,
                'options'     => $all_pages,
                'args'        => array(
                    'select2' => true
                )
            )
        );

		aarhus_select_create_meta_box_field(
			array(
				'name'        => 'qodef_portfolio_list_featured_image_meta',
				'type'        => 'image',
				'label'       => esc_html__( 'Portfolio List Image', 'aarhus' ),
				'description' => esc_html__( 'Choose an Image for displaying in portfolio list. If not uploaded, featured image will be shown.', 'aarhus' ),
				'parent'      => $meta_box
			)
		);
    }

    add_action('aarhus_select_action_meta_boxes_map', 'aarhus_core_map_portfolio_settings_meta', 41);
}