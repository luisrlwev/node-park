<?php

if ( ! function_exists( 'aarhus_core_map_portfolio_meta' ) ) {
	function aarhus_core_map_portfolio_meta() {
		global $aarhus_select_global_Framework;
		
		$aarhus_pages = array();
		$pages      = get_pages();
		foreach ( $pages as $page ) {
			$aarhus_pages[ $page->ID ] = $page->post_title;
		}
		
		//Portfolio Images
		
		$aarhus_portfolio_images = new AarhusSelectClassMetaBox( 'portfolio-item', esc_html__( 'Portfolio Images (multiple upload)', 'aarhus-core' ), '', '', 'portfolio_images' );
		$aarhus_select_global_Framework->qodeMetaBoxes->addMetaBox( 'portfolio_images', $aarhus_portfolio_images );
		
		$aarhus_portfolio_image_gallery = new AarhusSelectClassMultipleImages( 'qodef-portfolio-image-gallery', esc_html__( 'Portfolio Images', 'aarhus-core' ), esc_html__( 'Choose your portfolio images', 'aarhus-core' ) );
		$aarhus_portfolio_images->addChild( 'qodef-portfolio-image-gallery', $aarhus_portfolio_image_gallery );
		
		//Portfolio Single Upload Images/Videos 
		
		$aarhus_portfolio_images_videos = aarhus_select_create_meta_box(
			array(
				'scope' => array( 'portfolio-item' ),
				'title' => esc_html__( 'Portfolio Images/Videos (single upload)', 'aarhus-core' ),
				'name'  => 'qodef_portfolio_images_videos'
			)
		);
		aarhus_select_add_repeater_field(
			array(
				'name'        => 'qodef_portfolio_single_upload',
				'parent'      => $aarhus_portfolio_images_videos,
				'button_text' => esc_html__( 'Add Image/Video', 'aarhus-core' ),
				'fields'      => array(
					array(
						'type'        => 'select',
						'name'        => 'file_type',
						'label'       => esc_html__( 'File Type', 'aarhus-core' ),
						'options' => array(
							'image' => esc_html__('Image','aarhus-core'),
							'video' => esc_html__('Video','aarhus-core'),
						)
					),
					array(
						'type'        => 'image',
						'name'        => 'single_image',
						'label'       => esc_html__( 'Image', 'aarhus-core' ),
						'dependency' => array(
							'show' => array(
								'file_type'  => 'image'
							)
						)
					),
					array(
						'type'        => 'select',
						'name'        => 'video_type',
						'label'       => esc_html__( 'Video Type', 'aarhus-core' ),
						'options'	  => array(
							'youtube' => esc_html__('YouTube', 'aarhus-core'),
							'vimeo' => esc_html__('Vimeo', 'aarhus-core'),
							'self' => esc_html__('Self Hosted', 'aarhus-core'),
						),
						'dependency' => array(
							'show' => array(
								'file_type'  => 'video'
							)
						)
					),
					array(
						'type'        => 'text',
						'name'        => 'video_id',
						'label'       => esc_html__( 'Video ID', 'aarhus-core' ),
						'dependency' => array(
							'show' => array(
								'file_type' => 'video',
								'video_type'  => array('youtube','vimeo')
							)
						)
					),
					array(
						'type'        => 'text',
						'name'        => 'video_mp4',
						'label'       => esc_html__( 'Video mp4', 'aarhus-core' ),
						'dependency' => array(
							'show' => array(
								'file_type' => 'video',
								'video_type'  => 'self'
							)
						)
					),
					array(
						'type'        => 'image',
						'name'        => 'video_cover_image',
						'label'       => esc_html__( 'Video Cover Image', 'aarhus-core' ),
						'dependency' => array(
							'show' => array(
								'file_type' => 'video',
								'video_type'  => 'self'
							)
						)
					)
				)
			)
		);
		
		//Portfolio Additional Sidebar Items
		
		$aarhus_additional_sidebar_items = aarhus_select_create_meta_box(
			array(
				'scope' => array( 'portfolio-item' ),
				'title' => esc_html__( 'Additional Portfolio Sidebar Items', 'aarhus-core' ),
				'name'  => 'portfolio_properties'
			)
		);

		aarhus_select_add_repeater_field(
			array(
				'name'        => 'qodef_portfolio_properties',
				'parent'      => $aarhus_additional_sidebar_items,
				'button_text' => esc_html__( 'Add New Item', 'aarhus-core' ),
				'fields'      => array(
					array(
						'type'        => 'text',
						'name'        => 'item_title',
						'label'       => esc_html__( 'Item Title', 'aarhus-core' ),
					),
					array(
						'type'        => 'text',
						'name'        => 'item_text',
						'label'       => esc_html__( 'Item Text', 'aarhus-core' )
					),
					array(
						'type'        => 'text',
						'name'        => 'item_url',
						'label'       => esc_html__( 'Enter Full URL for Item Text Link', 'aarhus-core' )
					)
				)
			)
		);

        //Portfolio Second Featured Image

        $aarhus_second_portfolio_featured_image =  aarhus_select_create_meta_box(array(
            'scope' => array('portfolio-item'),
            'title' => esc_html__('Second Featured image','aarhus-core'),
            'name' => 'second-featured-image',
        ));

        aarhus_select_create_meta_box_field(
            array(
                'name'        	=> 'portfolio_second_featured_image',
                'type'        	=> 'image',
                'label'       	=> '',
                'description' 	=> esc_html__('Only for Scrollable Portfolio List Type','aarhus-core'),
                'parent'      	=> $aarhus_second_portfolio_featured_image,
            )
        );

        //Portfolio Third Featured Image

        $aarhus_third_portfolio_featured_image = aarhus_select_create_meta_box(array(
            'scope' => array('portfolio-item'),
            'title' => 'Third Featured image',
            'name' => 'third-featured-image',
            'context' => 'side',
            'priority' => 'low',
        ));

        aarhus_select_create_meta_box_field(
            array(
                'name'        	=> 'portfolio_third_featured_image',
                'type'        	=> 'image',
                'label'       	=> '',
                'description' 	=> esc_html__('Only for Scrollable Portfolio List Type','aarhus-core'),
                'parent'      	=> $aarhus_third_portfolio_featured_image,
            )
        );
	}
	
	add_action( 'aarhus_select_action_meta_boxes_map', 'aarhus_core_map_portfolio_meta', 40 );
}