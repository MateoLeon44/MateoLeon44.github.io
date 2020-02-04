//Jquery
(function ($) {
  //Strict mode
  "use strict";
  // Global variables
  let html_body = $("html, body");

  //Jquery plugin for the fiter in the portfolio section
  // init Isotope
  let grid_isotope = $(".isotope").each(function () {
    $(this).isotope({
      itemSelector: ".isotope-item",
      percentPosition: true,
      animationEngine: "best-available",
      masonry: {
        columnWidth: ".isotope-item"
      }
    });
  });
  let filter = $(".filter-bar");
  filter.on("click", "li", function () {
    let filterValue = $(this).attr("data-filter");
    grid_isotope.isotope({
      filter: filterValue
    });
  });
  filter.on("click", "li", function () {
    filter.find(".active").removeClass("active");
    $(this).addClass("active");
  });
  $(window).on("load", function () {
    grid_isotope.isotope();
  });


  let header_fix = $(".header-fixed");
  // Navbar
  // Navbar vertial and Navbar mobile
  let sliderbar = $(".header-slidebar");



  /* Binds active item scrolling depending on the section you are on
   */
  $(window).on("load", function () {
    let topMenu = $(".header-one-page"),
      menuItems = topMenu.find(".nav-link[href^='#']"),
      scrollItems = menuItems.map(function () {
        let item = $($(this).attr("href"));
        if (item.length) {
          return item;
        }
      });

    menuItems.on("click", function () {
      html_body.animate({
        scrollTop: $($(this).attr("href")).offset().top - header_fix.outerHeight()
      }, 800).queue(function () {
        sliderbar.addClass("closed").removeClass("opened");
        $(this).dequeue();
      });
    });

    $(this).on("scroll", function () {
      let fromTop = $(this).scrollTop() + topMenu.outerHeight() + 250;
      let cur = scrollItems.map(function () {
        if ($(this).offset().top < fromTop)
          return this;
      });
      cur = cur[cur.length - 1];
      let id = cur && cur.length ? cur[0].id : "";
      menuItems
        .parent().removeClass("active")
        .end().filter("[href='#" + id + "']").parent().addClass("active");
    });
  });



  /*
  Function for going back to the about me section
  */
  let offset = 450;
  let duration = 500;
  let upToTop = $("#up-to-top");
  upToTop.hide();
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > offset) {
      upToTop.fadeIn(duration);
    } else {
      upToTop.fadeOut(duration);
    }
  });

  upToTop.on("click", function (event) {
    event.preventDefault();
    $("html, body").animate({
      scrollTop: 0
    }, duration);
    return false;
  });


  /*
  Jquery plugin for the animation when you enter the page, if its slow, then you are going to see a loading component
  */
  $(".animsition").animsition({
    inClass: "fade-in",
    outClass: "fade-out",
    inDuration: 500,
    outDuration: 500,
    linkElement: "a:not([target='_blank']):not([href^='#']):not([class^='chosen-single'])",
    loading: true,
    loadingParentElement: "html",
    loadingClass: "loader-wrapper",
    loadingInner: "<div class='loader'></div>",
    timeout: false,
    timeoutCountdown: 5000,
    onLoadEvent: true,
    browser: ["animation-duration", "-webkit-animation-duration"],
    overlay: false,
    overlayClass: "animsition-overlay-slide",
    overlayParentElement: "html",
    transition: function (url) {
      window.location.href = url;
    }
  });
})(jQuery);