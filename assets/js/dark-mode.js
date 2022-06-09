/* eslint-env browser */
(function (window, document) {
    var key = "glassnode.dark-mode";
    var className = "dark-mode";

    var prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");

    var html = document.querySelector("html");
    var toggler = document.querySelector(".js-toggle-mode");

    if (localStorage.getItem(key) === "true" || prefersDarkMode.matches) {
        html.classList.toggle(className);
    }

    toggler.addEventListener("click", () => {
        localStorage.setItem(key, !html.classList.contains(className));
        html.classList.toggle(className);
    });
})(window, document);
