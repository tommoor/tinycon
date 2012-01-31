# Tinycon

A small library for manipulating the favicon, in particular adding alert bubbles and changing images. Tinycon gracefully falls back to a number in title approach for browers that don't support canvas or dynamic favicons.

<img src="https://github.com/tommoor/tinycon/blob/master/examples/screenshot.png?raw=true" />

## Documentation

Tinycon adds a single object to the global namespace and does not require initialisation. 

### Basic Usage

        Tinycon.setBubble(6);

### Options

Tinycon can take a range of options to customise the look

* width: the width of the alert bubble
* height: the height of the alert bubble
* font: a css string to use for the fontface (recommended to leave this)
* colour: the foreground font colour
* background: the alert bubble background colour
* fallback: should we fallback to a number in brackets for browsers that don't support canvas/dynamic favicons

        Tinycon.setOptions({
          	width: 7,
			height: 9,
			font: '10px arial',
			colour: '#ffffff',
			background: '#549A2F',
			fallback: true
        });


## Download

Releases are available for download from
[GitHub](http://github.com/tommoor/tinycon/downloads).
