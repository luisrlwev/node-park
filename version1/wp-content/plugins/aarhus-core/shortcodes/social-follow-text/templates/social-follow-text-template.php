<div class="qodef-social-follow-holder <?php echo esc_attr($holder_classes); ?>" <?php echo aarhus_select_get_inline_style($holder_styles); ?>>

    <?php
    for( $n = 1; $n <= 6; $n ++ ) {

        if (!empty(${'text_' .$n})) {
    ?>

        <span class="qodef-sf-text-holder">
            <a class="qodef-sf-text" href="<?php echo esc_url(${'link_' .$n}); ?>" target="<?php echo esc_html(${'target_' .$n}); ?>" <?php echo aarhus_select_get_inline_style($title_styles); ?>><?php echo esc_html(${'text_' .$n}); ?></a>
        </span>

<?php }
    }
    ?>

</div>
