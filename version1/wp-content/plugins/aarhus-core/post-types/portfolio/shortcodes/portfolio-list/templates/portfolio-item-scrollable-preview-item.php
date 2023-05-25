<div class='qodef-ptf-list-showcase-preview-item'>
	<?php if ( $three_images === 'yes' ){ ?>
    <div class="qodef-three-columns clearfix">
        <div class="qodef-three-columns-inner">
			<?php }else{ ?>
            <div class="qodef-two-columns-50-50 clearfix">
                <div class="qodef-two-columns-50-50-inner">
					<?php } ?>
					<?php

					$additional_params['thumb_size'] = $this_object->getImageSize( $additional_params );

					$images_html = $this_object->getItemImages( $additional_params );
					if ( ! empty( $images_html ) ) {
						foreach ( $images_html as $image_html ) { ?>
                            <div class="qodef-column">
                                <div class="qodef-column-inner">
                                    <a href="<?php echo esc_url( $this_object->getItemLink() ); ?>" target="_blank">
										<?php
										print aarhus_select_get_module_part( $image_html );
										?>
                                    </a>
                                </div>
                            </div>
						<?php }
					} ?>
                </div>
            </div>
            <div class="qodef-ptf-list-showcase-preview-title-resp">
                <h4>
                    <a href="<?php echo esc_url( $this_object->getItemLink() ); ?>"><?php the_title(); ?></a>
                </h4>
            </div>
        </div>