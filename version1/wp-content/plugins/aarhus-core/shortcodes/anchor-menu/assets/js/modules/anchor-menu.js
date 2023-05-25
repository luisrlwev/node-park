(function ($) {
	'use strict';

	var anchorMenu = {};
	qodef.modules.anchorMenu = anchorMenu;

    anchorMenu.qodefInitAnchorMenu = qodefInitAnchorMenu;

    anchorMenu.qodefOnWindowLoad = qodefOnWindowLoad;

	$(window).load(qodefOnWindowLoad);

	/*
	 All functions to be called on $(window).load() should be in this function
	 */
	function qodefOnWindowLoad() {
        qodefInitAnchorMenu();
	}

	/*
	 **	Custom Font resizing style
	 */
	function qodefInitAnchorMenu() {
        var anchorMenu = $('.qodef-anchor-menu-outer');

        if (anchorMenu.length){
            anchorMenu.remove();
            $('.qodef-content-inner').append(anchorMenu.css('opacity',1));
        }
	}

})(jQuery);