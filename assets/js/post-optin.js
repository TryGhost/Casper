/* eslint-env browser */

/**
 * Email opt-in prompt + modal (ACT-86)
 *
 * On mag article pages, clones the hidden #optin-prompt-tpl into the top third
 * of the article body. Clicking "I'm in" opens the sign-up modal, which submits
 * to HubSpot's Forms API (mirroring the shopfront homepage newsletter signup)
 * and shows inline success/error.
 *
 * Once a visitor has signed up we remember it in localStorage and stop showing
 * the prompt. Segment events (window.analytics) are fired when available and
 * no-op locally where the site-wide tracking bundle is not loaded.
 */

(function (window, document) {
    "use strict";

    var STORAGE_KEY = "mba_optin_signed_up";

    // HubSpot newsletter form config. These values are public (visible in HubSpot form embeds).
    var HUBSPOT_PORTAL_ID = 24999114;
    var HUBSPOT_FORM_GUID = "fffa7192-9995-4a66-9b69-5db898ac83f1";
    var HUBSPOT_SUBSCRIPTION_TYPE_IDS = [360468751,119125723];
    // Must match the consent checkbox copy in partials/post-optin-modal.hbs
    var CONSENT_TEXT =
        "Yes, send me the Much Better Adventures newsletter with trip inspiration, advice, and offers.";

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

    // The hubspotutk cookie is set by HubSpot's tracking script when present on
    // the site. It ties the submission to a known visitor; optional, like the
    // shopfront signup.
    function readCookie(name) {
        var match = document.cookie.match(
            new RegExp("(?:^|; )" + name + "=([^;]*)")
        );
        return match ? decodeURIComponent(match[1]) : undefined;
    }

    // HubSpot's legitimateInterest consent accepts a single subscriptionTypeId
    // per submission, so we build one payload per configured type and submit
    // them all in parallel (see the form submit handler).
    function buildHubSpotPayloads(email) {
        var context = { pageUri: window.location.href };
        var hutk = readCookie("hubspotutk");
        if (hutk) {
            context.hutk = hutk;
        }

        var submittedAt = Date.now();

        return HUBSPOT_SUBSCRIPTION_TYPE_IDS.map(function (subscriptionTypeId) {
            return {
                submittedAt: submittedAt,
                fields: [{ objectTypeId: "0-1", name: "email", value: email }],
                context: context,
                legalConsentOptions: {
                    legitimateInterest: {
                        value: true,
                        subscriptionTypeId: subscriptionTypeId,
                        legalBasis: "CUSTOMER",
                        text: CONSENT_TEXT
                    }
                }
            };
        });
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
                close("escape");
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

        function close(method) {
            // Guard against firing a dismissal when the modal isn't actually
            // open (e.g. a stray close handler) — only a real close counts.
            if (!modal.classList.contains("is-open")) {
                return;
            }
            modal.classList.remove("is-open");
            modal.setAttribute("aria-hidden", "true");
            document.removeEventListener("keydown", onKeydown);
            track("Email Opt-In Dismissed", {
                method: typeof method === "string" ? method : "button",
                signedUp: form.classList.contains("is-success")
            });
        }

        Array.prototype.forEach.call(
            modal.querySelectorAll("[data-optin-close]"),
            function (el) {
                el.addEventListener("click", function () {
                    close("button");
                });
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

            function showError(message) {
                form.classList.add("is-error");
                var msgEl = form.querySelector(".message-error");
                if (message && msgEl) {
                    msgEl.textContent = message;
                }
            }

            var payloads = buildHubSpotPayloads(value);
            // No subscription types configured — a misconfiguration. Surface an
            // error rather than a false success (Promise.all([]) resolves).
            if (!payloads.length) {
                console.error("No subscription types configured — a misconfiguration.", payloads);
                form.classList.remove("is-loading");
                showError("Something went wrong. Please try again.");
                track("Email Opt-In Submitted", { success: false });
                return;
            }

            var url =
                "https://api.hsforms.com/submissions/v3/integration/submit/" +
                HUBSPOT_PORTAL_ID +
                "/" +
                HUBSPOT_FORM_GUID;

            Promise.all(
                payloads.map(function (payload) {
                    return fetch(url, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload)
                    }).then(function (res) {
                        if (res.ok) {
                            return;
                        }
                        // Non-OK — inspect the error body for an invalid-email
                        // rejection so we can surface a friendly message.
                        return res
                            .json()
                            .catch(function () {
                                return {};
                            })
                            .then(function (body) {
                                var firstError =
                                    body && body.errors && body.errors[0];
                                var errorType = firstError && firstError.errorType;
                                var msg =
                                    (firstError && firstError.message) ||
                                    (body && body.message) ||
                                    "";
                                if (
                                    errorType === "INVALID_EMAIL" ||
                                    /invalid email/i.test(msg)
                                ) {
                                    var invalid = new Error(
                                        "Please enter a valid email address."
                                    );
                                    invalid.invalidEmail = true;
                                    throw invalid;
                                }
                                throw new Error(msg || "Failed to submit to HubSpot");
                            });
                    });
                })
            )
                .then(function () {
                    form.classList.remove("is-loading");
                    form.classList.add("is-success");
                    rememberSignedUp();
                    track("Email Opt-In Submitted", { success: true });
                })
                .catch(function (err) {
                    form.classList.remove("is-loading");
                    showError(
                        err && err.invalidEmail
                            ? err.message
                            : "Something went wrong. Please try again."
                    );
                    track("Email Opt-In Submitted", { success: false });
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

        if (!content || !template || !modalEl) {
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
