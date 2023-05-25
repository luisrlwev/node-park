<?php
namespace AarhusCore\CPT\Shortcodes\VerticalSplitSliderContentItem;

use AarhusCore\Lib;

class VerticalSplitSliderContentItem implements Lib\ShortcodeInterface {
	private $base;
	
	function __construct() {
		$this->base = 'qodef_vertical_split_slider_content_item';
		add_action( 'vc_before_init', array( $this, 'vcMap' ) );
	}
	
	public function getBase() {
		return $this->base;
	}
	
	public function vcMap() {
		if ( function_exists( 'vc_map' ) ) {
			vc_map(
				array(
					'name'      => esc_html__( 'Slide Content Item', 'aarhus-core' ),
					'base'      => $this->base,
					'icon'      => 'icon-wpb-vertical-split-slider-content-item extended-custom-icon',
					'category'  => esc_html__( 'by AARHUS', 'aarhus-core' ),
					'as_parent' => array( 'except' => 'vc_row' ),
					'as_child'  => array( 'only' => 'qodef_vertical_split_slider_left_panel, qodef_vertical_split_slider_right_panel' ),
					'js_view'   => 'VcColumnView',
					'params'    => array(
						array(
							'type'       => 'colorpicker',
							'param_name' => 'background_color',
							'heading'    => esc_html__( 'Background Color', 'aarhus-core' )
						),
						array(
							'type'       => 'attach_image',
							'param_name' => 'background_image',
							'heading'    => esc_html__( 'Background Image', 'aarhus-core' )
						),
						array(
							'type'        => 'textfield',
							'param_name'  => 'item_padding',
							'heading'     => esc_html__( 'Padding', 'aarhus-core' ),
							'description' => esc_html__( 'Insert padding in format: Top Right Bottom Left (e.g. 0px 0px 1px 0px)', 'aarhus-core' )
						),
						array(
							'type'       => 'dropdown',
							'param_name' => 'alignment',
							'heading'    => esc_html__( 'Content Alignment', 'aarhus-core' ),
							'value'      => array(
								esc_html__( 'Default', 'aarhus-core' ) => '',
								esc_html__( 'Left', 'aarhus-core' )    => 'left',
								esc_html__( 'Right', 'aarhus-core' )   => 'right',
								esc_html__( 'Center', 'aarhus-core' )  => 'center'
							)
						),
						array(
							'type'       => 'dropdown',
							'param_name' => 'header_style',
							'heading'    => esc_html__( 'Header/Bullets Style', 'aarhus-core' ),
							'value'      => array(
								esc_html__( 'Default', 'aarhus-core' ) => '',
								esc_html__( 'Light', 'aarhus-core' )   => 'light',
								esc_html__( 'Dark', 'aarhus-core' )    => 'dark'
							)
						)
					)
				)
			);
		}
	}
	
	public function render( $atts, $content = null ) {
		$args   = array(
			'background_color' => '',
			'background_image' => '',
			'item_padding'     => '',
			'alignment'        => 'left',
			'header_style'     => ''
		);
		$params = shortcode_atts( $args, $atts );
		
		$params['content_data']  = $this->getContentData( $params );
		$params['content_style'] = $this->getContentStyles( $params );
		$params['content']       = $content;
		
		$html = aarhus_core_get_shortcode_module_template_part( 'templates/vertical-split-slider-content-item-template', 'vertical-split-slider', '', $params );
		
		return $html;
	}
	
	private function getContentData( $params ) {
		$data = array();
		
		if ( ! empty( $params['header_style'] ) ) {
			$data['data-header-style'] = $params['header_style'];
		}
		
		return $data;
	}
	
	private function getContentStyles( $params ) {
		$styles = array();
		
		if ( ! empty( $params['background_color'] ) ) {
			$styles[] = 'background-color: ' . $params['background_color'];
		}
		
		if ( ! empty( $params['background_image'] ) ) {
			$url      = wp_get_attachment_url( $params['background_image'] );
			$styles[] = 'background-image: url(' . $url . ')';
		}
		
		if ( ! empty( $params['item_padding'] ) ) {
			$styles[] = 'padding: ' . $params['item_padding'];
		}
		
		if ( ! empty( $params['alignment'] ) ) {
			$styles[] = 'text-align: ' . $params['alignment'];
		}
		
		return implode( ';', $styles );
	}
}
