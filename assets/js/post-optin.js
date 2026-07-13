/* eslint-env browser */
/* global jQuery */

/**
 * Email opt-in prompt + modal (ACT-86)
 *
 * On mag article pages, clones the hidden #optin-prompt-tpl into the top third
 * of the article body. Clicking "I'm in" opens the sign-up modal, which submits
 * to the existing Mailchimp list via JSONP and shows inline success/error.
 *
 * Once a visitor has signed up we remember it in localStorage and stop showing
 * the prompt. Segment events (window.analytics) are fired when available and
 * no-op locally where the site-wide tracking bundle is not loaded.
 */

(function (window, document) {
    "use strict";

    var STORAGE_KEY = "mba_optin_signed_up";
    var MAILCHIMP_URL =
        "https://muchbetteradventures.us2.list-manage.com/subscribe/post-json?u=8ef039ed02db26fcd1c723274&id=a887ab1707&c=?";
    var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function track(event, props) {
        if (window.analytics && typeof window.analytics.track === "function") {
            window.analytics.track(event, props || {});
        }
    }

    function hasSignedUp() {
        try {
            return window.localStorage.getItem(STORAGE_KEY) === "true";
        } catch (e) {
            return false;
        }
    }

    function rememberSignedUp() {
        try {
            window.localStorage.setItem(STORAGE_KEY, "true");
        } catch (e) {
            /* localStorage unavailable — nothing we can do, fail silently */
        }
    }

    function directParagraphs(el) {
        return Array.prototype.filter.call(el.children, function (node) {
            return node.tagName === "P";
        });
    }

    // Insert the prompt roughly one third of the way down the article body.
    function injectPrompt(content, prompt) {
        var paragraphs = directParagraphs(content);

        if (paragraphs.length >= 4) {
            var index = Math.min(
                Math.max(2, Math.floor(paragraphs.length / 3)),
                paragraphs.length - 1
            );
            content.insertBefore(prompt, paragraphs[index]);
        } else if (paragraphs.length) {
            // Too few paragraphs to hit a "third" — drop it after the first one.
            paragraphs[0].parentNode.insertBefore(prompt, paragraphs[0].nextSibling);
        } else {
            content.appendChild(prompt);
        }
    }

    function trackPromptView(prompt) {
        if (!("IntersectionObserver" in window)) {
            track("Email Opt-In Prompt Viewed");
            return;
        }

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        track("Email Opt-In Prompt Viewed");
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.5 }
        );

        observer.observe(prompt);
    }

    function createModal(modal) {
        var form = modal.querySelector(".optin-modal__form");
        var email = modal.querySelector(".optin-modal__email");
        var consent = modal.querySelector(".optin-modal__consent-checkbox");

        function onKeydown(e) {
            if (e.key === "Escape" || e.keyCode === 27) {
                close();
            }
        }

        function open() {
            modal.classList.add("is-open");
            modal.setAttribute("aria-hidden", "false");
            document.addEventListener("keydown", onKeydown);
            if (email) {
                email.focus();
            }
        }

        function close() {
            modal.classList.remove("is-open");
            modal.setAttribute("aria-hidden", "true");
            document.removeEventListener("keydown", onKeydown);
        }

        Array.prototype.forEach.call(
            modal.querySelectorAll("[data-optin-close]"),
            function (el) {
                el.addEventListener("click", close);
            }
        );

        form.addEventListener("submit", function (e) {
            e.preventDefault();
            form.classList.remove("is-error", "is-success");

            var value = (email.value || "").trim();
            if (!EMAIL_RE.test(value) || !consent.checked) {
                form.classList.add("is-error");
                return;
            }

            form.classList.add("is-loading");

            jQuery
                .ajax({
                    url: MAILCHIMP_URL,
                    data: { EMAIL: value, "gdpr[13]": "Y" },
                    dataType: "jsonp",
                    cache: false,
                    timeout: 10000
                })
                .always(function (resp) {
                    form.classList.remove("is-loading");
                    var ok = !!(resp && resp.result === "success");

                    if (ok) {
                        form.classList.add("is-success");
                        rememberSignedUp();
                    } else {
                        form.classList.add("is-error");
                        var msgEl = form.querySelector(".message-error");
                        if (resp && resp.msg && msgEl) {
                            // Mailchimp prefixes messages e.g. "0 - Already subscribed"
                            msgEl.innerHTML = String(resp.msg).replace(/^\d+\s*-\s*/, "");
                        }
                    }

                    track("Email Opt-In Submitted", { success: ok });
                });
        });

        return { open: open, close: close };
    }

    function init() {
        if (hasSignedUp()) {
            return;
        }

        var content = document.querySelector(".post-full-content .post-content");
        var template = document.getElementById("optin-prompt-tpl");
        var modalEl = document.getElementById("optin-modal");

        if (!content || !template || !modalEl || !window.jQuery) {
            return;
        }

        var prompt = template.content.cloneNode(true).querySelector(".optin-prompt");
        if (!prompt) {
            return;
        }

        injectPrompt(content, prompt);

        var modal = createModal(modalEl);
        var cta = prompt.querySelector(".optin-prompt__cta");
        if (cta) {
            cta.addEventListener("click", function () {
                track("Email Opt-In Clicked");
                modal.open();
            });
        }

        trackPromptView(prompt);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})(window, document);
