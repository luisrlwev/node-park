<?php if($query_results->max_num_pages > 1) {
	$holder_styles = $this_object->getLoadMoreStyles($params);
	?>
	<div class="qodef-pl-loading">
		<div class="qodef-pl-loading-bounce1"></div>
		<div class="qodef-pl-loading-bounce2"></div>
		<div class="qodef-pl-loading-bounce3"></div>
	</div>
	<div class="qodef-pl-load-more-holder">
		<div class="qodef-pl-load-more" <?php aarhus_select_inline_style($holder_styles); ?>>
			<?php 
				echo aarhus_select_get_button_html(array(
					'link' => 'javascript: void(0)',
					'size' => 'large',
					'text' => esc_html__('LOAD MORE', 'aarhus-core'),
                    'type' => 'simple'
				));
			?>
            <span class="qodef-pl-load-more-line"></span>
		</div>
	</div>
<?php }