# ember-casper-template

This project is designed to be a fully-functional, static site implementation of the official Ghost
[Casper Template](https://github.com/TryGhost/Casper) built on EmberJS with fully working out of the
box SEO friendly output. It supports being hosted on AWS S3 or any other static site hosting
solution.

If you want an example of the this "in production" then check out the [Stone Circle
Blog](https://blog.stonecircle.io). If you use this in production let us know [on Twitter](https://twitter.com/stonecircle_co) and we can add a
"built with ember-casper-template" wiki.

You do not need to be a web developer to be able to use this system. You just write markdown files
and the rest of the work is performed by EmberJS' build system.

## Getting Started

First you need to generate an ember app:

```sh
npm install -g ember-cli

ember new super-blog
```

then install this Ember Addon:

```sh
cd super-blog

ember install ember-casper-template
```

If you want to see the blog system running on your local machine just run `npm start` and you will
be able to navigate to  [http://localhost:4200](http://localhost:4200) to see the blog in action.

## Important steps to get it working
Currently there are 2 extra steps that are required to get this working. We are tying to make it so
you don't have to do these but if you want to get started quickly it is required.

1. Create the following folders:

```sh
mkdir content page author
```

2. Add the following to your config/environment.js at the end of the ENV object definition at the top
of the file

```javascript
fastboot: {
  hostWhitelist: ["localhost:4200"]
}
```

3. install the `ember-cli-cjs-transform` Ember addon

```sh
ember install ember-cli-cjs-transform
```

### Creating Content

This addon comes with helpful blueprints to generate posts and authors for you in the structure it
expects. The first thing you should do is generate an author as follows:

```sh
ember g author your-name
```

Then you should be able to edit the file `author/your-name.md` to update the details.

Next you will want to generate some posts. If you only have one author generated (in a single user
blog) you can generate a post as simply as running:

```sh
ember g post "this is a post I want to write"
```

### Configuring

If you have already generated some content (see above) you will know that you are able to configure certain details about your posts. If you want to edit the global configuration you will need to provide a section in the Environment config file for your host Ember app (located in `config/environment.js`). You will see a `let ENV = {` declaration near the top of the file, you will need to add a `blog` key to that object with your configuration. Here is an example with the exact contents of that `blog` config object from [the Stone Circle blog](https://blog.stonecircle.io)

```javascript
let ENV = {

  // leave all the other config in tact and add the following key

  blog: {
    title: "The Stone Circle",
    description: "The Stone Circle perspective on Software Development, Business and more.",
    logo: "/images/logo-white.png",
    rssLogo: '/images/logo.png',
    coverImage: "/images/cover-image.jpg",
    coverMeta: {
      attribution: "by Conor Luddy",
      attributionLink: "https://unsplash.com/photos/QkQXTxJ7TLg"
    },
    twitter: "stonecircle_co",
    navigation: [
      { label: 'Software Consulting', link: 'https://stonecircle.io' },
      { label: 'Blog Home', route: 'index' },
    ]
  },
}
```

This example config shows you how to set a title and general description for your blog, have a logo and a cover image, a link to your twitter account and how to add some navigation to your blog.

**Note:** the images like `/images/logo.png` will need to be in your `public` folder in your host app.

### Configuring your host & enabling RSS
The above configuration allows you to make your blog look a lot better but there is one piece of configuration that will enable some awesome features like automatically creating an RSS feed for you 🎉

Although because of the nature of some RSS aggregators you need to be *very* careful with this because it can mess up a cache that you have no control over, this is why it's dealt with differently than the above.

If you're not familiar with Ember configuration, you are able to specific some environment config *depending on what environment you are targeting*. This allows you to have some config only available in production (like Google Analytics for example).

If you go to the end of your `config/environment.js` file you will see something that is checking if the environment is `production`. You can add your host config to the blog config object as follows:

```javascript
if (environment === 'production') {

  // ... any other production config you might have ...

  ENV.blog.host = 'https://blog.stonecircle.io';
}
```

when ember-casper-template sees that you have host defined it will start generating the rss feed.
