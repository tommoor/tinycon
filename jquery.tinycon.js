/**
 * @description jQuery.Tinycon - Tinycon library as a jQuery plugin
 * @requires jQuery >= 1.0
 * @author Tom Moor, http://tommoor.com
 * @author Alexander Burtsev - author of a jQuery plugin
 * @license MIT
 * @version 0.2.6
 */

(function($, window, document) {
	'use strict';

	var	Tinycon = {},
		currentFavicon = null,
		originalFavicon = null,
		originalTitle = document.title,
		faviconImage = null,
		canvas = null,
		options = {},
		defaults = {
			width: 7,
			height: 9,
			font: '10px arial',
			colour: '#ffffff',
			background: '#F03D25',
			fallback: true
		};

	// private methods
	function getFaviconTag() {
		var	_link = null;

		$('link').each(function() {
			var	_this = $(this);
			if ( (_this.attr('rel') || '').match(/\bicon\b/) )
				return _link = _this, false;
		});

		return _link;
	};

	function removeFaviconTag() {
		$('link').each(function() {
			var	_this = $(this);
			if ( (_this.attr('rel') || '').match(/\bicon\b/) ) // in original was ```getAttribute('rel') === 'icon'```, why?
				_this.remove();
		});
	};

	function getCurrentFavicon() {
		if ( !originalFavicon || !currentFavicon ) {
			var	icon = getFaviconTag();
			originalFavicon = currentFavicon = icon ? icon.attr('href') : '/favicon.ico';
		}

		return currentFavicon;
	};

	function getCanvas() {
		if ( !canvas )
			canvas = $('<canvas>').attr({
				width: 16,
				height: 16
			});

		return canvas.get(0);
	};

	function setFaviconTag(url) {
		removeFaviconTag();

		$('<link>')
			.attr({
				type: 'image/x-icon',
				rel: 'icon',
				href: url
			})
			.appendTo('head');
	};

	function log(message) {
		if ( window.console )
			console.log(message);
	};

	function drawFavicon(num, colour) {
		// fallback to updating the browser title if unsupported
		if ( !getCanvas().getContext || options.fallback === 'force')
			return updateTitle(num);

		var	context = getCanvas().getContext('2d'),
			colour = colour || '#000000',
			num = num || 0,
			src = getCurrentFavicon();

		faviconImage = new Image();
		faviconImage.onload = function() {

			// clear canvas  
			context.clearRect(0, 0, 16, 16);

			// draw original favicon
			context.drawImage(faviconImage, 0, 0, faviconImage.width, faviconImage.height, 0, 0, 16, 16);

			// draw bubble over the top
			if ( num > 0 )
				drawBubble(context, num, colour);

			// refresh tag in page
			refreshFavicon();
		};

		// allow cross origin resource requests if the image is not a data:uri
		// as detailed here: https://github.com/mrdoob/three.js/issues/1305
		if ( !src.match(/^data/) )
			faviconImage.crossOrigin = 'anonymous';

		faviconImage.src = src;
	};

	function updateTitle(num) {
		if ( !options.fallback )
			return;

		if ( num > 0 )
			document.title = '('+num+') ' + originalTitle;
		else
			document.title = originalTitle;
	};

	function drawBubble(context, num, colour) {
		// bubble needs to be larger for double digits
		var	len = num.toString().length - 1,
			width = options.width + (6 * len),
			w = 16 - width,
			h = 16 - options.height;

		// webkit seems to render fonts lighter than firefox
		context.font = ($.browser.webkit ? 'bold ' : '') + options.font;
		context.fillStyle = options.background;
		context.strokeStyle = options.background;
		context.lineWidth = 1;

		// bubble
		context.fillRect(w,h,width-1,options.height);

		// rounded left
		context.beginPath();
		context.moveTo(w-0.5,h+1);
		context.lineTo(w-0.5,15);
		context.stroke();

		// rounded right
		context.beginPath();
		context.moveTo(15.5,h+1);
		context.lineTo(15.5,15);
		context.stroke();

		// bottom shadow
		context.beginPath();
		context.strokeStyle = 'rgba(0,0,0,0.3)';
		context.moveTo(w,16);
		context.lineTo(15,16);
		context.stroke();

		// number
		context.fillStyle = options.colour;
		context.textAlign = 'right';
		context.textBaseline = 'top';

		// unfortunately webkit/mozilla are a pixel different in text positioning
		context.fillText(num, 15, $.browser.mozilla ? 7 : 6);
	};

	function refreshFavicon() {
		// check support
		if ( !getCanvas().getContext )
			return;

		setFaviconTag(getCanvas().toDataURL());
	};

	// public methods
	$.extend(Tinycon, {
		setOptions: function(custom) {
			options = $.extend({}, defaults, custom);
			return Tinycon;
		},
		setImage: function(url) {
			currentFavicon = url;
			refreshFavicon();
			return Tinycon;
		},
		setBubble: function(num, colour) {
			// validate
			if( isNaN(parseFloat(num)) || !isFinite(num) )
				return log('Bubble must be a number');

			drawFavicon(num, colour);
			return Tinycon;
		},
		reset: function() {
			this.setImage(originalFavicon);
			return Tinycon;
		}
	});

	Tinycon.setOptions(defaults);
	$.Tinycon = window.Tinycon = Tinycon;

})(jQuery, window, document);