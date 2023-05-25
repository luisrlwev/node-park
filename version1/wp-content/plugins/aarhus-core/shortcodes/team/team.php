<?php
namespace AarhusCore\CPT\Shortcodes\Team;

use AarhusCore\lib;

class Team implements lib\ShortcodeInterface {
	private $base;

	public function __construct() {
		$this->base = 'qodef_team';

		add_action('vc_before_init', array($this, 'vcMap'));
	}
	
	public function getBase() {
		return $this->base;
	}
	
	public function vcMap() {
		$team_social_links_array = array();

		for ( $x = 1; $x < 6; $x ++ ) {
			$team_social_links_array[] = array(
				'type'       => 'textfield',
				'heading'    => esc_html__( 'Social Link ', 'aarhus-core' ) . $x,
				'param_name' => 'team_social_' . $x . '_link',
				'save_always' => true
			);

			$team_social_links_array[] = array(
				'type'       => 'textfield',
				'heading'    => esc_html__( 'Social Link ', 'aarhus-core' ) . $x . esc_html__( ' Text', 'aarhus-core' ),
				'param_name' => 'team_social_link_' . $x . '_text',
				'save_always' => true
			);

			$team_social_links_array[] = array(
				'type'       => 'dropdown',
				'heading'    => esc_html__( 'Social Link ', 'aarhus-core' ) . $x . esc_html__( ' Target', 'aarhus-core' ),
				'param_name' => 'team_social_link_' . $x . '_target',
				'value'      => array(
					esc_html__( 'Same Window', 'aarhus-core' ) => '_self',
					esc_html__( 'New Window', 'aarhus-core' )  => '_blank'
				),
				'dependency' => Array( 'element' => 'team_social_' . $x . '_link', 'not_empty' => true ),
				'save_always' => true
			);
		}
		
		if ( function_exists( 'vc_map' ) ) {
			vc_map(
				array(
					'name'                      => esc_html__( 'Team', 'aarhus-core' ),
					'base'                      => $this->base,
					'category'                  => esc_html__( 'by AARHUS', 'aarhus-core' ),
					'icon'                      => 'icon-wpb-team extended-custom-icon',
					'allowed_container_element' => 'vc_row',
					'params'                    => array_merge(
						array(
							array(
								'type'        => 'dropdown',
								'param_name'  => 'type',
								'heading'     => esc_html__( 'Type', 'aarhus-core' ),
								'value'       => array(
									esc_html__( 'Info Below Image', 'aarhus-core' )    => 'info-below-image',
									esc_html__( 'Info On Image Hover', 'aarhus-core' ) => 'info-on-image'
								),
								'save_always' => true
							),
							array(
								'type'       => 'attach_image',
								'param_name' => 'team_image',
								'heading'    => esc_html__( 'Image', 'aarhus-core' )
							),
							array(
								'type'       => 'textfield',
								'param_name' => 'team_name',
								'heading'    => esc_html__( 'Name', 'aarhus-core' )
							),
							array(
								'type'        => 'dropdown',
								'param_name'  => 'team_name_tag',
								'heading'     => esc_html__( 'Name Tag', 'aarhus-core' ),
								'value'       => array_flip( aarhus_select_get_title_tag( true ) ),
								'save_always' => true,
								'dependency'  => array( 'element' => 'team_name', 'not_empty' => true )
							),
							array(
								'type'       => 'colorpicker',
								'param_name' => 'team_name_color',
								'heading'    => esc_html__( 'Name Color', 'aarhus-core' ),
								'dependency' => array( 'element' => 'team_name', 'not_empty' => true )
							),
							array(
								'type'       => 'textfield',
								'param_name' => 'team_position',
								'heading'    => esc_html__( 'Position', 'aarhus-core' )
							),
							array(
								'type'       => 'colorpicker',
								'param_name' => 'team_position_color',
								'heading'    => esc_html__( 'Position Color', 'aarhus-core' ),
								'dependency' => array( 'element' => 'team_position', 'not_empty' => true )
							),
							array(
								'type'       => 'textfield',
								'param_name' => 'team_text',
								'heading'    => esc_html__( 'Text', 'aarhus-core' )
							),
							array(
								'type'       => 'colorpicker',
								'param_name' => 'team_text_color',
								'heading'    => esc_html__( 'Text Color', 'aarhus-core' ),
								'dependency' => array( 'element' => 'team_text', 'not_empty' => true )
							),
						),
						$team_social_links_array
					)
				)
			);
		}
	}
	
	public function render( $atts, $content = null ) {
		$args = array(
			'type'                  => 'info-below-image',
			'team_image'            => '',
			'team_name'             => '',
			'team_name_tag'         => 'h4',
			'team_name_color'       => '',
			'team_position'         => '',
			'team_position_color'   => '',
			'team_text'             => '',
			'team_text_color'       => ''
		);
		
		$team_social_links_form_fields = array();
		$number_of_social_links        = 5;
		
		for ( $x = 1; $x <= $number_of_social_links; $x ++ ) {

			$team_social_links_form_fields[ 'team_social_' . $x . '_link' ]   = '';
			$team_social_links_form_fields[ 'team_social_link_' . $x . '_target' ] = '';
			$team_social_links_form_fields[ 'team_social_link_' . $x . '_text' ] = '';
		}

		$args = array_merge( $args, $team_social_links_form_fields );
		
		$params = shortcode_atts( $args, $atts );
		
		$params['number_of_social_links'] = 5;
		
		$params['type']                 = ! empty( $params['type'] ) ? $params['type'] : $args['type'];
		$params['holder_classes']       = $this->getHolderClasses( $params );
		$params['team_name_tag']        = ! empty( $params['team_name_tag'] ) ? $params['team_name_tag'] : $args['team_name_tag'];
		$params['team_social_links']    = $this->getTeamSocialLinks( $params );
		$params['team_name_styles']     = $this->getTeamNameStyles( $params );
		$params['team_position_styles'] = $this->getTeamPositionStyles( $params );
		$params['team_text_styles']     = $this->getTeamTextStyles( $params );
		
		//Get HTML from template based on type of team
		$html = aarhus_core_get_shortcode_module_template_part( 'templates/' . $params['type'], 'team', '', $params );
		
		return $html;
	}
	
	private function getHolderClasses( $params ) {
		$holderClasses = array();
		
		$holderClasses[] = ! empty( $params['type'] ) ? 'qodef-team-' . $params['type'] : '';
		
		return implode( ' ', $holderClasses );
	}
	
	private function getTeamSocialLinks( $params ) {
		extract( $params );
		$social_links = array();

		for ( $i = 1; $i <= $params['number_of_social_links']; $i ++ ) {

			$team_social_link   	 = ${'team_social_' . $i . '_link'};
			$team_social_link_target = ${'team_social_link_' . $i . '_target'};
			$team_social_link_text   = ${'team_social_link_' . $i . '_text'};

			if ( $team_social_link !== '' ) {

				$team_links_params           = array();
				$team_links_params['link']   = ( $team_social_link !== '' ) ? $team_social_link : '';
				$team_links_params['target'] = ( $team_social_link_target !== '' ) ? $team_social_link_target : '';
				$team_links_params['text']	 = ( $team_social_link_text !== '' ) ? $team_social_link_text : '';

				$social_links[] = $team_links_params;
			}
		}

		return $social_links;
	}
	
	private function getTeamNameStyles( $params ) {
		$styles = array();
		
		if ( ! empty( $params['team_name_color'] ) ) {
			$styles[] = 'color: ' . $params['team_name_color'];
		}
		
		return implode( ';', $styles );
	}
	
	private function getTeamPositionStyles( $params ) {
		$styles = array();
		
		if ( ! empty( $params['team_position_color'] ) ) {
			$styles[] = 'color: ' . $params['team_position_color'];
		}
		
		return implode( ';', $styles );
	}
	
	private function getTeamTextStyles( $params ) {
		$styles = array();
		
		if ( ! empty( $params['team_text_color'] ) ) {
			$styles[] = 'color: ' . $params['team_text_color'];
		}
		
		return implode( ';', $styles );
	}
}