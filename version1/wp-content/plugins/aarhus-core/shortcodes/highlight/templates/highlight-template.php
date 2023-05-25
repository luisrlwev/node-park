<?php
/**
 * Highlight shortcode template
 */
?>

<span class="qodef-highlight" <?php aarhus_select_inline_style($highlight_style);?>>
	<?php echo esc_html($content);?>
</span>