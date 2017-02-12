# StayPuft

![Screenshot](/assets/screenshot-mockup.png?raw=true)

A fork of [Casper](https://github.com/TryGhost/Casper), the default theme for [Ghost](https://github.com/TryGhost/Ghost).

## Features

* Responsive design.
* Custom [AMP](https://dev.ghost.org/custom-amp-themes/) theme.
* Post comments using [Disqus](http://disqus.com/).
* In-site search using [GhostHunter](https://github.com/i11ume/ghostHunter).
* Support for [Font Awesome](https://github.com/FortAwesome/Font-Awesome).
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

**The current StayPuft version is 1.3.5, and is expected to work with Ghost 0.9.0.**

If the current version of StayPuft is not compatible with the version of Ghost you're running, try looking for an older one in the [Releases section](https://github.com/dlecina/StayPuft/releases).

## Installation

* Download the [latest release](https://github.com/dlecina/StayPuft/releases/latest) as a zip file.
* Rename `partials/disqus.hbs.example` to `partials/disqus.hbs` and customize it with your Disqus shortname.
* Rename `partials/sidebar-external.hbs.example` to `partials/sidebar-external.hbs` and customize it with your own external links.
* Go to your blog's Settings page (typically `/admin` or `/ghost`).
* In the Labs tab, enable the [Ghost Public API](http://support.ghost.org/public-api-beta/). This is required for search functionality.
* In the General tab, upload and activate Staypuft.
* (Optional) In the Code Injection tab, add any snippets you may need, such as [Google Analytics](http://academy.ghost.org/how-to-monitor-your-ghost-blogs-traffic/).

## Copyright & License

Copyright (c) 2013-2017 Ghost Foundation - Released under the [MIT license](LICENSE). (Original)  
Copyright (c) 2014-2017 David Lecina Fuentes - Released under the [MIT license](LICENSE). (Modifications)
