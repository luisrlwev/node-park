<div <?php echo aarhus_select_get_class_attribute($holder_classes); ?> <?php echo aarhus_select_get_inline_style($holder_styles); ?>>
	<?php if(!empty($image)) { ?>
	    <div class="qodef-iwn-image">
            <?php echo wp_get_attachment_image($image['image_id'], 'full'); ?>
        </div>
	<?php } ?>
    <div class="qodef-iwn-text-holder" <?php echo aarhus_select_get_inline_style($text_styles); ?>>
        <?php if(!empty($title)) { ?>
            <<?php echo esc_attr($title_tag); ?> class="qodef-iwn-title"><span class="qodef-iwn-before-title"></span><?php echo esc_html($title); ?></<?php echo esc_attr($title_tag); ?>>
        <?php } ?>
        <?php if(!empty($text)) { ?>
            <p class="qodef-iwn-text"><?php echo esc_html($text); ?></p>
        <?php } ?>
    </div>
    <?php if(!empty($number)) { ?>
        <div class="qodef-iwn-number-holder">
            <span class="qodef-iwn-number"><?php echo esc_html($number); ?></span>
        </div>
    <?php } ?>
    <?php if(!empty($overlay_image)) { ?>
        <div class="qodef-iwn-overlay-image-holder">
            <div class="qodef-iwn-overlay-image">
                <?php echo wp_get_attachment_image($overlay_image['image_id'], 'full'); ?>
            </div>
            <?php if(!empty($overlay_hover_image)) { ?>
                <div class="qodef-iwn-overlay-hover-image">
                    <?php echo wp_get_attachment_image($overlay_hover_image['image_id'], 'full'); ?>
                </div>
            <?php } ?>
        </div>
    <?php } ?>
</div>