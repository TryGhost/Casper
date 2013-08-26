/**
 * Main JS file for Casper behaviours
 */

/*globals jQuery, document */
(function ($) {
    "use strict";

    $(document).ready(function(){

        // On the home page, move the blog icon inside the header 
        // for better relative/absolute positioning.
        
        $("#blog-icon").prependTo("#site-head");

    });

}(jQuery));