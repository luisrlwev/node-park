<a itemprop="url" href="<?php echo esc_url($link); ?>" target="<?php echo esc_attr($target); ?>" <?php aarhus_select_inline_style($button_styles); ?> <?php aarhus_select_class_attribute($button_classes); ?> <?php echo aarhus_select_get_inline_attrs($button_data); ?> <?php echo aarhus_select_get_inline_attrs($button_custom_attrs); ?>>
    <span class="qodef-btn-line-holder">
        <span class="qodef-btn-line-top"></span>
        <span class="qodef-btn-line"></span>
        <span class="qodef-btn-line-bottom"></span>
    </span>
    <?php echo aarhus_select_icon_collections()->renderIcon($icon, $icon_pack); ?>
    <span class="qodef-btn-text"><?php echo esc_html($text); ?></span>
</a>