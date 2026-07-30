/* eslint-env browser */

/**
 * Feature flags reader (ACT-101)
 *
 * Mirrors the shopfront app's flag consumption (see mba-frontend
 * apps/shopfront/src/context/featureFlags/stores/useWindow.ts). Read priority:
 *
 *   1. window.__flags__ manual overrides (local dev / E2E)
 *   2. window.MBA__FEATURE_FLAGS[name] — injected into <head> by next-proxy and,
 *      once the shared tracking bundle (t.muchbetteradventures.com) has loaded,
 *      wrapped in a Proxy that logs the Eppo exposure on first read of each key.
 *   3. DEFAULT_FLAGS — baseline used locally / when the flag isn't present.
 *
 * We ALWAYS read window.MBA__FEATURE_FLAGS off the global (never a cached copy):
 * the tracking bundle REPLACES that global with a new Proxy object, so a stale
 * reference would neither resolve the assignment nor log the exposure. We never
 * reassign the global ourselves for the same reason.
 *
 * There is no readiness wait (no trackingReady, no polling) — this matches
 * shopfront. Exposure logging is a side-effect of reading the tracking Proxy, so
 * the tracking bundle must be loaded early enough that its Proxy is installed
 * before a consumer reads a flag (see default.hbs).
 */

(function (window) {
    "use strict";

    // Matches next-proxy's FEATURE_FLAGS_GLOBAL_VAR_NAME default and shopfront's
    // NEXT_PUBLIC_FEATURE_FLAGS_WINDOW_VAR_NAME default.
    var WINDOW_VAR_NAME = "MBA__FEATURE_FLAGS";

    // Eppo assignment values (mirrors shopfront constants).
    var CONTROL = "control";
    var TREATMENT = "treatment";

    // Baseline values used when a flag isn't present (local dev, crawlers, or a
    // flag that isn't active in the Eppo environment next-proxy reads). Add a flag
    // here to control its un-flagged fallback, e.g.:
    //   var DEFAULT_FLAGS = { "mag-newsletter-signup": "control" };
    // (applyVariant also falls back to "control" on its own, so an entry is only
    // needed when the default should differ or callers use get()/is() directly.)
    var DEFAULT_FLAGS = {};

    // Manual overrides, checked before the injected flags. Persisted to
    // sessionStorage so a console/E2E override survives the reload needed to
    // re-test (a static theme has no re-render, unlike shopfront's React state).
    var OVERRIDE_STORAGE_KEY = "mba_flag_overrides";

    function readOverrides() {
        try {
            var raw = window.sessionStorage.getItem(OVERRIDE_STORAGE_KEY);
            return raw ? JSON.parse(raw) : {};
        } catch (e) {
            return {};
        }
    }

    function writeOverrides(overrides) {
        try {
            window.sessionStorage.setItem(
                OVERRIDE_STORAGE_KEY,
                JSON.stringify(overrides)
            );
        } catch (e) {
            /* sessionStorage unavailable (private mode) — overrides no-op */
        }
    }

    function getInjectedFlag(name) {
        try {
            var flags = window[WINDOW_VAR_NAME];
            // Reading through the tracking Proxy here is what logs the Eppo
            // exposure. `meta` is not a flag — never surface it.
            if (flags && name !== "meta") {
                return flags[name];
            }
        } catch (e) {
            /* window var missing/unreadable — fall through to defaults */
        }
        return undefined;
    }

    function get(name) {
        var overrides = readOverrides();
        if (Object.prototype.hasOwnProperty.call(overrides, name)) {
            return overrides[name];
        }

        var injected = getInjectedFlag(name);
        if (typeof injected !== "undefined") {
            return injected;
        }

        return DEFAULT_FLAGS[name];
    }

    function is(name, value) {
        return get(name) === value;
    }

    function isEnabled(name) {
        var value = get(name);
        return value === true || value === TREATMENT;
    }

    // Declarative variant swap for server-rendered markup. Within `root`, keeps
    // the element tagged data-ff-variant="<value>" that matches the resolved value
    // of `flagName` and removes the others. Reading the flag here logs the Eppo
    // exposure via the tracking Proxy. If the resolved value matches no block (e.g.
    // the flag isn't live, or an unexpected value), the `fallbackVariant` block
    // (default "control") is kept — so a component never shows every variant nor
    // none. Works for any component: drop data-ff-variant blocks in a template and
    // call this once after the markup is in the DOM.
    function applyVariant(root, flagName, fallbackVariant) {
        if (!root) {
            return;
        }

        var fallback = fallbackVariant || CONTROL;
        var value = get(flagName);
        var target = typeof value === "undefined" ? fallback : String(value);

        var blocks = root.querySelectorAll("[data-ff-variant]");
        var hasMatch = Array.prototype.some.call(blocks, function (block) {
            return block.getAttribute("data-ff-variant") === target;
        });
        if (!hasMatch) {
            target = fallback;
        }

        Array.prototype.forEach.call(blocks, function (block) {
            if (block.getAttribute("data-ff-variant") !== target) {
                block.parentNode.removeChild(block);
            }
        });
    }

    if (!window.Casper) {
        window.Casper = {};
    }

    window.Casper.featureFlags = {
        get: get,
        is: is,
        isEnabled: isEnabled,
        applyVariant: applyVariant
    };

    // Override interface, parity with shopfront's window.__flags__.
    window.__flags__ = {
        setFlag: function setFlag(name, value) {
            var overrides = readOverrides();
            overrides[name] = value;
            writeOverrides(overrides);
        },
        deleteFlag: function deleteFlag(name) {
            var overrides = readOverrides();
            delete overrides[name];
            writeOverrides(overrides);
        },
        reset: function reset() {
            writeOverrides({});
        }
    };
})(window);
