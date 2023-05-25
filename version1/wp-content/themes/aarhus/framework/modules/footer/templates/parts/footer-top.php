<?php
    $footer_top_bg_text = aarhus_select_options()->getOptionValue( 'footer_top_bg_text' );
?>
<div class="qodef-footer-top-holder">
    <span class="qodef-footer-top-bg-text"><?php echo esc_attr($footer_top_bg_text) ?></span>
    <div class="qodef-footer-top-inner <?php echo esc_attr($footer_top_grid_class); ?>">
        <div class="qodef-grid-row <?php echo esc_attr($footer_top_classes); ?>">
            <?php for ($i = 0; $i < sizeof($footer_top_columns); $i++) { ?>
                <div class="qodef-column-content qodef-grid-col-<?php echo esc_attr($footer_top_columns[$i]); ?>">
                    <?php
                    if (is_active_sidebar('footer_top_column_' . ($i+1))) {
                        dynamic_sidebar('footer_top_column_' . ($i+1));
                    }
                    ?>
                </div>
            <?php } ?>
        </div>
    </div>
</div>