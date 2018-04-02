# ember-casper-template

This project is designed to be a fully-functional, static site implementation of the official Ghost
[Casper Template](https://github.com/TryGhost/Casper) built on EmberJS with fully working out of the
box SEO friendly output. It supports being hosted on AWS S3 or any other static site hosting
solution.

You do not need to be a web developer to be able to use this system. You just write markdown files
and the rest of the work is preformed by EmberJS' build system.

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

Create the following folders:

```sh
mkdir content page author
```

Add the following to your config/environment.js at the end of the ENV object definition at the top
of the file

```javascript
fastboot: {
  hostWhitelist: ["localhost:4200"]
}
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
