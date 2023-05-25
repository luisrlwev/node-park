<div class="qodef-number-with-text-holder <?php echo esc_attr($holder_classes); ?>">
    <span class="qodef-nwt-number"><?php echo esc_html($number); ?></span>
	<div class="qodef-nwt-text-holder" <?php echo aarhus_select_get_inline_style($content_styles); ?>>
		<?php if(!empty($title)) { ?>
		<<?php echo esc_attr($title_tag); ?> class="qodef-nwt-title" <?php echo aarhus_select_get_inline_style($title_styles); ?>><?php echo esc_html($title); ?></<?php echo esc_attr($title_tag); ?>>
	<?php } ?>
	<?php if(!empty($text)) { ?>
		<p class="qodef-nwt-text"><?php echo esc_html($text); ?></p>
	<?php } ?>
    <?php if(!empty($external_url)) { ?>
        <div class="qodef-nwt-url-button">
            <?php
            echo aarhus_select_get_button_html(array(
                'link'   => $external_url,
                'target' => $external_url_target,
                'size'   => 'large',
                'text'   => esc_html__('READ MORE', 'aarhus-core'),
                'type'   => 'simple'
            ));
            ?>
        </div>
    <?php } ?>
</div>
</div>