<?php

if ( ! function_exists( 'aarhus_select_woocommerce_dropdown_cart_options_map' ) ) {
	
	/**
	 * Add Woocommerce dropdown cart options to WooCommerce options page
	 */
	function aarhus_select_woocommerce_dropdown_cart_options_map() {
		
		/**
		 * WooCommerce Dropdown Cart Settings
		 */
		$panel_dropdown_cart = aarhus_select_add_admin_panel(
			array(
				'page'  => '_woocommerce_page',
				'name'  => 'panel_dropdown_cart',
				'title' => esc_html__( 'Dropdown Cart', 'aarhus' )
			)
		);	

		aarhus_select_add_admin_field(
			array(
				'parent'        => $panel_dropdown_cart,
				'type'          => 'select',
				'name'          => 'dropdown_cart_icon_source',
				'default_value' => 'icon_pack',
				'label'         => esc_html__( 'Select Drodown Cart Icon Source', 'aarhus' ),
				'description'   => esc_html__( 'Choose whether you would like to use icons from an icon pack or SVG icons', 'aarhus' ),
				'options'       => aarhus_select_get_icon_sources_array( false, false )
			)
		);

		$dropdwon_cart_icon_pack_container = aarhus_select_add_admin_container(
			array(
				'parent'          => $panel_dropdown_cart,
				'name'            => 'dropdwon_cart_icon_pack_container',
				'dependency' => array(
					'show' => array(
						'dropdown_cart_icon_source' => 'icon_pack'
					)
				)
			)
		);

		aarhus_select_add_admin_field(
			array(
				'parent'        => $dropdwon_cart_icon_pack_container,
				'type'          => 'select',
				'name'          => 'dropdown_cart_icon_pack',
				'default_value' => 'font_elegant',
				'label'         => esc_html__( 'Dropdown Cart Icon Pack', 'aarhus' ),
				'description'   => esc_html__( 'Choose icon pack for dropdown cart icon', 'aarhus' ),
				'options'       => aarhus_select_icon_collections()->getIconCollectionsExclude( array( 'linea_icons', 'dripicons', 'simple_line_icons' ) )
			)
		);

		$dropdwon_cart_icon_svg_path_container = aarhus_select_add_admin_container(
			array(
				'parent'          => $panel_dropdown_cart,
				'name'            => 'dropdwon_cart_icon_svg_path_container',
				'dependency' => array(
					'show' => array(
						'dropdown_cart_icon_source' => 'svg_path'
					)
				)
			)
		);

		aarhus_select_add_admin_field(
			array(
				'parent'      => $dropdwon_cart_icon_svg_path_container,
				'type'        => 'textarea',
				'name'        => 'dropdown_cart_icon_svg_path',
				'label'       => esc_html__( 'Dropdown Cart Icon SVG Path', 'aarhus' ),
				'description' => esc_html__( 'Enter your dropdown cart icon SVG path here. Please remove version and id attributes from your SVG path because of HTML validation', 'aarhus' ),
			)
		);

		$icon_style_group = aarhus_select_add_admin_group(
			array(
				'parent'      => $panel_dropdown_cart,
				'name'        => 'dropdown_cart_icon_style_group',
				'title'       => esc_html__( 'Dropdown Cart Icon Style', 'aarhus' ),
				'description' => esc_html__( 'Define styles for dropdown cart icon', 'aarhus' )
			)
		);
		
		$icon_colors_row = aarhus_select_add_admin_row(
			array(
				'parent' => $icon_style_group,
				'name'   => 'icon_colors_row'
			)
		);
		
		aarhus_select_add_admin_field(
			array(
				'name'   => 'dropdown_cart_icon_color',
				'type'   => 'colorsimple',
				'label'  => esc_html__( 'Icon Color', 'aarhus' ),
				'parent' => $icon_colors_row
			)
		);
		
		aarhus_select_add_admin_field(
			array(
				'name'   => 'dropdown_cart_hover_color',
				'type'   => 'colorsimple',
				'label'  => esc_html__( 'Icon Hover Color', 'aarhus' ),
				'parent' => $icon_colors_row
			)
		);
	}
	
	add_action( 'aarhus_select_woocommerce_additional_options_map', 'aarhus_select_woocommerce_dropdown_cart_options_map');
}