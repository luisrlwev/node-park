<?php

if (!function_exists('aarhus_select_portfolio_options_map')) {
    function aarhus_select_portfolio_options_map() {

        aarhus_select_add_admin_page(
            array(
                'slug'  => '_portfolio',
                'title' => esc_html__('Portfolio', 'aarhus-core'),
                'icon'  => 'fa fa-camera-retro'
            )
        );

        $panel_archive = aarhus_select_add_admin_panel(
            array(
                'title' => esc_html__('Portfolio Archive', 'aarhus-core'),
                'name'  => 'panel_portfolio_archive',
                'page'  => '_portfolio'
            )
        );

        aarhus_select_add_admin_field(
            array(
                'name'        => 'portfolio_archive_number_of_items',
                'type'        => 'text',
                'label'       => esc_html__('Number of Items', 'aarhus-core'),
                'description' => esc_html__('Set number of items for your portfolio list on archive pages. Default value is 12', 'aarhus-core'),
                'parent'      => $panel_archive,
                'args'        => array(
                    'col_width' => 3
                )
            )
        );

        aarhus_select_add_admin_field(
            array(
                'name'          => 'portfolio_archive_number_of_columns',
                'type'          => 'select',
                'label'         => esc_html__('Number of Columns', 'aarhus-core'),
                'default_value' => 'four',
                'description'   => esc_html__('Set number of columns for your portfolio list on archive pages. Default value is Four columns', 'aarhus-core'),
                'parent'        => $panel_archive,
                'options'       => aarhus_select_get_number_of_columns_array(false, array('one', 'six'))
            )
        );

        aarhus_select_add_admin_field(
            array(
                'name'          => 'portfolio_archive_space_between_items',
                'type'          => 'select',
                'label'         => esc_html__('Space Between Items', 'aarhus-core'),
                'description'   => esc_html__('Set space size between portfolio items for your portfolio list on archive pages. Default value is normal', 'aarhus-core'),
                'default_value' => 'normal',
                'options'       => aarhus_select_get_space_between_items_array(),
                'parent'        => $panel_archive
            )
        );

        aarhus_select_add_admin_field(
            array(
                'name'          => 'portfolio_archive_image_size',
                'type'          => 'select',
                'label'         => esc_html__('Image Proportions', 'aarhus-core'),
                'default_value' => 'landscape',
                'description'   => esc_html__('Set image proportions for your portfolio list on archive pages. Default value is landscape', 'aarhus-core'),
                'parent'        => $panel_archive,
                'options'       => array(
                    'full'      => esc_html__('Original', 'aarhus-core'),
                    'landscape' => esc_html__('Landscape', 'aarhus-core'),
                    'portrait'  => esc_html__('Portrait', 'aarhus-core'),
                    'square'    => esc_html__('Square', 'aarhus-core')
                )
            )
        );

        aarhus_select_add_admin_field(
            array(
                'name'          => 'portfolio_archive_item_layout',
                'type'          => 'select',
                'label'         => esc_html__('Item Style', 'aarhus-core'),
                'default_value' => 'standard-zoom',
                'description'   => esc_html__('Set item style for your portfolio list on archive pages. Default value is Standard - Shader', 'aarhus-core'),
                'parent'        => $panel_archive,
                'options'       => array(
                    'standard-zoom' => esc_html__('Standard - Zoom', 'aarhus-core'),
                    'gallery-overlay' => esc_html__('Gallery - Overlay', 'aarhus-core')
                )
            )
        );

        $panel = aarhus_select_add_admin_panel(
            array(
                'title' => esc_html__('Portfolio Single', 'aarhus-core'),
                'name'  => 'panel_portfolio_single',
                'page'  => '_portfolio'
            )
        );

        aarhus_select_add_admin_field(
            array(
                'name'          => 'portfolio_single_template',
                'type'          => 'select',
                'label'         => esc_html__('Portfolio Type', 'aarhus-core'),
                'default_value' => 'small-images',
                'description'   => esc_html__('Choose a default type for Single Project pages', 'aarhus-core'),
                'parent'        => $panel,
                'options'       => array(
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
            )
        );

        /***************** Gallery Layout *****************/

        $portfolio_gallery_container = aarhus_select_add_admin_container(
            array(
                'parent'     => $panel,
                'name'       => 'portfolio_gallery_container',
                'dependency' => array(
                    'show' => array(
                        'portfolio_single_template' => array(
                            'gallery',
                            'small-gallery'
                        )
                    )
                )
            )
        );

        aarhus_select_add_admin_field(
            array(
                'name'          => 'portfolio_single_gallery_columns_number',
                'type'          => 'select',
                'label'         => esc_html__('Number of Columns', 'aarhus-core'),
                'default_value' => 'three',
                'description'   => esc_html__('Set number of columns for portfolio gallery type', 'aarhus-core'),
                'parent'        => $portfolio_gallery_container,
                'options'       => aarhus_select_get_number_of_columns_array(false, array('one', 'five', 'six'))
            )
        );

        aarhus_select_add_admin_field(
            array(
                'name'          => 'portfolio_single_gallery_space_between_items',
                'type'          => 'select',
                'label'         => esc_html__('Space Between Items', 'aarhus-core'),
                'description'   => esc_html__('Set space size between columns for portfolio gallery type', 'aarhus-core'),
                'default_value' => 'normal',
                'options'       => aarhus_select_get_space_between_items_array(),
                'parent'        => $portfolio_gallery_container
            )
        );

        /***************** Gallery Layout *****************/

        /***************** Masonry Layout *****************/

        $portfolio_masonry_container = aarhus_select_add_admin_container(
            array(
                'parent'     => $panel,
                'name'       => 'portfolio_masonry_container',
                'dependency' => array(
                    'show' => array(
                        'portfolio_single_template' => array(
                            'masonry',
                            'small-masonry'
                        )
                    )
                )
            )
        );

        aarhus_select_add_admin_field(
            array(
                'name'          => 'portfolio_single_masonry_columns_number',
                'type'          => 'select',
                'label'         => esc_html__('Number of Columns', 'aarhus-core'),
                'default_value' => 'three',
                'description'   => esc_html__('Set number of columns for portfolio masonry type', 'aarhus-core'),
                'parent'        => $portfolio_masonry_container,
                'options'       => aarhus_select_get_number_of_columns_array(false, array('one', 'five', 'six'))
            )
        );

        aarhus_select_add_admin_field(
            array(
                'name'          => 'portfolio_single_masonry_space_between_items',
                'type'          => 'select',
                'label'         => esc_html__('Space Between Items', 'aarhus-core'),
                'description'   => esc_html__('Set space size between columns for portfolio masonry type', 'aarhus-core'),
                'default_value' => 'normal',
                'options'       => aarhus_select_get_space_between_items_array(),
                'parent'        => $portfolio_masonry_container
            )
        );

        /***************** Masonry Layout *****************/

		/************** Vertical Loop Layout **************/

		$portfolio_vertical_loop_container = aarhus_select_add_admin_container(
			array(
				'parent'     => $panel,
				'name'       => 'portfolio_vertical_loop_container',
				'dependency' => array(
					'show' => array(
						'portfolio_single_template' => array(
							'vertical-loop'
						)
					)
				)
			)
		);

		aarhus_select_add_admin_field(
			array(
				'name'          => 'portfolio_single_vertical_loop_enable_parallax',
				'type'          => 'yesno',
				'label'         => esc_html__('Enable Parallax on Featured Image', 'aarhus-core'),
				'default_value' => 'no',
				'description'   => esc_html__('Enable parallax on featured image for portfolio vertical loop type', 'aarhus-core'),
				'parent'        => $portfolio_vertical_loop_container
			)
		);

		/************** Vertical Loop Layout **************/

        aarhus_select_add_admin_field(
            array(
                'type'          => 'select',
                'name'          => 'show_title_area_portfolio_single',
                'default_value' => '',
                'label'         => esc_html__('Show Title Area', 'aarhus-core'),
                'description'   => esc_html__('Enabling this option will show title area on single projects', 'aarhus-core'),
                'parent'        => $panel,
                'options'       => array(
                    ''    => esc_html__('Default', 'aarhus-core'),
                    'yes' => esc_html__('Yes', 'aarhus-core'),
                    'no'  => esc_html__('No', 'aarhus-core')
                ),
                'args'          => array(
                    'col_width' => 3
                )
            )
        );

        aarhus_select_add_admin_field(
            array(
                'name'          => 'portfolio_single_lightbox_images',
                'type'          => 'yesno',
                'label'         => esc_html__('Enable Lightbox for Images', 'aarhus-core'),
                'description'   => esc_html__('Enabling this option will turn on lightbox functionality for projects with images', 'aarhus-core'),
                'parent'        => $panel,
                'default_value' => 'yes'
            )
        );

        aarhus_select_add_admin_field(
            array(
                'name'          => 'portfolio_single_lightbox_videos',
                'type'          => 'yesno',
                'label'         => esc_html__('Enable Lightbox for Videos', 'aarhus-core'),
                'description'   => esc_html__('Enabling this option will turn on lightbox functionality for YouTube/Vimeo projects', 'aarhus-core'),
                'parent'        => $panel,
                'default_value' => 'no'
            )
        );

        aarhus_select_add_admin_field(
            array(
                'name'          => 'portfolio_single_enable_categories',
                'type'          => 'yesno',
                'label'         => esc_html__('Enable Categories', 'aarhus-core'),
                'description'   => esc_html__('Enabling this option will enable category meta description on single projects', 'aarhus-core'),
                'parent'        => $panel,
                'default_value' => 'yes'
            )
        );

        aarhus_select_add_admin_field(
            array(
                'name'          => 'portfolio_single_hide_date',
                'type'          => 'yesno',
                'label'         => esc_html__('Enable Date', 'aarhus-core'),
                'description'   => esc_html__('Enabling this option will enable date meta on single projects', 'aarhus-core'),
                'parent'        => $panel,
                'default_value' => 'yes'
            )
        );

        aarhus_select_add_admin_field(
            array(
                'name'          => 'portfolio_single_sticky_sidebar',
                'type'          => 'yesno',
                'label'         => esc_html__('Enable Sticky Side Text', 'aarhus-core'),
                'description'   => esc_html__('Enabling this option will make side text sticky on Single Project pages. This option works only for Full Width Images, Small Images, Small Gallery and Small Masonry portfolio types', 'aarhus-core'),
                'parent'        => $panel,
                'default_value' => 'yes'
            )
        );

        aarhus_select_add_admin_field(
            array(
                'name'          => 'portfolio_single_comments',
                'type'          => 'yesno',
                'label'         => esc_html__('Show Comments', 'aarhus-core'),
                'description'   => esc_html__('Enabling this option will show comments on your page', 'aarhus-core'),
                'parent'        => $panel,
                'default_value' => 'no'
            )
        );

        aarhus_select_add_admin_field(
            array(
                'name'          => 'portfolio_single_hide_pagination',
                'type'          => 'yesno',
                'label'         => esc_html__('Hide Pagination', 'aarhus-core'),
                'description'   => esc_html__('Enabling this option will turn off portfolio pagination functionality', 'aarhus-core'),
                'parent'        => $panel,
                'default_value' => 'no'
            )
        );

        $container_navigate_category = aarhus_select_add_admin_container(
            array(
                'name'       => 'navigate_same_category_container',
                'parent'     => $panel,
                'dependency' => array(
                    'hide' => array(
                        'portfolio_single_hide_pagination' => array(
                            'yes'
                        )
                    )
                )
            )
        );

        aarhus_select_add_admin_field(
            array(
                'name'          => 'portfolio_single_nav_same_category',
                'type'          => 'yesno',
                'label'         => esc_html__('Enable Pagination Through Same Category', 'aarhus-core'),
                'description'   => esc_html__('Enabling this option will make portfolio pagination sort through current category', 'aarhus-core'),
                'parent'        => $container_navigate_category,
                'default_value' => 'no'
            )
        );

        aarhus_select_add_admin_field(
            array(
                'name'        => 'portfolio_single_slug',
                'type'        => 'text',
                'label'       => esc_html__('Portfolio Single Slug', 'aarhus-core'),
                'description' => esc_html__('Enter if you wish to use a different Single Project slug (Note: After entering slug, navigate to Settings -> Permalinks and click "Save" in order for changes to take effect)', 'aarhus-core'),
                'parent'      => $panel,
                'args'        => array(
                    'col_width' => 3
                )
            )
        );

        aarhus_select_add_admin_field(
            array(
                'name'        => 'portfolio_vertical_loop_category',
                'type'        => 'text',
                'label'       => esc_html__('Portfolio Vertical Loop Category', 'aarhus-core'),
                'description' => esc_html__('Set a category slug for Vertical Loop Portfolio Type', 'aarhus-core'),
                'parent'      => $panel,
                'args'        => array(
                    'col_width' => 3,
                )
            )
        );
    }

    add_action('aarhus_select_action_options_map', 'aarhus_select_portfolio_options_map', aarhus_select_set_options_map_position('portfolio'));
}