<?php if($filter == 'yes') {
	$filter_categories    = $this_object->getFilterCategories($params);
	$filter_holder_styles = $this_object->getFilterHolderStyles($params);
	$filter_styles        = $this_object->getFilterStyles($params);
?>
<div class="qodef-pl-filter-holder" <?php aarhus_select_inline_style($filter_holder_styles); ?>>
    <div class="qodef-plf-inner">
        <?php if(is_array($filter_categories) && is_array($filter_categories['parent_categories']) && count($filter_categories['parent_categories'])) { ?>
            <ul class="qodef-portfolio-filter-parent-categories clearfix" <?php aarhus_select_inline_style($filter_styles); ?>>
                <li class="qodef-all-filter qodef-parent-filter" data-filter="">
                    <span><?php esc_html_e('All', 'aarhus-core')?></span>
                </li>
                <?php foreach($filter_categories['parent_categories'] as $parent) { ?>
                    <li class="qodef-parent-filter" data-filter=".portfolio-category-<?php echo esc_attr($parent->slug); ?>" data-group-id="<?php echo esc_attr($parent->term_id); ?>">
                        <span><?php echo esc_html($parent->name); ?></span>
                    </li>
                <?php } ?>
            </ul>
        <?php } ?>
        <?php if (!empty($filter_categories) && is_array($filter_categories) && is_array($filter_categories['child_categories']) && count($filter_categories['child_categories'])) { ?>
            <div class="qodef-portfolio-filter-child-categories-holder" <?php aarhus_select_inline_style($filter_holder_styles); ?>>
                <?php foreach ($filter_categories['child_categories'] as $child_group) { ?>
                    <ul class="qodef-portfolio-filter-child-categories clearfix" <?php aarhus_select_inline_style($filter_styles); ?> data-parent-id="<?php echo esc_attr($child_group['id']); ?>">
                        <?php if (is_array($child_group['value']) && count($child_group['value'])) {
                            $children = array();
                            foreach ($child_group['value'] as $child) {
                                $children[] = '.portfolio-category-' . $child->slug;
                            }
                            $all_array = implode(', ', $children); ?>
                            <li class="qodef-filter-all qodef-child-filter" data-filter="<?php echo esc_attr($all_array); ?>">
                                <span><?php esc_html_e('All', 'aarhus-core')?></span>
                            </li>
                            <?php foreach ($child_group['value'] as $child) { ?>
                                <li class="qodef-child-filter" data-filter=".portfolio-category-<?php echo esc_attr($child->slug) ?>">
                                    <span><?php echo esc_html($child->name); ?></span>
                                </li>
                            <?php } ?>
                        <?php } ?>
                    </ul>
                <?php } ?>
            </div>
        <?php } ?>
    </div>
</div>
<?php } ?>

