/**
 * Placeholder JS file for Casper behaviours
 */

/*globals jQuery, document */
(function ($) {
    "use strict";

    $(document).ready(function(){

        sizeContent();
        $(window).resize(sizeContent);

        function sizeContent() {
            var newHeight = $(window).height() - 30;
            $("#sitehead").css("height", newHeight);
        }

    });

}(jQuery));