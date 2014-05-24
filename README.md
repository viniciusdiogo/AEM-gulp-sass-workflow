AEM-gulp-sass-workflow
======================

An "alternate" workflow for front end development for users of Adobe Experience Manager.  Features Gulp (node), SASS, and some weirdness.  Just getting started!  More instructions to follow.

### Installation instructions: ###

Download and install node.js and then

>$ npm install gulp -g

Don't clone this repo!  It needs to live in the jcr_root directory itself, not within a folder.  Install by:

Bash at jcr_root directory in your workspace

>$ git init
>$ git remote add origin https://github.com/cozuya/AEM-gulp-sass-workflow.git
>$ git pull origin master

Obviously for some (many), you will already be inside of a git repo and this won't work.  The solution for this is either git submodule or.. copy and pasting this stuff in there.

then

>$ npm install gulp gulp-ruby-sass --save-dev

---

Prior to development, run the following command from bash:

>$ curl -Ok <full URL of page you want to work on.  Does not necessarily need to be localhost:4503/2>

and then start app with

>$ gulp

and navigate your browser to http://localhost:8080.  Development best in Chrome and Firefox as they are the only ones to support SASS sourcemaps as of 5/2014.

App works by piggybacking off of jcr_root's pathing from the front end - files will be "not really" be touched - they will, but not in the way you'd expect.  It generates a nodewebserver based off the html filed saved by the cURL command and then watches and compiles SASS and JS.  The advantage here that we decouple front end development from AEM - we do the gruntwork (wink) here in this app as opposed to having AEM do LESS and JS clientlibrary compilation.  The disadvantage is we'll need to get these files into the jcr by vault any time we want it inside of AEM "for reals" - we can accomplish that in a couple ways but the easiest way is through sublime text's build feature.  That feature will be included in a future release.
