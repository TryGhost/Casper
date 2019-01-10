importScripts('/_nuxt/workbox.5c678697.js')



workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/app.f80f25e12c54d1a9ccbc.js",
    "revision": "d301f20007a998c4c2cbaa085a6485ef"
  },
  {
    "url": "/_nuxt/lang-en.3a3991b78cd671075757.js",
    "revision": "c173b8bc92f99d53d3ccbaa7b6901a65"
  },
  {
    "url": "/_nuxt/lang-ja.a8c929068f24804b7171.js",
    "revision": "af03dfe5ec44c54438556fd5492c01ef"
  },
  {
    "url": "/_nuxt/layouts/default.cc46a839f2e881517b10.js",
    "revision": "cf724d7478790347f5606843f024db79"
  },
  {
    "url": "/_nuxt/manifest.689f6a8a2ff65a25c27f.js",
    "revision": "101f3fc9f2ba899bca3eb089197861e0"
  },
  {
    "url": "/_nuxt/pages/contact/index.63b504b52fdb12f0be1f.js",
    "revision": "6f4542b123a90a6a45c3f0d334b91cef"
  },
  {
    "url": "/_nuxt/pages/corp/index.7de6f8367f97d97fdecb.js",
    "revision": "36b7a5c376df76745309ec9668cbadad"
  },
  {
    "url": "/_nuxt/pages/index.e894e6f9ae5b614770bd.js",
    "revision": "9c1f6cd1cbe13ade9ff73bd961fdb131"
  },
  {
    "url": "/_nuxt/pages/inquiry/cargo.a69f74dc1aaeda32f7a3.js",
    "revision": "414c20005b005c3d0e6cc99c80cb17fc"
  },
  {
    "url": "/_nuxt/pages/inquiry/customer.415555fe10721278836f.js",
    "revision": "ec939020d49285a999057564a0df6c02"
  },
  {
    "url": "/_nuxt/pages/inquiry/index.738aa580ee0f70759436.js",
    "revision": "927f5f58a6023192638c59e124434faa"
  },
  {
    "url": "/_nuxt/pages/inquiry/thanks.7aae6bf2f0d397daf99b.js",
    "revision": "bddbb67cbb06f717ca8cee85e68f3a8e"
  },
  {
    "url": "/_nuxt/pages/partner/index.1704581bd3b6c7b21d1c.js",
    "revision": "f220f5e860625456d4f0b05463c186cd"
  },
  {
    "url": "/_nuxt/vendor.e6bb530d95c5fb857af8.js",
    "revision": "51a20f7d5b9fa3ba44f54ffa2afca767"
  }
], {
  "cacheId": "shippio-site",
  "directoryIndex": "/",
  "cleanUrls": false
})



workbox.clientsClaim()
workbox.skipWaiting()


workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')





