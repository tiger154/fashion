/*
 *  Daum Open Editor Based on Trex ver 1.5.
 *  Developed by: The Editors @ RIA Tech Team, FT Center 
 *  Powered by: Daum Communication Corp
 *  License: GNU LGPL (Lesser General Public Licence) 
 *  
 *  For further information visit: 
 *  	http://code.google.com/p/daumopeneditor/
 *  	
 *  Open Source References :
 *  + prototype v1.5.1.1 - http://www.prototypejs.org/
 *  + hyperscript - http://elzr.com/posts/hyperscript
 *  + SWFObject v2.2 - http://blog.deconcept.com/swfobject/
 */

/**
 * Editor\uc758 Global \uc18d\uc131\ub4e4\uc744 \uc815\uc758
 *  
 * @property
 */
var __TX_GLOBAL = {
	//domain: 'daum.net'
};
if(document && __TX_GLOBAL.domain && !window.Jaxer) {
	document.domain = __TX_GLOBAL.domain;
}

if (!("console" in window) || !("firebug" in console))
{
    var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml",
    "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];

    window.console = {};
    for (var i = 0; i < names.length; ++i) {
		window.console[names[i]] = function(){
		}
	}	
}if (!window.StopWatch) {
	StopWatch = {
		output: [],
		index: 0,
		start: function(){
			this._init = new Date().getTime();
		},
		lap: function(desc, c) {
			//var ctx = c ? c : window;
			var gap = new Date().getTime() - this._init;
			this.output.push("#" + (this.index++) + " : " + gap + " , " + desc);
		},
		printAll: function() {
			var _cc = console;
			for(var i=0,len=this.output.length;i<len;i++) {
				_cc.log(this.output[i]);
			}
		}
	};
}

/** @namespace */
var $tx = {}; 
(function() {
	/**
	 * @function
	 */
	Object.extend = function(destination, source) {
		for (var property in source) {
			destination[property] = source[property];
		}
		return destination;
	};
	
	window.Class = {
		create: function() {
			return function() {
				this.initialize.apply(this, arguments);
			};
		}
	};
	/**
	 * @class
	 */
	window.$break = {};
	/**
	 * \ud568\uc218(=\uba54\uc18c\ub4dc) \uc18c\uc720\uc790 \uac1d\uccb4\ub85c \ubbf8\ub9ac \ubb36\ub294 \ud568\uc218\uc758 \uc778\uc2a4\ud134\uc2a4\ub97c \ubc18\ud658. \ubc18\ud658\ub41c \ud568\uc218\ub294 \uc6d0\ub798\uc758 \uac83\uacfc \uac19\uc740 \uc778\uc790\ub97c \uac00\uc9c8 \uac83\uc774\ub2e4.
	 * @function
	 */
	Function.prototype.bind = function() {
		var __method = this, args = $A(arguments), object = args.shift();
		return function() {
			return __method.apply(object, args.concat($A(arguments)));
		}
	};
	/**
	 * \uc720\ud558\ub294 \uac1d\uccb4 \ud568\uc218(=\uba54\uc18c\ub4dc) \uc18c\uc720\uc790 \uac1d\uccb4\ub85c \ubbf8\ub9ac \ubb36\ub294 \ud568\uc218\uc758 \uc778\uc2a4\ud134\uc2a4\ub97c \ubc18\ud658. \ubc18\ud658\ub41c \ud568\uc218\ub294 \uc774\uac83\uc758 \uc778\uc790\ub85c \ud604\uc7ac \uc774\ubca4\ud2b8 \uac1d\uccb4\ub97c \uac00\uc9c8\uac83\uc774\ub2e4.
	 * @function
	 */
	Function.prototype.bindAsEventListener = function(object) {
		var __method = this, args = $A(arguments), object = args.shift();
		return function(event) {
			return __method.apply(object, [event || window.event].concat(args));
		}
	};
	
	var txlib = function(element) {
		if (arguments.length > 1) {
			for (var i = 0, elements = [], length = arguments.length; i < length; i++) 
				elements.push($tx(arguments[i]));
			return elements;
		}
		if (typeof element == 'string') {
			element = document.getElementById(element);
		}
		return element;
	};
	$tx = txlib;
	
	Object.extend($tx, /** @lends $tx */{
		/**
		 * Chrome browser \uc774\uba74 true
		 * @field
		 */
		chrome: (navigator.userAgent.indexOf("Chrome") != -1),
		/**
		 * Firefox browser \uc774\uba74 true 
		 * @field
		 */
		gecko: (navigator.userAgent.indexOf("Firefox") != -1),
		/**
		 * Firefox browser\uc758 \ubc84\uc804 
		 * @field
		 */
		gecko_ver: (navigator.userAgent.indexOf("Firefox") != -1)?parseFloat(navigator.userAgent.replace(/.*Firefox\/([\d\.]+).*/g,"$1")):0,
		/**
		 * MS IE \uc774\uba74 true 
		 * @field
		 */
		msie: (navigator.userAgent.indexOf("MSIE") != -1),
		/**
		 * MS IE browser \ubc84\uc804 
		 * @field
		 */
		msie_ver: (navigator.userAgent.indexOf("MSIE") != -1)?parseFloat(navigator.appVersion.split("MSIE")[1]):0,
		/**
		 * MS IE8 browser mode 
		 * @field
		 */
		msie8_compat: ($tx.msie_ver == 7 && (navigator.userAgent.indexOf("Trident/4.0") != -1)),
		/**
		 * MS IE8 browser mode
		 * @field
		 */
		msie8_std: $tx.msie_ver == 8 && (navigator.userAgent.indexOf("Trident/4.0") != -1),
		/**
		 * AppleWebKit browser \uc774\uba74 true 
		 * @field
		 */
		webkit: (navigator.userAgent.indexOf("AppleWebKit") != -1),
		/**
		 * AppleWebKit \ubc84\uc804
		 * @field
		 */
		webkit_ver: (navigator.userAgent.indexOf("AppleWebKit") != -1)?parseFloat(navigator.userAgent.replace(/.*Safari\//g,"")):0,
		/**
		 * Opera \uc774\uba74 true 
		 * @field
		 */
		opera: (navigator.userAgent.indexOf("Opera") != -1),
		 /**  
 	      * Presto browser \uc774\uba74 true   
		  * @field  
		  */
		presto: (navigator.userAgent.indexOf("Presto") != -1),  
		/**
		 * iPhone \uc774\uba74 true 
		 * @field
		 */
		iphone: (navigator.userAgent.indexOf("iPhone") != -1),
		/**
		 * iPod \uc774\uba74 true 
		 * @field
		 */
		ipod: (navigator.userAgent.indexOf("iPod") != -1)
	});
	
	Object.extend($tx, /** @lends $tx */{
		extend: Object.extend,
		/**
		 * browser\uc758 \uc774\ub984 \ub9ac\ud134
		 * @function
		 */
		browser: function() {
			if($tx.msie) {
				return 'msie';
			} else if($tx.gecko) {
				return 'firefox';
			} else if($tx.chrome) {
				return 'chrome';
			} else if($tx.webkit) {
				return 'safari';
			} else if($tx.opera) {
				return 'opera';
			} else {
				return "";
			}
		}()
	});
	
	/**
	 * @function
	 */
	window.$must = function(id, className) {
		var _el = $tx(id);
		if (!_el) {
			var _e = new Error("[Exception] " + className + " : not exist element(" + id + ")");
			throw _e;
		}
		return _el;
	};
	
	//expose
	window.txlib = txlib;
})();
		
(function() {		
	/**
	 * template
	 * @deprecated
	(function() {
		window.Template = Class.create();
		Template.Pattern = /(^|.|\r|\n)(#\{(.*?)\}|#%7B(.*?)%7D)/;
		Template.prototype = {
			initialize: function(template, pattern) {
				this.template = template.toString();
				this.pattern = pattern || Template.Pattern;
			},
			evaluate: function(object) {
				return this.template.gsub(this.pattern, function(match) {
					var before = match[1];
					if (before == '\\') 
						return match[2];
					return before + String.interpret(object[match[3] || match[4]]);
				});
			}
		};
	})();
	*/
	
	$tx.extend($tx, /** @lends $tx */{
		/**
		 * \uc8fc\uc5b4\uc9c4 element\uc640 \uad00\ub828\ub41c CSS \ud074\ub798\uc2a4\uba85\uc744 \ud45c\uc2dc\ud558\ub294 Element.ClassNames \uac1d\uccb4\ub97c \ubc18\ud658
		 * @function
		 */
		classNames: function(el) {
			return el.className.split(' ');
		},
		/**
		 * \uc694\uc18c\uac00 class\uba85\uc911\uc5d0 \ud558\ub098\ub85c \uc8fc\uc5b4\uc9c4 class\uba85\uc744 \uac00\uc9c4\ub2e4\uba74 true\ub97c \ubc18\ud658
		 * @function
		 */
		hasClassName: function(el, c) {
			var exist = false;
			if (!el.className) {
				return false;
			}
			var tmp = el.className.split(' ');
			for (var i in tmp) {
				if (tmp[i] == c) {
					exist = true;
					break;
				}
			}
			return exist;
		},
		/**
		 * \uc8fc\uc5b4\uc9c4 class\uba85\uc744 \uc694\uc18c\uc758 class\uba85\uc73c\ub85c \ucd94\uac00
		 * @function
		 */
		addClassName: function(el, c) {
			if (!this.hasClassName(el, c)) 
				el.className += ' ' + c;
		},
		/**
		 * \uc694\uc18c\uc758 class\uba85\uc73c\ub85c \ubd80\ud130 \uc8fc\uc5b4\uc9c4 class\uba85\uc744 \uc81c\uac70
		 * @function
		 */
		removeClassName: function(el, c) {
			var tmp = el.className.split(' ');
			for (var i in tmp) {
				if (tmp[i] == c) {
					tmp.splice(i, 1);
					break;
				}
			}
			el.className = tmp.join(' ');
		},
		/**
		 * \uc694\uc18c\uac00 \ub208\uc5d0 \ubcf4\uc774\ub294\uc9c0 \ud45c\uc2dc\ud558\ub294 Boolean\uac12\uc744 \ubc18\ud658
		 * @function
		 */
		visible: function(element) {
			//return $tx(element).style.display != 'none';
			return $tx.getStyle(element, "display" ) != 'none';
		},
		/**
		 * \uac01\uac01\uc758 \uc804\ub2ec\ub41c \uc694\uc18c\uc758 \uac00\uc2dc\uc131(visibility)\uc744 \ud1a0\uae00(toggle)\ud55c\ub2e4.
		 * @function
		 */
		toggle: function(element) {
			element = $tx(element);
			$tx[$tx.visible(element) ? 'hide' : 'show'](element);
			return element;
		},
		/**
		 * style.display\ub97c 'block'\ub85c \uc14b\ud305\ud558\uc5ec \uac01\uac01\uc758 \uc694\uc18c\ub97c \ubcf4\uc5ec\uc900\ub2e4.
		 * @function
		 */
		show: function(element) {
			$tx(element).style.display = 'block';
			return element;
		},
		/**
		 * style.display\ub97c 'none'\ub85c \uc14b\ud305\ud558\uc5ec \uac01\uac01\uc758 \uc694\uc18c\ub97c \uc228\uae34\ub2e4.
		 * @function
		 */
		hide: function(element) {
			$tx(element).style.display = 'none';
			return element;
		}
	});
})();

(function() {	
	$tx.extend($tx, /** @lends $tx */{
		/**
		 * \uc694\uc18c\uc758 style\uc18d\uc131 \uc911 opacity \uac12\uc744 \ub9ac\ud134\ud55c\ub2e4.
		 * @function
		 */
		getOpacity: function(element) {
			return $tx(element).getStyle('opacity');
		},
		/**
		 * \uc694\uc18c\uc758 style \uc18d\uc131\uc744 \uc14b\ud305\ud55c\ub2e4.
		 * @function
		 */
		setStyle: function(element, styles, camelized) {
			element = $tx(element);
			var elementStyle = element.style;
			for (var property in styles) 
				if (property == 'opacity') 
					$tx.setOpacity(element, styles[property]);
				else 
					elementStyle[(property == 'float' || property == 'cssFloat') ? (elementStyle.styleFloat === undefined ? 'cssFloat' : 'styleFloat') : (camelized ? property : property.camelize())] = styles[property];
			return element;
		}
	});
	
	var getStyle = function(element, style) {
		element = $tx(element);
		style = style == 'float' ? 'cssFloat' : style.camelize();
		var value = element.style[style];
		if (!value) {
			var css = document.defaultView.getComputedStyle(element, null);
			value = css ? css[style] : null;
		}
		if (style == 'opacity') 
			return value ? parseFloat(value) : 1.0;
		return value == 'auto' ? null : value;
	};
	
	$tx.extend($tx, /** @lends $tx */{
		/**
		 * \uc778\uc790\ub85c \ub118\uaca8 \ubc1b\uc740 \uc694\uc18c\uc758 \ud2b9\uc815 style \uc18d\uc131\uac12\uc744 \ub9ac\ud134\ud55c\ub2e4.
		 * @function
		 * @param {Element} element
		 * @style {String} style property
		 */
		getStyle: getStyle
	});
	
	if ($tx.opera) {
		$tx.extend($tx, {
			getStyle: function(element, style) {
				switch (style) {
					case 'left':
					case 'top':
					case 'right':
					case 'bottom':
						if (getStyle(element, 'position') == 'static') {
							return null;
						}
					default:
						return getStyle(element, style);
				}
			}
		});
	} else if ($tx.msie) {
		$tx.extend($tx, {
			getStyle: function(element, style) {
				element = $tx(element);
				style = (style == 'float' || style == 'cssFloat') ? 'styleFloat' : style.camelize();
				var value = element.style[style];
				if (!value && element.currentStyle) 
					value = element.currentStyle[style];
				if (style == 'opacity') {
					if (value = ($tx.getStyle(element,'filter') || '').match(/alpha\(opacity=(.*)\)/)) 
						if (value[1]) 
							return parseFloat(value[1]) / 100;
					return 1.0;
				}
				if (value == 'auto') {
					if ((style == 'width' || style == 'height') && ($tx.getStyle(element,'display') != 'none')) {
						return element['offset' + style.capitalize()] + 'px';
					}
					return null;
				}
				return value;
			}
		});
	}
	
	$tx.extend($tx, /** @lends $tx */{
		/**
		 * \uc694\uc18c\uc758 opacity style \uc18d\uc131\uc744 \uc14b\ud305\ud55c\ub2e4.
		 * @function
		 */
		setOpacity: function(element, value) {
			element = $tx(element);
			element.style.opacity = (value == 1 || value === '') ? '' : (value < 0.00001) ? 0 : value;
			return element;
		}
	});
	
	if ($tx.msie) {
		$tx.extend($tx, {
			setOpacity: function(element, value) {
				element = $tx(element);
				var filter = $tx.getStyle(element, 'filter'), style = element.style;
				if (value == 1 || value === '') {
					style.filter = filter.replace(/alpha\([^\)]*\)/gi, '');
					return element;
				} else if (value < 0.00001) 
					value = 0;
				style.filter = filter.replace(/alpha\([^\)]*\)/gi, '') +
				'alpha(opacity=' +
				(value * 100) +
				')';
				return element;
			}
		});
	} else if ($tx.gecko) {
		$tx.extend($tx, {
			setOpacity: function(element, value) {
				element = $tx(element);
				element.style.opacity = (value == 1) ? 0.999999 : (value === '') ? '' : (value < 0.00001) ? 0 : value;
				return element;
			}
		});
	}
})();

//position
(function() {
	$tx.extend($tx, /** @lends $tx */ {
		/**
		 * \uc694\uc18c\uc758 \ucd5c\uc0c1\uc704 \uc694\uc18c\uae4c\uc9c0\uc758 offset position \uc744 \ub354\ud55c \uac12\uc744 \ub9ac\ud134\ud55c\ub2e4.
		 * @function
		 */
		cumulativeOffset: function(element) {
			var valueT = 0, valueL = 0;
			do {
				valueT += element.offsetTop || 0;
				valueL += element.offsetLeft || 0;
				element = element.offsetParent;
			} while (element);
			return [valueL, valueT];
		},
		/**
		 * \uc694\uc18c\uc758 \ucd5c\uc0c1\uc704 \uc694\uc18c\uae4c\uc9c0\uc758 offset position \uc744 \ub354\ud55c \uac12\uc744 \ub9ac\ud134\ud55c\ub2e4.
		 * \uc0c1\uc704 \uc694\uc18c\uac00 body\uc774\uac70\ub098 position\uc774 relative \ub610\ub294 absolute \uc778 \uacbd\uc6b0 \uacc4\uc0b0\uc744 \uc911\uc9c0\ud55c\ub2e4.
		 * @function
		 */
		positionedOffset: function(element) {
			var valueT = 0, valueL = 0;
			do {
				valueT += element.offsetTop || 0;
				valueL += element.offsetLeft || 0;
				element = element.offsetParent;
				if (element) {
					if (element.tagName == 'BODY') 
						break;
					var p = $tx.getStyle(element, 'position');
					if (p == 'relative' || p == 'absolute') 
						break;
				}
			} while (element);
			return [valueL, valueT];
		},
		/**
		 * element\uc758 \uba74\uc801(dimensions)\uc744 \ubc18\ud658. \ubc18\ud658\ub41c \uac12\uc740 \ub450\uac1c\uc758 \ud504\ub77c\ud37c\ud2f0(height \uc640 width)\ub97c \uac00\uc9c0\ub294 \uac1d\uccb4\uc774\ub2e4. 
		 * @function
		 */
		getDimensions: function(element) {
		    var display = $tx.getStyle(element, 'display');
		    if (display != 'none' && display != null) // Safari bug
		      return {width: element.offsetWidth, height: element.offsetHeight};
		
		    // All *Width and *Height properties give 0 on elements with display none,
		    // so enable the element temporarily
		    var els = element.style;
		    var originalVisibility = els.visibility;
		    var originalPosition = els.position;
		    var originalDisplay = els.display;
		    els.visibility = 'hidden';
		    els.position = 'absolute';
		    els.display = 'block';
		    var originalWidth = element.clientWidth;
		    var originalHeight = element.clientHeight;
		    els.display = originalDisplay;
		    els.position = originalPosition;
		    els.visibility = originalVisibility;
		    return {width: originalWidth, height: originalHeight};
	  }
	});
	// Safari returns margins on body which is incorrect if the child is absolutely
	// positioned.  For performance reasons, redefine Position.cumulativeOffset for
	// KHTML/WebKit only.
	if ($tx.webkit) {
		$tx.cumulativeOffset = function(element) {
			var valueT = 0, valueL = 0;
			do {
				valueT += element.offsetTop || 0;
				valueL += element.offsetLeft || 0;
				if (element.offsetParent == document.body) 
					if ($tx.getStyle(element, 'position') == 'absolute') 
						break;
				element = element.offsetParent;
			} while (element);
			return [valueL, valueT];
		};
	}
	
})();

//events
(function () /** @lends $tx */ {
	$tx.extend($tx, {
		/** @field backspace key */
		KEY_BACKSPACE: 8,
		/** @field tab key */
		KEY_TAB: 9,
		/** @field return key */
		KEY_RETURN: 13,
		/** @field esc key */
		KEY_ESC: 27,
		/** @field left key */
		KEY_LEFT: 37,
		/** @field up key */
		KEY_UP: 38,
		/** @field right key */
		KEY_RIGHT: 39,
		/** @field down key */
		KEY_DOWN: 40,
		/** @field delete key */
		KEY_DELETE: 46,
		/** @field home key */
		KEY_HOME: 36,
		/** @field end key */
		KEY_END: 35,
		/** @field pageup key */
		KEY_PAGEUP: 33,
		/** @field pagedown key */
		KEY_PAGEDOWN: 34,
		/**
		 * \uc774\ubca4\ud2b8\uc758 target \ub610\ub294 srcElement \ub97c \ubc18\ud658
		 * @function
		 */
		element: function(event) {
			return $tx(event.target || event.srcElement);
		},
		/**
		 * \ub9c8\uc6b0\uc2a4 \uc67c\ucabd \ubc84\ud2bc\uc744 \ud074\ub9ad\uc2dc true\uac12 \ubc18\ud658
		 * @function
		 */
		isLeftClick: function(event) {
			return (((event.which) && (event.which == 1)) ||
			((event.button) && (event.button == 1)));
		},
		/**
		 * \ud398\uc774\uc9c0\uc5d0\uc11c \ub9c8\uc6b0\uc2a4 \ud3ec\uc778\ud130\uc758 x\uce21 \uc88c\ud45c\uac12 \ubc18\ud658
		 * @function
		 */
		pointerX: function(event) {
			return event.pageX ||
			(event.clientX +
			(document.documentElement.scrollLeft || document.body.scrollLeft));
		},
		/**
		 * \ud398\uc774\uc9c0\uc5d0\uc11c \ub9c8\uc6b0\uc2a4 \ud3ec\uc778\ud130\uc758 y\uce21 \uc88c\ud45c\uac12 \ubc18\ud658
		 * @function
		 */
		pointerY: function(event) {
			return event.pageY ||
			(event.clientY +
			(document.documentElement.scrollTop || document.body.scrollTop));
		},
		/**
		 * \uc774\ubca4\ud2b8\uc758 \ub514\ud3f4\ud2b8 \ud589\uc704\ub97c \ucde8\uc18c\ud558\uace0 \uc704\uc784\uc744 \uc5f0\uae30\ud558\uae30 \uc704\ud574 \uc774 \ud568\uc218\ub97c \uc0ac\uc6a9
		 * @function
		 */
		stop: function(event) {
			if (event.preventDefault) {
				event.preventDefault();
				event.stopPropagation();
			} else {
				event.returnValue = false;
				event.cancelBubble = true;
			}
		},
		/**
		 * \uc774\ubca4\ud2b8\uac00 \uc2dc\uc791\ub41c \ub178\ub4dc\ub85c\ubd80\ud130 \uc0c1\uc704\ub85c \uc21c\ud68c\ud558\uba70 \uc8fc\uc5b4\uc9c4 \ud0dc\uadf8\uc774\ub984\uc744 \uac16\ub294 \uccab\ubc88\uc9f8 \ub178\ub4dc\ub97c \ucc3e\ub294\ub2e4.
		 * find the first node with the given tagName, starting from the
		 * node the event was triggered on; traverses the DOM upwards
		 * @function
		 */
		findElement: function(event, tagName) {
			var element = $tx.element(event);
			while (element.parentNode &&
			(!element.tagName ||
			(element.tagName.toUpperCase() != tagName.toUpperCase()))) 
				element = element.parentNode;
			return element;
		},
		observers: false,
		_observeAndCache: function(element, name, observer, useCapture) {
			if (!this.observers) 
				this.observers = [];
			if (element.addEventListener) {
				this.observers.push([element, name, observer, useCapture]);
				element.addEventListener(name, observer, useCapture);
			} else if (element.attachEvent) {
				this.observers.push([element, name, observer, useCapture]);
				element.attachEvent('on' + name, observer);
			}
		},
		unloadCache: function() {
			if (!$tx.observers) 
				return;
			for (var i = 0, length = $tx.observers.length; i < length; i++) {
				$tx.stopObserving.apply(this, $tx.observers[i]);
				$tx.observers[i][0] = null;
			}
			$tx.observers = false;
		},
		/**
		 * \uc774\ubca4\ud2b8\ub97c \uc704\ud55c \uc774\ubca4\ud2b8 \ud578\ub4e4\ub7ec \ud568\uc218\ub97c \ucd94\uac00
		 * @function
		 * @param {Object} element \uc694\uc18c\uac1d\uccb4 \ub610\ub294 \uc544\uc774\ub514
		 * @param {String} name \uc774\ubca4\ud2b8 \uba85
		 * @param {Function} observer \uc774\ubca4\ud2b8\ub97c \ub2e4\ub8e8\ub294 \ud568\uc218
		 * @param {Boolean} userCapture true\ub77c\uba74, capture\ub0b4 \uc774\ubca4\ud2b8\ub97c \ub2e4\ub8e8\uace0 false\ub77c\uba74 bubbling \ub0b4 \uc774\ubca4\ud2b8\ub97c \ub2e4\ub8ec\ub2e4.
		 */
		observe: function(element, name, observer, useCapture) {
			element = $tx(element);
			useCapture = useCapture || false;
			if (name == 'keypress' &&
			($tx.webkit || element.attachEvent)) 
				name = 'keydown';
			$tx._observeAndCache(element, name, observer, useCapture);
		},
		/**
		 * \uc774\ubca4\ud2b8\ub85c\ubd80\ud130 \uc774\ubca4\ud2b8 \ud578\ub4e4\ub7ec\ub97c \uc81c\uac70
		 * @function
		 * @param {Object} element \uc694\uc18c\uac1d\uccb4 \ub610\ub294 \uc544\uc774\ub514
		 * @param {String} name \uc774\ubca4\ud2b8 \uba85
		 * @param {Function} observer \uc774\ubca4\ud2b8\ub97c \ub2e4\ub8e8\ub294 \ud568\uc218
		 * @param {Boolean} userCapture true\ub77c\uba74, capture\ub0b4 \uc774\ubca4\ud2b8\ub97c \ub2e4\ub8e8\uace0 false\ub77c\uba74 bubbling \ub0b4 \uc774\ubca4\ud2b8\ub97c \ub2e4\ub8ec\ub2e4.
		 */
		stopObserving: function(element, name, observer, useCapture) {
			element = $tx(element);
			useCapture = useCapture || false;
			if (name == 'keypress' &&
			($tx.webkit || element.attachEvent)) 
				name = 'keydown';
			if (element.removeEventListener) {
				element.removeEventListener(name, observer, useCapture);
			} else if (element.detachEvent) {
				try {
					element.detachEvent('on' + name, observer);
				} catch (e) {
				}
			}
		}
	});
	//  prevent memory leaks in IE 
	if ($tx.msie) {
		$tx.observe(window, 'unload', $tx.unloadCache, false);
	}
})();

(function()  {
	$tx.extend(Object, /** @lends Object */ {
		/**
		 * targetObj\uc758 \uc0ac\ub78c\uc774 \uc77d\uc744\uc218 \uc788\ub294 \ubb38\uc790\uc5f4 \ud45c\ud604\uc73c\ub85c \ubc18\ud658. \uc8fc\uc5b4\uc9c4 \uac1d\uccb4\uac00 inspect \uc778\uc2a4\ud134\uc2a4 \uba54\uc18c\ub4dc\ub97c \uc815\uc758\ud558\uc9c0 \uc54a\ub294\ub2e4\uba74, toString \uc758 \uac12\uc744 \ubc18\ud658
		 * @function
		 */
		inspect: function(object) {
			try {
				if (object === undefined) 
					return 'undefined';
				if (object === null) 
					return 'null';
				return object.inspect ? object.inspect() : object.toString();
			} catch (e) {
				if (e instanceof RangeError) 
					return '...';
				throw e;
			}
		},
		/**
		 * object \ub97c json \ud615\ud0dc\ub85c \ubc18\ud658
		 * @function
		 */
		toJSON: function(object) {
			var type = typeof object;
			switch (type) {
				case 'undefined':
				case 'function':
				case 'unknown':
					return;
				case 'boolean':
					return object.toString();
			}
			if (object === null) {
				return null;
			}
			if (object.toJSON) 
				return object.toJSON();
			if (object.ownerDocument === document) 
				return;
			var results = [];
			for (var property in object) {
				var value = Object.toJSON(object[property]);
				if (value !== undefined) 
					results.push(property.toJSON() + ': ' + value);
			}
			return '{' + results.join(', ') + '}';
		},
		/**
		 * object \ub97c \ubcf5\uc0ac
		 * @function
		 */
		clone: function(object) {
			return Object.extend({}, object);
		}
	});
	///////
	$tx.extend(Object, /** @lends Object */ {
		/**
		 * object property\uac00 toEncode()\ub97c \uc815\uc758\ud558\uace0 \uc788\ub2e4\uba74 \uc774\ub97c \uc2e4\ud589\uc2dc\ucf1c\uc11c \ubc18\ud658
		 * @function
		 */
		toEncode: function(object) {
			var type = typeof object;
			switch (type) {
				case 'undefined':
				case 'function':
				case 'unknown':
					return;
				case 'number':
				case 'boolean':
				case 'date':
					return object;
			}
			if (object === null) {
				return null;
			}
			if (object.toEncode) {
				return object.toEncode();
			}
			if (object.ownerDocument === document) {
				return;
			}
			var results = {};
			for (var property in object) {
				if (object[property]) {
					var value = Object.toEncode(object[property]);
					if (value !== undefined) {
						results[property] = value;
					}
				}
			}
			return results;
		},
		/**
		 * object property\uac00 toDecode()\ub97c \uc815\uc758\ud558\uace0 \uc788\ub2e4\uba74 \uc774\ub97c \uc2e4\ud589\uc2dc\ucf1c\uc11c \ubc18\ud658
		 * @function
		 */
		toDecode: function(object) {
			var type = typeof object;
			switch (type) {
				case 'undefined':
				case 'function':
				case 'unknown':
					return;
				case 'number':
				case 'boolean':
				case 'date':
					return object;
			}
			if (object === null) {
				return null;
			}
			if (object.toDecode) {
				return object.toDecode();
			}
			if (object.ownerDocument === document) {
				return;
			}
			var results = {};
			for (var property in object) {
				if (object[property]) {
					var value = Object.toDecode(object[property]);
					if (value !== undefined) {
						results[property] = value;
					}
				}
			}
			return results;
		}
	});
})();

(function () {
	$tx.extend(String, /** @lends String */{
		/**
		 * value \ub97c \ubb38\uc790\uc5f4\ub85c \ub9cc\ub4e4\uc5b4 \ubc18\ud658\ud55c\ub2e4. value \uac00 null \uc774\uba74 \ube48\ubb38\uc790\uc5f4\uc744 \ubc18\ud658\ud55c\ub2e4.
		 * @function
		 */
		interpret: function(value) {
			return value == null ? '' : String(value);
		},
		/**
		 * @field
		 */
		specialChar: {
			'\b': '\\b',
			'\t': '\\t',
			'\n': '\\n',
			'\f': '\\f',
			'\r': '\\r',
			'\\': '\\\\'
		}
	});
	$tx.extend(String.prototype, /** @lends String.prototype */{
		/**
		 * \ud604\uc7ac \ubb38\uc790\uc5f4\uc5d0\uc11c \ud328\ud134 \ubb38\uc790\uc5f4\uc744 \ucc3e\uc740 \uacb0\uacfc\uc758 \ubb38\uc790\uc5f4\uc744 \ubc18\ud658\ud558\uace0 \ub300\uccb4 \ubb38\uc790\uc5f4\uc774\ub098 \ud328\ud134\uc5d0 \uc77c\uce58\ud558\ub294 \ubb38\uc790\uc5f4\uc744 \uac00\uc9c4 \ubc30\uc5f4\uc744 \uc804\ub2ec\ud558\ub294 \ub300\uccb4\ud568\uc218\ub97c \ud638\ucd9c\ud55c \uacb0\uacfc\ub85c \ub300\uccb4\ud55c\ub2e4. 
		 * \ub300\uccb4\ubb3c\uc774 \ubb38\uc790\uc5f4\uc77c\ub54c, #{n}\uacfc \uac19\uc740 \ud2b9\ubcc4\ud55c \ud15c\ud50c\ub9bf \ud615\ud0dc\uc758 \ud1a0\ud070\uc744 \ud3ec\ud568\ud560\uc218 \uc788\ub2e4. 
		 * \uc5ec\uae30\uc11c n\uc774\ub77c\ub294 \uac12\uc740 \uc815\uaddc\ud45c\ud604\uc2dd \uadf8\ub8f9\uc758 \uc778\ub371\uc2a4\uc774\ub2e4.
		 * #{0}\ub294 \uc644\uc804\ud788 \uc77c\uce58\ud558\uba74 \ub300\uccb4\ub420\uac83\uc774\uace0 #{1}\ub294 \uccab\ubc88\uc9f8 \uadf8\ub8f9, #{2}\ub294 \ub450\ubc88\uc9f8\uc774\ub2e4.
		 * @function
		 */
		gsub: function(pattern, replacement) {
			var result = '', source = this, match;
			replacement = arguments.callee.prepareReplacement(replacement);
			while (source.length > 0) {
				if (match = source.match(pattern)) {
					result += source.slice(0, match.index);
					result += String.interpret(replacement(match));
					source = source.slice(match.index + match[0].length);
				} else {
					result += source, source = '';
				}
			}
			return result;
		},
		/**
		 * \ubb38\uc790\uc5f4 \uc55e,\ub4a4\uc758 \uacf5\ubc31\uc744 \uc81c\uac70
		 * @function
		 */
		strip: function() {
			return this.replace(/^\s+/, '').replace(/\s+$/, '');
		},
		/**
		 * \ubb38\uc790\uc5f4 \uc911 \ud0dc\uadf8 <tag> \ub97c \uc0ad\uc81c
		 * @function
		 */
		stripTags: function() {
			return this.replace(/<\/?[^>]+>/gi, '');
		},
		/**
		 * url query string \uc744 json \uc73c\ub85c \ub9cc\ub4e4\uc5b4 \ubc18\ud658\ud55c\ub2e4. separator \ub97c & \ub300\uc2e0 \ub2e4\ub978 \uac12\uc744 \uc0ac\uc6a9\ud560 \uc218 \uc788\ub2e4.
		 * @function
		 */
		toQueryParams: function(separator) {
			var match = this.strip().match(/([^?#]*)(#.*)?$/);
		    if (!match) return {};
		
			var _hash = {};
			var _lastkey = null;
		    match[1].split(separator || '&').each(function(pair) {
				var _key = null, _value = null;
				var _matches = pair.match(/([\w_]+)=(.*)/);
				if(_matches) {
					_lastkey = _key = decodeURIComponent(_matches[1]);
					if(_matches[2]) {
						_value = decodeURIComponent(_matches[2]);
					}
				} else if(_lastkey) {
					_key = _lastkey;
					_value = _hash[_key];
					_value += '&' + decodeURIComponent(pair);
				} else {
					return;
				}
				if (_key in _hash) {
					if (_hash[_key].constructor != Array) 
						_hash[_key] = [_hash[_key]];
					_hash[_key].push(_value);
				} else {
					_hash[_key] = _value;
				}
			});
			return _hash;
		},
		/**
		 * \ubb38\uc790\uc5f4\uc744 \ubc30\uc5f4\ub85c \ubc18\ud658\ud55c\ub2e4.
		 * @function
		 */
		toArray: function() {
			return this.split('');
		},
		/**
		 * count \ub9cc\ud07c \ubb38\uc790\uc5f4\uc744 \ubc18\ubcf5\ud558\uc5ec \uc774\uc5b4 \ubd99\uc778\ub2e4.
		 * @function
		 */
		times: function(count) {
			var result = '';
			for (var i = 0; i < count; i++) 
				result += this;
			return result;
		},
		/**
		 * -(\ud558\uc774\ud508)\uc73c\ub85c \ubd84\ub9ac\ub41c \ubb38\uc790\uc5f4\uc744 camelCaseString\uc73c\ub85c \ubcc0\ud658
		 * @function
		 */
		camelize: function() {
			var parts = this.split('-'), len = parts.length;
			if (len == 1) 
				return parts[0];
			var camelized = this.charAt(0) == '-' ? parts[0].charAt(0).toUpperCase() + parts[0].substring(1) : parts[0];
			for (var i = 1; i < len; i++) 
				camelized += parts[i].charAt(0).toUpperCase() + parts[i].substring(1);
			return camelized;
		},
		/**
		 * \uccab\ubc88\uc9f8 \uae00\uc790\ub97c \ub300\ubb38\uc790\ub85c \ubcc0\ud658
		 * @function
		 */
		capitalize: function() {
			return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
		},
		/**
		 * Returns a debug-oriented version of the string (i.e. wrapped in single or double quotes, with backslashes and quotes escaped).
		 * @function
		 */
		inspect: function(useDoubleQuotes) {
			var escapedString = this.gsub(/[\x00-\x1f\\]/, function(match) {
				var character = String.specialChar[match[0]];
				return character ? character : '\\u00' + match[0].charCodeAt().toPaddedString(2, 16);
			});
			if (useDoubleQuotes) 
				return '"' + escapedString.replace(/"/g, '\\"') + '"';
			return "'" + escapedString.replace(/'/g, '\\\'') + "'";
		},
		/**
		 * return this.inspect(true);
		 * @function
		 */
		toJSON: function() {
			return this.inspect(true);
		},
		/**
		 * \ubb38\uc790\uc5f4\uc774 \uc8fc\uc5b4\uc9c4 \ud328\ud134\uc744 \ud3ec\ud568\ud558\uba74 true
		 * @function
		 */
		include: function(pattern) {
			return this.indexOf(pattern) > -1;
		},
		/**
		 * \ube48\ubb38\uc790\uc5f4\uc774\uba74 true
		 * @function
		 */
		empty: function() {
			return this == '';
		},
		/**
		 * \uacf5\ubc31\ubb38\uc790\uc5f4\uc774\uba74 true
		 * @function
		 */
		blank: function() {
			return /^\s*$/.test(this);
		}
	});
	String.prototype.gsub.prepareReplacement = function(replacement) {
		if (typeof replacement == 'function') 
			return replacement;
		var template = new Template(replacement);
		return function(match) {
			return template.evaluate(match);
		};
	};
	//////
	$tx.extend(String.prototype, /** @lends String.prototype */{
		/**
		 * \ubb38\uc790\uc5f4 \uc55e,\ub4a4\uc758 \uacf5\ubc31\uc744 \uc81c\uac70
		 * @function
		 */
		trim: function() {
			return this.replace(/(^\s*)|(\s*$)/g, "");
		},
		/**
		 * \uc815\uaddc\ud45c\ud604\uc2dd\uc5d0\uc11c \uc0ac\uc6a9\ub418\ub294 \uba54\ud0c0\ubb38\uc790\ub97c \uc774\uc2a4\ucf00\uc774\ud504\ud574\uc11c \ubc18\ud658\ud55c\ub2e4.
		 * @function
		 */
		getRegExp: function() {
			return this.replace(/\\/g, "\\\\").replace(/\./g, "\\.").replace(/\//g, "\\/").replace(/\?/g, "\\?").replace(/\^/g, "\\^").replace(/\)/g, "\\)").replace(/\(/g, "\\(").replace(/\]/g, "\\]").replace(/\[/g, "\\[").replace(/\$/g, "\\$").replace(/\+/g, "\\+").replace(/\|/g, "\\|").replace(/&/g, "(&|&amp;)");
		},
		/**
		 * \uacf5\ubc31\ubb38\uc790\ub97c +\ub85c \ubc14\uafbc\ub2e4.
		 * @function
		 */
		toEncoded: function() {
			return this.replace(/\s/g, "+");
		},
		/**
		 * \ubb38\uc790\uc5f4\uc744 \uc815\uc218\ud615\uc73c\ub85c \ubc18\ud658\ud55c\ub2e4. \uc22b\uc790\uac00 \uc544\ub2cc \ubb38\uc790\uc5f4\uc740 0
		 * @function
		 */
		toNumber: function() {
			return (isNaN(this) ? 0 : parseInt(this, 10));
		},
		/**
		 * \ubb38\uc790\uc5f4\uc744 \ubd80\ub3d9\uc18c\uc218\uc810 \ud615\ud0dc\ub85c \ubc18\ud658\ud55c\ub2e4. \uc22b\uc790\uac00 \uc544\ub2cc \ubb38\uc790\uc5f4\uc740 0
		 * @function
		 */
		toFloat: function() {
			return (isNaN(this) ? 0 : parseFloat(this));
		},
		/**
		 * \ubb38\uc790\uc5f4\uc758 \uae38\uc774\ub97c \ubc18\ud658
		 * @function
		 */
		getRealLength: function() {
			var str = this;
			var idx = 0;
			for (var i = 0; i < str.length; i++) {
				idx += (escape(str.charAt(i)).charAt(1) == "u") ? 2 : 1;
			}
			return idx;
		},
		/**
		 * \ubb38\uc790\uc5f4\uc774 \uc8fc\uc5b4\uc9c4 \uae38\uc774\ubcf4\ub2e4 \uae38\uba74 \uc790\ub974\uace0 \ub9c8\uc9c0\ub9c9\uc5d0 ... \ub97c \ubd99\uc778\ub2e4.
		 * @function
		 */
		cutRealLength: function(length) {
			var str = this;
			var idx = 0;
			for (var i = 0; i < str.length; i++) {
				idx += (escape(str.charAt(i)).charAt(1) == "u") ? 2 : 1;
				if (idx > length) {
					return str.substring(0, i - 3).concat("...");
				}
			}
			return str;
		},
		/**
		 * \uc8fc\uc5b4\uc9c4 \uae38\uc774\ub85c \ubb38\uc790\uc5f4\uc744 \uc790\ub978\ub2e4.
		 * @function
		 */
		getCut: function(length) {
			var str = this;
			var idx = 0;
			for (var i = 0; i < str.length; i++) {
				idx += (escape(str.charAt(i)).charAt(1) == "u") ? 2 : 1;
				if (idx > length) {
					return str.substring(0, i + 1);
				}
			}
			return str.substring(0);
		},
		/**
		 * \ubb38\uc790\uc5f4\uc5d0 px \uac00 \uc788\uc73c\uba74 \uc798\ub77c\ub0b4\uace0 \ubc18\ud658\ud55c\ub2e4.
		 * @function
		 */
		parsePx: function() {
			if (this == null || this.length == 0) 
				return 0;
			else if (this.indexOf("px") > -1) 
				return this.substring(0, this.indexOf("px")).toNumber();
			else 
				return this.toNumber();
		},
		/**
		 * \ubb38\uc790\uc5f4\uc5d0 px \ub97c \ubd99\uc5ec\uc11c \ubc18\ud658\ud55c\ub2e4.
		 * @function
		 */
		toPx: function() {
			if (this.indexOf("px") > -1) {
				return this + "";
			} else {
				return this + "px";
			}
		},
		/**
		 * \ubc14\uc774\ud2b8\ub97c \uacc4\uc0b0\ud558\uc5ec \ub2e8\uc704\ub97c(KB, MB) \ubd99\uc5ec\uc11c \ubc18\ud658\ud55c\ub2e4.
		 * @function
		 */
		toByteUnit: function() {
			return this.toNumber().toByteUnit();
		},
		/**
		 * \ubb38\uc790\uc5f4\uc744 \uc778\ucf54\ub4dc\ud55c\ub2e4. encodeURIComponent \ub97c \uc2e4\ud589\ud558\uc5ec \ubc18\ud658
		 * @function
		 */
		toEncode: function() {
			return encodeURIComponent(this);
		},
		/**
		 * \ubb38\uc790\uc5f4\uc744 \ub514\ucf54\ub4dc\ud55c\ub2e4. decodeURIComponent \ub97c \uc2e4\ud589\ud558\uc5ec \ubc18\ud658
		 * @function
		 */
		toDecode: function() {
			return decodeURIComponent(this);
		},
		/**
		 * \uc22b\uc790\ub85c\ub41c \ubb38\uc790\uc5f4\uc744 \ucc9c\ub2e8\uc704\ub85c \uc27c\ud45c(,)\ub97c \ubd99\uc778\ub2e4.
		 * @function
		 */
		toCurrency: function() {
			var amount = this;
			for (var i = 0; i < Math.floor((amount.length - (1 + i)) / 3); i++) {
				amount = amount.substring(0, amount.length - (4 * i + 3)) + "," + amount.substring(amount.length - (4 * i + 3));
			}
			return amount;
		},
		/**
		 * source\ub97c \ubb38\uc790\uc5f4 \ub05d\uae4c\uc9c0 \ucc3e\uc544\uc11c target\uc73c\ub85c \uce58\ud658\ud55c\ub2e4. 
		 * @function
		 */
		replaceAll: function(source, target) {
			source = source.replace(new RegExp("(\\W)", "g"), "\\$1");
			target = target.replace(new RegExp("\\$", "g"), "$$$$");
			return this.replace(new RegExp(source, "gm"), target);
		}
	});
})();

//date
(function() {
	/**
	 * @function
	 */
	Date.prototype.toJSON = function() {
		return '"' + this.getFullYear() + '-' +
		(this.getMonth() + 1).toPaddedString(2) +
		'-' +
		this.getDate().toPaddedString(2) +
		'T' +
		this.getHours().toPaddedString(2) +
		':' +
		this.getMinutes().toPaddedString(2) +
		':' +
		this.getSeconds().toPaddedString(2) +
		'"';
	};
})();

(function() {
	/**
	 * @name Number
	 * @class
	 */
	$tx.extend(Number.prototype, /** @lends Number.prototype */{
		/**
		 * \uc22b\uc790\ub85c\ub41c \ubb38\uc790\uc5f4\uc774 \uc8fc\uc5b4\uc9c4 \uae38\uc774\ubcf4\ub2e4 \uc9e7\uc73c\uba74 \uc55e\ubd80\ubd84\uc5d0 0 \uc73c\ub85c \ucc44\uc6cc\ub123\uc5b4\uc11c \ubc18\ud658\ud55c\ub2e4.
		 * @function 
		 * @param {Number} length \ubc18\ud658\ub418\ub294 \ubb38\uc790\uc5f4\uc758 \ucd5c\uc18c \uae38\uc774
		 * @param {Number} radix \ud45c\uae30\ub420 \uc9c4\uc218. optional. \uae30\ubcf8 10\uc9c4\uc218
		 */
		toPaddedString: function(length, radix) {
			var string = this.toString(radix || 10);
			return '0'.times(length - string.length) + string;
		},
		//	  toJSON: function() {
		//	    return isFinite(this) ? this.toString() : 'null';
		//	  }
		// =>
		toJSON: function() {
			return isFinite(this) ? this + 0 : 'null';
		},
		/**
		 * 
		 * @function
		 */
		toTime: function() {
			return Math.floor(this / 60).toString().toPaddedString(2) + ":" + (this % 60).toString().toPaddedString(2);
		},
		/**
		 * \ubc14\uc774\ud2b8\ub97c \uacc4\uc0b0\ud558\uc5ec \ub2e8\uc704\ub97c(KB, MB) \ubd99\uc5ec\uc11c \ubc18\ud658\ud55c\ub2e4.
		 * @function
		 */
		toByteUnit: function() {
			var number;
			var units = ['GB', 'MB', 'KB'];
			if (this == 0) {
				return "0" + units[2];
			}
			for (var i = 0; i < units.length; i++) {
				number = this / Math.pow(1024, 3 - i);
				if (number < 1) {
					continue;
				}
				return (Math.round(number * 10) / 10) + units[i];
			}
			return "1" + units[2];
		},
		/**
		 * px\ub97c \ubd99\uc778\ub2e4.
		 * @function
		 */
		toPx: function() {
			return this.toString() + "px";
		},
		/**
		 * \uadf8\ub300\ub85c \ubc18\ud658\ud55c\ub2e4.
		 * @function
		 */
		parsePx: function() {
			return this;
		},
		/**
		 * \ucc9c\ub2e8\uc704\ub85c \uc27c\ud45c(,)\ub97c \ubd99\uc778\ub2e4.
		 * @function
		 */
		toCurrency: function() {
			return this.toString().toCurrency();
		},
		/**
		 * \uc815\uaddc\ud45c\ud604\uc2dd\uc5d0\uc11c \uc0ac\uc6a9\ub418\ub294 \uba54\ud0c0\ubb38\uc790\ub97c \uc774\uc2a4\ucf00\uc774\ud504\ud574\uc11c \ubc18\ud658\ud55c\ub2e4.
		 * @function
		 */
		getRegExp: function() {
			return this.toString().getRegExp();
		}
	});
})();

(function() {
	$tx.extend(Array.prototype, /** @lends Array.prototype */{
		/**
		 * \uc8fc\uc5b4\uc9c4 iterator\ud568\uc218\ub97c \ud638\ucd9c\ud558\ub294 \uac83\uc740 \uccab\ubc88\uc9f8 \uc778\uc790\ub0b4 \ubaa9\ub85d\uc73c\ub85c \uac01\uac01\uc758 \uc694\uc18c\uc640 \ub450\ubc88\uc9f8 \uc778\uc790\ub0b4 \uc694\uc18c\uc758 \uc778\ub371\uc2a4 \uc804\ub2ec\ud55c\ub2e4
		 * @function
		 */
		each: function(iterator) {
			var index = 0;
			try {
				this._each(function(value) {
					iterator(value, index++);
				});
			} catch (e) {
				if (e != $break) 
					throw e;
			}
			return this;
		},
		_each: function(iterator) {
			for (var i = 0, length = this.length; i < length; i++) 
				iterator(this[i]);
		},
		/**
		 * \uc9d1\ud569\ub0b4 \uc8fc\uc5b4\uc9c4 \uac1d\uccb4\ub97c \ucc3e\ub3c4\ub85d \uc2dc\ub3c4\ud55c\ub2e4. \uac1d\uccb4\uac00 \ucc3e\uc544\uc9c4\ub2e4\uba74, true\ub97c \ubc18\ud658\ud558\uace0 \ucc3e\uc9c0 \ubabb\ud55c\ub2e4\uba74 false\ub97c \ubc18\ud658\ud55c\ub2e4.
		 * @function
		 */
		include: function(object) {
			var found = false;
			this.each(function(value) {
				if (value == object) {
					found = true;
					throw $break;
				}
			});
			return found;
		},
		/**
		 * \uc9d1\ud569\uc758 \uac01\uac01\uc758 \uc694\uc18c\ub0b4 propertyName\uc5d0 \uc758\ud574 \uba85\uc2dc\ub41c \ud504\ub77c\ud37c\ud2f0\uc5d0 \uac12\uc744 \uac00\uc838\uac00\uace0 Array\uac1d\uccb4\ub85c \uacb0\uacfc\ub97c \ubc18\ud658\ud55c\ub2e4.
		 * @function
		 */
		pluck: function(property) {
			var results = [];
			this.each(function(value, index) {
				results.push(value[property]);
			});
			return results;
		},
		/**
		 * \uc9d1\ud569\ub0b4 \uac01\uac01\uc758 \uc694\uc18c\ub97c \uc704\ud55c iterator\ud568\uc218\ub97c \ud638\ucd9c\ud558\uace0 
		 * true\ub85c \ud574\uc11d\ub418\ub294 \uac12\uc744 \ubc18\ud658\ud558\ub294 iterator\ud568\uc218\ub97c \uc57c\uae30\ud558\ub294 \ubaa8\ub4e0 \uc694\uc18c\ub97c \uac00\uc9c4 Array\uc744 \ubc18\ud658\ud55c\ub2e4.
		 * @function
		 */
		select: function(iterator) {
			var results = [];
			this.each(function(value, index) {
				if (iterator(value, index)) 
					results.push(value);
			});
			return results;
		},
		/**
		 * iterator\ud568\uc218\ub97c \uc0ac\uc6a9\ud558\uc5ec \uc9d1\ud569\uc758 \ubaa8\ub4e0 \uc694\uc18c\ub97c \uc870\ud569\ud55c\ub2e4. 
		 * \ud638\ucd9c\ub41c iterator\ub294 accumulator\uc778\uc790\uc5d0\uc11c \uc774\uc804 \ubc18\ubcf5\uc758 \uacb0\uacfc\ub97c \uc804\ub2ec\ud55c\ub2e4. 
		 * \uccab\ubc88\uc9f8 \ubc18\ubcf5\uc740 accumulator\uc778\uc790\ub0b4 initialValue\ub97c \uac00\uc9c4\ub2e4. \ub9c8\uc9c0\ub9c9 \uacb0\uacfc\ub294 \ub9c8\uc9c0\ub9c9 \ubc18\ud658\uac12\uc774\ub2e4.
		 * @function
		 */
		inject: function(memo, iterator) {
			this.each(function(value, index) {
				memo = iterator(memo, value, index);
			});
			return memo;
		},
		/**
		 * \uc778\uc790\uc758 \ub9ac\uc2a4\ud2b8\uc5d0 \ud3ec\ud568\ub41c \uc694\uc18c\ub97c \uc81c\uc678\ud55c \ubc30\uc5f4\uc744 \ubc18\ud658. \uc774 \uba54\uc18c\ub4dc\ub294 \ubc30\uc5f4 \uc790\uccb4\ub97c \ubcc0\uacbd\ud558\uc9c0\ub294 \uc54a\ub294\ub2e4.
		 * @function
		 */
		without: function() {
			var values = $A(arguments);
			return this.select(function(value) {
				return !values.include(value);
			});
		},
		/**
		 * \ubc30\uc5f4\uc758 \ub9c8\uc9c0\ub9c9 \uc694\uc18c\ub97c \ubc18\ud658\ud55c\ub2e4.
		 * @function
		 */
		last: function() {
			return this[this.length - 1];
		},
		/**
		 * \uae30\ubcf5\uc774 \uc5c6\uace0, 1\ucc28\uc6d0\uc758 \ubc30\uc5f4\uc744 \ubc18\ud658\ud55c\ub2e4. \uc774 \ud568\uc218\ub294 \ubc30\uc5f4\uc774\uace0 \ubc18\ud658\ub41c \ubc30\uc5f4\ub0b4 \uc694\uc18c\ub97c \ud3ec\ud568\ud558\ub294 \ubc30\uc5f4\uc758 \uac01 \uc694\uc18c\ub97c \ucc3e\uc74c\uc73c\ub85c\uc368 \uc218\ud589\ub41c\ub2e4.
		 * @function
		 */
		flatten: function() {
			return this.inject([], function(array, value) {
				return array.concat(value && value.constructor == Array ? value.flatten() : [value]);
			});
		},
		/**
		 * \uc9d1\ud569\ub0b4 \uac01\uac01\uc758 \uc694\uc18c\ub97c \uc704\ud55c iterator\ud568\uc218\ub97c \ud638\ucd9c\ud558\uace0 true\ub97c \ubc18\ud658\ud558\ub294 iterator\ud568\uc218\ub97c \uc57c\uae30\ud558\ub294 \uccab\ubc88\uc9f8 \uc694\uc18c\ub97c \ubc18\ud658\ud55c\ub2e4. 
		 * true\ub97c \ubc18\ud658\ud558\ub294 \uc694\uc18c\uac00 \uc5c6\ub2e4\uba74, detect\ub294 null\uc744 \ubc18\ud658\ud55c\ub2e4.
		 * @function
		 */
		detect: function(iterator) {
			var result;
			this.each(function(value, index) {
				if (iterator(value, index)) {
					result = value;
					throw $break;
				}
			});
			return result;
		},
		/**
		 * json\uc73c\ub85c \ubc18\ud658
		 * @function
		 */
		toJSON: function() {
			var results = [];
			this.each(function(object) {
				var value = Object.toJSON(object);
				if (value !== undefined) 
					results.push(value);
			});
			return '[' + results.join(', ') + ']';
		},
		/**
		 * \ubc30\uc5f4\uc758 \uc694\uc18c\uac00 null \uc774\ub098 \ube48\ubb38\uc790\uc5f4\uc774\uba74 \uc81c\uac70\ud55c\ub2e4. 
		 * @function
		 */
		compact: function() {
			return this.select(function(value) {
				return (value != null) && (value != '');
			});
		},
		/**
		 * \ubc30\uc5f4\uc758 \uc694\uc18c\uc758 \uac12 \uc911 \uc911\ubcf5\ub418\ub294 \uac12\uc740 \uc81c\uac70\ud55c\ub2e4.
		 * @function
		 */
		uniq: function(sorted) {
		    return this.inject([], function(array, value, index) {
				if (0 == index || (sorted ? array.last() != value : !array.include(value)))
					array.push(value);
				return array;
			});
		},
		/**
		 * \ubc30\uc5f4\uc758 \ud2b9\uc815\uc694\uc18c\uac12\uc744 \ucd94\ucd9c\ud558\uc5ec json\uac1d\uccb4(map)\uc744 \ub9cc\ub4e0\ub2e4.
		 * @function
		 */
		toMap: function(property) {
			var results = {};
			this.each(function(value, index) {
				results[value[property]] = value;
			});
			return results;
		}
	});
	/**
	 * \uc9d1\ud569\ub0b4 \uac01\uac01\uc758 \uc694\uc18c\ub97c \uc704\ud55c iterator\ud568\uc218\ub97c \ud638\ucd9c\ud558\uace0 
	 * true\ub85c \ud574\uc11d\ub418\ub294 \uac12\uc744 \ubc18\ud658\ud558\ub294 iterator\ud568\uc218\ub97c \uc57c\uae30\ud558\ub294 \ubaa8\ub4e0 \uc694\uc18c\ub97c \uac00\uc9c4 Array\uc744 \ubc18\ud658\ud55c\ub2e4.
	 *  @function 
	 */
	Array.prototype.findAll = Array.prototype.select;
	if ($tx.opera) {
		Array.prototype.concat = function() {
			var array = [];
			for (var i = 0, length = this.length; i < length; i++) 
				array.push(this[i]);
			for (var i = 0, length = arguments.length; i < length; i++) {
				if (arguments[i].constructor == Array) {
					for (var j = 0, arrayLength = arguments[i].length; j < arrayLength; j++) 
						array.push(arguments[i][j]);
				} else {
					array.push(arguments[i]);
				}
			}
			return array;
		};
	}
	///////
	$tx.extend(Array.prototype, /** @lends Array.prototype */{
		/**
		 * \ubc30\uc5f4\uc758 \uc694\uc18c\ub97c \uc778\ucf54\ub4dc\ud55c\ub2e4.
		 * @function
		 */
		toEncode: function() {
			var results = [];
			this.each(function(object) {
				var value = Object.toEncode(object);
				if (value !== undefined) {
					results.push(value);
				}
			});
			return results;
		},
		/**
		 * \ubc30\uc5f4\uc758 \uc694\uc18c\ub97c \ub514\ucf54\ub4dc\ud55c\ub2e4.
		 * @function
		 */
		toDecode: function() {
			var results = [];
			this.each(function(object) {
				var value = Object.toDecode(object);
				if (value !== undefined) {
					results.push(value);
				}
			});
			return results;
		}
	});
	/** 
	 * \uc774\uac83\uc744 \ubc1b\uc544\ub4e4\uc774\ub294 \ud558\ub098\uc758 \uc778\uc790\ub97c Array \uac1d\uccb4\ub85c \ubcc0\ud658\ud55c\ub2e4.
	 * @name $A
	 * @example
	 * 	var someNodes = document.getElementsByTagName('img');
	 * 	var nodesArray = $A(someNodes);
	 */
	window.$A = Array.from = function(iterable) {
		if (!iterable) 
			return [];
		if (iterable.toArray) {
			return iterable.toArray();
		} else {
			var results = [];
			for (var i = 0, length = iterable.length; i < length; i++) 
				results.push(iterable[i]);
			return results;
		}
	};
	if ($tx.webkit) {
		$A = Array.from = function(iterable) {
			if (!iterable) 
				return [];
			if (!(typeof iterable == 'function' && iterable == '[object NodeList]') &&
			iterable.toArray) {
				return iterable.toArray();
			} else {
				var results = [];
				for (var i = 0, length = iterable.length; i < length; i++) 
					results.push(iterable[i]);
				return results;
			}
		};
	}
})();
//hash
(function() {
	/** @class */
	var Hash = function(object) {
		if (object instanceof Hash) 
			this.merge(object);
		else 
			Object.extend(this, object || {});
	};
	$tx.extend(Hash, /** @lends Hash */{
		/**
		 * \ucffc\ub9ac \ubb38\uc790\uc5f4\ucc98\ub7fc \ud3ec\ub9f7\ud305\ub41c \ubb38\uc790\uc5f4\ub85c hash\uc758 \ubaa8\ub4e0 \ud56d\ubaa9\uc744 \ubc18\ud658.
		 * \uc774\ub97c\ud14c\uba74 'key1=value1&key2=value2&key3=value3'
		 * @function
		 */
		toQueryString: function(obj) {
			var parts = [];
			parts.add = arguments.callee.addPair;
			this.prototype._each.call(obj, function(pair) {
				if (!pair.key) 
					return;
				var value = pair.value;
				if (value && typeof value == 'object') {
					if (value.constructor == Array) 
						value.each(function(value) {
							parts.add(pair.key, value);
						});
					return;
				}
				parts.add(pair.key, value);
			});
			return parts.join('&');
		},
		/**
		 * Hash\ub97c json \uc73c\ub85c \ubc18\ud658
		 * @function
		 */
		toJSON: function(object) {
			var results = [];
			this.prototype._each.call(object, function(pair) {
				var value = Object.toJSON(pair.value);
				if (value !== undefined) 
					results.push(pair.key.toJSON() + ': ' + value);
			});
			return '{' + results.join(', ') + '}';
		}
	});
	
	Hash.toQueryString.addPair = function(key, value, prefix) {
		key = encodeURIComponent(key);
		if (value === undefined) 
			this.push(key);
		else 
			this.push(key + '=' + (value == null ? '' : encodeURIComponent(value)));
	};
	$tx.extend(Hash.prototype, /** @lends Hash.prototype */{
		_each: function(iterator) {
			for (var key in this) {
				var value = this[key];
				if (value && value == Hash.prototype[key]) 
					continue;
				var pair = [key, value];
				pair.key = key;
				pair.value = value;
				iterator(pair);
			}
		},
		/**
		 * Hash\uc758 key \uac12\uc744 \ubc30\uc5f4\ub85c \ubc18\ud658\ud55c\ub2e4.
		 * @function
		 */
		keys: function() {
			return this.pluck('key');
		},
		/**
		 * Hash\uc758 value \uac12\uc744 \ubc30\uc5f4\ub85c \ubc18\ud658\ud55c\ub2e4.
		 * @function
		 */
		values: function() {
			return this.pluck('value');
		},
		/**
		 * hash\uc640 \uc804\ub2ec\ub41c \ub2e4\ub978 hash\ub97c \uc870\ud569\ud558\uace0 \uc0c8\ub85c\uc6b4 \uacb0\uacfc hash\ub97c \ubc18\ud658
		 * @function
		 */
		merge: function(hash) {
			return $H(hash).inject(this, function(mergedHash, pair) {
				mergedHash[pair.key] = pair.value;
				return mergedHash;
			});
		},
		/**
		 * \uc694\uc18c\ub97c \uc81c\uac70\ud55c\ub2e4.
		 * @function
		 */
		remove: function() {
			var result;
			for (var i = 0, length = arguments.length; i < length; i++) {
				var value = this[arguments[i]];
				if (value !== undefined) {
					if (result === undefined) 
						result = value;
					else {
						if (result.constructor != Array) 
							result = [result];
						result.push(value);
					}
				}
				delete this[arguments[i]];
			}
			return result;
		},
		/**
		 * Hash \uc694\uc18c\ub97c query string \uc73c\ub85c \ub9cc\ub4e4\uc5b4\uc11c \ubc18\ud658\ud55c\ub2e4.
		 * @function
		 */
		toQueryString: function() {
			return Hash.toQueryString(this);
		},
		/**
		 * key:value\uc30d\uc744 \uac00\uc9c4 hash\uc758 \ud3ec\ub9f7\ud305\ub41c \ubb38\uc790\uc5f4 \ud45c\ud604\uc744 \ubc18\ud658\ud558\uae30 \uc704\ud574 \ubcc0\uacbd(\uc624\ubc84\ub77c\uc774\ub4dc)
		 * @function
		 */
		inspect: function() {
			return '#<Hash:{' +
			this.map(function(pair) {
				return pair.map(Object.inspect).join(': ');
			}).join(', ') +
			'}>';
		},
		/**
		 * Hash\ub97c json\uc73c\ub85c \ubc18\ud658\ud55c\ub2e4.
		 * @function
		 */
		toJSON: function() {
			return Hash.toJSON(this);
		}
	});
	/** 
	 * object\ub97c Hash\ub97c \ub9cc\ub4e4\uc5b4 \ubc18\ud658\ud55c\ub2e4. 
	 * @name $H
	 * @example 
	 * 	var myHash = $H({'one': 1, 'two': 2, 'three': 3});
	 */
	window.$H = function(object) {
		if (object instanceof Hash) 
			return object;
		return new Hash(object);
	};
})();

// crossbrowser
(function() {
	if (typeof(HTMLElement) != "undefined") {
		HTMLElement.prototype.innerText;
		var hElementProto = HTMLElement.prototype;
		var hElementGrandProto = hElementProto.__proto__ = {
			__proto__: hElementProto.__proto__
		};
		if (HTMLElement.prototype.__defineSetter__) {
			hElementGrandProto.__defineSetter__("innerText", function(sText) {
				this.textContent = sText;
			});
		}
		if (HTMLElement.prototype.__defineGetter__) {
			hElementGrandProto.__defineGetter__("innerText", function() {
				return this.textContent;
			});
		}
	}
	if (typeof(XMLDocument) != "undefined") {
		if (XMLDocument.prototype.__defineGetter__) {
			XMLDocument.prototype.__defineGetter__("xml", function() {
				return (new XMLSerializer()).serializeToString(this);
			});
		}
	}
	if (typeof(Node) != "undefined") {
		if (Node.prototype && Node.prototype.__defineGetter__) {
			Node.prototype.__defineGetter__("xml", function() {
				return (new XMLSerializer()).serializeToString(this);
			});
		}
	}
	//	Simple Implementation of 
	//		setProperty() and selectNodes() and selectSingleNode() 
	//		for FireFox [Mozilla]
	if (typeof(document.implementation) != 'undefined') {
		if (document.implementation.hasFeature("XPath", "3.0")) {
			if (typeof(XMLDocument) != "undefined") {
				XMLDocument.prototype.selectNodes = function(cXPathString, xNode) {
					if (!xNode) {
						xNode = this;
					}
					var defaultNS = this.defaultNS;
					var aItems = this.evaluate(cXPathString, xNode, {
						normalResolver: this.createNSResolver(this.documentElement),
						lookupNamespaceURI: function(prefix) {
							switch (prefix) {
								case "dflt":
									return defaultNS;
								default:
									return this.normalResolver.lookupNamespaceURI(prefix);
							}
						}
					}, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
					var aResult = [];
					for (var i = 0; i < aItems.snapshotLength; i++) {
						aResult[i] = aItems.snapshotItem(i);
					}
					return aResult;
				};
				XMLDocument.prototype.setProperty = function(p, v) {
					if (p == "SelectionNamespaces" && v.indexOf("xmlns:dflt") == 0) {
						this.defaultNS = v.replace(/^.*=\'(.+)\'/, "$1");
					}
				};
				XMLDocument.prototype.defaultNS;
				// prototying the XMLDocument 
				XMLDocument.prototype.selectSingleNode = function(cXPathString, xNode) {
					if (!xNode) {
						xNode = this;
					}
					var xItems = this.selectNodes(cXPathString, xNode);
					if (xItems.length > 0) {
						return xItems[0];
					} else {
						return null;
					}
				};
				XMLDocument.prototype.createNode = function(nNodeType, sNodeName, sNameSpace) {
					if (nNodeType == 1) 
						return this.createElementNS(sNameSpace, sNodeName);
					else //Etc Not Use
 
						return null;
				};
			}
			if (typeof(Element) != "undefined") {
				Element.prototype.selectNodes = function(cXPathString) {
					if (this.ownerDocument.selectNodes) {
						return this.ownerDocument.selectNodes(cXPathString, this);
					} else {
						throw "For XML Elements Only";
					}
				};
				// prototying the Element 
				Element.prototype.selectSingleNode = function(cXPathString) {
					if (this.ownerDocument.selectSingleNode) {
						return this.ownerDocument.selectSingleNode(cXPathString, this);
					} else {
						throw "For XML Elements Only";
					}
				};
				Element.prototype.text;
				var elementProto = Element.prototype;
				var elementGrandProto = elementProto.__proto__ = {
					__proto__: elementProto.__proto__
				};
				if (Element.prototype.__defineSetter__) {
					elementGrandProto.__defineSetter__("text", function(text) {
						this.textContent = text;
					});
				}
				if (Element.prototype.__defineGetter__) {
					elementGrandProto.__defineGetter__("text", function() {
						return this.textContent;
					});
				}
			}
		}
	}
})();


/* megascript */
window.tx = {};

function each(a, f) { for(var i=0, l=a.length; i<l; i++) f(a[i]) };

function installHyperscript(namespace, oDocument) {
	each('a big blockquote br b center code dd dl dt div em font form h1 h2 h3 h4 h5 h6 hr img iframe input i li ol option pre p script select small span strike strong style sub sup table tbody td textarea tr ul u'.split(' '),
	    function(label) {
	        namespace[label]=function(){
	            var tag=oDocument.createElement(label);
	            each(arguments, function(arg){ 
	                if(arg.nodeType) {
						tag.appendChild(arg);
					} else if(typeof arg=='string' || typeof arg=='number') {
						if(label == "textarea") {
							if($tx.msie) {
								tag.value+=arg;	
							} else {
								tag.text+=arg;	
							}
						} else {
							tag.innerHTML+=arg;	
						}
					} else if(typeof arg=='array') {
						for(var i=0; i<arg.length; i++) {
							tag.appendChild(arg[i]);
						}
	                } else {
						for(var attr in arg) {
	                        if(attr=='style') {
								for(var sty in arg[attr]) {
									if((sty == 'float' || sty == 'cssFloat')) {
										tag[attr][tag[attr].styleFloat === undefined ? 'cssFloat' : 'styleFloat'] = arg[attr][sty];
									} else {
										tag[attr][sty]=arg[attr][sty];
									}
								}
							} else if(["more", "less", "longDesc"].include(attr)) {	 	// custom attributes
								if (tag.setAttribute) {
									tag.setAttribute(attr, arg[attr]);					
								}
							} else if (["colSpan", "rowSpan", "cellPadding", "cellSpacing"].include(attr)) { // nonstandard attributes
								if (tag.setAttribute) {
									tag.setAttribute(attr, arg[attr]);
								}
							} else {
								if (arg[attr]) {
									tag[attr] = arg[attr];
								}
							}
						}
	                }
	            });
	            return tag;
	        };
	    });	
}
installHyperscript(window.tx, document);
/**
 * Template - Very Very Simple Template Engine
 *  similar prototype.js template engine
 *  add syntax > #{for:name:maxCount:cutCount} template #{/for:name}
 *  add syntax > #{if:name sign value} template #{/if:name}
 */
(function(){
	
	function evaluate(data, tpl) {
		if (!data) {
			return '';
		}
		if (tpl.indexOf("\{if:") > -1) {
			tpl = tpl.replace(/#\{if:([_\w]+)([=><!]+)([_'"\-\w]+)\}([\s\S]*?)#\{\/if:\1\}/gm, function(full, start, sign, value, condtpl){
				if (data[start] == null) {
					return full;
				}
				var _condition = false;
				try {
					sign = ((sign=="=")? "==": sign);
					var _left = "\"" + (data[start] + "").replace(/['"]/g, "") + "\"";
					var _right = "\"" + value.replace(/['"]/g, "") + "\"";
					eval("_condition = (" + _left + sign + _right + ")");
				}catch(e) { _condition = false; }
				if(_condition) {
					return evaluate(data, condtpl);
				} else {
					return "";
				}
			});
		}
		if (tpl.indexOf("\{for:") > -1) {
			tpl = tpl.replace(/#\{for:([_\w]+):?(\d*):?(\d*)\}([\s\S]*?)#\{\/for:\1\}/gm, function(full, start, maxCnt, cutCnt, looptpl) {
				if (!data[start] || !data[start].length) {
					return full;
				}
				var _list = data[start];
				var _listTpl = [];
				maxCnt = !!maxCnt? (isNaN(maxCnt)? _list.length: parseInt(maxCnt)): _list.length;
				cutCnt = !!cutCnt? (isNaN(cutCnt)? 0: parseInt(cutCnt)): 0;
				for (var i = 0, len = Math.min(_list.length, maxCnt); i < len; i++) {
					_listTpl.push(evaluate(_list[i], looptpl));
				}
				return _listTpl.join("").substring(cutCnt);
			});
		}
		return tpl.replace(/#\{([_\w]+)\}/g, function(full, name) {
			if(data[name] != null) {
				return data[name];
			} else {
				return full;
			}
		});
	}
	
	window.Template = function(template) {
		this.template = template;
	};
	
	Template.prototype.evaluate = function(data) {
		return evaluate(data, this.template);
	};
	
	Template.prototype.evaluateToDom = function(data, element) {
		if(typeof(element) === 'string') {
			element = document.getElementById(element);
		}
		element.innerHTML = evaluate(data, this.template);
	};
	
	Template.prototype.evaluateAsDom = function(data, context) {
		var _tmpNode = (context || document).createElement('div');
		_tmpNode.innerHTML = evaluate(data, this.template);
		return _tmpNode.firstChild;
	};

})();
/**
 * DomGetty - Very Very Simple Dom Selector Engine
 * - id : #
 * - class : .
 * - tag : tagname
 */
(function(){
	var m, el, els;
	var filters = {
		'#': function(cnxt, expr){
			if ((m = /(\S*)#(\S+)/.exec(expr)) !== null) {
				var tag = m[1];
				var id = m[2];
				if(!cnxt.getElementById) { //ie
					cnxt = cnxt.ownerDocument;
				}
				if (el = cnxt.getElementById(id)) {
					if (tag.length < 1 || el.nodeName.toLowerCase() == tag) {
						return [el];
					}
				}
			}
			return [];
		},
		'.': function(cnxt, expr){
			if ((m = /(\S*)\.(\S+)/.exec(expr)) !== null) {
				var tag = ((m[1] === "") ? "*" : m[1]);
				var klass = m[2];
				if ((els = cnxt.getElementsByTagName(tag)).length > 0) {
					var results = [];
					for (var i=0; i<els.length; i++) {
						var el = els[i];
						if ( (new RegExp("(^| )" + klass + "($| )")).test(el.className)) {
							results.push(el);
						}
					}
					return results;
				}
			}
			return [];
		},
		'*': function(cnxt, expr){
			if ((els = cnxt.getElementsByTagName(expr)).length > 0) {
				var results = [];
				for (var i=0; i<els.length; i++) {
					results.push(els[i]);
				}
				return results;
			}
			return [];
		}
	};
	
	var match = function(cnxt, expr) {
		if(cnxt.length < 1) {
			return [];
		}
		var fltr;
		if ((f = /(\.|#)/.exec(expr)) !== null) {
			if(filters[f[1]]) {
				fltr = f[1];
			}
		}
		fltr = fltr || "*";
		var results = [];
		for(var i=0; i<cnxt.length; i++) {
			results = results.concat(filters[fltr](cnxt[i], expr));
		} 
		return results;
	}
	
	var collect = function(cnxt, expr) {
		var els = [cnxt];
		var exprs = expr.split(" ");
		for (var j = 0; j < exprs.length; j++) {
			els = match(els, exprs[j]);
		}
		return els;
	}
	
	var DomGetty = function(context, selector, all) {
		all = !!all;
		if ( context.nodeType !== 1 && context.nodeType !== 9 ) {
			return (all? []: null);
		}
		if ( !selector || typeof selector !== "string" ) {
			return (all? []: null);
		}

		var els;
		var mathes = [];
		var exprs = selector.split(",");
		for (var i = 0; i < exprs.length; i++) {
			els = collect(context, exprs[i]);
			if(els && els.length > 0) {
				mathes = mathes.concat(els);
				if(!all) {
					break;
				}
			}
		}
		if(all) {
			return mathes;
		} else {
			return mathes[0];
		} 
	};
 
	/**
	 * Get Element By Css Selector
	 * 
	 * dGetty(element, selector) or dGetty(selector)
	 * ex)
	 *  dGetty(document, "#wrapper div.article")
	 *  dGetty($tx("#wrapper"), "div.article")
	 *  dGetty("#wrapper div.article") -> default document
	 */
	window.dGetty = function() {
		if(arguments.length == 1) {
			if(typeof (arguments[0]) === "string") {
				return DomGetty(document, arguments[0]);
			}
		} else if(arguments.length == 2) {
			if(arguments[0].nodeType && typeof (arguments[1]) === "string") {
				return DomGetty(arguments[0], arguments[1]);
			}
		}
		return null;
	};
	
	/**
	 * Get Element List By Css Selector
	 * 
	 * dGetties(element, selector) or dGetties(selector)
	 * ex)
	 *  dGetties(document, "#wrapper div.article")
	 *  dGetties($tx("#wrapper"), "div.article")
	 *  dGetties("#wrapper div.article") -> default document
	 */
	window.dGetties = function() {
		if(arguments.length == 1) {
			if(typeof (arguments[0]) === "string") {
				return DomGetty(document, arguments[0], true);
			}
		} else if(arguments.length == 2) {
			if(arguments[0].nodeType && typeof (arguments[1]) === "string") {
				return DomGetty(arguments[0], arguments[1], true);
			}
		}
		return [];
	};
	
})();	

/**
 * DomChecky - Very Very Simple Dom Check Engine By Selector
 * - id : #
 * - class : .
 * - tag : tagname
 */
(function(){
	var m, el, els;
	var filters = {
		'#': function(cnxt, expr){
			if ((m = /(\S*)#(\S+)/.exec(expr)) !== null) {
				var tag = m[1];
				var id = m[2];
				if (tag.length < 1 || cnxt.nodeName.toLowerCase() == tag) {
					if (cnxt.id == id) {
						return true;
					}
				}
			}
			return false;
		},
		'.': function(cnxt, expr){
			if ((m = /(\S*)\.(\S+)/.exec(expr)) !== null) {
				var tag = m[1];
				var klass = m[2];
				if (tag.length < 1 || cnxt.nodeName.toLowerCase() == tag) {
					if (cnxt.className.indexOf(klass) > -1) {
						return true;
					}
				}
			}
			return false;
		},
		'*': function(cnxt, expr){
			var tag = expr;
			if (cnxt.nodeName.toLowerCase() == tag) {
				return true;
			}
			return false;
		}
	};
	
	var check = function(cnxt, expr) {
		var fltr;
		if ((f = /(\.|#)/.exec(expr)) !== null) {
			if(filters[f[1]]) {
				fltr = f[1];
			}
		}
		fltr = fltr || "*";
		return filters[fltr](cnxt, expr);
	}
	
	var DomChecky = function(context, selector) {
		if ( context.nodeType !== 1) {
			return false;
		}

		var found = false;
		var exprs = selector.split(",");
		for (var i = 0; i < exprs.length; i++) {
			found = check(context, exprs[i]);
			if(found) {
				break;
			}
		}
		return found;
	};
	
	/**
	 * Check Element By Css Selector
	 * @returns boolean
	 * 
	 * dChecky(element, selector)
	 * ex)
	 *  dChecky(document, "#wrapper")
	 */
	window.dChecky = function() {
		if(arguments.length == 2) {
			if(arguments[0].nodeType && typeof (arguments[1]) === "string") {
				return DomChecky(arguments[0], arguments[1]);
			}
		}
		return false;
	};

})();
/**
 * DomFindy - Very Very Simple Dom Selector Engine, But find ancestor
 * - id : #
 * - class : .
 * - tag : tagname
 */
(function(){
	var m, el, els;
	var filters = {
		'#': function(cnxt, expr){
			if ((m = /(\S*)#(\S+)/.exec(expr)) !== null) {
				var tag = ((m[1] === "") ? "*" : m[1]);
				var id = m[2];
				var _node = cnxt;
				while(_node) {
					if(_node.nodeName.toLowerCase() == "body") {
						break;
					}
					if (tag == "*" || _node.nodeName.toLowerCase() == tag) {
						if (_node.id == id) {
							return _node;
						}
					}
					_node = _node.parentNode;
				}
			}
			return null;
		},
		'.': function(cnxt, expr){
			if ((m = /(\S*)\.(\S+)/.exec(expr)) !== null) {
				var tag = ((m[1] === "") ? "*" : m[1]);
				var klass = m[2];
				var _node = cnxt;
				while(_node) {
					if(_node.nodeName.toLowerCase() == "body") {
						break;
					}
					if (tag == "*" || _node.nodeName.toLowerCase() == tag) {
						if (_node.className.indexOf(klass) > -1) {
							return _node;
						}
					}
					_node = _node.parentNode;
				}
			}
			return null;
		},
		'*': function(cnxt, expr){
			var _node = cnxt;
			var map = {};
			var exprs = expr.split(",");
			for (var i=0,len=exprs.length; i<len; i++) {
				map[exprs[i]] = true;
			}
			while(_node) {
				if(_node.nodeName.toLowerCase() == "body") {
					break;
				}
				if (map[_node.nodeName.toLowerCase()]) {
					return _node;
				}
				_node = _node.parentNode;
			}
			return null;
		}
	};
	
	var find = function(cnxt, expr) {
		var fltr;
		if ((f = /(\.|#|:\w+)/.exec(expr)) !== null) {
			if(filters[f[1]]) {
				fltr = f[1];
			}
		}
		fltr = fltr || "*";
		var result = null;
		if((result = filters[fltr](cnxt, expr)) != null) {
			return result;
		};
		return null;
	}
	
	var DomFindy = function(context, selector) {
		if ( !selector || typeof selector !== "string" ) {
			return null;
		}
		
		var els = context;
		var exprs = selector.split(" ");
		for(var i=0,len=exprs.length; i<len; i++) {
			if((els = find(els, exprs[i])) == null) {
				return null;
			}
		} 
		return els;
		/*
		if (els.length < 1) {
			return null;
		} else if (els.length < 2) {
			return els[0];
		} else {
			return els;
		}*/
	};
 
	/**
	 * Find Ancestor Element By Css Selector
	 * 
	 * dFindy(element, selector) or dFindy(selector)
	 * ex)
	 *  dFindy($tx("#wrapper"), "div.article")
	 *  dFindy("#wrapper div.article") -> default document
	 */
	window.dFindy = function() {
		if(arguments.length == 1) {
			throw new Error("need more arguments");
		} else if(arguments.length == 2) {
			if(arguments[0].nodeType && typeof (arguments[1]) === "string") {
				return DomFindy(arguments[0], arguments[1]);
			}
		}
		return null;
	};
})();
/**
 * XMLGetty - Very Very Simple XML Dom Selector Engine By XPath
 * - xpath
 */
(function(){
	
	var XMLGetty = function(node){
		this.selectSingleNode = function(path) {
			if(!node) {
				return null;
			}
			return node.selectSingleNode(path);
		};
		this.selectNodes = function(path) {
			if(!node) {
				return [];
			}
			return node.selectNodes(path);
		};
		this.getAttributeNode = function(name) {
			if(!node) {
				return null;
			}
			return node.getAttributeNode(name);
		};
		this.hasChildNodes = function() {
			if(!node) {
				return false;
			}
			return node.hasChildNodes();
		};
		this.text = node? (node.textContent || node.text) : null;
		this.type = node? node.nodeType : 0;
		this.name = (node && node.nodeType == 1)? (node.nodeName || "") : "";
		return this;
	};
	
	XMLGetty.prototype = {
		'xText': function(defval){
			defval = defval || "";
			var _val = this.text;
			_val = (_val || "").trim();
			
			if (_val === "") {
				return defval;
			} else {
				if (typeof(defval) === 'number') {
					return (isNaN(_val) ? 0 : parseInt(_val));
				} else if (typeof(defval) === 'boolean') {
					return !!_val;
				} else {
					return _val;
				}
			}
		},
		'xAttr': function(name, defval){
			defval = defval || "";
			var _attr = this.getAttributeNode(name);
			var _val = (!_attr) ? "" : _attr.nodeValue.trim();
			if (_val === "") {
				return defval;
			} else {
				if (typeof(defval) === 'number') {
					return (isNaN(_val) ? 0 : parseInt(_val));
				} else if (typeof(defval) === 'boolean') {
					return !!_val;
				} else {
					return _val;
				}
			}
		},
		'xGet': function(path){
			return xGetty(this, path);
		},
		'xGets': function(path){
			return xGetties(this, path);
		}
	};
	
	var ieXmlParsers = [
		"MSXML2.DOMDocument.6.0",
		"MSXML2.DOMDocument.5.0",
		"MSXML2.DOMDocument.4.0",
		"MSXML4.DOMDocument",
		"MSXML3.DOMDocument",
		"MSXML2.DOMDocument",
		"MSXML.DOMDocument",
		"Microsoft.XmlDom"
	];
	/**
	 * xCreate : Get XML DOM From XML Text
	 * @example
	 * var _xmlDoc = xCreate("<data><name>hopeserver</name></data>");
	 * 
	 * @param {string} text - responseText
	 * @return node 
	 * 			extend function as xText, xAttr, xGet, xGets
	 */
	window.xCreate = function(text) {
		if(!!(window.attachEvent && !window.opera)) {
			var xObj = (function() {
				var _xObj = null;
				for(var i=0; i<ieXmlParsers.length; i++) {
					try {
						_xObj = new ActiveXObject(ieXmlParsers[i]);
					} catch (e) {}
					if(_xObj !== null) {
						return _xObj;
					}
				}
				return null;
			})();
			if(xObj === null){
				return null;
			}
			xObj.async = false;
			xObj.loadXML(text);
			if (xObj.parseError.errorCode !== 0) {
				return null;
			}
			return new XMLGetty(xObj);
		} else {
			var oParser = new DOMParser();
			var xObj = oParser.parseFromString(new String(text), "text/xml");
			return new XMLGetty(xObj);
		}
	};

	/**
	 * xGetty : Get Node By Xpath
	 * @example
	 * var _node = xGetty(node, "/rss/items/title")
	 * 
	 * @param {element} node - node
	 * @param {string} path - xpath expression
	 * 
	 * @return node 
	 * 			node extends function as xText, xAttr, xGet, xGets
	 */
	window.xGetty = function(node, path) {
		if(node === null) {
			return null;
		}
		return new XMLGetty(node.selectSingleNode(path));
	};
	
	/**
	 * xGetties : Get Node List By Xpath
	 * @example
	 * var _nodelist = xGetties(node, "/rss/items/title")
	 * 
	 * @param {element} node - node
	 * @param {string} path - xpath expression
	 * 
	 * @return node array
	 * 			each node extends function as xText, xAttr, xGet, xGets
	 */
	window.xGetties = function(node, path) {
		if(node === null) {
			return [];
		}
		var list = []
		var nodes = node.selectNodes(path);
		for(var i=0, len=nodes.length; i<len; i++) {
			list.push(new XMLGetty(nodes[i]));
		}
		return list;
	};

})();/**
 * DateFormat - date/time formatting class, similar to java.text.SimpleDateFormat
 */
(function(){
	
	var PtrnOfFormat = {
		"yyyy": /(\d{4})/,
		"MM": /(\d{2})/,
		"dd": /(\d{2})/,
		"HH": /(\d{2})/,
		"mm": /(\d{2})/,
		"ss": /(\d{2})/,
		"yy": /(\d{2})/,
		"M": /([0-1]*\d)/,
		"d": /([0-3]*\d)/,
		"EEE": /(\uc77c|\uc6d4|\ud654|\uc218|\ubaa9|\uae08|\ud1a0)/
	};
	var DayOfWeek = ['\uc77c','\uc6d4','\ud654','\uc218','\ubaa9','\uae08','\ud1a0'];
	
	/**
	 * DateFormat
	 * 
	 * pattern = yyyy-MM-dd HH:mm:ss
	 */
	function DateFormat(pattern) {
		this.pattern = pattern;
	}
	
	DateFormat.prototype = {
		/**
		 * parse(text) : text -> date
		 * Parses text from the beginning of the given string to produce a date. 
		 * ex)
		 *  new DateFormat("yyyy-MM-dd").parse("2009-07-08")
		 */
		parse: function(source) {
			var _map = {};
			this.pattern.replace(/(\w)\1*/g, function(unitPtrn) { 
				if(PtrnOfFormat[unitPtrn]) {
					source = source.replace(PtrnOfFormat[unitPtrn], function(full, unit) {
						_map[unitPtrn] = unit;
						return "";
					});
				}
				return unitPtrn;
			});
			
			return new Date(Date.parse([
				Math.max(1, parseInt(_map['MM'] || _map['M'] || "01", 10)),
				"/",
				Math.max(1, parseInt(_map['dd'] || _map['d'] || "01", 10)),
				"/",
				(_map['yyyy'] || _map['yy'] || new Date().getFullYear()),
				" ",
				_map['HH'] || "00",
				":",
				_map['mm'] || "00",
				":",
				_map['ss'] || "00"
			].join("")));
		},
		/**
		 * format(date) : date -> text
		 * Formats a Date into a date/time string.
		 * ex)
		 *  new DateFormat("yyyy-MM-dd").format(new Date())
		 */
		format: function(date) { 
			return this.pattern.replace("yyyy", date.getFullYear())
				.replace("MM", (date.getMonth() + 1).toPaddedString(2))
				.replace("dd", date.getDate().toPaddedString(2))
				.replace("HH", date.getHours().toPaddedString(2))
				.replace("mm", date.getMinutes().toPaddedString(2))
				.replace("ss", date.getSeconds().toPaddedString(2))
				.replace("yy", date.getYear())
				.replace("M", date.getMonth() + 1)
				.replace("d", date.getDate())
				.replace("EEE", DayOfWeek[date.getDay()]);
		}
	};

	window.DateFormat = DateFormat;

})();
/*!	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/

var swfobject = function() {
	
	var UNDEF = "undefined",
		OBJECT = "object",
		SHOCKWAVE_FLASH = "Shockwave Flash",
		SHOCKWAVE_FLASH_AX = "ShockwaveFlash.ShockwaveFlash",
		FLASH_MIME_TYPE = "application/x-shockwave-flash",
		EXPRESS_INSTALL_ID = "SWFObjectExprInst",
		ON_READY_STATE_CHANGE = "onreadystatechange",
		
		win = window,
		doc = document,
		nav = navigator,
		
		plugin = false,
		domLoadFnArr = [main],
		regObjArr = [],
		objIdArr = [],
		listenersArr = [],
		storedAltContent,
		storedAltContentId,
		storedCallbackFn,
		storedCallbackObj,
		isDomLoaded = false,
		isExpressInstallActive = false,
		dynamicStylesheet,
		dynamicStylesheetMedia,
		autoHideShow = true,
	
	/* Centralized function for browser feature detection
		- User agent string detection is only used when no good alternative is possible
		- Is executed directly for optimal performance
	*/	
	ua = function() {
		var w3cdom = typeof doc.getElementById != UNDEF && typeof doc.getElementsByTagName != UNDEF && typeof doc.createElement != UNDEF,
			u = nav.userAgent.toLowerCase(),
			p = nav.platform.toLowerCase(),
			windows = p ? /win/.test(p) : /win/.test(u),
			mac = p ? /mac/.test(p) : /mac/.test(u),
			webkit = /webkit/.test(u) ? parseFloat(u.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false, // returns either the webkit version or false if not webkit
			ie = !+"\v1", // feature detection based on Andrea Giammarchi's solution: http://webreflection.blogspot.com/2009/01/32-bytes-to-know-if-your-browser-is-ie.html
			playerVersion = [0,0,0],
			d = null;
		if (typeof nav.plugins != UNDEF && typeof nav.plugins[SHOCKWAVE_FLASH] == OBJECT) {
			d = nav.plugins[SHOCKWAVE_FLASH].description;
			if (d && !(typeof nav.mimeTypes != UNDEF && nav.mimeTypes[FLASH_MIME_TYPE] && !nav.mimeTypes[FLASH_MIME_TYPE].enabledPlugin)) { // navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin indicates whether plug-ins are enabled or disabled in Safari 3+
				plugin = true;
				ie = false; // cascaded feature detection for Internet Explorer
				d = d.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
				playerVersion[0] = parseInt(d.replace(/^(.*)\..*$/, "$1"), 10);
				playerVersion[1] = parseInt(d.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
				playerVersion[2] = /[a-zA-Z]/.test(d) ? parseInt(d.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0;
			}
		}
		else if (typeof win.ActiveXObject != UNDEF) {
			try {
				var a = new ActiveXObject(SHOCKWAVE_FLASH_AX);
				if (a) { // a will return null when ActiveX is disabled
					d = a.GetVariable("$version");
					if (d) {
						ie = true; // cascaded feature detection for Internet Explorer
						d = d.split(" ")[1].split(",");
						playerVersion = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
					}
				}
			}
			catch(e) {}
		}
		return { w3:w3cdom, pv:playerVersion, wk:webkit, ie:ie, win:windows, mac:mac };
	}(),
	
	/* Cross-browser onDomLoad
		- Will fire an event as soon as the DOM of a web page is loaded
		- Internet Explorer workaround based on Diego Perini's solution: http://javascript.nwbox.com/IEContentLoaded/
		- Regular onload serves as fallback
	*/ 
	onDomLoad = function() {
		if (!ua.w3) { return; }
		if ((typeof doc.readyState != UNDEF && doc.readyState == "complete") || (typeof doc.readyState == UNDEF && (doc.getElementsByTagName("body")[0] || doc.body))) { // function is fired after onload, e.g. when script is inserted dynamically 
			callDomLoadFunctions();
		}
		if (!isDomLoaded) {
			if (typeof doc.addEventListener != UNDEF) {
				doc.addEventListener("DOMContentLoaded", callDomLoadFunctions, false);
			}		
			if (ua.ie && ua.win) {
				doc.attachEvent(ON_READY_STATE_CHANGE, function() {
					if (doc.readyState == "complete") {
						doc.detachEvent(ON_READY_STATE_CHANGE, arguments.callee);
						callDomLoadFunctions();
					}
				});
				if (win == top) { // if not inside an iframe
					(function(){
						if (isDomLoaded) { return; }
						try {
							doc.documentElement.doScroll("left");
						}
						catch(e) {
							setTimeout(arguments.callee, 0);
							return;
						}
						callDomLoadFunctions();
					})();
				}
			}
			if (ua.wk) {
				(function(){
					if (isDomLoaded) { return; }
					if (!/loaded|complete/.test(doc.readyState)) {
						setTimeout(arguments.callee, 0);
						return;
					}
					callDomLoadFunctions();
				})();
			}
			addLoadEvent(callDomLoadFunctions);
		}
	}();
	
	function callDomLoadFunctions() {
		if (isDomLoaded) { return; }
		try { // test if we can really add/remove elements to/from the DOM; we don't want to fire it too early
			var t = doc.getElementsByTagName("body")[0].appendChild(createElement("span"));
			t.parentNode.removeChild(t);
		}
		catch (e) { return; }
		isDomLoaded = true;
		var dl = domLoadFnArr.length;
		for (var i = 0; i < dl; i++) {
			domLoadFnArr[i]();
		}
	}
	
	function addDomLoadEvent(fn) {
		if (isDomLoaded) {
			fn();
		}
		else { 
			domLoadFnArr[domLoadFnArr.length] = fn; // Array.push() is only available in IE5.5+
		}
	}
	
	/* Cross-browser onload
		- Based on James Edwards' solution: http://brothercake.com/site/resources/scripts/onload/
		- Will fire an event as soon as a web page including all of its assets are loaded 
	 */
	function addLoadEvent(fn) {
		if (typeof win.addEventListener != UNDEF) {
			win.addEventListener("load", fn, false);
		}
		else if (typeof doc.addEventListener != UNDEF) {
			doc.addEventListener("load", fn, false);
		}
		else if (typeof win.attachEvent != UNDEF) {
			addListener(win, "onload", fn);
		}
		else if (typeof win.onload == "function") {
			var fnOld = win.onload;
			win.onload = function() {
				fnOld();
				fn();
			};
		}
		else {
			win.onload = fn;
		}
	}
	
	/* Main function
		- Will preferably execute onDomLoad, otherwise onload (as a fallback)
	*/
	function main() { 
		if (plugin) {
			testPlayerVersion();
		}
		else {
			matchVersions();
		}
	}
	
	/* Detect the Flash Player version for non-Internet Explorer browsers
		- Detecting the plug-in version via the object element is more precise than using the plugins collection item's description:
		  a. Both release and build numbers can be detected
		  b. Avoid wrong descriptions by corrupt installers provided by Adobe
		  c. Avoid wrong descriptions by multiple Flash Player entries in the plugin Array, caused by incorrect browser imports
		- Disadvantage of this method is that it depends on the availability of the DOM, while the plugins collection is immediately available
	*/
	function testPlayerVersion() {
		var b = doc.getElementsByTagName("body")[0];
		var o = createElement(OBJECT);
		o.setAttribute("type", FLASH_MIME_TYPE);
		var t = b.appendChild(o);
		if (t) {
			var counter = 0;
			(function(){
				if (typeof t.GetVariable != UNDEF) {
					var d = t.GetVariable("$version");
					if (d) {
						d = d.split(" ")[1].split(",");
						ua.pv = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
					}
				}
				else if (counter < 10) {
					counter++;
					setTimeout(arguments.callee, 10);
					return;
				}
				b.removeChild(o);
				t = null;
				matchVersions();
			})();
		}
		else {
			matchVersions();
		}
	}
	
	/* Perform Flash Player and SWF version matching; static publishing only
	*/
	function matchVersions() {
		var rl = regObjArr.length;
		if (rl > 0) {
			for (var i = 0; i < rl; i++) { // for each registered object element
				var id = regObjArr[i].id;
				var cb = regObjArr[i].callbackFn;
				var cbObj = {success:false, id:id};
				if (ua.pv[0] > 0) {
					var obj = getElementById(id);
					if (obj) {
						if (hasPlayerVersion(regObjArr[i].swfVersion) && !(ua.wk && ua.wk < 312)) { // Flash Player version >= published SWF version: Houston, we have a match!
							setVisibility(id, true);
							if (cb) {
								cbObj.success = true;
								cbObj.ref = getObjectById(id);
								cb(cbObj);
							}
						}
						else if (regObjArr[i].expressInstall && canExpressInstall()) { // show the Adobe Express Install dialog if set by the web page author and if supported
							var att = {};
							att.data = regObjArr[i].expressInstall;
							att.width = obj.getAttribute("width") || "0";
							att.height = obj.getAttribute("height") || "0";
							if (obj.getAttribute("class")) { att.styleclass = obj.getAttribute("class"); }
							if (obj.getAttribute("align")) { att.align = obj.getAttribute("align"); }
							// parse HTML object param element's name-value pairs
							var par = {};
							var p = obj.getElementsByTagName("param");
							var pl = p.length;
							for (var j = 0; j < pl; j++) {
								if (p[j].getAttribute("name").toLowerCase() != "movie") {
									par[p[j].getAttribute("name")] = p[j].getAttribute("value");
								}
							}
							showExpressInstall(att, par, id, cb);
						}
						else { // Flash Player and SWF version mismatch or an older Webkit engine that ignores the HTML object element's nested param elements: display alternative content instead of SWF
							displayAltContent(obj);
							if (cb) { cb(cbObj); }
						}
					}
				}
				else {	// if no Flash Player is installed or the fp version cannot be detected we let the HTML object element do its job (either show a SWF or alternative content)
					setVisibility(id, true);
					if (cb) {
						var o = getObjectById(id); // test whether there is an HTML object element or not
						if (o && typeof o.SetVariable != UNDEF) { 
							cbObj.success = true;
							cbObj.ref = o;
						}
						cb(cbObj);
					}
				}
			}
		}
	}
	
	function getObjectById(objectIdStr) {
		var r = null;
		var o = getElementById(objectIdStr);
		if (o && o.nodeName == "OBJECT") {
			if (typeof o.SetVariable != UNDEF) {
				r = o;
			}
			else {
				var n = o.getElementsByTagName(OBJECT)[0];
				if (n) {
					r = n;
				}
			}
		}
		return r;
	}
	
	/* Requirements for Adobe Express Install
		- only one instance can be active at a time
		- fp 6.0.65 or higher
		- Win/Mac OS only
		- no Webkit engines older than version 312
	*/
	function canExpressInstall() {
		return !isExpressInstallActive && hasPlayerVersion("6.0.65") && (ua.win || ua.mac) && !(ua.wk && ua.wk < 312);
	}
	
	/* Show the Adobe Express Install dialog
		- Reference: http://www.adobe.com/cfusion/knowledgebase/index.cfm?id=6a253b75
	*/
	function showExpressInstall(att, par, replaceElemIdStr, callbackFn) {
		isExpressInstallActive = true;
		storedCallbackFn = callbackFn || null;
		storedCallbackObj = {success:false, id:replaceElemIdStr};
		var obj = getElementById(replaceElemIdStr);
		if (obj) {
			if (obj.nodeName == "OBJECT") { // static publishing
				storedAltContent = abstractAltContent(obj);
				storedAltContentId = null;
			}
			else { // dynamic publishing
				storedAltContent = obj;
				storedAltContentId = replaceElemIdStr;
			}
			att.id = EXPRESS_INSTALL_ID;
			if (typeof att.width == UNDEF || (!/%$/.test(att.width) && parseInt(att.width, 10) < 310)) { att.width = "310"; }
			if (typeof att.height == UNDEF || (!/%$/.test(att.height) && parseInt(att.height, 10) < 137)) { att.height = "137"; }
			doc.title = doc.title.slice(0, 47) + " - Flash Player Installation";
			var pt = ua.ie && ua.win ? "ActiveX" : "PlugIn",
				fv = "MMredirectURL=" + win.location.toString().replace(/&/g,"%26") + "&MMplayerType=" + pt + "&MMdoctitle=" + doc.title;
			if (typeof par.flashvars != UNDEF) {
				par.flashvars += "&" + fv;
			}
			else {
				par.flashvars = fv;
			}
			// IE only: when a SWF is loading (AND: not available in cache) wait for the readyState of the object element to become 4 before removing it,
			// because you cannot properly cancel a loading SWF file without breaking browser load references, also obj.onreadystatechange doesn't work
			if (ua.ie && ua.win && obj.readyState != 4) {
				var newObj = createElement("div");
				replaceElemIdStr += "SWFObjectNew";
				newObj.setAttribute("id", replaceElemIdStr);
				obj.parentNode.insertBefore(newObj, obj); // insert placeholder div that will be replaced by the object element that loads expressinstall.swf
				obj.style.display = "none";
				(function(){
					if (obj.readyState == 4) {
						obj.parentNode.removeChild(obj);
					}
					else {
						setTimeout(arguments.callee, 10);
					}
				})();
			}
			createSWF(att, par, replaceElemIdStr);
		}
	}
	
	/* Functions to abstract and display alternative content
	*/
	function displayAltContent(obj) {
		if (ua.ie && ua.win && obj.readyState != 4) {
			// IE only: when a SWF is loading (AND: not available in cache) wait for the readyState of the object element to become 4 before removing it,
			// because you cannot properly cancel a loading SWF file without breaking browser load references, also obj.onreadystatechange doesn't work
			var el = createElement("div");
			obj.parentNode.insertBefore(el, obj); // insert placeholder div that will be replaced by the alternative content
			el.parentNode.replaceChild(abstractAltContent(obj), el);
			obj.style.display = "none";
			(function(){
				if (obj.readyState == 4) {
					obj.parentNode.removeChild(obj);
				}
				else {
					setTimeout(arguments.callee, 10);
				}
			})();
		}
		else {
			obj.parentNode.replaceChild(abstractAltContent(obj), obj);
		}
	} 

	function abstractAltContent(obj) {
		var ac = createElement("div");
		if (ua.win && ua.ie) {
			ac.innerHTML = obj.innerHTML;
		}
		else {
			var nestedObj = obj.getElementsByTagName(OBJECT)[0];
			if (nestedObj) {
				var c = nestedObj.childNodes;
				if (c) {
					var cl = c.length;
					for (var i = 0; i < cl; i++) {
						if (!(c[i].nodeType == 1 && c[i].nodeName == "PARAM") && !(c[i].nodeType == 8)) {
							ac.appendChild(c[i].cloneNode(true));
						}
					}
				}
			}
		}
		return ac;
	}
	
	/* Cross-browser dynamic SWF creation
	*/
	function createSWF(attObj, parObj, id) {
		var r, el = getElementById(id);
		if (ua.wk && ua.wk < 312) { return r; }
		if (el) {
			if (typeof attObj.id == UNDEF) { // if no 'id' is defined for the object element, it will inherit the 'id' from the alternative content
				attObj.id = id;
			}
			if (ua.ie && ua.win) { // Internet Explorer + the HTML object element + W3C DOM methods do not combine: fall back to outerHTML
				var att = "";
				for (var i in attObj) {
					if (attObj[i] != Object.prototype[i]) { // filter out prototype additions from other potential libraries
						if (i.toLowerCase() == "data") {
							parObj.movie = attObj[i];
						}
						else if (i.toLowerCase() == "styleclass") { // 'class' is an ECMA4 reserved keyword
							att += ' class="' + attObj[i] + '"';
						}
						else if (i.toLowerCase() != "classid") {
							att += ' ' + i + '="' + attObj[i] + '"';
						}
					}
				}
				var par = "";
				for (var j in parObj) {
					if (parObj[j] != Object.prototype[j]) { // filter out prototype additions from other potential libraries
						par += '<param name="' + j + '" value="' + parObj[j] + '" />';
					}
				}
				el.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + att + '>' + par + '</object>';
				objIdArr[objIdArr.length] = attObj.id; // stored to fix object 'leaks' on unload (dynamic publishing only)
				r = getElementById(attObj.id);	
			}
			else { // well-behaving browsers
				var o = createElement(OBJECT);
				o.setAttribute("type", FLASH_MIME_TYPE);
				for (var m in attObj) {
					if (attObj[m] != Object.prototype[m]) { // filter out prototype additions from other potential libraries
						if (m.toLowerCase() == "styleclass") { // 'class' is an ECMA4 reserved keyword
							o.setAttribute("class", attObj[m]);
						}
						else if (m.toLowerCase() != "classid") { // filter out IE specific attribute
							o.setAttribute(m, attObj[m]);
						}
					}
				}
				for (var n in parObj) {
					if (parObj[n] != Object.prototype[n] && n.toLowerCase() != "movie") { // filter out prototype additions from other potential libraries and IE specific param element
						createObjParam(o, n, parObj[n]);
					}
				}
				el.parentNode.replaceChild(o, el);
				r = o;
			}
		}
		return r;
	}
	
	function createObjParam(el, pName, pValue) {
		var p = createElement("param");
		p.setAttribute("name", pName);	
		p.setAttribute("value", pValue);
		el.appendChild(p);
	}
	
	/* Cross-browser SWF removal
		- Especially needed to safely and completely remove a SWF in Internet Explorer
	*/
	function removeSWF(id) {
		var obj = getElementById(id);
		if (obj && obj.nodeName == "OBJECT") {
			if (ua.ie && ua.win) {
				obj.style.display = "none";
				(function(){
					if (obj.readyState == 4) {
						removeObjectInIE(id);
					}
					else {
						setTimeout(arguments.callee, 10);
					}
				})();
			}
			else {
				obj.parentNode.removeChild(obj);
			}
		}
	}
	
	function removeObjectInIE(id) {
		var obj = getElementById(id);
		if (obj) {
			for (var i in obj) {
				if (typeof obj[i] == "function") {
					obj[i] = null;
				}
			}
			obj.parentNode.removeChild(obj);
		}
	}
	
	/* Functions to optimize JavaScript compression
	*/
	function getElementById(id) {
		var el = null;
		try {
			el = doc.getElementById(id);
		}
		catch (e) {}
		return el;
	}
	
	function createElement(el) {
		return doc.createElement(el);
	}
	
	/* Updated attachEvent function for Internet Explorer
		- Stores attachEvent information in an Array, so on unload the detachEvent functions can be called to avoid memory leaks
	*/	
	function addListener(target, eventType, fn) {
		target.attachEvent(eventType, fn);
		listenersArr[listenersArr.length] = [target, eventType, fn];
	}
	
	/* Flash Player and SWF content version matching
	*/
	function hasPlayerVersion(rv) {
		var pv = ua.pv, v = rv.split(".");
		v[0] = parseInt(v[0], 10);
		v[1] = parseInt(v[1], 10) || 0; // supports short notation, e.g. "9" instead of "9.0.0"
		v[2] = parseInt(v[2], 10) || 0;
		return (pv[0] > v[0] || (pv[0] == v[0] && pv[1] > v[1]) || (pv[0] == v[0] && pv[1] == v[1] && pv[2] >= v[2])) ? true : false;
	}
	
	/* Cross-browser dynamic CSS creation
		- Based on Bobby van der Sluis' solution: http://www.bobbyvandersluis.com/articles/dynamicCSS.php
	*/	
	function createCSS(sel, decl, media, newStyle) {
		if (ua.ie && ua.mac) { return; }
		var h = doc.getElementsByTagName("head")[0];
		if (!h) { return; } // to also support badly authored HTML pages that lack a head element
		var m = (media && typeof media == "string") ? media : "screen";
		if (newStyle) {
			dynamicStylesheet = null;
			dynamicStylesheetMedia = null;
		}
		if (!dynamicStylesheet || dynamicStylesheetMedia != m) { 
			// create dynamic stylesheet + get a global reference to it
			var s = createElement("style");
			s.setAttribute("type", "text/css");
			s.setAttribute("media", m);
			dynamicStylesheet = h.appendChild(s);
			if (ua.ie && ua.win && typeof doc.styleSheets != UNDEF && doc.styleSheets.length > 0) {
				dynamicStylesheet = doc.styleSheets[doc.styleSheets.length - 1];
			}
			dynamicStylesheetMedia = m;
		}
		// add style rule
		if (ua.ie && ua.win) {
			if (dynamicStylesheet && typeof dynamicStylesheet.addRule == OBJECT) {
				dynamicStylesheet.addRule(sel, decl);
			}
		}
		else {
			if (dynamicStylesheet && typeof doc.createTextNode != UNDEF) {
				dynamicStylesheet.appendChild(doc.createTextNode(sel + " {" + decl + "}"));
			}
		}
	}
	
	function setVisibility(id, isVisible) {
		if (!autoHideShow) { return; }
		var v = isVisible ? "visible" : "hidden";
		if (isDomLoaded && getElementById(id)) {
			getElementById(id).style.visibility = v;
		}
		else {
			createCSS("#" + id, "visibility:" + v);
		}
	}

	/* Filter to avoid XSS attacks
	*/
	function urlEncodeIfNecessary(s) {
		var regex = /[\\\"<>\.;]/;
		var hasBadChars = regex.exec(s) != null;
		return hasBadChars && typeof encodeURIComponent != UNDEF ? encodeURIComponent(s) : s;
	}
	
	/* Release memory to avoid memory leaks caused by closures, fix hanging audio/video threads and force open sockets/NetConnections to disconnect (Internet Explorer only)
	*/
	var cleanup = function() {
		if (ua.ie && ua.win) {
			window.attachEvent("onunload", function() {
				// remove listeners to avoid memory leaks
				var ll = listenersArr.length;
				for (var i = 0; i < ll; i++) {
					listenersArr[i][0].detachEvent(listenersArr[i][1], listenersArr[i][2]);
				}
				// cleanup dynamically embedded objects to fix audio/video threads and force open sockets and NetConnections to disconnect
				var il = objIdArr.length;
				for (var j = 0; j < il; j++) {
					removeSWF(objIdArr[j]);
				}
				// cleanup library's main closures to avoid memory leaks
				for (var k in ua) {
					ua[k] = null;
				}
				ua = null;
				for (var l in swfobject) {
					swfobject[l] = null;
				}
				swfobject = null;
			});
		}
	}();
	
	return {
		/* Public API
			- Reference: http://code.google.com/p/swfobject/wiki/documentation
		*/ 
		registerObject: function(objectIdStr, swfVersionStr, xiSwfUrlStr, callbackFn) {
			if (ua.w3 && objectIdStr && swfVersionStr) {
				var regObj = {};
				regObj.id = objectIdStr;
				regObj.swfVersion = swfVersionStr;
				regObj.expressInstall = xiSwfUrlStr;
				regObj.callbackFn = callbackFn;
				regObjArr[regObjArr.length] = regObj;
				setVisibility(objectIdStr, false);
			}
			else if (callbackFn) {
				callbackFn({success:false, id:objectIdStr});
			}
		},
		
		getObjectById: function(objectIdStr) {
			if (ua.w3) {
				return getObjectById(objectIdStr);
			}
		},
		
		embedSWF: function(swfUrlStr, replaceElemIdStr, widthStr, heightStr, swfVersionStr, xiSwfUrlStr, flashvarsObj, parObj, attObj, callbackFn) {
			var callbackObj = {success:false, id:replaceElemIdStr};
			if (ua.w3 && !(ua.wk && ua.wk < 312) && swfUrlStr && replaceElemIdStr && widthStr && heightStr && swfVersionStr) {
				setVisibility(replaceElemIdStr, false);
				addDomLoadEvent(function() {
					widthStr += ""; // auto-convert to string
					heightStr += "";
					var att = {};
					if (attObj && typeof attObj === OBJECT) {
						for (var i in attObj) { // copy object to avoid the use of references, because web authors often reuse attObj for multiple SWFs
							att[i] = attObj[i];
						}
					}
					att.data = swfUrlStr;
					att.width = widthStr;
					att.height = heightStr;
					var par = {}; 
					if (parObj && typeof parObj === OBJECT) {
						for (var j in parObj) { // copy object to avoid the use of references, because web authors often reuse parObj for multiple SWFs
							par[j] = parObj[j];
						}
					}
					if (flashvarsObj && typeof flashvarsObj === OBJECT) {
						for (var k in flashvarsObj) { // copy object to avoid the use of references, because web authors often reuse flashvarsObj for multiple SWFs
							if (typeof par.flashvars != UNDEF) {
								par.flashvars += "&" + k + "=" + flashvarsObj[k];
							}
							else {
								par.flashvars = k + "=" + flashvarsObj[k];
							}
						}
					}
					if (hasPlayerVersion(swfVersionStr)) { // create SWF
						var obj = createSWF(att, par, replaceElemIdStr);
						if (att.id == replaceElemIdStr) {
							setVisibility(replaceElemIdStr, true);
						}
						callbackObj.success = true;
						callbackObj.ref = obj;
					}
					else if (xiSwfUrlStr && canExpressInstall()) { // show Adobe Express Install
						att.data = xiSwfUrlStr;
						showExpressInstall(att, par, replaceElemIdStr, callbackFn);
						return;
					}
					else { // show alternative content
						setVisibility(replaceElemIdStr, true);
					}
					if (callbackFn) { callbackFn(callbackObj); }
				});
			}
			else if (callbackFn) { callbackFn(callbackObj);	}
		},
		
		switchOffAutoHideShow: function() {
			autoHideShow = false;
		},
		
		ua: ua,
		
		getFlashPlayerVersion: function() {
			return { major:ua.pv[0], minor:ua.pv[1], release:ua.pv[2] };
		},
		
		hasFlashPlayerVersion: hasPlayerVersion,
		
		createSWF: function(attObj, parObj, replaceElemIdStr) {
			if (ua.w3) {
				return createSWF(attObj, parObj, replaceElemIdStr);
			}
			else {
				return undefined;
			}
		},
		
		showExpressInstall: function(att, par, replaceElemIdStr, callbackFn) {
			if (ua.w3 && canExpressInstall()) {
				showExpressInstall(att, par, replaceElemIdStr, callbackFn);
			}
		},
		
		removeSWF: function(objElemIdStr) {
			if (ua.w3) {
				removeSWF(objElemIdStr);
			}
		},
		
		createCSS: function(selStr, declStr, mediaStr, newStyleBoolean) {
			if (ua.w3) {
				createCSS(selStr, declStr, mediaStr, newStyleBoolean);
			}
		},
		
		addDomLoadEvent: addDomLoadEvent,
		
		addLoadEvent: addLoadEvent,
		
		getQueryParamValue: function(param) {
			var q = doc.location.search || doc.location.hash;
			if (q) {
				if (/\?/.test(q)) { q = q.split("?")[1]; } // strip question mark
				if (param == null) {
					return urlEncodeIfNecessary(q);
				}
				var pairs = q.split("&");
				for (var i = 0; i < pairs.length; i++) {
					if (pairs[i].substring(0, pairs[i].indexOf("=")) == param) {
						return urlEncodeIfNecessary(pairs[i].substring((pairs[i].indexOf("=") + 1)));
					}
				}
			}
			return "";
		},
		
		// For internal usage only
		expressInstallCallback: function() {
			if (isExpressInstallActive) {
				var obj = getElementById(EXPRESS_INSTALL_ID);
				if (obj && storedAltContent) {
					obj.parentNode.replaceChild(storedAltContent, obj);
					if (storedAltContentId) {
						setVisibility(storedAltContentId, true);
						if (ua.ie && ua.win) { storedAltContent.style.display = "block"; }
					}
					if (storedCallbackFn) { storedCallbackFn(storedCallbackObj); }
				}
				isExpressInstallActive = false;
			} 
		}
	};
}();
/**
 * @fileoverview  
 * Trex \uc815\uc758
 */

/** @namespace */
var Trex = {
	__PAGE_PATH: "http://editor.daum.net/pages/",
	__KEY: {
		ENTER: '13',
		DELETE: '46',
		SPACE: '32',
		BACKSPACE: '8',
		PASTE: '86', //NOTE: + ctrl
		CUT: '88' //NOTE: + ctrl
	},
	I: {},
	X: {},
	define: function(destination, properties) {
		return Object.extend(destination, properties);
	},
	available: function(config, name) {
		if(!$tx("tx_" + name)){
			console.log("Warning: JsObject is existed but element 'tx_" + name + "' is not found.");
			return false;
		}
		if(!config){
			console.log("Warning: no config for" + name);
			return false;
		}
		if(config.use == false) {
			console.log("Warning: config.use == false");
			return false;
		}
		return true;
	},
	getSWF: window.getSWF
};

//oop
(function(Trex){

	function $$reference($instance) {
		var _$ref = $instance;
		while(_$ref.$reference) {
			_$ref = _$ref.$reference;
		}
		return _$ref;
	}
	
	function $$super($instance) {
		var _$superclass = $instance.constructor.superclass;
		if(_$superclass) {
			var _$initbak = _$superclass.prototype.initialize;
			_$superclass.prototype.initialize = function() {
				this.$reference = $instance;
			}; //fake initialize
			var _$superobj = new _$superclass();
			_$superclass.prototype.initialize = _$initbak;
			
			var _wrapFunc = function(name) {
				if(!_$superobj[name]) return null;
				return function() {
					var _arguments = arguments;
					var _$reference = $$reference($instance);
					var _$superbak = _$reference.$super;
					_$reference.$super = _$superobj.$super;
					var _returns = _$superobj[name].apply(_$reference, _arguments);
					_$reference.$super = _$superbak;
					return _returns;
				};
			}
			
			var _$wrapobj = {};
			for(var _name in _$superobj) {
				if(_name.charAt(0) != '$') {
					if (typeof(_$superobj[_name]) == 'function') {
						_$wrapobj[_name] = _wrapFunc(_name);
					}
				}
			}
			$instance.$super = _$wrapobj;
		}
	}
	
	/**
	 * @namespace
	 * @name Trex.Class
	 */
	Trex.Class = /** @lends Trex.Class */ {
		/**
		 * creates class 
		 * @param {Object} properties
		 */
		create: function(properties) {
			var _class = function() {
				var _proto = this.constructor.prototype; //NOTE: Cuz properties must not share
				for(var _name in _proto) {
					if(_proto[_name] && typeof(_proto[_name]) === 'object') {
						if(_proto[_name].constructor == Array) { //Array
							this[_name] = [].concat(_proto[_name]);
						} else {
							this[_name] = Object.extend({}, _proto[_name]);
						}
					}
				}
				$$super(this);
				var _arguments = arguments;
				this.initialize.apply(this, _arguments);
			};
			return Trex.Class.draft(properties, _class);
		},
		draft: function(properties, aClass) {
			var _class = aClass ? 
				aClass : 
				function() {
					$$super(this);
				}; 
			
			if(properties.$const) {
				Object.extend(_class, properties.$const);
			}
			
			if(properties.$extend) {
				Object.extend(_class.prototype, properties.$extend.prototype);
				_class.superclass = properties.$extend;
			}
			
			if(properties.$mixins) {
				var sources = $A(properties.$mixins);
				sources.each(function(source) {
					Object.extend(_class.prototype, source);
				});
			}
			for(var _name in properties) {
				if(_name.charAt(0) != '$') {
					_class.prototype[_name] = properties[_name];
				}
			}
			return _class;
		},
		overwrite: function(source, properties) {
			var _class = source;
			if(_class.prototype) {
				Object.extend(_class.prototype, properties);
			}
			return _class;
		}
	};
	
	/**
	 * @namespace
	 * @name Trex.Faculty, Trex.Mixin
	 */
	Trex.Mixin = Trex.Faculty = /** @lends Trex.Mixin */ {
		/**
		 * Creates  
		 * @param {Object} properties
		 */
		create: function(properties) {
			var _class = {};
			for(var _name in properties) {
				if(properties[_name] && typeof(properties[_name]) === 'object') {
					if(properties[_name].constructor == Array) { //Array
						_class[_name] = [].concat(properties[_name]);
					} else {
						_class[_name] = Object.extend({}, properties[_name]);
					}
				} else {
					_class[_name] = properties[_name];
				}
			}
			return _class;
		},
		toClass: function(properties, initializeFunc) {
			return Trex.Class.create(
				Object.extend({
					initialize: initializeFunc? initializeFunc: function() {}
				}, properties)
			);
		}
	};
})(Trex);

//module
(function(Trex){
	Object.extend(Trex, /** @lends Trex */ {
		installs: [],
		registers: [],
		modules: [],
		modulesX: [],
		/**
		 * Installs component
		 * @param {Object} description
		 * @param {Object} fn
		 */
		install: function(description, fn){
			fn.desc = '[install] ' + description;
			Trex.installs.push(fn);	
		},
		register: function(description, fn){
			fn.desc = '[register] ' + description;
			Trex.registers.push(fn);	
		},
		module: function(description, fn){
			//console.log(' >>> ' + description);
			fn.desc = '[module] ' + description;
			Trex.modules.push(fn);
		},
		moduleX: function(description, fn){
			fn.desc = '[moduleX] ' + description;
			Trex.modulesX.push(fn);
		},
		invoke: function(fns, editor, toolbar, sidebar, canvas, config){
			for(var i=0,len=fns.length; i<len; i++){
				var fn = fns[i];
				if (fn.desc) {
					StopWatch.lap(fn.desc);
				}
				fn(editor, toolbar, sidebar, canvas, config);		
			}
		},
		invokeInstallation: function(editor, toolbar, sidebar, canvas, config){
			Trex.invoke(Trex.installs, editor, toolbar, sidebar, canvas, config);
		},
		invokeRegisters: function(editor, toolbar, sidebar, canvas, config){
			Trex.invoke(Trex.registers, editor, toolbar, sidebar, canvas, config);
		},
		invokeModules: function(editor, toolbar, sidebar, canvas, config){
			Trex.invoke(Trex.modules, editor, toolbar, sidebar, canvas, config);
		},
		group: function(name){
			try{
				console.groupEnd();
				console.group("modules in " + name);
			}catch(e){ }
		},
		groupEnd: function(){
			try{
				console.groupEnd();
			}catch(e){ }
		}
	});
})(Trex);

/**
 * @fileoverview  
 * \uc0ac\uc6a9\uc790 \uc815\uc758 \uc774\ubca4\ud2b8\ub97c \ubbf8\ub9ac \uc815\uc758
 */

(function(Trex) {
	/**
	 *  @namespace 
	 *  @name Trex.Ev
	 */
	Trex.Ev = /** @lends Trex.Ev */ {
		/** wysiwyg mode */
		__EDITOR_PANEL_MOUSEDOWN: 'editor.panel.mousedown',
		/** 
		 * wysiwyg \uc601\uc5ed\uc5d0 \ubc1c\uc0dd\ud558\ub294 keydown \uc774\ubca4\ud2b8
		 * @example
		 * 	canvas.observeJob(Trex.Ev.__CANVAS_PANEL_KEYDOWN, function(ev) {
		 *	});
		 */
		__CANVAS_PANEL_KEYDOWN: 'canvas.panel.keydown',
		/** 
		 * wysiwyg \uc601\uc5ed\uc5d0 \ubc1c\uc0dd\ud558\ub294 keyup \uc774\ubca4\ud2b8
		 * @example
		 * 	canvas.observeJob(Trex.Ev.__CANVAS_PANEL_KEYUP, function(ev) {
		 *	});
		 */
		__CANVAS_PANEL_KEYUP: 'canvas.panel.keyup',
		/** 
		 * wysiwyg \uc601\uc5ed\uc5d0 \ubc1c\uc0dd\ud558\ub294 mousedown \uc774\ubca4\ud2b8<br/>
		 * Element Observer \ubcf4\ub2e4 \ub2a6\uac8c \uc2e4\ud589\ub418\uba70, mouseclick \ubcf4\ub2e4 \uc55e\uc11c \uc2e4\ud589\ub41c\ub2e4.
		 * \uacbd\uc6b0\uc5d0 \ub530\ub77c \uc0c1\uc704 \uc5d8\ub9ac\uba3c\ud2b8\uae4c\uc9c0 \ud0d0\uc0c9\ud558\uc5ec \uc2e4\ud589\ud558\ub294 Element Observer\ub97c \uc0ac\uc6a9\ud55c\ub2e4.
		 * @example
		 * 	canvas.observeJob(Trex.Ev.__CANVAS_PANEL_MOUSEDOWN, function(ev) {
		 *		//execute function
		 *	});
		 *  canvas.observeElement({ tag: "img", klass: "txc-image" }, function(element) {
		 *		//execute function with element
		 *	});
		 */
		__CANVAS_PANEL_MOUSEDOWN: 'canvas.panel.mousedown',
		/** 
		 * wysiwyg \uc601\uc5ed\uc5d0 \ubc1c\uc0dd\ud558\ub294 mouseup \uc774\ubca4\ud2b8
		 * @example
		 * 	canvas.observeJob(Trex.Ev.__CANVAS_PANEL_MOUSEUP, function(ev) {
		 *	});
		 */
		__CANVAS_PANEL_MOUSEUP: 'canvas.panel.mouseup',
		/** 
		 * wysiwyg \uc601\uc5ed\uc5d0 \ubc1c\uc0dd\ud558\ub294 mouseover \uc774\ubca4\ud2b8<br/>
		 * wysiwyg \uc601\uc5ed\uc5d0\uc11c \ub9c8\uc6b0\uc2a4\ub97c \uc6c0\uc9c1\uc77c \ub54c\ub9c8\ub2e4 \ubc1c\uc0dd\ud558\ubbc0\ub85c \uacfc\ud558\uac8c \uc0ac\uc6a9\ud558\uc9c0 \uc54a\ub3c4\ub85d \ud55c\ub2e4.
		 * @example
		 * 	canvas.observeJob(Trex.Ev.__CANVAS_PANEL_MOUSEOVER, function(ev) {
		 *	});
		 */
		__CANVAS_PANEL_MOUSEOVER: 'canvas.panel.mouseover',
		/** 
		 * wysiwyg \uc601\uc5ed\uc5d0 \ubc1c\uc0dd\ud558\ub294 click \uc774\ubca4\ud2b8
		 * @example
		 * 	canvas.observeJob(Trex.Ev.__CANVAS_PANEL_CLICK, function(ev) {
		 *	});
		 */
		__CANVAS_PANEL_CLICK: 'canvas.panel.click',
		/** 
		 * wysiwyg \uc601\uc5ed\uc5d0\uc11c \ubc1c\uc0dd\ud558\ub294 \uc2a4\ud06c\ub864 \ubcc0\uacbd \uc774\ubca4\ud2b8<br/>
		 * \uc774 \uc774\ubca4\ud2b8\ub294 wysiwyg \uc601\uc5ed\uc758 \uc2a4\ud06c\ub864 \ub192\uc774\uac00 \ubcc0\uacbd\ub418\uac70\ub098 \uc704\uce58\uac00 \ubcc0\uacbd\ub420 \uacbd\uc6b0 \ubc1c\uc0dd\ud55c\ub2e4.
		 * @example
		 * 	canvas.observeJob(Trex.Ev.__CANVAS_PANEL_SCROLLING, function(ev) {
		 *	});
		 */
		__CANVAS_PANEL_SCROLLING: 'canvas.panel.scrolling',
		/** 
		 * wysiwyg \uc601\uc5ed\uc774 \ub85c\ub4dc\ub418\uc5c8\uc744 \uacbd\uc6b0 \ubc1c\uc0dd\ud558\ub294 \uc0ac\uc6a9\uc790 \uc815\uc758 \uc774\ubca4\ud2b8
		 * @example
		 * 	canvas.observeJob(Trex.Ev.__IFRAME_LOAD_COMPLETE, function(ev) {
		 *	});
		 */
		__IFRAME_LOAD_COMPLETE: 'iframe.load.complete',
		/** 
		 * HTML\ubaa8\ub4dc(\uc18c\uc2a4\ubaa8\ub4dc) \uc601\uc5ed\uc5d0\uc11c \ubc1c\uc0dd\ud558\ub294 click \uc774\ubca4\ud2b8
		 * @example
		 * 	canvas.observeJob(Trex.Ev.__CANVAS_SOURCE_PANEL_CLICK, function(ev) {
		 *	});
		 */
		__CANVAS_SOURCE_PANEL_CLICK: 'canvas.source.panel.click',
		/** 
		 * HTML\ubaa8\ub4dc(\uc18c\uc2a4\ubaa8\ub4dc) \uc601\uc5ed\uc5d0\uc11c \ubc1c\uc0dd\ud558\ub294 keydown \uc774\ubca4\ud2b8
		 * @example
		 * 	canvas.observeJob(Trex.Ev.__CANVAS_SOURCE_PANEL_KEYDOWN, function(ev) {
		 *	});
		 */
		__CANVAS_SOURCE_PANEL_KEYDOWN: 'canvas.source.panel.mousedown',
		/** 
		 * HTML\ubaa8\ub4dc(\uc18c\uc2a4\ubaa8\ub4dc) \uc601\uc5ed\uc5d0\uc11c \ubc1c\uc0dd\ud558\ub294 mousedown \uc774\ubca4\ud2b8
		 * @example
		 * 	canvas.observeJob(Trex.Ev.__CANVAS_SOURCE_PANEL_MOUSEDOWN, function(ev) {
		 *	});
		 */
		__CANVAS_SOURCE_PANEL_MOUSEDOWN: 'canvas.source.panel.mousedown',
		/** 
		 * \ud14d\uc2a4\ud2b8\ubaa8\ub4dc \uc601\uc5ed\uc5d0\uc11c \ubc1c\uc0dd\ud558\ub294 click \uc774\ubca4\ud2b8
		 * @example
		 * 	canvas.observeJob(Trex.Ev.__CANVAS_TEXT_PANEL_CLICK, function(ev) {
		 *	});
		 */
		__CANVAS_TEXT_PANEL_CLICK: 'canvas.text.panel.click',
		/** 
		 * \ubaa8\ub4dc\uac00 \ubcc0\uacbd\ub420 \ub54c \ubc1c\uc0dd\ud558\ub294 \uc0ac\uc6a9\uc790 \uc815\uc758 \uc774\ubca4\ud2b8
		 * @example
		 * 	canvas.observeJob(Trex.Ev.__CANVAS_MODE_CHANGE, function(from, to) {
		 *		//from - \ubcc0\uacbd\ub418\uae30 \uc804 \ubaa8\ub4dc
		 *		//to - \ubcc0\uacbd\ub418\uace0\ub09c \ud6c4 \ubaa8\ub4dc
		 *	});
		 */
		__CANVAS_MODE_CHANGE: 'canvas.mode.change',
		/** 
		 * \ud234\ubc14\uc758 \ubc84\ud2bc\uc774 \ub20c\ub838\uc744 \uacbd\uc6b0 \ubc1c\uc0dd\ud558\ub294 \uc0ac\uc6a9\uc790 \uc815\uc758 \uc774\ubca4\ud2b8
		 * @example
		 * 	canvas.observeJob(Trex.Ev.__TOOL_CLICK, function(identity) {
		 *		//identity - tool\uc758 Identity(bold, aligncenter...)
		 *	});
		 */
		__TOOL_CLICK: 'toolbar.button.click',
		/** 
		 * Editor.save()\uac00 \ud638\ucd9c\ub418\uc5c8\uc744 \uacbd\uc6b0 \ubc1c\uc0dd\ud558\ub294 \uc0ac\uc6a9\uc790 \uc815\uc758 \uc774\ubca4\ud2b8<br/>
		 * \uc2e4\uc81c form\uc774 submit\uc774 \ub418\uae30 \uc804\uc5d0 \ubc1c\uc0dd\ud55c\ub2e4.
		 * @example
		 * 	canvas.observeJob(Trex.Ev.__ON_SUBMIT, function(editor) {
		 *		//editor - editor \uac1d\uccb4
		 *	});
		 */
		__ON_SUBMIT: "editor.submit",
		/** 
		 * \uc5d0\ub514\ud130\uc758 \ub192\uc774\uac00 \ubcc0\uacbd\ub41c \ud6c4 \ubc1c\uc0dd\ud558\ub294 \uc0ac\uc6a9\uc790 \uc815\uc758 \uc774\ubca4\ud2b8
		 * @example
		 * 	canvas.observeJob(Trex.Ev.__CANVAS_HEIGHT_CHANGE, function(height) {
		 *		//height - \ubcc0\uacbd\ub41c \ub192\uc774
		 *	});
		 */
		__CANVAS_HEIGHT_CHANGE: 'canvas.height.change',
		/** 
		 * wysiwyg \uc601\uc5ed\uc5d0\uc11c \ud0a4\uc774\ubca4\ud2b8\ub098 \ub9c8\uc6b0\uc2a4\uc774\ubca4\ud2b8\uac00 \ubc1c\uc0dd\ud560 \uacbd\uc6b0 \ubc1c\uc0dd\ud558\ub294 \uc0ac\uc6a9\uc790 \uc815\uc758 \uc774\ubca4\ud2b8<br/>
		 * \uc8fc\ub85c \ud234\ubc14 \ubc84\ud2bc\uc758 \uc0c1\ud0dc\ub97c \ud45c\uc2dc\ud560 \ub54c\uc5d0 \uc0ac\uc6a9\ud55c\ub2e4.
		 * @example
		 * 	canvas.observeJob(Trex.Ev.__CANVAS_PANEL_QUERY_STATUS, function() {
		 *	});
		 */
		__CANVAS_PANEL_QUERY_STATUS: 'canvas.panel.style.change',
		/** 
		 * wysiwyg \uc601\uc5ed\uc5d0\uc11c delete \ud0a4\uac00 \ub20c\ub838\uc744 \uacbd\uc6b0 \ubc1c\uc0dd\ud558\ub294 \uc0ac\uc6a9\uc790 \uc815\uc758 \uc774\ubca4\ud2b8<br/>
		 * \uc8fc\ub85c \ucee8\ud150\uce20\uc640 \ub3d9\uae30\ud654\ub97c \ub9de\ucd94\uae30 \uc704\ud574 \uc0ac\uc6a9\ud55c\ub2e4.
		 * @example
		 * 	canvas.observeJob(Trex.Ev.__CANVAS_PANEL_DELETE_SOMETHING, function() {
		 *	});
		 */
		__CANVAS_PANEL_DELETE_SOMETHING: 'canvas.panel.delkey.press',
		/** 
		 * Entry Box\uc5d0 Entry\uac00 \ucd94\uac00\ub418\uc5c8\uc744 \ub54c \ubc1c\uc0dd\ud558\ub294 \uc0ac\uc6a9\uc790 \uc815\uc758 \uc774\ubca4\ud2b8
		 * @example
		 * 	attachbox.observeJob(Trex.Ev.__ENTRYBOX_ENTRY_ADDED, function(entry) {
		 *		//\uc0dd\uc131\ub41c entry \uac1d\uccb4\ub97c \uc778\uc790\ub85c \ubc1b\ub294\ub2e4.
		 *	});
		 */
		__ENTRYBOX_ENTRY_ADDED: 'entrybox.entryadded',
		/** 
		 * Entry Box\uc758 Entry\uac00 \uc218\uc815\ub418\uc5c8\uc744 \ub54c \ubc1c\uc0dd\ud558\ub294 \uc0ac\uc6a9\uc790 \uc815\uc758 \uc774\ubca4\ud2b8
		 * @example
		 * 	attachbox.observeJob(Trex.Ev.__ENTRYBOX_ENTRY_MODIFIED, function(entry) {
		 *		//\uc218\uc815\ub41c entry \uac1d\uccb4\ub97c \uc778\uc790\ub85c \ubc1b\ub294\ub2e4.
		 *	});
		 */
		__ENTRYBOX_ENTRY_MODIFIED: 'entrybox.entrymodified',
		/** 
		 * Entry Box\uc5d0\uc11c Entry\uac00 \uc81c\uac70\ub418\uc5c8\uc744 \ub54c \ubc1c\uc0dd\ud558\ub294 \uc0ac\uc6a9\uc790 \uc815\uc758 \uc774\ubca4\ud2b8
		 * @example
		 * 	attachbox.observeJob(Trex.Ev.__ENTRYBOX_ENTRY_REMOVED, function(entry) {
		 *		//\uc0ad\uc81c\ub420 entry \uac1d\uccb4\ub97c \uc778\uc790\ub85c \ubc1b\ub294\ub2e4.
		 *	});
		 */
		__ENTRYBOX_ENTRY_REMOVED: 'entrybox.entryremoved',
		/** 
		 * Entry Box\uc5d0\uc11c \ubaa8\ub4e0 Entry\uac00 \uc81c\uac70\ub418\uc5c8\uc744 \ub54c \ubc1c\uc0dd\ud558\ub294 \uc0ac\uc6a9\uc790 \uc815\uc758 \uc774\ubca4\ud2b8
		 * @example
		 * 	attachbox.observeJob(Trex.Ev.__ENTRYBOX_ALL_ENTRY_REMOVED, function() {
		 *	});
		 */
		__ENTRYBOX_ALL_ENTRY_REMOVED: 'entrybox.removed.all.perfectly',
		/** 
		 * Attach Box\uac00 \ubcf4\uc5ec\uc9c8 \ub54c \ubc1c\uc0dd\ud558\ub294 \uc0ac\uc6a9\uc790 \uc815\uc758 \uc774\ubca4\ud2b8
		 * @example
		 * 	attachbox.observeJob(Trex.Ev.__ATTACHBOX_SHOW, function() {
		 *	});
		 */
		__ATTACHBOX_SHOW: 'attachbox.show',
		/** 
		 * Attach Box\uac00 \uac10\ucdb0\uc9c8 \ub54c \ubc1c\uc0dd\ud558\ub294 \uc0ac\uc6a9\uc790 \uc815\uc758 \uc774\ubca4\ud2b8
		 * @example
		 * 	attachbox.observeJob(Trex.Ev.__ATTACHBOX_HIDE, function() {
		 *	});
		 */
		__ATTACHBOX_HIDE: 'attachbox.hide',
		/** 
		 * \uc5d0\ub514\ud130 \ud398\uc774\uc9c0\ub97c \ubc97\uc5b4\ub098\uae30 \uc804\uc5d0 \ubc1c\uc0dd\ud558\ub294 \uc0ac\uc6a9\uc790 \uc815\uc758 \uc774\ubca4\ud2b8
		 * @example
		 * 	canvas.observeJob(Trex.Ev.__CANVAS_BEFORE_UNLOAD, function() {
		 *	});
		 */
		__CANVAS_BEFORE_UNLOAD: 'canvas.unload',
		/** 
		 * \uac01 \ucca8\ubd80\uac00 \ucd94\uac00\ub420 \ub54c \ubc1c\uc0dd\ud558\ub294 \uc0ac\uc6a9\uc790 \uc815\uc758 \uc774\ubca4\ud2b8<br/>
		 * entry\uac00 \uc0dd\uc131\ub418\uace0 \ubcf8\ubb38\uc5d0 \uc0bd\uc785\uc774 \uc644\ub8cc\ub418\uace0 \ud638\ucd9c\ub41c\ub2e4.
		 * \uc2e4\uc81c\ub85c\ub294 entry \ubd80\ubd84\uc774 \ucca8\ubd80\uc758 Identity(image, movie, media...)\ub85c \ub300\uccb4\ub41c\ub2e4.
		 * @abstract
		 * @example
		 * 	canvas.observeJob('canvas.movie.added', function(entry) {
		 *		//\uc0dd\uc131\ub41c entry \uac1d\uccb4\ub97c \uc778\uc790\ub85c \ubc1b\ub294\ub2e4.
		 *	});
		 */
		__CANVAS_ENTRY_ADDED: 'canvas.entry.added',
		/** 
		 * \ud234\uc744 \uc774\uc6a9\ud574 wysiwyg\uc5d0 \uc694\uc18c\uac00 \uc0bd\uc785\uc774 \ub420 \ub54c \ubc1c\uc0dd\ud558\ub294 \uc0ac\uc6a9\uc790 \uc815\uc758 \uc774\ubca4\ud2b8
		 * @abstract
		 * @example
		 * 	toolbar.observeJob('cmd.textbox.added', function(node) {
		 *		//\ud544\uc694\uc5d0 \ub530\ub77c \ub9cc\ub4e4\uc5b4\uc9c4 \uc694\uc18c \uc5d8\ub9ac\uba3c\ud2b8
		 *	});
		 */
		__COMMAND_NODE_ADDED: 'cmd.entry.added',
		/** 
		 * \uc67c\ucabd \uc815\ub82c\uc744 \uc2e4\ud589\ud558\uace0\uc11c \ubc1c\uc0dd\ud558\ub294 \uc0ac\uc6a9\uc790 \uc815\uc758 \uc774\ubca4\ud2b8
		 * @private
		 */
		__CMD_ALIGN_LEFT: 'align.left',
		/** 
		 * \uac00\uc6b4\ub370 \uc815\ub82c\uc744 \uc2e4\ud589\ud558\uace0\uc11c \ubc1c\uc0dd\ud558\ub294 \uc0ac\uc6a9\uc790 \uc815\uc758 \uc774\ubca4\ud2b8
		 * @private
		 */
		__CMD_ALIGN_CENTER: 'align.center',
		/** 
		 * \uc624\ub978\ucabd \uc815\ub82c\uc744 \uc2e4\ud589\ud558\uace0\uc11c \ubc1c\uc0dd\ud558\ub294 \uc0ac\uc6a9\uc790 \uc815\uc758 \uc774\ubca4\ud2b8
		 * @private
		 */
		__CMD_ALIGN_RIGHT: 'align.right',
		/** 
		 * \uc591\ucabd \uc815\ub82c\uc744 \uc2e4\ud589\ud558\uace0\uc11c \ubc1c\uc0dd\ud558\ub294 \uc0ac\uc6a9\uc790 \uc815\uc758 \uc774\ubca4\ud2b8
		 * @private
		 */
		__CMD_ALIGN_FULL: 'align.full',
		/** 
		 * \uc774\ubbf8\uc9c0 \uc67c\ucabd \uc815\ub82c\uc744 \uc2e4\ud589\ud558\uace0\uc11c \ubc1c\uc0dd\ud558\ub294 \uc0ac\uc6a9\uc790 \uc815\uc758 \uc774\ubca4\ud2b8
		 * @private
		 */
		__CMD_ALIGN_IMG_LEFT: 'align.img.left',
		/** 
		 * \uc774\ubbf8\uc9c0 \uac00\uc6b4\ub370 \uc815\ub82c\uc744 \uc2e4\ud589\ud558\uace0\uc11c \ubc1c\uc0dd\ud558\ub294 \uc0ac\uc6a9\uc790 \uc815\uc758 \uc774\ubca4\ud2b8
		 * @private
		 */
		__CMD_ALIGN_IMG_CENTER: 'align.img.center',
		/** 
		 * \uc774\ubbf8\uc9c0 \uc67c\ucabd\ud750\ub984 \uc815\ub82c\uc744 \uc2e4\ud589\ud558\uace0\uc11c \ubc1c\uc0dd\ud558\ub294 \uc0ac\uc6a9\uc790 \uc815\uc758 \uc774\ubca4\ud2b8
		 * @private
		 */
		__CMD_ALIGN_IMG_FLOAT_LEFT: 'align.img.floatleft',
		/** 
		 * \uc774\ubbf8\uc9c0 \uc624\ub978\ucabd\ud750\ub984 \uc815\ub82c\uc744 \uc2e4\ud589\ud558\uace0\uc11c \ubc1c\uc0dd\ud558\ub294 \uc0ac\uc6a9\uc790 \uc815\uc758 \uc774\ubca4\ud2b8
		 * @private
		 */
		__CMD_ALIGN_IMG_FLOAT_RIGHT: 'align.img.floatright',
		/** 
		 * \uc5d0\ub514\ud130 \ub85c\ub529\ud560 \ub54c \ud604\uc7ac \ubaa8\ub4dc\uc640 config\uc758 \ubaa8\ub4dc\uac00 \ub2e4\ub97c \ub54c \ubc1c\uc0dd\ud558\ub294 \uc0ac\uc6a9\uc790 \uc815\uc758 \uc774\ubca4\ud2b8
		 * @private
		 */
		__CANVAS_MODE_INITIALIZE: 'canvas.mode.initialize',
		/** 
		 * \uc5d0\ub514\ud130 \ub85c\ub529\ud560 \ub54c \ucee8\ud150\uce20\ub97c \ucd08\uae30\ud654\ud55c \ud6c4 \ubc1c\uc0dd\ud558\ub294 \uc0ac\uc6a9\uc790 \uc815\uc758 \uc774\ubca4\ud2b8
		 * @private
		 */
		__CANVAS_DATA_INITIALIZE: 'canvas.load.data',
		/** 
		 * Attach Box\uc758 ENTRY\uc758 \uc0c1\ud0dc\uac00 \ubcc0\uacbd\ub420 \ub54c \ubc1c\uc0dd\ud558\ub294 \uc0ac\uc6a9\uc790 \uc815\uc758 \uc774\ubca4\ud2b8
		 * @private
		 */
		__ENTRYBOX_ENTRY_REFRESH: 'entrybox.entryrefresh',
		/** 
		 * \uc815\ubcf4\ucca8\ubd80\uac00 \uc0bd\uc785\ub420 \ub54c \ubc1c\uc0dd\ud558\ub294 \uc0ac\uc6a9\uc790 \uc815\uc758 \uc774\ubca4\ud2b8
		 * @private
		 */
		__PASTE_SEARCHRESULT: 'trex.paste.info',
		/** 
		 * \uc5d0\ub514\ud130\uc5d0\uc11c \ub7f0\ud0c0\uc784\uc5d0\ub7ec\uac00 \ub0ac\uc744 \ub54c \ubc1c\uc0dd\ud558\ub294 \uc0ac\uc6a9\uc790 \uc815\uc758 \uc774\ubca4\ud2b8
		 * @private
		 */
		__RUNTIME_EXCEPTION: "editor.runtime.exception",
		/** 
		 * \uc5d0\ub514\ud130 \uc7a5\uc560 \ub85c\uadf8\ub97c \ub0a8\uae38 \ub54c \ubc1c\uc0dd\ud558\ub294 \uc0ac\uc6a9\uc790 \uc815\uc758 \uc774\ubca4\ud2b8<br/>
		 * \ub85c\uadf8\ub97c \uc804\uc1a1\ud55c \ud6c4 \uc2e4\ud589 \ub41c\ub2e4.
		 * @private
		 */
		__REPORT_TO_MAGPIE: "editor.report.magpie"
	};
})(Trex);

/** @namespace */
var TrexEvent = {
	/**
	 * fires observer for target element 
	 * @param {Object} el
	 * @param {Object} handles
	 */
	fire: function(el, handles){
		if (el && el.tagName) {
			var fn = handles[el.tagName.toLowerCase()];
			if (fn) {
				fn(el, handles);
			}else {
				TrexEvent.propagateToParent(el, handles);
			}
		}else {
			console.log("Not Supported Type : " + el);
		}
	},
	propagateToParent : function(element, handles){
		var _el = element.parentNode;
		if(_el && _el.tagName){
			var fn = handles[_el.tagName.toLowerCase()];
			if(fn){
				fn(_el, handles);
			}else{
				TrexEvent.propagateToParent(_el, handles);
			}
		}
	},
	stopPropagation : function(element){ }
};

Trex.__CONFIG_COMMON = {
	thumbs: {
		options:[
			{color:"#FF0000"}, {color:"#FF5E00"}, {color:"#FFBB00"}, {color:"#FFE400"}, {color:"#ABF200"}, {color:"#1FDA11"}, {color:"#00D8FF"}, {color:"#0055FF"}, {color:"#0900FF"}, {color:"#6600FF"}, {color:"#FF00DD"}, {color:"#FF007F"}, {color:"#000000"}, {color:"#FFFFFF"},
			{color:"#FFD8D8"}, {color:"#FAE0D4"}, {color:"#FAECC5"}, {color:"#FAF4C0"}, {color:"#E4F7BA"}, {color:"#CEFBC9"}, {color:"#D4F4FA"}, {color:"#D9E5FF"}, {color:"#DAD9FF"}, {color:"#E8D9FF"}, {color:"#FFD9FA"}, {color:"#FFD9EC"}, {color:"#F6F6F6"}, {color:"#EAEAEA"},
			{color:"#FFA7A7"}, {color:"#FFC19E"}, {color:"#FFE08C"}, {color:"#FAED7D"}, {color:"#CEF279"}, {color:"#B7F0B1"}, {color:"#B2EBF4"}, {color:"#B2CCFF"}, {color:"#B5B2FF"}, {color:"#D1B2FF"}, {color:"#FFB2F5"}, {color:"#FFB2D9"}, {color:"#D5D5D5"}, {color:"#BDBDBD"},
			{color:"#F15F5F"}, {color:"#F29661"}, {color:"#F2CB61"}, {color:"#E5D85C"}, {color:"#BCE55C"}, {color:"#86E57F"}, {color:"#5CD1E5"}, {color:"#6699FF"}, {color:"#6B66FF"}, {color:"#A366FF"}, {color:"#F261DF"}, {color:"#F261AA"}, {color:"#A6A6A6"}, {color:"#8C8C8C"},
			{color:"#CC3D3D"}, {color:"#CC723D"}, {color:"#CCA63D"}, {color:"#C4B73B"}, {color:"#9FC93C"}, {color:"#47C83E"}, {color:"#3DB7CC"}, {color:"#4174D9"}, {color:"#4641D9"}, {color:"#7E41D9"}, {color:"#D941C5"}, {color:"#D9418D"}, {color:"#747474"}, {color:"#5D5D5D"},
			{color:"#980000"}, {color:"#993800"}, {color:"#997000"}, {color:"#998A00"}, {color:"#6B9900"}, {color:"#2F9D27"}, {color:"#008299"}, {color:"#003399"}, {color:"#050099"}, {color:"#3D0099"}, {color:"#990085"}, {color:"#99004C"}, {color:"#4C4C4C"}, {color:"#353535"},
			{color:"#670000"}, {color:"#662500"}, {color:"#664B00"}, {color:"#665C00"}, {color:"#476600"}, {color:"#22741C"}, {color:"#005766"}, {color:"#002266"}, {color:"#030066"}, {color:"#290066"}, {color:"#660058"}, {color:"#660033"}, {color:"#212121"}, {color:"#000000"}
		],
		transparent: { 
			color: "transparent", 
			border: "#999999", 
			image: "#iconpath/ic_transparent4.gif?rv=1.0.1", 
			thumb: "#iconpath/txt_transparent.gif?rv=1.0.1",
			thumbImage:"#iconpath/color_transparent_prev.gif?rv=1.0.1"
		}
	},
	textbox: {
		 options: [
			{ data: 'txc-textbox1', style: { padding:'10px', backgroundColor:'#ffffff', border:'1px solid #f7f7f7' } },
			{ data: 'txc-textbox2', style: { padding:'10px', backgroundColor:'#eeeeee', border:'1px solid #eeeeee' } },
			{ data: 'txc-textbox3', style: { padding:'10px', backgroundColor:'#fefeb8', border:'1px solid #fefeb8' } },
			{ data: 'txc-textbox4', style: { padding:'10px', backgroundColor:'#fedec7', border:'1px solid #fedec7' } },
			{ data: 'txc-textbox5', style: { padding:'10px', backgroundColor:'#e7fdb5', border:'1px solid #e7fdb5' } },
			{ data: 'txc-textbox6', style: { padding:'10px', backgroundColor:'#dbe8fb', border:'1px solid #dbe8fb' } },
			
			{ data: 'txc-textbox7', style: { padding:'10px', backgroundColor:'#ffffff', border:'1px dashed #cbcbcb' } },
			{ data: 'txc-textbox8', style: { padding:'10px', backgroundColor:'#eeeeee', border:'1px dashed #c1c1c1' } },
			{ data: 'txc-textbox9', style: { padding:'10px', backgroundColor:'#fefeb8', border:'1px dashed #f3c534' } },
			{ data: 'txc-textbox10', style: { padding:'10px', backgroundColor:'#fedec7', border:'1px dashed #fe8943' } },
			{ data: 'txc-textbox11', style: { padding:'10px', backgroundColor:'#e7fdb5', border:'1px dashed #9fd331' } },
			{ data: 'txc-textbox12', style: { padding:'10px', backgroundColor:'#dbe8fb', border:'1px dashed #79a5e4' } },

			{ data: 'txc-textbox13', style: { padding:'10px', backgroundColor:'#ffffff', border:'1px solid #cbcbcb' } },
			{ data: 'txc-textbox14', style: { padding:'10px', backgroundColor:'#eeeeee', border:'1px solid #c1c1c1' } },
			{ data: 'txc-textbox15', style: { padding:'10px', backgroundColor:'#fefeb8', border:'1px solid #f3c534' } },
			{ data: 'txc-textbox16', style: { padding:'10px', backgroundColor:'#fedec7', border:'1px solid #fe8943' } },
			{ data: 'txc-textbox17', style: { padding:'10px', backgroundColor:'#e7fdb5', border:'1px solid #9fd331' } },
			{ data: 'txc-textbox18', style: { padding:'10px', backgroundColor:'#dbe8fb', border:'1px solid #79a5e4' } },
			
			{ data: 'txc-textbox19', style: { padding:'10px', backgroundColor:'#ffffff', border:'3px double #cbcbcb' } },
			{ data: 'txc-textbox20', style: { padding:'10px', backgroundColor:'#eeeeee', border:'3px double #c1c1c1' } },
			{ data: 'txc-textbox21', style: { padding:'10px', backgroundColor:'#fefeb8', border:'3px double #f3c534' } },
			{ data: 'txc-textbox22', style: { padding:'10px', backgroundColor:'#fedec7', border:'3px double #fe8943' } },
			{ data: 'txc-textbox23', style: { padding:'10px', backgroundColor:'#e7fdb5', border:'3px double #9fd331' } },
			{ data: 'txc-textbox24', style: { padding:'10px', backgroundColor:'#dbe8fb', border:'3px double #79a5e4' } }
		]
	}
};

/**
 * \uc5d0\ub514\ud130 \uc804\ubc18\uc801\uc778 \uc124\uc815\uc744 \uad00\ub9ac\ud558\ub294 \ud074\ub798\uc2a4\ub85c \uac01 \ud568\uc218\ub97c static \ud558\uac8c \uc811\uadfc\ud560 \uc218 \uc788\ub2e4.
 *
 * @class
 */
var TrexConfig = function() {
	//preset < masala < project < page
	var __IS_SETUP = false;
	var __POST_PROCESSOR = [];
	var __TREX_PARAM = {};
	var __TREX_CONFIGURE = {
		wrapper: "tx_trex_container", //NOTE: May Service redefine 
		form: 'tx_editor_form', //NOTE: May Service redefine 
		params: [], //NOTE: Must Service redefine 
		pvpage: "#host#path/pages/blank.html",  //NOTE: Must Service redefine 
		events: {
			preventUnload: true,
			useHotKey: true
		},
		save: { },	
		adaptor: { },
		toolbar: { },
		sidebar: {
			attachbox: { },
			embeder: { },
			attacher: { },
			searcher: { }
		},
		plugin: { }
	};
	
	var __ICON_IMAGES_PATH = "../../images/icon/";
	var __DECO_IMAGES_PATH = "../../images/deco/";
	
	var _deepcopy = function(preset, service) {
		var _dest = preset;
		if(!service) {
			return _dest;
		}
		for(var _name in service) {
			switch(typeof(service[_name])) {
				case 'string':
				case 'number':
				case 'boolean': 
				case 'date':
				case 'function':
					_dest[_name] = service[_name];
					break;
				default:
					if (service[_name]) {
						if (service[_name].constructor == Array) {
							_dest[_name] = [].concat(service[_name]);
						} else {
							_dest[_name] = _dest[_name] || {};
							_deepcopy(_dest[_name], service[_name]);
						}
					} else {
						_dest[_name] = null;
					}
					break;
			}
		}
		return _dest;
	};
	
	var _createAnchors = function() {
		with (__TREX_CONFIGURE) {
			return {
				"Tool": toolbar,
				"Sidebar": sidebar,
				"Plugin": plugin,
				"Adaptor": adaptor,
				"Save": save,
				"Attacher": sidebar.attacher,
				"Embeder": sidebar.embeder,
				"Searcher": sidebar.searcher
			};
		};
	}
	 
	var _addParameter = function(tname, pname) {
		if (__IS_SETUP) {
			throw new Error("configure is already setup (addParameter)")
		}
		__TREX_PARAM[tname] = pname;
	};
	
	var _trexConfig = /** @lends TrexConfig */{
		/**
		 * url\uc744 \uc5d0\ub514\ud130 \uc124\uc815\uac12\uacfc \uc8fc\uc5b4\uc9c4 \ud30c\ub77c\ubbf8\ud130 \uac12\uc73c\ub85c \ubcc0\ud658\ud558\uc5ec \ub118\uaca8\uc900\ub2e4.
		 * @function
		 * @param {String} url - url 
		 * @param {Object} params - \ud0a4,\uac12 \uc30d\uc73c\ub85c \uc774\ub8e8\uc5b4\uc9c4 \ub370\uc774\ud130 
		 * @returns {String} \ubcc0\ud658\ub41c url
		 * @example 
		 * 		TrexConfig.getUrl("#host#path/pages/popup/image.html?username=#username", {
		 * 			'username': 'daumeditor'
		 * 		});
		 */
		getUrl: function(url, params) {
			if(url == null) return null;
			url = url.replace(/#host/g, __TREX_CONFIGURE["txHost"]).replace(/#path\/?/g, __TREX_CONFIGURE["txPath"]);
			
			for(var _name in __TREX_PARAM) {
				url = url.replace(new RegExp("#".concat(_name), "g"), __TREX_CONFIGURE[__TREX_PARAM[_name]]);
			}

			if(params) {
				for(var name in params) {
					url = url.replace(new RegExp("#".concat(name), "g"), params[name]);
				}
			}
			
			return url;
		},
		/**
		 * \ud31d\uc5c5\ucc3d\uc744 \ub744\uc6b8\ub54c \uc635\uc158\uc744 \ubb38\uc790\uc5f4\ub85c \ub9cc\ub4e4\uc5b4 \ub118\uaca8\uc900\ub2e4.
		 * @function
		 * @param {Object} features - \ud0a4,\uac12 \uc30d\uc73c\ub85c \uc774\ub8e8\uc5b4\uc9c4 \ub370\uc774\ud130 
		 * @returns {String} \uc635\uc158 \ubb38\uc790\uc5f4
		 * @example 
		 * 		TrexConfig.getPopFeatures({ left:250, top:65, width:797, height:644 });
		 */
		getPopFeatures: function(features) {
			if(features == null) return null;
			if(typeof(features) === "string") { //redefine
				return features;
			}
			var popFeatures = [];
			["toolbar", "location", "directories", "menubar"].each(function(name) {
				popFeatures.push(name + "=" + (features[name] || "no"));	
			});
			["scrollbars", "resizable"].each(function(name) {
				popFeatures.push(name + "=" + (features[name] || "yes"));	
			});
			["width", "height"].each(function(name) {
				popFeatures.push(name + "=" + (features[name] || "500"));	
			});
			["left", "top"].each(function(name) {
				popFeatures.push(name + "=" + (features[name] || "100"));	
			});
			return popFeatures.join(",");
		},
		/**
		 * \ucee8\ud150\uce20 \uc0bd\uc785\uc6a9 \uc774\ubbf8\uc9c0\uc758 \uc0c1\uc704 url\uc744 \ub118\uaca8\uc900\ub2e4. <br/>
		 * \uae30\ubcf8 \uacbd\ub85c\ub294 #host#path/images/deco/ \uc774\uba70,
		 * txDecoPath \uac12\uc774 \uc14b\ud305\ub41c \uacbd\uc6b0\ub294 \ud574\ub2f9 url\uc744 \ub118\uaca8\uc900\ub2e4.
		 * @function
		 * @param {String} url - url 
		 * @param {String} subpath - \ud558\uc704 \ub514\ub809\ud130\ub9ac (optional)
		 * @returns {String} \ubcc0\ud658\ub41c \ucee8\ud150\uce20 \uc0bd\uc785\uc6a9 \uc774\ubbf8\uc9c0url
		 */
		getDecoPath: function(url, subpath) {
			if (__TREX_CONFIGURE["txDecoPath"]) {
				url = url.replace(/#decopath\/?/, __TREX_CONFIGURE["txDecoPath"]);
			} else {
				subpath = subpath? subpath + "/": "";
				url = url.replace(/#decopath\/?/, __DECO_IMAGES_PATH + subpath);
			}	
			return url;
		},
		/**
		 * \uc5d0\ub514\ud130\uc5d0\uc11c \uc0ac\uc6a9\ub418\ub294 \uc774\ubbf8\uc9c0\uc758 \uc0c1\uc704 url\uc744 \ub118\uaca8\uc900\ub2e4. <br/>
		 * \uae30\ubcf8 \uacbd\ub85c\ub294 #host#path/images/icon/ \uc774\uba70,
		 * txIconPath \uac12\uc774 \uc14b\ud305\ub41c \uacbd\uc6b0\ub294 \ud574\ub2f9 url\uc744 \ub118\uaca8\uc900\ub2e4.
		 * @function
		 * @param {String} url - url 
		 * @param {String} subpath - \ud558\uc704 \ub514\ub809\ud130\ub9ac (optional)
		 * @returns {String} \uc5d0\ub514\ud130\uc5d0\uc11c \uc0ac\uc6a9\ub418\ub294 \uc774\ubbf8\uc9c0url
		 */
		getIconPath: function(url, subpath) {
			if (__TREX_CONFIGURE["txIconPath"]) {
				url = url.replace(/#iconpath\/?/, __TREX_CONFIGURE["txIconPath"]);
			} else {
				subpath = subpath? subpath + "/": "";
				url = url.replace(/#iconpath\/?/, __ICON_IMAGES_PATH + subpath);
			}	
			return url;
		},
		/**
		 * \uc5d0\ub514\ud130 \ub85c\ub529\uc774 \uc644\ub8cc\ub418\uba74 \uc124\uc815\uac12\uc744 \uc14b\uc5c5\uc2dc\ud0a4\ub294 \ud568\uc218\ub85c
		 * postprocessing\ub85c \ub4f1\ub85d\ub41c \ud568\uc218\ub4e4\uc744 \uc2e4\ud589\ud558\uba70
		 * \uc774\ud6c4\uc5d0\ub294 \uc124\uc815\uac12\uc744 \ucd94\uac00\ud560 \uc218 \uc5c6\ub2e4.
		 * @private
		 * @function
		 * @param {Object} config - new Editor() \ud560 \ub54c \uc785\ub825\ud55c \uc124\uc815\uac12
		 * @returns {Object} \uc14b\uc5c5\ub41c \uc124\uc815\uac12
		 */
		setup: function(config) { 
			_deepcopy(__TREX_CONFIGURE, config);
			
			__TREX_CONFIGURE.params.each(function(name) {
				_addParameter(name, name);
			});
			__POST_PROCESSOR.each(function(fn) {
				fn(__TREX_CONFIGURE);
			});
	
			__IS_SETUP = true;
			return __TREX_CONFIGURE;
		},
		/**
		 * \ud30c\ub77c\ubbf8\ud130\ub97c \ucd94\uac00\ud55c\ub2e4.<br/> 
		 * \ud30c\ub77c\ubbf8\ud130\ub780 getUrl \ud560 \ub54c \uae30\ubcf8\uc73c\ub85c \ubcc0\ud658\ud560 \ud0a4,\uac12\ub4e4\uc744 \uc815\uc758\ud574\ub193\uc740 \ub370\uc774\ud130
		 * @function
		 * @param {String} tname - url\uc5d0 \ud3ec\ud568\ub420 id 
		 * @param {String} pname - \uc124\uc815\uac12\uc5d0 \uc874\uc7ac\ud558\ub294 id
		 * @example
		 * 		TrexConfig.addParameter('host', 'txHost');
		 */
		addParameter: function(tname, pname) {
			_addParameter(tname, pname);
		},
		/**
		 * \uc8fc\uc5b4\uc9c4 \uc124\uc815\uac12\uc744 deep copy\ub85c \ubcf5\uc0ac\ud55c\ub2e4.
		 * @function
		 * @param {Object} config - \uc8fc\uc5b4\uc9c4 \uc124\uc815\uac12
		 */
		clone: function(config) {
			return _deepcopy({}, config);
		},
		/**
		 * \uc8fc\uc5b4\uc9c4 \uc124\uc815\uac12\uc5d0 \uc0c8\ub85c\uc6b4 \uc124\uc815\uac12\ub4e4\uc744 deep copy\ub85c \ubcf5\uc0ac\ud55c\ub2e4. 
		 * @function
		 * @param {Object} config - \uccab\ubc88\uc9f8 \uc778\uc790\ub294 \uc8fc\uc5b4\uc9c4 \uc124\uc815\uac12, \uadf8 \uc774\ud6c4\ub294 \uc0c8\ub85c\uc6b4 \uc124\uc815\uac12\ub4e4
		 * @example 
		 * 		TrexConfig.merge(config, { 'id': 'tx_happy' }, { 'options': [1,2,3] });
		 */
		merge: function() {
			var _config = {};
			$A(arguments).each(function(source) {
				_deepcopy(_config, source);
			});
			return _config;
		}
	};
	
	/**
	 * \uc8fc\uc5b4\uc9c4 \uc124\uc815\uac12\uc744 root \uc124\uc815\uac12\uc5d0 \ucd94\uac00\ud55c\ub2e4.
	 * @name add
	 * @memberOf TrexConfig
	 * @function
	 * @param {Object} config - \uc8fc\uc5b4\uc9c4 \uc124\uc815\uac12
	 * @param {Function} postprocessing - \uc5d0\ub514\ud130\uac00 \ub85c\ub529\ub41c \ud6c4 \ucc98\ub9ac\ud560 \ud568\uc218 (optional)
	 */
	_trexConfig["add"] = function(config, postprocessing) {
		if (__IS_SETUP) {
			throw new Error("configure is already setup (mergeConfig)")
		}
		_deepcopy(__TREX_CONFIGURE, config);
		if(postprocessing) {
			__POST_PROCESSOR.push(postprocessing);
		}
	};
	/**
	 * \uc8fc\uc5b4\uc9c4 \ud0a4\ub85c \uc124\uc815\uac12\uc744 \ub9ac\ud134\ud55c\ub2e4.
	 * @name get
	 * @memberOf TrexConfig
	 * @function
	 * @param {String} key - \uc8fc\uc5b4\uc9c4 \ud0a4
	 */
	_trexConfig["get"] = function(key) {
		return __TREX_CONFIGURE[key];
	};
	
	/**
	 * \uc8fc\uc5b4\uc9c4 \ud0a4\ub85c \uc8fc\uc5b4\uc9c4 \uc124\uc815\uac12\uc744 root/toolbar \uc544\ub798\uc5d0 \ucd94\uac00\ud55c\ub2e4.
	 * @name addTool
	 * @memberOf TrexConfig
	 * @function
	 * @param {String} key - \uc8fc\uc5b4\uc9c4 \ud0a4\uac12 
	 * @param {Object} config - \uc8fc\uc5b4\uc9c4 \uc124\uc815\uac12
	 * @param {Function} postprocessing - \uc5d0\ub514\ud130\uac00 \ub85c\ub529\ub41c \ud6c4 \ucc98\ub9ac\ud560 \ud568\uc218 (optional)
	 */
	/**
	 * \uc8fc\uc5b4\uc9c4 \ud0a4\ub85c \uc8fc\uc5b4\uc9c4 \uc124\uc815\uac12\uc744 root/sidebar \uc544\ub798\uc5d0 \ucd94\uac00\ud55c\ub2e4.
	 * @name addSidebar
	 * @memberOf TrexConfig
	 * @function
	 * @param {String} key - \uc8fc\uc5b4\uc9c4 \ud0a4\uac12 
	 * @param {Object} config - \uc8fc\uc5b4\uc9c4 \uc124\uc815\uac12
	 * @param {Function} postprocessing - \uc5d0\ub514\ud130\uac00 \ub85c\ub529\ub41c \ud6c4 \ucc98\ub9ac\ud560 \ud568\uc218 (optional)
	 */
	/**
	 * \uc8fc\uc5b4\uc9c4 \ud0a4\ub85c \uc8fc\uc5b4\uc9c4 \uc124\uc815\uac12\uc744 root/plugin \uc544\ub798\uc5d0 \ucd94\uac00\ud55c\ub2e4.
	 * @name addPlugin
	 * @memberOf TrexConfig
	 * @function
	 * @param {String} key - \uc8fc\uc5b4\uc9c4 \ud0a4\uac12 
	 * @param {Object} config - \uc8fc\uc5b4\uc9c4 \uc124\uc815\uac12
	 * @param {Function} postprocessing - \uc5d0\ub514\ud130\uac00 \ub85c\ub529\ub41c \ud6c4 \ucc98\ub9ac\ud560 \ud568\uc218 (optional)
	 */
	/**
	 * \uc8fc\uc5b4\uc9c4 \ud0a4\ub85c \uc8fc\uc5b4\uc9c4 \uc124\uc815\uac12\uc744 root/adaptor \uc544\ub798\uc5d0 \ucd94\uac00\ud55c\ub2e4.
	 * @name addAdaptor
	 * @memberOf TrexConfig
	 * @function
	 * @param {String} key - \uc8fc\uc5b4\uc9c4 \ud0a4\uac12 
	 * @param {Object} config - \uc8fc\uc5b4\uc9c4 \uc124\uc815\uac12
	 * @param {Function} postprocessing - \uc5d0\ub514\ud130\uac00 \ub85c\ub529\ub41c \ud6c4 \ucc98\ub9ac\ud560 \ud568\uc218 (optional)
	 */
	/**
	 * \uc8fc\uc5b4\uc9c4 \ud0a4\ub85c \uc8fc\uc5b4\uc9c4 \uc124\uc815\uac12\uc744 root/save \uc544\ub798\uc5d0 \ucd94\uac00\ud55c\ub2e4.
	 * @name addSave
	 * @memberOf TrexConfig
	 * @function
	 * @param {String} key - \uc8fc\uc5b4\uc9c4 \ud0a4\uac12 
	 * @param {Object} config - \uc8fc\uc5b4\uc9c4 \uc124\uc815\uac12
	 * @param {Function} postprocessing - \uc5d0\ub514\ud130\uac00 \ub85c\ub529\ub41c \ud6c4 \ucc98\ub9ac\ud560 \ud568\uc218 (optional)
	 */
	/**
	 * \uc8fc\uc5b4\uc9c4 \ud0a4\ub85c \uc8fc\uc5b4\uc9c4 \uc124\uc815\uac12\uc744 root/sidebar/attacher \uc544\ub798\uc5d0 \ucd94\uac00\ud55c\ub2e4.
	 * @name addAttacher
	 * @memberOf TrexConfig
	 * @function
	 * @param {String} key - \uc8fc\uc5b4\uc9c4 \ud0a4\uac12 
	 * @param {Object} config - \uc8fc\uc5b4\uc9c4 \uc124\uc815\uac12
	 * @param {Function} postprocessing - \uc5d0\ub514\ud130\uac00 \ub85c\ub529\ub41c \ud6c4 \ucc98\ub9ac\ud560 \ud568\uc218 (optional)
	 */
	/**
	 * \uc8fc\uc5b4\uc9c4 \ud0a4\ub85c \uc8fc\uc5b4\uc9c4 \uc124\uc815\uac12\uc744 root/sidebar/embeder \uc544\ub798\uc5d0 \ucd94\uac00\ud55c\ub2e4.
	 * @name addEmbeder
	 * @memberOf TrexConfig
	 * @function
	 * @param {String} key - \uc8fc\uc5b4\uc9c4 \ud0a4\uac12 
	 * @param {Object} config - \uc8fc\uc5b4\uc9c4 \uc124\uc815\uac12
	 * @param {Function} postprocessing - \uc5d0\ub514\ud130\uac00 \ub85c\ub529\ub41c \ud6c4 \ucc98\ub9ac\ud560 \ud568\uc218 (optional)
	 */
	/**
	 * \uc8fc\uc5b4\uc9c4 \ud0a4\ub85c \uc8fc\uc5b4\uc9c4 \uc124\uc815\uac12\uc744 root/sidebar/searcher \uc544\ub798\uc5d0 \ucd94\uac00\ud55c\ub2e4.
	 * @name addSearcher
	 * @memberOf TrexConfig
	 * @function
	 * @param {String} key - \uc8fc\uc5b4\uc9c4 \ud0a4\uac12 
	 * @param {Object} config - \uc8fc\uc5b4\uc9c4 \uc124\uc815\uac12
	 * @param {Function} postprocessing - \uc5d0\ub514\ud130\uac00 \ub85c\ub529\ub41c \ud6c4 \ucc98\ub9ac\ud560 \ud568\uc218 (optional)
	 */
	var _addConfig = function(key, config, postprocessing) {
		if (__IS_SETUP) {
			throw new Error("configure is already setup (mergeConfig)")
		}
		this[key] = this[key] || {};
		_deepcopy(this[key], config);
		if(postprocessing) {
			__POST_PROCESSOR.push(postprocessing);
		}
	};
	
	/**
	 * \uc8fc\uc5b4\uc9c4 \ud0a4\ub85c root/toolbar[key]\uc758 \uc124\uc815\uac12\uc744 \ub9ac\ud134\ud55c\ub2e4.
	 * @name getTool
	 * @memberOf TrexConfig
	 * @function
	 * @param {String,Object} key - \uc8fc\uc5b4\uc9c4 \ud0a4
	 */
	/**
	 * \uc8fc\uc5b4\uc9c4 \ud0a4\ub85c root/sidebar[key]\uc758 \uc124\uc815\uac12\uc744 \ub9ac\ud134\ud55c\ub2e4.
	 * @name getSidebar
	 * @memberOf TrexConfig
	 * @function
	 * @param {String,Object} key - \uc8fc\uc5b4\uc9c4 \ud0a4
	 */
	/**
	 * \uc8fc\uc5b4\uc9c4 \ud0a4\ub85c root/adaptor[key]\uc758 \uc124\uc815\uac12\uc744 \ub9ac\ud134\ud55c\ub2e4.
	 * @name getAdaptor
	 * @memberOf TrexConfig
	 * @function
	 * @param {String,Object} key - \uc8fc\uc5b4\uc9c4 \ud0a4
	 */
	/**
	 * \uc8fc\uc5b4\uc9c4 \ud0a4\ub85c root/save[key]\uc758 \uc124\uc815\uac12\uc744 \ub9ac\ud134\ud55c\ub2e4.
	 * @name getSave
	 * @memberOf TrexConfig
	 * @function
	 * @param {String,Object} key - \uc8fc\uc5b4\uc9c4 \ud0a4
	 */
	/**
	 * \uc8fc\uc5b4\uc9c4 \ud0a4\ub85c root/sidebar/attacher[key]\uc758 \uc124\uc815\uac12\uc744 \ub9ac\ud134\ud55c\ub2e4.
	 * @name getAttacher
	 * @memberOf TrexConfig
	 * @function
	 * @param {String,Object} key - \uc8fc\uc5b4\uc9c4 \ud0a4
	 */
	/**
	 * \uc8fc\uc5b4\uc9c4 \ud0a4\ub85c root/sidebar/embeder[key]\uc758 \uc124\uc815\uac12\uc744 \ub9ac\ud134\ud55c\ub2e4.
	 * @name getEmbeder
	 * @memberOf TrexConfig
	 * @function
	 * @param {String,Object} key - \uc8fc\uc5b4\uc9c4 \ud0a4
	 */
	/**
	 * \uc8fc\uc5b4\uc9c4 \ud0a4\ub85c root/sidebar/searcher[key]\uc758 \uc124\uc815\uac12\uc744 \ub9ac\ud134\ud55c\ub2e4.
	 * @name getSearcher
	 * @memberOf TrexConfig
	 * @function
	 * @param {String,Object} key - \uc8fc\uc5b4\uc9c4 \ud0a4
	 */
	var _getConfig = function(key) {
		return this[key];
	};
	
	var _anchors = _createAnchors();
	for(var _name in _anchors) {
		_trexConfig["add" + _name] = _addConfig.bind(_anchors[_name]);
		_trexConfig["get" + _name] = _getConfig.bind(_anchors[_name]);
	}
	
	return _trexConfig;
	
}();


var TrexMessage = function() {
	var __MESSAGES = {};
	
	var _deepcopy = function(preset, service) {
		var _dest = preset;
		for(var _name in service) {
			switch(typeof(service[_name])) {
				case 'undefined':
				case 'null':
				case 'string':
				case 'number':
				case 'boolean': 
				case 'date':
				case 'function':
					_dest[_name] = service[_name];
					break;
				default:
					if(service[_name].constructor == Array) {
						_dest[_name] = [].concat(service[_name]);
					} else {
						_deepcopy(_dest[_name] || {}, service[_name]);
					}
					break;
			}
		}
		return _dest;
	};
	
	var _trexMessage = {
		getMsg: function(msgid){
			var _message = __MESSAGES[msgid] || "";
			
			if (_message.indexOf("#iconpath") > -1) {
				_message = TrexConfig.getIconPath(_message);
			}
			if (_message.indexOf("#decopath") > -1) {
				_message = TrexConfig.getDecoPath(_message);
			}
			return _message;
		},
		addMsg: function(messages) {
			_deepcopy(__MESSAGES, messages);
		},
		printAll: function() {
			var _cc = console;
			for(var _name in __MESSAGES) {
				_cc.log(_name + '=' + __MESSAGES[_name]);
			}
		}
	};
	
	return _trexMessage;
}();

window.TXMSG = TrexMessage.getMsg;	

Trex.MarkupTemplate = {};

(function() {
	var __TEMPLATES = {};
	Trex.define(Trex.MarkupTemplate, {
		add: function(name, template) {
			__TEMPLATES[name] = template;
		},
		get: function(name) {
			if(!__TEMPLATES[name]) {
				return {
					evaluate: function() { return ""; },
					evaluateToDom: function() { return ""; }
				};
			}
			if(typeof(__TEMPLATES[name]) == 'string') {
				var _template = __TEMPLATES[name].replace(/@[\w\.]+/g, function(full) {
					return TXMSG(full);
				});
				__TEMPLATES[name] = new Template(_template);
			}
			return __TEMPLATES[name];
		},
		splitList: function(rows, cols, items){
			var _matrix = { 'row': [] };
			var _total = items.length;
			var _matrix_row = _matrix.row; 
			for(var row=0; row<rows; row++) {
				_matrix_row.push({ 'col': [] });
				var _matrix_col = _matrix_row.last().col;
				for(var col=0; col<cols; col++) {
					var _item = {
						'image': '',
						'data': '&nbsp;',
						'klass': ''
					};
					if(row * cols + col < _total) {
						if(typeof(items[row * cols + col]) == 'string') {
							_item.data = items[row * cols + col];
						} else {
							_item = Object.extend(_item ,items[row * cols + col]);
						}
					}
					_matrix_col.push(_item);
				}
			};
			return _matrix;
		}
	});
})();
/** @namespace */
var $tom = {};

(function() {
	var __TRANSLATIONS = {
		'%body': ['body'],
		'%text': ['#text', 'br'],
		'%element': ['#element'],
		'%control': ['img','object','hr','table','button'], //['input','select','textarea','label','br'],
		'%inline': ['span','font','u','i','b','em','strong','big','small','a','sub','sup','span'],//['tt','dfn','code','samp','kbd','var','cite','abbr','acronym','img','object','br','script','map','q','bdo','input','select','textarea','label','button'], 
		'%block': ['p','div','ul','ol','h1','h2','h3','h4','h5','h6','pre','dl','hr','table','button'], //['noscript','blockquote','form','fieldset','address'], !button
		'%paragraph': ['p','li','dd','dt','h1','h2','h3','h4','h5','h6','td','th','div','caption'], //!button
		'%wrapper': ['div','ul','ol','dl','pre','xmp','table','button'],
		'%innergroup': ['li','dd','dt','td', 'th'],
		'%outergroup': ['ul','ol','dl','tr','tbody','thead','tfoot','table'],
		'%tablegroup': ['td', 'th','tr','tbody','thead','tfoot','table'],
		'%listgroup': ['li','ul','ol'],
		'%datagroup': ['dd','dt','dl'],
		'%listhead': ['ul','ol']
	};
	
	var __TRANSLATIONS_MAP = {}; //for caching
	for(var _ptrn in __TRANSLATIONS) {
		__TRANSLATIONS_MAP[_ptrn] = {};
		if (__TRANSLATIONS[_ptrn]) {
			$A(__TRANSLATIONS[_ptrn]).each(function(tag){
				__TRANSLATIONS_MAP[_ptrn][tag] = true;
			});
		}
	}
	
	function createMap(patterns) {
		var _map = {};
		var _patterns = patterns.split(",");
		_patterns.each(function(pattern) {
			if(__TRANSLATIONS_MAP[pattern]) {
				for(var _part in __TRANSLATIONS_MAP[pattern]) {
					_map[_part] = true;
				}
			} else {
				_map[pattern] = true;
			}
		});
		return _map;
	}
	
	var Translator = Trex.Class.create({
		initialize: function(patterns) {
			this.patterns = patterns;
			this.map = createMap(patterns);
		},
		hasParts: function() {
			return (this.patterns.length > 0);
		},
		include: function(partPtrn) {
			var _partMap = createMap(partPtrn);
			for(var _part in _partMap) {
				if(this.map[_part]) {
					return true;
				}
			}
			return false;
		},
		memberOf: function(wholePtrn) {
			var _wholeMap = createMap(wholePtrn);
			for(var _part in this.map) {
				if(_wholeMap[_part]) {
					return true;
				}
			}
			return false;
		},
		extract: function(wholePtrn) {
			var _wholeMap = createMap(wholePtrn);
			var _matches = [];
			for(var _part in this.map) {
				if(_wholeMap[_part]) {
					_matches.push(_part);
				}
			}
			return $tom.translate(_matches.join(","));
		},
		getExpression: function() {
			if(!this.exprs) {
				var _exprs = [];
				for(var _part in this.map) {
					_exprs.push(_part);
				}
				this.exprs = _exprs.join(",");
			}
			return this.exprs;
		}
	});
	
	var __TRANSLATOR_CACHES = {}; //for caching	
	Object.extend($tom, {
		translate: function(pattern) {
			if(!__TRANSLATOR_CACHES[pattern]) {
				__TRANSLATOR_CACHES[pattern] = new Translator(pattern);
			}
			return __TRANSLATOR_CACHES[pattern];
		}
	});
	
})();

Object.extend($tom, {
	__POSITION: {
		__START_OF_TEXT: -1,
		__MIDDLE_OF_TEXT: 0,
		__END_OF_TEXT: 1
	}
});
	
Object.extend($tom, /** @lends $tom */{
	/**
	 * node\uac00 HTMLElement\uc774\uba74 true\ub97c \uc544\ub2c8\uba74 false\ub97c \ubc18\ud658\ud55c\ub2e4.
	 * @function
	 */
	isElement: function(node) {
		return $tom.kindOf(node, '%element');
	},
	/**
	 * node\uac00 <body> \uc694\uc18c\uc774\uba74 true\ub97c \ubc18\ud658\ud55c\ub2e4.
	 * @function
	 */
	isBody: function(node) {
		return $tom.kindOf(node, '%body');
	},
	/**
	 * node\uac00 \uc544\ub798\uc5d0 \ub098\uc5f4\ub41c block \uc694\uc18c\uc774\uba74 true \ub97c \ubc18\ud658\ud55c\ub2e4.
	 * 'p','div','ul','ol','h1','h2','h3','h4','h5','h6','pre','dl','hr','table','button'
	 * @function
	 */
	isBlock: function(node) {
		return $tom.kindOf(node, '%block');
	},
	/**
	 * node\uac00 \uc544\ub798\uc5d0 \ub098\uc5f4\ub41c \uc694\uc18c\uc774\uba74 true \ub97c \ubc18\ud658\ud55c\ub2e4.
	 * 'p','li','dd','dt','h1','h2','h3','h4','h5','h6','td','th','div','caption'
	 * @function
	 */
	isParagraph: function(node) {
		return $tom.kindOf(node, '%paragraph');
	},
	/**
	 * node\uac00 \uc544\ub798\uc5d0 \ub098\uc5f4\ub41c inline \uc694\uc18c\uc774\uba74 true \ub97c \ubc18\ud658\ud55c\ub2e4.
	 * 'span','font','u','i','b','em','strong','big','small','a','sub','sup','span'
	 * @function
	 */
	isInline: function(node) {
		if(this.isText(node)) {
			return true;
		}
		return $tom.kindOf(node, '%inline');
	},
	/**
	 * node\uac00 \ud14d\uc2a4\ud2b8\uc774\uac70\ub098 <br> \uc694\uc18c\uc774\uba74 true \ub97c \ubc18\ud658\ud55c\ub2e4.
	 * @function
	 */
	isText: function(node) {
		return $tom.kindOf(node, '%text');
	},
	/**
	 * node\uac00 \uc544\ub798\uc5d0 \ub098\uc5f4\ub41c \uc694\uc18c\uc774\uba74 true\ub97c \ubc18\ud658\ud55c\ub2e4.
	 * 'img','object','hr','table','button'
	 * @function
	 */
	isControl: function(node) {
		return $tom.kindOf(node, '%control');
	},
	/**
	 * node\uc758 \uc774\ub984\uc744 \ubc18\ud658\ud55c\ub2e4.
	 * @function
	 */
	getName: function(node) {
		return ((node && node.nodeType == 1)? node.nodeName.toLowerCase(): "");
	},
	/**
	 * node\uc758 text content \ub97c \ubc18\ud658\ud55c\ub2e4.
	 * @function
	 */
	getText: function(node) {
		
		return node.textContent || node.text || node.innerText || "";	
	},
	/**
	 * \uc694\uc18c\uc758 nodeType 1\uc774\uba74 child \ub178\ub4dc\uc758 \uae38\uc774\ub97c, nodeType 3\uc774\uba74 nodeValue\uc758 \uae38\uc774\ub97c \ubc18\ud658\ud55c\ub2e4.  
	 * @function
	 */
	getLength: function(node) {
		if(!node) {
			return 0;
		}
		if(node.nodeType == 1) {
			return node.childNodes.length;
		} else if(node.nodeType == 3) {
			return node.nodeValue.length;
		}
		return 0; 
	},
	/**
	 * node\uac00 \uac19\uc740 \ub808\ubca8\uc758 \uc694\uc18c \uc911 \uba87 \ubc88\uc9f8\uc778\uc9c0 \uc778\ub371\uc2a4\uac12\uc744 \ubc18\ud658\ud55c\ub2e4.
	 * @function
	 */
	indexOf: function(node){
		if(!node) {
			return -1;
		}
		var _inx = -1;
		var _pNode = node.parentNode;
		var _cNode = _pNode.firstChild;
		while(_cNode) {
			_inx++;
			if(_cNode == node) {
				break;
			}
			_cNode = _cNode.nextSibling;
		}
		return _inx;
	},
	/**
	 * node\uac00 textNode\uc774\uba74 \uacf5\ubc31\uc744 \uc81c\uac70\ud55c nodeValue\uc758 \ub0b4\uc6a9\uc774 \uc874\uc7ac\ud558\uba74 true\ub97c \ubc18\ud658\ud55c\ub2e4.
	 * @function
	 */
	hasContent: function(node, ignoreZWNBS) {
		if(!node || node.nodeType != 3) {
			return true;
		}

		var _text = $tom.removeMeaninglessSpace( node.nodeValue );
		if(ignoreZWNBS) {
			_text = _text.replace(/\ufeff/g, "");
		}
		return (_text != "");
	},
	/**
	 * node\uc758 child\uac00 \uc788\uc73c\uba74 true\ub97c \ubc18\ud658\ud55c\ub2e4.
	 * @function
	 */
	hasChildren: function(node, ignoreZWNBS) {
		if(!node) {
			return false;
		}
		var _inner = $tom.removeMeaninglessSpace( node.innerHTML );
		if(ignoreZWNBS) {
			_inner = _inner.replace(/\ufeff/g, "");
		}
		if(!_inner) {
			return false;
		}
		if(_inner.stripTags()) {
			return true;
		}
		if(_inner.search(/<br\s?\/?>/i) > -1) {
			return true;
		}
		if(_inner.search(/<span\sid="?tx_(start|end)_marker"?><\/span>/i) > -1) {
			return true;
		}
		return false;
	},
	/**
	 * node\uc5d0 \uc758\ubbf8\uc788\ub294 \ub370\uc774\ud130\uac00 \uc788\ub294\uc9c0 \ud655\uc778\ud55c\ub2e4.
	 * @function
	 */
	hasData: function(node, ignoreStuff) {
		if(!node) {
			return false;
		}
		
		var _inner = '';
		if(node.nodeType == 1) {
			_inner = node.innerHTML;
		} else {
			_inner = node.nodeValue;
		}
		_inner = $tom.removeMeaninglessSpace( _inner );
		if(_inner == '') {
			return false;
		}
		if(_inner.stripTags() != '') {
			return true;
		}
		if(ignoreStuff) {
			return false;
		}
		if(_inner.search(/<br\s?\/?>/i) > -1) {
			return true;
		}
		return false;
	},
	/**
	 * \uc8fc\uc5b4\uc9c4 \uc2a4\ud2b8\ub9c1\uc5d0\uc11c \uc758\ubbf8\uc5c6\ub294 \uc2a4\ud398\uc774\uc2a4\ub97c \uc81c\uac70\ud558\ub294 \ud568\uc218.
	 * @function
	 */
	removeMeaninglessSpace: function(str){
		/* /\s/ == /[\f\n\r\t\v\u2028\u2029\u00a0]/ */
		return str.replace(/(^[\f\n\r\t\v\u2028\u2029]*)|([\f\n\r\t\v\u2028\u2029]*$)/g, "");
	}
});	

Object.extend($tom, /** @lends $tom */{
	/**
	 * css selector \ub85c \uc694\uc18c\ub97c \ucc3e\uc544\uc11c \ubc18\ud658\ud558\ub294\ub370 \uc778\uc790 node\uc758 \uc0c1\uc704\uc5d0 \uc788\ub294 \uc694\uc18c\ub97c \ucc3e\ub294\ub2e4.
	 * @function
	 * @example
	 *  var _elNode = $tom.find(node, "table.txc-layout-wz");
	 */
	find: function() {
		var _context, _pattern;
		if(arguments.length == 1) {
			if(typeof (arguments[0]) === "string") {
				_context = document;
				_pattern = arguments[0];
			}
		} else if(arguments.length == 2) {
			if(arguments[0].nodeType && typeof (arguments[1]) === "string") {
				_context = arguments[0];
				_pattern = arguments[1];
			}
		}
		if(!_pattern) {
			return null;
		}
		var _translator = $tom.translate(_pattern);
		return dFindy(_context, _translator.getExpression());
	},
	/**
	 * css selector \ub85c \uc694\uc18c\ub97c \ucc3e\uc544\uc11c \ubc18\ud658\ud558\ub294\ub370 \uc778\uc790 node\uc758 \ud558\uc704\uc5d0 \uc788\ub294 \uc694\uc18c\ub97c \ucc3e\ub294\ub2e4.
	 * @function
	 * @example
	 *  var _elInput = $tom.collect(this.elMenu, 'textarea');
	 */
	collect: function() {
		var _context, _pattern;
		if(arguments.length == 1) {
			if(typeof (arguments[0]) === "string") {
				_context = document;
				_pattern = arguments[0];
			}
		} else if(arguments.length == 2) {
			if(arguments[0].nodeType && typeof (arguments[1]) === "string") {
				_context = arguments[0];
				_pattern = arguments[1];
			}
		}
		if(!_pattern) {
			return null;
		}
		var _translator = $tom.translate(_pattern);
		return dGetty(_context, _translator.getExpression());
	},
	/**
	 * css selector\ub85c \uc694\uc18c\ub97c \ucc3e\uc544\uc11c \ubc18\ud658\ud558\ub294\ub370 \uc778\uc790 node\uc758 \ud558\uc704\uc5d0 \uc788\ub294 \uc694\uc18c\ub97c \ucc3e\uace0 \ubaa8\ub4e0 \uc694\uc18c\ub97c \ubc30\uc5f4\uc5d0 \ub2f4\uc544\uc11c \ubc18\ud658\ud55c\ub2e4.
	 * @function
	 * @example
	 *  var _elItemList = $tom.collectAll(this.elMenu, "li a");  
	 */
	collectAll: function() {
		var _context, _pattern;
		if(arguments.length == 1) {
			if(typeof (arguments[0]) === "string") {
				_context = document;
				_pattern = arguments[0];
			}
		} else if(arguments.length == 2) {
			if(arguments[0].nodeType && typeof (arguments[1]) === "string") {
				_context = arguments[0];
				_pattern = arguments[1];
			}
		}
		if(!_pattern) {
			return [];
		}
		var _translator = $tom.translate(_pattern);
		return dGetties(_context, _translator.getExpression());
	}
});	

(function() {
	function makeFilter(pattern) {
		if(pattern) {
			if(typeof(pattern) === 'function') {
				return pattern;
			} else {
				var _translator = $tom.translate(pattern);
				return function(node) {
					if(node.nodeType == 1) {
						if (_translator.include('#element')) {
							return true;
						} else {
							return dChecky(node, _translator.getExpression());
						}
					} else {
						return _translator.include('#text');
					}
				};
			}
		} else {
			return null;
		}
	}
	
	Object.extend($tom, /** @lends $tom */{
		/**
		 * node\uac00 pattern\uc5d0 \ub9de\ub294 \uc694\uc18c\uc774\uba74 true\ub97c \ubc18\ud658\ud55c\ub2e4. 
		 * @function
		 * @param node
		 * @param pattern css selector rule
		 * @example
		 *  $tom.kindOf(node, "img.txc-image") // node\uac00 txc-image\ub77c\ub294 \uc774\ub984\uc758 class\uc18d\uc131\uc744 \uac00\uc9c4 img \uc694\uc18c\uc774\uba74 true
		 */
		kindOf: function(node, pattern) {
			if(!node || !pattern) {
				return false;
			}
			return makeFilter(pattern)(node);
		},
		/* has filter */
		/**
		 * pattern\uc5d0 \ub9de\ub294 descendant\uc758 \uc0c1\uc704\uc694\uc18c\ub97c \ucc3e\uc544\uc11c \ubc18\ud658\ud55c\ub2e4.
		 * @function
		 */
		ancestor: function(descendant, pattern) {
			if(!descendant || !descendant.parentNode) {
				return null;
			}
			var _filter = makeFilter(pattern);
			var _node = descendant.parentNode;
			while(_node) {
				if($tom.isBody(_node)) {
					return null;
				}
				if(!_filter || _filter(_node)) {
					break;
				}
				_node = _node.parentNode;
			}
			return _node;
		}, 
		/**
		 * pattern\uc5d0 \ub9de\ub294 descendant\uc758 \ud558\uc704\uc694\uc18c\ub97c \ucc3e\uc544\uc11c \ubc18\ud658\ud55c\ub2e4.
		 * @function
		 */
		descendant: function(ancestor, pattern) {
			var _nodes = $tom.descendants(ancestor, pattern, true);
			if(_nodes.length == 0) {
				return null;
			}
			return _nodes[0];
		}, 
		/**
		 * pattern\uc5d0 \ub9de\ub294 descendant\uc758 \ubaa8\ub4e0 \ud558\uc704\uc694\uc18c\ub97c \ucc3e\uc544\uc11c \ubc18\ud658\ud55c\ub2e4.
		 * @function
		 */
		descendants: function(ancestor, pattern, single) {
			single = single || false;
			if(!ancestor || !ancestor.firstChild) {
				return [];
			}
			var _found = false;
			var _filter = makeFilter(pattern);
			var _nodes = [];
			var _gets = function(parent) {
				if(single && _found) {
					return;
				}
				if(!$tom.first(parent)) {
					return;
				}
				var _chilren = $tom.children(parent);
				for(var i=0,len=_chilren.length;i<len;i++) {
					if (!_filter || _filter(_chilren[i])) {
						_nodes.push(_chilren[i]);
						_found = true;
					} else {
						_gets(_chilren[i]);
					}
				}
			}
			_gets(ancestor);
			return _nodes;
		}, 
		/**
		 * node\uc758 \uc790\uc2dd\uc694\uc18c \uc911 pattern\uc5d0 \ub9de\ub294 \ubaa8\ub4e0 \uc694\uc18c\ub97c \ucc3e\uc544\uc11c \ubc18\ud658\ud55c\ub2e4.
		 * @function
		 */
		children: function(node, pattern) {
			var _nodes = [];
			if(!node || !node.firstChild) {
				return _nodes;
			}
			var _filter = makeFilter(pattern);
			var _node = $tom.first(node);
			while(_node) {
				if (!_filter || _filter(_node)) {
					_nodes.push(_node);
				}
				_node = _node.nextSibling;
			}
			return _nodes;
		},
		/**
		 * node\uc758 nextSibling \uc694\uc18c \uc911 pattern\uc5d0 \ub9de\ub294 \uc694\uc18c\ub97c \ucc3e\uc544\uc11c \ubc18\ud658\ud55c\ub2e4.
		 * @function
		 */
		next: function(node, pattern) {
			if(!node || !node.nextSibling) {
				return null;
			}
			var _filter = makeFilter(pattern);
			var _node = node.nextSibling;
			while(_node) {
				if($tom.hasContent(_node)) {
					if(!_filter || _filter(_node)) {
						break;
					}
				}
				_node = _node.nextSibling;
			}
			return _node;
		},
		/**
		 * node\uc758 previousSibling \uc694\uc18c \uc911 pattern\uc5d0 \ub9de\ub294 \uc694\uc18c\ub97c \ucc3e\uc544\uc11c \ubc18\ud658\ud55c\ub2e4.
		 * @function
		 */
		previous: function(node, pattern) {
			if(!node || !node.previousSibling) {
				return null;
			}
			var _filter = makeFilter(pattern);
			var _node = node.previousSibling;
			while(_node) {
				if($tom.hasContent(_node)) {
					if(!_filter || _filter(_node)) {
						break;
					}
				}
				_node = _node.previousSibling;
			}
			return _node;
		},
		/**
		 * pattern\uc5d0 \ub9de\ub294 node\uc758 \uccab\ubc88\uc9f8 \uc790\uc2dd\uc694\uc18c\ub97c \ucc3e\uc544\uc11c \ubc18\ud658\ud55c\ub2e4.
		 * @function
		 */
		first: function(node, pattern) {
			if(!node || !node.firstChild) {
				return null;
			}
			var _filter = makeFilter(pattern);
			var _node = node.firstChild;
			while(_node) {
				if($tom.hasContent(_node)) {
					if(!_filter || _filter(_node)) {
						break;
					}
				}
				_node = _node.nextSibling;
			}
			return _node;
		},
		/**
		 * pattern\uc5d0 \ub9de\ub294 node\uc758 \ub9c8\uc9c0\ub9c9 \uc790\uc2dd\uc694\uc18c\ub97c \ucc3e\uc544\uc11c \ubc18\ud658\ud55c\ub2e4.
		 * @function
		 */
		last: function(node, pattern) {
			if(!node || !node.lastChild) {
				return null;
			}
			var _filter = makeFilter(pattern);
			var _node = node.lastChild;
			while(_node) {
				if($tom.hasContent(_node)) {
					if(!_filter || _filter(_node)) {
						break;
					}
				}
				_node = _node.previousSibling;
			}
			return _node;
		},
		/**
		 * 
		 * @function
		 */
		extract: function(parent, child, pattern) {
			var _nodes = [];
			if(!parent || !child) {
				return _nodes;
			}
			var _filter = makeFilter(pattern);
			var _found = false;
			var _node = parent.firstChild;
			while(_node) {
				if($tom.include(_node, child)) {
					_found = true;
				}
				if(_filter && _filter(_node)) {
					_nodes.push(_node);
				} else {
					if(_found) {
						break;
					} else {
						_nodes = [];
					}
				}
				_node = _node.nextSibling;
			}
			return _nodes;
		}, 
		/* has no filter */
		/**
		 * node\uc758 parent node\ub97c \ubc18\ud658\ud55c\ub2e4.
		 * @function
		 */
		parent: function(node) {
			if(!node || !node.parentNode) {
				return null;
			}
			return node.parentNode;
		}, 
		/**
		 * node\ub97c \ud3ec\ud568\ud558\uace0 \uc788\ub294 body \uc694\uc18c\ub97c \ubc18\ud658\ud55c\ub2e4.
		 * @function
		 */
		body: function(node) {
			if(!node || !node.parentNode) {
				return null;
			}
			var _node = node.parentNode;
			while(_node) {
				if($tom.isBody(_node)) {
					return _node;
				}
				_node = _node.parentNode;
			}
			return null;
		}, 
		/**
		 * ancestor\uc758 \ud558\uc704\uc5d0\uc11c \ucc98\uc74c \ub098\uc624\ub294 \ud14d\uc2a4\ud2b8 \ub178\ub4dc\ub97c \ucc3e\uc544\uc11c \ubc18\ud658\ud55c\ub2e4. 
		 * @function
		 */
		top: function(ancestor, all) {
			all = all || false;
			var _node = ancestor;
			
			while($tom.first(_node)) {
				_node = $tom.first(_node);
			}
			if(all) {
				return _node;
			} else {
				if ($tom.kindOf(_node, "#tx_start_marker,#tx_end_marker")) {
					_node = _node.nextSibling || _node.parentNode;
				} else if($tom.kindOf(_node, '%control')) {
					_node = _node.parentNode;
				}
				return _node;
			}
		}, 
		/**
		 * ancestor\uc758 \ud558\uc704\uc5d0\uc11c \ub9c8\uc9c0\ub9c9\uc5d0 \ub098\uc624\ub294 \ud14d\uc2a4\ud2b8 \ub178\ub4dc\ub97c \ucc3e\uc544\uc11c \ubc18\ud658\ud55c\ub2e4. 
		 * @function
		 */
		bottom: function(ancestor, all) {
			all = all || false;
			var _node = ancestor;
			while($tom.last(_node)) {
				_node = $tom.last(_node);
			}
			if (all) {
				return _node;
			} else {
				if ($tom.kindOf(_node, "#tx_start_marker,#tx_end_marker")) {
					_node = _node.previousSibling || _node.parentNode;
				} else if ($tom.kindOf(_node, '%control')) {
					_node = _node.parentNode;
				}
				return _node;
			}
		},
		/**
		 * child\uac00 parent\uc5d0 \ud3ec\ud568\ub418\uc5b4 \uc788\ub294 \uc694\uc18c\uc774\uba74 true\ub97c \ubc18\ud658\ud55c\ub2e4.
		 * @function
		 */
		include: function(parent, child) {
			if(!parent || !child) {
				return false;
			}
			if(parent == child) {
				return true;
			}
			var _node = child;
			while (_node) {
				if ($tom.isBody(_node)) {
					return false;
				} else if (_node == parent) {
					return true;
				}
				_node = _node.parentNode;
			}
			return false;
		}
	});
	
})();



Object.extend($tom, /** @lends $tom */{
	/**
	 * parent\uc694\uc18c\uc758 \uccab\ubc88\uc9f8 \uc790\uc2dd\ub178\ub4dc\ub85c child\ub97c \uc0bd\uc785\ud55c\ub2e4.
	 * @function
	 */
	insertFirst: function(parent, child) {
		if(!parent || !child) {
			return;
		}
		if (parent.firstChild) {
			parent.insertBefore(child, parent.firstChild);
		} else {
			parent.appendChild(child);
		}
		return child;
	},
	/**
	 * target \uc694\uc18c \uc804 \uc704\uce58\uc5d0 source \uc694\uc18c\ub97c \uc0bd\uc785\ud55c\uace0 source \uc694\uc18c\ub97c \ubc18\ud658\ud55c\ub2e4.
	 * @function
	 */
	insertAt: function(source, target) {
		if(!source || !target) {
			return;
		}
		target.parentNode.insertBefore(source, target);
		return source;
	},
	/**
	 * target \uc694\uc18c \ub2e4\uc74c \uc704\uce58\uc5d0 source \uc694\uc18c\ub97c \uc0bd\uc785\ud55c\uace0 source \uc694\uc18c\ub97c \ubc18\ud658\ud55c\ub2e4.
	 * @function
	 */
	insertNext: function(source, target) {
		if(!source || !target) {
			return;
		}
		if (target.nextSibling) {
			target.parentNode.insertBefore(source, target.nextSibling);
		} else {
			target.parentNode.appendChild(source);
		}
		return source;
	},
	/**
	 * parent \uc694\uc18c\uc5d0 child \uc694\uc18c\ub97c \ubd99\uc778 \ud6c4 child \uc694\uc18c\ub97c \ubc18\ud658\ud55c\ub2e4.
	 * @function
	 */
	append: function(parent, child) {
		if(!parent || !child) {
			return;
		}
		parent.appendChild(child);
		return child;
	},
	/**
	 * node \ub97c \uc81c\uac70\ud55c\ub2e4.
	 * @function
	 */
	remove: function(node) {
		if(!node) {
			return;
		}
		if(node.parentNode) {
			node.parentNode.removeChild(node);
		}
		node = null;
	},
	/**
	 * node\uc758 innerHTML\ub85c html\ub97c \ub123\uace0 node\ub97c \ubc18\ud658\ud55c\ub2e4.
	 * @function
	 */
	html: function(node, html) {
		if(!node) {
			return;
		}
		node.innerHTML = html || "";
		return node;
	},
	/**
	 * node\uc758 \ub0b4\uc6a9\uc744 \uc9c0\uc6b4\ub2e4.
	 * @function
	 */
	clean: function(node) {
		return $tom.html(node);
	},
	/**
	 * node\uc548\uc5d0 \ud574\ub2f9 html\ub97c \ucc44\uc6cc\ub123\uace0 node\ub97c \ubc18\ud658\ud55c\ub2e4.
	 * @function
	 */
	stuff: function(node, html) {
		if(!node) {
			return node;
		}
		if($tom.hasChildren(node, true)) {
			return node;
		}
		if(node.lastChild) {
			var _node = node;
			while (_node.lastChild) {
				_node = _node.lastChild;
			}
			$tom.insertNext(html, _node);
		} else {
			$tom.append(node, html);
		}
		return node;
	}
});	

Object.extend($tom, /** @lends $tom */{	
	/**
	 * sNode\uc758 \uc790\uc2dd\ub178\ub4dc\ub4e4\uc744 dNode\uc758 child\ub85c \uc0bd\uc785 \ud558\ub294\ub370 sInx, eInx\ub294 \uc790\uc2dd\ub178\ub4dc\uc758 \uc2dc\uc791, \ub05d \uc778\ub371\uc2a4\ubc88\ud638\ub2e4.
	 * @function
	 * @param 
	 */
	moveChild: function(sNode, dNode, sInx, eInx) {
		if(!sNode || !dNode) {
			return;
		}
		sInx = Math.min(Math.max(sInx || 0), sNode.childNodes.length);
		eInx = Math.min(Math.max(eInx || sNode.childNodes.length), sNode.childNodes.length);
		if(sInx >= eInx) {
			return;
		}
		
		var _inx = sInx;
		while (_inx++ < eInx) {
			dNode.appendChild(sNode.childNodes[sInx]);
		}
	},
	/**
	 * node\uc758 \uc790\uc2dd\ub178\ub4dc\ub97c node\uc758 \ubd80\ubaa8\ub178\ub4dc\uc5d0 \ubd99\uc778\ub2e4.
	 * @function
	 */
	moveChildToParent: function(node) {
		if(!node) {
			return;
		}
		while (node.firstChild) {
			node.parentNode.insertBefore(node.firstChild, node);
		}
	}
});

/*
 * Create, Destroy, Change
 */
Object.extend($tom, /** @lends $tom */{
	/**
	 * srcNode\ub97c destNode\ub85c \uad50\uccb4\ud558\uace0 destNode\ub97c \ubc18\ud658\ud55c\ub2e4.
	 * @function
	 */
	replace: function(srcNode, destNode) {
		if (!srcNode || !destNode) {
			return null;
		}
		if ($tom.getName(srcNode) == $tom.getName(destNode)) {
			$tom.remove(destNode);
			return srcNode;
		} else {
			$tom.insertAt(destNode, srcNode);
			$tom.moveChild(srcNode, destNode);
			$tom.remove(srcNode);
			return destNode;
		}
	},
	/**
	 * node\ub97c \ubcf5\uc0ac \ud6c4 \ubc18\ud658\ud55c\ub2e4.
	 * @function
	 */
	clone: function(node, deep) {
		return node.cloneNode(!!deep);
	}
});
	
/*
 * Wrap, Unwrap
 */
Object.extend($tom, /** @lends $tom */{
	/**
	 * wNode \uc544\ub798\uc5d0 pNodes\ub97c \ubd99\uc5ec\uc11c pNodes\ub97c wNode\ub85c \uac10\uc2fc\ub2e4.
	 * @function
	 * @return wNode
	 */
	wrap: function(wNode, pNodes) { //NOTE: quote, quotenodesign, textbox actually using 'div', 'blockquote'
		if (!wNode || !pNodes) {
			return null;
		}
		if(!pNodes.length) {
			pNodes = [].concat(pNodes);
		}
		
		$tom.insertAt(wNode, pNodes[0]);
		pNodes.each((function(pNode){
			$tom.append(wNode, pNode);
		}));
		return wNode;
	},
	/**
	 * node\ub97c \uc81c\uac70\ud558\uace0 node\uc758 \uc790\uc2dd\ub178\ub4dc\ub294 node\uc758 \uc0c1\uc704\uc5d0 \ubd99\uc778\ub2e4.
	 * @function
	 */
	unwrap: function(node) { 
		if (!node) {
			return null;
		}
		var _nNode = $tom.first(node);
		$tom.moveChildToParent(node);
		$tom.remove(node);
		return _nNode;
	}
});

	
Object.extend($tom, /** @lends $tom */{
	/**
	 * @private
	 * @function
	 */
	divideText: function(node, offset) {
		if(!$tom.isText(node)) {
			return node;
		}
		if(offset <= 0 || offset >= node.length) { //\ub098\ub20c\ud544\uc694\uac00 \uc788\uc744\uae4c?
			return node;
		}
		var _newNode = node.cloneNode(false);
		node.deleteData(offset, node.length);
		_newNode.deleteData(0, offset);
		$tom.insertNext(_newNode, node);
		return _newNode;
	},
	/**
	 * @private
	 * @function
	 */
	divideNode: function(node, offset) {
		if(!$tom.isElement(node)) {
			return null;
		}
		/*if(offset <= 0 || offset >= node.childNodes.length) { //\ub098\ub20c\ud544\uc694\uac00 \uc788\uc744\uae4c?
			return node;
		}*/
		var _lastOffset = node.childNodes.length - offset;
		var _newNode = node.cloneNode(false);
		for(var i=0;i<_lastOffset;i++) {
			$tom.insertFirst(_newNode, node.lastChild);
		}
		$tom.insertNext(_newNode, node);
		return _newNode;
	},
	/**
	 * @private
	 * @function
	 */
	divideParagraph: function(node) {
		var _node = node;
		var _offset = $tom.indexOf(node);
		
		var _divided = _node;
		while (_node) {
			if ($tom.isBody(_node)) {
				break;
			} else if ($tom.kindOf(_node, 'td,th,%wrapper,%outergroup')) {
				break;
			} else if ($tom.kindOf(_node, "#tx_start_marker,#tx_end_marker")) {
				_offset = $tom.indexOf(_node);
			} else if($tom.isControl(_node)) {
				_offset = $tom.indexOf(_node);
			} else if ($tom.isText(_node)) { //text
				_node = $tom.divideText(_node, _offset);
				_offset = $tom.indexOf(_node);
			} else { //%inline, %paragraph
				_node = $tom.divideNode(_node, _offset);
				_offset = $tom.indexOf(_node);
				_divided = _node;
				if ($tom.kindOf(_node, 'p,li,dd,dt,h1,h2,h3,h4,h5,h6')) {
					break;
				}
			}
			_node = _node.parentNode;
		}
		return _divided;
	},
	/**
	 * @private
	 * @function
	 */
	split: function(node, tag) {
		if(!node) {
			return null;
		}
		var _node = node;
		var _nodes = [_node];
		$A(node.getElementsByTagName(tag)).each(function(separator) {
			if($tom.last(_node) != separator) {
				_node = $tom.divideNode(_node, $tom.indexOf(separator) + 1);
				_nodes.push(_node);
			}
		});
		return _nodes;
	}
});

Object.extend($tom, /** @lends $tom */{
	/**
	 * name\uc758 \ud558\uc704\uc694\uc18c\ub85c \ub4e4\uc5b4\uc62c \uc694\uc18c\uc774\ub984 \ubc18\ud658
	 * @function
	 * @example
	 *  $tom.paragraphOf("table") // 'td'\ub97c \ubc18\ud658\ud55c\ub2e4.
	 */
	paragraphOf: function(name) {
		if(!name) {
			return 'p';
		}
		var _translator = $tom.translate(name);
		if (_translator.memberOf('ul,ol')) {
			return 'li';
		} else if (_translator.memberOf('dl')) {
			return 'dd';
		} else if (_translator.memberOf('tr,tbody,thead,tfoot,table')) {
			return 'td';
		} else {
			return 'p';
		}
	},
	/**
	 * 'span' \uc744 \ubc18\ud658\ud55c\ub2e4.
	 * @function
	 */
	inlineOf: function() {
		return 'span';
	},
	/**
	 * \uc694\uc18c\uc758 name\uc744 \ubc1b\uc544\uc11c \uc0c1\uc704\uc694\uc18c\uac00 \ub418\ub294 \uc694\uc18c\uc774\ub984\uc744 \ubc18\ud658\ud55c\ub2e4.
	 * @function
	 * @example
	 *  $tom.outerOf("td") // "table"\uc744 \ubc18\ud658\ud55c\ub2e4.
	 */
	outerOf: function(name) {
		if(!name) {
			return 'span';
		}
		var _translator = $tom.translate(name);
		if (_translator.memberOf('li')) {
			return 'ol';
		} else if (_translator.memberOf('dd,dt')) {
			return 'dl';
		} else if (_translator.memberOf('td,th,tr')) {
			return 'table';
		} else {
			return 'p';
		}
	}
});
	
(function() {
	var __IGNORE_NAME_FLAG = 0;

	var UnitCalculate = Trex.Class.create({
		$const: {
			__FONT_SIZE_BASIS: 9,
			__REG_EXT_NUMBER: new RegExp("[0-9\.]+"),
			__REG_EXT_UNIT: new RegExp("px|pt|em")
		},
		initialize: function() {
			this.unitConverter = { //NOTE: 1em = 9pt
				"px2em": 1 / 12,
				"px2pt": 9 / 12,
				"em2px": 12 / 1,
				"em2pt": 9 / 1,
				"pt2px": 12 / 9,
				"pt2em": 1 / 9
			};
		},
		calculate: function(strA, strB) {
			if (strA == null || strA.length == 0) {
				strA = "0em";
			}
			if (strB == null || strB.length == 0) {
				strB = "0em";
			}
	
			var _sign = this.extractSign(strB);
			
			var _unitA = this.extractUnit(strA);
			var _unitB = this.extractUnit(strB); //NOTE: basis unit
			
			var _numA = this.extractNumber(strA).toNumber();
			var _numB = this.extractNumber(strB).toNumber();
			if(_unitA != _unitB) { //NOTE: different unit
				if(this.unitConverter[_unitA+"2"+_unitB]) {
					_numA *= this.unitConverter[_unitA+"2"+_unitB];
				}
			}
			var _result = 0;
			if(_sign == "-") {
				_result = Math.max(_numA - _numB, 0);
			} else {
				_result = (_numA + _numB);
			} 
			_result = (Math.round(_result*10)/10);
			if (_result == 0) {
				return null;
			} else {
				return _result + _unitB;
			}
		},
		needCalculation: function(str) {
			if(str == null) {
				return false;
			} else {
				return (str.charAt(0) == '+' || str.charAt(0) == '-');
			}
		},
		extractSign: function(str) {
			var _sign = "+";
			var _match;
			if(str.charAt(0) == '+' || str.charAt(0) == '-') {
				_sign = str.charAt(0);
			}
			return _sign;
		},
		extractNumber: function(str) {
			var _num = 0;
			var _match;
			if((_match = str.match(UnitCalculate.__REG_EXT_NUMBER)) != null) {
				_num = _match[0];
			}
			if(str.indexOf("%") > -1) { //NOTE: %
				_num = _num / 100;
			}
			return _num;
		},
		extractUnit: function(str) {
			var _unit = "em";
			var _match;
			if((_match = str.match(UnitCalculate.__REG_EXT_UNIT)) != null) {
				_unit = _match[0];
			}
			return _unit;
		}
	});
	var _unitCalculator = new UnitCalculate();
	
	var __ATTRIBUTE_TRANSLATIONS = {
	    colspan:   "colSpan",
	    rowspan:   "rowSpan",
	    valign:    "vAlign",
	    datetime:  "dateTime",
	    accesskey: "accessKey",
	    tabindex:  "tabIndex",
	    enctype:   "encType",
	    maxlength: "maxLength",
	    readonly:  "readOnly",
	    longdesc:  "longDesc"
	};
	
	Object.extend($tom, /** @lends $tom */{ //TODO:
		/**
		 * node\uc5d0 \uc778\uc790\ub85c \ubc1b\uc740 attributes \uc18d\uc131\uc744 \uc138\ud305\ud55c\ub2e4.
		 * @function
		 * @param {Element} node
		 * @param {JSON} attributes
		 * @example
		 *  $tom.applyAttributes(inNode, {
		 *		'style': { 'fontSize': null },
		 *		'size': null
		 *	});
		 */
		applyAttributes: function(node, attributes) {
			if(!$tom.isElement(node)) {
				return;
			}
			for(var _name in attributes) {
				if(_name == "style") {
					$tom.applyStyles(node, attributes[_name]);
				} else {
					$tom.setAttribute(node, _name, attributes[_name]);
				}
			}
		},
		/**
		 * node\uc5d0 \uc778\uc790\ub85c \ubc1b\uc740 attributes \uc18d\uc131\uc744 \uc81c\uac70\ud55c\ub2e4.
		 * @function
		 */
		removeAttributes: function(node, attributes) {
			if(!$tom.isElement(node)) {
				return;
			}
			for(var _name in attributes) {
				if(_name == "style") {
					$tom.removeStyles(attributes[_name])
				} else {
					node.removeAttribute(_name, __IGNORE_NAME_FLAG);
				}
			}
		},
		/**
		 * node\uc5d0 \uc778\uc790\ub85c \ubc1b\uc740 attributes \uc18d\uc131\uc774 \uc874\uc7ac\ud558\uba74 true\ub97c \ubc18\ud658\ud55c\ub2e4.
		 * @function
		 */
		existAttributes: function(node, attributes) {
			if(!$tom.isElement(node)) {
				return false;
			}
			var _attrValue;
			for(var _name in attributes) {
				if(_name == "style") {
					for(var _style in attributes[_name]) {
						_attrValue = node.style[_style];
						return (_attrValue != null && _attrValue.length > 0);
					}
				} else {
					_attrValue = node[_name];
					return (_attrValue != null && _attrValue.length > 0);
				}
			}
			return false;
		},
		/**
		 * node\uc5d0\uc11c attrName\uc744 \uc774\ub984\uc73c\ub85c \uac16\ub294 \uc18d\uc131\uc758 \uac12\uc744 \ubc18\ud658
		 * @function
		 * @example
		 *  $tx("tx_image").getAttribute("class") // class\uc18d\uc131\uc758 \uac12 \ubc18\ud658
		 */
		getAttribute: function(node, attrName) {
			if(!$tom.isElement(node)) {
				return null;
			}
			if(node && node.getAttribute) {
				return node.getAttribute(__ATTRIBUTE_TRANSLATIONS[attrName] || attrName);
			} else {
				return null;
			}
		},
		/**
		 * node\uc5d0 attrName\ub97c \uc774\ub984\uc73c\ub85c, attrValue\ub97c \uac12\uc73c\ub85c \uac16\ub294 \uc18d\uc131\uc744 \uc138\ud305\ud55c\ub2e4.
		 * @function
		 */
		setAttribute: function(node, attrName, attrValue) {
			if(!$tom.isElement(node)) {
				return;
			}
			if(attrValue == null || attrValue.length == 0 || attrValue == 0) {
				node.removeAttribute(attrName, __IGNORE_NAME_FLAG);
			} else {
				try {
					node[attrName] = attrValue;
				} catch(e) {
					node.setAttribute(__ATTRIBUTE_TRANSLATIONS[attrName] || attrName, attrValue);
				}
			}
		},
		/**
		 * node\uc5d0 styles\uc5d0\uc11c \uc9c0\uc815\ud55c \uc2a4\ud0c0\uc77c\uc744 \uc801\uc6a9\ud55c\ub2e4.
		 * @function
		 * @example
		 *  $tom.applyStyles(node, {
		 * 		'width': width
		 *  });
		 */
		applyStyles: function(node, styles) {
			var _styleValue;
			for(var _name in styles) {
				if(_unitCalculator.needCalculation(styles[_name])) {
					_styleValue = _unitCalculator.calculate(node.style[_name], styles[_name]);
				} else {
					_styleValue = styles[_name];
				}
				if(_styleValue == null || _styleValue.length == 0) {
					_styleValue = null;
				}
				node.style[((_name == 'float')? ((node.style.styleFloat === undefined)? 'cssFloat': 'styleFloat'): _name)] = _styleValue;
			}
			var _attrValue = $tom.getAttribute(node, "style");
			if(_attrValue == null) { //NOTE: remove needless style 
				node.removeAttribute("style", __IGNORE_NAME_FLAG);
			}
		},
		/**
		 * node\uc5d0\uc11c styles\uc778\uc790\uc5d0\uc11c \uc9c0\uc815\ud55c \uc2a4\ud0c0\uc77c \uc18d\uc131\uac12\uc744 \uc81c\uac70\ud55c\ub2e4. 
		 * @function
		 */
		removeStyles: function(node, styles) {
			for(var _name in styles) {
				node.style[((_name == 'float')? ((node.style.styleFloat === undefined)? 'cssFloat': 'styleFloat'): _name)] = null;
			}
			var _attrValue = $tom.getAttribute(node, "style");
			if(_attrValue == null) { //NOTE: remove needless style 
				node.removeAttribute("style", __IGNORE_NAME_FLAG);
			}
		},
		/**
		 * node\uc5d0\uc11c style \uc18d\uc131\uac12 \ud14d\uc2a4\ud2b8\ub97c \ubaa8\ub450 \ubc18\ud658\ud55c\ub2e4.
		 * @function
		 */
		getStyleText: function(node) {
			return $tom.getAttribute(node, "style");
		},
		/**
		 * node\uc758 style \uc18d\uc131\uac12\uc744 value\ub85c \ub123\ub294\ub2e4. \uae30\uc874\uc5d0 \uc788\ub294 \uac12\uc740 \ub36e\uc5b4\uc4f0\uc5ec\uc9c4\ub2e4.
		 * @function
		 * @param {Element} node
		 * @param {String} value style \uc18d\uc131\uc5d0 \ubc14\ub85c \uc138\ud305\ud560 \ud14d\uc2a4\ud2b8 \uac12\uc744 \ub123\uc5b4\uc57c \ud568
		 * @example
		 *  $tom.setStyleText($tx("tx_article_category"), "width:50px;height:10px")
		 */
		setStyleText: function(node, value) {
			return $tom.setAttribute(node, "style", value);
		}
	});
})();


Object.extend($tom, /** @lends $tom */{ 
	/**
	 * @private
	 * @function
	 */
	goInto: function(node, toTop) {
		if(!node || !node.scrollIntoView) {
			return;
		}
		node.scrollIntoView(toTop);
	},
	/**
	 * \uc218\uc9c1 \uc2a4\ud06c\ub864 \uc704\uce58\uac12\uc744 \ubc18\ud658\ud55c\ub2e4.
	 * @function
	 * @example
	 *  $tom.getScrollTop(document)
	 */
	getScrollTop: function(doc) {
		if(!doc) {
			return 0;
		}
		return (doc.documentElement.scrollTop || doc.body.scrollTop);
	},
	/**
	 * \uc218\uc9c1 \uc2a4\ud06c\ub864 \uac12\uc744 \uc14b\ud305\ud55c\ub2e4.
	 * @function
	 * @param {Element} doc
	 * @param {Number} scrollTop \uc218\uc9c1 \uc2a4\ud06c\ub864 \uac12
	 */
	setScrollTop: function(doc, scrollTop) {
		if(!doc) {
			return;
		}
		if(doc.documentElement.scrollTop) {
			doc.documentElement.scrollTop = scrollTop;
		} else {
			doc.body.scrollTop = scrollTop;
		}
	},
	/**
	 * \uc218\ud3c9 \uc2a4\ud06c\ub864 \uc704\uce58\uac12\uc744 \ubc18\ud658\ud55c\ub2e4.
	 * @function
	 */
	getScrollLeft: function(doc) {
		if(!doc) {
			return 0;
		}
		return (doc.documentElement.scrollLeft || doc.body.scrollLeft);
	},
	/**
	 * \uc218\ud3c9 \uc2a4\ud06c\ub864 \uac12\uc744 \uc14b\ud305\ud55c\ub2e4.
	 * @function
	 * @param {Element} doc
	 * @param {Number} scrollLeft \uc218\ud3c9 \uc2a4\ud06c\ub864 \uac12
	 */
	setScrollLeft: function(doc, scrollLeft) {
		if(!doc) {
			return;
		}
		if(doc.documentElement.scrollLeft) {
			doc.documentElement.scrollLeft = scrollLeft;
		} else {
			doc.body.scrollLeft = scrollLeft;
		}
	},
	/**
	 * element\uc694\uc18c\uc758 left, top, width, height \uac12\uc744 \uacc4\uc0b0\ud558\uc5ec \ubc18\ud658\ud55c\ub2e4.
	 * @function
	 * @return {
	 * 		x: 0,
	 * 		y: 0,
	 * 		width: 0,
	 * 		height: 0
	 * 	}
	 */
	getPosition: function(element, cumulative) {
		if(!element) {
			return {
				x: 0,
				y: 0,
				width: 0,
				height: 0
			};
		}
		cumulative = !!cumulative;
		element = $tx(element);
		var pos = (cumulative)? $tx.cumulativeOffset(element): $tx.positionedOffset(element);
		var dim;
		var display = element.style.display;
		if (display != 'none' && display != null) { // Safari bug
			dim = {
				width: element.offsetWidth,
				height: element.offsetHeight
			};
		} else {
			var els = element.style;
			var originalVisibility = els.visibility;
			var originalPosition = els.position;
			var originalDisplay = els.display;
			els.visibility = 'hidden';
			els.position = 'absolute';
			els.display = 'block';
			var originalWidth = element.clientWidth;
			var originalHeight = element.clientHeight;
			els.display = originalDisplay;
			els.position = originalPosition;
			els.visibility = originalVisibility;
			dim = {
				width: originalWidth,
				height: originalHeight
			};
		}
		return {
			x: pos[0],
			y: pos[1],
			width: dim.width,
			height: dim.height
		};
	},
	/**
	 * node \uc694\uc18c\uc758 width\uac12\uc744 \ubc18\ud658\ud55c\ub2e4.
	 * @function
	 */
	getWidth: function(node) {
		return (node.style["width"] || node.offsetWidth).parsePx();
	},
	/**
	 * node \uc694\uc18c \uc2a4\ud0c0\uc77c\uc18d\uc131\uc758 width \uac12\uc744 \uc138\ud305\ud55c\ub2e4.
	 * @function
	 */
	setWidth: function(node, width) {
		$tom.applyStyles(node, {
			'width': width
		});
	},
	/**
	 * node \uc694\uc18c\uc758 height\uac12\uc744 \ubc18\ud658\ud55c\ub2e4.
	 * @function
	 */
	getHeight: function(node) {
		return (node.style["height"] || node.offsetHeight).parsePx();
	},
	/**
	 * node \uc694\uc18c \uc2a4\ud0c0\uc77c\uc18d\uc131\uc758 height \uac12\uc744 \uc138\ud305\ud55c\ub2e4.
	 * @function
	 */
	setHeight: function(node, height) {
		$tom.applyStyles(node, {
			'height': height
		});
	},
	/**
	 * @private
	 * @function
	 */
	replacePngPath: function(node) {
		if ($tx.msie && $tx.msie_ver < 7) {
			if(document.location.href.indexOf("http://") > -1) {
				return;
			}
			try {
				var _orgFilter = $tx.getStyle(node, 'filter');
				var _orgSrc = /src='([^']+)'/.exec(_orgFilter)[1];
				if(!_orgSrc || _orgSrc == 'none') {
					return;
				} else if(_orgSrc.indexOf("http://") > -1) {
					return;
				}
				
				var _docPathSlices = document.location.href.split("/");
				_docPathSlices.push("css");
				_docPathSlices.pop();
				_orgSrc = _orgSrc.replace(/\.\.\//g, function(full) {
					_docPathSlices.pop();
					return "";
				});
				
				var _newSrc = _docPathSlices.join("/") + "/" + _orgSrc;
				node.style.filter = _orgFilter.replace(/src='([^']+)'/, "src='" + _newSrc + "'");
			} catch(e) {alert(e)}
		}
	}
});
(function utils(Trex){
	/**
	 * @namespace
	 * @name Trex.Util
	 */
	Trex.Util = /** @lends Trex.Util */ {
		_dispElIds: [],
		getDispElId: function() {
			var _genId;
			do {
				_genId = "tx_entry_" + Math.floor(Math.random() * 10000);
			} while(Trex.Util._dispElIds.include(_genId));
			Trex.Util._dispElIds.push(_genId);
			return _genId;
		},
		generateKey: function() {
			return parseInt(Math.random() * 100000000);
		},
		toStyleString: function(styles) {
			var _str = [];
			for(var _name in styles) {
				if(styles[_name]) {
					_str.push(_name.replace(/([A-Z])/g, "-$1").toLowerCase());
					_str.push(":");
					_str.push(styles[_name]);
					_str.push(";");
				}
			}
			return _str.join("");
		},
		toAttrString: function(attrs) {
			var _str = [];
			for(var _name in attrs) {
				if(attrs[_name]) {
					_str.push(" " + _name + "=\"" + attrs[_name] + "\"");
				}
			}
			return _str.join("");
		},
		getMatchValue: function(reg, html, inx) {
			var _matchs;
			if((_matchs = reg.exec(html)) != null) {
				return _matchs[inx];
			} else {
				return null;
			}
		},
		getAttachmentType: function(value){
			value = (value || "").toLowerCase();
			switch(value){
				case 'image/jpg':
				case 'image/jpeg':
				case 'image/png':
				case 'image/tiff':
				case 'image/gif':
				case 'image/bmp':
				case 'image/x-jg':
				case 'image/ief':
				case 'image/pict':
				case 'jpg':
				case 'bmp':
				case 'gif':
				case 'png':
					return 'image';
				default :
					return 'file';
			}
		},
		/**
		 * \ud655\uc7a5\uc790\uc5d0 \ub530\ub294 thumbnail \uc774\ubbf8\uc9c0 url\uc744 \uac00\uc838\uc628\ub2e4.  
		 * @param {Object} ext
		 */
		thumburl: function(ext) {
			ext = (ext || "").toLowerCase();
			switch (ext) {
				case "doc":
				case "docx":
					return TrexConfig.getIconPath("#iconpath/pn_word.gif?rv=1.0.1");
				case "xls":
				case "xlsx":
					return TrexConfig.getIconPath("#iconpath/pn_xls.gif?rv=1.0.1");
				case "ppt":
				case "pptx":
					return TrexConfig.getIconPath("#iconpath/pn_ppt.gif?rv=1.0.1");
				case "pdf":
					return TrexConfig.getIconPath("#iconpath/pn_pdf.gif?rv=1.0.1");
				case "txt":
					return TrexConfig.getIconPath("#iconpath/pn_txt.gif?rv=1.0.1");
				case "hwp":
					return TrexConfig.getIconPath("#iconpath/pn_hwp.gif?rv=1.0.1");
				case "zip":
				case "alz":
					return TrexConfig.getIconPath("#iconpath/pn_zip.gif?rv=1.0.1");
				case "mp3":
				case "wav":
				case "ogg":
				case "wma":
				case "mp4":
				case "ape":
				case "ra":
				case "ram":
					return TrexConfig.getIconPath("#iconpath/pn_mp3.gif?rv=1.0.1");
				case "avi":
				case "mpeg":
				case "wmv":
				case "asf":
					return TrexConfig.getIconPath("#iconpath/pn_movie.gif?rv=1.0.1");
				case "swf":
					return TrexConfig.getIconPath("#iconpath/pn_swf.gif?rv=1.0.1");
				case "htm" :
				case "html":
					return TrexConfig.getIconPath("#iconpath/pn_html.gif?rv=1.0.1");
				case "jpg":
				case "gif":
				case "png":
				case "bmp":
					TrexConfig.getIconPath("#iconpath/pn_etc.gif?rv=1.0.1");	
				default:
					return TrexConfig.getIconPath("#iconpath/pn_etc.gif?rv=1.0.1");
			}
		},
		/**
		 * \ud655\uc7a5\uc790\uc5d0 \ub530\ub294 preview \uc774\ubbf8\uc9c0 url\uc744 \uac00\uc838\uc628\ub2e4.  
		 * @param {Object} ext
		 */
		prevurl: function(ext) {
			ext = (ext || "").toLowerCase();
			switch (ext) {
				case "doc":
				case "docx":
					return TrexConfig.getIconPath("#iconpath/p_word_s.gif?rv=1.0.1");
				case "xls":
				case "xlsx":
					return TrexConfig.getIconPath("#iconpath/p_xls_s.gif?rv=1.0.1");
				case "ppt":
				case "pptx":
					return TrexConfig.getIconPath("#iconpath/p_ppt_s.gif?rv=1.0.1");
				case "pdf":
					return TrexConfig.getIconPath("#iconpath/p_pdf_s.gif?rv=1.0.1");
				case "txt":
					return TrexConfig.getIconPath("#iconpath/p_txt_s.gif?rv=1.0.1");
				case "hwp":
					return TrexConfig.getIconPath("#iconpath/p_hwp_s.gif?rv=1.0.1");
				case "zip":
				case "alz":
					return TrexConfig.getIconPath("#iconpath/p_zip_s.gif?rv=1.0.1");
				case "mp3":
				case "wav":
				case "ogg":
				case "wma":
				case "mp4":
				case "ape":
				case "ra":
				case "ram":
					return TrexConfig.getIconPath("#iconpath/p_mp3_s.gif?rv=1.0.1");
				case "avi":
				case "mpeg":
				case "wmv":
				case "asf":
					return TrexConfig.getIconPath("#iconpath/p_movie_s.gif?rv=1.0.1");
				case "swf":
					return TrexConfig.getIconPath("#iconpath/p_swf_s.gif?rv=1.0.1");
				case "htm" :
				case "html":
					return TrexConfig.getIconPath("#iconpath/p_html_s.gif?rv=1.0.1");
				case "jpg":
					return TrexConfig.getIconPath("#iconpath/p_jpg_s.gif?rv=1.0.1");
				case "gif":
					return TrexConfig.getIconPath("#iconpath/p_gif_s.gif?rv=1.0.1");
				case "png":
				case "bmp":
					return TrexConfig.getIconPath("#iconpath/p_png_s.gif?rv=1.0.1");
				default:
					return TrexConfig.getIconPath("#iconpath/p_etc_s.gif?rv=1.0.1");
			}
		},
		getMatchedClassName: function(element, classes){
			var matched = false;
			var _class = "";
			for(var i = 0; i < classes.length; i++){
				_class = classes[i];
				if($tx.hasClassName(element, _class)){
					matched = _class;
					break;
				}
			}
			return matched;
		},	
		getAllAttributesFromEmbed: function(embedSrc){
			var map = {};
			embedSrc = embedSrc.replace(/<embed|>/ig,"");
			try {
				var regSplit = /(\w+)=((?:\")[^\"]+(?:\"|$)|(?:')[^']+(?:'|$)|(?:[^\"'][^ \n]+($| |\n)))/ig;
				while( (result = regSplit.exec(embedSrc)) != null ){
					map[result[1].trim().toLowerCase()] = result[2].replace(/^(\"|')/i,"").replace(/(\"|')$/i,"").trim();
				}
			}catch(e){ }
			
			return map;
		},	
		getAllAttributes: function(source){
			var _map = {};
			var _matchsAttr;
	
			var _reg = new RegExp("style=\"[^\"]*(?:width|WIDTH)\\s*:\\s*([0-9]+)px[^\"]*\"", "g");
			while ((_matchsAttr = _reg.exec(source)) != null) {
				_map["width"] = _matchsAttr[1];
			}
			_reg = new RegExp("style=\"[^\"]*(?:height|HEIGHT)\\s*:\\s*([0-9]+)px[^\"]*\"", "g");
			while ((_matchsAttr = _reg.exec(source)) != null) {
				_map["height"] = _matchsAttr[1];
			}
			_reg = new RegExp("\\s+([a-zA-Z]+)=\"([^\"]*)\"", "g");
			while ((_matchsAttr = _reg.exec(source)) != null) {
				if (!_map[_matchsAttr[1].toLowerCase()]) {
					_map[_matchsAttr[1].toLowerCase()] = _matchsAttr[2];
				}
			}
			_reg = new RegExp("\\s+([a-zA-Z]+)='([^']*)'", "g");
			while ((_matchsAttr = _reg.exec(source)) != null) {
				if (!_map[_matchsAttr[1].toLowerCase()]) {
					_map[_matchsAttr[1].toLowerCase()] = _matchsAttr[2];
				}
			}
			_reg = new RegExp("\\s+([a-zA-Z]+)=([^\\s>]*)", "g");
			while ((_matchsAttr = _reg.exec(source)) != null) {
				if (!_map[_matchsAttr[1].toLowerCase()]) {
					_map[_matchsAttr[1].toLowerCase()] = _matchsAttr[2];
				}
			}
			return _map;
		}
	};
	
	/**
	 * @namespace
	 * @name Trex.HtmlCreator
	 */
	Trex.HtmlCreator = {
		/**
		 * Create Table Markup String
		 * 
		 *  @example
		 *  var items =[ 
		 *  		{
		 *  			klass: 'klassName',
		 *  			image: 'image url', // can be omitted
		 *  			data: 'data'
		 *  		}
		 *  	]
		 *  
		 *	var tableMarkup = Trex.HtmlCreator.createTableMarkup(row, col, item);
		 *   
		 * @param {int} rows
		 * @param {int} cols
		 * @param {Object} items 
		 * 	  
		 */
		createTableMarkup: function(rows, cols, items){
			var _html = [];
			_html.push("<table unselectable=\"on\">");
			_html.push("<tbody>");
			
			var _total = items.length;
			var _item;
			for(var row=0; row<rows; row++) {
				_html.push("<tr>");
				for(var col=0; col<cols; col++) {
					if(row * cols + col < _total) {
						_item = items[row * cols + col];
						if(_item.image) {
							_html.push("<td class=\"tx-menu-list-item\"><a href=\"javascript:;\"><span class=\"" + ((_item.klass)? _item.klass: "") + "\"><img src=\"" + _item.image + "\" data=\"" + _item.data + "\"/></span></a></td>");
						} else {
							_html.push("<td class=\"tx-menu-list-item\"><a href=\"javascript:;\"><span class=\"" + ((_item.klass)? _item.klass: "") + "\">" + _item.data + "</span></a></td>");
						}
					} else {
						_html.push("<td class=\"tx-menu-list-item\"><a href=\"javascript:;\"><span class=\"\">&nbsp;</span></a></td>");
					}
				}
				_html.push("</tr>");
			};
			_html.push("</tbody>");
			_html.push("</table>");
			return _html.join("\n");
		}
	};
	
	Trex.String = {
		escapeQuot: function(str) {
			return str.replace(new RegExp('"', "g"), "&quot;").replace(new RegExp("'", "g"), "&#39;");
		},
		unescapeQuot: function(str) {
			return str.replace(new RegExp("&quot;", "gi"), '"').replace(new RegExp("&#39;", "g"), "'");
		},
		htmlspecialchars: function(str) {
			return Trex.String.escapeQuot(str.replace(new RegExp("&", "g"), "&amp;").replace(new RegExp("<", "g"), "&lt;").replace(new RegExp(">", "g"), "&gt;"));
		},
		unHtmlspecialchars: function(str) {
			return Trex.String.unescapeQuot(str.replace(new RegExp("&amp;", "gi"), "&").replace(new RegExp("&lt;", "gi"), "<").replace(new RegExp("&gt;", "gi"), ">"));
		},	
		parseAttribute: function(elStr, attrName){
			var regAttribute1 = new RegExp("(^|\\W)" + attrName + '="([^"]*)"', "gi");
			var regAttribute2 = new RegExp("(^|\\W)" + attrName + "='([^']*)'", "gi");
			var regAttribute3 = new RegExp("(^|\\W)" + attrName + "=([^\\s>]*)", "gi");
			if (result = regAttribute1.exec(elStr)) {
				return result[2];
			}else if (result = regAttribute2.exec(elStr)) {
				return result[2];
			}else if (result = regAttribute3.exec(elStr)) {
				return result[2];
			}else {
				return "";
			}
		},	
		changeAttribute: function(elStr, attrName, toAttr){
			var regAttribute1 = new RegExp("(^|\\W)" + attrName + '="([^"]*)"', "gi");
			var regAttribute2 = new RegExp("(^|\\W)" + attrName + "='([^']*)'", "gi");
			var regAttribute3 = new RegExp("(^|\\W)" + attrName + "=([^\\s>]*)", "gi");
			var regAttribute4 = new RegExp("<([\\w]+\\s*)", "gi");
			var _exists = false;
			if (elStr.search(regAttribute1) > -1) {
				_exists = true;
				elStr = elStr.replace(regAttribute1, toAttr);
			} 
			if (elStr.search(regAttribute2) > -1) {
				_exists = true;
				elStr = elStr.replace(regAttribute2, toAttr);
			} 
			if (elStr.search(regAttribute3) > -1) {
				_exists = true;
				elStr = elStr.replace(regAttribute3, toAttr);
			} 
			if(!_exists) {
				elStr = elStr.replace(regAttribute4, "<$1" + toAttr + " ");
			}
			return elStr;
		}
	};
	
	/*---- Trex.Validator ------------------------------------------------------*/
	Trex.Validator = Trex.Class.create({
		initialize: function() { },
		strip: function(content) {
			return content.stripTags().replace(/&nbsp;/g, "").replace(/\ufeff/g, "").trim();
		},
		exists: function(content) {
			if(!content) {
				return false;
			}
			if(this.strip(content) == "") {
				if(content.search(/<(img|iframe|embed|table|hr|script|TXDB)/i) < 0) {
					return false;
				}
			}
			return true;
		},
		equals: function(content, text) {
			if(!content || !text) {
				return false;
			}
			if(content.search(/<(img|iframe|embed|table|hr|script|TXDB)/i) < 0) {
				if(this.strip(content) == this.strip(text)) {
					return true;
				}
			}
			return false;
		}
	});
	
	/*---- Trex.Repeater ------------------------------------------------------*/
	Trex.Repeater = Trex.Class.create({
		initialize: function(execHandler) {
			this.execHandler = execHandler;
		},
		start: function(term) {
			if(this.tItv) {
				this.clear();
			}
			this.tItv = window.setInterval(this.onTimer.bind(this), term);
		},
		clear: function() {
			window.clearInterval(this.tItv);
			this.tItv = null;
		},
		onTimer: function() {
			if(this.execHandler != null) {
				this.execHandler();
			}
		}
	});
	
	/*---- Trex.Timer ------------------------------------------------------*/
	Trex.Timer = Trex.Class.create({
		initialize: function(execHandler) {
			this.execHandler = execHandler;
		},
		start: function(term) {
			window.setTimeout(this.onTimer.bind(this), term);
		},
		onTimer: function() {
			if(this.execHandler != null) {
				this.execHandler();
			}
		}
	});
	
	/**
	 * Trex.Paging Class
	 * paging\uc744 \uc704\ud55c class. Ajax\ub098 fileter \ub4f1\uc744 \ud1b5\ud55c dynamic data\ubc14\uc778\ub529\uc740 \uace0\ub824\ub418\uc9c0 \uc54a\uc74c. static array\ub85c\ub9cc \uc0ac\uc6a9\uc774 \uac00\ub2a5 
	 * @class
	 * @param {Array} data
	 * @param {Object} config 
	  */
	Trex.Paging = Trex.Class.create({
		$const:{
			DEFAULT_PAGE_SIZE: 5,
			DEFAULT_BLOCK_SIZE:10
		},
		initialize: function(data, config ){
			this.data = data;
			this.currentpage = config.initPage || 1;
			this.totalrow = config.totalrow || this.getTotalRow();
			this.pagesize = config.pagesize || Trex.Paging.DEFAULT_PAGE_SIZE;
			this.blocksize = config.blocksize || Trex.Paging.DEFAULT_PAGE_SIZE;
			this.totalpage = Math.ceil( this.totalrow / this.pagesize );
			this.totalblock = Math.ceil( this.totalpage / this.blocksize );
		},
		getNextPage: function(){
			return (this.currentpage < this.totalpage)?this.currentpage+1:0;
		},
		getPrevPage: function(){
			return (this.currentpage > 1)?this.currentpage-1:0;
		},
		getNextBlock: function(){
			var _currentblock = Math.ceil(this.currentpage/this.blocksize);
			return ( _currentblock < this.totalblock)?_currentblock * this.blocksize + 1:0
		},
		getPrevBlock: function(){
			var _currentblock = Math.ceil(this.currentpage/this.blocksize);
			return (_currentblock > 1)?(_currentblock-2) * this.blocksize + 1:0;
		},
		getPageList: function(){
			var pages = [];
			var _startBlock = Math.ceil( this.currentpage / this.blocksize ) - 1;
			var _startPage = ( _startBlock * this.blocksize + 1 );
			var _endPage = Math.min( this.totalpage, (_startPage + this.blocksize - 1) );
			for ( var i = _startPage; i <= _endPage; i++ ){
				pages.push(i);
			}
	
			return pages;
		},
		movePage: function( page ){
			this.currentpage = page || this.currentpage;
		},
		getOnePageData: function(){
			var result = [];
			var _start = (this.currentpage-1) * this.pagesize;
			var _end = Math.min( this.currentpage * this.pagesize, this.totalrow ) ;
			for( var i = _start; i < _end; i++ ){
				result.push( this.data[i] ); 
			}
			
			return result;
		},
		getTotalRow: function(){
			return this.data.length;
		}
	});
	
	/**
	 * Trex.Slidebar Class
	 * slidebar \uc704\uc82f. \ub9c8\ud06c\uc5c5, CSS\uc5d0 \uc758\uc874\uc131\uc774 \uc788\ub2e4. 
	 * @class
	 * @param {Object} config	 
	  */
	Trex.Slidebar = Trex.Class.create({
		initialize: function(config){
			/* config = { 
			 * 		handler: function, \uc2ac\ub77c\uc774\ub4dc\uac00 \ub3d9\uc791\ud560\ub54c \uc2e4\ud589\ub420 \ud568\uc218
			 * 		elContext: \uc2ac\ub77c\uc774\ub4dc\uac00 \uc81c\uc5b4\ub420 \uc601\uc5ed, div\ub4f1\uc758 element
			 * 		knoWidth: knob element\uc758 \ud06c\uae30
			 * 		barSize: \uc2ac\ub77c\uc774\ub4dc element\uc758 \ud06c\uae30
			 * 		min: \ucd5c\uc18c\uac12(\ub17c\ub9ac\uc801\uc778 \uac12, default 0)
			 *  	max :\ucd5c\ub300\uac12(\ub17c\ub9ac\uc801\uc778 \uac12, default 100)
			 *  	interval: \ud55c\ubc88 \ud074\ub9ad\uc774\ub098 \ub9c8\uc6b0\uc2a4 \ub4dc\ub798\uadf8\ub85c \uc774\ub3d9\ud558\ub294 \uac12(\ub17c\ub9ac\uc801\uc778 \uac12, default 5)
			 * 		defaultValue: \ucd08\uae30 knob\uc774 \uc704\uce58\ud560 \uac12
			 * }
			 */		
			this.elContext = config.el;
			this.knobWidth =  config.knobWidth;
			this.isDisabled = false;
			this.handler = function(value){
				if (!this.isDisabled && typeof config.handler == "function") {
					config.handler(value);
				}
			}

			config.defaultValue = config.defaultValue || 0;
			this.logicObj = {
				interval: config.interval || 5 ,
				min: config.min || 0,
				max: config.max || 100
			};
			this.physicObj = {
				min:0,
				width: config.barSize || 100	
			};
			this.physicObj.max = this.physicObj.width - this.knobWidth;  
			this.physicObj.interval = this.logicObj.interval * this.physicObj.max / this.logicObj.max;
			
			this.startPos = 0;
			this.startX = 0;
			this.isDrag = false;
			this.result = 0;
			
			var elMenu = $tom.collect( this.elContext, "dd.tx-slide" );
			// \uc591\ub05d\ub2e8\uc5d0 min\uac12\uacfc max\uac12\uc774 \ud45c\uc2dc \ub420 \uc218\ub3c4 \uc788\ub2e4. 
			$tom.collect( elMenu, "span.tx-slide-min" ).innerHTML = ""; 
			$tom.collect( elMenu, "span.tx-slide-max" ).innerHTML = "";
							
			/* default \uac12 \uc14b\ud305\ud558\ub294 \ubd80\ubd84\uc774 \ud544\uc694\ud558\ub2e4? */
			this.bindEvent();
			this.setKnobPosition(config.defaultValue);
		},
		regenerate: function( value ){
			value = parseInt(value * this.physicObj.width / this.logicObj.max);
			this.setKnobPosition(value);
		},
		bindEvent: function(){
			var elMenu = $tom.collect( this.elContext, "dd.tx-slide" );
			var elPrev = $tom.collect( elMenu, "a.tx-slide-prev" )
			var elNext = $tom.collect( elMenu, "a.tx-slide-next" );
			var elBar = $tom.collect( elMenu, "div.tx-slide-bar" );
			var elKnob = this.elKnob = $tom.collect( elMenu, "div.tx-slide-knob" );
			
			$tx.observe( elKnob, "mousedown", function(ev){
				this.isDrag = true;
				this.startPos = this.getKnobPosition();
				this.startX = ev.clientX;
				$tx.stop(ev);
			}.bind(this));
			
			$tx.observe( elKnob, "mouseup", function(ev){
				this.isDrag = false;
			}.bind(this));
			
			$tx.observe( this.elContext, "mousemove", function(ev){
				if ( this.isDrag ){
					this.setKnobPosition( this.startPos +  ev.clientX - this.startX);
					$tx.stop(ev);
					this.handler( this.result );
				}
			}.bind(this));
			
			$tx.observe( elPrev, "click", function(ev){
				var count = Math.round(this.physicObj.interval) - 1;
				var that = this;
				var moveLeft = function(){
					var pos = that .getKnobPosition();
					that.setKnobPosition( pos - 1);
					if ( count-- > 0 ) {
						setTimeout(moveLeft, 10 );
					}else{
						that.handler(that.result);
					}
				};
				moveLeft();
				$tx.stop(ev);
			}.bind(this));
			
			$tx.observe( elNext, "click", function(ev){
				var count = Math.round(this.physicObj.interval);
				var that = this;
				var moveRight = function(){
					var pos = that.getKnobPosition();
					that.setKnobPosition( pos + 1);
					if ( --count > 0 ) {
						setTimeout(moveRight, 10 );
					}else{
						that.handler(that.result);
					}
				};
				moveRight();
				$tx.stop(ev);
			}.bind(this));
			
			$tx.observe( this.elContext, "mouseup", function(ev){
				if ( this.isDrag ) {
					this.isDrag = false;
				}
			}.bind(this));
			$tx.observe( elKnob, "click", function(ev){
				$tx.stop(ev);
			}.bind(this));
			
			$tx.observe( elBar, "click", function(ev){
				if ( !this.isDrag ) {
					var x = ev.layerX || ev.x;
					this.setKnobPosition( x - this.knobWidth / 2);
					this.handler( this.result );
				}
			}.bind(this));
		},	
		getKnobPosition: function(){
			var pos = $tx.getStyle( this.elKnob, "left");
			return pos.parsePx();
		},
		setKnobPosition: function(value){
			if ( this.isDisabled ){
				return;
			}
			value = (value < this.physicObj.max)?value:this.physicObj.max;
			value = (value > this.physicObj.min)?value:this.physicObj.min;
			$tx.setStyle( this.elKnob, {left: value.toPx()});
			
			this.result = Math.round( value * this.logicObj.interval / this.physicObj.interval );
		},
		setDisable: function(){
			this.isDisabled = true;
		},
		setEnable: function(){
			this.isDisabled = false;
		},
		getDisabled: function(){
			return this.isDisabled;
		}
	});
	
	
	/**
	 * Trex.DynamicSizer Class
	 * table\uc758 \uac00\ub85c\uc138\ub85c \uc0ac\uc774\uc988\ub97c \ub9c8\uc6b0\ub85c \uc81c\uc5b4\ud560 \uc218 \uc788\ub294 \uc704\uc82f. 
	 * @class
	 * @param {Object} config	 
	  */
	Trex.DynamicSizer = Trex.Class.create({
		initialize: function(config){
			/* config = { 
			 * 		el: //\ub2e4\uc774\ub098\ubbf9 \uc0ac\uc774\uc800\uac00 \uc2e4\ub9b4 \uc601\uc5ed
			 * 		clickHandler : \ud074\ub9ad\ub410\uc744\ub54c
			 * 		moveHandler: \uc0ac\uc774\uc988\uac00 \ubcc0\uacbd\ub410\uc744 \ub54c
			 */ 
			this.config = config;
			this.wrapper = config.el;
			this.elEventContext = tx.div({className:"tx-dynamic-sizer-context"});
			this.currentSize = {row:0, col:0}
			this.dynamicSizingEnabled = true;
			
			if( !config.moveHandler ){
				config.moveHandler = function(){}
			}
			if( !config.clickHandler ){
				config.clickHandler = function(){}
			}
			
			this.wrapper.appendChild( this.elEventContext );
			this.previewTable = new Trex.DynamicSizer.PreviewTable({
				parentEl: this.elEventContext,
				mouseOverHandler: this.changeSize.bind(this),
				mouseClickHandler: this.selectSize.bind(this)
			});
		},
		clear: function(){
			this.dynamicSizingEnabled = true;
			this.changeSize(0,0);
		},
		changeSize: function(row, col){
			if (this.dynamicSizingEnabled) {
				this.currentSize.row = row;
				this.currentSize.col = col;

				this._changeSelectionSize(row, col);
				this.config.moveHandler(row, col);
			}
		},
		_changeSelectionSize: function(row, col){
			this.previewTable.moveSelectionPos(row, col);
		},
		toggleDynamicSizing: function(){
			this.dynamicSizingEnabled = !this.dynamicSizingEnabled;
			if ( this.dynamicSizingEnabled ){
				this.selection.enableResize();
			}else{
				this.selection.disableResize();
			}
		},
		selectSize:function(ev){
			this.config.clickHandler( ev, this.currentSize);
		},
		getCurruentSize: function(){
			return this.currentSize;
		}
	});
		Trex.DynamicSizer.PreviewTable = Trex.Class.create({
			$const:{
				DEFAULT_TD_STYLE:{
				},
				DEFAULT_TABLE_PROPERTY:{
					cellpadding: "0",
					cellspacing: "1"
				},
				MAX_SIZE: { COL:10, ROW:10 }
			},
			initialize: function(config){
				this.config = config;
				this.elTable = null;
				
				this.elTable = this.generateTable("tx-event");
				this.elSelection = tx.div( {className:"tx-selection"}, this.generateTable("tx-selection") );
				var tablePanel = this.generateTable("tx-panel"); 
				
				this.eventBinding();
				config.parentEl.appendChild( this.elTable );
				config.parentEl.appendChild( this.elSelection );
				config.parentEl.appendChild( tablePanel );
				
				var pos = $tom.getPosition( this.elTable );
				var PROPERTY = Trex.DynamicSizer.PreviewTable.MAX_SIZE;
				this.cellSize = { width: Math.round((pos.width - pos.x) / PROPERTY.COL), 
									height: (pos.height - pos.y) / PROPERTY.ROW }
			},
			generateTable: function(className){
				var tbody = tx.tbody();
				var PROPERTY = Trex.DynamicSizer.PreviewTable;
				for (var i = 0; i < PROPERTY.MAX_SIZE.ROW; i++) {
					var tr = tx.tr();
					for (var j = 0; j < PROPERTY.MAX_SIZE.COL; j++) {
						var td = tx.td(tx.div( {
							style: PROPERTY.DEFAULT_TD_STYLE
						}));
						td = this.setCoordToAttr(td, j+1, i+1);
						tr.appendChild(td);
					}
					tbody.appendChild(tr);
				}
				var table = tx.table(PROPERTY.DEFAULT_TABLE_PROPERTY);
				$tx.addClassName( table, className || "" );
				table.appendChild( tbody );
				return table;
			},
			moveSelectionPos: function(row,col){
				var width = ( col * this.cellSize.width).toPx();
				var height = ( row * this.cellSize.height).toPx();
				$tx.setStyle( this.elSelection, { width: width, height:height } );
			},
			setCoordToAttr: function(element, col, row){
				element.setAttribute("col", col);
				element.setAttribute("row", row);
				return element;
			},
			getCoordFromAttr: function(element){
				return {
					col: element.getAttribute("col") || 0,
					row: element.getAttribute("row") || 0
				}
			},
			eventBinding: function(){
				// \uc678\ubd80\uc5d0\uc11c \ubc1b\uc740 event\ud578\ub4e4\ub7ec\ub4e4\ub85c binding\uc2dc\ud0b4
				this.mouseOverHandler = this.config.mouseOverHandler;
				this.mouseClickHandler = this.config.mouseClickHandler;
				var self = this;
				var _mouseOverHandler = function(ev){
					var element = $tx.element(ev) || {};
					var tagName = (element.tagName || "").toUpperCase();
					if (element && tagName == "TD" ) {
						var coord = self.getCoordFromAttr(element);
						self.mouseOverHandler(coord.row, coord.col);
					}
					$tx.stop(ev);
				}  
				var _mouseClickHandler = function(ev){
					self.mouseClickHandler(ev);
				}
				$tx.observe(this.elTable, "mouseover", _mouseOverHandler);
				$tx.observe(this.elTable, "click", _mouseClickHandler);
			}
		});
})(Trex);

/*---- Trex.ImageScale ------------------------------------------------------*/
Trex.ImageScale = Trex.Class.create({
	initialize: function(data, handler) {
		if(!data.imageurl) {
			return;
		}
		if(data.actualwidth) {
			return;
		}
		var _loadHandler = function(width, height) {
			data.actualwidth = width;
			data.actualheight = height;
			if(handler) {
				handler(width, height);
			}
		};

		setTimeout(function() {
			var _tmpImage = new Image();
			_tmpImage.onerror = function() {
				_tmpImage = null;
			};
			if( _tmpImage.onreadystatechange ) { //IE
				_tmpImage.onreadystatechange = function() {
					if(this.readyState == "complete") {
						_loadHandler(this.width, this.height);
						_tmpImage = null;
					}
				};
			} else {
				_tmpImage.onload = function() {
					_loadHandler(this.width, this.height);
					_tmpImage = null;
				};
			}
			_tmpImage.src = data.imageurl;
		}, 10);
	}
});/**
 * @fileoverview
 * Class Trex.ImageResizer\ub97c \ud3ec\ud568\ud558\uace0 \uc788\ub2e4. 
 *    
 * @author iamdanielkim
 * 
 */

/**
 * img element\uc5d0 \uc6d0\ud558\ub294 width, height\ub85c \ubcc0\uacbd\ub41c image\ub97c loading\ud55c\ub2e4.
 *  
 * 
 * @example
 *  var imageResizer = new Trex.ImageResizer(el, config);
 *  imageResizer.execResize(imageurl);
 *  
 * @constructor
 * @param {Object} elImage
 * @param {Object} config
 */
Trex.ImageResizer = Trex.Class.create({
	initialize: function(elImage, config) {
		var _elImage = elImage;

		var _maxWidth = config.maxWidth || 200;
		var _maxHeight = config.maxHeight || 200;
		var _defImgUrl = config.defImgUrl;
		var _loadHandler = config.onComplete || function(width, height) {};
		
		function doResize(imgEl, imgurl){
			var _resizedHeight, _resizedWidth;
			var _originWidth = imgEl.width;
			var _originHeight = imgEl.height;
			if (_originWidth == _maxWidth && _originHeight == _maxHeight) {
				_resizedWidth = _maxWidth;
				_resizedHeight = _maxHeight;
			} else if (_originWidth < _maxWidth && _originHeight < _maxHeight) {
				_resizedWidth = _originWidth;
				_resizedHeight = _originHeight;
			} else {
				_resizedHeight = _maxHeight;
				_resizedWidth = Math.floor(_maxHeight * (_originWidth / _originHeight));
				if (_resizedWidth > _maxWidth) {
					_resizedWidth = _maxWidth;
					_resizedHeight = Math.floor(_maxWidth * (_originHeight / _originWidth));
				}
			}
			_elImage.width = _resizedWidth;
			_elImage.height = _resizedHeight;
			_elImage.src = imgurl;
			_tmpImage = null;
			_loadHandler(_resizedWidth, _resizedHeight);
		}
		
		/**
		 * resize\ub97c \uc2e4\ud589\ud55c\ub2e4.
		 * 
		 * @memberOf Trex.ImageResizer.prototype 
		 * @param {Object} imgurl
		 */			
		this.execResize =  function(imgurl) {
			var _tmpImage = new Image();
			_tmpImage.onerror = function() {
				_elImage.width = _maxWidth;
				_elImage.height = _maxHeight;
				_elImage.src = _defImgUrl;
				_tmpImage = null;
			};
			
			if( _tmpImage.onreadystatechange ) { //IE
				_tmpImage.onreadystatechange = function() {
					if(this.readyState == "complete") {
						doResize(_tmpImage, imgurl);
					}
				};
			} else {
				_tmpImage.onload = function(){
					doResize(_tmpImage, imgurl);
				}	
			}
			_tmpImage.src = imgurl;
		};
	}
});


/**
 * This is wrapper of swfobject 2.2
 */
Trex.Flash = {
	DEFAULT:{
		flashvar: {
			debug:"false"
		},
		paraObj:{
			allowScriptAccess: "always",
			quality: "low",
			menu: "false",
			scale: "noscale",
			salign: "tl",
			loop: "false"
		},
		attrObj:{
			bgcolor: "#FFFFFF"
		}
	},
	minFlashVer:"9.0.28",
	load: function(src, elId, flashId, options){
		/* options = {
		 * 		width: "500",
		 * 		height: "100",
		 * 		flashVarObj: { ... },
		 * 		paraObj: { ... },
		 * 		attrObj: { ... }
		 * }
		 */
		var _flashvarObj = $tx.extend({}, Trex.Flash.DEFAULT.flashvar );		
		var _paraObj = $tx.extend({}, Trex.Flash.DEFAULT.paraObj );		
		var _attrObj = $tx.extend({}, Trex.Flash.DEFAULT.attrObj );
		
		var _options = options?options:{};
		$tx.extend( _flashvarObj, _options.flashvarObj );	
		$tx.extend( _paraObj, _options.paraObj );	
		$tx.extend( _attrObj, _options.attrObj );
//		_attrObj.id = _attrObj.name = flashId;			// Setting name to flash brings external interface error!
		_attrObj.id = flashId;
		
		if(!$tx(elId)) {
			document.body.appendChild(tx.div({ 'id': elId }));
		}
		
		swfobject.embedSWF(
			src,
			elId,
			_options.width ? _options.width:"0",	
			_options.height ? _options.height:"0",	
			this.minFlashVer,
			false,
			_flashvarObj,
			_paraObj,
			_attrObj
		);
	},
	get: function(id){
		return swfobject.getObjectById(id);
	},
	getPlayerVersion: function(){
		return swfobject.getFlashPlayerVersion();
	},
	hasPlayerVersion: function(version){
		return swfobject.hasFlashPlayerVersion(version);
	},
	ready: function(id, handler) {
		if(!Trex.Flash.get(id)) {
			setTimeout(function() {
				Trex.Flash.ready(id, handler);
			}, 500);
			return;
		}
		setTimeout(handler, 500);
	}
};

function $txSWF(id) {
	return Trex.Flash.get(id);
} 
/**
 * XmlHttpRequest\uac1d\uccb4\ub97c \uc0dd\uc131\ud558\uace0 \uc774 \uac1d\uccb4\ub97c \uc774\uc6a9\ud574 ajax request\ub97c \uc218\ud589\ud55c\ub2e4.
 * @class
 */
Trex.I.XHRequester = Trex.Faculty.create(/** @lends Trex.I.XHRequester */{ 
	/**
	 * \ube0c\ub77c\uc6b0\uc838\uc5d0 \ub9de\ub294 XmlHttpRequest \uac1d\uccb4\ub97c \uc0dd\uc131\ud574\uc11c \ub9ac\ud134\ud55c\ub2e4.
	 * @private
	 * @return {Object] XmlHttpRequest object
	 */
	createXMLHttp: function() {
		var _xmlHttp = null;
		try{
			if(window.XMLHttpRequest) {
				_xmlHttp = new XMLHttpRequest();
			} else if (window.ActiveXObject) {
				_xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
				if(!_xmlHttp) {
					_xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
				}
			}
			return _xmlHttp;
		}catch(e){
			return null;
		}
	},
	/**
	 * ajax call\ub97c \uc218\ud589\ud55c\ub2e4
	 * @param {String} method - http request\uc758 \ubc29\uc2dd, "get" \ub610\ub294 "post" 
	 * @param {String} url - request\ub97c \ub0a0\ub9b4 url 
	 * @param {Boolean} async - synchronous \uc5ec\ubd80 
	 * @param {Function} successHandler - ajax\uc758 \uc131\uacf5\uc2dc\uc758 \ud578\ub4e4\ub7ec 
	 * @param {Function} failHandler - ajax \uc2e4\ud328\uc2dc\uc774\uc758 \ud578\ub4e4\ub7ec  
	 * @example
	 * this.sendRequest("get","http://www.daum.net/api",true,function(value){alert(value)}, function(){alert('fail');} 
	 */
	sendRequest: function(method, url, param, async, successHandler, failHandler) { 
		if (url == null && url != "") {
			return null;
		}
		
		var _response = null;
		var _xmlHttp = this.createXMLHttp();
		if(_xmlHttp == null) {
			return null;
		}
		
		var handler = function(){
			if (_xmlHttp.status == 200) {
				if (method.toUpperCase() == "HEAD") {
					_response = successHandler(_xmlHttp.getAllResponseHeaders());
				} else {
					_response = successHandler(_xmlHttp.responseText);
				}
			} else {
				_response = failHandler(_xmlHttp.status);
			}
			_xmlHttp = null;
		};
		try{
			if (async) {
				_xmlHttp.onreadystatechange = function(){
					if (_xmlHttp.readyState == 4) {
						handler();			
					}
				};
			}
			if(method.toUpperCase() == "POST") {
				_xmlHttp.open("POST", url, async);
				_xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
				_xmlHttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
				_xmlHttp.setRequestHeader("Content-Length", param.length);
				_xmlHttp.setRequestHeader("Connetion","close");
				_xmlHttp.send(param);
			} else {
				if(param && param.length > 0) {
					url = url + ((url.indexOf("?") > -1)? "&": "?") + param;
				}
				_xmlHttp.open(method.toUpperCase(), url, async);
				_xmlHttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
				_xmlHttp.send(null);
			}
			
			if (!async) {
				handler();
			}
			return _response;
		}catch(e){
			return null; 
		}
	}
});

Trex.Responder = { 
	callbacks: {},
	process: function(bytesLoaded, bytesTotal) {
		//if(bytesLoaded < 0) {
			// fail
		//} else {
			// progress
		//}
	},
	newKey: function() {
		var _key = "exe_" + Math.floor(Math.random() * 100000);
		if(this[_key]) {
			return this.newKey();
		} else {
			return _key;
		}
	},
	register: function(handler) {
		var _key = this.newKey();
		this.callbacks[_key] = function(response) {
			handler(response);
			this.callbacks[_key] = null;
		}.bind(this);
		return _key;
	}
};

/**
 * \ud50c\ub798\uc26c\ub97c \uc774\uc6a9\ud558\uc5ec Cross Domain Security \ub97c \uc6b0\ud68c\ud558\ub294 XmlHttpReuqest\uac1d\uccb4\ub97c \uc0dd\uc131\ud558\uace0 reqest\ub97c \uc218\ud589\ud55c\ub2e4. 
 * @class
 */
Trex.I.FHRequester = Trex.Faculty.create(/** @lends Trex.I.FHRequester */{
	/**
	 * ajax call\ub97c \uc218\ud589\ud55c\ub2e4 
	 * @param {String} method - http request\uc758 \ubc29\uc2dd, "get" \ub610\ub294 "post" 
	 * @param {String} url - request\ub97c \ub0a0\ub9b4 url
	 * @param {String} param - reuqest\ub97c \ub0a0\ub9b4\ub54c\uc758 \ucd94\uac00\ub418\ub294 param
	 * @param {Boolean} async - synchronous \uc5ec\ubd80 
	 * @param {Function} successHandler - ajax\uc758 \uc131\uacf5\uc2dc\uc758 \ud578\ub4e4\ub7ec 
	 * @param {Function} failHandler - ajax \uc2e4\ud328\uc2dc\uc758 \ud578\ub4e4\ub7ec  
	 * @param {Function} progressHandler - ajax reuqest\uac00 \uc9c4\ud589\uc911\uc77c\ub54c \uc0ac\uc6a9\ub418\ub294 \ud578\ub4e4\ub7ec
	 * @example
	 * this.sendRequest("get","http://www.daum.net/api","&id=petrucci&password=portnoi",true,function(value){alert(value)}, function(){alert('fail');} 
	 */
	sendRequest: function(method, url, param, async, successHandler, failHandler, progressHandler) {
		var _fhr = Trex.Flash.get("tx_fhr");
		if (!_fhr) {
			_fhr = function() {
				Trex.Flash.load(
					"http://editor.daum.net/swf/FHR3.swf?rv=1.1.0",
					"tx_fhr_target",
					"tx_fhr"
				);
				return Trex.Flash.get("tx_fhr");
			}();
			setTimeout(this.sendRequest.bind(this, method, url, param, async, successHandler, failHandler), 100);
			return;
		}
		if(!_fhr.send) {
			setTimeout(this.sendRequest.bind(this, method, url, param, async, successHandler, failHandler), 50);
			return;
		}
		
		var _succkey = Trex.Responder.register(successHandler);
		var _succHandler = 'Trex.Responder.callbacks["' + _succkey + '"]';
		
		var _failHandler = 'Trex.Responder.process'; //default callback
		if(failHandler) {
			var _failkey = Trex.Responder.register(function(bytesLoaded, bytesTotal) {
				if (bytesLoaded == -1) {
					failHandler(bytesLoaded, bytesTotal);
				} else if(progressHandler) {
					progressHandler(bytesLoaded, bytesTotal);
				}
			});
			_failHandler = 'Trex.Responder.callbacks["' + _failkey + '"]';
		}
		if(url.charAt(0) === "/") { //relative path
			url = "http://" + document.location.host + url;
		}
		if (method.toUpperCase() == "GET") {
			if (!param) {
				param = "";
			}
			url = url + ((url.indexOf("?") > -1) ? "&" : "?") + param;
		}
		if (url) {
			_fhr.send(method, url, param, _succHandler, _failHandler);
		}
	}
});
/**
 * \ub3d9\uc801\uc73c\ub85c \uc678\ubd80\uc758 javascript\ud30c\uc77c\uc744 include\ud55c\ub2e4. 
 * @class
 */
Trex.I.JSRequester = Trex.Faculty.create(/** @lends Trex.I.JSRequester */{ 
	/**
	 * \ud2b9\uc815\uc704\uce58\uc758 \uc2a4\ud06c\ub9bd\ud2b8 \ud30c\uc77c\uc744 include \ud55c\ub2e4.
	 * @param {String} url - http request\uc758 \ubc29\uc2dd, "get" \ub610\ub294 "post" 
	 * @param {String} encoding - inlcude\ud560 javascript\uc758 encoding \ud0c0\uc785
	 * @param {Element} context - \ub85c\ub529\ub41c \uc2a4\ud06c\ub9bd\ud2b8\uac00 \ud45c\uc2dc\ub420 dom element
	 * @example
	 * this.importScript("http://www.daum.net/api/movie.js?apikey=1234","utf-8", document.body ) 
	 */
	importScript: function(url, encoding, context) { 
		if (url == null && url != "") {
			return null;
		}
		encoding = encoding || "utf-8";
		context = context || document;
		try{
			var _elScript = context.createElement("script");
			_elScript.setAttribute("type", "text/javascript");
			_elScript.setAttribute("charset", encoding);
			context.body.appendChild(_elScript);
			
			var _orgWrite = context.write;
			context.write = function(text) {
				var _elDiv = context.createElement("div");
				context.body.appendChild(_elDiv);
				_elDiv.innerHTML += text;
			};
			
			if ($tx.msie) {
				_elScript.onreadystatechange = function() {
					if (this.readyState == "loaded" || this.readyState == "complete") {
						context.write = _orgWrite;
					}
				};
			} else {
				_elScript.onload = function() {
					context.write = _orgWrite;
				};
			}
			_elScript.setAttribute("src", url);
		}catch(e){
			console.log(e)
		}
	}
});window.$stop = {};
window.$propagate = {};
/**
 * \uc5d0\ub514\ud130\uc5d0 \uc815\uc758\ub41c custom \uc774\ubca4\ud2b8\ub4e4\uc744 \ubc1c\uc0dd\uc2dc\ud0a4\uace0 \ub4f1\ub85d\ub41c \uc774\ubca4\ud2b8 \ud578\ub4e4\ub7ec\ub4e4\uc744 \uc2e4\ud589\uc2dc\ud0a8\ub2e4.
 * custom \uc774\ubca4\ud2b8\ub97c \ubc1c\uc0dd\uc2dc\ud0a4\uac70\ub098 \ud639\uc740 custom \uc774\ubca4\ud2b8 \ubc1c\uc0dd\uc2dc \ud578\ub4e4\ub7ec\ub97c \uc2e4\ud589\uc2dc\ud0a4\uae30 \uc704\ud574\uc11c\ub294 \uc774 \ud074\ub798\uc2a4\ub97c minxin \ubc1b\uc544\uc57c \ud55c\ub2e4. 
 * @class
 */
Trex.I.JobObservable = Trex.Faculty.create(/** @lends Trex.I.JobObservable */{
	/**
	 * @private
	 */
	jobObservers: {},
	/**
	 * custom \uc774\ubca4\ud2b8\uac00 \ubc1c\uc0dd\ud558\ub294\uc9c0\ub97c \uad00\ucc30\ud558\ub294 observer\ub97c \ub4f1\ub85d\ud55c\ub2e4.
	 * @param {String} name - custom \uc774\ubca4\ud2b8\uc758 \uc774\ub984 
	 * @param {Function} observer - custom \uc774\ubca4\ud2b8 \ubc1c\uc0dd\uc2dc \uc2e4\ud589\ub420 handler
	 * @example
	 * canvas.observeJob(Trex.Ev.__CANVAS_HEIGHT_CHANGE, function(){alert('canvas\uc758 \ud06c\uae30\uac00 \ubcc0\ud588\ub124\uc694')}) 
	 * cinema.observeJob("cinema_on_paste", function(){alert('\uc601\ud654\uac00 \ucca8\ubd80\ub418\uc5c8\ub124\uc694')}) 
	 */
	observeJob: function(name, observer) {
		if(!this.jobObservers[name]) {
			this.jobObservers[name] = [];
		}
		this.jobObservers[name].push(observer);
	},
	reserveJob: function(name, observer, delay) {
		delay = delay || 500;
		if(!this.jobObservers[name]) {
			this.jobObservers[name] = [];
		}
		var _self = this;
		this.jobObservers[name].push(function() {
			var args = $A(arguments);
			setTimeout(function() {
				observer.apply(_self, args);
			}, delay);
		});
	},
	/**
	 * custom \uc774\ubca4\ud2b8\ub97c \ubc1c\uc0dd\uc2dc\ud0a8\ub2e4. \uc774\ub54c \ubc1c\uc0dd\uc2dc\ud0a8 \uc774\ubca4\ud2b8\ub294 observerJob\ub97c \ud1b5\ud574 \ub4f1\ub85d\ub41c observer\ub4e4\uc5d0\uac8c \uc804\ud30c\ub41c\ub2e4.
	 * @param {String} name - custom \uc774\ubca4\ud2b8\uc758 \uc774\ub984 
	 * @example
	 * canvas.observeJob(Trex.Ev.__CANVAS_HEIGHT_CHANGE, function(){alert('canvas\uc758 \ud06c\uae30\uac00 \ubcc0\ud588\ub124\uc694')}) 
	 * cinema.observeJob("cinema_on_paste", function(){alert('\uc601\ud654\uac00 \ucca8\ubd80\ub418\uc5c8\ub124\uc694')}) 
	 */
	fireJobs: function(name) {
		var _self = this;
		var args = $A(arguments).slice(1);
		if(!this.jobObservers[name]) {
			return;
		}
		try {
			this.jobObservers[name].each(function(observer) {
				observer.apply(_self, args);
			});
		} catch (e) {
			if(e != $stop) { throw e; }
		}
	}
});

/**
 * \uc5d0\ub514\ud130\uc5d0\uc11c custom key\uc774\ubca4\ud2b8\ub4e4\uc744 \ubc1c\uc0dd\uc2dc\ud0a4\uace0 \ub4f1\ub85d\ub41c \uc774\ubca4\ud2b8 \ud578\ub4e4\ub7ec\ub4e4\uc744 \uc2e4\ud589\uc2dc\ud0a8\ub2e4.
 * custom key \uc774\ubca4\ud2b8\ub97c \ubc1c\uc0dd\uc2dc\ud0a4\uac70\ub098 \ud639\uc740 custom key \uc774\ubca4\ud2b8 \ubc1c\uc0dd\uc2dc \ud578\ub4e4\ub7ec\ub97c \uc2e4\ud589\uc2dc\ud0a4\uae30 \uc704\ud574\uc11c\ub294 \uc774 \ud074\ub798\uc2a4\ub97c minxin \ubc1b\uc544\uc57c \ud55c\ub2e4. 
 * @class
 */
Trex.I.KeyObservable = Trex.Faculty.create(/** @lends Trex.I.KeyObservable */{
	/**
	 * @private
	 */
	keyObservers: {},
	/**
	 * custom \uc774\ubca4\ud2b8\uac00 \ubc1c\uc0dd\ud558\ub294\uc9c0\ub97c \uad00\ucc30\ud558\ub294 observer\ub97c \ub4f1\ub85d\ud55c\ub2e4.
	 * @param {Object} keys - \uc774\ubca4\ud2b8\uac00 \ubc1c\uc0dd\ud558\uae38 \uc6d0\ud558\ub294 \ud0a4\uc758 \uc870\ud569 {ctrlKey:T, altKey:F, shiftKey:T, keyCode:17} 
	 * @param {Function} observer - \ud574\ub2f9 \uc774\ubca4\ud2b8 \ubc1c\uc0dd\uc2dc \uc2e4\ud589\ub420 handler
	 * @example
	 * canvas.observeKey({ctrlKey:'T', altKey:'F', keyCode:32}, function(){alert('ctrl + 32\ud0a4\uac00 \ub20c\ub838\ub124\uc694.')}) 
	 */
	observeKey: function(keys, observer) {
		var _name = function(keys) {
			return (keys.ctrlKey? 'T': 'F') + (keys.altKey? 'T': 'F') + (keys.shiftKey? 'T': 'F') + "_" + keys.keyCode;
		}(keys);
		if(!this.keyObservers[_name]) {
			this.keyObservers[_name] = [];
		}
		this.keyObservers[_name].push(observer);
	},
	/**
	 * \uc0ac\uc6a9\uc790\uac00 \uc815\uc758\ud55c custom key event\ub97c \ubc1c\uc0dd\uc2dc\ud0a8\ub2e4. \uc774\ub54c \ubc1c\uc0dd\uc2dc\ud0a8 \uc774\ubca4\ud2b8\ub294 observerKey\ub97c \ud1b5\ud574 \ub4f1\ub85d\ub41c observer\ub4e4\uc5d0\uac8c \uc804\ud30c\ub41c\ub2e4.
	 * @param {Object} ev - \uc0ac\uc6a9\uc790\uac00 \uc815\uc758\ud55c key\uc758 pushed \uc0c1\ud0dc \uac1d\uccb4
	 * @example
	 * canvas.fireKyes({ctrlKey:'T', altKey:'F', keyCode:32}), function(){alert('\uc601\ud654\uac00 \ucca8\ubd80\ub418\uc5c8\ub124\uc694')}) 
	 */
	fireKeys: function(ev) {
		var _name = function(ev) {
			return (ev.ctrlKey? 'T': 'F') + (ev.altKey? 'T': 'F') + (ev.shiftKey? 'T': 'F') + "_" + ev.keyCode;
		}(ev);
		if(!this.keyObservers[_name]) {
			return;
		}
		var _self = this;
		var _propagation = false;
		try {
			this.keyObservers[_name].each(function(observer) {
				try {
					observer.apply(_self, [ev]);
				} catch (e1) {
					if(e1 == $propagate) { _propagation = true; }
				} 
			});
		} catch (e) {
			if(e != $stop) { throw e; }
		}
		if(!_propagation) {
			try {
				$tx.stop(ev);
			} catch(e){}
		}
	},
	registerKeyEvent: function(el) {
		try {
			$tx.observe(el, 'keydown', this.fireKeys.bind(this), true);
		} catch(e) {}
	}
});

/**
 * \ub9c8\uc6b0\uc2a4\ud074\ub9ad\uc774\ub098 \ubc29\ud5a5\ud0a4\ub97c \uc774\uc6a9\ud574 \ud2b9\uc815 \uc5d8\ub9ac\uba3c\ud2b8\uc5d0 \ud3ec\ucee4\uc2a4\uac00 \uac14\uc744 \uacbd\uc6b0 \ub4f1\ub85d\ub41c handler\ub97c \uc2e4\ud589\uc2dc\ud0a8\ub2e4.  
 * @class
 */
Trex.I.ElementObservable = Trex.Faculty.create(/** @lends Trex.I.ElementObservable */{
	elementObservers: {},
	/**
	 * \uc120\ud0dd\ub418\uae38 \uc6d0\ud558\ub294 element\ub97c \ub4f1\ub85d\ud55c\ub2e4 .
	 * @param {Object} layer - \uad00\ucc30\ud558\uae30\ub97c \uc6d0\ud558\ub294 element\uc758 tag name\uacfc class name {tag: 'div', klass: 'txc-textbox'}
	 * @param {Function} observer - \uc6d0\ud558\ub294 \uc5d8\ub9ac\uba3c\ud2b8\uac00 \uc120\ud0dd\ub418\uc5c8\uc744\ub54c \uc2e4\ud589\ub418\uae38 \uc6d0\ud558\ub294 handler  
	 * @example
	 * canvas.observeElement({tag:'div', klass: 'txc-textbox'}), function(){alert("div.txc-textbox\uac00 \uc120\ud0dd\ub418\uc5c8\ub124\uc694.")})
	 */
	observeElement: function(layer, observer) {
		if(layer == null) { //all
			this.observeElement({ tag: "*tx-final-body*"}, observer);
		} else if (layer.length) {
			for (var i = 0; i < layer.length; i++) {
				var item = layer[i];
				this.observeElement(item, observer);
			}
		} else {
			if (!this.elementObservers[layer.tag]) {
				this.elementObservers[layer.tag] = {};
			}
			if (!layer.klass) {
				layer.klass = "*tx-all-class*";
			}
			if (!this.elementObservers[layer.tag][layer.klass]) {
				this.elementObservers[layer.tag][layer.klass] = [];
			}
			this.elementObservers[layer.tag][layer.klass].push(observer);
		}
	},
	/**
	 * \ud2b9\uc815 element\uac00 \uc120\ud0dd\ub418\uc5c8\uc744\ub54c \uadf8 element\uac00 \uc120\ud0dd\ub418\uae38 \uae30\ub2e4\ub9b0 observer\ub4e4\uc5d0\uac8c \uc54c\ub824\uc900\ub2e4. 
	 * \ud574\ub2f9\ud558\ub294 observer\ub4e4\uc740 handler\ub97c \uc2e4\ud589\uc2dc\ud0a8\ub2e4.
	 * @param {Element} node - \uc120\ud0dd\ub41c node
	 * @example
	 * canvas.fireElements(document.body)
	 */
	fireElements: function(node) {
		if(!node) {
			return;
		} 
		var _node = node;
		var args = $A(arguments).slice(1);
		
		var _self = this;
		try {
			if($tom.kindOf(_node, 'img,hr,table,button,iframe')) {
				var _observers = this.collectObserverByElement(_node.nodeName.toLowerCase(), _node.className);
				if(_observers) {
					_observers.each(function(observer) {
						observer.apply(_self, [_node].concat(args));
					});	
				}
			} else {
				while (_node) {
					var _observers = this.collectObserverByElement(_node.nodeName.toLowerCase(), _node.className);
					if(_observers) {
						_observers.each(function(observer) {
							observer.apply(_self, [_node].concat(args));
						});	
					}
					if($tom.isBody(_node)) {
						break;
					}
					_node = $tom.parent(_node);
				}
			}
			
		} catch (e) {
			if(e != $stop) { throw e; }
		}
		this.fireFinally();
	},
	fireFinally: function() {
		var _self = this;
		var args = $A(arguments).slice(1);
		var _observers = this.collectObserverByElement("*tx-final-body*");
		if(_observers) {
			_observers.each(function(observer) {
				observer.apply(_self, [null].concat(args));
			});	
		}
	},
	collectObserverByElement: function(tag, klass) {
		if(!this.elementObservers[tag]) {
			return null;
		}

		var _observers = [];
		klass = klass || "";
		if(klass != "") {
			var _classes = klass.split(" ");
			for(var _klass in this.elementObservers[tag]) {
				if(_classes.include(_klass)) {
					_observers.push(this.elementObservers[tag][_klass]);
				}
			}
		}
		if (this.elementObservers[tag]["*tx-all-class*"]) {
			_observers.push(this.elementObservers[tag]["*tx-all-class*"]);
		}
		return _observers.flatten();
	}
});

Trex.I.MouseoverObservable = Trex.Faculty.create(/** @lends Trex.I.MouseoverObservable */{
	mouseoverObservers: {},
	/**
	 * \uc120\ud0dd\ub418\uae38 \uc6d0\ud558\ub294 element\ub97c \ub4f1\ub85d\ud55c\ub2e4 .
	 * @param {Object} layer - \uad00\ucc30\ud558\uae30\ub97c \uc6d0\ud558\ub294 element\uc758 tag name\uacfc class name {tag: 'div', klass: 'txc-textbox'}
	 * @param {Function} observer - \uc6d0\ud558\ub294 \uc5d8\ub9ac\uba3c\ud2b8\uac00 \uc120\ud0dd\ub418\uc5c8\uc744\ub54c \uc2e4\ud589\ub418\uae38 \uc6d0\ud558\ub294 handler  
	 * @param {Function} observer - \uc6d0\ud558\ub294 \uc5d8\ub9ac\uba3c\ud2b8\uac00 \uc120\ud0dd\ub418\uc5c8\uc744\ub54c \uc2e4\ud589\ub418\uae38 \uc6d0\ud558\ub294 handler  
	 * @example
	 * canvas.observeElement({tag:'div', klass: 'txc-textbox'}), function(){alert("div.txc-textbox\uac00 \uc120\ud0dd\ub418\uc5c8\ub124\uc694.")})
	 */
	observeMouseover: function(selector, successObserver, failObserver) {
		if (!this.mouseoverObservers[selector]) {
			this.mouseoverObservers[selector] = {
				'success': [],
				'fail': [],
				'flag': false
			}	
		}
		this.mouseoverObservers[selector]['success'].push(successObserver);
		if ( failObserver ){
			this.mouseoverObservers[selector]['fail'].push(failObserver);
		}
	},
	fireMouseover: function(node) {
		if(!node) { return;	} 
		var _node = node;
		var _self = this;
		
		try {
			for (var i in this.mouseoverObservers){
				this.mouseoverObservers[i].flag = false;
			}
			while (_node) {
				var _observers = this.collectMouseoverObserver(_node);
				if(_observers.length > 0) {
					var _nodePos = this.getPositionByNode(_node);
					_observers.each(function(observer) {
						observer.apply(_self, [_node, _nodePos]);
					});	
				}
				if($tom.isBody(_node)) {
					break;
				}
				_node = $tom.parent(_node);
			}
		} catch (e) {
			if(e != $stop) { throw e; }
		}
		this.runMouseoverFailHandler();	
	},
	runMouseoverFailHandler: function(){
		var _failHandlers = [];
		for (var i in this.mouseoverObservers){
			if ( !this.mouseoverObservers[i].flag ){
				_failHandlers.push( this.mouseoverObservers[i]['fail'] );
			}
		}
		
		_failHandlers.flatten().each( function(handler){
			handler();
		});
	},
	collectMouseoverObserver: function(node) {
		var _observers = [];
		var klass = node.className || "";
		var tag = node.tagName;
		
		if ( tag ){
			tag = tag.toLowerCase();
			if ( this.mouseoverObservers[tag] ){
				_observers.push( this.mouseoverObservers[tag]['success'] );
				this.mouseoverObservers[tag]['flag'] = true;
			}
		}
		
		if(klass != "") {
			var _classes = klass.split(" ");
			for(var i = 0, len = _classes.length; i < len; i++ ){
				var key = tag + "." + _classes[i];
				if ( this.mouseoverObservers[key] ) {
					_observers.push(this.mouseoverObservers[key]['success']);
					this.mouseoverObservers[key]['flag'] = true;
				}
			}
			
		}
		return _observers.flatten();
	}
});

/*---- Trex.I.Runnable ------------------------------------------------------*/
Trex.I.Runnable = Trex.Faculty.create({
	isRunning: false,
	repeater: null,
	threads: [],
	startThread: function(term) {
		if (this.repeater) {
			this.repeater.clear();
		} else {
			this.repeater = new Trex.Repeater(this.runThread.bind(this));
		}
		this.repeater.start(term);
	},
	stopThread: function() {
		this.repeater.clear();
	},
	runThread: function() {
		if(this.isRunning) {
			return;
		}
		if(this.threads.length > 0) {
			this.isRunning = true;
			(this.threads.shift())();
			this.isRunning = false;
		}
	},
	putThread: function(thread, important) {
		if(important) {
			this.threads.unshift(thread);
		} else {
			this.threads.push(thread);
		}
	}
});TrexMessage.addMsg({
	'@menu.pallete.revert': "\uae30\ubcf8\uc0c9\uc73c\ub85c",
	'@adoptor.label': "\uac00\ub098\ub2e4",
	'@adoptor.transparent': "\ud22c\uba85"
});

Trex.MarkupTemplate.add(
	"menu.colorpallete.text", 
	'#{for:items}<li class="tx-menu-list-item" style="background-color:#{color}"><a unselectable="on" style="color:#{text}">#{label}</a></li>#{/for:items}'
);
Trex.MarkupTemplate.add(
	"menu.colorpallete.thumb", 
	'#{for:items}<li class="tx-menu-list-item" unselectable="on" style="background-color:#{color};border:none;#{if:image!=null}background-image:url(#{image})#{/if:image};"></li>#{/for:items}'
);
Trex.MarkupTemplate.add(
	"menu.colorpallete.revert", 
	'<p class="tx-pallete-revert"><a unselectable="on" href="javascript:;" title="@menu.pallete.revert">@menu.pallete.revert</a></p>'
);
Trex.I.ColorPallete = Trex.Faculty.create({
	isGradeInit: false,
	isPickerDisplayed: false,
	onregenerated: function(config, initValue) {
		this.setColorValueAtInputbox(initValue);
	},
	setColorValueAtInputbox: function(initValue) {
		if ( !initValue ){
			return ;
		}
		if ( typeof initValue != "string" && initValue.toString){
			var initValue = initValue.toString();
		}
		var _color = initValue.split("|")[0];
		var _elValueInput = $tom.collect(this.elInner, 'p.tx-pallete-input input');
		var _elColorDisplay = $tom.collect(this.elInner, 'p.tx-pallete-input span');
		if (initValue && _elValueInput && _elColorDisplay) {
			_elValueInput.value = _color;
			_elColorDisplay.style.backgroundColor = _color;
		}
	},
	hookEvent: function(config) {
		var _elMenu = this.elMenu;
		var _elInner = this.elInner = $tom.collect(_elMenu, 'div.tx-menu-inner');
		
		var _elPreset = $tom.collect(_elInner, 'ul.tx-pallete-text-list');
		if(config.texts) {
			var _label = TXMSG("@adoptor.label");
			var _textOptions = config.texts.options;
			Trex.MarkupTemplate.get("menu.colorpallete.text").evaluateToDom({
				'items': _textOptions
			}, _elPreset);
			var _elPresetChilds = $tom.collectAll(_elPreset, "li");
			this.addColorClickEvent(_elPresetChilds, _textOptions);
		} else {
			_elInner.removeChild(_elPreset);
			_elPreset = null;
		}

		if(config.thumbs) {
			var _needTrans = !!config.needTrans;
			var _thumbsOptions = [].concat(config.thumbs.options);
			if(_needTrans) { //\ud22c\uba85\uc774 \ud544\uc694\ud55c \uceec\ub7ec\ud314\ub808\ud2b8\uc77c \uacbd\uc6b0 \ub9c8\uc9c0\ub9c9 \uceec\ub7ec \uc0ad\uc81c
				_thumbsOptions.pop();
				_thumbsOptions.push(Object.extend({}, config.thumbs.transparent));
			}
			var _elThumb = $tom.collect(_elInner, 'ul.tx-pallete-thumb-list');
			Trex.MarkupTemplate.get("menu.colorpallete.thumb").evaluateToDom({
				'items': _thumbsOptions
			}, _elThumb);
			var _elThumbChilds = $tom.collectAll(_elThumb, "li");
			this.addColorClickEvent(_elThumbChilds, _thumbsOptions);
		}
		
		this.elPicker = $tom.collect(_elInner, "div.tx-pallete-picker");
		
		var _elButton = $tom.collect(_elInner, 'div.tx-pallete-buttons');
		var _elMore = this.elMore = $tom.collect(_elButton, 'p.tx-pallete-more a');
		$tx.observe(_elMore, "click", this.togglePicker.bind(this));
		
		if(config.needRevert) {
			$tom.insertFirst(_elButton, Trex.MarkupTemplate.get("menu.colorpallete.revert").evaluateAsDom({}));
			$tx.observe($tom.collect(_elButton, 'p.tx-pallete-revert a'), "click", function(ev) {
				this.onSelect(ev, null);
				this.hide();
			}.bind(this));
		}
		
		var _elPickerEnter = $tom.collect(this.elInner, "p.tx-pallete-input");
		var _elPreview = this.elPreview = $tom.collect(_elPickerEnter, "span");
		var _elInput = this.elInput = $tom.collect(_elPickerEnter, "input");
		var _elEnter = this.elEnter = $tom.collect(_elPickerEnter, "a");
		var _self = this;		
		$tx.observe(_elInput, "blur", function(){
			_self.lastValue = _elInput.value;
		});
		$tx.observe(_elEnter, "click", this.onColorEnter.bind(this));
	},
	addColorClickEvent: function(elItemList, textOptions) {
		for (var i=0, end=elItemList.length; i < end; i++) {
			var _item = elItemList[i];
			var _option = textOptions[i]; // both elItemList.length and textOptions.length must be equal.
			$tx.observe(_item, "click", this.onSelect.bindAsEventListener(this, _option.color + (_option.text? '|' + _option.text: '')));
		}
	},
	_generatePicker: function() {
		var _elPicker = this.elPicker;
		var _elPickerBox = $tom.collect(_elPicker, "div.tx-pallete-pickerbox");
		$tx.observe(_elPickerBox, "mouseout", this.onMouseOut.bind(this));

		var _elChromaBar = this.elChromaBar = $tom.collect(_elPickerBox, "div.tx-chromabar");
		$tom.replacePngPath(_elChromaBar);
		$tx.observe(_elChromaBar, 'mousedown', this.onChromDown.bindAsEventListener(this));
		$tx.observe(_elChromaBar, 'mousemove', this.onChromMove.bindAsEventListener(this));
		$tx.observe(_elChromaBar, 'mouseup', this.onChromUp.bindAsEventListener(this));

		this.elHueBar = $tom.collect(_elPickerBox, "div.tx-huebar");
		var _elHueBar = this.elHueBar;

		this.hueDownHandler = this.onHueDown.bindAsEventListener(this);
		this.hueMoveHandler = this.onHueMove.bindAsEventListener(this);
		this.hueUpHandler = this.onHueUp.bindAsEventListener(this);
		this.hueClickHandler = this.onHueClick.bindAsEventListener(this);
		$tx.observe(_elHueBar,'mousedown', this.hueDownHandler);
		$tx.observe(_elHueBar,'click', this.hueClickHandler);

		this.nColWidth = 150;
		this.nColHeight = 120;
		this.nHueHeight = 120;

		this.mRGB = { r:0, g:0, b:0 };
		this.mHSV = { h:0, s:100, v:100 };

		// \ucd08\uae30\ud654
		this.setHueColor('FF0000');
	},
	reinitGrade: function() {
		var posParent = $tx.cumulativeOffset(this.elMenu);
		var position = $tx.positionedOffset(this.elChromaBar);
		this.iChromPos = {
			x: (posParent[0] + position[0]),
			y: (posParent[1] + position[1])
		};
		position = $tx.positionedOffset(this.elHueBar);
		this.iHuePos = {
			x: (posParent[0] + position[0]),
			y: (posParent[1] + position[1])
		};
	},
	onColorEnter: function(ev) {
		var color;
		if(this.elInput.value == TXMSG("@adoptor.transparent")) {
			color = "transparent";
		} else {
			color = Trex.Color.getValidColor(this.elInput.value);
		}
		if(color !== null) {
			this.onSelect(ev, color);
		}
		this.hide();
	},
	previewColor: function(color) {
		this.changeColor(color);
	},
	onMouseOut: function() {
		if(this.lastValue !== null && this.lastValue !== undefined) {
			this.changeColor(this.lastValue);
		}
	},
	changeColor: function(color) {
		color = Trex.Color.getHexColor(color);
		this.elPreview.style.backgroundColor = color;
		if(color == "transparent") {
			this.elInput.value = TXMSG("@adoptor.transparent");
		} else {
			this.elInput.value = color;
		}
	},
	enterColor: function() {
		if(this.elInput.value == TXMSG("@adoptor.transparent")) {
			this.changeColor("transparent");
		} else if(this.elInput.value.length == 7) {
			var color = Trex.Color.getValidColor(this.elInput.value);
			if(color !== null) {
				this.changeColor(color);
			}
		}
	},
	togglePicker: function(ev) {
		var _elMore = this.elMore;
		var _elPicker = this.elPicker;
		if(this.isPickerDisplayed) {
			_elMore.className = "tx-more-down";
			$tx.hide(_elPicker);
		} else {
			_elMore.className = "tx-more-up";
			$tx.show(_elPicker);
			if ($tx.msie && $tx.msie_ver < 7) {
				_elPicker.style.padding = "1px";
				setTimeout(function(){
					_elPicker.style.padding = "0px";
				}, 0);
			}
			if(!this.isGradeInit) {
				this._generatePicker();
				this.isGradeInit = true;
				this.reinitGrade(); //position
			}
		}
		this.isPickerDisplayed = !this.isPickerDisplayed;
		$tx.stop(ev);
	},
	getChromCoords: function(ev) {
        var nPosX = (ev.clientX - this.iChromPos.x) + document.documentElement.scrollLeft;
        var nPosY = (ev.clientY - this.iChromPos.y) + document.documentElement.scrollTop;

		nPosX = Math.min(this.nColWidth, Math.max(0, nPosX));
		nPosY = Math.min(this.nColHeight, Math.max(0, nPosY));
        return {x: nPosX, y: nPosY};
    },
	getHueCoords: function(ev) {
        var nPosX = (ev.clientX - this.iHuePos.x) + document.documentElement.scrollLeft;
        var nPosY = (ev.clientY - this.iHuePos.y) + document.documentElement.scrollTop;

        nPosX = Math.min(this.nHueHeight, Math.max(0, nPosY));
		nPosY = Math.min(this.nColWidth, Math.max(0, nPosX));
		return {x: nPosX, y: nPosY};
    },
	getColorByEvent: function(x, y) {
		var s = (x/(this.nColWidth))*100;
		var v = (1-y/(this.nColHeight))*100;

		var nMargin = 3;
		s = Math.floor(Math.min(Math.max(s, 0), 100));
		if(s < nMargin) {
			s = 0;
		} else if(s > 100 - nMargin) {
			s = 100;
		}
		v = Math.floor(Math.min(Math.max(v, 0), 100));
		if(v < nMargin) {
			v = 0;
		} else if(v > 100 - nMargin) {
			v = 100;
		}

        this.mHSV.s = s;
        this.mHSV.v = v;
		this.mRGB = this.hsv2rgb(this.mHSV.h, this.mHSV.s, this.mHSV.v);

		return this.rgb2hex(this.mRGB.r, this.mRGB.g, this.mRGB.b);
	},
	onChromDown: function(ev) {
		this.mousedownDetected = true;
	},
	onChromMove: function(ev) {
		if (this.mousedownDetected) {
			var iPos = this.getChromCoords(ev);
			var color = this.getColorByEvent(iPos.x, iPos.y);
			this.previewColor(color);
		}
	},
	onChromUp: function(ev) {
		var iPos = this.getChromCoords(ev);
		var color = this.getColorByEvent(iPos.x, iPos.y);
		this.previewColor(color);
		this.lastValue = color;
		this.mousedownDetected = false;
	},
	getHueByEvent: function(x, y) {
		var h = parseInt((x/(this.nHueHeight))*360);
		this.mHSV.h = Math.floor(Math.min(Math.max(h,0), 360));
		var mHueRgb = this.hsv2rgb(this.mHSV.h, 100, 100);
		return this.rgb2hex(mHueRgb.r, mHueRgb.g, mHueRgb.b);
	},
	setHueColor: function(sHueHex) {
		this.elChromaBar.style.backgroundColor = sHueHex;
	},
	onHueDown: function(ev) {
		$tx.observe(document, 'mousemove', this.hueMoveHandler);
		$tx.observe(document, 'mouseup', this.hueUpHandler);
	},
	onHueMove: function(ev) {
		var iPos = this.getHueCoords(ev);
		var color = this.getHueByEvent(iPos.x, iPos.y);
		this.setHueColor(color);
	},
	onHueClick: function(ev) {
		var iPos = this.getHueCoords(ev);
		var color = this.getHueByEvent(iPos.x, iPos.y);
		this.setHueColor(color);
	},
	onHueUp: function() {
		$tx.stopObserving(document, 'mousemove', this.hueMoveHandler);
		$tx.stopObserving(document, 'mouseup', this.hueUpHandler);
	},
	hex2rgb: function(str) {
		this.mRGB.r = (this.toDec(str.substr(0, 1)) * 16) + this.toDec(str.substr(1, 1));
		this.mRGB.g = (this.toDec(str.substr(2, 1)) * 16) + this.toDec(str.substr(3, 1));
		this.mRGB.b = (this.toDec(str.substr(4, 1)) * 16) + this.toDec(str.substr(5, 1));
		return this.mRGB;
	},
	toDec: function(sHex) {
		var sHexChars = "0123456789ABCDEF";
		return sHexChars.indexOf(sHex.toUpperCase());
	},
	rgb2hex: function(r,g,b) {
		r = r.toString(16);
		if (r.length == 1) {
			r = '0' + r;
		}
		g = g.toString(16);
		if (g.length == 1) {
			g = '0' + g;
		}
		b = b.toString(16);
		if (b.length == 1) {
			b = '0' + b;
		}
		return '#'+r+g+b;
	},
	hsv2rgb: function(h,s,v)  {

		h %= 360;
		s /= 100;
		v /= 100;

		var r = 0; g = 0; b = 0;

		if (s === 0) {
			r = Math.floor(v * 255);
			g = Math.floor(v * 255);
			b = Math.floor(v * 255);
		} else {
			var nH = h/60;
			var nI = Math.floor(nH);
			var nV1 = v*(1-s);
			var nV2 = v*(1-s*(nH-nI));
			var nV3 = v*(1-s*(1-(nH-nI)));

			var nR = 0; nG = 0; nB = 0;

			if (nI === 0) {nR = v; nG = nV3; nB = nV1;}
			else if (nI == 1) {nR = nV2; nG = v; nB = nV1;}
			else if (nI == 2) {nR = nV1; nG = v; nB = nV3;}
			else if (nI == 3) {nR = nV1; nG = nV2; nB = v;}
			else if (nI == 4) {nR = nV3; nG = nV1; nB = v;}
			else if (nI == 5) {nR = v; nG = nV1; nB = nV2;}

			r = Math.floor(nR * 255);
			g = Math.floor(nG * 255);
			b = Math.floor(nB * 255);
		}
		return {r:r, g:g, b:b};
	},
	rgb2hsv: function(r,g,b) {
		var nR = ( r / 255 );
		var nG = ( g / 255 );
		var nB = ( b / 255 );

		var h = 0; s = 0; v = 0;

		var nMin = Math.min( nR, nG, nB );
		var nMax = Math.max( nR, nG, nB );
		var nDiff = nMax - nMin;

		v = nDiff;

		if( nDiff === 0 ) {
		   h = 0; s = 0;
		} else {
		   s = nDiff / nMax;
		   var nDiffR = (((nMax-nR)/6) + (nDiff/2)) / nDiff;
		   var nDiffG = (((nMax-nG)/6) + (nDiff/2)) / nDiff;
		   var nDiffB = (((nMax-nB)/6) + (nDiff/2)) / nDiff;

		   if (nR == nMax) {
		   	h = nDiffB - nDiffG;
		   }
		   else if (nG == nMax) {
		   		h = (1 / 3) + nDiffR - nDiffB;
		   }else if (nB == nMax) {
	   			h = (2 / 3) + nDiffG - nDiffR;
	   	   }
		   if (h < 0) {
		   	h += 1;
		   }
		   if (h > 1) {
		   	h -= 1;
		   }
		}
		return { h:h, s:s, v:v };
	}
});


/*---- Trex.Color ------------------------------------------------------*/
Trex.Color = {
	getHexColor: function(color) {
		color = color.trim();
		if(color.indexOf("rgb") < 0) {
			if(color.length > 0 && (color.indexOf("-moz-use") > -1 || color == "transparent")) {
				return "transparent";
			} else {
				return color;
			}
		}
		var aColor = color.substring(4, color.length-1).split(",");
		if(aColor.length < 3){
			return color;
		}

		var nCh;
		var sHexColor = "#";
		for(var h=0;h<3;h++) {
			nCh = parseInt(aColor[h].trim()).toString(16).toUpperCase();
			if (nCh.length == 1) {
				sHexColor = sHexColor.concat("0" + nCh);
			}else if (nCh.length > 2) {
				sHexColor = sHexColor.concat("FF");
			}else {
				sHexColor = sHexColor.concat("" + nCh);
			}
		}
		return sHexColor;
	},
	getValidColor: function(color) {
		if(color === null || color == "transparent") {
			return "transparent";
		}
		var m = color.match(/#?([0-9a-f]{6}|[0-9a-f]{3})/i);
		if(m === null) {
			return null;
		}
		if (m[1].length == 3) {
			return "#" + m[1] + m[1];
		} else {
			return "#" + m[1];
		}
	},
	getOptColor: function(color, opacity) {
		if(!color || color.length != 7 || color.charAt(0) != '#') {
			return "#e5e5e5";
		}
        color = color.substring(1, 7).toLowerCase();
		opacity = isNaN(opacity)? 100: opacity;
        var _optColor = "#";
        var _sch, _och;
        for (var h = 0; h < 3; h++) {
            _sch = parseInt(color.substr(h * 2, 2), 16);
            _och = Math.round(Math.floor((255 -_sch) * (1 - opacity * 0.01) + _sch * (opacity * 0.02))).toString(16);
            if (_och.length == 1) {
                _optColor += "0" + _och;
            } else if (_och.length > 2) {
                _optColor += "ff";
            } else {
                _optColor += _och;
			}
        }
        return _optColor;
    }
};
Trex.I.CookieBaker = Trex.Faculty.create({
	cookieName: null,
	cookieValue: null,
	initCookie: function(name, maxCnt) {
		this.cookieName = name;
		this.cookieValue = function () {
		    var cookies = document.cookie.split(';');
		    for(var i=0; i<cookies.length; i++){
		        var cookie=cookies[i].replace(/^\s+/, '');
		        if (cookie.indexOf(name+'=')==0) return cookie.substring(name.length+1);
		    }
		    return null;
		}() || "";
		this.maxCnt = maxCnt || 3;
	},
	writeCookie: function(value, days){
		var name = this.cookieName;
	    if(days){
	        (time = new Date()).setTime(new Date().getTime()+days*24*60*60*1000);
	        var exp = '; expires='+time.toGMTString();
	    }else{
	        var exp='';
	    }
	    document.cookie=name+"="+value+exp+"; path=/";
		this.cookieValue = value;
	},
	readCookie: function () {
	    return this.cookieValue;
	},
	eraseCookie: function () {
		var name = this.cookieName;
	    this.writeCookie(name, "", -1);
	},
	extractOptions: function(options, value) {
		var _optionMap = options.toMap('data');
		var _values = [];
		value.split('|').compact().each(function(data) {
			if(_optionMap[data]) {
				_values.push(_optionMap[data]);
			}
		}.bind(this));
		return _values;
	},
	mergeValues: function(value, data) {
		var _values = value.split('|').compact();
		if(_values.include(data)) {
			return value;
		}
		if(_values.length >= this.maxCnt) {
			_values.pop();
		}
		_values.unshift(data);
		return _values.join('|');
	}
});
Trex.I.AlignExecution = Trex.Mixin.create(/** @lends Trex.I.AlignExecution */{
	executeAlignImageMode: function(processor) {
		var _imageAlignProps = this.constructor.__ImageModeProps['image'];
		var _node = processor.getControl();
		if(!_node) {
			return;
		}
		processor.apply(_node, _imageAlignProps);

		var _textAlignProps = this.constructor.__ImageModeProps['paragraph'];
		if (_textAlignProps) {
			var _wNode = $tom.find(_node, "%paragraph");
			processor.apply(_wNode, _textAlignProps);
		}
	},
	executeAlignTextMode: function(processor) {
		var _textAlignProps = this.constructor.__TextModeProps['paragraph'];
		var _node = processor.getControl();
		if(_node) {
			processor.apply(_node, {
				'align': _textAlignProps['style']['textAlign']
			});
			if($tom.kindOf(_node, 'button')) {
				var _wNode = $tom.find(_node, '%paragraph');
				if (_wNode) {
					processor.apply(_wNode, _textAlignProps);
				}
				var _tNode = $tom.collect(_node, 'table');
				if(_tNode) {
					processor.apply(_tNode, {
						'align': _textAlignProps['style']['textAlign']
					});
				}
			}
		} else {
			var _nodes = processor.blocks(function(){
				return '%paragraph';
			});
			processor.apply(_nodes, _textAlignProps);
			_nodes = processor.controls(function(){
				return 'hr,table';
			});
			processor.apply(_nodes, {
				'align': _textAlignProps['style']['textAlign']		
			});
		}
	},
	queryImageFloat: function(processor) {
		var _node = processor.getControl();
		if (_node) {
			return processor.queryStyle(_node, 'float');
		} else {
			return null;
		}
	},
	queryTextAlign: function(processor) {
		var _node = processor.findNode('%paragraph');
		var _value = processor.queryStyle(_node, 'textAlign');
		if(!_value) {
			_value = processor.queryAttr(_node, 'align');
		}
		if(!_value || _value == "start") {
			_value = 'left';
		}
		return _value;
	},
	queryControlAlign: function(processor) {
		var _node = processor.getControl();
		if (_node) {
			_value = processor.queryAttr(_node, 'align');
			return _value || "left";
		} else {
			return null;
		}
	}
});Trex.I.ListExecution = Trex.Mixin.create(/** @lends Trex.I.ListExecution */{
	executeToList: function(processor, tag, attributes) {
		
		this.rngLstNodes = [];
		this.newGrpNode = function(){
			var _gNode = processor.newNode(tag);
			processor.apply(_gNode, attributes);
			return _gNode;
		};
		this.newLstNode = function(){
			return processor.newNode('li');
		};
		this.newPrNode = function(){
			return processor.newNode('p');
		};
		
		var _nodes = processor.blocks(function() {
			return '%wrapper,%paragraph';
		});
		this._wrapList(processor, _nodes);
		
		$A(this.rngLstNodes).each(function(node) {
			processor.stuffNode(node);
		});
	},
	_wrapList: function(processor, nodes) {
		var _curGrpNode = null;
		var _tool = this;
		$A(nodes).each(function(node) {
			if($tom.kindOf(node, "td,th")) {
				
				var _subLstNodes = $tom.descendants(node, '%wrapper,%paragraph');
				if(_subLstNodes.length == 0) {
					var _pNode = _tool.newPrNode();
					$tom.moveChild(node, _pNode);
					$tom.append(node, _pNode);
					_subLstNodes = [_pNode];
				}
				_tool._wrapList(processor, _subLstNodes);
				
			} else if($tom.kindOf(node, 'li')) {
				if (_curGrpNode) {
					$tom.append(_curGrpNode, node);
					
				} else {
					
					_curGrpNode = _tool.newGrpNode();
					var _gNode = $tom.parent(node);
					if ($tom.kindOf(_gNode, 'ul,ol')) {
						
						var _clnGrpNode = $tom.divideNode(_gNode, $tom.indexOf(node)); //\ub098\ub204\uae30
								
						$tom.insertAt(_curGrpNode, _clnGrpNode);
						$tom.append(_curGrpNode, node);
						
						if (!$tom.hasChildren(_gNode)) {
							$tom.remove(_gNode);
						}
						if (!$tom.hasChildren(_clnGrpNode)) {
							$tom.remove(_clnGrpNode);
						}
					} else { //invalid
						$tom.append(_curGrpNode, node);
					}
				}
				_tool.rngLstNodes.push(node);
				
			} else {
				if (!_curGrpNode) {
					_curGrpNode = _tool.newGrpNode();
					$tom.insertAt(_curGrpNode, node);
				}
				
				var _lNode = _tool.newLstNode();
				if($tom.kindOf(node, '%wrapper')) {
					$tom.wrap(_lNode, node);
					
				} else if($tom.kindOf(node, '%paragraph')) {
				
					$tom.replace(node, _lNode);
					/* split paragraph by linebreak node
					$tom.split(node, 'br').each(function(line) {
						var _lNode = _processor.create('li');
						$tom.append(_tool.curGrpNode, $tom.replace(line, _lNode));
					});
					*/
					
				} else {
					$tom.wrap(_lNode, node);
				}
				$tom.append(_curGrpNode, _lNode);
				_tool.rngLstNodes.push(_lNode);
			}
		});
	},
	executeOffList: function(processor) {
		var _nodes = processor.blocks(function() {
			return '%listhead';
		});
		
		$A(_nodes).each(function(node) {
			var _tag = "p";
			if($tom.ancestor(node, '%listgroup')) {
				_tag = "li";
			}
			var _cNodes = $tom.children(node, 'li'); 
			$A(_cNodes).each(function(cNode) {
				$tom.replace(cNode, processor.newNode(_tag));
			});
			$tom.unwrap(node);
		});
	}
});

/*
 * @deprecated 
/**
 * \ubc30\uc5f4 \ub0b4\uc758 \ubaa8\ub4e0 \ub178\ub4dc\ub97c \uc8fc\uc5b4\uc9c4 \ub9ac\uc2a4\ud2b8\ub85c \uac10\uc2fc\ub2e4.
 * @param {Array} nodes - \ub9ac\uc2a4\ud2b8\ub85c \uac10\uc300 \ub178\ub4dc \ubc30\uc5f4
 * @param {String} tag - \ub9ac\uc2a4\ud2b8 \ub178\ub4dc \uba85
 * @param {Object} attributes - \ub9ac\uc2a4\ud2b8 \ub178\ub4dc\uc5d0 \uc801\uc6a9\ud560 \uc18d\uc131
 * @returns {Element} - \uc0dd\uc131\ud55c \ub9ac\uc2a4\ud2b8 \ub178\ub4dc
 * @example
 * 	processor.tolist([p,p,p], 'ol', {});
 * /
tolist: function(nodes, tag, attributes) {
	if(!nodes) {
		return null;
	}
	var _processor = this;
	var _curGNode;
	var _ancestor;
	
	$A(nodes).each(function(node) {
		if($tom.kindOf(node, '%wrapper')) {
			if(!_curGNode) {
				_curGNode = _processor.create(tag, attributes);
				$tom.insertAt(_curGNode, node);
			}
			$tom.append(_curGNode, _processor.wrap(node, 'li', {}));
		} else {
			if ($tom.kindOf(node, '%listgroup')) {
				if (_curGNode) {
					$tom.append(_curGNode, node);
				} else {
					var _gNode = $tom.ancestor(node, 'ul,ol');
					if (_gNode) {
						if ($tom.kindOf(_gNode, tag)) {
							if (_curGNode != _gNode) {
								$tom.apply(_gNode, attributes);
							}
							_curGNode = _gNode;
						} else {
							var _cloneGNode = $tom.divideNode(_gNode, $tom.indexOf(node)); //\ub098\ub204\uae30
							var _newGNode = _processor.create(tag, attributes);
							$tom.insertAt(_newGNode, _cloneGNode);
							$tom.append(_newGNode, node);
							_curGNode = _newGNode;
							if (!$tom.hasChildren(_cloneGNode)) {
								$tom.remove(_cloneGNode);
							}
							if (!$tom.hasChildren(_gNode)) {
								$tom.remove(_gNode);
							}
						}
					} else { //invalid
						var _newGNode = _processor.create(tag, attributes);
						$tom.insertAt(_newGNode, node);
						_curGNode = _newGNode;
						$tom.append(_curGNode, node);
					}
				}
			} else {
				var _curAncestor = $tom.ancestor(node, '%datagroup,%tablegroup');
				if(!!_curAncestor) {
					if (_ancestor != _curAncestor ){
						_ancestor = _curAncestor;
						_curGNode = null;
					}
				} 
				if(!_curGNode) {
					_curGNode = _processor.create(tag, attributes);
					$tom.insertAt(_curGNode, node);
				}
				
				var str = ( $tx.opera && nodes.length == 1 )?"&nbsp;":"";
				var _lNode = _processor.newNode('li'); //_processor.create('li', str);
				$tom.replace(node, _lNode);
				_processor.stuffNode(_lNode);
				$tom.append(_curGNode, _lNode);
			}
		}
	});
	return _curGNode;
}, 
/**
 * \ub9ac\uc2a4\ud2b8\ub97c \uc77c\ubc18 \ub178\ub4dc\ub85c \ubcc0\uacbd\ud55c\ub2e4.
 * @param {Element} node - \uc77c\ubc18 \ub178\ub4dc\ub85c \ubcc0\uacbd\ud560 \ub9ac\uc2a4\ud2b8 \ub178\ub4dc
 * @returns {Element} - \ubcc0\uacbd\ub41c \ub178\ub4dc\ub4e4\uc758 \uccab\ubc88\uc9f8 \ub178\ub4dc
 * @example
 * 	processor.offlist(ul,ol);
 * /
offlist: function(node) {
	if(!node) {
		return null;
	}
	var _lNodes = $tom.children(node, 'li'); 
	var _tag = "p";
	if($tom.ancestor(node, '%listgroup')) {
		_tag = "li";
	}
	var _processor = this;
	$A(_lNodes).each(function(lNode) {
		$tom.replace(lNode, _processor.create(_tag));
	});
	this.bookmark.saveAroundNode(node);
	return $tom.unwrap(node);
}
*/Trex.I.IndentExecution = Trex.Mixin.create(/** @lends Trex.I.IndentExecution */{
	executeIndentByKeyEvent: function(processor) {
		if (processor.isCollapsed()) {
			var _textPos = processor.compareTextPos();
			if (_textPos == $tom.__POSITION.__MIDDLE_OF_TEXT) {
				this.executeAppendPadding(processor);
				return;
			} else if(_textPos == $tom.__POSITION.__END_OF_TEXT) {
				if (processor.findNode('td')) {
					this.goNextCell(processor);
					return;
				}
			}
		}
		this.executeIndentParagraph(processor);
	},
	executeOutdentByKeyEvent: function(processor) {
		if (processor.isCollapsed()) {
			var _textPos = processor.compareTextPos();
			if(_textPos == $tom.__POSITION.__START_OF_TEXT) {
				if (processor.findNode('td')) {
					this.goPreviousCell(processor);
					return;
				}
			}
		}
		this.executeOutdentParagraph(processor);
	},
	executeIndentParagraph: function(processor) {
		var _nodes = processor.blocks(function() {
			return '%paragraph';
		});
		if(!_nodes) {
			return null;
		}
		
		var _attributes = {	'style': { 'marginLeft': "+4em" } };
		
		var _curGNode;
		var _subGNode;
		$A(_nodes).each(function(node) {
			if ($tom.kindOf(node, "li,dd,dt")) {
				var _gNode = $tom.ancestor(node, 'ul,ol,dl');
				if(_gNode) {
					if (_gNode != _curGNode) {
						_subGNode = null;
					}
					if (_subGNode) {
						$tom.append(_subGNode, node);
					} else {
						_subGNode = $tom.wrap($tom.clone(_gNode), node);
					}
					_curGNode = _gNode;
				} else {
					$tom.applyAttributes(node, _attributes); //invalid case
				}
			} else if ($tom.kindOf(node, "td,th")) {
				var _pNode = processor.newNode('p');
				$tom.moveChild(node, _pNode);
				$tom.append(node, _pNode);
				$tom.applyAttributes(_pNode, _attributes);
			} else {
				$tom.applyAttributes(node, _attributes);
			}
		});
	},
	executeOutdentParagraph: function(processor) {
		var _nodes = processor.blocks(function() {
			return '%paragraph';
		});
		if(!_nodes) {
			return null;
		}
		
		var _attributes = {	'style': { 'marginLeft': "-4em" } };
		
		$A(_nodes).each(function(node) {
			if ($tom.kindOf(node, "li,dd,dt")) {
				var _gNode = $tom.ancestor(node, 'ul,ol,dl');
				if(_gNode) {
					var _ngNode = $tom.divideNode(_gNode, $tom.indexOf(node));
					var _ggNode = $tom.ancestor(_ngNode, 'ul,ol,dl');
					if(_ggNode) {
						$tom.insertAt(node,_ngNode);
					} else {
						var _lNode = $tom.replace(node, processor.newNode('p'));
						$tom.insertAt(_lNode,_ngNode);
					}
					if(!$tom.first(_gNode, 'li')) {
						$tom.remove(_gNode);
					}
					if(!$tom.first(_ngNode, 'li')) {
						$tom.remove(_ngNode);
					}
				} else {
					$tom.applyAttributes(node, _attributes); //invalid case
				}
			} else {
				$tom.applyAttributes(node, _attributes);
			}
		});
	},
	goNextCell: function(processor) {
		var _cNode = processor.findNode('td,th');
		var _tNode = $tom.ancestor(_cNode, 'table');
		var _allNodes = $tom.collectAll(_tNode, 'td,th');
		while(_allNodes.length > 0) {
			if(_cNode == _allNodes.shift()) {
				break;
			}
		}
		if(_allNodes.length > 0) {
			processor.bookmarkInto(_allNodes[0]);
		} else {
			processor.bookmarkToNext(_tNode);
		}
	},
	goPreviousCell: function(processor) {
		var _cNode = processor.findNode('td,th');
		var _tNode = $tom.ancestor(_cNode, 'table');
		var _allNodes = $tom.collectAll(_tNode, 'td,th');
		while(_allNodes.length > 0) {
			if(_cNode == _allNodes.pop()) {
				break;
			}
		}
		if(_allNodes.length > 0) {
			processor.bookmarkInto(_allNodes[_allNodes.length - 1]);
		} else {
			processor.bookmarkToPrevious(_tNode);
		}
	},
	executeAppendPadding: function(processor) {
		processor.pasteContent("&nbsp;&nbsp;&nbsp;&nbsp;", false);
	}
});
/**
 * @fileoverview
 * \uc5d0\ub514\ud130\uc5d0\uc11c \uc0ac\uc6a9\ub418\ub294 button\uc758 \ubaa8\uc74c 
 * 
 */

Trex.MarkupTemplate.add(
	'button.itsnew', '<em class="tx-itsnew" title="new">new</em>'
);

Trex.MarkupTemplate.add(
	'button.select.text', '<span>#{data}</span>'
);

/**
 * \uc77c\ubc18\uc801\uc778 \ub3d9\uc791\uc758 \ubc84\ud2bc \uac1d\uccb4\ub85c, \ud2b9\ud654\ub41c \ubc84\ud2bc\uc740 \uc774 \ud074\ub798\uc2a4\ub97c \uc0c1\uc18d\ubc1b\uc544 \uc0ac\uc6a9\ud55c\ub2e4.<br/>
 * \ud574\ub2f9 \uc5d8\ub9ac\uba3c\ud2b8\ub294 \ubbf8\ub9ac DOM\uc5d0 \uc788\uc5b4\uc57c \ud558\uba70, __borderClasses\uc5d0 \uc9c0\uc815\ub41c \ud074\ub798\uc2a4\uc774\ub984\uc744 \uac00\uc838\uc57c\ud55c\ub2e4. 
 * 
 * @class
 * @param {Object} config
 * 
 * @example
 *	<div id="tx_example" class="tx-example tx-btn-lrbg" unselectable="on">
 *		<a title="\uc608\uc81c" class="tx-icon" href="javascript:;">\uc608\uc81c</a>
 *	</div>
 * 
 * 	new Trex.Button({
 * 		id: 'tx_example',
 * 		wysiwygonly: true,
 * 		sync: false,
 * 		status: false
 * 	});
 */
Trex.Button = Trex.Class.create(/** @lends Trex.Button.prototype */{
	/** @ignore */
	$const: {
		__borderClasses: {	
			'tx-btn-trans': true,
			'tx-btn-lbg': true, 
			'tx-btn-bg': true, 
			'tx-btn-rbg': true,
			'tx-btn-lrbg': true,
			'tx-slt-tlbg': true, 
			'tx-slt-tbg': true, 
			'tx-slt-trbg': true, 
			'tx-slt-blbg': true, 
			'tx-slt-bbg': true, 
			'tx-slt-brbg': true, 
			'tx-slt-31bg': true,
			'tx-slt-31lbg': true, 
			'tx-slt-31rbg': true, 
			'tx-slt-70bg': true, 
			'tx-slt-59bg': true, 
			'tx-slt-42bg': true, 
			'tx-btn-nlrbg': true,
			'tx-btn-43lrbg': true,
			'tx-btn-52lrbg': true,
			'tx-btn-57lrbg': true,
			'tx-btn-71lrbg': true,
			'tx-btn-48lbg': true, 
			'tx-btn-48rbg': true, 
			'tx-btn-30lrbg': true, 
			'tx-btn-46lrbg': true,
			'tx-btn-67lrbg': true,
			'tx-btn-49lbg': true,
			'tx-btn-58bg': true,
			'tx-btn-46bg': true,
			'tx-btn-49rbg': true,
			'tx-btn-widget': true,
			'tx-btn-widget-tbg': true,
			'tx-btn-widget-brbg': true
		},
		addBorderClass: function(className){
			Trex.Button.__borderClasses[className] = true;
		},
		getBorderClass: function(el){
			var _classes = $tx.classNames(el);
			for(var i =0; i < _classes.length; i++){
				var _class = _classes[i];
				var _matched = Trex.Button.__borderClasses[_class];
				if(_matched){
					return _class;
				}
			}
		}
	},
	/**
	 * \uc0c1\ud0dc\uac00 \uc788\ub294\uc9c0 \uc5ec\ubd80
	 */
	hasState: null,
	/**
	 * \ub77c\ub514\uc624 \ubc84\ud2bc\uc778\uc9c0 \uc5ec\ubd80
	 */
	isRadioButton: null,
	/**
	 * disabled \uc0c1\ud0dc\uc778\uc9c0 \uc5ec\ubd80
	 */
	isDisabled: null,
	/**
	 * \uba54\ub274\uac00 \uc788\ub294 \ubc84\ud2bc\uc758 \uacbd\uc6b0 \uc120\ud0dd\ub41c \uac12 (ex: font-family tool\uc5d0\uc11c '\uad81\uc11c'\ub97c \uc120\ud0dd\ud558\uba74 lastValue\ub294 'Gungsuh,\uad81\uc11c'\uc774\ub2e4.)
	 */
	lastValue: null,
	/**
	 * \uba54\ub274\uac00 \uc788\ub294 \ubc84\ud2bc\uc758 \uacbd\uc6b0 \uc120\ud0dd\ub41c \uba54\ub274\ud56d\ubaa9\uc758 \ub808\uc774\ube14
	 */
	lastText: null,
	/**
	 * \ubc84\ud2bc dom element
	 */
	elButton: null,
	/**
	 * \ubc84\ud2bc\uc758 \uc544\uc774\ucf58 dom element
	 */
	elIcon: null,
	/**
	 * \ubc84\ud2bc\uc758 \ubc30\uacbd \uc774\ubbf8\uc9c0 \ud074\ub798\uc2a4\uc774\ub984
	 */
	borderClass: null,
	/**
	 * \ubc84\ud2bc\uc758 \uc2e4\ud589 command function
	 * @function
	 */
	_command: function(){},
	/**
	 * \ubc84\ud2bc\uc744 \uc2e4\ud589\ud558\uba74 \ud638\ucd9c \ub420 command function\uc744 \uc9c0\uc815\ud55c\ub2e4. 
	 * @private
	 * @function
	 */
	setCommand: function(cmd){
		this._command = cmd;
	},
	initialize: function(config) { //only superclass
		var _config = this.config = config;
		if (_config.borderClass) {
			Trex.Button.addBorderClass(_config.borderClass);
		}
		
		this.itsNew = !!_config.itsnew;
		this.useSync = !!_config.sync; //NOTE: sync font property
		this.hasState = !!_config.status; //NOTE: pushed status
		this.isRadioButton = !!_config.radio;
		this.isDisabled = false;
		this.lastValue = _config.selectedValue || null;
		
		if ( config.el ){
			this.elButton = config.el;
		}else{
			var _elementId = _config.id || "tx_" + _config.identity;
			this.elButton = $must(_elementId + (_config.initializedId || ""));
		}
		var _elButton = this.elButton
		
		var _elIcon = this.elIcon = $tom.collect(_elButton, "a");
		if (!_elIcon) {
			throw new Error("[Exception]Trex.Button : can't find elIcon for button '"+ _elementId +"'");
		}
		this.borderClass = Trex.Button.getBorderClass(_elButton);
		
		if(this.oninitialized){
			this.oninitialized.bind(this)(_config);	
		}
		this.generate();
		
		if(this.itsNew) {
			$tom.append(_elIcon, Trex.MarkupTemplate.get('button.itsnew').evaluateAsDom({}));
		}
		
		if (_config.selectedValue && this.setValue) {
			this.setValue(_config.selectedValue);
		}
		if (_config.selectedText && this.setText) {
			this.setText(_config.selectedText);
		}
		if ( _config.selectedState && this.setState ){
			this.setState( _config.selectedState );
		}
	},
	/**
	 * \ubc84\ud2bc\uc758 \uc774\ubca4\ud2b8\uc5d0 handler function \uc744 \uac78\uc5b4\uc900\ub2e4.
	 * @function
	 */
	generate: function() {
		var _elIcon = this.elIcon;
		$tx.observe(_elIcon, 'mousedown', this.onMouseDown.bindAsEventListener(this));
		$tx.observe(_elIcon, 'mouseover', this.onMouseOver.bindAsEventListener(this));
		$tx.observe(_elIcon, 'mouseout', this.onMouseOut.bindAsEventListener(this));
		$tx.observe(_elIcon, 'keydown', this.onKeyDown.bindAsEventListener(this));
		$tx.observe(_elIcon, 'click', this.onClick.bindAsEventListener(this));

		if (this.ongenerated) {
			this.ongenerated.bind(this)(this.config);
		}
	},
	/**
	 * \ubc84\ud2bc\uc758 border class \uc774\ub984\uc744 \uac00\uc838\uc628\ub2e4.
	 * @function
	 * @returns {String} css class name \ub610\ub294 'undefined'
	 */
	getCurrentBorderClass: function(el){
		var _classes = $tx.classNames(el);
		
		for(var i =0; i < _classes.length; i++){
			var _class = _classes[i];
			if(_class.indexOf(this.borderClass) != -1){
				return _class; 
			}
		}
		return "undefined";
	},
	/**
	 * \ubc84\ud2bc\uc758 css class \ub97c \ucd08\uae30\uc0c1\ud0dc\ub85c \ubcc0\uacbd\ud55c\ub2e4.
	 * @function
	 */
	normalState: function(){
		var _currBorderClass = this.getCurrentBorderClass(this.elButton);
		$tx.removeClassName(this.elButton, _currBorderClass);
		$tx.addClassName(this.elButton, this.borderClass);
	},
	/**
	 * \ubc84\ud2bc\uc758 css class \ub97c mouse over \uc0c1\ud0dc\ub85c \ubcc0\uacbd\ud55c\ub2e4.
	 * @function
	 */
	hoveredState: function(){
		var _currBorderClass = this.getCurrentBorderClass(this.elButton);
		$tx.removeClassName(this.elButton, _currBorderClass);
		$tx.addClassName(this.elButton, this.borderClass + '-hovered');
	},
	/**
	 * \ubc84\ud2bc\uc758 css class \ub97c \ub20c\ub824\uc788\ub294 \uc0c1\ud0dc\ub85c \ubcc0\uacbd\ud55c\ub2e4.
	 * @function
	 */
	pushedState: function(){
		var _currBorderClass = this.getCurrentBorderClass(this.elButton);
		$tx.removeClassName(this.elButton, _currBorderClass);
		$tx.addClassName(this.elButton, this.borderClass + '-pushed');
	},
	/**
	 * \ubc84\ud2bc\uc758 \ud604\uc7ac \uc0c1\ud0dc\ub97c \ubc18\ud658\ud55c\ub2e4.
	 * @function
	 * @return {String} 'normal', 'pushed', 'hovered'
	 */
	currentState: function(){
		var _currBorderClass = this.getCurrentBorderClass(this.elButton);
		var cs = "normal";
		if(_currBorderClass.indexOf('-pushed') != -1){
			cs = "pushed";
		}else if(_currBorderClass.indexOf('-hovered') != -1){
			cs = "hovered";
		}
		return cs;
	},
	/**
	 * \ubc84\ud2bc\uc774 \ub20c\ub9b0 \uc0c1\ud0dc\uc778\uc9c0 \uc544\ub2cc\uc9c0 \ud310\ub2e8\ud55c\ub2e4.
	 * @function
	 * @return {boolean} \ub20c\ub9b0 \uc0c1\ud0dc(pushed)\uc774\uba74 true, \uc544\ub2c8\uba74 false
	 */
	isPushed: function(){
		return ("pushed" == this.currentState());
	},
	/**
	 * \uba54\ub274\uac00 \uc788\ub294 \ubc84\ud2bc\uc778\uc9c0 \ud310\ub2e8\ud55c\ub2e4.
	 * @function
	 * @return {boolean} \uba54\ub274\uac00 \uc788\uc73c\uba74 true, \uc544\ub2c8\uba74 false
	 */
	hasMenu: function(){
		return this.tool ? !!(this.tool.menu) : false;
	},
	/**
	 * \ubc84\ud2bc\uc744 \ub204\ub974\uba74 normal state \ub610\ub294 pushed state\ub85c \ubcc0\uacbd\ud55c\ub2e4.
	 * @function
	 */
	onMouseDown: function(ev) {
		if(ev){
			$tx.stop(ev);
		}
		if(this.isDisabled) {
			return;
		}
		if(this.hasMenu() || this.hasState){
			if (this._command() === false) {
				return;
			}
		}else{
			this.evsessionstarted = true;
		}
		if (this.isPushed()) {
			this.normalState();
		} else {
			this.pushedState();
		}
	},
	/**
	 * \ub9c8\uc6b0\uc2a4 \ucee4\uc11c\ub97c \ubc84\ud2bc\uc601\uc5ed \uc704\uc5d0 \uc62c\ub9ac\uba74 hovered state\ub85c \ubcc0\uacbd\ud55c\ub2e4.
	 * @function
	 */
	onMouseOver: function() {
		if(this.isDisabled || this.isPushed()) {
			return;
		}
		this.hoveredState();
	},
	/**
	 * \ub9c8\uc6b0\uc2a4 \ucee4\uc11c\uac00 \ubc84\ud2bc\uc601\uc5ed \ubc14\uae65\uc73c\ub85c \ub098\uac00\uba74 normal state\ub85c \ubcc0\uacbd\ud55c\ub2e4.
	 * @function
	 */
	onMouseOut: function() {
		if(this.evsessionstarted){
			this.normalState();
			this.evsessionstarted = false;
		}
		if(this.isDisabled || this.isPushed()){
			return;
		}
		this.normalState();
	},
	/**
	 * \ubc84\ud2bc\uc744 \ud074\ub9ad\ud558\uba74 command function\uc744 \uc2e4\ud589\ud558\uace0 normal state\ub85c \ubcc0\uacbd\ud55c\ub2e4.
	 * @function
	 */
	onClick: function(ev) {
		if(ev){
			$tx.stop(ev);
		}
		if(this.isDisabled) {
			return;
		}	
		if(!this.hasState){
			this._command();
			this.normalState();
			this.evsessionstarted = false;
		}
	},
	/**
	 * event keyCode\uac00 13\uc774\uba74 onMouseDown(), onClick() \uc744 \uc2e4\ud589\ud55c\ub2e4.
	 * @function
	 */
	onKeyDown: function(ev){
		if(ev.keyCode === 13){
			this.onMouseDown(ev);
			this.onClick(ev);
		}
	},
	/**
	 * command function \uc2e4\ud589 \ud6c4 lastValue, lastText\uc758 \uac12\uc744 \uc5c5\ub370\uc774\ud2b8 \ud55c\ub2e4.
	 * @function
	 */
	updateAfterCommand: function(value, text){
		this.setValueAndText(value, text);
		this.normalState();
	},
	/**
	 * lastValue, lastText\uc758 \uac12\uc744 \uc124\uc815\ud55c\ub2e4.
	 * @function
	 */
	setValueAndText: function(value, text){
		this.setValue(value);
		this.setText(text);
	},
	/**
	 * lastValue \uac12\uc744 \uc124\uc815\ud55c\ub2e4.
	 * @function
	 */
	setValue: function(value) {
		if(value) {
			this.lastValue = value;
		}
	},
	/**
	 * lastText \uac12\uc744 \uc124\uc815\ud55c\ub2e4.
	 * @function
	 */
	setText: function(text) {
		this.lastText = text;
	},
	/**
	 * lastValue \uac12\uc744 \uac00\uc838\uc628\ub2e4.
	 * @function
	 * @return {String}
	 */
	getValue: function() {
		return this.lastValue;
	},
	/**
	 * lastText \uac12\uc744 \uac00\uc838\uc628\ub2e4.
	 * @function
	 * @return {String}
	 */
	getText: function() {
		return this.lastText;
	},
	/**
	 * pushed\uc5d0\uc11c normal state\ub85c \ub610\ub294 \uadf8 \ubc18\ub300\ub85c \uc0c1\ud0dc\ub97c \ubcc0\uacbd\ud55c\ub2e4.
	 * @function
	 */
	setState: function(push) {
		if (push) {
			this.pushedState();
		} else {
			this.normalState();
		}
	},
	/**
	 * \uc544\uc774\ucf58 element \uc758 css class \ub97c \uc124\uc815\ud55c\ub2e4.
	 * @function
	 */
	setClassName: function(className) {
		this.elIcon.className = className;
	},
	/**
	 * \ubc84\ud2bc\uc744 \uc0ac\uc6a9\ubd88\uac00 \uc0c1\ud0dc\ub85c \ubcc0\uacbd\ud55c\ub2e4.
	 * @function
	 */
	disable: function() {
		if(this.elButton) {
			this.isDisabled = true;
			$tx.addClassName(this.elButton, "tx-disable");
		}
	},
	/**
	 * \ubc84\ud2bc\uc744 \uc0ac\uc6a9\uac00\ub2a5 \uc0c1\ud0dc\ub85c \ubcc0\uacbd\ud55c\ub2e4.
	 * @function
	 */
	enable: function() {
		if(this.elButton) {
			this.isDisabled = false;
			$tx.removeClassName(this.elButton, "tx-disable");
		}
	},
	/**
	 * \ubc84\ud2bc\uc744 normal state\ub85c \ubcc0\uacbd\ud55c\ub2e4.
	 * @function
	 */
	release: function() {
		if(this.isDisabled) {
			return;
		}
		if(this.hasMenu() || !this.hasState){
			this.normalState();	
		}
	}
});

/**
 * Trex.Button.Select
 * 
 * @extends Trex.Button
 * @class
 */
Trex.Button.Select = Trex.Class.create(/** @lends Trex.Button.Select.prototype */{
	/** @ignore */
	$extend: Trex.Button,
	/**
	 * \ubc84\ud2bc\uc5d0 \ud654\uc0b4\ud45c \ubc84\ud2bc\uc774 \ub354 \ubd99\uc5b4 \uc788\uc744 \uacbd\uc6b0 \ud654\uc0b4\ud45c \ubc84\ud2bc\uc5d0 event handler function \uc744 \uac78\uc5b4\uc900\ub2e4.
	 * @function
	 */
	ongenerated: function(){
		Trex.MarkupTemplate.get('button.select.text').evaluateToDom({
			'data': $tom.getText(this.elIcon)
		}, this.elIcon);
		this.elText = $tom.collect(this.elIcon, 'span');
		
		var _elArrow = $tom.collect(this.elButton, "a.tx-arrow");
		if(_elArrow) {
			$tx.observe(_elArrow, 'mousedown', this.onMouseDown.bindAsEventListener(this));
			$tx.observe(_elArrow, 'mouseover', this.onArrowMouseOver.bindAsEventListener(this));
			$tx.observe(_elArrow, 'mouseout', this.onArrowMouseOut.bindAsEventListener(this));
			$tx.observe(_elArrow, 'click', this.onClick.bindAsEventListener(this));	
		}
	},
	/**
	 * \uba54\ub274\uc5d0\uc11c \uc120\ud0dd\ub41c \uac12\uc758 \ub808\uc774\ube14\uc744 \uc124\uc815\ud55c\ub2e4.
	 * @function
	 */
	setText: function(text) {
		this.elText.innerText = text;
	},
	/**
	 * \ub9c8\uc6b0\uc2a4 \ucee4\uc11c\ub97c \ubc84\ud2bc\uc601\uc5ed \uc704\uc5d0 \uc62c\ub9ac\uba74 hovered state\ub85c \ubcc0\uacbd\ud55c\ub2e4.
	 * @function
	 */
	onArrowMouseOver: function() {
		if(this.isDisabled || this.isPushed()) {
			return;
		}
		this.hoveredState();
	},
	/**
	 * \ub9c8\uc6b0\uc2a4 \ucee4\uc11c\uac00 \ubc84\ud2bc\uc601\uc5ed \ubc14\uae65\uc73c\ub85c \ub098\uac00\uba74 normal state\ub85c \ubcc0\uacbd\ud55c\ub2e4.
	 * @function
	 */
	onArrowMouseOut: function() {
		if(this.isDisabled || this.isPushed()) {
			return;
		}
		this.normalState();
	}
});

/**
 * Trex.Button.Splits
 * 
 * @extends Trex.Button
 * @class
 */
Trex.Button.Splits = Trex.Class.create(/** @lends Trex.Button.Splits.prototype */{
	/** @ignore */
	$extend: Trex.Button,
	ongenerated: function(){
		var _elButton = this.elButton;
		var _elArrow = this.elArrow = $tom.collect(_elButton, "a.tx-arrow");
		if(!_elArrow) {
			throw new Error("[Exception]Trex.Button.Splits : not exist element(a.tx-arrow)");
		}
		$tx.observe(_elArrow, 'mousedown', this.onArrowMouseDown.bindAsEventListener(this));
		$tx.observe(_elArrow, 'mouseover', this.onArrowMouseOver.bindAsEventListener(this));
		$tx.observe(_elArrow, 'mouseout', this.onArrowMouseOut.bindAsEventListener(this));
		$tx.observe(_elArrow, 'click', this.onArrowClick.bindAsEventListener(this));
	},
	/**
	 * \ud654\uc0b4\ud45c \ubc84\ud2bc\uc758 css class \ub97c mouse over \uc0c1\ud0dc\ub85c \ubcc0\uacbd\ud55c\ub2e4.
	 * @function
	 */
	arrowHoveredState: function(){
		var _currBorderClass = this.getCurrentBorderClass(this.elButton);
		$tx.removeClassName(this.elButton, _currBorderClass);
		$tx.addClassName(this.elButton, this.borderClass + '-arrow-hovered');
	},
	/**
	 * \ud654\uc0b4\ud45c \ubc84\ud2bc\uc758 css class \ub97c pushed \uc0c1\ud0dc\ub85c \ubcc0\uacbd\ud55c\ub2e4.
	 * @function
	 */
	arrowPushedState: function(){
		var _currBorderClass = this.getCurrentBorderClass(this.elButton);
		$tx.removeClassName(this.elButton, _currBorderClass);
		$tx.addClassName(this.elButton, this.borderClass + '-arrow-pushed');
	},
	/**
	 * \ubc84\ud2bc\uc744 \ub204\ub974\uba74 \uc0c1\ud0dc\ub97c \ubcc0\uacbd\ud558\uace0 command\ub97c \uc2e4\ud589\ud55c\ub2e4. \ubc84\ud2bc \uc606\uc5d0 \uc788\ub294 \ud654\uc0b4\ud45c\uc758 \uc0c1\ud0dc\ub97c \ubcf8\ub2e4.  
	 * @function
	 */
	onMouseDown: function(ev) {
		if(this.isDisabled) {
			return;
		}
		if(this.isPushed()){
			this.normalState();
			this._command();
			this.commandexecuted = true;
		}else{
			this.pushedState();
			this.commandexecuted = false;
			this.evsessionstarted = true;
		}
	},
	/**
	 * tool\uc758 execute\ub97c \uc2e4\ud589\ud558\uace0 normal state\ub85c \ubcc0\uacbd\ud55c\ub2e4.
	 * @function
	 */
	onClick: function(ev) {
		if(this.isDisabled) {
			return;
		}
		if(!this.commandexecuted){
			this.tool.execute(this.lastValue, this.lastText);
			this.evsessionstarted = false;
		}else{
			this.commandexecuted = false;
		}
		this.normalState();
		if(ev){
			$tx.stop(ev);	
		}
	},
	/**
	 * \ud654\uc0b4\ud45c\ub97c pushed state \ub85c \ubcc0\uacbd\ud558\uac70\ub098 normal state\ub85c \ubcc0\uacbd\ud55c\ub2e4. 
	 * @function
	 */
	onArrowMouseDown: function() {
		if(this.isDisabled) {
			return;
		}
		if (this._command() === false) {
			return;
		}
		if(this.isPushed()){
			this.normalState();
		}else{
			this.arrowPushedState();
		}
	},
	/**
	 * @function
	 */
	onArrowClick: function(ev) {
		if(this.isDisabled) {
			return;
		}	
		if(ev){
			$tx.stop(ev);	
		}
	}, 
	/**
	 * \ud654\uc0b4\ud45c \ubc84\ud2bc\uc758 css class \ub97c mouse over \uc0c1\ud0dc\ub85c \ubcc0\uacbd\ud55c\ub2e4.
	 * @function
	 */
	onArrowMouseOver: function() {
		if(this.isDisabled || this.isPushed()) {
			return;
		}
		this.arrowHoveredState();
	},
	/**
	 * \ud654\uc0b4\ud45c \ubc84\ud2bc\uc758 css class \ub97c normal \uc0c1\ud0dc\ub85c \ubcc0\uacbd\ud55c\ub2e4.
	 * @function
	 */
	onArrowMouseOut: function() {
		if(this.isDisabled || this.isPushed()) {
			return;
		}
		if(this.commandexecuted){
			this.commandexecuted = false;
		}
		this.normalState();
	}
});

/** 
 * Trex.Button.Toggle 
 * 
 * @extends Trex.Button
 * @class
 */
Trex.Button.Toggle = Trex.Class.create(/** @lends Trex.Button.Toggle.prototype */{
	/** @ignore */
	$extend: Trex.Button,
	/**
	 * pushed \ub610\ub294 normal state\ub85c \ubcc0\uacbd\ud55c\ub2e4.
	 * @function
	 */
	setValue: function(selected) {
		if (selected) {
			this.pushedState();
		} else {
			this.normalState();
		}
	}
});

/** 
 * Trex.Button.Widget 
 * 
 * @extends Trex.Button.Select
 * @class
 */
Trex.Button.Widget = Trex.Class.create(/** @lends Trex.Button.Widget.prototype */{
	/** @ignore */
	$extend: Trex.Button.Select,
	/**
	 * lastText \uac12\uc744 \uc124\uc815\ud55c\ub2e4.
	 * @function
	 */
	setText: function(text) {
		this.elIcon.innerText = text;
		if ( this.lastText ){
			$tx.removeClassName( this.elIcon, this.lastText );
		}
		
		$tx.addClassName( this.elIcon, text );
		this.lastText = text;
	},
	/**
	 * \ubc84\ud2bc\uc5d0 menu\uc640 menu handler\ub97c \uc124\uc815\ud55c\ub2e4.
	 * @function
	 */
	setMenu: function(menu, handler) {
		this.hasState = true;
		var _button = this;
		
		menu.setCommand(function() { 
			var success = handler.apply(this, arguments);
			_button.updateAfterCommand.apply(_button, arguments);
			return success;
		});
		
		_button.setCommand(
			function() {
				if(!_button.isPushed()) {
					var _lastvalue = _button.getValue();
					menu.show(_lastvalue);
				} else {
					menu.hide();
				}
				return true;
			}
		);
	}
});

/** 
 * Trex.Button.ColorWidget 
 * 
 * @extends Trex.Button.Widget
 * @class
 */
Trex.Button.ColorWidget = Trex.Class.create(/** @lends Trex.Button.ColorWidget.prototype */{
	/** @ignore */
	$extend: Trex.Button.Widget,
	/**
	 * lastValue \uac12\uc744 \uc124\uc815\ud55c\ub2e4.
	 * @function
	 */
	setValue: function(value){
		$tx.setStyle( this.elIcon.parentNode, {'backgroundColor': value});
		this.lastValue = value;
	},
	/**
	 * do nothing
	 * @function
	 */
	setText: function(){
		// do Nothing
	}
});

/**
 * @fileoverview
 * \uc5d0\ub514\ud130\uc5d0\uc11c \uc0ac\uc6a9\ub418\ub294 menu\uc758 \ubaa8\uc74c
 */

TrexMessage.addMsg({
	'@menu.pallete.enter': "\uc785\ub825",
	'@menu.pallete.more': "\ub354\ubcf4\uae30"
});
/**
 * \uc77c\ubc18\uc801\uc778 \ub3d9\uc791\uc758 \uba54\ub274 \uac1d\uccb4\ub85c, \ud2b9\ud654\ub41c \uba54\ub274\ub294 \uc774 \ud074\ub798\uc2a4\ub97c \uc0c1\uc18d\ubc1b\uc544 \uc0ac\uc6a9\ud55c\ub2e4.<br/>
 * \ud574\ub2f9 \uc5d8\ub9ac\uba3c\ud2b8\ub294 \ubbf8\ub9ac DOM\uc5d0 \uc788\uc5b4\uc57c \ud55c\ub2e4.
 * tool \ub610\ub294 dialog\uc5d0\uc11c \uc0ac\uc6a9\ub41c\ub2e4.
 * 
 * @class
 * @param {Object} config
 * 
 * @example
 *	Trex.Menu.Example = Trex.Class.create({
 *		$extend: Trex.Menu,
 *		ongenerated: function(config) {
 *			//TODO
 *		},
 *		onregenerated: function(config) {
 *			//TODO
 *		}
 * });
 * 
 *	new Trex.Menu({
 *		id: 'tx_example_menu',
 *		options: [
 *			{ label: '\uc635\uc1581', title: '\uc635\uc1581', data: 'option1' },
 *			{ label: '\uc635\uc1582', title: '\uc635\uc1581', data: 'option2' }
 *		]
 *	});
 */
Trex.Menu = Trex.Class.create(/** @lends Trex.Menu.prototype */{
	isInit: false,
	isDisplayed: false,
	_command: function(){},
	/**
	 * menu\uc5d0 command\ub97c \uc124\uc815\ud55c\ub2e4.
	 * @private
	 * @function
	 */
	setCommand: function(cmd){
		this._command = cmd;
	},
	initialize: function(config) {
		var _config = this.config = config;
		
		var _elMenu;
		if(_config.el) {
			_elMenu = _config.el;
			if(!_elMenu) {
				throw new Error("[Exception]Trex.Menu : not exist element(" + _config.el + ")");
			}
		} else {
			var _elementId = _config.id;
			var _initializedId = ((_config.initializedId)? _config.initializedId: "");
			if (!_elementId) {
				if (!_config.identity) {
					throw new Error("[Exception]Trex.Menu : not exist config - id");
				}
				_elementId = "tx_" + _config.identity + "_menu";
			}
			_elMenu = $tx(_elementId + _initializedId);
			if(!_elMenu) {
				throw new Error("[Exception]Trex.Menu : not exist element(" + _elementId + ")");
			}
		}
		this.elMenu = _elMenu;
		
		if(_config.top){
			_elMenu.style.top = _config.top + 'px';
		}
		if(_config.left){
			_elMenu.style.left = _config.left + 'px';
		}
		
		if(this.oninitialized) {
			this.oninitialized.bind(this)(config);
		}
		if (this.ongenerated) {
			this.generateHandler = this.ongenerated.bind(this);
		}
		if (this.onregenerated) {
			this.regenerateHandler = this.onregenerated.bind(this);
		}
	},
	/**
	 * menu\ub97c DOM\uc744 \uc0dd\uc131\ud55c\ub2e4.
	 * @function
	 */
	generate: function(initValue) {
		if (this.generateHandler) {
			var _config = this.config;
			this.generateHandler(_config, initValue);
		}
	},
	/**
	 * menu\ub97c \uc7ac\uc0dd\uc131\ud55c\ub2e4.
	 * @function
	 */
	regenerate: function(initValue) {
		if (this.initHandler) {
			this.initHandler();
		}
		if (this.regenerateHandler) {
			var _config = this.config;
			this.regenerateHandler(_config, initValue);
		}
	},
	/**
	 * menu \uc5d0\uc11c \uc120\ud0dd\ub41c \ud56d\ubaa9\uc5d0 \ub300\ud55c command\ub97c \uc2e4\ud589\ud55c\ub2e4.
	 * @function
	 */
	onSelect: function(ev, value) {
		var _args = $A(arguments);
		var _ev = _args.shift();
		this._command.apply(this, _args); //\uac00\ubcc0\uc801\uc778 arguments\ub97c \uc704\ud574
		this.hide();
		$tx.stop(_ev);
	},
	/**
	 * menu \uc5d0\uc11c \ucde8\uc18c\ub97c \ub204\ub974\uba74 menu \ub97c \ub2eb\ub294\ub2e4.
	 * @function
	 */
	onCancel: function() {
		if(this.cancelHandler) {
			this.cancelHandler();
		}
		this.hide();
	},
	/**
	 * menu \uac00 \uc5f4\ub9b0 \uc0c1\ud0dc\uc778\uc9c0 \ud655\uc778\ud55c\ub2e4.
	 * @function
	 * @return {boolean} \uc5f4\ub824\uc788\uc73c\uba74 true, \uc544\ub2c8\uba74 false
	 */
	visible: function() {
		return this.isDisplayed;
	},
	/**
	 * menu \ub97c \uc5f0\ub2e4. this.generate() \ub610\ub294 this.regenerate() function\uc744 \ud638\ucd9c\ud55c\ub2e4.
	 * @function
	 */
	show: function(initValue) {
		$tx.show(this.elMenu);
		if(!this.isInit) {
			this.generate(initValue);
			this.isInit = true;
		}
		this.regenerate(initValue);
		if(this.showSpecial) { //NOTE: Cuz insertlink focus
			this.showSpecial();
		}
		this.isDisplayed = true;
	},
	/**
	 * menu \ub97c \ub2eb\ub294\ub2e4.
	 * @function
	 */
	hide: function(ev) {
		$tx.hide(this.elMenu);
		this.isDisplayed = false;
	},
	/**
	 * menu \ub97c \uc5f4\uac70\ub098 \ub2eb\ub294\ub2e4.
	 * @function
	 */
	toggle: function(ev) {
		if( this.isDisplayed ){
			this.hide();
		}else{
			this.show();
		}
	},
	/**
	 * menu \ub97c \ub2eb\ub294\ub2e4.
	 * @function
	 */
	release: function(ev) {
		if(!this.isInit) {
			return;
		}
		this.hide(ev);
	}
});

Trex.MarkupTemplate.add(
	'menu.select', 
	'<ul class="tx-menu-list" unselectable="on">#{items}</ul>'
);
Trex.MarkupTemplate.add(
	'menu.select.item',
	'<li class="tx-menu-list-item"><a class="#{klass}" href="javascript:;" unselectable="on">#{label}</a></li>'
);

/**
 * Trex.Menu.Select
 * as fontfamily, fontsize
 * 
 * @extends Trex.Menu
 * @class
 * @param {Object} config
 */
Trex.Menu.Select = Trex.Class.create(/** @lends Trex.Menu.Select.prototype */{
	/** @ignore */
	$extend: Trex.Menu,
	/**
	 * menu\ub97c \uc0dd\uc131\ud55c\ub2e4.
	 * @function
	 */
	generate: function() {
		/*
			[{
				label: "string",
				title: "string",
				data: "string",
				klass: "string",
			}]
		*/
		var _config = this.config;
		var _optionz = this.getCheckedConfig(_config);
		
		var _elList = this.generateList(_optionz);
		$tom.insertFirst(this.elMenu, _elList);
		
		if (this.generateHandler) {
			this.generateHandler(_config);
		}
		if (this.ongeneratedList) {
			this.generateList = this.ongeneratedList.bind(this);
		}
		if (this.ongeneratedListItem) {
			this.generateListItem = this.ongeneratedListItem.bind(this);
		}
	},
	/**
	 * option config \uc5d0\uc11c \uc720\ud6a8\ud55c \uac12\ub9cc \uac78\ub7ec\ub0b8\ub2e4.
	 * @fuction
	 * @return {object} options. menu \ud56d\ubaa9\uc758 \uac12, \ub808\uc774\ube14, styleClass \ub4f1\uc5d0 \ub300\ud55c \uc815\ubcf4
	 */
	getCheckedConfig: function(config) {
		var _optionz = config.options.select(function(option) {
			if(option.expired == true){
				return false;
			} else {
				return true;
			}
		}) || [];
		return _optionz;
	},
	/**
	 * menu \uc758 list markup \uc744 \ub9cc\ub4e4\uace0 event handler \ub97c \uc5f0\uacb0\ud55c\ub2e4.
	 * @function
	 */
	generateList: function(optionz) {
		var _elGroup = Trex.MarkupTemplate.get("menu.select").evaluateAsDom({
			'items': this.generateListItem(optionz)
		});
		
		var _elItemList = $tom.collectAll(_elGroup, "li a");
		for (var i=0; i < optionz.length; i++) {
			var _option = optionz[i];
			var _elItem = _elItemList[i];
			$tx.observe(_elItem, "click", this.onSelect.bindAsEventListener(this, _option.data, _option.title));
		}
		return _elGroup;
	},
	/**
	 * menu \uc758 list item markup \uc0dd\uc131\ud55c\ub2e4.
	 * @function
	 * @return {String} HTML markup
	 */
	generateListItem: function(option) {
		var result = [];
		for(var i=0; i < option.length; i++) {
			result.push(Trex.MarkupTemplate.get("menu.select.item").evaluate(option[i]));	
		}
		return result.join("");
	},
	/**
	 * menu \uc758 list item \uc774 \uc120\ud0dd\ub418\uc5c8\uc744 \ub54c command \ub97c \uc2e4\ud589\ud55c\ub2e4.
	 * @function
	 */
	onSelect: function() {
		var _args = $A(arguments);
		var _ev = _args.shift();
		this._command.apply(this, _args); 
		this.hide();
		$tx.stop(_ev);
	}
});

Trex.MarkupTemplate.add(
	'menu.items', [
		'<table unselectable="on"><tbody>',
		'	#{for:row}<tr>',
		'		#{for:col}<td class="tx-menu-list-item">',
		'<a href="javascript:;"><span class="#{klass}">',
		'#{if:image!=""}<img src="#{image}" data="#{data}"/>#{/if:image}',
		'#{if:image=""}#{data}#{/if:image}',
		'</span></a>',
		'		</td>#{/for:col}',
		'	</tr>#{/for:row}',
		'</tbody></table>'
	].join("")
);

Trex.MarkupTemplate.add(
	'menu.list', [
		'<div class="tx-menu-inner">',
		'	<div class="tx-menu-list">',
		'   	#{items}',
		'    </div>',
		'</div>'
	].join("")
);

/**
 * Trex.Menu.List
 * as horizontalrule, lineheight, quote, textbox
 * 
 * @extends Trex.Menu
 * @class
 * @param {Object} config
 */
Trex.Menu.List = Trex.Class.create(/** @lends Trex.Menu.List.prototype */{
	/** @ignore */
	$extend: Trex.Menu,
	/**
	 * menu\ub97c \uc0dd\uc131\ud55c\ub2e4.
	 * @function
	 */
	generate: function() {
		var _config = this.config;
		/*
			[{
				data: "string",
				klass: "string",
			}]
		*/
		var _optionz = _config.options.select(function(option) {
			if (option.expired == true) {
				return false;
			} else {
				return true;
			}
		}) || [];
		this.cols = _config.cols || 1;
		this.rows = _config.rows || _optionz.length;

		var _elList = this.generateList(_optionz);
		$tom.insertFirst(this.elMenu, _elList);
		
		if (this.ongeneratedList) {
			this.generateList = this.ongeneratedList.bind(this);
		}
		if (this.ongeneratedListItem) {
			this.generateListItem = this.ongeneratedListItem.bind(this);
		}
		
		if (this.generateHandler) {
			this.generateHandler(_config);
		}
	},
	/**
	 * menu \uc758 list markup \uc744 \ub9cc\ub4e4\uace0 mouse event handler \ub97c \uc5f0\uacb0\ud55c\ub2e4.
	 * @function
	 */
	generateList: function(options) {
		var _options = Trex.MarkupTemplate.splitList(this.rows, this.cols, options);
		var _elList = Trex.MarkupTemplate.get('menu.list').evaluateAsDom({
			'items': Trex.MarkupTemplate.get('menu.items').evaluate(_options)
		});
		
		$tx.observe(_elList, "click", this.onSelect.bindAsEventListener(this));
		$tx.observe(_elList, 'mouseover', this.onItemMouseOver.bindAsEventListener(this));
		$tx.observe(_elList, 'mouseout', this.onItemMouseOut.bindAsEventListener(this));
		
		return _elList;
	},
	/**
	 * menu \ud56d\ubaa9\uc5d0 mouse over \ud560 \ub54c hover state \uc758 style class \ub97c \uc801\uc6a9\ud55c\ub2e4.
	 * @function
	 */
	onItemMouseOver: function(ev) {
		var _el = $tx.findElement(ev, 'span');
		if (_el.tagName && _el.tagName.toLowerCase() == 'span') {
			$tx.addClassName(_el, "tx-item-hovered");
		}
		$tx.stop(ev);
	},
	/**
	 * menu \ud56d\ubaa9\uc5d0 mouse out \ud560 \ub54c hover state \uc758 style class \ub97c \ud574\uc81c\ud55c\ub2e4.
	 * @function
	 */
	onItemMouseOut: function(ev) {
		var _el = $tx.findElement(ev, 'span');
		if (_el.tagName && _el.tagName.toLowerCase() == 'span') {
			$tx.removeClassName(_el, "tx-item-hovered");
		}
		$tx.stop(ev);
	},
	/**
	 * menu \uc758 \ud56d\ubaa9\uc774 \uc120\ud0dd\ub418\uc5c8\uc744 \ub54c command \ub97c \uc2e4\ud589\ud55c\ub2e4. 
	 * @function
	 */
	onSelect: function(ev) {
		var _el = $tx.findElement(ev, 'span');
		if (_el.tagName && _el.tagName.toLowerCase() == 'span') {
			var _data;
			if(_el.firstChild && _el.firstChild.nodeType == 1 && _el.firstChild.tagName.toLowerCase() == 'img') {
				_data = $tom.getAttribute(_el.firstChild, "data") || "";
			} else {
				_data = _el.innerText;	
			}
			this._command(_data);
			this.hide();
		}
		$tx.stop(ev);
	}
});

Trex.MarkupTemplate.add(
	'menu.matrix', [
		'<div class="tx-menu-inner">',
		'	<ul class="tx-menu-matrix-title">',
		'		#{for:matrices}<li class=""><a href="javascript:;" class="tx-menu-matrix-title-item">#{title}</a></li>#{/for:matrices}',
		'	</ul>',
		'	<div class="tx-menu-matrix-listset">',
		'   	#{for:matrices}<div class="tx-menu-matrix-list #{klass}">',
		'       	#{items}',
		'		</div>#{/for:matrices}',
		'    </div>',
		'</div>'
	].join("")
);

/**
 * Trex.Menu.Matrix
 * as emoticon
 * 
 * @extends Trex.Menu
 * @class
 * @param {Object} config
 */
Trex.Menu.Matrix = Trex.Class.create(/** @lends Trex.Menu.Matrix.prototype */{
	/** @ignore */
	$extend: Trex.Menu,
	/**
	 * menu\ub97c \uc0dd\uc131\ud55c\ub2e4.
	 * @function
	 */
	generate: function() {
		var _config = this.config;
		/*
			rows: number,
			cols: number,
			matrices: [{
				title: "string",
				options: ["string", ...]
			}]

		*/
		var _matrices = this.matrices = _config.matrices.select(function(matrix) {
			if(!matrix.onlyIE || $tx.msie) {
				return true;
			} else {
				return false;
			}
		}) || [];
		this.cols = _config.cols || 10;
		this.rows = _config.rows || 5;

		var _elList = this.generateMatrix(_matrices);
		$tom.insertFirst(this.elMenu, _elList);
		
		if (this.ongeneratedList) {
			this.generateList = this.ongeneratedList.bind(this);
		}
		if (this.ongeneratedListItem) {
			this.generateListItem = this.ongeneratedListItem.bind(this);
		}
			
		if (this.generateHandler) {
			this.generateHandler(_config);
		}

		this.showFirstTab();
	},
	/**
	 * menu\ub97c \uc7ac\uc0dd\uc131\ud55c\ub2e4.
	 * @function
	 */
	regenerate: function() {
		if(this.showFirstTab) {
			this.showFirstTab();
		}
		if (this.regenerateHandler) {
			var _config = this.config;
			this.regenerateHandler(_config);
		}
	},
	/**
	 * \uaca9\uc790\ubb34\ub2ac \ud615\ud0dc\uc758 menu \ud56d\ubaa9\uc744 \uc0dd\uc131\ud558\uace0 mouse event handler \ub97c \uc5f0\uacb0\ud55c\ub2e4.
	 * @function
	 */
	generateMatrix: function(matrices) {
		var _menu = this;
		var _elMenu = this.elMenu;
		
		var _cols = this.cols;
		var _rows = this.rows;
		matrices.each(function(matrix) {
			var _options = Trex.MarkupTemplate.splitList(_rows, _cols, matrix.options);
			matrix['items'] = Trex.MarkupTemplate.get('menu.items').evaluate(_options);
		});
		
		var _elInner = Trex.MarkupTemplate.get('menu.matrix').evaluateAsDom({
			'matrices': matrices
		});
				
		var _elLists = $tom.collectAll(_elInner, 'div.tx-menu-matrix-listset div.tx-menu-matrix-list');
		var _elTitles = $tom.collectAll(_elInner, 'ul.tx-menu-matrix-title li');
		
		var _isFirstShow = false; //onShow
		var _inx = 0;
		matrices.each(function(matrix) {
			var _elList = _elLists[_inx];
			$tx.observe(_elList, "click", _menu.onSelect.bindAsEventListener(_menu));
			$tx.observe(_elList, 'mouseover', _menu.onItemMouseOver.bindAsEventListener(_menu));
			$tx.observe(_elList, 'mouseout', _menu.onItemMouseOut.bindAsEventListener(_menu));
			
			var _elTitle = _elTitles[_inx];
			$tx.observe(_elTitle, "click", _menu.onTitleClick.bindAsEventListener(_menu, _elTitle, _elList));
			
			if(matrix.defaultshow == true) {
				_menu.showFirstTab = _menu.onTitleClick.bindAsEventListener(_menu, _elTitle, _elList);
				_isFirstShow = true;
			}
			_inx++;
		});
		if(!_isFirstShow) {
			this.showFirstTab = this.onTitleClick.bindAsEventListener(this, _elTitles[0], _elLists[0]);
			_isFirstShow = true;
		}
		return _elInner;
	},
	/**
	 * menu \uc758 group title tab \uc5d0 \ub300\ud55c event handler\ub97c \uc5f0\uacb0\ud55c\ub2e4.
	 * @function
	 */
	onTitleClick: function(ev, elTitleItem, elList) {
		if(this.lastElList == elList) {
			return;
		}

		$tx.show(elList);
		if(this.lastElList) {
			$tx.hide(this.lastElList);
		}
		this.lastElList = elList;

		if(this.lastElTitleItem) {
			$tx.removeClassName(this.lastElTitleItem, 'tx-selected');
		}
		$tx.addClassName(elTitleItem, 'tx-selected');
		this.lastElTitleItem = elTitleItem;
		if (ev) {
			$tx.stop(ev);
		}
	},
	/**
	 * menu \ud56d\ubaa9\uc5d0 mouse over \ud558\uba74 hovered state css class \ub97c \uc801\uc6a9\ud55c\ub2e4.
	 * @function
	 */
	onItemMouseOver: function(ev) {
		var _el = $tx.findElement(ev, 'span');
		if (_el.tagName && _el.tagName.toLowerCase() == 'span') {
			$tx.addClassName(_el,"tx-item-hovered");
		}
		$tx.stop(ev);
	},
	/**
	 * menu \ud56d\ubaa9\uc5d0 mouse out \ud558\uba74 hovered state css class \ub97c \ud574\uc81c\ud55c\ub2e4.
	 * @function
	 */
	onItemMouseOut: function(ev) {
		var _el = $tx.findElement(ev, 'span');
		if (_el.tagName && _el.tagName.toLowerCase() == 'span') {
			$tx.removeClassName(_el, "tx-item-hovered");
		}
		$tx.stop(ev);
	},
	/**
	 * menu \uc758 list item \uc774 \uc120\ud0dd\ub418\uc5c8\uc744 \ub54c command \ub97c \uc2e4\ud589\ud55c\ub2e4.
	 * @function
	 */
	onSelect: function(ev) {
		var _el = $tx.findElement(ev, 'span');
		if (_el.tagName && _el.tagName.toLowerCase() == 'span') {
			this._command(_el.innerText);
			this.hide();
		}
		$tx.stop(ev);
	}
});

Trex.MarkupTemplate.add(
	'menu.colorPallete', [
		'<div class="tx-menu-inner">',
		'<ul class="tx-pallete-text-list"></ul>',
		'<ul class="tx-pallete-thumb-list"></ul>',
		'<p class="tx-pallete-input"><span style="background-color: rgb(7, 3, 3);"></span><input type="text" class="tx-color-value"/><a class="tx-enter">@menu.pallete.enter</a></p>',
		'<div class="tx-pallete-buttons">',
		'	<p class="tx-pallete-more"><a class="tx-more-down" href="javascript:;">@menu.pallete.more</a></p>',
		'</div>',
		'<div class="tx-pallete-picker">',
		'	<div class="tx-pallete-pickerbox">',
		'		<div class="tx-chromabar" style="background-color: rgb(255, 0, 0);"></div><div class="tx-huebar"></div>',
		'	</div>',
		'</div>',
		'</div>'
	].join("")
);

/**
 * Trex.Menu.ColorPallete
 * 
 * @extends Trex.Menu
 * @class
 * @param {Object} config
 */
Trex.Menu.ColorPallete = Trex.Class.create(/** @lends Trex.Menu.ColorPallete.prototype */{
	/** @ignore */
	$extend: Trex.Menu,
	/** @ignore */
	$mixins: [
		Trex.I.ColorPallete
	],
	/**
	 * menu\ub97c \uc0dd\uc131\ud55c\ub2e4.
	 * @function
	 */
	generate: function(initValue) {
		var _config = this.config;
		
		var _elMenu = this.elMenu;
		Trex.MarkupTemplate.get("menu.colorPallete").evaluateToDom({}, _elMenu);
		
		var _transCfg = _config.thumbs.transparent;
		_config.thumbs.transparent = Object.extend(_config.thumbs.transparent, {
			image: TrexConfig.getIconPath(_transCfg.image),
			thumb: TrexConfig.getIconPath(_transCfg.thumb),
			thumbImage:  TrexConfig.getIconPath(_transCfg.thumbImage)
		});
		
		if(!this.hookEvent) {
			throw new Error("[Exception]Trex.Menu.ColorPallete : not implement function(hookEvent)");
		}
		this.hookEvent(_config);

		if (this.generateHandler) {
			this.generateHandler(_config);
		}
	},
	/**
	 * menu \uc758 list item(color) \uc774 \uc120\ud0dd\ub418\uc5c8\uc744 \ub54c command \ub97c \uc2e4\ud589\ud55c\ub2e4.
	 * @function
	 */
	onSelect: function() {
		var _args = $A(arguments);
		var _ev = _args.shift();
		this._command.apply(this, _args);
		this.remainColor(_args);
		this.hide();
		$tx.stop(_ev);
	},
	/**
	 * menu \uc758 list item(color) \uc774 \uc120\ud0dd\ub418\uc5c8\uc744 \ub54c \uc120\ud0dd \ud55c color value \ub97c input box\uc5d0 \ub0a8\uae34\ub2e4.
	 * this.onSelect function \uc5d0\uc11c \ud638\ucd9c\ud55c\ub2e4.
	 * @function
	 */
	remainColor: function(color) {
		if(color) {
			this.setColorValueAtInputbox(color);	
		}
	}
});
Trex.MarkupTemplate.add("blackbox",
	'<div class="tx-blackbox">\
		<div class="tx-blackbox-panel"></div>\
		<div class="tx-content"></div>\
	</div>'
);

Trex.BlackBox = Trex.Class.create({
	initialize: function() { },
	make: function(holder) {
		var _elBlackBox = this.elBlackbox = Trex.MarkupTemplate.get("blackbox").evaluateAsDom({});
		var _holder = this.holder = holder || document.body;
		$tom.insertFirst(_holder, _elBlackBox)
		
		this.elBlackboxPanel = $tom.collect( _elBlackBox, "div.tx-blackbox-panel");
		this.elContentArea = $tom.collect( _elBlackBox, "div.tx-content");
		
		var _panelSize = this.calculatePanelSize();
		this.panelWidth = _panelSize[0];
		this.panelHeight = _panelSize[1];
	},
	show: function(elContent) {
		if(this.elContentArea.firstChild != null){
			return false;
		}
		$tom.append(this.elContentArea, elContent);
		
		$tx.setStyle(this.elBlackbox, {
			'width': this.panelWidth.toPx(),
			'height': this.panelHeight.toPx()
		});
		$tx.setStyle(this.elBlackboxPanel, {
			'width': this.panelWidth.toPx(),
			'height': this.panelHeight.toPx()
		});
		
		$tx.show(this.elBlackbox);
		this.alignCenter();
		return false;
	},
	hide: function() {
		$tx.hide(this.elBlackbox);
		this.elContentArea.removeChild(this.elContentArea.firstChild);
	},
	calculatePanelSize: function() {
		var _panelSize = $tom.getPosition(this.holder);
		return [_panelSize.width, _panelSize.height];
	},
	resizeBlackbox: function(height) {
		this.panelHeight = height;
		$tx.setStyle(this.elBlackbox, {
			'height': this.panelHeight.toPx()
		});
		$tx.setStyle(this.elBlackboxPanel, {
			'height': this.panelHeight.toPx()
		});
		this.alignCenter();
	},
	alignCenter: function(){
		var width = $tx.getStyle(this.elBlackbox, "width" ); 
		var height = $tx.getStyle(this.elBlackbox, "height" );
		
		var _contentSize = $tom.getPosition(this.elContentArea.firstChild);
		var _contentWidth = _contentSize.width.parsePx();
		var _contentHeight = _contentSize.height.parsePx();
		
		var _marginLeft = (this.panelWidth - _contentWidth)/2;
		var _marginTop = ( this.panelHeight > _contentHeight)? (this.panelHeight - _contentHeight)/2: 0;
		$tx.setStyle( this.elContentArea, {
			'marginLeft': _marginLeft.toPx(),
			'marginTop': _marginTop.toPx()
		});
	}
});

Trex.install("editor.getBlackBox & canvas.getBlackBox",
	function(editor, toolbar, sidebar, canvas, config) {
		var _blackBox = new Trex.BlackBox();
		editor.getBlackBox = function() {
			return _blackBox;
		};
		canvas.getBlackBox = function(){
			return _blackBox;
		};
	}
);

Trex.module("generate blackbox", 
	function(editor, toolbar, sidebar, canvas, config) {
		var __CANVAS_OFFSET_HEIGHT = 92;
		var _blackBox = editor.getBlackBox();
		
		_blackBox.calculatePanelSize = function() { // overwrite
			var width = canvas.getSizeConfig().wrapWidth;
			var height = canvas.getCurrentPanel().getPanelHeight().parsePx() + __CANVAS_OFFSET_HEIGHT;
			return [width, height];
		};
		
		var _elContainer = editor.getWrapper();
		_blackBox.make(_elContainer);
		
		canvas.observeKey({ // Esc
			ctrlKey: false,
			altKey: false,
			shiftKey: false,
			keyCode: 27
		}, _blackBox.hide.bind(_blackBox));
		
		editor.observeKey({ // Esc
			ctrlKey: false,
			altKey: false,
			shiftKey: false,
			keyCode: 27
		}, _blackBox.hide.bind(_blackBox));
		
		canvas.observeJob(Trex.Ev.__CANVAS_HEIGHT_CHANGE, function(height) {
			_blackBox.resizeBlackbox(height.parsePx() + __CANVAS_OFFSET_HEIGHT);
		});
	}
);
Trex.MarkupTemplate.add('noticebox', 
'<div class="tx-noticebox">\
	<dl>\
		<dt>\
			<span>#{head}</span>\
			<a href="javascript:;">close</a>\
		</dt>\
		<dd>\
			<p>#{body}</p>\
			<div>\
				<a href="javascript:;"><img src="#{confirm}" border="0"/></a>\
				<a href="javascript:;"><img src="#{cancel}" border="0" /></a>\
			</div>\
		</dd>\
	</dl>\
</div>'
);

Trex.NoticeBox = Trex.Class.create({
	initialize: function(options, blackbox) {
		this.make({
			'head': options.head,
			'body': options.body,
			'confirm': options.confirm || 'http://icon.daum-img.net/editor/btn_confirm_s1.gif?rv=1.0.1',
			'cancel': options.cancel || 'http://icon.daum-img.net/editor/btn_cancel_s1.gif?rv=1.0.1'
		});
		this.blackbox = blackbox;
	},
	make: function(options) {
		if(this.elBox) {
			return this;
		}
		options = options || {};
		var _elBox = this.elBox = Trex.MarkupTemplate.get("noticebox").evaluateAsDom(options);
		$tx.observe($tom.collect(_elBox, "dt a"), "click", this.cancel.bind(this));
		
		$tx.observe($tom.collectAll(_elBox, "dd div a")[0], "click", this.confirm.bind(this));
		$tx.observe($tom.collectAll(_elBox, "dd div a")[1], "click", this.cancel.bind(this));
		return this;
	},
	weave: function(confirmHandler, cancelHandler, completeHandler) {
		this.confirmHandler = confirmHandler;
		this.cancelHandler = cancelHandler;
		this.completeHandler = completeHandler;
		return this;
	},
	show: function() {
		this.blackbox.show(this.elBox);
	},
	hide: function(ev) {
		this.blackbox.hide();
		return false;
	},
	confirm: function(ev) {
		if(this.confirmHandler) {
			this.confirmHandler();
		}
		return false;
	},
	cancel: function(ev) {
		if(this.cancelHandler) {
			this.cancelHandler();
		}
		this.hide(ev);
		return false;
	},
	complete: function(ev) {
		if(this.completeHandler) {
			this.completeHandler();
		}
		this.hide(ev);
		return false;
	}
});

Trex.install("editor.newNoticeBox",
	function(editor, toolbar, sidebar, canvas, config) {
		editor.newNoticeBox = function(options) {
			return new Trex.NoticeBox(options, editor.getBlackBox());
		};
	}
);

/**
 * @fileoverview
 * DaumEitor\uc758 Entrypoint\uc5ed\ud560\uc744 \ud558\ub294 source\ub85c Trex.Editor, Editor \ub97c \ud3ec\ud568
 */

/**
 * \uc2e4\uc81c Editor Implementation, \ud558\uc9c0\ub9cc Editor \uc0dd\uc131 \uc2dc\uc5d0\ub294 Class Editor\ub97c \uc0ac\uc6a9\ud55c\ub2e4
 *
 * {@link Editor}
 * @class
 * @param {Object} config
 */
Trex.Editor = Trex.Class.create( /** @lends Trex.Editor.prototype */{
	/** @ignore */
	$mixins: [Trex.I.JobObservable, Trex.I.KeyObservable],
	toolbar: null,
	sidebar: null,
	canvas: null,
	config: null,
	initialize: function(config) {
		StopWatch.lap("Started editor.init");
		var _editor = this, _config = this.config = TrexConfig.setup(config);
		StopWatch.lap("Before new Trex.Canvas ");
		var _canvas = this.canvas = new Trex.Canvas(_editor, _config);
		StopWatch.lap("Before new Trex.Toolbar ");
		var _toolbar = this.toolbar = new Trex.Toolbar(_editor, _config);
		StopWatch.lap("Before new Trex.Sidebar ");
		var _sidebar = this.sidebar = new Trex.Sidebar(_editor, _config);
		Trex.invokeInstallation(_editor, _toolbar, _sidebar, _canvas, _config);
		
		/* common key event */
		var _evConfig = _config.events;
		var _keyDownHandler = function(ev) {
			if (_evConfig.useHotKey) {
				_editor.fireKeys(ev);
			}
		};
		$tx.observe(document, "keydown", _keyDownHandler.bindAsEventListener(this), false);
		if (_canvas.mode != Trex.Canvas.__WYSIWYG_MODE) {
			_canvas.fireJobs(Trex.Ev.__CANVAS_MODE_INITIALIZE, Trex.Canvas.__WYSIWYG_MODE, _canvas.mode);
		}
		
		_canvas.observeJob(Trex.Ev.__IFRAME_LOAD_COMPLETE, function() {
			var _initializedId = _editor.getInitializedId();
			var _elLoading = $tx("tx_loading" + _initializedId);
			if (!_elLoading) {
				return;
			}
			$tx.hide(_elLoading);
		});
		StopWatch.lap("Before executing Modules ");
		Trex.invokeRegisters(_editor, _toolbar, _sidebar, _canvas, _config);
		Trex.invokeModules(_editor, _toolbar, _sidebar, _canvas, _config);
		StopWatch.lap("Finished editor.init");
	},
	/**
	 * Get toolbar instance
	 * @see Trex.Toolbar
	 */
	getToolbar: function() {
		return this.toolbar;
	},
	/**
	 * Get sidebar instance
	 * @see Trex.Sidebar
	 */
	getSidebar: function() {
		return this.sidebar;
	},
	/**
	 * Get canvas instance
	 * @see Trex.Canvas
	 */
	getCanvas: function() {
		return this.canvas;
	},
	getUsedWebfont: function() {
		return this.canvas.getUsedWebfont();
	},
	/**
	 * Get config instance
	 */
	getConfig: function() {
		return this.config;
	},
	getParam: function(name) {
		var _params = {}, _config = this.config;
		_config.params.each(function(name) {
			if (_config[name]) {
				_params[name] = _config[name];
			}
		});
		return _params[name];
	},
	getWrapper: function() {
		return $must(this.config.wrapper);
	},
	getInitializedId: function() {
		return this.config.initializedId || "";
	},
	saveEditor: function() {
		this.setDisableUnloadHandler();
		this.getSaver().submit();
	},
	loadEditor: function(data) {
		this.getSaver().load(data);
	},
	/**
	 * Editor\uc5d0\uc11c \uc791\uc131\ub41c \uc800\uc7a5\ud558\uae30 \uc704\ud574 parsing\ub41c \uae00\uc758 \ub0b4\uc6a9\uc744  \uac00\uc838\uc628\ub2e4.
	 * @see Trex.Canvas#getContent
	 */
	getContent: function() {
		return this.getSaver().getContent();
	},
	/**
	 * Editor\uc5d0 \ucca8\ubd80\ub41c \ucca8\ubd80\ub370\uc774\ud130 \ub9ac\uc2a4\ud2b8\ub97c \uac00\uc838\uc628\ub2e4.
	 * * @see Trex.Sidebar#getAttachments
	 */
	getAttachments: function(type, all) {
		return this.getSaver().getAttachments(type, all);
	},
	/**
	 * Editor\uc5d0 \uc0bd\uc785\ub41c Embed\ub370\uc774\ud130 \ub9ac\uc2a4\ud2b8\ub97c \uac00\uc838\uc628\ub2e4.
	 * * @see Trex.Sidebar#getEmbeddedData
	 */
	getEmbeddedData: function(type) {
		return this.getSaver().getEmbeddedData(type);
	},
	/**
	 * Editor\uc5d0 \ucca8\ubd80\ub41c \uc815\ubcf4\ucca8\ubd80 \ub9ac\uc2a4\ud2b8\ub97c \uac00\uc838\uc628\ub2e4.
	 * * @see Trex.Sidebar#getResults
	 */
	getResults: function(type) {
		return this.getSaver().getResults(type);
	}
});
// Binds helper functions for Editor
(function() {
	/**
	 * Editor
	 *
	 * @example
	 *  new Editor({
	 *  	txService: 'sampleService',
	 *  	txHost: 'sample.daum.net',
	 *  	txPath: 'sampleService',
	 *  	txVersion: '1.0',
	 *  	initializedId: 'stringValue',
	 *  	form: 'tx_editor_form'+"$!initializedId"
	 *  });
	 *
	 * @extends Trex.Editor
	 * @class
	 * @param {Object} config
	 */
	Editor = Trex.Class.create({
		/** @ignore */
		$const: {
			__ACTIVE: false,
			__PANEL_LOADED: false, //NOTE: Cuz modify, restore
			__EDITOR_LOADED: false,
			__MULTI_LIST: [],
			__SELECTED_INDEX: 0
		},
		initialize: function(config) {
			StopWatch.start();
			var _editor;
			try {
				Editor.__EDITOR_LOADED = false;
				Editor.__PANEL_LOADED = false;
				_editor = new Trex.Editor(config);
				var _initializedId = _editor.getInitializedId();
				if (_initializedId != null) {
					var idx = _initializedId == "" ? 0 : _initializedId;
					Editor.__MULTI_LIST[idx] = _editor;
					Editor.__SELECTED_INDEX = idx;
				}
				Object.extend(Editor, _editor);
				Editor.__EDITOR_LOADED = true;
				Editor.__ACTIVE = true;
			} catch (e) {
				console.log(e);
				if (_editor) {
					_editor.fireJobs(Trex.Ev.__RUNTIME_EXCEPTION, e);
				}
			}
		}
	});
	/**
	 * \uae00\uc744 \uc218\uc815\ud560 \ub54c \uc800\uc7a5\ub41c \uae00\uc744 \ubd88\ub7ec\uc628\ub2e4.
	 * @param {Object} data - \uc5d0\ub514\ud2b8\uc5d0 \ub85c\ub4dc\ud560 \ub0b4\uc6a9/\ucca8\ubd80\ud30c\uc77c \uac12
	 * @example
	 *  Editor.modify({
	 *  	content:'&lt;p&gt;content example&lt;/p&gt;' or $tx('tx_content')
	 *  	attachments: [
	 *  		{attacher: 'image', 
	 *				data: {
	 *					thumburl: "http://cfile163.uf.daum.net/P150x100/0126A20248BFAFF72D2229",
	 *					imageurl: "http://cfile163.uf.daum.net/image/0126A20248BFAFF72D2229",
	 *					originalurl: "http://cfile163.uf.daum.net/original/0126A20248BFAFF72D2229",
	 *					exifurl: "http://cfile163.uf.daum.net/info/0126A20248BFAFF72D2229",
	 *					attachurl: "http://cfile163.uf.daum.net/attach/0126A20248BFAFF72D2229",
	 *					filename: "Tree.jpg",
	 *					filesize: "155833"
	 *				}
	 *			}]
	 *  });
	 */
	Editor.modify = function(data) {
		if (Editor.__PANEL_LOADED && Editor.__EDITOR_LOADED) {
			if (this.loadEditor) {
				this.loadEditor(data);
			}
		} else {
			setTimeout(this.modify.bind(this, data), 10);
		}
	};
	/**
	 * Editor \uc0dd\uc131 \ud6c4 \uc790\ub3d9\uc800\uc7a5\ub41c Content\ub97c \ubd88\ub7ec\uc62c \uacbd\uc6b0 \uc0ac\uc6a9\ud55c\ub2e4.
	 * @param {Object} data
	 * @example
	 *  Editor.restore(
	 *  	{content: 'string', 
	 *  	attachments: [{Object}]});
	 */
	Editor.restore = function(data) {
		if (Editor.__PANEL_LOADED && Editor.__EDITOR_LOADED) {
			var _autoSaver = this.getAutoSaver();
			if (_autoSaver) {
				_autoSaver.load(data);
			}
		} else {
			setTimeout(this.restore.bind(this, data), 10);
		}
	};
	/**
	 * \uae00 \uc800\uc7a5\uc2dc \uc0ac\uc6a9\ud55c\ub2e4.
	 * @example
	 *  &lt;a onclick="Editor.save();return false;" href="#"&gt;save&lt;/a&gt;
	 */
	Editor.save = function() {
		if (Editor.__PANEL_LOADED && Editor.__EDITOR_LOADED) {
			if (this.saveEditor) {
				this.saveEditor();
			}
		} else {
			setTimeout(this.saveEditor.bind(this), 10);
		}
		return false;
	};
	/**
	 * Canvas\uc758 \ucd5c\uadfc focus\uac00 \uc788\ub358 \uc601\uc5ed\uc5d0  focus\ub97c \uc900\ub2e4.
	 * \uc608\ub97c\ub4e4\uc5b4, \uc774\ubbf8\uc9c0\ub97c \ucca8\ubd80\ud558\ub294 \ud31d\uc5c5\ucc3d\uc5d0\uc11c \uc791\uc5c5\uc744 \uc644\ub8cc \ud6c4 \ud31d\uc5c5\ucc3d\uc744 \ub2eb\uace0 \uc5d0\ub514\ud130\uc5d0 \ucd5c\uadfc\uc758 focus\ub97c \uc900\ub2e4.
	 */
	Editor.focus = function() {
		if (Editor.__PANEL_LOADED && Editor.__EDITOR_LOADED) {
			var _canvas = this.getCanvas();
			if (_canvas) {
				_canvas.focus();
			}
		} else {
			setTimeout(this.focus.bind(this), 10);
		}
		return false;
	}; 
	/**
	 * Canvas\uc758 \ub9e8 \uc704\uc5d0 focus\ub97c \uc900\ub2e4.
	 * @see Canvas#focusOnTop
	 */
	Editor.focusOnTop = function() {
		if (Editor.__PANEL_LOADED && Editor.__EDITOR_LOADED) {
			var _canvas = this.getCanvas();
			if (_canvas) {
				_canvas.focusOnTop();
			}
		} else {
			setTimeout(this.focusOnTop.bind(this), 10);
		}
		return false;
	};
	/**
	 * Canvas\uc758 \ub9e8 \uc544\ub798\uc5d0 focus\ub97c \uc900\ub2e4.
	 * @see Canvas#focusOnBottom
	 */
	Editor.focusOnBottom = function() {
		if (Editor.__PANEL_LOADED && Editor.__EDITOR_LOADED) {
			var _canvas = this.getCanvas();
			if (_canvas) {
				_canvas.focusOnBottom();
			}
		} else {
			setTimeout(this.focusOnBottom.bind(this), 10);
		}
		return false;
	};
	/**
	 * Editor\uac00 \uc788\ub294 page\ub97c \ub098\uac08 \uacbd\uc6b0 beforeunload eventlistener\ub97c \uc2e4\ud589 \uc2dc\ud0a4\uc9c0 \ub3c4\ub85d \uc124\uc815\ud55c\ub2e4.
	 * \uc608\ub97c\ub4e4\uba74, Editor\uc5d0\uc11c \uae00\uc744 \uc791\uc131 \uc911\uc5d0 \uc0c8\ub85c\uace0\uce68\ud588\uc744 \uacbd\uc6b0 \uacbd\uace0\ucc3d\uc744 \uc548\ub728\uac8c \ud55c\ub2e4.
	 */
	Editor.permitUnload = function() {
		if (Editor.__PANEL_LOADED && Editor.__EDITOR_LOADED) {
			this.setDisableUnloadHandler();
		} else {
			setTimeout(this.permitUnload.bind(this), 500);
		}
	};
	/**
	 * Editor\uc640 Iframe\uc774 \uc815\uc0c1\uc801\uc73c\ub85c \uc0dd\uc131 \ub41c\ud6c4 argument\ub85c \uc9c0\uc815\ub41c function\uc744 \uc2e4\ud589 \uc2dc\ud0a8\ub2e4.
	 * @param {Function} fn
	 * @example
	 * 	Editor.onPanelLoadComplete(
	 * 		Editor.focus();
	 * 	);
	 */
	Editor.onPanelLoadComplete = function(fn) {
		if (Editor.__PANEL_LOADED == true && Editor.__EDITOR_LOADED == true) {
			if (fn) {
				fn();
			}
		} else {
			Editor.panelLoadCompleteHandler = fn;
		}
	};
	/**
	 * \ub3d9\uc77c\ud55c Page\uc5d0 Editor\uac00 \uc5ec\ub7ec\uac1c \uc0dd\uc131\ub42c\uc744 \uacbd\uc6b0, \ub2e4\ub978 Editor\ub97c \uc9c0\uc815\ud55c\ub2e4.
	 * @param {Object} toIndex
	 */
	Editor.switchEditor = function(toIndex) {
		Editor.__SELECTED_INDEX = toIndex;
		Object.extend(Editor, Editor.__MULTI_LIST[toIndex]);
	};
	/**
	 * focus on form
	 * @param {String} name - focus\ub97c \uc904 form\uc758 name \uc18d\uc131 \uac12
	 * @example
	 * 	Editor.focusOnForm("tx_article_title");
	 */
	Editor.focusOnForm = function(name) {
		if (Editor.__PANEL_LOADED && Editor.__EDITOR_LOADED) {
			window.focus();
			var _form = Editor.getForm();
			if (_form.getElementByName(name)) {
				_form.getElementByName(name).focus();
			}
		} else {
			setTimeout(Editor.focusOnForm.bind(Editor, name), 500);
		}
		return false;
	};
	/**
	 * <b>deprecated</b> - use Editor.switchEditor, \ub3d9\uc77c\ud55c Page\uc5d0 Editor\uac00 \uc5ec\ub7ec\uac1c \uc0dd\uc131\ub42c\uc744 \uacbd\uc6b0, \ub2e4\ub978 Editor\ub97c \uc9c0\uc815\ud55c\ub2e4.
	 * @function
	 * @deprecated since ver 1.2, use Editor.switchEditor
	 */
	Editor.prototype.switchEditor = Editor.switchEditor;
	/**
	 * <b>deprecated</b> - use Editor.focusOnForm, focus on form
	 * @function
	 * @deprecated since ver 1.2, Use Editor.focusOnForm
	 */
	Editor.prototype.focusOnForm = Editor.focusOnForm;
})();
/**
 * @fileoverview
 * - Trex.Toolbar
 */

/**
 * Trex.Toolbar Class
 * @class
 * @param {Object} editor
 * @param {Object} config
 */
Trex.Toolbar = Trex.Class.create(/** @lends Trex.Toolbar.prototype */{
	/** @ignore */
	$mixins: [
		Trex.I.JobObservable
	],
	/**
	 * Toolbar Dom Element
	 */
	el: null,
	/**
	 * Tools List
	 */
	tools: null,
	initialize: function(editor, rootConfig) {
		this.canvas = editor.getCanvas();
		
		var _initializedId =  rootConfig.initializedId || "";
		this.el = $must("tx_toolbar_basic" + _initializedId, "Trex.Toolbar");
	},
	/**
	 * Toolbar\uc758 tool\uc744 \ube44\ud65c\uc131\ud654 \uc2dc\ud0a8\ub2e4. 
	 * @function
	 * @example
	 * 	Editor.getToolbar().disableToolbar();
	 */
	disableToolbar: function(){
		var _tools = this.tools;
		for (var _name in _tools) {
			if (_tools[_name].button) {
				_tools[_name].button.disable();
			}
		}
	},
	/**
	 * \ud604\uc7ac toolbar\uc758 \uc0c1\ud0dc\ub97c serializing\ud55c\ub2e4. 
	 * @function
	 * @returns {object}
	 */
	serializeToolValues : function(){
		var _tools = this.tools;
		var result = {};
		for(var name in _tools){
			var _tool = _tools[name];
			result[name] = _tool.button.lastValue;
		}
		return result;
	},
	widgetSeq:0,
	makeWidget: function(button, menu, handler) {
		var _toolbar = this;
		var _canvas = this.canvas;
		var _dummyToolClass = new (function() {
			this.identity = 'widget' + (++_toolbar.widgetSeq);
			this.wysiwygonly = true;
			this.canvas = _canvas;
			this.toolbar = _toolbar;
		})();
		
		Trex.Tool.prototype.weave.bind(_dummyToolClass)(
			button, 
			menu, 
			handler
		);
		
		this.tools[_dummyToolClass.identity] = _dummyToolClass;
		return _dummyToolClass;
	}
});

Trex.install("editor.getTool",
	function(editor, toolbar, sidebar, canvas, config) {
		var _tools = toolbar.tools = {};
		
		/**
		 * memberOf Editor.prototype
		 * @param {Object} name
		 */
		editor.getTool = function(name) {
			if(_tools[name] != null) {
				return _tools[name];
			} else if(arguments.length == 0){
				return _tools;
			}else{
				return null;
			}
		};
	}
);

Trex.register("new tools",
	function(editor, toolbar, sidebar, canvas, config) {
		var _tools = toolbar.tools;
		
		var _initializedId = config.initializedId || ""; 
		for(var item in Trex.Tool) {
			var _name = Trex.Tool[item]['__Identity'];
			if(_name){
				var cfg = TrexConfig.getTool(_name, config);
				cfg.initializedId = _initializedId;
				if (Trex.available(cfg, _name + _initializedId)) {
					_tools[_name] = new Trex.Tool[item](editor, toolbar, cfg);
				}
			}
		}
	}
);

Trex.module("bind events with tools",
	function(editor, toolbar, sidebar, canvas, config) {
		var _tools = toolbar.tools;
		
		var _changeMode = function(from, to){
			if (from == to) {
				return;
			}
			for (var _name in _tools) {
				var _tool = _tools[_name];
				var _btn = _tool.button;
				if (Trex.Canvas.__WYSIWYG_MODE == to) {
					_btn.enable();
				} else if (Trex.Canvas.__WYSIWYG_MODE == from) {
					if (_tool.wysiwygonly) {
						_btn.disable();
					} else {
						_btn.enable();
					}
				}
			}
		};
		canvas.observeJob(Trex.Ev.__CANVAS_MODE_CHANGE, _changeMode);
		canvas.observeJob(Trex.Ev.__CANVAS_MODE_INITIALIZE, _changeMode);
		
		var _releaseTools = function(identity) {
			for(var _name in _tools) {
				var _tool = _tools[_name];
				if(identity != _tool.identity) {
					if (_tool.button) {
						_tool.button.release();
					}
					if(_tool.menu) {
						_tool.menu.release();
					}
				}
			}
		};
		canvas.observeJob(Trex.Ev.__CANVAS_PANEL_CLICK, _releaseTools);
		canvas.observeJob(Trex.Ev.__CANVAS_SOURCE_PANEL_CLICK, _releaseTools);
		canvas.observeJob(Trex.Ev.__CANVAS_TEXT_PANEL_CLICK, _releaseTools);
		
		toolbar.observeJob(Trex.Ev.__TOOL_CLICK, _releaseTools);

		canvas.observeKey({ // Esc
			ctrlKey: false,
			altKey: false,
			shiftKey: false,
			keyCode: 27
		}, _releaseTools);

		editor.observeKey({ // Esc
			ctrlKey: false,
			altKey: false,
			shiftKey: false,
			keyCode: 27
		}, _releaseTools);
		
		$tx.observe(document, 'click', 
			function(e){
				var _el = $tx.element(e);
				var _class = [	'tx-sidebar', 'tx-toolbar-basic' ,'tx-toolbar-advanced', 
					'tx-sidebar-boundary', 'tx-toolbar-boundary', 'tx-toolbar-boundary'];
				if (Trex.Util.getMatchedClassName(_el, _class)) {
					_releaseTools("-");
				}	
			}
		, false);	
	}
);

/**
 * Tool \ud074\ub798\uc2a4\uc758 \ucd94\uc0c1 \ubd80\ubaa8\ud074\ub798\uc2a4\ub85c \uac01\uac01\uc758 tool\ub4e4\uc740 \uc774 \ud074\ub798\uc2a4\ub97c \uc0c1\uc18d\ubc1b\uc544\uc57c \ud558\uace0, 
 * 'oninitialized' \ud568\uc218\ub97c \uad6c\ud604\ud574\uc57c\ud55c\ub2e4.
 * 
 * @abstract
 * @class
 * @param {Object} editor
 * @param {Object} toolbar
 * @param {Object} config
 * 
 * @example
 *	Trex.Tool.Example = Trex.Class.create({
 *		$const: {
 *			__Identity: 'example'
 *		},
 *		$extend: Trex.Tool,
 *		oninitialized: function(config) {
 *			var _tool = this;
 *			
 *			this.weave.bind(this)(
 *				new Trex.Button(this.buttonCfg),
 *				new Trex.Menu(this.menuCfg),
 *				function(data) {
 *					//TODO
 *				}
 *			);
 *		}
 *	});
 */
Trex.Tool = Trex.Class.draft(/** @lends Trex.Tool.prototype */{
	/**
	 * tool identifier. \uc720\uc77c\ud574\uc57c\ud55c\ub2e4.
	 * @private
	 */
	identity: null,
	/**
	 * button \uac1d\uccb4
	 */
	button: null,
	/**
	 * menu \uac1d\uccb4
	 */
	menu: null,
	initialize: function(editor, toolbar, config) {
		if(!this.constructor.__Identity) {
			throw new Error("[Exception]Trex.Tool : not implement const(__Identity)");
		}
		this.identity = this.constructor.__Identity;

		if(!editor) {
			throw new Error("[Exception]Trex.Tool : not exist argument(editor)");
		}
		/** 
		 * editor \uac1d\uccb4 
		 * @private
		 */
		this.editor = editor;
		/** 
		 * toolbar \uac1d\uccb4 
		 * @private
		 */
		this.toolbar = toolbar;
		/** 
		 * canvas \uac1d\uccb4
		 * @private 
		 */
		this.canvas = editor.getCanvas();
		/** 
		 * \ud574\ub2f9 tool \uc124\uc815\uac12 
		 * @private
		 */
		this.config = config;
		this.wysiwygonly = ((config.wysiwygonly != null)? config.wysiwygonly: true);
		
		/** 
		 * \ubc84\ud2bc\uc744 \uc0dd\uc131\ud560 \ub54c \ud544\uc694\ud55c \uc124\uc815\uac12
		 * @private 
		 */
		this.buttonCfg = TrexConfig.merge({
			id: "tx_" + this.identity
		}, config);
		
		/** 
		 * \uba54\ub274\ub97c \uc0dd\uc131\ud560 \ub54c \ud544\uc694\ud55c \uc124\uc815\uac12
		 * @private 
		 */
		this.menuCfg = TrexConfig.merge({
			id: "tx_" + this.identity + "_menu"
		}, config);
		
		this.oninitialized.bind(this)(config);
	},
	/**
	 * tool \uac1d\uccb4\ub97c \ucd08\uae30\ud654\ud558\ub294 \ub9c8\uc9c0\ub9c9 \ub2e8\uacc4\uc5d0\uc11c \ud638\ucd9c\ub418\ub294 \ud568\uc218\ub85c,
	 * tool \ud074\ub798\uc2a4\ub97c \uc0c1\uc18d\ubc1b\ub294 tool\uc5d0\uc11c \ubc18\ub4dc\uc2dc \uad6c\ud604\ud574\uc57c \ud55c\ub2e4.
	 * 
	 * @abstract
	 * @private
	 * @function
	 * @param {Object} config
	 */ 
	oninitialized: function(config) {
		throw new Error("[Exception]Trex.Tool : not implements function(oninitialized)");
	},
	/**
	 * \ubcf4\ud1b5 tool\uc740 \ubc84\ud2bc\uacfc \uba54\ub274\ub85c \uad6c\uc131\ub418\ub294\ub370, \uc774 \ud568\uc218\uc5d0\uc11c \uadf8 \ub458 \uc0ac\uc774\uc758 \uc5f0\uacb0\uc744 \ud574\uc900\ub2e4.<br/>
	 * menu\uac00 \uc5c6\uc73c\uba74 \ubc84\ud2bc\uc744 \ud074\ub9ad\ud560 \ub54c execHandler\uac00 \uc2e4\ud589\ub418\uace0,
	 * menu\uac00 \uc788\uc73c\uba74 \ubc84\ud2bc\uc744 \ud074\ub9ad\ud560 \ub54c menu\uac00 \ubcf4\uc774\uba70, 
	 * menu\uc5d0\uc11c \ud2b9\uc815 \uac12\uc744 \uc120\ud0dd\ud558\uba74 \uadf8 \uac12\uc744 \uac00\uc9c0\uace0 execHandler\uac00 \uc2e4\ud589\ub41c\ub2e4.
	 * 
	 * @function
	 * @private
	 * @param {Object} button - \ubc84\ud2bc \uac1d\uccb4
	 * @param {Object} menu - \uba54\ub274 \uac1d\uccb4 optional
	 * @param {Function} execHandler
	 * @param {Function} initHandler - optional
	 * 
	 * @example
	 *	this.weave.bind(this)(
	 *		new Trex.Button(this.buttonCfg),
 	 *		new Trex.Menu(this.menuCfg),
	 *		function(data) {
	 *			//TODO
	 *		});
	 *	}
	 */
	weave: function(button, menu, execHandler, initHandler) {
		var _tool = this;
		var _identity = this.identity;
		var _toolbar = this.toolbar;
		var _canvas = this.canvas;
		
		this.button = button;
		button.tool = this;
		var cmd = null;
		if(!menu){
			button.setCommand(
				cmd = function(){
					_toolbar.fireJobs(Trex.Ev.__TOOL_CLICK, _identity);
					var success = execHandler.apply(_tool, arguments);
					return success;
				}
			);
		}else{
			this.menu = menu;
			menu.tool = this;
			
			menu.initHandler = initHandler || function(){};
			menu.cancelHandler = function(){ button.setState(false); };
		
			menu.setCommand(
				cmd = function() { 
					var success = execHandler.apply(_tool, arguments);
					button.updateAfterCommand.apply(button, arguments);
					return success;
				}
			);
			button.setCommand(
				function() {
					_toolbar.fireJobs(Trex.Ev.__TOOL_CLICK, _identity);
					if(!button.isPushed()) {
						var _lastvalue = button.getValue();
						menu.show(_lastvalue);
					} else {
						menu.hide();
					}
					if($tx.msie) {
						var _processor = _canvas.getProcessor();
						if(_processor.restoreRange){
							setTimeout(function(){
								_processor.restoreRange();
							},0);
						}
					}
					return true;
				}
			);
		}
		this.execute = cmd;
	}
});
/**
 * @fileoverview 
 * Trex.SIdebar, Trex.EntryBox, Trex.Entry, Trex.Actor\ub97c \ud3ec\ud568\ud558\uace0 \uc788\ub2e4.  
 */

/**
 * \uc5d0\ub514\ud130\uc640 \uc678\ubd80 component\uc0ac\uc774\uc758 \uc5f0\ub3d9\uc744 \ud558\ub294 class
 * 
 * @class
 * @param {object} editor
 * @param {object} config
 */
Trex.Sidebar = Trex.Class.create({
	/** @ignore */
	$const: {
		__REG_ENTRY_ATTR_PAIR_Q: new RegExp("([\\w]+)=\"([^\"]+)\"", "g"),
		__REG_ENTRY_ATTR_PAIR_NQ: new RegExp("([\\w]+)=([\\w]+)", "g")
	},
	/** @ignore */
	$mixins: [
		Trex.I.JobObservable
	],
	entryboxRegistry: null,
	initialize: function(editor, rootConfig) {
		var _canvas = editor.getCanvas();
		var _initializedId = (rootConfig.initializedId) ? rootConfig.initializedId : "";
		
		this.entryboxRegistry = {};
		this.getFields = function() {
			var fields = [];
			for(var i in this.entryboxRegistry){
				var entrybox = this.entryboxRegistry[i];
				fields = fields.concat(entrybox.getFields());
			}
			return fields;
		};

		this.syncSidebar = function() {
			var _content = _canvas.getContent();
			for(var i in this.entryboxRegistry){
				this.entryboxRegistry[i].syncBox(_content);
			}
		};
		this.emptyEntries = function() {
			for(var i in this.entryboxRegistry){
				this.entryboxRegistry[i].empty();
			}
		};

		_canvas.observeJob(Trex.Ev.__CANVAS_PANEL_DELETE_SOMETHING, function() {
			this.syncSidebar();
		}.bind(this));
	}
});


/**
 * Trex.entryBox
 * @class
 */
Trex.EntryBox = Trex.Class.draft({
	/** @ignore */
	$mixins: [
		Trex.I.JobObservable
	],
	autoSeq: 0,
	datalist: [],
	initialize: function(config, canvas, editor) {  
		throw new Error("[Exception]Trex.EntryBox : not implements function(initialize)");
	},
	newSeq: function() {
		return (++this.autoSeq);
	},
	syncSeq: function(existedSeq) {
		this.autoSeq = (existedSeq > this.autoSeq)? existedSeq: this.autoSeq;
		return existedSeq;
	},
	empty: function() {
		this.fireJobs(Trex.Ev.__ENTRYBOX_ALL_ENTRY_REMOVED);
		this.datalist = [];
		entry = null;
	},
	append: function(entry) {
		this.datalist.push(entry);
		this.fireJobs(Trex.Ev.__ENTRYBOX_ENTRY_ADDED, entry);
	},
	modify: function(entry) {
		this.fireJobs(Trex.Ev.__ENTRYBOX_ENTRY_MODIFIED, entry);
	},
	remove: function(entry) {
		entry.deletedMark = true;
		this.fireJobs(Trex.Ev.__ENTRYBOX_ENTRY_REMOVED, entry);
	},
	syncBox: function(content) {
		this.datalist.each(function(entry) {
			entry.execSync(content);
		});
	},
	getFields: function() {
		var _fields = [];
		this.datalist.each(function(entry) {
			_fields.push(entry.getField());
		});
		return _fields.select(function(field) {
			return (field != null);
		});
	},
	getEntries: function(name) {
		if(!name) { //NOTE: all file
			return this.datalist;
		} 
		var _entries = [];
		this.datalist.each(
			function(entry){
				if(entry.type == name){
					_entries.push(entry);
				}
			}
		);
		return _entries;
	}
});

/**
 * Trex.Entry
 * @class 
 */
Trex.Entry = Trex.Class.draft({
	/** @ignore */
	$mixins: [
		Trex.I.JobObservable
	],
	existStage: false,
	deletedMark: false,
	initialize: function(actor, canvas, entryBox, config) {
		throw new Error("[Exception]Trex.Entry : not implements function(initialize)");
	},
	setExistStage: function(existStage) {
		this.existStage = existStage;
	},
	execRegister: function() {
		this.register();
		this.entryBox.append(this);
		this.setExistStage(true);
	},
	execReload: function() {
		if(this.reload) {
			this.reload();
		} 
		this.entryBox.append(this);
		this.exchangeHandlerAtReload();
	},
	execRemove: function() {
		this.remove();
		this.entryBox.remove(this);
	},
	execReplace: function(oldReg) { 
		this.replace(oldReg);
		this.entryBox.modify(this);
		this.setExistStage(true);
	},
	execAppend: function() {
		this.register();
		this.setExistStage(true);
	},
	execSync: function(content) {
		this.setExistStage(this.checkExisted(content));
	},
	checkExisted: function(content) {
		if(this.canvas.canHTML()) {
			return (content.search(this.regHtml) > -1);
		} else {
			return (content.search(this.regText) > -1);
		}
	},
	getChangedContent: function(content, rex, str, param) {
		var _existStage = false;
		if(content.search(rex) > -1) {
			_existStage = true;
			if (this.actor.canResized) { 
				content = this.getChangedContentWithAttr(content, rex, str, param);
			} else {
				content = content.replace(rex, str);
			}
		}
		this.setExistStage(_existStage);
		return content;
	},
	getChangedContentFromHtml: function(content) {
		return this.getChangedContent(content, this.regHtml, this.dispText, ["id", "class"]);
	},
	getChangedContentToHtml: function(content) {
		return this.getChangedContent(content, this.regText, this.dispHtml);
	},
	getChangedContentAtSave: function(content) { //Only HTML
		return this.getChangedContent(content,  this.regHtml, this.saveHtml, ["id", "class"]);
	},
	getChangedContentAtLoad: function(content) { //Only HTML
		return this.getChangedContent(content, this.regLoad, this.dispHtml);
	},
	getChangedContentWithAttr: function(content, reg, disp, excepts) {
		excepts = excepts || [];
		var _attrMap = Trex.Util.getAllAttributes(disp);
				
		var _getChangedTag = function(source) {
			var _tag = Trex.Util.getMatchValue(/<([a-z]*)/i, disp, 1);
			var _attr = ["<"+_tag.toLowerCase()];
			var _overMap = Trex.Util.getAllAttributes(source);

			for(var _name in _attrMap) {
				if (["width", "height"].include(_name)) {
					if(!_overMap[_name]) {
						_attr.push(_name + "=\"" + _attrMap[_name] + "\"");
					}
				} else {
					_attr.push(_name + "=\"" + _attrMap[_name] + "\"");
				}
			}
			
			for(var _name in _overMap) {
				if(!excepts.include(_name)) {
					if (["width", "height"].include(_name)) {
						_attr.push(_name + "=\"" + _overMap[_name] + "\"");
					} else if(!_attrMap[_name]) {
						_attr.push(_name + "=\"" + _overMap[_name] + "\"");
					}
				}
			}
			_attr.push("/>");
			return _attr.join(" "); 
		};
		
		var _orgContent = content;
		var _matchs;
		reg.lastIndex = 0;
		while ((_matchs = reg.exec(_orgContent)) != null) {
			var _textOrg = _matchs[0];
			var _dispTrans = _getChangedTag(_textOrg);
			var _regOrg = _textOrg.getRegExp();
			content = content.replace(new RegExp(_regOrg, "gmi"), _dispTrans);
		}
		return content;
	},
	getField: function() {
		if(!this.field) {
			return null;
		}
		return {
			name: this.field.name, 
			value: [this.field.value, this.existStage].join('|')
		};
	},
	exchangeHandlerAtReload: function(){}
});

/**
 * Trex.Actor
 * @class
 */
Trex.Actor = Trex.Class.draft({
	/** @ignore */
	$mixins: [
		Trex.I.JobObservable
	],
	isDisabled: false,
	initialize: function(config, canvas) {
		throw new Error("[Exception]Trex.Actor : not implements function(initialize)");
	},
	execAttach: function(data, type) {
		var _entry = this.createEntry(this.getDataForEntry(data), type);
		_entry.execRegister();
		this.canvas.fireJobs('canvas.' + (type || this.constructor.__Identity) + '.added', _entry);
	},
	getDatalist: function(){
		return this.entryBox.getEntries(this.name);
	},
	execReattach: function(data, type) {
		var datalist = this.getDatalist();
		var parsedData = this.getDataForEntry(data);
		if(datalist.length < 1) {
			var _entry = this.createEntry(parsedData, type);
			_entry.execRegister();
		} else {
			var _entry = datalist[0];
			var _oldReg = {
				regHtml: _entry.regHtml,
				regText: _entry.regText
			};
			_entry.setProperties(parsedData);
			_entry.execReplace(_oldReg);
		}
	},
	execReload: function(data, content, type) {
		var _entry = this.createEntry(this.getDataForEntry(data, content), type);
		_entry.execReload();
	},
	existEntry: function() {
		return ((this.getDatalist().length == 0)? false: true);
	},
	getFirstEntryData: function() {
		var list = this.getDatalist();
		return ((list.length == 0)? null: list[0].data);
	}
});
Trex.install("editor.getDocParser",
	function(editor, toolbar, sidebar, canvas, config){
		var _docparser = new Trex.Docparser(editor, sidebar, config);
		editor.getDocParser = function() {
			return _docparser;
		};
	}
);

Trex.Docparser =Trex.Class.create( {
		initialize : function(editor, sidebar,  config){
			this.editor = editor;
			this.sidebar = sidebar;
			this.config = config;
		},
		filters: {},
		/**
		 * register contents converting filter 
		 * 
		 * 	original = DB\uc5d0 \uc800\uc7a5\ub418\ub294 \ucee8\ud150\uce20
		 * 	html = wysiwyg \ubaa8\ub4dc\uc5d0\uc11c \ubcf4\uc774\ub294 \ucee8\ud150\uce20
		 * 	source = source \ubaa8\ub4dc\uc5d0\uc11c \ubcf4\uc774\ub294 \ucee8\ud150\uce20
		 * 	text = text \ubaa8\ub4dc\uc5d0\uc11c \ubcf4\uc774\ub294 \ucee8\ud150\uce20
		 * 
		 * @example
		 * editor.getDocParser().registerFilter(
				'filter/converting', {
					'text@load': function(contents){ // orginal -> text
						return contents;
					},
					'source@load': function(contents){ // orginal -> source
						return contents;
					},
					'html@load': function(contents){ // orginal -> html
						return contents;
					},
					'text4save': function(contents){ // text -> orginal 
						return contents;
					},
					'source4save': function(contents){ // source -> orginal 
						return contents;
					},
					'html4save': function(contents){ // html -> orginal 
						return contents;
					},
					'text2source': function(contents){ // text -> source
						return contents;
					},
					'text2html': function(contents){ // text -> html
						return contents;
					},
					'source2text': function(contents){ // source -> text
						return contents;
					},
					'source2html': function(contents){ // source -> html
						return contents;
					},
					'html2text': function(contents){ // html -> text
						return contents;
					},
					'html2source': function(contents){ // html -> source
						return contents;
					}
				}
			);
		 */
		registerFilter: function(name, filter){
			this.filters[name] = filter;
		},
		getFilter: function(name){
			return this.filters[name];
		},
		executeFilters: function(cmd, contents){
			for(var i in this.filters){
				var filter = this.filters[i];
				if(filter[cmd]){
					contents = filter[cmd](contents);	
				}
			}
			return contents;
		},
		getContentsAtChangingMode: function(contents, oldMode, newMode) {
			if (oldMode == newMode) {
				return contents;
			}
			contents = contents || "";
			return this.executeFilters(oldMode.concat("2").concat(newMode), contents);
		},
		convertAtLoad: function(contents, editorMode, inputMode) { // For Display
			/*
			 * DB\uc5d0 \uc800\uc7a5\ub41c \ucee8\ud150\uce20
			 *  > original, text
			 */
			if(inputMode == 'original') { //original \ucee8\ud150\uce20 \ubcc0\ud658
				contents = this.executeFilters(editorMode.concat('@load'), contents);
			} else { //\uadf8\uc678 \ubaa8\ub4dc, \uc790\ub3d9\uc800\uc7a5\uc740 \ubcc0\ud658\uc5c6\uc774 \uc800\uc7a5\ub428.
				if(editorMode != inputMode) {
					contents = this.executeFilters(inputMode.concat("2").concat(editorMode), contents);
				}
			}
			return contents;
		},
		convertAtSave: function(contents, editorMode, outputMode) { // For Save
			if (outputMode == 'original') { //original \ucee8\ud150\uce20 \ubcc0\ud658
				contents = this.executeFilters(editorMode.concat('4save'), contents);
			} else { //\uadf8\uc678 \ubaa8\ub4dc, \uc790\ub3d9\uc800\uc7a5\uc740 \ubcc0\ud658\uc5c6\uc774 \uc800\uc7a5\ub428.
				if (editorMode != outputMode) {
					contents = this.executeFilters(editorMode.concat("2").concat(outputMode), contents);
				}
			}
			return contents;
		},
		/* \uc678\ubd80\uc5d0\uc11c \ucc38\uc870\ud560 \ucee8\ud150\uce20 \ubcc0\ud658 \ud544\ud130\uba85 \uc2dc\uc791 */
		text2source: function(contents) {
			return this.executeFilters("text2source", contents);
		},
		text2html: function(contents) {
			if (contents === "") {
				return this.config.canvas.bogus_html;
			}
			return this.executeFilters("text2html", contents);
		},
		source2text: function(contents) {
			return this.executeFilters("source2text", contents);
		},
		source2html: function(contents) {
			if (contents === "") {
				return this.config.canvas.bogus_html;
			}
			return this.executeFilters("source2html", contents);
		},
		html2text: function(contents) {
			return this.executeFilters("html2text", contents);
		},
		html2source: function(contents) {
			return this.executeFilters("html2source", contents);
		}
		/* \uc678\ubd80\uc5d0\uc11c \ucc38\uc870\ud560 \ucee8\ud150\uce20 \ubcc0\ud658 \ud544\ud130\uba85 \ub05d */
	} 
);
	


Trex.install("editor.getEntryProxy",
	function(editor, toolbar, sidebar, canvas, config){
		var _entryproxy = new Trex.EntryProxy(editor, sidebar, config);
		editor.getEntryProxy = function() {
			return _entryproxy;
		};
	}
);

Trex.EntryProxy =Trex.Class.create( {
	initialize : function(editor, sidebar,  config){
		this.editor = editor;
		this.sidebar = sidebar;
		this.config = config;
	},
	/**
	 * For loadEntriesAtRestore, loadEntriesAtModify
	 */
	commands: {},
	registerCommand: function(name, command){
		this.commands[name] = command;
	},
	getcommand: function(name){
		return this.commands[name];
	},
	executeCommand: function(cmd, data){
		for(var i in this.commands){
			var command = this.commands[i];
			if(command[cmd]){
				command[cmd](data);	
			}
		}
	},
	setAttachments: function(attachments, contents) { //NOTE: data format = JSON
		attachments = attachments || [];
		contents = contents || "";
		
		var _entrybox = this.editor.getAttachBox();
		_entrybox.empty();
		
		var _actors = this.sidebar.getAttacher();
		attachments.each(function(attachment){
			var _actor = _actors[attachment.attacher];
			if(_actor) {
				_actor.execReload(attachment.data, contents, attachment.type);
			}
		});
	},
	getAttachments: function(attachments, all) {
		all = !!all;
		var _attachments = [];
		attachments.each(function(attachment){
			if(attachment.deletedMark) {
				return;
			}
			if(all || attachment.existStage) {
				_attachments.push({
					attacher: attachment.actor.name,
					existStage: attachment.existStage,
					data: Object.extend(attachment.data, {
						tmpSeq: attachment.dataSeq
					}) //html mode
				});
			}
		});
		return _attachments;
	}
} );
	


Trex.install("editor.getForm",
	function(editor, toolbar, sidebar, canvas, config){
		var _formproxy = new Trex.FormProxy(editor, sidebar, config);
		editor.getForm = function() {
			return _formproxy;
		};
	}
);

Trex.FormProxy =Trex.Class.create( {
	initialize : function(editor, sidebar,  config){
		this.editor = editor;
		this.sidebar = sidebar;
		this.config = config;
		
		var _elForm = this.elForm = document.forms[config.form] || document.getElementById(config.form);
		if(!_elForm) {
			throw new Error("[Exception]Trex.Form : not exist element - " + config.form);
		}

		_elForm.onsubmit = function() {
			return false;
		};
	},
	submit: function() {
		this.elForm.submit();
	},
	createField: function(elField) {
		this.elForm.appendChild(elField);
	},
	getElements: function() {
		return this.elForm.elements;
	},
	getElementByName: function(name) {
		return this.elForm[name];
	},
	getFormField: function() {
		var _formfield = {};
		
		var _fields = this.getElements();
		var _field;
		for(var i=0; i<_fields.length; i++) {
			_field = _fields[i];
			if(!["select", "input", "textarea"].include(_field.tagName.toLowerCase())) {
				continue;
			}
			if(!_field.name && !_field.id) {
				continue;
			}
			if(_field.tagName.toLowerCase() == "select") {
				if (_field.selectedIndex > 0) {
					_formfield[_field.name] = _field.options[_field.selectedIndex].value;
				}
			} else {
				if(_field.type == "radio" && !_field.checked) {
					continue;
				} else if(_field.type == "checkbox" && !_field.checked) {
					continue;
				} else {
					_formfield[_field.name || _field.id] = _field.value;
				}
			}
		}
		return _formfield;
	},
	setFormField: function(formfield){
		if(!formfield) {
			return;
		}
		var _fields = this.getElements();
		var _field;
		var _value;
		for(var i=0; i<_fields.length; i++) {
			_field = _fields[i];
			if(_field.name === null || _field.name.length === 0) {
				continue;
			}
			if(!formfield[_field.name]) {
				continue;
			}
			if(!["select", "input", "textarea"].include(_field.tagName.toLowerCase())) {
				continue;
			}
			_value = formfield[_field.name];
			if(_field.tagName.toLowerCase() == "select") {
				for(var j=0; j<_field.options.length; j++) {
					if(_field.options[j].value == _value) {
						_field.options[j].selected = true;
						break;
					}
				}
			} else {
				if(_field.type == "radio" || _field.type == "checkbox") {
					if(_field.value == _value) {
						_field.checked = true;
					}
					continue;
				} else {
					_field.value = _value;
				}
			}
		}
	}
});
		Trex.install("editor.getSaver",
	function(editor, toolbar, sidebar, canvas, config){
		var _saver = new Trex.Save(editor, toolbar, sidebar, canvas, config);
		editor.getSaver = function() {
			return _saver;
		};
	}
);

Trex.Save = Trex.Class.create({
	editor: null,
	toolbar: null,
	sidebar: null,
	canvas: null,
	config: null,
	form: null,
	initialize: function(editor, toolbar, sidebar, canvas, config) {
		this.editor = editor;
		this.toolbar = toolbar;
		this.sidebar = sidebar;
		this.canvas = canvas;
		this.config = config;
		this.form = editor.getForm();
		this.docparser = editor.getDocParser();
		this.entryproxy = editor.getEntryProxy();
	},
	save: function() {
		try {
			if(validForm){
				if (!validForm(this.editor)) {
					return false;
				}
			}
			if(setForm){
				if (!setForm(this.editor)) {
					return false;
				}
			}
			return true;
		} catch(e) {
			this.editor.fireJobs(Trex.Ev.__RUNTIME_EXCEPTION, e);
			return false;
		}
	},
	submit: function() {
		if(this.save()) {
			this.editor.fireJobs(Trex.Ev.__ON_SUBMIT, this.editor);
			var _form = this.form;
			setTimeout(function(){
				_form.submit();
			}, 500);
		}
	},
	getContent: function(outputMode) {
		var _canvas = this.canvas;

		//\uc5d0\ub514\ud130\ubaa8\ub4dc, \ucd9c\ub825\ubaa8\ub4dc
		var _editorMode = _canvas.mode;
		var _outputMode = outputMode || "original";
		
		var _content = _canvas.getContent(); // getContent() of current mode
		_content = this.docparser.convertAtSave(_content, _editorMode, _outputMode);
		
		return _content;
	},
	getAttachments: function(type, all) {
		all = all || false;
		var _attachments = this.sidebar.getAttachments(type); // all getAttachments()
		return this.entryproxy.getAttachments(_attachments, all);
	},
	getEmbeddedData: function(type) {
		return this.sidebar.getEmbeddedData(type);
	},
	getResults: function(type) {
		return this.sidebar.getResults(type);
	},
	/*
		data = {
			content: "string",
			inputmode: "string",
			attachments: [{
				attacher: "string",
				data: {object}
			}]
		}
	*/
	load: function(jsonData) { //NOTE: data format = JSON
		if(!jsonData) {
			throw new Error("[Exception]Trex.Save : not exist argument(data)");
		}
		if(typeof(loadForm) != "undefined") {
			loadForm(this.editor, jsonData);
		}
		
		var _canvas = this.canvas;
		var _toolbar = this.toolbar;
		var _sidebar = this.sidebar;
		var _form = this.form;
		
		//\uc5d0\ub514\ud130\ubaa8\ub4dc, \uc785\ub825\ubaa8\ub4dc
		var _editorMode = _canvas.mode;
		var _inputMode = (!jsonData.inputmode || jsonData.inputmode == 'html')? 'original': jsonData.inputmode;
		
		var _content = "";
		var _contentObj = jsonData.content;
		if (typeof _contentObj == "string") {
			_content = jsonData.content;
		} else if (_contentObj && _contentObj.nodeType && (_contentObj.nodeType == 1)) {
			_content = jsonData.content.value
		} else {
			throw new Error("[Exception]Trex.Save : invalid argument(jsonData.content)");
		}
		
		this.entryproxy.setAttachments(jsonData.attachments, _content);
		
		_content = this.docparser.convertAtLoad(_content, _editorMode, _inputMode); //onlyHTML
		_canvas.initContent(_content);
		
		_sidebar.syncSidebar(); //?
		
		if(typeof(postLoad) != "undefined") {
			postLoad(this.editor, jsonData);
		}
	},
	makeField: function() {
		var _sidebar = this.sidebar;
		var _form = this.form;

		//NOTE: create field content
		var _content = this.getContent();
		_form.createField(tx.textarea({ name: "tx_content", style: { display: "none" } }, _content));

		//NOTE: create field attach
		var _fields = _sidebar.getFields();
		_fields.each(function(field) {
			_form.createField(tx.input({ type: "hidden", name: field.name, value: field.value }));
		});
	}

});

Trex.module("new Trex.Resizer",
	function(editor, toolbar, sidebar, canvas, config){
		var _initializedId = config.initializedId || ""; 
		var cfg = TrexConfig.get("resizer", config);
		if (Trex.available(cfg, "resizer" + _initializedId)) {
			new Trex.Resizer(editor, cfg);
		}
	}
);
TrexConfig.add({
	'resizer': {
		minHeight: 200
	}
});
Trex.Resizer = Trex.Class.create({
	$const: {
		__Identity: 'resizer'
	},
	$mixins: [
		Trex.I.JobObservable
	],
	initialize: function(editor, config) {
		var _presentHeight = 0;
		if(!editor) {
			return;
		}

		var _initializedId = editor.getInitializedId();
		var _elBar = this.elBar = $must("tx_resizer" + _initializedId, "Trex.Worker.Resizer");
		if(!_elBar) {
			return;
		}
		if($tx.msie_ver == '5.5'){
			_elBar.setAttribute('align', 'center');
		}
		
		this.resizeHeightAtService = function( height ) { //NOTE: service specific job for resize(callback)
			if(typeof(resizeHeight) != 'undefined') {
				resizeHeight( height );
			}
		};
		var _minDragHeight = config.minHeight;
		var _wysiwygDoc;
		this.startDrag = function(ev) {
			var _canvas = editor.getCanvas();
			var _panel = _canvas.getCurrentPanel();
			if(_panel == null) {
				return;
			}

			var _position = _panel.getPosition();
			this.panelHeight = _position.height;
			this.dragStartPosY = ev.clientY;
			this.isDragging = true;
			$tx.observe(document, 'mousemove', this.documentDraggingHandler);
			$tx.observe(document, 'mouseup', this.stopDragHandler);
			if(_panel.getName() == Trex.Canvas.__WYSIWYG_MODE) {
				this.panelTop = _position.y;
				_wysiwygDoc = _panel.getDocument();
				if(_wysiwygDoc == null) {
					return;
				}
				_canvas.fireJobs('canvas.height.beforechange');
				$tx.observe(_wysiwygDoc, 'mousemove', this.wysiwygDraggingHandler);
				$tx.observe(_wysiwygDoc, 'mouseup', this.stopDragHandler);
			}
			$tx.stop(ev);
		};

		this.stopDrag = function(ev){
			var _canvas = editor.getCanvas();
			var _panel = _canvas.getCurrentPanel();
			if(_panel == null) {
				return;
			}
			this.isDragging = false;

			$tx.stopObserving(document, 'mousemove', this.documentDraggingHandler);
			$tx.stopObserving(document, 'mouseup', this.stopDragHandler);
			if(_wysiwygDoc == null) {
				return;
			}
			$tx.stopObserving(_wysiwygDoc, 'mousemove', this.wysiwygDraggingHandler);
			$tx.stopObserving(_wysiwygDoc, 'mouseup', this.stopDragHandler);
			_wysiwygDoc = null;
			
			this.resizeHeightAtService(_presentHeight);
			_canvas.fireJobs('canvas.height.afterchange');
			$tx.stop(ev);
		};

		this.dragingAtDocument = function(ev) {
			var _canvas = editor.getCanvas();
			if (this.isDragging) {
				var _panel = _canvas.getCurrentPanel();
				if(_panel == null) {
					return;
				}
				try {
					var _height = Math.max((this.panelHeight + ev.clientY - this.dragStartPosY), _minDragHeight).toPx();
					_panel.setPanelHeight(_height);
					_presentHeight = _height;
					_canvas.fireJobs('canvas.height.change', _height);
				} catch(e) {
					console.log(e);
				}
			}
			$tx.stop(ev);
		};

		this.dragingAtWysiwyg = function(ev) {
			var _canvas = editor.getCanvas();
			if (this.isDragging) {
				var _panel = _canvas.getCurrentPanel();
				if(_panel == null) {
					return;
				}
				try {
					var _scrollTop = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;
					var _height = Math.max((this.panelHeight + ev.clientY - this.dragStartPosY + this.panelTop - _scrollTop), _minDragHeight).toPx();
					_panel.setPanelHeight(_height);
					_canvas.fireJobs('canvas.height.change', _height);
				} catch(e) {
					console.log(e);
				}
			}
			$tx.stop(ev);
		};

		this.startDragHandler = this.startDrag.bindAsEventListener(this);
		this.stopDragHandler = this.stopDrag.bindAsEventListener(this);
		this.documentDraggingHandler = this.dragingAtDocument.bindAsEventListener(this);
		this.wysiwygDraggingHandler = this.dragingAtWysiwyg.bindAsEventListener(this);
		this.isDragging = false;

		$tx.observe(_elBar, 'mousedown', this.startDragHandler);

		var _canvas = editor.getCanvas();
		_canvas.observeJob('canvas.fullscreen.change', function() {
			$tx.hide(_elBar);
		});

		_canvas.observeJob('canvas.normalscreen.change', function() {
			$tx.show(_elBar);
		});

	}
});/**
 * @fileoverview default history class for redo/undo 
 *  
 * @author iamdanielkim
 */


/**
 * @namespace
 */
(function(){
	var __UNDO_COUNT = 20;
	
	/**
	 * @class
	 */
	Trex.History = Trex.Class.create({});
	Trex.History.prototype = {
		canvas: null,
		initialContent: null,
		undoTaskList: null,
		redoTaskList: null,
		currentTask: null,
		snapshotData: {},
		inithandlers: [],
		isNewTypingForUndo: false,
		/**
		 * initialize 
		 * @param {Object} canvas
		 * @param {Object} config
		 */
		initialize: function(canvas, config){
			var self = this;
			var _canvas = this.canvas = canvas;
						 		
			this.currentTask = new Trex.History.Task({
					'content': config.bogus_html,
					'scrollTop': 0
				},
				function(data) {
					self.inithandlers.each(function(inithandler) {
						inithandler(data);
					});
				}
			);
			this.currentTask.makeSnapshot(this.snapshotData);

			this.undoTaskList = [];
			this.redoTaskList = [];
			
			_canvas.observeJob('canvas.panel.undo', function(){
				var _processor = _canvas.getProcessor();
				if (!_processor) {
					return;
				}
				if (self.undoTaskList.length == 0) {
					return;
				}
				
				if(self.isNewTypingForUndo) {
					var _data = self.getTextData();
					var _handler = self.getTextHandler();
					var _task = new Trex.History.Task(_data, _handler);
					_task.makeBackup(self.snapshotData);
					self.redoTaskList = [_task];
					
					_task.undo();
					self.isNewTypingForUndo = false;
				} else {
					var _task = self.currentTask;
					if (self.redoTaskList.length > __UNDO_COUNT - 1) { //max size
						self.redoTaskList.shift();
					}
					self.redoTaskList.push(_task);
					
					_task.undo();
					_task.makeSnapshot(self.snapshotData);
					
					var _undoTask = self.undoTaskList.last();
					if (self.undoTaskList.length > 0) {
						self.undoTaskList.pop();
					}
					self.currentTask = _undoTask;
				}
			});
			
			_canvas.observeJob('canvas.panel.redo', function(){
				var _processor = _canvas.getProcessor();
				if (!_processor) {
					return;
				}
				if (self.redoTaskList.length == 0) {
					return;
				}
				
				var _task = self.currentTask;
				if (self.undoTaskList.length > __UNDO_COUNT - 1) { //max size
					self.undoTaskList.shift();
				}
				self.undoTaskList.push(_task);
				
				var _redoTask = self.redoTaskList.last();
				if (self.redoTaskList.length > 0) {
					self.redoTaskList.pop();
				}
				self.currentTask = _redoTask;
				
				_redoTask.redo();
				_redoTask.makeSnapshot(self.snapshotData);
			});
		},
		/**
		 * initHistory
		 * 
		 * @type 
		 * @param {Object} content
		 */	
		initHistory: function(data){
			Object.extend(this.snapshotData, data);
			this.isNewTypingForUndo = true;
			//this.initialContent = content;
			/*this.undoTaskList = [{
				content: content,
				scrollTop: 0
			}];*///TODO
		},
		addInitHandler: function(data, handler) {
			Object.extend(this.current.current, data);
			this.inithandlers.push(handler);
			Object.extend(this.snapshotData, data);
		},
		/**
		 * saveHistory
		 *  
		 * @param {boolean} force
		 */
		saveHistory: function(data, handler){
			if (this.undoTaskList.length > __UNDO_COUNT - 1) {
				this.undoTaskList.shift();
			}
			
			this.undoTaskList.push(this.currentTask);
			this.redoTaskList = [];
						
			if(!data) {
				data = this.getTextData();
				handler = this.getTextHandler();
			}
			
			var _task = new Trex.History.Task(data, handler);
			_task.swapData(this.snapshotData);
			this.currentTask = _task;
			//this.snapshot = Object.extend( this.snapshot, data );

			this.isNewTypingForUndo = false;
		},
		saveHistoryByKey: function(key){
			if ( key.code == 229 ){				// ignore mouse click.
				return;
			}
			
			if (key.code == Trex.__KEY.ENTER || key.code == Trex.__KEY.SPACE) {
				if (this.isNewTypingForUndo) {
					this.saveHistory();
				}
			} else if(key.code == Trex.__KEY.DELETE || key.code == Trex.__KEY.BACKSPACE) {
				this.saveHistory();
			} else if((key.code == Trex.__KEY.PASTE || key.code == Trex.__KEY.CUT) && key.ctrl) {
				this.saveHistory(true);
			} else if (((key.code > 32 && key.code < 41) && key.shift) || (key.code == 65 && key.ctrl)) {
				if (this.isNewTypingForUndo) {
					this.saveHistory();
				}
			} else if (key.ctrl || key.shift || key.alt) {
			} else {
				this.isNewTypingForUndo = true;
			}
		},
		injectHistory: function(data, handler){
			this.currentTask.injectHandler( handler );
			this.currentTask.injectData(data, this.snapshotData);
		},
		getTextHandler: function() {
			var _canvas = this.canvas;
			return function(data) {
				_canvas.setContent(data.content);
				_canvas.setScrollTop(data.scrollTop);
			}
		},
		getTextData:function(){
			var _canvas = this.canvas;
			return {	
				'content': _canvas.getContent(),
				'scrollTop': _canvas.getScrollTop()
			}
		}
	};
	
	Trex.History.Task = Trex.Class.create({
		/**
		 * initialize
		 * @param {Object} data
		 * @param {Function} config
		 */
		initialize: function(data, handler){
			this.handler = [];
			this.previous = {};
			this.current = Object.extend({}, data);
			this.handler.push(handler);
		},
		swapData: function(snapshotData) {
			this.makeBackup(snapshotData);
			this.makeSnapshot(snapshotData);
		},
		makeBackup: function(snapshotData){					// \ud604\uc7ac\uc758 \uc0c1\ud0dc\ub97c \ubc1b\uc544\uc11c task\uc5d0 \uacfc\uac70\uc758 \ub370\uc774\ud130\ub85c \uc800\uc7a5\ud574\ub454\ub2e4.
			for(var _name in this.current) {
				if ( typeof snapshotData[_name] == "string" || typeof snapshotData[_name] == "number"){
					this.previous[_name] = snapshotData[_name];
				} else {
					this.previous[_name] = Object.extend( {}, snapshotData[_name] );
				}
			}
		},
		makeSnapshot: function(snapshotData) {
			for(var _name in this.current) {
				snapshotData[_name] = this.current[_name]; //reference copy
			}
		},
		injectHandler: function(handler){
			this.handler.push( handler );		
		},
		injectData: function(data, snapshotData){
			Object.extend( this.current, data );
			// make backup\uacfc mak snapshot\ub97c \uc218\ud589\ud55c\ub2e4.
			for( var _name in data ){
				if ( typeof snapshotData[_name] == "string" || typeof snapshotData[_name] == "number"){
					this.previous[_name] = snapshotData[_name];
				}else{
					this.previous[_name] = Object.extend( {}, snapshotData[_name] );
				}
			}
			
			for(var _name in this.current) {
				snapshotData[_name] = this.current[_name]; //reference copy
			}
		},
		redo: function() {
			for( var i = 0; i < this.handler.length; i++ ){
				this.handler[i](this.current);	
			}
		},
		undo: function() {
			for( var i = 0; i < this.handler.length; i++ ){
				this.handler[i](this.previous);	
			}
		}
	});
	
})();


/**
 * @fileOverview
 * \ucee8\ud150\uce20\ub97c \uac00\uc9c0\uace0 \uc788\ub294 \ud3b8\uc9d1 \uc601\uc5ed\uc744 \uc218\uc815, \uad00\ub9ac\ud558\ub294 Trex.Canvas \uad00\ub828 Source\ub85c
 * \ub300\ubd80\ubd84 \uac01 panel\ub4e4\uc5d0\uac8c \ud589\ub3d9\ub4e4\uc744 \uc704\uc784\ud55c\ub2e4.
 * \ud3b8\uc9d1 \uc601\uc5ed = panel = TextPanel, HtmlPanel, WysiwygPanel
 */
(function(Trex) {
	TrexConfig.add({
		"canvas": {
			doctype: "html", // xhtml, html
			mode: ["text", "html", "source"], //NOTE: redefine when config property copy
			styles: {
				color: "#333333",
				fontFamily: "\ub3cb\uc6c0",
				fontSize: "9pt",
				backgroundColor: "#ffffff",
				lineHeight: "1.5",
				padding: "8px"
			},
			selectedMode: "html",
			readonly: false,
			initHeight: 400,
			minHeight: 200, //NOTE: redifine when config property copy
			ext: 'html',
			param: "",
			bogus_html: (($tx.msie) ? "<p>&nbsp;</p>" : "<p><br/></p>"),
			newlinepolicy: "p"
		}
	}, function(root) {
		var _config = TrexConfig.get('canvas', root);
		var _evConfig = root.events;
		_config.initializedId = root.initializedId;
		_config.useHotKey = _evConfig.useHotKey;
		var _switcher = TrexConfig.getTool('switcher', root);
		if (Trex.available(_switcher, "switcher" + _config.initializedId)) {
			_config.mode = _switcher.options.pluck("data");
		}
		var _fontfamily = TrexConfig.getTool('fontfamily', root);
		if (Trex.available(_fontfamily, "fontfamily" + _config.initializedId)) {
			if(_fontfamily.webfont && _fontfamily.webfont.use) {
				_config.webfont = _fontfamily.webfont;
				_config.webfont.options.each(function(element) {
					element.url = TrexConfig.getUrl(element.url);
				});
			}
		}
		var _resizer = TrexConfig.get('resizer', root)
		if (_resizer) {
			_config.minHeight = _resizer.minHeight;
		}
		_config.wysiwygUrl = TrexConfig.getUrl(["#host#path/pages/wysiwyg", ((_config.doctype == "html") ? "_html" : "_xhtml"), ".", (_config.ext ? _config.ext : "html"), "?prefix=" + root.initializedId, "&", _config.param].join(""));
	});
	
	TrexConfig.add({
		"size": {
			
		}
	});
	/**
	 * \ucee8\ud150\uce20\ub97c \uac00\uc9c0\uace0 \uc788\ub294 \ud3b8\uc9d1 \uc601\uc5ed\uc744 \uc218\uc815, \uad00\ub9ac\ud558\ub294 Trex.Canvas \uac1d\uccb4\ub85c <br/>
	 * \ub300\ubd80\ubd84 \uac01 panel\ub4e4\uc5d0\uac8c \ud589\ub3d9\ub4e4\uc744 \uc704\uc784\ud55c\ub2e4. <br/>
	 * \uac01\uac01\uc758 panel\ub4e4\uc740 \ud574\ub2f9 Processor\ub4e4\uc744 \ud3ec\ud568\ud55c\ub2e4. <br/>
	 * \ud3b8\uc9d1 \uc601\uc5ed = panel = TextPanel, HtmlPanel, WysiwygPanel
	 *
	 * @class
	 * @extends Trex.I.JobObservable, Trex.I.KeyObservable
	 * @param {Object} editor
	 * @param {Object} config
	 */
	Trex.Canvas = Trex.Class.create( /** @lends Trex.Canvas.prototype */{
		/** @ignore */
		$const: {
			/** @name Trex.Canvas.__TEXT_MODE */
			__TEXT_MODE: "text",
			/** @name Trex.Canvas.__HTML_MODE */
			__HTML_MODE: "source",
			/** @name Trex.Canvas.__WYSIWYG_MODE */
			__WYSIWYG_MODE: "html",
			__WYSIWYG_PADDING: 8,
			__IMAGE_PADDING: 5
		},
		/** @ignore */
		$mixins: [Trex.I.JobObservable, Trex.I.KeyObservable, Trex.I.ElementObservable, Trex.I.MouseoverObservable],
		/** Editor instance */
		editor: null,
		/** Canvas Dom element, Generally $tx('tx_canvas') */
		elContainer: null,
		/** Canvas Config */
		config: null,
		/** History Instance for redo/undo */
		history: null,
		/**
		 * Panels \uac1d\uccb4
		 * @private
		 * @example
		 * 	canvas.panels['html']
		 * 	canvas.panels['source']
		 * 	canvas.panels['text']
		 */
		panels: null,
		initialize: function(editor, rootConfig) {
			StopWatch.lap("Start canvas.init");
			
			var _editor = this.editor = editor;
			var _canvas = this;
			var _config = this.config = TrexConfig.get('canvas', rootConfig);
			var _initializedId = ((rootConfig.initializedId) ? rootConfig.initializedId : "");
			
			this.elContainer = $must("tx_canvas" + _initializedId, 'Trex.Canvas');
			this.wysiwygEl = $must("tx_canvas_wysiwyg_holder" + _initializedId, 'Trex.Canvas');
			this.sourceEl = $must("tx_canvas_source_holder" + _initializedId, 'Trex.Canvas');
			this.textEl = $must("tx_canvas_text_holder" + _initializedId, 'Trex.Canvas');
			
			this.initConfig(rootConfig);
			this.createPanel();
			this.history = new Trex.History(this, _config);
			
			StopWatch.lap("Finished canvas.init");
		},
		initConfig: function(rootConfig) {
			var _config = this.config;
			/**
			 * root config\ub97c \uc5bb\uc5b4\uc628\ub2e4.
			 * @private
			 * @returns {Object} root config
			 */
			this.getRootConfig = function() {
				return rootConfig;
			};
			
			/**
			 * Canvas\uc758 config\ub97c \uac00\uc838\uc628\ub2e4.
			 * @returns {Object} config
			 */
			this.getConfig = function() {
				return _config;
			};
			
			/**
			 * wysiwyg panel\uc758 \uc2a4\ud0c0\uc77c config\ub97c \uac00\uc838\uc628\ub2e4.
			 * @param {String} name - \uc2a4\ud0c0\uc77c\uba85 optional
			 * @returns {Object} \uc2a4\ud0c0\uc77c config
			 * @example
			 *  canvas.getStyleConfig();
			 */
			this.getStyleConfig = function(name) {
				if(name) {
					return _config.styles[name];
				} else {
					return _config.styles;
				}
			};
		
			var _sizeConfig = TrexConfig.get('size', rootConfig);
			var _dim = $tx.getDimensions(this.elContainer);
			_sizeConfig.wrapWidth = _dim.width;
			if(!_sizeConfig.contentWidth) {
				_sizeConfig.contentWidth = _sizeConfig.wrapWidth;
			}
			_sizeConfig.contentPadding = _config.styles.padding.parsePx(); //15
			
			/**
			 * canvas size \uad00\ub828 config\ub97c \uc5bb\uc5b4\uc628\ub2e4.
			 * @returns {Object} size config
			 */
			this.getSizeConfig = function() {
				return _sizeConfig;
			};
		},
		/**
		 * Panels \uac1d\uccb4\ub4e4\uc744 \ucd08\uae30\ud654\ud55c\ub2e4.
		 * @private
		 */
		createPanel: function() {
			var _canvas = this;
			var _config = this.config;
			this.panels = {};
			this.mode = _config.selectedMode || Trex.Canvas.__WYSIWYG_MODE;
			if ($tx.iphone || $tx.ipod) {
				this.mode = Trex.Canvas.__TEXT_MODE;
			}
			var _panelCreater = {
				"text": function(_config) {
					return new Trex.Canvas.TextPanel(_canvas, _config);
				},
				"source": function(_config) {
					return new Trex.Canvas.HtmlPanel(_canvas, _config);
				},
				"html": function(_config) {
					return new Trex.Canvas.WysiwygPanel(_canvas, _config);
				}
			};
			_config.mode.each(function(name) {
				if (_panelCreater[name]) {
					_canvas.panels[name] = _panelCreater[name](_config);
				}
			});
			_canvas.observeJob('canvas.panel.iframe.load', function(panelDoc) {
				_canvas.fireJobs(Trex.Ev.__IFRAME_LOAD_COMPLETE, panelDoc);
			});
			 //NOTE: wysiwyg is shown at loading
			if (this.mode != Trex.Canvas.__WYSIWYG_MODE) {
				this.panels[Trex.Canvas.__WYSIWYG_MODE].hide();
			}
			this.panels[this.mode].show();
		},
		/**
		 * Canvas\uc758 mode\ub97c \ubc14\uafb8\ub294\uac83\uc73c\ub85c, \ud604\uc7ac \ud65c\uc131\ud654\ub418\uc5b4\uc788\ub294 panel\uc744 \ubcc0\uacbd\ud55c\ub2e4.
		 * @param {String} newMode - \ubcc0\uacbd \ud560 mode\uc5d0 \ud574\ub2f9\ud558\ub294 \ubb38\uc790\uc5f4
		 * @example
		 *  editor.getCanvas().changeMode('html');
		 *  editor.getCanvas().changeMode('source');
		 *  editor.getCanvas().changeMode('text');
		 */
		changeMode: function(newMode) {
			var _rootConfig = this.getRootConfig();
			var _editor = this.editor;
			var oldMode = this.mode;
			if (oldMode == newMode) {
				return;
			}
			var _oldPanel = this.panels[oldMode];
			var _newPanel = this.panels[newMode];
			if (!_oldPanel || !_newPanel) {
				throw new Error("[Exception]Trex.Canvas : not suppored mode");
			}
			var _content = _oldPanel.getContent();
			//Applying Filters
			_content = _editor.getDocParser().getContentsAtChangingMode(_content, oldMode, newMode);
			if (oldMode == Trex.Canvas.__WYSIWYG_MODE) { //FTDUEDTR-366
				_oldPanel.setContent("");
				try {
					this.focusOnTop();
				}catch(e){}
			}
			_newPanel.setContent(_content);
			this.mode = newMode;
			this.fireJobs(Trex.Ev.__CANVAS_MODE_CHANGE, oldMode, newMode);
			_newPanel.setPanelHeight(_oldPanel.getPanelHeight());
			_oldPanel.hide();
			_newPanel.show();
			// FF2 bug:: When display is none,  designMode can't be set to on
			try {
				if (newMode == "html" && !this.getPanel("html").designModeActivated && $tx.gecko) {
					this.getPanel("html").el.contentDocument.designMode = "on";
					this.getPanel("html").designModeActivated = true;
				}
			} catch (e) {
				throw e;
			};
		},
		/**
		 * \ud604\uc7ac panel\uc5d0 \ud3ec\ucee4\uc2a4\ub97c \uc900\ub2e4.
		 */
		focus: function() {
			this.panels[this.mode].focus();
		},
		/**
		 * \ubcf8\ubb38\uc758 \ucc98\uc74c\uc73c\ub85c \uce90\ub7ff\uc744 \uc62e\uae34\ub2e4. - Only Wysiwyg
		 */
		focusOnTop: function() {
			if(!this.canHTML()) {
				return;
			}
			this.getProcessor().focusOnTop();
		},
		/**
		 * \ubcf8\ubb38\uc758 \ub9c8\uc9c0\ub9c9\uc73c\ub85c \uce90\ub7ff\uc744 \uc62e\uae34\ub2e4. - Only Wysiwyg
		 */
		focusOnBottom: function() {
			if(!this.canHTML()) {
				return;
			}
			this.getProcessor().focusOnBottom();
		},
		/**
		 * canvas\uc758 position\uc744 \uac00\uc838\uc628\ub2e4.
		 * @returns {Object} position = { x: number, y:number }
		 */
		getCanvasPos: function() {
			var _position = $tx.cumulativeOffset(this.elContainer);
			return {
				'x': _position[0],
				'y': _position[1]
			};
		},
		/**
		 * canvas\uc758 height\ub97c \ubcc0\uacbd\ud55c\ub2e4.
		 * @param {String} size (px)
		 * @example
		 *  canvas.setCanvasSize({
		 *  	height: "500px"
		 *  });
		 */
		setCanvasSize: function(size) {
			if (this.panels[this.mode] && size.height) {
				this.panels[this.mode].setPanelHeight(size.height);
			} else {
				throw new Error("[Exception]Trex.Canvas : argument has no property - size.height ");
			}
		},
		/**
		 * \ud604\uc7ac \ubaa8\ub4dc\uac00 wqysiwyg \ubaa8\ub4dc\uc778\uc9c0, \uc544\ub2cc\uc9c0 \uc54c\ub824\uc900\ub2e4.
		 * @returns {Boolean} - wqysiwyg \ubaa8\ub4dc\uc77c \ub54c true 
		 */
		canHTML: function() {
			return (this.mode == Trex.Canvas.__WYSIWYG_MODE) ? true : false;
		},
		/**
		 * panel \uac1d\uccb4\ub97c \uac00\uc838\uc628\ub2e4.
		 * @param {String} mode - \uac00\uc838\uc62c panel \ubaa8\ub4dc\uba85
		 * @returns {Object} - parameter\uc5d0 \ud574\ub2f9\ud558\ub294 Panel
		 * @example
		 * 	this.getPanel('html').designModeActivated = true;
		 */
		getPanel: function(mode) {
			if (this.panels[mode]) {
				return this.panels[mode];
			} else {
				return null;
			}
		},
		/**
		 * \ud604\uc7ac \ud65c\uc131\ud654\ub418\uc5b4\uc788\ub294 panel \uac1d\uccb4\ub97c \uac00\uc838\uc628\ub2e4.
		 * @returns {Object} - \ud65c\uc131\ud654\ub418\uc5b4\uc788\ub294 panel \uac1d\uccb4
		 */
		getCurrentPanel: function() {
			if (this.panels[this.mode]) {
				return this.panels[this.mode];
			} else {
				return null;
			}
		},
		/**
		 * \ud604\uc7ac \ud65c\uc131\ud654\ub418\uc5b4\uc788\ub294 panel\uc758 processor\uc744 \uac00\uc838\uc628\ub2e4.
		 * @returns {Object} - \ud65c\uc131\ud654\ub418\uc5b4\uc788\ub294 panel\uc758 processor \uac1d\uccb4
		 */
		getProcessor: function() {
			return this.panels[this.mode].getProcessor();
		},
		/**
		 * \ubcf8\ubb38\uc758 \ub0b4\uc6a9\uc744 \uac00\uc838\uc628\ub2e4
		 * @returns {String}
		 */
		getContent: function() {
			var _content = this.panels[this.mode].getContent();
			if(_content) {
				_content = _content.replace(/\ufeff/g, ""); //NOTE: euc-kr
			}
			return _content;
		},
		/**
		 * \ud604\uc7ac Wysiwyg \uc601\uc5ed\uc758 \uc218\uc9c1 \uc2a4\ud06c\ub864 \uac12\uc744 \uc5bb\uc5b4\uc628\ub2e4. - Only Wysiwyg
		 * @function
		 * @returns {Number} \uc218\uc9c1 \uc2a4\ud06c\ub864 \uac12
		 * @see Trex.Canvas.WysiwygPanel#getScrollTop
		 */
		getScrollTop: function() {
			if(!this.canHTML()) {
				return 0;
			}
			return this.panels[this.mode].getScrollTop();
		},
		/**
		 * Wysiwyg \uc601\uc5ed\uc758 \uc218\uc9c1 \uc2a4\ud06c\ub864 \uac12\uc744 \uc14b\ud305\ud55c\ub2e4. - Only Wysiwyg
		 * @function
		 * @param {Number} scrollTop - \uc218\uc9c1 \uc2a4\ud06c\ub864 \uac12
		 * @see Trex.Canvas.WysiwygPanel#setScrollTop
		 */
		setScrollTop: function(scrollTop) {
			if(!this.canHTML()) {
				return;
			}
			this.panels[this.mode].setScrollTop(scrollTop);
		},
		/**
		 * \ud604\uc7ac \ud65c\uc131\ud654\ub41c panel\uc5d0 \ucee8\ud150\uce20\ub97c \uc8fc\uc5b4\uc9c4 \ubb38\uc790\uc5f4\ub85c \uc218\uc815\ud55c\ub2e4. 
		 * @param {String} content - \ucee8\ud150\uce20
		 */
		setContent: function(content) {
			this.panels[this.mode].setContent(content);
			this.includeWebfontCss(content);
		},
		/**
		 * panel\uc5d0 \ucee8\ud150\uce20\ub97c \uc8fc\uc5b4\uc9c4 \ubb38\uc790\uc5f4\ub85c \ucd08\uae30\ud654\ud55c\ub2e4. 
		 * @param {String} content - \ucee8\ud150\uce20
		 */
		initContent: function(content) {
			this.history.initHistory({
				'content': content
			});
			this.panels[this.mode].setContent(content);
			this.includeWebfontCss(content);
			// #FTDUEDTR-18, produce custom event. 
			this.fireJobs(Trex.Ev.__CANVAS_DATA_INITIALIZE, Trex.Canvas.__WYSIWYG_MODE, null);
			this.focusOnTop();
		},
		/**
		 * \ucee8\ud150\uce20\ub97c \ud30c\uc2f1\ud558\uc5ec \uc0ac\uc6a9\ub418\uace0 \uc788\ub294 \uc6f9\ud3f0\ud2b8\uac00 \uc788\uc73c\uba74, \uc6f9\ud3f0\ud2b8 css\ub97c \ub85c\ub529\ud55c\ub2e4. - Only Wysiwyg
		 * @param {string} content
		 * @see Trex.Canvas.WysiwygPanel#includeWebfontCss
		 */
		includeWebfontCss: function(content) {
			if(!this.canHTML()) {
				return;
			}
			return this.panels[this.mode].includeWebfontCss(content);
		},
		/**
		 * \ubcf8\ubb38\uc5d0 \uc0ac\uc6a9\ub41c \uc6f9\ud3f0\ud2b8\uba85 \ubaa9\ub85d\uc744 \ub9ac\ud134\ud55c\ub2e4. - Only Wysiwyg
		 * @function
		 * @returns {Array} \uc0ac\uc6a9\ud558\uace0 \uc788\ub294 \uc6f9\ud3f0\ud2b8\uba85 \ubaa9\ub85d
		 * @see Trex.Canvas.WysiwygPanel#getUsedWebfont
		 */
		getUsedWebfont: function() {
			if(!this.canHTML()) {
				return [];
			}
			return this.panels[this.mode].getUsedWebfont();
		},
		/**
		 * \uc790\ubc14\uc2a4\ud06c\ub9bd\ud2b8\ub97c \ub3d9\uc801\uc73c\ub85c \uc2e4\ud589\ud55c\ub2e4 - Only Wysiwyg
		 * @param {String} scripts - \uc790\ubc14\uc2a4\ud06c\ub9bd\ud2b8 \ubb38\uc790\uc5f4
		 */
		runScript: function(scripts) {
			if(!this.canHTML()) {
				return [];
			}
			this.panels[this.mode].runScript(scripts);
		},
		/**
		 * \uc120\ud0dd\ub41c \uc601\uc5ed\uc758 \uc0c1\ud0dc \uac12\uc744 \uc54c\uae30\uc704\ud574 \uc8fc\uc5b4\uc9c4 \ud568\uc218\ub97c \uc2e4\ud589\uc2dc\ud0a8\ub2e4. - Only Wysiwyg
		 * @param {Function} handler - \uc8fc\uc5b4\uc9c4 \ud568\uc218
		 * @example 
		 * 		var _data = canvas.query(function(processor) {
		 *			return processor.queryCommandState('bold');
		 *		});
		 */
		query: function(handler) {
			if(!this.canHTML()) {
				return null;
			}
			var _processor = this.getProcessor();
			/* Block Scrolling
			 if($tx.msie) {
			 _processor.focus();
			 }
			 */
			return handler(_processor);
		},
		/**
		 * \uc120\ud0dd\ub41c \uc601\uc5ed\uc5d0 \uc8fc\uc5b4\uc9c4 handler\ub97c \uc2e4\ud589\uc2dc\ud0a8\ub2e4. 
		 * @param {Function} handler - \uc8fc\uc5b4\uc9c4 \ud568\uc218
		 * @example 
		 * 		canvas.execute(function(processor) {
		 *			processor.execCommand('bold', null);
		 *		});
		 */
		execute: function(handler) {
			var _history = this.history; 
			var _processor = this.getProcessor();
			if (this.canHTML()) {
				if ($tx.msie) {
					setTimeout(function() { //#FTDUEDTR-435
						_processor.restoreRange();
						handler(_processor);
						_history.saveHistory();
						_processor.restore();
					},0);
				}else{
					handler(_processor);
					_processor.focus();
					_history.saveHistory();
					_processor.restore();
				}
			} else {
				handler(_processor);
			}
		},
		/**
		 * caret\uc744 \uc8fc\uc5b4\uc9c4 \uc704\uce58\ub85c \uc774\ub3d9\ud55c\ub2e4. - Only Wysiwyg <br/>
		 * aaa.bbb - bbb\ub77c\ub294 \ud074\ub798\uc2a4\ub97c \uac00\uc9c4 aaa \ub178\ub4dc\uc758 \ub2e4\uc74c\uc5d0 \ucee4\uc11c\ub97c \uc774\ub3d9\ud55c\ub2e4. 
		 * @param {String} scope
		 * @see Trex.Canvas.Processor#moveCaretWith
		 */
		moveCaret: function(scope) {
			if(!scope) {
				return;
			}
			if(!this.canHTML()) {
				return;
			}
			this.getProcessor().moveCaretWith(scope);
		},
		/**
		 * \uc120\ud0dd\ud55c \uc601\uc5ed\uc5d0 HTML \ucee8\ud150\uce20\ub97c \uc0bd\uc785\ud55c\ub2e4.
		 * @param {String} content - \uc0bd\uc785\ud558\uace0\uc790 \ud558\ub294 HTML \ucee8\ud150\uce20
		 * @param {Boolean} newline - \ud604\uc7ac \uc601\uc5ed\uc5d0\uc11c \ud55c\uc904\uc744 \ub744\uc6b4 \ud6c4 \uc0bd\uc785\ud560\uc9c0 \uc5ec\ubd80 true/false
		 * @param {Object} wrapStyle - wrapper \ub178\ub4dc\uc5d0 \uc801\uc6a9\ud560 \uc2a4\ud0c0\uc77c, <br/>
		 * 					newline\uc774 true \uc77c \uacbd\uc6b0\uc5d0\ub9cc \uc758\ubbf8\ub97c \uac16\ub294\ub2e4.
		 */
		pasteContent: function(content, newline, wrapStyle) {
			newline = newline || false;
			this.execute(function(processor) {
				processor.pasteContent(content, newline, wrapStyle);
			});
		},
		/**
		 * \uc120\ud0dd\ud55c \uc601\uc5ed\uc5d0 \ub178\ub4dc\ub97c \uc0bd\uc785\ud55c\ub2e4. - Only Wysiwyg
		 * @param {Array,Element} nodes - \uc0bd\uc785\ud558\uace0\uc790 \ud558\ub294 \ub178\ub4dc \ubc30\uc5f4 \ub610\ub294 \ub178\ub4dc
		 * @param {Boolean} newline - \ud604\uc7ac \uc601\uc5ed\uc5d0\uc11c \ud55c\uc904\uc744 \ub744\uc6b4 \ud6c4 \uc0bd\uc785\ud560\uc9c0 \uc5ec\ubd80 true/false
		 * @param {Object} wrapStyle - wrapper \ub178\ub4dc\uc5d0 \uc801\uc6a9\ud560 \uc2a4\ud0c0\uc77c, <br/>
		 * 					newline\uc774 true \uc77c \uacbd\uc6b0\uc5d0\ub9cc \uc758\ubbf8\ub97c \uac16\ub294\ub2e4.
		 */
		pasteNode: function(node, newline, wrapStyle) {
			if (!this.canHTML()) {
				return;
			}
			newline = newline || false;
			this.execute(function(processor) {
				processor.pasteNode(node, newline, wrapStyle);
			});
		},
		/**
		 * \ud604\uc7ac \ud65c\uc131\ud654\ub41c panel\uc5d0 \uc2a4\ud0c0\uc77c\uc744 \uc801\uc6a9\ud55c\ub2e4.
		 * @param {Object} styles - \uc801\uc6a9\ud560 \uc2a4\ud0c0\uc77c
		 */
		addStyle: function(styles) {
			this.panels[this.mode].addStyle(styles);
		},
		/**
		 * \uc2a4\ud0c0\uc77c\uba85\uc73c\ub85c \ud604\uc7ac \ud65c\uc131\ud654\ub41c panel\uc758 \uc2a4\ud0c0\uc77c \uac12\uc744 \uc5bb\uc5b4\uc628\ub2e4.
		 * @param {String} name - \uc2a4\ud0c0\uc77c\uba85
		 * @returns {String} \ud574\ub2f9 \uc2a4\ud0c0\uc77c \uac12
		 */
		getStyle: function(name) {
			return this.panels[this.mode].getStyle(name);
		},
		/**
		 * \ud2b9\uc815 \ub178\ub4dc\uc758 Wysiwyg \uc601\uc5ed\uc5d0\uc11c\uc758 \uc0c1\ub300 \uc704\uce58\ub97c \uc5bb\uc5b4\uc628\ub2e4. - Only Wysiwyg
		 * @function
		 * @param {Element} node - \ud2b9\uc815 \ub178\ub4dc
		 * @returns {Object} position \uac1d\uccb4 = {
		 *								x: number,
		 *								y: number,
		 *								width: number,
		 *								height: number
		 *						}
		 */
		getPositionByNode: function(node) {
			if(!this.canHTML()) {
				return {
					x: 0,
					y: 0,
					width: 0,
					height: 0
				};
			}
			return this.panels[this.mode].getPositionByNode(node);
		}
	});
	
})(Trex);

Trex.module("focus body @after editor iframe load",
	function(editor, toolbar, sidebar, canvas, config) {
		canvas.observeJob(Trex.Ev.__IFRAME_LOAD_COMPLETE, function(panelDoc) {
			if (!canvas.canHTML()) {
				return;
			}
			try {
				var _processor = canvas.getProcessor();
				_processor.focusOnTop();
			} catch(e) {}	
		});
	}
);

Trex.module("make getter for 'iframeheight' and 'iframetop' size", 
	function(editor, toolbar, sidebar, canvas, config) {
		var _iframeHeight = 0;
		var _iframeTop = 0;
		canvas.observeJob(Trex.Ev.__CANVAS_HEIGHT_CHANGE, function(height) {
			_iframeHeight = height.parsePx();
		});
		canvas.observeJob('canvas.apply.background', function() {
			var _wysiwygPanel = canvas.getPanel(Trex.Canvas.__WYSIWYG_MODE);
			var _position = $tom.getPosition(_wysiwygPanel.el);
			_iframeTop = _position.y;
		});
		canvas.reserveJob(Trex.Ev.__IFRAME_LOAD_COMPLETE, function() {
			var _wysiwygPanel = canvas.getPanel(Trex.Canvas.__WYSIWYG_MODE);
			_iframeHeight = _wysiwygPanel.getPanelHeight().parsePx();
			var _position = $tom.getPosition(_wysiwygPanel.el);
			_iframeTop = _position.y;				
		},300);
		
		canvas.getIframeHeight = function(){
			return _iframeHeight;
		}
		canvas.getIframeTop = function(){
			return _iframeTop;
		}
	}
);	/**
 * @fileOverview
 * \uac01 panel\uc758 \ucee8\ud150\uce20\ub97c \uc218\uc815, \uad00\ub9ac\ud558\uae30 \uc704\ud55c \ucd94\uc0c1 \ud074\ub798\uc2a4 \uad00\ub828 Source
 */

/**
 * \uac01 panel\uc758 \ucee8\ud150\uce20\ub97c \uc218\uc815, \uad00\ub9ac\ud558\uae30 \uc704\ud55c \ud074\ub798\uc2a4\ub85c <br/>
 * WysiwygPanel, HtmlPanel, TextPanel\uc5d0\uc11c \uc0c1\uc18d\ubc1b\uc544 \uc0ac\uc6a9\ud55c\ub2e4. <br/>
 *
 * @abstract
 * @class
 * @param {Object} canvas
 * @param {Object} config - canvas\uc758 config
 */
Trex.Canvas.BasedPanel = Trex.Class.draft(/** @lends Trex.Canvas.BasedPanel.prototype */{
	initialize: function(canvas, config) {
		this.config = config;
		this.canvas = canvas;
		
		this.elHolder = this.getHolder(config);
		this.el = this.getPanel(config);
		if(!this.el) {
			throw new Error("[Exception]Trex.Canvas.Panel : panel element is not founded");
		}

		var _name = this.constructor.__MODE;
		/**
		 * panel\uc758 \uc774\ub984\uc744 \ub9ac\ud134\ud55c\ub2e4. 
		 * @function
		 * @returns {String} 'html'
		 */
		this.getName = function() { return _name; };
		
		this.lastHeight = config.initHeight? config.initHeight.toPx() : "400px";
	},
	/**
	 * \ucee8\ud150\uce20 \uc601\uc5ed\uc5d0 \ud3ec\ucee4\uc2a4\ub97c \uc900\ub2e4.
	 * @function
	 */
	focus: function() {
		this.el.focus();
	},
	/**
	 * panel\uc744 \ubcf4\uc774\uac8c\ud55c\ub2e4.
	 * @function
	 */
	show: function() {
		try{
			$tx.show(this.elHolder);
		}catch(e){
			console.log(e);
		}
	},
	/**
	 * panel\uc744 \uac10\ucd98\ub2e4.
	 * @function
	 */
	hide: function() {
		$tx.hide(this.elHolder);
	},
	/**
	 * \uc2a4\ud0c0\uc77c\uba85\uc73c\ub85c \ucee8\ud150\uce20 \uc601\uc5ed\uc758 \uc2a4\ud0c0\uc77c \uac12\uc744 \uc5bb\uc5b4\uc628\ub2e4.
	 * @function
	 * @param {String} name - \uc2a4\ud0c0\uc77c\uba85
	 * @returns {String} \ud574\ub2f9 \uc2a4\ud0c0\uc77c \uac12
	 */
	getStyle: function(name) {
		if(this.el.style[name]) {
			return this.el.style[name];
		} else {
			return null;
		}
	},
	/**
	 * \ucee8\ud150\uce20 \uc601\uc5ed\uc5d0 \uc2a4\ud0c0\uc77c\uc744 \uc801\uc6a9\ud55c\ub2e4.
	 * @function
	 * @param {Object} styles - \uc801\uc6a9\ud560 \uc2a4\ud0c0\uc77c
	 */
	addStyle: function(styles) {
		for(var name in styles) {
			if(this.el.style[name]) {
				this.el.style[name] = styles[name];
			}
		}
	},
	/**
	 * panel \uc601\uc5ed\uc758 x,y \uc704\uce58\uc640 \ub113\uc774, \ub192\uc774 \uac12\uc744 \uc5bb\uc5b4\uc628\ub2e4.
	 * @function
	 * @returns {Object} position \uac1d\uccb4 = {
	 *								x: number,
	 *								y: number,
	 *								width: number,
	 *								height: number
	 *						}
	 */
	getPosition: function(){
		return $tom.getPosition(this.el);
	},
	/**
	 * panel \uc601\uc5ed\uc758 \ub192\uc774\ub97c \uc5bb\uc5b4\uc628\ub2e4.
	 * @function
	 * @returns {String} textarea \uc601\uc5ed\uc758 \ub192\uc774 (px)
	 */
	getPanelHeight: function() { 
		return $tom.getHeight(this.el).toPx(); 
	},
	/**
	 * panel \uc601\uc5ed\uc758 \ub192\uc774\ub97c \uc14b\ud305\ud55c\ub2e4.
	 * @function
	 * @param {Number} width - textarea \uc601\uc5ed\uc758 \ub113\uc774 (px)
	 */
	setPanelHeight: function(height) {
		height = height.toPx()
		if(this.lastHeight == height) {
			return;
		}
		$tom.setHeight(this.el, height);
		this.lastHeight = height;
	}
});
/**
 * @fileOverview
 * wysiwyg \uc601\uc5ed\uc758 \ucee8\ud150\uce20\ub97c \uc218\uc815, \uad00\ub9ac\ud558\uae30 \uc704\ud55c WysiwygPanel \uad00\ub828 Source
 */

(function() {
/**
 * wysiwyg \uc601\uc5ed\uc758 \ucee8\ud150\uce20\ub97c \uc218\uc815, \uad00\ub9ac\ud558\uae30 \uc704\ud55c \ud074\ub798\uc2a4\ub85c <br/>
 * wysiwyg\uc758 \uac1d\uccb4 \uc811\uadfc\ud558\uc5ec \uc774\ubca4\ud2b8\ub97c \ubd80\uc5ec\ud558\uac70\ub098 \uc18d\uc131 \uac12\ub4e4\uc744 \uc5bb\uc5b4\uc628\ub2e4. <br/>
 *
 * @class
 * @extends Trex.Canvas.BasedPanel
 * @param {Object} canvas
 * @param {Object} config - canvas\uc758 config
 */
Trex.Canvas.WysiwygPanel = Trex.Class.create(/** @lends Trex.Canvas.WysiwygPanel.prototype */{
	/** @ignore */
	$extend: Trex.Canvas.BasedPanel,
	/** @ignore */
	$const: {
		/** @name Trex.Canvas.WysiwygPanel.__MODE */
		__MODE: Trex.Canvas.__WYSIWYG_MODE
	},
	initialize: function(canvas, config) {
		StopWatch.lap("Started WysiwygPanel.init");
		var _panel = this;
		var _canvas = canvas; 
		config = Object.extend({}, config);
		
		this.$super.initialize(canvas, config);

		var _elPanel = this.el;
		var _win = _elPanel.contentWindow;
		var _doc;
		var _processor;
		
		var _name = this.constructor.__MODE;
		/**
		 * panel\uc758 \uc774\ub984\uc744 \ub9ac\ud134\ud55c\ub2e4. 
		 * @function
		 * @returns {String} 'html'
		 */
		this.getName = function() { return _name; };
		/**
		 * wysiwyg \uc601\uc5ed\uc758 document \uac1d\uccb4\ub97c \ub118\uaca8\uc900\ub2e4. 
		 * @function
		 * @returns {Element} wysiwyg \uc601\uc5ed\uc758 document \uac1d\uccb4
		 */
		this.getDocument = function() { return _doc; };
		/**
		 * wysiwyg \uc601\uc5ed\uc758 window \uac1d\uccb4\ub97c \ub118\uaca8\uc900\ub2e4. 
		 * @function
		 * @returns {Element} wysiwyg \uc601\uc5ed\uc758 window \uac1d\uccb4
		 */
		this.getWindow = function() { return _win; };
		
		/**
		 * wysiwyg \uc601\uc5ed\uc5d0 \uc4f0\uc5ec\uc9c4 \ucee8\ud150\uce20\ub97c \uc5bb\uc5b4\uc628\ub2e4. 
		 * @function
		 * @returns {String} \ucee8\ud150\uce20 \ubb38\uc790\uc5f4
		 */
		this.getContent = function() { return _doc.body.innerHTML; };
		/**
		 * wysiwyg \uc601\uc5ed\uc758 \ucee8\ud150\uce20\ub97c \uc8fc\uc5b4\uc9c4 \ubb38\uc790\uc5f4\ub85c \uc218\uc815\ud55c\ub2e4. 
		 * @function
		 * @param {String} content - \ucee8\ud150\uce20
		 */
		this.setContent = function(content) { 
			_doc.body.innerHTML = content ? content.replace(/\ufeff/g, "") : config.bogus_html;
			if ($tx.msie) {
				var _pNodes = $tom.collectAll(_doc.body, 'p,li');
				for (var i=0,len=_pNodes.length; i<len; i++) {
					if($tom.getLength(_pNodes[i]) == 0) {
						_pNodes[i].innerHTML = '&nbsp;';
					} 
					if($tom.getLength(_pNodes[i]) == 1 && _pNodes[i].innerHTML == '&nbsp;') {
						_pNodes[i].innerHTML = '';
					} 
				}
			}
		 };
		
		/**
		 * \uc0dd\uc131\ub41c Processor \uac1d\uccb4\ub97c \ub9ac\ud134\ud55c\ub2e4.
		 * @function
		 * @returns {Object} Processor \uac1d\uccb4
		 */
		this.getProcessor = function() { return _processor; };
		
		/**
		 * wysiwyg \uc601\uc5ed\uc5d0 \ud3ec\ucee4\uc2a4\ub97c \uc900\ub2e4.
		 * @function
		 * @see Trex.Canvas.Processor#focus
		 */
		this.focus = function() { _processor.focus(); };
		
		/**
		 * \uc2a4\ud0c0\uc77c\uba85\uc73c\ub85c wysiwyg \uc601\uc5ed\uc758 \uc2a4\ud0c0\uc77c \uac12\uc744 \uc5bb\uc5b4\uc628\ub2e4.
		 * @function
		 * @param {String} name - \uc2a4\ud0c0\uc77c\uba85
		 * @returns {String} \ud574\ub2f9 \uc2a4\ud0c0\uc77c \uac12
		 */
		this.getStyle = function(name) { return $tx.getStyle(_doc.body, name); };
		/**
		 * wysiwyg \uc601\uc5ed\uc5d0 \uc2a4\ud0c0\uc77c\uc744 \uc801\uc6a9\ud55c\ub2e4.
		 * @function
		 * @param {Object} styles - \uc801\uc6a9\ud560 \uc2a4\ud0c0\uc77c
		 */
		this.addStyle = function(styles) {
			try {
				for(var name in styles) {
					_doc.body.style[name] = styles[name];
				}
			}catch(e){}
		};
		
		/**
		 * \ud604\uc7ac wysiwyg \uc601\uc5ed\uc758 \uc218\uc9c1 \uc2a4\ud06c\ub864 \uac12\uc744 \uc5bb\uc5b4\uc628\ub2e4.
		 * @function
		 * @returns {Number} \uc218\uc9c1 \uc2a4\ud06c\ub864 \uac12
		 */
		this.getScrollTop = function() { return $tom.getScrollTop(_doc); };
		/**
		 * wysiwyg \uc601\uc5ed\uc758 \uc218\uc9c1 \uc2a4\ud06c\ub864 \uac12\uc744 \uc14b\ud305\ud55c\ub2e4.
		 * @function
		 * @param {Number} scrollTop - \uc218\uc9c1 \uc2a4\ud06c\ub864 \uac12
		 */
		this.setScrollTop = function(scrollTop) {
			$tom.setScrollTop(_doc, scrollTop);
		};
		/**
		 * \ud604\uc7ac wysiwyg \uc601\uc5ed\uc758 \uc218\ud3c9 \uc2a4\ud06c\ub864 \uac12\uc744 \uc5bb\uc5b4\uc628\ub2e4.
		 * @function
		 * @returns {Number} \uc218\ud3c9 \uc2a4\ud06c\ub864 \uac12
		 */
		this.getScrollLeft = function() { return $tom.getScrollLeft(_doc); };
		
		var _relative;
		/**
		 * \ud2b9\uc815 \ub178\ub4dc\uc758 wysiwyg \uc601\uc5ed\uc5d0\uc11c\uc758 \uc0c1\ub300 \uc704\uce58\ub97c \uc5bb\uc5b4\uc628\ub2e4.
		 * @function
		 * @param {Element} node - \ud2b9\uc815 \ub178\ub4dc
		 * @returns {Object} position \uac1d\uccb4 = {
		 *								x: number,
		 *								y: number,
		 *								width: number,
		 *								height: number
		 *						}
		 */
		this.getPositionByNode = function(node) {
			return _relative.getRelative(node);
		};
		
		var _webfontLoader;
		/**
		 * \ucee8\ud150\uce20\ub97c \ud30c\uc2f1\ud558\uc5ec \uc0ac\uc6a9\ub418\uace0 \uc788\ub294 \uc6f9\ud3f0\ud2b8\uac00 \uc788\uc73c\uba74, \uc6f9\ud3f0\ud2b8 css\ub97c \ub85c\ub529\ud55c\ub2e4.<br/>
		 * \ub85c\ub529\uc18d\ub3c4\ub97c \ud5a5\uc0c1\uc2dc\ud0a4\uae30 \uc704\ud574 \ubcf8\ubb38\uc744 \ud30c\uc2f1\ud558\uc5ec \uc6f9\ud3f0\ud2b8\ub97c \uc0ac\uc6a9\ud560 \uacbd\uc6b0\uc5d0\ub9cc \ub3d9\uc801\uc73c\ub85c \uc6f9\ud3f0\ud2b8 CSS\ub97c \ud638\ucd9c\ud55c\ub2e4.  
		 * @function
		 * @param {String} content - \ucee8\ud150\uce20
		 */
		this.includeWebfontCss = function(content) {
			if ($tx.msie) {
				_webfontLoader.load(content);
			}
		};
		/**
		 * \ubcf8\ubb38\uc5d0 \uc0ac\uc6a9\ub41c \uc6f9\ud3f0\ud2b8\uba85 \ubaa9\ub85d\uc744 \ub9ac\ud134\ud55c\ub2e4.
		 * @function
		 * @returns {Array} \uc0ac\uc6a9\ud558\uace0 \uc788\ub294 \uc6f9\ud3f0\ud2b8\uba85 \ubaa9\ub85d
		 */
		this.getUsedWebfont = function() {
			if (!$tx.msie) {
				return [];
			}
			return _webfontLoader.getUsed();
		};
		
		var _isJsHolding = false;
		var _jsQueue = [];
		var _runScript = function() {
			if(_jsQueue.length == 0) {
				return;
			}
			if(!_isJsHolding) {
				_isJsHolding = true;
				try {
					_win.eval(_jsQueue.shift());
				} catch(e) {
					console.log(e);
				} finally {
					_isJsHolding = false;
				}
			}
			setTimeout(_runScript, 5);
		};
		/**
		 * \uc790\ubc14\uc2a4\ud06c\ub9bd\ud2b8\ub97c \ub3d9\uc801\uc73c\ub85c \uc2e4\ud589\ud55c\ub2e4
		 * @function
		 * @param {String} script - \uc790\ubc14\uc2a4\ud06c\ub9bd\ud2b8 \ubb38\uc790\uc5f4
		 */
		this.runScript = function(script) {
			_jsQueue.push(script);
			_runScript();
		};

		/* Panel Iframe Initialize ---------------------------------------------------- */
		//NOTE: Cuz different domain
		_canvas.observeJob(Trex.Ev.__IFRAME_LOAD_COMPLETE, function(panelDoc) {
			StopWatch.lap("start initPanel");
			_doc = panelDoc;
			installHyperscript(_win, _doc);
			if(config.newlinepolicy == "br"){
				_processor = new Trex.Canvas.ProcessorBR(_win, _doc);
			}else{
				_processor = new Trex.Canvas.ProcessorP(_win, _doc);	
			}
			_relative = new WysiwygRelative(_doc, _elPanel);
			_webfontLoader = new WebfontLoader(_doc, config);
			
			if(!(config.readonly || false)) {
				//Firefox 3, Safari 3, Opera 9, Google Chrome, and Internet Explorer (since 5.5).
				if($tx.msie || $tx.chrome || $tx.webkit_ver >= 3) { 
					_doc.body.setAttribute("contentEditable", "true");
					StopWatch.lap("After designMode on In initPanel ");
				} else { //old version
					setTimeout(function(){
						try{
							_doc.designMode = "On";
							if ($tx.gecko) {
								_doc.execCommand("enableInlineTableEditing", false, false);
								StopWatch.lap("After designMode on In initPanel ");
							}
						}catch(e){
							_panel.designModeActivated = false;
						}	
					}, 10);
				}
			}
			try {
				_panel.setBodyStyle(_doc, config.styles);
			} catch(e) {}
			_panel.setContent();
			Editor.__PANEL_LOADED = true;
			StopWatch.lap("end initPanel");
		});
		
		/* Event Hook ----------------------------------- */
		_canvas.reserveJob(Trex.Ev.__IFRAME_LOAD_COMPLETE, function(panelDoc) {
			try {
				_panel.setFontStyle(_doc, config.styles);
			} catch(e) {}
			_panel.bindEvents(_win, _doc, _canvas, config);
		}, 500);	
		
		StopWatch.lap("before set iframe src in WysiwygPanel");
		/* Iframe Page Load ---------------------------------------------------- */
		_elPanel.setAttribute("src", config.wysiwygUrl);
		
		StopWatch.lap("Finished WysiwygPanel.init");
	},
	bindEvents : function(win, doc, canvas, config) {
		var _doc = doc;
		var _win = win;
		var _canvas = canvas;
		var _cvConfig = config;
		var _history = _canvas.history;
		var _processor = _canvas.getProcessor();
		
		/* wysiwyg handler */
		var _cachedKeyCode;
		var _typingCount = 0;
		var _isNewTypingForSync = false;
		
		var _queryKey = {};
		[13, 8, 32, 33, 34, 37, 38, 39, 40, 46].each( function(key){
			_queryKey[key] = true;
		});
			
		var _wysiwyghandlers = {
			keydown: function(ev) {
				_canvas.fireJobs(Trex.Ev.__CANVAS_PANEL_KEYDOWN, ev);
				if(config.useHotKey) {
					_canvas.fireKeys(ev);
				}
			},
			keypress: function(ev) { //NOTE: cuz typing check
				switch(ev.keyCode){
					case 8:  case 16: case 17: case 18: 
					case 32: case 33: case 34:
					case 37:	case 38: 	case 39: 	case 40:
					case 46:
					case 229: // hangul 
						return;	
				}
				if(_cachedKeyCode && _cachedKeyCode == ev.keyCode){
					return;
				} else {
					if(++_typingCount > 10) {
						_queryState(ev);
						_typingCount = 0;
					}
				}
				_cachedKeyCode = ev.keyCode;	
			},
			keyup: function(ev) {
				if(_queryKey[ev.keyCode]) {
					_processor.clearDummy();
				}
				_history.saveHistoryByKey( {
					'code': ev.keyCode,
					'ctrl': ev.ctrlKey || ( ev.keyCode == 17),
					'alt': ev.altKey || ( ev.keyCode == 18),
					'shift': ev.shiftKey || ( ev.keyCode == 16)
				});
				
				try {
					_isNewTypingForSync = true;
					_canvas.fireJobs(Trex.Ev.__CANVAS_PANEL_KEYUP, ev);
					if (_queryKey[ev.keyCode]) {
						_queryState(ev);
					}
					if(ev.keyCode == Trex.__KEY.DELETE || ev.keyCode == Trex.__KEY.BACKSPACE) { //NOTE: content change by (Del/Backspace) keys Cuz Sync attachments
						_canvas.fireJobs(Trex.Ev.__CANVAS_PANEL_DELETE_SOMETHING);
					}
				}catch(e){
					
				}
			},
			mouseover: function(ev) {
				try {
					_canvas.fireMouseover($tx.element(ev));
				}catch (e) {
					console.log(e);
				}
				_canvas.fireJobs(Trex.Ev.__CANVAS_PANEL_MOUSEOVER, ev);
			},
			mousedown: function(ev) {
				_processor.clearDummy();
				try {
					_canvas.fireElements($tx.element(ev));
				} catch(e) {
					console.log(e);
				}
				_canvas.fireJobs(Trex.Ev.__CANVAS_PANEL_MOUSEDOWN, ev);
				if (_history.isNewTypingForUndo) {
					_history.saveHistory();
				}
			},
			mouseup: function(ev) {
				_canvas.fireJobs(Trex.Ev.__CANVAS_PANEL_MOUSEUP, ev);
				setTimeout(function(){
					_propertySyncHandler(true);
				}, 20);
			},
			click: function(ev) {
				_canvas.fireJobs(Trex.Ev.__CANVAS_PANEL_CLICK, ev);
			},
			scroll: function(ev) {
				_canvas.fireJobs(Trex.Ev.__CANVAS_PANEL_SCROLLING, ev);
			}
		};
		
		var handlers = _wysiwyghandlers;
		for(var eventType in handlers){
			var handler = handlers[eventType];
			if (eventType == "keypress") {
				eventType = ($tx.msie || $tx.webkit) ? "keydown" : "keypress";
			}
			if(eventType == "scroll") {
				if ($tx.opera) {
					setTimeout(function(){
						$tx.observe(_win, eventType, handler, false);
					}, 100);
				}else{
					$tx.observe(_win, eventType, handler, false);
				}
			} else {
				$tx.observe(_doc, eventType, handler, false);
			}
		}
		
		/* Panel Event Handler - Private Method ---------------------------- */
		var _propertySyncHandler = function(isMouseEv) {
			try {
				_canvas.fireJobs(Trex.Ev.__CANVAS_PANEL_QUERY_STATUS);
				if(!isMouseEv) {
					_canvas.fireElements(_processor.getTxSel().getNode());
				}
			} catch(e) {
				console.log(e);
			}
		};

		var _queryState = function(ev) {
			if (!_canvas.canHTML()) {
				return;
			}
			var _processor = _canvas.getProcessor();
			setTimeout(function(){
				_propertySyncHandler();
			}, 0);
		};
		
		_canvas.syncProperty = function(isMouseEv) {
			setTimeout(function(){
				_propertySyncHandler(isMouseEv);
			}, 20);
		};
		
		var _intvl = -1;
		var _checkContentChange = function() { //NOTE: periodically content change check Cuz Sync attachments
			if(_isNewTypingForSync) {
				_canvas.fireJobs(Trex.Ev.__CANVAS_PANEL_DELETE_SOMETHING);
				_isNewTypingForSync = false;
			}
		};
		setTimeout(function() {
			_intvl = setInterval(_checkContentChange, 3000);
		}, 10000);
	},
	setBodyStyle: function(doc, styles) {
		//exclude color, font-size, font-family, line-height
		for(var _style in styles) {
			if("||color||fontSize||fontFamily||lineHeight||".indexOf("||" + _style + "||") < 0) {
				doc.body.style[_style] = styles[_style];
			}
		}
	},
	setFontStyle: function(doc, styles) {
		var _csses = new Template("\
			body, td, button {\
				color:#{color};\
				font-size:#{fontSize};\
				font-family:#{fontFamily};\
				line-height:#{lineHeight};\
			}\
			a, a:hover, a:link, a:active, a:visited { color:#{color}; }\
			div.txc-search-border { border-color:#{color}; }\
			div.txc-search-opborder { border-color:#{color}; }\
			img._tx-unresizable { width: auto !important; height: auto !important; }\
			blockquote.txc-info h3, blockquote.txc-info h4 { font-size:#{fontSize}; }\
			button a { text-decoration:none #{if:browser=='firefox'}!important#{/if:browser}; color:#{color} #{if:browser=='firefox'}!important#{/if:browser}; }\
		").evaluate(Object.extend(styles, {
			'browser': $tx.browser
		}));
				
		var _elStyle = doc.createElement('style');
		_elStyle.setAttribute("type", "text/css");
		if (_elStyle.styleSheet) { // IE
		    _elStyle.styleSheet.cssText = _csses;
		} else { // the other
			_elStyle.textContent = _csses;
		}
		doc.getElementsByTagName('head')[0].appendChild(_elStyle);
	},
	/**
	 * panel \uc5d8\ub9ac\uba3c\ud2b8\ub97c \uac00\uc9c0\uace0 \uc628\ub2e4.
	 * @function
	 */
	getPanel: function(config) {
		var _initializedId = ((config.initializedId)? config.initializedId: "");
		return $must("tx_canvas_wysiwyg" + _initializedId, "Trex.Canvas.WysiwygPanel");
	},
	/**
	 * panel \uc5d8\ub9ac\uba3c\ud2b8\ub97c \uac10\uc2f8\uace0 \uc788\ub294 wrapper \uc5d8\ub9ac\uba3c\ud2b8\ub97c \uac00\uc9c0\uace0 \uc628\ub2e4.
	 * @function
	 */
	getHolder: function(config) {
		var _initializedId = ((config.initializedId)? config.initializedId: "");
		return $must("tx_canvas_wysiwyg_holder" + _initializedId, "Trex.Canvas.WysiwygPanel");
	},
	/**
	 * wysiwyg panel\uc744 \ubcf4\uc774\uac8c\ud55c\ub2e4.
	 * @function
	 */
	show: function() {
		this.$super.show();
		var _processor = this.getProcessor();
		if (_processor) {
			setTimeout(function(){
				try{
					_processor.focusOnBottom();
				}catch(e){}	
			}, 100);
		}
	},
	/**
	 * wysiwyg panel\uc744 \uac10\ucd98\ub2e4.
	 * @function
	 */
	hide: function() {
		var _processor = this.getProcessor();
		if (_processor) {
			_processor.blur();
		}
		this.$super.hide();
	}
});

var __SCROLL_WIDTH = 16;
/**
 * wysiwyg \uc601\uc5ed\uc5d0\uc11c\uc758 \ud2b9\uc815 \ub178\ub4dc\uc758 \uc0c1\ub300 \uc704\uce58\ub97c \uacc4\uc0b0\ud558\uae30 \uc704\ud55c \ud074\ub798\uc2a4\ub85c WysiwygPanel \ub0b4\ubd80\uc5d0\uc11c\ub9cc \uc0ac\uc6a9\ub41c\ub2e4.
 * @private
 * @class
 */
var WysiwygRelative = Trex.Class.create({
	initialize: function(doc, elPanel) {
		this.doc = doc;
		this.elPanel = elPanel;
	},
	getRelative: function(node) {
		var _relatives = { x:0, y:0, width:0, height:0 };
		if (node) {
			var _position = $tom.getPosition(node, true);
			var _frameHeight = $tom.getHeight(this.elPanel);
			var _scrollTop = $tom.getScrollTop(this.doc);

			if(_position.y + _position.height < _scrollTop || _position.y > _scrollTop + _frameHeight) {
				return _relatives;
			} else {
				var _frameLeft = 0; //Holder \uae30\uc900
				var _frameTop = 0; //Holder \uae30\uc900
				var _frameWidth = $tom.getWidth(this.elPanel);
				var _scrollLeft = $tom.getScrollLeft(this.doc);

				_relatives.x = _frameLeft + ((_scrollLeft > 0)? 0: _position.x);
				_relatives.width = Math.min(_frameWidth - _position.x - __SCROLL_WIDTH, _position.width - ((_scrollLeft > 0)? _scrollLeft - _position.x: 0)); 
				_relatives.height = _position.height;
				_relatives.y = _position.y - _scrollTop + _frameTop;
			}
		}
		return _relatives;
	}
});

/**
 * \uc6f9\ud3f0\ud2b8\ub97c \ub85c\ub529\ud558\uae30 \uc704\ud55c \ud074\ub798\uc2a4\ub85c WysiwygPanel \ub0b4\ubd80\uc5d0\uc11c\ub9cc \uc0ac\uc6a9\ub41c\ub2e4.
 * @private
 * @class
 */
var WebfontLoader = Trex.Class.create({
	initialize: function(doc, config) {
		this.doc = doc;
		this.styleCnt = 0;
		this.defWebfont = config.styles.fontFamily;
		this.useWebfont = (config.webfont && config.webfont.use);
		this.webfontCfg = config.webfont || [];
		this.elStyleSheet = this.getStyleSheet();
	},
	load: function(content) {
		if (!content) {
			return;
		}
		if(!this.useWebfont) {
			return;
		}
		
		var _matchs = []; 
		content += " // font-family:" + this.defWebfont;
		content.replace(/font-family\s*:\s*(\w*)/gi, function(full, name) {
			_matchs.push(name);
			return full;
		});
		if(_matchs.length == 0) {
			return;
		}
			
		var _loader = this;
		setTimeout(function() {
			var _matchedSource = _matchs.uniq().join("||");
			_loader.webfontCfg.options.each(function(item) {
				if (item.url && _matchedSource.indexOf(item.data) > -1) {
					_loader.imports(item);
				}
			});
		}, 10);
	},
	getUsed: function() {
		var _result = [];
		if(!this.useWebfont) {
			return _result;
		}
		this.webfontCfg.options.each(function(item) {
			if (!item.url) {
				_result.push(item.data);
			}
		});
		return _result;
	},
	getStyleSheet: function() {
		return this.doc.styleSheets[this.styleCnt++];
	},
	imports: function(item) {
		try {
			this.elStyleSheet.addImport(item.url, 2);
		} catch(e) {
			this.elStyleSheet = this.getStyleSheet();
			this.elStyleSheet.addImport(item.url, 2);
		}
		item.url = null;
	}
});
	
})();

Trex.module("interrupt enter key action @ wysiwyg panel",
	function(editor, toolbar, sidebar, canvas, config) {
		var _newlinepolicy = canvas.config.newlinepolicy;
		canvas.observeKey({ 
			ctrlKey: false,
			altKey: false,
			shiftKey: false,
			keyCode: Trex.__KEY.ENTER
		}, function(ev) {
			if(!canvas.canHTML()) {
				return;
			}
			var _processor = canvas.getProcessor();
			try {
				_processor.getTxSel().collapse(false);
				if(_newlinepolicy == "p") {
					_processor.controlEnterByParagraph(ev);
				} else {
					_processor.controlEnterByLinebreak(ev);
				}
			} catch(e) { if(e == $propagate) { throw e; } }
		});	
		
		canvas.observeKey({ 
			ctrlKey: false,
			altKey: false,
			shiftKey: true,
			keyCode: Trex.__KEY.ENTER
		}, function(ev) {
			if(!canvas.canHTML()) {
				return;
			}
			var _processor = canvas.getProcessor();
			try {
				_processor.getTxSel().collapse(false);
				if(_newlinepolicy == "p") {
					_processor.controlEnterByLinebreak(ev);
				} else {
					_processor.controlEnterByParagraph(ev);
				}
			} catch(e) { if(e == $propagate) { throw e; } }
		});	
	}
);
/**
 * @fileOverview
 * Textarea (source, text) \uc601\uc5ed\uc758 \ucee8\ud150\uce20\ub97c \uc218\uc815, \uad00\ub9ac\ud558\uae30 \uc704\ud55c HtmlPanel, TextPanel \uad00\ub828 Source
 */

/**
 * HTML\ubaa8\ub4dc(\uc18c\uc2a4\ubaa8\ub4dc)\uc758 \ucee8\ud150\uce20\ub97c \uc218\uc815, \uad00\ub9ac\ud558\uae30 \uc704\ud55c \ud074\ub798\uc2a4
 *
 * @class
 * @extends Trex.Canvas.BasedPanel
 * @param {Object} canvas
 * @param {Object} config - canvas\uc758 config
 */
Trex.Canvas.HtmlPanel = Trex.Class.create(/** @lends Trex.Canvas.HtmlPanel.prototype */{
	/** @ignore */
	$extend: Trex.Canvas.BasedPanel,
	/** @ignore */
	$const: {
		/** @name Trex.Canvas.HtmlPanel.__MODE */
		__MODE: Trex.Canvas.__HTML_MODE
	},
	initialize: function(canvas, config) {
		this.$super.initialize(canvas, config);
		
		var _processor = new Trex.Canvas.TextAreaProcessor(this.el);
		/**
		 * \uc0dd\uc131\ub41c Processor \uac1d\uccb4\ub97c \ub9ac\ud134\ud55c\ub2e4.
		 * @function
		 * @returns {Object} Processor \uac1d\uccb4
		 */
		this.getProcessor = function() {
			return _processor;
		};
		
		this.bindEvents();
		
		this.lastHeight = (this.lastHeight - 9*2).toPx();//"382px";
	},
	bindEvents: function() {
		var _handlers = {
			keydown: function(ev){
				var _canvas = this.canvas;
				var _cvConfig = this.config;
				this.canvas.fireJobs(Trex.Ev.__CANVAS_SOURCE_PANEL_KEYDOWN, ev);
			},
			keyup: function(ev){
				this.canvas.getProcessor().savePosition();
			},
			mousedown: function(ev){
				this.canvas.fireJobs(Trex.Ev.__CANVAS_SOURCE_PANEL_MOUSEDOWN, ev);
			},
			mouseup: function(ev){
				this.canvas.getProcessor().savePosition();	
			},
			click: function(ev) {
				this.canvas.fireJobs(Trex.Ev.__CANVAS_SOURCE_PANEL_CLICK, ev);	
			}
		};
		for(var _eventType in _handlers){
			$tx.observe(this.el, _eventType, _handlers[_eventType].bind(this), true);
		}
	},
	/**
	 * panel \uc5d8\ub9ac\uba3c\ud2b8\ub97c \uac00\uc9c0\uace0 \uc628\ub2e4.
	 * @function
	 */
	getPanel: function(config) {
		var _initializedId = ((config.initializedId)? config.initializedId: "");
		return $must("tx_canvas_source" + _initializedId, "Trex.Canvas.HtmlPanel");
	},
	/**
	 * panel \uc5d8\ub9ac\uba3c\ud2b8\ub97c \uac10\uc2f8\uace0 \uc788\ub294 wrapper \uc5d8\ub9ac\uba3c\ud2b8\ub97c \uac00\uc9c0\uace0 \uc628\ub2e4.
	 * @function
	 */
	getHolder: function(config) {
		var _initializedId = ((config.initializedId)? config.initializedId: "");
		return $must("tx_canvas_source_holder" + _initializedId, "Trex.Canvas.HtmlPanel");
	},
	/**
	 * panel\uc744 \ubcf4\uc774\uac8c\ud55c\ub2e4.
	 * @function
	 */
	show: function() {
		this.$super.show();
		var _elPanel = this.el;
		var _elHolder = this.elHolder;
		setTimeout(function(){
			_elPanel.focus();
			if ($tx.msie && $tx.msie_ver < 7) {
				// #552 
				_elHolder.style.padding = "1px";
				setTimeout(function(){
					_elHolder.style.padding = "0px";
				}, 0);
			}			
		}, 100);
	},
	/**
	 * \ucee8\ud150\uce20 \uc601\uc5ed\uc5d0 \uc4f0\uc5ec\uc9c4 \ucee8\ud150\uce20\ub97c \uc5bb\uc5b4\uc628\ub2e4. 
	 * @function
	 * @returns {String} \ucee8\ud150\uce20 \ubb38\uc790\uc5f4
	 */
	getContent: function() {
		return this.el.value;
	},
	/**
	 * \ucee8\ud150\uce20 \uc601\uc5ed\uc758 \ucee8\ud150\uce20\ub97c \uc8fc\uc5b4\uc9c4 \ubb38\uc790\uc5f4\ub85c \uc218\uc815\ud55c\ub2e4. 
	 * @function
	 * @param {String} content - \ucee8\ud150\uce20
	 */
	setContent: function(content) {
		var validator = new Trex.Validator();
		if (validator.exists(content)) {
			this.el.value = content;
		} else {
			this.el.value = "";
		}
	},
	/**
	 * panel \uc601\uc5ed\uc758 \ub192\uc774\ub97c \uc5bb\uc5b4\uc628\ub2e4.
	 * @function
	 * @returns {String} textarea \uc601\uc5ed\uc758 \ub192\uc774 (px)
	 */
	getPanelHeight: function() { 
		return ($tom.getHeight(this.el).parsePx() + 2).toPx(); 
	},
	/**
	 * panel \uc601\uc5ed\uc758 \ub192\uc774\ub97c \uc14b\ud305\ud55c\ub2e4.
	 * @function
	 * @param {Number} width - textarea \uc601\uc5ed\uc758 \ub113\uc774 (px)
	 */
	setPanelHeight: function(height) {
		this.$super.setPanelHeight((height.parsePx() - 2).toPx());
	}
});



/**
 * \ud14d\uc2a4\ud2b8\ubaa8\ub4dc\uc758 \ucee8\ud150\uce20\ub97c \uc218\uc815, \uad00\ub9ac\ud558\uae30 \uc704\ud55c \ud074\ub798\uc2a4
 *
 * @class
 * @extends Trex.Canvas.BasedPanel
 * @param {Object} canvas
 * @param {Object} config - canvas\uc758 config
 */
Trex.Canvas.TextPanel = Trex.Class.create(/** @lends Trex.Canvas.TextPanel.prototype */{
	/** @ignore */
	$extend: Trex.Canvas.BasedPanel,
	/** @ignore */
	$const: {
		/** @name Trex.Canvas.TextPanel.__MODE */
		__MODE: Trex.Canvas.__TEXT_MODE
	},
	initialize: function(canvas, config) {
		this.$super.initialize(canvas, config);
		
		var _processor = new Trex.Canvas.TextAreaProcessor(this.el);
		/**
		 * \uc0dd\uc131\ub41c Processor \uac1d\uccb4\ub97c \ub9ac\ud134\ud55c\ub2e4.
		 * @function
		 * @returns {Object} Processor \uac1d\uccb4
		 */
		this.getProcessor = function() {
			return _processor;
		};
		
		this.bindEvents();
		
		this.lastHeight = (this.lastHeight - 9*2).toPx();//"382px";
	},
	bindEvents: function() {
		var _handlers = {
			keydown: function(ev){},
			keyup: function(ev){},
			mousedown: function(ev){},
			mouseup: function(ev){},
			click: function(ev) {
				this.canvas.fireJobs(Trex.Ev.__CANVAS_TEXT_PANEL_CLICK, ev);
			}			
		};
		for(var _eventType in _handlers){
			$tx.observe(this.el, _eventType, _handlers[_eventType].bind(this), true);
		}
	},
	/**
	 * panel \uc5d8\ub9ac\uba3c\ud2b8\ub97c \uac00\uc9c0\uace0 \uc628\ub2e4.
	 * @function
	 */
	getPanel: function(config) {
		var _initializedId = ((config.initializedId)? config.initializedId: "");
		return $must("tx_canvas_text" + _initializedId, "Trex.Canvas.TextPanel");
	},
	/**
	 * panel \uc5d8\ub9ac\uba3c\ud2b8\ub97c \uac10\uc2f8\uace0 \uc788\ub294 wrapper \uc5d8\ub9ac\uba3c\ud2b8\ub97c \uac00\uc9c0\uace0 \uc628\ub2e4.
	 * @function
	 */
	getHolder: function(config) {
		var _initializedId = ((config.initializedId)? config.initializedId: "");
		return $must("tx_canvas_text_holder" + _initializedId, "Trex.Canvas.TextPanel");
	},
	/**
	 * panel\uc744 \ubcf4\uc774\uac8c\ud55c\ub2e4.
	 * @function
	 */
	show: function() {
		this.$super.show();
		var _elPanel = this.el;
		var _elHolder = this.elHolder;
		setTimeout(function(){
			_elPanel.focus();
			if ($tx.msie && $tx.msie_ver < 7) {
				// #552 
				_elHolder.style.padding = "1px";
				setTimeout(function(){
					_elHolder.style.padding = "0px";
				}, 0);
			}			
		}, 100);
	},
	/**
	 * \ucee8\ud150\uce20 \uc601\uc5ed\uc5d0 \uc4f0\uc5ec\uc9c4 \ucee8\ud150\uce20\ub97c \uc5bb\uc5b4\uc628\ub2e4. 
	 * @function
	 * @returns {String} \ucee8\ud150\uce20 \ubb38\uc790\uc5f4
	 */
	getContent: function() {
		return this.el.value;
	},
	/**
	 * \ucee8\ud150\uce20 \uc601\uc5ed\uc758 \ucee8\ud150\uce20\ub97c \uc8fc\uc5b4\uc9c4 \ubb38\uc790\uc5f4\ub85c \uc218\uc815\ud55c\ub2e4. 
	 * @function
	 * @param {String} content - \ucee8\ud150\uce20
	 */
	setContent: function(content) {
		this.el.value = content;
	},
	/**
	 * panel \uc601\uc5ed\uc758 \ub192\uc774\ub97c \uc5bb\uc5b4\uc628\ub2e4.
	 * @function
	 * @returns {String} textarea \uc601\uc5ed\uc758 \ub192\uc774 (px)
	 */
	getPanelHeight: function() { 
		return ($tom.getHeight(this.el).parsePx() + 2).toPx(); 
	},
	/**
	 * panel \uc601\uc5ed\uc758 \ub192\uc774\ub97c \uc14b\ud305\ud55c\ub2e4.
	 * @function
	 * @param {Number} width - textarea \uc601\uc5ed\uc758 \ub113\uc774 (px)
	 */
	setPanelHeight: function(height) {
		this.$super.setPanelHeight((height.parsePx() - 2).toPx());
	}
});

Trex.module("interrupt enter key action @ text panel",
	function(editor, toolbar, sidebar, canvas, config) {
		var _newlinepolicy = canvas.config.newlinepolicy;
		var _insertbr = canvas.config.insertbr;
		if (_newlinepolicy == "br" && _insertbr) {
			canvas.observeJob(Trex.Ev.__CANVAS_SOURCE_PANEL_KEYDOWN, function(ev){
				if (canvas.canHTML()) {
					return;
				}
				canvas.getProcessor().controlEnter(ev);
			});
		}	
	}
);
/**
 * @fileOverview
 * Wysiwyg \uc601\uc5ed\uc758 DOM \uc870\uc791\uc744 \ud558\uae30\uc804\uc5d0 \uc120\ud0dd\ub41c \uc601\uc5ed\uc758 \uc2dc\uc791\uacfc \ub05d\uc5d0 marker\ub97c \uc0bd\uc785\ud558\uc5ec 
 * DOM \uc870\uc791\uc744 \ubcf4\ub2e4 \uc6a9\uc774\ud558\uac8c \ud558\ub294 \uac1d\uccb4\ub85c Processor#execWithMarker \uc5d0\uc11c \uc0ac\uc6a9\ub41c\ub2e4. 
 */
Trex.I.Marker = {};

Trex.I.Marker.Standard = /** @lends Trex.Canvas.Marker.prototype */{
	/**
	 * \uc120\ud0dd\ub41c \uc601\uc5ed\uc758 \uc2dc\uc791\uacfc \ub05d\uc5d0 marker\ub97c \uc0bd\uc785\ud55c\ub2e4.
	 * @example
	 * 	marker.paste();
	 */
	paste: function() {
		var _rng = this.processor.getRange();
		var _endMarker = this.endMarker = this.processor.create('span', { id: "tx_end_marker" });
		var _endContainer = _rng.endContainer;
		var _endOffset = _rng.endOffset;
		
		if (_endContainer.nodeType == 3) {
			_endContainer.splitText(_endOffset);
			_endContainer.parentNode.insertBefore(_endMarker, _endContainer.nextSibling);
		} else {
			_endContainer.insertBefore(_endMarker, _endContainer.childNodes[_endOffset]);
		}
		
		var _startMarker = this.startMarker = this.processor.create('span', { id: "tx_start_marker" });
		var _startContainer = _rng.startContainer; 
		var _startOffset = _rng.startOffset; 
		
		if(_startContainer.nodeType == 3) {
			_startContainer.splitText(_startOffset); 
			_startContainer.parentNode.insertBefore(_startMarker, _startContainer.nextSibling);
		} else {
			_startContainer.insertBefore(_startMarker, _startContainer.childNodes[_startOffset]);
		}
	},
	/**
	 * \uc0bd\uc785\ub41c \ub9c8\ucee4\ub97c \uc81c\uac70\ud55c\ub2e4.
	 * @example
	 * 	marker.remove();
	 */
	remove: function() {
		$tom.remove(this.startMarker);
		$tom.remove(this.endMarker);
	}
};


Trex.I.Marker.Trident = /** @lends Trex.Canvas.Marker.prototype */{
	/**
	 * \uc120\ud0dd\ub41c \uc601\uc5ed\uc758 \uc2dc\uc791\uacfc \ub05d\uc5d0 marker\ub97c \uc0bd\uc785\ud55c\ub2e4.
	 * @example
	 * 	marker.paste();
	 */
	paste: function() {
		this.clear();
		
		var _rng = this.processor.getRange();
		var _cnxt = this.processor.doc.body;
		
		var _rng1 = _rng.duplicate();
		_rng1.collapse(true); 
		_rng1.pasteHTML('<span id="tx_start_marker"></span>');
		this.startMarker = $tom.collect(_cnxt, '#tx_start_marker');
		
		var _rng2 = _rng.duplicate();
		_rng2.collapse(false); 
		_rng2.pasteHTML('<span id="tx_end_marker"></span>');
		this.endMarker = $tom.collect(_cnxt, '#tx_end_marker');
	},
	/**
	 * @private
	 * \uae30\uc874\uc5d0 \uc0bd\uc785\ub41c \ub9c8\ucee4\ub97c \ubaa8\ub450 \uc81c\uac70\ud55c\ub2e4.
	 * @example
	 * 	marker.remove();
	 */
	clear: function() {
		var _cnxt = this.processor.doc.body;
		$tom.remove($tom.collect(_cnxt, '#tx_start_marker'));
		$tom.remove($tom.collect(_cnxt, '#tx_end_marker'));
	},
	/**
	 * \uc0bd\uc785\ub41c \ub9c8\ucee4\ub97c \uc81c\uac70\ud55c\ub2e4.
	 * @example
	 * 	marker.remove();
	 */
	remove: function() {
		$tom.remove(this.startMarker);
		$tom.remove(this.endMarker);
	}
};

/**
 * Wysiwyg \uc601\uc5ed\uc758 DOM \uc870\uc791\uc744 \ud558\uae30\uc804\uc5d0 \uc120\ud0dd\ub41c \uc601\uc5ed\uc758 \uc2dc\uc791\uacfc \ub05d\uc5d0 marker\ub97c \uc0bd\uc785\ud558\uc5ec  <br/>
 * DOM \uc870\uc791\uc744 \ubcf4\ub2e4 \uc6a9\uc774\ud558\uac8c \ud558\ub294 \uac1d\uccb4\ub85c  <br/>
 * browser\uc5d0 \ub530\ub77c \ud544\uc694\ud55c \ud568\uc218\ub4e4\uc744 mixin\ud55c\ub2e4. <br/>
 * Processor#execWithMarker \uc5d0\uc11c\ub9cc \uc0ac\uc6a9\ub41c\ub2e4.<br/>
 * 
 * @example
 * 		var _marker = new Trex.Canvas.Marker(processor);
 *		processor.bookmarkTo();
 *		try {
 *			_marker.paste();
 *			_marker.backup();
 *			handler(_marker);
 *		} catch(e) {
 *		} finally {
 *			_marker.remove();
 *		}	
 * @class
 * @param {Object} processor - Processor \uac1d\uccb4
 */
Trex.Canvas.Marker = Trex.Class.create(/** @lends Trex.Canvas.Marker.prototype */{
	/** @ignore */
	$mixins: [
		(($tx.msie)? Trex.I.Marker.Trident: Trex.I.Marker.Standard)
	],
	initialize: function(processor) {
		this.processor = processor;
	},
	/**
	 * \ub9c8\ucee4\ub97c \uc0bd\uc785\ud55c \ud6c4 \ubd81\ub9c8\ud06c\ub97c \uc218\uc815\ud55c\ub2e4.
	 * @example
	 * 	marker.backup();
	 */
	backup: function() {
		this.processor.bookmarkWithMarker(this);
	},
	/**
	 * @private
	 * \uc120\ud0dd\ub41c \uc601\uc5ed\uc774 collapse\uc778\uc9c0 \uc5ec\ubd80\ub97c \ub9ac\ud134\ud55c\ub2e4.
	 * @returns {Boolean} - \uc120\ud0dd\ub41c \uc601\uc5ed\uc774 collapse\uc778\uc9c0 \uc5ec\ubd80
	 * @example
	 * 	marker.checkCollapsed();
	 */
	checkCollapsed: function() {
		return ($tom.next(this.startMarker) == this.endMarker); //collapsed
	}
});

/**
 * @fileOverview
 * native selection, range \uac1d\uccb4\ub97c wrapping \ud55c \uac1d\uccb4\ub85c Processor \uc5d0\uc11c \uc8fc\ub85c \uc0ac\uc6a9\ub41c\ub2e4. 
 */
Trex.I.Selection = {};
Trex.I.Selection.Standard = /** @lends Trex.Canvas.Selection.prototype */{
	/**
	 * native selection object\ub97c \ub9ac\ud134\ud55c\ub2e4.
	 * @returns {Object} - native selection object
	 * @example
	 * 	txSelection.getSel();
	 */
	getSel: function(){
		return this.win.getSelection();
	},
	/**
	 * \uc120\ud0dd\ub41c \uc601\uc5ed\uc758 \ud14d\uc2a4\ud2b8 \ub370\uc774\ud130\ub97c \ub9ac\ud134\ud55c\ub2e4.
	 * @returns {String} - \uc120\ud0dd\ub41c \uc601\uc5ed\uc758 \ud14d\uc2a4\ud2b8 \ub370\uc774\ud130
	 * @example
	 * 	txSelection.getText();
	 */
	getText: function() {
		return this.getSel().toString();
	},
	/**
	 * \uc120\ud0dd\ub41c \uc601\uc5ed\uc758 \ub178\ub4dc\ub97c \ub9ac\ud134\ud55c\ub2e4.
	 * @returns {Element} - \uc120\ud0dd\ub41c \uc601\uc5ed\uc758 \ub178\ub4dc
	 * @example
	 * 	txSelection.getNode();
	 */
	getNode: function() {
		var _rng = this.getRange();
		if (_rng) {
			var _startContainer = _rng.startContainer;
			if (_startContainer.nodeType == 1) {
				if ($tom.isBody(_startContainer)) {
					return (_startContainer);
				} else {
					return (_startContainer.childNodes[_rng.startOffset]);
				}
			} else {
				return (_startContainer.parentNode);
			}
		} else {
			return null;
		}
	},
	/**
	 * native range \ub97c \uc0dd\uc131\ud55c\ub2e4.
	 * @returns {Object} - native range \uac1d\uccb4
	 * @example
	 * 	txSelection.createRange();
	 */
	createRange: function() {
		return this.doc.createRange();
	},
	/**
	 * native text range \ub97c \uc0dd\uc131\ud55c\ub2e4.
	 * @returns {Object} - native text range \uac1d\uccb4
	 * @example
	 * 	txSelection.createTextRange();
	 */
	createTextRange: function() {
		return this.doc.createRange();
	},
	/**
	 * native range object\ub97c \ub9ac\ud134\ud55c\ub2e4.
	 * @returns {Object} - native range \uac1d\uccb4
	 * @example
	 * 	txSelection.getRange();
	 */
	getRange: function(collapse) {
		var _sel = this.getSel();
		if (_sel && _sel.rangeCount > 0) {
			if (collapse == null) {
				if (_sel.rangeCount == 1) { //\ub2e8\uc77c Range = \uc77c\ubc18\uc801\uc778 \uacbd\uc6b0
					return _sel.getRangeAt(0);
				} else { //\ubcf5\uc218 Range -> \ub2e8\uc77c Range\ub85c \ubcc0\ud658
					return this.mergeRange(_sel);
				}
			} else { //Range\ub97c collapse\ud560 \uacbd\uc6b0
				var _rng = _sel.getRangeAt(0);
				_rng.collapse(collapse);
				return _rng;
			}
		} else { //Range\uac00 \uc5c6\uc744 \uacbd\uc6b0
			return this.doc.createRange();
		}
	},
	/**
	 * \uc120\ud0dd\ub41c \uc601\uc5ed\uc758 collapse \uc5ec\ubd80(\uc120\ud0dd\ub41c \uc601\uc5ed\uc774 \uc788\ub294\uc9c0 \uc5ec\ubd80)\ub97c \ub9ac\ud134\ud55c\ub2e4.
	 * @returns {Boolean} - collapse \uc5ec\ubd80
	 * @example
	 * 	txSelection.isCollapsed();
	 */
	isCollapsed: function() {
		var _sel = this.getSel();
		return (_sel && _sel.isCollapsed);
	},
	/**
	 * \uc120\ud0dd\ub41c \uc601\uc5ed\uc744 collapse \uc2dc\ud0a8\ub2e4.
	 * @param {Boolean} toStart - \uc704\uce58, \uc2dc\uc791 = true
	 * @example
	 * 	txSelection.collapse(true);
	 */
	collapse: function(toStart) {
		var _sel = this.getSel();
		if (_sel && _sel.rangeCount > 0) {
			var _rng = _sel.getRangeAt(0);
			_rng.collapse(toStart);
		}
	},
	/**
	 * \uc120\ud0dd\ub41c \uc601\uc5ed\uc758 \ucee8\ud2b8\ub864 \ub178\ub4dc(img,object,hr,table,button)\ub97c \ub9ac\ud134\ud55c\ub2e4.
	 * @returns {Element} - \uc120\ud0dd\ub41c \uc601\uc5ed\uc758 \ub178\ub4dc
	 * @example
	 * 	txSelection.getControl();
	 */
	getControl: function() {
		var _sel = this.getSel();
		if(_sel.isCollapsed) {
			return null;	
		}
		var _node = _sel.anchorNode.childNodes[_sel.anchorOffset];
		if($tom.kindOf(_node, '%control')) {
			return _node;
		} else {
			return null;
		}
	},
	/**
	 * \uc120\ud0dd\ub41c \uc601\uc5ed\uc774 \ucee8\ud2b8\ub864 \ub178\ub4dc\uc778\uc9c0 \uc5ec\ubd80\ub97c \ub9ac\ud134\ud55c\ub2e4.
	 * @returns {Boolean} - \ucee8\ud2b8\ub864 \ub178\ub4dc\uc778\uc9c0 \uc5ec\ubd80
	 * @example
	 * 	txSelection.hasControl();
	 */
	hasControl: function() {
		return (this.getControl() != null);
	},
	/**
	 * \ucee8\ud2b8\ub864 \ub178\ub4dc\ub97c \uc120\ud0dd\ud55c\ub2e4.
	 * @param {Element} node - \ucee8\ud2b8\ub864 \ub178\ud2b8 
	 * @example
	 * 	txSelection.selectControl(node);
	 */
	selectControl: function(node) {
		var _rng = this.createRange();
		_rng.selectNode(node);
		var _sel = this.getSel();
		_sel.removeAllRanges();
		_sel.addRange(_rng);
	},
	/**
	 * \uc120\ud0dd\ub41c \uc601\uc5ed\uc774 \ud14d\uc2a4\ud2b8 \ub370\uc774\ud130 \uc601\uc5ed\uc758 \uc5b4\ub5a4 \uc704\uce58\uc778\uc9c0\ub97c \ub9ac\ud134\ud55c\ub2e4.
	 * @returns {Number} - \ud14d\uc2a4\ud2b8 \ub370\uc774\ud130 \uc601\uc5ed\uc758 \uc5b4\ub5a4 \uc704\uce58\uc778\uc9c0 <br/>
	 * 					\ud14d\uc2a4\ud2b8\uc758 \ucc98\uc74c : $tom.__POSITION.__START_OF_TEXT : -1<br/>
	 * 					\ud14d\uc2a4\ud2b8\uc758 \uc911\uac04 : $tom.__POSITION.__MIDDLE_OF_TEXT : 0<br/>
	 * 					\ud14d\uc2a4\ud2b8\uc758 \ub9c8\uc9c0\ub9c9 : $tom.__POSITION.__END_OF_TEXT : 1
	 * @example
	 * 	txSelection.compareTextPos();
	 */
	compareTextPos: function() {
		var _rng = this.getRange();
		if (_rng) {
			var _startContainer = _rng.startContainer;
			if (_startContainer.nodeType == 3) {
				if(_rng.startOffset == 0) {
					return $tom.__POSITION.__START_OF_TEXT;
				} else if(_rng.startOffset == _startContainer.textContent.length) {
					return $tom.__POSITION.__END_OF_TEXT;
				} else {
					return $tom.__POSITION.__MIDDLE_OF_TEXT;
				}
			}
		}
		return $tom.__POSITION.__END_OF_TEXT;
	},
	/**
	 * @private
	 * selection\uc5d0 \ubcf5\uc218\uc758 range\uac00 \uc788\uc744 \uacbd\uc6b0 range\ub97c \ud569\uce5c\ub514\u314f.
	 * @returns {Object} - native range \uac1d\uccb4
	 * @example
	 * 	txSelection.mergeRange(sel);
	 */
	mergeRange: function(sel) {
		try {
			var _ranges = [];
			for(var i=0,_length=sel.rangeCount; i<_length; i++) {
				_ranges.push(sel.getRangeAt(i));
			}
			sel.removeAllRanges();
			
			var _startNode = _ranges[0].startContainer.childNodes[_ranges[0].startOffset];
			var _endNode = _ranges[_length - 1].endContainer.childNodes[_ranges[_length - 1].endOffset - 1];
			
			var _rng = this.doc.createRange();
			try {
				_rng.setStart(_startNode, 0);
			} catch (e) {
				_rng.collapse(true);
			}
			try {
				_rng.setEnd(_endNode, _endNode.childNodes.length);
			} catch (e) {}
			
			sel.addRange(_rng);
			return sel.getRangeAt(0);
		} catch(e) {
			return sel.getRangeAt(0);
		}
	},
	/**
	 * @private
	 * \ud2b9\uc815 \uc704\uce58\ub85c range\uc758 \uc2dc\uc791\uc704\uce58\ub97c \uc9c0\uc815\ud55c\ub2e4.
	 * @param {Object} rng - native range \uac1d\uccb4
	 * @param {Element} node - \ud2b9\uc815 \ubd80\ubaa8 \ub178\ub4dc
	 * @param {Number} offset - \ub178\ub4dc\uc758 \uc635\uc14b
	 * @example
	 * 	txSelection.setStart(range, node, 1);
	 */
	setStart: function(rng, node, offset) {
		try {
			rng.setStart(node, offset);
		} catch (e) {
			rng.collapse(true);
			rng.setStart(node, offset);
		}
	},
	/**
	 * @private
	 * \ud2b9\uc815 \uc704\uce58\ub85c range\uc758 \ub05d\uc704\uce58\ub97c \uc9c0\uc815\ud55c\ub2e4.
	 * @param {Object} rng - native range \uac1d\uccb4
	 * @param {Element} node - \ud2b9\uc815 \ubd80\ubaa8 \ub178\ub4dc
	 * @param {Number} offset - \ub178\ub4dc\uc758 \uc635\uc14b
	 * @example
	 * 	txSelection.setEnd(range, node, 1);
	 */
	setEnd: function(rng, node, offset) {
		try {
			rng.setEnd(node, offset);
		} catch (e) {
			rng.collapse(false);
			rng.setEnd(node, offset);
		}
	},
	/**
	 * \uc8fc\uc5b4\uc9c4 range\ub97c \uc120\ud0dd\ud55c\ub2e4.
	 * @returns {Object} - native selection \uac1d\uccb4
	 * @example
	 * 	txSelection.selectRange(range);
	 */
	selectRange: function(rng) {
		var _sel = this.getSel();
		_sel.removeAllRanges(); 
		_sel.addRange(rng); 
		return _sel;
	}
};

	
Trex.I.Selection.Trident = /** @lends Trex.Canvas.Selection.prototype */{
	/**
	 * native selection object\ub97c \ub9ac\ud134\ud55c\ub2e4.
	 * @returns {Object} - native selection object
	 * @example
	 * 	txSelection.getSel();
	 */
	getSel: function(){
		return this.doc.selection;
	},
	/**
	 * \uc120\ud0dd\ub41c \uc601\uc5ed\uc758 \ud14d\uc2a4\ud2b8 \ub370\uc774\ud130\ub97c \ub9ac\ud134\ud55c\ub2e4.
	 * @returns {String} - \uc120\ud0dd\ub41c \uc601\uc5ed\uc758 \ud14d\uc2a4\ud2b8 \ub370\uc774\ud130
	 * @example
	 * 	txSelection.getText();
	 */
	getText: function() {
		return this.getSel().createRange().text;
	},
	/**
	 * \uc120\ud0dd\ub41c \uc601\uc5ed\uc758 \ub178\ub4dc\ub97c \ub9ac\ud134\ud55c\ub2e4.
	 * @returns {Element} - \uc120\ud0dd\ub41c \uc601\uc5ed\uc758 \ub178\ub4dc
	 * @example
	 * 	txSelection.getNode();
	 */
	getNode: function() {
		var _sel = this.getSel();
		var _type = _sel.type.toLowerCase();
		if (_type === "control") {
			return (_sel.createRange().item(0));
		} else {
			return (_sel.createRange().parentElement());
		}
	},
	/**
	 * native range \ub97c \uc0dd\uc131\ud55c\ub2e4.
	 * @returns {Object} - native range \uac1d\uccb4
	 * @example
	 * 	txSelection.createRange();
	 */
	createRange: function() {
		var _sel = this.getSel();
		return _sel.createRange();
	},
	/**
	 * native text range \ub97c \uc0dd\uc131\ud55c\ub2e4.
	 * @returns {Object} - native text range \uac1d\uccb4
	 * @example
	 * 	txSelection.createTextRange();
	 */
	createTextRange: function() {
		return this.doc.body.createTextRange();
	},
	/**
	 * native range object\ub97c \ub9ac\ud134\ud55c\ub2e4.
	 * @returns {Object} - native range \uac1d\uccb4
	 * @example
	 * 	txSelection.getRange();
	 */
	getRange: function(collapse){
		var _sel = this.getSel();
		var _type = _sel.type.toLowerCase();
		if (_type == "none") {
			return _sel.createRange() ? _sel.createRange() : function(){
				var _rng = this.doc.body.createTextRange();
				_rng.collapse(true);
				_rng.select();
				return _rng;
			}();
		}
		if (collapse == null) {
			return _sel.createRange();
		} else {
			if (_type === "text") {
				var _rng = _sel.createRange();
				_rng.collapse(collapse);
				_rng.select();
				return _sel.createRange();
			} else {
				if (_type === "control") {
					_sel.empty();
				}
				return _sel.createRange();
			}
		}
	},
	/**
	 * \uc120\ud0dd\ub41c \uc601\uc5ed\uc758 collapse \uc5ec\ubd80(\uc120\ud0dd\ub41c \uc601\uc5ed\uc774 \uc788\ub294\uc9c0 \uc5ec\ubd80)\ub97c \ub9ac\ud134\ud55c\ub2e4.
	 * @returns {Boolean} - collapse \uc5ec\ubd80
	 * @example
	 * 	txSelection.isCollapsed();
	 */
	isCollapsed: function() {
		var _sel = this.getSel();
		var _type = _sel.type.toLowerCase();
		if(_type === "none") {
			return true;
		} else if(_type === "control") {
			return true;
		} else if(_type === "text") {
			var _rng = _sel.createRange();
			if(_rng && _rng.htmlText) {
				return (_rng.htmlText.length == 0);
			} else {
				return true;
			}
		} else {
			return true;
		}
	},
	/**
	 * \uc120\ud0dd\ub41c \uc601\uc5ed\uc744 collapse \uc2dc\ud0a8\ub2e4.
	 * @param {Boolean} toStart - \uc704\uce58, \uc2dc\uc791 = true
	 * @example
	 * 	txSelection.collapse(true);
	 */
	collapse: function(toStart) {
		var _sel = this.getSel();
		var _type = _sel.type.toLowerCase();
		if(_type === "text") {
			var _rng = _sel.createRange();
			_rng.collapse(toStart);
			_rng.select();
			return _sel.createRange();
		} else {
			if(_type === "control") {
				_sel.empty();
			}
			return _sel.createRange();
		}
	},
	/**
	 * \uc120\ud0dd\ub41c \uc601\uc5ed\uc758 \ucee8\ud2b8\ub864 \ub178\ub4dc(img,object,hr,table,button)\ub97c \ub9ac\ud134\ud55c\ub2e4.
	 * @returns {Element} - \uc120\ud0dd\ub41c \uc601\uc5ed\uc758 \ub178\ub4dc
	 * @example
	 * 	txSelection.hasControl();
	 */
	getControl: function() {
		var _sel = this.getSel();
		var _type = _sel.type.toLowerCase();
		if (_type === "control") {
			var _node = _sel.createRange().item(0);
			if($tom.kindOf(_node, '%control')) {
				return _node;
			} else {
				return null;
			}
		} else {
			return null;
		}
	},
	/**
	 * \uc120\ud0dd\ub41c \uc601\uc5ed\uc774 \ucee8\ud2b8\ub864 \ub178\ub4dc\uc778\uc9c0 \uc5ec\ubd80\ub97c \ub9ac\ud134\ud55c\ub2e4.
	 * @returns {Boolean} - \ucee8\ud2b8\ub864 \ub178\ub4dc\uc778\uc9c0 \uc5ec\ubd80
	 * @example
	 * 	txSelection.hasControl();
	 */
	hasControl: function() {
		var _sel = this.getSel();
		var _type = _sel.type.toLowerCase();
		if (_type === "control") {
			return true;
		} else {
			return false;
		}
	},
	/**
	 * \ucee8\ud2b8\ub864 \ub178\ub4dc\ub97c \uc120\ud0dd\ud55c\ub2e4.
	 * @param {Element} node - \ucee8\ud2b8\ub864 \ub178\ud2b8 
	 * @example
	 * 	txSelection.selectControl(node);
	 */
	selectControl: function(node) {
		var _rng = this.doc.body.createControlRange();
		_rng.add(node);
		_rng.select();
	},
	/**
	 * \uc120\ud0dd\ub41c \uc601\uc5ed\uc774 \ud14d\uc2a4\ud2b8 \ub370\uc774\ud130 \uc601\uc5ed\uc758 \uc5b4\ub5a4 \uc704\uce58\uc778\uc9c0\ub97c \ub9ac\ud134\ud55c\ub2e4.
	 * @returns {Number} - \ud14d\uc2a4\ud2b8 \ub370\uc774\ud130 \uc601\uc5ed\uc758 \uc5b4\ub5a4 \uc704\uce58\uc778\uc9c0 <br/>
	 * 					\ud14d\uc2a4\ud2b8\uc758 \ucc98\uc74c : $tom.__POSITION.__START_OF_TEXT : -1<br/>
	 * 					\ud14d\uc2a4\ud2b8\uc758 \uc911\uac04 : $tom.__POSITION.__MIDDLE_OF_TEXT : 0<br/>
	 * 					\ud14d\uc2a4\ud2b8\uc758 \ub9c8\uc9c0\ub9c9 : $tom.__POSITION.__END_OF_TEXT : 1
	 * @example
	 * 	txSelection.compareTextPos();
	 */
	compareTextPos: function() {
		var _sel = this.getSel();
		var _type = _sel.type.toLowerCase();
		if(_type === "none") {
			var _rng = _sel.createRange();
			var _rng2 = _rng.duplicate();
			_rng2.moveToElementText(_rng.parentElement());
			if(_rng.compareEndPoints('StartToStart', _rng2) == 0) {
				return $tom.__POSITION.__START_OF_TEXT;
			} else if(_rng.compareEndPoints('EndToEnd', _rng2) == 0) {
				return $tom.__POSITION.__END_OF_TEXT;
			} else {
				return $tom.__POSITION.__MIDDLE_OF_TEXT;
			}
		}
		return $tom.__POSITION.__END_OF_TEXT;
	},
	/**
	 * @private
	 * @reference http://msdn.microsoft.com/en-us/library/ms536745(VS.85).aspx
		StartToEnd - Move the start of the TextRange object to the end of the specified oTextRange parameter.
		StartToStart - Move the start of the TextRange object to the start of the specified oTextRange parameter.
		EndToStart - Move the end of the TextRange object to the start of the specified oTextRange parameter.
		EndToEnd - Move the end of the TextRange object to the end of the specified oTextRange parameter.
	 */
	transTextRange: function(rng, node, offset, toStart) {
		var _pntRng = this.createTextRange();
		
		var _pntNode = this.win.span("\ufeff");
		$tom.insertAt(_pntNode, node);
		_pntRng.moveToElementText(_pntNode);
		$tom.remove(_pntNode);
		
		_pntRng.collapse(true);
		_pntRng.moveStart('character', offset);
			
		if (toStart) {
			rng.setEndPoint('StartToStart', _pntRng);
		} else {
			rng.setEndPoint('EndToEnd', _pntRng);
		}
		
		return rng;
	},
	/**
	 * @private
	 * \ud2b9\uc815 \uc704\uce58\ub85c range\uc758 \uc2dc\uc791\uc704\uce58\ub97c \uc9c0\uc815\ud55c\ub2e4.
	 * @param {Object} rng - native range \uac1d\uccb4
	 * @param {Element} node - \ud2b9\uc815 \ubd80\ubaa8 \ub178\ub4dc
	 * @param {Number} offset - \ub178\ub4dc\uc758 \uc635\uc14b
	 * @example
	 * 	txSelection.setStart(range, node, 1);
	 */
	setStart: function(rng, node, offset) {
		try {
			this.transTextRange(rng, node, offset, true);
		} catch (e) {
			console.log(e)
		}
		return rng;
	},
	/**
	 * @private
	 * \ud2b9\uc815 \uc704\uce58\ub85c range\uc758 \ub05d\uc704\uce58\ub97c \uc9c0\uc815\ud55c\ub2e4.
	 * @param {Object} rng - native range \uac1d\uccb4
	 * @param {Element} node - \ud2b9\uc815 \ubd80\ubaa8 \ub178\ub4dc
	 * @param {Number} offset - \ub178\ub4dc\uc758 \uc635\uc14b
	 * @example
	 * 	txSelection.setEnd(range, node, 1);
	 */
	setEnd: function(rng, node, offset) {
		try {
			this.transTextRange(rng, node, offset, false);
		} catch (e) {
			console.log(e)
		}
		return rng;
	},
	/**
	 * \uc8fc\uc5b4\uc9c4 range\ub97c \uc120\ud0dd\ud55c\ub2e4.
	 * @returns {Object} - native selection \uac1d\uccb4
	 * @example
	 * 	txSelection.selectRange(range);
	 */
	selectRange: function(rng) {
		rng.select();
	}
};

Trex.I.Selection.Gecko = {
	
};

Trex.I.Selection.Webkit = {
	/**
	 * \uc120\ud0dd\ub41c \uc601\uc5ed\uc758 \ucee8\ud2b8\ub864 \ub178\ub4dc(img,object,hr,table,button)\ub97c \ub9ac\ud134\ud55c\ub2e4.
	 * @returns {Element} - \uc120\ud0dd\ub41c \uc601\uc5ed\uc758 \ub178\ub4dc
	 * @example
	 * 	txSelection.getControl();
	 */
	getControl: function() {
		var _sel = this.getSel();
		if(_sel.isCollapsed) {
			return null;	
		}
		if ($tom.isElement(_sel.anchorNode)) {
			var _node = _sel.anchorNode.childNodes[_sel.anchorOffset];
			if ($tom.kindOf(_node, '%control')) {
				return _node;
			} else {
				return null;
			}
		}
		//button
		var _prevNode = $tom.previous(_sel.focusNode);
		var _nextNode = $tom.next(_sel.anchorNode);
		if(_prevNode == _nextNode) {
			return $tom.first(_prevNode, '%control');
		} else {
			return null;
		}
	},
	/**
	 * \ucee8\ud2b8\ub864 \ub178\ub4dc\ub97c \uc120\ud0dd\ud55c\ub2e4.
	 * @param {Element} node - \ucee8\ud2b8\ub864 \ub178\ud2b8 
	 * @example
	 * 	txSelection.selectControl(node);
	 */
	selectControl: function(node) {
		var _rng = this.createRange();
		_rng.selectNode(node);
		var _sel = this.getSel();
		_sel.removeAllRanges();
		_sel.addRange(_rng);
	}
};

Trex.I.Selection.Presto = {
	
};

/**
 * native selection, range \uac1d\uccb4\ub97c wrapping \ud55c \uac1d\uccb4\ub85c <br/>
 * browser\uc5d0 \ub530\ub77c \ud544\uc694\ud55c \ud568\uc218\ub4e4\uc744 mixin\ud55c\ub2e4. <br/>
 * \uc8fc\ub85c Processor\uc640 \uc5f0\uad00\ub41c \uac1d\uccb4\uc5d0\uc11c \ud638\ucd9c\ud558\uba70, <br/>
 * processor.getTxSel()\ub97c \ud1b5\ud574\uc11c txSelection\ub97c \uc5bb\uc5b4\uc11c \uc0ac\uc6a9\ud55c\ub2e4. <br/>
 * native selection \uacfc \uad6c\ubd84\uc9d3\uae30 \uc704\ud574\uc11c txSelection\ub85c \uba85\uba85\ud55c\ub2e4.
 *
 * @class
 * @param {Object} processor - Processor \uac1d\uccb4
 */
Trex.Canvas.Selection = Trex.Class.create(/** @lends Trex.Canvas.Selection.prototype */{
	/** @ignore */
	$mixins: [
		Trex.I.Selection.Standard,
		(($tx.msie)? Trex.I.Selection.Trident: {}),
		(($tx.gecko)? Trex.I.Selection.Gecko: {}),
		(($tx.webkit)? Trex.I.Selection.Webkit: {}),
		(($tx.presto)? Trex.I.Selection.Presto: {})
	],
	initialize: function(processor) {
		this.processor = processor;
		this.win = processor.win;
		this.doc = processor.doc;
	}
});

/**
 * @fileOverview
 * \uc120\ud0dd\ub41c \uc601\uc5ed\uc744 \ubd81\ub9c8\ud06c\ud558\uc5ec 
 * \ud3ec\ucee4\uc2a4\ub41c document\uac00 \ubcc0\uacbd\ub418\uac70\ub098 DOM \uc870\uc791\uc744 \ud558\ub354\ub77c\ub3c4 \uc120\ud0dd \uc601\uc5ed\uc774 \uc720\uc9c0\ub418\ub3c4\ub85d \ud55c\ub2e4.
 * Processor \uc5d0\uc11c \uc8fc\ub85c \uc0ac\uc6a9\ub41c\ub2e4. 
 */

/**
 * \uc120\ud0dd\ub41c \uc601\uc5ed\uc744 \ubd81\ub9c8\ud06c\ud558\uc5ec <br/> 
 * \ud3ec\ucee4\uc2a4\ub41c document\uac00 \ubcc0\uacbd\ub418\uac70\ub098 DOM \uc870\uc791\uc744 \ud558\ub354\ub77c\ub3c4 \uc120\ud0dd \uc601\uc5ed\uc774 \uc720\uc9c0\ub418\ub3c4\ub85d \ud558\ub294 \uac1d\uccb4\ub85c <br/>
 * native range \uac1d\uccb4\uc5d0 \uc788\ub294 5\uac00\uc9c0 \ud504\ub85c\ud37c\ud2f0\ub9cc \uc800\uc7a5\ud55c\ub2e4. <br/>
 * \uc8fc\ub85c Processor\uc640 \uc5f0\uad00\ub41c \uac1d\uccb4\uc5d0\uc11c \ud638\ucd9c\ud558\uba70, <br/>
 * processor.getBookmark()\ub97c \ud1b5\ud574\uc11c bookmark\ub97c \uc5bb\uc5b4\uc11c \uc0ac\uc6a9\ud55c\ub2e4.<br/>
 * 
 * @class
 */
Trex.Canvas.Bookmark = Trex.Class.create(/** @lends Trex.Canvas.Bookmark.prototype */{
	startContainer: null,
	startOffset: 0,
	endContainer: null,
	endOffset: 0,
	initialize: function(processor) {
		this.processor = processor;
		this.win = processor.win;
		this.doc = processor.doc;
		this.dummy = function() {
			return processor.newDummy();
		};
	},
	/**
	 * \uc2dc\uc791\uc704\uce58\uc640 \ub05d\uc704\uce58\ub97c \ub3d9\uc77c\ud558\uac8c \ubd81\ub9c8\ud06c\ub97c \uc218\uc815\ud55c\ub2e4.
	 * @param {Boolean} toStart - \uc704\uce58, \uc2dc\uc791 = true
	 * @example
	 * 	bookmark.collapse(true);
	 */
	collapse: function (toStart) {
		if (toStart) {
			this.updateEnd(this.startContainer, this.startOffset);
		} else {
			this.updateStart(this.endContainer, this.endOffset);
		}
	},
	/**
	 * native range \uac1d\uccb4\ub85c \ubd81\ub9c8\ud06c\ub97c \uc218\uc815\ud55c\ub2e4.
	 * @param {Object} range - native range \uac1d\uccb4
	 * @example
	 * 	bookmark.save(range);
	 */
	save: function(rng) {
		this.updateStart(rng.startContainer, rng.startOffset);
		this.updateEnd(rng.endContainer, rng.endOffset);
	},
	/**
	 * \ud2b9\uc815 \ub178\ub4dc\uc758 \uc55e\uacfc \ub4a4\ub85c \ubd81\ub9c8\ud06c\ub97c \uc218\uc815\ud55c\ub2e4. 
	 * @param {Element} node - \ud2b9\uc815 \ub178\ub4dc
	 * @example
	 * 	bookmark.saveAroundNode(node);
	 */
	saveAroundNode: function (node) {
		this.updateStartBefore($tom.top(node));
		this.updateEndAfter($tom.bottom(node));
	},
	/**
	 * \ud2b9\uc815 \ub178\ub4dc\uc758 \ucc98\uc74c\uc73c\ub85c \ubd81\ub9c8\ud06c\ub97c \uc218\uc815\ud55c\ub2e4.
	 * @param {Element} node - \ud2b9\uc815 \ub178\ub4dc
	 * @example
	 * 	bookmark.saveIntoFirst(node);
	 */
	saveIntoFirst: function(node) {
		var _node = $tom.top(node);
		this.updateEndBefore(_node);
		this.collapse(false);
	},
	/**
	 * \ud2b9\uc815 \ub178\ub4dc\uc758 \ub9c8\uc9c0\ub9c9\uc73c\ub85c \ubd81\ub9c8\ud06c\ub97c \uc218\uc815\ud55c\ub2e4.
	 * @param {Element} node - \ud2b9\uc815 \ub178\ub4dc
	 * @example
	 * 	bookmark.saveIntoLast(node);
	 */
	saveIntoLast: function(node) {
		var _node = $tom.bottom(node);
		this.updateEndBefore(_node);
		this.collapse(false);
	},
	/**
	 * \ud2b9\uc815 \ub178\ub4dc\uc758 \uc774\uc804\uc73c\ub85c \ubd81\ub9c8\ud06c\ub97c \uc218\uc815\ud55c\ub2e4.
	 * @param {Element} node - \ud2b9\uc815 \ub178\ub4dc
	 * @example
	 * 	bookmark.saveNextTo(node);
	 */
	savePreviousTo: function(node) {
		if($tom.previous(node)) {
			var _node = $tom.top($tom.previous(node));
			this.updateEndAfter(_node);
		} else {
			this.updateEndBefore(node);
		}
		this.collapse(false);
	},
	/**
	 * \ud2b9\uc815 \ub178\ub4dc\uc758 \ub2e4\uc74c\uc73c\ub85c \ubd81\ub9c8\ud06c\ub97c \uc218\uc815\ud55c\ub2e4.
	 * @param {Element} node - \ud2b9\uc815 \ub178\ub4dc
	 * @example
	 * 	bookmark.saveNextTo(node);
	 */
	saveNextTo: function(node) {
		if($tom.next(node)) {
			var _node = $tom.top($tom.next(node));
			this.updateEndBefore(_node);
		} else {
			this.updateEndAfter(node);
		}
		this.collapse(false);
	},
	/**
	 * marker node\ub85c \ubd81\ub9c8\ud06c\ub97c \uc218\uc815\ud55c\ub2e4.
	 * @param {Object} marker - marker \uac1d\uccb4
	 * @example
	 * 	bookmark.saveWithMarker(marker);
	 */
	saveWithMarker: function(marker) {
		if (marker.checkCollapsed()) { //collapsed
			this.updateEndAfter(marker.endMarker);
			this.collapse(false);
		} else {
			this.updateStartBefore(marker.startMarker);
			this.updateEndAfter(marker.endMarker);
		}
	},
	/**
	 * txSelection\uac00\uc9c0\uace0 \uc800\uc7a5\ub41c \ubd81\ub9c8\ud06c\ub97c \uc120\ud0dd\ud55c\ub2e4. 
	 * @param {Object} txSelection - txSelection \uac1d\uccb4
	 * @example
	 * 	bookmark.select(txSelection);
	 */
	select: function(txSel) {
		if (this.startContainer && this.endContainer) {
			var _rng = txSel.createTextRange();
			try {
				txSel.setStart(_rng, this.startContainer, this.startOffset);
				txSel.setEnd(_rng, this.endContainer, this.endOffset);
			} catch (e) {
				console.log(e)
			}
			txSel.selectRange(_rng);
		}
		this.reset();
	},
	/**
	 * @private
	 * \uc2dc\uc791 \uad00\ub828 \ud504\ub85c\ud37c\ud2f0\ub97c \ud2b9\uc815 \uc704\uce58\ub85c \uc9c0\uc815\ud55c\ub2e4.
	 * @param {Element} node - \ud2b9\uc815 \ubd80\ubaa8 \ub178\ub4dc
	 * @param {Number} offset - \ub178\ub4dc\uc758 \uc635\uc14b
	 * @example
	 * 	bookmark.updateStart(node, 1);
	 */
	updateStart: function(node, offset) {
		this.startContainer = node;
		this.startOffset = offset;
	},
	/**
	 * @private
	 * \uc2dc\uc791 \uad00\ub828 \ud504\ub85c\ud37c\ud2f0\ub97c \ud2b9\uc815 \uc704\uce58\ub85c \uc774\uc804\uc73c\ub85c \uc9c0\uc815\ud55c\ub2e4.
	 * @param {Element} node - \ud2b9\uc815 \ub178\ub4dc
	 * @example
	 * 	bookmark.updateStartBefore(node);
	 */
	updateStartBefore: function(node) {
		var _tNode = this.dummy();
		$tom.insertAt(_tNode, node);
			
		this.startContainer = _tNode;
		this.startOffset = 0;
	},
	/**
	 * @private
	 * \uc2dc\uc791 \uad00\ub828 \ud504\ub85c\ud37c\ud2f0\ub97c \ud2b9\uc815 \uc704\uce58\ub85c \ub2e4\uc74c\uc73c\ub85c \uc9c0\uc815\ud55c\ub2e4.
	 * @param {Element} node - \ud2b9\uc815 \ub178\ub4dc
	 * @example
	 * 	bookmark.updateStartAfter(node);
	 */
	updateStartAfter: function(node) {
		var _tNode = this.dummy();
		$tom.insertNext(_tNode, node);
			
		this.startContainer = _tNode;
		this.startOffset = 0;
	},
	/**
	 * @private
	 * \ub05d \uad00\ub828 \ud504\ub85c\ud37c\ud2f0\ub97c \ud2b9\uc815 \uc704\uce58\ub85c \uc9c0\uc815\ud55c\ub2e4.
	 * @param {Element} node - \ud2b9\uc815 \ubd80\ubaa8 \ub178\ub4dc
	 * @param {Number} offset - \ub178\ub4dc\uc758 \uc635\uc14b
	 * @example
	 * 	bookmark.updateEnd(node, 1);
	 */
	updateEnd: function(node, offset) {
		this.endContainer = node;
		this.endOffset = offset;
	},
	/**
	 * @private
	 * \ub05d \uad00\ub828 \ud504\ub85c\ud37c\ud2f0\ub97c \ud2b9\uc815 \uc704\uce58\ub85c \uc774\uc804\uc73c\ub85c \uc9c0\uc815\ud55c\ub2e4.
	 * @param {Element} node - \ud2b9\uc815 \ub178\ub4dc
	 * @example
	 * 	bookmark.updateEndBefore(node);
	 */
	updateEndBefore: function(node) {
		var _tNode = this.dummy();
		$tom.insertAt(_tNode, node);
		
		this.endContainer = _tNode;
		this.endOffset = 0;
	},
	/**
	 * @private
	 * \ub05d \uad00\ub828 \ud504\ub85c\ud37c\ud2f0\ub97c \ud2b9\uc815 \uc704\uce58\ub85c \ub2e4\uc74c\uc73c\ub85c \uc9c0\uc815\ud55c\ub2e4.
	 * @param {Element} node - \ud2b9\uc815 \ub178\ub4dc
	 * @example
	 * 	bookmark.updateEndAfter(node);
	 */
	updateEndAfter: function(node) {
		var _tNode = this.dummy();
		$tom.insertNext(_tNode, node);
		
		this.endContainer = _tNode;
		this.endOffset = 0;
	},
	/**
	 * @private
	 * \ubd81\ub9c8\ud06c\ub97c \ucd08\uae30\ud654\ud55c\ub2e4.
	 * @returns {Boolean} - collapse \uc5ec\ubd80
	 * @example
	 * 	bookmark.reset();
	 */
	reset: function() {
		this.startContainer = null;
		this.startOffset = 0;
		this.endContainer = null;
		this.endOffset = 0;
	}
});
	Trex.Canvas.TextAreaProcessor = Trex.Class.create({
	$mixins: [ ],
	initialize: function(textarea) {
		this.el = textarea;
	},
	focus: function() {
		this.el.focus();
	},
	blur: function() {
		window.focus();
	},
	savePosition: function() {
		if (this.el.createTextRange) {
			this.currentPos = document.selection.createRange().duplicate();
		}	
	},
	controlEnter: function(ev) {
		var _processor = this;
		_processor.insertTag("<br/>", "");
	},
	insertTag: function(prefix, postfix) {
		var _el = this.el;
		var selection = $tx.webkit ? window.getSelection : document.selection;
		if(selection) {
			if (selection.createRange) {
				var _range = this.currentPos;
				_range.text = prefix + _range.text + postfix;
				this.savePosition(_el);
				_el.focus();
			} else {
				_el.value = _el.value + prefix + postfix;
			}	
		}else if(_el.selectionStart) {
			var begin = _el.value.substr(0, _el.selectionStart);
			var selection = _el.value.substr(_el.selectionStart, _el.selectionEnd - _el.selectionStart);
			var end = _el.value.substr(_el.selectionEnd);
			var newCursorPos = _el.selectionStart;
			var scrollPos = _el.scrollTop;

			_el.value = begin + prefix + selection + postfix + end;

			if(_el.setSelectionRange) {
				if (selection.length == 0) {
					_el.setSelectionRange(newCursorPos + prefix.length, newCursorPos + prefix.length);
				} else {
					_el.setSelectionRange(newCursorPos, newCursorPos + prefix.length + selection.length + postfix.length);
				}	
				_el.focus();
			}
			_el.scrollTop = scrollPos;
		} else {
			_el.value += prefix + postfix;
			_el.focus(_el.value.length - 1);
		}
		return true;
	}
});
/**
 * @fileOverview
 * Wysiwyg \uc601\uc5ed\uc758 \ucee8\ud150\uce20\ub97c \uc870\uc791\ud558\uae30 \uc704\ud574 \uc0ac\uc6a9\ub418\ub294 \uacf5\ud1b5\ub418\ub294 Processor \uc815\uc758 
 */
Trex.I.Processor = {};
Trex.I.Processor.Standard = /** @lends Trex.Canvas.Processor.prototype */{
	txSelection: null,
	initialize: function(win, doc) {
		this.win = win;
		this.doc = doc;
		
		this.txSelection = new Trex.Canvas.Selection(this);
		this.bookmark = new Trex.Canvas.Bookmark(this);
	},
	/**
	 * Trex.Canvas.Selection \uac1d\uccb4\ub97c \ub9ac\ud134\ud55c\ub2e4.
	 * @returns {Object} - Trex.Canvas.Selection \uac1d\uccb4
	 * @example
	 * 	processor.getTxSel();
	 */
	getTxSel: function() {
		return this.txSelection;
	},
	/**
	 * native selection object\ub97c \ub9ac\ud134\ud55c\ub2e4.
	 * @returns {Object} - native selection \uac1d\uccb4
	 * @see Trex.Canvas.Selection#getSel
	 * @example
	 * 	processor.getSel();
	 */
	getSel: function(){
		return this.txSelection.getSel();
	},
	/**
	 * native range object\ub97c \ub9ac\ud134\ud55c\ub2e4.
	 * @returns {Object} - native range \uac1d\uccb4
	 * @see Trex.Canvas.Selection#getRange
	 * @example
	 * 	processor.getRange();
	 */
	getRange: function() {
		return this.txSelection.getRange();
	},
	/**
	 * Trex.Canvas.Bookmark \uac1d\uccb4\ub97c \ub9ac\ud134\ud55c\ub2e4.
	 * @returns {Object} - Trex.Canvas.Bookmark \uac1d\uccb4
	 * @example
	 * 	processor.getBookmark();
	 */
	getBookmark: function() {
		return this.bookmark;
	},
	/**
	 * \uc120\ud0dd\ub41c \uc601\uc5ed\uc758 collapse \uc5ec\ubd80(\uc120\ud0dd\ub41c \uc601\uc5ed\uc774 \uc788\ub294\uc9c0 \uc5ec\ubd80)\ub97c \ub9ac\ud134\ud55c\ub2e4.
	 * @returns {Boolean} - collapse \uc5ec\ubd80
	 * @see Trex.Canvas.Selection#isCollapsed
	 * @example
	 * 	processor.isCollapsed();
	 */
	isCollapsed: function() {
		return this.txSelection.isCollapsed();
	},
	/**
	 * \uc120\ud0dd\ub41c \uc601\uc5ed\uc758 \ub178\ub4dc\ub97c \ub9ac\ud134\ud55c\ub2e4.
	 * @returns {Element} - \uc120\ud0dd\ub41c \uc601\uc5ed\uc758 \ub178\ub4dc
	 * @see Trex.Canvas.Selection#getNode
	 * @example
	 * 	processor.getNode();
	 */
	getNode: function() {
		return this.txSelection.getNode();
	},
	/**
	 * \uc120\ud0dd\ub41c \uc601\uc5ed\uc758 \ucee8\ud2b8\ub864 \ub178\ub4dc(img,object,hr,table,button)\ub97c \ub9ac\ud134\ud55c\ub2e4.
	 * @returns {Element} - \uc120\ud0dd\ub41c \uc601\uc5ed\uc758 \ub178\ub4dc
	 * @see Trex.Canvas.Selection#getControl
	 * @example
	 * 	processor.getControl();
	 */
	getControl: function(){
		return this.txSelection.getControl();
	},
	/**
	 * \uc120\ud0dd\ub41c \uc601\uc5ed\uc774 \ucee8\ud2b8\ub864 \ub178\ub4dc\uc778\uc9c0 \uc5ec\ubd80\ub97c \ub9ac\ud134\ud55c\ub2e4.
	 * @returns {Boolean} - \ucee8\ud2b8\ub864 \ub178\ub4dc\uc778\uc9c0 \uc5ec\ubd80
	 * @see Trex.Canvas.Selection#hasControl
	 * @example
	 * 	processor.hasControl();
	 */
	hasControl: function(){
		return this.txSelection.hasControl();
	},
	/**
	 * \ucee8\ud2b8\ub864 \ub178\ub4dc\ub97c \uc120\ud0dd\ud55c\ub2e4.
	 * @param {Element} node - \ucee8\ud2b8\ub864 \ub178\ud2b8 
	 * @example
	 * 	txSelection.selectControl(node);
	 */
	selectControl: function(node){
		return this.txSelection.selectControl(node);
	},
	/**
	 * \uc120\ud0dd\ub41c \uc601\uc5ed\uc758 \ud14d\uc2a4\ud2b8 \ub370\uc774\ud130\ub97c \ub9ac\ud134\ud55c\ub2e4.
	 * @returns {String} - \uc120\ud0dd\ub41c \uc601\uc5ed\uc758 \ud14d\uc2a4\ud2b8 \ub370\uc774\ud130
	 * @see Trex.Canvas.Selection#getText
	 * @example
	 * 	processor.getText();
	 */
	getText: function(){
		return this.txSelection.getText();
	},
	/**
	 * \uc120\ud0dd\ub41c \uc601\uc5ed\uc774 \ud14d\uc2a4\ud2b8 \ub370\uc774\ud130 \uc601\uc5ed\uc758 \uc5b4\ub5a4 \uc704\uce58\uc778\uc9c0\ub97c \ub9ac\ud134\ud55c\ub2e4.
	 * @returns {Number} - \ud14d\uc2a4\ud2b8 \ub370\uc774\ud130 \uc601\uc5ed\uc758 \uc5b4\ub5a4 \uc704\uce58\uc778\uc9c0 <br/>
	 * 					\ud14d\uc2a4\ud2b8\uc758 \ucc98\uc74c : $tom.__POSITION.__START_OF_TEXT : -1<br/>
	 * 					\ud14d\uc2a4\ud2b8\uc758 \uc911\uac04 : $tom.__POSITION.__MIDDLE_OF_TEXT : 0<br/>
	 * 					\ud14d\uc2a4\ud2b8\uc758 \ub9c8\uc9c0\ub9c9 : $tom.__POSITION.__END_OF_TEXT : 1
	 * @see Trex.Canvas.Selection#compareTextPos
	 * @example
	 * 	processor.compareTextPos();
	 */
	compareTextPos: function() {
		return this.txSelection.compareTextPos();
	},
	/**
	 * \ud604\uc7ac \uc120\ud0dd\ub41c \uc601\uc5ed\uc5d0\uc11c \uc870\uac74\uc5d0 \ub9de\ub294 \ub178\ub4dc\ub97c \ub9ac\ud134\ud55c\ub2e4.
	 * @param {Function, String} filter - \uc870\uac74\uc744 \ub098\ud0c0\ub0b4\ub294 \ud568\uc218 \ub610\ub294 \ubb38\uc790\uc5f4
	 * @returns {Element} - \uc870\uac74\uc5d0 \ub9de\ub294 \ub178\ub4dc
	 * @example
	 * 	processor.findNode(function() { return 'p,div'; });
	 * 	processor.findNode('%paragraph');
	 */
	findNode: function(filter) {
		try {
			return $tom.find(this.getNode(), filter);
		} catch(e) {
			return null;
		}
	},
	/*-------- processor - query style start --------*/
	/**
	 * \ud2b9\uc815\ud55c \ub178\ub4dc\uc758 \ud2b9\uc815\ud55c \uc2a4\ud0c0\uc77c \uac12\uc744 \uc5bb\uc5b4\uc628\ub2e4.
	 * @param {Element} node - \ud2b9\uc815 \ub178\ub4dc
	 * @param {String} styleName - \uc2a4\ud0c0\uc77c \uba85
	 * @returns {String} - \uc2a4\ud0c0\uc77c \uac12
	 * @example
	 * 	processor.queryStyle(node, 'textAlign');
	 */
	queryStyle: function(node, styleName) {
		if(!node) {
			return null;
		}
		styleName = ((styleName == 'float')? ((node.style.styleFloat === undefined)? 'cssFloat': 'styleFloat'): styleName);
		if(node.style && node.style[styleName]) {
			return node.style[styleName];
		} else if(node.currentStyle && node.currentStyle[styleName]) {
			return node.currentStyle[styleName];
		} else if(window.getComputedStyle) {
			var _cssStyle = this.doc.defaultView.getComputedStyle(node, null);
	    	return ((_cssStyle)? _cssStyle[styleName] : null);
		}
		return null;
	},
	/**
	 * \ud2b9\uc815\ud55c \ub178\ub4dc\uc758 \ud2b9\uc815\ud55c \uc18d\uc131 \uac12\uc744 \uc5bb\uc5b4\uc628\ub2e4.
	 * @param {Element} node - \ud2b9\uc815 \ub178\ub4dc
	 * @param {String} attrName - \uc18d\uc131 \uba85
	 * @returns {String} - \uc18d\uc131 \uac12
	 * @example
	 * 	processor.queryAttr(node, 'align');
	 */
	queryAttr: function(node, attrName) {
		if(!node) {
			return null;
		}
		return $tom.getAttribute(node, attrName);
	},
	/**
	 * \uc120\ud0dd\ub41c \uc601\uc5ed\uc758 native queryCommandState \uac12\uc744 \uc5bb\uc5b4\uc628\ub2e4.
	 * @param {String} command - \ucee4\ub9e8\ub4dc \uba85
	 * @returns {Boolean} - \ud574\ub2f9 \uc601\uc5ed\uc774 \ucee4\ub9e8\ub4dc \uc0c1\ud0dc\uc778\uc9c0 \uc5ec\ubd80 
	 * @example
	 * 	processor.queryCommandState('bold');
	 */
	queryCommandState: function(command) {
		try {
			return this.doc.queryCommandState(command);
		} catch(e) { return false; }
	},
	/*-------- processor - query style end --------*/
	/**
	 * \uc120\ud0dd\ub41c \uc601\uc5ed\uc5d0 native execCommand\ub97c \uc2e4\ud589\uc2dc\ud0a8\ub2e4.
	 * @param {String} command - \ucee4\ub9e8\ub4dc \uba85
	 * @param {String} data - \ub370\uc774\ud130 \uac12
	 * @example
	 * 	processor.execCommand('forecolor', '#333');
	 */
	execCommand: function(command, data) {
		try {
			this.doc.execCommand(command, false, data);
		} catch(e) {}
	},
	/*-------- processor - marker start --------*/
	/**
	 * \uc120\ud0dd\ub41c \uc601\uc5ed\uc5d0 \uc8fc\uc5b4\uc9c4 handler\ub97c \uc2e4\ud589\uc2dc\ud0a8\ub2e4. 
	 * \uc8fc\ub85c \uc678\ubd80\uc5d0\uc11c processor\ub97c \uc774\uc6a9\ud574 DOM\uc870\uc791\uc744 \ud560 \uacbd\uc6b0\uc5d0 \uc0ac\uc6a9\ub41c\ub2e4.
	 * @param {Funtion} handler - \ud574\ub2f9 \uc601\uc5ed\uc5d0 \uc2e4\ud589\ud560 \ud568\uc218
	 * @example
	 * 	processor.execWithMarker(function(marker) {
	 *		$tom.insertAt(node, marker.endMarker);
	 *  });
	 */
	execWithMarker: function(handler) { 
		var _marker = new Trex.Canvas.Marker(this);
		this.bookmarkTo();
		try {
			_marker.paste();
			_marker.backup();
			handler(_marker);
		} catch(e) {
			console.log(e)
		} finally {
			_marker.remove();
		}	
	},
	/*-------- processor - marker end --------*/
	/*--------------------- focus, movecaret ----------------------*/
	/**
	 * wysiwyg \uc601\uc5ed\uc5d0 \ud3ec\ucee4\uc2a4\ub97c \uc900\ub2e4.
	 * @example
	 * 	processor.focus();
	 */
	focus: function() {
		this.win.focus();
	},
	/**
	 * wysiwyg \uc601\uc5ed\uc5d0 \ud3ec\ucee4\uc2a4\ub97c \ube80\ub2e4.
	 * @example
	 * 	processor.blur();
	 */
	blur: function() {
		window.focus(); //NOTE: by focused on parent window, editor will be blured
	},
	/**
	 * \ubcf8\ubb38\uc758 \ucc98\uc74c\uc73c\ub85c \uce90\ub7ff\uc744 \uc62e\uae34\ub2e4.
	 * @example
	 * 	processor.focusOnTop();
	 */
	focusOnTop: function() {
		this.win.focus();
		this.moveCaretTo(this.doc.body, true);
		this.doc.body.scrollTop = 0; //NOTE: only html, not xhtml
	},
	/**
	 * \ubcf8\ubb38\uc758 \ub9c8\uc9c0\ub9c9\uc73c\ub85c \uce90\ub7ff\uc744 \uc62e\uae34\ub2e4.
	 * @example
	 * 	processor.focusOnBottom();
	 */
	focusOnBottom: function() {
		this.win.focus();
		this.moveCaretTo(this.doc.body, false);
		this.doc.body.scrollTop = this.doc.body.scrollHeight; //NOTE: only html, not xhtml
	},
	/**
	 * \ud2b9\uc815 \ub178\ub4dc\ub85c \uce90\ub7ff\uc744 \uc62e\uae34\ub2e4.
	 * @param {Element} node - \ud2b9\uc815 \ub178\ub4dc
	 * @param {Boolean} toStart - \uc704\uce58, \uc2dc\uc791 = true
	 * @example
	 * 	processor.moveCaretTo(node, true);
	 */
	moveCaretTo: function(node, toStart) {
		if(!node) {
			return;
		}
		this.bookmarkInto(node, toStart);
		this.bookmark.select(this.txSelection);
	},
	/**
	 * \ud2b9\uc815 \ub178\ub4dc\uc758 \ubc14\uae65\uc73c\ub85c \uce90\ub7ff\uc744 \uc62e\uae34\ub2e4.
	 * @param {String} scope - \ud2b9\uc815 \ub178\ub4dc \ud328\ud134
	 * @example
	 * 	processor.moveCaretWith(scope);
	 */
	moveCaretWith: function(scope) {
		if(!scope) { return; }
		var _elOuter = this.findNode(scope);
		if(_elOuter) {
			this.bookmark.saveNextTo(_elOuter);
			this.bookmark.select(this.txSelection);
		}
	},
	/**
	 * \ud2b9\uc815 \ub178\ub4dc\ub97c \uac10\uc2f8 \uc120\ud0dd\ud55c\ub2e4.
	 * @param {Element} node - \ud2b9\uc815 \ub178\ub4dc
	 * @example
	 * 	processor.selectAround(node);
	 */
	selectAround: function(node) {
		if(!node) {
			return;
		}
		this.bookmark.saveAroundNode(node);
		this.bookmark.select(this.txSelection);
	},
	/**
	 * \ud2b9\uc815 \ub178\ub4dc\uc758 \uc548\uc73c\ub85c \ubd81\ub9c8\ud06c\ub97c \uc218\uc815\ud55c\ub2e4.
	 * @param {Element} node - \ud2b9\uc815 \ub178\ub4dc
	 * @example
	 * 	processor.bookmarkInto(node);
	 */
	bookmarkInto: function(node, toStart) {
		if(!node) {
			return;
		}
		toStart = (toStart == null)? true: toStart;
		if(toStart) {
			this.bookmark.saveIntoFirst(node);
		} else {
			this.bookmark.saveIntoLast(node);
		}
	},
	/**
	 * \ud2b9\uc815 \ub178\ub4dc\uc758 \uc774\uc804\uc73c\ub85c \ubd81\ub9c8\ud06c\ub97c \uc218\uc815\ud55c\ub2e4.
	 * @param {Element} node - \ud2b9\uc815 \ub178\ub4dc
	 * @example
	 * 	processor.bookmarkToPrevious(node);
	 */
	bookmarkToPrevious: function(node) {
		if(!node) {
			return;
		}
		this.bookmark.savePreviousTo(node);
	},
	/**
	 * \ud2b9\uc815 \ub178\ub4dc\uc758 \ub2e4\uc74c\uc73c\ub85c \ubd81\ub9c8\ud06c\ub97c \uc218\uc815\ud55c\ub2e4.
	 * @param {Element} node - \ud2b9\uc815 \ub178\ub4dc
	 * @example
	 * 	processor.bookmarkToNext(node);
	 */
	bookmarkToNext: function(node) {
		if(!node) {
			return;
		}
		this.bookmark.saveNextTo(node);
	},
	/**
	 * execute\ud558\uae30 \uc804 range\ub97c \ubd81\ub9c8\ud06c\ud55c\ub2e4.
	 * @example
	 * 	processor.bookmark();
	 */
	bookmarkTo: function(rng) {
		rng = rng || this.txSelection.getRange(); 
		this.bookmark.save({
			startContainer: rng.startContainer,
			startOffset: rng.startOffset,
			endContainer: rng.endContainer,
			endOffset: rng.endOffset
		});
	},
	/**
	 * marker\uc5d0 \ub530\ub77c \ubd81\ub9c8\ud06c\ub97c \uc218\uc815\ud55c\ub2e4.
	 * @example
	 * 	processor.bookmarkWithMarker(marker);
	 */
	bookmarkWithMarker: function(marker) {
		this.bookmark.saveWithMarker(marker);
	},
	/**
	 * \uc800\uc7a5\ud55c range\ub97c \uc120\ud0dd\ud55c\ub2e4.
	 * @param {Object} bookmark - \uc800\uc7a5\ud588\ub358 meta Range \uac1d\uccb4 
	 * @example
	 * 	processor.restore(bookmark);
	 */
	restore: function() {
		this.bookmark.select(this.txSelection);
	},
	/*------------ execute action ------------*/
	/**
	 * \uc778\uc790\uc5d0 \ub530\ub77c \ub178\ub4dc\ub97c \uc0dd\uc131\ud55c\ub2e4.
	 * @param {String, Object, Element} argument - \uac00\ubcc0 arguments<br/>
	 * 			{String} name : 1st String\uc740 \ub178\ub4dc\uba85  <br/>
	 * 			{Object} attributes : \uc801\uc6a9\ud560 \uc18d\uc131\ub4e4  <br/>
	 * 			{Element, String, Number} children : \uc790\uc2dd \ub178\ub4dc 
	 * @example
	 * 	processor.create('div', { 'className': 'txc-textbox' });
	 */
	create: function() {
		var args = $A(arguments), name = args.shift();
		var _node = this.newNode(name);
		each(args, function(arg) {
			if (arg.nodeType) {
				$tom.append(_node, arg);
			} else if (typeof(arg) == 'string' || typeof(arg) == 'number') {
				_node.innerHTML += arg;
			} else if (typeof(arg) == 'array') {
				for (var i = 0; i < arg.length; i++) {
					$tom.append(_node, arg[i]);
				}
			} else {
				$tom.applyAttributes(_node, arg);
			}
		});
		return _node;
	},
	/**
	 * \uc120\ud0dd\ud55c \uc601\uc5ed\uc5d0 \ub178\ub4dc\ub97c \uc0bd\uc785\ud55c\ub2e4.
	 * @param {Array,Element} nodes - \uc0bd\uc785\ud558\uace0\uc790 \ud558\ub294 \ub178\ub4dc \ubc30\uc5f4 \ub610\ub294 \ub178\ub4dc
	 * @param {Boolean} newline - \ud604\uc7ac \uc601\uc5ed\uc5d0\uc11c \ud55c\uc904\uc744 \ub744\uc6b4 \ud6c4 \uc0bd\uc785\ud560\uc9c0 \uc5ec\ubd80
	 * @param {Object} wrapStyle - wrapper \ub178\ub4dc\uc5d0 \uc801\uc6a9\ud560 \uc2a4\ud0c0\uc77c, <br/>
	 * 					newline\uc774 true \uc77c \uacbd\uc6b0\uc5d0\ub9cc \uc758\ubbf8\ub97c \uac16\ub294\ub2e4.
	 * @example
	 * 	processor.pasteNode([node, node], true, { 'style': { 'textAlign': 'center' } });
	 */
	pasteNode: function(nodes, newline, wrapStyle) {
		if(!nodes) {
			return;
		}
		if(!nodes.length) {
			nodes = [].concat(nodes);
		}
		
		this.txSelection.collapse(false);
		var _rng = this.txSelection.getRange(); 
		if(newline) {
			/*
			 * (curNode) > wpNode > dvNode
			 */
			var _curNode, _wpNode, _dvNode;
			
			var _processor = this;
			this.execWithMarker(function(marker) {
				_curNode = $tom.find(marker.endMarker, 'p,li,dd,dt,h1,h2,h3,h4,h5,h6');
				if (_curNode) {
					_dvNode = $tom.divideParagraph(marker.endMarker);
				} else {
					_dvNode = _processor.newNode('p');
					$tom.insertAt(_dvNode, marker.endMarker);
				}
			});	
			if(_curNode) {
				_wpNode = $tom.clone(_dvNode);
			} else {
				_wpNode = this.newNode('p');
			}
			$tom.insertAt(_wpNode, _dvNode);
			nodes.each(function(node) {
				$tom.append(_wpNode, node);
			});
			if(wrapStyle) {
				$tom.applyAttributes(_wpNode, wrapStyle);
			}
			
			if(_curNode) {
				if(!$tom.hasData(_curNode)) {
					$tom.remove(_curNode);
				}
			}
			this.stuffNode(_dvNode);
			this.bookmark.saveIntoFirst(_dvNode);
				
		} else {
			this.execWithMarker(function(marker) {
				nodes.each(function(node) {
					$tom.insertNext(node, marker.endMarker);
				});
			});	
		}
		return nodes[0];
	},
	/**
	 * \uc120\ud0dd\ud55c \uc601\uc5ed\uc5d0 HTML \ucee8\ud150\uce20\ub97c \uc0bd\uc785\ud55c\ub2e4.
	 * @param {String} html - \uc0bd\uc785\ud558\uace0\uc790 \ud558\ub294 HTML \ucee8\ud150\uce20
	 * @param {Boolean} newline - \ud604\uc7ac \uc601\uc5ed\uc5d0\uc11c \ud55c\uc904\uc744 \ub744\uc6b4 \ud6c4 \uc0bd\uc785\ud560\uc9c0 \uc5ec\ubd80 true/false
	 * @param {Object} wrapStyle - wrapper \ub178\ub4dc\uc5d0 \uc801\uc6a9\ud560 \uc2a4\ud0c0\uc77c, <br/>
	 * 					newline\uc774 true \uc77c \uacbd\uc6b0\uc5d0\ub9cc \uc758\ubbf8\ub97c \uac16\ub294\ub2e4.
	 * @example
	 * 	processor.pasteNode('<img src="\uc774\ubbf8\uc9c0\uacbd\ub85c"/>', true, { 'style': { 'textAlign': 'center' } });
	 */
	pasteContent: function(html, newline, wrapStyle) {
		var _tmpNode = this.create('div');
		_tmpNode.innerHTML = html;
		var _dataNodes = $tom.children(_tmpNode);
		return this.pasteNode(_dataNodes, newline, wrapStyle);
	},
	/**
	 * \uc8fc\uc5b4\uc9c4 \ub178\ub4dc\ub97c \uc0c8\ub85c\uc6b4 \ub178\ub4dc\ub85c \uad50\uccb4\ud55c\ub2e4.
	 * @param {Element} node - \uae30\uc874 \ub178\ub4dc
	 * @param {String} tag - \uc0c8\ub85c\uc6b4 \ub178\ub4dc \uba85
	 * @param {Object} attributes - \uc0c8\ub85c\uc6b4 \ub178\ub4dc\uc5d0 \uc801\uc6a9\ud560 \uc18d\uc131\ub4e4
	 * @returns {Element} - \uc0dd\uc131\ud55c \ub178\ub4dc
	 * @example
	 * 	processor.replace(p, 'li');
	 */
	replace: function(node, tag, attributes) {
		this.bookmark.saveAroundNode(node);
		return $tom.replace(node, this.create(tag, attributes));
	},
	/**
	 * \uc120\ud0dd\ud55c \uc601\uc5ed\uc548\uc5d0 \uc788\ub294 \ub178\ub4dc \uc911\uc5d0 \ud328\ud134\uc744 \ub9cc\uc871\ud558\ub294 \ube14\ub7ed \ub178\ub4dc\ub4e4\uc744 \ub9ac\ud134\ud55c\ub2e4.
	 * @param {Array} filter - \uc218\uc9d1\ud560 \ub178\ub4dc \ud328\ud134 \uc870\uac74 
	 * @returns {Array} - \uc120\ud0dd\ud55c \uc601\uc5ed\uc548\uc5d0 \uc788\ub294 \ub178\ub4dc \uc911\uc5d0 \ud328\ud134\uc744 \ub9cc\uc871\ud558\ub294 \ub178\ub4dc\ub4e4
	 * @example
	 * 	processor.blocks(function() {
			return '%paragraph';
		});
	 */
	blocks: function(filter) {
		var _nodes = [];
		var _rng = this.getRange();
		var _patterns = filter();
		if (this.hasControl()) { 
			var _control = this.getControl();
			if ($tom.kindOf(_control.parentNode, _patterns)) { 
				_nodes.push(_control.parentNode);
			}
		} else {
			var _processor = this;
			this.execWithMarker(function(marker) {
				var _itr = _processor.getBlockRangeIterator(_patterns, marker.startMarker, marker.endMarker);
				var _node;
				while (_itr.hasNext()) {
					_node = _itr.next();
					if ($tom.kindOf(_node, '#tx_start_marker,#tx_end_marker')) {
						//ignore
					} else {
						_nodes.push(_node);
					}
				}
			});
		}
		return _nodes;
	},
	/**
	 * \uc120\ud0dd\ud55c \uc601\uc5ed\uc548\uc5d0 \uc788\ub294 \ub178\ub4dc \uc911\uc5d0 \ud328\ud134\uc744 \ub9cc\uc871\ud558\ub294 \uc778\ub77c\uc778 \ub178\ub4dc\ub4e4\uc744 \ub9ac\ud134\ud55c\ub2e4.
	 * @param {Array} filter - \uc218\uc9d1\ud560 \ub178\ub4dc \ud328\ud134 \uc870\uac74 
	 * @returns {Array} - \uc120\ud0dd\ud55c \uc601\uc5ed\uc548\uc5d0 \uc788\ub294 \ub178\ub4dc \uc911\uc5d0 \ud328\ud134\uc744 \ub9cc\uc871\ud558\ub294 \ub178\ub4dc\ub4e4
	 * @example
	 * 	processor.inlines(function(type) {
			if(type === 'control') {
				return 'hr,table';
			}
			return '%inline';
		});
	 */
	inlines: function(filter) {
		var _nodes = [];
		var _rng = this.getRange();
		var _patterns = filter();
		
		var _processor = this;
		var _createInline = function() {
			return _processor.create($tom.inlineOf());
		};
		
		if (this.hasControl()) { 
			var _control = this.getControl();
			if ($tom.kindOf(_control, _patterns)) { 
				_nodes.push(_control);
			} else {
				var _iNode = _createInline();
				$tom.insertNext(_iNode, _control);
				$tom.append(_iNode, _control);
			}
		} else {
			this.execWithMarker(function(marker) {
				if (marker.checkCollapsed()) { //collapsed
					var _iNode = _createInline();
					$tom.append(_iNode, _processor.newDummy());
					$tom.insertNext(_iNode, marker.startMarker);
					_processor.bookmarkTo({
						startContainer: _iNode,
						startOffset: 1,
						endContainer: _iNode,
						endOffset: 1
					});
					_nodes.push(_iNode);
				} else {
					var _itr = _processor.getInlineRangeIterator(_patterns, marker.startMarker, marker.endMarker);
					var _node;
					while (_itr.hasNext()) {
						_node = _itr.next();
						if ($tom.kindOf(_node, '#tx_start_marker,#tx_end_marker')) {
							//ignore
						} else if ($tom.kindOf(_node, 'br')) {
							//ignore
						} else {
							_nodes.push(_node);
						}
					}
				}
			});
		}
		return _nodes;
	},
	/**
	 * \uc120\ud0dd\ud55c \uc601\uc5ed\uc548\uc5d0 \uc788\ub294 \ub178\ub4dc \uc911\uc5d0 \ud328\ud134\uc744 \ub9cc\uc871\ud558\ub294 \ucee8\ud2b8\ub864 \ub178\ub4dc(img,object,hr,table,button)\ub4e4\uc744 \ub9ac\ud134\ud55c\ub2e4.
	 * @param {Array} condition - \uc218\uc9d1\ud560 \ub178\ub4dc \ud328\ud134 \uc870\uac74 
	 * @returns {Array} - \uc120\ud0dd\ud55c \uc601\uc5ed\uc548\uc5d0 \uc788\ub294 \ub178\ub4dc \uc911\uc5d0 \ud328\ud134\uc744 \ub9cc\uc871\ud558\ub294 \ub178\ub4dc\ub4e4
	 * @example
	 * 	processor.controls(function() {
			return 'hr,table';
		});
	 */
	controls: function(filter) {
		var _nodes = [];
		var _rng = this.getRange();
		if (this.hasControl()) { 
			if ($tom.kindOf(this.getControl(), filter())) { 
				_nodes.push(this.getControl());
			}
		} 
		return _nodes;
	},
	/**
	 * \ubc30\uc5f4 \ub0b4\uc758 \ubaa8\ub4e0 \ub178\ub4dc\uc5d0\uac8c \uc9c0\uc815\ud55c \uc18d\uc131\uc744 \uc801\uc6a9\ud55c\ub2e4.
	 * @param {Array} patterns - \uc18d\uc131\uc744 \uc801\uc6a9\ud560 \ub178\ub4dc \ubc30\uc5f4
	 * @param {Object} attributes - \ub178\ub4dc\uc5d0 \uc801\uc6a9\ud560 \uc18d\uc131\ub4e4
	 * @returns {Array} - \uc785\ub825 \ub178\ub4dc\ub4e4
	 * @example
	 * 	processor.apply([p,p,p], { style: { textAlign: 'center'}});
	 */
	apply: function(nodes, attributes) {
		if(!nodes) {
			return null;
		}
		if(!nodes.length) {
			nodes = [].concat(nodes);
		}
		nodes.each(function(node) {
			$tom.applyAttributes(node, attributes);
		});
		return nodes;
	},
	/**
	 * \ubc30\uc5f4 \ub0b4\uc758 \ubaa8\ub4e0 \ub178\ub4dc\ub97c \uc8fc\uc5b4\uc9c4 \ube14\ub7ed\uc73c\ub85c \uac10\uc2fc\ub2e4.
	 * @param {Array} patterns - \ube14\ub7ed\uc73c\ub85c \uac10\uc300 \ub178\ub4dc \ubc30\uc5f4
	 * @param {String} tag - \ube14\ub7ed \ub178\ub4dc \uba85
	 * @param {Object} attributes - \ube14\ub7ed\uc5d0 \uc801\uc6a9\ud560 \uc18d\uc131
	 * @returns {Element} - \uc0dd\uc131\ud55c \ube14\ub7ed\ub178\ub4dc
	 * @example
	 * 	processor.wrap([p,p,p], 'div', { style: { backgroundColor: 'black'}});
	 */
	wrap: function(nodes, tag, attributes) {
		if(!nodes) {
			return null;
		}
		if(!nodes.length) {
			nodes = [].concat(nodes);
		}
		attributes = attributes || {};
		return $tom.wrap(this.create(tag, attributes), nodes);
	},
	/**
	 * \ube14\ub7ed\uc73c\ub85c \uac10\uc2f8\uc9c4 \ub178\ub4dc\ub4e4\uc744 \ube7c\ub0b4\uace0 \ube14\ub7ed\uc744 \uc0ad\uc81c\ud55c\ub2e4.
	 * @param {Element} node - \ube14\ub7ed \ub178\ub4dc
	 * @returns {Element} - \ube14\ub7ed\uc758 \uccab\ubc88\uc9f8 \ub178\ub4dc \ub610\ub294 \ube14\ub7ed\uc758 \ub2e4\uc74c \ub178\ub4dc
	 * @example
	 * 	processor.unwrap(node);
	 */
	unwrap: function(node) {
		if (!node) {
			return;
		}
		this.bookmark.saveAroundNode(node);
		return $tom.unwrap(node);
	}
};

Trex.module("observe that @when control elements are focused at",
	function(editor, toolbar, sidebar, canvas, config) {
		if($tx.webkit || $tx.presto) {
			canvas.observeJob(Trex.Ev.__CANVAS_PANEL_MOUSEDOWN, function(ev) {
				var _processor = canvas.getProcessor();
				var _node = $tx.element(ev);
				if ($tom.kindOf(_node, "img,hr,iframe,table")) {
					var _processor = canvas.getProcessor();
					var _button = $tom.find(_node, 'button');
					if(_button) {
						_processor.selectControl(_button);
					} else {
						_processor.selectControl(_node);
					}
				} else if ($tom.kindOf(_node, "button")) {
					_processor.selectControl(_node);
				}
			});
		}
	}
);Trex.I.Processor.Trident = {
	/**
	 * Paragraph \ub97c \ucc44\uc6b4\ub2e4.
 	 * @private
 	 * @param {Node} node - paragraph \ub178\ub4dc
	 */
	stuffNode: function(node) {
		return $tom.stuff(node, this.newText(' '));
	},
	/**
	 * @private
	 * @memberOf Trex.Canvas.ProcessorP
	 * Trident\uc5d0\uc11c newlinepolicy\uac00 p\uc77c \uacbd\uc6b0 Enter Key \uc774\ubca4\ud2b8\uac00 \ubc1c\uc0dd\ud558\uba74 \uc2e4\ud589\ud55c\ub2e4. 
	 * @param {Event} ev - Enter Key \uc774\ubca4\ud2b8
	 */
	controlEnterByParagraph: function(ev) {
		var _bNode = this.findNode('div');
		if (!_bNode) { 
			throw $propagate;
		}
		
		var _pNode = this.findNode('%paragraph');
		if ($tom.kindOf(_pNode, 'p')) { 
			if($tom.first(_bNode, 'p') == _pNode) {
				var _dvNode;
				this.execWithMarker(function(marker) {
					_dvNode = $tom.divideParagraph(marker.endMarker);
				});
				this.stuffNode(_pNode);
				this.stuffNode(_dvNode);
				this.moveCaretTo(_dvNode);
			} else {
				throw $propagate;
			}
		} else if($tom.kindOf(_pNode, 'li,td,th,dd,dt')) {
			throw $propagate;
		} else {
			var _dvNode = this.newParagraph('p');
			this.execWithMarker(function(marker) {
				$tom.insertNext(_dvNode, marker.endMarker);
			});
			this.moveCaretTo(_dvNode);
		}
	},
	/**
	 * @private
	 * @memberOf Trex.Canvas.ProcessorBR
	 * Trident\uc5d0\uc11c newlinepolicy\uac00 br\uc77c \uacbd\uc6b0 Enter Key \uc774\ubca4\ud2b8\uac00 \ubc1c\uc0dd\ud558\uba74 \uc2e4\ud589\ud55c\ub2e4. 
	 * @param {Event} ev - Enter Key \uc774\ubca4\ud2b8
	 */
	controlEnterByLinebreak: function(ev){
		if (!!this.findNode('blockquote,div,p,strong,u,em,strike,span,font,td,body')) { 
			var _rng = this.getTxSel().getRange(); 
			_rng.pasteHTML("<br />\n");
			_rng.collapse(false);
			_rng.select();
		}
	}
};

Trex.module("delete image element @when backspace key event fires",
	function(editor, toolbar, sidebar, canvas, config) {
		if ($tx.msie) {
			canvas.observeKey({ 
				ctrlKey: false,
				altKey: false,
				shiftKey: false,
				keyCode: Trex.__KEY.BACKSPACE
			}, function(ev) {
				var _processor = canvas.getProcessor();
				if (_processor.hasControl() && _processor.getControl()) {
					try {
						var _node = _processor.getControl();
						$tom.remove(_node);
					} catch (e) { }
					throw $stop;
				}
			});
		}
	}
);

Trex.module("delete table element @when backspace key event fires",
	function(editor, toolbar, sidebar, canvas, config) {
		if ($tx.msie) {
			var _oldRangeLeftOffset;
			canvas.observeKey({ 
				ctrlKey: false,
				altKey: false,
				shiftKey: false,
				keyCode: Trex.__KEY.BACKSPACE
			}, function(ev) {
				var _processor = canvas.getProcessor();
				var _rng = _processor.getRange();
				try{
					if(_oldRangeLeftOffset == _rng.boundingLeft){
						var _el = $tom.previous(_processor.getNode());
						if($tom.kindOf(_el, "table")){
							$tom.remove(_el);	
						}	
					}
				}catch(e){ }
				_oldRangeLeftOffset = _rng.boundingLeft;
				throw $propagate;
			});
		}
	}
);

/*-------------------------------------------------------*/

Object.extend(Trex.I.Processor.Trident, {
	lastRange: null,
	shouldHandleOnActivate: true,
	restoreRange: function() { //TODO: rename
		if (!this.shouldHandleOnActivate) {
			return;
		}
		if (this.lastRange) {
			try {
				this.lastRange.select();
			} catch (e) {
				var _sel = this.getSel();
				var _type = _sel.type.toLowerCase();
				if (_type === "control") {
					_sel.empty();
					var _rng = _sel.createRange();
					_rng.collapse(false);
					_rng.select();
				}
			} finally {
				this.lastRange = null;
			}
		}
	}
});

Trex.module("bind iframe activate or deactivate event",
	function(editor, toolbar, sidebar, canvas, config) {
		if ($tx.msie) {
			canvas.observeJob(Trex.Ev.__IFRAME_LOAD_COMPLETE, function(panelDoc) {
				var _processor = canvas.getProcessor();
				
				$tx.observe(panelDoc, 'beforedeactivate', function(ev) {
					var _activation_between_inner_iframe_nodes = ev.toElement;
					if (_activation_between_inner_iframe_nodes) {
						_processor.shouldHandleOnActivate = false;
						_processor.lastRange = null;
					} else {
						var _node = $tx.element(ev);
						if (!_node || !$tom.isElement(_node)) {
							return;
						}
						// activation to outside of iframe 
						_processor.shouldHandleOnActivate = !$tom.kindOf(_node, 'iframe,object');
						_processor.lastRange = _processor.getRange();
					}
				});
				
				$tx.observe(panelDoc, 'activate', function(ev) { 
					_processor.lastRange = null; 
				});
				
			});
		}
	}
);
Trex.I.Processor.Gecko = {
	/**
	 * Paragraph \ub97c \ucc44\uc6b4\ub2e4.
 	 * @private
 	 * @param {Node} node - paragraph \ub178\ub4dc
	 */
	stuffNode: function(node) {
		return $tom.stuff(node, this.newNode('br'));
	},
	/**
	 * @private
	 * @memberOf Trex.Canvas.ProcessorP
	 * Gecko\uc5d0\uc11c newlinepolicy\uac00 p\uc77c \uacbd\uc6b0 Enter Key \uc774\ubca4\ud2b8\uac00 \ubc1c\uc0dd\ud558\uba74 \uc2e4\ud589\ud55c\ub2e4. 
	 * @param {Event} ev - Enter Key \uc774\ubca4\ud2b8
	 */
	controlEnterByParagraph: function(ev) {
		var _bNode = this.findNode('li,td,th');
		if (_bNode) { 
			throw $propagate;
		}
		
		var _btnNode = this.findNode("button");
		if(_btnNode) {
			this.moveCaretTo($tom.next(_btnNode));
			throw $propagate;
		}
		
		var _dvNode;
		this.getTxSel().collapse(false);
		var _wNode = this.findNode('%paragraph');
		if (_wNode) {
			this.execWithMarker(function(marker) {
				_dvNode = $tom.divideParagraph(marker.endMarker);
			});
			this.stuffNode(_wNode);
		} else {
			_dvNode = this.newParagraph('p');
			this.execWithMarker(function(marker) {
				$tom.insertAt(_dvNode, marker.endMarker);
			});
		}
		this.stuffNode(_dvNode);
		this.restoreScrollTop(_dvNode);
		this.moveCaretTo(_dvNode);
	},
	/**
	 * @private
	 * @memberOf Trex.Canvas.ProcessorBR
	 * Gecko\uc5d0\uc11c newlinepolicy\uac00 br\uc77c \uacbd\uc6b0 Enter Key \uc774\ubca4\ud2b8\uac00 \ubc1c\uc0dd\ud558\uba74 \uc2e4\ud589\ud55c\ub2e4. 
	 * @param {Event} ev - Enter Key \uc774\ubca4\ud2b8
	 */
	controlEnterByLinebreak: function(ev) {
		throw $propagate;
	}
};
	
Trex.I.Processor.Webkit = {
	/**
	 * Paragraph \ub97c \ucc44\uc6b4\ub2e4.
 	 * @private
 	 * @param {Node} node - paragraph \ub178\ub4dc
	 */
	stuffNode: function(node) {
		return $tom.stuff(node, this.newNode('br'));
	},
	/**
	 * @private
	 * @memberOf Trex.Canvas.ProcessorP
	 * Webkit\uc5d0\uc11c newlinepolicy\uac00 p\uc77c \uacbd\uc6b0 Enter Key \uc774\ubca4\ud2b8\uac00 \ubc1c\uc0dd\ud558\uba74 \uc2e4\ud589\ud55c\ub2e4. 
	 * @param {Event} ev - Enter Key \uc774\ubca4\ud2b8
	 */
	controlEnterByParagraph: function(ev) {
		var _iNode = this.findNode('span');
		if(!_iNode || !_iNode.style.backgroundColor) {
			throw $propagate;
		}
		
		var _pNode = this.findNode('%paragraph');
		var _dvNode;
		this.execWithMarker(function(marker) {
			_dvNode = $tom.divideParagraph(marker.endMarker);
		});
		this.stuffNode(_pNode);
		this.stuffNode(_dvNode);
		this.moveCaretTo(_dvNode);
	},
	/**
	 * @private
	 * @memberOf Trex.Canvas.ProcessorBR
	 * Webkit\uc5d0\uc11c newlinepolicy\uac00 br\uc77c \uacbd\uc6b0 Enter Key \uc774\ubca4\ud2b8\uac00 \ubc1c\uc0dd\ud558\uba74 \uc2e4\ud589\ud55c\ub2e4. 
	 * @param {Event} ev - Enter Key \uc774\ubca4\ud2b8
	 */
	controlEnterByLinebreak: function(ev) {
		var _processor = this;
		var _rng = this.getRange(false);
		var _parent = _rng.endContainer.parentNode;
		
		if (_parent && (_parent.tagName == "P" || _parent.tagName == "DIV" || _parent.tagName == "BODY" || _parent.tagName == "BLOCKQUOTE")) {
			
			if(_parent.tagName == "BLOCKQUOTE" || $tx.hasClassName(_parent, "txc-textbox") || $tx.hasClassName(_parent, "txc-moreless")){
				$tx.stop(ev);
				var _brNode = _processor.win.br();
				_rng.insertNode(_brNode);
				_rng.selectNode(_brNode);
				_rng.collapse(false);	
				_brNode = _processor.win.br();
				_rng.insertNode(_brNode);
				_rng.selectNode(_brNode);
				_rng.collapse(false);	
				
				var _rng = _processor.getRange(false);
				_rng.selectNodeContents(_brNode.nextSibling);
				
				var _sel = _processor.getSel();
				_sel.removeAllRanges();
				_sel.addRange(_rng);
				_sel.collapseToStart();
			}
		}	
	}
};
Trex.I.Processor.Presto = {
	/**
	 * Paragraph \ub97c \ucc44\uc6b4\ub2e4.
 	 * @private
 	 * @param {Node} node - paragraph \ub178\ub4dc
	 */
	stuffNode: function(node) {
		return $tom.stuff(node, this.newNode('br'));
	}
};

Trex.I.Processor.StandardP = {
	putBogusParagraph: function() {
		var _body = this.doc.body;
		var _lastChild = $tom.last(_body);
		if (_lastChild && $tom.kindOf(_lastChild, 'p')) {
			return;
		}
		var _newChild = this.newParagraph('p');
		if($tom.kindOf(_lastChild, "br")) {
			$tom.replace(_lastChild, _newChild);
		} else {
			$tom.append(_body, _newChild);
		}
	}
};


Trex.module("put bogus paragraph @when any key event fires",
	function(editor, toolbar, sidebar, canvas, config) {
		if($tx.msie) {
			return;
		}
		if (canvas.config.newlinepolicy == "p") {
			canvas.reserveJob(Trex.Ev.__CANVAS_PANEL_KEYUP, function(ev){
				if (!canvas.canHTML()) {
					return;
				}
				var _processor = canvas.getProcessor();
				_processor.putBogusParagraph();
			}, 10);
		}
	}
);

Trex.I.Processor.TridentP = {
	
};

Trex.I.Processor.GeckoP = {
	restoreScrollTop: function(node) {
		if(!node) {
			return;
		}
		if(this.win.innerHeight < this.doc.documentElement.offsetHeight){
			var _oldTop = document.documentElement.scrollTop;				
			$tom.goInto(node, false);
			document.documentElement.scrollTop = _oldTop;					
		}
	}
};

Trex.I.Processor.WebkitP = {

};
Trex.I.Processor.PrestoP = {
	
};

var Split = function(){
	this.initialize.apply(this, arguments);
};
Split.prototype = {
	initialize: function(root, props){
		this.root = root;
		this.clonePolicy = props.clonePolicy ? props.clonePolicy : "backend";
		this.target = props.target ? props.target : null;
		this.filter =  props.filter ? props.filter : true;
	},
	run: function(){
		return this.split(this.target);
	},
	split: function(target){
		var _t = target;
		var _p = _t.parentNode;
		if(_p.nodeName == "BODY"){
			return;
		}
		if(!this.filter(_t)){
			return _t;
		}
		var _pClone;
		if(_p && _p !== this.root){
			_pClone = _p.cloneNode(false);
			if(this.clonePolicy == "backend"){
				do{
					var tmp = _t.nextSibling;
					_pClone.appendChild(_t);
					var _t = tmp;
				} while(_t);
				
				if(_p.nextSibling){
					_p.parentNode.insertBefore(_pClone, _p.nextSibling);
				}else{
					_p.parentNode.appendChild(_pClone);
				}
				this.split(_pClone);
			}else if(this.clonePolicy == "frontend"){
				do{
					var tmp = _t.previousSibling;
					if(!_pClone.firstChild){
						_pClone.appendChild(_t);
					}else{
						_pClone.insertBefore(_t, _pClone.firstChild);
					}
					_t = tmp;
				} while(_t);
				
				_p.parentNode.insertBefore(_pClone, _p);
				this.split(_pClone);
			}
		}else{
			//console.log("Finished");
		}		
		return _pClone;
	}
};

Trex.I.Processor.StandardBR = {
	expand: function (txRng){
		this.moveStartElement(txRng.beforeStart);
		this.moveEndElement(txRng.afterEnd);
	},
	moveStartElement: function(beforeStart){
		var found, last;
		var tagList = ["P", "DIV", "OL", "UL", "LI", "BLOCKQUOTE", "TABLE", "TR", "TD", "BODY"];
		this.walkBetweenNodesDesc(beforeStart, this.doc.body.firstChild,
			function(node){
				last = node;
				if (!found) {
					if (node.nodeType != 1) {
						return;
					}
					if (node.nodeName == "BR") {
						found = node;
					} else {
						var res = tagList.detect(function(tag){
							if (tag == node.nodeName) {
								found = node;
								return true;
							}
							return false;
						});
					}
				}
			}
		);
		if(!found ){
			found = last.parentNode;
		}
		if (found.nodeName == "BR") {
			if (found.nextSibling) {
				found.parentNode.insertBefore(beforeStart, found.nextSibling);
			} else {
				found.parentNode.appendChild(beforeStart);
			}
		} else {
			if (this.isParentOf(beforeStart, found)) {
				found.insertBefore(beforeStart, found.firstChild);
			} else {
				found.parentNode.insertBefore(beforeStart, found.nextSibling);
			}
		}	
	},
	moveEndElement: function(afterEnd){
		var found, last;
		var tagList = ["P", "DIV", "OL", "UL", "LI", "BLOCKQUOTE", "TABLE", "TR", "TD", "BODY"];
		this.walkBetweenNodes2(afterEnd, this.doc.body.lastChild,
			function(node){
				last = node;
				if (!found) {
					if (node.nodeType != 1) {
						return;
					}
					if (node.nodeName == "BR") {
						found = node;
					} else {
						tagList.detect(function(tag){
							if (tag == node.nodeName) {
								found = node;
								return true;
							}
							return false;
						});
					}
				}
			}
		);
		if(!found ){
			found = last || afterEnd.parentNode.lastChild;
		}
		if (found.nodeName == "BR") {
			if (found.nextSibling) {
				found.parentNode.insertBefore(afterEnd, found.nextSibling);
			} else {
				found.parentNode.appendChild(afterEnd);
			}
		} else {
			if (this.isParentOf(afterEnd, found)) {
				found.appendChild(afterEnd);
			} else {
				found.parentNode.insertBefore(afterEnd, found);
			}
		}	
	},
	findSameParent: function(node1, node2){
		var output;
		var node1Parents  = [node1];
		var loop = node1;
		while	(loop.nodeName != "BODY"){
			loop = loop.parentNode;
			node1Parents.push(loop);
		}
		loop = node2;
		while	(loop.nodeName != "BODY"){
			for(var i = 0; i < node1Parents.length; i++){
				if(node1Parents[i] === loop){
					output = node1Parents[i];
					break;
				}
			}
			loop = loop.parentNode;
		}R
		return (output || this.doc.body); 
	},
	hasSameTagName: function(nodeList){
		var _tagName;
		for(var i = 0; i < nodeList.length; i ++){
			var _node = nodeList[i];
			if(!_tagName){
				_tagName = _node.tagName;	
			}else{
				if(_tagName != _node.tagName){
					return false;
				}
			}
		}
		return _tagName;
	},
	collectTextNodesBetweenMarkers: function(beforeStart, afterEnd) {
		var _nodelist = [];
		this.walkBetweenNodes(beforeStart, afterEnd, function(node) {
			if(node.nodeType == 3) {
				if(!node.nodeValue.match(new RegExp('^[\s\t\n]+$'))) {
					_nodelist.push(node);
				}
			} else if($tom.kindOf(node, "img")) {
				_nodelist.push(node);
			}
		});
		return _nodelist; 
	},
	walkBetweenNodes2: function(startNode, endNode, fn) {
		var TRAILING = 0; 
		var LEADING = 1;
		var node = startNode, edge = LEADING;
		var update = function(newNode, newEdge) {
			node = newNode; 
			edge = newEdge;
			//if(edge == LEADING) {
				fn(node);
			//}
		};
		if (startNode === endNode) {
			fn(startNode);
		} else {
			do {
				if (node.firstChild && edge != TRAILING) {
					update(node.firstChild, LEADING);
				} else if (node.nextSibling) {
					update(node.nextSibling, LEADING);
				} else if (node.parentNode) {
					update(node.parentNode, TRAILING);
				}
			} while (node != endNode);
		}
	},
	walkBetweenNodes: function(startNode, endNode, fn) {
		var TRAILING = 0; 
		var LEADING = 1;
		var node = startNode, edge = LEADING;
		var update = function(newNode, newEdge) {
			node = newNode; 
			edge = newEdge;
			if(edge == LEADING) {
				fn(node);
			}
		};
		if (startNode === endNode) {
			fn(startNode);
		} else {
			do {
				if (node.firstChild && edge != TRAILING) {
					update(node.firstChild, LEADING);
				} else if (node.nextSibling) {
					update(node.nextSibling, LEADING);
				} else if (node.parentNode) {
					update(node.parentNode, TRAILING);
				}
			} while (node != endNode);
		}
	},
	walkBetweenNodesDesc: function(startNode, endNode, fn) {
		var TRAILING = 0; 
		var LEADING = 1;
		var node = startNode, edge = LEADING;
		var update = function(newNode, newEdge) {
			node = newNode; 
			edge = newEdge;
			//if(edge == LEADING) {
				fn(node);
			//}
		};
		if (startNode === endNode) {
			fn(startNode);
		} else {
			do {
				if (node.lastChild && edge != TRAILING) {
					update(node.lastChild, LEADING);
				}else if (node.previousSibling) {
					update(node.previousSibling, LEADING);
				}else if (node.parentNode) {
					update(node.parentNode, TRAILING);
				}
			} while (node != endNode);
		}
	},
	exec: function(fn, isexpand){
		try{
			var txRng = this.getTxRange(this.getRange());
			if(isexpand){
				this.expand(txRng);	
			}
			var landmark = this.tidy(txRng);
			if(fn){
				fn(landmark);
			}
		}finally{
			this.clean();	
		}
  	},
	groupInlineElementsWith: function(tagName, start, end ){
		if (start === end) {
			return [start];
		} else if (start.nextSibling === end) {
			return [start, end];
		}
		var collection = [];
		var block = this.doc.createElement(tagName);
		
		var startTag = start.nodeName;
		var endTag = end.nodeName;
		var isParentOfnodeCollected = false;
		var loop = start;
		do{
			if(loop.nodeType == 1 && 
				( loop.nodeName == "UL" || 
				  loop.nodeName == "OL" || 
				  loop.nodeName == "TABLE" || 
				  loop.nodeName == "TR" ||
				  loop.nodeName == "DIV" ||
				  loop.nodeName == "P" )
			){
				if(!isParentOfnodeCollected){
					collection.push(loop);
				}
				if (block.hasChildNodes()) {
					loop.parentNode.insertBefore(block, loop);
					collection.push(block);
					block = this.doc.createElement("div");
				}
			} else if ( loop.nodeName == "LI" || loop.nodeName == "TD" ){
				collection.push(loop);					
			} else {
				var tmp = loop.previousSibling;
				block.appendChild(loop);
				loop = tmp;
			} 
			if(loop.nextSibling){
				loop = loop.nextSibling;
				isParentOfnodeCollected = false;
			}else{
				loop = loop.parentNode;
				isParentOfnodeCollected = true;
			}
			if( startTag == "TD" && 
				(loop.nodeName == "TD" || loop.nodeName == "TR" ||	 loop.nodeName == "TH" || loop.nodeName == "TABLE" ) ){
			}else if(startTag == "LI" && 	(loop.nodeName == "LI" || loop.nodeName == "OL" || loop.nodeName == "UL"  )){
			}else if(startTag == "P"  || startTag == "DIV"){
				if(loop.nodeType == 3){
				}else if ( loop.nodeName == "TABLE" ||  loop.nodeName == "OL" ||  loop.nodeName == "UL"  ) {
					if( endTag == "LI" || endTag == "TD"){
						collection.push(loop);
						break;	
					}
				}
			} else {
				break;
			}
			if (loop === end) {
				collection.push(loop);
				break; 
			}else if(loop.nodeName == "BODY"){
				break;
			}
		}while(true);
		return collection;	
	},
	tidy: function(txRng){
		var isMatched= function(_el){
			return ["P", "UL", "OL", "TABLE", "DIV"].detect(
				function(tag){ 
					if(_el.nodeType == 1 && tag == _el.nodeName){ 
						if(tag == "DIV"){
							if(_el.className == "txc-textbox" || _el.className == "txc-moreless" ){
								return false;
							}	
						}
						return true;
					} else{
						return false;
					}
				}
			);
		};
		
		var filterFn = function(node){
			var parent = node.parentNode;
			if(parent.nodeName == "BODY"){
				return false;
			}else if(parent.nodeName == "UL"  ||  parent.nodeName == "OL"){
				return false;
			}else if(parent.nodeName == "TBODY" || parent.nodeName == "TD" || parent.nodeName == "TR"  ||  parent.nodeName == "TABLE"){
				return false;
			}else if(parent.className == "txc-textbox" || parent.className == "txc-moreless" ){
				return false;
			}	
			return true;
		};
		
		var start, end;
		var fromElement = txRng.beforeStart;
		var toElement = txRng.afterEnd;
		if(fromElement.parentNode.nodeName == "BODY" ||
			fromElement.parentNode.className == "txc-textbox" ||
			fromElement.parentNode.className == "txc-moreless"
		){
			var dest = this.doc.createElement("div");
			fromElement.parentNode.insertBefore(dest, fromElement);
			var _el = fromElement;
			while(true){
				if(!_el ){
					break;
				}
				if(isMatched(_el)){
					break;
				}
				dest.appendChild(_el);
				_el = dest.nextSibling;
			}
			start = dest;
		}else{
			start = new Split(this.doc.body, { 
				clonePolicy: "frontend", 
				target: fromElement,
				filter: filterFn
			}).run();
			if(start.nodeName == "LI" ||  start.nodeName == "UL" || start.nodeName == "OL" ){
				start = start.nextSibling;
			}else{
				while(
					!(start.parentNode.nodeName == "BODY" ||
					start.parentNode.className == "txc-textbox" || 
					start.parentNode.className == "txc-moreless")
				){
					start = start.parentNode;	
				}
				start = start.nextSibling;	
			}
		}
		
		if(toElement.parentNode.nodeName == "BODY"){	
			var dest = this.doc.createElement("div");
			if(toElement.nextSibling){
				toElement.parentNode.insertBefore(dest, toElement.nextSibling);
			}else{
				toElement.parentNode.appendChild(dest);
			}
			var _el = toElement;
			while(true){
				if(!_el){
					break;
				}
				if(isMatched(_el)){
					break;
				}
				if(dest.hasChildNodes()){
					dest.insertBefore(_el, dest.firstChild);
				}else{
					dest.appendChild(_el);
				}
				_el = dest.previousSibling;
			}
			end = dest;
		}else{
			end = new Split(this.doc.body, { 
				clonePolicy: "backend", 
				target: toElement,
				filter: filterFn
			}).run();
			if (end.nodeName == "LI" || end.nodeName == "UL" || end.nodeName == "OL") {
				end = end.previousSibling;
			} else {
				while(
					!(end.parentNode.nodeName == "BODY" ||
					end.parentNode.className == "txc-textbox" || 
					end.parentNode.className == "txc-moreless")
				){
					end = end.parentNode;
				}
				end = end.previousSibling;
			}

		}
		return {
			startElement: start,
			endElement: end
		};
	},
	clean: function (){
		var m1 = this.doc.getElementById("tx_beforestart_mark");
		if(m1){
			var p = m1.parentNode;
			if(p.childNodes.length == 1){
				p.parentNode.removeChild(p);
			}else{
				m1.parentNode.removeChild(m1);
			}
		}
		var m2 = this.doc.getElementById("tx_afterend_mark");
		if(m2){
			if(m2.parentNode.childNodes.length != 1){
				m2.parentNode.removeChild(m2);
			}else{
				var c = m2;
				var p = c.parentNode;
				while(true){
					if(p.childNodes.length == 1){
						c = p;
						p = p.parentNode;
					}else{
						break;
					}
				}
				c.parentNode.removeChild(c);	
			}
		}	
	},
	isParentOf: function(target, parent){
		var loop = target.parentNode;
		var res = false;
		while(loop){
			if(loop === parent){
				res = true;
				break;
			}
			loop = loop.parentNode;
		}
		return res;
	},
	/* find current block */
	applyAttributesGroupByParagraph: function(attributes) {	// Align
		var _self = this;
		this.exec( 
			function(landmark){
				var coll =  _self.groupInlineElementsWith("div", landmark.startElement, landmark.endElement);
				coll.each(function(node){
					$tom.applyAttributes(node, attributes);
				});
				try {
					_self.selectNodes(coll);
				}catch (e) { 
					console.log(e); 
				}
			}, 
			true
		);
	},
/*** wrap **/
	wrapInBlock:  function(element, attributes) {
		this.wrapWith(element, attributes, false);
	},
	wrapWith: function(element, attributes, collapse) {
		var _collapse = collapse ? collapse : false;
		var _range= this.getRange();
		
		var _el;
		if ($tx.msie) {
			try{
				_el = this.win[element](attributes);
				_el.setAttribute("id", "tmp_wrapped_item");
				_el.innerHTML = _range.htmlText != "" ? _range.htmlText + "<br />" : "<br />";
				
				_range.pasteHTML(_el.outerHTML);
				_range.select();
				if (_collapse) {
					_range.collapse(false);
				}
				_el = this.doc.getElementById("tmp_wrapped_item");
				_el.removeAttribute("id");
			}finally{
				var tmpAttr = this.doc.getElementById("tmp_wrapped_item");
				if(tmpAttr){
					tmpAttr.removeAttribute("id");
				} 	
			}
			
		} else {
			var _selectedElements = _range.extractContents();
			if(_selectedElements.childNodes.length == 0 || _selectedElements.childNodes[0].nodeValue ==''){
				_selectedElements = this.win.br();
			}
			_el = this.win[element](attributes, _selectedElements);
			_range.insertNode(_el);
			_range.selectNode(_el);
			if (_collapse) {
				_range.collapse(false);
			}
		}
		this.moveCaretTo(_el);
		return true;
	},
	wrapInList:  function(element, attributes) {
		var _root = this.win[element](attributes ? attributes : {});
		this.wrapEachLineWith(_root, "li", {});
	},
	wrapEachLineWith: function(parent, child, attributes) {
		var _range = this.getRange();
		var _self = this;
		var _el;
		if ($tx.msie) {
			try{
				_el = _self.win[child](attributes);
				_el.setAttribute("id", "tmp_wrapped_item");
				_el.innerHTML = _range.htmlText;
				parent.appendChild(_el);
				_range.pasteHTML(parent.outerHTML);
				_range.select();
				_range.collapse(false);
				_el = this.doc.getElementById("tmp_wrapped_item");
				_el.removeAttribute("id");
			}finally{
				var tmpAttr = this.doc.getElementById("tmp_wrapped_item");
				if(tmpAttr){
					tmpAttr.removeAttribute("id");
				} 	
			}
		} else {
			var _selectedElements = _range.extractContents();
			if(_selectedElements.childNodes.length == 0 || _selectedElements.childNodes[0].nodeValue ==''){
				_selectedElements = this.win.br();
			}
			_el = this.win[child](attributes, _selectedElements);
			parent.appendChild(_el);
			
			_range.insertNode(parent);
			_range.selectNode(parent);
			_range.collapse(false);
		}
		this.moveCaretTo(_el);
	},
	pasteContent:  function(textContent, newLine){
		this.paste(textContent);
		if (newLine) {
			this.paste("<br />");
		}
	},
	pasteNode:  function(nodeContent, newLine){
		var _dummy = this.win.div();
		_dummy.appendChild(nodeContent);
		this.paste(_dummy.innerHTML);
		if (newLine) {
			this.paste("<br />");
		}
		_dummy = null;
	},
	paste: function(textContent){
		var _range= this.getRange();
		if ($tx.msie) {
			var _text = textContent ? textContent : "<br />"; 
			_range.pasteHTML(_text);
			_range.select();
			_range.collapse(false);
		} else {
			var _dummy = this.win.div();
			_dummy.innerHTML = textContent;
			_range.extractContents();
			
			var hook = null;
			for(var l = 0, i = _dummy.childNodes.length - 1; i >= l; i--){
				var e = _dummy.childNodes[i];
				if(e){
					if(!hook){
						hook = e;
					}
					_range.insertNode(e);
				}
			}
			_range.selectNode(hook);
			_range.collapse(false);
			_dummy = null;
			hook = null;
		}
		var el = this.doc.getElementById("new_object");
		return el;
	},
	selectNodes: function(nodes){
		if (nodes.length == 0) {
			return;
		} else if (nodes.length == 1) {
			var _node = nodes[0];
			if (this.hasControl()) {
				var _clpsNode = this.win.span("\ufeff");
				$tom.insertAt(_clpsNode, _node);
				var _clpsRng = this.doc.body.createTextRange();
				_clpsRng.moveToElementText(_clpsNode);
				_clpsRng.collapse(true);
				$tom.remove(_clpsNode);
				_clpsRng.select();
			}
			var _rng = this.getRange();
			_rng.setEndPoint("EndToEnd", this.getPointedEndRange(_node, "<node>text^</node>"));
			try {
				_rng.setEndPoint("StartToStart", this.getPointedStartRange(_node, "<node>^text</node>"));
			} catch (e) {
				_rng.setEndPoint("StartToStart", this.getPointedStartRange(_node, "^<node>text</node>"));
			}
			_rng.select();
		} else {
			//CHECK
			var _rng = this.getRange();
			_rng.setEndPoint("EndToEnd", this.getPointedEndRange(nodes[nodes.length - 1], "<node>text^</node>"));
			_rng.setEndPoint("StartToStart", this.getPointedStartRange(nodes[0], "<node>^text</node>"));
			_rng.select();
		}
	},
	getPointedStartRange: function(node, type){
		var _rng = this.getRange();
		var _pntNode = this.win.span("\ufeff");
		if (type == "<node>^text</node>") {
			$tom.insertAt(_pntNode, node.firstChild);
			
			var _pntRng = this.doc.body.createTextRange();
			_pntRng.moveToElementText(_pntNode);
			_pntRng.collapse(false);
			if (_rng.compareEndPoints('EndToStart', _pntRng) == -1) {
				_rng.setEndPoint('EndToStart', _pntRng);
			}
			_rng.setEndPoint('StartToStart', _pntRng);
		} else if (type == "<node>text^</node>") {
			$tom.append(node, _pntNode);
			
			var _pntRng = this.doc.body.createTextRange();
			_pntRng.moveToElementText(_pntNode);
			_pntRng.collapse(true);
			if (_rng.compareEndPoints('EndToEnd', _pntRng) == -1) {
				_rng.setEndPoint('EndToEnd', _pntRng);
			}
			_rng.setEndPoint('StartToEnd', _pntRng);
		} else if (type == "^<node>text</node>") {
			$tom.insertAt(_pntNode, node);
			
			var _pntRng = this.doc.body.createTextRange();
			_pntRng.moveToElementText(_pntNode);
			_pntRng.collapse(true);
			if (_rng.compareEndPoints('EndToStart', _pntRng) == -1) {
				_rng.setEndPoint('EndToStart', _pntRng);
			}
			_rng.setEndPoint('StartToStart', _pntRng);
		} else if (type == "^<node>text</node>") {
			$tom.insertNext(_pntNode, node);
			
			var _pntRng = this.doc.body.createTextRange();
			_pntRng.moveToElementText(_pntNode);
			_pntRng.collapse(false);
			if (_rng.compareEndPoints('EndToEnd', _pntRng) == -1) {
				_rng.setEndPoint('EndToEnd', _pntRng);
			}
			_rng.setEndPoint('StartToEnd', _pntRng);
		}
		$tom.remove(_pntNode);
		return _rng;
	},
	getPointedEndRange: function(node, type){
		var _rng = this.getRange();
		var _pntNode = this.win.span("\ufeff");
		if (type == "<node>^text</node>") {
			$tom.insertAt(_pntNode, node.firstChild);
			
			var _pntRng = this.doc.body.createTextRange();
			_pntRng.moveToElementText(_pntNode);
			_pntRng.collapse(true);
			if (_rng.compareEndPoints('StartToEnd', _pntRng) == 1) {
				_rng.setEndPoint('StartToEnd', _pntRng);
			}
			_rng.setEndPoint('EndToEnd', _pntRng);
		} else if (type == "<node>text^</node>") {
			$tom.append(node, _pntNode);
			
			var _pntRng = this.doc.body.createTextRange();
			_pntRng.moveToElementText(_pntNode);
			_pntRng.collapse(false);
			if (_rng.compareEndPoints('StartToEnd', _pntRng) == 1) {
				_rng.setEndPoint('StartToEnd', _pntRng);
			}
			_rng.setEndPoint('EndToEnd', _pntRng);
		} else if (type == "^<node>text</node>") {
			$tom.insertAt(_pntNode, node);
			
			var _pntRng = this.doc.body.createTextRange();
			_pntRng.moveToElementText(_pntNode);
			_pntRng.collapse(false);
			if (_rng.compareEndPoints('StartToEnd', _pntRng) == 1) {
				_rng.setEndPoint('StartToEnd', _pntRng);
			}
			_rng.setEndPoint('EndToEnd', _pntRng);
		} else if (type == "^<node>text</node>") {
			$tom.insertNext(_pntNode, node);
			
			var _pntRng = this.doc.body.createTextRange();
			_pntRng.moveToElementText(_pntNode);
			_pntRng.collapse(true);
			if (_rng.compareEndPoints('StartToEnd', _pntRng) == 1) {
				_rng.setEndPoint('StartToEnd', _pntRng);
			}
			_rng.setEndPoint('EndToEnd', _pntRng);
		}
		$tom.remove(_pntNode);
		return _rng;
	},
/** wrap end */
	getTxRange: function(_rng){
		var _sel = this.getSel();
		var _rng = this.getRange();
		 
		var _collapsed =  _rng.collapsed;
		var _beforeStart =  this.win.span({ id: "tx_beforestart_mark"});
		var _afterEnd =  this.win.span({ id: "tx_afterend_mark"});
		
		var _startContainer = _rng.startContainer; 
		var _startOffset = _rng.startOffset; 
		var _endContainer = _rng.endContainer; 
		var _endOffset = _rng.endOffset;
		
		if(_endContainer.nodeType == 3) {
			_endContainer.splitText(_endOffset); 
			_endContainer.parentNode.insertBefore(_afterEnd, _endContainer.nextSibling);
		} else {
			_endContainer.insertBefore(_afterEnd, _endContainer.childNodes[_endOffset]);
		}

		if(_startContainer.nodeType == 3) {
			_startContainer.splitText(_startOffset); 
			_startContainer.parentNode.insertBefore(_beforeStart, _startContainer.nextSibling);
		} else {
			_startContainer.insertBefore(_beforeStart, _startContainer.childNodes[_startOffset]);
		}
		
		return {
			"beforeStart": _beforeStart,
			"afterEnd": _afterEnd,
			"rng": _rng,
			"collapsed": _collapsed 
		};
	}
};
	
Trex.I.Processor.TridentBR = {
	/** Overriding */
	/** End Override */
	getTxRange: function(_rng){
		var beforeStart, afterEnd;
		var _sel = this.getSel();
		if (_sel.type == "Control") {
			_node = _rng.item(0);
			
			beforeStart =  this.win.span({ id: "tx_beforestart_mark"});
			afterEnd =  this.win.span({ id: "tx_afterend_mark"});
			_node.parentNode.insertBefore(beforeStart, _node);
			if(_node.nextSibling){
				_node.parentNode.insertBefore(afterEnd, _node.nextSibling);
			}else{
				_node.parentNode.appendChild(_afterEnd);
			}

		} else {
			if (_rng.htmlText.length != 0) {
				var _rng1 = _rng.duplicate();
				var _rng2 = _rng.duplicate();
				
				_rng1.collapse(true);
				_rng1.pasteHTML('<span id="tx_beforestart_mark"></span>');
				
				_rng2.collapse(false);
				_rng2.pasteHTML('<span id="tx_afterend_mark"></span>');
				
				beforeStart = this.doc.getElementById('tx_beforestart_mark');
				afterEnd = this.doc.getElementById('tx_afterend_mark');
			} else {
				var _rng3 = _rng.duplicate();
				_rng3.collapse(false);
				_rng3.pasteHTML('<span id="tx_beforestart_mark"></span><span id="tx_afterend_mark"></span>');
				
				beforeStart = this.doc.getElementById('tx_beforestart_mark');
				afterEnd = this.doc.getElementById('tx_afterend_mark');
			}
			
			var length = _rng.htmlText.length;
		}
		return {
			"beforeStart": beforeStart,
			"afterEnd": afterEnd,
			"rng": _rng,
			"collapsed": (length == 0 ? true : false) 
		};
	}
};


Trex.I.Processor.GeckoBR = {
	changeAlign: function(attributes) {	// Align
		var  cmd;
		switch(attributes.style.textAlign){ 
			case "left" : cmd = "justifyleft"; break;
			case "center": cmd = "justifycenter"; break;
			case "right" : cmd = "justifyright"; break;
			case "justify" : cmd = "justifyfull"; break;
		}
		this.execCommand(cmd );
	}
};
  
Trex.I.Processor.WebkitBR = {
	changeAlign: function(attributes) {	// Align
	 	var  cmd;
		switch(attributes.style.textAlign){ 
			case "left" : cmd = "justifyleft"; break;
			case "center": cmd = "justifycenter"; break;
			case "right" : cmd = "justifyright"; break;
			case "justify" : cmd = "justifyfull"; break;
		}
		this.execCommand(cmd );
	}
};


Trex.I.Processor.PrestoBR = {
};


(function() {
	var BlockRangeIterator = Trex.Class.create({
		initialize: function(processor, patterns, start, end) {
			this.processor = processor;
			this.start = start;
			this.end = end || this.start;
			this.current = this.start;
		
			this.wTranslator = $tom.translate(patterns).extract('%wrapper');
			this.pTranslator = $tom.translate(patterns).extract('%paragraph');
		},
		hasNext: function() {
			return !!this.current;
		},
		next: function() {
			var _current = this.current;
			_current = this.find(_current);
			
			var _next = _current;
			
			if ($tom.include(_current, this.end)) {
				_next = null;
			} else {
				while(_next && !$tom.next(_next)) {
					_next = $tom.parent(_next);
					if($tom.isBody(_next)) {
						_next = null;
					}
				}
				if(_next) {
					_next = $tom.next(_next);
				}
			}
			if (_next == this.end) {
				_next = null;
			}
			this.current = _next;
			return _current;
		},
		find: function(node) {
			var _bNode;
			var _node = node;
			
			if(!$tom.hasContent(_node)) {
				return _node;
			}
			
			while(_node) {
				_bNode = _node;
				if($tom.isBody(_node)) {
					break;
				} 
				
				if($tom.kindOf(_node, this.wTranslator.getExpression())) {
					return _node;
				}
				
				if($tom.kindOf(_node, '%wrapper,%outergroup')) { 
					_node = $tom.descendant(_bNode, this.pTranslator.getExpression());
					if(_node) {
						return _node;
					}
					_node = $tom.descendant(_bNode, '%paragraph');
					if(_node) {
						_bNode = _node;
						break;
					}
				}
				
				if($tom.kindOf(_node, this.pTranslator.getExpression())) {
					return _node;
				}
				_node = _node.parentNode;
			}
			var _innerName = $tom.paragraphOf($tom.getName(_bNode));
			var _wNode = this.processor.newNode(_innerName);
			var _pNodes = $tom.extract(_bNode, node, '%text,%inline,img,object,embed,hr');
			$tom.wrap(_wNode, _pNodes);
			this.processor.stuffNode(_wNode);
			return _wNode;
		}
	});
	
	Object.extend(Trex.I.Processor.Standard, /** @lends Trex.Canvas.Processor.prototype */{
		/**
		 * @private
		 * \uc120\ud0dd\ud55c \uc601\uc5ed\uc548\uc5d0 \uc788\ub294 \ub178\ub4dc \uc911\uc5d0 \ud328\ud134\uc744 \ub9cc\uc871\ud558\ub294 \ube14\ub7ed \ub178\ub4dc\ub4e4\uc744 \ub9ac\ud134\ud55c\ub2e4.
		 * @param {String} pattern - \uc218\uc9d1\ud560 \ub178\ub4dc \ud328\ud134 \uc870\uac74 
		 * @param {Element} start - \uc2dc\uc791\ud558\ub294 \ub178\ub4dc(#tx_start_marker)
		 * @param {Element} end - \ub05d\ub098\ub294 \ub178\ub4dc(#tx_end_marker)
		 * @returns {Array} - \uc120\ud0dd\ud55c \uc601\uc5ed\uc548\uc5d0 \uc788\ub294 \ub178\ub4dc \uc911\uc5d0 \ud328\ud134\uc744 \ub9cc\uc871\ud558\ub294 \ub178\ub4dc\ub4e4
		 * @example
		 * 	processor.getBlockRangeIterator('div,p,li', node, node);
		 */
		getBlockRangeIterator: function(pattern, start, end) {
			return new BlockRangeIterator(this, pattern, start, end);
		}
	});
})();

(function() {
	var InlineRangeIterator = Trex.Class.create({
		initialize: function(processor, patterns, start, end) {
			this.processor = processor;
			this.start = start;
			this.end = end || this.start;
			this.current = this.start;
			
			this.iTranslator = $tom.translate(patterns).extract('%inline');
		},
		hasNext: function() {
			return !!this.current;
		},
		next: function() {
			var _current = this.current;
			_current = this.find(_current);
			
			var _next = _current;
			if (_current == this.end) {
				_next = null;
			} else {
				while(_next && !$tom.next(_next)) {
					_next = $tom.parent(_next);
					if($tom.isBody(_next)) {
						_next = null;
					}
				}
				if(_next) {
					_next = $tom.next(_next);
				}
			}
			if ($tom.include(_next, this.end)) {
				_next = $tom.top(_next, true);
			} 
			this.current = _next;
			return _current;
		},
		find: function(node) {
			var _node = node;
			if($tom.kindOf(_node, '%paragraph,%outergroup,%block') || $tom.isBody(_node)) {
				var _bNode = _node;
				_node = $tom.top(_bNode, true);
				if(!_node) {
					var _innerName = $tom.inlineOf();
					var _iNode = this.processor.create(_innerName);
					$tom.append(_bNode, _iNode);
					return _iNode;
				}
			}
			
			if($tom.kindOf(_node, 'br')) {
				return _node;
			} else if(!$tom.hasContent(_node)) {
				return _node;
			}
			
			if($tom.kindOf(_node, this.iTranslator.getExpression())) { 
				return _node;
			}
			
			var _innerName = $tom.inlineOf();
			var _iNode = this.processor.create(_innerName);
			$tom.insertAt(_iNode, _node);
			if(_node) {
				$tom.append(_iNode, _node);
			}
			return _iNode;
		}
	});
	
	Object.extend(Trex.I.Processor.Standard,  /** @lends Trex.Canvas.Processor.prototype */{
		/**
		 * @private
		 * \uc120\ud0dd\ud55c \uc601\uc5ed\uc548\uc5d0 \uc788\ub294 \ub178\ub4dc \uc911\uc5d0 \ud328\ud134\uc744 \ub9cc\uc871\ud558\ub294 \uc778\ub77c\uc778 \ub178\ub4dc\ub4e4\uc744 \ub9ac\ud134\ud55c\ub2e4.
		 * @param {String} pattern - \uc218\uc9d1\ud560 \ub178\ub4dc \ud328\ud134 \uc870\uac74 
		 * @param {Element} start - \uc2dc\uc791\ud558\ub294 \ub178\ub4dc(#tx_start_marker)
		 * @param {Element} end - \ub05d\ub098\ub294 \ub178\ub4dc(#tx_end_marker)
		 * @returns {Array} - \uc120\ud0dd\ud55c \uc601\uc5ed\uc548\uc5d0 \uc788\ub294 \ub178\ub4dc \uc911\uc5d0 \ud328\ud134\uc744 \ub9cc\uc871\ud558\ub294 \ub178\ub4dc\ub4e4
		 * @example
		 * 	processor.getInlineRangeIterator('span,font,a', node, node);
		 */
		getInlineRangeIterator: function(pattern, start, end) {
			return new InlineRangeIterator(this, pattern, start, end);
		}
	});
})();

(function() {
	var __CACHING_DOC = null;
	var __CACHING_NODE = {};
	var __CACHING_PARAGRAPH = {};
	Object.extend(Trex.I.Processor.Standard, /** @lends Trex.Canvas.Processor.prototype */{
		/**
		 * \ub178\ub4dc\ub97c \uc0dd\uc131\ud558\uc5ec \ub9ac\ud134\ud55c\ub2e4. \uce90\uc2f1\uc744 \uc0ac\uc6a9\ud558\uc5ec \uc774\ubbf8 \uc0dd\uc131\ud588\ub358 \ub178\ub4dc\ub294 \ubcf5\uc0ac\ud55c\ub2e4. 
		 * @private
		 * @param {String} name - \ub178\ub4dc\uba85
		 * @example
		 * 	processor.newNode('div');
		 */
		newNode: function(name) {
			if(__CACHING_DOC != this.doc) {
				__CACHING_NODE = {};
				__CACHING_DOC = this.doc;
			}
			if(!__CACHING_NODE[name]) {
				__CACHING_NODE[name] = this.win[name]();
			}
			return $tom.clone(__CACHING_NODE[name], false);
		},
		/**
		 * \ud14d\uc2a4\ud2b8 \ub178\ub4dc\ub97c \uc0dd\uc131\ud55c\ub2e4.
	 	 * @private
	 	 * @param {String} text - \ud14d\uc2a4\ud2b8\ub0b4\uc6a9
		 */
		newText: function(text) {
			return this.doc.createTextNode(text);
		},
		/**
		 * \ub178\ub4dc\ub97c \uc0dd\uc131\ud558\uc5ec \ub9ac\ud134\ud55c\ub2e4. \uce90\uc2f1\uc744 \uc0ac\uc6a9\ud558\uc5ec \uc774\ubbf8 \uc0dd\uc131\ud588\ub358 \ub178\ub4dc\ub294 \ubcf5\uc0ac\ud55c\ub2e4. 
		 * @private
		 * @param {String} name - \ub178\ub4dc\uba85
		 * @example
		 * 	processor.newParagraph('p');
		 */
		newParagraph: function(name) {
			if(__CACHING_DOC != this.doc) {
				__CACHING_PARAGRAPH = {};
				__CACHING_DOC = this.doc;
			}
			if(!__CACHING_PARAGRAPH[name]) {
				__CACHING_PARAGRAPH[name] = this.stuffNode(this.newNode(name));
			}
			return $tom.clone(__CACHING_PARAGRAPH[name], true);
		}
	});
})();


(function() {
	var __CACHING_DOC = null;
	var __CACHING_NODE = null;
	var __HAS_DUMMY = false;
	var __TEXT_GC_LIST = [];
	Object.extend(Trex.I.Processor.Standard, /** @lends Trex.Canvas.Processor.prototype */{
		/**
		 * \ube48 \ud14d\uc2a4\ud2b8 \ub178\ub4dc\ub97c \uc0dd\uc131\ud55c\ub2e4.
	 	 * @private
	 	 * @param {Boolean} keep - \uacc4\uc18d \uc720\uc9c0\ud560 \uac83\uc778\uc9c0 \uc5ec\ubd80 optional
		 */
		newDummy: function(keep) {
			keep = !!keep;
			if(__CACHING_DOC != this.doc) {
				__CACHING_NODE = null;
				__TEXT_GC_LIST = [];
				__CACHING_DOC = this.doc;
			}
			if(!__CACHING_NODE) {
				__CACHING_NODE = this.doc.createTextNode("\ufeff");
			}
			var _dummy = $tom.clone(__CACHING_NODE);
			if(!keep) {
				__TEXT_GC_LIST.push(_dummy);
				__HAS_DUMMY = true;
			}
			return _dummy;
		},
		/**
		 * \uc0dd\uc131\ub41c \ube48 \ud14d\uc2a4\ud2b8 \ub178\ub4dc\ub4e4\uc744 \uc0ad\uc81c\ud55c\ub2e4.
	 	 * @private
		 */
		clearDummy: function() {
			if(!__HAS_DUMMY) {
				return;
			}
			 for(var i=0,len=__TEXT_GC_LIST.length;i<len;i++) {
			 	try {
					var _dummy = __TEXT_GC_LIST.shift();
					if(_dummy && _dummy.nodeValue) {
						if(_dummy.nodeValue == "\ufeff") {
							$tom.remove(_dummy);
						} else {
							_dummy.nodeValue == _dummy.nodeValue.replace(/\ufeff/g, "");
						}
					} 
				} catch(e) {}
			 }
			 __HAS_DUMMY = false;
		}
	});
})();

/**
 * Wysiwyg \uc601\uc5ed\uc758 \ucee8\ud150\uce20\ub97c \uc870\uc791\ud558\uae30 \uc704\ud574 \uc0ac\uc6a9\ub418\uba70,  <br/>
 * browser\uc640 newlinepolicy\uc5d0 \ub530\ub77c \ud544\uc694\ud55c \ud568\uc218\ub4e4\uc744 mixin\ud55c\ub2e4. <br/>
 * \uc774 \uac1d\uccb4\ub97c \ud1b5\ud574\uc11c Bookmark, txSelection, Marker \uac1d\uccb4\uc5d0 \uc811\uadfc\ud55c\ub2e4. <br/>
 * canvas.getProcessor()\ub97c \ud1b5\ud574\uc11c \uc5bb\uac70\ub098 <br/>
 * canvas.execute(), canvas.query()\ub97c \ud1b5\ud574\uc11c processor\ub97c \uc5bb\uc5b4\uc11c \uc0ac\uc6a9\ud55c\ub2e4. <br/>
 *
 * @abstract
 * @class
 * @param {Object} win - Wysiwyg \uc601\uc5ed\uc758 window \uac1d\uccb4
 * @param {Object} doc - Wysiwyg \uc601\uc5ed\uc758 document \uac1d\uccb4
 * 
 * @example
 *	canvas.execute(function(processor) {
 *		processor.pasteContent('<img />', false);
 *	});
 * 
 *	var value = canvas.query(function(processor) {
 *		return processor.getText();
 *	});
 * 
 *	var _processor = canvas.getProcessor();
 *	_processor.focusOnTop();
 */
Trex.Canvas.Processor = Trex.Class.draft({
	/** @ignore */
	$mixins: [
		Trex.I.Processor.Standard,
		(($tx.msie)? Trex.I.Processor.Trident: {}),
		(($tx.gecko)? Trex.I.Processor.Gecko: {}),
		(($tx.webkit)? Trex.I.Processor.Webkit: {}),
		(($tx.presto)? Trex.I.Processor.Presto: {})
	]
});

/**
 * newlinepolicy\uac00 p\uc778 Wysiwyg Processor
 * @class
 * @extends Trex.Canvas.Processor
 * @param {Object} win - Wysiwyg \uc601\uc5ed\uc758 window \uac1d\uccb4
 * @param {Object} doc - Wysiwyg \uc601\uc5ed\uc758 document \uac1d\uccb4
 */
Trex.Canvas.ProcessorP = Trex.Class.create({
	/** ignore */
	$extend: Trex.Canvas.Processor,
	/** @ignore */
	$mixins: [
		Trex.I.Processor.StandardP,
		(($tx.msie)? Trex.I.Processor.TridentP: {}),
		(($tx.gecko)? Trex.I.Processor.GeckoP: {}),
		(($tx.webkit)? Trex.I.Processor.WebkitP: {}),
		(($tx.presto)? Trex.I.Processor.PrestoP: {})
	]
});

/**
 * newlinepolicy\uac00 br\uc778 Wysiwyg Processor
 *
 * @class
 * @extends Trex.Canvas.Processor
 * @param {Object} win - Wysiwyg \uc601\uc5ed\uc758 window \uac1d\uccb4
 * @param {Object} doc - Wysiwyg \uc601\uc5ed\uc758 document \uac1d\uccb4
 */
Trex.Canvas.ProcessorBR = Trex.Class.create({
	/** ignore */
	$extend: Trex.Canvas.Processor,
	/** @ignore */
	$mixins: [
		Trex.I.Processor.StandardBR,
		(($tx.msie)? Trex.I.Processor.TridentBR: {}),
		(($tx.gecko)? Trex.I.Processor.GeckoBR: {}),
		(($tx.webkit)? Trex.I.Processor.WebkitBR: {}),
		(($tx.presto)? Trex.I.Processor.PrestoBR: {})
	]
});

Trex.register("filter > mode change",
	function(editor, toolbar, sidebar, canvas, config) {
		
		/* -> Text Convert */
		function toText(html){
			var filterList = [
		      
		      [new RegExp("<head[^>]*>.*?<\\/head>", "gi"), ""], //<head ~ <\\/head> delete
		      [new RegExp("<s" + "cript[^>]*>.*?<\\/s" + "cript>", "gi"), ""],
		      [new RegExp("<style[^>]*>.*?<\\/style>", "gi"), ""], //<style ~ <\\/style> delete
		      [new RegExp("<!--.*?-->", "gi"), ""], //comment delete
		
		      //\uac1c\ud589 \ucc98\ub9ac
		      [new RegExp("<h[1-6][^>]*>(.+?)<\\/h[1-6]>", "gi"), "\n$1\n\n"], //<h1(h6) ~ <\\/h1(h6]> \uc81c\uac70
		      [new RegExp("(<p[^>]*>(.+?)<\\/p>)", "gi"), "$1\n"], //<td>	
		      [new RegExp("<br[^>]*>\\n", "gi"), "\n"], //<br>+\uac1c\ud589
		      [new RegExp("<br[^>]*>", "gi"), "\n"], //<br>
		      [new RegExp("(<ul[^>]*>|<\\/ul>|<ol[^>]*>|<\\/ol>|<table[^>]*>|<\\/table>)", "gi"), "\n\n"], //<ul>
		      [new RegExp("(<tr[^>]*>|<\\/tr>)", "gi"), "\n"], //<tr>
		
		      //\uacf5\ubc31 \ucc98\ub9ac
		      [new RegExp("(<li[^>]*>(.+?)<\\/li>)", "gi"), "\t$1\n"], //<td>
		      [new RegExp("(<td[^>]*>(.+?)<\\/td>)", "gi"), "\t$1"], //<td>
		      [new RegExp("(<th[^>]*>(.+?)<\\/th>)", "gi"), "\t$1"], //<th>
		
		      //\ub098\uba38\uc9c0 \ubaa8\ub4e0 \ud0dc\uadf8 \uc0ad\uc81c
		      [new RegExp("<[\\/a-zA-Z!]+[^>]*>", "g"), ""],
		
		      //\ud2b9\uc218\ubb38\uc790 \uce58\ud658
		      [new RegExp("&nbsp;?", "g"), " "],
		      [new RegExp("&quot;?", "g"), "\""],
		      [new RegExp("&gt;?", "g"),'>'],
		      [new RegExp("&lt;?", "g"),'<'],
		      [new RegExp("&amp;?", "g"),'&'],
		      [new RegExp("&copy;?", "g"),'(c)'],
		      [new RegExp("&trade;?", "g"),'(tm)'],
		      [new RegExp("&#8220;?", "g"), "\""],
		      [new RegExp("&#8221;?", "g"), "\""],
		      [new RegExp("&#8211;?", "g"), "_"],
		      [new RegExp("&#8217;?", "g"), "'"],
		      [new RegExp("&#38;?", "g"), "&"],
		      [new RegExp("&#169;?", "g"), "(c)"],
		      [new RegExp("&#8482;?", "g"),"(tm)"],
		      [new RegExp("&#151;?", "g"),"--"],
		      [new RegExp("&#039;?", "g"),"'"],
		      [new RegExp("&#147;?", "g"), "\""],
		      [new RegExp("&#148;?", "g"), "\""],
		      [new RegExp("&#149;?", "g"), "*"],
		      [new RegExp("&reg;?", "g"), "(R]"],
		      [new RegExp("&bull;?", "g"), "*"]
		  ];
		
			var tmp = html;
			for(i = 0; i < filterList.length; i++) {
				tmp = tmp.replace(filterList[i][0], filterList[i][1]);
			}
			return tmp;
		}
	
		function fromText(txt) {
			if( txt !== null && txt.length !== 0 ) {
				txt = txt.replace(/&/g, "&amp;");
				txt = txt.replace(/ /g, "&nbsp;");
				txt = txt.replace(/\"/g, "&quot;");
				txt = txt.replace(/>/g, "&gt;");
				txt = txt.replace(/</g, "&lt;");
				if(txt.lastIndexOf("\n") === txt.length-1){
					txt = txt.substr(0, txt.length-1);
				}
				if(txt.lastIndexOf("\r") === txt.length-1){
					txt = txt.substr(0, txt.length-1);
				}
				txt = txt.replace(/\r\n|\r|\n/g, "<br>\n");
			}
			return txt;
		}
		
		var _docparser = editor.getDocParser();	
		_docparser.registerFilter(
			'filter/converting', {
				'text@load': function(contents){
					return toText(contents);
				},
				'source@load': function(contents){
					return contents;
				},
				'html@load': function(contents){
					return contents;
				},
				'text4save': function(contents){
					return fromText(contents);
				},
				'source4save': function(contents){
					return contents;
				},
				'html4save': function(contents){
					return contents;
				},
				'text2source': function(contents){
					return fromText(contents);
				},
				'text2html': function(contents){
					return fromText(contents);
				},
				'source2text': function(contents){
					return toText(contents);
				},
				'source2html': function(contents){
					return contents;
				},
				'html2text': function(contents){
					return toText(contents);
				},
				'html2source': function(contents){
					return contents;
				}
			}
		);
	}
);
Trex.register("filter > clear redundancy",
	function(editor, toolbar, sidebar, canvas, config) {
		
		function clearRedundancy(contents) {
			var _clearHanler = function(content, style, loop) {
				var _matchNum = 0;
				var _matchHanler = function(all, value, text){
					_matchNum++;
					if(text.length == 0 || text.trim().length == 0) {
						return "";
					} else {
						return ['<span style="', style, ':', value, ';">', text, '</span>'].join("");
					}
				};
				var _reg = new RegExp("(?:<span[^>]*" + style + ":[^>]*>){" + loop + "}<span\\s*style=['\"]?" + style + ":\\s*(\\w+)[;'\"]*>([\\S\\s]*?)<\/span>(?:<\/span>){" + loop + "}", "gi");
				do {
					_matchNum = 0;
					content = content.replace(_reg, _matchHanler);
				} while(_matchNum > 0);
			
				return content;
			};
			var _styles = ['font-size', 'font-family'];
			for(var i=0; i<_styles.length; i++) {
				contents = _clearHanler(contents, _styles[i], 8);
				contents = _clearHanler(contents, _styles[i], 4);
				contents = _clearHanler(contents, _styles[i], 1);
			}
			contents = contents.replace(/<span[^>]*><\/span>/gi, "");
			contents = contents.replace(/<font[^>]*><\/font>/gi, "");
			return contents;
		}
		
		var _docparser = editor.getDocParser();	
		_docparser.registerFilter(
			'filter/redundancy', {
				'text@load': function(contents){
					return contents;
				},
				'source@load': function(contents){
					return clearRedundancy(contents);
				},
				'html@load': function(contents){
					return clearRedundancy(contents);
				},
				'text4save': function(contents){
					return contents;
				},
				'source4save': function(contents){
					return contents;
				},
				'html4save': function(contents){
					return contents;
				},
				'text2source': function(contents){
					return contents;
				},
				'text2html': function(contents){
					return contents;
				},
				'source2text': function(contents){
					return contents;
				},
				'source2html': function(contents){ //source2wysiwyg
					return contents;
				},
				'html2text': function(contents){
					return contents;
				},
				'html2source': function(contents){ //wysiwyg2source
					return clearRedundancy(contents);
				}
			}
		);
	}
);
/**
 * @fileoverview 
 * attachments.js
 * 
 */

TrexMessage.addMsg({
	'@attacher.only.wysiwyg.alert': "\uc5d0\ub514\ud130 \uc0c1\ud0dc\uc5d0\uc11c\ub9cc \ubcf8\ubb38\uc5d0 \uc0bd\uc785\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.\n\uc5d0\ub514\ud130\ubaa8\ub4dc\uc5d0\uc11c \ucca8\ubd80\ubc15\uc2a4\uc758 \uc378\ub124\uc77c\uc744 \ud074\ub9ad\ud574\uc11c \uc0bd\uc785\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."
});
/**
 * Trex.Attachment
 * \ucca8\ubd80\ub41c data\ub97c wrapping\ud558\ub294 class 
 * 
 * @abstract
 * @class
 * @extends Trex.Entry
 * 
 * @param {Object} actor
 * @param {Object} data 
 */
Trex.Attachment = Trex.Class.draft(/** @lends Trex.Attachment.prototype */{
	/** @ignore */
	$extend: Trex.Entry,
	isChecked: false,
	attrs: {
		align: "left"
	},
	initialize: function(actor, data) {
		var _entry = this;

		var _actor = this.actor = actor;
		var _canvas = this.canvas = _actor.canvas;
		var _entryBox = this.entryBox = _actor.entryBox;

		this.type = this.constructor.__Identity;
		this.setProperties(data);
		
		if(this.oninitialized){
			this.oninitialized(actor, data);
		}
	},
	/**
	 * existStage \uac12\uc744 \uc124\uc815\ud55c\ub2e4.
	 * @function
	 */
	setExistStage: function(existStage) {	//just attachments~
		/**
		 * attachment\uac00 content\uc5d0 \uc874\uc7ac\ud558\ub294\uc9c0 \ud655\uc778\ud560 \ub54c \uc0ac\uc6a9\ub418\ub294 \uc18d\uc131
		 */
		this.existStage = existStage;
		if (this.entryBox.changeState) {
			this.entryBox.changeState(this);
		}
	},
	/**
	 * content\uc5d0\uc11c attachment\ub97c \uc9c0\uc6b4\ub2e4.
	 * @function
	 */
	remove: function() {
		var _content = this.canvas.getContent();
		if(this.canvas.canHTML()) {
			if(_content.search(this.regHtml) > -1) {
				_content = _content.replace(this.regHtml, "");
				this.canvas.setContent(_content);
			}
		} else {
			if(_content.search(this.regText) > -1) {
				_content = _content.replace(this.regText, "");
				this.canvas.setContent(_content);
			}
		}
	},
	/**
	 * attachment HTML\uc744 \uc5d0\ub514\ud130 \ubcf8\ubb38\uc5d0 \ubd99\uc5ec\ub123\ub294\ub2e4.
	 * @function
	 */
	register: function() {
		if (Editor.getSidebar().addOnlyBox) {
			return;	
		}
		var _actor = this.actor;
		if (_actor.boxonly) {
			return;
		}
		
		if(this.canvas.canHTML()) {
			var _pastescope = this.pastescope;
			var _dispHtml = this.dispHtml;
			if(this.objectStyle) {
				_dispHtml = _dispHtml.replace(/<img /i, "<img style=\"" + Trex.Util.toStyleString(this.objectStyle) + "\" ");
			}
			if(this.objectAttr) {
				_dispHtml = _dispHtml.replace(/<img /i, "<img " + Trex.Util.toAttrString(this.objectAttr));
			}
			var _style = this.paragraphStyle || {};
			this.canvas.execute(function(processor) {
				processor.moveCaretWith(_pastescope);
				processor.pasteContent(_dispHtml, true, {
					'style': _style 
				});
			});
		} else {
			if(this.actor.wysiwygonly){
				alert(TXMSG("@attacher.only.wysiwyg.alert"));
			} else {
				this.canvas.getProcessor().insertTag('', this.dispText);
			}
		}
	},
	/**
	 * \uc778\uc790\ub85c \ubc1b\uc740 old regex\ub85c attachment\ub97c \uc2dd\ubcc4\ud574\uc11c HTML\uc744 \uad50\uccb4\ud55c\ub2e4.
	 * @function
	 */
	replace: function(oldReg) {
		var _canvas = this.canvas;
		var _content = _canvas.getContent();
		var _actor = this.actor;
		if (!_actor.boxonly) {
			if(_canvas.canHTML()) {
				if(_content.search(oldReg.regHtml) > -1) {
					_content = _content.replace(oldReg.regHtml, this.dispHtml);
					_canvas.setContent(_content);
				} else {
					_canvas.pasteContent(this.dispHtml, true);
				}
			} else {
				if(_content.search(oldReg.regText) > -1) {
					_content = _content.replace(oldReg.regText, "");
					_canvas.setContent(_content);
				}
				alert(TXMSG("@attacher.only.wysiwyg.alert"));
			}
		}
	},
	/**
	 * attachment \uad00\ub828\ud558\uc5ec \ud544\uc694\ud55c \uc18d\uc131\uc744 this \uac1d\uccb4\uc5d0 \ud560\ub2f9\ud55c\ub2e4.
	 * @function
	 */
	setProperties: function(data) {
		var _data = this.data = data;
		this.key = this.actor.getKey(_data) || 'K'+Trex.Util.generateKey();
		this.field = this.getFieldAttr(_data);
		this.boxAttr = this.getBoxAttr(_data);
		
		this.objectAttr = this.getObjectAttr.bind(this)(_data);
		this.objectStyle = this.getObjectStyle.bind(this)(_data);
		this.paragraphStyle = this.getParaStyle.bind(this)(_data);
		
		this.saveHtml = this.getSaveHtml.bind(this)(_data);
		this.dispHtml = this.getDispHtml.bind(this)(_data);
		this.dispText = this.getDispText.bind(this)(_data);
		this.regLoad = this.getRegLoad.bind(this)(_data);
		this.regHtml = this.getRegHtml.bind(this)(_data);
		this.regText = this.getRegText.bind(this)(_data);
	},
	/**
	 * object\uc758 attribute \uac12\uc744 \uac00\uc838\uc628\ub2e4.
	 * @function
	 */
	getObjectAttr: function(data) {
		return this.actor.config.objattr;
	},
	/**
	 * object\uc758 style \uac12\uc744 \uac00\uc838\uc628\ub2e4.
	 * @function
	 */
	getObjectStyle: function(data) {
		return this.actor.config.objstyle;
	},
	/**
	 * object\ub97c \uac10\uc2f8\uace0 \uc788\ub294 paragraph tag \uc758 style \uac12\uc744 \uac00\uc838\uc628\ub2e4.
	 * @function
	 */
	getParaStyle: function(data) {
		return this.actor.config.parastyle || this.actor.config.defaultstyle || {};
	}
});



TrexConfig.addSidebar('attachbox', {
	show: true,
	destroy: false
});

/**
 * Trex.AttachBox
 * Trex.Attachment instance\ub4e4\uc774 \uc800\uc7a5\ub418\ub294 class  
 * @class
 * @extends Trex.EntryBox
 */
Trex.AttachBox = Trex.Class.create({
	/** @ignore */
	$extend: Trex.EntryBox,
	isChecked: false,
	initialize: function(config, editor) {

	},
	checkAvailableCapacity: function() { //Before Popup
		return true;
	},
	getAvailableCapacity: function() { //Within Flash
		return true;
	},
	checkInsertableSize: function(attachSize) { //Before Attach
		return true;
	}
});

Trex.install("editor.getAttachBox & sidebar.getAttachments",
	function(editor, toolbar, sidebar, canvas, config){
		var _attachBox = new Trex.AttachBox(config, editor);
		sidebar.entryboxRegistry['attachbox'] = _attachBox;
		editor.getAttachBox = function() {
			return _attachBox;
		};
		sidebar.getAttachments = _attachBox.getEntries.bind(_attachBox);
	}
);

Trex.register("filter > attachers",
	function(editor, toolbar, sidebar, canvas, config) {
		var _attachBox = editor.getAttachBox();		
		var _docparser = editor.getDocParser();		
		_docparser.registerFilter(
			'filter/attachments', {
				'text@load': function(contents){
					var entries = _attachBox.datalist;					
					entries.each(function(entry) {
						contents = entry.getChangedContent(contents, entry.regLoad, "");
					});
					return contents;
				},
				'source@load': function(contents){
					var entries = _attachBox.datalist;					
					entries.each(function(entry) {
						contents = entry.getChangedContent(contents, entry.regLoad, entry.dispText);
					});
					return contents;
				},
				'html@load': function(contents){
					var entries = _attachBox.datalist;					
					entries.each(function(entry) {
						contents = entry.getChangedContent(contents, entry.regLoad, entry.dispHtml);
					});
					return contents;
				},
				'text4save': function(contents){
					var entries = _attachBox.datalist;					
					entries.each(function(entry) {
						contents = entry.getChangedContent(contents, entry.regText, "");
					});
					return contents;
				},
				'source4save': function(contents){
					var entries = _attachBox.datalist;					
					entries.each(function(entry) {
						contents = entry.getChangedContent(contents, entry.regText, entry.saveHtml, ["id", "class"]);
					});
					return contents;
				},
				'html4save': function(contents){
					var entries = _attachBox.datalist;					
					entries.each(function(entry) {
						contents = entry.getChangedContent(contents, entry.regHtml, entry.saveHtml, ["id", "class"]);
					});
					return contents;
				},
				'text2source': function(contents){
					return contents;
				},
				'text2html': function(contents){
					return contents;
				},
				'source2text': function(contents){
					var entries = _attachBox.datalist;					
					entries.each(function(entry) {
						contents = entry.getChangedContent(contents, entry.regText, "");
					});
					return contents;
				},
				'source2html': function(contents){
					var entries = _attachBox.datalist;					
					entries.each(function(entry) {
						contents = entry.getChangedContent(contents, entry.regText, entry.dispHtml);
					});
					return contents;
				},
				'html2text': function(contents){
					var entries = _attachBox.datalist;					
					entries.each(function(entry) {
						contents = entry.getChangedContent(contents, entry.regHtml, "");
					});
					return contents;
				},
				'html2source': function(contents){
					var entries = _attachBox.datalist;					
					entries.each(function(entry) {
						contents = entry.getChangedContent(contents, entry.regHtml, entry.dispText, ["id", "class"]);
					});
					return contents;
				}
			}
		);
	}
);
		
Trex.module("push history @when entrybox has changes",
	function(editor, toolbar, sidebar, canvas, config) {		
		var _attachBox = editor.getAttachBox();		
		// history\ub97c \ub0a8\uae30\uc790.
		_attachBox.observeJob( "entrybox.entryremoved", function(entry) {
			canvas.history.saveHistory({
					'deleted': true,
					'content': canvas.getContent(),
					'scrollTop': canvas.getScrollTop()
				}, 
				function(data){
					entry.deletedMark = (data.deleted == true || data.deleted == undefined)?true:false;
					_attachBox.fireJobs(Trex.Ev.__ENTRYBOX_ENTRY_REFRESH, entry);
					canvas.setContent( data.content );	
				}
			);
		});
		
		_attachBox.observeJob(Trex.Ev.__ENTRYBOX_ENTRY_ADDED, function(entry){
			canvas.history.injectHistory({ 
					'deleted': false 
				}, 
				function(data){
					entry.deletedMark = (data.deleted === false)?false:true;
					_attachBox.fireJobs(Trex.Ev.__ENTRYBOX_ENTRY_REFRESH, entry);
				}
			);
		});
	}
);

TrexMessage.addMsg({
	'@attacher.ins': "\uc0bd\uc785",
	'@attacher.del': "\uc0ad\uc81c",
	'@attacher.preview.image': "#iconpath/pn_preview.gif",
	'@attacher.delete.confirm': "\uc0ad\uc81c\ud558\uc2dc\uba74 \ubcf8\ubb38\uc5d0\uc11c\ub3c4 \uc0ad\uc81c\ub429\ub2c8\ub2e4. \uacc4\uc18d\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?",
	'@attacher.delete.all.confirm': "\uc120\ud0dd\ud55c \ucca8\ubd80\ud30c\uc77c\uc744 \uc0ad\uc81c\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c? \uc0ad\uc81c\ud558\uc2dc\uba74 \ubcf8\ubb38\uc5d0\uc11c\ub3c4 \uc0ad\uc81c\ub429\ub2c8\ub2e4.",
	'@attacher.exist.alert': "\uc774\ubbf8 \ubcf8\ubb38\uc5d0 \uc0bd\uc785\ub418\uc5b4 \uc788\uc2b5\ub2c8\ub2e4."
});

Trex.install("attachbox.onAttachBoxInitialized @if config.sidebar.attachbox.show = true",
	function(editor, toolbar, sidebar, canvas, config){
		var attachbox = editor.getAttachBox();
		if (config.sidebar.attachbox.show == true) {
			Object.extend(attachbox, Trex.I.AttachBox);
			attachbox.onAttachBoxInitialized(config, canvas, editor);
		}
	}
);
Trex.I.AttachBox = {
	useBox: true,
	isDisplay: false,
	lastSelectedEntry: null,
	onAttachBoxInitialized: function(config, canvas){
		var _entryBox = this;
		this.canvas = canvas;
		
		var _initializedId = ((config.initializedId)? config.initializedId: "");
		this.elBox = $must("tx_attach_div" + _initializedId, "Trex.I.AttachBox");
		
		this.elList = $must("tx_attach_list" + _initializedId, "Trex.I.AttachBox");
		var _elPreview = $must('tx_attach_preview' + _initializedId, "Trex.I.AttachBox");
		this.elPreviewKind = $tom.collect(_elPreview, "p");
		var _elPreviewImg = this.elPreviewImg = $tom.collect(_elPreview, "img");
		var _imageResizer = this.imageResizer = new Trex.ImageResizer(_elPreviewImg, {
			maxWidth: 147,
			maxHeight: 108,
			defImgUrl: TXMSG("@attacher.preview.image"),
			onComplete: function(width, height) { //vertical positioning
				_elPreviewImg.style.marginTop = Math.floor((108 - height)/2).toPx();
			}
		});

		this.elDelete = $tom.collect("#tx_attach_delete" + _initializedId + " a");
		$tx.observe(this.elDelete, 'click', this.onDeleteAll.bind(this));

		if(typeof(showAttachBox) != 'undefined') { //NOTE: service specific job for changing attachbox's display(callback)
			this.observeJob(Trex.Ev.__ATTACHBOX_SHOW, function(){
				showAttachBox();
			});
		}
		if(typeof(hideAttachBox) != 'undefined') { //NOTE: service specific job for changing attachbox's display(callback)
			this.observeJob(Trex.Ev.__ATTACHBOX_HIDE, function(){
				hideAttachBox();
			});
		}

		var _elProgress = this.elProgress = $must('tx_upload_progress' + _initializedId, 'Trex.I.AttachBox');
		this.elProgressPercent = $tom.collect(_elProgress, "div");
		this.elProgressTicker = $tom.collect(_elProgress, "p");
		
		this.observeJob(Trex.Ev.__ENTRYBOX_ENTRY_ADDED, function(entry){
			_entryBox.registerEntryNode(entry);
			_entryBox.displayBox();
		});
		this.observeJob(Trex.Ev.__ENTRYBOX_ENTRY_MODIFIED, function(entry){
			_entryBox.modifyEntryNode(entry);
		});
		this.observeJob(Trex.Ev.__ENTRYBOX_ENTRY_REMOVED, function(entry){
			_entryBox.removeEntryNode(entry);
			_entryBox.displayBox();
			if(_entryBox.lastSelectedEntry && _entryBox.lastSelectedEntry.key == _entryBox.key) {
				_entryBox.imageResizer.execResize(TXMSG("@attacher.preview.image"));
			}
		});	
		this.observeJob(Trex.Ev.__ENTRYBOX_ALL_ENTRY_REMOVED, function() {
			_entryBox.datalist.each(function(entry) {
				_entryBox.removeEntryNode(entry, true);
			});
			_entryBox.displayBox();
			if(_entryBox.lastSelectedEntry && _entryBox.lastSelectedEntry.key == _entryBox.key) {
				_entryBox.imageResizer.execResize(TXMSG("@attacher.preview.image"));
			}
		});	
		this.observeJob(Trex.Ev.__ENTRYBOX_ENTRY_REFRESH, function(entry){
			_entryBox.displayBox();
			_entryBox.refreshEntryNode(entry);
		})
	},
	onDeleteAll: function(force) {
		if (this.datalist.length === 0) {
			return;
		}
		if (!force && !confirm(TXMSG("@attacher.delete.all.confirm"))) {
			return;
		}
		this.datalist.each(function(entry) {
			entry.execRemove();
		});
		this.imageResizer.execResize(TXMSG("@attacher.preview.image"));
	},
	checkDisplay: function() {
		return this.isDisplay;
	},
	setDisplay: function(isDisplay) {
		this.isDisplay = isDisplay;
	},
	displayBox: function() {
		var isDisplay = false;
		for( i = 0; i < this.datalist.length; i++ ){
			if ( this.datalist[i].deletedMark == false){
				isDisplay = true;
			}
		}
		//var isDisplay = (this.datalist.length > 0);
		if (this.isDisplay == isDisplay) {
			return;
		}
		if(isDisplay) {
			$tx.show(this.elBox);
			this.fireJobs(Trex.Ev.__ATTACHBOX_SHOW, true);
		} else {
			$tx.hide(this.elBox);
			this.fireJobs(Trex.Ev.__ATTACHBOX_HIDE, false);
		}
		this.isDisplay = isDisplay;
	},
	registerEntryNode: function(entry) {
		var _elData = tx.li(  );
		this.elList.appendChild(_elData);
		entry.elData = _elData;
		
		entry.makeSelection = function(isPreviewed) {
			if (isPreviewed) {
				this.showEntryThumb(entry);
			} else {
				this.hideEntryThumb(entry);
			}
		}.bind(this);
		
		//NOTE: only blog cuz iframe area
		$tx.observe(_elData, 'mouseover', this.onEntryMouseOver.bind(this, entry));
		$tx.observe(_elData, 'mouseout',  this.onEntryMouseOut.bind(this, entry));

		var _elRow = tx.dl(  );
		_elData.appendChild(_elRow);

		var _elName = entry.elName = tx.dt({ className: "tx-name", unselectable: "on" },entry.boxAttr.name ); //\ud30c\uc77c\uba85
		_elRow.appendChild(_elName);
		$tx.observe(_elData, 'click',
			function(e){
				var _el = $tx.element(e);
				if(_el.className == "tx-delete" || _el.className == "tx-insert"){
					return ;
				}
				if (e.ctrlKey) {
					this.clickEntryWithCtrl(entry);
				} else if (e.shiftKey) {
					this.clickEntryWithShift(entry);
				} else {
					this.clickEntry(entry);
				}
				if(entry.actor.name == 'image') { //NOTE: get image scale
					if (!entry.data.width || !entry.data.height) {
						new Trex.ImageScale(entry.data);
					}
				}
			}.bind(this), false);

		var _elButton = tx.dd({ className: "tx-button" }); //\ubc84\ud2bc
		_elRow.appendChild(_elButton);

		var _elDelete = tx.a({ className: "tx-delete" }, TXMSG("@attacher.del")); //\uc0ad\uc81c
		_elButton.appendChild(_elDelete);
		$tx.observe(_elDelete, 'click', function() {
			if(!confirm(TXMSG("@attacher.delete.confirm"))) {
				return;
			}
			entry.execRemove();
		}, false);

		var _elInsert = entry.elInsert = tx.a({ className: "tx-insert" }, TXMSG("@attacher.ins")); //\uc0bd\uc785
		_elButton.appendChild(_elInsert);
		$tx.observe(_elInsert, 'click', function() {
			if(entry.existStage && !entry.actor.config.multipleuse) {
				alert(TXMSG("@attacher.exist.alert"));
			} else {
				entry.execAppend();
			}
		}, false);
	},
	changeState: function(entry){
		var _existStage = entry.existStage;
		if (_existStage && !entry.actor.config.multipleuse) {
			$tx.addClassName(entry.elData,"tx-existed");
		} else {
			$tx.removeClassName(entry.elData, "tx-existed");
		}
	},
	modifyEntryNode: function(entry) {
		entry.elName.innerText = entry.boxAttr.name;
	},
	removeEntryNode: function(entry, force) {
		if (force) {
			entry.elData.parentNode.removeChild(entry.elData);
		} else 	if (entry.deletedMark) {
			$tx.hide(entry.elData);
		}
	},
	refreshEntryNode: function(entry){
		if (entry.deletedMark) {
			$tx.hide(entry.elData);
		} else {
			$tx.show(entry.elData);
		}
	},
	showEntryThumb: function(entry) {
		$tx.addClassName(entry.elData, "tx-clicked");
		$tx.removeClassName(entry.elData, "tx-hovered");
	},
	hideEntryThumb: function(entry) {
		$tx.removeClassName(entry.elData, "tx-clicked");
	},
	onEntryMouseOver: function(entry) {
		$tx.addClassName(entry.elData, "tx-hovered");
	},
	onEntryMouseOut: function(entry) {
		$tx.removeClassName(entry.elData, "tx-hovered");
	},
	startUpload: function() {
		this.elProgressPercent.style.width = "0".toPx();
		$tx.setStyle(this.elList, {opacity: 0.3});
		$tx.show(this.elProgress);
	},
	doUpload: function(percent) {
		var progressWidth = 300;
		this.elProgressPercent.style.width = Math.floor(progressWidth * (isNaN(percent)  ? 0: parseFloat(percent) * 0.01)).toPx();
		this.elProgressTicker.innerText = Math.floor( (isNaN(percent)? 0: parseFloat(percent))) + "%";
	},
	endUpload: function() {
		$tx.hide(this.elProgress);
		$tx.setStyle(this.elList, {opacity: 1});
	},
	clickEntry: function(entry) {
		if(this.lastSelectedEntry) {
			if(this.lastSelectedEntry.key == entry.key) {
				return;
			}
			this.datalist.each(
				function(entry){
					entry.makeSelection(false);
				}
			);
		}
		this.elPreviewKind.className = ((entry.boxAttr.className)? entry.boxAttr.className: "");
		entry.makeSelection(true);
		this.imageResizer.execResize(entry.boxAttr.image);
		this.lastSelectedEntry = entry;
	},
	clickEntryWithCtrl: function(entry) {
		if ($tx.hasClassName(entry.elData, 'tx-clicked')) {
			entry.makeSelection(false);
			this.lastSelectedEntry = null;
		}else {
			this.elPreviewKind.className = ((entry.boxAttr.className) ? entry.boxAttr.className : "");
			entry.makeSelection(true);
			this.imageResizer.execResize(entry.boxAttr.image);
			this.lastSelectedEntry = entry;
		}
	},
	clickEntryWithShift: function(entry) {
		if ($tx.hasClassName(entry.elData, 'tx-clicked')) {
			entry.makeSelection(false);
			this.lastSelectedEntry = null;
		}else {
			var idx = this.getIndexOf(entry);
			var targetIdx;
			if (this.lastSelectedEntry) {
				 targetIdx = this.getIndexOf(this.lastSelectedEntry);
			}
			
			var from = targetIdx, to = idx;
			if (idx == targetIdx) {
				from = to = idx;
			} else if (idx < targetIdx) {
				from = idx;
				to = targetIdx;
			}	 
			
			this.elPreviewKind.className = ((entry.boxAttr.className) ? entry.boxAttr.className : "");
			for(var i = from; i < to + 1 ; i++){
				this.datalist[i].makeSelection(true);
			}
			
			this.imageResizer.execResize(entry.boxAttr.image);
			this.lastSelectedEntry = entry;
		}
	},
	getIndexOf: function(entry){
		var i, matched;
		for(i = 0; i<this.datalist.length ; i++){
			if(this.datalist[i] === entry){
				matched = true;
				break;				
			}
		}
		return matched ? i : -1;
	},
	getSelectedList: function(attachType){
		var _list = [];
		var _source;
		if(attachType){
			_source = this.getAttachments(attachType);
		}else{
			_source = this.datalist; 
		}
		_source.each(
				function(entry){
					if($tx.hasClassName(entry.elData, "tx-clicked")){
						_list.push(entry);	
					}
				}
			);
		return _list;		
	},
	removeSelection: function(datalist){
		datalist.each(function(data){
			$tx.removeClassName(data.elData, "tx-clicked");
		})
	}
};

TrexMessage.addMsg({
	'@file.error.file.count.alert': "\uc5c5\ub85c\ub4dc \ud30c\uc77c\uac2f\uc218\uac00 \ucd08\uacfc\ub418\uc5c8\uc2b5\ub2c8\ub2e4.",
	'@file.error.file.size.alert': "\uc5c5\ub85c\ub4dc \uc6a9\ub7c9\uc774 \ucd08\uacfc\ub418\uc5c8\uc2b5\ub2c8\ub2e4."
});
		
/**
 * Trex.FileUploaderAdaptor - Adaptor Interface
 */
Trex.FileUploaderAdaptor = {  //NOTE: cuz multi editor
	checkEditor: function(ctx){
		var idx = ctx.substr(4, ctx.length);
		if(Editor.getInitializedId() != idx) {
			Editor.prototype.switchEditor(idx);
		}
	},
	/**
	 * Callback function called when upload session is started
	 */
	on_upload_start: function(ctx){
		this.checkEditor(ctx);
		var _attachbox = Editor.getAttachBox();
		if (_attachbox && _attachbox.startUpload) {
			_attachbox.startUpload();
		}
	},
	/**
	 * Callback function on progress
	 * @param {Object} percent 
	 */
	on_upload_progress: function(percent, ctx){
		this.checkEditor(ctx);
		var _attachbox = Editor.getAttachBox();
		if (_attachbox && _attachbox.doUpload) {
			_attachbox.doUpload(percent);
		}
	},
	/**
	 * Callback function called when each file is uploaded complete into temp directory.
	 * @param {String} result - string data delimetered by '||'
	 * 	 ex} filename||attachurl||infourl||filesize||filemime\n||url(key)
	 */
	on_upload_complete: function(result, ctx){ // X
		this.checkEditor(ctx);
		var _adaptor = Editor.getSidebar().getUploadAdaptor(); 
		if (_adaptor && _adaptor.attach) {
			_adaptor.attach(arguments[0]);
		}
	},
	/**
	 * Callback function called when upload session is finished
	 */
	on_upload_finish: function(ctx){
		this.checkEditor(ctx);
		
		var _attachbox = Editor.getAttachBox();
		if (_attachbox && _attachbox.endUpload) {
			_attachbox.endUpload();
		}
		Editor.getSidebar().addOnlyBox = null;		
	},
	/**
	 * Callback function called if size of each file is bigger than permission  
	 * @param {Object} filename - filename delimetered by '||'
	 */
	on_over_filesize: function(filename, ctx){
		alert(TXMSG('@file.error.file.size.alert'));
		this.checkEditor(ctx);
		var _attachbox = Editor.getAttachBox();
		if (_attachbox && _attachbox.endUpload) {
			_attachbox.endUpload();
		}
	},
	/**
	 * Callback function called if files are selected more than max count.  
	 * @param {Object} count - selected file count
	 * @param {Object} maxcount - max count
	 */
	on_over_filecount: function(maxcount, ctx){
		alert(TXMSG('@file.error.file.count.alert'));
		this.checkEditor(ctx);
		var _attachbox = Editor.getAttachBox();
		if (_attachbox && _attachbox.endUpload) {
			_attachbox.endUpload();
		}
	},
	/**
	 * Callback function called on error
	 */
	on_error: function(msg, ctx){ //NOTE: not implement
		this.checkEditor(ctx);
		Editor.getSidebar().addOnlyBox = null;
	},
	on_browse_cancel: function(ctx){ //NOTE: not implement
		this.checkEditor(ctx);
		Editor.getSidebar().addOnlyBox = null;
	},
	on_upload_open: function(name, size, type){ //NOTE: not implement
	},
	/**
	 * Callback function called when each file is transfered to permanent directory from temp directory.
	 * Usually, this is called after 'on_upload_complete' call
	 */
	on_activate_complete: function(result){ //NOTE: not implement
	},
	/**
	 * Callback function called when activating is finished
	 * @param {string} result - succecss code
	 */
	on_activate_finish: function(){ //NOTE: not implement
	},
	/**
	 * size : allow unlimited if -1
	 * @param {Object} cur_size
	 * @param {Object} max_size
	 */
	on_over_filequota: function(quota, ctx){ //NOTE: not implement
		alert(TXMSG('@file.error.file.size.alert'));
		this.checkEditor(ctx);
		var _attachbox = Editor.getAttachBox();
		if (_attachbox && _attachbox.endUpload) {
			_attachbox.endUpload();
		}
	},
	on_upload_skip: function(filename, localfile_size, localfile_type){
		
	}
};
/**
 * @filewoverview 
 * attacher.js - \ucca8\ubd80 \uad00\ub828 source\ub85c \uc774 \uc18c\uc2a4\uc5d0\uc11c \uc874\uc7ac\ud558\ub294 Attacher\ub4e4\uc744 \uc9c1\uc811 \uc0dd\uc131\ud55c\ub2e4. 
 * Editor\uac00 \uc0dd\uc131\ub420\ub54c initialize\ub41c\ub2e4.
 */

TrexMessage.addMsg({
	'@attacher.can.modify.alert': "\uae30\uc874\uc5d0 \ub4f1\ub85d\ub41c #{title}\ub97c \uc218\uc815\ud560 \uc218 \uc788\ub294 \ud654\uba74\uc73c\ub85c \uc774\ub3d9\ud569\ub2c8\ub2e4.",
	'@attacher.can.modify.confirm': "#{title}\uc740(\ub294) \ud558\ub098\ub9cc \ub4f1\ub85d\uc774 \uac00\ub2a5\ud569\ub2c8\ub2e4.\n\ub2e4\uc2dc \uc62c\ub9ac\uc2dc\uba74 \uae30\uc874\uc758 #{title}\uc774(\uac00) \uc0ad\uc81c\ub429\ub2c8\ub2e4. \uacc4\uc18d\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?",
	'@attacher.insert.alert': "\uc5d0\ub514\ud130 \uc0c1\ud0dc\uc5d0\uc11c\ub9cc \uc0bd\uc785\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.",
	'@attacher.capacity.alert': "\uc6a9\ub7c9\uc744 \ucd08\uacfc\ud558\uc600\uc2b5\ub2c8\ub2e4.",
	'@attacher.size.alert': "\uc6a9\ub7c9\uc744 \ucd08\uacfc\ud558\uc5ec \ub354\uc774\uc0c1 \ub4f1\ub85d\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4."
});	

Trex.install("sidebar.getAttacher & sidebar.getUploadAdaptor",
	function(editor, toolbar, sidebar, canvas, config) {
		var _attachBox = editor.getAttachBox();
		var _attachers = sidebar.attachers = {};
		
		/**
		 * memberOf Trex.Sidebar.prototype
		 * @param {Object} name
		 */
		sidebar.getAttacher = function(name) {
			if(_attachers[name] != null) {
				return _attachers[name];
			} else if(arguments.length == 0){
				return _attachers;
			}else{
				return null;
			}
		};
		
	}
);

Trex.register("new attachers",
	function(editor, toolbar, sidebar, canvas, config) {
		var _attachBox = editor.getAttachBox();
		var _attachers = sidebar.attachers;
		
		for(var i in Trex.Attacher) {
			var _name = Trex.Attacher[i]['__Identity'];
			if(_name){
				if(!toolbar.tools[_name]){
					console.log(["No tool '",_name,"', but Attacher '", _name, "' is initialized."].join(""));
				}
				_attachers[_name] = new Trex.Attacher[i](editor, _attachBox, config); 
			}
		}
		
		if (_attachers["file"]) {
			sidebar.getUploadAdaptor = function(){
				return _attachers["file"].getAdaptor();
			};
		}
	}
);

/**
 * Class Trex.Attacher 
 * 
 * @abstract
 * @class
 * @extends Trex.Actor
 * @param {Object} editor
 * @param {Object} entryBox
 * @param {Object} config 
 */
Trex.Attacher = Trex.Class.draft(/** @lends Trex.Attacher.prototype */{
	/** @ignore */
	$extend: Trex.Actor,
	canModified: false,
	canResized: false,
	initialize: function(editor, entryBox, config) {
		this.editor = editor;
		this.canvas = editor.getCanvas();
		this.entryBox = entryBox;

		this.pvUrl =  TrexConfig.getUrl(config.pvpage, { "pvname": this.name });
		
		var _config = this.config = TrexConfig.getAttacher(this.constructor.__Identity, config);
		this.boxonly = ((_config.boxonly != null)? _config.boxonly: false); //NOTE: insert panel
		this.isMultiple = ((_config.multiple != null)? _config.multiple: false);
		this.isCheckSize = ((_config.checksize != null)? _config.checksize: false);
		this.wysiwygonly = ((_config.wysiwygonly != null)? _config.wysiwygonly: true);
		this.pastescope = _config.pastescope;
		
		if (this.oninitialized) {
			this.oninitialized(config);
		}
		/* entry create */
		this.attachHandler = this.attachHandler.bind(this);
	},
	/**
	 * Attacher\ub97c \uc2e4\ud589, \ucca8\ubd80\ub97c \ud558\uae30 \uc704\ud55c popup window\ub97c \ub744\uc6cc\uc8fc\uac70\ub098 \ud544\uc694\ud55c action\uc744 \uc218\ud589\ud55c\ub2e4.
	 * @param {String} param - \ud31d\uc5c5\uc744 \ub744\uc6b8\ub54c \ucd94\uac00\ud560 \ud30c\ub77c\ubbf8\ud130 \ubb38\uc790\uc5f4 
	 * @function
	 */
	execute: function(param) {
		if(this.wysiwygonly && !this.canvas.canHTML()) {
			alert(TXMSG("@attacher.insert.alert"));
			return;
		}

		if(this.isCheckSize && !this.entryBox.checkAvailableCapacity()) {
			alert(TXMSG("@attacher.capacity.alert"));
			return;
		}

		if(!this.checkInsertable()) {
			if(this.canModified) {
				var _jstObj = new Template( TXMSG("@attacher.can.modify.alert") );
				alert( _jstObj.evaluate( {title : this.title}));
			} else {
				var _jstObj = new Template( TXMSG("@attacher.can.modify.confirm") );
				if(!confirm(_jstObj.evaluate({ title : this.title }))) {
					return;
				}
			}
		}
		if(this.clickHandler) {
			this.clickHandler();
		} else {
			try {
				var _url = this.config.popPageUrl;
				if(param) {
					_url = _url + ((_url.indexOf("?") > -1) ? "&" : "?") + param;
				}
				_url = ((this.config.usepvpage)? this.pvUrl+"&u="+escape(_url): _url);
				var _win = window.open(_url, "at" + this.name, this.config.features);
				_win.focus();
			} catch (e) {}
		}
	},
	/**
	 * Argument\uc758 data\ub97c \uc774\uc6a9\ud574\uc11c editor\uc5d0 \ucca8\ubd80\ud558\uba70, Attacher type\uc5d0 \ub54c\ub77c data\uc758 format\uc740 \ub2e4\ub974\ub2e4.  
	 * @function
	 * @param {Object} data
	 * @param {Object} attachmentType - optional
	 */
	attachHandler: function(data, attachmentType) {
		if(this.checkInsertable()) {
			if(this.isCheckSize && !this.entryBox.checkInsertableSize(data.filesize)) {
				alert(TXMSG("@attacher.size.alert"));
				return;
			}
			this.execAttach(data,  attachmentType);
		} else {
			this.execReattach(data,  attachmentType);
		}
	},
	createEntry: function(data, type) {
		return this.createAttachment(data, type);
 	},
	createAttachment: function(data, type) {
		var _attachmentType = this.constructor.__Identity;
		if(type){
			_attachmentType = type;
		}
		return new Trex.Attachment[_attachmentType.capitalize()](this, data);
	},
	checkInsertable: function() {
		return (this.isMultiple || this.getDatalist().length === 0);
	}
});
TrexMessage.addMsg({
	'@embeder.alert': "\uc5d0\ub514\ud130 \uc0c1\ud0dc\uc5d0\uc11c\ub9cc \uc0bd\uc785\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."
});

/**
 * Trex.EmbedBox
 * \ubcf8\ubb38\uc5d0 \uc0bd\uc785\ud55c embed\ub4e4\uc774 \uc800\uc7a5\ub418\ub294 class 
 * 
 * @class
 * @extends Trex.EntryBox
 * @param {Object} config
 * @param {Object} canvas
 * @param {Object} editor
 */
Trex.EmbedBox = Trex.Class.create({
	/** @ignore */
	$extend: Trex.EntryBox,
	initialize: function(config, canvas) {

	}
});

Trex.install("editor.getEmbedBox & sidebar.getEmbeder & sidebar.getEmbeddedData",
	function(editor, toolbar, sidebar, canvas, config){
		var _embedBox = new Trex.EmbedBox(config, canvas, editor);
		
		sidebar.entryboxRegistry['embedbox'] = _embedBox;
		editor.getEmbedBox = function() {
			return _embedBox;
		};
		sidebar.getEmbeddedData = _embedBox.getEntries.bind(_embedBox);
		
		var _embeders = sidebar.embeders = {};
		sidebar.getEmbeder = function(name) {
			if(_embeders[name] != null) {
				return _embeders[name];
			} else if(arguments.length == 0){
				return _embeders;
			}else{
				return null;
			}
		};
	}
);

Trex.register("new embeders",
	function(editor, toolbar, sidebar, canvas, config){
		var _embedBox = editor.getEmbedBox();
		var _embeders = sidebar.embeders;
		
		for(var i in Trex.Embeder) {
			var _name = Trex.Embeder[i]['__Identity'];
			if (_name) {
				if(!toolbar.tools[_name]){
					console.log(["No tool '",_name,"', but Embeder '", _name,"' is initialized."].join(""));
				}
				_embeders[_name] = new Trex.Embeder[i](editor, _embedBox, config);
			}
		}
	}
);	

Trex.Embeder = Trex.Class.draft({
	$extend: Trex.Actor,
	canResized: false,
	initialize: function(editor, entryBox, config) {
		this.editor = editor;
		this.canvas = editor.getCanvas();
		
		var _config = this.config = TrexConfig.getEmbeder(this.constructor.__Identity, config);
		this.pvUrl =  TrexConfig.getUrl(config.pvpage, { "pvname": this.name });
		this.wysiwygonly = ((_config.wysiwygonly != null)? _config.wysiwygonly: true);
		this.pastescope = _config.pastescope;
		
		/* entry create */
		this.embedHandler = this.embedHandler.bind(this);
		
		//NOTE: Cuz Specific Case 
		if (this.oninitialized) {
			this.oninitialized.bind(this)(config);
		}
	},
	execute: function() {
		if(this.wysiwygonly && !this.canvas.canHTML()) {
			alert(TXMSG("@embeder.alert"));
			return;
		}
		
		if(this.clickHandler) {
			this.clickHandler();
		} else {
			try {
				var _url = this.config.usepvpage ? this.pvUrl+"&u="+escape(this.config.popPageUrl) :	this.config.popPageUrl;
				var win = window.open(_url, "at" + this.name, this.config.features);
				win.focus();
			} catch (e) {}
		}
	},
	embedHandler: function(data) {
		this.execAttach(data);
	},
	createEntry: function(data, type) {
		var _embeddedItemType = this.constructor.__Identity;
		if(type){
			_embeddedItemType = type;
		}
		return new Trex.EmbedEntry[_embeddedItemType.capitalize()](this, data);
	},
	execAttach: function(data, type) {
		var _pastescope = this.pastescope;
		var _html = this.getCreatedHtml(data);
		var _style = this.config.parastyle || this.config.defaultstyle || {};
		this.canvas.execute(function(processor) {
			processor.moveCaretWith(_pastescope);
			processor.pasteContent(_html, true, _style);
		});
	},
	execReattach: function(data, type) {
	},
	execReload: function(data, type) {
	},
	getReloadContent: function(data, content) {
		if(!data.dispElId) {
			return content;
		}
		var _html = this.getCreatedHtml(data);
		var _reg = new RegExp("<(?:img|IMG)[^>]*id=\"?" + data.dispElId + "\"?[^>]*\/?>", "gm");
		if(content.search(_reg) > -1) {
			return content.replace(_reg, _html);
		}
		return content;
	}
});
/**
 * Trex.EmbedEntry
 * \uc0bd\uc785\ub41c embed\ub4e4\uc744 wrapping\ud558\ub294 class 
 * @class
 * @extends Trex.Entry
 * 
 * @param {Object} actor
 * @param {Object} data 
 * 
 * 1.5 \ub418\uba74\uc11c IE\uc5d0\uc11c\ub294 \ubcc0\ud658\ud558\uc9c0 \uc54a\uc74c
*/
Trex.EmbedEntry = Trex.Class.create({
	$extend: Trex.Entry,
	attrs: {
		align: "left"
	},
	initialize: function(actor, data) {
		var _entry = this;
		
		var _actor = this.actor = actor;
		var _canvas = this.canvas = _actor.canvas; 
		var _entryBox = this.entryBox = _actor.entryBox; 

		this.setProperties(data);
	},
	register:  function() { 
		if(this.canvas.canHTML()) {
			var _style = this.actor.config.defaultstyle;
			if(_style){
				this.canvas.pasteContent(this.dispHtml, true, {
						'style': _style 
					});
			}else{
				this.canvas.pasteContent(this.dispHtml, true);	
			}
		} else {
			this.canvas.getProcessor().insertTag('', this.dispText);						
		}	
	},
	setProperties: function(data) {
		this.type = this.constructor.__Identity;
		
		var _data = this.data = data;
		var _key = this.key = _data.key;

		this.dispHtml = this.getDispHtml(_data);
		this.saveHtml = this.dispText = this.getDispText(_data); //NOTE: Cuz dispText = saveHtml
		this.regHtml = this.getRegHtml(_data);
		this.regLoad = this.regText = this.getRegText(_data); //NOTE: Cuz dispText = saveHtml
	}
});

/**
 * @fileoverview 
 *  wysiwyg, source, text \uc138\ubaa8\ub4dc\ub85c\uc758 \ubcc0\uacbd\uc744 \uac00\ub2a5\ud558\uac8c\ud558\ub294 dropdown \ud615\uc2dd\uc758 tool 'Switcher' Source,
 * Class Trex.Tool.Switcher \uc640 configuration\uc744 \ud3ec\ud568    
 *     
 */

TrexMessage.addMsg({
	'@switcher.wysiwyg': '\uc5d0\ub514\ud130',
	'@switcher.source': 'HTML',
	'@switcher.text': '\ud14d\uc2a4\ud2b8'
});

TrexConfig.addTool(
	"switcher",
	{
		wysiwygonly: false,
		status: true,
		options: [
			{ label: TXMSG('@switcher.wysiwyg'), title: TXMSG('@switcher.wysiwyg'), data: 'html' },
			{ label: TXMSG('@switcher.source'), title: TXMSG('@switcher.source'), data: 'source' },
			{ label: TXMSG('@switcher.text'), title: TXMSG('@switcher.text'), data: 'text' }
		]
	}
);

Trex.Tool.Switcher = Trex.Class.create({
	$const: {
		__Identity: 'switcher'
	},
	$extend: Trex.Tool,
	oninitialized: function(config) {
			var _canvas = this.canvas;
			
			var _map = {};
			config.options.each(function(option) {
				_map[option.data] = {
					title: option.title
				};
			});
			
			var _cachedProperty = "";
			var _defaultProperty = config.options[0];
			var _toolHandler = function(data) {
				_canvas.changeMode(data);
			};
			
			var _changeMode = function(from, to) {
				if(from == to) return;
				if(_cachedProperty == to) {
					return;
				}
				if(!_map[to]) {
					return;
				}
				this.button.setValue(to);
				this.button.setText(_map[to].title);
				_cachedProperty = to; //NOTE: Cuz modify -> switcher sync
			}.bind(this);
			
			_canvas.observeJob(Trex.Ev.__CANVAS_MODE_CHANGE, _changeMode);
			_canvas.observeJob(Trex.Ev.__CANVAS_MODE_INITIALIZE, _changeMode);

			/* button & menu weave */
			this.weave.bind(this)(
				/* button */
				new Trex.Button.Select(TrexConfig.merge(this.buttonCfg, {
					selectedValue: _defaultProperty.data,
					selectedText: _defaultProperty.label 
				})),
				/* menu */
				new Trex.Menu.Select(this.menuCfg),
				/* handler */
				_toolHandler
			);
		}
	
});
/**
 * @fileoverview 
 *  wysiwyg, source \ub450 \ubaa8\ub4dc\uc758 \ubcc0\uacbd\uc744 \uac00\ub2a5\ud558\uac8c\ud558\ub294 checkbox\ud615\uc2dd\uc758 tool 'SwitcherToggle' Source,
 * Class Trex.Tool.SwitcherToggle \uc640 configuration\uc744 \ud3ec\ud568    
 *     
 */

TrexConfig.addTool(
	"switchertoggle", 
	{
		wysiwygonly: false,
		sync: true,
		status: true,
		options: [
			{ label: '\uc5d0\ub514\ud130', title: "\uc5d0\ub514\ud130", data: 'html' }, 
			{ label: 'HTML', title: "HTML", data: 'source' }
		]
	}
);

Trex.Tool.SwitcherToggle = Trex.Class.create({
	$const: {
		__Identity: 'switchertoggle'
	},
	$extend: Trex.Tool,
	oninitialized: function(config) {
		var _tool = this;
		var _canvas = this.canvas;
		
		var _toolHandler = function() {
			switch(_canvas.mode){
				case 'html':   
					_canvas.changeMode('source');
					break;
				case 'source':
					_canvas.changeMode('html');
					break;					
			}
		};
		
		/* button & menu weave */
		this.weave.bind(this)(
			/* button */
			new Trex.Button.Toggle(TrexConfig.merge(this.buttonCfg, {
				borderClass: 'tx-switchtoggle'
			})),
			/* menu */
			null,
			/* handler */
			_toolHandler
		);
			
		var _toggleCheckbox = function(from, to) {
			this.button.setValue(to == 'source');
		}.bind(this);
		_canvas.observeJob(Trex.Ev.__CANVAS_MODE_INITIALIZE, _toggleCheckbox);
	}
	
});

/**
 * @fileoverview 
 * \uc124\uc815\uc5d0\uc11c \uc9c0\uc815\ub41c \uc5ec\ub7ec \uae00\uaf34\ub4e4\uc744 \uc120\ud0dd\ud560 \uc218 \uc788\ub294 \uba54\ub274\ub97c \ud3ec\ud568\ud558\ub294 tool\uc778 '\uae00\uaf34' Icon\uc744 \uc704\ud55c source\ub85c, 
 * \ud544\uc694\ud55c configuration\uacfc Class Trex.Tool.FontFamily\uc744/\ub97c \ud3ec\ud568    
 * 
 *   
 */

TrexMessage.addMsg({
	'@fontfamily.gulim': '\uad74\ub9bc',
	'@fontfamily.batang': '\ubc14\ud0d5',
	'@fontfamily.dotum': '\ub3cb\uc6c0',
	'@fontfamily.gungsuh': '\uad81\uc11c'
});

TrexConfig.addTool(
	"fontfamily", 
	{
		sync: true,
		status: true,
		useFavorite: true,
		options: [
			{ label: TXMSG('@fontfamily.gulim')+'<span class="tx-txt">(\uac00\ub098\ub2e4\ub77c)</span>', title: TXMSG('@fontfamily.gulim'), data: 'Gulim,\uad74\ub9bc', klass: 'tx-gulim' },
			{ label: TXMSG('@fontfamily.batang')+'<span class="tx-txt">(\uac00\ub098\ub2e4\ub77c)</span>', title: TXMSG('@fontfamily.batang'), data: 'Batang,\ubc14\ud0d5', klass: 'tx-batang' },
			{ label: TXMSG('@fontfamily.dotum')+'<span class="tx-txt">(\uac00\ub098\ub2e4\ub77c)</span>', title: TXMSG('@fontfamily.dotum'), data: 'Dotum,\ub3cb\uc6c0', klass: 'tx-dotum' },
			{ label: TXMSG('@fontfamily.gungsuh')+' <span class="tx-txt">(\uac00\ub098\ub2e4\ub77c)</span>', title: TXMSG('@fontfamily.gungsuh'), data: 'Gungsuh,\uad81\uc11c', klass: 'tx-gungseo' },
			{ label: 'Arial <span class="tx-txt">(abcde)</span>', title: 'Arial', data: 'Arial', klass: 'tx-arial' },
			{ label: 'Verdana <span class="tx-txt">(abcde)</span>', title: 'Verda..', data: 'Verdana', klass: 'tx-verdana' }
		]
	}
);

Trex.Tool.FontFamily = Trex.Class.create({
	$const: {
		__Identity: 'fontfamily'
	},
	$extend: Trex.Tool,
	$mixins: [Trex.I.CookieBaker],
	oninitialized: function(config) {
		var _tool = this;
		var _canvas = this.canvas;
		
		var _selectedProperty = _canvas.getStyleConfig().fontFamily;
		var _webfonts = (($tx.msie && config.webfont && config.webfont.use)? config.webfont.options: []);
		if(!$tx.msie) {
			_webfonts.each(function(webfont) {
				webfont.expired = true;
			});
		}
		var _optionz = (config.options || []).concat(_webfonts);
		
		var _map = {};
		_optionz.each(function(option) {
			var fontArr = option.data.split(",");
			for( var i = 0; i < fontArr.length; i++){
				_map[fontArr[i].toLowerCase()] = option.title;	
			}
			
		});
		_optionz.each(function(option) {
			if (!_map[option.title.toLowerCase()]) {
				_map[option.title.toLowerCase()] = option.title;
			}
		});
		
		var _getTextByValue = function(value) {
			if(_map[value.toLowerCase()]) {
				return _map[value.toLowerCase()];
			} else {
				value = value.replace("_9", "").replace("9", "");
				if (_map[value.toLowerCase()]) {
					return _map[value.toLowerCase()];
				} else {
					return _map[_selectedProperty];
				}
			}
		};
		
		var _useFavorite = false;
		if (config.useFavorite) {
			if (_webfonts.length > 0) {
				_useFavorite = true;
				_tool.initCookie('txFontFamilyFavorite');
			}
		}
		
		var _toolHandler = function(data) {
			_canvas.includeWebfontCss( "font-family: " + data );
			_canvas.execute(function(processor) {
				var _nodes = processor.inlines(function(type) {
					if(type === 'control') {
						return 'img,hr,table';
					}
					return '%text,span,font';
				});
				_nodes.each(function(node) { //clean tag
					$tom.descendants(node, '%inline').each(function(inNode) {
						$tom.applyAttributes(inNode, {
							'style': { 'fontFamily': null },
							'face': null
						});
					});
				});
				processor.apply(_nodes, { 
					'style': { 'fontFamily': data },
					'face': null	
				});
			});
			if(_useFavorite) {
				_tool.writeCookie(_tool.mergeValues(_tool.readCookie(), data));
			}
		};
		
		var _focusLoosed = false;
		var _initHandler = function() {
			_focusLoosed = false;
			if(!_useFavorite) {
				return [];
			}
			_tool.menu.elMenu.scrollTop = 0;
			var _elGroup = $tom.collect(_tool.menu.elMenu, "ul.tx-menu-favlist");
			if(_elGroup) {
				$tom.remove(_elGroup);
			}
			var _favorites = _tool.extractOptions(_optionz, _tool.readCookie());
			var _elGroup = _tool.menu.generateList(_favorites);
			$tom.insertFirst(_tool.menu.elMenu, _elGroup);
			$tx.addClassName(_elGroup, 'tx-menu-favlist');
			return _favorites;
		};

		/* button & menu weave */
		this.weave.bind(this)(
			/* button */
			new Trex.Button.Select(TrexConfig.merge(this.buttonCfg, {
				selectedValue: _selectedProperty,
				selectedText: _getTextByValue(_selectedProperty)
			})),
			/* menu */
			new Trex.Menu.Select(TrexConfig.merge(this.menuCfg, {
				options: _optionz
			})),
			/* handler */
			_toolHandler,
			/* menu init handler */
			_initHandler
		);
		
		if(_webfonts.length > 0) {
			$tx.addClassName(_tool.menu.elMenu, "tx-fontfamily-webfont-menu");
			var _elDummyForFocus = tx.input({'type': 'text', 'className': 'tx-dummyfocus'});
			$tom.append(_tool.menu.elMenu, _elDummyForFocus);
			$tx.observe(_tool.menu.elMenu, 'mousedown', function(ev) {
				if(ev.offsetX < _tool.menu.elMenu.clientWidth) { //not scrollbar
					return;
				}
				_elDummyForFocus.style.top = ev.offsetY.toPx();
				if(!_focusLoosed) {
					_elDummyForFocus.focus();
					_elDummyForFocus.blur();
					_tool.menu.elMenu.focus();
					_focusLoosed = true;
				}
			});
		}
		
		_canvas.observeJob(Trex.Ev.__CANVAS_PANEL_QUERY_STATUS, function() {
			var _data = _canvas.query(function(processor) {
				var _node = processor.findNode('%inline');
				return processor.queryStyle(_node, 'fontFamily');
			});
			
			if(_data == null) { 
				_data = _canvas.query(function(processor) {
					var _node = processor.findNode('%inline');
					return processor.queryAttr('face');
				});
			}
			_data = _data || _selectedProperty;
			try{
				var _dataArr = _data.split(",");
				var _text = "";
				for( var i = 0; i < _dataArr.length; i++ ){
					var _text = _text || _getTextByValue(_dataArr[i]);
				}
				_tool.button.setText(_text);
			}catch(e){ }
		});
	}
});
/**
 * @fileoverview 
 * \uc124\uc815\uc5d0\uc11c \uc9c0\uc815\ub41c \uc5ec\ub7ec fontsize\ub4e4\uc744 \uc120\ud0dd\ud560 \uc218 \uc788\ub294 \uba54\ub274\ub97c \ud3ec\ud568\ud558\ub294 tool\uc778 '\uae00\uc790\ud06c\uae30' Icon\uc744 \uc704\ud55c source\ub85c,
 * Class Trex.Tool.FontSize, configuration \uc744 \ud3ec\ud568    
 * 
 *   
 */
TrexConfig.addTool(
	"fontsize", 
	{
		sync: true,
		status: true,
		options: [
			{ label: '\uac00\ub098\ub2e4\ub77c\ub9c8\ubc14\uc0ac (8pt)', title: '8pt', data: '8pt', klass: 'tx-8pt' },
			{ label: '\uac00\ub098\ub2e4\ub77c\ub9c8\ubc14\uc0ac (9pt)', title: '9pt', data: '9pt', klass: 'tx-9pt' },
			{ label: '\uac00\ub098\ub2e4\ub77c\ub9c8\ubc14\uc0ac (10pt)', title: '10pt', data: '10pt', klass: 'tx-10pt' },
			{ label: '\uac00\ub098\ub2e4\ub77c\ub9c8\ubc14\uc0ac (11pt)', title: '11pt', data: '11pt', klass: 'tx-11pt' },
			{ label: '\uac00\ub098\ub2e4\ub77c\ub9c8\ubc14\uc0ac (12pt)', title: '12pt', data: '12pt', klass: 'tx-12pt' },
			{ label: '\uac00\ub098\ub2e4\ub77c\ub9c8\ubc14\uc0ac (14pt)', title: '14pt', data: '14pt', klass: 'tx-14pt' },
			{ label: '\uac00\ub098\ub2e4\ub77c\ub9c8\ubc14\uc0ac (18pt)', title: '18pt', data: '18pt', klass: 'tx-18pt' },
			{ label: '\uac00\ub098\ub2e4\ub77c\ub9c8 (24pt)', title: '24pt', data: '24pt', klass: 'tx-24pt' },
			{ label: '\uac00\ub098\ub2e4 (36pt)', title: '36pt', data: '36pt', klass: 'tx-36pt' }
		]
	}
);

Trex.Tool.FontSize = Trex.Class.create({
	$const: {
		__Identity: 'fontsize'
	},
	$extend: Trex.Tool,
	oninitialized: function(config) {
		var _tool = this;
		var _canvas = this.canvas;

		var _defaultProperty = _canvas.getStyleConfig().fontSize;
		var _optionz = (config.options || []);
		var _map = {};
		_optionz.each(function(option) {
			_map[option.data] = option.title;
		});
		[
			{ title: '7.5pt', data: '1' }, //NOTE: Cuz font tags
			{ title: '10pt', data: '2' },
			{ title: '12pt', data: '3' },
			{ title: '14pt', data: '4' },
			{ title: '18pt', data: '5' },
			{ title: '24pt', data: '6' },
			{ title: '36pt', data: '7' },
			{ title: '7.5pt', data: '10px'},
			{ title: '8pt', data: '11px' },
			{ title: '9pt', data: '12px' },
			{ title: '10pt', data: '13px' },
			{ title: '11pt', data: '15px' },
			{ title: '12pt', data: '16px' },
			{ title: '14pt', data: '19px' },
			{ title: '18pt', data: '24px' },
			{ title: '24pt', data: '32px' },
			{ title: '36pt', data: '48px' } //NOTE: Cuz Safari
		].each(function(option) {
			_map[option.data] = option.title;
		});
		
		var _getTextByValue = function(value) {
			if(_map[value]) {
				return _map[value];
			} else {
				return value;
			}
		};
		
		var _toolHandler = function(data) {
			_canvas.execute(function(processor) {
				var _nodes = processor.inlines(function(type) {
					if(type === 'control') {
						return 'img,hr,table';
					}
					return '%text,span,font';
				});
				_nodes.each(function(node) { //clean tag
					[node].concat($tom.descendants(node, 'span,font')).each(function(inNode) {
						$tom.applyAttributes(inNode, {
							'style': { 'fontSize': null },
							'size': null
						});
					});
				});
				processor.apply(_nodes, { 
					'style': { 'fontSize': data },
					'size': null	
				});
			});
		};
		
		/* button & menu weave */
		this.weave.bind(this)( 
			/* button */
			new Trex.Button.Select(TrexConfig.merge(this.buttonCfg, {
				selectedValue: _defaultProperty,
				selectedText: _getTextByValue(_defaultProperty)
			})),
			/* menu */
			new Trex.Menu.Select(this.menuCfg),
			/* handler */
			_toolHandler
		);
		
		_canvas.observeJob(Trex.Ev.__CANVAS_PANEL_QUERY_STATUS, function() {
			var _data = _canvas.query(function(processor) {
				var _node = processor.findNode('%inline');
				return processor.queryStyle(_node, 'fontSize');
			});
			
			if(_data == null) { 
				_data = _canvas.query(function(processor) {
					var _node = processor.findNode('%inline');
					return processor.queryAttr('size');
				});
			}
			_data = _data || _defaultProperty;

			if (_data.indexOf('px') != -1 ) {
				_data = Math.round( parseFloat(_data) ) + 'px';
			}
			
			var _text = _getTextByValue(_data);
			_tool.button.setText(_text);
		});
	}
});
/**
 * @fileoverview 
 * Toolbar\uc758 Bold Icon\uc744 \uc704\ud574 \ud544\uc694\ud55c configuration\uacfc Class Trex.Tool.Bold\uc744/\ub97c \ud3ec\ud568    
 *  
 */
TrexConfig.addTool(
	"bold", 
	{
		wysiwygonly: true,
		sync: true,
		status: true
	}
);

Trex.Tool.Bold = Trex.Class.create({
	$const: {
		__Identity: 'bold'
	},
	$extend: Trex.Tool,
	oninitialized: function(config) {
		var _tool = this;
		var _canvas = this.canvas;
		
		var _btn = new Trex.Button(this.buttonCfg);
			
		var _toolHandler = function() {
			if(_canvas.canHTML()){
				_canvas.execute(function(processor) {
					processor.execCommand('bold', null);
				});
				_canvas.syncProperty();
			}else{
				_btn.setState(true);
				_canvas.execute(function(processor) {
					processor.insertTag('<strong>','</strong>');
				});
			}
		};

		/* button & menu weave */
		this.weave.bind(this)(
			/* button */
			_btn,
			/* menu */
			null,
			/* handler */
			_toolHandler);

		var _cachedProperty = false;
		_canvas.observeJob(Trex.Ev.__CANVAS_PANEL_QUERY_STATUS, function() {
			var _data = _canvas.query(function(processor) {
				return processor.queryCommandState('bold');
			});
			if(_cachedProperty == _data) {
				return;
			}
			_tool.button.setState(_data);
			_cachedProperty = _data;
		});
		
		_canvas.observeKey({ // ctrl + b - \uad75\uac8c
			ctrlKey: true,
			altKey: false,
			shiftKey: false,
			keyCode: 66
		}, _toolHandler);
	}
	
});
/**
 * @fileoverview 
 *  Tool 'Underline' Source,
 *  Class Trex.Tool.Underline  configuration \uc744 \ud3ec\ud568 \ud558\uace0\uc788\ub2e4.    
 * 
 */
TrexConfig.addTool(
	"underline",
	{
		wysiwygonly: true,
		sync: true,
		status: true
	}
);

Trex.Tool.Underline = Trex.Class.create({
	$const: {
		__Identity: 'underline'
	},
	$extend: Trex.Tool,
	oninitialized: function(config) {
		var _tool = this;
		var _canvas = this.canvas;

		var _btn = new Trex.Button(this.buttonCfg);
			
		var _toolHandler = function() {
			if (_canvas.canHTML()) {
				_canvas.execute(function(processor){
					processor.execCommand('underline', null);
				});
				_canvas.syncProperty('underline');
			}else{
				_btn.setState(true);
				_canvas.execute(function(processor) {
					processor.insertTag('<u>','</u>');
				});
			}	
		};

		/* button & menu weave */
		this.weave.bind(this)(
			/* button */
			_btn,
			/* menu */
			null,
			/* handler */
			_toolHandler
		);

		var _cachedProperty = false;
		_canvas.observeJob(Trex.Ev.__CANVAS_PANEL_QUERY_STATUS, function() {
			var _data = _canvas.query(function(processor) {
				return processor.queryCommandState('underline');
			});
			if(_cachedProperty == _data) {
				return;
			}
			_tool.button.setState(_data);
			_cachedProperty = _data;
		});
		
		_canvas.observeKey({// ctrl + u
			ctrlKey: true,
			altKey: false,
			shiftKey: false,
			keyCode: 85
		}, _toolHandler);
	}
});/**
 * @fileoverview 
 * 'Italic' Icon Source,
 * Class Trex.Tool.Italic\uacfc configuration\uc744 \ud3ec\ud568    
 *     
 */
TrexConfig.addTool(
	"italic",
	{
		wysiwygonly: true,
		sync: true,
		status: true
	}
);

Trex.Tool.Italic = Trex.Class.create({
	$const: {
		__Identity: 'italic'
	},
	$extend: Trex.Tool,
	oninitialized: function(config) {
		var _tool = this;
		var _canvas = this.canvas;

		var _btn = new Trex.Button(this.buttonCfg);
			
		var _toolHandler = function() {
			if(_canvas.canHTML()){
				_canvas.execute(function(processor) {
					processor.execCommand('italic', null);
				});
				_canvas.syncProperty('italic');
			}else{
				_btn.setState(true);
				_canvas.execute(function(processor) {
					processor.insertTag('<em>','</em>');
				});
			}
		};

		/* button & menu weave */
		this.weave.bind(this)(
			/* button */
			_btn,
			/* menu */
			null,
			/* handler */
			_toolHandler
		);

		var _cachedProperty = false;
		_canvas.observeJob(Trex.Ev.__CANVAS_PANEL_QUERY_STATUS, function() {
			var _data = _canvas.query(function(processor) {
				return processor.queryCommandState('italic');
			});
			if(_cachedProperty == _data) {
				return;
			}
			_tool.button.setState(_data);
			_cachedProperty = _data;
		});
		
		_canvas.observeKey({// ctrl + i - \uae30\uc6b8\uc784
			ctrlKey: true,
			altKey: false,
			shiftKey: false,
			keyCode: 73
		}, _toolHandler);
	}
	
});/**
 * @fileoverview 
 *  Tool '\ucde8\uc18c\uc120' Source,
 * Class Trex.Tool.Strike \uc640 configuration\uc744 \ud3ec\ud568    
 *     
 */
TrexConfig.addTool(
	"strike",
	{
		wysiwygonly: true,
		sync: true,
		status: true
	}
);

Trex.Tool.Strike = Trex.Class.create({
	$const: {
		__Identity: 'strike'
	},
	$extend: Trex.Tool,
	oninitialized: function(config) {
		var _tool = this;
		var _canvas = this.canvas;

		var _btn = new Trex.Button(this.buttonCfg);
			
		var _toolHandler = function() {
			if(_canvas.canHTML()){
				_canvas.execute(function(processor) {
					processor.execCommand('strikethrough', null);
				});
				_canvas.syncProperty('strikethrough');
			}else{
				_btn.setState(true);
				_canvas.execute(function(processor) {
					processor.insertTag('<strike>','</strike>');
				});
			}	
		};

		/* button & menu weave */
		this.weave.bind(this)(
			/* button */
			_btn,
			/* menu */
			null,
			/* handler */
			_toolHandler
		);

		var _cachedProperty = false;
		_canvas.observeJob(Trex.Ev.__CANVAS_PANEL_QUERY_STATUS, function() {
			var _data = _canvas.query(function(processor) {
				return processor.queryCommandState('strikethrough');
			});
			if(_cachedProperty == _data) {
				return;
			}
			_tool.button.setState(_data);
			_cachedProperty = _data;
		});
		
		_canvas.observeKey({// ctrl + d
			ctrlKey: true,
			altKey: false,
			shiftKey: false,
			keyCode: 68
		}, _toolHandler);
	}

});/**
 * @fileoverview 
 * \uae00\uc790\uc0c9\uc744 \ubcc0\uacbd\ud558\uae30 \uc704\ud574 \uc4f0\uc774\ub294 '\uae00\uc790\uc0c9' Icon\uc744 \uc704\ud574 \ud544\uc694\ud55c source, 
 * Class Trex.Tool.ForeColor \uc640 configuration\uc744 \ud3ec\ud568    
 *  
 */
TrexConfig.addTool(
	"forecolor",
	{ 
		defaultcolor: "#7c84ef",
		wysiwygonly: true,
		sync: false,
		status: true,
		useFavorite: false,
		thumbs: Trex.__CONFIG_COMMON.thumbs,
		needRevert: true
	}
);

Trex.Tool.ForeColor = Trex.Class.create({
	$const: {
		__Identity: 'forecolor'
	},
	$extend: Trex.Tool,
	$mixins: [Trex.I.CookieBaker],
	oninitialized: function(config) {
		var _tool = this; 
		var _canvas = this.canvas;
		
		var _useFavorite = false;
		if (config.useFavorite) {
			_useFavorite = true;
			_tool.initCookie('txForeColorFavorite');
		}
		
		var _selectedProperty = config.defaultcolor;
		if (_useFavorite) {
			if(_tool.readCookie()) {
				_selectedProperty = _tool.readCookie();
			}
		}
		
		var _revertForeColor = _canvas.getStyleConfig('color');
		var _toolHandler = function(color) {
			if (_canvas.canHTML()) {
				_canvas.execute(function(processor) {
					if (color == null) {
						processor.execCommand('forecolor', _revertForeColor);
					} else {
						processor.execCommand('forecolor', color);
					}
				});	
			} else {
				_canvas.execute(function(processor) {
					processor.insertTag('<span style="color: ' +color+';" >','</span>');
				});
			}
			if(color) {
				$tx.setStyle( _tool.button.elButton, {'backgroundColor': color});
			}
			if(_useFavorite) {
				_tool.writeCookie(color);
			}
		};

		/* button & menu weave */
		this.weave.bind(this)(
			/* button */
			new Trex.Button.Splits(TrexConfig.merge(this.buttonCfg, {
				selectedValue: _selectedProperty
			})),
			/* menu */
			new Trex.Menu.ColorPallete(this.menuCfg),
			/* handler */
			_toolHandler
		);
		$tx.setStyle( _tool.button.elButton, {'backgroundColor': _selectedProperty});
	}
});


/**
 * @fileoverview 
 *  \uae00\uc790 \ubc30\uacbd\uc0c9\uc744 \uc801\uc6a9 \ud558\uae30 \uc704\ud574 \uc4f0\uc774\ub294, Toolbar\uc758 \uae00\uc790\ubc30\uacbd\uc0c9 Icon\uc744 \uc704\ud574 \ud544\uc694\ud55c 
 *  configuration\uacfc Class Trex.Tool.BackColor\uc744/\ub97c \ud3ec\ud568
 * 
 */
TrexConfig.addTool(
	"backcolor",
	{
		defaultcolor: "#9aa5ea",
		wysiwygonly: true, 
		sync: false,
		status: true,
		useFavorite: true,
		texts: {
			options: [
				{ color: '#ff0000', text: '#ffffff', label: '\uac00\ub098\ub2e4' },
				{ color: '#e545d0', text: '#ffffff', label: '\uac00\ub098\ub2e4' },
				{ color: '#000000', text: '#ffffff', label: '\uac00\ub098\ub2e4' },
				{ color: '#ff5e00', text: '#ffffff', label: '\uac00\ub098\ub2e4' },
				{ color: '#7c43b1', text: '#ffffff', label: '\uac00\ub098\ub2e4' },
				{ color: '#848484', text: '#ffffff', label: '\uac00\ub098\ub2e4' },
				{ color: '#ffbb00', text: '#ffffff', label: '\uac00\ub098\ub2e4' },
				{ color: '#4673ff', text: '#ffffff', label: '\uac00\ub098\ub2e4' },
				{ color: '#66e8ff', text: '#000000', label: '\uac00\ub098\ub2e4' },
				{ color: '#ffe400', text: '#ffffff', label: '\uac00\ub098\ub2e4' }, 
				{ color: '#1fafda', text: '#ffffff', label: '\uac00\ub098\ub2e4' },
				{ color: '#8cfccb', text: '#000000', label: '\uac00\ub098\ub2e4' },
				{ color: '#a8c40d', text: '#ffffff', label: '\uac00\ub098\ub2e4' },
				{ color: '#009999', text: '#ffffff', label: '\uac00\ub098\ub2e4' },
				{ color: '#ffffff', text: '#000000', label: '\uac00\ub098\ub2e4' }
			]
		},
		thumbs: Trex.__CONFIG_COMMON.thumbs,
		needRevert: true,
		needTrans: false
	}
);

Trex.Tool.BackColor = Trex.Class.create({
	$const: {
		__Identity: 'backcolor'
	},
	$extend: Trex.Tool,
	$mixins: [Trex.I.CookieBaker],
	oninitialized: function(config) {
		var _tool = this;
		var _canvas = this.canvas;

		var _useFavorite = false;
		if (config.useFavorite) {
			_useFavorite = true;
			_tool.initCookie('txBackColorFavorite');
		}
		
		var _selectedProperty = config.defaultcolor;
		if (_useFavorite) {
			if(_tool.readCookie()) {
				_selectedProperty = _tool.readCookie();
			}
		}
		
		var _revertBackColor = "transparent";
		var _revertForeColor = _canvas.getStyleConfig('color');
		var _command = ($tx.gecko || $tx.opera ? 'hilitecolor': 'backcolor');
		var _toolHandler = function(color) {
			var _color = color ? color.split('|')[0] : null;
			var _text = (color && color.indexOf('|') > -1)? color.split('|')[1]: null;
			_canvas.execute(function(processor) {
				if (_canvas.canHTML()) {
					if(_color == null) {
						processor.execCommand(_command, _revertBackColor);
						processor.execCommand('forecolor', _revertForeColor);
					} else {
						processor.execCommand(_command, _color);
						if(_text) {
							processor.execCommand('forecolor', _text);
						}
					}
				}else{
					_canvas.execute(function(processor) {
						processor.insertTag('<span style="background-color: ' +_color+';" >','</span>');
					});
				}
			});
			if(_color) {
				$tx.setStyle( _tool.button.elButton, {'backgroundColor': _color});
			}
			if(_useFavorite) {
				_tool.writeCookie(color);
			}
		};

		/* button & menu weave */
		this.weave.bind(this)(
			/* button */
			new Trex.Button.Splits(Object.extend(this.buttonCfg, {
				selectedValue: _selectedProperty
			})),
			/* menu */
			new Trex.Menu.ColorPallete(this.menuCfg),
			/* handler */
			_toolHandler
		);
		$tx.setStyle( _tool.button.elButton, {'backgroundColor': _selectedProperty.split('|')[0]});
	}
	
});
/**
 * @fileoverview 
 * Toolbar\uc758 AlignLeft Icon\uc744 \uc704\ud574 \ud544\uc694\ud55c configuration\uacfc Class Trex.Tool.AlignLeft\uc744/\ub97c \ud3ec\ud568    
 * 
 */
TrexConfig.addTool(
	"alignleft",
	{
		sync: true,
		status: true,
		radio: true
	}
);

Trex.Tool.AlignLeft = Trex.Class.create({
	$const: {
		__Identity: 'alignleft'
	},
	$extend: Trex.Tool,
	$mixins: [Trex.I.AlignExecution],
	oninitialized: function(config) {
		var _tool = this;
		var _toolbar = this.toolbar;
		var _canvas = this.canvas;
		
		/*
		 * Text : align left
		 * Image : float none + align left
		 */
		var __TextAlignProperty = "left";
		var __ImageFloatProperty = 'none';
		var __ImageClearProperty = 'none';

		_tool.imageAlignMode = false;
		var _toolHandler = function() {
			_canvas.execute(function(processor) {
				if (_tool.imageAlignMode) {
					_tool.executeAlignImageMode(processor);
					_toolbar.fireJobs(Trex.Ev.__CMD_ALIGN_IMG_LEFT);
				} else {
					_tool.executeAlignTextMode(processor);
					_toolbar.fireJobs(Trex.Ev.__CMD_ALIGN_LEFT);
				}
			});
			_canvas.syncProperty();
		};

		/* button & menu weave */
		this.weave.bind(this)(
			/* button */
			new Trex.Button(this.buttonCfg),
			/* menu */
			null,
			/* handler */
			_toolHandler);

		_canvas.observeJob(Trex.Ev.__CANVAS_PANEL_QUERY_STATUS, function() {
			if(_tool.imageAlignMode) {
				_data = _canvas.query(function(processor) {
					var _textAlign = _tool.queryTextAlign(processor);
					if (_textAlign == __TextAlignProperty) {
						var _float = _tool.queryImageFloat(processor);
						_float = _float || 'none';
						return (_float == __ImageFloatProperty);
					} else {
						return false;
					}
				});
				_tool.button.setState(_data);
			} else {
				_data = _canvas.query(function(processor){
					var _controlAlign = _tool.queryControlAlign(processor);
					if(_controlAlign == null) {
						var _textAlign = _tool.queryTextAlign(processor);
						return (_textAlign == __TextAlignProperty);
					} else {
						return (_controlAlign == __TextAlignProperty);
					}
				});
				_tool.button.setState(_data);
			}
		});
		
		_canvas.observeKey({ // ctrl + ,
			ctrlKey: true,
			altKey: false,
			shiftKey: false,
			keyCode: 188
		}, _toolHandler);
		
		Trex.Tool.AlignLeft.__ImageModeProps = {
			'paragraph': {
				'align': null,
				'style': {
					'textAlign': __TextAlignProperty
				}
			},
			'image': {
				'style': {
					'clear': __ImageClearProperty,
					'float': __ImageFloatProperty,
					'marginLeft': "",
					'marginRight': ""
				}
			}
		};
		
		Trex.Tool.AlignLeft.__TextModeProps = {
			'paragraph': {
				'align': null,
				'style': {
					'textAlign': __TextAlignProperty
				}
			}
		};
	}
});


/**
 * @fileoverview 
 * Toolbar\uc758 AlignCenter Icon\uc744 \uc704\ud574 \ud544\uc694\ud55c configuration\uacfc Class Trex.Tool.AlignCentrer\ub97c \ud3ec\ud568    
 * 
 */
TrexConfig.addTool(
	"aligncenter",
	{
		sync: true,
		status: true,
		radio: true
	}
);

Trex.Tool.AlignCenter = Trex.Class.create({
	$const: {
		__Identity: 'aligncenter'
	},
	$extend: Trex.Tool,
	$mixins: [Trex.I.AlignExecution],
	oninitialized: function(config) {
		var _tool = this;
		var _toolbar = this.toolbar;
		var _canvas = this.canvas;
		
		/*
		 * Text : align center
		 * Image : float none + align center
		 */
		var __TextAlignProperty = "center";
		var __ImageFloatProperty = 'none';
		var __ImageClearProperty = 'none';

		_tool.imageAlignMode = false;
		var _toolHandler = function() {
			_canvas.execute(function(processor) {
				if (_tool.imageAlignMode) {
					_tool.executeAlignImageMode(processor);
					_toolbar.fireJobs(Trex.Ev.__CMD_ALIGN_IMG_CENTER);
				} else {
					_tool.executeAlignTextMode(processor);
					_toolbar.fireJobs(Trex.Ev.__CMD_ALIGN_CENTER);
				}
			});
			_canvas.syncProperty();
		};

		/* button & menu weave */
		this.weave.bind(this)(
			/* button */
			new Trex.Button(this.buttonCfg),
			/* menu */
			null,
			/* handler */
			_toolHandler);

		_canvas.observeJob(Trex.Ev.__CANVAS_PANEL_QUERY_STATUS, function() {
			if(_tool.imageAlignMode) {
				_data = _canvas.query(function(processor) {
					var _textAlign = _tool.queryTextAlign(processor);
					if (_textAlign == __TextAlignProperty) {
						var _float = _tool.queryImageFloat(processor);
						_float = _float || 'none';
						return (_float == __ImageFloatProperty);
					} else {
						return false;
					}
				});
				_tool.button.setState(_data);
			} else {
				_data = _canvas.query(function(processor){
					var _controlAlign = _tool.queryControlAlign(processor);
					if(_controlAlign == null) {
						var _textAlign = _tool.queryTextAlign(processor);
						return (_textAlign == __TextAlignProperty);
					} else {
						return (_controlAlign == __TextAlignProperty);
					}
				});
				_tool.button.setState(_data);
			}
		});
		
		_canvas.observeKey({ // ctrl + .
			ctrlKey: true,
			altKey: false,
			shiftKey: false,
			keyCode: 190
		}, _toolHandler);
		
		Trex.Tool.AlignCenter.__ImageModeProps = {
			'paragraph': {
				'align': null,
				'style': {
					'textAlign': __TextAlignProperty
				}
			},
			'image': {
				'style': {
					'clear': __ImageClearProperty,
					'float': __ImageFloatProperty
				}
			}
		};
		
		Trex.Tool.AlignCenter.__TextModeProps = {
			'paragraph': {
				'align': null,
				'style': {
					'textAlign': __TextAlignProperty
				}
			}
		};
		
	}
});/**
 * @fileoverview 
 * Toolbar\uc758 AlignRight Icon\uc744 \uc704\ud574 \ud544\uc694\ud55c configuration\uacfc Class Trex.Tool.AlignRight\uc744/\ub97c \ud3ec\ud568    
 * 
 */
TrexConfig.addTool(
	"alignright",
	{
		sync: true,
		status: true,
		radio: true
	}
);

Trex.Tool.AlignRight = Trex.Class.create({
	$const: {
		__Identity: 'alignright'
	},
	$extend: Trex.Tool,
	$mixins: [Trex.I.AlignExecution],
	oninitialized: function(config) {
		var _tool = this;
		var _toolbar = this.toolbar;
		var _canvas = this.canvas;
		
		/*
		 * Text : align right
		 * Image : float left
		 */
		var __TextAlignProperty = "right";
		var __ImageFloatProperty = 'left';
		var __ImageClearProperty = 'both';

		_tool.imageAlignMode = false;
		var _toolHandler = function() {
			_canvas.execute(function(processor) {
				if (_tool.imageAlignMode) {
					_tool.executeAlignImageMode(processor);
					_toolbar.fireJobs(Trex.Ev.__CMD_ALIGN_IMG_FLOAT_LEFT);
				} else {
					_tool.executeAlignTextMode(processor);
					_toolbar.fireJobs(Trex.Ev.__CMD_ALIGN_RIGHT);
				}
			});
			_canvas.syncProperty();
		};

		/* button & menu weave */
		this.weave.bind(this)(
			/* button */
			new Trex.Button(this.buttonCfg),
			/* menu */
			null,
			/* handler */
			_toolHandler);
		
		_canvas.observeJob(Trex.Ev.__CANVAS_PANEL_QUERY_STATUS, function() {
			if(_tool.imageAlignMode) {
				var _data = _canvas.query(function(processor) {
					var _float = _tool.queryImageFloat(processor);
					return (_float == __ImageFloatProperty);
				});
				_tool.button.setState(_data);
			} else {
				var _data = _canvas.query(function(processor) {
					var _controlAlign = _tool.queryControlAlign(processor);
					if(_controlAlign == null) {
						var _textAlign = _tool.queryTextAlign(processor) || 'left';
						return (_textAlign == __TextAlignProperty);
					} else {
						return (_controlAlign == __TextAlignProperty);
					}	
				});
				_tool.button.setState(_data);
			}
		});
		
		_canvas.observeKey({ // ctrl + /
			ctrlKey: true,
			altKey: false,
			shiftKey: false,
			keyCode: 191
		}, _toolHandler);
		
		Trex.Tool.AlignRight.__ImageModeProps = {
			'image': {
				'style': {
					'clear': __ImageClearProperty,
					'float': __ImageFloatProperty
				}
			}
		};
		
		Trex.Tool.AlignRight.__TextModeProps = {
			'paragraph': {
				'align': null,
				'style': {
					'textAlign': __TextAlignProperty
				}
			}
		};
	}
});/**
 * @fileoverview 
 * Toolbar\uc758 AlignFull Icon\uc744 \uc704\ud574 \ud544\uc694\ud55c configuration\uacfc Class Trex.Tool.AlignFull\uc744 \ud3ec\ud568    
 * 
 */
TrexConfig.addTool(
	"alignfull",
	{
		sync: true,
		status: true,
		radio: true
	}
);

Trex.Tool.AlignFull = Trex.Class.create({
	$const: {
		__Identity: 'alignfull'
	},
	$extend: Trex.Tool,
	$mixins: [Trex.I.AlignExecution],
	oninitialized: function(config) {
		var _tool = this;
		var _toolbar = this.toolbar;
		var _canvas = this.canvas;
		
		/*
		 * Text : align full
		 * Image : float right
		 */
		var __TextAlignProperty = "justify";
		var __ImageFloatProperty = 'right';
		var __ImageClearProperty = 'both';
		
		_tool.imageAlignMode = false;
		var _toolHandler = function() {
			_canvas.execute(function(processor) {
				if (_tool.imageAlignMode) {
					_tool.executeAlignImageMode(processor);
					_toolbar.fireJobs(Trex.Ev.__CMD_ALIGN_IMG_FLOAT_RIGHT);
				} else {
					_tool.executeAlignTextMode(processor);
					_toolbar.fireJobs(Trex.Ev.__CMD_ALIGN_FULL);
				}
			});
			_canvas.syncProperty();
		};
		
		/* button & menu weave */
		this.weave.bind(this)(
			/* button */
			new Trex.Button(this.buttonCfg),
			/* menu */
			null,
			/* handler */
			_toolHandler);

		_canvas.observeJob(Trex.Ev.__CANVAS_PANEL_QUERY_STATUS, function() {
			if(_tool.imageAlignMode) {
				var _data = _canvas.query(function(processor) {
					var _float = _tool.queryImageFloat(processor);
					return (_float == __ImageFloatProperty);
				});
				_tool.button.setState(_data);
			} else {
				var _data = _canvas.query(function(processor) {
					var _controlAlign = _tool.queryControlAlign(processor);
					if(_controlAlign == null) {
						var _textAlign = _tool.queryTextAlign(processor) || 'left';
						return (_textAlign == __TextAlignProperty);
					} else {
						return (_controlAlign == __TextAlignProperty);
					}	
				});
				_tool.button.setState(_data);
			}
		});
		
		Trex.Tool.AlignFull.__ImageModeProps = {
			'image': {
				'style': {
					'clear': __ImageClearProperty,
					'float': __ImageFloatProperty
				}
			}
		};
		
		Trex.Tool.AlignFull.__TextModeProps = {
			'paragraph': {
				'align': null,
				'style': {
					'textAlign': __TextAlignProperty
				}
			}
		};
	}
});/**
 * @fileoverview 
 * '\uc904\uac04\uaca9' Icon Source,
 * Class Trex.Tool.LineHeight configuration\uc744 \ud3ec\ud568    
 *     
 */
TrexConfig.addTool(
	"lineheight",
	{
		sync: false,
		status: true,
		options: [
			{ label: '50%', title: '50%', data: '0.5' },
			{ label: '80%', title: '80%', data: '0.8' },
			{ label: '100%', title: '100%', data: '1.0' },
			{ label: '120%', title: '120%', data: '1.2' },
			{ label: '150%', title: '150%', data: '1.5' },
			{ label: '180%', title: '180%', data: '1.8' },
			{ label: '200%', title: '200%', data: '2.0' }
		]
	}
);

Trex.Tool.LineHeight = Trex.Class.create({
	$const: {
		__Identity: 'lineheight'
	},
	$extend: Trex.Tool,
	oninitialized: function(config) {
		var _toolbar = this.toolbar;
		var _canvas = this.canvas;

		var _defaultProperty = _canvas.getStyleConfig().lineHeight;
		var _optionz = (config.options || []);
		var _map = {};
		_optionz.each(function(option) {
			_map[option.data] = option.title;
		});

		var _toolHandler = function(command) {
			_canvas.execute(function(processor) {
				var _nodes = processor.blocks(function(type) {
					return '%paragraph';
				});
				processor.apply(_nodes, { 
					'style': {
						'lineHeight': command
					}
				});	
			});
		};
		
		/* button & menu weave */
		this.weave.bind(this)(
			/* button */
			new Trex.Button.Select(TrexConfig.merge(this.buttonCfg, {
				selectedValue: _defaultProperty
			})),
			/* menu */
			new Trex.Menu.Select(this.menuCfg),
			/* handler */
			_toolHandler);

		var _cachedProperty = _defaultProperty; 
		var _syncProperty = function() {
			var _data = _canvas.query(function(processor) {
				var _node = processor.findNode('%paragraph');
				return processor.queryStyle(_node, 'lineHeight');
			});
			_data = _data || _defaultProperty;
			if(_cachedProperty == _data) {
				return;
			}
			this.button.setText(_data);
			_cachedProperty = _data;
		}.bind(this);
	}
});

/**
 * @fileoverview 
 *  \uc5ec\ub7ec Style\uc758 \ub9ac\uc2a4\ud2b8\ub97c \uc0bd\uc785 \ud560 \uc218 \uc788\ub294 Tool 'styledlist' Source,
 * Class Trex.Tool.StyledList \uc640 configuration\uc744 \ud3ec\ud568    
 *     
 */

TrexMessage.addMsg({
	'@styledlist.subtitle1': '\ucde8\uc18c',
	'@styledlist.subtitle2': '\ub3d9\uadf8\ub77c\ubbf8',
	'@styledlist.subtitle3': '\ub124\ubaa8',
	'@styledlist.subtitle4': '\uc22b\uc790',
	'@styledlist.subtitle5': '\ub85c\ub9c8\uc22b\uc790',
	'@styledlist.subtitle6': '\uc54c\ud30c\ubcb3'
});

TrexConfig.addTool(
	"styledlist",
	{
		sync: false,
		status: true,
		options: [
			{ label: TXMSG('@styledlist.subtitle1'), title: 'cancel', type: 'cancel', data: 'cancel', klass: 'tx-styledlist-0' },
			{ label: TXMSG('@styledlist.subtitle2'), title: 'disc', type: 'ul', data: 'disc', klass: 'tx-styledlist-1' },
			{ label: TXMSG('@styledlist.subtitle3'), title: 'square', type: 'ul', data: 'square', klass: 'tx-styledlist-2' },
			{ label: TXMSG('@styledlist.subtitle4'), title: 'decimal', type: 'ol', data: 'decimal', klass: 'tx-styledlist-3' },
			{ label: TXMSG('@styledlist.subtitle5'), title: 'upper-roman', type: 'ol', data: 'upper-roman', klass: 'tx-styledlist-4' },
			{ label: TXMSG('@styledlist.subtitle6'), title: 'upper-alpha', type: 'ol', data: 'upper-alpha', klass: 'tx-styledlist-5' }
		]
	}
);

Trex.Tool.StyledList = Trex.Class.create({
	$const: {
		__Identity: 'styledlist'
	},
	$extend: Trex.Tool,
	$mixins: [Trex.I.ListExecution],
	oninitialized: function(config) {
		var _tool = this;
		var _toolbar = this.toolbar;
		var _canvas = this.canvas;

		var _defaultProperty = "decimal";
		var _map = {};
		config.options.each(function(option) {
			_map[option.data] = {
				type: option.type,
				klass: option.klass
			};
		});
		
		var _getClassByValue = function(value) {
			if(_map[value]) {
				return _map[value].klass;
			} else {
				return _map[_defaultProperty].klass;
			}
		};

		var _toolHandler = function(data) {
			if(!_map[data]) {
				return;
			}
			var _type = _map[data].type;
			var _class = _map[data].klass;
			var _attributes = {
				'style': {
					'listStyleType': data
				}
			};
			
			_canvas.execute(function(processor) {
				if (_type == "cancel") {
					_tool.executeOffList(processor);
				} else {
					_tool.executeToList(processor, _type, _attributes);
				}
			});
		};
		
		var _initHandler = function() {
			var _insideList = _canvas.query(function(processor) {
				return !!processor.findNode('%listhead');
			});
			var _elCancel = $tom.collect(_tool.menu.elMenu, 'li');
			if(_insideList) {
				$tx.show(_elCancel);
			} else {
				$tx.hide(_elCancel);
			}
		};
		
		/* button & menu weave */
		this.weave.bind(this)(
			/* button */
			new Trex.Button.StyledList(this.buttonCfg),
			/* menu */
			new Trex.Menu.Select(this.menuCfg),
			/* handler */
			_toolHandler,
			_initHandler
		);
			
		var _cachedProperty = _defaultProperty; 
		_canvas.observeJob(Trex.Ev.__CANVAS_PANEL_QUERY_STATUS, function() {
			var _data = _canvas.query(function(processor) {
				var _node = processor.findNode('%listhead');
				return processor.queryStyle(_node, 'listStyleType');
			});
			_data = _data || _defaultProperty;
			if(_cachedProperty == _data) {
				return;
			}

			var _text = _getClassByValue(_data);
			_tool.button.setText(_text);
			_cachedProperty = _data;
		});

		_canvas.observeKey({ // ctrl + alt + u
			ctrlKey: true,
			altKey: true,
			shiftKey: false,
			keyCode: 85
		}, _toolHandler.bind(this, "disc"));

		_canvas.observeKey({ // ctrl + alt + o
			ctrlKey: true,
			altKey: true,
			shiftKey: false,
			keyCode: 79
		}, _toolHandler.bind(this, "decimal"));
	}
	
});

Trex.Button.StyledList = Trex.Class.create({
	$extend: Trex.Button.Select,
	setText: function(text) {
		this.elIcon.className = "tx-icon " + text;
	}
});/**
 * @fileoverview 
 * OL\uc744 \uc0bd\uc785\ud558\ub294 '\ubc88\ud638\ub9e4\uae30\uae30' Source,
 * Class Trex.Tool.OrderedList\uc640 configuration\uc744 \ud3ec\ud568    
 *     
 */
TrexConfig.addTool(
	"ordered",
	{
		radio: true,
		sync: true,
		status: true
	}
);

Trex.Tool.OrderedList = Trex.Class.create({
	$const: {
		__Identity: 'ordered'
	},
	$extend: Trex.Tool,
	$mixins: [Trex.I.ListExecution],
	oninitialized: function(config) {
		var _tool = this;
		var _canvas = this.canvas;
		var _toolbar = this.toolbar;

		var _toolHandler = function() {
			_toolbar.tools["unordered"].button.normalState();
			/*if(_toolbar.tools["ordered"].button.isPushed()){
				return false;
			}*/
			
			_canvas.execute(function(processor) {
				var _bNode = processor.findNode('%listhead');
				if (_bNode) {
					if ($tom.kindOf(_bNode, "ol")) {
						_tool.executeOffList(processor);
					} else {
						_tool.executeToList(processor, "ol", {});
					}
				} else {
					_tool.executeToList(processor, "ol", {});
				}
			});
		};

		/* button & menu weave */
		this.weave.bind(this)(
			/* button */
			new Trex.Button(this.buttonCfg),
			/* menu */
			null,
			/* handler */
			_toolHandler
		);

		var _cachedProperty = null;
		_canvas.observeJob(Trex.Ev.__CANVAS_PANEL_QUERY_STATUS, function() {
			var _data = _canvas.query(function(processor) {
				return processor.queryCommandState('insertorderedlist');
			});
			if(_cachedProperty == _data) {
				return;
			}
			_tool.button.setState(_data);
			_cachedProperty = _data;
		});
		
		_canvas.observeKey({ // ctrl + o
			ctrlKey: true,
			altKey: true,
			shiftKey: false,
			keyCode: 79
		}, _toolHandler);
	}
	
});/**
 * @fileoverview 
 * UL\uc744 \uc0bd\uc785\ud558\ub294 '\uae00\uba38\ub9ac \uae30\ud638' Source,
 * Class Trex.Tool.UnorderedList \uc640 configuration\uc744 \ud3ec\ud568    
 *     
 */
TrexConfig.addTool(
	"unordered",
	{
		radio: true,
		sync: true,
		status: true
	}
);

Trex.Tool.UnorderedList = Trex.Class.create({
	$const: {
		__Identity: 'unordered'
	},
	$extend: Trex.Tool,
	$mixins: [Trex.I.ListExecution],
	oninitialized: function(config) {
		var _tool = this;
		var _canvas = this.canvas;
		var _toolbar = this.toolbar;
		
		var _toolHandler = function() {
			_toolbar.tools["ordered"].button.normalState();
			/*if(_toolbar.tools["unordered"].button.isPushed()){
				return false;
			}*/
			
			_canvas.execute(function(processor) {
				var _bNode = processor.findNode('%listhead');
				if (_bNode) {
					if ($tom.kindOf(_bNode, "ul")) {
						_tool.executeOffList(processor);
					} else {
						_tool.executeToList(processor, "ul", {});
					}
				} else {
					_tool.executeToList(processor, "ul", {});
				}
			});
		};

		/* button & menu weave */
		this.weave.bind(this)(
			/* button */
			new Trex.Button(this.buttonCfg),
			/* menu */
			null,
			/* handler */
			_toolHandler
		);
			
		var _cachedProperty = null;
		_canvas.observeJob(Trex.Ev.__CANVAS_PANEL_QUERY_STATUS, function() {
			var _data = _canvas.query(function(processor) {
				return processor.queryCommandState('insertunorderedlist');
			});
			if(_cachedProperty == _data) {
				return;
			}
			_tool.button.setState(_data);
			_cachedProperty = _data;
		});
		
		_canvas.observeKey({ // ctrl + u
			ctrlKey: true,
			altKey: true,
			shiftKey: false,
			keyCode: 85
		}, _toolHandler);
	}
});/**
 * @fileoverview 
 * '\ub4e4\uc5ec\uc4f0\uae30' Icon Source,
 * Class Trex.Tool.Indent configuration\uc744 \ud3ec\ud568    
 *     
 */
TrexConfig.addTool(
	"indent",
	{
		sync: false,
		status: false
	}
);


Trex.Tool.Indent = Trex.Class.create({
	$const: {
		__Identity: 'indent'
	},
	$extend: Trex.Tool,
	$mixins: [Trex.I.IndentExecution],
	oninitialized: function(config) {
		var _tool = this;
		var _canvas = this.canvas;

		var _toolHandler = function() {
			_canvas.execute(function(processor) {
				_tool.executeIndentParagraph(processor);
			});
		};

		/* button & menu weave */
		this.weave.bind(this)(
			/* button */
			new Trex.Button(this.buttonCfg),
			/* menu */
			null,
			/* handler */
			_toolHandler
		);
			
		var _keyHandler = function() {
			_canvas.execute(function(processor) {
				_tool.executeIndentByKeyEvent(processor);
			});
		};
		_canvas.observeKey({ // tab - \ub4e4\uc5ec\uc4f0\uae30
			ctrlKey: false,
			altKey: false,
			shiftKey: false,
			keyCode: 9
		}, _keyHandler);
	}
});/**
 * @fileoverview 
 * Tool '\ub0b4\uc5b4\uc4f0\uae30' Source,
 * Class Trex.Tool.Outdent \uc640 configuration\uc744 \ud3ec\ud568    
 *     
 */
TrexConfig.addTool(
	"outdent",
	{
		sync: false,
		status: false
	}
);

Trex.Tool.Outdent = Trex.Class.create({
	$const: {
		__Identity: 'outdent'
	},
	$extend: Trex.Tool,
	$mixins: [Trex.I.IndentExecution],
	oninitialized: function(config) {
		var _tool = this;
		var _canvas = this.canvas;
		
		var _toolHandler = function() {
			_canvas.execute(function(processor) {
				_tool.executeOutdentParagraph(processor);
			});
		};

		/* button & menu weave */
		this.weave.bind(this)(
			/* button */
			new Trex.Button(this.buttonCfg),
			/* menu */
			null,
			/* handler */
			_toolHandler
		);

		var _keyHandler = function() {
			_canvas.execute(function(processor) {
				_tool.executeOutdentByKeyEvent(processor);
			});
		};
		_canvas.observeKey({ // shift + tab - \ub4e4\uc5ec\uc4f0\uae30
			ctrlKey: false,
			altKey: false,
			shiftKey: true,
			keyCode: 9
		}, _keyHandler);
	}
});
/**
 * @fileoverview 
 * '\ub9c1\ud06c\uc0bd\uc785' Icon Source,
 * Class Trex.Tool.Link\uacfc configuration\uc744 \ud3ec\ud568    
 *     
 */
TrexConfig.addTool(
	"link",
	{
		wysiwygonly: true,
		sync: false,
		status: true
	}
);

TrexMessage.addMsg({
	'@insertlink.cancel.image': "#iconpath/btn_cancel.gif?rv=1.0.1",
	'@insertlink.confirm.image': "#iconpath/btn_confirm.gif?rv=1.0.1",
	'@insertlink.invalid.url': "'HTTP://'\ub85c \uc2dc\uc791\ud558\ub294 URL\uc744 \uc785\ub825\ud574\uc8fc\uc2ed\uc2dc\uc624.",
	'@insertlink.link.alt': "[#{title}]\ub85c \uc774\ub3d9\ud569\ub2c8\ub2e4.",
	'@insertlink.remove.image': "#iconpath/btn_remove.gif?rv=1.0.1",
	'@insertlink.title': "\uc120\ud0dd\ub41c \ubd80\ubd84\uc5d0 \uac78\ub9b4 URL\uc8fc\uc18c\ub97c \ub123\uc5b4\uc8fc\uc138\uc694.",
	'@insertlink.onclick.target': "\ud074\ub9ad \uc2dc",
	'@insertlink.target.blank': "\uc0c8 \ucc3d",
	'@insertlink.target.self': "\ud604\uc7ac\ucc3d"
});

Trex.Tool.Link = Trex.Class.create({
	$const: {
		__Identity: 'link'
	},
	$extend: Trex.Tool,
	oninitialized: function(config) {
			var _tool = this; 
			var _toolbar = this.toolbar;
			var _canvas = this.canvas;

			var _toolHandler = function(data) {
				if (_canvas.canHTML()) {
					if (data) {
						_canvas.execute(function(processor) {
							var _attributes = {
								'href': data.link,
								'target': data.target ? data.target : '_blank'
							};
							if(processor.findNode('a')) {
								var _aNode = processor.findNode('a');
								$tom.applyAttributes(_aNode, _attributes);
							} else if (processor.hasControl()) {
								var _nodes = processor.controls(function() {
									return 'img';
								});
								$tom.wrap(processor.create('a', _attributes), _nodes);
							} else if(processor.isCollapsed()) {
								var _aNode = processor.create('a', _attributes);
								_aNode.innerHTML = data.link;
								processor.pasteNode(_aNode, false);
							} else {
								var _nodes = processor.inlines(function() {
									return '%text,img,a,%inline';
								});
								_nodes.each(function(node) {
									if ($tom.hasChildren(node, true)) {
										if ($tom.kindOf(node, 'a')) {
											$tom.applyAttributes(node, _attributes);
										} else if ($tom.kindOf(node, 'img')) {
											$tom.wrap(processor.create('a', _attributes), [node]);
										} else {
											var _styleValue = $tom.getStyleText(node);
											var _oldNodes = $tom.collectAll(node, 'a');
											_oldNodes.each(function(oldNode){
												$tom.moveChildToParent(oldNode);
												$tom.remove(oldNode);
											});
											var _aNode = processor.create('a', _attributes);
											$tom.setStyleText(_aNode, _styleValue);
											$tom.replace(node, _aNode);
										}	
									} else {
										$tom.remove(node);
									}
								});
							}
						});
					} else {
						_canvas.execute(function(processor) {
							var _node = processor.findNode('a');
							if (_node) {
								processor.unwrap(_node);
							}
						});
					}
				}else{
					_canvas.execute(function(processor) {
						processor.insertTag('<a href="' + data.link + '" target="' +data.target+ '" >','</a>');
					});
				}	
			};
			
			var __DefaultValue = "";
			var _initHandler = function(data) {
				if (_canvas.canHTML()) {
					return _canvas.query(function(processor){
						var _node = processor.findNode('a');
						if (_node) {
							var _value = $tom.getAttribute(_node, "href");
							var _target = $tom.getAttribute(_node, "target");
							if (_value != null && _value.length > 0) {
								processor.selectAround(_node);
								return {
									exist: true,
									value: _value,
									target: _target
								};
							}
						}
						return {
							exist: false,
							value: __DefaultValue
						};
					});
				}else{
					return {
						exist: false,
						value: __DefaultValue
					};
				}
			};

			/* button & menu weave */
			this.weave.bind(this)(
				/* button */
				new Trex.Button(this.buttonCfg),
				/* menu */
				new Trex.Menu.Link(this.menuCfg),
				/* handler */
				_toolHandler,
				/* handler for menu initial value */
				_initHandler
			);

			var _popdownHandler = function() {
				_tool.button.onMouseDown();
			}	
			_canvas.observeKey({ // ctrl + k - \ub9c1\ud06c
				ctrlKey: true,
				altKey: false,
				shiftKey: false,
				keyCode: 75
			}, _popdownHandler);
		}
	
});

/* Trex.Menu.Link ************************************************************************************/
Trex.MarkupTemplate.add(
	'menu.insertlink', [
		'<div class="tx-menu-inner">',
		'    <dl>',
		'        <dt>',
		'            @insertlink.title',
		'        </dt>',
		'        <dd>',
		'            <input type="text" class="tx-text-input"/>',
		'        </dd>',
		'        <dd class="tx-rp">',
		'            <span class="tx-text tx-first">@insertlink.onclick.target</span>',
		'            <span><input type="radio" name="tx-insertlink-win" value="_blank"/><span class="tx-text">@insertlink.target.blank</span></span>',
		'            <span><input type="radio" name="tx-insertlink-win" value="_self"/><span class="tx-text">@insertlink.target.self</span></span>',
		'        </dd>',
		'        <dd class="tx-hr">',
		'            <hr/>',
		'        </dd>',
		'        <dd>',
		'            <img width="32" height="21" src="@insertlink.confirm.image"/>',
		'            <img width="32" height="21" src="@insertlink.cancel.image"/>',
		'            <img width="51" height="21" src="@insertlink.remove.image" style="display: none;"/>',
		'        </dd>',
		'    </dl>',
		'</div>'
	].join("")
);

Trex.Menu.Link = Trex.Class.create({
	$extend: Trex.Menu,
	ongenerated: function() {
		var _elMenu = this.elMenu;
		Trex.MarkupTemplate.get('menu.insertlink').evaluateToDom({}, _elMenu);
		
		var _elTargets = $tom.collectAll(_elMenu, ".tx-rp input");
		var _newInput = this.newInput = _elTargets[0];
		$tx.observe(_newInput, "click", function(ev){
				_newInput.checked = "checked";
				_currInput.checked = "";
		});
		var _currInput = this.currInput = _elTargets[1];
		$tx.observe(_currInput, "click", function(ev){
				_currInput.checked = "checked";
				_newInput.checked = "";
		});
			
		var _checkValidation = function(value) {
			if(!value){
				return false;
			}else if(value.length == 0){
				return false;
			}
								
			if ( !/http[s]?:\/\//.test(value) ) {
				return "http://" + value;
			}else {
				return value;
			}
		};	
		var _elInput = this.elInput = $tom.collect(_elMenu, 'input.tx-text-input');
		$tx.observe(_elInput, "keydown", function(ev) {
			if(ev.keyCode == 13) { //Enter
				var _val = _checkValidation(_elInput.value);
				if (!_val) {
					alert( TXMSG("@insertlink.invalid.url") );
					$tx.stop(ev);
					return;
				}
				var _target = _newInput.checked ? _newInput.value : _currInput.value;  
				this.onSelect(ev, {
					link: _val,
					target: _target
				});
				$tx.stop(ev);
			}
		}.bindAsEventListener(this));
		
		var _elImgs = $tom.collectAll(_elMenu, 'img');
		$tx.observe(_elImgs[0], "click", function(ev) {
			var _val = _checkValidation(_elInput.value);
			if (!_val) {
				alert( TXMSG("@insertlink.invalid.url") );
				$tx.stop(ev);
				return;
			}
			var _target = _newInput.checked ? _newInput.value : _currInput.value;
			this.onSelect(ev, {
					link: _val,
					target: _target
				});
			$tx.stop(ev);
		}.bind(this));
		
		$tx.observe(_elImgs[1], "click", function() {
			this.onCancel();
		}.bindAsEventListener(this));

		var _elRemoveBtn = $tx(_elImgs[2]);
		$tx.observe(_elRemoveBtn, "click", function(ev) {
			this.onSelect(ev, null);
		}.bindAsEventListener(this));
		this.toggleRemoveBtn = function(exist) {
			_elRemoveBtn.style.display = ((exist)? '': 'none');
		};
	},
	onregenerated: function() {
		var _elInput = this.elInput;
		var _initData = this.initHandler();
		_elInput.value = _initData.value;
		if(_initData.target == "_self"){
			this.currInput.checked = "checked";
			this.newInput.checked = "";
		}else{
			this.newInput.checked = "checked";
			this.currInput.checked = "";
		}
		
		this.toggleRemoveBtn(_initData.exist);
		_elInput.focus();
		
		// Set focus to end of input box. ( For IE );
		if ($tx.msie) {
			setTimeout(function() {
				_elInput.focus();
				var _sel = document.selection.createRange();
				_sel.move("character", _elInput.value.length);
				_sel.select();
			}, 100);
		}
	}
});

/**
 * @fileoverview 
 *  \uae00\uc0c1\uc790\ub97c \uc0bd\uc785\ud558\ub294 \uae30\ub2a5\uc744 \uac00\uc9c4 Tool '\uae00\uc0c1\uc790' Source,
 *  Class Trex.Tool.TextBox\uc640  configuration \uc744 \ud3ec\ud568 \ud558\uace0\uc788\ub2e4.    
 * 
 */
TrexConfig.addTool(
	"textbox",
	{
		sync: false,
		status: true,
		rows: 4,
		cols: 6,
		options: Trex.__CONFIG_COMMON.textbox.options
	}
);

Trex.Tool.TextBox = Trex.Class.create({
	$const: {
		__Identity: 'textbox'
	},
	$extend: Trex.Tool,
	oninitialized: function(config) {
		var _canvas = this.canvas;
		var _toolbar = this.toolbar;
		
		var _map = {};
		config.options.each(function(option) {
			_map[option.data] = option.style;
		});

		var _toolHandler = function(data) {
			if(!_map[data]) {
				return;
			}
			var _style = _map[data];
			if (_canvas.canHTML()) {
				var _tag = "div";
				var _attributes = {
					'className': 'txc-textbox',
					'style': _style
				};
				_canvas.execute(function(processor) {
					var _nodes = processor.blocks(function(type) {
						return '%wrapper,%paragraph';
					});
					_nodes = _nodes.select(function(node) {
						if($tom.kindOf(node, "%innergroup")) {
							processor.wrap($tom.children(node), _tag, _attributes);	
							return false;
						} else {
							return true;
						}
					});
					var _bNode = processor.wrap(_nodes, _tag, _attributes);	
					_toolbar.fireJobs('cmd.textbox.added', _bNode);
				});
			} else {
				_canvas.execute(function(processor) {
					processor.insertTag('<div class="txc-textbox">','</div>'); //TODO:
				});
			}
		};
		
		/* button & menu weave */
		this.weave.bind(this)(
			/* button */
			new Trex.Button(this.buttonCfg),
			/* menu */
			new Trex.Menu.List(this.menuCfg),
			/* handler */
			_toolHandler
		);
	}
});

/**
 * @fileoverview 
 * Tool '\uc778\uc6a9\uad6c' Source,
 * Class Trex.Tool.Quote \uc640 configuration\uc744 \ud3ec\ud568    
 *     
 */
TrexConfig.addTool(
	"quote",
	{
		sync: false,
		status: true,
		rows: 2,
		cols: 3,
		options: [
			{ type: 'image', data: 'tx-quote1', image: '#iconpath/citation01.gif?rv=1.0.1' },
			{ type: 'image', data: 'tx-quote2', image: '#iconpath/citation02.gif?rv=1.0.1' },
			{ type: 'image', data: 'tx-quote3', image: '#iconpath/citation03.gif?rv=1.0.1' },
			{ type: 'image', data: 'tx-quote4', image: '#iconpath/citation04.gif?rv=1.0.1' },
			{ type: 'image', data: 'tx-quote5', image: '#iconpath/citation05.gif?rv=1.0.1' },
			{ type: 'cancel', data: 'tx-quote6', image: '#iconpath/citation06.gif?rv=1.0.1' }
		]
	},
	function(root){
		var _config = TrexConfig.getTool("quote", root);
		_config.options.each(function(option) {
			option.image = TrexConfig.getIconPath(option.image, 'quote'); 
		});
	}
);

Trex.Tool.Quote = Trex.Class.create({
	$const: {
		__Identity: 'quote'
	},
	$extend: Trex.Tool,
	oninitialized: function(config) {
			var _tool = this; 
			var _canvas = this.canvas;

			var _map = {};
			config.options.each(function(option) {
				_map[option.data] = {
					type: option.type
				};
			});

			var _toolHandler = function(data) {
				if(!_map[data]) {
					return;
				}
				var _type = _map[data].type;
				var _tag = "blockquote";
				var _attributes = { "className": data };

				if(_canvas.canHTML()) {
					_canvas.execute(function(processor) {
						var _bNode = processor.findNode(_tag);
						if (_bNode) {
							if(_type == "cancel") {
								processor.unwrap(_bNode);
							} else {
								processor.apply(_bNode, _attributes);
							}
						} else {
							if(_type != "cancel") {
								var _nodes = processor.blocks(function(type) {
									return '%wrapper,%paragraph';
								});
								_nodes = _nodes.select(function(node) {
									if($tom.kindOf(node, "%innergroup")) {
										processor.wrap($tom.children(node), _tag, _attributes);	
										return false;
									} else {
										return true;
									}
								});
								processor.wrap(_nodes, _tag, _attributes);	
							}
						}	
					});
				} else {
					_canvas.execute(function(processor) {
						processor.insertTag('<blockquote>','</blockquote>');
					});
				}
			};

			/* button & menu weave */
			this.weave.bind(this)(
				/* button */
				new Trex.Button(this.buttonCfg),
				/* menu */
				new Trex.Menu.List(this.menuCfg),
				/* handler */
				_toolHandler
			);

			var _popdownHandler = function() {
				_tool.button.onMouseDown();
			}
			_canvas.observeKey({ // ctrl + q
				ctrlKey: true,
				altKey: false,
				shiftKey: false,
				keyCode: 81
			}, _popdownHandler);
		}
	
});

/**
 * @fileoverview 
 *  Table\uc744 \uc0bd\uc785\ud558\ub294 \uae30\ub2a5\uc744 \uac00\uc9c4 Tool 'table' Source,
 *  Class Trex.Tool.Table,Trex.Menu.Table,Trex.Menu.Table.TableEdit\uc640 configuration \uc744 \ud3ec\ud568 \ud558\uace0\uc788\ub2e4.    
 */
TrexConfig.addTool(
	"table",
	{
		sync: false,
		status: true
	},
	function(root){
		var bgc = TrexConfig.get("canvas",root).styles.backgroundColor;
		if (bgc != "transparent") {
			TrexConfig.getTool("table",root).bgcolor = bgc;
		}
	}
);

TrexMessage.addMsg({
	'@table.alert': "1 \uc774\uc0c1 99 \uc774\ud558\uc758 \uc22b\uc790\ub9cc \uc785\ub825 \uac00\ub2a5\ud569\ub2c8\ub2e4."
});

Trex.Tool.Table = Trex.Class.create({
	$const: {
		__Identity: 'table',
		__DEFAULT_TABLE_PROPERTY:{
			"cellSpacing": 0,
			"cellPadding": 1,
			"border": 0,
			"style": {
				border: "none",
				borderCollapse:"collapse"
			}
		},
		__DEFAULT_TABLE_PROPERTY_STR: "cellspacing=\"0\" cellpadding=\"0\" border=\"0\" style=\"border:none;border-collapse:collapse;\"",
		__DEFAULT_BORDER_STYLE: "1px solid #000",
		__DEFAULT_TABLE_CLASS:"txc-table"
	},
	$extend: Trex.Tool,
	oninitialized: function(config) {
		var _self = this;
		this.tableSize = { row: 0, col:0 };
		
		var _canvas = this.canvas;
		this.config = config;
		
		var _toolHandler = function(data) {
			var table = _self.makeEmptyTable(data.row, data.col);
			_canvas.execute(function(processor) {
				var _tNode = processor.pasteContent(table, true);
				processor.bookmarkInto(_tNode);
			});
		};

		/* button & menu weave */
		this.weave.bind(this)(
			/* button */
			new Trex.Button(this.buttonCfg),
			/* menu */
			new Trex.Menu.Table(this.menuCfg),
			/* handler */
			_toolHandler
		);
	},
	makeEmptyTable: function(row, col){
		var tableStringArr = [];
		var tableWidth = this._createDefaultTableWidth();
		
		tableStringArr.push("<table class=\""+Trex.Tool.Table.__DEFAULT_TABLE_CLASS+"\" width=\"" + tableWidth + "\" ");
		tableStringArr.push(Trex.Tool.Table.__DEFAULT_TABLE_PROPERTY_STR);
		tableStringArr.push("><tbody>");
		
		var borderStyleText = Trex.Tool.Table.__DEFAULT_BORDER_STYLE;
		var tdWidth = parseInt(100/col) + "%";
		var basicBorder = ["border-bottom:",borderStyleText,";border-right:",borderStyleText,";"].join("");
		
		for( var i = 0; i < row; i++ ){
			tableStringArr.push("<tr>");
			for( var j = 0; j < col; j++ ){
				var border = [basicBorder];
				tableStringArr.push("<td style=\"width:");
				tableStringArr.push(tdWidth);
				tableStringArr.push(";");
				tableStringArr.push(basicBorder);
				if ( i == 0 ){
					tableStringArr.push("border-top:",borderStyleText,";");
				}
				if ( j == 0 ){
					tableStringArr.push("border-left:",borderStyleText,";");
				}
				tableStringArr.push(";\">&nbsp;</td>\n");
			}
			tableStringArr.push("</tr>\n")
		}
		tableStringArr.push("</tbody></table>");
		return tableStringArr.join(""); 	
	},
	_createDefaultTableWidth: function(){
		var tableWidth = this.config.tableWidth;
		if ( !tableWidth ) {
			var padding = this.canvas.getSizeConfig().contentPadding || 8;
			var tableWidth = (this.canvas.getSizeConfig().contentWidth || 600) - padding * 2;
		}
		
		return tableWidth;
	}
});


Trex.Tool.Table.TemplateWizard = Trex.Class.create({
	initialize: function(){
		this.templateList = (typeof getTableTemplateList == "function")? getTableTemplateList() : [{
			klass: "ex1",
			common: {
			backgroundColor:"transparent",
			borderTop:"none",
			borderLeft:"none",
			borderRight: "1px solid #d9d9d9",
			borderBottom: "1px solid #d9d9d9"
		},
		firstRow: {
			borderTop: "1px solid #000"
		},
		firstCol: {
			borderLeft: "1px solid #000"
		},
		lastCol: {
			borderRight: "1px solid #000"
		},
		lastRow: {
			borderBottom: "1px solid #000"
		},
		evenRow: {},
		oddRow: {}
		}];
		this.currentTemplate = null;
	},
	applyStyle: function(table, templateIndex){
		if ( isNaN( templateIndex ) ){
			return ;
		}
		
		var tableMatrixer = new Trex.Tool.Table.TableCellMatrixer(table);
		var tdMatrix = tableMatrixer.getTdMatrix();
					
		this.currentTemplate = this.templateList[templateIndex];
		for( var i = 0; i < tdMatrix.length; i++){
			for( var j = 0; j < tdMatrix[i].length; j++){
				this.setCellStyle(tdMatrix[i][j], {
					isEvenRow: (i % 2) == 1,
					isFirstRow: i == 0,
					isLastRow: i == tdMatrix.length - 1, 
					isFirstCol: j == 0,
					isLastCol: (j == tdMatrix[i].length - 1)  
				});	
			}
		}
	},
	setCellStyle: function(elTd, truthMap){
		var t = this.currentTemplate;
		var style = Object.extend({}, t['common']);
		Object.extend(style, (truthMap.isEvenRow)?t['evenRow'] : t['oddRow']);
		Object.extend(style, (truthMap.isFirstRow)?t['firstRow'] : (truthMap.isLastRow)?t['lastRow'] : {});
		Object.extend(style, (truthMap.isLastCol)?t['lastCol'] : {});
		Object.extend(style, (truthMap.isFirstCol)?t['firstCol'] : {});
		txlib.setStyle(elTd, style);
	},
	getTemplateList: function(){
		return this.templateList;
	}
});
Trex.Tool.Table.TableCellMatrixer = Trex.Class.create({
	initialize: function(table){
		this.rowSize = this.initRowSize(table);
		this.colSize = this.initColSize(table);
		var context = $tom.first(table,"tbody") || table;				
		this.tdMatrix = this.createTdMatrix(context);
		
		for (var i = 0; i < this.tdMatrix.length; i++) {
			for (var j = 0; j < this.tdMatrix[i].length; j++) {
				var td = this.tdMatrix[i][j];
				if (td.cols > 1) {
					td.cols--;
					this.tdMatrix[i].splice(j+1, 0, td);
				}
			}
		}
		for( var i = 0; i< this.tdMatrix.length; i++ ){
			for( var j = 0; j < this.tdMatrix[i].length; j++ ){
				var td = this.tdMatrix[i][j];
				if ( td.rows > 1 ){
					td.rows--;
					this.tdMatrix[i + 1].splice(j, 0, td);
				}	
			}
		}
	},
	createTdMatrix: function(tbody){
		var tdMatrix = [];
	
		var trArr = $tom.children(tbody, "tr");
		for( var i = 0, len = trArr.length; i < len; i++ ){
			tdMatrix.push(this.createTdArray(trArr[i]));
		}
	
		return tdMatrix;
	},
	createTdArray: function(tr){
		var tdArr = [];
			
		var tds = $tom.children(tr, "td");
		for( var i = 0, len = tds.length; i < len; i++ ){
			tdArr.push( this.decorateSingleTd( tds[i] ) );
		}
		return tdArr;
	},
	decorateSingleTd: function(td){
		var cols = parseInt( td.getAttribute("colSpan") || 1);
		var rows = parseInt( td.getAttribute("rowSpan") || 1); 
		td.cols = cols;
		td.rows = (rows-1) * cols + 1;

		return td;
	},
	initRowSize: function(table){
		return table.rows.length;	
	},
	initColSize: function(table){
		var colSize = 0;
		var tdArr = $tom.children( $tom.collect(table, "tr"), "td");
		tdArr.each(function(td){
			var colSpan = parseInt( td.getAttribute("colSpan") || 1);
			colSize += colSpan; 
		});

		return colSize;
	},
	getRowSize: function(){
		return this.rowSize;
	},
	getColSize: function(){
		return this.colSize;
	},
	getTdMatrix: function(){
		return this.tdMatrix;
	}
});

TrexMessage.addMsg({
	'@table.title.insert': '\ud45c\uc0bd\uc785 &nbsp;',
	'@table.title.setDirectly': '\ud45c \uc9c1\uc811\uc124\uc815',
	'@table.title.row': '\uc5f4 \uac1c\uc218',
	'@table.title.col': '\ud589 \uac1c\uc218'
});
Trex.MarkupTemplate.add(
	'menu.table.direct', [
		'<div>@table.title.setDirectly</div>',
		'<div class="tx-table-input-area">',
		'<div class="tx-field tx-col-field">@table.title.row<input type="text" value="1"><a class="tx-btn tx-btn-add" href="javascript:;">@table.title.row+</a><a class="tx-btn tx-btn-sub" href="javascript:;">@table.title.row-</a></div>',
		'<div class="tx-field tx-row-field">@table.title.col<input type="text" value="1"><a class="tx-btn tx-btn-add" href="javascript:;">@table.title.col+</a><a class="tx-btn tx-btn-sub" href="javascript:;">@table.title.col-</a></div>',
		'</div>'
	].join("")
);
/* Trex.Menu.Table ************************************************************************************/
Trex.Menu.Table = Trex.Class.create({
	$const:{
		MAX_ROW:99,
		MAX_COL:99
	},
	$extend: Trex.Menu,
	ongenerated: function(config) {
		this.rowSize = 1;
		this.colSize = 1;
		
		this.elInnerPreview = $tom.collect(this.elMenu, 'div.tx-menu-inner .tx-menu-preview');
		this.dynamicSizer = this.generateDynamicSizer(this.elInnerPreview);
		
		this.elInnerRowCol = $tom.collect(this.elMenu, 'div.tx-menu-inner .tx-menu-rowcol');
		this.generateTextSizer(this.elInnerRowCol);
		
		this.elButtonArea = $tom.collect(this.elMenu, 'div.tx-menu-inner .tx-menu-enter');
		this.generateButtonArea(this.elButtonArea);
	},
	onregenerated: function() {
		this.showDynamicSizer();
	},
	showDynamicSizer: function(){
		this.dynamicSizer.clear();
		$tx.show( this.elInnerPreview );
		$tx.hide( this.elInnerRowCol );
		$tx.hide( this.elButtonArea );
	},
	showTextSizer: function(){
		$tx.hide(this.elInnerPreview);
		$tx.show(this.elInnerRowCol);
		$tx.show(this.elButtonArea);
	},
	generateDynamicSizer: function(elPreivewContext){
		var _self = this;
		var elRowCol= tx.span();
		var elDisplay = tx.div({className:"tx-dynamic-sizer-display"}, TXMSG('@table.title.insert'), elRowCol);
		elPreivewContext.appendChild( elDisplay );
		
		var dynamicSizer = new Trex.DynamicSizer({
			el: elPreivewContext,
			clickHandler: this.onSelect.bind(this),
			moveHandler: function(row, col){
				elRowCol.innerHTML = row + 'x' +col;
			}
		});
		
		var _elA = tx.a({href:"javascript:;"}, TXMSG('@table.title.setDirectly'));
		$tx.observe( _elA, "click", function(ev){
			_self.showTextSizer();
			$tx.stop(ev);
		});
		
		var _elButton = tx.div({className:"tx-more-button"});
		_elButton.appendChild(_elA);
		elPreivewContext.appendChild( _elButton );
		
		return dynamicSizer;
	},
	generateTextSizer: function(elContext) {
		var _self = this;
		
		Trex.MarkupTemplate.get('menu.table.direct').evaluateToDom({}, elContext);
		
		var calculator = {
			calculate: function(value, max, operand){
				value = parseInt(value);
				if ( value + operand > max || value + operand< 1){
					alert( TXMSG("@table.alert") );
					return value;
				}else{
					return value + operand;
				}
			},
			getValidValue:function(value, previousValue, max){
				if ( value < 0 || value > max  ){
					alert( TXMSG("@table.alert") );
					return previousValue;
				}else{
					return value;
				}		
				
			}
		}
		
		var colInput = $tom.collect(elContext, "div.tx-col-field input");
		$tx.observe(colInput, "blur", function(){
			colInput.value = _self.colSize = calculator.getValidValue(colInput.value, _self.colSize, Trex.Menu.Table.MAX_COL);
		});
		$tx.observe( $tom.collect(elContext, "div.tx-col-field a.tx-btn-add"), "click", function(){ 
			colInput.value = _self.colSize = calculator.calculate(_self.colSize, Trex.Menu.Table.MAX_COL, 1);
			return false;
		});
		$tx.observe($tom.collect(elContext, "div.tx-col-field a.tx-btn-sub"), "click", function(){ 
			colInput.value = _self.colSize = calculator.calculate(_self.colSize, Trex.Menu.Table.MAX_COL, -1);
			return false;
		});
		
		var rowInput = $tom.collect(elContext, "div.tx-row-field input");
		$tx.observe(rowInput, "blur", function(){ 
			rowInput.value = _self.rowSize = calculator.getValidValue(rowInput.value, _self.rowSize, Trex.Menu.Table.MAX_ROW);
		});
		$tx.observe($tom.collect(elContext, "div.tx-row-field a.tx-btn-add"), "click", function(){ 
			rowInput.value = _self.rowSize = calculator.calculate(_self.rowSize, Trex.Menu.Table.MAX_ROW, 1);
			return false;
		});
		$tx.observe($tom.collect(elContext, "div.tx-row-field a.tx-btn-sub"), "click", function(){ 
			rowInput.value = _self.rowSize = calculator.calculate(_self.rowSize, Trex.Menu.Table.MAX_ROW, -1);
			return false;
		});
	},
	generateButtonArea: function(elContext){
		var _self = this;
		var elDiv = tx.div();
		var elAConfirm = tx.a({href:"javascript:;", className:"tx-btn-confirm"}, "\ud655\uc778");
		var elACancel = tx.a({href:"javascript:;", className:"tx-btn-cancel"}, "\ucde8\uc18c");
		
		$tx.observe( elAConfirm, "click", function(ev){
			_self.onSelect(ev, {
				row: _self.rowSize,
				col: _self.colSize
			});
		});
		
		$tx.observe(elACancel, "click", function() {
			this.onCancel();
			return false;
		}.bindAsEventListener(this));

		elDiv.appendChild(elAConfirm);
		elDiv.appendChild(elACancel);
		elContext.appendChild(elDiv);
	}
});/**
 * @fileoverview 
 * emoticon\uc744 \uc785\ub825 \ud560 \uc218 \uc788\ub294 \uba54\ub274\ub97c \ud3ec\ud568\ud558\ub294 tool\uc778 'Emoticon' Icon\uc744 \uc704\ud55c source\ub85c 
 * \ud544\uc694\ud55c configuration\uacfc Class Trex.Tool.Emoticon\uc744/\ub97c \ud3ec\ud568
 *     
 */

TrexMessage.addMsg({
	'@emoticon.subtitle.person': "\uc0ac\ub78c",
	'@emoticon.subtitle.animal': "\ub3d9\uc2dd\ubb3c",
	'@emoticon.subtitle.thing': "\uc0ac\ubb3c",
	'@emoticon.subtitle.etc': "\uae30\ud0c0"
});

TrexConfig.addTool(
	"emoticon",
	{
		sync: false,
		status: true,
		rows: 5,
		cols: 7,
		matrices: [{
			title: TXMSG("@emoticon.subtitle.person"),
			klass: "tx-menu-matrix-per",
			options: [
				'#decopath/per_01.gif?rv=1.0.1',
				'#decopath/per_02.gif?rv=1.0.1',
				'#decopath/per_03.gif?rv=1.0.1',
				'#decopath/per_04.gif?rv=1.0.1',
				'#decopath/per_05.gif?rv=1.0.1',
				'#decopath/per_06.gif?rv=1.0.1',
				'#decopath/per_07.gif?rv=1.0.1',
				'#decopath/per_08.gif?rv=1.0.1',
				'#decopath/per_09.gif?rv=1.0.1',
				'#decopath/per_10.gif?rv=1.0.1',
				'#decopath/per_11.gif?rv=1.0.1',
				'#decopath/per_12.gif?rv=1.0.1',
				'#decopath/per_13.gif?rv=1.0.1',
				'#decopath/per_14.gif?rv=1.0.1',
				'#decopath/per_15.gif?rv=1.0.1',
				'#decopath/per_16.gif?rv=1.0.1',
				'#decopath/per_17.gif?rv=1.0.1',
				'#decopath/per_18.gif?rv=1.0.1',
				'#decopath/per_19.gif?rv=1.0.1',
				'#decopath/per_20.gif?rv=1.0.1',
				'#decopath/per_21.gif?rv=1.0.1',
				'#decopath/per_22.gif?rv=1.0.1',
				'#decopath/per_23.gif?rv=1.0.1',
				'#decopath/per_24.gif?rv=1.0.1',
				'#decopath/per_25.gif?rv=1.0.1',
				'#decopath/per_26.gif?rv=1.0.1',
				'#decopath/per_27.gif?rv=1.0.1',
				'#decopath/per_28.gif?rv=1.0.1',
				'#decopath/per_29.gif?rv=1.0.1'
			]
		},{
			title: TXMSG("@emoticon.subtitle.animal"),
			klass: "tx-menu-matrix-ani",
			options: [
				'#decopath/ani_01.gif?rv=1.0.1',
				'#decopath/ani_02.gif?rv=1.0.1',
				'#decopath/ani_03.gif?rv=1.0.1',
				'#decopath/ani_04.gif?rv=1.0.1',
				'#decopath/ani_05.gif?rv=1.0.1',
				'#decopath/ani_06.gif?rv=1.0.1',
				'#decopath/ani_07.gif?rv=1.0.1',
				'#decopath/ani_08.gif?rv=1.0.1',
				'#decopath/ani_09.gif?rv=1.0.1',
				'#decopath/ani_10.gif?rv=1.0.1',
				'#decopath/ani_11.gif?rv=1.0.1',
				'#decopath/ani_12.gif?rv=1.0.1',
				'#decopath/ani_13.gif?rv=1.0.1',
				'#decopath/ani_14.gif?rv=1.0.1',
				'#decopath/ani_15.gif?rv=1.0.1',
				'#decopath/ani_16.gif?rv=1.0.1',
				'#decopath/ani_17.gif?rv=1.0.1',
				'#decopath/ani_18.gif?rv=1.0.1',
				'#decopath/ani_19.gif?rv=1.0.1',
				'#decopath/ani_20.gif?rv=1.0.1',
				'#decopath/ani_21.gif?rv=1.0.1',
				'#decopath/ani_22.gif?rv=1.0.1',
				'#decopath/ani_23.gif?rv=1.0.1',
				'#decopath/ani_24.gif?rv=1.0.1',
				'#decopath/ani_25.gif?rv=1.0.1',
				'#decopath/ani_26.gif?rv=1.0.1',
				'#decopath/ani_27.gif?rv=1.0.1',
				'#decopath/ani_28.gif?rv=1.0.1'
			]
		},{
			title: TXMSG("@emoticon.subtitle.thing"),
			klass: "tx-menu-matrix-things",
			options: [
				'#decopath/things_01.gif?rv=1.0.1',
				'#decopath/things_02.gif?rv=1.0.1',
				'#decopath/things_03.gif?rv=1.0.1',
				'#decopath/things_04.gif?rv=1.0.1',
				'#decopath/things_05.gif?rv=1.0.1',
				'#decopath/things_06.gif?rv=1.0.1',
				'#decopath/things_07.gif?rv=1.0.1',
				'#decopath/things_08.gif?rv=1.0.1',
				'#decopath/things_09.gif?rv=1.0.1',
				'#decopath/things_10.gif?rv=1.0.1',
				'#decopath/things_11.gif?rv=1.0.1',
				'#decopath/things_12.gif?rv=1.0.1',
				'#decopath/things_13.gif?rv=1.0.1',
				'#decopath/things_14.gif?rv=1.0.1',
				'#decopath/things_15.gif?rv=1.0.1',
				'#decopath/things_16.gif?rv=1.0.1',
				'#decopath/things_17.gif?rv=1.0.1',
				'#decopath/things_18.gif?rv=1.0.1',
				'#decopath/things_19.gif?rv=1.0.1',
				'#decopath/things_20.gif?rv=1.0.1',
				'#decopath/things_21.gif?rv=1.0.1',
				'#decopath/things_22.gif?rv=1.0.1',
				'#decopath/things_23.gif?rv=1.0.1',
				'#decopath/things_24.gif?rv=1.0.1',
				'#decopath/things_25.gif?rv=1.0.1',
				'#decopath/things_26.gif?rv=1.0.1',
				'#decopath/things_27.gif?rv=1.0.1',
				'#decopath/things_28.gif?rv=1.0.1',
				'#decopath/things_29.gif?rv=1.0.1',  
				'#decopath/things_30.gif?rv=1.0.1',  
				'#decopath/things_31.gif?rv=1.0.1',  
				'#decopath/things_32.gif?rv=1.0.1',  
				'#decopath/things_33.gif?rv=1.0.1',  
				'#decopath/things_34.gif?rv=1.0.1',  
				'#decopath/things_35.gif?rv=1.0.1'
			]
		},{
			title: TXMSG("@emoticon.subtitle.etc"),
			klass: "tx-menu-matrix-etc",
			options: [
				'#decopath/etc_01.gif?rv=1.0.1',
				'#decopath/etc_02.gif?rv=1.0.1',
				'#decopath/etc_03.gif?rv=1.0.1',
				'#decopath/etc_04.gif?rv=1.0.1',
				'#decopath/etc_05.gif?rv=1.0.1',
				'#decopath/etc_06.gif?rv=1.0.1',
				'#decopath/etc_07.gif?rv=1.0.1',
				'#decopath/etc_08.gif?rv=1.0.1',
				'#decopath/etc_09.gif?rv=1.0.1',
				'#decopath/etc_10.gif?rv=1.0.1',
				'#decopath/etc_11.gif?rv=1.0.1',
				'#decopath/etc_12.gif?rv=1.0.1',
				'#decopath/etc_13.gif?rv=1.0.1',
				'#decopath/etc_14.gif?rv=1.0.1',
				'#decopath/etc_15.gif?rv=1.0.1',
				'#decopath/etc_16.gif?rv=1.0.1',
				'#decopath/etc_17.gif?rv=1.0.1',
				'#decopath/etc_18.gif?rv=1.0.1',
				'#decopath/etc_19.gif?rv=1.0.1',
				'#decopath/etc_20.gif?rv=1.0.1',
				'#decopath/etc_21.gif?rv=1.0.1',
				'#decopath/etc_22.gif?rv=1.0.1',
				'#decopath/etc_23.gif?rv=1.0.1',
				'#decopath/etc_24.gif?rv=1.0.1',
				'#decopath/etc_25.gif?rv=1.0.1',
				'#decopath/etc_26.gif?rv=1.0.1',
				'#decopath/etc_27.gif?rv=1.0.1',
				'#decopath/etc_28.gif?rv=1.0.1',
				'#decopath/etc_29.gif?rv=1.0.1'
			]
		}]
	},
	function(root){
		var _config = TrexConfig.getTool("emoticon", root);
		_config.matrices.each(function(matrix) {
			for(var i=0,len=matrix.options.length;i<len;i++) {
				matrix.options[i] = TrexConfig.getDecoPath(matrix.options[i], "emoticon");
			}
		});
	}
);

Trex.Tool.Emoticon = Trex.Class.create({
	$const: {
		__Identity: 'emoticon'
	},
	$extend: Trex.Tool,
	oninitialized: function(config) {
			var _canvas = this.canvas;

			var _toolHandler = function(value) {
				if(!value || value.trim().length == 0) {
					return;
				}
				_canvas.execute(function(processor) {
					var _node = processor.win.img({ 'src': value, 'border': "0", 'className' : 'txc-emo' });
					processor.pasteNode(_node, false);
				});
			};

			/* button & menu weave */
			this.weave.bind(this)(
				/* button */
				new Trex.Button(this.buttonCfg),
				/* menu */
				new Trex.Menu.Matrix(this.menuCfg),
				/* handler */
				_toolHandler
			);
		}
	
});
/**
 * @fileoverview 
 * Tool 'Redo' Source,
 * Class Trex.Tool.ReDo \uc640 configuration\uc744 \ud3ec\ud568    
 *     
 */
TrexConfig.addTool(
	"redo",
	{
		sync: false,
		status: false
	}
);

Trex.Tool.ReDo = Trex.Class.create({
	$const: {
		__Identity: 'redo'
	},
	$extend: Trex.Tool,
	oninitialized: function(config) {
			var _canvas = this.canvas;

			var _toolHandler = function() {
				_canvas.getProcessor().blur();
				_canvas.focus();	
					
				setTimeout( function(){
					_canvas.fireJobs('canvas.panel.redo');	
				}, 0);	
			};

			/* button & menu weave */
			this.weave.bind(this)(
				/* button */
				new Trex.Button(this.buttonCfg),
				/* menu */
				null,
				/* handler */
				_toolHandler
			);

			_canvas.observeKey({ // ctrl + y - \ub2e4\uc2dc\uc2e4\ud589
				ctrlKey: true,
				altKey: false,
				shiftKey: false,
				keyCode: 89
			}, function() {
				_canvas.fireJobs('canvas.panel.redo');
				_canvas.syncProperty('redo');
			});
		}
	
});
/**
 * @fileoverview 
 *  Tool 'UnDo' Source,
 *  Class Trex.Tool.UnDo \uc640  configuration \uc744 \ud3ec\ud568 \ud558\uace0\uc788\ub2e4.    
 * 
 */
TrexConfig.addTool(
	"undo",
	{
		sync: false,
		status: false
	}
);

Trex.Tool.UnDo = Trex.Class.create({
	$const: {
		__Identity: 'undo'
	},
	$extend: Trex.Tool,
	oninitialized: function(config) {
			var _canvas = this.canvas;

			var _toolHandler = function() {
				_canvas.getProcessor().blur();
				_canvas.focus();	
					
				setTimeout( function(){
					_canvas.fireJobs('canvas.panel.undo');	
				}, 20);
			};

			/* button & menu weave */
			this.weave.bind(this)(
				/* button */
				new Trex.Button(this.buttonCfg),
				/* menu */
				null,
				/* handler */
				_toolHandler
			);

			_canvas.observeKey({ // ctrl + z - \uc2e4\ud589\ucde8\uc18c
				ctrlKey: true,
				altKey: false,
				shiftKey: false,
				keyCode: 90
			}, function() {
				_canvas.fireJobs('canvas.panel.undo');
				_canvas.syncProperty('undo');
			});
		}
	
});
/**
 * @fileoverview 
 * \uc5ec\ub7ec \uc2a4\ud0c0\uc77c\uc758 \uad6c\ubd84\uc120\uc744 \uc0bd\uc785\ud560 \ub54c \uc4f0\uc774\ub294 menu\ub97c \ud3ec\ud568\ud558\ub294 Tool\uc778 '\uad6c\ubd84\uc120' Icon Source,
 * Class Trex.Tool.HorizontalRule\uacfc configuration\uc744 \ud3ec\ud568    
 *     
 */
TrexConfig.addTool(
	"horizontalrule",
	{
		wysiwygonly: true,
		sync: false,
		status: true,
		top: null,
		left: null,
		options: [{	data: 'tx-hr-border-1', 
			image: '#iconpath/line01.gif?rv=1.0.2',
			html: '<hr style="border: black 0px none; border-top: black 1px solid; height: 1px"/>'
		},
		{	data: 'tx-hr-border-2',
			image: '#iconpath/line02.gif?rv=1.0.2',
			html: '<hr style="border: black 0px none; border-top: black 1px solid; border-bottom: black 3px solid; height: 7px"/>'
		},
		{	data: 'tx-hr-border-3',
			image: '#iconpath/line04.gif?rv=1.0.2', 
			html: '<hr style="border: black 0px none; border-top: black 1px dotted; height: 1px"/>'
		},
		{	data: 'tx-hr-image-1',
			image: '#iconpath/line03.gif?rv=1.0.2',
			html: '<div style="background: url(#decopath/line03.gif?rv=1.0.1) repeat-x scroll left;  width: 99%; height: 15px"><hr style="border: black 0px none; left: -999px; position: relative; top: -999px"></div>'
		},
		{	data: 'tx-hr-image-2',
			image: '#iconpath/line05.gif?rv=1.0.2',
			html: '<div style="background: url(#decopath/line05.gif?rv=1.0.1) repeat-x scroll left;  width: 99%; height: 15px"><hr style="border: black 0px none; left: -999px; position: relative; top: -999px"></div>'
		},
		{	data: 'tx-hr-image-3',
			image: '#iconpath/line06.gif?rv=1.0.2',
			html: '<div style="background: url(#decopath/line06.gif?rv=1.0.1) repeat-x scroll left;  width: 99%; height: 15px"><hr style="border: black 0px none; left: -999px; position: relative; top: -999px"></div>'
		},
		{	data: 'tx-hr-image-4',
			image: '#iconpath/line07.gif?rv=1.0.2',
			html: '<div style="background: url(#decopath/line08.gif?rv=1.0.1) repeat-x scroll left;  width: 99%; height: 15px"><hr style="border: black 0px none; left: -999px; position: relative; top: -999px"></div>'
		}]
	},
	function(root){
		var _config = TrexConfig.getTool("horizontalrule", root);
		_config.options.each(function(option) {
			option.image = TrexConfig.getIconPath(option.image, "horizontalrule"); 
			if(option.html) {
				option.html = TrexConfig.getDecoPath(option.html, "horizontalrule");
			}
		});
	}
);

Trex.Tool.HorizontalRule = Trex.Class.create({
	$const: {
		__Identity: 'horizontalrule'
	},
	$extend: Trex.Tool,
	oninitialized: function(config) {
			var _canvas = this.canvas;

			var map = {};
			config.options.each(function(option) {
				map[option.data] = {
					html: option.html
				};
			});

			var _toolHandler = function(data) {
				if(!map[data]) {
					return;
				}
				var _item = map[data];
				if (_canvas.canHTML()) {
					_canvas.execute(function(processor){
						processor.pasteContent(_item.html, true);
					});
				} else {
					_canvas.execute(function(processor) {
						processor.insertTag('',_item.html);
					});
				}	
			};

			/* button & menu weave */
			this.weave.bind(this)(
				/* button */
				new Trex.Button(this.buttonCfg),
				/* menu */
				new Trex.Menu.List(this.menuCfg),
				/* handler */
				_toolHandler
			);

			var _popdownHandler = this.button.onClick.bindAsEventListener(this.button);
			_canvas.observeKey({ // alt + - 
				ctrlKey: false,
				altKey: true,
				shiftKey: false,
				keyCode: ($tx.msie? 189: 109)
			}, _popdownHandler);
		}
	
});
/**
 * @fileoverview 
 *  Tool '\ud2b9\uc218\ubb38\uc790' Source,
 * Class Trex.Tool.SpecialChar \uc640 configuration\uc744 \ud3ec\ud568    
 *     
 */

TrexMessage.addMsg({
	'@specialchar.subtitle1': '\uc77c\ubc18\uae30\ud638',
	'@specialchar.subtitle2': '\uc218\ud559\ubd80\ud638, \ud1b5\ud654\ub2e8\uc704',
	'@specialchar.subtitle3': '\uc6d0 \uae30\ud638, \uad04\ud638',
	'@specialchar.subtitle4': '\uc77c\ubcf8\uc5b4',
	'@specialchar.subtitle5': '\ub85c\ub9c8\uc790, \uadf8\ub9ac\uc2a4'
});

TrexConfig.addTool(
	"specialchar", 
	{
		sync: false,
		status: true,
		rows: 9,
		cols: 20,
		top: null,
		left: null,
		matrices: [{
			title: TXMSG('@specialchar.subtitle1'),
			options: ['\uff03', '\uff06', '\uff0a', '\uff20', '\xa7', '\u203b', '\u2606', '\u2605', '\u25cb', '\u25cf', '\u25ce', '\u25c7', '\u25c6', '\u25a1', '\u25a0', '\u25b3', '\u25b2', '\u25bd', '\u25bc', '\u2192', '\u2190', '\u2191', '\u2193', '\u2194', '\u3013', '\u25c1', '\u25c0', '\u25b7', '\u25b6', '\u2664', '\u2660', '\u2661', '\u2665', '\u2667', '\u2663', '\u2299', '\u25c8', '\u25a3', '\u25d0', '\u25d1', '\u2592', '\u25a4', '\u25a5', '\u25a8', '\u25a7', '\u25a6', '\u25a9', '\u2668', '\u260f', '\u260e', '\u261c', '\u261e', '\xb6', '\u2020', '\u2021', '\u2195', '\u2197', '\u2199', '\u2196', '\u2198', '\u266d', '\u2669', '\u266a', '\u266c', '\u327f', '\u321c', '\u2116', '\u33c7', '\u2122', '\u33c2', '\u33d8', '\u2121', '\xae', '\xaa', '\xba', '\uff02', '\uff08', '\uff09', '\uff3b', '\uff3d', '\uff5b', '\uff5d', '\u2018', '\u2019', '\u201c', '\u201d', '\u3014', '\u3015', '\u3008', '\u3009', '\u300a', '\u300b', '\u300c', '\u300d', '\u300e', '\u300f', '\u3010', '\u3011', '\uff01', '\uff07', '\uff0c', '\uff0e', '\uff0f', '\uff1a', '\uff1b', '\uff1f', '\uff3e', '\uff3f', '\uff40', '\uff5c', '\uffe3', '\u3001', '\u3002', '\xb7', '\u2025', '\u2026', '\xa8', '\u3003', '\u2015', '\u2225', '\uff3c', '\u223c', '\xb4', '\uff5e', '\u02c7', '\u02d8', '\u02dd', '\u02da', '\u02d9', '\xb8', '\u02db', '\xa1', '\xbf', '\u02d0']
		},{
			title: TXMSG('@specialchar.subtitle2'),
			options: ['\uff0b', '\uff0d', '\uff1c', '\uff1d', '\uff1e', '\xb1', '\xd7', '\xf7', '\u2260', '\u2264', '\u2265', '\u221e', '\u2234', '\u2642', '\u2640', '\u2220', '\u22a5', '\u2312', '\u2202', '\u2207', '\u2261', '\u2252', '\u226a', '\u226b', '\u221a', '\u223d', '\u221d', '\u2235', '\u222b', '\u222c', '\u2208', '\u220b', '\u2286', '\u2287', '\u2282', '\u2283', '\u222a', '\u2229', '\u2227', '\u2228', '\uffe2', '\u21d2', '\u21d4', '\u2200', '\u2203', '\u222e', '\u2211', '\u220f\uff04', '\uff05', '\uffe6', '\uff26', '\u2032', '\u2033', '\u2103', '\u212b', '\uffe0', '\uffe1', '\uffe5', '\xa4', '\u2109', '\u2030', '?', '\u3395', '\u3396', '\u3397', '\u2113', '\u3398', '\u33c4', '\u33a3', '\u33a4', '\u33a5', '\u33a5', '\u33a6', '\u3399', '\u339a', '\u339b', '\u339c', '\u339d', '\u339e', '\u339f', '\u33a0', '\u33a1', '\u33a2', '\u33ca', '\u338d', '\u338e', '\u338f', '\u33cf', '\u3388', '\u3389', '\u33c8', '\u33a7', '\u33a8', '\u33b0', '\u33b1', '\u33b2', '\u33b3', '\u33b4', '\u33b5', '\u33b6', '\u33b7', '\u33b8', '\u33b9', '\u3380', '\u3381', '\u3382', '\u3383', '\u3384', '\u33ba', '\u33bb', '\u33bc', '\u33bd', '\u33be', '\u33bf', '\u3390', '\u3391', '\u3392', '\u3393', '\u3394', '\u2126', '\u33c0', '\u33c1', '\u338a', '\u338b', '\u338c', '\u33d6', '\u33c5', '\u33ad', '\u33ae', '\u33af', '\u33db', '\u33a9', '\u33aa', '\u33ab', '\u33ac', '\u33dd', '\u33d0', '\u33d3', '\u33c3', '\u33c9', '\u33dc', '\u33c6']
		},{
			title: TXMSG('@specialchar.subtitle3'),
			options: [
				'\u3260', '\u3261', '\u3262', '\u3263', '\u3264', '\u3265', '\u3266', '\u3267', '\u3268', '\u3269',
				'\u326a', '\u326b', '\u326c', '\u326d', '\u326e', '\u326f', '\u3270', '\u3271', '\u3272', '\u3273',
				'\u3274', '\u3275', '\u3276', '\u3277', '\u3278', '\u3279', '\u327a', '\u327b', '\u3200', '\u3201',
				'\u3202', '\u3203', '\u3204', '\u3205', '\u3206', '\u3207', '\u3208', '\u3209', '\u320a', '\u320b', 
				'\u320c', '\u320d', '\u320e', '\u320f', '\u3210', '\u3211', '\u3212', '\u3213', '\u3214', '\u3215', 
				'\u3216', '\u3217', '\u3218', '\u3219', '\u321a', '\u321b', '\u24d0', '\u24d1', '\u24d2', '\u24d3', 
				'\u24d4', '\u24d5', '\u24d6', '\u24d7', '\u24d8', '\u24d9', '\u24da', '\u24db', '\u24dc', '\u24dd', 
				'\u24de', '\u24df', '\u24e0', '\u24e1', '\u24e2', '\u24e3', '\u24e4', '\u24e5', '\u24e6', '\u24e7', '\u24e8', '\u24e9', '\u2460', '\u2461', '\u2462', '\u2463', '\u2464', '\u2465', '\u2466', '\u2467', '\u2468', '\u2469', '\u246a', '\u246b', '\u246c', '\u246d', '\u246e', '\u249c', '\u249d', '\u249e', '\u249f', '\u24a0', '\u24a1', '\u24a2', '\u24a3', '\u24a4', '\u24a5', '\u24a6', '\u24a7', '\u24a8', '\u24a9', '\u24aa', '\u24ab', '\u24ac', '\u24ad', '\u24ae', '\u24af', '\u24b0', '\u24b1', '\u24b2', '\u24b3', '\u24b4', '\u24b5', '\u2474', '\u2475', '\u2476', '\u2477', '\u2478', '\u2479', '\u247a', '\u247b', '\u247c', '\u247d', '\u247e', '\u247f', '\u2480', '\u2481', '\u2482']
		},{
			title: TXMSG('@specialchar.subtitle4'),
			options: ['\u3041', '\u3042', '\u3043', '\u3044', '\u3045', '\u3046', '\u3047', '\u3048', '\u3049', '\u304a', '\u304b', '\u304c', '\u304d', '\u304e', '\u304f', '\u3050', '\u3051', '\u3049', '\u3053', '\u3054', '\u3055', '\u3056', '\u3057', '\u3058', '\u3059', '\u305a', '\u305b', '\u305c', '\u305d', '\u305e', '\u305f', '\u3060', '\u3061', '\u3062', '\u3063', '\u3064', '\u3065', '\u3066', '\u3067', '\u3068', '\u3069', '\u306a', '\u306b', '\u306c', '\u306d', '\u306e', '\u306f', '\u3070', '\u3071', '\u3072', '\u3073', '\u3074', '\u3075', '\u3076', '\u3077', '\u3078', '\u3079', '\u307a', '\u307b', '\u307c', '\u307d', '\u307e', '\u307f', '\u3080', '\u3081', '\u3082', '\u3083', '\u3084', '\u3085', '\u3086', '\u3087', '\u3088', '\u3089', '\u308a', '\u308b', '\u308c', '\u308d', '\u308e', '\u308f', '\u3090', '\u3091', '\u3092', '\u3093', '\u30a1', '\u30a2', '\u30a3', '\u30a4', '\u30a5', '\u30a6', '\u30a7', '\u30a8', '\u30a9', '\u30aa', '\u30ab', '\u30ac', '\u30ad', '\u30ae', '\u30af', '\u30b0', '\u30b1', '\u30b2', '\u30b3', '\u30b4', '\u30b5', '\u30b6', '\u30b7', '\u30b8', '\u30b9', '\u30ba', '\u30bb', '\u30bc', '\u30bd', '\u30be', '\u30bf', '\u30c0', '\u30c1', '\u30c2', '\u30c3', '\u30c4', '\u30c5', '\u30c6', '\u30c7', '\u30c8', '\u30c9', '\u30ca', '\u30cb', '\u30cc', '\u30cd', '\u30ce', '\u30cf', '\u30d0', '\u30d1', '\u30d2', '\u30d3', '\u30d4', '\u30d5', '\u30d6', '\u30d7', '\u30d8', '\u30d9', '\u30da', '\u30db', '\u30dc', '\u30dd', '\u30de', '\u30df', '\u30e0', '\u30e1', '\u30e2', '\u30e3', '\u30e4', '\u30e5', '\u30e6', '\u30e7', '\u30e8', '\u30e9', '\u30ea', '\u30eb', '\u30ec', '\u30ed', '\u30ee', '\u30ef', '\u30f0', '\u30f1', '\u30f2', '\u30f3', '\u30f4', '\u30f5', '\u30f6']
		},{
			title: TXMSG('@specialchar.subtitle5'),
			options: ['\uff10', '\uff11', '\uff12', '\uff13', '\uff14', '\uff15', '\uff16', '\uff17', '\uff18', '\uff19', '\u2170', '\u2171', '\u2172', '\u2173', '\u2174', '\u2175', '\u2176', '\u2177', '\u2178', '\u2179', '\u2160', '\u2161', '\u2162', '\u2163', '\u2164', '\u2165', '\u2166', '\u2167', '\u2168', '\u2169', '\u0391', '\u0392', '\u0393', '\u0394', '\u0395', '\u0396', '\u0397', '\u0398', '\u0399', '\u039a', '\u039b', '\u039c', '\u039d', '\u039e', '\u039f', '\u03a0', '\u03a1', '\u03a3', '\u03a4', '\u03a5', '\u03a6', '\u03a7', '\u03a8', '\u03a9', '\u03b1', '\u03b2', '\u03b3', '\u03b4', '\u03b5', '\u03b6', '\u03b7', '\u03b8', '\u03b9\u03ba', '\u03bb', '\u03bc', '\u03bd', '\u03be', '\u03bf', '\u03c0', '\u03c1', '\u03c3', '\u03c4', '\u03c5', '\u03c6', '\u03c7', '\u03c8', '\u03c9']
		}]
	}
);

TrexMessage.addMsg({
	'@specialchar.cancel.image': "#iconpath/btn_l_cancel.gif?rv=1.0.1",
	'@specialchar.confirm.image': "#iconpath/btn_l_confirm.gif?rv=1.0.1",
	'@specialchar.title': "\uc120\ud0dd\ud55c \uae30\ud638"
});
		
Trex.Tool.SpecialChar = Trex.Class.create({
	$const: {
		__Identity: 'specialchar'
	},
	$extend: Trex.Tool,
	oninitialized: function(config) {
			var _canvas = this.canvas;

			var _toolHandler = function(value) {
				if(!value){
					return;
				}
				_canvas.execute(function(processor) {
					processor.pasteContent(value, false);
				});
			};

			/* button & menu weave */
			this.weave.bind(this)(
				/* button */
				new Trex.Button(this.buttonCfg),
				/* menu */
				new Trex.Menu.SpecialChar(this.menuCfg),
				/* handler */
				_toolHandler
			);
		}
	
});

Trex.MarkupTemplate.add(
	'menu.specialchar.input', [
		'<dl class="tx-menu-matrix-input">',
		'	<dt><span>@specialchar.title</span></dt>',
		'	<dd><input type="text" value=""/></dd>',
		'	<dd><img class="tx-menu-btn-confirm" src="@specialchar.confirm.image" align="absmiddle"/></dd>',
		'	<dd><img class="tx-menu-btn-cancel" src="@specialchar.cancel.image" align="absmiddle"/></dd>',
		'</dl>'
	].join("")
);
Trex.Menu.SpecialChar = Trex.Class.create({
	$extend: Trex.Menu.Matrix,
	ongenerated: function(config) {
		var _elMenu = this.elMenu;
		
		var _elInputSet = Trex.MarkupTemplate.get('menu.specialchar.input').evaluateAsDom({});
		$tom.append($tom.collect(_elMenu, 'div.tx-menu-inner'), _elInputSet);

		var _elInput = this.elInput = $tom.collect(_elInputSet, 'input');
		var _elImgs = $tom.collectAll(_elInputSet, 'img');
			
		if(_elImgs.length == 2) {
			$tx.observe(_elImgs[0], "click", function() {
				this._command(this.elInput.value);
				this.hide();
			}.bind(this));
			$tx.observe(_elImgs[1], "click", function() {
				this.onCancel();
			}.bind(this));
		}
		
		$tx.observe( _elInput, "keydown", function(ev){
			if ( ev.keyCode == 13 ){
				$tx.stop(ev);
				this._command(this.elInput.value);
				this.hide();
			};
		}.bind(this));
	},
	onregenerated: function(config) {
		this.elInput.value = "";
		this.elInput.focus();
	},
	onSelect: function(ev) {
		var el = $tx.findElement(ev, 'span');
		if (el.tagName && el.tagName.toLowerCase() != 'span') {
			return;
		}
		this.elInput.value += (!el.innerText || el.innerText == "&nbsp;" || el.innerText.trim() == "")? "": el.innerText;
		$tx.stop(ev);
	}
});
/**
 * @fileoverview 
 * \uc601\uc5b4 \uc0ac\uc804 \ud31d\uc5c5\uc744 \ub744\uc6cc \uc8fc\ub294 '\uc0ac\uc804' Icon\uc744 \uc704\ud574 \ud544\uc694\ud55c source, configuration\uacfc Class Trex.Tool.Dictionary\uc744/\ub97c \ud3ec\ud568    
 *   
 */
TrexConfig.addTool(
	"dictionary",
	{
		url: 'http://engdic.daum.net/dicen/small_view_top.do',
		sync: false,
		status: false
	}
);

Trex.Tool.Dictionary = Trex.Class.create({
	$const: {
		__Identity: 'dictionary'
	},
	$extend: Trex.Tool,
	oninitialized: function(config) {
			var _canvas = this.canvas;

			var _toolHandler = function() {
				var _word = _canvas.query(function(processor) {
					return encodeURI(processor.getText());
				});
				var _popupUrl = (_word.length > 0) ?  "http://engdic.daum.net/dicen/small_search.do" : config.url;
				var _dicWin = window.open(_popupUrl + '?q=' + _word, 'dicWin', 'width=410,height=550,scrollbars=yes'); 
				_dicWin.focus();
			};

			/* button & menu weave */
			this.weave.bind(this)(
				/* button */
				new Trex.Button(this.buttonCfg),
				/* menu */
				null,
				/* handler */
				_toolHandler
			);
		}
});
TrexConfig.addTool(
	"background", 
	{
		wysiwygonly: true,
		sync: false,
		status: true,
		thumbs: Trex.__CONFIG_COMMON.thumbs
	}
);
Trex.Tool.Background = Trex.Class.create({
	$const: {
		__Identity: 'background'
	},
	$extend: Trex.Tool,
	oninitialized: function(config) {
		var _canvas = this.canvas;

		var _toolHandler = function(color) {
			_canvas.addStyle({
				backgroundColor: color
			});
		};

		/* button & menu weave */
		this.weave.bind(this)(
			/* button */
			new Trex.Button(this.buttonCfg),
			/* menu */
			new Trex.Menu.ColorPallete(this.menuCfg),
			/* handler */
			_toolHandler
		);
	}
});

Trex.install('canvas.getBgColor & canvas.setBgColor & editor.getContentWithBg', 
	function(editor, toolbar, sidebar, canvas, config) {
		//\uc800\uc7a5, \ub85c\ub4dc\ud560\ub54c content \uc218\uc815
		canvas.getBgColor = function() {
			var color = canvas.getPanel("html").getStyle("backgroundColor");
			if ( color ) {
				return Trex.Color.getHexColor(color);	
			} else {
				return "";
			}
		};
		
		canvas.setBgColor = function(color) {
			canvas.getPanel("html").addStyle({
				"backgroundColor": color || 'transparent'
			});
		};
		
		editor.getContentWithBg = function() {
			var _selColor = canvas.getBgColor().toLowerCase();
			if(_selColor == 'transparent') {
				return editor.getContent();
			} else {
				return [
					'<table class="txc-wrapper" border="0" cellspacing="0" cellpadding="0"><tr>',
					'<td bgcolor="',_selColor,'">',
					editor.getContent(),
					'</td>',
					'</tr></table>'
				].join("");
			}
		};
		
		var _originInitContent = canvas.initContent.bind(canvas);
		canvas.initContent = function(content) {
			if(content.search(/<table[^>]*txc-wrapper[^>]*>/i) > -1) {
				var _selColor;
				content = content.replace(/<table[^>]*txc-wrapper[^>]*><tr><td([^>]*)>([\s\S]*?)<\/td><\/tr><\/table>/i, function(full, color, html){
					_selColor = color.replace(/\sbgcolor="([#\w]*)"/, "$1");
					return html;
				});
				canvas.setBgColor(_selColor);
			}
			_originInitContent(content);
		};
	}
);/**
 * @fileoverview 
 *  toolbar\uc758 \uc811\ud78c \ubd80\ubd84\uc744 \uc5f4\uace0\ub2eb\ub294 '\ub354\ubcf4\uae30' Icon\uc744 \uc704\ud574 \ud544\uc694\ud55c configuration\uacfc Class Trex.Tool.Advanced \ub97c \ud3ec\ud568    
 * 
 */
TrexConfig.addTool(
	"advanced",
	{
		sync: false,
		status: true,
		opened: false
	}
);

/**
 * Trex.Tool.Advanced
 * 
 * @class
 * @extends  Trex.Tool
 */
Trex.Tool.Advanced = Trex.Class.create({
	$const: {
		__Identity: 'advanced'
	},
	$extend: Trex.Tool,
	/**
	 * instance\uac00 \uc0dd\uc131\ub420 \ub54c \uc2e4\ud589\ub418\uba70 \ud544\uc694\ud55c UI Component \ubc0f Event handler\ub97c \uc0dd\uc131\ud55c\ub2e4.  
	 * 
	 * @memberOf Trex.Tool.Advanced.prototype 
	 * @param {Object} config
	 */
	oninitialized: function(config) {
		var _canvas = this.canvas;
		var _toolbar = this.toolbar;

		var _elBasic = _toolbar.el;
		var _elAdvanced = $tom.collect(_elBasic.parentNode, 'div.tx-toolbar-advanced');
		if(!_elAdvanced) {
			return;
		}

		_toolbar.observeJob("toolbar.advanced.fold", function() {
			$tx.hide(_elAdvanced);
			$tx.removeClassName(_elBasic, 'tx-toolbar-basic-open');
		});

		_toolbar.observeJob("toolbar.advanced.spread", function() {
			$tx.show(_elAdvanced);
			$tx.addClassName(_elBasic, 'tx-toolbar-basic-open');
		});

		var _isOpened = false;
		var _toolHandler = function() {
			if(_isOpened) {
				_toolbar.fireJobs("toolbar.advanced.fold");
			} else {
				_toolbar.fireJobs("toolbar.advanced.spread");
			}
			_isOpened = !_isOpened;
		};

		/* button & menu weave */
		this.weave.bind(this)(
			/* button */
			new Trex.Button(this.buttonCfg),
			/* menu */
			null,
			/* handler */
			_toolHandler
		);

		if(config.opened == true) { 
			_elAdvanced.show();
			$tx.addClassName(_elBasic, 'tx-toolbar-basic-open');
			_isOpened = true;
		}
	}
});
Trex.module("add drop-down menu button if extra buttons exist.", 
	function (editor, toolbar, sidebar, canvas, config) {
		var _seq = 0;
		var addExtraButtonEvent = function(elButton) {
			var elMenu = $tom.next(elButton, '.tx-extra-menu');
			if (!elMenu) {
				return;
			}
			
			var _dummyToolClass = new (function() {
				this.identity = 'extra' + (++_seq);
				this.wysiwygonly = true;
				this.canvas = canvas;
				this.toolbar = toolbar;
			})();
			
			Trex.Tool.prototype.weave.bind(_dummyToolClass)(
				new Trex.Button({
					el: elButton,
					sync: false,
					status: true
				}), 
				new Trex.Menu({
					el: elMenu
				}), 
				function() { //dummy handler
				}
			);
			
			toolbar.tools[_dummyToolClass.identity] = _dummyToolClass;
		};
		
		canvas.observeJob(Trex.Ev.__IFRAME_LOAD_COMPLETE, function() {
			var _elButtonList = $tom.collectAll(editor.getWrapper(), 'li.tx-list-extra div.tx-extra');
			if (_elButtonList.length == 0) {
				return;
			}
			_elButtonList.each(addExtraButtonEvent);
		});
	}
);


TrexConfig.addTool(
	"fullscreen", 
	{
		wysiwygonly: false,
		status: false,
		switched: false,
		minHeight: 200,
		minWidth: 766
	}
);

TrexMessage.addMsg({
	'@fullscreen.attach.close.btn': "\ud30c\uc77c\ucca8\ubd80\ubc15\uc2a4",
	'@fullscreen.noti.btn': "\uc77c\ubc18 \uae00\uc4f0\uae30\ub85c",
	'@fullscreen.noti.span': "\ub113\uac8c\uc4f0\uae30 \ubc84\ud2bc\uc744 \ub2e4\uc2dc \ub204\ub974\uc2dc\uba74 \ucc98\uc74c \uae00\uc4f0\uae30 \ucc3d \ud06c\uae30\ub85c \ub3cc\uc544\uac11\ub2c8\ub2e4."
});

Trex.Tool.FullScreen = Trex.Class.create({
	$const: {
		__Identity: 'fullscreen'
	},
	$extend: Trex.Tool,
	oninitialized: function(config) {
		var _editor = this.editor;
		var _canvas = _editor.getCanvas();
		
		var _attachBox = _editor.getAttachBox();
		
		var _wrapper = _editor.getWrapper();
		if(!_wrapper) {
			return;
		}
		
		var _fullscreen;
		var _toolHandler = function() {
			if(!_fullscreen) {
				_fullscreen = new Trex.FullScreen(_editor, config);
			}
			_fullscreen.execute();
		};
		
		if(config.switched) { //\uae30\ubcf8\uc774 \uc804\uccb4\ud654\uba74
			if(!_fullscreen) {
				_fullscreen = new Trex.FullScreen(_editor, config);
			}
			_fullscreen.showFullScreen();
		}
		
		this.weave.bind(this)(
			new Trex.Button(this.buttonCfg), 
			null,
			_toolHandler
		);
		
		_canvas.observeKey({ // ctrl + m - \ub113\uac8c\uc4f0\uae30
			ctrlKey: true,
			altKey: false,
			shiftKey: false,
			keyCode: 77
		}, _toolHandler);

		_editor.observeKey({ // ctrl + m - \ub113\uac8c\uc4f0\uae30
			ctrlKey: true,
			altKey: false,
			shiftKey: false,
			keyCode: 77
		}, _toolHandler);
	}
});


Trex.MarkupTemplate.add(
	'fullscreen.notice', 
	'<div class="tx-fullscreen-notice"><span>@fullscreen.noti.span</span><a href="#">@fullscreen.noti.btn</a></div>'
);
Trex.MarkupTemplate.add(
	'fullscreen.linebox', 
	'<div class="tx-fullscreen-line">\
		<div class="tx-fullscreen-line-division">\
			<div class="tx-fullscreen-line-left">&nbsp;</div>\
			<div class="tx-fullscreen-line-right">&nbsp;</div>\
		</div>\
		<div class="tx-fullscreen-line-box">\
			<div class="tx-fullscreen-line-left">&nbsp;</div>\
			<div class="tx-fullscreen-line-right">&nbsp;</div>\
			<a href="#">@fullscreen.attach.close.btn</a>\
		</div>\
	</div>'
);
Trex.FullScreen = Trex.Class.create({
	initialize: function(editor, config) {
		if(!editor) {
			return;
		}
		
		this.isInit = false;
		this.isFullScreen = false;

		this.wrapper = editor.getWrapper();
		this.canvas = editor.getCanvas();
		this.toolbar = editor.getToolbar();
		this.attachBox = editor.getAttachBox();

		this.elSavedHiddens = [];
		this.minHeight = config.minHeight;
		this.minWidth = config.minWidth;

		this.useAttachBox = (this.attachBox.elBox !== undefined);
		this.isAttachBoxDisplay = false;

		this.resizeHandler = this.resizeContainer.bind(this);

		this.toolbar.observeJob("toolbar.advanced.fold", function() { 
			if (this.isFullScreen) {
				this.resizeContainer();
			}
		}.bind(this));
		
		this.toolbar.observeJob("toolbar.advanced.spread", function() { 
			if (this.isFullScreen) {
				this.resizeContainer();
			}
		}.bind(this));
		
		if(typeof(showAttachBox) != 'undefined') { //NOTE: service specific job for changing attachbox's display(callback)
			this.showAttachBoxAtServiceForSave = showAttachBox; //NOTE: cuz disable showAttachBox() at fullscreen mode
		}
		if(typeof(hideAttachBox) != 'undefined') { //NOTE: service specific job for changing attachbox's display(callback)
			this.hideAttachBoxAtServiceForSave = hideAttachBox; //NOTE: cuz disable hideAttachBox() at fullscreen mode
		}
	},
	execute: function() {
		if(this.isFullScreen) {
			this.showNormalScreen();
		} else {
			this.showFullScreen();
		}
	},
	onAttachClick: function() {
		this.attachClickHandler(!this.isAttachBoxDisplay);
		this.resizeContainer();
	},
	attachClickHandler: function(isAttachBoxDisplay) {
		if(isAttachBoxDisplay) {
			this.showAttachBox();
		} else {
			this.hideAttachBox();
		}
	},
	showNormalScreen: function() {
		if(!this.isFullScreen) {
			return;
		}

		document.documentElement.style.overflow = '';
		document.body.style.overflow = '';

		//NOTE: Service Specific
		this.showNormalScreenAtService();

		var _wrapper = this.wrapper;
		if(!_wrapper) {
			return;
		}

		_wrapper.style.width = '';
		$tx.removeClassName(_wrapper, 'tx-editor-fullscreen');

		this.elSavedHiddens.each(function(el) {
			el.style.visibility = 'visible';
		});

		if(parent) {
			if (parent.parent) {
				$tx.stopObserving(parent.parent, 'resize', this.resizeHandler);
			} else {
				$tx.stopObserving(parent, 'resize', this.resizeHandler);
			}
		} else {
			$tx.stopObserving(window,'resize', this.resizeHandler);
		}

		this.canvas.setCanvasSize({
		 	height: this.panelNormalHeight.toPx()
		});

		//\ucca8\ubd80\ud30c\uc77c\ubc15\uc2a4
		if(this.useAttachBox) {
			this.attachClickHandler(this.attachBox.checkDisplay());
		}

		this.canvas.fireJobs("plugin.normalscreen.change");
		
		//NOTE: Service Specific
		if(this.showAttachBoxAtServiceForSave) {
			window.showAttachBox = this.showAttachBoxAtServiceForSave;
		}
		if(this.hideAttachBoxAtServiceForSave) {
			window.hideAttachBox = this.hideAttachBoxAtServiceForSave;
		}
		
		
		for (var i = 0; i < this.relativeParents.length; i++) {
			var element = this.relativeParents.pop();
			var value = this.relativeValues.pop();
			element.style.position = value;
		}
		
		this.isFullScreen = false;
		if (!$tx.msie) {
			setTimeout(function() {
				var _elIcon = $tom.collect($tx("tx_fullscreen"), "a");
				_elIcon.focus();
			}.bind(this), 500);
		}
	},
	showFullScreen: function() {
		if(this.isFullScreen) {
			return;
		}

		if(!this.isInit) {
			this.generate();
		}

		document.documentElement.style.overflow = 'hidden'; //Remove basic scrollbars
		document.documentElement.scrollTop = 0;
		document.body.style.overflow = 'hidden';

		//NOTE: Service Specific
		this.showFullScreenAtService();
		if(this.showAttachBoxAtServiceForSave) {
			window.showAttachBox = function(){
				this.showAttachBox();
				this.resizeContainer();
			}.bind(this);
		}
		if(this.hideAttachBoxAtServiceForSave) {
			window.hideAttachBox = function(){
				this.hideAttachBox();
				this.resizeContainer();
			}.bind(this);
		}
		
		var _wrapper = this.wrapper;

		if(!_wrapper) {
			return;
		}
		$tx.addClassName(_wrapper, 'tx-editor-fullscreen');
		
		//Hide select,activeX 
		var _savedHiddens = [];
		["select", "embed", "object"].each(function(name) {
			var _elHdns = $A(document.getElementsByTagName(name));
			_elHdns.each(function(el) {
				el.style.visibility = 'hidden';
				_savedHiddens.push(el);
			});
		});
		this.elSavedHiddens = _savedHiddens;

		//attach file box
		if(this.useAttachBox) {
			this.attachClickHandler(this.attachBox.checkDisplay());
		}

		var _panel = this.canvas.getCurrentPanel();
		this.panelNormalHeight = _panel.getPosition().height;

		if(parent) {
			if (parent.parent) {
				$tx.observe(parent.parent, 'resize', this.resizeHandler);
			} else {
				$tx.observe(parent, 'resize', this.resizeHandler);
			}
		} else {
			$tx.observe(window,'resize', this.resizeHandler);
		}

		this.canvas.fireJobs("plugin.fullscreen.change");

		// make trace element and move container to body's direct child
		window.wrapper = _wrapper;
		this.relativeParents = [];
		this.relativeValues = [];
		var parent = _wrapper.offsetParent;
		while (parent && parent.tagName && parent.tagName.toUpperCase() != "HTML" && parent.tagName.toUpperCase() != "BODY") {
			var position = (parent.currentStyle)?parent.currentStyle['position']:window.getComputedStyle(parent, null).getPropertyValue('position');
			if (position.toLowerCase() == "relative") {
				this.relativeParents.push(parent);
				this.relativeValues.push(position);
				parent.style.position = "static";
			}
			parent = parent.offsetParent;
		}
		
		this.isFullScreen = true;
		this.resizeContainer();
		if (!$tx.msie) {
			var _elIcon = $tom.collect($tx("tx_fullscreen"), "a");
			_elIcon.focus();
		}
	},
	generate: function() {
		if(this.isInit) {
			return;
		}

		var _wrapper = this.wrapper;
		if(!_wrapper) {
			return;
		}

		var _elNoti = Trex.MarkupTemplate.get("fullscreen.notice").evaluateAsDom({});
		$tom.insertFirst(_wrapper, _elNoti);
		
		var _elNotiBtn = $tom.collect(_elNoti, 'a');
		$tx.observe(_elNotiBtn,'click', function() { //NOTE: cuz
			if(this.isFullScreen) {
				this.showNormalScreen();
			} else {
				this.showFullScreen();
			}
		}.bind(this));

		var _elCanvas = this.canvas.elContainer;
		var _elLine = Trex.MarkupTemplate.get("fullscreen.linebox").evaluateAsDom({});
		$tom.insertNext(_elLine, _elCanvas);

		var _attr = { className: "tx-fullscreen-line-box"};
		if($tx.msie_ver == '5.5'){
			_attr.align = "center"; 
		}
		
		var _elLineBox = $tom.collect(_elLine, 'div.tx-fullscreen-line-box');
		if($tx.msie_ver == '5.5'){
			_elLineBox.align = "center"; 
		}
		
		var _elLineBtn = this.elLineBtn = $tom.collect(_elLineBox, "a");
		$tx.observe(_elLineBtn,'click', this.onAttachClick.bind(this));
		this.isInit = true;
	},
	getAttachBoxPosition: function() {
		if(this.isAttachBoxDisplay) {
			return $tom.getPosition(this.attachBox.elBox);
		} else {
			return {x:0, y:0, width:0, height:0};
		}
	},
	resizeContainer: function() {
		//NOTE: Service Specific
		this.resizeScreenAtService();
		var _panelPosY = this.canvas.getCanvasPos().y;
		var _attachBoxPosition = this.getAttachBoxPosition();

		var _panelHeight = 0;
		if (document.documentElement.clientHeight > 0) {
			_panelHeight = document.documentElement.clientHeight - _panelPosY - 17; //NOTE: cuz line
		}else{
			_panelHeight = document.documentElement.offsetHeight - _panelPosY - 17;
		}
		
		if(_attachBoxPosition.height > 0) {
			_panelHeight -= _attachBoxPosition.height + 20; //NOTE: cuz margin
		}
		_panelHeight = Math.max(_panelHeight, this.minHeight);

		this.canvas.setCanvasSize({
			height: _panelHeight.toPx()
		});

		var _panelWidth = 0;
		if(document.documentElement.clientWidth > 0){
			_panelWidth = document.documentElement.clientWidth;
		}else{
			_panelWidth = document.documentElement.offsetWidth;
		}
		
		_panelWidth = Math.max(_panelWidth, this.minWidth);

		var _wrapper = this.wrapper;
		if(!_wrapper) {
			return;
		}
		_wrapper.style.width = _panelWidth.toPx();
	},
	showAttachBox: function() {
		if(this.attachBox.useBox) {
			$tx.addClassName(this.elLineBtn, "tx-attach-close");
			$tx.show(this.attachBox.elBox);
			this.isAttachBoxDisplay = true;
		}
	},
	hideAttachBox: function() {
		if(this.attachBox.useBox) {
			$tx.removeClassName(this.elLineBtn, "tx-attach-close");
			$tx.hide(this.attachBox.elBox);
			this.isAttachBoxDisplay = false;
		}
	},
	showFullScreenAtService: function() { //NOTE: service specific job for fullscreen(callback)
		if(typeof(showFullScreen) != 'undefined') {
			showFullScreen();
		}
	},
	showNormalScreenAtService: function() { //NOTE: service specific job for escaping from fullscreen(callback)
		if(typeof(showNormalScreen) != 'undefined') {
			showNormalScreen();
		}
	},
	resizeScreenAtService: function() { //NOTE: service specific job for resize(callback)
		if(typeof(resizeScreen) != 'undefined') {
			resizeScreen();
		}
	}
});

/**
 * @imageoverview 
 * Image \uc5c5\ub85c\ub4dc \uad00\ub828 Source
 * Trex.Tool.Image - UI,
 * Trex.Attacher.Image,
 * Trex.Attachment.Image,
 * default configuration\ub97c \ud3ec\ud568\ud558\uace0 \uc788\ub2e4.
 */
TrexConfig.addTool(
	"image",
	{
		wysiwygonly: true,
		sync: false,
		status: false
	}
);

TrexMessage.addMsg({
	'@image.title': "\uc0ac\uc9c4"
});

Trex.Tool.Image = Trex.Class.create({
	$const: {
		__Identity: 'image'
	},
	$extend: Trex.Tool,
	oninitialized: function(config) {
		var _editor = this.editor;
		this.weave.bind(this)(
			new Trex.Button(this.buttonCfg), 
			null,
			function() {
				_editor.getSidebar().getAttacher("image").execute();
			}
		);
	}
});

TrexConfig.addAttacher(
	"image",
	{	
		multiple: true,
		multipleuse: false,
		checksize: false,
		boxonly: false,
		wysiwygonly: true,
		objattr: {},
		features: { left:250, top:65, width:797, height:644 },
		popPageUrl: "#host#path/pages/popup/image.html"
	},
	function(root){
		var _config = TrexConfig.getAttacher("image", root);
		_config.popPageUrl = TrexConfig.getUrl(_config.popPageUrl);
		_config.features = TrexConfig.getPopFeatures(_config.features);
	}
);

/**
 * Trex.Attacher.Image
 * @class
 * @extends Trex.Attacher
 */
Trex.Attacher.Image = Trex.Class.create({
	$const: {
		__Identity: 'image'
	},
	$extend: Trex.Attacher,
	name: 'image',
	title: TXMSG("@image.title"),
	canModified: false,
	canResized: true,
	oninitialized: function(root) {
		
	},
	getKey: function(data) {
		return data.imageurl;
	},
	getDataForEntry: function(data) {
		data.imageurl = this.encodeSpaceInUrl(data.imageurl);
		data.originalurl = this.encodeSpaceInUrl(data.originalurl);
		data.attachurl = this.encodeSpaceInUrl(data.attachurl);
		  
		if(!data.dispElId) {
			data.dispElId = Trex.Util.getDispElId();
		}
		var _seq = ((data.tmpSeq)? this.entryBox.syncSeq(data.tmpSeq): this.entryBox.newSeq());
		var _data = Object.extend({ 
			dataSeq: _seq
		}, data); //NOTE: Cuz IE
		return _data;
	},
	createEntry: function(data, type) {
		return this.createAttachment(data, type);
 	},
	encodeSpaceInUrl: function(url){
		if ( !url ) {
			return ;
		}
		
		return url.replace(/ /g, "%20");	
	},
	execAttach: function(data, type) {
		var _entry = this.createEntry(this.getDataForEntry(data), type);
		_entry.execRegister();
	},
	execReload: function(data, content, type) {
		var _entry = this.createEntry(this.getDataForEntry(data, content), type);
		_entry.execReload();
	}
});

/**
 * Trex.Attachment.Image 
 * 
 *  @example
 *  	data = {
 *			thumburl: "string",
 *			imageurl: "string",
 *			filename: "string",
 *			filesize: number
 *		}
 * @class
 * @extends Trex.Attachment
 */
Trex.Attachment.Image = Trex.Class.create({
	$const: {
		__Identity: 'image'
	},
	$extend: Trex.Attachment,
	getFieldAttr: function(data) {
		return {
			name: 'tx_attach_image', 
			value: [data.thumburl, data.imageurl, data.originalurl, data.exifurl, data.filename, data.filesize].join('|')
		};
	},
	getBoxAttr: function(data) {
		var _rectangle = data.width ? data.width + "x" + data.height + " / " : ""; 
		return {
			name: data.filename + " (" +  _rectangle + data.filesize.toByteUnit() + ")",
			image: data.thumburl
		};
	},
	getObjectAttr: function(data) {
		var _objattr = Object.extend({}, this.actor.config.objattr);
		if(data.width) {
			if(!_objattr.width || _objattr.width > data.width) {
				_objattr.width = data.width;
			}
		} else {
			_objattr.width = null;
		}
		if(data.height) {
			if(!_objattr.height || _objattr.height > data.height) {
				_objattr.height = data.height;
			}
		} else {
			_objattr.height = null;
		}
		return _objattr;
	},
	getObjectStyle: function(data) {
		var _objstyle = {};
		if(this.actor.config.objstyle) {
			_objstyle = Object.extend(_objstyle, this.actor.config.objstyle);
		}
		if(data.imagealign) {
			var _objectStyle = {
				"L": Trex.Tool.AlignLeft,
				"C": Trex.Tool.AlignCenter,
				"FL": Trex.Tool.AlignRight,
				"FR": Trex.Tool.AlignFull
			}[data.imagealign];
			if (_objectStyle && _objectStyle.__ImageModeProps && _objectStyle.__ImageModeProps['image']) {
				_objstyle = Object.extend(_objstyle, _objectStyle.__ImageModeProps['image']['style']);
			}
		}
		return _objstyle;
	},
	getParaStyle: function(data) {
		var _parastyle = Object.extend({}, this.actor.config.parastyle || this.actor.config.defaultstyle);
		if(data.imagealign) {
			var _objectStyle = {
				"L": Trex.Tool.AlignLeft,
				"C": Trex.Tool.AlignCenter,
				"FL": Trex.Tool.AlignRight,
				"FR": Trex.Tool.AlignFull
			}[data.imagealign];
			if (_objectStyle && _objectStyle.__ImageModeProps && _objectStyle.__ImageModeProps['paragraph']) {
				_parastyle = Object.extend(_parastyle, _objectStyle.__ImageModeProps['paragraph']['style']);
			}
		}
		return _parastyle;
	},
	getSaveHtml: function(data) {
		return "<img src=\"" + data.imageurl + "\" class=\"tx-daum-image\"/>";
	},
	getDispHtml: function(data) {
		return "<img id=\"" + data.dispElId + "\" src=\"" + data.imageurl + "\" class=\"txc-image\"/>";
	},
	getDispText: function(data) {
		return "<img src=\"" + data.imageurl + "\" class=\"tx-daum-image\"/>";
	},
	getRegLoad: function(data) {
		return new RegExp("<(?:img|IMG)[^>]*src=\"?" + data.imageurl.getRegExp() + "\"?[^>]*\/?>", "gm");
	},
	getRegHtml: function(data) {
		return new RegExp("<(?:img|IMG)[^>]*src=\"?" + data.imageurl.getRegExp() + "\"?[^>]*\/?>", "gm");
	}, 
	getRegText: function(data) {
		return new RegExp("<(?:img|IMG)[^>]*src=\"?" + data.imageurl.getRegExp() + "\"?[^>]*\/?>", "gm");
	}
});
/**
 * @fileoverview 
 * File \uc5c5\ub85c\ub4dc \uad00\ub828 Source
 * Trex.Tool.File - UI,
 * Trex.Attacher.File,
 * Trex.Attachment.File,
 * default configuration\ub97c \ud3ec\ud568\ud558\uace0 \uc788\ub2e4.
 */
TrexConfig.addTool(
	"file",
	{	wysiwygonly: true,
		sync: false,
		status: false
	}
);

TrexMessage.addMsg({
	'@file.title': "\ud30c\uc77c"
});

/**
 * Trex.Tool.File
 * @class
 * @extends Trex.Tool
 */
Trex.Tool.File = Trex.Class.create({
	/** ignore */
	$const: {
		__Identity: 'file'
	},
	/** ignore */
	$extend: Trex.Tool,
	oninitialized: function(config) {
		var _editor = this.editor;
		this.weave.bind(this)(
			new Trex.Button(this.buttonCfg), 
			null,
			function() {
				_editor.getSidebar().getAttacher("file").execute();
			}
		);
	}
});

TrexConfig.addAttacher(
	"file",
	{
		multiple: true,
		multipleuse: false,
		checksize: true,
		boxonly: false,
		wysiwygonly: false,
		features: { left:250, top:65, width:450, height:404 },
		popPageUrl: "#host#path/pages/popup/file.html"
	},
	function(root){
		var _config = TrexConfig.getAttacher("file", root);
		_config.popPageUrl = TrexConfig.getUrl(_config.popPageUrl);
		_config.features = TrexConfig.getPopFeatures(_config.features);
	}
);

/**
 * Trex.Attacher.File
 * @class
 * @extends Trex.Attacher
 */
Trex.Attacher.File = Trex.Class.create({
	/** @ignore */
	$const: {
		__Identity: 'file'
	},
	/** @ignore */
	$extend: Trex.Attacher,
	name: 'file',
	title: TXMSG("@file.title"),
	canModified: true,
	canResized: false,
	oninitialized: function(root) {
		var _config = this.config;
		var _entryBox = this.entryBox;
	},
	getKey: function(data) {
		return data.key || data.attachurl;
	},
	/**
	 * data\ub97c editor\uc5d0 \ub9de\uac8c parsing\ud560\ub54c \ubd88\ub9ac\ub294 methond
	 * @memberOf Trex.Attacher.File.prototype
	 * @param {Object} data
	 */
	getDataForEntry: function(data) {
		if(!data.dispElId) {
			data.dispElId = Trex.Util.getDispElId();
		}
		var _seq = ((data.tmpSeq)? this.entryBox.syncSeq(data.tmpSeq): this.entryBox.newSeq());
		var _ext = data.filename.split(".").pop().toLowerCase();
		var _thumburl;
		switch(_ext){
			case "jpg":
			case "gif":
			case "png":
			case "bmp":
				_thumburl = data.attachurl.replace("/attach/", "/thumbnail/");
				break;
			default :
				_thumburl = Trex.Util.thumburl(_ext);
		}
		var _data = Object.extend({
			dataSeq: _seq,
			thumburl: _thumburl,
			prevurl: Trex.Util.prevurl(data.filename.split(".").pop().toLowerCase())
		}, data); //NOTE: Cuz IE
		return _data;
	}
});

/**
 * Trex.Attachment.File 
 * 
 *  @example
 *  	data = {
 *			attachurl: "string",
 *			filename: "string",
 *			filesize: number,
 *			filemime: "string"
 *		}
 * @class
 * @extends Trex.Attachment
 */
Trex.Attachment.File = Trex.Class.create({
	/** @ignore */
	$const: {
		__Identity: 'file'
	},
	/** @ignore */
	$extend: Trex.Attachment,
	getFieldAttr: function(data) {
		return {
			name: 'tx_attach_file',
			value: [data.attachurl, data.filesize, data.filename].join('|')
		};
	},
	getBoxAttr: function(data) {
		var _nameMaxLength = 56;
		var _filename = data.filename;
		if(_filename.getRealLength() > _nameMaxLength) {
			var _nameArr = _filename.split(".");
			var _ext = _nameArr.pop();
			var _name = _nameArr.join(".").cutRealLength(_nameMaxLength - 2);
			_filename = _name + "." + _ext;
		}
		return {
			name: _filename + " (" + data.filesize.toByteUnit() + ")",
			image: data.thumburl
		};
	},
	getSaveHtml: function(data) {
		return "<a href=\"" + data.attachurl + "\"><img src=\"" + data.prevurl + "\"/> " + data.filename + "</a>";
	},
	getDispHtml: function(data) {
		return "<button id=\"" + data.dispElId + "\" class=\"txc-file _tx-unresizable\"><img src=\"" + data.prevurl + "\" ld=\"" + data.attachurl + "\"/> " + data.filename + "</button>";
	},
	getDispText: function(data) {
		return "[" + TXMSG("@file.title") + ":" + data.dataSeq + "]";
	},
	getRegLoad: function(data) {
		return new RegExp("<(?:a|A)\\s*href=\"?" + data.attachurl.getRegExp() + "[^\"]*\"?[^>]*><(?:img|IMG)[^>]*\/?>[\\S\\s]*?<\/(?:a|A)>", "gm");
	},
	getRegHtml: function(data) {
		return new RegExp("<(?:button|BUTTON)[^>]*id=\"?" + data.dispElId + "\"?[^>]*>[\\S\\s]*?" + data.attachurl.getRegExp() + "[\\S\\s]*?<\/(?:button|BUTTON)>", "gm");
	},
	getRegText: function(data) {
		return new RegExp("\\[" + TXMSG("@file.title") + ":" + data.dataSeq + "\\]", "gm");
	}
});




TrexConfig.addTool(
	"media",
	{
		wysiwygonly: true,
		sync: false,
		status: false
	}
);

TrexMessage.addMsg({
	'@media.title': "\uba40\ud2f0\ubbf8\ub514\uc5b4",
	'@media.prev.url': "#iconpath/spacer2.gif?rv=1.0.1",
	'@media.prev.url.tvpot': "#iconpath/img_multi_tvpot.gif?rv=1.0.1",
	'@media.prev.url.wmp': "#iconpath/spacer2.gif?rv=1.0.1"
});
	
Trex.Tool.Media = Trex.Class.create({
	$const: {
		__Identity: 'media'
	},
	$extend: Trex.Tool,
	oninitialized: function(config) {
		var _editor = this.editor;
		this.weave.bind(this)(
			new Trex.Button(this.buttonCfg), 
			null,
			function() {
				_editor.getSidebar().getEmbeder("media").execute();
			}
		);
	}
});

TrexConfig.addEmbeder(
	"media",
	{
		wysiwygonly: true,
		useCC: false,
		features: { left:250, top:65, width:440, height:258 },
		popPageUrl: "#host#path/pages/popup/multimedia.html"
	},
	function(root) {
		var _config = root.sidebar.embeder.media; 
		_config.popPageUrl = TrexConfig.getUrl(_config.popPageUrl);
		_config.features = TrexConfig.getPopFeatures(_config.features);
	}
);

(function() {

	Trex.Embeder.Media = Trex.Class.create({
		$const: {
			__Identity: 'media'
		},
		$extend: Trex.Embeder,
		name: 'media',
		title: TXMSG("@media.title"),
		canResized: true,
		getCreatedHtml: function(data, kind){
			var _source = data.code || makeSourceByUrl(data.url);
			return convertToHtml(_source);
		},
		getDataForEntry: function(data, kind){
			//This function is not needed anymore but absence may generate initializing error. So remained...
		}
	});
	
	Trex.register("filter > media ", function(editor, toolbar, sidebar, canvas, config){
	
		editor.getDocParser().registerFilter('filter/embeder/media', {
			'text@load': function(contents){
				return contents;
			},
			'source@load': function(contents){
				return convertToHtml(contents);
			},
			'html@load': function(contents){
				return convertToHtml(contents);
			},
			'text4save': function(contents){
				return contents;
			},
			'source4save': function(contents){
				return convertFromHtml(contents);
			},
			'html4save': function(contents){
				return convertFromHtml(contents);
			},
			'text2source': function(contents){
				return contents;
			},
			'text2html': function(contents){
				return contents;
			},
			'source2text': function(contents){
				return contents;
			},
			'source2html': function(contents){
				return convertToHtml(contents);
			},
			'html2text': function(contents){
				return convertFromHtml(contents);
			},
			'html2source': function(contents){
				return convertFromHtml(contents);
			}
		});
	});
	
	function convertFromHtml(content){
		var _matchs;
		var _regLoad = new RegExp("<(?:img|IMG)[^>]*txc-media[^>]*\/?>", "gim");
		var tempContent = content;
		
		while ((_matchs = _regLoad.exec(tempContent)) != null) {
			var _html = _matchs[0];
			var _source = getSourceByExt(_html);
			if (!$tx.msie && _source.indexOf("$") > -1) {
				_source = _source.replace(/\$/g, "$$$$");
			}
			content = content.replace(_html, _source);
		}
		
		return content;
	}
		
	function convertToHtml(content) {
		if ($tx.msie) { //FTDUEDTR-366 + FTDUEDTR-372 -> FTDUEDTR-403
			content = content.replace(/(<object[^>]*>)((?:\n|.)*?)(<\/object>)/gi, function(match, start, param, end) {
				param = param.replace(/<param[^>]*=[^\w]*wmode[^\w]+[^>]*>/i, "");
				param = param.replace(/<param[^>]*=[^\w]*play[^\w]+[^>]*>/i, "");
				param = '<param name="wmode" value="transparent" />'.concat(param);
				return start + param + end;
			});
			content = content.replace(/(<embed)([^>]*)(><\/embed>|\/>)/gi, function(match, start, attr, end) {
				attr = attr.replace(/\s+wmode=["']?(widnow|opaque|transparent)["']?/i, "").concat(' wmode="transparent"');
				return start + attr + end;
			});
			return content;
		} else {
			var _matchs;
			var tempContent = content;
			
			/* Substitue <embed tag within script to <xxembed */
			var _regScript = new RegExp("<(?:script)[^>]*>[\\S\\s]*?(<(?:embed|EMBED)[^>]*src=[^>]*>)[\\S\\s]*?<\/(?:script)>", "gim");
			while ((_matchs = _regScript.exec(tempContent)) != null) {
				var _source = _matchs[0];
				var _embed = _matchs[1];
				var _html = _source.replace(/<embed/i, "<xxembed");
				content = content.replace(_source, _html);
			}
			var _regLoad = new RegExp("<(?:object|OBJECT)[^>]*>[\\S\\s]*?(<(?:embed|EMBED)[^>]*src=[^>]*>)[\\S\\s]*?<\/(?:object|OBJECT)>", "gim");
			while ((_matchs = _regLoad.exec(tempContent)) != null) {
				var _source = _matchs[0];
				var _embed = _matchs[1];
				var _html = getHtmlByExt(_source, _embed);
				content = content.replace(_source, _html);
			}
			
			_regLoad = new RegExp("<(?:embed|EMBED)[^>]*src=[^>]*(?:\/?>|><\/(?:embed|EMBED)>)", "gim");
			while ((_matchs = _regLoad.exec(tempContent)) != null) {
				var _source = _matchs[0];
				var _embed = _matchs[0];
				var _html = getHtmlByExt(_source, _embed);
				content = content.replace(_source, _html);
			}
			
			content = content.replace(/<xxembed/i, "<embed");
			return content;
		}
	}
	
	function getHtmlByExt(source, embed) {
		var _attrs = Trex.Util.getAllAttributesFromEmbed(embed);
		var _url = _attrs['src'];
		var _width = (_attrs['width'] || " ").parsePx();
		var _height = (_attrs['height'] || " ").parsePx();
		if(isNaN(_width) || isNaN(_height)) {
			var _size = getDefaultSizeByUrl(_url);
			_width = _size.width;
			_height = _size.height;
		}
		
		/* make new embed source */
		var _newEmbedSrc = "<embed";
		for( var name in _attrs ){
			_newEmbedSrc += " " + name + "=\""+_attrs[name]+"\"";
		}
		_newEmbedSrc += ">";
		
		/* If source has 'object' then it is needed to add 'object' TAG */
		var arr = source.split(embed);
		source = arr[0] + _newEmbedSrc;
		for( var i = 1; i < arr.length; i++){
			source += arr[i];
		} 
		
		var _prev = getPreviewByUrl(_url);
		return "<img src=\"" + _prev.imageSrc + "\" width=\"" + _width + "\" height=\"" + _height + "\" border=\"0\" class=\"tx-entry-embed txc-media" + _prev.className + "\" ld=\"" + encodeURIComponent(source) + "\"/>";
	}
	
	function getSourceByExt(html) {
		var _attrs = Trex.Util.getAllAttributes(html);
		var _longdesc = _attrs['ld'];
		if(!_longdesc || _longdesc.length == 0) {
			return "";
		}
		var _width = _attrs['width'];
		var _height = _attrs['height'];
		var _source = decodeURIComponent(_longdesc);
		
		var _embed = _source;
		if(_source.indexOf("object") > -1 || _source.indexOf("OBJECT") > -1) {
			var _matchs;
			var _regLoad = new RegExp("<(?:embed|EMBED)[^>]*src=[^>]*(?:\/?>|><\/(?:embed|EMBED)>)", "gim");
			while ((_matchs = _regLoad.exec(_source)) != null) {
				_embed = _matchs[0];
			}
		}
		
		_attrs = Trex.Util.getAllAttributes(_embed);
		var _url = _attrs['src'];
		var _size = getDefaultSizeByUrl(_url);
		if(isNaN(_width)) {
			_source = Trex.String.changeAttribute(_source, "width", " width=\"" + _size.width + "\"");
		} else {
			_source = Trex.String.changeAttribute(_source, "width", " width=\"" + _width + "\"");
		}
		if(isNaN(_height)) {
			_source = Trex.String.changeAttribute(_source, "height", " height=\"" + _size.height + "\"");
		} else {
			_source = Trex.String.changeAttribute(_source, "height", " height=\"" + _height + "\"");
		}
		return _source;
	}
	
	function makeSourceByUrl(url) {
		var _ext = url.split(".").pop().split("?")[0].toLowerCase();
		var _size = getDefaultSizeByUrl(url);
		switch (_ext) {
			case "swf":
				return "<embed src=\"" + url + "\" quality='high' type='application/x-shockwave-flash' allowfullscreen='true' pluginspage='http://www.macromedia.com/go/getflashplayer' width='"+_size.width+"' height='"+_size.height+"'></embed>";
			case "mp3":
			case "wma":
			case "asf":
			case "asx":
			case "mpg":
			case "mpeg":
			case "wmv":
			case "avi":
				return "<embed src=\"" + url + "\" type=\"application/x-mplayer2\" pluginspage=\"http://www.microsoft.com/Windows/MediaPlayer/\" width='"+_size.width+"' height='"+_size.height+"'></embed>";
			case "mov":
				return "<embed src=\"" + url + "\" type=\"video/quicktime\" pluginspage=\"http://www.apple.com/quicktime/download/indext.html\" width='"+_size.width+"' height='"+_size.height+"'></embed>";
			case 'jpg':
			case 'bmp':
			case 'gif':
			case 'png':	
				return "<img src=\"" + url + "\" border=\"0\"/>";
			default:
				return "<embed src=\"" + url + "\" width='"+_size.width+"' height='"+_size.height+"'></embed>";
		}
	}
	
	function getDefaultSizeByUrl(url) {
		var _width, _height;
		if(url.indexOf("api.bloggernews.media.daum.net/static/recombox1") > -1) {
			_width = 400;
			_height = 80;
		} else if(url.indexOf("flvs.daum.net/flvPlayer") > -1) {
			_width = 502;
			_height = 399;
		} else {
			var _ext = url.split(".").pop().split("?")[0].toLowerCase();
			switch (_ext) {
				case "mp3":
				case "wma":
				case "asf":
				case "asx":
					_width = 280;
					_height = 45;
					break;
				case "mpg":
				case "mpeg":
				case "wmv":
				case "avi":
					_width = 320;
					_height = 285;
					break;
				default:
					_width = 400;
					_height = 300;
					break;
			}
		}
		return {
			width: _width,
			height: _height
		};
	}
	
	function getPreviewByUrl(url) {
		var _class = "";
		var _image = "";
		if(url.indexOf("api.bloggernews.media.daum.net/static/recombox1") > -1) {
			_class = "";
			_image = TXMSG("@media.prev.url");
		} else if(url.indexOf("flvs.daum.net/flvPlayer") > -1) {
			_class = " txc-media-tvpot";
			_image = TXMSG("@media.prev.url.tvpot");
		} else {
			var _ext = url.split(".").pop().split("?")[0].toLowerCase();
			switch (_ext) {
				case "mp3":
				case "wma":
				case "asf":
				case "asx":
					_class = " txc-media-wmp";
					_image = TXMSG("@media.prev.url.wmp");
					break;
				case "mpg":
				case "mpeg":
				case "wmv":
				case "avi":
					_class = " txc-media-wmp";
					_image = TXMSG("@media.prev.url.wmp");
					break;
				default:
					_class = "";
					_image = TXMSG("@media.prev.url");
					break;
			}
		}
		return {
			className: _class,
			imageSrc: _image
		};
	};
	
})();

TrexMessage.addMsg({
	'@canvas.unload.message': "\uc9c0\uae08\uae4c\uc9c0 \uc791\uc131\ub41c \uae00\uc740 \uc548\uc804\ud558\uac8c \uc790\ub3d9 \uc800\uc7a5\ub418\uc5b4, \ud68c\uc6d0\ub2d8\uc774 \ub2e4\uc2dc \uae00\uc4f0\uae30 \ud558\uc2e4 \ub54c \ubd88\ub7ec\uc62c \uc218 \uc788\uc2b5\ub2c8\ub2e4.",
	'@canvas.unload.message.at.modify': "\uc9c0\uae08\uae4c\uc9c0 \uc791\uc131\ub41c \uae00\uc740 \uc548\uc804\ud558\uac8c \uc790\ub3d9 \uc800\uc7a5\ub418\uc5b4, \ud68c\uc6d0\ub2d8\uc774 \ub2e4\uc2dc \uc218\uc815\ud558\uc2e4 \ub54c \ubd88\ub7ec\uc62c \uc218\uc788\uc2b5\ub2c8\ub2e4."
});

Trex.install("editor.isDisableUnloadHandler & editor.setDisableUnloadHandler",
	function(editor, toolbar, sidebar, canvas, config){
		var _beforeUnloadCheck = true;
		editor.isDisableUnloadHandler = function(unloadCheck) {
			return _beforeUnloadCheck;
		};
		editor.setDisableUnloadHandler = function() {
			_beforeUnloadCheck = false;
		};
	}
);
	
Trex.module("observing beforeunload event",
	function(editor, toolbar, sidebar, canvas, config) {
		var _evConfig = config.events;
		var _validator = new Trex.Validator();
		$tx.observe(window, 'beforeunload', function(ev) {
			canvas.fireJobs(Trex.Ev.__CANVAS_BEFORE_UNLOAD);
			if (editor.isDisableUnloadHandler()) {
				if (_evConfig.preventUnload) {
 				    //NOTE: exists content
					if (_validator.exists(canvas.getContent())) {
						ev.returnValue = TXMSG("@canvas.unload.message");
						return TXMSG("@canvas.unload.message");   // for safari
					}
				}
			}
		}, false);
	}
);
	/**
 * @fileoverview
 * \uc5d0\ub514\ud130\uc758 \uc774\ubbf8\uc9c0\ub97c \uc120\ud0dd\uc2dc \ud234\ubc14\uc758 align icon\uc744 \ubcc0\uacbd\uc2dc\ud0a4\ub294 module
 */

TrexMessage.addMsg({
	'@align.image.align.center': "\uac00\uc6b4\ub370\uc815\ub82c",
	'@align.image.align.full': "\uc624\ub978\ucabd\uae00\ud750\ub984",
	'@align.image.align.left': "\uc67c\ucabd\uc815\ub82c",
	'@align.image.align.right': "\uc67c\ucabd\uae00\ud750\ub984",
	'@align.text.align.center': "\uac00\uc6b4\ub370\uc815\ub82c (Ctrl+.)",
	'@align.text.align.full': "\uc591\ucabd\uc815\ub82c",
	'@align.text.align.left': "\uc67c\ucabd\uc815\ub82c (Ctrl+,)",
	'@align.text.align.right': "\uc624\ub978\ucabd\uc815\ub82c (Ctrl+/)"
});

Trex.module("Register an eventhandler in order to change align icons upon toolbar when user click a specific image or not.",
	function(editor, toolbar, sidebar, canvas, config){
		var _imageAlignModeClass = "tx-selected-image";
		var _alignset = [	
			toolbar.tools['alignleft'], toolbar.tools['aligncenter'], toolbar.tools['alignright'], toolbar.tools['alignfull']	
		];
		var _excludes = [
			"txc-2image-c", "txc-3image-c", "txc-footnote", "txc-jukebox", "txc-movie", "txc-gallery", "txc-imazing", "txc-map",
			"txc-file",'txc-emo',"tx-entry-embed"
		];
			
		var _changeButton = function(kind) {
			var _exec = function(tool, kind, title){
				var _elList = null;
				var _elIcon = null;	
				if(!_elList) {
					_elList = $tom.find(tool.button.elButton, "li");
				}
				if(!_elIcon) {
					_elIcon = $tx(tool.button.elIcon);
				}	
				_elIcon.title = title;
				if(kind == "image") {
					if(!$tx.hasClassName(_elList, _imageAlignModeClass)) {
						$tx.addClassName(_elList, _imageAlignModeClass);
					}
					tool.imageAlignMode = true;
				} else {
					if($tx.hasClassName(_elList, _imageAlignModeClass)) {
						$tx.removeClassName(_elList, _imageAlignModeClass);
					}
					tool.imageAlignMode = false;
				}
			};
			_exec(_alignset[0], kind, kind=="image" ? TXMSG("@align.image.align.left") : TXMSG("@align.text.align.left"));
			_exec(_alignset[1], kind, kind=="image" ? TXMSG("@align.image.align.center") : TXMSG("@align.text.align.center"));
			_exec(_alignset[2], kind, kind=="image" ? TXMSG("@align.image.align.right") : TXMSG("@align.text.align.right"));
			_exec(_alignset[3], kind, kind=="image" ? TXMSG("@align.image.align.full") : TXMSG("@align.text.align.full"));
		};
		
		canvas.observeElement([
			{ tag: "body" },
			{ tag: "table" },
			{ tag: "hr" }
		], function() {
			_changeButton("text");	
		});
		
		canvas.observeElement({ tag: "img" },  function(element) {
			var matched = Trex.Util.getMatchedClassName(element, _excludes);
			if(matched) {
				_changeButton("text");
			} else if($tom.find(element, 'button')) {
				_changeButton("text");
			} else {
				_changeButton("image");
			}
		});
	}
);


Trex.module("make padding area inside Canvas with editor width", 
	function(editor, toolbar, sidebar, canvas, config) {
	
		var _sizeConfig = canvas.getSizeConfig();
		var __EditorMaxWidth = _sizeConfig.wrapWidth;
		var __CanvasWidth = _sizeConfig.contentWidth;
		var __ContentPadding = _sizeConfig.contentPadding;
		if(__EditorMaxWidth == __CanvasWidth) {
			return;
		}
		
		var __CanvasTextColor = canvas.getStyleConfig().color;
		
		var __HolderHorPadding = (__CanvasWidth == 971)? 5:0;
		var __HolderVerPadding = 5;
		var __ScrollWidth = 16;
	
		var _elHolder;
		var _elPaddingLeft;
		var _elPaddingRight;
		
		var _wysiwygPanel;
		var _wysiwygDoc;
		var _elWysiwyg;
		
		//iframe \ud328\ub529\uacfc \ud328\ub529\uc601\uc5ed\uc758 \uc0ac\uc774\uc988\ub97c \uacc4\uc0b0\ud55c\ub2e4.
		var _calculateSize = function(padding) {
			var _paddingWidth = Math.max(Math.ceil((__EditorMaxWidth - __CanvasWidth - __HolderHorPadding * 2 - __ScrollWidth - 2) / 2), 0);
			var _paddingTop = __ContentPadding;
			
			var _paddingTop = __ContentPadding;
			var _paddingBottom = __ContentPadding;
			
			if (padding && padding.paddingTop > 0) {
				_paddingTop = padding.paddingTop;
			}
			if (padding && padding.paddingBottom > 0) {
				_paddingBottom = padding.paddingBottom;
			}
			return {
				panel: {
					paddingTop: (__HolderVerPadding + _paddingTop).toPx(),
					paddingRight: (_paddingWidth + __ContentPadding + __HolderHorPadding).toPx(),
					paddingBottom: (__HolderVerPadding + _paddingBottom).toPx(),
					paddingLeft: (_paddingWidth + __ContentPadding + __HolderHorPadding).toPx()
				},
				emptyspace: {
					width: _paddingWidth.toPx(),
					right: (_paddingWidth + __HolderHorPadding + __CanvasWidth).toPx()
				}
			};
		};
		
		var _hidePaddingSpace = function(){
			$tx.hide( _elLeftSpace );
			$tx.hide( _elRightSpace );
		}
		var _showPaddingSpace = function(){
			$tx.show( _elLeftSpace );
			$tx.show( _elRightSpace );
		}
		// iframe\uc774 \ub85c\ub529\ub418\uba74 \ud328\ub529\uc601\uc5ed\uc744 \ucd94\uac00\ud55c\ub2e4.
		canvas.observeJob(Trex.Ev.__IFRAME_LOAD_COMPLETE, function() {
			_elHolder = canvas.wysiwygEl;
			_wysiwygPanel = canvas.getPanel(Trex.Canvas.__WYSIWYG_MODE);
			if (!_wysiwygPanel) {
				return;
			}
			
			_wysiwygDoc = _wysiwygPanel.getDocument();
			_elWysiwyg = _wysiwygPanel.el;
			
			var _height = _wysiwygPanel.getPanelHeight();
			var _size = _calculateSize();
			
			_wysiwygPanel.addStyle(_size.panel);
			
			if (!$tx.msie) {
				$tx.setStyle(_elWysiwyg, {
					'overflowX': 'auto',
					'overflowY': 'scroll'
				});
			}
			
			_elLeftSpace = tx.div({ 
				'className': "tx-wysiwyg-padding", 
				'style': {
					'width': _size.emptyspace.width,
					'height': _height,
					'left': "0".toPx()
				}
			});
			
			_elLeftSpaceChild = tx.div({'className': "tx-wysiwyg-padding-divL",
				'style': {
					'borderRight': "1px solid " ,
					'borderBottom': "1px solid ",
					'borderColor': __CanvasTextColor
				}});
			_elLeftSpace.appendChild(_elLeftSpaceChild);
			_elHolder.insertBefore(_elLeftSpace, _elWysiwyg);
			
			_elRightSpace = tx.div({ 
				'className': "tx-wysiwyg-padding", 
				'style': {
					'width': _size.emptyspace.width,
					'height': _height,
					'left': _size.emptyspace.right
				}
			});
			
			_elRightSpaceChild = tx.div({ 'className': "tx-wysiwyg-padding-divR",
				'style': {
					'borderLeft': "1px solid " ,
					'borderBottom': "1px solid ",
					'borderColor': __CanvasTextColor
				}});
				
			_elRightSpace.appendChild(_elRightSpaceChild);
			_elHolder.insertBefore(_elRightSpace, _elWysiwyg);
			
			_wysiwygPanel.getScrollTop = function() { 
				return (_wysiwygDoc.documentElement.scrollTop || _wysiwygDoc.body.scrollTop);
			};
			
			_wysiwygPanel.setScrollTop = function(scrollTop) { 
				if(_wysiwygDoc.documentElement.scrollTop) {
					_wysiwygDoc.documentElement.scrollTop = scrollTop;
				} else {
					_wysiwygDoc.body.scrollTop = scrollTop;
				}
			};
			if ( canvas.mode != "html" ){
				_hidePaddingSpace();
			}
		});
		
		//\ubaa8\ub4dc\ub97c \ubcc0\uacbd\ud558\uc600\uc744 \uacbd\uc6b0 \ud328\ub529\uc601\uc5ed \ucc98\ub9ac 
		canvas.observeJob(Trex.Ev.__CANVAS_MODE_CHANGE, function(from, to) {
			if(from == to) return;
			if(from == Trex.Canvas.__WYSIWYG_MODE) {
				_hidePaddingSpace();
			} else if(to == Trex.Canvas.__WYSIWYG_MODE) {
				_showPaddingSpace();
			}
		});
		
		//\uc5d0\ub514\ud130 \ub192\uc774\uac00 \ubcc0\ud558\uc600\uc744 \uacbd\uc6b0 \ud328\ub529\uc601\uc5ed\uc758 \ub192\uc774\ub97c \uc870\uc808\ud55c\ub2e4.
		canvas.observeJob(Trex.Ev.__CANVAS_HEIGHT_CHANGE, function(height) {
			_elLeftSpace.style.height = height;
			_elRightSpace.style.height = height;
		});
		
		//\ubc30\uacbd\uc774 \uc801\uc6a9\ub418\uc5c8\uc744 \uacbd\uc6b0 \uc0ac\uc774\uc988\ub97c \ubcc0\uacbd\ud55c\ub2e4. 
		canvas.observeJob('canvas.apply.background', function(data) {
			var _padding = {
				paddingTop: 0,
				paddingBottom: 0
			};
			if(data.topLeftImage) { //\uc2a4\ud0a8
				_padding.paddingTop = data.topLeftHeight.parsePx();
				_padding.paddingBottom = data.botLeftHeight.parsePx();
			}
			var _size = _calculateSize(_padding);
			_wysiwygPanel.addStyle(_size.panel);
		});
		
		canvas.getCanvasGuideSize = function(){
			return _calculateSize().emptyspace.width.parsePx();
		};
	}
);


Trex.module("Register an eventhandler in order to block resizing and editing search results & some images in wysiwig panel.",
	function(editor, toolbar, sidebar, canvas, config) {
		
		if ($tx.msie) {
			var _blockResizeHandler = function(element) {
				if (element.onresizestart == null) {
					element.onresizestart = function() {
						return false;
					};
				}
			};
			canvas.observeElement({ tag: "img", klass: "_tx-unresizable" }, _blockResizeHandler);
			canvas.observeElement({ tag: "img", klass: "tx-entry-attach" }, _blockResizeHandler);
			canvas.observeElement({ tag: "img", klass: "txc-footnote" }, _blockResizeHandler);
			canvas.observeElement({ tag: "iframe", klass: "txc-map" }, _blockResizeHandler); 
		}
		
		var _blockSelectHandler;
		if ($tx.msie) {
			_blockSelectHandler = function(element) {
				element.setAttribute("unselectable", "on");
				$A(element.getElementsByTagName("*")).each(function(child) {
					if (child.nodeName.charAt(0) != "/") {
						child.setAttribute("unselectable", "on");
					}
				});
				var _processor = canvas.getProcessor();
				_processor.selectControl(element);
			};
		} else {
			_blockSelectHandler = function(element) {
				var _processor = canvas.getProcessor();
				_processor.selectControl(element);
				throw $stop;
			};
		}
		canvas.observeElement({ tag: "button" }, _blockSelectHandler);
		canvas.observeElement({ tag: "img" }, function(element) {
			var _button = $tom.find(element, 'button');
			if(_button) {
				_blockSelectHandler(_button);
				throw $stop;
			} 
		});
	}
);	

Trex.module("in order to save history for image resizing on IE",
	function(editor, toolbar, sidebar, canvas, config){
		var _history = canvas.history;
		var _tempHistoryContent = "";
		var _prevImageStatus = {};
		var _imageNode = null;
		 
		canvas.observeJob(Trex.Ev.__CANVAS_PANEL_MOUSEDOWN, function(ev){
			var node = $tx.element(ev);
			if ( node && node.tagName && node.tagName.toLowerCase() == "img" ){
				_imageNode = node;
				_prevImageStatus = $tom.getPosition(node);
			}
		});
	
		canvas.observeJob(Trex.Ev.__CANVAS_PANEL_MOUSEUP, function(ev) {
			if ( _imageNode ) {
				var isChanged = false;
				try {
					var _curImageStatus = $tom.getPosition(_imageNode);
					for(var _name in _curImageStatus ){
						if ( _curImageStatus[_name] != _prevImageStatus[_name] ){
							isChanged = true;
						}					
					}
					if ( isChanged ){
						_history.saveHistory();
					}
				} catch(e){
				} finally{
					_imageNode = null;	
				}
			}
		});
	}
);
(function(){
	var TdUtil = {
		getEventElement: function(ev){
			var el = $tx.findElement(ev, "td");
			if (el && el.tagName && el.tagName.toUpperCase() == "TD") {
				return el;
			} else {
				return null;
			}
		},
		getMaxCoord: function(el){
			var xCoords = this.getXCoords(el);
			var yCoords = this.getYCoords(el);
			return {
				x: xCoords[xCoords.length-1],
				y: yCoords[yCoords.length-1]
			}
		},
		getMinCoord: function(el){
			var xCoords = this.getXCoords(el);
			var yCoords = this.getYCoords(el);
			return {
				x: xCoords[0],
				y: yCoords[0]
			}
		},
		getYCoords: function(el){
			return this.getCoordsByKey(el, "row" );
		},
		getXCoords: function(el){
			return this.getCoordsByKey(el, "col" );
		},
		getCoordsByKey: function(el, keyword){
			var regExp = new RegExp( keyword+"(\\d+)", "gim");
			var resultArr = [];
			var klass = el.getAttribute( keyword + "Class" );
			klass.trim().replace( regExp, function(m, value){
				resultArr.push(value.toNumber());
			});
			return resultArr;
		},
		setSelect: function(element){
			$tx.setStyle(element, {
				backgroundImage: "url(http://icon.daum-img.net/editor/table_focus_50.png)"
			});
		},
		setUnselect: function(element){
			$tx.setStyle(element, {
				backgroundImage: ""
			});
		},
		clearContent: function(element){
			element.setAttribute("unselectable", "on");
			element.innerHTML = "-";
			//$tx.setStyle( element, {width: "auto"} );
		},
		clearCoords: function(element){
			element.setAttribute("colClass","");
			element.setAttribute("rowClass","");
		},
		setCoords: function(element, row, col){
			var rowSpan = row + 1;
			var rowCount = this.getRowSpan( element );
			var rowClass = "row ".times(rowCount).replace(/(row)/g, function(m, value){
				return value+(rowSpan++);
			});
			
			var colSpan= col + 1;
			var colCount = this.getColSpan( element );
			var colClass = "col ".times(colCount).replace(/(col)/g, function(m, value){
				return value+(colSpan++);
			});
			
			element.setAttribute("colClass", colClass);
			element.setAttribute("rowClass", rowClass);
		},
		getColSpan: function(element){
			return parseInt( element.getAttribute("colSpan") || 1 );
		},
		getRowSpan: function(element){
			return parseInt( element.getAttribute("rowSpan") || 1 );
		}
	}
	
	var Boundary = {
		start: {x:-1, y:-1},
		top: -1,
		left: -1,
		bottom: -1,
		right: -1,
		init: function(x,y){
			this.start.x = this.left = this.right =  x;
			this.start.y = this.top = this.bottom = y;
		},
		clear: function(){
			this.top = this.left = this.bottom = this.right = this.start.x = this.start.y= -1; 
		},
		changeBoundary: function(x,y){
			this.top = Math.min(this.start.y, y);
			this.bottom = Math.max(this.start.y, y);
			this.left = Math.min(this.start.x, x);
			this.right = Math.max(this.start.x, x);
		},
		getRectCoord: function(){
			return {
				sx: this.left,
				sy: this.top,
				ex: this.right,
				ey: this.bottom
			}
		}
	}
	
	var TableEditActionValidator = {
		canMerge: function(rectCoord, tdMatrix){
			for( var i = rectCoord.sy; i < rectCoord.ey + 1; i++ ){
				if ( TdUtil.getMinCoord(tdMatrix[i][rectCoord.sx]).x - 1 != rectCoord.sx ||	
					TdUtil.getMaxCoord(tdMatrix[i][rectCoord.ex]).x - 1 != rectCoord.ex ){
						return false;	
				}	
			}
			
			for( var i = rectCoord.sx; i < rectCoord.ex + 1; i++ ){
				if ( TdUtil.getMinCoord(tdMatrix[rectCoord.sy][i]).y - 1 != rectCoord.sy ||	
					TdUtil.getMaxCoord(tdMatrix[rectCoord.ey][i]).y - 1!= rectCoord.ey ){
						return false;	
				}	
			}
			
			return true;
		},	
		canSplit: function(rectCoord, tdMatrix){
			var topLeftCoord = TdUtil.getMinCoord( tdMatrix[rectCoord.sy][rectCoord.sx]);
			var bottomRightCoord = TdUtil.getMinCoord( tdMatrix[rectCoord.ey][rectCoord.ex]);
			
			return ( topLeftCoord.x == bottomRightCoord.x 
					&& topLeftCoord.y == bottomRightCoord.y 
					&& topLeftCoord.x > 0 
					&& topLeftCoord.y > 0);
		},
		isMergedCell: function(rectCoord, tdMatrix){
			var maxCoord= TdUtil.getMaxCoord( tdMatrix[rectCoord.sy][rectCoord.sx]);
			var minCoord= TdUtil.getMinCoord( tdMatrix[rectCoord.sy][rectCoord.sx]);
			
			if ( maxCoord.x != minCoord.x || maxCoord.y != minCoord.y ){
				return true;
			}else{
				return false;
			}
		},
		canRemoveRow:function(rectCoord, tdMatrix){
			var minRow = rectCoord.sy;
			var maxRow = rectCoord.ey;
			var colSize = tdMatrix[0].length;
			for( var i = 0; i < colSize; i++ ){
				if ( minRow != TdUtil.getMinCoord( tdMatrix[rectCoord.sy][i] ).y - 1){
					return false;
				}
				if ( maxRow != TdUtil.getMaxCoord( tdMatrix[rectCoord.ey][i] ).y - 1){
					return false;
				}
			}
			return true;
		},
		canRemoveCol: function(rectCoord, tdMatrix){
			var minCol = rectCoord.sx;
			var maxCol = rectCoord.ex;
			var rowSize = tdMatrix.length;
			for( var i = 0; i < rowSize; i++ ){
				if ( minCol != TdUtil.getMinCoord( tdMatrix[i][rectCoord.sx]).x - 1){
					return false;
				}
				if ( maxCol != TdUtil.getMaxCoord( tdMatrix[i][rectCoord.ex]).x - 1){
					return false;
				}
			}
			return true;
		},
		isAllRowSelected: function(rectCoord, tdMatrix){
			return ( tdMatrix.length <= rectCoord.ey - rectCoord.sy +1 )?true:false;
		},
		isAllColSelected: function(rectCoord, tdMatrix){
			return ( tdMatrix[0].length <= rectCoord.ex - rectCoord.sx +1 )?true:false;
		},
		canAddUpperRow: function( row, tdMatrix){
			for( var i = 0; i < tdMatrix[0].length; i++ ){
				if ( tdMatrix[row-1][i] == tdMatrix[row][i] ){
					return false;					
				}
			}
			return true;			
		},
		canAddBelowRow: function( row, tdMatrix){
			for( var i = 0; i < tdMatrix[0].length; i++ ){
				if ( tdMatrix[row+1][i] == tdMatrix[row][i] ){
					return false;					
				}
			}
			return true;
		},
		canAddLeftCol: function( col, tdMatrix){
			for( var i = 0; i < tdMatrix.length; i++ ){
				if ( tdMatrix[i][col-1] == tdMatrix[i][col] ){
					return false;					
				}
			}
			return true;
		},
		canAddRightCol: function( col, tdMatrix){
			for( var i = 0; i < tdMatrix.length; i++ ){
				if ( tdMatrix[i][col+1] == tdMatrix[i][col] ){
					return false;					
				}
			}
			return true;
		}
	}

Trex.MarkupTemplate.add("table.edit",
	'<div class="tx-table-edit">\
		<ul class="tx-tab tx-tab-menu1">\
			<li><a href="javascript:;">\ud45c\uad6c\uc131</a></li>\
			<li><a href="javascript:;">\ub514\uc790\uc778</a></li>\
			<li><a href="javascript:;">\uc11c\uc2dd</a></li>\
		</ul>\
		<div class="tx-table-edit-layout">\
		<div class="tx-table-edit-layout-wrapper">\
			<div class="tx-table-edit-layout-insert">\
				<h4>\uc0bd\uc785</h4>\
				<ul class="tx-2cell">\
					<li class="tx-left"><a href="javascript:;" class="tx-up" title="\uc704\uc5d0 \ucd94\uac00">\uc704</a></li>\
					<li class="tx-right"><a href="javascript:;" class="tx-down" title="\uc544\ub798\uc5d0 \ucd94\uac00">\uc544\ub798</a></li>\
				</ul>\
				<ul class="tx-2cell">\
					<li class="tx-left"><a href="javascript:;" class="tx-left" title="\uc67c\ucabd\uc5d0 \ucd94\uac00">\uc67c\ucabd</a></li>\
					<li class="tx-right"><a href="javascript:;" class="tx-right" title="\uc624\ub978\ucabd \ucd94\uac00">\uc624\ub978</a></li>\
				</ul>\
			</div>\
			<div class="tx-table-edit-layout-cell">\
				<h4>\uc0ad\uc81c</h4>\
				<ul class="tx-2cell">\
					<li class="tx-left"><a href="javascript:;" class="tx-col" title="\uc5f4\uc0ad\uc81c">\uc5f4</a></li>\
					<li class="tx-right"><a href="javascript:;" class="tx-row" title="\ud589\uc0ad\uc81c">\ud589</a></li>\
				</ul>\
				<h4 style="width:50px">\ubcd1\ud569/\ubd84\ud560</h4>\
				<ul class="tx-2cell">\
					<li class="tx-left"><a href="javascript:;" class="tx-merge" title="\ubcd1\ud569">\ud569</a></li>\
					<li class="tx-right"><a href="javascript:;" class="tx-split" title="\ubd84\ud560">\ubd84</a></li>\
				</ul>\
			</div>\
			<div class="tx-table-edit-layout-align">\
				<h4>\uc815\ub82c</h4>\
				<ul class="tx-3cell">\
					<li class="tx-left"><a href="javascript:;" class="tx-top" title="\uc0c1\ub2e8">\uc0c1</a></li>\
					<li class="tx-center"><a href="javascript:;" class="tx-middle" title="\uc911\ub2e8">\uc911</a></li>\
					<li class="tx-right"><a href="javascript:;" class="tx-bottom" title="\ud558\ub2e8">\ud558</a></li>\
				</ul>\
				<ul class="tx-3cell">\
					<li class="tx-left"><a href="javascript:;" class="tx-alignleft" title="\uc67c\ucabd \uc815\ub82c">\uc88c</a></li>\
					<li class="tx-center"><a href="javascript:;" class="tx-aligncenter" title="\uac00\uc6b4\ub370 \uc815\ub82c">\uc911</a></li>\
					<li class="tx-right"><a href="javascript:;" class="tx-alignright" title="\uc624\ub978\ucabd \uc815\ub82c">\uc6b0</a></li>\
				</ul>\
			</div>\
			</div>\
		</div>\
		<div class="tx-table-edit-design">\
		<div class="tx-table-edit-design-wrapper">\
			<dl>\
				<dt>\ud14c\ub450\ub9ac\uc120\ud0dd</dt>\
				<dd class="tx-table-edit-borderrange tx-btn-widget">\
					<a href="javascript:;" class="tx-icon">\ud14c\ub450\ub9ac</a>\
					<a href="javascript:;" class="tx-arrow">\ud14c\ub450\ub9ac</a>\
					<div class="tx-menu"></div>\
				</dd>\
				<dt>\uc120</dt>\
				<dd class="tx-table-edit-bordercolor tx-btn-widget-tbg">\
					<a href="javascript:;" class="tx-icon">\uc120\uc0c9</a>\
					<a href="javascript:;" class="tx-arrow">\uc120\uc0c9</a>\
					<div class="tx-colorpallete"></div>\
				</dd>\
				<dd class="tx-table-edit-borderwidth tx-btn-widget">\
					<a href="javascript:;" class="tx-icon">\uad75\uae30</a>\
					<a href="javascript:;" class="tx-arrow">\uad75\uae30</a>\
					<div class="tx-menu"></div>\
				</dd>\
				<dd class="tx-table-edit-borderstyle tx-btn-widget">\
					<a href="javascript:;" class="tx-icon">\uc2a4\ud0c0\uc77c</a>\
					<a href="javascript:;" class="tx-arrow">\uc2a4\ud0c0\uc77c</a>\
					<div class="tx-menu"></div>\
				</dd>\
				<dt>\ubc30\uacbd\uc0c9</dt>\
				<dd class="tx-table-edit-backcolor tx-btn-widget-brbg">\
					<a href="javascript:;" class="tx-icon">\ubc30\uacbd\uc0c9</a>\
					<a href="javascript:;" class="tx-arrow">\ubc30\uacbd\uc0c9</a>\
					<div class="tx-colorpallete" unselectable="on"></div>\
				</dd>\
			</dl>\
		</div>\
		</div>\
		<div class="tx-table-edit-template">\
		<div class="tx-table-edit-template-wrapper">\
			<ul>\
				<!--li class="tx-ex1"><a href="javascript:"></a></li-->\
			</ul>\
			<a href="javascript:;" class="tx-button-on">\ub354\ubcf4\uae30</a>\
			<ul class="tx-table-edit-template-all">\
				<!--li class="tx-ex1"><a href="javascript:"></a></li-->\
			</ul>\
		</div>\
		</div>\
		<div class="tx-table-edit-main">\
			<a href="javascript:;" class="tx-confirm">\ud655\uc778</a>\
			<a href="javascript:;" class="tx-cancel">\ucde8\uc18c</a>\
		</div>\
	</div>'
);

Trex.Menu.Table.TableEdit = Trex.Class.create({
	$const:{
		__OPTIONS:{
			WIDTH:[
				{label:"1pt", title:"1px", klass:"tx-1px", data:"1"},
				{label:"2pt", title:"2px", klass:"tx-2px", data:"2"},
				{label:"3pt", title:"3px", klass:"tx-3px", data:"3"},
				{label:"4pt", title:"4px", klass:"tx-4px", data:"4"},
				{label:"5pt", title:"5px", klass:"tx-5px", data:"5"},
				{label:"6pt", title:"6px", klass:"tx-6px", data:"6"},
				{label:"7pt", title:"7px", klass:"tx-7px", data:"7"}
			],
			RANGE:[
				{label:"\ubaa8\ub4e0 \ud14c\ub450\ub9ac", title:"\uc804\uccb4", klass:"tx-all", data:"all"},
				{label:"\ubc14\uae65 \ud14c\ub450\ub9ac", title:"\ubc14\uae65\ucabd", klass:"tx-out", data:"out"},
				{label:"\uc548\ucabd \ud14c\ub450\ub9ac", title:"\uc548\ucabd", klass:"tx-in", data:"in"},
				{label:"\uc704\ucabd \ud14c\ub450\ub9ac", title:"\uc704\ucabd", klass:"tx-top", data:"top"},
				{label:"\uc544\ub798\ucabd \ud14c\ub450\ub9ac", title:"\uc544\ub7ab\ucabd", klass:"tx-bottom", data:"bottom"},
				{label:"\uc67c\ucabd \ud14c\ub450\ub9ac", title:"\uc67c\ucabd", klass:"tx-left", data:"left"},
				{label:"\uc624\ub978\ucabd \ud14c\ub450\ub9ac", title:"\uc624\ub978\ucabd", klass:"tx-right", data:"right"}
			],
			STYLE:[
				{label:"\uc5c6\uc74c", title:"\uc5c6\uc74c", klass:"tx-none", data:"none"},
				{label:"\uc2e4\uc120", title:"\uc2e4\uc120", klass:"tx-solid", data:"solid"},
				{label:"\uad75\uc740\uc810\uc120", title:"\uad75\uc740\uc810\uc120", klass:"tx-dashed", data:"dashed"},
				{label:"\uc810\uc120", title:"\uc810\uc120", klass:"tx-dotted", data:"dotted"}
			]
		}
	},
	initialize: function(config){
		/* config = { 
		 * 	table: \ud3b8\uc9d1\ud560 \ud14c\uc774\ube14
		 * }
		 */
		if ( !config.table ){
			alert( "\ud3b8\uc9d1\ud560 \ud14c\uc774\ube14\uc744 \uc120\ud0dd\ud574\uc8fc\uc138\uc694." );
			return ;
		}
				
		var _config = this.config = $tx.extend({}, config );
		this.previewTable = new Trex.Menu.Table.TableEdit.PreviewTable(_config);
		this.realTable = new Trex.Menu.Table.TableEdit.TableEditor(_config);
		
		this.elContainer = this.elPreviewArea = null;
		this.createTableEditLayer();
		
		this.blackBox = config.editor.getBlackBox();
		this.blackBox.show( this.elContainer );
		this.eventBinding();
		this.showMenu(0);
		// TODO property \uc815\ub9ac
		this.borderRange = "all";
	},
	createTableEditLayer: function(){
		this.elPreviewArea = tx.div({className:"tx-preview"});
		this.elPreviewArea.appendChild( this.previewTable.getTable() );
		
		this.elContainer = tx.div({className:"tx-table-edit-container"});
		this.elContainer.appendChild( this.elPreviewArea );
		
		this.elMenu = Trex.MarkupTemplate.get("table.edit").evaluateAsDom({});
		this.elContainer.appendChild( this.elMenu );
	},
	_eventBindingTab: function(){
		var showMenu = this.showMenu = function(layerNumber){
			if ( isNaN(layerNumber) ){
				return;
			}
			for( var i = 0; i < menuBtns.length; i++ ){
				$tx.removeClassName( parentOfBtn, "tx-tab-menu"+(i+1));
				$tx.hide( menuLayers[i] );
			}
			$tx.addClassName( parentOfBtn, "tx-tab-menu"+(layerNumber+1));
			$tx.show( menuLayers[layerNumber] );
		}
		
		var parentOfBtn = $tom.collect( this.elMenu, "ul.tx-tab");	
		var menuBtns = $tom.collectAll( parentOfBtn, "li");
		var menuLayers = [
			$tom.collect( this.elContainer, "div.tx-table-edit-layout"), 
			$tom.collect( this.elContainer, "div.tx-table-edit-design"),
			$tom.collect( this.elContainer, "div.tx-table-edit-template")
		];
		
		var clickHandler = function(ev, menuIndex){
			showMenu(menuIndex);
			return false;
		}
		for( var i = 0; i < menuBtns.length; i++ ){
			$tx.observe( menuBtns[i], "click", clickHandler.bindAsEventListener(this, i) );
		}
	},
	_eventBindingLayoutMenu: function(){
		var self = this;
		var menus = $tom.collectAll( $tom.collect( this.elMenu, ".tx-table-edit-layout"), "a" );
		var menuset = [ "addRowUpper", "addRowBelow", 
						"addColLeft", "addColRight",   
						"removeCol", "removeRow", 
						"merge", "split",
						"changeTextValignTop", "changeTextValignMiddle", "changeTextValignBottom",
						"changeTextAlignLeft", "changeTextAlignCenter", "changeTextAlignRight"
					];
					
		var mouseOverHandler = function( ev ){
			var el = $tx.findElement(ev, "li");
			var parentEl = el.parentNode; 
			if (el){
				var position = $tx.classNames(el)[0].replace("tx","");
				var className = parentEl.className + position;
				parentEl.className = className;   
			}
		}
		var mouseOutHandler = function(ev){
			var el = $tx.findElement(ev, "ul");
			if (el){
				el.className = el.className.replace(/-right|-center|-left/,"");
			}
		}
		var clickHandler = function(ev, index){
			$tx.stop(ev);
			self[menuset[index]]();
			return false;
		}
		
		for( var i = 0; i < menus.length; i++ ){
			$tx.observe( menus[i], "click", clickHandler.bindAsEventListener(this, i));
			$tx.observe( menus[i], "mouseover", mouseOverHandler );
			$tx.observe( menus[i], "mouseout", mouseOutHandler );
		}
	},
	_eventBindingDesignMenu: function(){
		var self = this;
		var _elPart = $tom.collect(this.elMenu, "div.tx-table-edit-design");
		
		var _toolbar = this.config.editor.toolbar;
		var _elBackColorIcon = $tom.collect(_elPart, "dd.tx-table-edit-backcolor a.tx-icon");
		_toolbar.makeWidget(
			new Trex.Button.ColorWidget({
				status: true,
				el: $tom.collect(_elPart, "dd.tx-table-edit-backcolor")
			}),
			new Trex.Menu.ColorPallete({ 
				el: $tom.collect(this.elMenu, "dd.tx-table-edit-backcolor div.tx-colorpallete"),
				thumbs: Trex.__CONFIG_COMMON.thumbs 
			}),
			function(color){
				if ( !$tx.hasClassName( _elBackColorIcon, "tx-selected" ) ){
					$tx.addClassName( _elBackColorIcon, "tx-selected" );
				}
				self.changeCellStyle( "changeBackColor", color );
			}
		);
		
		var _elBorderRangeIcon = $tom.collect(_elPart, "dd.tx-table-edit-borderrange a.tx-icon") ;
		_toolbar.makeWidget(
			new Trex.Button.Widget({
				status: true,
				el: $tom.collect(_elPart, "dd.tx-table-edit-borderrange")
			}),
			new Trex.Menu.Select({
				el: $tom.collect(_elPart, "dd.tx-table-edit-borderrange div.tx-menu"),
				options: Trex.Menu.Table.TableEdit.__OPTIONS.RANGE
			}),
			function(value){
				$tx.removeClassName( _elBorderRangeIcon, _elBorderRangeIcon.previousClassName || "tx-range" );
				_elBorderRangeIcon.previousClassName = "tx-range-" + value;
				$tx.addClassName( _elBorderRangeIcon, "tx-range-" + value);
				self.setBorderRange(value);
			}
		);
		
		var _elBorderColorIcon =  $tom.collect(_elPart, "dd.tx-table-edit-bordercolor a.tx-icon");
		_toolbar.makeWidget(
			new Trex.Button.ColorWidget({
				status: true,
				el: $tom.collect(_elPart, "dd.tx-table-edit-bordercolor")
			}),
			new Trex.Menu.ColorPallete({ 
				el: $tom.collect(this.elMenu, "dd.tx-table-edit-bordercolor div.tx-colorpallete"),
				thumbs: Trex.__CONFIG_COMMON.thumbs 
			}),
			function(color){
				if ( !$tx.hasClassName( _elBorderColorIcon, "tx-selected" ) ){
					$tx.addClassName( _elBorderColorIcon, "tx-selected" );
				}
				self.changeCellStyle( "changeBorderColor", color );
			}
		);
		
		_toolbar.makeWidget(
			new Trex.Button.Widget({
				status: true,
				el: $tom.collect(_elPart, "dd.tx-table-edit-borderwidth")
			}),
			new Trex.Menu.Select({
				el: $tom.collect(_elPart, "dd.tx-table-edit-borderwidth div.tx-menu"),
				options: Trex.Menu.Table.TableEdit.__OPTIONS.WIDTH
			}), 
			function(value){
				var width = value.toPx();
				self.changeCellStyle( "changeBorderWidth", width );
			}
		);
		
		_toolbar.makeWidget(
			new Trex.Button.Widget({
				status: true,
				el: $tom.collect(_elPart, "dd.tx-table-edit-borderstyle")
			}),
			new Trex.Menu.Select({
				el: $tom.collect(_elPart, "dd.tx-table-edit-borderstyle div.tx-menu"),
				options: Trex.Menu.Table.TableEdit.__OPTIONS.STYLE
			}), 
			function(style){
				self.changeCellStyle( "changeBorderType", style );
			}
		);
	},
	_eventBidingTemplateMenu: function(){
		var ulList = $tom.collectAll( this.elMenu, "div.tx-table-edit-template ul");
		var elListSome = ulList[0];
		var elListAll = ulList[1];
		var templateList = (new Trex.Tool.Table.TemplateWizard()).getTemplateList();
		
		var self = this;
		
		var _makeTemplateList = function(list, parentEl, offset){
			for( var i = 0; i < list.length; i++){
				var elLi = tx.li({className:"tx-"+list[i].klass});
				var elA = tx.a({href:"javascript:;"});
				var elSpan = tx.span(" ");
				$tx.observe(elA, "click", function(index){
					return function(){ self.applyTemplateStyle(index); return false; }
				}(i+offset));
				elA.appendChild( elSpan );
				elLi.appendChild(elA);
				parentEl.appendChild(elLi);
			}
		}
		
		_makeTemplateList(templateList.slice(10), elListAll, 10);
		_makeTemplateList(templateList.slice(1,10), elListSome, 1);
		
		var elDownBtn = $tom.collect( this.elMenu, "a.tx-button-on" );
		$tx.observe( elDownBtn, "click", function(){
			elDownBtn.className = $tx.hasClassName(elDownBtn, "tx-button")?"tx-button-on":"tx-button";''
			$tx.toggle( elListAll );
			return false;
		});	
	},
	_eventBindingMainMenu: function(){
		var self = this;
		
		var elMainMenu = $tom.collect( this.elContainer, "div.tx-table-edit-main" );
		var elBtnConfirm = $tom.collect( elMainMenu, "a.tx-confirm");
		$tx.observe(elBtnConfirm, "click", function(){self.done(); return false;});
		var elBtnCancel = $tom.collect( elMainMenu, "a.tx-cancel");
		$tx.observe(elBtnCancel, "click", function(){self.cancel();return false;});
	},
	eventBinding: function(){
		this._eventBindingTab();
		this._eventBidingTemplateMenu()
		this._eventBindingLayoutMenu();
		this._eventBindingDesignMenu();
		this._eventBindingMainMenu();
	},
	getContainer: function(){
		return this.elContainer;
	},
	_executeLayoutCommand: function( command, optionValue ){
		//TODO error code \ub97c \uac80\uc0ac\ud574\uc11c error\uba54\uc138\uc9c0\ub97c \ubfcc\ub824\uc8fc\ub294 \uac78\ub85c \ubc14\uafb8\uc790.
		this.previewTable.clearSelection();
		
		this.previewTable[command](optionValue);	
		this.previewTable.refreshCoord();
		this.realTable[command](optionValue);
		this.previewTable.clearBoundary();
	},
	addRowUpper: function(){
		var row = this.previewTable.getSelectedRectCoord().sy;
		if ( row < 0 ){
			alert('\ucd94\uac00\ub420 \ud589\uc744 \uc120\ud0dd\ud574\uc8fc\uc138\uc694.');
			return ;
		}
		
		if ( row != 0 && !TableEditActionValidator.canAddUpperRow(row, this.previewTable.getTdMatrix())) {
			alert('\uc88c\uc6b0\uce21\uc5d0 \ud569\uccd0\uc9c4 \ud589\uc774 \uc788\uc5b4\uc11c \ud589\uc744 \ucd94\uac00\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4.');
			return;
		}
		this._executeLayoutCommand("addRowUpper", row);
	},
	addRowBelow: function(){
		var row = this.previewTable.getSelectedRectCoord().ey;
		if ( row < 0 ){
			alert('\ucd94\uac00\ub420 \ud589\uc744 \uc120\ud0dd\ud574\uc8fc\uc138\uc694.');
			return ;
		}
		if ( this.previewTable.getTdMatrix().length-1 != row
			&& !TableEditActionValidator.canAddBelowRow(row, this.previewTable.getTdMatrix())) {
			alert('\uc88c\uc6b0\uce21\uc5d0 \ud569\uccd0\uc9c4 \ud589\uc774 \uc788\uc5b4\uc11c \ud589\uc744 \ucd94\uac00\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4.');
			return;
		}
		this._executeLayoutCommand("addRowBelow", row);
	},
	addColLeft: function(){
		var col = this.previewTable.getSelectedRectCoord().sx;
		if ( col < 0 ){
			alert('\ucd94\uac00\ub420 \uc5f4\uc744 \uc120\ud0dd\ud574\uc8fc\uc138\uc694.');
			return ;
		}
		if ( 0 != col && !TableEditActionValidator.canAddLeftCol(col, this.previewTable.getTdMatrix())) {
			alert('\uc704\uc544\ub798\uc5d0 \ud569\uccd0\uc9c4 \uc5f4\uc774 \uc788\uc5b4\uc11c \uc5f4\uc744 \ucd94\uac00\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4.');
			return;
		}
		
		this._executeLayoutCommand("addColLeft", col);
	},
	addColRight: function(){
		var col = this.previewTable.getSelectedRectCoord().ex;
		if ( col < 0 ){
			alert('\ucd94\uac00\ub420 \uc5f4\uc744 \uc120\ud0dd\ud574\uc8fc\uc138\uc694.');
			return ;
		}
		if ( this.previewTable.getTdMatrix()[0].length-1 != col
			&& !TableEditActionValidator.canAddRightCol(col, this.previewTable.getTdMatrix())) {
			alert('\uc704\uc544\ub798\uc5d0 \ud569\uccd0\uc9c4 \uc5f4\uc774 \uc788\uc5b4\uc11c \uc5f4\uc744 \ucd94\uac00\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4.');
			return;
		}
		
		this._executeLayoutCommand("addColRight", col);
	},
	removeRow: function(){
		var rectCoord = this.previewTable.getSelectedRectCoord();
		var startRow = rectCoord.sy;
		var endRow = rectCoord.ey;
				
		if ( startRow < 0 ){
			alert('\uc0ad\uc81c\ud560 \ud589\uc744 \uc120\ud0dd\ud574\uc8fc\uc138\uc694.');
			return ;
		}
		if ( !TableEditActionValidator.canRemoveRow(rectCoord, this.previewTable.getTdMatrix())){
			alert( '\uc0ad\uc81c\ud560 \uc218 \uc5c6\ub294 \ud589\uc774 \ud3ec\ud568\ub418\uc5b4 \uc788\uc2b5\ub2c8\ub2e4.' );
			return;
		}
		if ( TableEditActionValidator.isAllRowSelected(rectCoord, this.previewTable.getTdMatrix()) ){
			alert( '\ubaa8\ub4e0 \ud589\uc744 \uc0ad\uc81c\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4.' );
			return ;
		}
		
		this.previewTable.clearSelection();
		for( var i = startRow; i <= endRow; i++ ){
			this.previewTable.removeRow(startRow);	
			this.realTable.removeRow(startRow);
		}
		this.previewTable.refreshCoord();
		this.previewTable.clearBoundary();
	},
	removeCol: function(){
		var rectCoord = this.previewTable.getSelectedRectCoord();
		var startCol = rectCoord.sx;
		var endCol = rectCoord.ex;
		
		if ( startCol < 0 ){
			alert('\uc0ad\uc81c\ud560 \uc5f4\uc744 \uc120\ud0dd\ud574\uc8fc\uc138\uc694.');
			return ;
		}
		if ( !TableEditActionValidator.canRemoveCol(rectCoord, this.previewTable.getTdMatrix())){
			alert( '\uc0ad\uc81c\ud560 \uc218 \uc5c6\ub294 \uc5f4\uc774 \ud3ec\ud568\ub418\uc5b4 \uc788\uc2b5\ub2c8\ub2e4.' );
			return;
		}
		if ( TableEditActionValidator.isAllColSelected(rectCoord, this.previewTable.getTdMatrix()) ){
			alert( '\ubaa8\ub4e0 \uc5f4\uc744 \uc0ad\uc81c\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4.' );
			return;
		}
		
		for( var i = startCol; i <= endCol; i++ ){
			this._executeLayoutCommand( "removeCol", startCol );
		}
	},
	merge: function(){
		var rectCoord = this.previewTable.getSelectedRectCoord();
		if( rectCoord.sx < 0 || rectCoord.sy < 0 ){
			alert( '\ud569\uce60 \uce78\ub4e4\uc744 \uc120\ud0dd\ud574\uc8fc\uc138\uc694.' ); 
			return false;
		}
		if ( this.previewTable.getTdMatrix()[rectCoord.sy][rectCoord.sx] == this.previewTable.getTdMatrix()[rectCoord.ey][rectCoord.ex]){
			alert('\ud569\uce60\uce78\uc744 \ub450\uce78\uc774\uc0c1 \uc120\ud0dd\ud574\uc8fc\uc138\uc694.');
			return false;
		}
		if ( !TableEditActionValidator.canMerge(rectCoord, this.previewTable.getTdMatrix()) ){
			alert('\ud569\uce58\uae30\ub97c \uc218\ud589\ud560 \uc218 \uc5c6\ub294 \uc120\ud0dd\uc601\uc5ed\uc785\ub2c8\ub2e4.');
			return false;
		}
		
		this.previewTable.clearSelection();
		
		this.previewTable.merge(rectCoord);
		this.previewTable.refreshCoord();	
		this.realTable.merge(rectCoord);
		
		this.previewTable.clearBoundary();
	},
	split: function(){
		var rectCoord = this.previewTable.getSelectedRectCoord();
		
		if( rectCoord.sx < 0 || rectCoord.sy < 0 ){
			alert( '\ub098\ub20c \uce78\uc744 \uc120\ud0dd\ud574\uc8fc\uc138\uc694.' ); 
			return false;
		}
		if ( !TableEditActionValidator.canSplit(rectCoord, this.previewTable.getTdMatrix()) ){
			alert('\ub098\ub204\uc5b4\uc9c8 \uce78\uc744 \ud55c\uce78\ub9cc \uc120\ud0dd\ud574\uc8fc\uc138\uc694.')
			return false;
		}
		if (!TableEditActionValidator.isMergedCell(rectCoord, this.previewTable.getTdMatrix())) {
			alert('\ub354\uc774\uc0c1 \ub098\ub20c \uc218 \uc5c6\ub294 \uce78\uc785\ub2c8\ub2e4. \ub450\uce78\uc774\uc0c1 \ud569\uccd0\uc9c4 \uce78\uc744 \uc120\ud0dd\ud574\uc8fc\uc138\uc694.');
			return false;
		}
		this.previewTable.clearSelection();
		
		this.previewTable.split(rectCoord);
		this.previewTable.refreshCoord();	
		this.realTable.split(rectCoord);
		
		this.previewTable.clearBoundary();
	},
	changeCellStyle: function( command, value ){
		var rectCoord = this.previewTable.getSelectedRectCoord();
		
		this.previewTable[command](rectCoord, value, this.borderRange);
		this.realTable[command](rectCoord, value, this.borderRange);
	},
	_changeTextAlign:function(align){
		var rectCoord = this.previewTable.getSelectedRectCoord();
		
		this.previewTable.changeTextAlign(rectCoord, align);
		this.realTable.changeTextAlign(rectCoord, align);
	},
	changeTextAlignLeft: function(){
		this._changeTextAlign("left");
	},
	changeTextAlignCenter: function(){
		this._changeTextAlign("center");
	},
	changeTextAlignRight: function(){
		this._changeTextAlign("right");
	},
	_changeTextValign:function(align){
		var rectCoord = this.previewTable.getSelectedRectCoord();
		
		this.previewTable.changeTextValign(rectCoord, align);
		this.realTable.changeTextValign(rectCoord, align);
	},
	changeTextValignTop: function(){
		this._changeTextValign("top");
	},
	changeTextValignMiddle: function(){
		this._changeTextValign("middle");
	},
	changeTextValignBottom: function(){
		this._changeTextValign("bottom");
	},
	applyTemplateStyle: function(styleIndex){
		if ( isNaN(styleIndex) ){
			return ;
		}
		
		this.previewTable.applyTemplateStyle(styleIndex);
		this.realTable.applyTemplateStyle(styleIndex);
	},
	setBorderRange: function(value){
		this.borderRange = value;
	},
	cancel:function(){
		this.blackBox.hide();
	},
	done: function(){
		$tom.insertAt(this.realTable.getTable(), this.config.table);
		$tom.remove(this.config.table);
		this.blackBox.hide();
	}
});
Trex.Menu.Table.TableEdit.TableEditor = Trex.Class.create({
	$const: {
		BORDER_STYLE:"1px solid #000"
	},
	initialize: function(config){
		this.elTable = this.createTable( config.table );
		this.initTdMatrix();
		this.tableConfig = {};
				
		var canvas = config.editor.getCanvas();
		this.doc = canvas.getCurrentPanel().getDocument();
	},
	initTdMatrix: function(){
		var tableMatrixer = new Trex.Tool.Table.TableCellMatrixer(this.elTable);
		this.tdMatrix = tableMatrixer.getTdMatrix();
		this.rowSize = tableMatrixer.getRowSize();
		this.colSize = tableMatrixer.getColSize();		
	},
	createTable: function(table){
		return table.cloneNode(true);
	},
	setTdBorderStyle: function(elTd, isTop, isLeft ){
		var borderStyle = Trex.Menu.Table.TableEdit.TableEditor.BORDER_STYLE;
		$tx.setStyle( elTd, {
			borderRight: borderStyle,
			borderBottom: borderStyle,
			borderTop:(isTop)?borderStyle:"",
			borderLeft:(isLeft)?borderStyle:""
		});
	},
	createTd: function(properties){
		var td = this.doc.createElement("td");
		td.innerHTML = "&nbsp;";
		for( var name in properties ){
			td.setAttribute(name, properties[name] );
		}

		return td;
	},
	createTr: function(){
		var tr = this.doc.createElement("tr");
		
		for( var i = 0; i< this.colSize; i++){
			var td = this.createTd({});
			this.setTdBorderStyle(td, false, (i==0));
			tr.appendChild( td );
		}
		return tr;
	},
	addRowUpper: function(index){
		this._addRow(index);
		if ( index == 0 ){
			for( var i = 0; i < this.colSize; i++ ){
				$tx.setStyle(this.tdMatrix[0][i], {borderTop: "1px solid #000" } );
				$tx.setStyle(this.tdMatrix[1][i], {borderTop: "none" } );
			}
		}
	},
	addRowBelow: function(index){
		this._addRow( index, true);
	},
	_addRow: function(index, isBelow){
		var trArr = dGetties(this.elTable, "tr");
		var indexTr = trArr[index]; 
//		var indexTr = this.tdMatrix[index][0].parentNode;
		var newTr = this.createTr();
		$tom[(isBelow)?'insertNext':'insertAt'](newTr, indexTr);
					
		if ( isBelow ){
			index++;
		}

		this.tdMatrix.splice(index, 0, $tom.collectAll(newTr, "td"));
		this.rowSize++;
	},
	addColLeft: function(index){
		this._addCol(index);
		if ( index == 0 ){
			for( var i = 0; i < this.rowSize; i++){
				$tx.setStyle(this.tdMatrix[i][1], {borderLeft: "none" } );
			}
		}
	},
	addColRight: function(index){
		this._addCol(index, true);
	},
	_resizeAllCellWidth: function(){
		var width = $tx.getStyle(this.elTable, "width") || this.elTable.getAttribute("width") || 389;
		width = parseInt(width);
		if ( !width ){
			return;
		}
		
		var oneCellWidth = Math.round( width / this.colSize, 0);
		for (var i = 0; i < this.rowSize; i++) {
			for (var j = 0; j < this.colSize; j++) {
				$tx.setStyle(this.tdMatrix[i][j], {
					width: ( oneCellWidth * TdUtil.getColSpan(this.tdMatrix[i][j])).toPx()
				});
			}
		}
	},
	_addCol: function(index, isRight){
		var usedStack = [];
		var indexTd = null;
		
		var _getIndexTd = function(row, colIndex, tdMatrix, isRight){
			var index = colIndex;
			while ( tdMatrix[row][index] && usedStack.include(tdMatrix[row][index]) ){
				index += (isRight)?-1:1;
			}
			usedStack.push( tdMatrix[row][index] );
			return tdMatrix[row][index];
		}
		
		for( var i = 0; i < this.rowSize; i++){
			indexTd = _getIndexTd( i, index, this.tdMatrix, isRight );
			
			var newTd = this.createTd({});
			this.setTdBorderStyle( newTd, i==0, index==0 );
			$tom[(!isRight)?'insertAt':'insertNext'](newTd, indexTd);
			
			this.tdMatrix[i].splice(isRight?index+1:index, 0, newTd);
		}
		this.colSize++;		
		this._resizeAllCellWidth();
	},
	removeRow: function(index){
		var tr = this.tdMatrix[index][0].parentNode;
		$tom.remove( tr );
		this.tdMatrix.splice(index,1);
		this.rowSize--;
		
		if (index == 0) {
			for (var i = 0; i < this.colSize; i++) {
				this.setTdBorderStyle(this.tdMatrix[0][i], index == 0, i == 0);
			}
		}
	},
	removeCol: function(index){
		for( var i = 0; i < this.rowSize; i++){
			$tom.remove(this.tdMatrix[i][index]);
			this.tdMatrix[i].splice(index,1);
		}
		this.colSize--;
		
		for( var i = 0; i< this.rowSize; i++){
			if (this.tdMatrix[i][index]) {
				this.setTdBorderStyle(this.tdMatrix[i][index], i == 0, index == 0);
			}
		}
	},
	merge: function(rectCoord){
		var totalColSpan = 0;
		for( var i  = rectCoord.sx; i <= rectCoord.ex; i){
			var colSpan = TdUtil.getColSpan( this.tdMatrix[rectCoord.sy][i] );
			totalColSpan += colSpan;
			i += colSpan;
		}
		
		var totalRowSpan = 0;
		for( var i  = rectCoord.sy; i <= rectCoord.ey; i){
			var rowSpan = TdUtil.getRowSpan( this.tdMatrix[i][rectCoord.sx] );
			totalRowSpan += rowSpan;
			i += rowSpan;
		}
		var mergeTd = this.createTd( {
			"rowSpan": totalRowSpan,
			"colSpan": totalColSpan
		});
		
		/* TODO \uc774\ud558\uc758 \ucf54\ub4dc\uc640 \uc704\uc758 \ucf54\ub4dc \ubd84\ub9ac\ud560 \uc218 \uc788\uaca0\ub2e4. */
		
		var _isAliveTd= function(td){
			return ( td.parentNode && td.parentNode.nodeType != '11' );
		}
		
		this.setTdBorderStyle( mergeTd, rectCoord.sy==0, rectCoord.sx==0 );
		var indexTd = this.tdMatrix[rectCoord.sy][rectCoord.sx];
		
		$tom.insertAt( mergeTd, indexTd );
		var contents = "";
		for (var i = rectCoord.sy; i <= rectCoord.ey; i++) {
			var colContents = "";
			for (var j = rectCoord.sx; j <= rectCoord.ex; j++) {
				if ( _isAliveTd(this.tdMatrix[i][j]) ){
					$tom.remove( this.tdMatrix[i][j] );
					colContents += this.tdMatrix[i][j].innerHTML + "";
				}
				this.tdMatrix[i][j] = mergeTd;
			}
			contents += colContents + "";
		}
		mergeTd.innerHTML = contents;
		
		this._resizeAllCellWidth();
	},
	split: function(rectCoord){
		var _self = this;
		var _findIndexTd = function(row, col){
			if ( !_self.tdMatrix[row][col-1] ){
				return null;
			}else if ( TdUtil.getRowSpan( _self.tdMatrix[row][col-1] ) > 1){
				return _findIndexTd(row, col-1);
			}else {
				return _self.tdMatrix[row][col-1];
			}
		}
		
		var yIndex = rectCoord.sy;
		var xIndex = rectCoord.sx;
		var el = this.tdMatrix[yIndex][xIndex];
		var content = el.innerHTML;
		var rowSpan = TdUtil.getRowSpan( el );
		var colSpan = TdUtil.getColSpan( el );
		var trArr = $tom.collectAll( this.elTable, "tr" );
		for( var i = yIndex; i < yIndex + rowSpan; i++  ){
			for ( var j = xIndex; j < xIndex + colSpan; j++ ) {
				var td = this.createTd({});
				this.setTdBorderStyle(td, i==0, j==0);
				var indexTd = _findIndexTd(i, j);
				if ( indexTd ){
					$tom.insertNext(td, indexTd);
				}else{
					$tom.insertFirst( trArr[i], td );
				}
				this.tdMatrix[i][j] = td;
			}
		}
		this.tdMatrix[yIndex][xIndex].innerHTML = content;
		$tom.remove(el);
		this._resizeAllCellWidth();
	},
	_changeTopBorderStyle: function(rectCoord, styleType, value){
		var style = {};
		
		var isTopCell = (rectCoord.sy == 0);
		style[( rectCoord.sy == 0) ? "borderTop"+styleType:"borderBottom"+styleType] = value;
		var yIndex = (rectCoord.sy == 0)?0:rectCoord.sy-1;
		
		for (var i = rectCoord.sx; i <= rectCoord.ex; i++) {
			$tx.setStyle(this.tdMatrix[yIndex][i], style);
		}
	},
	_changeBottomBorderStyle: function(rectCoord, styleType, value){
		var style = {};
		
		style["borderBottom"+styleType] = value;
		var yIndex = rectCoord.ey;
		
		for (var i = rectCoord.sx; i <= rectCoord.ex; i++) {
			$tx.setStyle(this.tdMatrix[yIndex][i], style);
		}
	},
	_changeLeftBorderStyle: function(rectCoord, styleType, value){
		var style = {};
		
		var isLeftmostCell = (rectCoord.sx == 0);
		style[( rectCoord.sx == 0) ? "borderLeft"+styleType:"borderRight"+styleType] = value;
		var xIndex = (rectCoord.sx== 0)?0:rectCoord.sx-1;
		
		for (var i = rectCoord.sy; i <= rectCoord.ey; i++) {
			$tx.setStyle(this.tdMatrix[i][xIndex], style);
		}
	},
	_changeRightBorderStyle: function(rectCoord, styleType, value){
		var style = {};
		
		style["borderRight"+styleType] = value;
		var xIndex = rectCoord.ex;
		
		for (var i = rectCoord.sy; i <= rectCoord.ey; i++) {
			$tx.setStyle(this.tdMatrix[i][xIndex], style);
		}
	},
	_changeInBorderStyle: function(rectCoord, styleType, value){
		var style = {};
		
		for( var i = rectCoord.sy; i <= rectCoord.ey; i++ ){
			for (var j = rectCoord.sx; j <= rectCoord.ex; j++) {
				style = {};
				if ( i != rectCoord.ey ){
					style["borderBottom"+styleType] = value;	
				}
				if ( j != rectCoord.ex ){
					style["borderRight"+styleType] = value;	
				}
				$tx.setStyle(this.tdMatrix[i][j], style);
			}
		}
	},
	_changeOutBorderStyle: function(rectCoord, styleType, value){
		this._changeTopBorderStyle( rectCoord, styleType, value );
		this._changeBottomBorderStyle( rectCoord, styleType, value );
		this._changeLeftBorderStyle( rectCoord, styleType, value );
		this._changeRightBorderStyle( rectCoord, styleType, value );
	},
	_changeBorderStyle: function( coord, styleType, value, borderRange ){
		var rectCoord = this._getValidRectCoord( coord );
		this._removeTableBorderProperty();
		this._removeTableSpacingProperty();
		switch(borderRange){
			case "top":
				this._changeTopBorderStyle( rectCoord, styleType, value );
				break;
			case "bottom":
				this._changeBottomBorderStyle( rectCoord, styleType, value );
				break;
			case "left":
				this._changeLeftBorderStyle( rectCoord, styleType, value );
				break;
			case "right": 
				this._changeRightBorderStyle( rectCoord, styleType, value );
				break;
			case "in": 
				this._changeInBorderStyle( rectCoord, styleType, value );
				break;
			case "out":
				this._changeOutBorderStyle( rectCoord, styleType, value ); 
				break;
			case "all":
				this._changeInBorderStyle( rectCoord, styleType, value );
				this._changeOutBorderStyle( rectCoord, styleType, value );
				break; 
			default:
				break;
		}
	},
	_getValidRectCoord: function(rectCoord){
		return { 
			sy: (rectCoord.sy < 0)?0:rectCoord.sy, 
			ex: (rectCoord.ex < 0)?this.colSize-1:rectCoord.ex, 
			ey: (rectCoord.ey < 0)?this.rowSize-1:rectCoord.ey, 
			sx: (rectCoord.sx < 0)?0:rectCoord.sx 
		} 
	},
	_removeTableBorderProperty: function(){
		var border = parseInt( this.elTable.getAttribute("border") );
		if ( border > 0 ){
			this.elTable.setAttribute("border","0");
			var templateWizard = new Trex.Tool.Table.TemplateWizard();
			templateWizard.applyStyle( this.elTable, 0 );
		}
	},
	_removeTableSpacingProperty: function(){
		this.elTable.setAttribute("cellSpacing","0");
	},
	changeBorderColor: function(rectCoord, value, range){
		this._changeBorderStyle(rectCoord, "Color", value, range );
	},
	changeBorderType: function(rectCoord, value, range){
		this._changeBorderStyle( rectCoord, "Style", value, range );
	},
	changeBorderWidth: function(rectCoord, value, range){
		var width = value.toPx();
		this._changeBorderStyle( rectCoord, "Width", width, range ); 
	},
	_changeCellStyle: function(rectCoord, name, value ){
		var coord = this._getValidRectCoord( rectCoord );
		var style = {};
		style[name] = value;
		
		for( var i = coord.sy; i <= coord.ey; i++ ){
			for( var j = coord.sx; j <= coord.ex; j++ ){
				$tx.setStyle(this.tdMatrix[i][j], style);
			}
		}
	},
	changeBackColor: function(rectCoord, colorValue){
		this._changeCellStyle(rectCoord, "backgroundColor", colorValue );
	},
	changeTextAlign: function(rectCoord, alignType){
		this._changeCellStyle(rectCoord, "textAlign", alignType );
	},
	changeTextValign: function(rectCoord, alignType){
		this._changeCellStyle(rectCoord, "verticalAlign", alignType );
	},
	applyTemplateStyle: function(templateIndex){
		this._removeTableBorderProperty();
		this._removeTableSpacingProperty();
		var templateWizard = new Trex.Tool.Table.TemplateWizard();
		templateWizard.applyStyle( this.elTable, templateIndex );
	},
	getTdMatrix: function(){
		return this.tdMatrix;
	},
	getTable: function(){
		return this.elTable;
	}
});

Trex.Menu.Table.TableEdit.PreviewTable = Trex.Class.create({
	$extend: Trex.Menu.Table.TableEdit.TableEditor,
	initialize: function(config){
		var time = new Date().getTime();
		this.$super.initialize(config);
		this.tableConfig = {}

		this.boundary = Boundary;
		this.boundary.clear();
		this.refreshCoord();

		this.clearTable();
		this.eventBinding();
	},
	createTd: function(properties){
		var td = tx.td(properties, "+");
		
		return td;
	},
	createTr: function(){
		var tr = tx.tr();
		for( var i = 0; i< this.colSize; i++){
			var td = this.createTd({});
			this.setTdBorderStyle(td, false, (i==0));
			tr.appendChild( td );
		}
		return tr;
	},
	createTable: function(table){
		if ($tx.msie || $tx.opera) {
			var div = tx.div();
			var innerHTML = table.outerHTML;
			div.innerHTML = innerHTML;
			return div.firstChild;
		}else {
			return table.cloneNode(true);
		}	
	},
	clearTable: function(){
		if ($tx.gecko) {
			$tx.setStyle(this.elTable, { borderCollapse: "separate" });
		}
		this.elTable.setAttribute("width","");
		
		for( var i = 0 ; i < this.rowSize; i++){
			for( var j = 0 ; j < this.colSize; j++){
				TdUtil.clearContent(this.tdMatrix[i][j]);
			}
		}
		this._resizeAllCellWidth();
	},
	clearSelection: function(){
		var coord = this.boundary;
		if ( coord.top < 0 || coord.left < 0 ){
			return; 
		}

		for( var i = coord.top; i <= coord.bottom; i++){
			for( var j = coord.left; j <= coord.right; j++){
				TdUtil.setUnselect( this.tdMatrix[i][j] );
			}
		}
	},
	setSelection: function(){
		var coord = this.boundary;
		
		for( var i = coord.top; i <= coord.bottom; i++){
			for( var j = coord.left; j <= coord.right; j++){
				TdUtil.setSelect(this.tdMatrix[i][j]);
			}
		}
	},
	_clearCoord: function(){
		for( var i = 0; i < this.rowSize; i++){
			for( var j = 0; j < this.colSize; j++ ){
				TdUtil.clearCoords(this.tdMatrix[i][j]);
			}
		}
	},
	refreshCoord: function(){
		this._clearCoord();
		for( var i = 0; i < this.rowSize; i++){
			for( var j = 0; j < this.colSize; j++ ){
				var colClass = this.tdMatrix[i][j].getAttribute("colClass"); 
				if ( !colClass ){
					TdUtil.setCoords(this.tdMatrix[i][j], i, j);
				}
			}
		}
	},
	getSelectedRectCoord: function(){
		return this.boundary.getRectCoord();
	},
	clearBoundary: function(){
		this.boundary.clear();
	},
	eventBinding: function(){
		var self = this;
		var previousElement = null;
		
		var _mouseDownHandler = function(ev){
			var el = TdUtil.getEventElement(ev, true);
			if (el) {
				var coordMin = TdUtil.getMinCoord(el);
				var coordMax = TdUtil.getMaxCoord(el);
				self.clearSelection();
				self.boundary.init(coordMin.x - 1, coordMin.y - 1);
				self.boundary.changeBoundary(coordMax.x - 1, coordMax.y - 1);
				previousElement = el;
			}
		}
		
		var _mouseOverHandler = function(ev){
			if (previousElement) {
				var el = TdUtil.getEventElement(ev);
				if (el && previousElement != el) {
					var coord = TdUtil.getMinCoord(el);
					previousElement = el;
					self.clearSelection();
					self.boundary.changeBoundary(coord.x - 1, coord.y - 1);
					self.setSelection();
				}
			}
		}
		var _mouseupHandler = function(ev){
			$tx.stop(ev);
			var el = TdUtil.getEventElement(ev);
			if (previousElement) {
				if ( el == previousElement ){
					self.setSelection();
				}
				previousElement = null;
			}
		}
		
		setTimeout(function(){
			var elContainertArea = $tom.collect( ".tx-table-edit-container" );
			var _mouseClickHandler = function(ev){
				var target = $tx.element(ev);
				if ( target && target.tagName ){
					var klass = target.className || "";
					var tagName = target.tagName.toLowerCase() || "";
					if (tagName == "div" && (klass.indexOf("tx-table-edit") > -1 || klass.indexOf("tx-preview") > -1)) {
						self.clearSelection()
						self.boundary.clear();
						$tx.stop(ev);
					}
				}
			}			
			$tx.observe(elContainertArea, "click", _mouseClickHandler);
			
			var _mouseupHandler = function(ev){
				if (previousElement) {
					previousElement = null;
				}
			}
			$tx.observe(elContainertArea, "mouseup", _mouseupHandler);
		}, 1000);

		
		$tx.observe(this.elTable, "mousedown", _mouseDownHandler);
		$tx.observe(this.elTable, "mouseover", _mouseOverHandler);
		$tx.observe(this.elTable, "mouseup", _mouseupHandler);
	}
});
}());Trex.MarkupTemplate.add(
	'table.hover.button', 
	'<div class="tx-table-btn-layer"><a href="javascript:;" class="tx-table-edit-layout">\ud45c\ud3b8\uc9d1</a><a href="javascript:;" class="tx-table-edit-template">\ud45c\uc11c\uc2dd</a><a href="javascript:;" class="tx-table-remove">\uc0ad\uc81c</a></div>'
);
Trex.module("show button for action of table object", 
	function(editor, toolbar, sidebar, canvas, config) {
		var _BUTTON_OFFSET = 20;
		var _hoverdTableNode = null;
		var _elBtn = Trex.MarkupTemplate.get("table.hover.button").evaluateAsDom({});
		$tom.insertFirst( canvas.wysiwygEl, _elBtn );
		
		var _eventBinding = function(){
			var elALayout = $tom.collect( _elBtn, "a.tx-table-edit-layout");
			$tx.observe( elALayout, "click", function(ev){
				if (_hoverdTableNode) {
					new Trex.Menu.Table.TableEdit({
						editor: editor,
						table: _hoverdTableNode
					});
				}
				return false;
			});
			
			var elATemplate = $tom.collect( _elBtn, "a.tx-table-edit-template");
			$tx.observe( elATemplate, "click", function(ev){
				if (_hoverdTableNode) {
					var tableEdit = new Trex.Menu.Table.TableEdit({
						editor: editor,
						table: _hoverdTableNode
					});
					tableEdit.showMenu(2);
				}
				return false;
			});
			
			var elADelete = $tom.collect( _elBtn, "a.tx-table-remove");
			$tx.observe( elADelete, "click", function(ev){
				if (_hoverdTableNode) {
					if (!confirm("\ud14c\uc774\ube14\uc744 \uc0ad\uc81c\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?")) {
						return false;
					}
					$tom.remove(_hoverdTableNode);
					canvas.history.saveHistory();
				}
				return false;
			});
		}
		var _showButton = function(nodePos){
			if (nodePos.width > 0 && nodePos.height > 0 && nodePos.y > 0 && canvas.getIframeHeight() - nodePos.y) {
				var top = nodePos.y  + canvas.getIframeTop() - _BUTTON_OFFSET;
				if ( top < 0 ){
					top = -6; 
				}
				$tx.setStyle(_elBtn, { 
					top: top.toPx(), 
					left: (nodePos.x).toPx()
				});
				$tx.show(_elBtn);
			}else{
				$tx.hide(_elBtn);	
			}
		}
		
		toolbar.tools['table'].availableButton = function(node){
			var klass = node.className; 
			if(klass.indexOf("txc-table") > -1) {
				return true;
			}
			if (klass.indexOf("txc-") > -1 || klass.indexOf("tx-") > -1)  {
				return false;
			}
			return true;
		}
		canvas.observeMouseover("table", 
			function(node, nodePos){
				if ( !node ){
					return;
				}
				if ( toolbar.tools['table'].availableButton(node) ){
					_hoverdTableNode = node;
					_showButton(nodePos);
				} else{
					_hoverdTableNode = null;
					$tx.hide(_elBtn);
				}
				throw $stop;
			},
			function(){
				_hoverdTableNode = null;
				$tx.hide(_elBtn);
			}
		);
		
		canvas.observeJob(Trex.Ev.__CANVAS_PANEL_SCROLLING, function(ev) {
			if(_hoverdTableNode) {
				var _nodePos = this.getPositionByNode(_hoverdTableNode);
				_showButton(_nodePos);
			}
		});
		_eventBinding();
	}
);/**
 * @noticepanel
 * \uc5d0\ub514\ud130\uc5d0\uc11c \ud3b8\uc9d1\ud558\uae30 \uc804\uc5d0 \uc5d0\ub514\ud130 \uc704\uc5d0 \ub808\uc774\uc5b4\ub97c \uae54\uc544\uc11c \uc11c\ube44\uc2a4\uac00 \uc6d0\ud558\ub294 \uba54\uc138\uc9c0\ub97c \ucd9c\ub825\ud574\uc8fc\ub294 \ubaa8\ub4c8
 * 
 * @author rockmkd@daumcorp.com
 * @version 1.1 
 */
// #FTDUEDTR-18
Trex.module("Add layer to display notice message on editor area before editing",
	function(editor, toolbar, sidebar, canvas, config){
		if ( config.initializedMessage ) {
			canvas.observeJob(Trex.Ev.__IFRAME_LOAD_COMPLETE,  function(ev){
				var _noticeDiv = tx.div({ id: "tx-canvas-notice", className: "tx-canvas-notice"}, config.initializedMessage);
				$tx("tx_canvas").insertBefore( _noticeDiv, $tx("tx_loading") );
				
				var _noticeDivHandler = function(){
					if ($tx("tx-canvas-notice")) {
						$tx("tx_canvas").removeChild(_noticeDiv);
						if (editor.focus) {
							editor.focus();
						}
					}
				};
				
				$tx.observe(_noticeDiv, "click", _noticeDivHandler);
				canvas.observeJob(Trex.Ev.__CANVAS_DATA_INITIALIZE, _noticeDivHandler);
				toolbar.observeJob(Trex.Ev.__TOOL_CLICK,  _noticeDivHandler);
			});
		
		}
		
	}
);
function getTableTemplateList() {
	return [{
		klass: "ex0",
		common: {
			borderRight: "1px solid #000",
			borderBottom: "1px solid #000"
		},
		firstRow: {
			borderTop: "1px solid #000"
		},
		firstCol: {
			borderLeft: "1px solid #000"
		},
		lastCol: {},
		lastRow: {},
		evenRow: {},
		oddRow: {}
	}, {
		klass: "ex1",
		common: {
			backgroundColor: "#fff",
			color: "#000",
			borderRight: "1px solid #d9d9d9",
			borderBottom: "1px solid #d9d9d9"
		},
		firstRow: {
			borderTop: "1px solid #000"
		},
		firstCol: {
			borderLeft: "1px solid #000"
		},
		lastCol: {
			borderRight: "1px solid #000"
		},
		lastRow: {
			borderBottom: "1px solid #000"
		},
		evenRow: {},
		oddRow: {}
	}, {
		klass: "ex2",
		common: {
			backgroundColor:"#fff",
			color: "#000",
			borderRight: "1px solid #d9d9d9",
			borderBottom: "1px solid #d9d9d9"
		},
		firstRow: {
			borderTop: "1px solid #000",
			borderBottom: "1px solid #000"
		},
		firstCol: {
			borderLeft: "1px solid #000"
		},
		lastCol: {
			borderRight: "1px solid #000"
		},
		lastRow: {
			borderBottom: "1px solid #000"
		},
		evenRow: {},
		oddRow: {}
	}, {
		klass: "ex3",
		common: {
			backgroundColor:"transparent",
			color: "#000",
			borderRight: "1px solid #000",
			borderBottom: "1px solid #000"
		},
		firstRow: {
			borderTop: "1px solid #000",
			backgroundColor: "#e6e6e6"
		},
		firstCol: {
			borderLeft: "1px solid #000"
		},
		lastCol: {},
		lastRow: {},
		evenRow: {},
		oddRow: {}
	}, {
		klass: "ex4",
		common: {
			backgroundColor:"transparent",
			color: "#000",
			borderRight: "1px solid #d9d9d9",
			borderBottom: "1px solid #d9d9d9"
		},
		firstRow: {
			borderTop: "1px solid #000",
			backgroundColor: "#000",
			color:"#fff"
		},
		firstCol: {
			borderLeft: "1px solid #000"
		},
		lastCol: {
			borderRight: "1px solid #000"
		},
		lastRow: {
			borderBottom: "1px solid #000"
		},
		evenRow: {},
		oddRow: {}
	}, {
		klass: "ex5",
		common: {
			backgroundColor:"transparent",
			color: "#000",
			borderBottom: "1px solid #000",
			borderRight: "none"
		},
		firstRow: {
			borderTop: "1px solid #000"
		},
		firstCol: {
			borderLeft: "none"
		},
		lastCol: {},
		lastRow: {},
		evenRow: {
			backgroundColor: "#e6e6e6"
		},
		oddRow: {}
	}, {
		klass: "ex6",
		common: {
			backgroundColor:"transparent",
			color: "#000",
			borderRight: "1px solid #d9d9d9",
			borderBottom: "1px solid #d9d9d9"
		},
		firstRow: {
			borderTop: "1px solid #000",
			borderBottom: "1px solid #000"
		},
		firstCol: {
			borderLeft: "1px solid #000"
		},
		lastCol: {
			borderRight: "1px solid #000"
		},
		lastRow: {
			borderBottom: "1px solid #000"
		},
		evenRow: {
			backgroundColor:"#e6e6e6"
		},
		oddRow: {}
	}, {
		klass: "ex7",
		common: {
			backgroundColor:"transparent",
			color: "#000",
			borderRight: "1px solid #d9d9d9",
			borderBottom: "1px solid #d9d9d9"
		},
		firstRow: {
			borderTop: "1px solid #000",
			borderBottom: "1px solid #000",
			backgroundColor: "#000",
			color:"#fff"
		},
		firstCol: {
			borderLeft: "1px solid #000"
		},
		lastCol: {
			borderRight: "1px solid #000"
		},
		lastRow: {
			borderBottom: "1px solid #000"
		},
		evenRow: {
			backgroundColor:"#e6e6e6"
		},
		oddRow: {}
	}, {
		klass: "ex8",
		common: {
			borderRight:"none",
			borderBottom:"none",
			color: "#000",
			backgroundColor:"transparent"
		},
		firstRow: {
			borderTop:"1px solid #fff",
			borderBottom:"1px solid #fff",
			borderRight:"1px solid #fff",
			backgroundColor: "#000",
			color: "#fff"
		},
		firstCol: {
			borderLeft:"1px solid #fff",
			borderRight:"1px solid #fff",
			borderBottom:"1px solid #fff",
			backgroundColor: "#000",
			color: "#fff"
		},
		lastCol: {
			borderRight:"1px solid #000"
		},
		lastRow: {
			borderBottom:"1px solid #000"
		},
		evenRow: {},
		oddRow: {}
	}, {
		klass: "ex9",
		common: {
			borderRight:"none",
			borderBottom:"none",
			color: "#000",
			backgroundColor:"transparent"
		},
		firstRow: {
			backgroundColor: "#000",
			borderRight:"1px solid #fff",
			borderTop:"1px solid #fff",
			borderBottom:"1px solid #fff",
			color: "#fff"
		},
		firstCol: {
			borderLeft:"1px solid #000"	
		},
		lastCol: {
			borderBottom:"1px solid #fff",
			borderRight:"1px solid #fff",
			backgroundColor: "#000",
			color: "#fff"
		},
		lastRow: {
			borderBottom:"1px solid #000"
		},
		evenRow: {},
		oddRow: {}
	}, {
		klass: "ex11",
		common: {
			backgroundColor: "transparent",
			color: "#000",
			borderRight: "1px solid #d1dffa",
			borderBottom: "1px solid #d1dffa"
		},
		firstRow: {
			borderTop: "1px solid #5f8eef"
		},
		firstCol: {
			borderLeft: "1px solid #5f8eef"
		},
		lastCol: {
			borderRight: "1px solid #5f8eef"
		},
		lastRow: {
			borderBottom: "1px solid #5f8eef"
		},
		evenRow: {},
		oddRow: {}
	}, {
		klass: "ex12",
		common: {
			backgroundColor:"transparent",
			color: "#000",
			borderRight: "1px solid #d1dffa",
			borderBottom: "1px solid #d1dffa"
		},
		firstRow: {
			borderTop: "1px solid #5f8eef",
			borderBottom: "1px solid #5f8eef"
		},
		firstCol: {
			borderLeft: "1px solid #5f8eef"
		},
		lastCol: {
			borderRight: "1px solid #5f8eef"
		},
		lastRow: {
			borderBottom: "1px solid #5f8eef"
		},
		evenRow: {},
		oddRow: {}
	}, {
		klass: "ex13",
		common: {
			backgroundColor:"transparent",
			color: "#000",
			borderRight: "1px solid #d1dffa",
			borderBottom: "1px solid #d1dffa"
		},
		firstRow: {
			borderTop: "1px solid #d1dffa",
			backgroundColor: "#e7efff"
		},
		firstCol: {
			borderLeft: "1px solid #d1dffa"
		},
		lastCol: {},
		lastRow: {},
		evenRow: {},
		oddRow: {}
	}, {
		klass: "ex14",
		common: {
			backgroundColor:"transparent",
			color: "#000",
			borderRight: "1px solid #d1dffa",
			borderBottom: "1px solid #d1dffa"
		},
		firstRow: {
			borderTop: "1px solid #5f8eef",
			backgroundColor: "#5f8eef",
			color:"#fff"
		},
		firstCol: {
			borderLeft: "1px solid #5f8eef"
		},
		lastCol: {
			borderRight: "1px solid #5f8eef"
		},
		lastRow: {
			borderBottom: "1px solid #5f8eef"
		},
		evenRow: {},
		oddRow: {}
	}, {
		klass: "ex15",
		common: {
			backgroundColor:"transparent",
			color: "#000",
			borderBottom: "1px solid #5f8eef",
			borderRight: "none"
		},
		firstRow: {
			borderTop: "1px solid #5f8eef"
		},
		firstCol: {
			borderLeft: "none"
		},
		lastCol: {},
		lastRow: {},
		evenRow: {
			backgroundColor: "#e7effa"
		},
		oddRow: {}
	}, {
		klass: "ex16",
		common: {
			backgroundColor:"transparent",
			color: "#000",
			borderRight: "1px solid #d1dffa",
			borderBottom: "1px solid #d1dffa"
		},
		firstRow: {
			borderTop: "1px solid #5f8eef",
			borderBottom: "1px solid #5f8eef"
		},
		firstCol: {
			borderLeft: "1px solid #5f8eef"
		},
		lastCol: {
			borderRight: "1px solid #5f8eef"
		},
		lastRow: {
			borderBottom: "1px solid #5f8eef"
		},
		evenRow: {
			backgroundColor:"#e7effa"
		},
		oddRow: {}
	}, {
		klass: "ex17",
		common: {
			backgroundColor:"transparent",
			color: "#000",
			borderRight: "1px solid #d1dffa",
			borderBottom: "1px solid #d1dffa"
		},
		firstRow: {
			borderTop: "1px solid #5f8eef",
			borderBottom: "1px solid #5f8eef",
			backgroundColor: "#5f8eef",
			color:"#fff"
		},
		firstCol: {
			borderLeft: "1px solid #5f8eef"
		},
		lastCol: {
			borderRight: "1px solid #5f8eef"
		},
		lastRow: {
			borderBottom: "1px solid #5f8eef"
		},
		evenRow: {
			backgroundColor:"#efefff"
		},
		oddRow: {}
	}, {
		klass: "ex18",
		common: {
			borderRight:"none",
			borderBottom:"none",
			color: "#000",
			backgroundColor:"transparent"
		},
		firstRow: {
			borderTop:"1px solid #fff",
			borderBottom:"1px solid #fff",
			borderRight:"1px solid #fff",
			backgroundColor: "#5f8eef",
			color: "#fff"
		},
		firstCol: {
			borderLeft:"1px solid #fff",
			borderRight:"1px solid #fff",
			borderBottom:"1px solid #fff",
			backgroundColor: "#5f8eef",
			color: "#fff"
		},
		lastCol: {
			borderRight:"1px solid #5f8eef"
		},
		lastRow: {
			borderBottom:"1px solid #5f8eef"
		},
		evenRow: {},
		oddRow: {}
	}, {
		klass: "ex19",
		common: {
			borderRight:"none",
			borderBottom:"none",
			color: "#000",
			backgroundColor:"transparent"
		},
		firstRow: {
			backgroundColor: "#5f8eef",
			borderRight:"1px solid #fff",
			borderTop:"1px solid #fff",
			borderBottom:"1px solid #fff",
			color: "#fff"
		},
		firstCol: {
			borderLeft:"1px solid #5f8eef"	
		},
		lastCol: {
			borderBottom:"1px solid #fff",
			borderRight:"1px solid #fff",
			backgroundColor: "#5f8eef",
			color: "#fff"
		},
		lastRow: {
			borderBottom:"1px solid #5f8eef"
		},
		evenRow: {},
		oddRow: {}
	}, {
		klass: "ex21",
		common: {
			backgroundColor: "transparent",
			color: "#000",
			borderRight: "1px solid #d2eea1",
			borderBottom: "1px solid #d2eea1"
		},
		firstRow: {
			borderTop: "1px solid #97dc20"
		},
		firstCol: {
			borderLeft: "1px solid #97dc20"
		},
		lastCol: {
			borderRight: "1px solid #97dc20"
		},
		lastRow: {
			borderBottom: "1px solid #97dc20"
		},
		evenRow: {},
		oddRow: {}
	}, {
		klass: "ex22",
		common: {
			backgroundColor:"transparent",
			color: "#000",
			borderRight: "1px solid #d2eea1",
			borderBottom: "1px solid #d2eea1"
		},
		firstRow: {
			borderTop: "1px solid #97dc20",
			borderBottom: "1px solid #97dc20"
		},
		firstCol: {
			borderLeft: "1px solid #97dc20"
		},
		lastCol: {
			borderRight: "1px solid #97dc20"
		},
		lastRow: {
			borderBottom: "1px solid #97dc20"
		},
		evenRow: {},
		oddRow: {}
	}, {
		klass: "ex23",
		common: {
			backgroundColor:"transparent",
			color: "#000",
			borderRight: "1px solid #d2eea1",
			borderBottom: "1px solid #d2eea1"
		},
		firstRow: {
			borderTop: "1px solid #97dc20",
			backgroundColor: "#f1ffd8"
		},
		firstCol: {
			borderLeft: "1px solid #97dc20"
		},
		lastCol: {},
		lastRow: {},
		evenRow: {},
		oddRow: {}
	}, {
		klass: "ex24",
		common: {
			backgroundColor:"transparent",
			color: "#000",
			borderRight: "1px solid #d2eea1",
			borderBottom: "1px solid #d2eea1"
		},
		firstRow: {
			borderTop: "1px solid #97dc20",
			backgroundColor: "#97dc20",
			color:"#fff"
		},
		firstCol: {
			borderLeft: "1px solid #97dc20"
		},
		lastCol: {
			borderRight: "1px solid #97dc20"
		},
		lastRow: {
			borderBottom: "1px solid #97dc20"
		},
		evenRow: {},
		oddRow: {}
	}, {
		klass: "ex25",
		common: {
			backgroundColor:"transparent",
			color: "#000",
			borderBottom: "1px solid #97dc20",
			borderRight: "none"
		},
		firstRow: {
			borderTop: "1px solid #97dc20"
		},
		firstCol: {
			borderLeft: "none"
		},
		lastCol: {},
		lastRow: {},
		evenRow: {
			backgroundColor: "#f1ffd8"
		},
		oddRow: {}
	}, {
		klass: "ex26",
		common: {
			backgroundColor:"transparent",
			color: "#000",
			borderRight: "1px solid #d2eea1",
			borderBottom: "1px solid #d2eea1"
		},
		firstRow: {
			borderTop: "1px solid #97dc20",
			borderBottom: "1px solid #97dc20"
		},
		firstCol: {
			borderLeft: "1px solid #97dc20"
		},
		lastCol: {
			borderRight: "1px solid #97dc20"
		},
		lastRow: {
			borderBottom: "1px solid #97dc20"
		},
		evenRow: {
			backgroundColor:"#f1ffd8"
		},
		oddRow: {}
	}, {
		klass: "ex27",
		common: {
			backgroundColor:"transparent",
			color: "#000",
			borderRight: "1px solid #d2eea1",
			borderBottom: "1px solid #d2eea1"
		},
		firstRow: {
			borderTop: "1px solid #97dc20",
			borderBottom: "1px solid #97dc20",
			backgroundColor: "#97dc20",
			color:"#fff"
		},
		firstCol: {
			borderLeft: "1px solid #97dc20"
		},
		lastCol: {
			borderRight: "1px solid #97dc20"
		},
		lastRow: {
			borderBottom: "1px solid #97dc20"
		},
		evenRow: {
			backgroundColor:"#f1ffd8"
		},
		oddRow: {}
	}, {
		klass: "ex28",
		common: {
			color: "#000",
			borderRight:"none",
			borderBottom:"none",
			backgroundColor:"transparent"
		},
		firstRow: {
			borderTop:"1px solid #fff",
			borderBottom:"1px solid #fff",
			borderRight:"1px solid #fff",
			backgroundColor: "#97dc20",
			color: "#fff"
		},
		firstCol: {
			borderLeft:"1px solid #fff",
			borderRight:"1px solid #fff",
			borderBottom:"1px solid #fff",
			backgroundColor: "#97dc20",
			color: "#fff"
		},
		lastCol: {
			borderRight:"1px solid #97dc20"
		},
		lastRow: {
			borderBottom:"1px solid #97dc20"
		},
		evenRow: {},
		oddRow: {}
	}, {
		klass: "ex29",
		common: {
			color: "#000",
			borderRight:"none",
			borderBottom:"none",
			backgroundColor:"transparent"
		},
		firstRow: {
			backgroundColor: "#97dc20",
			borderRight:"1px solid #fff",
			borderTop:"1px solid #fff",
			borderBottom:"1px solid #fff",
			color: "#fff"
		},
		firstCol: {
			borderLeft:"1px solid #97dc20"	
		},
		lastCol: {
			borderBottom:"1px solid #fff",
			borderRight:"1px solid #fff",
			backgroundColor: "#97dc20",
			color: "#fff"
		},
		lastRow: {
			borderBottom:"1px solid #97dc20"
		},
		evenRow: {},
		oddRow: {}
	}, {
		klass: "ex31",
		common: {
			backgroundColor: "transparent",
			color: "#000",
			borderRight: "1px solid #f8bebe",
			borderBottom: "1px solid #f8bebe"
		},
		firstRow: {
			borderTop: "1px solid #ea2d2d"
		},
		firstCol: {
			borderLeft: "1px solid #ea2d2d"
		},
		lastCol: {
			borderRight: "1px solid #ea2d2d"
		},
		lastRow: {
			borderBottom: "1px solid #ea2d2d"
		},
		evenRow: {},
		oddRow: {}
	}, {
		klass: "ex32",
		common: {
			backgroundColor:"transparent",
			color: "#000",
			borderRight: "1px solid #f8bebe",
			borderBottom: "1px solid #f8bebe"
		},
		firstRow: {
			borderTop: "1px solid #ea2d2d",
			borderBottom: "1px solid #ea2d2d"
		},
		firstCol: {
			borderLeft: "1px solid #ea2d2d"
		},
		lastCol: {
			borderRight: "1px solid #ea2d2d"
		},
		lastRow: {
			borderBottom: "1px solid #ea2d2d"
		},
		evenRow: {},
		oddRow: {}
	}, {
		klass: "ex33",
		common: {
			backgroundColor:"transparent",
			color: "#000",
			borderRight: "1px solid #ea2d2d",
			borderBottom: "1px solid #ea2d2d"
		},
		firstRow: {
			borderTop: "1px solid #ea2d2d",
			backgroundColor: "#ffe7e7"
		},
		firstCol: {
			borderLeft: "1px solid #ea2d2d"
		},
		lastCol: {},
		lastRow: {},
		evenRow: {},
		oddRow: {}
	}, {
		klass: "ex34",
		common: {
			backgroundColor:"transparent",
			color: "#000",
			borderRight: "1px solid #f8bebe",
			borderBottom: "1px solid #f8bebe"
		},
		firstRow: {
			borderTop: "1px solid #ea2d2d",
			backgroundColor: "#ea2d2d",
			color:"#fff"
		},
		firstCol: {
			borderLeft: "1px solid #ea2d2d"
		},
		lastCol: {
			borderRight: "1px solid #ea2d2d"
		},
		lastRow: {
			borderBottom: "1px solid #ea2d2d"
		},
		evenRow: {},
		oddRow: {}
	}, {
		klass: "ex35",
		common: {
			backgroundColor:"transparent",
			color: "#000",
			borderBottom: "1px solid #ea2d2d",
			borderRight: "none"
		},
		firstRow: {
			borderTop: "1px solid #ea2d2d"
		},
		firstCol: {
			borderLeft: "none"
		},
		lastCol: {},
		lastRow: {},
		evenRow: {
			backgroundColor: "#ffe7e7"
		},
		oddRow: {}
	}, {
		klass: "ex36",
		common: {
			backgroundColor:"transparent",
			color: "#000",
			borderRight: "1px solid #f8bebe",
			borderBottom: "1px solid #f8bebe"
		},
		firstRow: {
			borderTop: "1px solid #ea2d2d",
			borderBottom: "1px solid #ea2d2d"
		},
		firstCol: {
			borderLeft: "1px solid #ea2d2d"
		},
		lastCol: {
			borderRight: "1px solid #ea2d2d"
		},
		lastRow: {
			borderBottom: "1px solid #ea2d2d"
		},
		evenRow: {
			backgroundColor:"#ffe7e7"
		},
		oddRow: {}
	}, {
		klass: "ex37",
		common: {
			backgroundColor:"transparent",
			color: "#000",
			borderRight: "1px solid #f8bebe",
			borderBottom: "1px solid #f8bebe"
		},
		firstRow: {
			borderTop: "1px solid #ea2d2d",
			borderBottom: "1px solid #ea2d2d",
			backgroundColor: "#ea2d2d",
			color:"#fff"
		},
		firstCol: {
			borderLeft: "1px solid #ea2d2d"
		},
		lastCol: {
			borderRight: "1px solid #ea2d2d"
		},
		lastRow: {
			borderBottom: "1px solid #ea2d2d"
		},
		evenRow: {
			backgroundColor:"#ffe7e7"
		},
		oddRow: {}
	}, {
		klass: "ex38",
		common: {
			color: "#000",
			borderRight:"none",
			borderBottom:"none",
			backgroundColor:"transparent"
		},
		firstRow: {
			borderTop:"1px solid #fff",
			borderBottom:"1px solid #fff",
			borderRight:"1px solid #fff",
			backgroundColor: "#ea2d2d",
			color: "#fff"
		},
		firstCol: {
			borderLeft:"1px solid #fff",
			borderRight:"1px solid #fff",
			borderBottom:"1px solid #fff",
			backgroundColor: "#ea2d2d",
			color: "#fff"
		},
		lastCol: {
			borderRight:"1px solid #ea2d2d"
		},
		lastRow: {
			borderBottom:"1px solid #ea2d2d"
		},
		evenRow: {},
		oddRow: {}
	}, {
		klass: "ex39",
		common: {
			color: "#000",
			borderRight:"none",
			borderBottom:"none",
			backgroundColor:"transparent"
		},
		firstRow: {
			backgroundColor: "#ea2d2d",
			borderRight:"1px solid #fff",
			borderTop:"1px solid #fff",
			borderBottom:"1px solid #fff",
			color: "#fff"
		},
		firstCol: {
			borderLeft:"1px solid #ea2d2d"	
		},
		lastCol: {
			borderBottom:"1px solid #fff",
			borderRight:"1px solid #fff",
			backgroundColor: "#ea2d2d",
			color: "#fff"
		},
		lastRow: {
			borderBottom:"1px solid #ea2d2d"
		},
		evenRow: {},
		oddRow: {}
	}, {
		klass: "ex41",
		common: {
			backgroundColor: "transparent",
			color: "#000",
			borderRight: "1px solid #ffd1aa",
			borderBottom: "1px solid #ffd1aa"
		},
		firstRow: {
			borderTop: "1px solid #fb861f"
		},
		firstCol: {
			borderLeft: "1px solid #fb861f"
		},
		lastCol: {
			borderRight: "1px solid #fb861f"
		},
		lastRow: {
			borderBottom: "1px solid #fb861f"
		},
		evenRow: {},
		oddRow: {}
	}, {
		klass: "ex42",
		common: {
			backgroundColor:"transparent",
			color: "#000",
			borderRight: "1px solid #ffd1aa",
			borderBottom: "1px solid #ffd1aa"
		},
		firstRow: {
			borderTop: "1px solid #fb861f",
			borderBottom: "1px solid #fb861f"
		},
		firstCol: {
			borderLeft: "1px solid #fb861f"
		},
		lastCol: {
			borderRight: "1px solid #fb861f"
		},
		lastRow: {
			borderBottom: "1px solid #fb861f"
		},
		evenRow: {},
		oddRow: {}
	}, {
		klass: "ex43",
		common: {
			backgroundColor:"transparent",
			color: "#000",
			borderRight: "1px solid #fb861f",
			borderBottom: "1px solid #fb861f"
		},
		firstRow: {
			borderTop: "1px solid #fb861f",
			backgroundColor: "#ffead8"
		},
		firstCol: {
			borderLeft: "1px solid #fb861f"
		},
		lastCol: {},
		lastRow: {},
		evenRow: {},
		oddRow: {}
	}, {
		klass: "ex44",
		common: {
			backgroundColor:"transparent",
			color: "#000",
			borderRight: "1px solid #ffd1aa",
			borderBottom: "1px solid #ffd1aa"
		},
		firstRow: {
			borderTop: "1px solid #fb861f",
			backgroundColor: "#fb861f",
			color:"#fff"
		},
		firstCol: {
			borderLeft: "1px solid #fb861f"
		},
		lastCol: {
			borderRight: "1px solid #fb861f"
		},
		lastRow: {
			borderBottom: "1px solid #fb861f"
		},
		evenRow: {},
		oddRow: {}
	}, {
		klass: "ex45",
		common: {
			color: "#000",
			backgroundColor:"transparent",
			borderBottom: "1px solid #fb861f",
			borderRight: "none"
		},
		firstRow: {
			borderTop: "1px solid #fb861f"
		},
		firstCol: {
			borderLeft: "none"
		},
		lastCol: {},
		lastRow: {},
		evenRow: {
			backgroundColor: "#ffead8"
		},
		oddRow: {}
	}, {
		klass: "ex46",
		common: {
			color: "#000",
			backgroundColor:"transparent",
			borderRight: "1px solid #ffd1aa",
			borderBottom: "1px solid #ffd1aa"
		},
		firstRow: {
			borderTop: "1px solid #fb861f",
			borderBottom: "1px solid #fb861f"
		},
		firstCol: {
			borderLeft: "1px solid #fb861f"
		},
		lastCol: {
			borderRight: "1px solid #fb861f"
		},
		lastRow: {
			borderBottom: "1px solid #fb861f"
		},
		evenRow: {
			backgroundColor:"#ffead8"
		},
		oddRow: {}
	}, {
		klass: "ex47",
		common: {
			color: "#000",
			backgroundColor:"transparent",
			borderRight: "1px solid #ffd1aa",
			borderBottom: "1px solid #ffd1aa"
		},
		firstRow: {
			borderTop: "1px solid #fb861f",
			borderBottom: "1px solid #fb861f",
			backgroundColor: "#fb861f",
			color:"#fff"
		},
		firstCol: {
			borderLeft: "1px solid #fb861f"
		},
		lastCol: {
			borderRight: "1px solid #fb861f"
		},
		lastRow: {
			borderBottom: "1px solid #fb861f"
		},
		evenRow: {
			backgroundColor:"#ffead8"
		},
		oddRow: {}
	}, {
		klass: "ex48",
		common: {
			color: "#000",
			borderRight:"none",
			borderBottom:"none",
			backgroundColor:"transparent"
		},
		firstRow: {
			borderTop:"1px solid #fff",
			borderBottom:"1px solid #fff",
			borderRight:"1px solid #fff",
			backgroundColor: "#fb861f",
			color: "#fff"
		},
		firstCol: {
			borderLeft:"1px solid #fff",
			borderRight:"1px solid #fff",
			borderBottom:"1px solid #fff",
			backgroundColor: "#fb861f",
			color: "#fff"
		},
		lastCol: {
			borderRight:"1px solid #fb861f"
		},
		lastRow: {
			borderBottom:"1px solid #fb861f"
		},
		evenRow: {},
		oddRow: {}
	}, {
		klass: "ex49",
		common: {
			color: "#000",
			borderRight: "none",
			borderBottom: "none",
			backgroundColor: "transparent"
		},
		firstRow: {
			backgroundColor: "#fb861f",
			borderRight:"1px solid #fff",
			borderTop:"1px solid #fff",
			borderBottom:"1px solid #fff",
			color: "#fff"
		},
		firstCol: {
			borderLeft: "1px solid #fb861f"
		},
		lastCol: {
			borderBottom:"1px solid #fff",
			borderRight:"1px solid #fff",
			backgroundColor: "#fb861f",
			color: "#fff"
		},
		lastRow: {
			borderBottom: "1px solid #fb861f"
		},
		evenRow: {},
		oddRow: {}
	}
];
}
