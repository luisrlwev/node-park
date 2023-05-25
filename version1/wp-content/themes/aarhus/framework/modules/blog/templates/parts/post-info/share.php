<?php
$share_type = isset( $share_type ) ? $share_type : 'list';
?>
<?php if ( aarhus_select_core_plugin_installed() && aarhus_select_options()->getOptionValue( 'enable_social_share' ) === 'yes' && aarhus_select_options()->getOptionValue( 'enable_social_share_on_post' ) === 'yes' ) { ?>
	<div class="qodef-blog-share">
        <span class="qodef-blog-share-label"><?php esc_html_e('Share:', 'aarhus'); ?></span>
		<?php echo aarhus_select_get_social_share_html( array( 'type' => $share_type ) ); ?>
	</div>
<?php } ?>