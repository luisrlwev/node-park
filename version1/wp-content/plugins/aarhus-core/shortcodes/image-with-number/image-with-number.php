<?php
namespace AarhusCore\CPT\Shortcodes\ImageWithNumber;

use AarhusCore\Lib;

class ImageWithNumber implements Lib\ShortcodeInterface {
	private $base;

	public function __construct() {
		$this->base = 'qodef_image_with_number';

		add_action( 'vc_before_init', array( $this, 'vcMap' ) );
	}

	public function getBase() {
		return $this->base;
	}

	public function vcMap() {
		if ( function_exists( 'vc_map' ) ) {
			vc_map(
				array(
					'name'                      => esc_html__( 'Image With Number', 'aarhus-core' ),
					'base'                      => $this->getBase(),
					'category'                  => esc_html__( 'by AARHUS', 'aarhus-core' ),
					'icon'                      => 'icon-wpb-image-with-number extended-custom-icon',
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
							'type'		 => 'dropdown',
							'param_name' => 'type',
							'heading'	 => esc_html__( 'Type', 'aarhus-core' ),
							'value'		 => array(
								esc_html__( 'With Number', 'aarhus-core' ) => 'with-number',
								esc_html__( 'With Image', 'aarhus-core' ) => 'with-image'
							)
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
							'type'       => 'textarea',
							'param_name' => 'text',
							'heading'    => esc_html__( 'Text', 'aarhus-core' )
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'text_padding',
							'heading'     => esc_html__( 'Padding (px or %)', 'aarhus-core' ),
							'description' => esc_html__( 'Insert padding in format: top right bottom left (e.g. 10px 5px 10px 5px)', 'aarhus-core' )
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'number',
							'heading'    => esc_html__( 'Number', 'aarhus-core' ),
							'dependency' => array( 'element' => 'type', 'value' => array( 'with-number' ) )
						),
						array(
							'type'        => 'attach_image',
							'param_name'  => 'overlay_image',
							'heading'     => esc_html__( 'Overlay Image', 'aarhus-core' ),
							'description' => esc_html__( 'Select image from media library', 'aarhus-core' ),
							'dependency'  => array( 'element' => 'type', 'value' => array( 'with-image' ) )
						),
						array(
							'type'        => 'attach_image',
							'param_name'  => 'overlay_hover_image',
							'heading'     => esc_html__( 'Overlay Hover Image', 'aarhus-core' ),
							'description' => esc_html__( 'Select image from media library', 'aarhus-core' ),
							'dependency'  => array( 'element' => 'type', 'value' => array( 'with-image' ) )
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'border_left',
							'heading'     => esc_html__( 'Enable Left Border', 'aarhus-core' ),
							'value'       => array_flip( aarhus_select_get_yes_no_select_array( false ) ),
							'save_always' => true
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'border_right',
							'heading'     => esc_html__( 'Enable Right Border', 'aarhus-core' ),
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
			'custom_class'        => '',
			'image'               => '',
			'type'				  => 'with-number',
			'title'               => '',
			'title_tag'           => 'h4',
			'text'                => '',
			'text_padding'        => '',
			'number'			  => '',
			'overlay_image'       => '',
			'overlay_hover_image' => '',
			'border_left'		  => 'no',
			'border_right'		  => 'no'
		);
		$params = shortcode_atts( $args, $atts );

		$params['holder_classes']      = $this->getHolderClasses( $params );
		$params['image']      		   = $this->getImage( $params );
		$params['title_tag']           = ! empty( $params['title_tag'] ) ? $params['title_tag'] : $args['title_tag'];
		$params['text_styles']         = $this->getTextStyles( $params );
		$params['overlay_image']       = $this->getOverlayImage( $params );
		$params['overlay_hover_image'] = $this->getOverlayHoverImage( $params );
		$params['holder_styles']       = $this->getHolderStyles( $params );

		$html = aarhus_core_get_shortcode_module_template_part( 'templates/image-with-number', 'image-with-number', '', $params );

		return $html;
	}

	private function getHolderClasses( $params ) {
		$holderClasses = array();

		$holderClasses[] = 'qodef-image-with-number-holder';
		$holderClasses[] = ! empty( $params['custom_class'] ) ? esc_attr( $params['custom_class'] ) : '';
		$holderClasses[] = ! empty( $params['type'] ) ? 'qodef-' . esc_attr( $params['type'] ) : '';

		return implode( ' ', $holderClasses );
	}

	private function getImage( $params ) {
		$image = array();

		if ( ! empty( $params['image'] ) ) {
			$id = $params['image'];

			$image['image_id'] = $id;
			$image_original    = wp_get_attachment_image_src( $id, 'full' );
			$image['url']      = $image_original[0];
			$image['alt']      = get_post_meta( $id, '_wp_attachment_image_alt', true );
		}

		return $image;
	}

	private function getTextStyles( $params ) {
		$styles = array();

		if ( $params['text_padding'] !== '' ) {
			$styles[] = 'padding: ' . $params['text_padding'];
		}

		return implode( ';', $styles );
	}

	private function getOverlayImage( $params ) {
		$overlay_image = array();

		if ( ! empty( $params['overlay_image'] ) ) {
			$id = $params['overlay_image'];

			$overlay_image['image_id'] = $id;
			$overlay_image_original    = wp_get_attachment_image_src( $id, 'full' );
			$overlay_image['url']      = $overlay_image_original[0];
			$overlay_image['alt']      = get_post_meta( $id, '_wp_attachment_image_alt', true );
		}

		return $overlay_image;
	}

	private function getOverlayHoverImage( $params ) {
		$overlay_hover_image = array();

		if ( ! empty( $params['overlay_hover_image'] ) ) {
			$id = $params['overlay_hover_image'];

			$overlay_hover_image['image_id'] = $id;
			$overlay_hover_image_original    = wp_get_attachment_image_src( $id, 'full' );
			$overlay_hover_image['url']      = $overlay_hover_image_original[0];
			$overlay_hover_image['alt']      = get_post_meta( $id, '_wp_attachment_image_alt', true );
		}

		return $overlay_hover_image;
	}

	private function getHolderStyles( $params ) {
		$styles = array();

		if ( $params['border_left'] === 'yes' ) {
			$styles[] = 'border-left: 1px solid #e5e5e5';
		}

		if ( $params['border_right'] === 'yes' ) {
			$styles[] = 'border-right: 1px solid #e5e5e5';
		}

		return implode( ';', $styles);
	}
}