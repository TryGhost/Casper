---
title: Setting up your own Ghost theme
image: /images/design.jpg
imageMeta:
  attribution:
  attributionLink:
featured: true
author: ghost
date: Tue Jun 12 2018 17:49:21 GMT+0100 (IST)
tags:
  - getting-started
---
Ember Ghost currently only supports 2 themes, the default [Casper template](https://github.com/empress/ember-ghost-casper-template) and the [Attila template](https://github.com/empress/ember-ghost-attila-template). If you want to swap between templates it is as simple as installing a different npm dependency 🎉

The [Ember Ghost documentation](https://github.com/empress/ember-ghost/blob/master/README.md) recommends that you use the default theme called Casper, which is designed to be a clean, readable publication layout and can be easily adapted for most purposes. The ember-ghost-casper-template is a direct fork of Ghost's official Casper repository so it aims to be as close as possible to the original.

If you are interested in writing your own theme for Ember Ghost you can get started using

```sh
npm init ember-ghost-template <template-name>
```
and it will create a brand new template addon in the folder `ember-ghost-template-name-template`! You can check out the documentation for [create-ember-ghost-template here](https://github.com/empress/create-ember-ghost-template#readme). As [Ghost](https://ghost.org/) uses handlebars it is not too difficult to port an existing Ghost template to use Ember templates, so if you have any requests for an existing open source Ghost template please let us know 👍

If you do end up writing an Ember-Ghost template please let me know [on Twitter](https://twitter.com/real_ate) so I can include your template in a list of existing templates.
