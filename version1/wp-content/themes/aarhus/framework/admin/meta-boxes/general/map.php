<?php

if ( ! function_exists( 'aarhus_select_map_general_meta' ) ) {
	function aarhus_select_map_general_meta() {
		
		$general_meta_box = aarhus_select_create_meta_box(
			array(
				'scope' => apply_filters( 'aarhus_select_filter_set_scope_for_meta_boxes', array( 'page', 'post' ), 'general_meta' ),
				'title' => esc_html__( 'General', 'aarhus' ),
				'name'  => 'general_meta'
			)
		);
		
		/***************** Slider Layout - begin **********************/
		
		aarhus_select_create_meta_box_field(
			array(
				'name'        => 'qodef_page_slider_meta',
				'type'        => 'text',
				'label'       => esc_html__( 'Slider Shortcode', 'aarhus' ),
				'description' => esc_html__( 'Paste your slider shortcode here', 'aarhus' ),
				'parent'      => $general_meta_box
			)
		);
		
		/***************** Slider Layout - begin **********************/
		
		/***************** Content Layout - begin **********************/
		
		aarhus_select_create_meta_box_field(
			array(
				'name'          => 'qodef_page_content_behind_header_meta',
				'type'          => 'yesno',
				'default_value' => 'no',
				'label'         => esc_html__( 'Always put content behind header', 'aarhus' ),
				'description'   => esc_html__( 'Enabling this option will put page content behind page header', 'aarhus' ),
				'parent'        => $general_meta_box
			)
		);
		
		$qodef_content_padding_group = aarhus_select_add_admin_group(
			array(
				'name'        => 'content_padding_group',
				'title'       => esc_html__( 'Content Styles', 'aarhus' ),
				'description' => esc_html__( 'Define styles for Content area', 'aarhus' ),
				'parent'      => $general_meta_box
			)
		);
		
			$qodef_content_padding_row = aarhus_select_add_admin_row(
				array(
					'name'   => 'qodef_content_padding_row',
					'parent' => $qodef_content_padding_group
				)
			);
			
				aarhus_select_create_meta_box_field(
					array(
						'name'        => 'qodef_page_background_color_meta',
						'type'        => 'colorsimple',
						'label'       => esc_html__( 'Page Background Color', 'aarhus' ),
						'parent'      => $qodef_content_padding_row
					)
				);
				
				aarhus_select_create_meta_box_field(
					array(
						'name'          => 'qodef_page_background_image_meta',
						'type'          => 'imagesimple',
						'label'         => esc_html__( 'Page Background Image', 'aarhus' ),
						'parent'        => $qodef_content_padding_row
					)
				);
				
				aarhus_select_create_meta_box_field(
					array(
						'name'          => 'qodef_page_background_repeat_meta',
						'type'          => 'selectsimple',
						'default_value' => '',
						'label'         => esc_html__( 'Page Background Image Repeat', 'aarhus' ),
						'options'       => aarhus_select_get_yes_no_select_array(),
						'parent'        => $qodef_content_padding_row
					)
				);
		
			$qodef_content_padding_row_1 = aarhus_select_add_admin_row(
				array(
					'name'   => 'qodef_content_padding_row_1',
					'next'   => true,
					'parent' => $qodef_content_padding_group
				)
			);
		
				aarhus_select_create_meta_box_field(
					array(
						'name'   => 'qodef_page_content_padding',
						'type'   => 'textsimple',
						'label'  => esc_html__( 'Content Padding (eg. 10px 5px 10px 5px)', 'aarhus' ),
						'parent' => $qodef_content_padding_row_1,
						'args'        => array(
							'col_width' => 4
						)
					)
				);
				
				aarhus_select_create_meta_box_field(
					array(
						'name'    => 'qodef_page_content_padding_mobile',
						'type'    => 'textsimple',
						'label'   => esc_html__( 'Content Padding for mobile (eg. 10px 5px 10px 5px)', 'aarhus' ),
						'parent'  => $qodef_content_padding_row_1,
						'args'        => array(
							'col_width' => 4
						)
					)
				);
		
		aarhus_select_create_meta_box_field(
			array(
				'name'          => 'qodef_initial_content_width_meta',
				'type'          => 'select',
				'default_value' => '',
				'label'         => esc_html__( 'Initial Width of Content', 'aarhus' ),
				'description'   => esc_html__( 'Choose the initial width of content which is in grid (Applies to pages set to "Default Template" and rows set to "In Grid")', 'aarhus' ),
				'parent'        => $general_meta_box,
				'options'       => array(
					''                => esc_html__( 'Default', 'aarhus' ),
					'qodef-grid-1300' => esc_html__( '1300px', 'aarhus' ),
					'qodef-grid-1200' => esc_html__( '1200px', 'aarhus' ),
					'qodef-grid-1100' => esc_html__( '1100px', 'aarhus' ),
					'qodef-grid-1000' => esc_html__( '1000px', 'aarhus' ),
					'qodef-grid-800'  => esc_html__( '800px', 'aarhus' )
				)
			)
		);
		
		aarhus_select_create_meta_box_field(
			array(
				'name'        => 'qodef_page_grid_space_meta',
				'type'        => 'select',
				'default_value' => '',
				'label'       => esc_html__( 'Grid Layout Space', 'aarhus' ),
				'description' => esc_html__( 'Choose a space between content layout and sidebar layout for your page', 'aarhus' ),
				'options'     => aarhus_select_get_space_between_items_array( true ),
				'parent'      => $general_meta_box
			)
		);
		
		/***************** Content Layout - end **********************/
		
		/***************** Boxed Layout - begin **********************/
		
		aarhus_select_create_meta_box_field(
			array(
				'name'    => 'qodef_boxed_meta',
				'type'    => 'select',
				'label'   => esc_html__( 'Boxed Layout', 'aarhus' ),
				'parent'  => $general_meta_box,
				'options' => aarhus_select_get_yes_no_select_array()
			)
		);
		
			$boxed_container_meta = aarhus_select_add_admin_container(
				array(
					'parent'          => $general_meta_box,
					'name'            => 'boxed_container_meta',
					'dependency' => array(
						'hide' => array(
							'qodef_boxed_meta' => array( '', 'no' )
						)
					)
				)
			);
		
				aarhus_select_create_meta_box_field(
					array(
						'name'        => 'qodef_page_background_color_in_box_meta',
						'type'        => 'color',
						'label'       => esc_html__( 'Page Background Color', 'aarhus' ),
						'description' => esc_html__( 'Choose the page background color outside box', 'aarhus' ),
						'parent'      => $boxed_container_meta
					)
				);
				
				aarhus_select_create_meta_box_field(
					array(
						'name'        => 'qodef_boxed_background_image_meta',
						'type'        => 'image',
						'label'       => esc_html__( 'Background Image', 'aarhus' ),
						'description' => esc_html__( 'Choose an image to be displayed in background', 'aarhus' ),
						'parent'      => $boxed_container_meta
					)
				);
				
				aarhus_select_create_meta_box_field(
					array(
						'name'        => 'qodef_boxed_pattern_background_image_meta',
						'type'        => 'image',
						'label'       => esc_html__( 'Background Pattern', 'aarhus' ),
						'description' => esc_html__( 'Choose an image to be used as background pattern', 'aarhus' ),
						'parent'      => $boxed_container_meta
					)
				);
				
				aarhus_select_create_meta_box_field(
					array(
						'name'          => 'qodef_boxed_background_image_attachment_meta',
						'type'          => 'select',
						'default_value' => '',
						'label'         => esc_html__( 'Background Image Attachment', 'aarhus' ),
						'description'   => esc_html__( 'Choose background image attachment', 'aarhus' ),
						'parent'        => $boxed_container_meta,
						'options'       => array(
							''       => esc_html__( 'Default', 'aarhus' ),
							'fixed'  => esc_html__( 'Fixed', 'aarhus' ),
							'scroll' => esc_html__( 'Scroll', 'aarhus' )
						)
					)
				);
		
		/***************** Boxed Layout - end **********************/
		
		/***************** Passepartout Layout - begin **********************/
		
		aarhus_select_create_meta_box_field(
			array(
				'name'          => 'qodef_paspartu_meta',
				'type'          => 'select',
				'default_value' => '',
				'label'         => esc_html__( 'Passepartout', 'aarhus' ),
				'description'   => esc_html__( 'Enabling this option will display passepartout around site content', 'aarhus' ),
				'parent'        => $general_meta_box,
				'options'       => aarhus_select_get_yes_no_select_array(),
			)
		);
		
			$paspartu_container_meta = aarhus_select_add_admin_container(
				array(
					'parent'          => $general_meta_box,
					'name'            => 'qodef_paspartu_container_meta',
					'dependency' => array(
						'hide' => array(
							'qodef_paspartu_meta'  => array('','no')
						)
					)
				)
			);
		
				aarhus_select_create_meta_box_field(
					array(
						'name'        => 'qodef_paspartu_color_meta',
						'type'        => 'color',
						'label'       => esc_html__( 'Passepartout Color', 'aarhus' ),
						'description' => esc_html__( 'Choose passepartout color, default value is #ffffff', 'aarhus' ),
						'parent'      => $paspartu_container_meta
					)
				);
				
				aarhus_select_create_meta_box_field(
					array(
						'name'        => 'qodef_paspartu_width_meta',
						'type'        => 'text',
						'label'       => esc_html__( 'Passepartout Size', 'aarhus' ),
						'description' => esc_html__( 'Enter size amount for passepartout', 'aarhus' ),
						'parent'      => $paspartu_container_meta,
						'args'        => array(
							'col_width' => 2,
							'suffix'    => 'px or %'
						)
					)
				);
		
				aarhus_select_create_meta_box_field(
					array(
						'name'        => 'qodef_paspartu_responsive_width_meta',
						'type'        => 'text',
						'label'       => esc_html__( 'Responsive Passepartout Size', 'aarhus' ),
						'description' => esc_html__( 'Enter size amount for passepartout for smaller screens (tablets and mobiles view)', 'aarhus' ),
						'parent'      => $paspartu_container_meta,
						'args'        => array(
							'col_width' => 2,
							'suffix'    => 'px or %'
						)
					)
				);
				
				aarhus_select_create_meta_box_field(
					array(
						'parent'        => $paspartu_container_meta,
						'type'          => 'select',
						'default_value' => '',
						'name'          => 'qodef_disable_top_paspartu_meta',
						'label'         => esc_html__( 'Disable Top Passepartout', 'aarhus' ),
						'options'       => aarhus_select_get_yes_no_select_array(),
					)
				);
		
				aarhus_select_create_meta_box_field(
					array(
						'parent'        => $paspartu_container_meta,
						'type'          => 'select',
						'default_value' => '',
						'name'          => 'qodef_enable_fixed_paspartu_meta',
						'label'         => esc_html__( 'Enable Fixed Passepartout', 'aarhus' ),
						'description'   => esc_html__( 'Enabling this option will set fixed passepartout for your screens', 'aarhus' ),
						'options'       => aarhus_select_get_yes_no_select_array(),
					)
				);
		
		/***************** Passepartout Layout - end **********************/
		
		/***************** Smooth Page Transitions Layout - begin **********************/
		
		aarhus_select_create_meta_box_field(
			array(
				'name'          => 'qodef_smooth_page_transitions_meta',
				'type'          => 'select',
				'default_value' => '',
				'label'         => esc_html__( 'Smooth Page Transitions', 'aarhus' ),
				'description'   => esc_html__( 'Enabling this option will perform a smooth transition between pages when clicking on links', 'aarhus' ),
				'parent'        => $general_meta_box,
				'options'       => aarhus_select_get_yes_no_select_array()
			)
		);
		
			$page_transitions_container_meta = aarhus_select_add_admin_container(
				array(
					'parent'     => $general_meta_box,
					'name'       => 'page_transitions_container_meta',
					'dependency' => array(
						'hide' => array(
							'qodef_smooth_page_transitions_meta' => array( '', 'no' )
						)
					)
				)
			);
		
				aarhus_select_create_meta_box_field(
					array(
						'name'        => 'qodef_page_transition_preloader_meta',
						'type'        => 'select',
						'label'       => esc_html__( 'Enable Preloading Animation', 'aarhus' ),
						'description' => esc_html__( 'Enabling this option will display an animated preloader while the page content is loading', 'aarhus' ),
						'parent'      => $page_transitions_container_meta,
						'options'     => aarhus_select_get_yes_no_select_array()
					)
				);
		
				$page_transition_preloader_container_meta = aarhus_select_add_admin_container(
					array(
						'parent'     => $page_transitions_container_meta,
						'name'       => 'page_transition_preloader_container_meta',
						'dependency' => array(
							'hide' => array(
								'qodef_page_transition_preloader_meta' => array( '', 'no' )
							)
						)
					)
				);
				
					aarhus_select_create_meta_box_field(
						array(
							'name'   => 'qodef_smooth_pt_bgnd_color_meta',
							'type'   => 'color',
							'label'  => esc_html__( 'Page Loader Background Color', 'aarhus' ),
							'parent' => $page_transition_preloader_container_meta
						)
					);
					
					$group_pt_spinner_animation_meta = aarhus_select_add_admin_group(
						array(
							'name'        => 'group_pt_spinner_animation_meta',
							'title'       => esc_html__( 'Loader Style', 'aarhus' ),
							'description' => esc_html__( 'Define styles for loader spinner animation', 'aarhus' ),
							'parent'      => $page_transition_preloader_container_meta
						)
					);
					
					$row_pt_spinner_animation_meta = aarhus_select_add_admin_row(
						array(
							'name'   => 'row_pt_spinner_animation_meta',
							'parent' => $group_pt_spinner_animation_meta
						)
					);
					
					aarhus_select_create_meta_box_field(
						array(
							'type'    => 'selectsimple',
							'name'    => 'qodef_smooth_pt_spinner_type_meta',
							'label'   => esc_html__( 'Spinner Type', 'aarhus' ),
							'parent'  => $row_pt_spinner_animation_meta,
							'options' => array(
								''                      => esc_html__( 'Default', 'aarhus' ),
								'aarhus_spinner'        => esc_html__( 'Aarhus Spinner', 'aarhus' ),
								'rotate_circles'        => esc_html__( 'Rotate Circles', 'aarhus' ),
								'pulse'                 => esc_html__( 'Pulse', 'aarhus' ),
								'double_pulse'          => esc_html__( 'Double Pulse', 'aarhus' ),
								'cube'                  => esc_html__( 'Cube', 'aarhus' ),
								'rotating_cubes'        => esc_html__( 'Rotating Cubes', 'aarhus' ),
								'stripes'               => esc_html__( 'Stripes', 'aarhus' ),
								'wave'                  => esc_html__( 'Wave', 'aarhus' ),
								'two_rotating_circles'  => esc_html__( '2 Rotating Circles', 'aarhus' ),
								'five_rotating_circles' => esc_html__( '5 Rotating Circles', 'aarhus' ),
								'atom'                  => esc_html__( 'Atom', 'aarhus' ),
								'clock'                 => esc_html__( 'Clock', 'aarhus' ),
								'mitosis'               => esc_html__( 'Mitosis', 'aarhus' ),
								'lines'                 => esc_html__( 'Lines', 'aarhus' ),
								'fussion'               => esc_html__( 'Fussion', 'aarhus' ),
								'wave_circles'          => esc_html__( 'Wave Circles', 'aarhus' ),
								'pulse_circles'         => esc_html__( 'Pulse Circles', 'aarhus' )
							)
						)
					);
					
					aarhus_select_create_meta_box_field(
						array(
							'type'   => 'colorsimple',
							'name'   => 'qodef_smooth_pt_spinner_color_meta',
							'label'  => esc_html__( 'Spinner Color', 'aarhus' ),
							'parent' => $row_pt_spinner_animation_meta
						)
					);
					
					aarhus_select_create_meta_box_field(
						array(
							'name'        => 'qodef_page_transition_fadeout_meta',
							'type'        => 'select',
							'label'       => esc_html__( 'Enable Fade Out Animation', 'aarhus' ),
							'description' => esc_html__( 'Enabling this option will turn on fade out animation when leaving page', 'aarhus' ),
							'options'     => aarhus_select_get_yes_no_select_array(),
							'parent'      => $page_transitions_container_meta
						
						)
					);

					aarhus_select_create_meta_box_field(
						array(
							'type'          => 'text',
							'name'          => 'qodef_smooth_pt_spinner_text_first_meta',
							'default_value' => 'Aar',
							'label'         => esc_html__( 'First Preloader Word', 'aarhus' ),
							'description'   => esc_html__( 'Words will be separated by dash.', 'aarhus' ),
							'parent'        => $row_pt_spinner_animation_meta,
							'dependency' => array(
								'show' => array(
									'qodef_smooth_pt_spinner_type_meta' => 'aarhus_spinner'
								)
							)
						)
					);

					aarhus_select_create_meta_box_field(
						array(
							'type'          => 'text',
							'name'          => 'qodef_smooth_pt_spinner_text_second_meta',
							'default_value' => 'hus',
							'label'         => esc_html__( 'Second Preloader Word', 'aarhus' ),
							'parent'        => $row_pt_spinner_animation_meta,
							'dependency' => array(
								'show' => array(
									'qodef_smooth_pt_spinner_type_meta' => 'aarhus_spinner'
								)
							)
						)
					);
		
		/***************** Smooth Page Transitions Layout - end **********************/
		
		/***************** Comments Layout - begin **********************/
		
		aarhus_select_create_meta_box_field(
			array(
				'name'        => 'qodef_page_comments_meta',
				'type'        => 'select',
				'label'       => esc_html__( 'Show Comments', 'aarhus' ),
				'description' => esc_html__( 'Enabling this option will show comments on your page', 'aarhus' ),
				'parent'      => $general_meta_box,
				'options'     => aarhus_select_get_yes_no_select_array()
			)
		);
		
		/***************** Comments Layout - end **********************/
	}
	
	add_action( 'aarhus_select_action_meta_boxes_map', 'aarhus_select_map_general_meta', 10 );
}

if ( ! function_exists( 'aarhus_select_container_background_style' ) ) {
	/**
	 * Function that return container style
	 */
	function aarhus_select_container_background_style( $style ) {
		$page_id      = aarhus_select_get_page_id();
		$class_prefix = aarhus_select_get_unique_page_class( $page_id, true );
		
		$container_selector = array(
			$class_prefix . ' .qodef-content'
		);
		
		$container_class        = array();
		$page_background_color  = get_post_meta( $page_id, 'qodef_page_background_color_meta', true );
		$page_background_image  = get_post_meta( $page_id, 'qodef_page_background_image_meta', true );
		$page_background_repeat = get_post_meta( $page_id, 'qodef_page_background_repeat_meta', true );
		
		if ( ! empty( $page_background_color ) ) {
			$container_class['background-color'] = $page_background_color;
		}
		
		if ( ! empty( $page_background_image ) ) {
			$container_class['background-image'] = 'url(' . esc_url( $page_background_image ) . ')';
			
			if ( $page_background_repeat === 'yes' ) {
				$container_class['background-repeat']   = 'repeat';
				$container_class['background-position'] = '0 0';
			} else {
				$container_class['background-repeat']   = 'no-repeat';
				$container_class['background-position'] = 'center 0';
				$container_class['background-size']     = 'cover';
			}
		}
		
		$current_style = aarhus_select_dynamic_css( $container_selector, $container_class );
		$current_style = $current_style . $style;
		
		return $current_style;
	}
	
	add_filter( 'aarhus_select_filter_add_page_custom_style', 'aarhus_select_container_background_style' );
}