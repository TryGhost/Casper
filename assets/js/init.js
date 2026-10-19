/* Mobile menu burger toggle */
(function () {
    const navigation = document.body;
    const burger = navigation.querySelector('.gh-burger');
    if (!burger) return;

    burger.setAttribute('aria-expanded', 'false');

    const mobile = window.matchMedia('(max-width: 767px)');
    const root = document.documentElement;
    let scrollPosition = 0;

    function closeMenu() {
        if (!navigation.classList.contains('gh-head-open')) return;

        navigation.classList.remove('gh-head-open');
        burger.setAttribute('aria-expanded', 'false');
        root.classList.remove('gh-navigation-open');
        root.style.removeProperty('--gh-navigation-scroll-top');
        window.scrollTo({top: scrollPosition, behavior: 'instant'});
    }

    burger.addEventListener('click', function () {
        if (!navigation.classList.contains('gh-head-open')) {
            if (!mobile.matches) return;

            scrollPosition = window.scrollY;
            root.style.setProperty('--gh-navigation-scroll-top', `${-scrollPosition}px`);
            root.classList.add('gh-navigation-open');
            navigation.classList.add('gh-head-open');
            burger.setAttribute('aria-expanded', 'true');
        } else {
            closeMenu();
        }
    });

    mobile.addEventListener('change', function () {
        if (!mobile.matches) closeMenu();
    });
})();
