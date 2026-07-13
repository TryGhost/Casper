# Running the theme locally

This theme is a set of Handlebars templates + a CSS/JS build pipeline. It can't
run on its own — it needs a Ghost server to render it. This repo ships a
Docker Compose stack that runs Ghost with the theme mounted, so you can edit
files here and see them in a real Ghost instance.

## Prerequisites

- Docker (Desktop or Engine) running
- Node + Yarn (for the asset build step)

## First-time setup

```bash
# 1. Install theme dependencies (for the CSS/JS build)
yarn install

# 2. Start Ghost (downloads the image on first run)
yarn local:up

# 3. Watch the logs until you see "Ghost is running..."
yarn local:logs   # Ctrl-C to stop tailing
```

Then, in your browser:

1. Open <http://localhost:2368/ghost/> and create the admin account
   (it's a throwaway local account — any email/password works).
2. Go to **Settings → Design → Change theme → Advanced**, find **mba-mag**
   in the list, and click **Activate**.
   - The theme may activate with a few gscan *warnings* (it's a Casper fork
     declaring an older API). Warnings are fine; only errors block activation.
3. Visit <http://localhost:2368/> to see the site.

Ghost starts empty. To fill it with realistic demo content, seed it:

```bash
yarn local:seed
```

This runs a one-shot `seed` service (defined in `docker-compose.yml`) that
creates ~9 authors, 7 tags, 17 posts (with a full-length article at
`/jinshanling-hiking-great-wall-china/`) and a home page. The magazine home
routing (`dev-content/routes.yaml`) is mounted into Ghost by compose, so no
restart is needed. It's idempotent, so you can edit `dev-content/data.js` and
re-run to update. See [dev-content/README.md](dev-content/README.md) for details.

After seeding, the key pages to check are:

- `/` — magazine home (hero carousel + per-section feeds)
- `/tag/unlocking-adventure/` — a tag archive
- `/jinshanling-hiking-great-wall-china/` — a full article (with dropcap)

## The edit loop

| You changed…            | To see it                                                        |
| ----------------------- | ---------------------------------------------------------------- |
| `assets/css/*` or JS    | Run `yarn dev` (compiles to `assets/built/`), then refresh browser |
| `*.hbs` templates       | `yarn local:restart` (Ghost caches compiled templates), then refresh |

Keep `yarn dev` running in one terminal while you work on styles — it watches
`assets/` and recompiles into `assets/built/`, which Ghost serves directly from
the mounted volume.

## Commands

```bash
yarn local:up        # start Ghost in the background
yarn local:seed      # seed demo content (one-shot `seed` compose service)
yarn local:logs      # tail Ghost logs
yarn local:restart   # restart Ghost (needed after editing .hbs files)
yarn local:down      # stop Ghost (keeps your data)
yarn local:reset     # stop Ghost AND wipe all data (fresh admin/posts)
```

## Notes

- **Ghost version:** defaults to the latest Ghost 5. To match a specific
  production version, set `GHOST_VERSION`, e.g.
  `GHOST_VERSION=5.100.0-alpine yarn local:up`.
- **ESI menubar:** the header uses an Edge Side Include (ESI) that's resolved by
  the production CDN. Locally the ESI tag won't resolve, so the menubar area may
  render empty — that's expected and not a theme bug.
- **Data lives in a Docker volume** (`ghost-content`), so your local posts and
  admin account survive restarts. Use `yarn local:reset` to start clean.
