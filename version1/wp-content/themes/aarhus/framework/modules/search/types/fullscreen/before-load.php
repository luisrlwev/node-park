<?php

if ( ! function_exists( 'aarhus_select_set_search_fullscreen_global_option' ) ) {
    /**
     * This function set search type value for search options map
     */
    function aarhus_select_set_search_fullscreen_global_option( $search_type_options ) {
        $search_type_options['fullscreen'] = esc_html__( 'Fullscreen', 'aarhus' );

        return $search_type_options;
    }

    add_filter( 'aarhus_select_filter_search_type_global_option', 'aarhus_select_set_search_fullscreen_global_option' );
}