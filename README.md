AEM-gulp-sass-workflow
======================

A workflow for front end development for users of Adobe Experience Manager using gulpjs.

Use this to do tools for working with AEM's front end tasks.  This app does the following tasks:

- SASS watch for changes to files, and then compile, create sourcemap, minify, "vault" to JCR using cURL, and livereload the browser (Chrome only).
- Javascript watch for changes to files, and then concat, minify, uglify, and vault to JCR.
- Manually build local AEM instances via special commands, see below.

The heart of this app is using cURL -T (essentially, send a file via HTTP POST) to send up compiled CSS and JS to the JCR without having to bother with vlt or (ugh) vaultclipse.  It is VERY fast and way better than any of the alternatives.  This allows you to decouple your front end assets from AEM and avoid clientlibraries which as of at least 5.6 have caused constant headaches.  This app will need heavy modification inside of the gulpfile to work at all!  See comments.

### Installation instructions: ###

Install node.js http://nodejs.org/download/.  Install ruby http://www.rubyinstaller.org/.  Install sass:

> gem install sass

Install chrome livereload extension https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei and click the extension button on your localhost page instance.

Git clone this repo next to your main AEM repo - it must be a sibling (or you'll have to change paths manually of course). Then:

> cd AEM-gulp-sass-workflow

> npm install -g gulp

> npm install

Edit the gulpfile in a way that makes sense relative to your AEM repo.

### To start watching for changes: ###

> gulp

In addition, this app can build AEM local instances without needing to go through eclipse.  This is hard coded in and I will probably regex parse this in the near future.  The 4 commands are:

> gulp build-publish

> gulp build-publish-3rdpartyjars

> gulp build-author

> gulp build-author-3rdpartyjars
