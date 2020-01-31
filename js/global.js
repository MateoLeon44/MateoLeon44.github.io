(function ($) {
    "use strict";

    // Global variables
    var html_body = $('html, body');

    // init Isotope
    var grid_isotope = $('.isotope').each(function () {
        $(this).isotope({
            itemSelector: '.isotope-item',
            percentPosition: true,
            animationEngine : 'best-available',
            masonry: {
                columnWidth: '.isotope-item'
            }
        });
    });
    var filter = $('.filter-bar');
    filter.on( 'click', 'li', function() {
        var filterValue = $(this).attr('data-filter');
        grid_isotope.isotope({ filter: filterValue });
    });
    filter.on('click', 'li', function () {
        filter.find('.active').removeClass('active');
        $(this).addClass('active');
    });
    $(window).on('load', function () {
        grid_isotope.isotope();
    });


    // Header
    var header_pri_fix = $('.header-primary');
    var header_mob_fix = $('.header-mobile, .header.header-push');
    var header_fix = $('.header-fixed');

    $(window).on('load', function () {
        header_pri_fix.after(function () {
            return "<div class='holder-d' style='height:" + $(this).height() + "px;'></div>";
        });
        header_mob_fix.after(function () {
            return "<div class='holder-m' style='height:" + $(this).height() + "px;'></div>";
        });

        $(this).on('resize', function () {
            $('.holder-d').css('height', header_pri_fix.height());
            $('.holder-m').css('height', header_mob_fix.height());
        });
    });


    // Navbar
    // Navbar vertial and Navbar mobile
    var handler_slidebar = $('.handler-slidebar');
    var sliderbar = $('.header-slidebar');

    function toggleSlideBar() {
        if (sliderbar.hasClass('closed'))
            sliderbar.addClass('opened').removeClass('closed');
        else
            sliderbar.addClass('closed').removeClass('opened');
    }


    handler_slidebar.on('click', function () {
        toggleSlideBar();
    });

    $(window).on('click', function (e) {
        if (!$(e.target).closest(sliderbar).length && !$(event.target).closest(handler_slidebar).length) {
            sliderbar.addClass('closed').removeClass('opened');
        }
    });

    $('.navbar-vertical .has-drop .nav-link').on('click', function (e) {
        $(this).siblings('.drop-menu').slideToggle(200, 'linear');
        $(this).toggleClass('active');
        e.preventDefault();
    });

    // Bind to scroll
    $(window).on('load', function () {
        var topMenu = $('.header-one-page'),
            menuItems = topMenu.find(".nav-link[href^='#']"),
            scrollItems = menuItems.map(function() {
                var item = $($(this).attr("href"));
                if (item.length) { return item; }
            });

        menuItems.on("click", function (e) {
            html_body.animate({scrollTop: $($(this).attr("href")).offset().top - header_fix.outerHeight()}, 800).queue(function () {
                sliderbar.addClass('closed').removeClass('opened');
                $(this).dequeue();
            });
        });

        $(this).on('scroll', function(){
            var fromTop = $(this).scrollTop() + topMenu.outerHeight() + 250;
            var cur = scrollItems.map(function(){
                if ($(this).offset().top < fromTop)
                    return this;
            });
            cur = cur[cur.length-1];
            var id = cur && cur.length ? cur[0].id : "";
            menuItems
                .parent().removeClass("active")
                .end().filter("[href='#"+id+"']").parent().addClass("active");
        });
    });



    // Back To Top
    var offset = 450;
    var duration = 500;
    var upToTop = $("#up-to-top");
    upToTop.hide();
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > offset) {
            upToTop.fadeIn(duration);
        } else {
            upToTop.fadeOut(duration);
        }
    });

    upToTop.on('click', function (event) {
        event.preventDefault();
        $('html, body').animate({scrollTop: 0}, duration);
        return false;
    });




    // Config Animsition
    $(".animsition").animsition({
        inClass: 'fade-in',
        outClass: 'fade-out',
        inDuration: 500,
        outDuration: 500,
        linkElement: 'a:not([target="_blank"]):not([href^="#"]):not([class^="chosen-single"])',
        loading: true,
        loadingParentElement: 'html',
        loadingClass: 'loader-wrapper',
        loadingInner: '<div class="loader"></div>',
        timeout: false,
        timeoutCountdown: 5000,
        onLoadEvent: true,
        browser: [ 'animation-duration', '-webkit-animation-duration'],
        overlay : false,
        overlayClass : 'animsition-overlay-slide',
        overlayParentElement : 'html',
        transition: function(url){ window.location.href = url; }
    });

   


})(jQuery);
