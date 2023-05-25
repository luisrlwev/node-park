<?php

if ( ! function_exists( 'aarhus_select_logo_options_map' ) ) {
	function aarhus_select_logo_options_map() {
		
		aarhus_select_add_admin_page(
			array(
				'slug'  => '_logo_page',
				'title' => esc_html__( 'Logo', 'aarhus' ),
				'icon'  => 'fa fa-coffee'
			)
		);
		
		$panel_logo = aarhus_select_add_admin_panel(
			array(
				'page'  => '_logo_page',
				'name'  => 'panel_logo',
				'title' => esc_html__( 'Logo', 'aarhus' )
			)
		);
		
		aarhus_select_add_admin_field(
			array(
				'parent'        => $panel_logo,
				'type'          => 'yesno',
				'name'          => 'hide_logo',
				'default_value' => 'no',
				'label'         => esc_html__( 'Hide Logo', 'aarhus' ),
				'description'   => esc_html__( 'Enabling this option will hide logo image', 'aarhus' )
			)
		);
		
		$hide_logo_container = aarhus_select_add_admin_container(
			array(
				'parent'          => $panel_logo,
				'name'            => 'hide_logo_container',
				'dependency' => array(
					'hide' => array(
						'hide_logo'  => 'yes'
					)
				)
			)
		);
		
		aarhus_select_add_admin_field(
			array(
				'name'          => 'logo_image',
				'type'          => 'image',
				'default_value' => SELECT_ASSETS_ROOT . "/img/logo.png",
				'label'         => esc_html__( 'Logo Image - Default', 'aarhus' ),
				'parent'        => $hide_logo_container
			)
		);
		
		aarhus_select_add_admin_field(
			array(
				'name'          => 'logo_image_dark',
				'type'          => 'image',
				'default_value' => SELECT_ASSETS_ROOT . "/img/logo.png",
				'label'         => esc_html__( 'Logo Image - Dark', 'aarhus' ),
				'parent'        => $hide_logo_container
			)
		);
		
		aarhus_select_add_admin_field(
			array(
				'name'          => 'logo_image_light',
				'type'          => 'image',
				'default_value' => SELECT_ASSETS_ROOT . "/img/logo_white.png",
				'label'         => esc_html__( 'Logo Image - Light', 'aarhus' ),
				'parent'        => $hide_logo_container
			)
		);
		
		aarhus_select_add_admin_field(
			array(
				'name'          => 'logo_image_sticky',
				'type'          => 'image',
				'default_value' => SELECT_ASSETS_ROOT . "/img/logo.png",
				'label'         => esc_html__( 'Logo Image - Sticky', 'aarhus' ),
				'parent'        => $hide_logo_container
			)
		);
		
		aarhus_select_add_admin_field(
			array(
				'name'          => 'logo_image_mobile',
				'type'          => 'image',
				'default_value' => SELECT_ASSETS_ROOT . "/img/logo.png",
				'label'         => esc_html__( 'Logo Image - Mobile', 'aarhus' ),
				'parent'        => $hide_logo_container
			)
		);
	}
	
	add_action( 'aarhus_select_action_options_map', 'aarhus_select_logo_options_map', aarhus_select_set_options_map_position( 'logo' ) );
}