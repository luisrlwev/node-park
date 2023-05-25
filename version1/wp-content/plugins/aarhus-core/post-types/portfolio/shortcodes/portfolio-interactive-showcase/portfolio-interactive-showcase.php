<?php

namespace AarhusCore\CPT\Shortcodes\PortfolioInteractiveShowcase;

use AarhusCore\Lib;

class PortfolioInteractiveShowcase implements Lib\ShortcodeInterface
{
    private $base;

    public function __construct() {
        $this->base = 'qodef_portfolio_interactive_showcase';

        add_action('vc_before_init', array($this, 'vcMap'));

        //Portfolio category filter
        add_filter('vc_autocomplete_qodef_portfolio_interactive_showcase_category_callback', array(&$this, 'portfolioCategoryAutocompleteSuggester',), 10, 1); // Get suggestion(find). Must return an array

        //Portfolio category render
        add_filter('vc_autocomplete_qodef_portfolio_interactive_showcase_category_render', array(&$this, 'portfolioCategoryAutocompleteRender',), 10, 1); // Get suggestion(find). Must return an array

        //Portfolio selected projects filter
        add_filter('vc_autocomplete_qodef_portfolio_interactive_showcase_selected_projects_callback', array(&$this, 'portfolioIdAutocompleteSuggester',), 10, 1); // Get suggestion(find). Must return an array

        //Portfolio selected projects render
        add_filter('vc_autocomplete_qodef_portfolio_interactive_showcase_selected_projects_render', array(&$this, 'portfolioIdAutocompleteRender',), 10, 1); // Render exact portfolio. Must return an array (label,value)
    }

    public function getBase() {
        return $this->base;
    }

    public function vcMap() {
        if (function_exists('vc_map')) {
            vc_map(
                array(
                    'name'     => esc_html__('Portfolio Interactive Showcase', 'aarhus-core'),
                    'base'     => $this->getBase(),
                    'category' => esc_html__('by AARHUS', 'aarhus-core'),
                    'icon'     => 'icon-wpb-portfolio-interactive-showcase extended-custom-icon',
                    'params'   => array(
                        array(
                            'type'        => 'autocomplete',
                            'param_name'  => 'category',
                            'heading'     => esc_html__('One-Category Portfolio List', 'aarhus-core'),
                            'description' => esc_html__('Enter one category slug (leave empty for showing all categories)', 'aarhus-core')
                        ),
                        array(
                            'type'        => 'autocomplete',
                            'param_name'  => 'selected_projects',
                            'heading'     => esc_html__('Show Only Projects with Listed IDs', 'aarhus-core'),
                            'settings'    => array(
                                'multiple'      => true,
                                'sortable'      => true,
                                'unique_values' => true
                            ),
                            'description' => esc_html__('Delimit ID numbers by comma (leave empty for all)', 'aarhus-core')
                        ),
                        array(
                            'type'        => 'dropdown',
                            'param_name'  => 'skin',
                            'heading'     => esc_html__('Link Skin', 'aarhus-core'),
                            'value'       => array(
                                esc_html__('Default', 'aarhus-core') => '',
                                esc_html__('Dark', 'aarhus-core')    => 'dark'
                            ),
                            'save_always' => true
                        ),
                        array(
                            'type'       => 'colorpicker',
                            'param_name' => 'background_color',
                            'heading'    => esc_html__('Background Color', 'aarhus-core')
                        ),
                    )
                )
            );
        }
    }

    public function render($atts, $content = null) {
        $args = array(
            'skin'              => '',
            'background_color'  => '',
            'category'          => '',
            'selected_projects' => '',
        );
        $params = shortcode_atts($args, $atts);

        $query_array = $this->getQueryArray($params);
        $query_results = new \WP_Query($query_array);
        $params['query_results'] = $query_results;

        $params['holder_classes'] = $this->getHolderClasses($params, $args);
        $params['image_holder_styles'] = $this->getImageHolderStyles($params);

        $html = aarhus_core_get_cpt_shortcode_module_template_part('portfolio', 'portfolio-interactive-showcase', 'portfolio-interactive-showcase', '', $params);

        return $html;
    }

    public function getQueryArray($params) {
        $query_array = array(
            'post_status'    => 'publish',
            'post_type'      => 'portfolio-item',
            'posts_per_page' => '-1',
            'orderby'        => 'date',
            'order'          => 'ASC'
        );

        if (!empty($params['category'])) {
            $query_array['portfolio-category'] = $params['category'];
        }

        $project_ids = null;
        if (!empty($params['selected_projects'])) {
            $project_ids = explode(',', $params['selected_projects']);
            $query_array['orderby'] = 'post__in';
            $query_array['post__in'] = $project_ids;
        }

        return $query_array;
    }

    private function getHolderClasses($params, $args) {
        $holderClasses = array();

        $holderClasses[] = !empty($params['skin']) ? 'qodef-pis-skin-' . $params['skin'] : '';

        return implode(' ', $holderClasses);
    }

    private function getImageHolderStyles($params) {
        $styles = array();

        if (!empty($params['background_color'])) {
            $styles[] = 'background-color: ' . $params['background_color'];
        }

        return implode(';', $styles);
    }

    /**
     * Filter portfolio categories
     *
     * @param $query
     *
     * @return array
     */
    public function portfolioCategoryAutocompleteSuggester($query) {
        global $wpdb;
        $post_meta_infos = $wpdb->get_results($wpdb->prepare("SELECT a.slug AS slug, a.name AS portfolio_category_title
					FROM {$wpdb->terms} AS a
					LEFT JOIN ( SELECT term_id, taxonomy  FROM {$wpdb->term_taxonomy} ) AS b ON b.term_id = a.term_id
					WHERE b.taxonomy = 'portfolio-category' AND a.name LIKE '%%%s%%'", stripslashes($query)), ARRAY_A);

        $results = array();
        if (is_array($post_meta_infos) && !empty($post_meta_infos)) {
            foreach ($post_meta_infos as $value) {
                $data = array();
                $data['value'] = $value['slug'];
                $data['label'] = ((strlen($value['portfolio_category_title']) > 0) ? esc_html__('Category', 'aarhus-core') . ': ' . $value['portfolio_category_title'] : '');
                $results[] = $data;
            }
        }

        return $results;
    }

    /**
     * Find portfolio category by slug
     * @since 4.4
     *
     * @param $query
     *
     * @return bool|array
     */
    public function portfolioCategoryAutocompleteRender($query) {
        $query = trim($query['value']); // get value from requested
        if (!empty($query)) {
            // get portfolio category
            $portfolio_category = get_term_by('slug', $query, 'portfolio-category');
            if (is_object($portfolio_category)) {

                $portfolio_category_slug = $portfolio_category->slug;
                $portfolio_category_title = $portfolio_category->name;

                $portfolio_category_title_display = '';
                if (!empty($portfolio_category_title)) {
                    $portfolio_category_title_display = esc_html__('Category', 'aarhus-core') . ': ' . $portfolio_category_title;
                }

                $data = array();
                $data['value'] = $portfolio_category_slug;
                $data['label'] = $portfolio_category_title_display;

                return !empty($data) ? $data : false;
            }

            return false;
        }

        return false;
    }

    /**
     * Filter portfolios by ID or Title
     *
     * @param $query
     *
     * @return array
     */
    public function portfolioIdAutocompleteSuggester($query) {
        global $wpdb;
        $portfolio_id = (int)$query;
        $post_meta_infos = $wpdb->get_results($wpdb->prepare("SELECT ID AS id, post_title AS title
					FROM {$wpdb->posts} 
					WHERE post_type = 'portfolio-item' AND ( ID = '%d' OR post_title LIKE '%%%s%%' )", $portfolio_id > 0 ? $portfolio_id : -1, stripslashes($query), stripslashes($query)), ARRAY_A);

        $results = array();
        if (is_array($post_meta_infos) && !empty($post_meta_infos)) {
            foreach ($post_meta_infos as $value) {
                $data = array();
                $data['value'] = $value['id'];
                $data['label'] = esc_html__('Id', 'aarhus-core') . ': ' . $value['id'] . ((strlen($value['title']) > 0) ? ' - ' . esc_html__('Title', 'aarhus-core') . ': ' . $value['title'] : '');
                $results[] = $data;
            }
        }

        return $results;
    }

    /**
     * Find portfolio by id
     * @since 4.4
     *
     * @param $query
     *
     * @return bool|array
     */
    public function portfolioIdAutocompleteRender($query) {
        $query = trim($query['value']); // get value from requested
        if (!empty($query)) {
            // get portfolio
            $portfolio = get_post((int)$query);
            if (!is_wp_error($portfolio)) {

                $portfolio_id = $portfolio->ID;
                $portfolio_title = $portfolio->post_title;

                $portfolio_title_display = '';
                if (!empty($portfolio_title)) {
                    $portfolio_title_display = ' - ' . esc_html__('Title', 'aarhus-core') . ': ' . $portfolio_title;
                }

                $portfolio_id_display = esc_html__('Id', 'aarhus-core') . ': ' . $portfolio_id;

                $data = array();
                $data['value'] = $portfolio_id;
                $data['label'] = $portfolio_id_display . $portfolio_title_display;

                return !empty($data) ? $data : false;
            }

            return false;
        }

        return false;
    }
}