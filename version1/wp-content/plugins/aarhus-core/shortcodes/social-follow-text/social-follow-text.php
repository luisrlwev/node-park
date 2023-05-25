<?php
namespace AarhusCore\CPT\Shortcodes\SocialFollowText;

use AarhusCore\Lib;

class SocialFollowText implements Lib\ShortcodeInterface {
	private $base;
	
	function __construct() {
		$this->base = 'qodef_social_follow_text';
		
		add_action( 'vc_before_init', array( $this, 'vcMap' ) );
	}
	
	public function getBase() {
		return $this->base;
	}
	
	public function vcMap() {

        $social_profiles_array = array();

        for ( $n = 1; $n < 6; $n ++ ) {

            $social_profiles_array[] = array(
                    'type'    => 'textfield',
                    'param_name'    => 'text_' . $n,
                    'heading'    => esc_html__( 'Link Title', 'aarhus-core' ). $n
            );

            $social_profiles_array[] = array(
                    'type'  => 'textfield',
                    'param_name'  => 'link_' . $n,
                    'heading'    => esc_html__( 'Link ', 'aarhus-core' ). $n
            );

            $social_profiles_array[] = array(
                    'type'    => 'dropdown',
                    'param_name'    => 'target_' . $n,
                    'heading'   => esc_html__( 'Link Target ', 'aarhus-core' ). $n,
                    'value'      => array_flip( aarhus_select_get_link_target_array() ),
            );
        }

		if ( function_exists( 'vc_map' ) ) {
			vc_map(
				array(
					'name'     => esc_html__( 'Social Follow Text Links', 'aarhus-core' ),
					'base'     => $this->base,
					'icon'     => 'icon-wpb-icon-list-item extended-custom-icon',
					'category' => esc_html__( 'by AARHUS', 'aarhus-core' ),
					'params'   => array_merge(
						array(
							array(
								'type'        => 'textfield',
								'param_name'  => 'custom_class',
								'heading'     => esc_html__( 'Custom CSS Class', 'aarhus-core' ),
								'description' => esc_html__( 'Style particular content element differently - add a class name and refer to it in custom CSS', 'aarhus-core' )
							),
							array(

                                'type'          => 'dropdown',
								'param_name' => 'display_line',
								'heading'    => esc_html__( 'Display line between elements', 'aarhus-core' ),
                                'value'       => array_flip( aarhus_select_get_yes_no_select_array( false ) ),
                                'save_always' => true
							),
							array(
								'type'       => 'textfield',
								'param_name' => 'title_size',
								'heading'    => esc_html__( 'Title Size (px)', 'aarhus-core' ),
							),
							array(
								'type'       => 'colorpicker',
								'param_name' => 'title_color',
								'heading'    => esc_html__( 'Title Color', 'aarhus-core' ),
							),
							array(
								'type'        => 'textfield',
								'param_name'  => 'title_padding',
								'heading'     => esc_html__( 'Title Left Padding (px)', 'aarhus-core' ),
								'description' => esc_html__( 'Set padding for your text element to adjust space between elements. Default value is 25', 'aarhus-core' ),
							),
						),
                        $social_profiles_array
					)
				)
			);
		}
	}
	
	public function render( $atts, $content = null ) {

	    $networks_args = array();

        for ( $n = 1; $n <= 6; $n ++ ) {
            $networks_args[ 'text_' . $n ]   = '';
            $networks_args[ 'link_' . $n ]   = '';
            $networks_args[ 'target_' . $n ]   = '_self';
        }

		$args   = array(
			'custom_class'  => '',
			'item_margin'   => '',
			'display_line'  => '',
			'title_color'   => '',
			'title_size'    => '',
			'title_padding' => ''
		);
		$args   = array_merge( $args, $networks_args );
		$params = shortcode_atts( $args, $atts );
		
		$params['holder_classes']           = $this->getHolderClasses( $params );
		$params['holder_styles']            = $this->getHolderStyles( $params );
		$params['title_styles']             = $this->getTitleStyles( $params );
		
		$html = aarhus_core_get_shortcode_module_template_part( 'templates/social-follow-text-template', 'social-follow-text', '', $params );
		
		return $html;
	}
	
	private function getHolderClasses( $params ) {
		$holderClasses = array();
		
		$holderClasses[] = ! empty( $params['custom_class'] ) ? esc_attr( $params['custom_class'] ) : '';

        $holderClasses[] = ( $params['display_line'] == 'yes' ) ? 'qodef-sf-display-line' : '';
		
		return implode( ' ', $holderClasses );
	}
	
	private function getHolderStyles( $params ) {
		$styles = array();
		
		if ( $params['item_margin'] !== '' ) {
			$styles[] = 'margin-bottom: ' . aarhus_select_filter_px( $params['item_margin'] ) . 'px';
		}
		
		return implode( ';', $styles );
	}
	
	private function getTitleStyles( $params ) {
		$styles = array();
		
		if ( ! empty( $params['title_color'] ) ) {
			$styles[] = 'color: ' . $params['title_color'];
		}
		
		if ( ! empty( $params['title_size'] ) ) {
			$styles[] = 'font-size: ' . aarhus_select_filter_px( $params['title_size'] ) . 'px';
		}
		
		if ( $params['title_padding'] !== '' ) {
			$styles[] = 'padding-right: ' . aarhus_select_filter_px( $params['title_padding'] ) . 'px';
		}
		
		return implode( ';', $styles );
	}
}