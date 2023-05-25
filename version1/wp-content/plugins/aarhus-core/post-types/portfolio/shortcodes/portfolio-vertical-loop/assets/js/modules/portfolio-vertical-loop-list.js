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