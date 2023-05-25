<?php

$vertical_loop_category = aarhus_select_options()->getOptionValue( 'portfolio_vertical_loop_category' );
$id = get_the_ID();
$categories = wp_get_post_terms($id, 'portfolio-category');
foreach($categories as $cat) {
    if($cat->slug != $vertical_loop_category) {
        $vertical_loop_category = '';
    }
}

$next_item_same_category = get_next_post(true, '', 'portfolio-category');
$next_item = get_next_post(false, '');
$portfolio_items_args = array(
    'posts_per_page'     => 1,
    'order'              => 'ASC',
    'post_status'        => 'publish',
    'post_type'          => 'portfolio-item',
    'orderby'            => 'date'
);

if($vertical_loop_category !== '' && $vertical_loop_category !== null) {
    if ($next_item_same_category) {
        $next_item_id = $next_item_same_category->ID;
    } else {
        $portfolio_items_args['portfolio-category'] = $vertical_loop_category;
        $portfolio_items = get_posts($portfolio_items_args);
        $next_item_id = $portfolio_items[0]->ID;
    }
} else {
    if ($next_item) {
        $next_item_id = $next_item->ID;
    } else {
        $portfolio_items = get_posts($portfolio_items_args);
        $next_item_id = $portfolio_items[0]->ID;
    }
}

$enable_parallax = aarhus_select_get_meta_field_intersect( 'portfolio_single_vertical_loop_enable_parallax', $id );

$params = array(
    'category' => $vertical_loop_category,
	'enable_parallax' => $enable_parallax,
    'next_item_id' => $next_item_id,
    'id' => $id
);

echo aarhus_select_execute_shortcode('qodef_portfolio_vertical_loop', $params);