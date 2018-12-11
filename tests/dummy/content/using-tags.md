---
title: Organising your content with tags
image: /images/tags.jpg
imageMeta:
  attribution:
  attributionLink:
featured: true
author: ghost
date: Tue Jun 12 2018 17:57:10 GMT+0100 (IST)
tags:
  - getting-started
---

Ember Ghost has a single, powerful organisational taxonomy, called tags.

It doesn't matter whether you want to call them categories, tags, boxes, or anything else. You can think of tags a lot like Gmail labels. By tagging posts with one or more keyword, you can organise articles into buckets of related content.


## Basic tagging

When you write a post, you can assign tags to help differentiate between categories of content. For example, you might tag some posts with `News` and other posts with `Cycling`, which would create two distinct categories of content listed on `/tag/news/` and `/tag/cycling/`, respectively.

If you tag a post with both `News` *and* `Cycling` - then it appears in both sections.

Tag archives are like dedicated home-pages for each category of content that you have. They have their own pages and [hopefully soon](https://github.com/empress/ember-ghost/issues/1) will support their own cover images and meta data.


## The primary tag

At the top of every post there is a tiny bit of YAML, and the tags key is an [array](http://yaml.org/spec/1.0/#type-seq) of tags. The first tag in the list is always given the most importance, and some themes will only display the primary tag (the first tag in the list) by default. So you can add the most important tag which you want to show up in your theme, but also add a bunch of related tags which are less important.

```yaml
tags:
  - news
  - cycling
  - bart-stevens
  - extreme-sports
```

In this example, **News** is the primary tag which will be displayed by the theme, but the post will also still receive all the other tags, and show up in their respective archives.
