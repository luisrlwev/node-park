<div class="qodef-team-holder <?php echo esc_attr($holder_classes); ?>">
	<div class="qodef-team-inner">
		<?php if ($team_image !== '') { ?>
			<div class="qodef-team-image">
                <div class="qodef-team-image-inner">
                    <div class="qodef-team-image-holder">
                        <?php echo wp_get_attachment_image($team_image, 'full'); ?>
                    </div>
                    <?php if (!empty($team_social_links)) {
                        ?>
                        <div class="qodef-team-social-links-holder">
                            <?php foreach( $team_social_links as $team_social_link ) { ?>
                                <a href="<?php echo esc_url($team_social_link['link']); ?>" target="<?php echo esc_attr($team_social_link['target']); ?>" class="qodef-team-social-link"><?php echo esc_attr($team_social_link['text']); ?></a><span class="qodef-team-social-link-separator"></span>
                            <?php } ?>
                        </div>
                    <?php } ?>
                </div>
			</div>
		<?php } ?>
		<div class="qodef-team-info">
			<?php if ($team_name !== '') { ?>
				<<?php echo esc_attr($team_name_tag); ?> class="qodef-team-name" <?php echo aarhus_select_get_inline_style($team_name_styles); ?>><?php echo esc_html($team_name); ?></<?php echo esc_attr($team_name_tag); ?>>
			<?php } ?>
			<?php if ($team_position !== "") { ?>
				<h6 class="qodef-team-position" <?php echo aarhus_select_get_inline_style($team_position_styles); ?>><?php echo esc_html($team_position); ?></h6>
			<?php } ?>
			<?php if ($team_text !== "") { ?>
				<p class="qodef-team-text" <?php echo aarhus_select_get_inline_style($team_text_styles); ?>><?php echo esc_html($team_text); ?></p>
			<?php } ?>
		</div>
	</div>
</div>