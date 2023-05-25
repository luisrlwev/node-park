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