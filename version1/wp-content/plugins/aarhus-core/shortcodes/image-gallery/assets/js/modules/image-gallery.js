(function($) {
	'use strict';
	
	var imageGallery = {};
	qodef.modules.imageGallery = imageGallery;

    imageGallery.qodefInitImageGalleryNavigation = qodefInitImageGalleryNavigation;

    imageGallery.qodefOnWindowLoad = qodefOnWindowLoad;
    imageGallery.qodefOnWindowResize = qodefOnWindowResize;

    $(window).load(qodefOnWindowLoad);
    $(window).resize(qodefOnWindowResize);


	/*
	 All functions to be called on $(window).load() should be in this function
	 */
    function qodefOnWindowLoad() {
        qodefInitImageGalleryNavigation();
    }

	/*
	 All functions to be called on $(window).resize() should be in this function
	 */
    function qodefOnWindowResize() {
        qodefInitImageGalleryNavigation();
	}
	
	/**
	 * Image Gallery Navigation
	 *
	 */
	function qodefInitImageGalleryNavigation() {
		var imageGalleryHolder = $('.qodef-image-gallery');
		
		if (imageGalleryHolder.length) {
            imageGalleryHolder.each(function() {
				var thisImageGalleryHolder = $(this),
					image = thisImageGalleryHolder.find('.qodef-ig-image img'),
                    item = thisImageGalleryHolder.find('.owl-item'),
                    itemPadding = parseInt(item.css('padding-top')),
					imageHeight = image.eq(0).height(),
					pagination = thisImageGalleryHolder.find('.owl-dots'),
                	paginationHeight = pagination.outerHeight(),
					topOffset = paginationHeight - itemPadding - 10;

                if (thisImageGalleryHolder.hasClass('qodef-pagination-position-left')) {
                    pagination.css('width', imageHeight + 'px');
                    pagination.css('top', imageHeight - topOffset + 'px' );
				}
			});
		}
	}
	
})(jQuery);