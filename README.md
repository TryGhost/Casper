# ember-ghost-casper-template

This is a template designed to work with [Ember Ghost](https://github.com/stonecircle/ember-ghost)
and is a fully-functional, static site implementation of the official Ghost [Casper
Template](https://github.com/TryGhost/Casper) built on EmberJS with fully working out of the box SEO
friendly output. It supports being hosted on Github Pages, AWS S3 or any other static site hosting
solution.

For more information on how to use this system [read the Ember Ghost
documentation](https://github.com/stonecircle/ember-ghost/blob/master/README.md) but if you want to
get started straight away, try the quick start below.

If you want an example of this "in production" then check out the [Stone Circle
Blog](https://blog.stonecircle.io). If you use this in production let us know [on
Twitter](https://twitter.com/stonecircle_co) and we can add a "built with
ember-ghost-casper-template" wiki.

You do not need to be a web developer to be able to use this system. You just write markdown files
and the rest of the work is performed by EmberJS' build system.

## Quick Start

```sh
# if you don't have ember-cli installed already
npm install -g ember-cli

ember new super-blog
cd super-blog

ember install ember-ghost ember-ghost-casper-template
```

It will ask you if you want to update the `index.html` file and you should say yes 👍

If you want to see the blog system running on your local machine just run `npm start` and you will
be able to navigate to  [http://localhost:4200](http://localhost:4200) to see the blog in action.
