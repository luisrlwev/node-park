<?php
namespace AarhusCore\CPT\Shortcodes\Banner;

use AarhusCore\Lib;

class Banner implements Lib\ShortcodeInterface {
	private $base;
	
	public function __construct() {
		$this->base = 'qodef_banner';
		
		add_action( 'vc_before_init', array( $this, 'vcMap' ) );
	}
	
	public function getBase() {
		return $this->base;
	}
	
	public function vcMap() {
		if ( function_exists( 'vc_map' ) ) {
			vc_map(
				array(
					'name'                      => esc_html__( 'Banner', 'aarhus-core' ),
					'base'                      => $this->getBase(),
					'category'                  => esc_html__( 'by AARHUS', 'aarhus-core' ),
					'icon'                      => 'icon-wpb-banner extended-custom-icon',
					'allowed_container_element' => 'vc_row',
					'params'                    => array(
						array(
							'type'        => 'textfield',
							'param_name'  => 'custom_class',
							'heading'     => esc_html__( 'Custom CSS Class', 'aarhus-core' ),
							'description' => esc_html__( 'Style particular content element differently - add a class name and refer to it in custom CSS', 'aarhus-core' )
						),
						array(
							'type'        => 'attach_image',
							'param_name'  => 'image',
							'heading'     => esc_html__( 'Image', 'aarhus-core' ),
							'description' => esc_html__( 'Select image from media library', 'aarhus-core' )
						),
						array(
							'type'       => 'colorpicker',
							'param_name' => 'overlay_color',
							'heading'    => esc_html__( 'Image Overlay Color', 'aarhus-core' )
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'hover_behavior',
							'heading'     => esc_html__( 'Hover Behavior', 'aarhus-core' ),
							'value'       => array(
								esc_html__( 'Visible on Hover', 'aarhus-core' )   => 'qodef-visible-on-hover',
								esc_html__( 'Visible on Default', 'aarhus-core' ) => 'qodef-visible-on-default',
								esc_html__( 'Disabled', 'aarhus-core' )           => 'qodef-disabled'
							),
							'save_always' => true
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'info_position',
							'heading'     => esc_html__( 'Info Position', 'aarhus-core' ),
							'value'       => array(
								esc_html__( 'Default', 'aarhus-core' )  => 'default',
								esc_html__( 'Centered', 'aarhus-core' ) => 'centered',
								esc_html__( 'Bottom Left', 'aarhus-core' ) => 'bottom-left'
							),
							'save_always' => true
						),
						array(
							'type'        => 'textfield',
							'param_name'  => 'info_content_padding',
							'heading'     => esc_html__( 'Info Content Padding', 'aarhus-core' ),
							'description' => esc_html__( 'Please insert padding in format top right bottom left', 'aarhus-core' )
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'subtitle',
							'heading'    => esc_html__( 'Subtitle', 'aarhus-core' )
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'subtitle_tag',
							'heading'     => esc_html__( 'Subtitle Tag', 'aarhus-core' ),
							'value'       => array_flip( aarhus_select_get_title_tag( true, array( 'p' => 'p' ) ) ),
							'save_always' => true,
							'dependency'  => array( 'element' => 'subtitle', 'not_empty' => true )
						),
						array(
							'type'       => 'colorpicker',
							'param_name' => 'subtitle_color',
							'heading'    => esc_html__( 'Subtitle Color', 'aarhus-core' ),
							'dependency' => array( 'element' => 'subtitle', 'not_empty' => true )
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'title',
							'heading'    => esc_html__( 'Title', 'aarhus-core' )
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'title_tag',
							'heading'     => esc_html__( 'Title Tag', 'aarhus-core' ),
							'value'       => array_flip( aarhus_select_get_title_tag( true, array( 'p' => 'p', 'span' => 'span' ) ) ),
							'save_always' => true,
							'dependency'  => array( 'element' => 'title', 'not_empty' => true )
						),
						array(
							'type'        => 'textfield',
							'param_name'  => 'title_light_words',
							'heading'     => esc_html__( 'Words with Light Font Weight', 'aarhus-core' ),
							'description' => esc_html__( 'Enter the positions of the words you would like to display in a "light" font weight. Separate the positions with commas (e.g. if you would like the first, third, and fourth word to have a light font weight, you would enter "1,3,4")', 'aarhus-core' ),
							'dependency'  => array( 'element' => 'title', 'not_empty' => true )
						),
						array(
							'type'       => 'colorpicker',
							'param_name' => 'title_color',
							'heading'    => esc_html__( 'Title Color', 'aarhus-core' ),
							'dependency' => array( 'element' => 'title', 'not_empty' => true )
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'title_top_margin',
							'heading'    => esc_html__( 'Title Top Margin (px)', 'aarhus-core' ),
							'dependency' => array( 'element' => 'title', 'not_empty' => true )
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'link',
							'heading'    => esc_html__( 'Link', 'aarhus-core' )
						),
						array(
							'type'       => 'dropdown',
							'param_name' => 'target',
							'heading'    => esc_html__( 'Target', 'aarhus-core' ),
							'value'      => array_flip( aarhus_select_get_link_target_array() ),
							'dependency' => array( 'element' => 'link', 'not_empty' => true )
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'link_text',
							'heading'    => esc_html__( 'Link Text', 'aarhus-core' ),
							'dependency' => array( 'element' => 'link', 'not_empty' => true )
						),
						array(
							'type'       => 'colorpicker',
							'param_name' => 'link_color',
							'heading'    => esc_html__( 'Link Text Color', 'aarhus-core' ),
							'dependency' => array( 'element' => 'link', 'not_empty' => true )
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'link_top_margin',
							'heading'    => esc_html__( 'Link Text Top Margin (px)', 'aarhus-core' ),
							'dependency' => array( 'element' => 'link', 'not_empty' => true )
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'enable_button',
							'heading'     => esc_html__( 'Enable Button', 'aarhus-core' ),
							'value'       => array_flip( aarhus_select_get_yes_no_select_array( false ) ),
							'save_always' => true
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'button_text',
							'heading'    => esc_html__( 'Button Text', 'aarhus-core' ),
							'dependency' => array( 'element' => 'enable_button', 'value' => array( 'yes' ) )
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'enable_badge',
							'heading'     => esc_html__( 'Enable Badge', 'aarhus-core' ),
							'value'       => array_flip( aarhus_select_get_yes_no_select_array( false ) ),
							'save_always' => true
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'badge_text',
							'heading'    => esc_html__( 'Badge Text', 'aarhus-core' ),
							'dependency' => array( 'element' => 'enable_badge', 'value' => array( 'yes' ) )
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'badge_mark',
							'heading'    => esc_html__( 'Badge Mark', 'aarhus-core' ),
							'dependency' => array( 'element' => 'enable_badge', 'value' => array( 'yes' ) )
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'enable_shadow',
							'heading'     => esc_html__( 'Enable Shadow', 'aarhus-core' ),
							'value'       => array_flip( aarhus_select_get_yes_no_select_array( false ) ),
							'save_always' => true
						),
					)
				)
			);
		}
	}
	
	public function render( $atts, $content = null ) {
		$args   = array(
			'custom_class'         => '',
			'image'                => '',
			'overlay_color'        => '',
			'hover_behavior'       => 'qodef-visible-on-hover',
			'info_position'        => 'default',
			'info_content_padding' => '',
			'subtitle'             => '',
			'subtitle_tag'         => 'h5',
			'subtitle_color'       => '',
			'title'                => '',
			'title_tag'            => 'h2',
			'title_light_words'    => '',
			'title_color'          => '',
			'title_top_margin'     => '',
			'link'                 => '',
			'target'               => '_self',
//			'link_text'            => '',
//			'link_color'           => '',
//			'link_top_margin'      => '',
			'enable_button'		   => 'no',
			'button_text'		   => '',
			'enable_badge'		   => 'no',
			'badge_text'		   => '',
			'badge_mark'		   => '',
			'enable_shadow'		   => 'no'
		);
		$params = shortcode_atts( $args, $atts );
		
		$params['holder_classes']  = $this->getHolderClasses( $params, $args );
		$params['overlay_styles']  = $this->getOverlayStyles( $params );
		$params['subtitle_tag']    = ! empty( $params['subtitle_tag'] ) ? $params['subtitle_tag'] : $args['subtitle_tag'];
		$params['subtitle_styles'] = $this->getSubitleStyles( $params );
		$params['title']           = $this->getModifiedTitle( $params );
		$params['title_tag']       = ! empty( $params['title_tag'] ) ? $params['title_tag'] : $args['title_tag'];
		$params['title_styles']    = $this->getTitleStyles( $params );
		//$params['link_styles']     = $this->getLinkStyles( $params );
		
		$html = aarhus_core_get_shortcode_module_template_part( 'templates/banner', 'banner', '', $params );
		
		return $html;
	}
	
	private function getHolderClasses( $params, $args ) {
		$holderClasses = array();
		
		$holderClasses[] = ! empty( $params['custom_class'] ) ? esc_attr( $params['custom_class'] ) : '';
		$holderClasses[] = ! empty( $params['hover_behavior'] ) ? $params['hover_behavior'] : $args['hover_behavior'];
		$holderClasses[] = ! empty( $params['info_position'] ) ? 'qodef-banner-info-' . $params['info_position'] : 'qodef-banner-info-' . $args['info_position'];
		$holderClasses[] = ( $params['enable_shadow'] === 'yes' ) ? 'qodef-banner-shadow' : '';
		
		return implode( ' ', $holderClasses );
	}
	
	private function getOverlayStyles( $params ) {
		$styles = array();
		
		if ( ! empty( $params['overlay_color'] ) ) {
			$styles[] = 'background-color: ' . $params['overlay_color'];
		}
		
		if ( ! empty( $params['info_content_padding'] ) ) {
			$styles[] = 'padding: ' . $params['info_content_padding'];
		}
		
		return implode( ';', $styles );
	}
	
	private function getSubitleStyles( $params ) {
		$styles = array();
		
		if ( ! empty( $params['subtitle_color'] ) ) {
			$styles[] = 'color: ' . $params['subtitle_color'];
		}
		
		return implode( ';', $styles );
	}
	
	private function getModifiedTitle( $params ) {
		$title             = $params['title'];
		$title_light_words = str_replace( ' ', '', $params['title_light_words'] );
		
		if ( ! empty( $title ) ) {
			$light_words = explode( ',', $title_light_words );
			$split_title = explode( ' ', $title );
			
			if ( ! empty( $title_light_words ) ) {
				foreach ( $light_words as $value ) {
					if ( ! empty( $split_title[ $value - 1 ] ) ) {
						$split_title[ $value - 1 ] = '<span class="qodef-banner-title-light">' . $split_title[ $value - 1 ] . '</span>';
					}
				}
			}
			
			$title = implode( ' ', $split_title );
		}
		
		return $title;
	}
	
	private function getTitleStyles( $params ) {
		$styles = array();
		
		if ( ! empty( $params['title_color'] ) ) {
			$styles[] = 'color: ' . $params['title_color'];
		}
		
		if ( ! empty( $params['title_top_margin'] ) ) {
			$styles[] = 'margin-top: ' . aarhus_select_filter_px( $params['title_top_margin'] ) . 'px';
		}
		
		return implode( ';', $styles );
	}
	
//	private function getLinkStyles( $params ) {
//		$styles = array();
//
//		if ( ! empty( $params['link_color'] ) ) {
//			$styles[] = 'color: ' . $params['link_color'];
//		}
//
//		if ( ! empty( $params['link_top_margin'] ) ) {
//			$styles[] = 'margin-top: ' . aarhus_select_filter_px( $params['link_top_margin'] ) . 'px';
//		}
//
//		return implode( ';', $styles );
//	}
}