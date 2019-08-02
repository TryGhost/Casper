$(document).keyup(function(e) {
  if (e.key === "Escape" && location.href.includes("search")) {
    window.history.back();
  }
});

$(function() {
  var toggleMenu = function toggleMenu() {
    $(".hamburger-menu-icon .menu-icon").toggle();
    $(".hamburger-menu-icon .close-icon").toggle();
    $("header nav").toggleClass("nav-active");
  };

  $(".hamburger-menu-icon").on("click", toggleMenu);

  // Remove stickiness of header when there is floating present in the DOM
  var floatingHeader = $(".floating-header");
  console.log("floating header", floatingHeader);
  if (floatingHeader.length > 0) {
    $(".site-header").css("position", "relative");
  }
});
