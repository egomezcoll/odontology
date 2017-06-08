test2
============

### Quick Start

#### Before you start, tools you will need

* install npm
* bower and grunt (run the following commands):

```script
npm install -g bower
npm install -g grunt
```

## Running

* configure project:

```script
npm install
bower install
```
* run project

Run the application.

`grunt server`

Run the application and open the browser.

`grunt server:open`

## Testing

Execute the following command to launch tests

`grunt test`

# Release Version

* Patch Release: `grunt release` or  `grunt release:patch`

* Minor Release: `grunt release:minor`

* Major Release: `grunt release:major`

* Specific Version Release: `grunt release:1.2.3`

* Pre-release: `grunt release:prerelease`

*prerelease* will just update the number after **MAJOR.MINOR.PATCH** (eg: 1.0.0-1) If you want to add an alphanumeric identifier, you will need to add it by hand. Example: add -alpha.0 to get something like 1.0.0-alpha.0. Calling `grunt release:prerelease` will just update the last number to 1.0.0-alpha.1.

Check [grunt-release](https://github.com/geddski/grunt-release) for more configurations.

 <!-- Available Grunt task (generated running 'grunt list') -->
