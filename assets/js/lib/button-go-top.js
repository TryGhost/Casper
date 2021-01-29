(function(window, document) {
    const buttonGoTop = document.querySelector('.button-go-top');
    const posts = document.querySelector('.posts');
    const singlePost = document.querySelector('.single-post');

    if (!posts && !singlePost || !buttonGoTop) {
        return;
    }

    let lastScrollY = window.scrollY;
    let lastWindowHeight = window.innerHeight;
    let lastDocumentHeight = $(document).height();
    let ticking = false;

    function onScroll() {
        lastScrollY = window.scrollY;
        requestTick();
    }

    function onResize() {
        lastWindowHeight = window.innerHeight;
        lastDocumentHeight = $(document).height();
        requestTick();
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(update);
        }
        ticking = true;
    }

    function update() {
        let triggerEl = !posts ? singlePost : posts;
        let trigger = triggerEl.getBoundingClientRect().top + window.scrollY;

        // show/hide nav goTopButton
        if (lastScrollY >= trigger) {
            buttonGoTop.classList.remove('hidden');
        } else {
            buttonGoTop.classList.add('hidden');
        }

        ticking = false;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, false);

    update();


})(window, document)
