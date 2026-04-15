// Initialize mobile menu
(function() {
    // Mobile Menu Trigger
    var burger = document.querySelector('.gh-burger');
    if (burger) {
        burger.addEventListener('click', function() {
            document.body.classList.toggle('gh-head-open');
        });
    }
})();
