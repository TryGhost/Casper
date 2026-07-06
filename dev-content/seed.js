/**
 * Seeds the local Ghost instance with demo magazine content.
 *
 * Runs as the one-shot `seed` service in docker-compose.yml (see
 * `yarn local:seed`). It shares Ghost's content volume (for DB access) and
 * reaches the Admin API over the compose network. It:
 *   1. creates author users straight in the DB (the Admin API can't create staff),
 *   2. mints a short-lived Admin API key,
 *   3. creates tags, posts and the home page (from HTML) via the Admin API.
 *
 * routes.yaml is NOT handled here — it's mounted into content/settings/ by
 * docker-compose.yml and read on boot.
 *
 * Idempotent: authors/tags/page matched by slug and skipped; posts are
 * upserted. Safe to re-run. For a clean slate use `yarn local:reset` first.
 *
 * Config via env: GHOST_URL (default http://ghost:2368),
 * GHOST_DB (default /var/lib/ghost/content/data/ghost.db).
 */

const sqlite3 = require("sqlite3");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { authors, tags, posts, homePage } = require("./data");

const DB = process.env.GHOST_DB || "/var/lib/ghost/content/data/ghost.db";
const BASE = process.env.GHOST_URL || "http://ghost:2368";
const oid = () => crypto.randomBytes(12).toString("hex");
const stamp = () => new Date().toISOString().replace("T", " ").slice(0, 19);

const run = (db, sql, p = []) =>
  new Promise((res, rej) => db.run(sql, p, function (e) { e ? rej(e) : res(this); }));
const get = (db, sql, p = []) =>
  new Promise((res, rej) => db.get(sql, p, (e, r) => (e ? rej(e) : res(r))));

async function ensureAuthors(db) {
  const role = await get(db, "select id from roles where name = 'Author'");
  const pw = bcrypt.hashSync("dev-seed-" + oid(), 10);
  for (const a of authors) {
    const existing = await get(db, "select id from users where email = ?", [a.email]);
    if (existing) { a.id = existing.id; continue; }
    a.id = oid();
    const t = stamp();
    await run(
      db,
      "insert into users (id,name,slug,password,email,profile_image,bio,status,created_at,created_by) values (?,?,?,?,?,?,?,'active',?,'1')",
      [a.id, a.name, a.slug, pw, a.email, a.profile_image, a.bio, t]
    );
    await run(db, "insert into roles_users (id,role_id,user_id) values (?,?,?)", [oid(), role.id, a.id]);
    console.log("  + author:", a.name);
  }
}

async function mintToken(db) {
  // Custom-integration admin keys get their permissions from the
  // "Admin Integration" role; without it the key is rejected (403).
  const role = await get(db, "select id from roles where name = 'Admin Integration'");
  const secret = crypto.randomBytes(32).toString("hex");
  const keyId = oid();
  const intId = oid();
  const t = stamp();
  await run(db,
    "insert into integrations (id,name,slug,type,created_at,created_by) values (?,?,?,?,?,?)",
    [intId, "seed-" + keyId, "seed-" + keyId, "custom", t, "1"]);
  await run(db,
    "insert into api_keys (id,type,secret,role_id,integration_id,created_at,created_by) values (?,?,?,?,?,?,?)",
    [keyId, "admin", secret, role.id, intId, t, "1"]);
  return jwt.sign({}, Buffer.from(secret, "hex"), {
    keyid: keyId, algorithm: "HS256", expiresIn: "10m", audience: "/admin/",
  });
}

async function api(method, path, body, token) {
  const r = await fetch(BASE + path, {
    method,
    headers: {
      Authorization: "Ghost " + token,
      "Accept-Version": "v5.0",
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const j = await r.json().catch(() => ({}));
  if (r.status >= 300) {
    const msg = (j.errors && j.errors[0] && j.errors[0].message) || r.status;
    throw new Error(`${method} ${path} -> ${r.status}: ${msg}`);
  }
  return j;
}

async function main() {
  const db = new sqlite3.Database(DB);

  console.log("Creating authors...");
  await ensureAuthors(db);

  const token = await mintToken(db);

  // Tags: skip ones that already exist (by slug).
  console.log("Creating tags...");
  const existingTags = await api("GET", "/ghost/api/admin/tags/?limit=all&fields=slug", null, token);
  const haveTag = new Set(existingTags.tags.map((t) => t.slug));
  for (const t of tags) {
    if (haveTag.has(t.slug)) continue;
    await api("POST", "/ghost/api/admin/tags/", { tags: [t] }, token);
    console.log("  + tag:", t.name);
  }

  // Posts: skip ones that already exist (by slug).
  console.log("Creating posts...");
  // Upsert by slug so re-running self-corrects (e.g. after editing data.js).
  const existingPosts = await api("GET", "/ghost/api/admin/posts/?limit=all&fields=id,slug,updated_at", null, token);
  const bySlug = Object.fromEntries(existingPosts.posts.map((p) => [p.slug, p]));
  const byAuthorSlug = Object.fromEntries(authors.map((a) => [a.slug, a.id]));

  for (const p of posts) {
    const payload = {
      title: p.title,
      slug: p.slug,
      html: p.html,
      custom_excerpt: p.excerpt,
      feature_image: p.feature_image,
      featured: !!p.featured,
      status: "published",
      published_at: new Date(p.published + "T09:00:00Z").toISOString(),
      tags: p.tags.map((name) => ({ name })),
      authors: p.authors.map((slug) => ({ id: byAuthorSlug[slug] })),
    };
    const existing = bySlug[p.slug];
    if (existing) {
      // PUT needs the current updated_at for collision detection.
      payload.updated_at = existing.updated_at;
      await api("PUT", `/ghost/api/admin/posts/${existing.id}/?source=html`, { posts: [payload] }, token);
      console.log("  ~ updated:", p.title);
    } else {
      await api("POST", "/ghost/api/admin/posts/?source=html", { posts: [payload] }, token);
      console.log("  + post:", p.title);
    }
  }

  // Home page (static page whose tags drive the homepage sections).
  console.log("Creating home page...");
  const existingPages = await api("GET", "/ghost/api/admin/pages/?limit=all&fields=slug", null, token);
  if (existingPages.pages.some((p) => p.slug === homePage.slug)) {
    console.log("  = skip (exists):", homePage.slug);
  } else {
    await api("POST", "/ghost/api/admin/pages/?source=html", {
      pages: [{
        title: homePage.title,
        slug: homePage.slug,
        html: homePage.html,
        status: "published",
        tags: homePage.tags.map((name) => ({ name })),
      }],
    }, token);
    console.log("  + page:", homePage.slug);
  }

  db.close();
  console.log(`\nDone. ${authors.length} authors, ${tags.length} tags, ${posts.length} posts, home page seeded.`);
  console.log("View the site at http://localhost:2368/");
}

main().catch((e) => { console.error("\nSeed failed:", e.message); process.exit(1); });
