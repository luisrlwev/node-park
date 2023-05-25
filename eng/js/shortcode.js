
jQuery(document).ready(function() {

    'use strict';
	
	
	
	
//________FADE SLIDER FUNCTION BY = owl.carousel.js________//

	jQuery('.owl-fade-slider-one').owlCarousel({
		loop:true,
		autoplay:true,
		autoplayTimeout:2000,
		margin:30,
		nav:true,
		navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
		items:1,
		dots: true,
		animateOut:'fadeOut',

	})
	
	
	
			
//________COUNTERUP FUNCTION BY= counterup-min.js________//

	jQuery('.counter').counterUp({
		delay: 10,
		time: 4000
	});
	
	
	
		
//________CLIENT LOGO CAROUSEL FUNCTION BY= owl.carousel.js________//

	jQuery('.client-logo-carousel').owlCarousel({
		loop:true,
		margin:50,
		nav:true,
		dots: false,
		navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
		responsive:{
			0:{
				items:2
			},
			480:{
				items:3
			},			
			767:{
				items:4
			},
			1000:{
				items:5
			}
		}
	})	
	
	
	
	
//________SLIDE SLIDER FUNCTION BY= owl.carousel.js________//

	jQuery('.owl-slide-slider-one').owlCarousel({
		loop:true,
		autoplay:true,
		autoplayTimeout:2000,
		margin:30,
		nav:true,
		navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
		items:1,
		dots: true,
	})	
	
	
	
		
//________TESTIMONIAL FIVE FUNCTION BY=owl.carousel.js________//

	jQuery('.testimonial-five').owlCarousel({
		loop:false,
		margin:80,
		nav:false,
		dots: true,
		navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
		responsive:{
			0:{
				items:1
			},
			991:{
				items:2
			}
		}
	})	
	
	
	
	
//________TOOLTIP FUNCTION BY=bootstrap.js________//

	jQuery('[data-toggle="tooltip"]').tooltip();
	
	
	

//________POPOVER FUNCTION BY =bootstrap.js________//

	jQuery('[data-toggle="popover"]').popover();
	
	
		
});

//________Document.ready END________//

