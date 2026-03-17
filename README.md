# miuh-ghost-theme

A GDPR-compliant (DSGVO) fork of [TryGhost/Casper](https://github.com/TryGhost/Casper) 5.9.0.

All external CDN requests have been removed so the theme can run without any third-party network calls.


## What changed vs. upstream Casper

### GDPR -- No external requests

1. **jQuery loaded locally** -- served from `assets/js/lib/jquery-3.5.1.min.js` instead of `code.jquery.com`.
2. **Local GDPR assets** in `assets/jsdelivr/`:
   - `portal.min.js` (v2.58.1)
   - `sodo-search.min.js` (v1.8.4)
   - `sodo-search.min.css`
   - `comments-ui.min.js` (v1.1.4)

### Design -- Dark Editorial

All visual customizations live in a single file: **`assets/css/custom.css`**, concatenated after `screen.css` via `gulp-concat` in `gulpfile.js`. The original Casper `screen.css` and `global.css` remain untouched for easy upstream merges.

- **Header/Footer**: warm dark background (`#1a1714`), subtle scanline texture, accent color `#99582a`
- **Logo**: serif, cream (`#f4f1eb`), warm glow on hover
- **Navigation**: uppercase, dimmed, accent underline on hover
- **Subscribe button**: transparent with accent border
- **Body background**: old paper tone (`#f4f1eb`)
- **Font system** -- three voices:
  - Serif (Iowan Old Style, Palatino, Georgia) -- headings
  - Mono (SF Mono, Fira Code, Menlo) -- body text, tags, meta
  - Sans (system stack) -- navigation, UI
- **Dark mode**: warm paper palette (`#1e1b17`), text opacity 0.85, consistent header/footer colors, readable tags/dates
- **Selection color**: blue (`rgba(25, 140, 255, 0.25)`)

### Build changes

- **`gulpfile.js`** -- `require('gulp-zip').default` (required for gulp-zip 6.x); `gulp-concat` combines `screen.css` + `custom.css` before PostCSS processing
- **`assets/built/`** -- excluded via `.gitignore`, generated at build time


## Required Ghost configuration

Ghost must load portal, search, and comments from the local theme assets instead of jsDelivr. Add these environment variables to your `docker-compose.yml` (or Ghost config):

```yaml
portal__url: "/assets/jsdelivr/portal.min.js"
sodoSearch__url: "/assets/jsdelivr/sodo-search.min.js"
sodoSearch__styles: "/assets/jsdelivr/sodo-search.min.css"
comments__url: "/assets/jsdelivr/comments-ui.min.js"
privacy__useGravatar: "false"
privacy__useGoogleFonts: "false"
privacy__useRpcPing: "false"
```

Without these settings, Ghost will still fetch scripts from external CDNs.


## Build

```bash
npm install
npx gulp build     # compiles CSS + JS into assets/built/
npx gulp zip       # packages theme into dist/miuh-ghost-theme.zip
```

Upload the resulting zip file via Ghost Admin > Settings > Design > Upload theme.


## Development

```bash
npx gulp           # starts dev server with livereload
```

Edit `assets/css/custom.css` for design changes -- it gets concatenated after `screen.css` and compiled into `assets/built/screen.css` automatically. Keep `screen.css` and `global.css` untouched to avoid merge conflicts with upstream.

# Translations

Please see [@TryGhost/Themes/theme-translations/README.md](https://github.com/TryGhost/Themes/blob/main/packages/theme-translations/README.md) for how to build, edit, or contribute translations.

## Syncing upstream Casper changes

```bash
# one-time setup
git remote add upstream https://github.com/TryGhost/Casper.git

# pull latest changes
git fetch upstream
git merge upstream/main
```

Since `screen.css` and `global.css` are unmodified, merges should be conflict-free. Only `custom.css`, `package.json`, `gulpfile.js`, and template files may need manual resolution.


## Updating the local GDPR assets

When Ghost releases a new version, the bundled portal/search/comments versions may change. To update:

1. Check current versions at [Ghost's defaults.json](https://github.com/TryGhost/Ghost/blob/main/ghost/core/core/shared/config/defaults.json)
2. Download the new files into `assets/jsdelivr/`, replacing the old ones
3. Rebuild and re-upload the theme


## License

MIT -- same as upstream Casper. See [LICENSE](LICENSE).
