<?php

if ( ! function_exists( 'aarhus_select_include_search_types_before_load' ) ) {
    /**
     * Load's all header types before load files by going through all folders that are placed directly in header types folder.
     * Functions from this files before-load are used to set all hooks and variables before global options map are init
     */
    function aarhus_select_include_search_types_before_load() {
        foreach ( glob( SELECT_FRAMEWORK_SEARCH_ROOT_DIR . '/types/*/before-load.php' ) as $module_load ) {
            include_once $module_load;
        }
    }

    add_action( 'aarhus_select_action_options_map', 'aarhus_select_include_search_types_before_load', 1 ); // 1 is set to just be before header option map init
}

if ( ! function_exists( 'aarhus_select_load_search' ) ) {
	function aarhus_select_load_search() {
		$search_type_meta = aarhus_select_options()->getOptionValue( 'search_type' );
		$search_type      = ! empty( $search_type_meta ) ? $search_type_meta : 'fullscreen';
		
		if ( aarhus_select_active_widget( false, false, 'qodef_search_opener' ) ) {
			include_once SELECT_FRAMEWORK_MODULES_ROOT_DIR . '/search/types/' . $search_type . '/' . $search_type . '.php';
		}
	}
	
	add_action( 'init', 'aarhus_select_load_search' );
}

if ( ! function_exists( 'aarhus_select_get_holder_params_search' ) ) {
	/**
	 * Function which return holder class and holder inner class for blog pages
	 */
	function aarhus_select_get_holder_params_search() {
		$params_list = array();
		
		$layout = aarhus_select_options()->getOptionValue( 'search_page_layout' );
		if ( $layout == 'in-grid' ) {
			$params_list['holder'] = 'qodef-container';
			$params_list['inner']  = 'qodef-container-inner clearfix';
		} else {
			$params_list['holder'] = 'qodef-full-width';
			$params_list['inner']  = 'qodef-full-width-inner';
		}
		
		/**
		 * Available parameters for holder params
		 * -holder
		 * -inner
		 */
		return apply_filters( 'aarhus_select_filter_search_holder_params', $params_list );
	}
}

if ( ! function_exists( 'aarhus_select_get_search_page' ) ) {
	function aarhus_select_get_search_page() {
		$sidebar_layout = aarhus_select_sidebar_layout();
		
		$params = array(
			'sidebar_layout' => $sidebar_layout
		);
		
		aarhus_select_get_module_template_part( 'templates/holder', 'search', '', $params );
	}
}

if ( ! function_exists( 'aarhus_select_get_search_page_layout' ) ) {
	/**
	 * Function which create query for blog lists
	 */
	function aarhus_select_get_search_page_layout() {
		global $wp_query;
		$path   = apply_filters( 'aarhus_select_filter_search_page_path', 'templates/page' );
		$type   = apply_filters( 'aarhus_select_filter_search_page_layout', 'default' );
		$module = apply_filters( 'aarhus_select_filter_search_page_module', 'search' );
		$plugin = apply_filters( 'aarhus_select_filter_search_page_plugin_override', false );
		
		if ( get_query_var( 'paged' ) ) {
			$paged = get_query_var( 'paged' );
		} elseif ( get_query_var( 'page' ) ) {
			$paged = get_query_var( 'page' );
		} else {
			$paged = 1;
		}
		
		$params = array(
			'type'          => $type,
			'query'         => $wp_query,
			'paged'         => $paged,
			'max_num_pages' => aarhus_select_get_max_number_of_pages(),
		);
		
		$params = apply_filters( 'aarhus_select_filter_search_page_params', $params );
		
		aarhus_select_get_module_template_part( $path . '/' . $type, $module, '', $params, $plugin );
	}
}

if ( ! function_exists( 'aarhus_select_get_search_submit_icon_class' ) ) {
	/**
	 * Loads search submit icon class
	 */
	function aarhus_select_get_search_submit_icon_class() {
		$classes = array(
			'qodef-search-submit'
		);
		
		$classes[] = aarhus_select_get_icon_sources_class( 'search', 'qodef-search-submit' );

		return $classes;
	}
}

if ( ! function_exists( 'aarhus_select_get_search_close_icon_class' ) ) {
	/**
	 * Loads search close icon class
	 */
	function aarhus_select_get_search_close_icon_class() {
		$classes = array(
			'qodef-search-close'
		);
		
		$classes[] = aarhus_select_get_icon_sources_class( 'search', 'qodef-search-close' );

		return $classes;
	}
}

if ( ! function_exists( 'aarhus_select_return_search_icon' ) ) {
	function aarhus_select_return_search_icon($height = '17px', $width = '17px') {
		$html = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 			width="'.$width.'" height="'.$height.'" viewBox="0 0 17 17" enable-background="new 0 0 17 17" xml:space="preserve">
				<g><path d="M15.422,16.707c-0.341,0-0.673-0.141-0.904-0.381l-3.444-3.434c-1.174,0.813-2.58,1.245-4.006,1.245
				C3.163,14.137,0,10.974,0,7.068S3.163,0,7.068,0s7.068,3.163,7.068,7.068c0,1.426-0.432,2.832-1.245,4.006l3.444,3.444
				c0.231,0.231,0.372,0.563,0.372,0.904C16.707,16.125,16.125,16.707,15.422,16.707z M7.068,2.57c-2.48,0-4.498,2.018-4.498,4.498
				s2.018,4.498,4.498,4.498s4.498-2.018,4.498-4.498S9.548,2.57,7.068,2.57z"/>
				</g>
				</svg>';

		return $html;
	}
}