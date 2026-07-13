/**
 * Seed content for local development.
 *
 * All prose here is original placeholder copy written to exercise the theme
 * (headings, images, dropcaps, excerpts, reading time). It is NOT the real
 * Much Better Adventures article text. Titles/tags/authors mirror the live
 * magazine so the layout renders realistically.
 *
 * Feature images use picsum.photos (seeded, so each post gets a stable unique
 * image) except the Great Wall article, which points at the real MBA CDN image.
 * Author avatars use pravatar.cc.
 */

const img = (slug) => `https://picsum.photos/seed/${slug}/2000/1200`;
const avatar = (slug) => `https://i.pravatar.cc/300?u=${slug}`;

// A few reusable paragraphs of neutral travel-writing filler.
const P = {
  intro:
    "<p>There is a particular kind of quiet you only find a long way from the trailhead car park. It arrives slowly, somewhere between the last signpost and the first ridge, and once it settles it changes the way you move through a landscape entirely.</p>",
  middle:
    "<p>We walked for hours without seeing another person. The path narrowed, then widened, then disappeared into scree before reappearing on the far side of the valley like an afterthought. Our guide never broke stride.</p>",
  reflect:
    "<p>It is easy, back home, to talk about adventure as though it were a product — something to be booked, packed and consumed. Out here the word means something plainer and more useful: paying attention, and being willing to be surprised.</p>",
  close:
    "<p>By the time we dropped back below the treeline the light had gone amber and the day felt earned. Nobody said much. There was nothing that needed saying.</p>",
};

const body = (...parts) => parts.join("\n");

const figure = (src, caption) =>
  `<figure class="kg-card kg-image-card${caption ? " kg-card-hascaption" : ""}">` +
  `<img class="kg-image" src="${src}" alt="${caption || ""}" loading="lazy" />` +
  (caption ? `<figcaption>${caption}</figcaption>` : "") +
  `</figure>`;

const authors = [
  { name: "Stuart Kenny", slug: "stuart-kenny", email: "stuart.kenny@example.com",
    bio: "Scottish travel writer and Travel Media Awards finalist, forever chasing the wilder side of a well-known trail." },
  { name: "Dani Redd", slug: "dani-redd", email: "dani.redd@example.com",
    bio: "Writer and hillwalker with a soft spot for cold-water swims and long, unglamorous approach marches." },
  { name: "Isobel Lewis", slug: "isobel-lewis", email: "isobel.lewis@example.com",
    bio: "Journalist covering the culture of the outdoors, from map-and-compass revivals to who gets to feel at home in the hills." },
  { name: "Phil Thomas", slug: "phil-thomas", email: "phil.thomas@example.com",
    bio: "Writer exploring identity, belonging and freedom in wild places." },
  { name: "Mirali Shukla", slug: "mirali-shukla", email: "mirali.shukla@example.com",
    bio: "Travel writer interested in the awkward, honest bits of the journey that brochures leave out." },
  { name: "Lewi Haskins", slug: "lewi-haskins", email: "lewi.haskins@example.com",
    bio: "Mountain guide and gear tester who has climbed Kilimanjaro more times than he can reliably count." },
  { name: "Carys Rees", slug: "carys-rees", email: "carys.rees@example.com",
    bio: "Volunteer mountain rescuer writing about resilience, teamwork and the limits of the human body." },
  { name: "Jack Clayton", slug: "jack-clayton", email: "jack.clayton@example.com",
    bio: "Dad, hammock enthusiast and reluctant early riser documenting adventures with very small companions." },
  { name: "Lynda Breen", slug: "lynda-breen", email: "lynda.breen@example.com",
    bio: "Cyclist and slow-travel advocate who would rather e-bike a coastline than drive it." },
].map((a) => ({ ...a, profile_image: avatar(a.slug) }));

const tags = [
  { name: "Unlocking Adventure", slug: "unlocking-adventure",
    description: "Perspectives on who gets to explore, and what the outdoors gives back — solo travel, representation, mental health and access." },
  { name: "Features", slug: "features",
    description: "Long-reads and reported stories from trails, mountains and rivers around the world." },
  { name: "China", slug: "china",
    description: "Hikes, history and hidden corners across China's mountains and ancient routes." },
  { name: "Trail Setting Stories", slug: "trail-setting-stories",
    description: "The people and places behind new and overlooked long-distance routes." },
  { name: "Travel Better", slug: "travel-better",
    description: "How tourism can work for the places and communities that host it." },
  { name: "Mountain Mindset", slug: "mountain-mindset",
    description: "Failure, resilience and the mental side of time spent in high places." },
  { name: "Guides", slug: "guides",
    description: "Practical, tested advice for planning your next big trip." },
];

// The full-length article (matches the /jinshanling-hiking-great-wall-china/ URL).
const greatWallBody = body(
  "<p>The Great Wall is not one wall but many, stitched together across centuries and dynasties, and most of the version you have seen in photographs is the polished, restored, coach-park section a short drive from Beijing. This is not that.</p>",
  P.middle,
  '<div class="next-p-auto-drop-caps"></div>',
  "<p>At Jinshanling the wall runs raw along the spine of the mountains, its watchtowers spaced like punctuation across the ridgeline. In spring the slopes below are dotted with fruit trees in blossom; in autumn the whole valley turns the colour of rust.</p>",
  figure("https://www.muchbetteradventures.com/magazine/content/images/size/w2000/2026/05/Jinshanling-Great-Wall-1.jpg", "The wall winding along the ridge at Jinshanling."),
  "<h2>Building the Wall</h2>",
  "<p>Construction here belongs mostly to the Ming dynasty, when the general Qi Jiguang reworked the defences into the closely spaced watchtowers that still define the skyline. Each tower could signal the next, so news of a threat could travel the length of the frontier faster than any rider.</p>",
  P.reflect,
  "<h2>Walking in Wild Jinshanling</h2>",
  "<p>The hiking is steep and gloriously unmanicured — loose stone, sudden drops, steps built for defenders rather than day-trippers. You share it with almost no one. The reward is a version of the monument that feels closer to its history than any restored section ever could.</p>",
  figure(img("jinshanling-blossom"), "Fruit trees in blossom below the ramparts."),
  "<blockquote><p>People want to see the parts with real history and beautiful views, not the parts that are full of tour groups.</p></blockquote>",
  P.close
);

// Shorter representative bodies for the rest.
const std = () => body(P.intro, P.middle, P.reflect, P.close);

const posts = [
  { title: "Ditching the Smartphone: Why More Women Are Choosing to Navigate Old-School",
    slug: "ditching-the-smartphone-navigate-old-school", featured: true,
    tags: ["Unlocking Adventure"], authors: ["isobel-lewis"], published: "2026-07-02",
    excerpt: "A quiet revival in map-and-compass skills is changing how a new generation of women moves through the hills." },

  { title: "Finding Freedom as a Queer Traveller Outdoors",
    slug: "finding-freedom-as-a-queer-traveller-outdoors", featured: true,
    tags: ["Features", "Unlocking Adventure"], authors: ["phil-thomas"], published: "2026-06-11",
    excerpt: "On belonging, visibility and the particular liberation of a long day in the mountains." },

  { title: "Hiking the Taoist Temple Trails of Mount Qingcheng, Sichuan",
    slug: "hiking-taoist-temple-trails-mount-qingcheng-sichuan", featured: true,
    tags: ["China", "Trail Setting Stories", "Features"], authors: ["stuart-kenny"], published: "2026-05-27",
    excerpt: "Following mist-wrapped stone paths between the temples of one of Taoism's holiest mountains." },

  { title: "E-Biking Portugal's Atlantic Coastal Trails",
    slug: "e-biking-portugals-atlantic-coastal-trails",
    tags: ["Features"], authors: ["lynda-breen"], published: "2026-06-20",
    excerpt: "Cliffs, sardines and a tailwind: why the slow, electric route along the coast beats the motorway every time." },

  { title: "What Being Turned Away Taught Me About Travelling as a Woman",
    slug: "what-being-turned-away-taught-me-travelling-as-a-woman",
    tags: ["Unlocking Adventure", "Features"], authors: ["mirali-shukla"], published: "2026-05-28",
    excerpt: "The hidden upside of a trip that did not go to plan." },

  { title: "Hiking the Wild Side of the Great Wall of China",
    slug: "jinshanling-hiking-great-wall-china",
    tags: ["China", "Trail Setting Stories", "#auto-drop-caps"], authors: ["stuart-kenny"], published: "2026-05-14",
    feature_image: "https://www.muchbetteradventures.com/magazine/content/images/size/w2000/2026/05/Jinshanling-Great-Wall-1.jpg",
    excerpt: "The Jinshanling section runs through mountains dotted with fruit trees, far from the tourist crowds.",
    html: greatWallBody },

  { title: "Mountain Rescue Teaches You That Strength Isn't Just About Muscle",
    slug: "mountain-rescue-strength-isnt-just-about-muscle",
    tags: ["Unlocking Adventure"], authors: ["carys-rees"], published: "2026-05-11",
    excerpt: "What a decade of call-outs taught one volunteer about the quieter kinds of strength." },

  { title: "What a Freezing Hammock Taught Me About Being a Dad",
    slug: "what-a-freezing-hammock-taught-me-about-being-a-dad",
    tags: ["Unlocking Adventure"], authors: ["jack-clayton"], published: "2026-04-14",
    excerpt: "A very cold night out, and a small lesson in patience." },

  { title: "Netball, Notebooks & a Bigger Vision for Tourism in Tanzania",
    slug: "netball-notebooks-bigger-vision-tourism-tanzania",
    tags: ["Travel Better"], authors: ["stuart-kenny"], published: "2026-04-30",
    excerpt: "How a community-led project is rethinking who tourism is actually for." },

  { title: "The Tourism Economy Is Booming. But For Whom?",
    slug: "the-tourism-economy-is-booming-but-for-whom",
    tags: ["Travel Better"], authors: ["stuart-kenny"], published: "2026-04-09",
    excerpt: "Record visitor numbers hide an uncomfortable question about where the money goes." },

  { title: "Beyond K2: The Remote Trek Through Pakistan's Forgotten Valleys",
    slug: "beyond-k2-remote-trek-pakistans-forgotten-valleys",
    tags: ["Travel Better", "Features"], authors: ["dani-redd"], published: "2026-03-22",
    excerpt: "Away from the big-mountain circus, a slower route reveals a different Karakoram." },

  { title: "What We Learned From Failing on Adventures",
    slug: "what-we-learned-from-failing-on-adventures",
    tags: ["Mountain Mindset"], authors: ["dani-redd"], published: "2026-03-05",
    excerpt: "The trips that fall apart often teach you more than the ones that go to plan." },

  { title: "Lessons in Resilience, with Hari Budha Magar",
    slug: "lessons-in-resilience-with-hari-budha-magar",
    tags: ["Mountain Mindset"], authors: ["dani-redd"], published: "2026-02-18",
    excerpt: "A conversation about summits, setbacks and refusing to be defined by other people's limits." },

  { title: "The New 330km Bikepacking Route Through Scotland's Overlooked Corner",
    slug: "new-330km-bikepacking-route-scotland",
    tags: ["Trail Setting Stories"], authors: ["stuart-kenny"], published: "2026-02-02",
    excerpt: "A new long-distance route stitches together forgotten glens and quiet coast." },

  { title: "Do You Need a Guide to Climb Kilimanjaro?",
    slug: "do-you-need-a-guide-to-climb-kilimanjaro",
    tags: ["Guides"], authors: ["stuart-kenny"], published: "2026-01-20",
    excerpt: "The short answer is yes — here is the longer, more useful one." },

  { title: "The Beginner's Guide to Climbing Mount Kilimanjaro",
    slug: "beginners-guide-to-climbing-mount-kilimanjaro",
    tags: ["Guides"], authors: ["lewi-haskins"], published: "2026-01-08",
    excerpt: "Routes, timing, kit and altitude — everything you need to plan a first attempt." },

  { title: "7 of the Best Day Hikes in Yosemite National Park",
    slug: "best-day-hikes-yosemite-national-park",
    tags: ["Guides"], authors: ["stuart-kenny", "dani-redd"], published: "2025-12-15",
    excerpt: "From granite domes to giant sequoias, the walks worth building a trip around." },
].map((p) => ({
  ...p,
  // Featured posts also get the internal #home-hero tag that home.hbs uses to
  // populate the top carousel.
  tags: p.featured ? [...p.tags, "#home-hero"] : p.tags,
  feature_image: p.feature_image || img(p.slug),
  html: p.html || std(),
}));

// home.hbs is built around a static page whose tags define the homepage
// sections (in order). routes.yaml routes `/` to this page (data: page.home).
const homePage = {
  title: "Magazine",
  slug: "home",
  // Section order, top to bottom, mirroring the live magazine home.
  tags: ["Features", "Unlocking Adventure", "Travel Better", "Mountain Mindset", "Trail Setting Stories", "Guides"],
  html: "<p>Stories from the wilder side of travel.</p>",
};

module.exports = { authors, tags, posts, homePage };
