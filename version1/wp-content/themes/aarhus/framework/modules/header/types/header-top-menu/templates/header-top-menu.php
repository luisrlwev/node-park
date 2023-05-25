<?php do_action('aarhus_select_action_before_page_header'); ?>

<header class="qodef-page-header">
	<?php do_action('aarhus_select_action_after_page_header_html_open'); ?>
	
	<div class="qodef-menu-area">
		<?php do_action('aarhus_select_action_after_header_menu_area_html_open'); ?>
		
		<?php if($menu_area_in_grid) : ?>
			<div class="qodef-grid">
		<?php endif; ?>
				
			<div class="qodef-vertical-align-containers">
				<div class="qodef-position-left"><!--
				 --><div class="qodef-position-left-inner">
						<?php aarhus_select_get_main_menu(); ?>
					</div>
				</div>
				<div class="qodef-position-right"><!--
				 --><div class="qodef-position-right-inner">
						<?php aarhus_select_get_header_widget_area_one(); ?>
					</div>
				</div>
			</div>
				
		<?php if($menu_area_in_grid) : ?>
			</div>
		<?php endif; ?>
	</div>
	
	<div class="qodef-logo-area">
        <?php if($logo_area_in_grid) : ?>
            <div class="qodef-grid">
        <?php endif; ?>
	            
            <div class="qodef-vertical-align-containers">
                <div class="qodef-position-center"><!--
                 --><div class="qodef-position-center-inner">
                        <?php if(!$hide_logo) {
                            aarhus_select_get_logo();
                        } ?>
                    </div>
                </div>
            </div>
	            
        <?php if($logo_area_in_grid) : ?>
            </div>
        <?php endif; ?>
    </div>
	
	<?php do_action('aarhus_select_action_before_page_header_html_close'); ?>
</header>

<?php do_action('aarhus_select_action_after_page_header'); ?>