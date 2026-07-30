# Feature flags in the magazine

The magazine consumes the same feature-flag pipeline as the rest of MBA (shopfront,
Seekr, etc.), so flag ids, values (`control` / `treatment`), overrides and Eppo
exposure logging behave identically across properties.

Because Ghost renders Handlebars **server-side before flags exist** and Ghost themes
can't register custom helpers, **all flag gating in this theme is client-side JavaScript.**

## How it works

```
next-proxy (Cloudflare Worker)
  └─ injects  <script>var MBA__FEATURE_FLAGS = { "<flag>": "<value>", …, meta: { providedBy, eppoConfig } }</script>
     as the last child of <head> on every magazine HTML response

tracking bundle (t.muchbetteradventures.com, already loaded site-wide via Ghost)
  └─ re-initialises Eppo and REPLACES window.MBA__FEATURE_FLAGS with a Proxy.
     Reading a flag through that Proxy returns the variant AND logs the Eppo
     exposure (a buffered analytics.track("Eppo Assignment"), flushed on consent).

theme reader (assets/js/feature-flags.js → window.Casper.featureFlags)
  └─ read order:  window.__flags__ override  →  window.MBA__FEATURE_FLAGS[flag]  →  DEFAULT_FLAGS
```

The tracking bundle is already present on the magazine (loaded via Ghost, not by this
theme), so the exposure Proxy is installed for us. The reader mirrors shopfront's
`useWindow`: there is intentionally **no readiness wait** (no `trackingReady`, no
polling) — exposure logging is just a side-effect of reading the tracking Proxy.

> **Note on timing.** Unlike shopfront (React re-renders → repeated reads), the theme
> reads each flag **once**, at the point it acts on it. The synchronous tracking bundle
> runs before `DOMContentLoaded`, so by the time a script reads a flag (e.g. on
> `DOMContentLoaded`) the Proxy is already installed and the exposure logs. (If a flag
> were ever read before the bundle initialised, the value would still be correct — read
> from the raw injected object — but no exposure would log for that page view.)

## Reading a flag

The reader is exposed as `window.Casper.featureFlags`:

```js
Casper.featureFlags.get("my-flag");                 // raw value: string | boolean | number | undefined
Casper.featureFlags.isEnabled("my-flag");           // true when value is `true` or "treatment"
Casper.featureFlags.is("my-flag", "variant-b");     // strict equality (multi-variant experiments)

// Declarative variant swap for server-rendered markup: keep the [data-ff-variant]
// block matching the resolved value, remove the others (see "A/B testing" below).
Casper.featureFlags.applyVariant(rootEl, "my-flag");
```

Always read through `Casper.featureFlags` (never cache `window.MBA__FEATURE_FLAGS`):
the tracking bundle swaps that global for a new Proxy object, and a stale reference
would neither resolve the assignment nor log the exposure.

## Adding a new flag

1. **Register it in Eppo** and make it **active in the environment next-proxy reads**,
   or the injected payload won't carry it and every visitor falls back to the default.
2. **Add a default** in `DEFAULT_FLAGS` in [`assets/js/feature-flags.js`](assets/js/feature-flags.js)
   — used locally, for crawlers, and before the flag goes live. Keep the default the
   safe/baseline value (usually `"control"`).
3. **Gate on it** in a theme script via `Casper.featureFlags.isEnabled(...)` /
   `is(...)`. Do the read at the point you act on it (e.g. when injecting a component).

## A/B testing template markup

Because gating is client-side, render variants **client-side** using the `applyVariant`
helper. No component currently uses it — this is the intended pattern for when one does.

1. In the component's markup, add both variants as siblings tagged with `data-ff-variant`:

   ```hbs
   <div data-ff-variant="control">…control copy…</div>
   <div data-ff-variant="treatment">…treatment copy…</div>
   ```

   **Always include a `data-ff-variant="control"` block** — it's the baseline shown when
   no flag / local dev / crawler, and the fallback `applyVariant` keeps if the resolved
   value matches no block. Without a `control` block, a non-matching resolve would remove
   everything. The `data-ff-variant` attribute is the single hook for both JS selection and
   any styling — no separate class — so all flag scaffolding shares the greppable
   `data-ff-` prefix and is easy to strip when the experiment ends. Style the wrapper per
   the component's layout (there is no shared CSS for it — e.g. use `display: contents` if
   the wrapper's box would disrupt a flex/grid parent).

2. After the markup is in the DOM, call the helper:

   ```js
   Casper.featureFlags.applyVariant(rootEl, "my-flag");
   ```

   `applyVariant(root, flagName[, fallbackVariant])` (in
   [`assets/js/feature-flags.js`](assets/js/feature-flags.js)) keeps the `data-ff-variant`
   block matching the resolved flag value and **removes the others** — so only the chosen
   variant ever enters the DOM (no flash, no swap), and that read is what logs the Eppo
   exposure. If the resolved value matches no block it falls back to the `control` block
   (override with `fallbackVariant`). It expects flat sibling blocks with string values;
   it also handles multi-variant experiments (`data-ff-variant="variant-a"` / `"variant-b"`),
   and to A/B an image just tag the differing image element the same way. For a simple
   on/off flag, gate with `isEnabled()` instead of `applyVariant`.

> Prefer gating markup that is itself injected/rendered client-side (so there's nothing
> in the first paint to flash). Feature flags in this theme are for cosmetic / experience
> variants only — **do not gate primary, indexable content**: next-proxy serves empty
> flags to crawlers, so anything flag-gated is invisible to bots.

## Local development & testing

`window.MBA__FEATURE_FLAGS` is absent in local Ghost (no next-proxy), so flags fall back
to `DEFAULT_FLAGS`. Override from the browser console:

```js
window.__flags__.setFlag("my-flag", "treatment");
location.reload();   // required — the theme has no re-render

window.__flags__.deleteFlag("my-flag");
window.__flags__.reset();
```

Overrides are stored in `sessionStorage` (so they survive the reload) and are checked
**before** the injected flags — same override interface as shopfront's `window.__flags__`.
Setting an override does **not** log an Eppo exposure (overrides are for testing).

## Build

The reader is a plain ES5 file picked up automatically by the Gulp `js` task and
concatenated into `assets/built/casper.js`:

```sh
npx gulp build      # or `yarn dev` for watch mode
```

## Files

| File | Role |
| --- | --- |
| [`assets/js/feature-flags.js`](assets/js/feature-flags.js) | Reader (`get`/`is`/`isEnabled`/`applyVariant`) + `window.__flags__` override interface |

The reader is concatenated into `assets/built/casper.js` by the Gulp `js` task. No
component consumes a flag yet — wiring one up is per the "A/B testing" section above.

## Setup checklist (per environment)

- [ ] The flag id is registered and **active** in the Eppo environment next-proxy reads.
- [ ] Confirmed the tracking Proxy installs and `analytics.track("Eppo Assignment", …)`
      fires on a proxied magazine page (Segment/Eppo debugger). The tracking bundle is
      already loaded site-wide via Ghost, so no theme change is needed for this.
