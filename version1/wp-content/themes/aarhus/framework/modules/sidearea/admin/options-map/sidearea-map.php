<?php

if ( ! function_exists( 'aarhus_select_sidearea_options_map' ) ) {
	function aarhus_select_sidearea_options_map() {

        aarhus_select_add_admin_page(
            array(
                'slug'  => '_side_area_page',
                'title' => esc_html__('Side Area', 'aarhus'),
                'icon'  => 'fa fa-indent'
            )
        );

        $side_area_panel = aarhus_select_add_admin_panel(
            array(
                'title' => esc_html__('Side Area', 'aarhus'),
                'name'  => 'side_area',
                'page'  => '_side_area_page'
            )
        );

        aarhus_select_add_admin_field(
            array(
                'parent'        => $side_area_panel,
                'type'          => 'select',
                'name'          => 'side_area_type',
                'default_value' => 'side-menu-slide-from-right',
                'label'         => esc_html__('Side Area Type', 'aarhus'),
                'description'   => esc_html__('Choose a type of Side Area', 'aarhus'),
                'options'       => array(
                    'side-menu-slide-from-right'       => esc_html__('Slide from Right Over Content', 'aarhus'),
                    'side-menu-slide-with-content'     => esc_html__('Slide from Right With Content', 'aarhus'),
                    'side-area-uncovered-from-content' => esc_html__('Side Area Uncovered from Content', 'aarhus'),
                ),
            )
        );

        aarhus_select_add_admin_field(
            array(
                'parent'        => $side_area_panel,
                'type'          => 'text',
                'name'          => 'side_area_width',
                'default_value' => '',
                'label'         => esc_html__('Side Area Width', 'aarhus'),
                'description'   => esc_html__('Enter a width for Side Area (px or %). Default width: 405px.', 'aarhus'),
                'args'          => array(
                    'col_width' => 3,
                )
            )
        );

        $side_area_width_container = aarhus_select_add_admin_container(
            array(
                'parent'     => $side_area_panel,
                'name'       => 'side_area_width_container',
                'dependency' => array(
                    'show' => array(
                        'side_area_type' => 'side-menu-slide-from-right',
                    )
                )
            )
        );

        aarhus_select_add_admin_field(
            array(
                'parent'        => $side_area_width_container,
                'type'          => 'color',
                'name'          => 'side_area_content_overlay_color',
                'default_value' => '',
                'label'         => esc_html__('Content Overlay Background Color', 'aarhus'),
                'description'   => esc_html__('Choose a background color for a content overlay', 'aarhus'),
            )
        );

        aarhus_select_add_admin_field(
            array(
                'parent'        => $side_area_width_container,
                'type'          => 'text',
                'name'          => 'side_area_content_overlay_opacity',
                'default_value' => '',
                'label'         => esc_html__('Content Overlay Background Transparency', 'aarhus'),
                'description'   => esc_html__('Choose a transparency for the content overlay background color (0 = fully transparent, 1 = opaque)', 'aarhus'),
                'args'          => array(
                    'col_width' => 3
                )
            )
        );

        aarhus_select_add_admin_field(
            array(
                'parent'        => $side_area_panel,
                'type'          => 'select',
                'name'          => 'side_area_icon_source',
                'default_value' => 'icon_pack',
                'label'         => esc_html__('Select Side Area Icon Source', 'aarhus'),
                'description'   => esc_html__('Choose whether you would like to use icons from an icon pack or SVG icons', 'aarhus'),
                'options'       => aarhus_select_get_icon_sources_array()
            )
        );

        $side_area_icon_pack_container = aarhus_select_add_admin_container(
            array(
                'parent'     => $side_area_panel,
                'name'       => 'side_area_icon_pack_container',
                'dependency' => array(
                    'show' => array(
                        'side_area_icon_source' => 'icon_pack'
                    )
                )
            )
        );

        aarhus_select_add_admin_field(
            array(
                'parent'        => $side_area_icon_pack_container,
                'type'          => 'select',
                'name'          => 'side_area_icon_pack',
                'default_value' => 'font_elegant',
                'label'         => esc_html__('Side Area Icon Pack', 'aarhus'),
                'description'   => esc_html__('Choose icon pack for Side Area icon', 'aarhus'),
                'options'       => aarhus_select_icon_collections()->getIconCollectionsExclude(array('linea_icons', 'dripicons', 'simple_line_icons'))
            )
        );

        $side_area_svg_icons_container = aarhus_select_add_admin_container(
            array(
                'parent'     => $side_area_panel,
                'name'       => 'side_area_svg_icons_container',
                'dependency' => array(
                    'show' => array(
                        'side_area_icon_source' => 'svg_path'
                    )
                )
            )
        );

        aarhus_select_add_admin_field(
            array(
                'parent'      => $side_area_svg_icons_container,
                'type'        => 'textarea',
                'name'        => 'side_area_icon_svg_path',
                'label'       => esc_html__('Side Area Icon SVG Path', 'aarhus'),
                'description' => esc_html__('Enter your Side Area icon SVG path here. Please remove version and id attributes from your SVG path because of HTML validation', 'aarhus'),
            )
        );

        aarhus_select_add_admin_field(
            array(
                'parent'      => $side_area_svg_icons_container,
                'type'        => 'textarea',
                'name'        => 'side_area_close_icon_svg_path',
                'label'       => esc_html__('Side Area Close Icon SVG Path', 'aarhus'),
                'description' => esc_html__('Enter your Side Area close icon SVG path here. Please remove version and id attributes from your SVG path because of HTML validation', 'aarhus'),
            )
        );

        $side_area_icon_style_group = aarhus_select_add_admin_group(
            array(
                'parent'      => $side_area_panel,
                'name'        => 'side_area_icon_style_group',
                'title'       => esc_html__('Side Area Icon Style', 'aarhus'),
                'description' => esc_html__('Define styles for Side Area icon', 'aarhus')
            )
        );

        $side_area_icon_style_row1 = aarhus_select_add_admin_row(
            array(
                'parent' => $side_area_icon_style_group,
                'name'   => 'side_area_icon_style_row1'
            )
        );

        aarhus_select_add_admin_field(
            array(
                'parent' => $side_area_icon_style_row1,
                'type'   => 'colorsimple',
                'name'   => 'side_area_icon_color',
                'label'  => esc_html__('Color', 'aarhus')
            )
        );

        aarhus_select_add_admin_field(
            array(
                'parent' => $side_area_icon_style_row1,
                'type'   => 'colorsimple',
                'name'   => 'side_area_icon_hover_color',
                'label'  => esc_html__('Hover Color', 'aarhus')
            )
        );

        $side_area_icon_style_row2 = aarhus_select_add_admin_row(
            array(
                'parent' => $side_area_icon_style_group,
                'name'   => 'side_area_icon_style_row2',
                'next'   => true
            )
        );

        aarhus_select_add_admin_field(
            array(
                'parent' => $side_area_icon_style_row2,
                'type'   => 'colorsimple',
                'name'   => 'side_area_close_icon_color',
                'label'  => esc_html__('Close Icon Color', 'aarhus')
            )
        );

        aarhus_select_add_admin_field(
            array(
                'parent' => $side_area_icon_style_row2,
                'type'   => 'colorsimple',
                'name'   => 'side_area_close_icon_hover_color',
                'label'  => esc_html__('Close Icon Hover Color', 'aarhus')
            )
        );

        aarhus_select_add_admin_field(
            array(
                'parent'      => $side_area_panel,
                'type'        => 'color',
                'name'        => 'side_area_background_color',
                'label'       => esc_html__('Background Color', 'aarhus'),
                'description' => esc_html__('Choose a background color for Side Area', 'aarhus')
            )
        );

        aarhus_select_add_admin_field(
            array(
                'parent'      => $side_area_panel,
                'type'        => 'text',
                'name'        => 'side_area_padding',
                'label'       => esc_html__('Padding', 'aarhus'),
                'description' => esc_html__('Define padding for Side Area in format top right bottom left', 'aarhus'),
                'args'        => array(
                    'col_width' => 3
                )
            )
        );

        aarhus_select_add_admin_field(
            array(
                'parent'        => $side_area_panel,
                'type'          => 'selectblank',
                'name'          => 'side_area_aligment',
                'default_value' => '',
                'label'         => esc_html__('Text Alignment', 'aarhus'),
                'description'   => esc_html__('Choose text alignment for side area', 'aarhus'),
                'options'       => array(
                    ''       => esc_html__('Default', 'aarhus'),
                    'left'   => esc_html__('Left', 'aarhus'),
                    'center' => esc_html__('Center', 'aarhus'),
                    'right'  => esc_html__('Right', 'aarhus')
                )
            )
        );
    }

    add_action('aarhus_select_action_options_map', 'aarhus_select_sidearea_options_map', aarhus_select_set_options_map_position( 'sidearea' ) );
}