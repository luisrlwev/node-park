(function($) {
    "use strict";

    var imageWIthNumberSC = {};
    qodef.modules.imageWIthNumberSC = imageWIthNumberSC;

    imageWIthNumberSC.qodefOnWindowLoad = qodefOnWindowLoad;

    $(window).load(qodefOnWindowLoad);

    /*
     All functions to be called on $(window).load() should be in this function
     */
    function qodefOnWindowLoad() {
        qodefInitTouchHover();
    }

    /**
     * Function that add hover functionality on iOS devices
     */
    function qodefInitTouchHover() {
        var item = $('.qodef-image-with-number-holder');

        item.each(function() {
            $(this).on('touchstart touchend',function() {
                $(this).toggleClass('mhover');
            });
        });
    }

})(jQuery);