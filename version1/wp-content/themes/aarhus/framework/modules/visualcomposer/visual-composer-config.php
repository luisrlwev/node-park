<?php

/**
 * Force Visual Composer to initialize as "built into the theme". This will hide certain tabs under the Settings->Visual Composer page
 */
if ( function_exists( 'vc_set_as_theme' ) ) {
	vc_set_as_theme( true );
}

/**
 * Change path for overridden templates
 */
if ( function_exists( 'vc_set_shortcodes_templates_dir' ) ) {
	$dir = SELECT_ROOT_DIR . '/vc-templates';
	vc_set_shortcodes_templates_dir( $dir );
}

if ( ! function_exists( 'aarhus_select_configure_visual_composer_frontend_editor' ) ) {
	/**
	 * Configuration for Visual Composer FrontEnd Editor
	 * Hooks on vc_after_init action
	 */
	function aarhus_select_configure_visual_composer_frontend_editor() {
		/**
		 * Remove frontend editor
		 */
		if ( function_exists( 'vc_disable_frontend' ) ) {
			vc_disable_frontend();
		}
	}
	
	add_action( 'vc_after_init', 'aarhus_select_configure_visual_composer_frontend_editor' );
}

if ( ! function_exists( 'aarhus_select_vc_row_map' ) ) {
	/**
	 * Map VC Row shortcode
	 * Hooks on vc_after_init action
	 */
	function aarhus_select_vc_row_map() {
		
		/******* VC Row shortcode - begin *******/
		
		vc_add_param( 'vc_row',
			array(
				'type'       => 'dropdown',
				'param_name' => 'row_content_width',
				'heading'    => esc_html__( 'Select Row Content Width', 'aarhus' ),
				'value'      => array(
					esc_html__( 'Full Width', 'aarhus' ) => 'full-width',
					esc_html__( 'In Grid', 'aarhus' )    => 'grid'
				),
				'group'      => esc_html__( 'Select Settings', 'aarhus' )
			)
		);
		
		vc_add_param( 'vc_row',
			array(
				'type'        => 'textfield',
				'param_name'  => 'anchor',
				'heading'     => esc_html__( 'Select Anchor ID', 'aarhus' ),
				'description' => esc_html__( 'For example "home"', 'aarhus' ),
				'group'       => esc_html__( 'Select Settings', 'aarhus' )
			)
		);
		
		vc_add_param( 'vc_row',
			array(
				'type'       => 'colorpicker',
				'param_name' => 'simple_background_color',
				'heading'    => esc_html__( 'Select Background Color', 'aarhus' ),
				'group'      => esc_html__( 'Select Settings', 'aarhus' )
			)
		);
		
		vc_add_param( 'vc_row',
			array(
				'type'       => 'attach_image',
				'param_name' => 'simple_background_image',
				'heading'    => esc_html__( 'Select Background Image', 'aarhus' ),
				'group'      => esc_html__( 'Select Settings', 'aarhus' )
			)
		);
		
		vc_add_param( 'vc_row',
			array(
				'type'        => 'textfield',
				'param_name'  => 'background_image_position',
				'heading'     => esc_html__( 'Select Background Position', 'aarhus' ),
				'description' => esc_html__( 'Set the starting position of a background image, default value is top left', 'aarhus' ),
				'dependency'  => array( 'element' => 'simple_background_image', 'not_empty' => true ),
				'group'       => esc_html__( 'Select Settings', 'aarhus' )
			)
		);
		
		vc_add_param( 'vc_row',
			array(
				'type'        => 'dropdown',
				'param_name'  => 'disable_background_image',
				'heading'     => esc_html__( 'Select Disable Background Image', 'aarhus' ),
				'value'       => array(
					esc_html__( 'Never', 'aarhus' )        => '',
					esc_html__( 'Below 1280px', 'aarhus' ) => '1280',
					esc_html__( 'Below 1024px', 'aarhus' ) => '1024',
					esc_html__( 'Below 768px', 'aarhus' )  => '768',
					esc_html__( 'Below 680px', 'aarhus' )  => '680',
					esc_html__( 'Below 480px', 'aarhus' )  => '480'
				),
				'save_always' => true,
				'description' => esc_html__( 'Choose on which stage you hide row background image', 'aarhus' ),
				'dependency'  => array( 'element' => 'simple_background_image', 'not_empty' => true ),
				'group'       => esc_html__( 'Select Settings', 'aarhus' )
			)
		);
		
		vc_add_param( 'vc_row',
			array(
				'type'       => 'attach_image',
				'param_name' => 'parallax_background_image',
				'heading'    => esc_html__( 'Select Parallax Background Image', 'aarhus' ),
				'group'      => esc_html__( 'Select Settings', 'aarhus' )
			)
		);
		
		vc_add_param( 'vc_row',
			array(
				'type'        => 'textfield',
				'param_name'  => 'parallax_bg_speed',
				'heading'     => esc_html__( 'Select Parallax Speed', 'aarhus' ),
				'description' => esc_html__( 'Set your parallax speed. Default value is 1.', 'aarhus' ),
				'dependency'  => array( 'element' => 'parallax_background_image', 'not_empty' => true ),
				'group'       => esc_html__( 'Select Settings', 'aarhus' )
			)
		);
		
		vc_add_param( 'vc_row',
			array(
				'type'       => 'textfield',
				'param_name' => 'parallax_bg_height',
				'heading'    => esc_html__( 'Select Parallax Section Height (px)', 'aarhus' ),
				'dependency' => array( 'element' => 'parallax_background_image', 'not_empty' => true ),
				'group'      => esc_html__( 'Select Settings', 'aarhus' )
			)
		);
		
		vc_add_param( 'vc_row',
			array(
				'type'       => 'dropdown',
				'param_name' => 'content_text_aligment',
				'heading'    => esc_html__( 'Select Content Aligment', 'aarhus' ),
				'value'      => array(
					esc_html__( 'Default', 'aarhus' ) => '',
					esc_html__( 'Left', 'aarhus' )    => 'left',
					esc_html__( 'Center', 'aarhus' )  => 'center',
					esc_html__( 'Right', 'aarhus' )   => 'right'
				),
				'group'      => esc_html__( 'Select Settings', 'aarhus' )
			)
		);

		vc_add_param( 'vc_row',
			array(
				'type'       => 'textfield',
				'param_name' => 'row_background_text_1',
				'heading'    => esc_html__( 'Select Background Text 1', 'aarhus' ),
				'group'      => esc_html__( 'Select Settings', 'aarhus' )
			)
		);

		vc_add_param( 'vc_row',
			array(
				'type'       => 'textfield',
				'param_name' => 'row_background_text_2',
				'heading'    => esc_html__( 'Select Background Text 2', 'aarhus' ),
				'dependency' => array( 'element' => 'row_background_text_1', 'not_empty' => true ),
				'group'      => esc_html__( 'Select Settings', 'aarhus' )
			)
		);

		vc_add_param( 'vc_row',
			array(
				'type'       => 'textfield',
				'param_name' => 'row_background_text_size',
				'heading'    => esc_html__( 'Select Background Text Size', 'aarhus' ),
				'description' => esc_html__( 'Set the background text size in px or em', 'aarhus' ),
				'dependency' => array( 'element' => 'row_background_text_1', 'not_empty' => true ),
				'group'      => esc_html__( 'Select Settings', 'aarhus' )
			)
		);

		vc_add_param( 'vc_row',
			array(
				'type'       => 'textfield',
				'param_name' => 'row_background_text_size_1440',
				'heading'    => esc_html__( 'Select Background Text Size 1280px-1440px', 'aarhus' ),
				'description' => esc_html__( 'Set the background text size in px or em', 'aarhus' ),
				'dependency' => array( 'element' => 'row_background_text_1', 'not_empty' => true ),
				'group'      => esc_html__( 'Select Settings', 'aarhus' )
			)
		);

		vc_add_param( 'vc_row',
			array(
				'type'       => 'textfield',
				'param_name' => 'row_background_text_size_1280',
				'heading'    => esc_html__( 'Select Background Text Size 1024px-1280px', 'aarhus' ),
				'description' => esc_html__( 'Set the background text size in px or em', 'aarhus' ),
				'dependency' => array( 'element' => 'row_background_text_1', 'not_empty' => true ),
				'group'      => esc_html__( 'Select Settings', 'aarhus' )
			)
		);

		vc_add_param( 'vc_row',
			array(
				'type'       => 'colorpicker',
				'param_name' => 'row_background_text_color',
				'heading'    => esc_html__( 'Select Background Text Color', 'aarhus' ),
				'dependency' => array( 'element' => 'row_background_text_1', 'not_empty' => true ),
				'group'      => esc_html__( 'Select Settings', 'aarhus' )
			)
		);

		vc_add_param( 'vc_row',
			array(
				'type'       => 'dropdown',
				'param_name' => 'row_background_text_align',
				'heading'    => esc_html__( 'Select Background Text Align', 'aarhus' ),
				'value'      => array(
					esc_html__( 'Default', 'aarhus' ) => '',
					esc_html__( 'Left', 'aarhus' )    => 'left',
					esc_html__( 'Center', 'aarhus' )  => 'center',
					esc_html__( 'Right', 'aarhus' )   => 'right'
				),
				'dependency' => array( 'element' => 'row_background_text_1', 'not_empty' => true ),
				'group'      => esc_html__( 'Select Settings', 'aarhus' )
			)
		);

		vc_add_param( 'vc_row',
			array(
				'type'       => 'dropdown',
				'param_name' => 'row_background_text_vertical_align',
				'heading'    => esc_html__( 'Select Background Vertical Align', 'aarhus' ),
				'value'      => array(
					esc_html__( 'Middle', 'aarhus' )   => 'middle',
					esc_html__( 'Top', 'aarhus' )      => 'top',
					esc_html__( 'Bottom', 'aarhus' )   => 'bottom'
				),
				'dependency' => array( 'element' => 'row_background_text_1', 'not_empty' => true ),
				'group'      => esc_html__( 'Select Settings', 'aarhus' )
			)
		);

		vc_add_param( 'vc_row',
			array(
				'type'       => 'textfield',
				'param_name' => 'row_background_text_padding_top',
				'heading'    => esc_html__( 'Select Background Text Top Padding', 'aarhus' ),
				'description' => esc_html__( 'Set the value of top padding in px or %', 'aarhus' ),
				'dependency' => array( 'element' => 'row_background_text_1', 'not_empty' => true ),
				'group'      => esc_html__( 'Select Settings', 'aarhus' )
			)
		);

		vc_add_param( 'vc_row',
			array(
				'type'       => 'textfield',
				'param_name' => 'row_background_text_padding_left',
				'heading'    => esc_html__( 'Select Background Text Left Padding', 'aarhus' ),
				'description' => esc_html__( 'Set the value of top padding in px or %', 'aarhus' ),
				'dependency' => array( 'element' => 'row_background_text_1', 'not_empty' => true ),
				'group'      => esc_html__( 'Select Settings', 'aarhus' )
			)
		);

		vc_add_param( 'vc_row',
			array(
				'type'       => 'dropdown',
				'param_name' => 'row_background_text_animation',
				'heading'    => esc_html__( 'Animate Background Text', 'aarhus' ),
				'value'      => array_flip( aarhus_select_get_yes_no_select_array(false, true) ),
				'dependency' => array( 'element' => 'row_background_text_1', 'not_empty' => true ),
				'description'    => esc_html__( 'Animate background text when row appears in viewport', 'aarhus' ),
				'group'      => esc_html__( 'Select Settings', 'aarhus' )
			)
		);


		do_action( 'aarhus_select_action_additional_vc_row_params' );
		
		/******* VC Row shortcode - end *******/
		
		/******* VC Row Inner shortcode - begin *******/
		
		vc_add_param( 'vc_row_inner',
			array(
				'type'       => 'dropdown',
				'param_name' => 'row_content_width',
				'heading'    => esc_html__( 'Select Row Content Width', 'aarhus' ),
				'value'      => array(
					esc_html__( 'Full Width', 'aarhus' ) => 'full-width',
					esc_html__( 'In Grid', 'aarhus' )    => 'grid'
				),
				'group'      => esc_html__( 'Select Settings', 'aarhus' )
			)
		);
		
		vc_add_param( 'vc_row_inner',
			array(
				'type'       => 'colorpicker',
				'param_name' => 'simple_background_color',
				'heading'    => esc_html__( 'Select Background Color', 'aarhus' ),
				'group'      => esc_html__( 'Select Settings', 'aarhus' )
			)
		);
		
		vc_add_param( 'vc_row_inner',
			array(
				'type'       => 'attach_image',
				'param_name' => 'simple_background_image',
				'heading'    => esc_html__( 'Select Background Image', 'aarhus' ),
				'group'      => esc_html__( 'Select Settings', 'aarhus' )
			)
		);
		
		vc_add_param( 'vc_row_inner',
			array(
				'type'        => 'textfield',
				'param_name'  => 'background_image_position',
				'heading'     => esc_html__( 'Select Background Position', 'aarhus' ),
				'description' => esc_html__( 'Set the starting position of a background image, default value is top left', 'aarhus' ),
				'dependency'  => array( 'element' => 'simple_background_image', 'not_empty' => true ),
				'group'       => esc_html__( 'Select Settings', 'aarhus' )
			)
		);
		
		vc_add_param( 'vc_row_inner',
			array(
				'type'        => 'dropdown',
				'param_name'  => 'disable_background_image',
				'heading'     => esc_html__( 'Select Disable Background Image', 'aarhus' ),
				'value'       => array(
					esc_html__( 'Never', 'aarhus' )        => '',
					esc_html__( 'Below 1280px', 'aarhus' ) => '1280',
					esc_html__( 'Below 1024px', 'aarhus' ) => '1024',
					esc_html__( 'Below 768px', 'aarhus' )  => '768',
					esc_html__( 'Below 680px', 'aarhus' )  => '680',
					esc_html__( 'Below 480px', 'aarhus' )  => '480'
				),
				'save_always' => true,
				'description' => esc_html__( 'Choose on which stage you hide row background image', 'aarhus' ),
				'dependency'  => array( 'element' => 'simple_background_image', 'not_empty' => true ),
				'group'       => esc_html__( 'Select Settings', 'aarhus' )
			)
		);
		
		vc_add_param( 'vc_row_inner',
			array(
				'type'       => 'dropdown',
				'param_name' => 'content_text_aligment',
				'heading'    => esc_html__( 'Select Content Aligment', 'aarhus' ),
				'value'      => array(
					esc_html__( 'Default', 'aarhus' ) => '',
					esc_html__( 'Left', 'aarhus' )    => 'left',
					esc_html__( 'Center', 'aarhus' )  => 'center',
					esc_html__( 'Right', 'aarhus' )   => 'right'
				),
				'group'      => esc_html__( 'Select Settings', 'aarhus' )
			)
		);
		
		/******* VC Row Inner shortcode - end *******/
		
		/******* VC Revolution Slider shortcode - begin *******/
		
		if ( aarhus_select_revolution_slider_installed() ) {
			
			vc_add_param( 'rev_slider_vc',
				array(
					'type'        => 'dropdown',
					'param_name'  => 'enable_paspartu',
					'heading'     => esc_html__( 'Select Enable Passepartout', 'aarhus' ),
					'value'       => array_flip( aarhus_select_get_yes_no_select_array( false ) ),
					'save_always' => true,
					'group'       => esc_html__( 'Select Settings', 'aarhus' )
				)
			);
			
			vc_add_param( 'rev_slider_vc',
				array(
					'type'        => 'dropdown',
					'param_name'  => 'paspartu_size',
					'heading'     => esc_html__( 'Select Passepartout Size', 'aarhus' ),
					'value'       => array(
						esc_html__( 'Tiny', 'aarhus' )   => 'tiny',
						esc_html__( 'Small', 'aarhus' )  => 'small',
						esc_html__( 'Normal', 'aarhus' ) => 'normal',
						esc_html__( 'Large', 'aarhus' )  => 'large'
					),
					'save_always' => true,
					'dependency'  => array( 'element' => 'enable_paspartu', 'value' => array( 'yes' ) ),
					'group'       => esc_html__( 'Select Settings', 'aarhus' )
				)
			);
			
			vc_add_param( 'rev_slider_vc',
				array(
					'type'        => 'dropdown',
					'param_name'  => 'disable_side_paspartu',
					'heading'     => esc_html__( 'Select Disable Side Passepartout', 'aarhus' ),
					'value'       => array_flip( aarhus_select_get_yes_no_select_array( false ) ),
					'save_always' => true,
					'dependency'  => array( 'element' => 'enable_paspartu', 'value' => array( 'yes' ) ),
					'group'       => esc_html__( 'Select Settings', 'aarhus' )
				)
			);
			
			vc_add_param( 'rev_slider_vc',
				array(
					'type'        => 'dropdown',
					'param_name'  => 'disable_top_paspartu',
					'heading'     => esc_html__( 'Select Disable Top Passepartout', 'aarhus' ),
					'value'       => array_flip( aarhus_select_get_yes_no_select_array( false ) ),
					'save_always' => true,
					'dependency'  => array( 'element' => 'enable_paspartu', 'value' => array( 'yes' ) ),
					'group'       => esc_html__( 'Select Settings', 'aarhus' )
				)
			);
		}
		
		/******* VC Revolution Slider shortcode - end *******/
	}
	
	add_action( 'vc_after_init', 'aarhus_select_vc_row_map' );
}