(function ($) {
    "use strict";

    window.qodef = {};
    qodef.modules = {};

    qodef.scroll = 0;
    qodef.window = $(window);
    qodef.document = $(document);
    qodef.windowWidth = $(window).width();
    qodef.windowHeight = $(window).height();
    qodef.body = $('body');
    qodef.html = $('html, body');
    qodef.htmlEl = $('html');
    qodef.menuDropdownHeightSet = false;
    qodef.defaultHeaderStyle = '';
    qodef.minVideoWidth = 1500;
    qodef.videoWidthOriginal = 1280;
    qodef.videoHeightOriginal = 720;
    qodef.videoRatio = 1.61;

    qodef.qodefOnDocumentReady = qodefOnDocumentReady;
    qodef.qodefOnWindowLoad = qodefOnWindowLoad;
    qodef.qodefOnWindowResize = qodefOnWindowResize;
    qodef.qodefOnWindowScroll = qodefOnWindowScroll;

    $(document).ready(qodefOnDocumentReady);
    $(window).load(qodefOnWindowLoad);
    $(window).resize(qodefOnWindowResize);
    $(window).scroll(qodefOnWindowScroll);

    /* 
     All functions to be called on $(document).ready() should be in this function
     */
    function qodefOnDocumentReady() {
        qodef.scroll = $(window).scrollTop();

        //set global variable for header style which we will use in various functions
        if (qodef.body.hasClass('qodef-dark-header')) {
            qodef.defaultHeaderStyle = 'qodef-dark-header';
        }
        if (qodef.body.hasClass('qodef-light-header')) {
            qodef.defaultHeaderStyle = 'qodef-light-header';
        }
    }

    /* 
     All functions to be called on $(window).load() should be in this function
     */
    function qodefOnWindowLoad() {

    }

    /* 
     All functions to be called on $(window).resize() should be in this function
     */
    function qodefOnWindowResize() {
        qodef.windowWidth = $(window).width();
        qodef.windowHeight = $(window).height();
    }

    /* 
     All functions to be called on $(window).scroll() should be in this function
     */
    function qodefOnWindowScroll() {
        qodef.scroll = $(window).scrollTop();
    }

    //set boxed layout width variable for various calculations

    switch (true) {
        case qodef.body.hasClass('qodef-grid-1300'):
            qodef.boxedLayoutWidth = 1350;
            //qodef.gridWidth = 1300;
            break;
        case qodef.body.hasClass('qodef-grid-1200'):
            qodef.boxedLayoutWidth = 1250;
            //qodef.gridWidth = 1200;
            break;
        case qodef.body.hasClass('qodef-grid-1000'):
            qodef.boxedLayoutWidth = 1050;
            //qodef.gridWidth = 1000;
            break;
        case qodef.body.hasClass('qodef-grid-800'):
            qodef.boxedLayoutWidth = 850;
            //qodef.gridWidth = 800;
            break;
        default :
            qodef.boxedLayoutWidth = 1150;
            //qodef.gridWidth = 1100;
            break;
    }

    qodef.gridWidth = function () {
        var gridWidth = 1100;

        switch (true) {
            case qodef.body.hasClass('qodef-grid-1300') && qodef.windowWidth > 1400:
                gridWidth = 1300;
                break;
            case qodef.body.hasClass('qodef-grid-1200') && qodef.windowWidth > 1300:
                gridWidth = 1200;
                break;
            case qodef.body.hasClass('qodef-grid-1000') && qodef.windowWidth > 1200:
                gridWidth = 1200;
                break;
            case qodef.body.hasClass('qodef-grid-800') && qodef.windowWidth > 1024:
                gridWidth = 800;
                break;
            default :
                break;
        }

        return gridWidth;
    };

    qodef.transitionEnd = (function () {
        var el = document.createElement('transitionDetector'),
            transEndEventNames = {
                'WebkitTransition' : 'webkitTransitionEnd',// Saf 6, Android Browser
                'MozTransition'    : 'transitionend',      // only for FF < 15
                'transition'       : 'transitionend'       // IE10, Opera, Chrome, FF 15+, Saf 7+
            };

        for(var t in transEndEventNames){
            if( el.style[t] !== undefined ){
                return transEndEventNames[t];
            }
        }
    })();

    qodef.animationEnd = (function() {
        var el = document.createElement("animationDetector");

        var animations = {
            "animation"      : "animationend",
            "OAnimation"     : "oAnimationEnd",
            "MozAnimation"   : "animationend",
            "WebkitAnimation": "webkitAnimationEnd"
        };

        for (var t in animations){
            if (el.style[t] !== undefined){
              return animations[t];
            }
        }
    })();
    
})(jQuery);
(function($) {
	"use strict";

    var common = {};
    qodef.modules.common = common;

    common.qodefFluidVideo = qodefFluidVideo;
    common.qodefEnableScroll = qodefEnableScroll;
    common.qodefDisableScroll = qodefDisableScroll;
    common.qodefOwlSlider = qodefOwlSlider;
    common.qodefInitParallax = qodefInitParallax;
    common.qodefInitSelfHostedVideoPlayer = qodefInitSelfHostedVideoPlayer;
    common.qodefSelfHostedVideoSize = qodefSelfHostedVideoSize;
    common.qodefPrettyPhoto = qodefPrettyPhoto;
	common.qodefStickySidebarWidget = qodefStickySidebarWidget;
    common.getLoadMoreData = getLoadMoreData;
    common.setLoadMoreAjaxData = setLoadMoreAjaxData;
    common.setFixedImageProportionSize = setFixedImageProportionSize;
    common.qodefInitPerfectScrollbar = qodefInitPerfectScrollbar;

    common.qodefOnDocumentReady = qodefOnDocumentReady;
    common.qodefOnWindowLoad = qodefOnWindowLoad;
    common.qodefOnWindowResize = qodefOnWindowResize;

    $(document).ready(qodefOnDocumentReady);
    $(window).load(qodefOnWindowLoad);
    $(window).resize(qodefOnWindowResize);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function qodefOnDocumentReady() {
	    qodefIconWithHover().init();
	    qodefDisableSmoothScrollForMac();
	    qodefInitBackToTop();
        qodefChangeClassBackToTop();
	    qodefBackButtonShowHide();
	    qodefInitSelfHostedVideoPlayer();
	    qodefSelfHostedVideoSize();
	    qodefFluidVideo();
	    qodefOwlSlider();
	    qodefPreloadBackgrounds();
	    qodefPrettyPhoto();
	    qodefSearchPostTypeWidget();
	    qodefDashboardForm();
		qodefInitGridMasonryListLayout();
        qodefSmoothTransition();
		qodefRowBackgroundText();
		qodefScrollToContent();
    }

    /* 
        All functions to be called on $(window).load() should be in this function
    */
    function qodefOnWindowLoad() {
        qodefInitAnchor().init();
	    qodefInitParallax();
		qodefStickySidebarWidget().init();
		qodefParallaxTeam();
    }

    /* 
        All functions to be called on $(window).resize() should be in this function
    */
    function qodefOnWindowResize() {
	    qodefInitGridMasonryListLayout();
    	qodefSelfHostedVideoSize();
    }
	
	/*
	 ** Disable smooth scroll for mac if smooth scroll is enabled
	 */
	function qodefDisableSmoothScrollForMac() {
		var os = navigator.appVersion.toLowerCase();
		
		if (os.indexOf('mac') > -1 && qodef.body.hasClass('qodef-smooth-scroll')) {
			qodef.body.removeClass('qodef-smooth-scroll');
		}
	}
	
	function qodefDisableScroll() {
		if (window.addEventListener) {
			window.addEventListener('DOMMouseScroll', qodefWheel, false);
		}
		
		window.onmousewheel = document.onmousewheel = qodefWheel;
		document.onkeydown = qodefKeydown;
	}
	
	function qodefEnableScroll() {
		if (window.removeEventListener) {
			window.removeEventListener('DOMMouseScroll', qodefWheel, false);
		}
		
		window.onmousewheel = document.onmousewheel = document.onkeydown = null;
	}
	
	function qodefWheel(e) {
		qodefPreventDefaultValue(e);
	}
	
	function qodefKeydown(e) {
		var keys = [37, 38, 39, 40];
		
		for (var i = keys.length; i--;) {
			if (e.keyCode === keys[i]) {
				qodefPreventDefaultValue(e);
				return;
			}
		}
	}
	
	function qodefPreventDefaultValue(e) {
		e = e || window.event;
		if (e.preventDefault) {
			e.preventDefault();
		}
		e.returnValue = false;
	}
	
	/*
	 **	Anchor functionality
	 */
	var qodefInitAnchor = function() {
		/**
		 * Set active state on clicked anchor
		 * @param anchor, clicked anchor
		 */
		var setActiveState = function(anchor){
			var headers = $('.qodef-main-menu, .qodef-mobile-nav, .qodef-fullscreen-menu, .qodef-vertical-menu, .qodef-anchor-menu');
			
			headers.each(function(){
				var currentHeader = $(this);
				
				if (anchor.parents(currentHeader).length) {
					currentHeader.find('.qodef-active-item').removeClass('qodef-active-item');
					anchor.parent().addClass('qodef-active-item');
					
					currentHeader.find('a').removeClass('current');
					anchor.addClass('current');
				}
			});
		};
		
		/**
		 * Check anchor active state on scroll
		 */
		var checkActiveStateOnScroll = function(){
			var anchorData = $('[data-qodef-anchor]'),
				anchorElement,
				siteURL = window.location.href.split('#')[0];
			
			if (siteURL.substr(-1) !== '/') {
				siteURL += '/';
			}
			
			anchorData.waypoint( function(direction) {
				if(direction === 'down') {
					if ($(this.element).length > 0) {
						anchorElement = $(this.element).data("qodef-anchor");
					} else {
						anchorElement = $(this).data("qodef-anchor");
					}
				
					setActiveState($("a[href='"+siteURL+"#"+anchorElement+"']"));
				}
			}, { offset: '50%' });
			
			anchorData.waypoint( function(direction) {
				if(direction === 'up') {
					if ($(this.element).length > 0) {
						anchorElement = $(this.element).data("qodef-anchor");
					} else {
						anchorElement = $(this).data("qodef-anchor");
					}
					
					setActiveState($("a[href='"+siteURL+"#"+anchorElement+"']"));
				}
			}, { offset: function(){
				return -($(this.element).outerHeight() - 150);
			} });
		};
		
		/**
		 * Check anchor active state on load
		 */
		var checkActiveStateOnLoad = function(){
			var hash = window.location.hash.split('#')[1];
			
			if(hash !== "" && $('[data-qodef-anchor="'+hash+'"]').length > 0){
				anchorClickOnLoad(hash);
			}
		};
		
		/**
		 * Handle anchor on load
		 */
		var anchorClickOnLoad = function ($this) {
			var scrollAmount,
				anchor = $('.qodef-main-menu a, .qodef-mobile-nav a, .qodef-fullscreen-menu a, .qodef-vertical-menu a, .qodef-anchor-menu a'),
				hash = $this,
				anchorData = hash !== '' ? $('[data-qodef-anchor="' + hash + '"]') : '';
			
			if (hash !== '' && anchorData.length > 0) {
				var anchoredElementOffset = anchorData.offset().top;
				scrollAmount = anchoredElementOffset - headerHeightToSubtract(anchoredElementOffset) - qodefGlobalVars.vars.qodefAddForAdminBar;
				
				if(anchor.length) {
					anchor.each(function(){
						var thisAnchor = $(this);
						
						if(thisAnchor.attr('href').indexOf(hash) > -1) {
							setActiveState(thisAnchor);
						}
					});
				}
				
				qodef.html.stop().animate({
					scrollTop: Math.round(scrollAmount)
				}, 1000, function () {
					//change hash tag in url
					if (history.pushState) {
						history.pushState(null, '', '#' + hash);
					}
				});
				
				return false;
			}
		};
		
		/**
		 * Calculate header height to be substract from scroll amount
		 * @param anchoredElementOffset, anchorded element offset
		 */
		var headerHeightToSubtract = function (anchoredElementOffset) {
			
			if (qodef.modules.stickyHeader.behaviour === 'qodef-sticky-header-on-scroll-down-up') {
				qodef.modules.stickyHeader.isStickyVisible = (anchoredElementOffset > qodef.modules.header.stickyAppearAmount);
			}
			
			if (qodef.modules.stickyHeader.behaviour === 'qodef-sticky-header-on-scroll-up') {
				if ((anchoredElementOffset > qodef.scroll)) {
					qodef.modules.stickyHeader.isStickyVisible = false;
				}
			}
			
			var headerHeight = qodef.modules.stickyHeader.isStickyVisible ? qodefGlobalVars.vars.qodefStickyHeaderTransparencyHeight : qodefPerPageVars.vars.qodefHeaderTransparencyHeight;
			
			if (qodef.windowWidth < 1025) {
				headerHeight = 0;
			}
			
			return headerHeight;
		};
		
		/**
		 * Handle anchor click
		 */
		var anchorClick = function () {
			qodef.document.on("click", ".qodef-main-menu a, .qodef-fullscreen-menu a, .qodef-btn, .qodef-anchor, .qodef-mobile-nav a, .qodef-vertical-menu a, .qodef-anchor-menu a", function () {
				var scrollAmount,
					anchor = $(this),
					hash = anchor.prop("hash").split('#')[1],
					anchorData = hash !== '' ? $('[data-qodef-anchor="' + hash + '"]') : '';
				
				if (hash !== '' && anchorData.length > 0) {
					var anchoredElementOffset = anchorData.offset().top;
					scrollAmount = anchoredElementOffset - headerHeightToSubtract(anchoredElementOffset) - qodefGlobalVars.vars.qodefAddForAdminBar;
					
					setActiveState(anchor);
					
					qodef.html.stop().animate({
						scrollTop: Math.round(scrollAmount)
					}, 1000, function () {
						//change hash tag in url
						if (history.pushState) {
							history.pushState(null, '', '#' + hash);
						}
					});
					
					return false;
				}
			});
		};
		
		return {
			init: function () {
				if ($('[data-qodef-anchor]').length) {
					anchorClick();
					checkActiveStateOnScroll();
					
					$(window).load(function () {
						checkActiveStateOnLoad();
					});
				}
			}
		};
	};
	
	function qodefInitBackToTop() {
		var backToTopButton = $('#qodef-back-to-top');
		backToTopButton.on('click', function (e) {
			e.preventDefault();
			qodef.html.animate({scrollTop: 0}, qodef.window.scrollTop() / 3, 'linear');
		});
	}

    function qodefChangeClassBackToTop() {
        var backToTop = $('#qodef-back-to-top'),
            footerHolder = $('.qodef-page-footer'),
            footerLike = $('.qodef-page-like-footer'),
            footerFixed = $('.qodef-page-footer').hasClass('qodef-footer-uncover');

        if(footerLike.length) {
            footerHolder = footerLike;
        }

        if(footerHolder.length) {

            $(window).scroll(function () {
                var scrollTop = $(this).scrollTop();

                if (footerFixed) {
                    var footerHeight = footerHolder.height();

                    if (scrollTop + $(window).height() > $(document).height() - (footerHeight + 80)) { // possible mistake
                        backToTop.addClass('qodef-back-to-top-light');
                    } else {
                        backToTop.removeClass('qodef-back-to-top-light');
                    }
                } else {
                    var footerPosition = footerHolder.offset().top;

                    if (scrollTop + $(window).height() > (footerPosition + 80)) {
                        backToTop.addClass('qodef-back-to-top-light');
                    } else {
                        backToTop.removeClass('qodef-back-to-top-light');
                    }
                }

            });
        }

    }
	
	function qodefBackButtonShowHide() {
		qodef.window.scroll(function () {
			var b = $(this).scrollTop(),
				c = $(this).height(),
				d;
			
			if (b > 0) {
				d = b + c / 2;
			} else {
				d = 1;
			}
			
			if (d < 1e3) {
				qodefToTopButton('off');
			} else {
				qodefToTopButton('on');
			}
		});
	}
	
	function qodefToTopButton(a) {
		var b = $("#qodef-back-to-top");
		b.removeClass('off on');
		if (a === 'on') {
			b.addClass('on');
		} else {
			b.addClass('off');
		}
	}
	
	function qodefInitSelfHostedVideoPlayer() {
		var players = $('.qodef-self-hosted-video');
		
		if (players.length) {
			players.mediaelementplayer({
				audioWidth: '100%'
			});
		}
	}
	
	function qodefSelfHostedVideoSize(){
		var selfVideoHolder = $('.qodef-self-hosted-video-holder .qodef-video-wrap');
		
		if(selfVideoHolder.length) {
			selfVideoHolder.each(function(){
				var thisVideo = $(this),
					videoWidth = thisVideo.closest('.qodef-self-hosted-video-holder').outerWidth(),
					videoHeight = videoWidth / qodef.videoRatio;
				
				if(navigator.userAgent.match(/(Android|iPod|iPhone|iPad|IEMobile|Opera Mini)/)){
					thisVideo.parent().width(videoWidth);
					thisVideo.parent().height(videoHeight);
				}
				
				thisVideo.width(videoWidth);
				thisVideo.height(videoHeight);
				
				thisVideo.find('video, .mejs-overlay, .mejs-poster').width(videoWidth);
				thisVideo.find('video, .mejs-overlay, .mejs-poster').height(videoHeight);
			});
		}
	}

	/*
    * Slide to content on scroll - one scroll to page content
    */
   function qodefScrollToContent() {
		var revSliderLanding = $(".qodef-rev-slider-landing");

		if (revSliderLanding.length && !qodef.htmlEl.hasClass('touch')) {
			var sliderHolderHeight = revSliderLanding.height(),
				sliderHolderOffset = revSliderLanding.offset().top,
				sliderArea = sliderHolderHeight - sliderHolderOffset,
				revSlider = revSliderLanding.find('.rev_slider'),
				pageJump = false,
				normalScroll = true,
				set = false;

			var qodefScrollHandler = function() {
				if  ($(window).scrollTop() < sliderArea) {
					normalScroll = false;
				}

				function qodefScrollTo() {
					pageJump = true;
					$('html, body').animate({
						scrollTop: sliderArea
					}, 1000, 'easeInOutQuint', function() {
						pageJump = false;
						normalScroll = true;
					});
				}

				window.addEventListener('wheel', function(event) {
					var scroll = event.deltaY,
						scrollingForward = false,
						reInitOneScroll = false;

					if (scroll > 0) {
						scrollingForward = true;
					} else {
						scrollingForward = false;
					}

					if ($(window).scrollTop() - sliderHolderOffset <=  Math.round(sliderHolderHeight * 0.5)) {
						reInitOneScroll = true;
					}

					if (!pageJump && !normalScroll) {
						if (scrollingForward && ($(window).scrollTop() < sliderArea)) {
							event.preventDefault();
							qodefScrollTo();
						}
					} else {
						if (!normalScroll) {
							event.preventDefault();
						}

						if (normalScroll && !scrollingForward && reInitOneScroll) {
							pageJump = false;
							normalScroll = false;
							event.preventDefault();
						}
					}
				}, {passive: false});

				//scrollbar click
				$(document).on('mousedown', function(event){
					if( $(window).outerWidth() <= event.pageX ){
						if ($(window).scrollTop() == sliderHolderOffset) {
							event.preventDefault();
							qodefScrollTo();
						}
					}
				});
			}

			//prevent mousewheel scroll
			window.addEventListener('wheel', function (event) {
				if (!set) {
					event.preventDefault();
				}
			});

			//prevent scrollbar scroll
			window.addEventListener('scroll', function () {
				if (!set) {
					$(window).scrollTop(sliderHolderOffset);
				}
			})  

			//init
			if (revSlider.length) {
				revSlider.on('revolution.slide.onchange', function(e, data) {
					set = true;
					qodefScrollHandler();
				});
			} else {
				$(window).load(function(){
					set = true;
					qodefScrollHandler();
				});   
			}
		}
	}
	
	function qodefFluidVideo() {
        fluidvids.init({
			selector: ['iframe'],
			players: ['www.youtube.com', 'player.vimeo.com']
		});
	}
	
	function qodefSmoothTransition() {

		if (qodef.body.hasClass('qodef-smooth-page-transitions')) {

			//check for preload animation
			if (qodef.body.hasClass('qodef-smooth-page-transitions-preloader')) {
				var loader = $('body > .qodef-smooth-transition-loader.qodef-mimic-ajax'),
					mainRevHolder = $('#qodef-main-rev-holder');

				/**
				 * Loader Fade Out function
				 * 
				 * @param {number} speed - fade out duration
				 * @param {number} delay - fade out delay
				 * @param {string} easing - fade out easing function
				 */
				var fadeOutLoader = function(speed, delay, easing) {
					speed = speed ? speed : 600;
					delay = delay ? delay : 0;
					easing = easing ? easing : 'easeOutSine';

					loader.delay(delay).fadeOut(speed, easing);
					$(window).on('pageshow', function (event) {
						if (event.originalEvent.persisted) {
							loader.fadeOut(speed, easing);
						}
					});
				};
				
				if (mainRevHolder.length) {
					mainRevHolder.find('.rev_slider').on('revolution.slide.onloaded', function() {
						fadeOutLoader();
					});
				} else {
					$(window).on('load', function() {
						fadeOutLoader();
					});
				}
			}

			//check for fade out animation
			if (qodef.body.hasClass('qodef-smooth-page-transitions-fadeout')) {
				var linkItem = $('a');
				
				linkItem.on('click', function (e) {
					var a = $(this);

					if ((a.parents('.qodef-shopping-cart-dropdown').length || a.parent('.product-remove').length) && a.hasClass('remove')) {
						return;
					}

					if (
						e.which === 1 && // check if the left mouse button has been pressed
						a.attr('href').indexOf(window.location.host) >= 0 && // check if the link is to the same domain
						(typeof a.data('rel') === 'undefined') && //Not pretty photo link
						(typeof a.attr('rel') === 'undefined') && //Not VC pretty photo link
                        (!a.hasClass('lightbox-active')) && //Not lightbox plugin active
						(typeof a.attr('target') === 'undefined' || a.attr('target') === '_self') && // check if the link opens in the same window
						(a.attr('href').split('#')[0] !== window.location.href.split('#')[0]) // check if it is an anchor aiming for a different page
					) {
						e.preventDefault();
						$('.qodef-wrapper-inner').fadeOut(600, 'easeOutSine', function () {
							window.location = a.attr('href');
						});
					}
				});
			}
		}
	}
	
	/*
	 *	Preload background images for elements that have 'qodef-preload-background' class
	 */
	function qodefPreloadBackgrounds(){
		var preloadBackHolder = $('.qodef-preload-background');
		
		if(preloadBackHolder.length) {
			preloadBackHolder.each(function() {
				var preloadBackground = $(this);
				
				if(preloadBackground.css('background-image') !== '' && preloadBackground.css('background-image') !== 'none') {
					var bgUrl = preloadBackground.attr('style');
					
					bgUrl = bgUrl.match(/url\(["']?([^'")]+)['"]?\)/);
					bgUrl = bgUrl ? bgUrl[1] : "";
					
					if (bgUrl) {
						var backImg = new Image();
						backImg.src = bgUrl;
						$(backImg).load(function(){
							preloadBackground.removeClass('qodef-preload-background');
						});
					}
				} else {
					$(window).load(function(){ preloadBackground.removeClass('qodef-preload-background'); }); //make sure that qodef-preload-background class is removed from elements with forced background none in css
				}
			});
		}
	}
	
	function qodefPrettyPhoto() {
		/*jshint multistr: true */
		var markupWhole = '<div class="pp_pic_holder"> \
                        <div class="ppt">&nbsp;</div> \
                        <div class="pp_top"> \
                            <div class="pp_left"></div> \
                            <div class="pp_middle"></div> \
                            <div class="pp_right"></div> \
                        </div> \
                        <div class="pp_content_container"> \
                            <div class="pp_left"> \
                            <div class="pp_right"> \
                                <div class="pp_content"> \
                                    <div class="pp_loaderIcon"></div> \
                                    <div class="pp_fade"> \
                                        <a href="#" class="pp_expand" title="Expand the image">Expand</a> \
                                        <div class="pp_hoverContainer"> \
                                            <a class="pp_next" href="#"><span class="fa fa-angle-right"></span></a> \
                                            <a class="pp_previous" href="#"><span class="fa fa-angle-left"></span></a> \
                                        </div> \
                                        <div id="pp_full_res"></div> \
                                        <div class="pp_details"> \
                                            <div class="pp_nav"> \
                                                <a href="#" class="pp_arrow_previous">Previous</a> \
                                                <p class="currentTextHolder">0/0</p> \
                                                <a href="#" class="pp_arrow_next">Next</a> \
                                            </div> \
                                            <p class="pp_description"></p> \
                                            {pp_social} \
                                            <a class="pp_close" href="#">Close</a> \
                                        </div> \
                                    </div> \
                                </div> \
                            </div> \
                            </div> \
                        </div> \
                        <div class="pp_bottom"> \
                            <div class="pp_left"></div> \
                            <div class="pp_middle"></div> \
                            <div class="pp_right"></div> \
                        </div> \
                    </div> \
                    <div class="pp_overlay"></div>';
		
		$("a[data-rel^='prettyPhoto']").prettyPhoto({
			hook: 'data-rel',
			animation_speed: 'normal', /* fast/slow/normal */
			slideshow: false, /* false OR interval time in ms */
			autoplay_slideshow: false, /* true/false */
			opacity: 0.80, /* Value between 0 and 1 */
			show_title: true, /* true/false */
			allow_resize: true, /* Resize the photos bigger than viewport. true/false */
			horizontal_padding: 0,
			default_width: 960,
			default_height: 540,
			counter_separator_label: '/', /* The separator for the gallery counter 1 "of" 2 */
			theme: 'pp_default', /* light_rounded / dark_rounded / light_square / dark_square / facebook */
			hideflash: false, /* Hides all the flash object on a page, set to TRUE if flash appears over prettyPhoto */
			wmode: 'opaque', /* Set the flash wmode attribute */
			autoplay: true, /* Automatically start videos: True/False */
			modal: false, /* If set to true, only the close button will close the window */
			overlay_gallery: false, /* If set to true, a gallery will overlay the fullscreen image on mouse over */
			keyboard_shortcuts: true, /* Set to false if you open forms inside prettyPhoto */
			deeplinking: false,
			custom_markup: '',
			social_tools: false,
			markup: markupWhole
		});
	}

    function qodefSearchPostTypeWidget() {
        var searchPostTypeHolder = $('.qodef-search-post-type');

        if (searchPostTypeHolder.length) {
            searchPostTypeHolder.each(function () {
                var thisSearch = $(this),
                    searchField = thisSearch.find('.qodef-post-type-search-field'),
                    resultsHolder = thisSearch.siblings('.qodef-post-type-search-results'),
                    searchLoading = thisSearch.find('.qodef-search-loading'),
                    searchIcon = thisSearch.find('.qodef-search-icon');

                searchLoading.addClass('qodef-hidden');

                var postType = thisSearch.data('post-type'),
                    keyPressTimeout;

                searchField.on('keyup paste', function() {
                    var field = $(this);
                    field.attr('autocomplete','off');
                    searchLoading.removeClass('qodef-hidden');
                    searchIcon.addClass('qodef-hidden');
                    clearTimeout(keyPressTimeout);

                    keyPressTimeout = setTimeout( function() {
                        var searchTerm = field.val();
                        
                        if(searchTerm.length < 3) {
                            resultsHolder.html('');
                            resultsHolder.fadeOut();
                            searchLoading.addClass('qodef-hidden');
                            searchIcon.removeClass('qodef-hidden');
                        } else {
                            var ajaxData = {
                                action: 'aarhus_select_search_post_types',
                                term: searchTerm,
                                postType: postType,
								search_post_types_nonce: $('input[name="qodef_search_post_types_nonce"]').val()
                            };

                            $.ajax({
                                type: 'POST',
                                data: ajaxData,
                                url: qodefGlobalVars.vars.qodefAjaxUrl,
                                success: function (data) {
                                    var response = JSON.parse(data);
                                    if (response.status === 'success') {
                                        searchLoading.addClass('qodef-hidden');
                                        searchIcon.removeClass('qodef-hidden');
                                        resultsHolder.html(response.data.html);
                                        resultsHolder.fadeIn();
                                    }
                                },
                                error: function(XMLHttpRequest, textStatus, errorThrown) {
                                    console.log("Status: " + textStatus);
                                    console.log("Error: " + errorThrown);
                                    searchLoading.addClass('qodef-hidden');
                                    searchIcon.removeClass('qodef-hidden');
                                    resultsHolder.fadeOut();
                                }
                            });
                        }
                    }, 500);
                });

                searchField.on('focusout', function () {
                    searchLoading.addClass('qodef-hidden');
                    searchIcon.removeClass('qodef-hidden');
                    resultsHolder.fadeOut();
                });
            });
        }
    }
	
	/**
	 * Initializes load more data params
	 * @param container with defined data params
	 * return array
	 */
	function getLoadMoreData(container){
		var dataList = container.data(),
			returnValue = {};
		
		for (var property in dataList) {
			if (dataList.hasOwnProperty(property)) {
				if (typeof dataList[property] !== 'undefined' && dataList[property] !== false) {
					returnValue[property] = dataList[property];
				}
			}
		}
		
		return returnValue;
	}
	
	/**
	 * Sets load more data params for ajax function
	 * @param container with defined data params
	 * @param action with defined action name
	 * return array
	 */
	function setLoadMoreAjaxData(container, action) {
		var returnValue = {
			action: action
		};
		
		for (var property in container) {
			if (container.hasOwnProperty(property)) {
				
				if (typeof container[property] !== 'undefined' && container[property] !== false) {
					returnValue[property] = container[property];
				}
			}
		}
		
		return returnValue;
	}
	
	/*
	 ** Init Masonry List Layout
	 */
	function qodefInitGridMasonryListLayout() {
		var holder = $('.qodef-grid-masonry-list');
		
		if (holder.length) {
			holder.each(function () {
				var thisHolder = $(this),
					masonry = thisHolder.find('.qodef-masonry-list-wrapper'),
					size = thisHolder.find('.qodef-masonry-grid-sizer').width();
				
				masonry.waitForImages(function () {
					masonry.isotope({
						layoutMode: 'packery',
						itemSelector: '.qodef-item-space',
						percentPosition: true,
						masonry: {
							columnWidth: '.qodef-masonry-grid-sizer',
							gutter: '.qodef-masonry-grid-gutter'
						}
					});
					
					if (thisHolder.find('.qodef-fixed-masonry-item').length || thisHolder.hasClass('qodef-fixed-masonry-items')) {
						setFixedImageProportionSize(masonry, masonry.find('.qodef-item-space'), size, true);
					}
					
					setTimeout(function () {
						qodefInitParallax();
					}, 600);
					
					masonry.isotope('layout').css('opacity', 1);
				});
			});
		}
	}
	
	/**
	 * Initializes size for fixed image proportion - masonry layout
	 */
	function setFixedImageProportionSize(container, item, size, isFixedEnabled) {
		if (container.hasClass('qodef-masonry-images-fixed') || isFixedEnabled === true) {
			var padding = parseInt(item.css('paddingLeft'), 10),
				newSize = size - 2 * padding,
				defaultMasonryItem = container.find('.qodef-masonry-size-small'),
				largeWidthMasonryItem = container.find('.qodef-masonry-size-large-width'),
				largeHeightMasonryItem = container.find('.qodef-masonry-size-large-height'),
				largeWidthHeightMasonryItem = container.find('.qodef-masonry-size-large-width-height');

			defaultMasonryItem.css('height', newSize);
			largeHeightMasonryItem.css('height', Math.round(2 * (newSize + padding)));

			if (qodef.windowWidth > 680) {
				largeWidthMasonryItem.css('height', newSize);
				largeWidthHeightMasonryItem.css('height', Math.round(2 * (newSize + padding)));
			} else {
				largeWidthMasonryItem.css('height', Math.round(newSize / 2));
				largeWidthHeightMasonryItem.css('height', newSize);
			}
		}
	}

	/**
	 * Object that represents icon with hover data
	 * @returns {{init: Function}} function that initializes icon's functionality
	 */
	var qodefIconWithHover = function() {
		//get all icons on page
		var icons = $('.qodef-icon-has-hover');
		
		/**
		 * Function that triggers icon hover color functionality
		 */
		var iconHoverColor = function(icon) {
			if(typeof icon.data('hover-color') !== 'undefined') {
				var changeIconColor = function(event) {
					event.data.icon.css('color', event.data.color);
				};
				
				var hoverColor = icon.data('hover-color'),
					originalColor = icon.css('color');
				
				if(hoverColor !== '') {
					icon.on('mouseenter', {icon: icon, color: hoverColor}, changeIconColor);
					icon.on('mouseleave', {icon: icon, color: originalColor}, changeIconColor);
				}
			}
		};
		
		return {
			init: function() {
				if(icons.length) {
					icons.each(function() {
						iconHoverColor($(this));
					});
				}
			}
		};
	};
	
	/*
	 ** Init parallax
	 */
	function qodefInitParallax(){
		var parallaxHolder = $('.qodef-parallax-row-holder');
		
		if(parallaxHolder.length){
			parallaxHolder.each(function() {
				var parallaxElement = $(this),
					image = parallaxElement.data('parallax-bg-image'),
					speed = parallaxElement.data('parallax-bg-speed') * 0.4,
					height = 0;
				
				if (typeof parallaxElement.data('parallax-bg-height') !== 'undefined' && parallaxElement.data('parallax-bg-height') !== false) {
					height = parseInt(parallaxElement.data('parallax-bg-height'));
				}
				
				parallaxElement.css({'background-image': 'url('+image+')'});
				
				if(height > 0) {
					parallaxElement.css({'min-height': height+'px', 'height': height+'px'});
				}
				
				parallaxElement.parallax('50%', speed);
			});
		}
	}
	
	/*
	 **  Init sticky sidebar widget
	 */
	function qodefStickySidebarWidget(){
		var sswHolder = $('.qodef-widget-sticky-sidebar'),
			headerHolder = $('.qodef-page-header'),
			headerHeight = headerHolder.length ? headerHolder.outerHeight() : 0,
			widgetTopOffset = 0,
			widgetTopPosition = 0,
			sidebarHeight = 0,
			sidebarWidth = 0,
			objectsCollection = [];
		
		function addObjectItems() {
			if (sswHolder.length) {
				sswHolder.each(function () {
					var thisSswHolder = $(this),
						mainSidebarHolder = thisSswHolder.parents('aside.qodef-sidebar'),
						widgetiseSidebarHolder = thisSswHolder.parents('.wpb_widgetised_column'),
						sidebarHolder = '',
						sidebarHolderHeight = 0;
					
					widgetTopOffset = thisSswHolder.offset().top;
					widgetTopPosition = thisSswHolder.position().top;
					sidebarHeight = 0;
					sidebarWidth = 0;
					
					if (mainSidebarHolder.length) {
						sidebarHeight = mainSidebarHolder.outerHeight();
						sidebarWidth = mainSidebarHolder.outerWidth();
						sidebarHolder = mainSidebarHolder;
						sidebarHolderHeight = mainSidebarHolder.parent().parent().outerHeight();
						
						var blogHolder = mainSidebarHolder.parent().parent().find('.qodef-blog-holder');
						if (blogHolder.length) {
							sidebarHolderHeight -= parseInt(blogHolder.css('marginBottom'));
						}
					} else if (widgetiseSidebarHolder.length) {
						sidebarHeight = widgetiseSidebarHolder.outerHeight();
						sidebarWidth = widgetiseSidebarHolder.outerWidth();
						sidebarHolder = widgetiseSidebarHolder;
						sidebarHolderHeight = widgetiseSidebarHolder.parents('.vc_row').outerHeight();
					}
					
					objectsCollection.push({
						'object': thisSswHolder,
						'offset': widgetTopOffset,
						'position': widgetTopPosition,
						'height': sidebarHeight,
						'width': sidebarWidth,
						'sidebarHolder': sidebarHolder,
						'sidebarHolderHeight': sidebarHolderHeight
					});
				});
			}
		}
		
		function initStickySidebarWidget() {
			
			if (objectsCollection.length) {
				$.each(objectsCollection, function (i) {
					var thisSswHolder = objectsCollection[i].object,
						thisWidgetTopOffset = objectsCollection[i].offset,
						thisWidgetTopPosition = objectsCollection[i].position,
						thisSidebarHeight = objectsCollection[i].height,
						thisSidebarWidth = objectsCollection[i].width,
						thisSidebarHolder = objectsCollection[i].sidebarHolder,
						thisSidebarHolderHeight = objectsCollection[i].sidebarHolderHeight;
					
					if (qodef.body.hasClass('qodef-fixed-on-scroll')) {
						var fixedHeader = $('.qodef-fixed-wrapper.fixed');
						
						if (fixedHeader.length) {
							headerHeight = fixedHeader.outerHeight() + qodefGlobalVars.vars.qodefAddForAdminBar;
						}
					} else if (qodef.body.hasClass('qodef-no-behavior')) {
						headerHeight = qodefGlobalVars.vars.qodefAddForAdminBar;
					}
					
					if (qodef.windowWidth > 1024 && thisSidebarHolder.length) {
						var sidebarPosition = -(thisWidgetTopPosition - headerHeight),
							sidebarHeight = thisSidebarHeight - thisWidgetTopPosition - 40; // 40 is bottom margin of widget holder
						
						//move sidebar up when hits the end of section row
						var rowSectionEndInViewport = thisSidebarHolderHeight + thisWidgetTopOffset - headerHeight - thisWidgetTopPosition - qodefGlobalVars.vars.qodefTopBarHeight;
						
						if ((qodef.scroll >= thisWidgetTopOffset - headerHeight) && thisSidebarHeight < thisSidebarHolderHeight) {
							if (thisSidebarHolder.hasClass('qodef-sticky-sidebar-appeared')) {
								thisSidebarHolder.css({'top': sidebarPosition + 'px'});
							} else {
								thisSidebarHolder.addClass('qodef-sticky-sidebar-appeared').css({
									'position': 'fixed',
									'top': sidebarPosition + 'px',
									'width': thisSidebarWidth,
									'margin-top': '-10px'
								}).animate({'margin-top': '0'}, 200);
							}
							
							if (qodef.scroll + sidebarHeight >= rowSectionEndInViewport) {
								var absBottomPosition = thisSidebarHolderHeight - sidebarHeight + sidebarPosition - headerHeight;
								
								thisSidebarHolder.css({
									'position': 'absolute',
									'top': absBottomPosition + 'px'
								});
							} else {
								if (thisSidebarHolder.hasClass('qodef-sticky-sidebar-appeared')) {
									thisSidebarHolder.css({
										'position': 'fixed',
										'top': sidebarPosition + 'px'
									});
								}
							}
						} else {
							thisSidebarHolder.removeClass('qodef-sticky-sidebar-appeared').css({
								'position': 'relative',
								'top': '0',
								'width': 'auto'
							});
						}
					} else {
						thisSidebarHolder.removeClass('qodef-sticky-sidebar-appeared').css({
							'position': 'relative',
							'top': '0',
							'width': 'auto'
						});
					}
				});
			}
		}
		
		return {
			init: function () {
				addObjectItems();
				initStickySidebarWidget();
				
				$(window).scroll(function () {
					initStickySidebarWidget();
				});
			},
			reInit: initStickySidebarWidget
		};
	}

	/**
	* Init Parallax Team Column
	*/
	function qodefParallaxTeam() {
		var parallaxTeamCol = $(".qodef-team-column");

		if (parallaxTeamCol.length && qodef.windowWidth > 1024) {
			
			// render data on images
			parallaxTeamCol.each(function(index) {
				if (index % 2 !== 0) {
					$(this).data("data-parallax", '{"y": 50, "smoothness": 20}');
					$(this).attr("data-parallax", '{"y": 50, "smoothness": 20}');
				} else {
					$(this).data("data-parallax", '{"y": -50, "smoothness": 20}');
					$(this).attr("data-parallax", '{"y": -50, "smoothness": 20}');
				}
			});
			ParallaxScroll.init();
		}
	}

    /**
     * Init Owl Carousel
     */
    function qodefOwlSlider() {
        var sliders = $('.qodef-owl-slider');

        if (sliders.length) {
            sliders.each(function(){
                var slider = $(this),
                    owlSlider = $(this),
	                slideItemsNumber = slider.children().length,
	                numberOfItems = 1,
	                loop = true,
	                autoplay = true,
	                autoplayHoverPause = true,
	                sliderSpeed = 5000,
	                sliderSpeedAnimation = 600,
	                margin = 0,
	                responsiveMargin = 0,
	                responsiveMargin1 = 0,
	                stagePadding = 0,
	                stagePaddingEnabled = false,
	                center = false,
	                autoWidth = false,
	                animateInClass = false, // keyframe css animation
	                animateOutClass = false, // keyframe css animation
	                navigation = true,
	                pagination = false,
	                thumbnail = false,
                    thumbnailSlider,
	                sliderIsCPTList = !!slider.hasClass('qodef-list-is-slider'),
	                sliderDataHolder = sliderIsCPTList ? slider.parent() : slider;  // this is condition for cpt to set list to be slider
	
	            if (typeof slider.data('number-of-items') !== 'undefined' && slider.data('number-of-items') !== false && ! sliderIsCPTList) {
		            numberOfItems = slider.data('number-of-items');
	            }
	            if (typeof sliderDataHolder.data('number-of-columns') !== 'undefined' && sliderDataHolder.data('number-of-columns') !== false && sliderIsCPTList) {
		            switch (sliderDataHolder.data('number-of-columns')) {
			            case 'one':
				            numberOfItems = 1;
				            break;
			            case 'two':
				            numberOfItems = 2;
				            break;
			            case 'three':
				            numberOfItems = 3;
				            break;
			            case 'four':
				            numberOfItems = 4;
				            break;
			            case 'five':
				            numberOfItems = 5;
				            break;
			            case 'six':
				            numberOfItems = 6;
				            break;
			            default :
				            numberOfItems = 4;
				            break;
		            }
	            }
	            if (sliderDataHolder.data('enable-loop') === 'no') {
		            loop = false;
	            }
	            if (sliderDataHolder.data('enable-autoplay') === 'no') {
		            autoplay = false;
	            }
	            if (sliderDataHolder.data('enable-autoplay-hover-pause') === 'no') {
		            autoplayHoverPause = false;
	            }
	            if (typeof sliderDataHolder.data('slider-speed') !== 'undefined' && sliderDataHolder.data('slider-speed') !== false) {
		            sliderSpeed = sliderDataHolder.data('slider-speed');
	            }
	            if (typeof sliderDataHolder.data('slider-speed-animation') !== 'undefined' && sliderDataHolder.data('slider-speed-animation') !== false) {
		            sliderSpeedAnimation = sliderDataHolder.data('slider-speed-animation');
	            }
	            if (typeof sliderDataHolder.data('slider-margin') !== 'undefined' && sliderDataHolder.data('slider-margin') !== false) {
		            if (sliderDataHolder.data('slider-margin') === 'no') {
			            margin = 0;
		            } else {
			            margin = sliderDataHolder.data('slider-margin');
		            }
	            } else {
		            if(slider.parent().hasClass('qodef-huge-space')) {
			            margin = 60;
		            } else if (slider.parent().hasClass('qodef-large-space')) {
			            margin = 50;
		            } else if (slider.parent().hasClass('qodef-medium-space')) {
			            margin = 40;
		            } else if (slider.parent().hasClass('qodef-normal-space')) {
			            margin = 30;
		            } else if (slider.parent().hasClass('qodef-small-space')) {
			            margin = 20;
		            } else if (slider.parent().hasClass('qodef-tiny-space')) {
			            margin = 10;
		            }
	            }
	            if (sliderDataHolder.data('slider-padding') === 'yes') {
		            stagePaddingEnabled = true;
		            stagePadding = parseInt(slider.outerWidth() * 0.28);
		            margin = 50;
	            }
	            if (sliderDataHolder.data('enable-center') === 'yes') {
		            center = true;
	            }
	            if (sliderDataHolder.data('enable-auto-width') === 'yes') {
		            autoWidth = true;
	            }
	            if (typeof sliderDataHolder.data('slider-animate-in') !== 'undefined' && sliderDataHolder.data('slider-animate-in') !== false) {
		            animateInClass = sliderDataHolder.data('slider-animate-in');
	            }
	            if (typeof sliderDataHolder.data('slider-animate-out') !== 'undefined' && sliderDataHolder.data('slider-animate-out') !== false) {
                    animateOutClass = sliderDataHolder.data('slider-animate-out');
	            }
	            if (sliderDataHolder.data('enable-navigation') === 'no') {
		            navigation = false;
	            }
	            if (sliderDataHolder.data('enable-pagination') === 'yes') {
		            pagination = true;
	            }

	            if (sliderDataHolder.data('enable-thumbnail') === 'yes') {
                    thumbnail = true;
	            }

	            if(thumbnail && !pagination) {
                    /* page.index works only when pagination is enabled, so we add through html, but hide via css */
	                pagination = true;
                    owlSlider.addClass('qodef-slider-hide-pagination');
                }

	            if(navigation && pagination) {
		            slider.addClass('qodef-slider-has-both-nav');
	            }

	            if (slideItemsNumber <= 1) {
		            loop       = false;
		            autoplay   = false;
		            navigation = false;
		            pagination = false;
	            }

	            var responsiveNumberOfItems1 = 1,
		            responsiveNumberOfItems2 = 2,
		            responsiveNumberOfItems3 = 3,
		            responsiveNumberOfItems4 = numberOfItems,
		            responsiveNumberOfItems5 = numberOfItems;

	            if (numberOfItems < 3) {
		            responsiveNumberOfItems2 = numberOfItems;
		            responsiveNumberOfItems3 = numberOfItems;
	            }

	            if (numberOfItems > 4) {
		            responsiveNumberOfItems4 = 4;
	            }
	
	            if (numberOfItems > 5) {
		            responsiveNumberOfItems5 = 5;
	            }

	            if (stagePaddingEnabled || margin > 30) {
		            responsiveMargin = 20;
		            responsiveMargin1 = 30;
	            }

	            if (margin > 0 && margin <= 30) {
		            responsiveMargin = margin;
		            responsiveMargin1 = margin;
	            }

	            slider.waitForImages(function () {
		            owlSlider = slider.owlCarousel({
			            items: numberOfItems,
			            loop: loop,
			            autoplay: autoplay,
			            autoplayHoverPause: autoplayHoverPause,
			            autoplayTimeout: sliderSpeed,
			            smartSpeed: sliderSpeedAnimation,
			            margin: margin,
			            stagePadding: stagePadding,
			            center: center,
			            autoWidth: autoWidth,
			            animateIn: animateInClass,
			            animateOut: animateOutClass,
			            dots: pagination,
			            nav: navigation,
			            navText: [
				            '<span class="qodef-prev-icon ' + qodefGlobalVars.vars.sliderNavPrevArrow + '"></span>',
				            '<span class="qodef-next-icon ' + qodefGlobalVars.vars.sliderNavNextArrow + '"></span>'
			            ],
			            responsive: {
				            0: {
					            items: responsiveNumberOfItems1,
					            margin: responsiveMargin,
					            stagePadding: 0,
					            center: false,
					            autoWidth: false
				            },
				            681: {
					            items: responsiveNumberOfItems2,
					            margin: responsiveMargin1
				            },
				            769: {
					            items: responsiveNumberOfItems3,
					            margin: responsiveMargin1
				            },
				            1025: {
					            items: responsiveNumberOfItems4
				            },
				            1281: {
					            items: responsiveNumberOfItems5
				            },
				            1367: {
					            items: numberOfItems
				            }
			            },
			            onInitialize: function () {
				            slider.css('visibility', 'visible');
				            qodefInitParallax();
				            if (slider.find('iframe').length || slider.find('video').length) {
					            setTimeout(function(){
						            qodefSelfHostedVideoSize();
						            qodefFluidVideo();
					            }, 500);
				            }
                            if(thumbnail) {
                                thumbnailSlider.find('.qodef-slider-thumbnail-item:first-child').addClass('active');
                            }
			            },
                        onRefreshed: function() {
                            if(autoWidth === true) {
                                var oldSize = parseInt(slider.find('.owl-stage').css('width'));
                                slider.find('.owl-stage').css('width', (oldSize + 1) + 'px');
                            }
                        },
                        onTranslate: function(e) {
                            if(thumbnail) {
                                var index = e.page.index + 1;
                                thumbnailSlider.find('.qodef-slider-thumbnail-item.active').removeClass('active');
                                thumbnailSlider.find('.qodef-slider-thumbnail-item:nth-child(' + index + ')').addClass('active');
                            }
                        },
			            onDrag: function (e) {
				            if (qodef.body.hasClass('qodef-smooth-page-transitions-fadeout')) {
					            var sliderIsMoving = e.isTrigger > 0;
					
					            if (sliderIsMoving) {
						            slider.addClass('qodef-slider-is-moving');
					            }
				            }
			            },
			            onDragged: function () {
				            if (qodef.body.hasClass('qodef-smooth-page-transitions-fadeout') && slider.hasClass('qodef-slider-is-moving')) {
					
					            setTimeout(function () {
						            slider.removeClass('qodef-slider-is-moving');
					            }, 500);
				            }
			            }
		            });
	            });

                if(thumbnail) {
                    thumbnailSlider = slider.parent().find('.qodef-slider-thumbnail');

                    var numberOfThumbnails = parseInt(thumbnailSlider.data('thumbnail-count'));
                    var numberOfThumbnailsClass = '';

                    switch (numberOfThumbnails % 6) {
                        case 2 :
                            numberOfThumbnailsClass = 'two';
                            break;
                        case 3 :
                            numberOfThumbnailsClass = 'three';
                            break;
                        case 4 :
                            numberOfThumbnailsClass = 'four';
                            break;
                        case 5 :
                            numberOfThumbnailsClass = 'five';
                            break;
                        case 0 :
                            numberOfThumbnailsClass = 'six';
                            break;
                        default :
                            numberOfThumbnailsClass = 'six';
                            break;
                    }

                    if(numberOfThumbnailsClass !== '') {
                        thumbnailSlider.addClass('qodef-slider-columns-' + numberOfThumbnailsClass);
                    }

                    thumbnailSlider.find('.qodef-slider-thumbnail-item').on('click' ,function () {
                        $(this).siblings('.active').removeClass('active');
                        $(this).addClass('active');
                        owlSlider.trigger('to.owl.carousel', [$(this).index(), sliderSpeedAnimation]);
                    });
                }
            });
        }
    }

	function qodefDashboardForm() {
		var forms = $('.qodef-dashboard-form');

		if (forms.length) {
			forms.each(function () {
				var thisForm = $(this),
					btnText = thisForm.find('button.qodef-dashboard-form-button'),
					updatingBtnText = btnText.data('updating-text'),
					updatedBtnText = btnText.data('updated-text'),
					actionName = thisForm.data('action');

				thisForm.on('submit', function (e) {
					e.preventDefault();
					var prevBtnText = btnText.html(),
						gallery = $(this).find('.qodef-dashboard-gallery-upload-hidden'),
						namesArray = [];

					btnText.html(updatingBtnText);

					//get data
					var formData = new FormData();

					//get files
					gallery.each(function () {
						var thisGallery = $(this),
							thisName = thisGallery.attr('name'),
							thisRepeaterID = thisGallery.attr('id'),
							thisFiles = thisGallery[0].files,
							newName;

						//this part is needed for repeater with image uploads
						//adding specific names so they can be sorted in regular files and files in repeater
						if (thisName.indexOf("[") > -1) {
							newName = thisName.substring(0, thisName.indexOf("[")) + '_qodef_regarray_';

							var firstIndex = thisRepeaterID.indexOf('['),
								lastIndex = thisRepeaterID.indexOf(']'),
								index = thisRepeaterID.substring(firstIndex + 1, lastIndex);

							namesArray.push(newName);
							newName = newName + index + '_';
						} else {
							newName = thisName + '_qodef_reg_';
						}

						//if file not sent, send dummy file - so repeater fields are sent
						if (thisFiles.length === 0) {
							formData.append(newName, new File([""], "qodef-dummy-file.txt", {
								type: "text/plain"
							}));
						}

						for (var i = 0; i < thisFiles.length; i++) {
							var allowedTypes = ['image/png','image/jpg','image/jpeg','application/pdf'];
							//security purposed - check if there is more than one dot in file name, also check whether the file type is in allowed types
							if (thisFiles[i].name.match(/\./g).length === 1 && $.inArray(thisFiles[i].type, allowedTypes) !== -1) {
								formData.append(newName + i, thisFiles[i]);
							}
						}
					});

					formData.append('action', actionName);

					//get data from form
					var otherData = $(this).serialize();
					formData.append('data', otherData);

					$.ajax({
						type: 'POST',
						data: formData,
						contentType: false,
						processData: false,
						url: qodefGlobalVars.vars.qodefAjaxUrl,
						success: function (data) {
							var response;
							response = JSON.parse(data);

							// append ajax response html
							qodef.modules.socialLogin.qodefRenderAjaxResponseMessage(response);
							if (response.status === 'success') {
								btnText.html(updatedBtnText);
								window.location = response.redirect;
							} else {
								btnText.html(prevBtnText);
							}
						}
					});

					return false;
				});
			});
		}
	}

    /**
     * Init Perfect Scrollbar
     */
    function qodefInitPerfectScrollbar() {
        var defaultParams = {
            wheelSpeed: 0.6,
            suppressScrollX: true
        };

        var qodefInitScroll = function (holder) {
            var ps = new PerfectScrollbar(holder.selector, defaultParams);
            $(window).resize(function () {
                ps.update();
            });
        };

        return {
            init: function (holder) {
            	if(holder.length){
		            qodefInitScroll(holder);
	            }
            }
        };
    }

    function qodefRowBackgroundText() {
        var backgroundText = $('.qodef-row-background-text-holder');

        backgroundText.each(function () {
            var backgroundTextInstance = $(this),
                backgroundTextWrapper = backgroundTextInstance.find('.qodef-row-background-text-wrapper'),
                backgroundTextInner = backgroundTextInstance.find('.qodef-row-background-text-wrapper-inner'),
				row = backgroundTextInstance.parent().addClass('qodef-row-has-background-text'),
				backgroundTextCharsHolder = backgroundTextInstance.find('.qodef-row-background-text-1');

            if(qodef.windowWidth > 1280 && qodef.windowWidth <=1440) {
                if( typeof backgroundTextInner.data('font-size-1440') !== 'undefined' && backgroundTextInner.data('font-size-1440') !== false){
                    backgroundTextInner.css('font-size', backgroundTextInner.data('font-size-1440'));
                }
            }

            if(qodef.windowWidth > 1024 && qodef.windowWidth <=1280){
                if( typeof backgroundTextInner.data('font-size-1280') !== 'undefined' && backgroundTextInner.data('font-size-1280') !== false){
                    backgroundTextInner.css('font-size', backgroundTextInner.data('font-size-1280'));
                }
            }

            backgroundTextInstance.prev().css('z-index', 10);

            //appear fx
            if (backgroundTextWrapper.hasClass('qodef-row-background-text-animation') && !qodef.htmlEl.hasClass('touch')) {
                var bgrndTextElements = backgroundTextInstance.find('.qodef-row-background-text-1, .qodef-row-background-text-2'),
                    delay = 150;

                bgrndTextElements.each(function(i){
                    var bgrndTextElement = $(this),
                        txt = bgrndTextElement.text(),
                        newTxt = txt.replace(/\w/g,function(c){
                            return '<span class="qodef-char-mask"><span>'+c+'</span></span>';
                        });

                    bgrndTextElement.html(newTxt);

                    var firstTextChars = bgrndTextElements.filter('.qodef-row-background-text-1').find('.qodef-char-mask').length;

                    var showText = function() {
                        backgroundTextWrapper.css('visibility','visible');

                        backgroundTextInstance.find('.qodef-char-mask > span').each(function(j){
                            var bgrndChar = $(this);

                            setTimeout(function(){
                                bgrndChar.addClass('qodef-show');
                            }, i*firstTextChars*delay*0.85 + j*delay);
                        });
                    }

                    if (backgroundTextInstance.parent().hasClass('qodef-wait-for-preloader')) {
                        $(document).on('qodefPreloaded', function(){
                            showText();
                        });
                    } else {
                        $(window).load(function(){
                            backgroundTextCharsHolder.appear(function(){
                                showText();
                            }, {accX: 0, accY: -400});
                        });
                    }
                });
            }

        })
    }


})(jQuery);
(function($) {
	"use strict";

    var blog = {};
    qodef.modules.blog = blog;

    blog.qodefOnDocumentReady = qodefOnDocumentReady;
    blog.qodefOnWindowLoad = qodefOnWindowLoad;
    blog.qodefOnWindowScroll = qodefOnWindowScroll;

    $(document).ready(qodefOnDocumentReady);
    $(window).load(qodefOnWindowLoad);
    $(window).scroll(qodefOnWindowScroll);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function qodefOnDocumentReady() {
        qodefInitAudioPlayer();
    }

    /* 
        All functions to be called on $(window).load() should be in this function
    */
    function qodefOnWindowLoad() {
	    qodefInitBlogPagination().init();
    }

    /* 
        All functions to be called on $(window).scroll() should be in this function
    */
    function qodefOnWindowScroll() {
	    qodefInitBlogPagination().scroll();
    }

    /**
    * Init audio player for Blog list and single pages
    */
    function qodefInitAudioPlayer() {
	    var players = $('audio.qodef-blog-audio');
	
	    if (players.length) {
		    players.mediaelementplayer({
			    audioWidth: '100%'
		    });
	    }
    }
	
	/**
	 * Initializes blog pagination functions
	 */
	function qodefInitBlogPagination(){
		var holder = $('.qodef-blog-holder');
		
		var initLoadMorePagination = function(thisHolder) {
			var loadMoreButton = thisHolder.find('.qodef-blog-pag-load-more a');
			
			loadMoreButton.on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				
				initMainPagFunctionality(thisHolder);
			});
		};
		
		var initInifiteScrollPagination = function(thisHolder) {
			var blogListHeight = thisHolder.outerHeight(),
				blogListTopOffest = thisHolder.offset().top,
				blogListPosition = blogListHeight + blogListTopOffest - qodefGlobalVars.vars.qodefAddForAdminBar;
			
			if(!thisHolder.hasClass('qodef-blog-pagination-infinite-scroll-started') && qodef.scroll + qodef.windowHeight > blogListPosition) {
				initMainPagFunctionality(thisHolder);
			}
		};
		
		var initMainPagFunctionality = function(thisHolder) {
			var thisHolderInner = thisHolder.children('.qodef-blog-holder-inner'),
				nextPage,
				maxNumPages;
			
			if (typeof thisHolder.data('max-num-pages') !== 'undefined' && thisHolder.data('max-num-pages') !== false) {
				maxNumPages = thisHolder.data('max-num-pages');
			}
			
			if(thisHolder.hasClass('qodef-blog-pagination-infinite-scroll')) {
				thisHolder.addClass('qodef-blog-pagination-infinite-scroll-started');
			}
			
			var loadMoreDatta = qodef.modules.common.getLoadMoreData(thisHolder),
				loadingItem = thisHolder.find('.qodef-blog-pag-loading');
			
			nextPage = loadMoreDatta.nextPage;

			var nonceHolder = thisHolder.find('input[name*="qodef_blog_load_more_nonce_"]');

			loadMoreDatta.blog_load_more_id = nonceHolder.attr('name').substring(nonceHolder.attr('name').length - 4, nonceHolder.attr('name').length);
			loadMoreDatta.blog_load_more_nonce = nonceHolder.val();
			
			if(nextPage <= maxNumPages){
				loadingItem.addClass('qodef-showing');
				
				var ajaxData = qodef.modules.common.setLoadMoreAjaxData(loadMoreDatta, 'aarhus_select_blog_load_more');
				
				$.ajax({
					type: 'POST',
					data: ajaxData,
					url: qodefGlobalVars.vars.qodefAjaxUrl,
					success: function (data) {
						nextPage++;
						
						thisHolder.data('next-page', nextPage);

						var response = $.parseJSON(data),
							responseHtml =  response.html;

						thisHolder.waitForImages(function(){
							if(thisHolder.hasClass('qodef-grid-masonry-list')){
								qodefInitAppendIsotopeNewContent(thisHolderInner, loadingItem, responseHtml);
								qodef.modules.common.setFixedImageProportionSize(thisHolder, thisHolder.find('article'), thisHolderInner.find('.qodef-masonry-grid-sizer').width());
							} else {
								qodefInitAppendGalleryNewContent(thisHolderInner, loadingItem, responseHtml);
							}
							
							setTimeout(function() {
								qodefInitAudioPlayer();
								qodef.modules.common.qodefOwlSlider();
								qodef.modules.common.qodefFluidVideo();
                                qodef.modules.common.qodefInitSelfHostedVideoPlayer();
                                qodef.modules.common.qodefSelfHostedVideoSize();
								
								if (typeof qodef.modules.common.qodefStickySidebarWidget === 'function') {
									qodef.modules.common.qodefStickySidebarWidget().reInit();
								}

                                // Trigger event.
                                $( document.body ).trigger( 'blog_list_load_more_trigger' );

							}, 400);
						});
						
						if(thisHolder.hasClass('qodef-blog-pagination-infinite-scroll-started')) {
							thisHolder.removeClass('qodef-blog-pagination-infinite-scroll-started');
						}
					}
				});
			}
			
			if(nextPage === maxNumPages){
				thisHolder.find('.qodef-blog-pag-load-more').hide();
			}
		};
		
		var qodefInitAppendIsotopeNewContent = function(thisHolderInner, loadingItem, responseHtml) {
			thisHolderInner.append(responseHtml).isotope('reloadItems').isotope({sortBy: 'original-order'});
			loadingItem.removeClass('qodef-showing');
			
			setTimeout(function() {
				thisHolderInner.isotope('layout');
			}, 600);
		};
		
		var qodefInitAppendGalleryNewContent = function(thisHolderInner, loadingItem, responseHtml) {
			loadingItem.removeClass('qodef-showing');
			thisHolderInner.append(responseHtml);
		};
		
		return {
			init: function() {
				if(holder.length) {
					holder.each(function() {
						var thisHolder = $(this);
						
						if(thisHolder.hasClass('qodef-blog-pagination-load-more')) {
							initLoadMorePagination(thisHolder);
						}
						
						if(thisHolder.hasClass('qodef-blog-pagination-infinite-scroll')) {
							initInifiteScrollPagination(thisHolder);
						}
					});
				}
			},
			scroll: function() {
				if(holder.length) {
					holder.each(function() {
						var thisHolder = $(this);
						
						if(thisHolder.hasClass('qodef-blog-pagination-infinite-scroll')) {
							initInifiteScrollPagination(thisHolder);
						}
					});
				}
			}
		};
	}

})(jQuery);
(function ($) {
	"use strict";
	
	var footer = {};
    qodef.modules.footer = footer;
	
	footer.qodefOnWindowLoad = qodefOnWindowLoad;
	
	$(window).load(qodefOnWindowLoad);
	
	/*
	 All functions to be called on $(window).load() should be in this function
	 */
	 
	function qodefOnWindowLoad() {
		uncoveringFooter();
	}
	
	function uncoveringFooter() {
		var uncoverFooter = $('body:not(.error404) .qodef-footer-uncover');

		if (uncoverFooter.length && !qodef.htmlEl.hasClass('touch')) {

			var footer = $('footer'),
				footerHeight = footer.outerHeight(),
				content = $('.qodef-content');
			
			var uncoveringCalcs = function () {
				content.css('margin-bottom', footerHeight);
				footer.css('height', footerHeight);
			};


			//set
			uncoveringCalcs();
			
			$(window).resize(function () {
				//recalc
				footerHeight = footer.find('.qodef-footer-inner').outerHeight();
				uncoveringCalcs();
			});
		}
	}
	
})(jQuery);
(function($) {
	"use strict";
	
	var header = {};
	qodef.modules.header = header;
	
	header.qodefSetDropDownMenuPosition     = qodefSetDropDownMenuPosition;
	header.qodefSetDropDownWideMenuPosition = qodefSetDropDownWideMenuPosition;
	
	header.qodefOnDocumentReady = qodefOnDocumentReady;
	header.qodefOnWindowLoad = qodefOnWindowLoad;
	
	$(document).ready(qodefOnDocumentReady);
	$(window).load(qodefOnWindowLoad);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function qodefOnDocumentReady() {
		qodefSetDropDownMenuPosition();
		setTimeout(function(){
			qodefDropDownMenu();
		}, 100);
	}
	
	/*
	 All functions to be called on $(window).load() should be in this function
	 */
	function qodefOnWindowLoad() {
		qodefSetDropDownWideMenuPosition();
	}
	
	/**
	 * Set dropdown position
	 */
	function qodefSetDropDownMenuPosition() {
		var menuItems = $('.qodef-drop-down > ul > li.narrow.menu-item-has-children');
		
		if (menuItems.length) {
			menuItems.each(function (i) {
				var thisItem = $(this),
					menuItemPosition = thisItem.offset().left,
					dropdownHolder = thisItem.find('.second'),
					dropdownMenuItem = dropdownHolder.find('.inner ul'),
					dropdownMenuWidth = dropdownMenuItem.outerWidth(),
					menuItemFromLeft = qodef.windowWidth - menuItemPosition;
				
				if (qodef.body.hasClass('qodef-boxed')) {
					menuItemFromLeft = qodef.boxedLayoutWidth - (menuItemPosition - (qodef.windowWidth - qodef.boxedLayoutWidth ) / 2);
				}
				
				var dropDownMenuFromLeft; //has to stay undefined because 'dropDownMenuFromLeft < dropdownMenuWidth' conditional will be true
				
				if (thisItem.find('li.sub').length > 0) {
					dropDownMenuFromLeft = menuItemFromLeft - dropdownMenuWidth;
				}
				
				dropdownHolder.removeClass('right');
				dropdownMenuItem.removeClass('right');
				if (menuItemFromLeft < dropdownMenuWidth || dropDownMenuFromLeft < dropdownMenuWidth) {
					dropdownHolder.addClass('right');
					dropdownMenuItem.addClass('right');
				}
			});
		}
	}
	
	/**
	 * Set dropdown wide position
	 */
	function qodefSetDropDownWideMenuPosition(){
		var menuItems = $(".qodef-drop-down > ul > li.wide");
		
		if(menuItems.length) {
			menuItems.each( function(i) {
                var menuItem = $(this);
				var menuItemSubMenu = menuItem.find('.second');
				
				if(menuItemSubMenu.length && !menuItemSubMenu.hasClass('left_position') && !menuItemSubMenu.hasClass('right_position')) {
					menuItemSubMenu.css('left', 0);
					
					var left_position = menuItemSubMenu.offset().left;
					
					if(qodef.body.hasClass('qodef-boxed')) {
                        //boxed layout case
                        var boxedWidth = $('.qodef-boxed .qodef-wrapper .qodef-wrapper-inner').outerWidth();
						left_position = left_position - (qodef.windowWidth - boxedWidth) / 2;
						menuItemSubMenu.css({'left': -left_position, 'width': boxedWidth});

					} else if(qodef.body.hasClass('qodef-wide-dropdown-menu-in-grid')) {
                        //wide dropdown in grid case
                        menuItemSubMenu.css({'left': -left_position + (qodef.windowWidth - qodef.gridWidth()) / 2, 'width': qodef.gridWidth()});

                    }
                    else {
                        //wide dropdown full width case
                        menuItemSubMenu.css({'left': -left_position, 'width': qodef.windowWidth});

					}
				}
			});
		}
	}
	
	function qodefDropDownMenu() {
		var menu_items = $('.qodef-drop-down > ul > li');
		
		menu_items.each(function() {
			var thisItem = $(this);
			
			if(thisItem.find('.second').length) {
				thisItem.waitForImages(function(){
					var dropDownHolder = thisItem.find('.second'),
						dropDownHolderHeight = !qodef.menuDropdownHeightSet ? dropDownHolder.outerHeight() : 0;
					
					if(thisItem.hasClass('wide')) {
						var tallest = 0,
							dropDownSecondItem = dropDownHolder.find('> .inner > ul > li');
						
						dropDownSecondItem.each(function() {
							var thisHeight = $(this).outerHeight();
							
							if(thisHeight > tallest) {
								tallest = thisHeight;
							}
						});
						
						dropDownSecondItem.css('height', '').height(tallest);
						
						if (!qodef.menuDropdownHeightSet) {
							dropDownHolderHeight = dropDownHolder.outerHeight();
						}
					}
					
					if (!qodef.menuDropdownHeightSet) {
						dropDownHolder.height(0);
					}
					
					if(navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
						thisItem.on("touchstart mouseenter", function() {
							dropDownHolder.css({
								'height': dropDownHolderHeight,
								'overflow': 'visible',
								'visibility': 'visible',
								'opacity': '1'
							});
						}).on("mouseleave", function() {
							dropDownHolder.css({
								'height': '0px',
								'overflow': 'hidden',
								'visibility': 'hidden',
								'opacity': '0'
							});
						});
					} else {
						if (qodef.body.hasClass('qodef-dropdown-animate-height')) {
							var animateConfig = {
								interval: 0,
								over: function () {
									setTimeout(function () {
										dropDownHolder.addClass('qodef-drop-down-start').css({
											'visibility': 'visible',
											'height': '0',
											'opacity': '1'
										});
										dropDownHolder.stop().animate({
											'height': dropDownHolderHeight
										}, 400, 'easeInOutQuint', function () {
											dropDownHolder.css('overflow', 'visible');
										});
									}, 100);
								},
								timeout: 100,
								out: function () {
									dropDownHolder.stop().animate({
										'height': '0',
										'opacity': 0
									}, 100, function () {
										dropDownHolder.css({
											'overflow': 'hidden',
											'visibility': 'hidden'
										});
									});
									
									dropDownHolder.removeClass('qodef-drop-down-start');
								}
							};
							
							thisItem.hoverIntent(animateConfig);
						} else {
							var config = {
								interval: 0,
								over: function () {
									setTimeout(function () {
										dropDownHolder.addClass('qodef-drop-down-start').stop().css({'height': dropDownHolderHeight});
									}, 150);
								},
								timeout: 150,
								out: function () {
									dropDownHolder.stop().css({'height': '0'}).removeClass('qodef-drop-down-start');
								}
							};
							
							thisItem.hoverIntent(config);
						}
					}
				});
			}
		});
		
		$('.qodef-drop-down ul li.wide ul li a').on('click', function(e) {
			if (e.which === 1){
				var $this = $(this);
				
				setTimeout(function() {
					$this.mouseleave();
				}, 500);
			}
		});
		
		qodef.menuDropdownHeightSet = true;
	}
	
})(jQuery);
(function($) {
    'use strict';

    var like = {};
    
    like.qodefOnDocumentReady = qodefOnDocumentReady;

    $(document).ready(qodefOnDocumentReady);
    
    /**
    *  All functions to be called on $(document).ready() should be in this function
    **/
    function qodefOnDocumentReady() {
        qodefLikes();
    }

    function qodefLikes() {
        $(document).on('click','.qodef-like', function() {
            var likeLink = $(this),
                id = likeLink.attr('id'),
                type;

            if ( likeLink.hasClass('liked') ) {
                return false;
            }

            if (typeof likeLink.data('type') !== 'undefined') {
                type = likeLink.data('type');
            }

            var dataToPass = {
                action: 'aarhus_select_like',
                likes_id: id,
                type: type,
				like_nonce: $('#qodef_like_nonce_'+postID).val()
            };

            var like = $.post(qodefGlobalVars.vars.qodefAjaxUrl, dataToPass, function( data ) {
                likeLink.html(data).addClass('liked').attr('title', 'You already like this!');
            });

            return false;
        });
    }
    
})(jQuery);
(function($) {
    "use strict";

    var sidearea = {};
    qodef.modules.sidearea = sidearea;

    sidearea.qodefOnDocumentReady = qodefOnDocumentReady;

    $(document).ready(qodefOnDocumentReady);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function qodefOnDocumentReady() {
	    qodefSideArea();
    }
	
	/**
	 * Show/hide side area
	 */
    function qodefSideArea() {
		var wrapper = $('.qodef-wrapper'),
			sideMenu = $('.qodef-side-menu'),
			sideMenuButtonOpen = $('a.qodef-side-menu-button-opener'),
			cssClass,
			//Flags
			slideFromRight = false,
			slideWithContent = false,
			slideUncovered = false;
		
		if (qodef.body.hasClass('qodef-side-menu-slide-from-right')) {
			$('.qodef-cover').remove();
			cssClass = 'qodef-right-side-menu-opened';
			wrapper.prepend('<div class="qodef-cover"/>');
			slideFromRight = true;
		} else if (qodef.body.hasClass('qodef-side-menu-slide-with-content')) {
			cssClass = 'qodef-side-menu-open';
			slideWithContent = true;
		} else if (qodef.body.hasClass('qodef-side-area-uncovered-from-content')) {
			cssClass = 'qodef-right-side-menu-opened';
			slideUncovered = true;
		}
		
		$('a.qodef-side-menu-button-opener, a.qodef-close-side-menu').on('click', function (e) {
			e.preventDefault();
	
	        if (!sideMenuButtonOpen.hasClass('opened')) {
		        sideMenuButtonOpen.addClass('opened');
		        qodef.body.addClass(cssClass);
		
		        if (slideFromRight) {
			        $('.qodef-wrapper .qodef-cover').on('click', function () {
				        qodef.body.removeClass('qodef-right-side-menu-opened');
				        sideMenuButtonOpen.removeClass('opened');
			        });
		        }
		
		        if (slideUncovered) {
			        sideMenu.css({
				        'visibility': 'visible'
			        });
		        }
		
		        var currentScroll = $(window).scrollTop();
		        $(window).scroll(function () {
			        if (Math.abs(qodef.scroll - currentScroll) > 400) {
				        qodef.body.removeClass(cssClass);
				        sideMenuButtonOpen.removeClass('opened');
				        if (slideUncovered) {
					        var hideSideMenu = setTimeout(function () {
						        sideMenu.css({'visibility': 'hidden'});
						        clearTimeout(hideSideMenu);
					        }, 400);
				        }
			        }
		        });
            } else {
	            sideMenuButtonOpen.removeClass('opened');
	            qodef.body.removeClass(cssClass);
	
	            if (slideUncovered) {
		            var hideSideMenu = setTimeout(function () {
			            sideMenu.css({'visibility': 'hidden'});
			            clearTimeout(hideSideMenu);
		            }, 400);
	            }
            }
	
	        if (slideWithContent) {
		        e.stopPropagation();
		
		        wrapper.on('click', function () {
			        e.preventDefault();
			        sideMenuButtonOpen.removeClass('opened');
			        qodef.body.removeClass('qodef-side-menu-open');
		        });
	        }
        });

        if(sideMenu.length){
            qodef.modules.common.qodefInitPerfectScrollbar().init(sideMenu);
        }
    }

})(jQuery);

(function ($) {
	"use strict";
	
	var subscribePopup = {};
	qodef.modules.subscribePopup = subscribePopup;
	
	subscribePopup.qodefOnWindowLoad = qodefOnWindowLoad;
	
	$(window).load(qodefOnWindowLoad);
	
	/*
	 All functions to be called on $(window).load() should be in this function
	 */
	function qodefOnWindowLoad() {
		qodefSubscribePopup();
	}
	
	function qodefSubscribePopup() {
		var popupOpener = $('.qodef-subscribe-popup-holder'),
			popupClose = $('.qodef-sp-close');
		
		if (popupOpener.length) {
			var popupPreventHolder = popupOpener.find('.qodef-sp-prevent'),
				disabledPopup = 'no';
			
			if (popupPreventHolder.length) {
				var isLocalStorage = popupOpener.hasClass('qodef-sp-prevent-cookies'),
					popupPreventInput = popupPreventHolder.find('.qodef-sp-prevent-input'),
					preventValue = popupPreventInput.data('value');
				
				if (isLocalStorage) {
					disabledPopup = localStorage.getItem('disabledPopup');
					sessionStorage.removeItem('disabledPopup');
				} else {
					disabledPopup = sessionStorage.getItem('disabledPopup');
					localStorage.removeItem('disabledPopup');
				}
				
				popupPreventHolder.children().on('click', function (e) {
					if ( preventValue !== 'yes' ) {
						preventValue = 'yes';
						popupPreventInput.addClass('qodef-sp-prevent-clicked').data('value', 'yes');
					} else {
						preventValue = 'no';
						popupPreventInput.removeClass('qodef-sp-prevent-clicked').data('value', 'no');
					}
					
					if (preventValue === 'yes') {
						if (isLocalStorage) {
							localStorage.setItem('disabledPopup', 'yes');
						} else {
							sessionStorage.setItem('disabledPopup', 'yes');
						}
					} else {
						if (isLocalStorage) {
							localStorage.setItem('disabledPopup', 'no');
						} else {
							sessionStorage.setItem('disabledPopup', 'no');
						}
					}
				});
			}
			
			if (disabledPopup !== 'yes') {
				if (qodef.body.hasClass('qodef-sp-opened')) {
					qodef.body.removeClass('qodef-sp-opened');
					qodef.modules.common.qodefEnableScroll();
				} else {
					qodef.body.addClass('qodef-sp-opened');
					qodef.modules.common.qodefDisableScroll();
				}
				
				popupClose.on('click', function (e) {
					e.preventDefault();
					
					qodef.body.removeClass('qodef-sp-opened');
					qodef.modules.common.qodefEnableScroll();
				});
				
				//Close on escape
				$(document).keyup(function (e) {
					if (e.keyCode === 27) { //KeyCode for ESC button is 27
						qodef.body.removeClass('qodef-sp-opened');
						qodef.modules.common.qodefEnableScroll();
					}
				});
			}
		}
	}
	
})(jQuery);
(function($) {
    "use strict";

    var title = {};
    qodef.modules.title = title;

    title.qodefOnDocumentReady = qodefOnDocumentReady;

    $(document).ready(qodefOnDocumentReady);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function qodefOnDocumentReady() {
	    qodefParallaxTitle();
    }

    /*
     **	Title image with parallax effect
     */
	function qodefParallaxTitle() {
		var parallaxBackground = $('.qodef-title-holder.qodef-bg-parallax');
		
		if (parallaxBackground.length > 0 && qodef.windowWidth > 1024) {
			var parallaxBackgroundWithZoomOut = parallaxBackground.hasClass('qodef-bg-parallax-zoom-out'),
				titleHeight = parseInt(parallaxBackground.data('height')),
				imageWidth = parseInt(parallaxBackground.data('background-width')),
				parallaxRate = titleHeight / 10000 * 7,
				parallaxYPos = -(qodef.scroll * parallaxRate),
				adminBarHeight = qodefGlobalVars.vars.qodefAddForAdminBar;
			
			parallaxBackground.css({'background-position': 'center ' + (parallaxYPos + adminBarHeight) + 'px'});
			
			if (parallaxBackgroundWithZoomOut) {
				parallaxBackgroundWithZoomOut.css({'background-size': imageWidth - qodef.scroll + 'px auto'});
			}
			
			//set position of background on window scroll
			$(window).scroll(function () {
				parallaxYPos = -(qodef.scroll * parallaxRate);
				parallaxBackground.css({'background-position': 'center ' + (parallaxYPos + adminBarHeight) + 'px'});
				
				if (parallaxBackgroundWithZoomOut) {
					parallaxBackgroundWithZoomOut.css({'background-size': imageWidth - qodef.scroll + 'px auto'});
				}
			});
		}
	}

})(jQuery);

(function($) {
    'use strict';

    var woocommerce = {};
    qodef.modules.woocommerce = woocommerce;

    woocommerce.qodefOnDocumentReady = qodefOnDocumentReady;

    $(document).ready(qodefOnDocumentReady);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function qodefOnDocumentReady() {
        qodefInitQuantityButtons();
        qodefInitSelect2();
	    qodefInitSingleProductLightbox();
    }
	
    /*
    ** Init quantity buttons to increase/decrease products for cart
    */
	function qodefInitQuantityButtons() {
		$(document).on('click', '.qodef-quantity-minus, .qodef-quantity-plus', function (e) {
			e.stopPropagation();
			
			var button = $(this),
				inputField = button.siblings('.qodef-quantity-input'),
				step = parseFloat(inputField.data('step')),
				max = parseFloat(inputField.data('max')),
				minus = false,
				inputValue = parseFloat(inputField.val()),
				newInputValue;
			
			if (button.hasClass('qodef-quantity-minus')) {
				minus = true;
			}
			
			if (minus) {
				newInputValue = inputValue - step;
				if (newInputValue >= 1) {
					inputField.val(newInputValue);
				} else {
					inputField.val(0);
				}
			} else {
				newInputValue = inputValue + step;
				if (max === undefined) {
					inputField.val(newInputValue);
				} else {
					if (newInputValue >= max) {
						inputField.val(max);
					} else {
						inputField.val(newInputValue);
					}
				}
			}
			
			inputField.trigger('change');
		});
	}

    /*
    ** Init select2 script for select html dropdowns
    */
	function qodefInitSelect2() {
		var orderByDropDown = $('.woocommerce-ordering .orderby');
		if (orderByDropDown.length) {
			orderByDropDown.select2({
				minimumResultsForSearch: Infinity
			});
		}
		
		var variableProducts = $('.qodef-woocommerce-page .qodef-content .variations td.value select');
		if (variableProducts.length) {
			variableProducts.select2();
		}
		
		var shippingCountryCalc = $('#calc_shipping_country');
		if (shippingCountryCalc.length) {
			shippingCountryCalc.select2();
		}
		
		var shippingStateCalc = $('.cart-collaterals .shipping select#calc_shipping_state');
		if (shippingStateCalc.length) {
			shippingStateCalc.select2();
		}
	}
	
	/*
	 ** Init Product Single Pretty Photo attributes
	 */
	function qodefInitSingleProductLightbox() {
		var item = $('.qodef-woo-single-page.qodef-woo-single-has-pretty-photo .images .woocommerce-product-gallery__image');
		
		if(item.length) {
			item.children('a').attr('data-rel', 'prettyPhoto[woo_single_pretty_photo]');
			
			if (typeof qodef.modules.common.qodefPrettyPhoto === "function") {
				qodef.modules.common.qodefPrettyPhoto();
			}
		}
	}

})(jQuery);
(function($) {
    "use strict";

    var blogListSC = {};
    qodef.modules.blogListSC = blogListSC;
    
    blogListSC.qodefOnWindowLoad = qodefOnWindowLoad;
    blogListSC.qodefOnWindowScroll = qodefOnWindowScroll;

    $(window).load(qodefOnWindowLoad);
    $(window).scroll(qodefOnWindowScroll);

    /*
     All functions to be called on $(window).load() should be in this function
     */
    function qodefOnWindowLoad() {
        qodefInitBlogListShortcodePagination().init();
        qodefInitTouchHover();
    }

    /*
     All functions to be called on $(window).scroll() should be in this function
     */
    function qodefOnWindowScroll() {
        qodefInitBlogListShortcodePagination().scroll();
    }

    /**
     * Init blog list shortcode pagination functions
     */
    function qodefInitBlogListShortcodePagination(){
        var holder = $('.qodef-blog-list-holder');

        var initStandardPagination = function(thisHolder) {
            var standardLink = thisHolder.find('.qodef-bl-standard-pagination li');

            if(standardLink.length) {
                standardLink.each(function(){
                    var thisLink = $(this).children('a'),
                        pagedLink = 1;

                    thisLink.on('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();

                        if (typeof thisLink.data('paged') !== 'undefined' && thisLink.data('paged') !== false) {
                            pagedLink = thisLink.data('paged');
                        }

                        initMainPagFunctionality(thisHolder, pagedLink);
                    });
                });
            }
        };

        var initLoadMorePagination = function(thisHolder) {
            var loadMoreButton = thisHolder.find('.qodef-blog-pag-load-more a');

            loadMoreButton.on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();

                initMainPagFunctionality(thisHolder);
            });
        };

        var initInifiteScrollPagination = function(thisHolder) {
            var blogListHeight = thisHolder.outerHeight(),
                blogListTopOffest = thisHolder.offset().top,
                blogListPosition = blogListHeight + blogListTopOffest - qodefGlobalVars.vars.qodefAddForAdminBar;

            if(!thisHolder.hasClass('qodef-bl-pag-infinite-scroll-started') && qodef.scroll + qodef.windowHeight > blogListPosition) {
                initMainPagFunctionality(thisHolder);
            }
        };

        var initMainPagFunctionality = function(thisHolder, pagedLink) {
            var thisHolderInner = thisHolder.find('.qodef-blog-list'),
                nextPage,
                maxNumPages;

            if (typeof thisHolder.data('max-num-pages') !== 'undefined' && thisHolder.data('max-num-pages') !== false) {
                maxNumPages = thisHolder.data('max-num-pages');
            }

            if(thisHolder.hasClass('qodef-bl-pag-standard-shortcodes')) {
                thisHolder.data('next-page', pagedLink);
            }

            if(thisHolder.hasClass('qodef-bl-pag-infinite-scroll')) {
                thisHolder.addClass('qodef-bl-pag-infinite-scroll-started');
            }

            var loadMoreDatta = qodef.modules.common.getLoadMoreData(thisHolder),
                loadingItem = thisHolder.find('.qodef-blog-pag-loading');

            nextPage = loadMoreDatta.nextPage;

			var nonceHolder = thisHolder.find('input[name*="qodef_blog_load_more_nonce_"]');

			loadMoreDatta.blog_load_more_id = nonceHolder.attr('name').substring(nonceHolder.attr('name').length - 4, nonceHolder.attr('name').length);
			loadMoreDatta.blog_load_more_nonce = nonceHolder.val();

            if(nextPage <= maxNumPages){
                if(thisHolder.hasClass('qodef-bl-pag-standard-shortcodes')) {
                    loadingItem.addClass('qodef-showing qodef-standard-pag-trigger');
                    thisHolder.addClass('qodef-bl-pag-standard-shortcodes-animate');
                } else {
                    loadingItem.addClass('qodef-showing');
                }

                var ajaxData = qodef.modules.common.setLoadMoreAjaxData(loadMoreDatta, 'aarhus_select_blog_shortcode_load_more');

                $.ajax({
                    type: 'POST',
                    data: ajaxData,
                    url: qodefGlobalVars.vars.qodefAjaxUrl,
                    success: function (data) {
                        if(!thisHolder.hasClass('qodef-bl-pag-standard-shortcodes')) {
                            nextPage++;
                        }

                        thisHolder.data('next-page', nextPage);

                        var response = $.parseJSON(data),
                            responseHtml =  response.html;

                        if(thisHolder.hasClass('qodef-bl-pag-standard-shortcodes')) {
                            qodefInitStandardPaginationLinkChanges(thisHolder, maxNumPages, nextPage);

                            thisHolder.waitForImages(function(){
                                if(thisHolder.hasClass('qodef-bl-masonry')){
                                    qodefInitHtmlIsotopeNewContent(thisHolder, thisHolderInner, loadingItem, responseHtml);
                                } else {
                                    qodefInitHtmlGalleryNewContent(thisHolder, thisHolderInner, loadingItem, responseHtml);

                                    if (typeof qodef.modules.common.qodefStickySidebarWidget === 'function') {
                                        qodef.modules.common.qodefStickySidebarWidget().reInit();
                                    }
                                }
                            });
                        } else {
                            thisHolder.waitForImages(function(){
                                if(thisHolder.hasClass('qodef-bl-masonry')){
                                    qodefInitAppendIsotopeNewContent(thisHolderInner, loadingItem, responseHtml);
                                } else {
                                    qodefInitAppendGalleryNewContent(thisHolderInner, loadingItem, responseHtml);

                                    if (typeof qodef.modules.common.qodefStickySidebarWidget === 'function') {
                                        qodef.modules.common.qodefStickySidebarWidget().reInit();
                                    }
                                }
                            });
                        }

                        if(thisHolder.hasClass('qodef-bl-pag-infinite-scroll-started')) {
                            thisHolder.removeClass('qodef-bl-pag-infinite-scroll-started');
                        }
                    }
                });
            }

            if(nextPage === maxNumPages){
                thisHolder.find('.qodef-blog-pag-load-more').hide();
            }
        };

        var qodefInitStandardPaginationLinkChanges = function(thisHolder, maxNumPages, nextPage) {
            var standardPagHolder = thisHolder.find('.qodef-bl-standard-pagination'),
                standardPagNumericItem = standardPagHolder.find('li.qodef-pag-number'),
                standardPagPrevItem = standardPagHolder.find('li.qodef-pag-prev a'),
                standardPagNextItem = standardPagHolder.find('li.qodef-pag-next a');

            standardPagNumericItem.removeClass('qodef-pag-active');
            standardPagNumericItem.eq(nextPage-1).addClass('qodef-pag-active');

            standardPagPrevItem.data('paged', nextPage-1);
            standardPagNextItem.data('paged', nextPage+1);

            if(nextPage > 1) {
                standardPagPrevItem.css({'opacity': '1'});
            } else {
                standardPagPrevItem.css({'opacity': '0'});
            }

            if(nextPage === maxNumPages) {
                standardPagNextItem.css({'opacity': '0'});
            } else {
                standardPagNextItem.css({'opacity': '1'});
            }
        };

        var qodefInitHtmlIsotopeNewContent = function(thisHolder, thisHolderInner, loadingItem, responseHtml) {
            thisHolderInner.html(responseHtml).isotope('reloadItems').isotope({sortBy: 'original-order'});
            loadingItem.removeClass('qodef-showing qodef-standard-pag-trigger');
            thisHolder.removeClass('qodef-bl-pag-standard-shortcodes-animate');

            setTimeout(function() {
                thisHolderInner.isotope('layout');

                if (typeof qodef.modules.common.qodefStickySidebarWidget === 'function') {
                    qodef.modules.common.qodefStickySidebarWidget().reInit();
                }
            }, 600);
        };

        var qodefInitHtmlGalleryNewContent = function(thisHolder, thisHolderInner, loadingItem, responseHtml) {
            loadingItem.removeClass('qodef-showing qodef-standard-pag-trigger');
            thisHolder.removeClass('qodef-bl-pag-standard-shortcodes-animate');
            thisHolderInner.html(responseHtml);
        };

        var qodefInitAppendIsotopeNewContent = function(thisHolderInner, loadingItem, responseHtml) {
            thisHolderInner.append(responseHtml).isotope('reloadItems').isotope({sortBy: 'original-order'});
            loadingItem.removeClass('qodef-showing');

            setTimeout(function() {
                thisHolderInner.isotope('layout');

                if (typeof qodef.modules.common.qodefStickySidebarWidget === 'function') {
                    qodef.modules.common.qodefStickySidebarWidget().reInit();
                }
            }, 600);
        };

        var qodefInitAppendGalleryNewContent = function(thisHolderInner, loadingItem, responseHtml) {
            loadingItem.removeClass('qodef-showing');
            thisHolderInner.append(responseHtml);
        };

        return {
            init: function() {
                if(holder.length) {
                    holder.each(function() {
                        var thisHolder = $(this);

                        if(thisHolder.hasClass('qodef-bl-pag-standard-shortcodes')) {
                            initStandardPagination(thisHolder);
                        }

                        if(thisHolder.hasClass('qodef-bl-pag-load-more')) {
                            initLoadMorePagination(thisHolder);
                        }

                        if(thisHolder.hasClass('qodef-bl-pag-infinite-scroll')) {
                            initInifiteScrollPagination(thisHolder);
                        }
                    });
                }
            },
            scroll: function() {
                if(holder.length) {
                    holder.each(function() {
                        var thisHolder = $(this);

                        if(thisHolder.hasClass('qodef-bl-pag-infinite-scroll')) {
                            initInifiteScrollPagination(thisHolder);
                        }
                    });
                }
            }
        };
    }

    /**
     * Function that add hover functionality on iOS devices
     */
    function qodefInitTouchHover() {
        var holder = $('.qodef-blog-list-holder'),
            item = holder.find('.qodef-bl-item');

        item.each(function() {
            $(this).on('touchstart touchend',function() {
                $(this).toggleClass('mhover');
            });
        });
    }

})(jQuery);
(function($) {
    "use strict";

    var headerBottom = {};
    qodef.modules.headerBottom = headerBottom;

    headerBottom.qodefOnDocumentReady = qodefOnDocumentReady;

    $(document).ready(qodefOnDocumentReady);

    /*
     All functions to be called on $(document).ready() should be in this function
     */
    function qodefOnDocumentReady() {
        qodefBottomMenu().init();
        qodefBottomMenuPosition();
    }

    /**
     * Init Bottom Menu
     */
    var qodefBottomMenu = function() {
        /**
         * Main vertical area object that used through out function
         * @type {jQuery object}
         */
        var verticalMenuObject = $('.qodef-header-bottom .qodef-vertical-menu-area');

        var initNavigation = function() {
            var verticalMenuOpener = $('.qodef-header-bottom .qodef-header-bottom-menu-opener'),
                headerObject = $('.qodef-header-bottom .qodef-page-header'),
                verticalMenuNavHolder = verticalMenuObject.find('.qodef-vertical-menu-nav-holder-outer'),
                menuItemWithChild =  verticalMenuObject.find('.qodef-header-bottom-menu > ul li.has_sub > a'),
                menuItemWithoutChild = verticalMenuObject.find('.qodef-header-bottom-menu ul li:not(.has_sub) a');

            //set height of vertical menu holder and initialize perfectScrollbar
            verticalMenuNavHolder.height(qodef.windowHeight);
            qodef.modules.common.qodefInitPerfectScrollbar().init(verticalMenuNavHolder);

            //set height of vertical menu holder on resize
            $(window).resize(function() {
                verticalMenuNavHolder.height(qodef.windowHeight);
            });

            verticalMenuOpener.on('click',function(e){
                e.preventDefault();
                if(!verticalMenuNavHolder.hasClass('active')){
                    verticalMenuNavHolder.addClass('active');
                    verticalMenuObject.addClass('opened');
                    verticalMenuOpener.addClass('active');
                    qodef.body.addClass('qodef-header-bottom-opened');
                    if(!qodef.body.hasClass('page-template-full_screen-php')){
                        qodef.modules.common.qodefDisableScroll();
                    }
                }else{
                    verticalMenuNavHolder.removeClass('active');
                    verticalMenuObject.removeClass('opened');
                    verticalMenuOpener.removeClass('active');
                    qodef.body.removeClass('qodef-header-bottom-opened');
                    if(!qodef.body.hasClass('page-template-full_screen-php')){
                        qodef.modules.common.qodefEnableScroll();
                    }
                }
            });

            headerObject.next().on('click', function(){
                if(verticalMenuNavHolder.hasClass('active')){
                    verticalMenuNavHolder.removeClass('active');
                    verticalMenuObject.removeClass('opened');
                    verticalMenuOpener.removeClass('active');
                    qodef.body.removeClass('qodef-header-bottom-opened');
                    if(!qodef.body.hasClass('page-template-full_screen-php')){
                        qodef.modules.common.qodefEnableScroll();
                    }
                }
            });

            $('.qodef-slider, .qodef-title-holder').on('click', function(){
                if(verticalMenuNavHolder.hasClass('active')){
                    verticalMenuNavHolder.removeClass('active');
                    verticalMenuObject.removeClass('opened');
                    verticalMenuOpener.removeClass('active');
                    qodef.body.removeClass('qodef-header-bottom-opened');
                    if(!qodef.body.hasClass('page-template-full_screen-php')){
                        qodef.modules.common.qodefEnableScroll();
                    }
                }
            });

            //logic for open sub menus in popup menu
            menuItemWithChild.on('tap click', function(e) {
                e.preventDefault();

                if ($(this).parent().hasClass('has_sub')) {
                    var submenu = $(this).parent().find('> ul.sub_menu');
                    if (submenu.is(':visible')) {
                        submenu.slideUp(200);
                        $(this).parent().removeClass('open_sub');
                    } else {
                        if($(this).parent().siblings().hasClass('open_sub')) {
                            $(this).parent().siblings().each(function() {
                                var sibling = $(this);
                                if(sibling.hasClass('open_sub')) {
                                    var openedUl = sibling.find('> ul.sub_menu');
                                    openedUl.slideUp(200);
                                    sibling.removeClass('open_sub');
                                }
                                if(sibling.find('.open_sub')) {
                                    var openedUlUl = sibling.find('.open_sub').find('> ul.sub_menu');
                                    openedUlUl.slideUp(200);
                                    sibling.find('.open_sub').removeClass('open_sub');
                                }
                            });
                        }

                        $(this).parent().addClass('open_sub');
                        submenu.slideDown(200);
                    }
                }
                return false;
            });

        };

        return {
            /**
             * Calls all necessary functionality for vertical menu area if vertical area object is valid
             */
            init: function() {
                if(verticalMenuObject.length) {
                    initNavigation();
                }
            }
        };
    };

    function qodefBottomMenuPosition() {
        var bottomHeader = $('.qodef-header-bottom');
        
        if(bottomHeader.length && qodef.windowWidth > 1024) {
            var slider = $('.qodef-slider'),
                sliderHeightUsed = slider.length && slider.outerHeight() + qodefGlobalVars.vars.qodefMenuAreaHeight < qodef.windowHeight,
                initialHeight = sliderHeightUsed ? slider.outerHeight() : qodef.windowHeight - qodefGlobalVars.vars.qodefMenuAreaHeight,
                contentHolder = $('.qodef-content'),
                footer = $('footer'),
                footerHeight = footer.outerHeight(),
                uncoveringFooter = footer.hasClass('qodef-footer-uncover');
            
            if(slider.length > 0) {
                slider.addClass('qodef-slider-fixed');
                contentHolder.css("padding-top", initialHeight);
            }
            
            $(window).scroll(function() {
                if(qodef.windowWidth > 1024) {
                    calculatePosition(initialHeight, uncoveringFooter, footerHeight);
                }
            });
        }

        function calculatePosition(initialHeight, uncoveringFooter, footerHeight) {
            if(uncoveringFooter) {
                if(qodef.window.scrollTop() > initialHeight) {
                    slider.css('margin-top', '-' + footerHeight + 'px');
                } else {
                    slider.css('margin-top', 0);
                }
            }
        }
    }

})(jQuery);
(function($) {
    "use strict";

    var headerMinimal = {};
    qodef.modules.headerMinimal = headerMinimal;
	
	headerMinimal.qodefOnDocumentReady = qodefOnDocumentReady;

    $(document).ready(qodefOnDocumentReady);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function qodefOnDocumentReady() {
        qodefFullscreenMenu();
    }

    /**
     * Init Fullscreen Menu
     */
    function qodefFullscreenMenu() {
	    var popupMenuOpener = $( 'a.qodef-fullscreen-menu-opener');
	    
        if (popupMenuOpener.length) {
            var popupMenuHolderOuter = $(".qodef-fullscreen-menu-holder-outer"),
                cssClass,
            //Flags for type of animation
                fadeRight = false,
                fadeTop = false,
            //Widgets
                widgetAboveNav = $('.qodef-fullscreen-above-menu-widget-holder'),
                widgetBelowNav = $('.qodef-fullscreen-below-menu-widget-holder'),
            //Menu
                menuItems = $('.qodef-fullscreen-menu-holder-outer nav > ul > li > a'),
                menuItemWithChild =  $('.qodef-fullscreen-menu > ul li.has_sub > a'),
                menuItemWithoutChild = $('.qodef-fullscreen-menu ul li:not(.has_sub) a');

            //set height of popup holder and initialize perfectScrollbar
            qodef.modules.common.qodefInitPerfectScrollbar().init(popupMenuHolderOuter);

            //set height of popup holder on resize
            $(window).resize(function() {
                popupMenuHolderOuter.height(qodef.windowHeight);
            });

            if (qodef.body.hasClass('qodef-fade-push-text-right')) {
                cssClass = 'qodef-push-nav-right';
                fadeRight = true;
            } else if (qodef.body.hasClass('qodef-fade-push-text-top')) {
                cssClass = 'qodef-push-text-top';
                fadeTop = true;
            }

            //Appearing animation
            if (fadeRight || fadeTop) {
                if (widgetAboveNav.length) {
                    widgetAboveNav.children().css({
                        '-webkit-animation-delay' : 0 + 'ms',
                        '-moz-animation-delay' : 0 + 'ms',
                        'animation-delay' : 0 + 'ms'
                    });
                }
                menuItems.each(function(i) {
                    $(this).css({
                        '-webkit-animation-delay': (i+1) * 70 + 'ms',
                        '-moz-animation-delay': (i+1) * 70 + 'ms',
                        'animation-delay': (i+1) * 70 + 'ms'
                    });
                });
                if (widgetBelowNav.length) {
                    widgetBelowNav.children().css({
                        '-webkit-animation-delay' : (menuItems.length + 1)*70 + 'ms',
                        '-moz-animation-delay' : (menuItems.length + 1)*70 + 'ms',
                        'animation-delay' : (menuItems.length + 1)*70 + 'ms'
                    });
                }
            }

            // Open popup menu
            popupMenuOpener.on('click',function(e){
                e.preventDefault();

                if (!popupMenuOpener.hasClass('qodef-fm-opened')) {
                    popupMenuOpener.addClass('qodef-fm-opened');
                    qodef.body.removeClass('qodef-fullscreen-fade-out').addClass('qodef-fullscreen-menu-opened qodef-fullscreen-fade-in');
                    qodef.body.removeClass(cssClass);
                    qodef.modules.common.qodefDisableScroll();
                    
                    $(document).keyup(function(e){
                        if (e.keyCode === 27 ) {
                            popupMenuOpener.removeClass('qodef-fm-opened');
                            qodef.body.removeClass('qodef-fullscreen-menu-opened qodef-fullscreen-fade-in').addClass('qodef-fullscreen-fade-out');
                            qodef.body.addClass(cssClass);
                            qodef.modules.common.qodefEnableScroll();

                            $("nav.qodef-fullscreen-menu ul.sub_menu").slideUp(200);
                        }
                    });
                } else {
                    popupMenuOpener.removeClass('qodef-fm-opened');
                    qodef.body.removeClass('qodef-fullscreen-menu-opened qodef-fullscreen-fade-in').addClass('qodef-fullscreen-fade-out');
                    qodef.body.addClass(cssClass);
                    qodef.modules.common.qodefEnableScroll();

                    $("nav.qodef-fullscreen-menu ul.sub_menu").slideUp(200);
                }
            });

            //logic for open sub menus in popup menu
            menuItemWithChild.on('tap click', function(e) {
                e.preventDefault();

                var thisItem = $(this),
	                thisItemParent = thisItem.parent(),
					thisItemParentSiblingsWithDrop = thisItemParent.siblings('.menu-item-has-children');

                if (thisItemParent.hasClass('has_sub')) {
	                var submenu = thisItemParent.find('> ul.sub_menu');
	
	                if (submenu.is(':visible')) {
		                submenu.slideUp(450, 'easeInOutQuint');
		                thisItemParent.removeClass('open_sub');
	                } else {
		                thisItemParent.addClass('open_sub');
		
		                if(thisItemParentSiblingsWithDrop.length === 0) {
			                submenu.slideDown(400, 'easeInOutQuint');
		                } else {
							thisItemParent.closest('li.menu-item').siblings().find('.menu-item').removeClass('open_sub');
			                thisItemParent.siblings().removeClass('open_sub').find('.sub_menu').slideUp(400, 'easeInOutQuint', function() {
				                submenu.slideDown(400, 'easeInOutQuint');
			                });
		                }
	                }
                }
                
                return false;
            });

            //if link has no submenu and if it's not dead, than open that link
            menuItemWithoutChild.on('click', function (e) {
                if(($(this).attr('href') !== "http://#") && ($(this).attr('href') !== "#")){
                    if (e.which === 1) {
                        popupMenuOpener.removeClass('qodef-fm-opened');
                        qodef.body.removeClass('qodef-fullscreen-menu-opened');
                        qodef.body.removeClass('qodef-fullscreen-fade-in').addClass('qodef-fullscreen-fade-out');
                        qodef.body.addClass(cssClass);
                        $("nav.qodef-fullscreen-menu ul.sub_menu").slideUp(200);
                        qodef.modules.common.qodefEnableScroll();
                    }
                } else {
                    return false;
                }
            });
        }
    }

})(jQuery);
(function($) {
    "use strict";

    var headerVertical = {};
    qodef.modules.headerVertical = headerVertical;
	
	headerVertical.qodefOnDocumentReady = qodefOnDocumentReady;

    $(document).ready(qodefOnDocumentReady);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function qodefOnDocumentReady() {
        qodefVerticalMenu().init();
    }

    /**
     * Function object that represents vertical menu area.
     * @returns {{init: Function}}
     */
    var qodefVerticalMenu = function() {
	    var verticalMenuObject = $('.qodef-vertical-menu-area');

	    /**
	     * Checks if vertical area is scrollable (if it has qodef-with-scroll class)
	     *
	     * @returns {bool}
	     */
	    var verticalAreaScrollable = function () {
		    return verticalMenuObject.hasClass('qodef-with-scroll');
	    };
	
	    /**
	     * Initialzes navigation functionality. It checks navigation type data attribute and calls proper functions
	     */
	    var initNavigation = function () {
		    var verticalNavObject = verticalMenuObject.find('.qodef-vertical-menu');

		    if (verticalNavObject.hasClass('qodef-vertical-dropdown-below')) {
				dropdownClickToggle();
			} else if (verticalNavObject.hasClass('qodef-vertical-dropdown-side')) {
				dropdownFloat();
			}
		
		    /**
		     * Initializes click toggle navigation type. Works the same for touch and no-touch devices
		     */
		    function dropdownClickToggle() {
			    var menuItems = verticalNavObject.find('ul li.menu-item-has-children');
			
			    menuItems.each(function () {
				    var elementToExpand = $(this).find(' > .second, > ul');
				    var menuItem = this;
				    var dropdownOpener = $(this).find('> a');
				    var slideUpSpeed = 'fast';
				    var slideDownSpeed = 'slow';
				
				    dropdownOpener.on('click tap', function (e) {
					    e.preventDefault();
					    e.stopPropagation();
					
					    if (elementToExpand.is(':visible')) {
						    $(menuItem).removeClass('open');
						    elementToExpand.slideUp(slideUpSpeed);
					    } else if (dropdownOpener.parent().parent().children().hasClass('open') && dropdownOpener.parent().parent().parent().hasClass('qodef-vertical-menu')) {
						    $(this).parent().parent().children().removeClass('open');
						    $(this).parent().parent().children().find(' > .second').slideUp(slideUpSpeed);
						
						    $(menuItem).addClass('open');
						    elementToExpand.slideDown(slideDownSpeed);
					    } else {
						
						    if (!$(this).parents('li').hasClass('open')) {
							    menuItems.removeClass('open');
							    menuItems.find(' > .second, > ul').slideUp(slideUpSpeed);
						    }
						
						    if ($(this).parent().parent().children().hasClass('open')) {
							    $(this).parent().parent().children().removeClass('open');
							    $(this).parent().parent().children().find(' > .second, > ul').slideUp(slideUpSpeed);
						    }
						
						    $(menuItem).addClass('open');
						    elementToExpand.slideDown(slideDownSpeed);
					    }
				    });
			    });
		    }


			/**
			 * Initializes click float navigation type
			 */
			function dropdownFloat() {
				var menuItems = verticalNavObject.find('ul li.menu-item-has-children');
				var allDropdowns = menuItems.find(' > .second > .inner > ul, > ul');

				menuItems.each(function() {
					var elementToExpand = $(this).find(' > .second > .inner > ul, > ul');
					var menuItem = this;

					if(Modernizr.touch) {
						var dropdownOpener = $(this).find('> a');

						dropdownOpener.on('click tap', function(e) {
							e.preventDefault();
							e.stopPropagation();

							if(elementToExpand.hasClass('qodef-float-open')) {
								elementToExpand.removeClass('qodef-float-open');
								$(menuItem).removeClass('open');
							} else {
								if(!$(this).parents('li').hasClass('open')) {
									menuItems.removeClass('open');
									allDropdowns.removeClass('qodef-float-open');
								}

								elementToExpand.addClass('qodef-float-open');
								$(menuItem).addClass('open');
							}
						});
					} else {
						//must use hoverIntent because basic hover effect doesn't catch dropdown
						//it doesn't start from menu item's edge
						$(this).hoverIntent({
							over: function() {
								elementToExpand.addClass('qodef-float-open');
								$(menuItem).addClass('open');
							},
							out: function() {
								elementToExpand.removeClass('qodef-float-open');
								$(menuItem).removeClass('open');
							},
							timeout: 300
						});
					}
				});
			}
	    };

        /**
         * Initializes scrolling in vertical area. It checks if vertical area is scrollable before doing so
         */
        var initVerticalAreaScroll = function() {
            if(verticalAreaScrollable()) {
                qodef.modules.common.qodefInitPerfectScrollbar().init(verticalMenuObject);
            }
        };

        return {
            /**
             * Calls all necessary functionality for vertical menu area if vertical area object is valid
             */
            init: function() {
                if(verticalMenuObject.length) {
                    initNavigation();
                    initVerticalAreaScroll();
                }
            }
        };
    };

})(jQuery);
(function($) {
    "use strict";

    var headerVerticalSliding = {};
    qodef.modules.headerVerticalSliding = headerVerticalSliding;
	
	headerVerticalSliding.qodefOnDocumentReady = qodefOnDocumentReady;

    $(document).ready(qodefOnDocumentReady);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function qodefOnDocumentReady() {
        qodefVerticalSlidingMenu().init();
    }

    /**
     * Function object that represents vertical menu area.
     * @returns {{init: Function}}
     */
    var qodefVerticalSlidingMenu = function() {
	    var verticalMenuObject = $('.qodef-header-vertical-sliding .qodef-vertical-menu-area');
	
	    var initNavigation = function () {
		    var varticalMenuOpener = verticalMenuObject.find('.qodef-vertical-menu-opener a'),
			    verticalMenuNavHolder = verticalMenuObject.find('.qodef-vertical-menu-nav-holder-outer'),
			    menuItemWithChild = verticalMenuObject.find('.qodef-fullscreen-menu > ul li.has_sub > a'),
			    menuItemWithoutChild = verticalMenuObject.find('.qodef-fullscreen-menu ul li:not(.has_sub) a');
		
		    //set height of vertical menu holder and initialize perfectScrollbar
		    verticalMenuNavHolder.height(qodef.windowHeight);
            qodef.modules.common.qodefInitPerfectScrollbar().init(verticalMenuNavHolder);
		
		    //set height of vertical menu holder on resize
		    $(window).resize(function () {
			    verticalMenuNavHolder.height(qodef.windowHeight);
		    });
		
		    varticalMenuOpener.on('click', function (e) {
			    e.preventDefault();
			
			    if (!verticalMenuNavHolder.hasClass('active')) {
				    verticalMenuNavHolder.addClass('active');
				    verticalMenuObject.addClass('opened');
				    if (!qodef.body.hasClass('page-template-full_screen-php')) {
					    qodef.modules.common.qodefDisableScroll();
				    }
			    } else {
				    verticalMenuNavHolder.removeClass('active');
				    verticalMenuObject.removeClass('opened');
				    if (!qodef.body.hasClass('page-template-full_screen-php')) {
					    qodef.modules.common.qodefEnableScroll();
				    }
			    }
		    });
		
		    $('.qodef-content').on('click', function () {
			    if (verticalMenuNavHolder.hasClass('active')) {
				    verticalMenuNavHolder.removeClass('active');
				    verticalMenuObject.removeClass('opened');
				    if (!qodef.body.hasClass('page-template-full_screen-php')) {
					    qodef.modules.common.qodefEnableScroll();
				    }
			    }
		    });
		
		    //logic for open sub menus in popup menu
		    menuItemWithChild.on('tap click', function (e) {
			    e.preventDefault();
			
			    if ($(this).parent().hasClass('has_sub')) {
				    var submenu = $(this).parent().find('> ul.sub_menu');
				    
				    if (submenu.is(':visible')) {
					    submenu.slideUp(200);
					    $(this).parent().removeClass('open_sub');
				    } else {
					    if ($(this).parent().siblings().hasClass('open_sub')) {
						    $(this).parent().siblings().each(function () {
							    var sibling = $(this);
							    if (sibling.hasClass('open_sub')) {
								    var openedUl = sibling.find('> ul.sub_menu');
								    openedUl.slideUp(200);
								    sibling.removeClass('open_sub');
							    }
							    if (sibling.find('.open_sub')) {
								    var openedUlUl = sibling.find('.open_sub').find('> ul.sub_menu');
								    openedUlUl.slideUp(200);
								    sibling.find('.open_sub').removeClass('open_sub');
							    }
						    });
					    }
					
					    $(this).parent().addClass('open_sub');
					    submenu.slideDown(200);
				    }
			    }
			    return false;
		    });
		
	    };
	
	    return {
		    /**
		     * Calls all necessary functionality for vertical menu area if vertical area object is valid
		     */
		    init: function () {
			    if (verticalMenuObject.length) {
				    initNavigation();
				
			    }
		    }
	    };
    };

})(jQuery);
(function ($) {
	"use strict";
	
	var mobileHeader = {};
	qodef.modules.mobileHeader = mobileHeader;
	
	mobileHeader.qodefOnDocumentReady = qodefOnDocumentReady;
	mobileHeader.qodefOnWindowResize = qodefOnWindowResize;
	
	$(document).ready(qodefOnDocumentReady);
	$(window).resize(qodefOnWindowResize);
	
	/*
		All functions to be called on $(document).ready() should be in this function
	*/
	function qodefOnDocumentReady() {
		qodefInitMobileNavigation();
		qodefInitMobileNavigationScroll();
		qodefMobileHeaderBehavior();
	}
	
	/*
        All functions to be called on $(window).resize() should be in this function
    */
	function qodefOnWindowResize() {
		qodefInitMobileNavigationScroll();
	}
	
	function qodefInitMobileNavigation() {
		var navigationOpener = $('.qodef-mobile-header .qodef-mobile-menu-opener'),
			navigationHolder = $('.qodef-mobile-header .qodef-mobile-nav'),
			dropdownOpener = $('.qodef-mobile-nav .mobile_arrow, .qodef-mobile-nav h6, .qodef-mobile-nav a.qodef-mobile-no-link');
		
		//whole mobile menu opening / closing
		if (navigationOpener.length && navigationHolder.length) {
			navigationOpener.on('tap click', function (e) {
				e.stopPropagation();
				e.preventDefault();
				
				if (navigationHolder.is(':visible')) {
					navigationHolder.slideUp(450, 'easeInOutQuint');
					navigationOpener.removeClass('qodef-mobile-menu-opened');
				} else {
					navigationHolder.slideDown(450, 'easeInOutQuint');
					navigationOpener.addClass('qodef-mobile-menu-opened');
				}
			});
		}
		
		//dropdown opening / closing
		if (dropdownOpener.length) {
			dropdownOpener.each(function () {
                var thisItem = $(this),
                    initialNavHeight = navigationHolder.outerHeight();
				
				thisItem.on('tap click', function (e) {
					var thisItemParent = thisItem.parent('li'),
						thisItemParentSiblingsWithDrop = thisItemParent.siblings('.menu-item-has-children');
					
					if (thisItemParent.hasClass('has_sub')) {
						var submenu = thisItemParent.find('> ul.sub_menu');
						
						if (submenu.is(':visible')) {
							submenu.slideUp(450, 'easeInOutQuint');
							thisItemParent.removeClass('qodef-opened');
                            navigationHolder.stop().animate({'height': initialNavHeight}, 300);
						} else {
							thisItemParent.addClass('qodef-opened');
							
							if (thisItemParentSiblingsWithDrop.length === 0) {
								thisItemParent.find('.sub_menu').slideUp(400, 'easeInOutQuint', function () {
									submenu.slideDown(400, 'easeInOutQuint');
                                    navigationHolder.stop().animate({'height': initialNavHeight + 50}, 300);
								});
							} else {
								thisItemParent.siblings().removeClass('qodef-opened').find('.sub_menu').slideUp(400, 'easeInOutQuint', function () {
									submenu.slideDown(400, 'easeInOutQuint');
                                    navigationHolder.stop().animate({'height': initialNavHeight + 50}, 300);
								});
							}
						}
					}
				});
			});
		}
		
		$('.qodef-mobile-nav a, .qodef-mobile-logo-wrapper a').on('click tap', function (e) {
			if ($(this).attr('href') !== 'http://#' && $(this).attr('href') !== '#') {
				navigationHolder.slideUp(450, 'easeInOutQuint');
				navigationOpener.removeClass("qodef-mobile-menu-opened");
			}
		});
	}
	
	function qodefInitMobileNavigationScroll() {
		if (qodef.windowWidth <= 1024) {
			var mobileHeader = $('.qodef-mobile-header'),
				mobileHeaderHeight = mobileHeader.length ? mobileHeader.height() : 0,
				navigationHolder = mobileHeader.find('.qodef-mobile-nav'),
				navigationHeight = navigationHolder.outerHeight(),
				windowHeight = qodef.windowHeight - 100;
			
			//init scrollable menu
			var scrollHeight = mobileHeaderHeight + navigationHeight > windowHeight ? windowHeight - mobileHeaderHeight : navigationHeight;

            // in case if mobile header exists on specific page
            if(navigationHolder.length) {
                navigationHolder.height(scrollHeight);
                qodef.modules.common.qodefInitPerfectScrollbar().init(navigationHolder);
            }
		}
	}
	
	function qodefMobileHeaderBehavior() {
		var mobileHeader = $('.qodef-mobile-header'),
			mobileMenuOpener = mobileHeader.find('.qodef-mobile-menu-opener'),
			mobileHeaderHeight = mobileHeader.length ? mobileHeader.outerHeight() : 0;
		
		if (qodef.body.hasClass('qodef-content-is-behind-header') && mobileHeaderHeight > 0 && qodef.windowWidth <= 1024) {
			$('.qodef-content').css('marginTop', -mobileHeaderHeight);
		}
		
		if (qodef.body.hasClass('qodef-sticky-up-mobile-header')) {
			var stickyAppearAmount,
				adminBar = $('#wpadminbar');
			
			var docYScroll1 = $(document).scrollTop();
			stickyAppearAmount = mobileHeaderHeight + qodefGlobalVars.vars.qodefAddForAdminBar;
			
			$(window).scroll(function () {
				var docYScroll2 = $(document).scrollTop();
				
				if (docYScroll2 > stickyAppearAmount) {
					mobileHeader.addClass('qodef-animate-mobile-header');
				} else {
					mobileHeader.removeClass('qodef-animate-mobile-header');
				}
				
				if ((docYScroll2 > docYScroll1 && docYScroll2 > stickyAppearAmount && !mobileMenuOpener.hasClass('qodef-mobile-menu-opened')) || (docYScroll2 < stickyAppearAmount)) {
					mobileHeader.removeClass('mobile-header-appear');
					mobileHeader.css('margin-bottom', 0);
					
					if (adminBar.length) {
						mobileHeader.find('.qodef-mobile-header-inner').css('top', 0);
					}
				} else {
					mobileHeader.addClass('mobile-header-appear');
					mobileHeader.css('margin-bottom', stickyAppearAmount);
				}
				
				docYScroll1 = $(document).scrollTop();
			});
		}
	}
	
})(jQuery);
(function($) {
    "use strict";

    var stickyHeader = {};
    qodef.modules.stickyHeader = stickyHeader;
	
	stickyHeader.isStickyVisible = false;
	stickyHeader.stickyAppearAmount = 0;
	stickyHeader.behaviour = '';
	
	stickyHeader.qodefOnDocumentReady = qodefOnDocumentReady;

    $(document).ready(qodefOnDocumentReady);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function qodefOnDocumentReady() {
	    if(qodef.windowWidth > 1024) {
		    qodefHeaderBehaviour();
	    }
    }

    /*
     **	Show/Hide sticky header on window scroll
     */
    function qodefHeaderBehaviour() {
        var header = $('.qodef-page-header'),
	        stickyHeader = $('.qodef-sticky-header'),
            fixedHeaderWrapper = $('.qodef-fixed-wrapper'),
	        fixedMenuArea = fixedHeaderWrapper.children('.qodef-menu-area'),
	        fixedMenuAreaHeight = fixedMenuArea.outerHeight(),
            sliderHolder = $('.qodef-slider'),
            revSliderHeight = sliderHolder.length ? sliderHolder.outerHeight() : 0,
	        stickyAppearAmount,
	        headerAppear;
        
        var headerMenuAreaOffset = fixedHeaderWrapper.length ? fixedHeaderWrapper.offset().top - qodefGlobalVars.vars.qodefAddForAdminBar : 0;

        switch(true) {
            // sticky header that will be shown when user scrolls up
            case qodef.body.hasClass('qodef-sticky-header-on-scroll-up'):
                qodef.modules.stickyHeader.behaviour = 'qodef-sticky-header-on-scroll-up';
                var docYScroll1 = $(document).scrollTop();
                stickyAppearAmount = parseInt(qodefGlobalVars.vars.qodefTopBarHeight) + parseInt(qodefGlobalVars.vars.qodefLogoAreaHeight) + parseInt(qodefGlobalVars.vars.qodefMenuAreaHeight) + parseInt(qodefGlobalVars.vars.qodefStickyHeaderHeight);
	            
                headerAppear = function(){
                    var docYScroll2 = $(document).scrollTop();
					
                    if((docYScroll2 > docYScroll1 && docYScroll2 > stickyAppearAmount) || (docYScroll2 < stickyAppearAmount)) {
                        qodef.modules.stickyHeader.isStickyVisible = false;
                        stickyHeader.removeClass('header-appear').find('.qodef-main-menu .second').removeClass('qodef-drop-down-start');
                        qodef.body.removeClass('qodef-sticky-header-appear');
                    } else {
                        qodef.modules.stickyHeader.isStickyVisible = true;
                        stickyHeader.addClass('header-appear');
	                    qodef.body.addClass('qodef-sticky-header-appear');
                    }

                    docYScroll1 = $(document).scrollTop();
                };
                headerAppear();

                $(window).scroll(function() {
                    headerAppear();
                });

                break;

            // sticky header that will be shown when user scrolls both up and down
            case qodef.body.hasClass('qodef-sticky-header-on-scroll-down-up'):
                qodef.modules.stickyHeader.behaviour = 'qodef-sticky-header-on-scroll-down-up';

                if(qodefPerPageVars.vars.qodefStickyScrollAmount !== 0){
                    qodef.modules.stickyHeader.stickyAppearAmount = parseInt(qodefPerPageVars.vars.qodefStickyScrollAmount);
                } else {
                    qodef.modules.stickyHeader.stickyAppearAmount = parseInt(qodefGlobalVars.vars.qodefTopBarHeight) + parseInt(qodefGlobalVars.vars.qodefLogoAreaHeight) + parseInt(qodefGlobalVars.vars.qodefMenuAreaHeight) + parseInt(revSliderHeight);
                }

                headerAppear = function(){
                    if(qodef.scroll < qodef.modules.stickyHeader.stickyAppearAmount) {
                        qodef.modules.stickyHeader.isStickyVisible = false;
                        stickyHeader.removeClass('header-appear').find('.qodef-main-menu .second').removeClass('qodef-drop-down-start');
	                    qodef.body.removeClass('qodef-sticky-header-appear');
                    }else{
                        qodef.modules.stickyHeader.isStickyVisible = true;
                        stickyHeader.addClass('header-appear');
	                    qodef.body.addClass('qodef-sticky-header-appear');
                    }
                };

                headerAppear();

                $(window).scroll(function() {
                    headerAppear();
                });

                break;

            // on scroll down, part of header will be sticky
            case qodef.body.hasClass('qodef-fixed-on-scroll'):
                qodef.modules.stickyHeader.behaviour = 'qodef-fixed-on-scroll';
                var headerFixed = function(){
	
	                if(qodef.scroll <= headerMenuAreaOffset) {
		                fixedHeaderWrapper.removeClass('fixed');
		                qodef.body.removeClass('qodef-fixed-header-appear');
		                header.css('margin-bottom', '0');
	                } else {
		                fixedHeaderWrapper.addClass('fixed');
		                qodef.body.addClass('qodef-fixed-header-appear');
		                header.css('margin-bottom', fixedMenuAreaHeight + 'px');
	                }
                };

                headerFixed();

                $(window).scroll(function() {
                    headerFixed();
                });

                break;
        }
    }

})(jQuery);
(function($) {
    "use strict";

    var searchFullscreen = {};
    qodef.modules.searchFullscreen = searchFullscreen;

    searchFullscreen.qodefOnDocumentReady = qodefOnDocumentReady;

    $(document).ready(qodefOnDocumentReady);
    
    /* 
        All functions to be called on $(document).ready() should be in this function
    */
    function qodefOnDocumentReady() {
	    qodefSearchFullscreen();
    }
	
	/**
	 * Init Search Types
	 */
	function qodefSearchFullscreen() {
        if ( qodef.body.hasClass( 'qodef-fullscreen-search' ) ) {

            var searchOpener = $('a.qodef-search-opener');

            if (searchOpener.length > 0) {

                var searchHolder = $('.qodef-fullscreen-search-holder'),
                    searchClose = $('.qodef-search-close');

                searchOpener.on('click', function (e) {
                    e.preventDefault();

                    if (searchHolder.hasClass('qodef-animate')) {
                        qodef.body.removeClass('qodef-fullscreen-search-opened qodef-search-fade-out');
                        qodef.body.removeClass('qodef-search-fade-in');
                        searchHolder.removeClass('qodef-animate');

                        setTimeout(function () {
                            searchHolder.find('.qodef-search-field').val('');
                            searchHolder.find('.qodef-search-field').blur();
                        }, 300);

                        qodef.modules.common.qodefEnableScroll();
                    } else {
                        qodef.body.addClass('qodef-fullscreen-search-opened qodef-search-fade-in');
                        qodef.body.removeClass('qodef-search-fade-out');
                        searchHolder.addClass('qodef-animate');

                        setTimeout(function () {
                            searchHolder.find('.qodef-search-field').focus();
                        }, 900);

                        qodef.modules.common.qodefDisableScroll();
                    }

                    searchClose.on('click', function (e) {
                        e.preventDefault();
                        qodef.body.removeClass('qodef-fullscreen-search-opened qodef-search-fade-in');
                        qodef.body.addClass('qodef-search-fade-out');
                        searchHolder.removeClass('qodef-animate');

                        setTimeout(function () {
                            searchHolder.find('.qodef-search-field').val('');
                            searchHolder.find('.qodef-search-field').blur();
                        }, 300);

                        qodef.modules.common.qodefEnableScroll();
                    });

                    //Close on click away
                    $(document).mouseup(function (e) {
                        var container = $(".qodef-form-holder-inner");

                        if (!container.is(e.target) && container.has(e.target).length === 0) {
                            e.preventDefault();
                            qodef.body.removeClass('qodef-fullscreen-search-opened qodef-search-fade-in');
                            qodef.body.addClass('qodef-search-fade-out');
                            searchHolder.removeClass('qodef-animate');

                            setTimeout(function () {
                                searchHolder.find('.qodef-search-field').val('');
                                searchHolder.find('.qodef-search-field').blur();
                            }, 300);

                            qodef.modules.common.qodefEnableScroll();
                        }
                    });

                    //Close on escape
                    $(document).keyup(function (e) {
                        if (e.keyCode === 27) { //KeyCode for ESC button is 27
                            qodef.body.removeClass('qodef-fullscreen-search-opened qodef-search-fade-in');
                            qodef.body.addClass('qodef-search-fade-out');
                            searchHolder.removeClass('qodef-animate');

                            setTimeout(function () {
                                searchHolder.find('.qodef-search-field').val('');
                                searchHolder.find('.qodef-search-field').blur();
                            }, 300);

                            qodef.modules.common.qodefEnableScroll();
                        }
                    });
                });

                //Text input focus change
                var inputSearchField = $('.qodef-fullscreen-search-holder .qodef-search-field'),
                    inputSearchLine = $('.qodef-fullscreen-search-holder .qodef-field-holder .qodef-line');

                inputSearchField.focus(function () {
                    inputSearchLine.css('width', '100%');
                });

                inputSearchField.blur(function () {
                    inputSearchLine.css('width', '0');
                });
            }
        }
	}

})(jQuery);

(function($) {
    'use strict';

    var portfolio = {};
    qodef.modules.portfolio = portfolio;
	
    portfolio.qodefOnWindowLoad = qodefOnWindowLoad;
	
    $(window).load(qodefOnWindowLoad);
	
	/*
	 All functions to be called on $(window).load() should be in this function
	 */
	function qodefOnWindowLoad() {
		qodefPortfolioSingleFollow().init();
        qodefInitPortfolioGalleryFollowInfo();
	}

    var qodefPortfolioSingleFollow = function () {
        var info = $('.qodef-follow-portfolio-info .qodef-portfolio-single-holder .qodef-ps-info-sticky-holder');

        if (info.length) {
            var infoHolder = info.parent(),
                infoHolderHeight = infoHolder.height(),
                mediaHolder = $('.qodef-ps-image-holder'),
                mediaHolderHeight = mediaHolder.height(),
                mediaHolderOffset = mediaHolder.offset().top,
                mediaHolderItemSpace = parseInt(mediaHolder.find('.qodef-ps-image:last-of-type').css('marginBottom'), 10),
                header = $('.header-appear, .qodef-fixed-wrapper'),
                headerHeight = header.length ? header.height() : 0;

            var stickyHolderPosition = function () {
                if (mediaHolderHeight >= infoHolderHeight) {
                    var scrollValue = qodef.scroll;

                    //Calculate header height if header appears
                    if (scrollValue > 0 && header.length) {
                        headerHeight = header.height();
                    }

                    var headerMixin = headerHeight + qodefGlobalVars.vars.qodefAddForAdminBar;
                    if (scrollValue >= mediaHolderOffset - headerMixin) {
                        if (scrollValue + infoHolderHeight >= mediaHolderHeight + mediaHolderOffset - mediaHolderItemSpace - headerMixin) {
                            info.stop().animate({
                                marginTop: mediaHolderHeight - mediaHolderItemSpace - infoHolderHeight
                            });
                            //Reset header height
                            headerHeight = 0;
                        } else {
                            info.stop().animate({
                                marginTop: scrollValue - mediaHolderOffset + headerMixin
                            });
                        }
                    } else {
                        info.stop().animate({
                            marginTop: 0
                        });
                    }
                }
            };
        }

        return {
            init: function () {
                if (info.length) {
                    stickyHolderPosition();
                    $(window).scroll(function () {
                        stickyHolderPosition();
                    });
                }
            }
        };
    };

    function qodefInitPortfolioGalleryFollowInfo() {
        var portList = $('.qodef-portfolio-info-float');

        if (portList.length) {
            qodef.body.append('<div class="qodef-pl-follow-info-holder">' +
                '<div class="qodef-pl-follow-info-inner">' +
                '<span class="qodef-pl-follow-info-categories"></span>' +
                '<span class="qodef-pl-follow-info-title">Title</span>' +
                '</div>' +
                '</div>');

            var followInfoHolder = $('.qodef-pl-follow-info-holder'),
                followInfoCategory = followInfoHolder.find('.qodef-pl-follow-info-categories'),
                followInfoTitle = followInfoHolder.find('.qodef-pl-follow-info-title');

            portList.each(function () {
                var thisPortList = $(this);

                if(thisPortList.hasClass('qodef-gallery-follow-info-dark')) {
                    followInfoHolder.addClass('qodef-dark-info');
                }

                //info element position
                thisPortList.on('mousemove', function (e) {
                    followInfoHolder.css({
                        top: e.clientY,
                        left: e.clientX
                    });
                });

                //show/hide info element
                thisPortList.find('.qodef-pl-item').on('mouseenter', function () {
                    var thisArticleItem = $(this),
                        thisArticleItemTitle = thisArticleItem.find('.qodef-pli-title'),
                        thisArticleItemCategories = thisArticleItem.find('.qodef-pli-category');

                    if(thisArticleItemCategories.length) {
                        thisArticleItemCategories.each(function(){
                            var thisArticleItemCategory = $(this);
                            followInfoCategory.append('<span class="qodef-pl-follow-info-category">' + thisArticleItemCategory.text() + '<span class="qodef-pl-follow-info-category-slash"> / </span></span>');
                        });
                    }

                    if(thisArticleItemTitle.length) {
                        followInfoTitle.text(thisArticleItemTitle.text());
                    }

                    if (!followInfoHolder.hasClass('qodef-is-active')) {
                        followInfoHolder.addClass('qodef-is-active');
                    }

                }).on('mouseleave', function () {
                    if (followInfoHolder.hasClass('qodef-is-active')) {
                        followInfoHolder.removeClass('qodef-is-active');
                    }
                    $('.qodef-pl-follow-info-category').remove();
                });

                //check if info element is below or above the targeted portfolio list
                $(window).scroll(function(){
                    if (followInfoHolder.hasClass('qodef-is-active')) {
                        if (followInfoHolder.offset().top < thisPortList.offset().top || followInfoHolder.offset().top > thisPortList.offset().top + thisPortList.outerHeight()) {
                            followInfoHolder.removeClass('qodef-is-active');
                        }
                    }
                });
            });
        }
    }

})(jQuery);
(function($) {
    'use strict';
	
	var accordions = {};
	qodef.modules.accordions = accordions;
	
	accordions.qodefInitAccordions = qodefInitAccordions;
	
	
	accordions.qodefOnDocumentReady = qodefOnDocumentReady;
	
	$(document).ready(qodefOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function qodefOnDocumentReady() {
		qodefInitAccordions();
	}
	
	/**
	 * Init accordions shortcode
	 */
	function qodefInitAccordions(){
		var accordion = $('.qodef-accordion-holder');
		
		if(accordion.length){
			accordion.each(function(){
				var thisAccordion = $(this);

				if(thisAccordion.hasClass('qodef-accordion')){
					thisAccordion.accordion({
						animate: "swing",
						collapsible: true,
						active: 0,
						icons: "",
						heightStyle: "content"
					});
				}

				if(thisAccordion.hasClass('qodef-toggle')){
					var toggleAccordion = $(this),
						toggleAccordionTitle = toggleAccordion.find('.qodef-accordion-title'),
						toggleAccordionContent = toggleAccordionTitle.next();

					toggleAccordion.addClass("accordion ui-accordion ui-accordion-icons ui-widget ui-helper-reset");
					toggleAccordionTitle.addClass("ui-accordion-header ui-state-default ui-corner-top ui-corner-bottom");
					toggleAccordionContent.addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").hide();

					toggleAccordionTitle.each(function(){
						var thisTitle = $(this);
						
						thisTitle.on('mouseenter mouseleave', function(){
							thisTitle.toggleClass("ui-state-hover");
						});

						thisTitle.on('click',function(){
							thisTitle.toggleClass('ui-accordion-header-active ui-state-active ui-state-default ui-corner-bottom');
							thisTitle.next().toggleClass('ui-accordion-content-active').slideToggle(400);
						});
					});
				}
			});
		}
	}

})(jQuery);
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
(function($) {
	'use strict';
	
	var animationHolder = {};
	qodef.modules.animationHolder = animationHolder;
	
	animationHolder.qodefInitAnimationHolder = qodefInitAnimationHolder;
	
	
	animationHolder.qodefOnDocumentReady = qodefOnDocumentReady;
	
	$(document).ready(qodefOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function qodefOnDocumentReady() {
		qodefInitAnimationHolder();
	}
	
	/*
	 *	Init animation holder shortcode
	 */
	function qodefInitAnimationHolder(){
		var elements = $('.qodef-grow-in, .qodef-fade-in-down, .qodef-element-from-fade, .qodef-element-from-left, .qodef-element-from-right, .qodef-element-from-top, .qodef-element-from-bottom, .qodef-flip-in, .qodef-x-rotate, .qodef-z-rotate, .qodef-y-translate, .qodef-fade-in, .qodef-fade-in-left-x-rotate'),
			animationClass,
			animationData,
			animationDelay;
		
		if(elements.length){
			elements.each(function(){
				var thisElement = $(this);
				
				thisElement.appear(function() {
					animationData = thisElement.data('animation');
					animationDelay = parseInt(thisElement.data('animation-delay'));
					
					if(typeof animationData !== 'undefined' && animationData !== '') {
						animationClass = animationData;
						var newClass = animationClass+'-on';
						
						setTimeout(function(){
							thisElement.addClass(newClass);
						},animationDelay);
					}
				},{accX: 0, accY: qodefGlobalVars.vars.qodefElementAppearAmount});
			});
		}
	}
	
})(jQuery);
(function($) {
	'use strict';
	
	var button = {};
	qodef.modules.button = button;
	
	button.qodefButton = qodefButton;
	
	
	button.qodefOnDocumentReady = qodefOnDocumentReady;
	
	$(document).ready(qodefOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function qodefOnDocumentReady() {
		qodefButton().init();
	}
	
	/**
	 * Button object that initializes whole button functionality
	 * @type {Function}
	 */
	var qodefButton = function() {
		//all buttons on the page
		var buttons = $('.qodef-btn');
		
		/**
		 * Initializes button hover color
		 * @param button current button
		 */
		var buttonHoverColor = function(button) {
			if(typeof button.data('hover-color') !== 'undefined') {
				var changeButtonColor = function(event) {
					event.data.button.css('color', event.data.color);
				};
				
				var originalColor = button.css('color');
				var hoverColor = button.data('hover-color');
				
				button.on('mouseenter', { button: button, color: hoverColor }, changeButtonColor);
				button.on('mouseleave', { button: button, color: originalColor }, changeButtonColor);
			}
		};
		
		/**
		 * Initializes button hover background color
		 * @param button current button
		 */
		var buttonHoverBgColor = function(button) {
			if(typeof button.data('hover-bg-color') !== 'undefined') {
				var changeButtonBg = function(event) {
					event.data.button.css('background-color', event.data.color);
				};
				
				var originalBgColor = button.css('background-color');
				var hoverBgColor = button.data('hover-bg-color');
				
				button.on('mouseenter', { button: button, color: hoverBgColor }, changeButtonBg);
				button.on('mouseleave', { button: button, color: originalBgColor }, changeButtonBg);
			}
		};
		
		/**
		 * Initializes button border color
		 * @param button
		 */
		var buttonHoverBorderColor = function(button) {
			if(typeof button.data('hover-border-color') !== 'undefined') {
				var changeBorderColor = function(event) {
					event.data.button.css('border-color', event.data.color);
				};
				
				var originalBorderColor = button.css('borderTopColor'); //take one of the four sides
				var hoverBorderColor = button.data('hover-border-color');
				
				button.on('mouseenter', { button: button, color: hoverBorderColor }, changeBorderColor);
				button.on('mouseleave', { button: button, color: originalBorderColor }, changeBorderColor);
			}
		};
		
		return {
			init: function() {
				if(buttons.length) {
					buttons.each(function() {
						buttonHoverColor($(this));
						buttonHoverBgColor($(this));
						buttonHoverBorderColor($(this));
					});
				}
			}
		};
	};
	
})(jQuery);
(function ($) {
	'use strict';
	
	var cardsGallery = {};
	qodef.modules.cardsGallery = cardsGallery;
	
	
	cardsGallery.qodefOnWindowLoad = qodefOnWindowLoad;
	
	$(window).load(qodefOnWindowLoad);
	
	/*
	 All functions to be called on $(window).load() should be in this function
	 */
	function qodefOnWindowLoad() {
		qodefInitCardsGallery();
	}
	
	/*
	 **	Init cards gallery shortcode
	 */
	function qodefInitCardsGallery() {
		var holder = $('.qodef-cards-gallery');
		
		if (holder.length) {
			holder.each(function () {
				var thisHolder = $(this),
					cards = thisHolder.find('.qodef-cg-card');
				
				cards.each(function () {
					var card = $(this);
					
					card.on('click', function () {
						if (!cards.last().is(card)) {
							card.addClass('qodef-out qodef-animating').siblings().addClass('qodef-animating-siblings');
							card.detach();
							card.insertAfter(cards.last());
							
							setTimeout(function () {
								card.removeClass('qodef-out');
							}, 200);
							
							setTimeout(function () {
								card.removeClass('qodef-animating').siblings().removeClass('qodef-animating-siblings');
							}, 1200);
							
							cards = thisHolder.find('.qodef-cg-card');
							
							return false;
						}
					});
				});
				
				if (thisHolder.hasClass('qodef-bundle-animation') && !qodef.htmlEl.hasClass('touch')) {
					thisHolder.appear(function () {
						thisHolder.addClass('qodef-appeared');
						thisHolder.find('img').one('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function () {
							$(this).addClass('qodef-animation-done');
						});
					}, {accX: 0, accY: qodefGlobalVars.vars.qodefElementAppearAmount});
				}
			});
		}
	}

})(jQuery);
(function($) {
	'use strict';
	
	var countdown = {};
	qodef.modules.countdown = countdown;
	
	countdown.qodefInitCountdown = qodefInitCountdown;
	
	
	countdown.qodefOnDocumentReady = qodefOnDocumentReady;
	
	$(document).ready(qodefOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function qodefOnDocumentReady() {
		qodefInitCountdown();
	}
	
	/**
	 * Countdown Shortcode
	 */
	function qodefInitCountdown() {
		var countdowns = $('.qodef-countdown'),
			date = new Date(),
			currentMonth = date.getMonth(),
			year,
			month,
			day,
			hour,
			minute,
			timezone,
			monthLabel,
			dayLabel,
			hourLabel,
			minuteLabel,
			secondLabel;
		
		if (countdowns.length) {
			countdowns.each(function(){
				//Find countdown elements by id-s
				var countdownId = $(this).attr('id'),
					countdown = $('#'+countdownId),
					digitFontSize,
					labelFontSize;
				
				//Get data for countdown
				year = countdown.data('year');
				month = countdown.data('month');
				day = countdown.data('day');
				hour = countdown.data('hour');
				minute = countdown.data('minute');
				timezone = countdown.data('timezone');
				monthLabel = countdown.data('month-label');
				dayLabel = countdown.data('day-label');
				hourLabel = countdown.data('hour-label');
				minuteLabel = countdown.data('minute-label');
				secondLabel = countdown.data('second-label');
				digitFontSize = countdown.data('digit-size');
				labelFontSize = countdown.data('label-size');

				if( currentMonth !== month ) {
					month = month - 1;
				}
				
				//Initialize countdown
				countdown.countdown({
					until: new Date(year, month, day, hour, minute, 44),
					labels: ['', monthLabel, '', dayLabel, hourLabel, minuteLabel, secondLabel],
					format: 'ODHMS',
					timezone: timezone,
					padZeroes: true,
					onTick: setCountdownStyle
				});
				
				function setCountdownStyle() {
					countdown.find('.countdown-amount').css({
						'font-size' : digitFontSize+'px',
						'line-height' : digitFontSize+'px'
					});
					countdown.find('.countdown-period').css({
						'font-size' : labelFontSize+'px'
					});
				}
			});
		}
	}
	
})(jQuery);
(function($) {
	'use strict';
	
	var counter = {};
	qodef.modules.counter = counter;
	
	counter.qodefInitCounter = qodefInitCounter;
	
	
	counter.qodefOnDocumentReady = qodefOnDocumentReady;
	
	$(document).ready(qodefOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function qodefOnDocumentReady() {
		qodefInitCounter();
	}
	
	/**
	 * Counter Shortcode
	 */
	function qodefInitCounter() {
		var counterHolder = $('.qodef-counter-holder');
		
		if (counterHolder.length) {
			counterHolder.each(function() {
				var thisCounterHolder = $(this),
					thisCounter = thisCounterHolder.find('.qodef-counter');
				
				thisCounterHolder.appear(function() {
					thisCounterHolder.css('opacity', '1');
					
					//Counter zero type
					if (thisCounter.hasClass('qodef-zero-counter')) {
						var max = parseFloat(thisCounter.text());
						thisCounter.countTo({
							from: 0,
							to: max,
							speed: 1500,
							refreshInterval: 100
						});
					} else {
						thisCounter.absoluteCounter({
							speed: 2000,
							fadeInDelay: 1000
						});
					}
				},{accX: 0, accY: qodefGlobalVars.vars.qodefElementAppearAmount});
			});
		}
	}
	
})(jQuery);
(function ($) {
	'use strict';
	
	var customFont = {};
	qodef.modules.customFont = customFont;
	
	customFont.qodefCustomFontResize = qodefCustomFontResize;
	customFont.qodefCustomFontTypeOut = qodefCustomFontTypeOut;
	
	
	customFont.qodefOnDocumentReady = qodefOnDocumentReady;
	customFont.qodefOnWindowLoad = qodefOnWindowLoad;
	
	$(document).ready(qodefOnDocumentReady);
	$(window).load(qodefOnWindowLoad);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function qodefOnDocumentReady() {
		qodefCustomFontResize();
	}
	
	/*
	 All functions to be called on $(window).load() should be in this function
	 */
	function qodefOnWindowLoad() {
		qodefCustomFontTypeOut();
	}
	
	/*
	 **	Custom Font resizing style
	 */
	function qodefCustomFontResize() {
		var holder = $('.qodef-custom-font-holder');
		
		if (holder.length) {
			holder.each(function () {
				var thisItem = $(this),
					itemClass = '',
					smallLaptopStyle = '',
					ipadLandscapeStyle = '',
					ipadPortraitStyle = '',
					mobileLandscapeStyle = '',
					style = '',
					responsiveStyle = '';
				
				if (typeof thisItem.data('item-class') !== 'undefined' && thisItem.data('item-class') !== false) {
					itemClass = thisItem.data('item-class');
				}
				
				if (typeof thisItem.data('font-size-1366') !== 'undefined' && thisItem.data('font-size-1366') !== false) {
					smallLaptopStyle += 'font-size: ' + thisItem.data('font-size-1366') + ' !important;';
				}
				if (typeof thisItem.data('font-size-1024') !== 'undefined' && thisItem.data('font-size-1024') !== false) {
					ipadLandscapeStyle += 'font-size: ' + thisItem.data('font-size-1024') + ' !important;';
				}
				if (typeof thisItem.data('font-size-768') !== 'undefined' && thisItem.data('font-size-768') !== false) {
					ipadPortraitStyle += 'font-size: ' + thisItem.data('font-size-768') + ' !important;';
				}
				if (typeof thisItem.data('font-size-680') !== 'undefined' && thisItem.data('font-size-680') !== false) {
					mobileLandscapeStyle += 'font-size: ' + thisItem.data('font-size-680') + ' !important;';
				}
				
				if (typeof thisItem.data('line-height-1366') !== 'undefined' && thisItem.data('line-height-1366') !== false) {
					smallLaptopStyle += 'line-height: ' + thisItem.data('line-height-1366') + ' !important;';
				}
				if (typeof thisItem.data('line-height-1024') !== 'undefined' && thisItem.data('line-height-1024') !== false) {
					ipadLandscapeStyle += 'line-height: ' + thisItem.data('line-height-1024') + ' !important;';
				}
				if (typeof thisItem.data('line-height-768') !== 'undefined' && thisItem.data('line-height-768') !== false) {
					ipadPortraitStyle += 'line-height: ' + thisItem.data('line-height-768') + ' !important;';
				}
				if (typeof thisItem.data('line-height-680') !== 'undefined' && thisItem.data('line-height-680') !== false) {
					mobileLandscapeStyle += 'line-height: ' + thisItem.data('line-height-680') + ' !important;';
				}
				
				if (smallLaptopStyle.length || ipadLandscapeStyle.length || ipadPortraitStyle.length || mobileLandscapeStyle.length) {
					
					if (smallLaptopStyle.length) {
						responsiveStyle += "@media only screen and (max-width: 1366px) {.qodef-custom-font-holder." + itemClass + " { " + smallLaptopStyle + " } }";
					}
					if (ipadLandscapeStyle.length) {
						responsiveStyle += "@media only screen and (max-width: 1024px) {.qodef-custom-font-holder." + itemClass + " { " + ipadLandscapeStyle + " } }";
					}
					if (ipadPortraitStyle.length) {
						responsiveStyle += "@media only screen and (max-width: 768px) {.qodef-custom-font-holder." + itemClass + " { " + ipadPortraitStyle + " } }";
					}
					if (mobileLandscapeStyle.length) {
						responsiveStyle += "@media only screen and (max-width: 680px) {.qodef-custom-font-holder." + itemClass + " { " + mobileLandscapeStyle + " } }";
					}
				}
				
				if (responsiveStyle.length) {
					style = '<style type="text/css">' + responsiveStyle + '</style>';
				}
				
				if (style.length) {
					$('head').append(style);
				}
			});
		}
	}
	
	/*
	 * Init Type out functionality for Custom Font shortcode
	 */
	function qodefCustomFontTypeOut() {
		var qodefTyped = $('.qodef-cf-typed');
		
		if (qodefTyped.length) {
			qodefTyped.each(function () {
				
				//vars
				var thisTyped = $(this),
					typedWrap = thisTyped.parent('.qodef-cf-typed-wrap'),
					customFontHolder = typedWrap.parent('.qodef-custom-font-holder'),
					str = [],
					string_1 = thisTyped.find('.qodef-cf-typed-1').text(),
					string_2 = thisTyped.find('.qodef-cf-typed-2').text(),
					string_3 = thisTyped.find('.qodef-cf-typed-3').text(),
					string_4 = thisTyped.find('.qodef-cf-typed-4').text();
				
				if (string_1.length) {
					str.push(string_1);
				}
				
				if (string_2.length) {
					str.push(string_2);
				}
				
				if (string_3.length) {
					str.push(string_3);
				}
				
				if (string_4.length) {
					str.push(string_4);
				}
				
				customFontHolder.appear(function () {
					thisTyped.typed({
						strings: str,
						typeSpeed: 90,
						backDelay: 700,
						loop: true,
						contentType: 'text',
						loopCount: false,
						cursorChar: '_'
					});
				}, {accX: 0, accY: qodefGlobalVars.vars.qodefElementAppearAmount});
			});
		}
	}
	
})(jQuery);
(function($) {
	'use strict';

	var elementsHolder = {};
	qodef.modules.elementsHolder = elementsHolder;

	elementsHolder.qodefInitElementsHolderResponsiveStyle = qodefInitElementsHolderResponsiveStyle;


	elementsHolder.qodefOnDocumentReady = qodefOnDocumentReady;

	$(document).ready(qodefOnDocumentReady);

	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function qodefOnDocumentReady() {
		qodefInitElementsHolderResponsiveStyle();
	}

	/*
	 **	Elements Holder responsive style
	 */
	function qodefInitElementsHolderResponsiveStyle(){
		var elementsHolder = $('.qodef-elements-holder');

		if(elementsHolder.length){
			elementsHolder.each(function() {
				var thisElementsHolder = $(this),
					elementsHolderItem = thisElementsHolder.children('.qodef-eh-item'),
					style = '',
					responsiveStyle = '';

				elementsHolderItem.each(function() {
					var thisItem = $(this),
						itemClass = '',
						largeLaptop = '',
						smallLaptop = '',
						ipadLandscape = '',
						ipadPortrait = '',
						mobileLandscape = '',
						mobilePortrait = '';

					if (typeof thisItem.data('item-class') !== 'undefined' && thisItem.data('item-class') !== false) {
						itemClass = thisItem.data('item-class');
					}
					if (typeof thisItem.data('1367-1600') !== 'undefined' && thisItem.data('1367-1600') !== false) {
						largeLaptop = thisItem.data('1367-1600');
					}
					if (typeof thisItem.data('1025-1366') !== 'undefined' && thisItem.data('1025-1366') !== false) {
						smallLaptop = thisItem.data('1025-1366');
					}
					if (typeof thisItem.data('769-1024') !== 'undefined' && thisItem.data('769-1024') !== false) {
						ipadLandscape = thisItem.data('769-1024');
					}
					if (typeof thisItem.data('681-768') !== 'undefined' && thisItem.data('681-768') !== false) {
						ipadPortrait = thisItem.data('681-768');
					}
					if (typeof thisItem.data('680') !== 'undefined' && thisItem.data('680') !== false) {
						mobileLandscape = thisItem.data('680');
					}

					if(largeLaptop.length || smallLaptop.length || ipadLandscape.length || ipadPortrait.length || mobileLandscape.length || mobilePortrait.length) {

						if(largeLaptop.length) {
							responsiveStyle += "@media only screen and (min-width: 1367px) and (max-width: 1600px) {.qodef-eh-item-content."+itemClass+" { padding: "+largeLaptop+" !important; } }";
						}
						if(smallLaptop.length) {
							responsiveStyle += "@media only screen and (min-width: 1025px) and (max-width: 1366px) {.qodef-eh-item-content."+itemClass+" { padding: "+smallLaptop+" !important; } }";
						}
						if(ipadLandscape.length) {
							responsiveStyle += "@media only screen and (min-width: 769px) and (max-width: 1024px) {.qodef-eh-item-content."+itemClass+" { padding: "+ipadLandscape+" !important; } }";
						}
						if(ipadPortrait.length) {
							responsiveStyle += "@media only screen and (min-width: 681px) and (max-width: 768px) {.qodef-eh-item-content."+itemClass+" { padding: "+ipadPortrait+" !important; } }";
						}
						if(mobileLandscape.length) {
							responsiveStyle += "@media only screen and (max-width: 680px) {.qodef-eh-item-content."+itemClass+" { padding: "+mobileLandscape+" !important; } }";
						}
					}

                    if (typeof qodef.modules.common.qodefOwlSlider === "function") { // if owl function exist
                        var owl = thisItem.find('.qodef-owl-slider');
                        if (owl.length) { // if owl is in elements holder
                            setTimeout(function () {
                                owl.trigger('refresh.owl.carousel'); // reinit owl
                            }, 100);
                        }
                    }

				});

				if(responsiveStyle.length) {
					style = '<style type="text/css">'+responsiveStyle+'</style>';
				}

				if(style.length) {
					$('head').append(style);
				}

			});
		}
	}

})(jQuery);
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

(function($) {
	'use strict';
	
	var googleMap = {};
	qodef.modules.googleMap = googleMap;
	
	googleMap.qodefShowGoogleMap = qodefShowGoogleMap;
	
	
	googleMap.qodefOnDocumentReady = qodefOnDocumentReady;
	
	$(document).ready(qodefOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function qodefOnDocumentReady() {
		qodefShowGoogleMap();
	}
	
	/*
	 **	Show Google Map
	 */
	function qodefShowGoogleMap(){
		var googleMap = $('.qodef-google-map');
		
		if(googleMap.length){
			googleMap.each(function(){
				var element = $(this);
				
				var snazzyMapStyle = false;
				var snazzyMapCode  = '';
				if(typeof element.data('snazzy-map-style') !== 'undefined' && element.data('snazzy-map-style') === 'yes') {
					snazzyMapStyle = true;
					var snazzyMapHolder = element.parent().find('.qodef-snazzy-map'),
						snazzyMapCodes  = snazzyMapHolder.val();
					
					if( snazzyMapHolder.length && snazzyMapCodes.length ) {
						snazzyMapCode = JSON.parse( snazzyMapCodes.replace(/`{`/g, '[').replace(/`}`/g, ']').replace(/``/g, '"').replace(/`/g, '') );
					}
				}
				
				var customMapStyle;
				if(typeof element.data('custom-map-style') !== 'undefined') {
					customMapStyle = element.data('custom-map-style');
				}
				
				var colorOverlay;
				if(typeof element.data('color-overlay') !== 'undefined' && element.data('color-overlay') !== false) {
					colorOverlay = element.data('color-overlay');
				}
				
				var saturation;
				if(typeof element.data('saturation') !== 'undefined' && element.data('saturation') !== false) {
					saturation = element.data('saturation');
				}
				
				var lightness;
				if(typeof element.data('lightness') !== 'undefined' && element.data('lightness') !== false) {
					lightness = element.data('lightness');
				}
				
				var zoom;
				if(typeof element.data('zoom') !== 'undefined' && element.data('zoom') !== false) {
					zoom = element.data('zoom');
				}
				
				var pin;
				if(typeof element.data('pin') !== 'undefined' && element.data('pin') !== false) {
					pin = element.data('pin');
				}
				
				var mapHeight;
				if(typeof element.data('height') !== 'undefined' && element.data('height') !== false) {
					mapHeight = element.data('height');
				}
				
				var uniqueId;
				if(typeof element.data('unique-id') !== 'undefined' && element.data('unique-id') !== false) {
					uniqueId = element.data('unique-id');
				}
				
				var scrollWheel;
				if(typeof element.data('scroll-wheel') !== 'undefined') {
					scrollWheel = element.data('scroll-wheel');
				}
				var addresses;
				if(typeof element.data('addresses') !== 'undefined' && element.data('addresses') !== false) {
					addresses = element.data('addresses');
				}
				
				var map = "map_"+ uniqueId;
				var geocoder = "geocoder_"+ uniqueId;
				var holderId = "qodef-map-"+ uniqueId;
				
				qodefInitializeGoogleMap(snazzyMapStyle, snazzyMapCode, customMapStyle, colorOverlay, saturation, lightness, scrollWheel, zoom, holderId, mapHeight, pin,  map, geocoder, addresses);
			});
		}
	}
	
	/*
	 **	Init Google Map
	 */
	function qodefInitializeGoogleMap(snazzyMapStyle, snazzyMapCode, customMapStyle, color, saturation, lightness, wheel, zoom, holderId, height, pin,  map, geocoder, data){
		
		if(typeof google !== 'object') {
			return;
		}
		
		var mapStyles = [];
		if(snazzyMapStyle && snazzyMapCode.length) {
			mapStyles = snazzyMapCode;
		} else {
			mapStyles = [
				{
					stylers: [
						{hue: color },
						{saturation: saturation},
						{lightness: lightness},
						{gamma: 1}
					]
				}
			];
		}
		
		var googleMapStyleId;
		
		if(snazzyMapStyle || customMapStyle === 'yes'){
			googleMapStyleId = 'qodef-style';
		} else {
			googleMapStyleId = google.maps.MapTypeId.ROADMAP;
		}
		
		wheel = wheel === 'yes';
		
		var qoogleMapType = new google.maps.StyledMapType(mapStyles, {name: "Google Map"});
		
		geocoder = new google.maps.Geocoder();
		var latlng = new google.maps.LatLng(-34.397, 150.644);
		
		if (!isNaN(height)){
			height = height + 'px';
		}
		
		var myOptions = {
			zoom: zoom,
			scrollwheel: wheel,
			center: latlng,
			zoomControl: true,
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.SMALL,
				position: google.maps.ControlPosition.RIGHT_CENTER
			},
			scaleControl: false,
			scaleControlOptions: {
				position: google.maps.ControlPosition.LEFT_CENTER
			},
			streetViewControl: false,
			streetViewControlOptions: {
				position: google.maps.ControlPosition.LEFT_CENTER
			},
			panControl: false,
			panControlOptions: {
				position: google.maps.ControlPosition.LEFT_CENTER
			},
			mapTypeControl: false,
			mapTypeControlOptions: {
				mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'qodef-style'],
				style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
				position: google.maps.ControlPosition.LEFT_CENTER
			},
			mapTypeId: googleMapStyleId
		};
		
		map = new google.maps.Map(document.getElementById(holderId), myOptions);
		map.mapTypes.set('qodef-style', qoogleMapType);
		
		var index;
		
		for (index = 0; index < data.length; ++index) {
			qodefInitializeGoogleAddress(data[index], pin, map, geocoder);
		}
		
		var holderElement = document.getElementById(holderId);
		holderElement.style.height = height;
	}
	
	/*
	 **	Init Google Map Addresses
	 */
	function qodefInitializeGoogleAddress(data, pin, map, geocoder){
		if (data === '') {
			return;
		}
		
		var contentString = '<div id="content">'+
			'<div id="siteNotice">'+
			'</div>'+
			'<div id="bodyContent">'+
			'<p>'+data+'</p>'+
			'</div>'+
			'</div>';
		
		var infowindow = new google.maps.InfoWindow({
			content: contentString
		});
		
		geocoder.geocode( { 'address': data}, function(results, status) {
			if (status === google.maps.GeocoderStatus.OK) {
				map.setCenter(results[0].geometry.location);
				var marker = new google.maps.Marker({
					map: map,
					position: results[0].geometry.location,
					icon:  pin,
					title: data.store_title
				});
				google.maps.event.addListener(marker, 'click', function() {
					infowindow.open(map,marker);
				});
				
				google.maps.event.addDomListener(window, 'resize', function() {
					map.setCenter(results[0].geometry.location);
				});
			}
		});
	}
	
})(jQuery);
(function($) {
	'use strict';
	
	var icon = {};
	qodef.modules.icon = icon;
	
	icon.qodefIcon = qodefIcon;
	
	
	icon.qodefOnDocumentReady = qodefOnDocumentReady;
	
	$(document).ready(qodefOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function qodefOnDocumentReady() {
		qodefIcon().init();
	}
	
	/**
	 * Object that represents icon shortcode
	 * @returns {{init: Function}} function that initializes icon's functionality
	 */
	var qodefIcon = function() {
		var icons = $('.qodef-icon-shortcode');
		
		/**
		 * Function that triggers icon animation and icon animation delay
		 */
		var iconAnimation = function(icon) {
			if(icon.hasClass('qodef-icon-animation')) {
				icon.appear(function() {
					icon.parent('.qodef-icon-animation-holder').addClass('qodef-icon-animation-show');
				}, {accX: 0, accY: qodefGlobalVars.vars.qodefElementAppearAmount});
			}
		};
		
		/**
		 * Function that triggers icon hover color functionality
		 */
		var iconHoverColor = function(icon) {
			if(typeof icon.data('hover-color') !== 'undefined') {
				var changeIconColor = function(event) {
					event.data.icon.css('color', event.data.color);
				};
				
				var iconElement = icon.find('.qodef-icon-element');
				var hoverColor = icon.data('hover-color');
				var originalColor = iconElement.css('color');
				
				if(hoverColor !== '') {
					icon.on('mouseenter', {icon: iconElement, color: hoverColor}, changeIconColor);
					icon.on('mouseleave', {icon: iconElement, color: originalColor}, changeIconColor);
				}
			}
		};

		/**
		 * Function that controls icon circle SVG stroke color
		 */
		var iconSVGStrokeColor = function(icon) {
			if(typeof icon.css('border-color') !== 'undefined' && icon.hasClass('qodef-circle')) {
				var borderColor = icon.css('border-color');
				var circleIconSVG = icon.find('.qodef-icon-svg-circle');
				icon.css('border-color', '');

				if (circleIconSVG) {
					circleIconSVG.css('stroke', borderColor);
				}
			}
		};
		
		/**
		 * Function that triggers icon holder background color hover functionality
		 */
		var iconHolderBackgroundHover = function(icon) {
			if(typeof icon.data('hover-background-color') !== 'undefined') {
				var changeIconBgColor = function(event) {
					event.data.icon.css('background-color', event.data.color);
				};
				
				var hoverBackgroundColor = icon.data('hover-background-color');
				var originalBackgroundColor = icon.css('background-color');
				
				if(hoverBackgroundColor !== '') {
					icon.on('mouseenter', {icon: icon, color: hoverBackgroundColor}, changeIconBgColor);
					icon.on('mouseleave', {icon: icon, color: originalBackgroundColor}, changeIconBgColor);
				}
			}
		};
		
		return {
			init: function() {
				if(icons.length) {
					icons.each(function() {
						iconAnimation($(this));
						iconHoverColor($(this));
						iconHolderBackgroundHover($(this));
						iconSVGStrokeColor($(this));
					});
				}
			}
		};
	};
	
})(jQuery);
(function($) {
	'use strict';
	
	var iconListItem = {};
	qodef.modules.iconListItem = iconListItem;
	
	iconListItem.qodefInitIconList = qodefInitIconList;
	
	
	iconListItem.qodefOnDocumentReady = qodefOnDocumentReady;
	
	$(document).ready(qodefOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function qodefOnDocumentReady() {
		qodefInitIconList().init();
	}
	
	/**
	 * Button object that initializes icon list with animation
	 * @type {Function}
	 */
	var qodefInitIconList = function() {
		var iconList = $('.qodef-animate-list');
		
		/**
		 * Initializes icon list animation
		 * @param list current slider
		 */
		var iconListInit = function(list) {
			setTimeout(function(){
				list.appear(function(){
					list.addClass('qodef-appeared');
				},{accX: 0, accY: qodefGlobalVars.vars.qodefElementAppearAmount});
			},30);
		};
		
		return {
			init: function() {
				if(iconList.length) {
					iconList.each(function() {
						iconListInit($(this));
					});
				}
			}
		};
	};
	
})(jQuery);
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
(function($) {
	'use strict';
	
	var pieChart = {};
	qodef.modules.pieChart = pieChart;
	
	pieChart.qodefInitPieChart = qodefInitPieChart;
	
	
	pieChart.qodefOnDocumentReady = qodefOnDocumentReady;
	
	$(document).ready(qodefOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function qodefOnDocumentReady() {
		qodefInitPieChart();
	}
	
	/**
	 * Init Pie Chart shortcode
	 */
	function qodefInitPieChart() {
		var pieChartHolder = $('.qodef-pie-chart-holder');
		
		if (pieChartHolder.length) {
			pieChartHolder.each(function () {
				var thisPieChartHolder = $(this),
					pieChart = thisPieChartHolder.children('.qodef-pc-percentage'),
					barColor = '#ff2a0e',
					trackColor = '#f7f7f7',
					lineWidth = 3,
					size = 176;
				
				if(typeof pieChart.data('size') !== 'undefined' && pieChart.data('size') !== '') {
					size = pieChart.data('size');
				}
				
				if(typeof pieChart.data('bar-color') !== 'undefined' && pieChart.data('bar-color') !== '') {
					barColor = pieChart.data('bar-color');
				}
				
				if(typeof pieChart.data('track-color') !== 'undefined' && pieChart.data('track-color') !== '') {
					trackColor = pieChart.data('track-color');
				}
				
				pieChart.appear(function() {
					initToCounterPieChart(pieChart);
					thisPieChartHolder.css('opacity', '1');
					
					pieChart.easyPieChart({
						barColor: barColor,
						trackColor: trackColor,
						scaleColor: false,
						lineCap: 'butt',
						lineWidth: lineWidth,
						animate: 1500,
						size: size
					});
				},{accX: 0, accY: qodefGlobalVars.vars.qodefElementAppearAmount});
			});
		}
	}
	
	/*
	 **	Counter for pie chart number from zero to defined number
	 */
	function initToCounterPieChart(pieChart){
		var counter = pieChart.find('.qodef-pc-percent'),
			max = parseFloat(counter.text());
		
		counter.countTo({
			from: 0,
			to: max,
			speed: 1500,
			refreshInterval: 50
		});
	}
	
})(jQuery);
(function($) {
	'use strict';
	
	var process = {};
	qodef.modules.process = process;
	
	process.qodefInitProcess = qodefInitProcess;
	
	
	process.qodefOnDocumentReady = qodefOnDocumentReady;
	
	$(document).ready(qodefOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function qodefOnDocumentReady() {
		qodefInitProcess();
	}
	
	/**
	 * Inti process shortcode on appear
	 */
	function qodefInitProcess() {
		var holder = $('.qodef-process-holder');
		
		if(holder.length) {
			holder.each(function(){
				var thisHolder = $(this);
				
				thisHolder.appear(function(){
					thisHolder.addClass('qodef-process-appeared');
				},{accX: 0, accY: qodefGlobalVars.vars.qodefElementAppearAmount});
			});
		}
	}
	
})(jQuery);
(function($) {
	'use strict';
	
	var progressBar = {};
	qodef.modules.progressBar = progressBar;
	
	progressBar.qodefInitProgressBars = qodefInitProgressBars;
	
	
	progressBar.qodefOnDocumentReady = qodefOnDocumentReady;
	
	$(document).ready(qodefOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function qodefOnDocumentReady() {
		qodefInitProgressBars();
	}
	
	/*
	 **	Horizontal progress bars shortcode
	 */
	function qodefInitProgressBars() {
		var progressBar = $('.qodef-progress-bar');
		
		if (progressBar.length) {
			progressBar.each(function () {
				var thisBar = $(this),
					thisBarContent = thisBar.find('.qodef-pb-content'),
					progressBar = thisBar.find('.qodef-pb-percent'),
					percentage = thisBarContent.data('percentage');
				
				thisBar.appear(function () {
					qodefInitToCounterProgressBar(progressBar, percentage);
					
					thisBarContent.css('width', '0%').animate({'width': percentage + '%'}, 2000);
					
					if (thisBar.hasClass('qodef-pb-percent-floating')) {
						progressBar.css('left', '0%').animate({'left': percentage - 2 + '%'}, 2000);
					}
				});
			});
		}
	}
	
	/*
	 **	Counter for horizontal progress bars percent from zero to defined percent
	 */
	function qodefInitToCounterProgressBar(progressBar, percentageValue){
		var percentage = parseFloat(percentageValue);
		
		if(progressBar.length) {
			progressBar.each(function() {
				var thisPercent = $(this);
				thisPercent.css('opacity', '1');
				
				thisPercent.countTo({
					from: 0,
					to: percentage,
					speed: 2000,
					refreshInterval: 50
				});
			});
		}
	}
	
})(jQuery);
(function($) {
	'use strict';
	
	var tabs = {};
	qodef.modules.tabs = tabs;
	
	tabs.qodefInitTabs = qodefInitTabs;
	
	
	tabs.qodefOnDocumentReady = qodefOnDocumentReady;
	
	$(document).ready(qodefOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function qodefOnDocumentReady() {
		qodefInitTabs();
	}
	
	/*
	 **	Init tabs shortcode
	 */
	function qodefInitTabs(){
		var tabs = $('.qodef-tabs');
		
		if(tabs.length){
			tabs.each(function(){
				var thisTabs = $(this);
				
				thisTabs.children('.qodef-tab-container').each(function(index){
					index = index + 1;
					var that = $(this),
						link = that.attr('id'),
						navItem = that.parent().find('.qodef-tabs-nav li:nth-child('+index+') a'),
						navLink = navItem.attr('href');
					
					link = '#'+link;

					if(link.indexOf(navLink) > -1) {
						navItem.attr('href',link);
					}
				});
				
				thisTabs.tabs();

                $('.qodef-tabs a.qodef-external-link').off('click');
			});
		}
	}
	
})(jQuery);
(function($) {
	'use strict';
	
	var verticalSplitSlider = {};
	qodef.modules.verticalSplitSlider = verticalSplitSlider;
	
	verticalSplitSlider.qodefInitVerticalSplitSlider = qodefInitVerticalSplitSlider;
	
	
	verticalSplitSlider.qodefOnDocumentReady = qodefOnDocumentReady;
	
	$(document).ready(qodefOnDocumentReady);
	
	/*
	 All functions to be called on $(document).ready() should be in this function
	 */
	function qodefOnDocumentReady() {
		qodefInitVerticalSplitSlider();
	}
	
	/*
	 **	Vertical Split Slider
	 */
	function qodefInitVerticalSplitSlider() {
		var slider = $('.qodef-vertical-split-slider'),
			progressBarFlag = true;
		
		if (slider.length) {
			if (qodef.body.hasClass('qodef-vss-initialized')) {
				qodef.body.removeClass('qodef-vss-initialized');
				$.fn.multiscroll.destroy();
			}
			
			slider.height(qodef.windowHeight).animate({opacity: 1}, 300);
			
			var defaultHeaderStyle = '';
			if (qodef.body.hasClass('qodef-light-header')) {
				defaultHeaderStyle = 'light';
			} else if (qodef.body.hasClass('qodef-dark-header')) {
				defaultHeaderStyle = 'dark';
			}
			
			slider.multiscroll({
				scrollingSpeed: 700,
				easing: 'easeInOutQuart',
				navigation: true,
				useAnchorsOnLoad: false,
				sectionSelector: '.qodef-vss-ms-section',
				leftSelector: '.qodef-vss-ms-left',
				rightSelector: '.qodef-vss-ms-right',
				afterRender: function () {
					qodefCheckVerticalSplitSectionsForHeaderStyle($('.qodef-vss-ms-left .qodef-vss-ms-section:first-child').data('header-style'), defaultHeaderStyle);
					qodef.body.addClass('qodef-vss-initialized');
					
					var contactForm7 = $('div.wpcf7 > form');
					if (contactForm7.length) {
						contactForm7.each(function(){
							var thisForm = $(this);
							
							thisForm.find('.wpcf7-submit').off().on('click', function(e){
								e.preventDefault();
								wpcf7.submit(thisForm);
							});
						});
					}
					
					//prepare html for smaller screens - start //
					var verticalSplitSliderResponsive = $('<div class="qodef-vss-responsive"></div>'),
						leftSide = slider.find('.qodef-vss-ms-left > div'),
						rightSide = slider.find('.qodef-vss-ms-right > div');
					
					slider.after(verticalSplitSliderResponsive);
					
					for (var i = 0; i < leftSide.length; i++) {
						verticalSplitSliderResponsive.append($(leftSide[i]).clone(true));
						verticalSplitSliderResponsive.append($(rightSide[leftSide.length - 1 - i]).clone(true));
					}
					
					//prepare google maps clones
					var googleMapHolder = $('.qodef-vss-responsive .qodef-google-map');
					if (googleMapHolder.length) {
						googleMapHolder.each(function () {
							var map = $(this);
							map.empty();
							var num = Math.floor((Math.random() * 100000) + 1);
							map.attr('id', 'qodef-map-' + num);
							map.data('unique-id', num);
						});
					}
					
					if (typeof qodef.modules.animationHolder.qodefInitAnimationHolder === "function") {
						qodef.modules.animationHolder.qodefInitAnimationHolder();
					}
					
					if (typeof qodef.modules.button.qodefButton === "function") {
						qodef.modules.button.qodefButton().init();
					}
					
					if (typeof qodef.modules.elementsHolder.qodefInitElementsHolderResponsiveStyle === "function") {
						qodef.modules.elementsHolder.qodefInitElementsHolderResponsiveStyle();
					}
					
					if (typeof qodef.modules.googleMap.qodefShowGoogleMap === "function") {
						qodef.modules.googleMap.qodefShowGoogleMap();
					}
					
					if (typeof qodef.modules.icon.qodefIcon === "function") {
						qodef.modules.icon.qodefIcon().init();
					}
					
					if (progressBarFlag && typeof qodef.modules.progressBar.qodefInitProgressBars === "function" && ($('.qodef-vss-ms-left .qodef-vss-ms-section.active').find('.qodef-progress-bar').length || $('.qodef-vss-ms-right .qodef-vss-ms-section.active').find('.qodef-progress-bar').length)){
						qodef.modules.progressBar.qodefInitProgressBars();
						progressBarFlag = false;
					}
				},
				onLeave: function (index, nextIndex) {
					if (progressBarFlag && typeof qodef.modules.progressBar.qodefInitProgressBars === "function" && ($('.qodef-vss-ms-left .qodef-vss-ms-section.active').find('.qodef-progress-bar').length || $('.qodef-vss-ms-right .qodef-vss-ms-section.active').find('.qodef-progress-bar').length)){
						setTimeout(function(){
							qodef.modules.progressBar.qodefInitProgressBars();
						},700); // scrolling speed is 700

						progressBarFlag = false;
					}

					qodefIntiScrollAnimation(slider, nextIndex);
					qodefCheckVerticalSplitSectionsForHeaderStyle($($('.qodef-vss-ms-left .qodef-vss-ms-section')[nextIndex - 1]).data('header-style'), defaultHeaderStyle);
				}
			});
			
			if (qodef.windowWidth <= 1024) {
				$.fn.multiscroll.destroy();
			} else {
				$.fn.multiscroll.build();
			}
			
			$(window).resize(function () {
				if (qodef.windowWidth <= 1024) {
					$.fn.multiscroll.destroy();
				} else {
					$.fn.multiscroll.build();
				}
			});
		}
	}
	
	function qodefIntiScrollAnimation(slider, nextIndex) {
		
		if (slider.hasClass('qodef-vss-scrolling-animation')) {
			
			if (nextIndex > 1 && !slider.hasClass('qodef-vss-scrolled')) {
				slider.addClass('qodef-vss-scrolled');
			} else if (nextIndex === 1 && slider.hasClass('qodef-vss-scrolled')) {
				slider.removeClass('qodef-vss-scrolled');
			}
		}
	}
	
	/*
	 **	Check slides on load and slide change for header style changing
	 */
	function qodefCheckVerticalSplitSectionsForHeaderStyle(section_header_style, default_header_style) {
		if (section_header_style !== undefined && section_header_style !== '') {
			qodef.body.removeClass('qodef-light-header qodef-dark-header').addClass('qodef-' + section_header_style + '-header');
		} else if (default_header_style !== '') {
			qodef.body.removeClass('qodef-light-header qodef-dark-header').addClass('qodef-' + default_header_style + '-header');
		} else {
			qodef.body.removeClass('qodef-light-header qodef-dark-header');
		}
	}
	
})(jQuery);
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
(function($) {
    'use strict';

    var portfolioList = {};
    qodef.modules.portfolioList = portfolioList;

    portfolioList.qodefOnWindowLoad = qodefOnWindowLoad;
    portfolioList.qodefOnWindowScroll = qodefOnWindowScroll;

    $(window).load(qodefOnWindowLoad);
    $(window).scroll(qodefOnWindowScroll);

    /*
     All functions to be called on $(window).load() should be in this function
     */
    function qodefOnWindowLoad() {
        qodefInitPortfolioFilter();
        qodefInitPortfolioListAnimation();
	    qodefInitPortfolioPagination().init();
        qodefPortfolioScrollableList().init();
        qodefPortfolioScrollableScroll();
    }

    /*
     All functions to be called on $(window).scroll() should be in this function
     */
    function qodefOnWindowScroll() {
	    qodefInitPortfolioPagination().scroll();
    }

    /**
     * Initializes portfolio list article animation
     */
    function qodefInitPortfolioListAnimation(){
        var portList = $('.qodef-portfolio-list-holder.qodef-pl-has-animation');

        if(portList.length){
            portList.each(function(){
                var thisPortList = $(this).children('.qodef-pl-inner');

                thisPortList.children('article').each(function(l) {
                    var thisArticle = $(this);

                    thisArticle.appear(function() {
                        thisArticle.addClass('qodef-item-show');

                        setTimeout(function(){
                            thisArticle.addClass('qodef-item-shown');
                        }, 1000);
                    },{accX: 0, accY: 0});
                });
            });
        }
    }

    /**
     * Initializes portfolio masonry filter
     */
    function qodefInitPortfolioFilter(){
        var filterHolder = $('.qodef-pl-filter-holder');

        if(filterHolder.length){
            filterHolder.each(function(){
                var thisFilterHolder = $(this),
                    thisPortListHolder = thisFilterHolder.closest('.qodef-portfolio-list-holder'),
                    thisPortListInner = thisPortListHolder.find('.qodef-pl-inner'),
                    portListHasLoadMore = thisPortListHolder.hasClass('qodef-pl-pag-load-more') ? true : false;
                
                console.log(thisPortListHolder);
                console.log(thisPortListInner);
                thisFilterHolder.find('.qodef-parent-filter:first').addClass('qodef-pl-current');
	            
	            if(thisPortListHolder.hasClass('qodef-pl-gallery')) {
		            thisPortListInner.isotope();
	            }

                thisFilterHolder.find('.qodef-parent-filter').on('click', function(){
                    var thisFilter = $(this),
                        filterValue = thisFilter.attr('data-filter'),
                        filterClassName = filterValue.length ? filterValue.substring(1) : '',
	                    portListHasArticles = thisPortListInner.children().hasClass(filterClassName) ? true : false;

                    thisFilterHolder.find('.qodef-child-filter').removeClass('qodef-pl-current');
                    thisFilter.parent().children('.qodef-parent-filter').removeClass('qodef-pl-current');
                    thisFilter.addClass('qodef-pl-current');

                    var parentId = thisFilter.data('group-id'),
						children = thisFilterHolder.find('.qodef-portfolio-filter-child-categories');

                    children.each(function() {
                    	if($(this).data('parent-id') == parentId) {
                            $(this).find('.qodef-filter-all').addClass('qodef-pl-current');
                    		$(this).fadeIn();
						} else {
                    		$(this).fadeOut();
						}
					});

	                if(portListHasLoadMore && !portListHasArticles && filterValue.length) {
		                qodefInitLoadMoreItemsPortfolioFilter(thisPortListHolder, filterValue, filterClassName);
	                } else {
		                filterValue = filterValue.length === 0 ? '*' : filterValue;
                   
                        thisFilterHolder.parent().find('.qodef-pl-inner').isotope({ filter: filterValue });
	                    qodef.modules.common.qodefInitParallax();
                    }
                });

                thisFilterHolder.find('.qodef-child-filter').on('click', function(){
                    var thisFilter = $(this),
                        filterValue = thisFilter.attr('data-filter'),
                        filterClassName = filterValue.length ? filterValue.substring(1) : '',
                        portListHasArticles = thisPortListInner.children().hasClass(filterClassName) ? true : false;

                    thisFilter.parent().children('.qodef-child-filter').removeClass('qodef-pl-current');
                    thisFilter.addClass('qodef-pl-current');

                    if(portListHasLoadMore && !portListHasArticles && filterValue.length) {
                        qodefInitLoadMoreItemsPortfolioFilter(thisPortListHolder, filterValue, filterClassName);
                    } else {
                        filterValue = filterValue.length === 0 ? '*' : filterValue;

                        thisFilterHolder.parent().find('.qodef-pl-inner').isotope({ filter: filterValue });
                        qodef.modules.common.qodefInitParallax();
                    }
                });
            });
        }
    }

    /**
     * Initializes load more items if portfolio masonry filter item is empty
     */
    function qodefInitLoadMoreItemsPortfolioFilter($portfolioList, $filterValue, $filterClassName) {
        var thisPortList = $portfolioList,
            thisPortListInner = thisPortList.find('.qodef-pl-inner'),
            filterValue = $filterValue,
            filterClassName = $filterClassName,
            maxNumPages = 0;

        if (typeof thisPortList.data('max-num-pages') !== 'undefined' && thisPortList.data('max-num-pages') !== false) {
            maxNumPages = thisPortList.data('max-num-pages');
        }

        var	loadMoreDatta = qodef.modules.common.getLoadMoreData(thisPortList),
            nextPage = loadMoreDatta.nextPage,
	        ajaxData = qodef.modules.common.setLoadMoreAjaxData(loadMoreDatta, 'aarhus_core_portfolio_ajax_load_more'),
            loadingItem = thisPortList.find('.qodef-pl-loading');

        if(nextPage <= maxNumPages) {
            loadingItem.addClass('qodef-showing qodef-filter-trigger');
            thisPortListInner.css('opacity', '0');

            $.ajax({
                type: 'POST',
                data: ajaxData,
                url: qodefGlobalVars.vars.qodefAjaxUrl,
                success: function (data) {
                    nextPage++;
                    thisPortList.data('next-page', nextPage);
                    var response = $.parseJSON(data),
                        responseHtml = response.html;

                    thisPortList.waitForImages(function () {
                        thisPortListInner.append(responseHtml).isotope('reloadItems').isotope({sortBy: 'original-order'});
                        var portListHasArticles = !!thisPortListInner.children().hasClass(filterClassName);

                        if(portListHasArticles) {
                            setTimeout(function() {
	                            qodef.modules.common.setFixedImageProportionSize(thisPortList, thisPortListInner.find('article'), thisPortListInner.find('.qodef-masonry-grid-sizer').width(), true);
                                thisPortListInner.isotope('layout').isotope({filter: filterValue});
                                loadingItem.removeClass('qodef-showing qodef-filter-trigger');

                                setTimeout(function() {
                                    thisPortListInner.css('opacity', '1');
                                    qodefInitPortfolioListAnimation();
	                                qodef.modules.common.qodefInitParallax();
                                }, 150);
                            }, 400);
                        } else {
                            loadingItem.removeClass('qodef-showing qodef-filter-trigger');
                            qodefInitLoadMoreItemsPortfolioFilter(thisPortList, filterValue, filterClassName);
                        }
                    });
                }
            });
        }
    }
	
	/**
	 * Initializes portfolio pagination functions
	 */
	function qodefInitPortfolioPagination(){
		var portList = $('.qodef-portfolio-list-holder');
		
		var initStandardPagination = function(thisPortList) {
			var standardLink = thisPortList.find('.qodef-pl-standard-pagination li');
			
			if(standardLink.length) {
				standardLink.each(function(){
					var thisLink = $(this).children('a'),
						pagedLink = 1;
					
					thisLink.on('click', function(e) {
						e.preventDefault();
						e.stopPropagation();
						
						if (typeof thisLink.data('paged') !== 'undefined' && thisLink.data('paged') !== false) {
							pagedLink = thisLink.data('paged');
						}
						
						initMainPagFunctionality(thisPortList, pagedLink);
					});
				});
			}
		};
		
		var initLoadMorePagination = function(thisPortList) {
			var loadMoreButton = thisPortList.find('.qodef-pl-load-more a');
			
			loadMoreButton.on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				
				initMainPagFunctionality(thisPortList);
			});
		};
		
		var initInifiteScrollPagination = function(thisPortList) {
			var portListHeight = thisPortList.outerHeight(),
				portListTopOffest = thisPortList.offset().top,
				portListPosition = portListHeight + portListTopOffest - qodefGlobalVars.vars.qodefAddForAdminBar;
			
			if(!thisPortList.hasClass('qodef-pl-infinite-scroll-started') && qodef.scroll + qodef.windowHeight > portListPosition) {
				initMainPagFunctionality(thisPortList);
			}
		};
		
		var initMainPagFunctionality = function(thisPortList, pagedLink) {
			var thisPortListInner = thisPortList.find('.qodef-pl-inner'),
				nextPage,
				maxNumPages;
			
			if (typeof thisPortList.data('max-num-pages') !== 'undefined' && thisPortList.data('max-num-pages') !== false) {
				maxNumPages = thisPortList.data('max-num-pages');
			}
			
			if(thisPortList.hasClass('qodef-pl-pag-standard')) {
				thisPortList.data('next-page', pagedLink);
			}
			
			if(thisPortList.hasClass('qodef-pl-pag-infinite-scroll')) {
				thisPortList.addClass('qodef-pl-infinite-scroll-started');
			}
			
			var loadMoreDatta = qodef.modules.common.getLoadMoreData(thisPortList),
				loadingItem = thisPortList.find('.qodef-pl-loading');
			
			nextPage = loadMoreDatta.nextPage;
			
			if(nextPage <= maxNumPages || maxNumPages === 0){
				if(thisPortList.hasClass('qodef-pl-pag-standard')) {
					loadingItem.addClass('qodef-showing qodef-standard-pag-trigger');
					thisPortList.addClass('qodef-pl-pag-standard-animate');
				} else {
					loadingItem.addClass('qodef-showing');
				}
				
				var ajaxData = qodef.modules.common.setLoadMoreAjaxData(loadMoreDatta, 'aarhus_core_portfolio_ajax_load_more');
				
				$.ajax({
					type: 'POST',
					data: ajaxData,
					url: qodefGlobalVars.vars.qodefAjaxUrl,
					success: function (data) {
						if(!thisPortList.hasClass('qodef-pl-pag-standard')) {
							nextPage++;
						}
						
						thisPortList.data('next-page', nextPage);
						
						var response = $.parseJSON(data),
							responseHtml =  response.html;
						
						if(thisPortList.hasClass('qodef-pl-pag-standard')) {
							qodefInitStandardPaginationLinkChanges(thisPortList, maxNumPages, nextPage);
							
							thisPortList.waitForImages(function(){
								if(thisPortList.hasClass('qodef-pl-masonry')){
									qodefInitHtmlIsotopeNewContent(thisPortList, thisPortListInner, loadingItem, responseHtml);
								} else if (thisPortList.hasClass('qodef-pl-gallery') && thisPortList.hasClass('qodef-pl-has-filter')) {
									qodefInitHtmlIsotopeNewContent(thisPortList, thisPortListInner, loadingItem, responseHtml);
								} else {
									qodefInitHtmlGalleryNewContent(thisPortList, thisPortListInner, loadingItem, responseHtml);
								}
							});
						} else {
							thisPortList.waitForImages(function(){
								if(thisPortList.hasClass('qodef-pl-masonry')){
								    if(pagedLink === 1) {
                                        qodefInitHtmlIsotopeNewContent(thisPortList, thisPortListInner, loadingItem, responseHtml);
                                    } else {
                                        qodefInitAppendIsotopeNewContent(thisPortList, thisPortListInner, loadingItem, responseHtml);
                                    }
								} else if (thisPortList.hasClass('qodef-pl-gallery') && thisPortList.hasClass('qodef-pl-has-filter') && pagedLink !== 1) {
									qodefInitAppendIsotopeNewContent(thisPortList, thisPortListInner, loadingItem, responseHtml);
								} else {
								    if (pagedLink === 1) {
                                        qodefInitHtmlGalleryNewContent(thisPortList, thisPortListInner, loadingItem, responseHtml);
                                    } else {
                                        qodefInitAppendGalleryNewContent(thisPortListInner, loadingItem, responseHtml);
                                    }
								}
							});
						}
						
						if(thisPortList.hasClass('qodef-pl-infinite-scroll-started')) {
							thisPortList.removeClass('qodef-pl-infinite-scroll-started');
						}
					}
				});
			}
			
			if(nextPage === maxNumPages){
				thisPortList.find('.qodef-pl-load-more-holder').hide();
			}
		};
		
		var qodefInitStandardPaginationLinkChanges = function(thisPortList, maxNumPages, nextPage) {
			var standardPagHolder = thisPortList.find('.qodef-pl-standard-pagination'),
				standardPagNumericItem = standardPagHolder.find('li.qodef-pag-number'),
				standardPagPrevItem = standardPagHolder.find('li.qodef-pag-prev a'),
				standardPagNextItem = standardPagHolder.find('li.qodef-pag-next a');
			
			standardPagNumericItem.removeClass('qodef-pag-active');
			standardPagNumericItem.eq(nextPage-1).addClass('qodef-pag-active');
			
			standardPagPrevItem.data('paged', nextPage-1);
			standardPagNextItem.data('paged', nextPage+1);
			
			if(nextPage > 1) {
				standardPagPrevItem.css({'opacity': '1'});
			} else {
				standardPagPrevItem.css({'opacity': '0'});
			}
			
			if(nextPage === maxNumPages) {
				standardPagNextItem.css({'opacity': '0'});
			} else {
				standardPagNextItem.css({'opacity': '1'});
			}
		};
		
		var qodefInitHtmlIsotopeNewContent = function(thisPortList, thisPortListInner, loadingItem, responseHtml) {
            thisPortListInner.find('article').remove();
            thisPortListInner.append(responseHtml);
			qodef.modules.common.setFixedImageProportionSize(thisPortList, thisPortListInner.find('article'), thisPortListInner.find('.qodef-masonry-grid-sizer').width(), true);
            thisPortListInner.isotope('reloadItems').isotope({sortBy: 'original-order'});
			loadingItem.removeClass('qodef-showing qodef-standard-pag-trigger');
			thisPortList.removeClass('qodef-pl-pag-standard-animate');
			
			setTimeout(function() {
				thisPortListInner.isotope('layout');
				qodefInitPortfolioListAnimation();
				qodef.modules.common.qodefInitParallax();
				qodef.modules.common.qodefPrettyPhoto();
			}, 600);
		};
		
		var qodefInitHtmlGalleryNewContent = function(thisPortList, thisPortListInner, loadingItem, responseHtml) {
			loadingItem.removeClass('qodef-showing qodef-standard-pag-trigger');
			thisPortList.removeClass('qodef-pl-pag-standard-animate');
			thisPortListInner.html(responseHtml);
			qodefInitPortfolioListAnimation();
			qodef.modules.common.qodefInitParallax();
			qodef.modules.common.qodefPrettyPhoto();
		};
		
		var qodefInitAppendIsotopeNewContent = function(thisPortList, thisPortListInner, loadingItem, responseHtml) {
            thisPortListInner.append(responseHtml);
			qodef.modules.common.setFixedImageProportionSize(thisPortList, thisPortListInner.find('article'), thisPortListInner.find('.qodef-masonry-grid-sizer').width(), true);
            thisPortListInner.isotope('reloadItems').isotope({sortBy: 'original-order'});
			loadingItem.removeClass('qodef-showing');
			
			setTimeout(function() {
				thisPortListInner.isotope('layout');
				qodefInitPortfolioListAnimation();
				qodef.modules.common.qodefInitParallax();
				qodef.modules.common.qodefPrettyPhoto();
			}, 600);
		};
		
		var qodefInitAppendGalleryNewContent = function(thisPortListInner, loadingItem, responseHtml) {
			loadingItem.removeClass('qodef-showing');
			thisPortListInner.append(responseHtml);
			qodefInitPortfolioListAnimation();
			qodef.modules.common.qodefInitParallax();
			qodef.modules.common.qodefPrettyPhoto();
		};
		
		return {
			init: function() {
				if(portList.length) {
					portList.each(function() {
						var thisPortList = $(this);
						
						if(thisPortList.hasClass('qodef-pl-pag-standard')) {
							initStandardPagination(thisPortList);
						}
						
						if(thisPortList.hasClass('qodef-pl-pag-load-more')) {
							initLoadMorePagination(thisPortList);
						}
						
						if(thisPortList.hasClass('qodef-pl-pag-infinite-scroll')) {
							initInifiteScrollPagination(thisPortList);
						}
					});
				}
			},
			scroll: function() {
				if(portList.length) {
					portList.each(function() {
						var thisPortList = $(this);
						
						if(thisPortList.hasClass('qodef-pl-pag-infinite-scroll')) {
							initInifiteScrollPagination(thisPortList);
						}
					});
				}
			},
            getMainPagFunction: function(thisPortList, paged) {
                initMainPagFunctionality(thisPortList, paged);
            }
		};
	}

    var qodefPortfolioScrollableList = function(){
        var scrollableList = $('.qodef-pl-scrollable');
        var header = '';
        if($('.qodef-fixed-wrapper').length){
            header = '.qodef-page-header .fixed';
        }else{
            header = '.qodef-page-header .header-appear';
        }

        scrollableList.on('mouseenter', function(){
            scrollableList.addClass('qodef-ptf-hovered');
        });

		scrollableList.on('mouseleave', function(){
			scrollableList.removeClass('qodef-ptf-hovered');
		});

        var qodefPortfolioScrollPosition = function(scrollableHolder){
            var thisMeta = scrollableHolder.find('.qodef-ptf-list-showcase-meta'),
                thisMetaInner = thisMeta.find('.qodef-ptf-list-showcase-meta-inner');
            thisMetaInner.css({
                'left': thisMeta.offset().left,
                'width': thisMeta.width()
            });
        };

        var qodefPortfolioScrollFix = function(scrollableHolder){
            var thisMeta = scrollableHolder.find('.qodef-ptf-list-showcase-meta'),
                thisMetaInner = thisMeta.find('.qodef-ptf-list-showcase-meta-inner'),
                thisMetaInnerHeight = thisMetaInner.height(),
                thisPreview = scrollableHolder.find('.qodef-ptf-list-showcase-preview'),
                thisPreviewOffsetTop = thisPreview.offset().top,
                thisPreviewOffsetBottom = thisPreview.offset().top + thisPreview.height(),
                topPosition = $(header).height() + qodefGlobalVars.vars.qodefAddForAdminBar;

            if (thisPreviewOffsetTop <= qodef.scroll + topPosition && thisPreviewOffsetBottom > qodef.scroll){
                if (!thisMeta.hasClass('qodef-fix-meta')){
                    thisMeta.addClass('qodef-fix-meta');
                    qodefPortfolioScrollPosition(scrollableHolder);
                }
                if (thisPreviewOffsetBottom < qodef.scroll + topPosition + thisMetaInnerHeight){
                    thisMeta.addClass('qodef-fix-bottom');
                    thisMetaInner.css('top',thisPreviewOffsetBottom - (qodef.scroll + thisMetaInnerHeight));
                }
                else{
                    thisMeta.removeClass('qodef-fix-bottom');
                    thisMetaInner.css('top',topPosition);
                }
            }
            else{
                thisMeta.removeClass('qodef-fix-meta');
                thisMeta.removeClass('qodef-fix-bottom');
            }
        };


        var qodefProjectsListHover = function(scrollableHolder){
            var thisMeta = scrollableHolder.find('.qodef-ptf-list-showcase-meta'),
                thisMetaHolder = scrollableHolder.find('.qodef-ptf-list-showcase-meta-items-holder'),
                thisPreviewHolder = scrollableHolder.find('.qodef-ptf-list-showcase-preview'),
                thisMetaChildren = thisMetaHolder.find('.qodef-ptf-list-showcase-meta-item'),
                thisPreviewChildren = thisPreviewHolder.find('.qodef-ptf-list-showcase-preview-item'),
                thisMetaLink = thisMetaHolder.find('.qodef-ptf-meta-item-title a'),
                projectNum = 1;

            thisPreviewChildren.on('mouseenter',function () {
                projectNum = $(this).index();
                var currentProject = $(this);


                thisMetaChildren.removeClass('active');
                thisPreviewChildren.removeClass('active');
                thisMetaChildren.clearQueue();
                thisMetaChildren.eq(projectNum).addClass('active');
                currentProject.addClass('active');
            });

            thisMetaChildren.on('mouseover touch',function () {
                projectNum = $(this).index();
                var currentProject = $(this);
                var currentPreview = thisPreviewChildren.eq(projectNum);
                var currentScroll = currentPreview.offset().top - qodef.windowHeight/2 + currentPreview.height()/2;
                var scrollFromTop = thisMeta.offset().top - $(header).height();


                thisMetaChildren.removeClass('active');
                thisPreviewChildren.removeClass('active');
                thisPreviewChildren.clearQueue();
                currentProject.addClass('active');
                currentPreview.addClass('active');

                if (projectNum == 0){
                    qodef.html.stop().animate({scrollTop: scrollFromTop}, 1200, 'easeOutExpo');
                }
                else{
                    qodef.html.stop().animate({scrollTop: currentScroll}, 1200, 'easeOutExpo');
                }
            });

            thisMetaLink.on('click touch',function (e) {
                var thisLink = $(this);

                if (!thisLink.parents('.qodef-ptf-list-showcase-meta-item').hasClass('active')){
                    e.preventDefault();
                }
            });

            scrollableHolder.on('mouseleave',function () {
                thisMetaChildren.removeClass('active');
                thisPreviewChildren.removeClass('active');
            });

        };

        return {

            init : function() {
                if (scrollableList.length && qodef.windowWidth > 768){
                    scrollableList.each(function () {
                        var thisScrollable = $(this);
                        qodefProjectsListHover(thisScrollable);
                        qodefPortfolioScrollFix(thisScrollable);
                        qodefPortfolioScrollPosition(thisScrollable);
                        $(window).scroll(function(){
                            qodefPortfolioScrollFix(thisScrollable);
                        });
                        $(window).resize(function(){
                            qodefPortfolioScrollPosition(thisScrollable);
                        });
                    });
                }
            }

        };
    };

	/*
	 **  Smooth scroll functionality for Portfolio List Scrollable
	 */
    function qodefPortfolioScrollableScroll(){

        var metaShowcase = $('.qodef-ptf-list-showcase-meta-inner');

        if(metaShowcase.length){
            metaShowcase.niceScroll({
                scrollspeed: 60,
                mousescrollstep: 40,
                cursorwidth: 0,
                cursorborder: 0,
                cursorborderradius: 0,
                cursorcolor: "transparent",
                autohidemode: false,
                horizrailenabled: false
            });
        }
    }

})(jQuery);
(function($) {
    'use strict';

    var portfolioVerticalLoop = {};
    qodef.modules.portfolioVerticalLoop = portfolioVerticalLoop;

    portfolioVerticalLoop.qodefOnWindowLoad = qodefOnWindowLoad;

    $(window).load(qodefOnWindowLoad);

    /*
     All functions to be called on $(window).load() should be in this function
     */
    function qodefOnWindowLoad() {
        qodefInitPortfolioVerticalLoop();
    }

	function qodefInitPortfolioVerticalLoop(){
        var portfolioVerticalLoopHolder = $('.qodef-portfolio-vertical-loop-holder');

        if(portfolioVerticalLoopHolder.length) {
            portfolioVerticalLoopHolder.each(function() {
                var thisPortfolioVerticalLoop = $(this),
                    header = $('.qodef-page-header'),
                    mobileHeader = $('.qodef-mobile-header'),
                    headerAddition,
                    normalHeaderAddition,
                    headerHeight = header.outerHeight(),
                    paspartuWidth = qodef.body.hasClass('qodef-paspartu-enabled') ? parseInt($('.qodef-paspartu-enabled .qodef-wrapper').css('padding-left')) : 0;

                if (qodef.body.hasClass('qodef-content-is-behind-header')) {
                    normalHeaderAddition = 0;
                } else {
                    normalHeaderAddition = headerHeight;
                }

                var container = $('.qodef-pvl-inner');
                container.append('<div class="qodef-plvi-next-overlay"><div class="qodef-pvli-background-text">Next</div><div class="qodef-pvli-post-info"><div class="qodef-pvli-category"></div><div class="qodef-pvli-title"></div></div></div>');
                var nextOverlay =  container.find('.qodef-plvi-next-overlay'),
                    nextOverlayTitle = nextOverlay.find('.qodef-pvli-title'),
                    nextOverlayCategory = nextOverlay.find('.qodef-pvli-category');

                // function to set overlay information
                var setOverlayInfo = function(item) {
                    var itemTitle = item.find('.qodef-pvli-title').first().text();
                    var itemCategory = item.find('.qodef-pvli-category').first().text();

                    nextOverlayTitle.text(itemTitle);
                    nextOverlayCategory.text(itemCategory);
                }

                // function to init parallax
                function qodefParallaxImages() {
                    var parallaxImages = thisPortfolioVerticalLoop.find(".qodef-single-image-holder");
            
                    if (parallaxImages.length && !qodef.htmlEl.hasClass('touch')) {
                        
                        // render data on images
                        parallaxImages.each(function(index) {
                            if (index % 2 == 0) {
                                $(this).data("data-parallax", '{"y": 50, "smoothness": 40}');
                                $(this).attr("data-parallax", '{"y": 50, "smoothness": 40}');
                            } else {
                                $(this).data("data-parallax", '{"y": -50, "smoothness": 40}');
                                $(this).attr("data-parallax", '{"y": -50, "smoothness": 40}');
                            }
                        });
                        ParallaxScroll.init();
                    }
                }

                qodefParallaxImages();

                var click = true;

                $(qodef.body).on('click', '.qodef-plvi-next-overlay', function (e) {
                    e.preventDefault();
                    if (click) {
                        click = false;
                        var thisLink = $(this);

                        //check for mobile header
                        if (qodef.windowWidth < 1000) {
                            headerAddition = mobileHeader.outerHeight();
                        } else {
                            headerAddition = normalHeaderAddition;
                        }

                        var scrollTop = qodef.window.scrollTop(),
                            elementOffset = container.find('article:eq(0)').offset().top,
                            distance = (elementOffset - scrollTop) - headerAddition - paspartuWidth;

                        container.find('article:eq(1)').removeClass('next-item');
                        nextOverlay.addClass('animate-overlay-up');

                        setTimeout(function () {
                            qodef.window.scrollTop(0);
                            container.find('article:eq(0)').remove();
                            nextOverlay.addClass('animate-overlay-out');
                        }, 1250);

                        setTimeout(function () {
                            nextOverlay.removeClass("animate-overlay-up animate-overlay-out");
                        }, 2000);
                        

                        var loadMoreData = qodef.modules.common.getLoadMoreData(thisPortfolioVerticalLoop);

                            var ajaxData = qodef.modules.common.setLoadMoreAjaxData(loadMoreData, 'aarhus_core_portfolio_vertical_loop_ajax_load_more');

                            $.ajax({
                                type: 'POST',
                                data: ajaxData,
                                url: qodefGlobalVars.vars.qodefAjaxUrl,
                                success: function (data) {


                                    var response = $.parseJSON(data),
                                        responseHtml = response.html,
                                        nextItemId = response.next_item_id;
                                    thisPortfolioVerticalLoop.data('next-item-id', nextItemId);

                                    var nextItem = $(responseHtml).find('.qodef-pvl-item-inner').parent().addClass('next-item').fadeIn(400);
                                    container.append(nextItem);
                                    setTimeout(function() {
                                        setOverlayInfo(nextItem);
                                        qodef.modules.common.qodefInitParallax();
                                        qodefParallaxImages();
                                        qodef.modules.elementsHolder.qodefInitElementsHolderResponsiveStyle();
                                    }, 400);
                                    click = true;
                                }
                            });

                        // load navigation
                        qodefPortfolioVerticalLoopNavigation(thisPortfolioVerticalLoop);
                    }
                    else {
                        return false;
                    }
                });

                //load next item on page load
                qodefPortfolioVerticalLoopNextItem(thisPortfolioVerticalLoop, container);
                
            });
        }
	}

    function qodefPortfolioVerticalLoopNextItem(portfolioVerticalLoopHolder, container){
        var navHolder = portfolioVerticalLoopHolder.find('.qodef-pvl-navigation-holder'),
            navigation = navHolder.find('.qodef-pvl-navigation'),
            nextOverlay =  container.find('.qodef-plvi-next-overlay'),
            nextOverlayTitle = nextOverlay.find('.qodef-pvli-title'),
            nextOverlayCategory = nextOverlay.find('.qodef-pvli-category');

        var setOverlayInfo = function(item) {
            var itemTitle = item.find('.qodef-pvli-title').first().text();
            var itemCategory = item.find('.qodef-pvli-category').first().text();

            nextOverlayTitle.text(itemTitle);
            nextOverlayCategory.text(itemCategory);
        }

        if (typeof navHolder.data('id') !== 'undefined' && navHolder.data('id') !== false) {
            var navItemId = navHolder.data('id');
        }

        if (typeof navHolder.data('next-item-id') !== 'undefined' && navHolder.data('next-item-id') !== false) {
            var navNextItemId = navHolder.data('next-item-id');
        }


        if (typeof portfolioVerticalLoopHolder.data('id') == 'undefined' || portfolioVerticalLoopHolder.data('id') !== false) {
            portfolioVerticalLoopHolder.data('id', navItemId);
        }

        if (typeof portfolioVerticalLoopHolder.data('next-item-id') == 'undefined' || portfolioVerticalLoopHolder.data('next-item-id') == false) {
           portfolioVerticalLoopHolder.data('next-item-id', navNextItemId);
        }

        var loadMoreInitialData = qodef.modules.common.getLoadMoreData(portfolioVerticalLoopHolder),
            ajaxInitialData = qodef.modules.common.setLoadMoreAjaxData(loadMoreInitialData, 'aarhus_core_portfolio_vertical_loop_ajax_load_more');

        $.ajax({
            type: 'POST',
            data: ajaxInitialData,
            url: qodefGlobalVars.vars.qodefAjaxUrl,
            success: function (data) {
                var response = $.parseJSON(data),
                    responseHtml = response.html,
                    nextItemId = response.next_item_id;
                    portfolioVerticalLoopHolder.data('next-item-id', nextItemId);

                var nextItem = $(responseHtml).find('.qodef-pvl-item-inner').parent().addClass('next-item').fadeIn(400);
                container.append(nextItem);
                setOverlayInfo(nextItem);
                setTimeout(function() {
                    qodef.modules.common.qodefInitParallax();
                    qodefParallaxImages();
                    qodef.modules.elementsHolder.qodefInitElementsHolderResponsiveStyle();
                }, 400);
            }
        });
    }

    function qodefPortfolioVerticalLoopNavigation(portfolioVerticalLoopHolder){
        var navHolder = portfolioVerticalLoopHolder.find('.qodef-pvl-navigation-holder'),
            navigation = navHolder.find('.qodef-pvl-navigation'),
            loadMoreNavData = qodef.modules.common.getLoadMoreData(navHolder);

            var ajaxDataNav = qodef.modules.common.setLoadMoreAjaxData(loadMoreNavData, 'aarhus_core_portfolio_vertical_loop_ajax_load_more_navigation');

            $.ajax({
                type: 'POST',
                data: ajaxDataNav,
                url: qodefGlobalVars.vars.qodefAjaxUrl,
                success: function (data) {
                    var response = $.parseJSON(data),
                        responseHtml = response.html,
                        nextItemId = response.next_item_id;

                    navHolder.data('next-item-id', nextItemId);

                    navHolder.html(responseHtml);
                }
            });
    }

})(jQuery);
(function ($) {
    'use strict';

    var testimonialsCarousel = {};
    qodef.modules.testimonialsCarousel = testimonialsCarousel;

    testimonialsCarousel.qodefInitTestimonials = qodefInitTestimonialsCarousel;


    testimonialsCarousel.qodefOnWindowLoad = qodefOnWindowLoad;

    $(window).load(qodefOnWindowLoad);

    /*
     All functions to be called on $(window).load() should be in this function
     */
    function qodefOnWindowLoad() {
        qodefInitTestimonialsCarousel();
    }

    /**
     * Init testimonials shortcode elegant type
     */
    function qodefInitTestimonialsCarousel(){
        var testimonial = $('.qodef-testimonials-holder.qodef-testimonials-carousel');

        if(testimonial.length){
            testimonial.each(function(){
                var thisTestimonials = $(this),
                    mainTestimonialsSlider = thisTestimonials.find('.qodef-testimonials-main'),
                    imagePagSlider = thisTestimonials.children('.qodef-testimonial-image-nav'),
                    loop = true,
                    autoplay = true,
                    sliderSpeed = 5000,
                    sliderSpeedAnimation = 600,
                    mouseDrag = false;

                if (mainTestimonialsSlider.data('enable-loop') === 'no') {
                    loop = false;
                }
                if (mainTestimonialsSlider.data('enable-autoplay') === 'no') {
                    autoplay = false;
                }
                if (typeof mainTestimonialsSlider.data('slider-speed') !== 'undefined' && mainTestimonialsSlider.data('slider-speed') !== false) {
                    sliderSpeed = mainTestimonialsSlider.data('slider-speed');
                }
                if (typeof mainTestimonialsSlider.data('slider-speed-animation') !== 'undefined' && mainTestimonialsSlider.data('slider-speed-animation') !== false) {
                    sliderSpeedAnimation = mainTestimonialsSlider.data('slider-speed-animation');
                }
                if(qodef.windowWidth < 680){
                    mouseDrag = true;
                }

                if (mainTestimonialsSlider.length && imagePagSlider.length) {
                    var text = mainTestimonialsSlider.owlCarousel({
                        items: 1,
                        loop: loop,
                        autoplay: autoplay,
                        autoplayTimeout: sliderSpeed,
                        smartSpeed: sliderSpeedAnimation,
                        autoplayHoverPause: false,
                        dots: false,
                        nav: false,
                        mouseDrag: false,
                        touchDrag: mouseDrag,
                        onInitialize: function () {
                            mainTestimonialsSlider.css('visibility', 'visible');
                        }
                    });

                    var image = imagePagSlider.owlCarousel({
                        loop: loop,
                        autoplay: autoplay,
                        autoplayTimeout: sliderSpeed,
                        smartSpeed: sliderSpeedAnimation,
                        autoplayHoverPause: false,
                        center: true,
                        dots: false,
                        nav: false,
                        mouseDrag: false,
                        touchDrag: false,
                        responsive: {
                            1025: {
                                items: 5
                            },
                            0: {
                                items: 3
                            }
                        },
                        onInitialize: function () {
                            imagePagSlider.css('visibility', 'visible');
                            thisTestimonials.css('opacity', '1');
                        }
                    });

                    imagePagSlider.find('.owl-item').on('click touchpress', function (e) {
                        e.preventDefault();

                        var thisItem = $(this),
                            itemIndex = thisItem.index(),
                            numberOfClones = imagePagSlider.find('.owl-item.cloned').length,
                            modifiedItems = itemIndex - numberOfClones / 2 >= 0 ? itemIndex - numberOfClones / 2 : itemIndex;

                        image.trigger('to.owl.carousel', modifiedItems);
                        text.trigger('to.owl.carousel', modifiedItems);
                    });

                }
            });
        }
    }

})(jQuery);
(function($) {
    'use strict';

    var testimonialsImagePagination = {};
    qodef.modules.testimonialsImagePagination = testimonialsImagePagination;

    testimonialsImagePagination.qodefOnDocumentReady = qodefOnDocumentReady;

    $(document).ready(qodefOnDocumentReady);

    /* 
     All functions to be called on $(document).ready() should be in this function
     */
    function qodefOnDocumentReady() {
        qodefTestimonialsImagePagination();
    }

    /**
     * Init Owl Carousel
     */
    function qodefTestimonialsImagePagination() {
        var sliders = $('.qodef-testimonials-image-pagination-inner');

        if (sliders.length) {
            sliders.each(function() {
                var slider = $(this),
                    slideItemsNumber = slider.children().length,
                    loop = true,
                    autoplay = true,
                    autoplayHoverPause = false,
                    sliderSpeed = 3500,
                    sliderSpeedAnimation = 500,
                    margin = 0,
                    stagePadding = 0,
                    center = false,
                    autoWidth = false,
                    animateInClass = false, // keyframe css animation
                    animateOutClass = false, // keyframe css animation
                    navigation = true,
                    pagination = false,
                    drag = true,
                    sliderDataHolder = slider;

                if (sliderDataHolder.data('enable-loop') === 'no') {
                    loop = false;
                }
                if (typeof sliderDataHolder.data('slider-speed') !== 'undefined' && sliderDataHolder.data('slider-speed') !== false) {
                    sliderSpeed = sliderDataHolder.data('slider-speed');
                }
                if (typeof sliderDataHolder.data('slider-speed-animation') !== 'undefined' && sliderDataHolder.data('slider-speed-animation') !== false) {
                    sliderSpeedAnimation = sliderDataHolder.data('slider-speed-animation');
                }
                if (sliderDataHolder.data('enable-auto-width') === 'yes') {
                    autoWidth = true;
                }
                if (typeof sliderDataHolder.data('slider-animate-in') !== 'undefined' && sliderDataHolder.data('slider-animate-in') !== false) {
                    animateInClass = sliderDataHolder.data('slider-animate-in');
                }
                if (typeof sliderDataHolder.data('slider-animate-out') !== 'undefined' && sliderDataHolder.data('slider-animate-out') !== false) {
                    animateOutClass = sliderDataHolder.data('slider-animate-out');
                }
                if (sliderDataHolder.data('enable-navigation') === 'no') {
                    navigation = false;
                }
                if (sliderDataHolder.data('enable-pagination') === 'yes') {
                    pagination = true;
                }

                if (navigation && pagination) {
                    slider.addClass('qodef-slider-has-both-nav');
                }

                if (pagination) {
                    var dotsContainer = '#qodef-testimonial-pagination';
                    $('.qodef-tsp-item').on('click', function () {
                        slider.trigger('to.owl.carousel', [$(this).index(), 300]);
                    });
                }

                if (slideItemsNumber <= 1) {
                    loop = false;
                    autoplay = false;
                    navigation = false;
                    pagination = false;
                }

                slider.waitForImages(function () {
                    $(this).owlCarousel({
                        items: 1,
                        loop: loop,
                        autoplay: autoplay,
                        autoplayHoverPause: autoplayHoverPause,
                        autoplayTimeout: sliderSpeed,
                        smartSpeed: sliderSpeedAnimation,
                        margin: margin,
                        stagePadding: stagePadding,
                        center: center,
                        autoWidth: autoWidth,
                        animateIn: animateInClass,
                        animateOut: animateOutClass,
                        dots: pagination,
                        dotsContainer: dotsContainer,
                        nav: navigation,
                        drag: drag,
                        callbacks: true,
                        navText: [
                            '<span class="qodef-prev-icon ion-chevron-left"></span>',
                            '<span class="qodef-next-icon ion-chevron-right"></span>'
                        ],
                        onInitialize: function () {
                            slider.css('visibility', 'visible');
                        },
                        onDrag: function (e) {
                            if (qodef.body.hasClass('qodef-smooth-page-transitions-fadeout')) {
                                var sliderIsMoving = e.isTrigger > 0;

                                if (sliderIsMoving) {
                                    slider.addClass('qodef-slider-is-moving');
                                }
                            }
                        },
                        onDragged: function () {
                            if (qodef.body.hasClass('qodef-smooth-page-transitions-fadeout') && slider.hasClass('qodef-slider-is-moving')) {

                                setTimeout(function () {
                                    slider.removeClass('qodef-slider-is-moving');
                                }, 500);
                            }
                        }
                    });

                });
            });
        }
    }
    
})(jQuery);