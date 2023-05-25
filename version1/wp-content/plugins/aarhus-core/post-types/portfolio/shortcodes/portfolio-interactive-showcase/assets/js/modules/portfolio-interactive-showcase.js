(function($) {
    'use strict';

    var portfolioInteractiveShowcase = {};
    qodef.modules.portfolioInteractiveShowcase = portfolioInteractiveShowcase;

    portfolioInteractiveShowcase.qodefInitPortfolioInteractiveShowcase = qodefInitPortfolioInteractiveShowcase;
    portfolioInteractiveShowcase.qodefOnDocumentReady = qodefOnDocumentReady;

    $(document).ready(qodefOnDocumentReady);

    /*
     All functions to be called on $(document).ready() should be in this function
     */
    function qodefOnDocumentReady() {
        qodefInitPortfolioInteractiveShowcase();
    }

    /**
     * Init item showcase shortcode
     */
    function qodefInitPortfolioInteractiveShowcase() {
        var interactiveLinkShowcase = $('.qodef-pis-holder');
	
	    if (interactiveLinkShowcase.length) {
		    interactiveLinkShowcase.each(function(){
			    var thisInteractiveLinkShowcase = $(this),
				    singleImage = thisInteractiveLinkShowcase.find('.qodef-pis-item-image'),
				    singleLink  = thisInteractiveLinkShowcase.find('.qodef-pis-item-link'),
			        triggerItem = thisInteractiveLinkShowcase.hasClass('qodef-pis-type-slider') ? singleLink : singleLink.children(),
				    firstActiveItem = thisInteractiveLinkShowcase.hasClass('qodef-pis-type-slider') ? 0 : 2;
			    
			    singleImage.eq(firstActiveItem).addClass('qodef-active');
			    thisInteractiveLinkShowcase.find('.qodef-pis-item-link[data-index="'+firstActiveItem+'"]').addClass('qodef-active');
			
			    if (thisInteractiveLinkShowcase.hasClass('qodef-pis-type-slider')) {
			    	var swiperInstance = thisInteractiveLinkShowcase.find('.swiper-container'),
                		swiperSlider = new Swiper (swiperInstance, {
                			loop: true,
                			centeredSlides: true,
							slidesPerView: 'auto',
							slideToClickedSlide: true,
                			speed: 600,
                			mousewheel: true,
                			init: false
			    		});

			    	swiperSlider.on('init', function(){
			    		interactiveLinkShowcase.addClass('qodef-initialized');

			    		thisInteractiveLinkShowcase.on('click', function(e) {
			    			var activeSlide = thisInteractiveLinkShowcase.find('.swiper-slide-active');

			    			if (e.pageX < activeSlide.offset().left) {
								activeSlide.e.preventDefault();
			    				e.stopImmediatePropagation();
			    				swiperSlider.slidePrev();
			    				return false;
			    			}

			    			if (e.pageX > activeSlide.offset().left + activeSlide.outerWidth()) {
								activeSlide.e.preventDefault();
			    				e.stopImmediatePropagation();
			    				swiperSlider.slideNext();
			    				return false;
			    			}
			    		});
			    	});

                	swiperSlider.on('slideChangeTransitionStart', function(){
				    	thisInteractiveLinkShowcase.find('.swiper-slide').removeClass('qodef-active');
				    	singleImage.removeClass('qodef-active');
				    	var activeIndex = thisInteractiveLinkShowcase.find('.swiper-slide-active').addClass('qodef-active').data('index');
				    	singleImage.filter('[data-index='+activeIndex+']').addClass('qodef-active');
				    });

				    thisInteractiveLinkShowcase.waitForImages(function(){
                    	swiperSlider.init();
				    });
			    }
		    });
	    }
	}

})(jQuery);