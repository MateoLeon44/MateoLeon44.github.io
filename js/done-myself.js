//Function created by myself to apply a width depending on its value to the progress bar in skills
(function ($) {
    "use strict";

    $(".bar").each(function () {
        $(this).find(".bar-inner").animate({
            width: $(this).attr("data-width")
        }, 2000);
    });

})(jQuery);