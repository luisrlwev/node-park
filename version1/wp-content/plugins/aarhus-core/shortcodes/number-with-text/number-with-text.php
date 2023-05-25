<?php
namespace AarhusCore\CPT\Shortcodes\NumberWithText;

use AarhusCore\Lib;

class NumberWithText implements Lib\ShortcodeInterface {
	private $base;

	public function __construct() {
		$this->base = 'qodef_number_with_text';

		add_action( 'vc_before_init', array( $this, 'vcMap' ) );
	}

	public function getBase() {
		return $this->base;
	}

	public function vcMap() {
		if ( function_exists( 'vc_map' ) ) {
			vc_map(
				array(
					'name'                      => esc_html__( 'Number With Text', 'aarhus-core' ),
					'base'                      => $this->getBase(),
					'category'                  => esc_html__( 'by AARHUS', 'aarhus-core' ),
					'icon'                      => 'icon-wpb-image-with-text extended-custom-icon',
					'allowed_container_element' => 'vc_row',
					'params'                    => array(
						array(
							'type'        => 'textfield',
							'param_name'  => 'custom_class',
							'heading'     => esc_html__( 'Custom CSS Class', 'aarhus-core' ),
							'description' => esc_html__( 'Style particular content element differently - add a class name and refer to it in custom CSS', 'aarhus-core' )
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'number',
							'heading'    => esc_html__( 'Number', 'aarhus-core' )
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
							'value'       => array_flip( aarhus_select_get_title_tag( true ) ),
							'save_always' => true,
							'dependency'  => array( 'element' => 'title', 'not_empty' => true )
						),
						array(
							'type'       => 'colorpicker',
							'param_name' => 'title_color',
							'heading'    => esc_html__( 'Title Color', 'aarhus-core' ),
							'dependency' => array( 'element' => 'title', 'not_empty' => true )
						),
						array(
							'type'       => 'textarea',
							'param_name' => 'text',
							'heading'    => esc_html__( 'Text', 'aarhus-core' )
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'content_top_margin',
							'heading'    => esc_html__( 'Content Top Margin (px)', 'aarhus-core' )
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'content_left_margin',
							'heading'    => esc_html__( 'Content Left Margin (px)', 'aarhus-core' )
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'enable_external_url',
							'heading'     => esc_html__( 'Enable External URL', 'aarhus-core' ),
							'value'       => array_flip( aarhus_select_get_yes_no_select_array( false ) ),
							'save_always' => true
						),
						array(
							'type'        => 'textfield',
							'param_name'  => 'external_url',
							'heading'     => esc_html__( 'External URL', 'aarhus-core' ),
							'dependency'  => array( 'element' => 'enable_external_url', 'value' => array( 'yes' ) )
						),
						array(
							'type'       => 'dropdown',
							'param_name' => 'external_url_target',
							'heading'    => esc_html__( 'External URL Target', 'aarhus-core' ),
							'value'      => array_flip( aarhus_select_get_link_target_array() ),
							'dependency' => Array( 'element' => 'external_url', 'not_empty' => true )
						)
					)
				)
			);
		}
	}

	public function render( $atts, $content = null ) {
		$args   = array(
			'custom_class'        => '',
			'number'			  => '',
			'title'               => '',
			'title_tag'           => 'h3',
			'title_color'         => '',
			'text'                => '',
			'content_top_margin'  => '',
			'content_left_margin' => '',
			'enable_external_url' => 'no',
			'external_url'		  => '',
			'external_url_target' => '_self'
		);
		$params = shortcode_atts( $args, $atts );

		$params['holder_classes']      = $this->getHolderClasses( $params );
		$params['external_url_target'] = ! empty( $params['external_url_target'] ) ? $params['external_url_target'] : $args['external_url_target'];
		$params['title_tag']           = ! empty( $params['title_tag'] ) ? $params['title_tag'] : $args['title_tag'];
		$params['content_styles']      = $this->getContentStyles( $params );
		$params['title_styles']        = $this->getTitleStyles( $params );

		$html = aarhus_core_get_shortcode_module_template_part( 'templates/number-with-text', 'number-with-text', '', $params );

		return $html;
	}

	private function getHolderClasses( $params ) {
		$holderClasses = ! empty( $params['custom_class'] ) ? esc_attr( $params['custom_class'] ) : '';

		return $holderClasses;
	}

	private function getContentStyles( $params ) {
		$styles = array();

		if ( $params['content_top_margin'] !== '' ) {
			$styles[] = 'margin-top: ' . aarhus_select_filter_px( $params['content_top_margin'] ) . 'px';
		}

		if ( $params['content_left_margin'] !== '' ) {
			$styles[] = 'margin-left: ' . aarhus_select_filter_px( $params['content_left_margin'] ) . 'px';
		}

		return implode( ';', $styles );
	}

	private function getTitleStyles( $params ) {
		$styles = array();

		if ( ! empty( $params['title_color'] ) ) {
			$styles = 'color: ' . $params['title_color'];
		}

		return $styles;
	}
}