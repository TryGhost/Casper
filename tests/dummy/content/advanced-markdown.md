---
title: Advanced Markdown tips
image: /images/advanced.jpg
imageMeta:
  attribution:
  attributionLink:
featured: true
author: ghost
date: Tue Jun 12 2018 17:50:55 GMT+0100 (IST)
tags:
  - getting-started
---

There are lots of powerful things you can do with the Markdown

If you've gotten pretty comfortable with [all the basics](/the-editor/) of writing in Markdown, then you may enjoy some more advanced tips about the types of things you can do!

As with the last post, you'll want to be looking at the source [directly on github](https://github.com/empress/ember-ghost/blob/master/blueprints/ember-ghost/files/content/advanced-markdown.md) or in your local editor as you read it so that you can see all the Markdown code we're using.


## Special formatting

As well as bold and italics, you can also use some other special formatting in Markdown when the need arises, for example:

+ \*escaped characters\*


## Writing code blocks

There are two types of code elements which can be inserted in Markdown, the first is inline, and the other is block. Inline code is formatted by wrapping any word or words in back-ticks, `like this`. Larger snippets of code can be displayed across multiple lines using triple back ticks:

```
.my-link {
    text-decoration: underline;
}
```


## Full bleed images

One neat trick which you can use in Markdown to distinguish between different types of images is to add a `#hash` value to the end of the source URL, and then target images containing the hash with special styling. For example:

![walking](https://casper.ghost.org/v1.0.0/images/walking.jpg#full)

which is styled with...

```
img[src$="#full"] {
    max-width: 100vw;
}
```

This creates full-bleed images in the Casper theme, which stretch beyond their usual boundaries right up to the edge of the window. Every theme handles these types of things slightly differently, but it's a great trick to play with if you want to have a variety of image sizes and styles.


## Reference lists

**The quick brown [fox][1], jumped over the lazy [dog][2].**

[1]: https://en.wikipedia.org/wiki/Fox "Wikipedia: Fox"
[2]: https://en.wikipedia.org/wiki/Dog "Wikipedia: Dog"

Another way to insert links in markdown is using reference lists. You might want to use this style of linking to cite reference material in a Wikipedia-style. All of the links are listed at the end of the document, so you can maintain full separation between content and its source or reference.


## Full HTML

Perhaps the best part of Markdown is that you're never limited to just Markdown. You can write HTML directly in the Ghost editor and it will just work as HTML usually does. No limits! Here's a standard YouTube embed code as an example:

<iframe width="560" height="315" src="https://www.youtube.com/embed/Cniqsc9QfDo?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>
