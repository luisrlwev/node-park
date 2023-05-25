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