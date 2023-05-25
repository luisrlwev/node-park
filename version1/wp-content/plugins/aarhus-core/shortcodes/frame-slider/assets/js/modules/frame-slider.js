(function($) {
    'use strict';

    var frameSlider = {};
    qodef.modules.frameSlider = frameSlider;

    frameSlider.qodefInitImageGalleryNavigation = qodefInitFrameSliderNavigation;

    frameSlider.qodefOnWindowLoad = qodefOnWindowLoad;
    frameSlider.qodefOnWindowResize = qodefOnWindowResize;

    $(window).load(qodefOnWindowLoad);
    $(window).resize(qodefOnWindowResize);


    /*
     All functions to be called on $(window).load() should be in this function
     */
    function qodefOnWindowLoad() {
        qodefInitFrameSliderNavigation();
    }

    /*
     All functions to be called on $(window).resize() should be in this function
     */
    function qodefOnWindowResize() {
        qodefInitFrameSliderNavigation();
    }

    /**
     * Frame Slider Navigation
     *
     */
    function qodefInitFrameSliderNavigation() {
        var frameSliderHolder = $('.qodef-frame-slider-holder');

        if (frameSliderHolder.length) {
            frameSliderHolder.each(function() {
                var thisFrameSliderHolder = $(this),
                    image = thisFrameSliderHolder.find('.qodef-fs-phone img'),
                    item = thisFrameSliderHolder.find('.owl-item'),
                    itemPadding = parseInt(item.css('padding-top')),
                    imageHeight = image.eq(0).height(),
                    pagination = thisFrameSliderHolder.find('.owl-dots'),
                    paginationHeight = pagination.outerHeight(),
                    topOffset = paginationHeight - itemPadding;

                    pagination.css('width', imageHeight + 'px');
                    pagination.css('top', imageHeight - topOffset - 33 + 'px' );
            });
        }
    }

})(jQuery);
