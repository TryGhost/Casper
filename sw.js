importScripts('/_nuxt/workbox.5c678697.js')



workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/app.09559d5b74c6dfa97323.js",
    "revision": "e2d0b8d4aed68bc0a7520049e4bc4567"
  },
  {
    "url": "/_nuxt/lang-en.0754f3399e678e78d68d.js",
    "revision": "7bd6b30646f80596a4f4bc9ad3f289dc"
  },
  {
    "url": "/_nuxt/lang-ja.a8c929068f24804b7171.js",
    "revision": "af03dfe5ec44c54438556fd5492c01ef"
  },
  {
    "url": "/_nuxt/layouts/default.01d602c2d1578121524c.js",
    "revision": "dc9b48bfd9afbf11c61a751288567f07"
  },
  {
    "url": "/_nuxt/manifest.a7469d7b90d6277aa584.js",
    "revision": "8d129799e07c9e84c191aa1ecb10a228"
  },
  {
    "url": "/_nuxt/pages/contact/index.52b85299126dc043ef95.js",
    "revision": "39ac0f353949d584cfc67285cdeca86f"
  },
  {
    "url": "/_nuxt/pages/corp/index.928e6b713658dacc68da.js",
    "revision": "8082910e89ef184ee8ed9131fd660594"
  },
  {
    "url": "/_nuxt/pages/index.baec664a279c14fdc7c7.js",
    "revision": "c165338f00785207c19cf5bb0f292065"
  },
  {
    "url": "/_nuxt/pages/inquiry/cargo.bf4bd871f4c1454e8927.js",
    "revision": "6fc257ae1c33d2db691ec7b461f29fa9"
  },
  {
    "url": "/_nuxt/pages/inquiry/customer.6f004f1a8c17f7a01430.js",
    "revision": "baabff92ae3999a0818f6b971a8bdcbf"
  },
  {
    "url": "/_nuxt/pages/inquiry/index.24c2b5da9a3f5ba91900.js",
    "revision": "cdb7a07c40959f77daf9f5ec2f6e1386"
  },
  {
    "url": "/_nuxt/pages/inquiry/thanks.60412ebd2b2234874a6c.js",
    "revision": "21c1c2f416ab17648e3d91b691dc7142"
  },
  {
    "url": "/_nuxt/pages/partner/index.15f40ef9354e7f644fdc.js",
    "revision": "ca3e5faaf0d8ea5197e59aa9fff5de26"
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





