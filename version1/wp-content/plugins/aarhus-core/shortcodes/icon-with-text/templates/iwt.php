<div <?php aarhus_select_class_attribute($holder_classes); ?>>
	<?php if(!empty($link)) : ?>
        <a itemprop="url" href="<?php echo esc_url($link); ?>" target="<?php echo esc_attr($target); ?>">
    <?php endif; ?>
            <div class="qodef-iwt-icon">
                <?php if(!empty($custom_icon)) : ?>
                    <?php echo wp_get_attachment_image($custom_icon, 'full'); ?>
                <?php else: ?>
                    <?php echo aarhus_core_get_shortcode_module_template_part('templates/icon', 'icon-with-text', '', array('icon_parameters' => $icon_parameters)); ?>
                <?php endif; ?>
            </div>
	        <div class="qodef-iwt-content" <?php aarhus_select_inline_style($content_styles); ?>>
                <?php if(!empty($title)) { ?>
                    <<?php echo esc_attr($title_tag); ?> class="qodef-iwt-title" <?php aarhus_select_inline_style($title_styles); ?>>
                        <span class="qodef-iwt-title-text"><?php echo esc_html($title); ?></span>
                    </<?php echo esc_attr($title_tag); ?>>
                <?php } ?>
                <?php if(!empty($text)) { ?>
                    <p class="qodef-iwt-text" <?php aarhus_select_inline_style($text_styles); ?>><?php echo esc_html($text); ?></p>
                <?php } ?>
	        </div>
    <?php if(!empty($link)) : ?>
        </a>
    <?php endif; ?>
</div>
