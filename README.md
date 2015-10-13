# StayPuft

A fork of Casper, the default theme for [Ghost](https://github.com/tryghost/ghost/).

## Features

* Responsive design.
* Post comments using [Disqus](http://disqus.com/).
* In-site search using [GhostHunter](https://github.com/i11ume/ghostHunter).
* Support for [Font Awesome](https://github.com/FortAwesome/Font-Awesome).
* Basic support for [slidr.js](https://github.com/bchanx/slidr).
* Syntax highlighting using [Prism](https://github.com/LeaVerou/prism/).

## Demo

This theme is being used in my [blog](http://davidlecina.com/).

*  ["Welcome to Ghost" post](http://davidlecina.com/blog/welcome-to-ghost/).
*  [Prism demo](http://davidlecina.com/blog/prism-demo/).

## Discussion

* The appropriate place to report problems is the [Issues section](https://github.com/dlecina/StayPuft/issues).
* To discuss other topics, please find an appropriate post in my blog's [Staypuft tag](http://davidlecina.com/blog/tag/staypuft/) and post a comment there.

## Ghost Version

StayPuft tries to match Casper's version numbering system. That is, StayPuft version A.B.C should roughly have the same (or more) features as Casper version A.B.C. Features and bug fixes may be added between major versions, so the best way to stay updated is to clone and pull changes from the repo.

**The current StayPuft version is 1.2.5, and is expected to work with Ghost 0.7.0.**

If the current version of StayPuft is not compatible with the version of Ghost you're running, try looking for an older one in the [Releases section](https://github.com/dlecina/StayPuft/releases).

## Installation

* Clone this repository inside your themes folder:

```
cd ghost/content/themes
sudo git clone https://github.com/dlecina/StayPuft
```

* Copy all files in `partials` folder ending in `example` so they end in `hbs`:

```
cd StayPuft/partials
cp disqus.hbs.example disqus.hbs
cp copyright.hbs.example copyright.hbs
cp sidebar-external.hbs.example sidebar-external.hbs
```

* Modify `partials/disqus.hbs` with your shortname.
* Replace `partials/copyright.hbs` with your own disclaimer.
* Modify `partials/sidebar-external.hbs` with your own external links.
* Restart Ghost.
* Select the theme in your Settings page.

## Copyright & License

Original Copyright (c) 2013-2015 Ghost Foundation - Released under The MIT License.  
Modifications Copyright (c) 2014-2015 David Lecina Fuentes - Released under The MIT License.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
