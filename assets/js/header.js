var lastScrollTop = 0;
function swapHeader() {
    var st = window.scrollY || window.pageYOffset;
    var add = st < lastScrollTop;
    var header = document.getElementsByClassName("header")[0];
    if (st > 10) {
        requestAnimationFrame(function() {
            if (add) {
                header.classList.add("mobileshow");
            } else {
                header.classList.remove("mobileshow");
            }
        });
        requestAnimationFrame(function() {
            header.classList.add("scrolldown");
        });
    } else {
        requestAnimationFrame(function() {
            header.classList.remove("scrolldown", "mobileshow");
        });
    }
    lastScrollTop = st;
}

(function() {
    $("#header__menu-button").click(function() {
        var $body = $("body");
        $(this).toggleClass("open");
        $body.toggleClass("mobile-menu-open");
        $("#header__menu").toggleClass("active");
        $(".site-nav").toggleClass("inactive");
        $(".site-main").toggleClass("inactive");
        if ($body.hasClass("mobile-menu-open") && window.matchMedia("(max-width: 800px)").matches) {
            $body.bind("touchmove", function(e) {e.preventDefault();});
        } else {
            $body.unbind("touchmove");
        }
    });
    $("#copyright-year").text(new Date().getFullYear());
})();

swapHeader();

window.addEventListener("scroll", swapHeader);
document.addEventListener("touchmove", swapHeader);
