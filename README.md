# Tinycon

A small library for manipulating the favicon, in particular adding alert bubbles and changing images. Tinycon gracefully falls back to a number in title approach for browsers that don't support canvas or dynamic favicons.

<img src="https://github.com/tommoor/tinycon/blob/master/examples/screenshot.png?raw=true" />

<a href="http://tommoor.github.com/tinycon/">See the Live Demo here.</a>

## Documentation

Tinycon adds a single object to the global namespace and does not require initialisation.

### Installation

There are several versions of Tinycon published on NPM, unfortunately they are not controlled by me and do not track HEAD. The best idea is to install from github
directly and cut out the middleman!

```
npm install tommoor/tinycon --save
```

### Basic Usage

```javascript
Tinycon.setBubble(6);
```

### Options

Tinycon can take a range of options to customise the look

* width: the width of the alert bubble
* height: the height of the alert bubble
* font: a css string to use for the fontface (recommended to leave this)
* color: the foreground font color
* background: the alert bubble background color
* fallback: should we fallback to a number in brackets for browsers that don't support canvas/dynamic favicons? Boolean, or use the string 'force' to ensure a title update even in supported browsers.
* abbreviate: should tinycon shrink large numbers such as 1000 to an abbreviated version (1k). Boolean, defaults to true

```javascript
Tinycon.setOptions({
	width: 7,
	height: 9,
	font: '10px arial',
	color: '#ffffff',
	background: '#549A2F',
	fallback: true
});
```

### AMD support

Tinycon can also be used as an asynchronous module.

```javascript
require([
	'tinycon.js'
], function (T) {

	T.setOptions({
		width: 7,
		height: 9,
		font: '10px arial',
		color: '#ffffff',
		background: '#549A2F',
		fallback: true
	});

	T.setBubble(7);

});
```

## Browser Support

Tinycon has been tested to work completely in the following browsers. Older versions may be supported, but haven't been tested:

* Chrome 15+
* Firefox 9+
* Opera 11+

Currently the library degrades to title update:

* Internet Explorer 9
* Safari 5


## Development

To produce the minified file run `grunt uglify`


## License / Credits

Tinycon is released under the MIT license. It is simple and easy to understand and places almost no restrictions on what you can do with Tinycon.
[More Information](http://en.wikipedia.org/wiki/MIT_License)

Tinycon was inspired by [Notificon](https://github.com/makeable/Notificon)


## Download

Releases are available for download from
[GitHub](http://github.com/tommoor/tinycon/downloads).
