# Demo content seed

Populates the local Ghost instance (see [../LOCAL_DEV.md](../LOCAL_DEV.md))
with realistic magazine content for theme development.

```bash
yarn local:seed
```

## What it creates

- **~9 authors** with bios and avatars
- **7 public tags** (Unlocking Adventure, Features, China, Trail Setting
  Stories, Travel Better, Mountain Mindset, Guides) with descriptions
- **17 posts**, 3 marked featured and tagged `#home-hero` for the carousel;
  one full-length article (`/jinshanling-hiking-great-wall-china/`) exercising
  headings, inline images, a pull quote and the `#auto-drop-caps` dropcap
- **A `home` page** whose tags define the homepage sections (in order)

The magazine home routing lives in [routes.yaml](routes.yaml) and is **mounted**
into Ghost's `content/settings/` by `docker-compose.yml` (read on boot) — so `/`
renders the magazine home (`home.hbs`), posts keep root-level permalinks, and
their archive lives at `/posts/`. Edit it, then `yarn local:restart`.

## How it works

`yarn local:seed` runs `docker compose run --rm seed` — a one-shot service
(reusing the Ghost image) that waits for Ghost to be healthy, then runs
[seed.js](seed.js). Sharing Ghost's content volume for DB access and reaching
the Admin API over the compose network, it:

1. inserts author users straight into the DB (the Admin API can't create staff),
2. mints a short-lived Admin API key with the "Admin Integration" role,
3. creates the tags, posts and page via the Admin API (from HTML source).

No restart is needed — routing is already mounted by compose.

## Editing / re-running

Idempotent by slug: authors/tags/pages are matched and skipped, posts are
**upserted**. Edit [data.js](data.js) — add posts, change tags, tweak copy —
and re-run `yarn local:seed` to apply. For a clean slate, `yarn local:reset`
first (this also wipes your admin account).

## Notes

- All prose in `data.js` is original placeholder copy, **not** the real Much
  Better Adventures article text. Titles/tags/authors mirror the live magazine
  so the layout renders realistically.
- Feature images use `picsum.photos` (seeded); author avatars use
  `pravatar.cc`. The Great Wall article points at the real MBA CDN image.
