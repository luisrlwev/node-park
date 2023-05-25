<?php

if ( ! function_exists( 'aarhus_select_register_widgets' ) ) {
    function aarhus_select_register_widgets() {
        $widgets = apply_filters( 'aarhus_select_filter_register_widgets', $widgets = array() );

        if( aarhus_select_core_plugin_installed() ) {
            foreach ($widgets as $widget) {
                aarhus_select_create_wp_widget($widget);
            }
        }
    }

    add_action( 'widgets_init', 'aarhus_select_register_widgets' );
}