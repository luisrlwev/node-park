<?php

if ( ! function_exists( 'aarhus_select_reset_options_map' ) ) {
	/**
	 * Reset options panel
	 */
	function aarhus_select_reset_options_map() {
		
		aarhus_select_add_admin_page(
			array(
				'slug'  => '_reset_page',
				'title' => esc_html__( 'Reset', 'aarhus' ),
				'icon'  => 'fa fa-retweet'
			)
		);
		
		$panel_reset = aarhus_select_add_admin_panel(
			array(
				'page'  => '_reset_page',
				'name'  => 'panel_reset',
				'title' => esc_html__( 'Reset', 'aarhus' )
			)
		);
		
		aarhus_select_add_admin_field(
			array(
				'type'          => 'yesno',
				'name'          => 'reset_to_defaults',
				'default_value' => 'no',
				'label'         => esc_html__( 'Reset to Defaults', 'aarhus' ),
				'description'   => esc_html__( 'This option will reset all Select Options values to defaults', 'aarhus' ),
				'parent'        => $panel_reset
			)
		);
	}
	
	add_action( 'aarhus_select_action_options_map', 'aarhus_select_reset_options_map', aarhus_select_set_options_map_position( 'reset' ) );
}