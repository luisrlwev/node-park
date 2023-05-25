<?php

if ( ! function_exists( 'aarhus_select_disable_behaviors_for_header_bottom' ) ) {
	/**
	 * This function is used to disable sticky header functions that perform processing variables their used in js for this header type
	 */
	function aarhus_select_disable_behaviors_for_header_bottom( $allow_behavior ) {
		return false;
	}
	
	if ( aarhus_select_check_is_header_type_enabled( 'header-bottom', aarhus_select_get_page_id() ) ) {
		add_filter( 'aarhus_select_filter_allow_sticky_header_behavior', 'aarhus_select_disable_behaviors_for_header_bottom' );
		add_filter( 'aarhus_select_filter_allow_content_boxed_layout', 'aarhus_select_disable_behaviors_for_header_bottom' );

        remove_action('aarhus_select_action_after_wrapper_inner', 'aarhus_select_get_header');
        add_action('aarhus_select_action_before_main_content', 'aarhus_select_get_header');
	}
}