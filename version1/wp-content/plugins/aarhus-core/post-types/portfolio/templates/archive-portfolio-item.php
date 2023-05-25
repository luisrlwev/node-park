<?php
get_header();
aarhus_select_get_title();
do_action( 'aarhus_select_action_before_main_content' ); ?>
<div class="qodef-container qodef-default-page-template">
	<?php do_action( 'aarhus_select_action_after_container_open' ); ?>
	<div class="qodef-container-inner clearfix">
		<?php
			$aarhus_taxonomy_id   = get_queried_object_id();
			$aarhus_taxonomy_type = is_tax( 'portfolio-tag' ) ? 'portfolio-tag' : 'portfolio-category';
			$aarhus_taxonomy      = ! empty( $aarhus_taxonomy_id ) ? get_term_by( 'id', $aarhus_taxonomy_id, $aarhus_taxonomy_type ) : '';
			$aarhus_taxonomy_slug = ! empty( $aarhus_taxonomy ) ? $aarhus_taxonomy->slug : '';
			$aarhus_taxonomy_name = ! empty( $aarhus_taxonomy ) ? $aarhus_taxonomy->taxonomy : '';
			
			aarhus_core_get_archive_portfolio_list( $aarhus_taxonomy_slug, $aarhus_taxonomy_name );
		?>
	</div>
	<?php do_action( 'aarhus_select_action_before_container_close' ); ?>
</div>
<?php get_footer(); ?>
