<?php

namespace AarhusCore\CPT\Shortcodes\ProductList;

use AarhusCore\Lib;

class ProductList implements Lib\ShortcodeInterface {
	private $base;
	
	function __construct() {
		$this->base = 'qodef_product_list';
		
		add_action( 'vc_before_init', array( $this, 'vcMap' ) );
	}
	
	public function getBase() {
		return $this->base;
	}
	
	public function vcMap() {
		if ( function_exists( 'vc_map' ) ) {
			vc_map(
				array(
					'name'                      => esc_html__( 'Product List', 'aarhus' ),
					'base'                      => $this->base,
					'icon'                      => 'icon-wpb-product-list extended-custom-icon',
					'category'                  => esc_html__( 'by AARHUS', 'aarhus' ),
					'allowed_container_element' => 'vc_row',
					'params'                    => array(
						array(
							'type'        => 'dropdown',
							'param_name'  => 'type',
							'heading'     => esc_html__( 'Type', 'aarhus' ),
							'value'       => array(
								esc_html__( 'Standard', 'aarhus' ) => 'standard',
								esc_html__( 'Masonry', 'aarhus' )  => 'masonry'
							),
							'admin_label' => true
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'info_position',
							'heading'     => esc_html__( 'Product Info Position', 'aarhus' ),
							'value'       => array(
								esc_html__( 'Info On Image Hover', 'aarhus' ) => 'info-on-image',
								esc_html__( 'Info Below Image', 'aarhus' )    => 'info-below-image'
							),
							'save_always' => true
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'number_of_posts',
							'heading'    => esc_html__( 'Number of Products', 'aarhus' )
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'number_of_columns',
							'heading'     => esc_html__( 'Number of Columns', 'aarhus' ),
							'value'       => array_flip( aarhus_select_get_number_of_columns_array( true ) ),
							'save_always' => true
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'space_between_items',
							'heading'     => esc_html__( 'Space Between Items', 'aarhus' ),
							'value'       => array_flip( aarhus_select_get_space_between_items_array() ),
							'save_always' => true
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'orderby',
							'heading'     => esc_html__( 'Order By', 'aarhus' ),
							'value'       => array_flip( aarhus_select_get_query_order_by_array( false, array( 'on-sale' => esc_html__( 'On Sale', 'aarhus' ) ) ) ),
							'save_always' => true
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'order',
							'heading'     => esc_html__( 'Order', 'aarhus' ),
							'value'       => array_flip( aarhus_select_get_query_order_array() ),
							'save_always' => true
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'taxonomy_to_display',
							'heading'     => esc_html__( 'Choose Sorting Taxonomy', 'aarhus' ),
							'value'       => array(
								esc_html__( 'Category', 'aarhus' ) => 'category',
								esc_html__( 'Tag', 'aarhus' )      => 'tag',
								esc_html__( 'Id', 'aarhus' )       => 'id'
							),
							'save_always' => true,
							'description' => esc_html__( 'If you would like to display only certain products, this is where you can select the criteria by which you would like to choose which products to display', 'aarhus' )
						),
						array(
							'type'        => 'textfield',
							'param_name'  => 'taxonomy_values',
							'heading'     => esc_html__( 'Enter Taxonomy Values', 'aarhus' ),
							'description' => esc_html__( 'Separate values (category slugs, tags, or post IDs) with a comma', 'aarhus' )
						),
						array(
							'type'       => 'dropdown',
							'param_name' => 'image_size',
							'heading'    => esc_html__( 'Image Proportions', 'aarhus' ),
							'value'      => array(
								esc_html__( 'Default', 'aarhus' )        => '',
								esc_html__( 'Original', 'aarhus' )       => 'full',
								esc_html__( 'Square', 'aarhus' )         => 'square',
								esc_html__( 'Landscape', 'aarhus' )      => 'landscape',
								esc_html__( 'Portrait', 'aarhus' )       => 'portrait',
								esc_html__( 'Medium', 'aarhus' )         => 'medium',
								esc_html__( 'Large', 'aarhus' )          => 'large',
								esc_html__( 'Shop Single', 'aarhus' )    => 'woocommerce_single',
								esc_html__( 'Shop Thumbnail', 'aarhus' ) => 'woocommerce_thumbnail'
							),
							'save_always' => true
						),
						array(
							'type'       => 'dropdown',
							'param_name' => 'display_title',
							'heading'    => esc_html__( 'Display Title', 'aarhus' ),
							'value'      => array_flip( aarhus_select_get_yes_no_select_array( false, true ) ),
							'group'      => esc_html__( 'Product Info', 'aarhus' )
						),
						array(
							'type'       => 'dropdown',
							'param_name' => 'product_info_skin',
							'heading'    => esc_html__( 'Product Info Skin', 'aarhus' ),
							'value'      => array(
								esc_html__( 'Default', 'aarhus' ) => 'default',
								esc_html__( 'Light', 'aarhus' )   => 'light',
								esc_html__( 'Dark', 'aarhus' )    => 'dark'
							),
							'dependency' => array( 'element' => 'info_position', 'value' => array( 'info-on-image' ) ),
							'group'      => esc_html__( 'Product Info Style', 'aarhus' )
						),
						array(
							'type'       => 'dropdown',
							'param_name' => 'title_tag',
							'heading'    => esc_html__( 'Title Tag', 'aarhus' ),
							'value'      => array_flip( aarhus_select_get_title_tag( true ) ),
							'dependency' => array( 'element' => 'display_title', 'value' => array( 'yes' ) ),
							'group'      => esc_html__( 'Product Info Style', 'aarhus' )
						),
						array(
							'type'       => 'dropdown',
							'param_name' => 'title_transform',
							'heading'    => esc_html__( 'Title Text Transform', 'aarhus' ),
							'value'      => array_flip( aarhus_select_get_text_transform_array( true ) ),
							'dependency' => array( 'element' => 'display_title', 'value' => array( 'yes' ) ),
							'group'      => esc_html__( 'Product Info Style', 'aarhus' )
						),
						array(
							'type'       => 'dropdown',
							'param_name' => 'display_category',
							'heading'    => esc_html__( 'Display Category', 'aarhus' ),
							'value'      => array_flip( aarhus_select_get_yes_no_select_array( false ) ),
							'group'      => esc_html__( 'Product Info', 'aarhus' )
						),
						array(
							'type'       => 'dropdown',
							'param_name' => 'display_excerpt',
							'heading'    => esc_html__( 'Display Excerpt', 'aarhus' ),
							'value'      => array_flip( aarhus_select_get_yes_no_select_array( false ) ),
							'group'      => esc_html__( 'Product Info', 'aarhus' )
						),
						array(
							'type'        => 'textfield',
							'param_name'  => 'excerpt_length',
							'heading'     => esc_html__( 'Excerpt Length', 'aarhus' ),
							'description' => esc_html__( 'Number of characters', 'aarhus' ),
							'dependency'  => array( 'element' => 'display_excerpt', 'value' => array( 'yes' ) ),
							'group'       => esc_html__( 'Product Info Style', 'aarhus' )
						),
						array(
							'type'       => 'dropdown',
							'param_name' => 'display_rating',
							'heading'    => esc_html__( 'Display Rating', 'aarhus' ),
							'value'      => array_flip( aarhus_select_get_yes_no_select_array( false, true ) ),
							'group'      => esc_html__( 'Product Info', 'aarhus' )
						),
						array(
							'type'       => 'dropdown',
							'param_name' => 'display_price',
							'heading'    => esc_html__( 'Display Price', 'aarhus' ),
							'value'      => array_flip( aarhus_select_get_yes_no_select_array( false, true ) ),
							'group'      => esc_html__( 'Product Info', 'aarhus' )
						),
						array(
							'type'       => 'dropdown',
							'param_name' => 'display_button',
							'heading'    => esc_html__( 'Display Button', 'aarhus' ),
							'value'      => array_flip( aarhus_select_get_yes_no_select_array( false, true ) ),
							'group'      => esc_html__( 'Product Info', 'aarhus' )
						),
						array(
							'type'       => 'dropdown',
							'param_name' => 'button_skin',
							'heading'    => esc_html__( 'Button Skin', 'aarhus' ),
							'value'      => array(
								esc_html__( 'Default', 'aarhus' ) => 'default',
								esc_html__( 'Light', 'aarhus' )   => 'light',
								esc_html__( 'Dark', 'aarhus' )    => 'dark'
							),
							'dependency' => array( 'element' => 'display_button', 'value' => array( 'yes' ) ),
							'group'      => esc_html__( 'Product Info Style', 'aarhus' )
						),
						array(
							'type'       => 'colorpicker',
							'param_name' => 'shader_background_color',
							'heading'    => esc_html__( 'Shader Background Color', 'aarhus' ),
							'group'      => esc_html__( 'Product Info Style', 'aarhus' )
						),
						array(
							'type'       => 'dropdown',
							'param_name' => 'info_bottom_text_align',
							'heading'    => esc_html__( 'Product Info Text Alignment', 'aarhus' ),
							'value'      => array(
								esc_html__( 'Default', 'aarhus' ) => '',
								esc_html__( 'Left', 'aarhus' )    => 'left',
								esc_html__( 'Center', 'aarhus' )  => 'center',
								esc_html__( 'Right', 'aarhus' )   => 'right'
							),
							'dependency' => array( 'element' => 'info_position', 'value'   => array( 'info-below-image' ) ),
							'group'      => esc_html__( 'Product Info Style', 'aarhus' )
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'info_bottom_margin',
							'heading'    => esc_html__( 'Product Info Bottom Margin (px)', 'aarhus' ),
							'dependency' => array( 'element' => 'info_position', 'value'   => array( 'info-below-image' ) ),
							'group'      => esc_html__( 'Product Info Style', 'aarhus' )
						)
					)
				)
			);
		}
	}
	
	public function render( $atts, $content = null ) {
		$default_atts = array(
			'type'                    => 'standard',
			'info_position'           => 'info-on-image',
			'number_of_posts'         => '8',
			'number_of_columns'       => 'four',
			'space_between_items'     => 'normal',
			'orderby'                 => 'date',
			'order'                   => 'ASC',
			'taxonomy_to_display'     => 'category',
			'taxonomy_values'         => '',
			'image_size'              => 'full',
			'display_title'           => 'yes',
			'product_info_skin'       => '',
			'title_tag'               => 'h3',
			'title_transform'         => '',
			'display_category'        => 'no',
			'display_excerpt'         => 'no',
			'excerpt_length'          => '20',
			'display_rating'          => 'yes',
			'display_price'           => 'yes',
			'display_button'          => 'yes',
			'button_skin'             => 'default',
			'shader_background_color' => '',
			'info_bottom_text_align'  => '',
			'info_bottom_margin'      => ''
		);
		$params       = shortcode_atts( $default_atts, $atts );
		
		$params['class_name']     = 'pli';
		$params['type']           = ! empty( $params['type'] ) ? $params['type'] : $default_atts['type'];
		$params['info_position']  = ! empty( $params['info_position'] ) ? $params['info_position'] : $default_atts['info_position'];
		$params['title_tag']      = ! empty( $params['title_tag'] ) ? $params['title_tag'] : $default_atts['title_tag'];
		
		$additional_params                   = array();
		$additional_params['holder_classes'] = $this->getHolderClasses( $params, $default_atts );
		
		$queryArray                        = $this->generateProductQueryArray( $params );
		$query_result                      = new \WP_Query( $queryArray );
		$additional_params['query_result'] = $query_result;
		
		$params['this_object'] = $this;
		
		$html = aarhus_select_get_woo_shortcode_module_template_part( 'templates/product-list', 'product-list', $params['type'], $params, $additional_params );
		
		return $html;
	}
	
	private function getHolderClasses( $params, $default_atts ) {
		$holderClasses   = array();
		$holderClasses[] = ! empty( $params['type'] ) ? 'qodef-' . $params['type'] . '-layout' : 'qodef-' . $default_atts['type'] . '-layout';
		$holderClasses[] = ! empty( $params['number_of_columns'] ) ? 'qodef-' . $params['number_of_columns'] . '-columns' : 'qodef-' . $default_atts['number_of_columns'] . '-columns';
		$holderClasses[] = ! empty( $params['space_between_items'] ) ? 'qodef-' . $params['space_between_items'] . '-space' : 'qodef-' . $default_atts['space_between_items'] . '-space';
		$holderClasses[] = ! empty( $params['info_position'] ) ? 'qodef-' . $params['info_position'] : 'qodef-' . $default_atts['info_position'];
		$holderClasses[] = ! empty( $params['product_info_skin'] ) ? 'qodef-product-info-' . $params['product_info_skin'] : '';
		
		return implode( ' ', $holderClasses );
	}
	
	private function generateProductQueryArray( $params ) {
		$queryArray = array(
			'post_status'         => 'publish',
			'post_type'           => 'product',
			'ignore_sticky_posts' => 1,
			'posts_per_page'      => $params['number_of_posts'],
			'orderby'             => $params['orderby'],
			'order'               => $params['order']
		);
		
		if ( $params['orderby'] === 'on-sale' ) {
			$queryArray['no_found_rows'] = 1;
			$queryArray['post__in']      = array_merge( array( 0 ), wc_get_product_ids_on_sale() );
		}
		
		if ( $params['taxonomy_to_display'] !== '' && $params['taxonomy_to_display'] === 'category' ) {
			$queryArray['product_cat'] = $params['taxonomy_values'];
		}
		
		if ( $params['taxonomy_to_display'] !== '' && $params['taxonomy_to_display'] === 'tag' ) {
			$queryArray['product_tag'] = $params['taxonomy_values'];
		}
		
		if ( $params['taxonomy_to_display'] !== '' && $params['taxonomy_to_display'] === 'id' ) {
			$idArray                = $params['taxonomy_values'];
			$ids                    = explode( ',', $idArray );
            $queryArray['orderby'] = 'post__in';
			$queryArray['post__in'] = $ids;
		}
		
		return $queryArray;
	}
	
	public function getItemClasses( $params ) {
		$itemClasses = array();
		
		$image_size_meta = get_post_meta( get_the_ID(), 'qodef_product_featured_image_size', true );
		
		if ( ! empty( $image_size_meta ) ) {
			$itemClasses[] = 'qodef-fixed-masonry-item qodef-masonry-size-' . $image_size_meta;
		}
		
		return implode( ' ', $itemClasses );
	}
	
	public function getTitleStyles( $params ) {
		$styles = array();
		
		if ( ! empty( $params['title_transform'] ) ) {
			$styles[] = 'text-transform: ' . $params['title_transform'];
		}
		
		return implode( ';', $styles );
	}
	
	public function getShaderStyles( $params ) {
		$styles = array();
		
		if ( ! empty( $params['shader_background_color'] ) ) {
			$styles[] = 'background-color: ' . $params['shader_background_color'];
		}
		
		return implode( ';', $styles );
	}
	
	public function getTextWrapperStyles( $params ) {
		$styles = array();
		
		if ( ! empty( $params['info_bottom_text_align'] ) ) {
			$styles[] = 'text-align: ' . $params['info_bottom_text_align'];
		}
		
		if ( $params['info_bottom_margin'] !== '' ) {
			$styles[] = 'margin-bottom: ' . aarhus_select_filter_px( $params['info_bottom_margin'] ) . 'px';
		}
		
		return implode( ';', $styles );
	}
}