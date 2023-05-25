<?php do_action( 'aarhus_select_action_before_page_header' ); ?>
<aside class="qodef-vertical-menu-area <?php echo esc_attr( $holder_class ); ?>">
    <div class="qodef-vertical-menu-area-inner">
        <div class="qodef-vertical-area-background"></div>
        <div class="qodef-vertical-menu-nav-holder-outer">
            <div class="qodef-vertical-menu-nav-holder">
                <div class="qodef-vertical-menu-holder-nav-inner">
					<?php aarhus_select_get_header_vertical_sliding_main_menu(); ?>
                </div>
            </div>
        </div>
		<?php if ( ! $hide_logo ) {
			aarhus_select_get_logo();
		} ?>
        <div class="qodef-vertical-menu-holder">
            <div class="qodef-vertical-menu-table">
                <div class="qodef-vertical-menu-table-cell">
                    <div class="qodef-vertical-menu-opener">
                        <a href="#" <?php aarhus_select_class_attribute( $vertical_sliding_icon_class ); ?>>
                            <span class="qodef-vertical-sliding-close-icon">
								<?php echo aarhus_select_get_icon_sources_html( 'vertical_sliding', true ); ?>
                            </span>
                            <span class="qodef-vertical-sliding-opener-icon">
								<?php echo aarhus_select_get_icon_sources_html( 'vertical_sliding' ); ?>
                            </span>
                        </a>
                    </div>

					<?php if ( aarhus_select_is_header_widget_area_active( 'one' ) ) : ?>
                        <div class="qodef-vertical-area-widget-holder">
							<?php aarhus_select_get_header_widget_area_one(); ?>
                        </div>
					<?php endif; ?>

                </div>
            </div>
        </div>
    </div>
</aside>

<?php do_action( 'aarhus_select_action_after_page_header' ); ?>
