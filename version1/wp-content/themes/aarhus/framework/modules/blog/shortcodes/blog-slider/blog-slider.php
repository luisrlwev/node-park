<?php
namespace AarhusCore\CPT\Shortcodes\BlogSlider;

use AarhusCore\Lib;

class BlogSlider implements Lib\ShortcodeInterface {
    private $base;

    function __construct() {
        $this->base = 'qodef_blog_slider';

        add_action('vc_before_init', array($this,'vcMap'));

        //Category filter
        add_filter( 'vc_autocomplete_qodef_blog_slider_category_callback', array( &$this, 'blogListCategoryAutocompleteSuggester', ), 10, 1 ); // Get suggestion(find). Must return an array

        //Category render
        add_filter( 'vc_autocomplete_qodef_blog_slider_category_render', array( &$this, 'blogListCategoryAutocompleteRender', ), 10, 1 ); // Get suggestion(find). Must return an array
    }

    public function getBase() {
        return $this->base;
    }
	
	public function vcMap() {
		vc_map(
			array(
				'name'                      => esc_html__( 'Blog Slider', 'aarhus' ),
				'base'                      => $this->base,
				'icon'                      => 'icon-wpb-blog-slider extended-custom-icon',
				'category'                  => esc_html__( 'by AARHUS', 'aarhus' ),
				'allowed_container_element' => 'vc_row',
				'params'                    => array(
					array(
						'type'        => 'dropdown',
						'param_name'  => 'slider_type',
						'heading'     => esc_html__( 'Type', 'aarhus' ),
						'value'       => array(
							esc_html__( 'Slider', 'aarhus' )            => 'slider',
							esc_html__( 'Carousel', 'aarhus' )          => 'carousel',
							esc_html__( 'Carousel Centered', 'aarhus' ) => 'carousel-centered'
						),
						'save_always' => true
					),
					array(
						'type'       => 'textfield',
						'param_name' => 'number_of_posts',
						'heading'    => esc_html__( 'Number of Posts', 'aarhus' )
					),
					array(
						'type'        => 'dropdown',
						'param_name'  => 'orderby',
						'heading'     => esc_html__( 'Order By', 'aarhus' ),
						'value'       => array_flip( aarhus_select_get_query_order_by_array() ),
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
						'type'        => 'autocomplete',
						'param_name'  => 'category',
						'heading'     => esc_html__( 'Category', 'aarhus' ),
						'description' => esc_html__( 'Enter one category slug (leave empty for showing all categories)', 'aarhus' )
					),
					array(
						'type'       => 'dropdown',
						'param_name' => 'image_size',
						'heading'    => esc_html__( 'Image Size', 'aarhus' ),
						'value'      => array(
							esc_html__( 'Original', 'aarhus' )  => 'full',
							esc_html__( 'Square', 'aarhus' )    => 'aarhus_select_image_square',
							esc_html__( 'Landscape', 'aarhus' ) => 'aarhus_select_image_landscape',
							esc_html__( 'Portrait', 'aarhus' )  => 'aarhus_select_image_portrait',
							esc_html__( 'Thumbnail', 'aarhus' ) => 'thumbnail',
							esc_html__( 'Medium', 'aarhus' )    => 'medium',
							esc_html__( 'Large', 'aarhus' )     => 'large'
						),
						'save_always' => true
					),
					array(
						'type'        => 'dropdown',
						'param_name'  => 'title_tag',
						'heading'     => esc_html__( 'Title Tag', 'aarhus' ),
						'value'       => array_flip( aarhus_select_get_title_tag( true ) ),
						'group'       => esc_html__( 'Post Info', 'aarhus' )
					),
					array(
						'type'        => 'dropdown',
						'param_name'  => 'title_transform',
						'heading'     => esc_html__( 'Title Text Transform', 'aarhus' ),
						'value'       => array_flip( aarhus_select_get_text_transform_array( true ) ),
						'group'       => esc_html__( 'Post Info', 'aarhus' )
					),
					array(
						'type'        => 'dropdown',
						'param_name'  => 'post_info_author',
						'heading'     => esc_html__( 'Enable Post Info Author', 'aarhus' ),
						'value'       => array_flip( aarhus_select_get_yes_no_select_array( false, true ) ),
						'save_always' => true,
						'group'       => esc_html__( 'Post Info', 'aarhus' )
					),
					array(
						'type'        => 'dropdown',
						'param_name'  => 'post_info_date',
						'heading'     => esc_html__( 'Enable Post Info Date', 'aarhus' ),
						'value'       => array_flip( aarhus_select_get_yes_no_select_array( false, true ) ),
						'save_always' => true,
						'group'       => esc_html__( 'Post Info', 'aarhus' )
					),
					array(
						'type'        => 'dropdown',
						'param_name'  => 'post_info_category',
						'heading'     => esc_html__( 'Enable Post Info Category', 'aarhus' ),
						'value'       => array_flip( aarhus_select_get_yes_no_select_array( false, true ) ),
						'save_always' => true,
						'group'       => esc_html__( 'Post Info', 'aarhus' )
					),
					array(
						'type'        => 'dropdown',
						'param_name'  => 'post_info_comments',
						'heading'     => esc_html__( 'Enable Post Info Comments', 'aarhus' ),
						'value'       => array_flip( aarhus_select_get_yes_no_select_array( false ) ),
						'save_always' => true,
						'group'       => esc_html__( 'Post Info', 'aarhus' )
					)
				)
			)
		);
	}
	
	public function render( $atts, $content = null ) {
		$default_atts = array(
			'slider_type'        => 'slider',
			'number_of_posts'    => '-1',
			'orderby'            => 'title',
			'order'              => 'ASC',
			'category'           => '',
			'image_size'         => 'full',
			'title_tag'          => 'h2',
			'title_transform'    => '',
			'post_info_author'   => '',
			'post_info_date'     => '',
			'post_info_category' => '',
			'post_info_comments' => ''
		);
		$params = shortcode_atts( $default_atts, $atts );
		
		$queryArray             = $this->generateBlogQueryArray( $params );
		$query_result           = new \WP_Query( $queryArray );
		$params['query_result'] = $query_result;
		
		$params['slider_type']    = ! empty( $params['slider_type'] ) ? $params['slider_type'] : $default_atts['slider_type'];
		$params['slider_classes'] = $this->getSliderClasses( $params );
		$params['slider_data']    = $this->getSliderData( $params );
		
		ob_start();
		
		aarhus_select_get_module_template_part( 'shortcodes/blog-slider/holder', 'blog', '', $params );
		
		$html = ob_get_contents();
		
		ob_end_clean();
		
		return $html;
	}
	
	public function generateBlogQueryArray( $params ) {
		$queryArray = array(
			'post_status'    => 'publish',
			'post_type'      => 'post',
			'orderby'        => $params['orderby'],
			'order'          => $params['order'],
			'posts_per_page' => $params['number_of_posts'],
			'post__not_in'   => get_option( 'sticky_posts' )
		);
		
		if ( ! empty( $params['category'] ) ) {
			$queryArray['category_name'] = $params['category'];
		}
		
		return $queryArray;
	}
	
	public function getSliderClasses( $params ) {
		$holderClasses = array();
		
		$holderClasses[] = 'qodef-bs-' . $params['slider_type'];
		
		return implode( ' ', $holderClasses );
	}
	
	private function getSliderData( $params ) {
		$type        = $params['slider_type'];
		$slider_data = array();
		
		if($type == 'carousel') {
			$slider_data['data-number-of-items']   = '2';
			$slider_data['data-slider-margin']     = '80';
			$slider_data['data-slider-padding']    = 'yes';
			$slider_data['data-enable-navigation'] = 'no';
		} else if ($type == 'carousel-centered') {
			$slider_data['data-number-of-items']   = '2';
			$slider_data['data-slider-margin']     = '30';
			$slider_data['data-enable-center']     = 'yes';
			$slider_data['data-enable-navigation'] = 'yes';
			$slider_data['data-enable-pagination'] = 'yes';
		} else {
			$slider_data['data-number-of-items']   = '1';
			$slider_data['data-enable-pagination'] = 'yes';
		}
		
		return $slider_data;
	}

    /**
     * Filter categories
     *
     * @param $query
     *
     * @return array
     */
    public function blogListCategoryAutocompleteSuggester( $query ) {
        global $wpdb;
        $post_meta_infos = $wpdb->get_results( $wpdb->prepare( "SELECT a.slug AS slug, a.name AS category_title
					FROM {$wpdb->terms} AS a
					LEFT JOIN ( SELECT term_id, taxonomy  FROM {$wpdb->term_taxonomy} ) AS b ON b.term_id = a.term_id
					WHERE b.taxonomy = 'category' AND a.name LIKE '%%%s%%'", stripslashes( $query ) ), ARRAY_A );

        $results = array();
        if ( is_array( $post_meta_infos ) && ! empty( $post_meta_infos ) ) {
            foreach ( $post_meta_infos as $value ) {
                $data          = array();
                $data['value'] = $value['slug'];
                $data['label'] = ( ( strlen( $value['category_title'] ) > 0 ) ? esc_html__( 'Category', 'aarhus' ) . ': ' . $value['category_title'] : '' );
                $results[]     = $data;
            }
        }

        return $results;
    }

    /**
     * Find categories by slug
     * @since 4.4
     *
     * @param $query
     *
     * @return bool|array
     */
    public function blogListCategoryAutocompleteRender( $query ) {
        $query = trim( $query['value'] ); // get value from requested
        if ( ! empty( $query ) ) {
            // get category
            $category = get_term_by( 'slug', $query, 'category' );
            if ( is_object( $category ) ) {

                $category_slug = $category->slug;
                $category_title = $category->name;

                $category_title_display = '';
                if ( ! empty( $category_title ) ) {
                    $category_title_display = esc_html__( 'Category', 'aarhus' ) . ': ' . $category_title;
                }

                $data          = array();
                $data['value'] = $category_slug;
                $data['label'] = $category_title_display;

                return ! empty( $data ) ? $data : false;
            }

            return false;
        }

        return false;
    }
}