# miuh-ghost-theme

A GDPR-compliant (DSGVO) fork of [TryGhost/Casper](https://github.com/TryGhost/Casper).

External CDN asset loading has been replaced with local theme assets where Ghost allows it. With the Ghost configuration below, Portal, Search, Comments, jQuery, PhotoSwipe, and the theme scripts are served from the same site instead of public CDNs.


## What changed vs. upstream Casper

### GDPR -- No external requests

1. **jQuery loaded locally** -- served from `assets/js/lib/jquery-3.5.1.min.js` instead of `code.jquery.com`.
2. **Local GDPR assets** in `assets/jsdelivr/`:
   - `portal.min.js` (Portal v2.68.58)
   - `sodo-search.min.js`
   - `sodo-search.min.css`
   - `comments-ui.min.js`

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
- **`assets/built/`** -- generated at build time and currently tracked so Ghost can use the theme without a build step after checkout


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
corepack enable
corepack prepare pnpm@11.5.2 --activate
pnpm install
pnpm build     # compiles CSS + JS into assets/built/
pnpm zip       # packages theme into dist/miuh-ghost-theme.zip
```

Upload the resulting zip file via Ghost Admin > Settings > Design > Upload theme.


## Dev container

The repository includes a VS Code/Docker Dev Container config in `.devcontainer/devcontainer.json`.
It uses Node 22, activates the pinned pnpm version from `package.json`, and keeps
`node_modules` in a container volume so host dependencies do not leak into the
container.

To move development into the container:

```bash
# optional, but recommended when switching between host and container installs
rm -rf node_modules

# then open the folder in VS Code and run:
# Dev Containers: Reopen in Container
```

After the container is created, use the normal scripts inside the container:

```bash
pnpm dev
pnpm build
pnpm zip
pnpm test
```


## Updating the local GDPR assets

When Ghost releases a new version, the bundled portal/search/comments versions may change. To update:

1. Check current versions at [Ghost's defaults.json](https://github.com/TryGhost/Ghost/blob/main/ghost/core/core/shared/config/defaults.json)
2. Download the new files into `assets/jsdelivr/`, replacing the old ones
3. Rebuild and re-upload the theme


## License

MIT -- same as upstream Casper. See [LICENSE](LICENSE).
