<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable-next-line MD041 -->
<p align="center"><a href="https://lightit.io" target="_blank"><img alt="Light-it logo" src="https://lightit.io/images/Logo_purple.svg" width="400"></a></p>

<!-- markdownlint-enable MD033 -->

We help digital health startups, clinics, and medtech companies ideate, design, and develop custom web & mobile applications that transform the future of healthcare.

## Techs

- Ghost
- Git
  - PR Template
  - Issue Template

### Ghost

The default theme for [Ghost](http://github.com/tryghost/ghost/). This is the latest development version of Casper! If you're just looking to download the latest release, head over to the [releases](https://github.com/TryGhost/Casper/releases) page.

&nbsp;

![screenshot-desktop](https://user-images.githubusercontent.com/353959/66987533-40eae100-f0c1-11e9-822e-cbaf38fb8e3f.png)

&nbsp;

#### First time using a Ghost theme?

Ghost uses a simple templating language called [Handlebars](http://handlebarsjs.com/) for its themes.

This theme has lots of code comments to help explain what's going on just by reading the code. Once you feel comfortable with how everything works, we also have full [theme API documentation](https://ghost.org/docs/api/handlebars-themes/) which explains every possible Handlebars helper and template.

**The main files are:**

- `default.hbs` - The parent template file, which includes your global header/footer
- `index.hbs` - The main template to generate a list of posts, usually the home page
- `post.hbs` - The template used to render individual posts
- `page.hbs` - Used for individual pages
- `tag.hbs` - Used for tag archives, eg. "all posts tagged with `news`"
- `author.hbs` - Used for author archives, eg. "all posts written by Jamie"

One neat trick is that you can also create custom one-off templates by adding the slug of a page to a template file. For example:

- `page-about.hbs` - Custom template for an `/about/` page
- `tag-news.hbs` - Custom template for `/tag/news/` archive
- `author-ali.hbs` - Custom template for `/author/ali/` archive

### Development

- Check official development guide at <https://ghost.org/docs/install/local>.

Casper styles are compiled using Gulp/PostCSS to polyfill future CSS spec. You'll need [Node](https://nodejs.org/), [Yarn](https://yarnpkg.com/) and [Gulp](https://gulpjs.com) installed globally. After that, from the theme's root directory:

```bash
# install dependencies
yarn install

# run development server
yarn dev
```

Now you can edit `/assets/css/` files, which will be compiled to `/assets/built/` automatically.

The `zip` Gulp task packages the theme files into `dist/<theme-name>.zip`, which you can then upload to your site.

```bash
# create .zip file
yarn zip
```

#### PostCSS Features Used

- Autoprefixer - Don't worry about writing browser prefixes of any kind, it's all done automatically with support for the latest 2 major versions of every browser.
- Variables - Simple pure CSS variables
- [Color Function](https://github.com/postcss/postcss-color-function)

#### SVG Icons

Casper uses inline SVG icons, included via Handlebars partials. You can find all icons inside `/partials/icons`. To use an icon just include the name of the relevant file, eg. To include the SVG icon in `/partials/icons/rss.hbs` - use `{{> "icons/rss"}}`.

You can add your own SVG icons in the same manner.

## Deployment

1. Make zip running

    ```bash
    yarn zip
    ```

2. Go to Ghost design dashboard at <https://lightit.io/blog/ghost/#/settings/design/change-theme>.

3. Upload the zip `lighter3.zip` found in `dist` as the new theme. Rename it to the corresponding version first.

## Emoji Guide

**For reviewers: Emojis can be added to comments to call out blocking versus non-blocking feedback.**

E.g: Praise, minor suggestions, or clarifying questions that don’t block merging the PR.

> 🟢 Nice refactor!

<!-- markdownlint-disable-line MD028 -->

> 🟡 Why was the default value removed?

E.g: Blocking feedback must be addressed before merging.

> 🔴 This change will break something important

|              |                |                                     |
| ------------ | -------------- | ----------------------------------- |
| Blocking     | 🔴 ❌ 🚨       | RED                                 |
| Non-blocking | 🟡 💡 🤔 💭    | Yellow, thinking, etc               |
| Praise       | 🟢 💚 😍 👍 🙌 | Green, hearts, positive emojis, etc |

## Links

- [Git Flow](https://lightit.slite.com/app/docs/SC8usN2Ju)
- [Handbook of good practices for reviewers in Code Reviews](https://lightit.slite.com/app/docs/ddNGohWthVB3fO)
