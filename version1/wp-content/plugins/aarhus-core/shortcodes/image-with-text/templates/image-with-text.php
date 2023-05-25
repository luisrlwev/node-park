<div class="qodef-image-with-text-holder <?php echo esc_attr($holder_classes); ?>">
    <div class="qodef-iwt-image">
        <?php if (!empty($image)) { ?>
            <?php if ($image_behavior === 'lightbox') { ?>
                <a itemprop="image" href="<?php echo esc_url($image['url']); ?>" data-rel="prettyPhoto[iwt_pretty_photo]" title="<?php echo esc_attr($image['alt']); ?>">
            <?php } else if ($image_behavior === 'custom-link' && !empty($custom_link)) { ?>
                    <a itemprop="url" href="<?php echo esc_url($custom_link); ?>" target="<?php echo esc_attr($custom_link_target); ?>">
            <?php } ?>
                <?php if(is_array($image_size) && count($image_size)) : ?>
                    <?php echo aarhus_select_generate_thumbnail($image['image_id'], null, $image_size[0], $image_size[1]); ?>
                <?php else: ?>
                    <?php echo wp_get_attachment_image($image['image_id'], $image_size); ?>
                <?php endif; ?>
            <?php if ($image_behavior === 'lightbox' || $image_behavior === 'custom-link') { ?>
                </a>
            <?php } ?>
        <?php } ?>
    </div>
    <div class="qodef-iwt-text-holder">
		<?php if(!empty($pre_title)) { ?>
            <span class="qodef-iwt-pre-title" <?php echo aarhus_select_get_inline_style($pre_title_styles); ?>><?php echo esc_html($pre_title); ?></span>
	    <?php } ?>
        <?php if(!empty($title)) { ?>
            <<?php echo esc_attr($title_tag); ?> class="qodef-iwt-title" <?php echo aarhus_select_get_inline_style($title_styles); ?>><?php echo esc_html($title); ?></<?php echo esc_attr($title_tag); ?>>
        <?php } ?>
		<?php if(!empty($text)) { ?>
            <p class="qodef-iwt-text" <?php echo aarhus_select_get_inline_style($text_styles); ?>><span class="qodef-iwt-pre-text" <?php echo aarhus_select_get_inline_style($pre_text_styles); ?>><?php echo esc_html($pre_text) ?></span>&nbsp;<?php echo esc_html($text); ?></p>
        <?php } ?>
    </div>
</div>