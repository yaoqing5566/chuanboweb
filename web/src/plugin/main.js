export default {
    cfg:{
        defAnimation   : "fadeInUp",    // default css animation
        scrollDuration : 800,           // smoothscroll duration
        statsDuration  : 4000,          // stats animation duration
        mailChimpURL   : 'http://facebook.us8.list-manage.com/subscribe/post?u=cdb7b577e41181934ed6a6a44&amp;id=e65110b38d',
        $grid:null
    },
    ssPreloader(){// Preloader

        $("#loader").fadeOut("slow", function(){
            // will fade out the whole DIV that covers the website.
            $("#preloader").delay(300).fadeOut("slow");

        });
    },
    ssMediaElementPlayer(){
        $("audio").mediaelementplayer({
            features: ['playpause','progress', 'tracks','volume']
        });
    },
    ssFitVids(){
        $(".fluid-video-wrapper").fitVids();
    },
    ssPrettyPrint(){
        $('pre').addClass('prettyprint');
        $( document ).ready(function() {
            prettyPrint();
        });
    },
    ssAlertBoxes(){
        $('.alert-box').on('click', '.close', function() {
            $(this).parent().fadeOut(500);
        });
    },
    ssSuperFish(){
        $('ul.sf-menu').superfish({
            animation: { height:'show' }, // slide-down effect without fade-in
            animationOut: { height:'hide'}, // slide-up effect without fade-in
            cssArrows: false, // disable css arrows
            delay: 600 // .6 second delay on mouseout

        });
    },
    ssMobileNav(){
        var toggleButton = $('.menu-toggle'),
            nav = $('.main-navigation');

        toggleButton.on('click', function(event){
            event.preventDefault();

            toggleButton.toggleClass('is-clicked');
            nav.slideToggle();
        });

        if (toggleButton.is(':visible')) nav.addClass('mobile');

        $(window).resize(function() {
            if (toggleButton.is(':visible')) nav.addClass('mobile');
            else nav.removeClass('mobile');
        });

        $('#main-nav-wrap li a').on("click", function() {
            if (nav.hasClass('mobile')) {
                toggleButton.toggleClass('is-clicked');
                nav.fadeOut();
            }
        });
    },
    ssMasonryFolio(){
       let containerBricks = $('.bricks-wrapper');
       let el= {
           itemSelector: '.entry',
           columnWidth: '.grid-sizer',
           percentPosition: true,
           resize: true
       }
       let that=this;
       containerBricks.imagesLoaded( function() {
           console.log(that.cfg.$grid)
           if(that.cfg.$grid){
               containerBricks.masonry('destroy');
           }
           that.cfg.$grid=containerBricks.masonry(el);

       });


    },
    ssBricksAnimate(){
        var animateEl = $('.animate-this');
        setTimeout(function() {
            animateEl.each(function(ctr) {
                var el = $(this);
                setTimeout(function() {
                    el.addClass('animated fadeInUp');
                }, ctr * 200);

            });
        }, 200);

        $(window).on('resize', function() {
            // remove animation classes
            animateEl.removeClass('animate-this animated fadeInUp');
        });
    },
    ssFlexSlider(){
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

                $('.bricks-wrapper').masonry('layout');
            }
        });

    },
    ssSmoothScroll(){
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
    },
    ssBackToTop(){
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
    }


}