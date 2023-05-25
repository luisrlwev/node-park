<?php

if ( ! function_exists( 'aarhus_select_add_ion_icon_pack' ) ) {
	function aarhus_select_add_ion_icon_pack( $iconCollections ) {
		$iconCollections['ion_icons'] = new AarhusSelectClassIonIcons( 'Ion Icons', 'ion_icon' );
		
		return $iconCollections;
	}
	
	add_filter( 'aarhus_select_filter_add_icon_pack_into_collection', 'aarhus_select_add_ion_icon_pack' );
}

if ( ! function_exists( 'aarhus_select_add_ion_icon_pack_option' ) ) {
	function aarhus_select_add_ion_icon_pack_option( $options ) {
		$options['ion_icons'] = esc_html__( 'Ion Icons', 'aarhus' );
		
		return $options;
	}
	
	add_filter( 'aarhus_select_filter_add_icon_pack_into_options', 'aarhus_select_add_ion_icon_pack_option' );
	add_filter( 'aarhus_select_filter_add_icon_pack_into_social_options', 'aarhus_select_add_ion_icon_pack_option' );
}

class AarhusSelectClassIonIcons implements iAarhusSelectInterfaceIconCollection {
	public $icons;
	public $socialIcons;
    public $title;
	public $param;
	public $styleUrl;

	function __construct($title_label = "", $param = "") {
		$this->icons = array();
		$this->socialIcons = array();
		$this->title = $title_label;
		$this->param = $param;
		$this->setIconsArray();
		$this->setSocialIconsArray();
		$this->styleUrl = SELECT_FRAMEWORK_ICONS_ROOT . '/ion-icons/css/ionicons.min.css';
	}


    private function setIconsArray() {
        $this->icons = $this->getNewIconsArray();
    }

    /**
     * Checks if icon collection has social icons
     * @return mixed
     */
    public function hasSocialIcons() {
        return true;
    }

    public function setSocialIconsArray() {
        $this->socialIcons = $this->getNewIconsArray( true );
    }

    public function getIconsArray() {
        return $this->icons;
    }

    public function getSocialIconsArray() {
        return $this->socialIcons;
    }

    public function getSocialIconsArrayVC() {
        return $this->getSocialIconsArray();
    }

    /*
     * Function will return new Ion icons array
     *
     * @params boolean $logoIcons - set true to get logo icons array
     */
    private function getNewIconsArray( $logoIcons = false ) {
        require_once( ABSPATH . 'wp-admin/includes/file.php' );

        global $wp_filesystem;
        WP_Filesystem();

        $iconsArray = array();
        $icons      = json_decode( $wp_filesystem->get_contents( SELECT_FRAMEWORK_ICONS_ROOT_DIR . '/ion-icons/icons.json' ) );

        if ( ! empty( $icons ) ) {
            $iconsArray[''] = '';
            foreach ( $icons as $key => $value ) {
                foreach ( $value as $icon_array ) {
                    $logo_icons_pattern = preg_match( '/(logo-)\w+/', $icon_array->icons[0], $matches);

                    if($logoIcons) {
                        if($logo_icons_pattern) {
                            $iconLabel1 = ucwords(str_replace('-', ' ', $matches[0]));
                            $iconsArray[$iconLabel1] = 'ion ion-' . $matches[0];
                        }
                    } else {
                        if($logo_icons_pattern == false) {
                            $iconLabel1 = ucwords(str_replace('-', ' ', $icon_array->icons[0]));
                            $iconsArray[$iconLabel1] = 'ion ion-' . $icon_array->icons[0];

                        }
                        if ( count($icon_array->icons) == 2) {
                            $iconLabel2 = ucwords(str_replace('-', ' ', $icon_array->icons[1]));
                            $iconsArray[$iconLabel2] = 'ion ion-' . $icon_array->icons[1];
                        }
                    }

                }
            }
        }

        return $iconsArray;
    }

	public function render($icon, $params = array()) {
		$html = '';
		extract($params);
		$iconAttributesString = '';
		$iconClass = '';
		if (isset($icon_attributes) && count($icon_attributes)) {
			foreach ($icon_attributes as $icon_attr_name => $icon_attr_val) {
				if ($icon_attr_name === 'class') {
					$iconClass = $icon_attr_val;
					unset($icon_attributes[$icon_attr_name]);
				} else {
					$iconAttributesString .= $icon_attr_name . '="' . $icon_attr_val . '" ';
				}
			}
		}

		if (isset($before_icon) && $before_icon !== '') {
			$beforeIconAttrString = '';
			if (isset($before_icon_attributes) && count($before_icon_attributes)) {
				foreach ($before_icon_attributes as $before_icon_attr_name => $before_icon_attr_val) {
					$beforeIconAttrString .= $before_icon_attr_name . '="' . $before_icon_attr_val . '" ';
				}
			}

			$html .= '<' . $before_icon . ' ' . $beforeIconAttrString . '>';
		}

		$html .= '<i class="qodef-icon-ion-icon ' . $icon . ' ' . $iconClass . '" ' . $iconAttributesString . '></i>';

		if (isset($before_icon) && $before_icon !== '') {
			$html .= '</' . $before_icon . '>';
		}

		return $html;
	}

	public function getSearchIcon() {

		return $this->render('ion ion-md-search');
	}

	public function getSearchClose() {

		return $this->render('ion ion-md-close');
	}

	public function getDropdownCartIcon() {

		return $this->render('ion ion-md-cart');
	}

	public function getMenuIcon() {

		return $this->render('ion ion-ios-menu');
	}

	public function getMenuCloseIcon() {

		return $this->render('ion ion-md-close');
	}

	public function getBackToTopIcon() {

		return $this->render('ion ion-md-arrow-up');
	}

	public function getMobileMenuIcon() {

		return $this->render('ion ion-ios-menu');
	}

	public function getQuoteIcon() {

		return $this->render('ion ion-md-quote');
	}

	public function getFacebookIcon() {

		return 'ion ion-logo-facebook';
	}

	public function getTwitterIcon() {

		return 'ion ion-logo-twitter';
	}

	public function getGooglePlusIcon() {

		return 'ion ion-logo-googleplus';
	}

	public function getLinkedInIcon() {

		return 'ion ion-logo-linkedin';
	}

	public function getTumblrIcon() {

		return 'ion ion-logo-tumblr';
	}

	public function getPinterestIcon() {

		return 'ion ion-logo-pinterest';
	}

	public function getVKIcon() {

		return 'ion ion-logo-vk';
	}

}