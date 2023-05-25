<?php

class AarhusSelectClassSeparatorWidget extends AarhusSelectClassWidget {
	public function __construct() {
		parent::__construct(
			'qodef_separator_widget',
			esc_html__( 'Aarhus Separator Widget', 'aarhus' ),
			array( 'description' => esc_html__( 'Add a separator element to your widget areas', 'aarhus' ) )
		);
		
		$this->setParams();
	}
	
	protected function setParams() {
		$this->params = array(
			array(
				'type'    => 'dropdown',
				'name'    => 'type',
				'title'   => esc_html__( 'Type', 'aarhus' ),
				'options' => array(
					'normal'     => esc_html__( 'Normal', 'aarhus' ),
					'full-width' => esc_html__( 'Full Width', 'aarhus' )
				)
			),
			array(
				'type'    => 'dropdown',
				'name'    => 'position',
				'title'   => esc_html__( 'Position', 'aarhus' ),
				'options' => array(
					'center' => esc_html__( 'Center', 'aarhus' ),
					'left'   => esc_html__( 'Left', 'aarhus' ),
					'right'  => esc_html__( 'Right', 'aarhus' )
				)
			),
			array(
				'type'    => 'dropdown',
				'name'    => 'border_style',
				'title'   => esc_html__( 'Style', 'aarhus' ),
				'options' => array(
					'solid'  => esc_html__( 'Solid', 'aarhus' ),
					'dashed' => esc_html__( 'Dashed', 'aarhus' ),
					'dotted' => esc_html__( 'Dotted', 'aarhus' )
				)
			),
			array(
				'type'  => 'colorpicker',
				'name'  => 'color',
				'title' => esc_html__( 'Color', 'aarhus' )
			),
			array(
				'type'  => 'textfield',
				'name'  => 'width',
				'title' => esc_html__( 'Width (px or %)', 'aarhus' )
			),
			array(
				'type'  => 'textfield',
				'name'  => 'thickness',
				'title' => esc_html__( 'Thickness (px)', 'aarhus' )
			),
			array(
				'type'  => 'textfield',
				'name'  => 'top_margin',
				'title' => esc_html__( 'Top Margin (px or %)', 'aarhus' )
			),
			array(
				'type'  => 'textfield',
				'name'  => 'bottom_margin',
				'title' => esc_html__( 'Bottom Margin (px or %)', 'aarhus' )
			)
		);
	}
	
	public function widget( $args, $instance ) {
		if ( ! is_array( $instance ) ) {
			$instance = array();
		}
		
		//prepare variables
		$params = '';
		
		//is instance empty?
		if ( is_array( $instance ) && count( $instance ) ) {
			//generate shortcode params
			foreach ( $instance as $key => $value ) {
				$params .= " $key='$value' ";
			}
		}
		
		echo '<div class="widget qodef-separator-widget">';
			echo do_shortcode( "[qodef_separator $params]" ); // XSS OK
		echo '</div>';
	}
}