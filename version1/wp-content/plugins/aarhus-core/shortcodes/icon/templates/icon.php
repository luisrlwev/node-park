<?php if($icon_animation_holder) : ?>
    <span class="qodef-icon-animation-holder" <?php aarhus_select_inline_style($icon_animation_holder_styles); ?>>
<?php endif; ?>
    <span <?php aarhus_select_class_attribute($icon_holder_classes); ?> <?php aarhus_select_inline_style($icon_holder_styles); ?> <?php echo aarhus_select_get_inline_attrs($icon_holder_data); ?>>
        <?php if($type == 'qodef-circle') { ?>
            <svg class="qodef-icon-svg-circle" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="197px" height="197px" viewBox="0 0 197 197" enable-background="new 0 0 197 197" xml:space="preserve">
                <circle class="qodef-icon-stroke " stroke-linecap="round" cx="98.5" cy="98.6" r="97.5"></circle>
                <circle class="qodef-icon-circle " stroke-linecap="round" cx="98.5" cy="98.6" r="97.5"></circle>
            </svg>
        <?php } ?>
        <?php if(!empty($link)) : ?>
            <a itemprop="url" class="<?php echo esc_attr($link_class) ?>" href="<?php echo esc_url($link); ?>" target="<?php echo esc_attr($target); ?>">
        <?php endif; ?>
            <?php echo aarhus_select_icon_collections()->renderIcon($icon, $icon_pack, $icon_params); ?>
        <?php if(!empty($link)) : ?>
            </a>
        <?php endif; ?>
    </span>
<?php if($icon_animation_holder) : ?>
    </span>
<?php endif; ?>
