<div class="qodef-banner-holder <?php echo esc_attr($holder_classes); ?>">
    <div class="qodef-banner-image">
        <?php echo wp_get_attachment_image($image, 'full'); ?>
    </div>
    <div class="qodef-banner-text-holder">
	    <div class="qodef-banner-text-outer">
		    <div class="qodef-banner-text-inner">
		        <?php if(!empty($subtitle)) { ?>
		            <<?php echo esc_attr($subtitle_tag); ?> class="qodef-banner-subtitle" <?php echo aarhus_select_get_inline_style($subtitle_styles); ?>>
			            <?php echo esc_html($subtitle); ?>
		            </<?php echo esc_attr($subtitle_tag); ?>>
		        <?php } ?>
		        <?php if(!empty($title)) { ?>
		            <<?php echo esc_attr($title_tag); ?> class="qodef-banner-title" <?php echo aarhus_select_get_inline_style($title_styles); ?>>
		                <?php echo wp_kses($title, array('span' => array('class' => true))); ?>
	                </<?php echo esc_attr($title_tag); ?>>
		        <?php } ?>
				<?php /* if(!empty($link) && !empty($link_text)) { ?>
		            <a itemprop="url" href="<?php echo esc_url($link); ?>" target="<?php echo esc_attr($target); ?>" class="qodef-banner-link-text" <?php echo aarhus_select_get_inline_style($link_styles); ?>>
			            <span class="qodef-banner-link-original">
				            <span class="qodef-banner-link-icon ion-arrow-right-c"></span>
			                <span class="qodef-banner-link-label"><?php echo esc_html($link_text); ?></span>
			            </span>
			            <span class="qodef-banner-link-hover">
				            <span class="qodef-banner-link-icon ion-arrow-right-c"></span>
			                <span class="qodef-banner-link-label"><?php echo esc_html($link_text); ?></span>
			            </span>
		            </a>
		        <?php } */ ?>
                <?php if($enable_button === 'yes') { ?>
                    <div class="qodef-banner-button-holder">
                        <div class="qodef-banner-button">
                            <?php
                                echo aarhus_select_get_button_html(array(
                                    'size'   => 'large',
                                    'text'   => esc_attr($button_text),
                                    'type'   => 'simple'
                                ));
                            ?>
                        </div>
                    </div>
                <?php } ?>
			</div>
		</div>
        <div class="qodef-banner-overlay" <?php echo aarhus_select_get_inline_style($overlay_styles); ?>></div>
	</div>
	<?php if (!empty($link)) { ?>
        <a itemprop="url" class="qodef-banner-link" href="<?php echo esc_url($link); ?>" target="<?php echo esc_attr($target); ?>"></a>
    <?php } ?>
    <?php if($enable_badge === 'yes') { ?>
        <div class="qodef-banner-badge-holder">
			<?php if(!empty($badge_text)) { ?>
                <span class="qodef-banner-badge-text">
                    <?php echo esc_attr($badge_text); ?>
                </span>
			<?php } ?>
            <?php if(!empty($badge_mark)) { ?>
                <sup class="qodef-banner-badge-mark">
				    <?php echo esc_attr($badge_mark); ?>
                </sup>
            <?php } ?>
        </div>
    <?php } ?>
</div>