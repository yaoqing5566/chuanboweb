/* ===================================================================
 * Abstract - Main JS
 *
 * ------------------------------------------------------------------- */ 

(function($) {

	"use strict";

	var cfg = {		
		defAnimation   : "fadeInUp",    // default css animation		
		scrollDuration : 800,           // smoothscroll duration
		statsDuration  : 4000,          // stats animation duration
		mailChimpURL   : 'http://facebook.us8.list-manage.com/subscribe/post?u=cdb7b577e41181934ed6a6a44&amp;id=e65110b38d'
	},
		
	$WIN = $(window);


	/* Preloader 
	 * -------------------------------------------------- */
	var ssPreloader = function() {
		$WIN.on('load', function() {	

	      // will first fade out the loading animation 
	    	$("#loader").fadeOut("slow", function(){

	        // will fade out the whole DIV that covers the website.
	        $("#preloader").delay(300).fadeOut("slow");

	      }); 
	  	});
	};  


	/* audio controls 
	 * -------------------------------------------------- */ 
	var ssMediaElementPlayer = function() {
		$("audio").mediaelementplayer({
			features: ['playpause','progress', 'tracks','volume']
	  	});
	};


	/* FitVids
	------------------------------------------------------ */ 
	var ssFitVids = function() {
		$(".fluid-video-wrapper").fitVids();
	}; 

		
	/* pretty print
	 * -------------------------------------------------- */ 
	var ssPrettyPrint = function() {
		$('pre').addClass('prettyprint');
		$( document ).ready(function() {		
	    	prettyPrint();		
	  	}); 
	};


	/* Alert Boxes
  	------------------------------------------------------- */
  	var ssAlertBoxes = function() {

  		$('.alert-box').on('click', '.close', function() {
		  $(this).parent().fadeOut(500);
		}); 

  	};	   


	/* superfish
	 * -------------------------------------------------- */  
	var ssSuperFish = function() {
		$('ul.sf-menu').superfish({

	   	animation: { height:'show' }, // slide-down effect without fade-in
			animationOut: { height:'hide'}, // slide-up effect without fade-in			
			cssArrows: false, // disable css arrows	
			delay: 600 // .6 second delay on mouseout
			
		});
	};

	
  	/* Mobile Menu
   ------------------------------------------------------ */ 
   var ssMobileNav = function() {

   	var toggleButton = $('.menu-toggle'),
          nav = $('.main-navigation');

	   toggleButton.on('click', function(event){
			event.preventDefault();

			toggleButton.toggleClass('is-clicked');
			nav.slideToggle();
		});

	  	if (toggleButton.is(':visible')) nav.addClass('mobile');

	  	$WIN.resize(function() {
	   	if (toggleButton.is(':visible')) nav.addClass('mobile');
	    	else nav.removeClass('mobile');
	  	});

	  	$('#main-nav-wrap li a').on("click", function() {   
	   	if (nav.hasClass('mobile')) {   		
	   		toggleButton.toggleClass('is-clicked'); 
	   		nav.fadeOut();   		
	   	}     
	  	});

   }; 
   

  /* search
   ------------------------------------------------------ */ 
   var ssSearch = function() {

   	var searchWrap = $('.search-wrap');
	   var searchField = searchWrap.find('.search-field');
	   var closeSearch = $('#close-search');
	   var searchTrigger = $('.search-trigger');
	   var body = $('body');

	   searchTrigger.on('click', function(e){

	      e.preventDefault();
	      e.stopPropagation();   
	      var $this = $(this);

	      body.addClass('search-visible');
	      setTimeout(function(){
	         $('.search-wrap').find('.search-field').focus();
	      }, 100);

	   });


	   closeSearch.on('click', function(){
	      var $this = $(this);
	      
	      if(body.hasClass('search-visible')){
	         body.removeClass('search-visible');
	         setTimeout(function(){
	            $('.search-wrap').find('.search-field').blur();
	         }, 100);
	      }
	   });

	   searchWrap.on('click',  function(e){
	   	if( !$(e.target).is('.search-field') ) {   		
	   		closeSearch.trigger('click');   		
	   	}
	   });

	   searchField.on('click', function(e){
	      e.stopPropagation();
	   });

	   searchField.attr({placeholder: 'Type Your Keywords', autocomplete: 'off'});

   };
	 


	/*	Masonry
	------------------------------------------------------ */
	var ssMasonryFolio = function() {
		var containerBricks = $('.bricks-wrapper');

		containerBricks.imagesLoaded( function() {

			containerBricks.masonry( {
			  	itemSelector: '.entry',
			  	columnWidth: '.grid-sizer',
	  			percentPosition: true,
			  	resize: true
			});

		});
	};


  /* animate bricks
	* ------------------------------------------------------ */
	var ssBricksAnimate = function() {

		var animateEl = $('.animate-this');

		$WIN.on('load', function() {				
			setTimeout(function() {
				animateEl.each(function(ctr) {				
						var el = $(this);
						
						setTimeout(function() {
							el.addClass('animated fadeInUp');														
						}, ctr * 200);

				});
			}, 200);				
		});

		$WIN.on('resize', function() {	
			// remove animation classes	
			animateEl.removeClass('animate-this animated fadeInUp');
		});

	};
		

  /* Flex Slider
	* ------------------------------------------------------ */
	var ssFlexSlider = function() {

		$WIN.on('load', function() {

		   $('#featured-post-slider').flexslider({
				namespace: "flex-",
		      controlsContainer: "", // ".flex-content",
		      animation: 'fade',
		      controlNav: false,
		      directionNav: true,
		      smoothHeight: false,
		      slideshowSpeed: 7000,
		      animationSpeed: 600,
		      randomize: false,
		      touch: true,		
		   });

		   $('.post-slider').flexslider({
		   	namespace: "flex-",
		      controlsContainer: "",
		      animation: 'fade',
		      controlNav: true,
		      directionNav: false,
		      smoothHeight: false,
		      slideshowSpeed: 7000,
		      animationSpeed: 600,
		      randomize: false,
		      touch: true,
		      start: function (slider) {
					if (typeof slider.container === 'object') {
						slider.container.on("click", function (e) {
							if (!slider.animating) {
								slider.flexAnimate(slider.getTarget('next'));
							}
						});
					}
				}
		   });

	   });
	};	


  /* Smooth Scrolling
	* ------------------------------------------------------ */
	var ssSmoothScroll = function() {

		$('.smoothscroll').on('click', function (e) {
			var target = this.hash,
			$target    = $(target);
	 	
		 	e.preventDefault();
		 	e.stopPropagation();	   	

	    	$('html, body').stop().animate({
	       	'scrollTop': $target.offset().top
	      }, cfg.scrollDuration, 'swing').promise().done(function () {

	      	// check if menu is open
	      	if ($('body').hasClass('menu-is-open')) {
					$('#header-menu-trigger').trigger('click');
				}

	      	window.location.hash = target;
	      });
	  	});

	};





  /* Back to Top
	* ------------------------------------------------------ */
	var ssBackToTop = function() {

		var pxShow  = 500,         // height on which the button will show
		fadeInTime  = 400,         // how slow/fast you want the button to show
		fadeOutTime = 400,         // how slow/fast you want the button to hide
		scrollSpeed = 300,         // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'
		goTopButton = $("#go-top")

		// Show or hide the sticky footer button
		$(window).on('scroll', function() {
			if ($(window).scrollTop() >= pxShow) {
				goTopButton.fadeIn(fadeInTime);
			} else {
				goTopButton.fadeOut(fadeOutTime);
			}
		});
	};	



  /* Initialize
	* ------------------------------------------------------ */
	(function ssInit() {	

		ssPreloader();
		ssMediaElementPlayer();
		ssFitVids();
		ssPrettyPrint();
		ssAlertBoxes();
		ssSuperFish();
		ssMobileNav();
		ssSearch();

		ssMasonryFolio();

		ssBricksAnimate();
		ssFlexSlider();
		ssBackToTop();

	})();
 
 

})(jQuery);