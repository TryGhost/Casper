(function (window, document) {
    function handleDocumentReady() {
        let checkedMenuOpen;
        let checkedMenuOpenScroll;
        let initialWindowWidth = window.innerWidth;
        const menuOpenInputs = document.querySelectorAll(".menu-open");
        if (menuOpenInputs) {
            const handleInputChange = (evt) => {
                if (evt.target && evt.target.checked) {
                    checkedMenuOpen = evt.target;
                    checkedMenuOpenScroll = window.scrollY;
                } else {
                    checkedMenuOpen = undefined;
                    checkedMenuOpenScroll = 0;
                }
            };
            Array.from(menuOpenInputs).forEach((input) => {
                input.addEventListener("change", handleInputChange);
            });
        }
        var lastScrollY = window.scrollY;
        var lastWindowWidth = window.innerWidth;
        var ticking = false;

        function onScroll() {
            lastScrollY = window.scrollY;
            requestTick();
        }

        function onResize() {
            lastWindowWidth = window.innerWidth;
            if (initialWindowWidth !== lastWindowWidth) {
                initialWindowWidth = lastWindowWidth;
                requestTick();
            }
        }

        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(update);
            }
            ticking = true;
        }

        function update() {
            if (
                checkedMenuOpen &&
                (Math.abs(lastScrollY - checkedMenuOpenScroll) > 300 ||
                    lastWindowWidth > 1170)
            ) {
                checkedMenuOpen.checked = false;
            }

            ticking = false;
        }

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize, false);

        update();
    }

    document.addEventListener("readystatechange", handleDocumentReady);
})(window, document);
