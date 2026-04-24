// Initialize mobile menu
(function() {
    // Mobile Menu Trigger
    var burger = document.querySelector('.gh-burger');
    if (burger) {
        burger.setAttribute('aria-expanded', 'false');
        burger.addEventListener('click', function() {
            var isOpen = document.body.classList.toggle('gh-head-open');
            burger.setAttribute('aria-expanded', String(isOpen));
        });
    }
})();
