<?php

if ( ! function_exists( 'aarhus_select_social_options_map' ) ) {
	function aarhus_select_social_options_map() {

	    $page = '_social_page';
		
		aarhus_select_add_admin_page(
			array(
				'slug'  => '_social_page',
				'title' => esc_html__( 'Social Networks', 'aarhus' ),
				'icon'  => 'fa fa-share-alt'
			)
		);
		
		/**
		 * Enable Social Share
		 */
		$panel_social_share = aarhus_select_add_admin_panel(
			array(
				'page'  => '_social_page',
				'name'  => 'panel_social_share',
				'title' => esc_html__( 'Enable Social Share', 'aarhus' )
			)
		);
		
		aarhus_select_add_admin_field(
			array(
				'type'          => 'yesno',
				'name'          => 'enable_social_share',
				'default_value' => 'no',
				'label'         => esc_html__( 'Enable Social Share', 'aarhus' ),
				'description'   => esc_html__( 'Enabling this option will allow social share on networks of your choice', 'aarhus' ),
				'parent'        => $panel_social_share
			)
		);
		
		$panel_show_social_share_on = aarhus_select_add_admin_panel(
			array(
				'page'            => '_social_page',
				'name'            => 'panel_show_social_share_on',
				'title'           => esc_html__( 'Show Social Share On', 'aarhus' ),
				'dependency' => array(
					'show' => array(
						'enable_social_share'  => 'yes'
					)
				)
			)
		);
		
		aarhus_select_add_admin_field(
			array(
				'type'          => 'yesno',
				'name'          => 'enable_social_share_on_post',
				'default_value' => 'no',
				'label'         => esc_html__( 'Posts', 'aarhus' ),
				'description'   => esc_html__( 'Show Social Share on Blog Posts', 'aarhus' ),
				'parent'        => $panel_show_social_share_on
			)
		);
		
		aarhus_select_add_admin_field(
			array(
				'type'          => 'yesno',
				'name'          => 'enable_social_share_on_page',
				'default_value' => 'no',
				'label'         => esc_html__( 'Pages', 'aarhus' ),
				'description'   => esc_html__( 'Show Social Share on Pages', 'aarhus' ),
				'parent'        => $panel_show_social_share_on
			)
		);

        /**
         * Action for embedding social share option for custom post types
         */
		do_action('aarhus_select_action_post_types_social_share', $panel_show_social_share_on);
		
		/**
		 * Social Share Networks
		 */
		$panel_social_networks = aarhus_select_add_admin_panel(
			array(
				'page'            => '_social_page',
				'name'            => 'panel_social_networks',
				'title'           => esc_html__( 'Social Networks', 'aarhus' ),
				'dependency' => array(
					'hide' => array(
						'enable_social_share'  => 'no'
					)
				)
			)
		);
		
		/**
		 * Facebook
		 */
		aarhus_select_add_admin_section_title(
			array(
				'parent' => $panel_social_networks,
				'name'   => 'facebook_title',
				'title'  => esc_html__( 'Share on Facebook', 'aarhus' )
			)
		);
		
		aarhus_select_add_admin_field(
			array(
				'type'          => 'yesno',
				'name'          => 'enable_facebook_share',
				'default_value' => 'no',
				'label'         => esc_html__( 'Enable Share', 'aarhus' ),
				'description'   => esc_html__( 'Enabling this option will allow sharing via Facebook', 'aarhus' ),
				'parent'        => $panel_social_networks
			)
		);
		
		$enable_facebook_share_container = aarhus_select_add_admin_container(
			array(
				'name'            => 'enable_facebook_share_container',
				'parent'          => $panel_social_networks,
				'dependency' => array(
					'show' => array(
						'enable_facebook_share'  => 'yes'
					)
				)
			)
		);
		
		aarhus_select_add_admin_field(
			array(
				'type'          => 'image',
				'name'          => 'facebook_icon',
				'default_value' => '',
				'label'         => esc_html__( 'Upload Icon', 'aarhus' ),
				'parent'        => $enable_facebook_share_container
			)
		);
		
		/**
		 * Twitter
		 */
		aarhus_select_add_admin_section_title(
			array(
				'parent' => $panel_social_networks,
				'name'   => 'twitter_title',
				'title'  => esc_html__( 'Share on Twitter', 'aarhus' )
			)
		);
		
		aarhus_select_add_admin_field(
			array(
				'type'          => 'yesno',
				'name'          => 'enable_twitter_share',
				'default_value' => 'no',
				'label'         => esc_html__( 'Enable Share', 'aarhus' ),
				'description'   => esc_html__( 'Enabling this option will allow sharing via Twitter', 'aarhus' ),
				'parent'        => $panel_social_networks
			)
		);
		
		$enable_twitter_share_container = aarhus_select_add_admin_container(
			array(
				'name'            => 'enable_twitter_share_container',
				'parent'          => $panel_social_networks,
				'dependency' => array(
					'show' => array(
						'enable_twitter_share'  => 'yes'
					)
				)
			)
		);
		
		aarhus_select_add_admin_field(
			array(
				'type'          => 'image',
				'name'          => 'twitter_icon',
				'default_value' => '',
				'label'         => esc_html__( 'Upload Icon', 'aarhus' ),
				'parent'        => $enable_twitter_share_container
			)
		);
		
		aarhus_select_add_admin_field(
			array(
				'type'          => 'text',
				'name'          => 'twitter_via',
				'default_value' => '',
				'label'         => esc_html__( 'Via', 'aarhus' ),
				'parent'        => $enable_twitter_share_container
			)
		);
		
		/**
		 * Google Plus
		 */
		aarhus_select_add_admin_section_title(
			array(
				'parent' => $panel_social_networks,
				'name'   => 'google_plus_title',
				'title'  => esc_html__( 'Share on Google Plus', 'aarhus' )
			)
		);
		
		aarhus_select_add_admin_field(
			array(
				'type'          => 'yesno',
				'name'          => 'enable_google_plus_share',
				'default_value' => 'no',
				'label'         => esc_html__( 'Enable Share', 'aarhus' ),
				'description'   => esc_html__( 'Enabling this option will allow sharing via Google Plus', 'aarhus' ),
				'parent'        => $panel_social_networks
			)
		);
		
		$enable_google_plus_container = aarhus_select_add_admin_container(
			array(
				'name'            => 'enable_google_plus_container',
				'parent'          => $panel_social_networks,
				'dependency' => array(
					'show' => array(
						'enable_google_plus_share'  => 'yes'
					)
				)
			)
		);
		
		aarhus_select_add_admin_field(
			array(
				'type'          => 'image',
				'name'          => 'google_plus_icon',
				'default_value' => '',
				'label'         => esc_html__( 'Upload Icon', 'aarhus' ),
				'parent'        => $enable_google_plus_container
			)
		);
		
		/**
		 * Linked In
		 */
		aarhus_select_add_admin_section_title(
			array(
				'parent' => $panel_social_networks,
				'name'   => 'linkedin_title',
				'title'  => esc_html__( 'Share on LinkedIn', 'aarhus' )
			)
		);
		
		aarhus_select_add_admin_field(
			array(
				'type'          => 'yesno',
				'name'          => 'enable_linkedin_share',
				'default_value' => 'no',
				'label'         => esc_html__( 'Enable Share', 'aarhus' ),
				'description'   => esc_html__( 'Enabling this option will allow sharing via LinkedIn', 'aarhus' ),
				'parent'        => $panel_social_networks
			)
		);
		
		$enable_linkedin_container = aarhus_select_add_admin_container(
			array(
				'name'            => 'enable_linkedin_container',
				'parent'          => $panel_social_networks,
				'dependency' => array(
					'show' => array(
						'enable_linkedin_share'  => 'yes'
					)
				)
			)
		);
		
		aarhus_select_add_admin_field(
			array(
				'type'          => 'image',
				'name'          => 'linkedin_icon',
				'default_value' => '',
				'label'         => esc_html__( 'Upload Icon', 'aarhus' ),
				'parent'        => $enable_linkedin_container
			)
		);
		
		/**
		 * Tumblr
		 */
		aarhus_select_add_admin_section_title(
			array(
				'parent' => $panel_social_networks,
				'name'   => 'tumblr_title',
				'title'  => esc_html__( 'Share on Tumblr', 'aarhus' )
			)
		);
		
		aarhus_select_add_admin_field(
			array(
				'type'          => 'yesno',
				'name'          => 'enable_tumblr_share',
				'default_value' => 'no',
				'label'         => esc_html__( 'Enable Share', 'aarhus' ),
				'description'   => esc_html__( 'Enabling this option will allow sharing via Tumblr', 'aarhus' ),
				'parent'        => $panel_social_networks
			)
		);
		
		$enable_tumblr_container = aarhus_select_add_admin_container(
			array(
				'name'            => 'enable_tumblr_container',
				'parent'          => $panel_social_networks,
				'dependency' => array(
					'show' => array(
						'enable_tumblr_share'  => 'yes'
					)
				)
			)
		);
		
		aarhus_select_add_admin_field(
			array(
				'type'          => 'image',
				'name'          => 'tumblr_icon',
				'default_value' => '',
				'label'         => esc_html__( 'Upload Icon', 'aarhus' ),
				'parent'        => $enable_tumblr_container
			)
		);
		
		/**
		 * Pinterest
		 */
		aarhus_select_add_admin_section_title(
			array(
				'parent' => $panel_social_networks,
				'name'   => 'pinterest_title',
				'title'  => esc_html__( 'Share on Pinterest', 'aarhus' )
			)
		);
		
		aarhus_select_add_admin_field(
			array(
				'type'          => 'yesno',
				'name'          => 'enable_pinterest_share',
				'default_value' => 'no',
				'label'         => esc_html__( 'Enable Share', 'aarhus' ),
				'description'   => esc_html__( 'Enabling this option will allow sharing via Pinterest', 'aarhus' ),
				'parent'        => $panel_social_networks
			)
		);
		
		$enable_pinterest_container = aarhus_select_add_admin_container(
			array(
				'name'            => 'enable_pinterest_container',
				'parent'          => $panel_social_networks,
				'dependency' => array(
					'show' => array(
						'enable_pinterest_share'  => 'yes'
					)
				)
			)
		);
		
		aarhus_select_add_admin_field(
			array(
				'type'          => 'image',
				'name'          => 'pinterest_icon',
				'default_value' => '',
				'label'         => esc_html__( 'Upload Icon', 'aarhus' ),
				'parent'        => $enable_pinterest_container
			)
		);
		
		/**
		 * VK
		 */
		aarhus_select_add_admin_section_title(
			array(
				'parent' => $panel_social_networks,
				'name'   => 'vk_title',
				'title'  => esc_html__( 'Share on VK', 'aarhus' )
			)
		);
		
		aarhus_select_add_admin_field(
			array(
				'type'          => 'yesno',
				'name'          => 'enable_vk_share',
				'default_value' => 'no',
				'label'         => esc_html__( 'Enable Share', 'aarhus' ),
				'description'   => esc_html__( 'Enabling this option will allow sharing via VK', 'aarhus' ),
				'parent'        => $panel_social_networks
			)
		);
		
		$enable_vk_container = aarhus_select_add_admin_container(
			array(
				'name'            => 'enable_vk_container',
				'parent'          => $panel_social_networks,
				'dependency' => array(
					'show' => array(
						'enable_vk_share'  => 'yes'
					)
				)
			)
		);
		
		aarhus_select_add_admin_field(
			array(
				'type'          => 'image',
				'name'          => 'vk_icon',
				'default_value' => '',
				'label'         => esc_html__( 'Upload Icon', 'aarhus' ),
				'parent'        => $enable_vk_container
			)
		);
		
		if ( defined( 'AARHUS_TWITTER_FEED_VERSION' ) ) {
			$twitter_panel = aarhus_select_add_admin_panel(
				array(
					'title' => esc_html__( 'Twitter', 'aarhus' ),
					'name'  => 'panel_twitter',
					'page'  => '_social_page'
				)
			);
			
			aarhus_select_add_admin_twitter_button(
				array(
					'name'   => 'twitter_button',
					'parent' => $twitter_panel
				)
			);
		}
		
		if ( defined( 'AARHUS_INSTAGRAM_FEED_VERSION' ) ) {
			$instagram_panel = aarhus_select_add_admin_panel(
				array(
					'title' => esc_html__( 'Instagram', 'aarhus' ),
					'name'  => 'panel_instagram',
					'page'  => '_social_page'
				)
			);
			
			aarhus_select_add_admin_instagram_button(
				array(
					'name'   => 'instagram_button',
					'parent' => $instagram_panel
				)
			);
		}
		
		/**
		 * Open Graph
		 */
		$panel_open_graph = aarhus_select_add_admin_panel(
			array(
				'page'  => '_social_page',
				'name'  => 'panel_open_graph',
				'title' => esc_html__( 'Open Graph', 'aarhus' ),
			)
		);
		
		aarhus_select_add_admin_field(
			array(
				'type'          => 'yesno',
				'name'          => 'enable_open_graph',
				'default_value' => 'no',
				'label'         => esc_html__( 'Enable Open Graph', 'aarhus' ),
				'description'   => esc_html__( 'Enabling this option will allow usage of Open Graph protocol on your site', 'aarhus' ),
				'parent'        => $panel_open_graph
			)
		);
		
		$enable_open_graph_container = aarhus_select_add_admin_container(
			array(
				'name'            => 'enable_open_graph_container',
				'parent'          => $panel_open_graph,
				'dependency' => array(
					'show' => array(
						'enable_open_graph'  => 'yes'
					)
				)
			)
		);
		
		aarhus_select_add_admin_field(
			array(
				'type'          => 'image',
				'name'          => 'open_graph_image',
				'default_value' => SELECT_ASSETS_ROOT . '/img/open_graph.jpg',
				'label'         => esc_html__( 'Default Share Image', 'aarhus' ),
				'parent'        => $enable_open_graph_container,
				'description'   => esc_html__( 'Used when featured image is not set. Make sure that image is at least 1200 x 630 pixels, up to 8MB in size', 'aarhus' ),
			)
		);

        /**
         * Action for embedding social share option for custom post types
         */
        do_action('aarhus_select_action_social_options', $page);
	}
	
	add_action( 'aarhus_select_action_options_map', 'aarhus_select_social_options_map', aarhus_select_set_options_map_position( 'social' ) );
}