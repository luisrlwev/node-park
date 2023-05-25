<div class="qodef-section-title-holder <?php echo esc_attr($holder_classes); ?>" <?php echo aarhus_select_get_inline_style($holder_styles); ?>>
	<div class="qodef-st-inner">
		<?php if(!empty($title)) { ?>
			<<?php echo esc_attr($title_tag); ?> class="qodef-st-title" <?php echo aarhus_select_get_inline_style($title_styles); ?>>
				<?php echo wp_kses($title, array('br' => true, 'span' => array('class' => true))); ?>
			</<?php echo esc_attr($title_tag); ?>>
		<?php } ?>
		<?php if(!empty($text)) { ?>
			<<?php echo esc_attr($text_tag); ?> class="qodef-st-text" <?php echo aarhus_select_get_inline_style($text_styles); ?>>
				<?php echo wp_kses($text, array('br' => true)); ?>
			</<?php echo esc_attr($text_tag); ?>>
		<?php } ?>
    <?php if($enable_button === 'yes') { ?>
        <div class="qodef-section-title-button-holder">
            <div class="qodef-section-title-button">
                <?php
                echo aarhus_select_get_button_html(array(
                    'link'   => $button_link,
                    'target' => $button_link_target,
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