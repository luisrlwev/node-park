<form role="search" method="get" class="qodef-searchform searchform" id="searchform-<?php echo esc_attr(rand(0, 1000)); ?>" action="<?php echo esc_url( home_url( '/' ) ); ?>">
	<label class="screen-reader-text"><?php esc_html_e( 'Search for:', 'aarhus' ); ?></label>
	<div class="input-holder clearfix">
        <button type="submit" class="qodef-search-submit"><?php echo aarhus_select_icon_collections()->renderIcon( 'fas fa-search', 'font_awesome' ); ?></button>
		<input type="search" class="search-field" placeholder="<?php esc_attr_e( 'Search...', 'aarhus' ); ?>" value="" name="s" title="<?php esc_attr_e( 'Search for:', 'aarhus' ); ?>"/>
	</div>
</form>