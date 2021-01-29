(function (window, document) {
    try {
        const buttonGoTop = document.querySelector(".button-go-top");
        const posts = document.querySelector(".posts");
        const singlePost = document.querySelector(".single-post");

        if ((!posts && !singlePost) || !buttonGoTop) {
            return;
        }

        let lastScrollY = window.scrollY;
        let lastWindowHeight = window.innerHeight;
        let lastDocumentHeight = $(document).height();
        let ticking = false;

        scrollToY = function scrollToY(targetY, speedMS, easingFunction) {
            let scrollY = window.scrollY || document.documentElement.scrollTop,
                scrollTargetY = targetY || 0,
                speed = speedMS || 2000,
                easing = easingFunction || "easeOutSine",
                currentTime = 0;

            const time = Math.max(
                0.1,
                Math.min(Math.abs(scrollY - scrollTargetY) / speed, 0.8)
            );

            var easingEquations = {
                easeOutSine: function (pos) {
                    return Math.sin(pos * (Math.PI / 2));
                },
                easeInOutSine: function (pos) {
                    return -0.5 * (Math.cos(Math.PI * pos) - 1);
                },
                easeInOutQuint: function (pos) {
                    if ((pos /= 0.5) < 1) {
                        return 0.5 * Math.pow(pos, 5);
                    }
                    return 0.5 * (Math.pow(pos - 2, 5) + 2);
                },
            };

            function tick() {
                currentTime += 1 / 60;
                var p = currentTime / time;
                var t = easingEquations[easing](p);

                if (p < 1) {
                    requestAnimationFrame(tick);
                    window.scrollTo(0, scrollY + (scrollTargetY - scrollY) * t);
                } else {
                    window.scrollTo(0, scrollTargetY);
                }
            }

            tick();
        };

        function handleClickListnerInit() {
            buttonGoTop.addEventListener("click", () =>
                scrollToY(0, 1500, "easeInOutQuint")
            );
        }

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
            let trigger =
                triggerEl.getBoundingClientRect().top + window.scrollY;

            // show/hide nav goTopButton
            if (lastScrollY >= trigger) {
                buttonGoTop.classList.remove("hidden");
            } else {
                buttonGoTop.classList.add("hidden");
            }

            ticking = false;
        }

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize, false);

        update();
        handleClickListnerInit();
    } catch (error) {
        console.warn(error);
    }
})(window, document);
