/* eslint-env browser */

/**
 * Floating header
 * Used on invividual post pages, displays a sticky header with progress indicator
 *
 * This JS is automatically applied for any template where you use the
 * {{> floating-header}} partial
 */

(function (window, document) {
    // set up Casper as a global object
    if (!window.Casper) {
        window.Casper = {};
    }

    window.Casper.floatingHeader = function floatingHeader() {
        // NOTE: Scroll performance is poor in Safari
        // - this appears to be due to the events firing much more slowly in Safari.
        //   Dropping the scroll event and using only a raf loop results in smoother
        //   scrolling but continuous processing even when not scrolling

        var progressBar = document.querySelector('#reading-progress');
        var header = document.querySelector('.floating-header');
        var title = document.querySelector('.post-full-title');

        var lastScrollY = window.scrollY;
        var lastWindowHeight = window.innerHeight;
        var lastDocumentHeight = document.body.clientHeight;
        var ticking = false;

        function onScroll() {
            lastScrollY = window.scrollY;
            requestTick();
        }

        function onResize() {
            lastWindowHeight = window.innerHeight;
            lastDocumentHeight = document.body.clientHeight;
            requestTick();
        }

        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(update);
            }
            ticking = true;
        }

        function update() {
            var trigger = title.getBoundingClientRect().top + window.scrollY;
            var triggerOffset = title.offsetHeight + 35;
            var progressMax = lastDocumentHeight - lastWindowHeight;

            // show/hide floating header
            if (lastScrollY >= trigger + triggerOffset) {
                header.classList.add('floating-active');
            } else {
                header.classList.remove('floating-active');
            }

            progressBar.setAttribute('max', progressMax);
            progressBar.setAttribute('value', lastScrollY);

            ticking = false;
        }

        window.addEventListener('scroll', onScroll, {passive: true});
        window.addEventListener('resize', onResize, false);

        update();
    };
})(window, document);
