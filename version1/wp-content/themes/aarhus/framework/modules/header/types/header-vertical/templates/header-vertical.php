<?php do_action( 'aarhus_select_action_before_page_header' ); ?>

    <aside class="qodef-vertical-menu-area <?php echo esc_attr( $holder_class ); ?>">
        <div class="qodef-vertical-menu-area-inner">
            <div class="qodef-vertical-area-background"></div>
			<?php if ( ! $hide_logo ) {
				aarhus_select_get_logo();
			} ?>
			<?php aarhus_select_get_header_vertical_main_menu(); ?>

			<?php if ( aarhus_select_is_header_widget_area_active( 'one' ) ) : ?>
                <div class="qodef-vertical-area-widget-holder">
					<?php aarhus_select_get_header_widget_area_one(); ?>
                </div>
			<?php endif; ?>

        </div>
    </aside>

<?php do_action( 'aarhus_select_action_after_page_header' ); ?>