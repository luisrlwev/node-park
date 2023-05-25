<?php

class AarhusSelectClassButtonWidget extends AarhusSelectClassWidget {
	public function __construct() {
		parent::__construct(
			'qodef_button_widget',
			esc_html__( 'Aarhus Button Widget', 'aarhus' ),
			array( 'description' => esc_html__( 'Add button element to widget areas', 'aarhus' ) )
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
					'solid'   => esc_html__( 'Solid', 'aarhus' ),
					'outline' => esc_html__( 'Outline', 'aarhus' ),
					'simple'  => esc_html__( 'Simple', 'aarhus' )
				)
			),
			array(
				'type'        => 'dropdown',
				'name'        => 'size',
				'title'       => esc_html__( 'Size', 'aarhus' ),
				'options'     => array(
					'small'  => esc_html__( 'Small', 'aarhus' ),
					'medium' => esc_html__( 'Medium', 'aarhus' ),
					'large'  => esc_html__( 'Large', 'aarhus' ),
					'huge'   => esc_html__( 'Huge', 'aarhus' )
				),
				'description' => esc_html__( 'This option is only available for solid and outline button type', 'aarhus' )
			),
			array(
				'type'    => 'textfield',
				'name'    => 'text',
				'title'   => esc_html__( 'Text', 'aarhus' ),
				'default' => esc_html__( 'Button Text', 'aarhus' )
			),
			array(
				'type'  => 'textfield',
				'name'  => 'link',
				'title' => esc_html__( 'Link', 'aarhus' )
			),
			array(
				'type'    => 'dropdown',
				'name'    => 'target',
				'title'   => esc_html__( 'Link Target', 'aarhus' ),
				'options' => aarhus_select_get_link_target_array()
			),
			array(
				'type'  => 'colorpicker',
				'name'  => 'color',
				'title' => esc_html__( 'Color', 'aarhus' )
			),
			array(
				'type'  => 'colorpicker',
				'name'  => 'hover_color',
				'title' => esc_html__( 'Hover Color', 'aarhus' )
			),
			array(
				'type'        => 'colorpicker',
				'name'        => 'background_color',
				'title'       => esc_html__( 'Background Color', 'aarhus' ),
				'description' => esc_html__( 'This option is only available for solid button type', 'aarhus' )
			),
			array(
				'type'        => 'colorpicker',
				'name'        => 'hover_background_color',
				'title'       => esc_html__( 'Hover Background Color', 'aarhus' ),
				'description' => esc_html__( 'This option is only available for solid button type', 'aarhus' )
			),
			array(
				'type'        => 'colorpicker',
				'name'        => 'border_color',
				'title'       => esc_html__( 'Border Color', 'aarhus' ),
				'description' => esc_html__( 'This option is only available for solid and outline button type', 'aarhus' )
			),
			array(
				'type'        => 'colorpicker',
				'name'        => 'hover_border_color',
				'title'       => esc_html__( 'Hover Border Color', 'aarhus' ),
				'description' => esc_html__( 'This option is only available for solid and outline button type', 'aarhus' )
			),
			array(
				'type'        => 'textfield',
				'name'        => 'margin',
				'title'       => esc_html__( 'Margin', 'aarhus' ),
				'description' => esc_html__( 'Insert margin in format: top right bottom left (e.g. 10px 5px 10px 5px)', 'aarhus' )
			)
		);
	}
	
	public function widget( $args, $instance ) {
		$params = '';
		
		if ( ! is_array( $instance ) ) {
			$instance = array();
		}
		
		// Filter out all empty params
		$instance = array_filter( $instance, function ( $array_value ) {
			return trim( $array_value ) != '';
		} );
		
		// Default values
		if ( ! isset( $instance['text'] ) ) {
			$instance['text'] = 'Button Text';
		}
		
		// Generate shortcode params
		foreach ( $instance as $key => $value ) {
			$params .= " $key='$value' ";
		}
		
		echo '<div class="widget qodef-button-widget">';
			echo do_shortcode( "[qodef_button $params]" ); // XSS OK
		echo '</div>';
	}
}