<?php do_action('aarhus_select_action_before_page_header'); ?>
<header class="qodef-page-header">
    <?php do_action('aarhus_select_action_after_page_header_html_open'); ?>
    <div class="qodef-fixed-wrapper">
        <div class="qodef-menu-area">
            <?php do_action('aarhus_select_action_after_header_menu_area_html_open') ?>

            <?php if($menu_area_in_grid) : ?>
                <div class="qodef-grid">
            <?php endif; ?>

                <div class="qodef-vertical-align-containers">
                    <div class="qodef-position-left"><!--
                     --><div class="qodef-position-left-inner">
                            <div class="qodef-bottom-menu-left-widget-holder">
                                <?php aarhus_select_get_header_widget_area_one(); ?>
                            </div>
                        </div>
                    </div>
                    <div class="qodef-position-center"><!--
                     --><div class="qodef-position-center-inner">
                            <?php if(!$hide_logo) {
                                aarhus_select_get_logo();
                            } ?>
                        </div>
                    </div>
                    <div class="qodef-position-right"><!--
                     --><div class="qodef-position-right-inner">
                            <span class="qodef-header-bottom-opener-outer">
                                <span class="qodef-header-bottom-opener-inner">
                                    <a href="javascript:void(0)" class="qodef-header-bottom-menu-opener">
                                        <span class="qodef-hb-lines">
                                            <span class="qodef-hb-line qodef-line-1"></span>
                                            <span class="qodef-hb-line qodef-line-2"></span>
                                            <span class="qodef-hb-line qodef-line-3"></span>
                                        </span>
                                    </a>
                                </span>
                            </span>
                        </div>
                    </div>
                </div>

            <?php if($menu_area_in_grid) : ?>
                </div>
            <?php endif; ?>
        </div>
    </div>
    <?php do_action('aarhus_select_action_before_page_header_html_close'); ?>
</header>
<?php do_action('aarhus_select_action_after_page_header'); ?>