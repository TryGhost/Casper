(function (window, document) {
    const MOBILE_MENU_ACTIVE_CLASS = "mobile-menu--open";
    const MOBILE_MENU_WRAPPER = ".mobile-menu-overlay";
    const MOBILE_MENU_CLOSE = ".mobile-menu-button--close";
    const MOBILE_MENU_OPEN = ".mobile-menu-button--open";
    const MOBILE_MENU_CLOSE_AREA = '.mobile-menu-close-overlay'

    let mobileMenuOpenScroll;

    function mobileMenuClose(mobileMenu) {
        mobileMenu.classList.remove(MOBILE_MENU_ACTIVE_CLASS);
    }
    function mobileMenuOpen(mobileMenu) {
        mobileMenu.classList.add(MOBILE_MENU_ACTIVE_CLASS);
    }
    function isMobileMenuOpen(mobileMenu) {
        return mobileMenu.classList.contains(MOBILE_MENU_ACTIVE_CLASS);
    }
    function setMobileMenuOpenScroll() {
        mobileMenuOpenScroll = window.scrollY;
    }

    function initMobileMenuListeners() {
        function initMobileMenuButtons() {
            const mobileMenuOpenButtons = document.querySelectorAll(
                MOBILE_MENU_OPEN
            );
            const mobileMenuCloseButtons = document.querySelectorAll(
                MOBILE_MENU_CLOSE
            );
            const mobileMenuCloseArea = document.querySelector(MOBILE_MENU_CLOSE_AREA);

            const mobileMenuWrapper = document.querySelector(
                MOBILE_MENU_WRAPPER
            );

            if (!mobileMenuOpenButtons || !mobileMenuCloseButtons || !mobileMenuCloseArea || !mobileMenuWrapper) {
                return;
            }

            const handleMobileMenuCloseAreaClick = (evt) => {
                evt.preventDefault();
                evt.stopPropagation();
                if (!isMobileMenuOpen(mobileMenuWrapper)) {
                    return;
                }
                mobileMenuClose(mobileMenuWrapper);
            }

            const handleMobileMenuCloseClick = () => {
                if (!isMobileMenuOpen(mobileMenuWrapper)) {
                    return;
                }
                mobileMenuClose(mobileMenuWrapper);
            };

            const handleMobileMenuOpenClick = () => {
                if (isMobileMenuOpen(mobileMenuWrapper)) {
                    return;
                }
                mobileMenuOpen(mobileMenuWrapper);
                setMobileMenuOpenScroll();
            };

            mobileMenuCloseButtons.forEach((button) => {
                button.addEventListener("click", handleMobileMenuCloseClick);
            });

            mobileMenuOpenButtons.forEach((button) => {
                button.addEventListener("click", handleMobileMenuOpenClick);
            });

            mobileMenuCloseArea.addEventListener('click', handleMobileMenuCloseAreaClick)
        }

        function initHideMenuOnScroll() {
            const mobileMenuWrapper = document.querySelector(
                MOBILE_MENU_WRAPPER
            );

            let initialWindowWidth = window.innerWidth;
            let lastWindowWidth;
            let lastScrollY = window.scrollY;
            let ticking = false;

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
                    isMobileMenuOpen(mobileMenuWrapper) && mobileMenuOpenScroll !== undefined &&
                    (Math.abs(lastScrollY - mobileMenuOpenScroll) > 300 ||
                        lastWindowWidth > 1170)
                ) {
                    mobileMenuClose(mobileMenuWrapper);
                }

                ticking = false;
            }

            window.addEventListener("scroll", onScroll, { passive: true });
            window.addEventListener("resize", onResize, false);

            update();
        }
        initMobileMenuButtons();
        initHideMenuOnScroll();
    }

    function handleDocumentReady(evt) {
        if (evt && evt.target && evt.target.readyState === "interactive") {
            initMobileMenuListeners();
        }
    }

    document.addEventListener("readystatechange", handleDocumentReady);
})(window, document);
