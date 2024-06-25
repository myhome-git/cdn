/*!
 * author: FDD <smileFDD@gmail.com> 
 * ol-extent v2.0.0
 * build-time: 2018-3-25 14:33
 * LICENSE: MIT
 * (c) 2017-2018 https://sakitam-fdd.github.io/ol-extent/
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('openlayers')) :
	typeof define === 'function' && define.amd ? define(['exports', 'openlayers'], factory) :
	(factory((global.ole = {}),global.ol));
}(this, (function (exports,ol) { 'use strict';

ol = ol && ol.hasOwnProperty('default') ? ol['default'] : ol;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};











var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var _arguments = arguments;

var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
var MOZ_HACK_REGEXP = /^moz([A-Z])/;
var byteToHex = [];
var rnds = new Array(16);
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

var has = function has(object_, key_) {
  return (typeof object_ === 'undefined' ? 'undefined' : _typeof(object_)) === 'object' && object_.hasOwnProperty(key_);
};

var trim = function trim(string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};

var camelCase = function camelCase(name) {
  return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter;
  }).replace(MOZ_HACK_REGEXP, 'Moz$1');
};

var stamp = function stamp(obj) {
  var key = '_event_id_';
  obj[key] = obj[key] || uuid();
  return obj[key];
};

var isNull = function isNull(obj) {
  return obj == null;
};

var isNumber = function isNumber(val) {
  return typeof val === 'number' && !isNaN(val);
};

var isObject = function isObject(value) {
  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  return value !== null && (type === 'object' || type === 'function');
};

var isString = function isString(value) {
  if (value == null) {
    return false;
  }
  return typeof value === 'string' || value.constructor !== null && value.constructor === String;
};

var bytesToUuid = function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  return bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]];
};

var mathRNG = function mathRNG() {
  for (var _i = 0, r; _i < 16; _i++) {
    if ((_i & 0x03) === 0) r = Math.random() * 0x100000000;
    rnds[_i] = r >>> ((_i & 0x03) << 3) & 0xff;
  }
  return rnds;
};

var uuid = function uuid(options, buf, offset) {
  var i = buf && offset || 0;
  if (typeof options === 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};
  var rnds = options.random || (options.rng || mathRNG)();
  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80;

  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }
  return buf || bytesToUuid(rnds);
};

var merge = function merge(target) {
  for (var _i2 = 1, j = _arguments.length; _i2 < j; _i2++) {
    var source = _arguments[_i2] || {};
    for (var prop in source) {
      if (source.hasOwnProperty(prop)) {
        var value = source[prop];
        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }
  return target;
};

var getRandom = function getRandom(min, max) {
  var r = Math.random() * (max - min);
  var re = Math.round(r + min);
  re = Math.max(Math.min(re, max), min);
  return re;
};

var cloneDeep = function cloneDeep(obj) {
  var keys = Object.keys(obj);
  var newObject = {};
  for (var _i3 = 0; _i3 < keys.length; _i3++) {
    var key = keys[_i3];
    if (_typeof(obj[key]) === 'object') {
      newObject[key] = cloneDeep(obj[key]);
    } else {
      newObject[key] = obj[key];
    }
  }
  return newObject;
};

var create = function create(tagName, className, container, id) {
  var el = document.createElement(tagName);
  if (id) el.id = id;
  if (className) addClass(el, className);
  if (container) {
    container.appendChild(el);
  }
  return el;
};

var createCanvas = function createCanvas(width, height, Canvas) {
  if (typeof document !== 'undefined') {
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
  } else {
    return new Canvas(width, height);
  }
};

var getElement = function getElement(id) {
  return typeof id === 'string' ? document.getElementById(id) : id;
};

var remove = function remove(node) {
  return node && node.parentNode ? node.parentNode.removeChild(node) : null;
};

var empty = function empty(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
};

var createHidden = function createHidden(tagName, parent, id) {
  var element = document.createElement(tagName);
  element.style.display = 'none';
  if (id) {
    element.id = id;
  }
  if (parent) {
    parent.appendChild(element);
  }
  return element;
};

var hasClass = function hasClass(el, cls) {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }
};

var addClass = function addClass(el, cls) {
  if (!el) return;
  var curClass = el.className;
  var classes = (cls || '').split(' ');
  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;
    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName;
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
};

var removeClass = function removeClass(el, cls) {
  if (!el || !cls) return;
  var classes = cls.split(' ');
  var curClass = ' ' + el.className + ' ';
  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;
    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ');
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
};

var getStyle = function getStyle(element, styleName) {
  if (!element || !styleName) return null;
  styleName = camelCase(styleName);
  if (styleName === 'float') {
    styleName = 'cssFloat';
  }
  try {
    var computed = document.defaultView.getComputedStyle(element, '');
    return element.style[styleName] || computed ? computed[styleName] : null;
  } catch (e) {
    return element.style[styleName];
  }
};

var setStyle = function setStyle(element, styleName, value) {
  if (!element || !styleName) return;
  if ((typeof styleName === 'undefined' ? 'undefined' : _typeof(styleName)) === 'object') {
    for (var prop in styleName) {
      if (styleName.hasOwnProperty(prop)) {
        setStyle(element, prop, styleName[prop]);
      }
    }
  } else {
    styleName = camelCase(styleName);
    if (styleName === 'opacity') {
      element.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + value * 100 + ')';
    } else {
      element.style[styleName] = value;
    }
  }
};

var getDomEventKey = function getDomEventKey(type, fn, context) {
  return '_dom_event_' + type + '_' + stamp(fn) + (context ? '_' + stamp(context) : '');
};

var addListener = function addListener(element, type, fn, context, isOnce) {
  var eventKey = getDomEventKey(type, fn, context);
  var handler = element[eventKey];
  if (handler) {
    if (!isOnce) {
      handler.callOnce = false;
    }
    return this;
  }
  handler = function handler(e) {
    return fn.call(context || element, e);
  };
  if ('addEventListener' in element) {
    element.addEventListener(type, handler, false);
  } else if ('attachEvent' in element) {
    element.attachEvent('on' + type, handler);
  }
  element[eventKey] = handler;
  return this;
};

var on = addListener;

var removeListener = function removeListener(element, type, fn, context) {
  var eventKey = getDomEventKey(type, fn, context);
  var handler = element[eventKey];
  if (!handler) {
    return this;
  }
  if ('removeEventListener' in element) {
    element.removeEventListener(type, handler, false);
  } else if ('detachEvent' in element) {
    element.detachEvent('on' + type, handler);
  }
  element[eventKey] = null;
  return this;
};

var off = removeListener;

var once = function once(element, type, fn, context) {
  return addListener(element, type, fn, context, true);
};

var preventDefault = function preventDefault(event) {
  if (event.preventDefault) {
    event.preventDefault();
  } else {
    event.returnValue = false;
  }
  return this;
};

var stopPropagation = function stopPropagation(event) {
  if (event.stopPropagation) {
    event.stopPropagation();
  } else {
    event.cancelBubble = true;
  }
  return this;
};



var index = Object.freeze({
	has: has,
	merge: merge,
	stamp: stamp,
	uuid: uuid,
	trim: trim,
	isNull: isNull,
	isString: isString,
	isObject: isObject,
	isNumber: isNumber,
	camelCase: camelCase,
	getRandom: getRandom,
	cloneDeep: cloneDeep,
	create: create,
	createCanvas: createCanvas,
	getElement: getElement,
	remove: remove,
	empty: empty,
	createHidden: createHidden,
	hasClass: hasClass,
	addClass: addClass,
	removeClass: removeClass,
	getStyle: getStyle,
	setStyle: setStyle,
	on: on,
	once: once,
	addListener: addListener,
	off: off,
	removeListener: removeListener,
	preventDefault: preventDefault,
	stopPropagation: stopPropagation
});

var CanvasLayer = function (_ol$layer$Image) {
  inherits(CanvasLayer, _ol$layer$Image);

  function CanvasLayer() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, CanvasLayer);

    var _this = possibleConstructorReturn(this, _ol$layer$Image.call(this, options));

    _this._canvas = null;

    _this.options = options;
    _this.setSource(new ol.source.ImageCanvas({
      logo: options.logo,
      state: options.state,
      attributions: options.attributions,
      resolutions: options.resolutions,
      canvasFunction: _this.canvasFunction.bind(_this),
      projection: options.hasOwnProperty('projection') ? options.projection : 'EPSG:3857',
      ratio: options.hasOwnProperty('ratio') ? options.ratio : 1
    }));
    _this.on('precompose', _this.redraw, _this);
    return _this;
  }

  CanvasLayer.prototype.redraw = function redraw() {
    var _extent = this.options.extent || this._getMapExtent();
    this.setExtent(_extent);
  };

  CanvasLayer.prototype.getContext = function getContext() {
    return this._canvas.getContext(this.get('context') || '2d');
  };

  CanvasLayer.prototype._getMapExtent = function _getMapExtent() {
    if (!this.getMap()) return;
    var size = this._getMapSize();
    var _view = this.getMap().getView();
    return _view && _view.calculateExtent(size);
  };

  CanvasLayer.prototype._getMapSize = function _getMapSize() {
    if (!this.getMap()) return;
    return this.getMap().getSize();
  };

  CanvasLayer.prototype.canvasFunction = function canvasFunction(extent, resolution, pixelRatio, size, projection) {
    if (!this._canvas) {
      this._canvas = createCanvas(size[0], size[1]);
    } else {
      this._canvas.width = size[0];
      this._canvas.height = size[1];
    }
    if (resolution <= this.get('maxResolution')) {
      var context = this.getContext();
      this.get('render') && this.get('render')({
        context: context,
        extent: extent,
        size: size,
        pixelRatio: pixelRatio,
        projection: projection
      });
    } else {}
    return this._canvas;
  };

  CanvasLayer.prototype.setMap = function setMap(map) {
    ol.layer.Image.prototype.setMap.call(this, map);
  };

  CanvasLayer.prototype.getMap = function getMap() {
    return this.get('map');
  };

  return CanvasLayer;
}(ol.layer.Image);

var DozensLayer = function (_ol$layer$Image) {
  inherits(DozensLayer, _ol$layer$Image);

  function DozensLayer() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, DozensLayer);

    var _this = possibleConstructorReturn(this, _ol$layer$Image.call(this, options));

    _this._canvas = null;

    _this._context = null;

    _this._style = null;

    _this.features = [];

    _this.options = options;

    _this.setSource(new ol.source.ImageCanvas({
      logo: options.logo,
      state: options.state,
      attributions: options.attributions,
      resolutions: options.resolutions,
      canvasFunction: _this.canvasFunction.bind(_this),
      projection: options.hasOwnProperty('projection') ? options.projection : 'EPSG:3857',
      ratio: options.hasOwnProperty('ratio') ? options.ratio : 1
    }));

    _this.setStyle(options.style);

    _this.on('precompose', _this.redraw, _this);
    return _this;
  }

  DozensLayer.prototype.addFeature = function addFeature(feature) {
    this.features.push(feature);
  };

  DozensLayer.prototype.addFeatures = function addFeatures(features) {
    this.features = this.features.concat(features);
  };

  DozensLayer.prototype.getFeatures = function getFeatures() {
    return this.features;
  };

  DozensLayer.prototype.getFeatureById = function getFeatureById(id) {};

  DozensLayer.prototype.getStyle = function getStyle() {
    return this._style;
  };

  DozensLayer.prototype.setStyle = function setStyle(style) {
    this._style = style;
  };

  DozensLayer.prototype._drawFeature = function _drawFeature() {
    var that = this;
    if (!this.getMap()) return;
    if (!this._context) this._context = this.getContext();
    var _length = this.features.length;
    var imageStyle = that._style.getImage();
    function render_(beauty) {
      for (var i = 0; i < _length; i++) {
        var geometry = that.features[i].getGeometry();
        var coordinates = geometry && geometry.getCoordinates();
        if (coordinates) {
          var pixel = that.getMap().getPixelFromCoordinate(coordinates);
          var _imageStyle = that._style.getImage();
          var size = _imageStyle.getSize();
          that._context.drawImage(beauty, pixel[0], pixel[1], size[0], size[1]);
        }
      }
    }
    if (imageStyle) {
      var beauty = new Image();
      beauty.src = imageStyle.getSrc();
      if (beauty.complete) {
        render_(beauty);
      }
    }
  };

  DozensLayer.prototype.redraw = function redraw() {
    var _extent = this.options.extent || this._getMapExtent();
    this.setExtent(_extent);
  };

  DozensLayer.prototype.getContext = function getContext() {
    return this._canvas.getContext(this.get('context') || '2d');
  };

  DozensLayer.prototype._getMapExtent = function _getMapExtent() {
    if (!this.getMap()) return;
    var size = this._getMapSize();
    var _view = this.getMap().getView();
    return _view && _view.calculateExtent(size);
  };

  DozensLayer.prototype._getMapSize = function _getMapSize() {
    if (!this.getMap()) return;
    return this.getMap().getSize();
  };

  DozensLayer.prototype.canvasFunction = function canvasFunction(extent, resolution, pixelRatio, size, projection) {
    if (!this._canvas) {
      this._canvas = createCanvas(size[0], size[1]);
    } else {
      this._canvas.width = size[0];
      this._canvas.height = size[1];
    }
    if (resolution <= this.get('maxResolution')) {
      var context = this.getContext();
      this._drawFeature();
      this.get('render') && this.get('render')({
        context: context,
        extent: extent,
        size: size,
        pixelRatio: pixelRatio,
        projection: projection
      });
    } else {}
    return this._canvas;
  };

  DozensLayer.prototype.setMap = function setMap(map) {
    this.set('originMap', map);
  };

  DozensLayer.prototype.getMap = function getMap() {
    return this.get('originMap');
  };

  return DozensLayer;
}(ol.layer.Image);

ol.layer.DozensLayer = DozensLayer;



var index$1 = Object.freeze({
	CanvasLayer: CanvasLayer,
	DozensLayer: DozensLayer
});

var Baidu = function (_ol$source$TileImage) {
  inherits(Baidu, _ol$source$TileImage);

  function Baidu() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, Baidu);

    var attributions = '';
    if (options.attributions !== undefined) {
      attributions = options.attributions;
    } else {
      attributions = [Baidu.ATTRIBUTION];
    }
    options.projection = options['projection'] ? options.projection : 'EPSG:3857';
    var crossOrigin = options.crossOrigin !== undefined ? options.crossOrigin : 'anonymous';
    var url = options.url !== undefined ? options.url : 'http://online{0-3}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles={styles}&udt=20170607&scaler=1&p=1';
    var hidpi = options.hidpi || (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1;
    url = url.replace('{styles}', hidpi ? 'ph' : 'pl');
    var tileUrlFunction = options.tileUrlFunction ? options.tileUrlFunction : undefined;
    if (!tileUrlFunction) {
      tileUrlFunction = function tileUrlFunction(tileCoord) {
        var _ref = [tileCoord[0], tileCoord[2], tileCoord[1]],
            z = _ref[0],
            y = _ref[1],
            x = _ref[2];

        if (x < 0) {
          x = 'M' + -x;
        }
        if (y < 0) {
          y = 'M' + -y;
        }
        return url.replace('{0-3}', getRandom(0, 3)).replace('{x}', x.toString()).replace('{y}', y.toString()).replace('{z}', z.toString());
      };
    }
    var levels = options['levels'] ? options['levels'] : 19;
    var resolutions = [];
    for (var z = 0; z < levels; z++) {
      resolutions[z] = Math.pow(2, levels - 1 - z);
    }
    var tileGrid = new ol.tilegrid.TileGrid({
      tileSize: options['tileSize'] ? options['tileSize'] : 256,
      origin: options['origin'] ? options['origin'] : [0, 0],
      extent: options['extent'] ? options['extent'] : undefined,
      resolutions: resolutions,
      minZoom: options['minZoom'] && typeof options['minZoom'] === 'number' ? options['minZoom'] : 0
    });
    return possibleConstructorReturn(this, _ol$source$TileImage.call(this, {
      tileGrid: tileGrid,
      attributions: attributions,
      cacheSize: options.cacheSize,
      projection: options.projection,
      crossOrigin: crossOrigin,
      opaque: options.opaque !== undefined ? options.opaque : true,
      maxZoom: options.maxZoom !== undefined ? options.maxZoom : 19,
      reprojectionErrorThreshold: options.reprojectionErrorThreshold,
      tileUrlFunction: tileUrlFunction,
      url: url,
      wrapX: options.wrapX,
      tilePixelRatio: hidpi ? 2 : 1
    }));
  }

  return Baidu;
}(ol.source.TileImage);

Baidu.ATTRIBUTION = new ol.Attribution({
  html: '&copy; ' + '<a href="http://map.baidu.com/">百度地图</a> ' + 'contributors.'
});

var Gaode = function (_ol$source$XYZ) {
  inherits(Gaode, _ol$source$XYZ);

  function Gaode() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, Gaode);

    var attributions = '';
    if (options.attributions !== undefined) {
      attributions = options.attributions;
    } else {
      attributions = [Gaode.ATTRIBUTION];
    }
    options.projection = options['projection'] ? options.projection : 'EPSG:3857';
    var crossOrigin = options.crossOrigin !== undefined ? options.crossOrigin : 'anonymous';
    var url = options.url !== undefined ? options.url : 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=6&x={x}&y={y}&z={z}';
    var tileUrlFunction = options.tileUrlFunction ? options.tileUrlFunction : undefined;
    return possibleConstructorReturn(this, _ol$source$XYZ.call(this, {
      attributions: attributions,
      cacheSize: options.cacheSize,
      crossOrigin: crossOrigin,
      opaque: options.opaque !== undefined ? options.opaque : true,
      maxZoom: options.maxZoom !== undefined ? options.maxZoom : 19,
      reprojectionErrorThreshold: options.reprojectionErrorThreshold,
      tileLoadFunction: options.tileLoadFunction,
      tileUrlFunction: tileUrlFunction,
      url: url,
      wrapX: options.wrapX
    }));
  }

  return Gaode;
}(ol.source.XYZ);

Gaode.ATTRIBUTION = new ol.Attribution({
  html: '&copy; ' + '<a href="http://ditu.amap.com/">高德地图</a> ' + 'contributors.'
});

var Google = function (_ol$source$XYZ) {
  inherits(Google, _ol$source$XYZ);

  function Google() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, Google);

    var attributions = '';
    if (options.attributions !== undefined) {
      attributions = options.attributions;
    } else {
      attributions = [Google.ATTRIBUTION];
    }
    options.projection = options['projection'] ? options.projection : 'EPSG:3857';
    var crossOrigin = options.crossOrigin !== undefined ? options.crossOrigin : 'anonymous';
    var url = options.url !== undefined ? options.url : 'http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}';
    return possibleConstructorReturn(this, _ol$source$XYZ.call(this, {
      attributions: attributions,
      cacheSize: options.cacheSize,
      crossOrigin: crossOrigin,
      opaque: options.opaque !== undefined ? options.opaque : true,
      maxZoom: options.maxZoom !== undefined ? options.maxZoom : 19,
      reprojectionErrorThreshold: options.reprojectionErrorThreshold,
      tileLoadFunction: options.tileLoadFunction,
      url: url,
      wrapX: options.wrapX
    }));
  }

  return Google;
}(ol.source.XYZ);

Google.ATTRIBUTION = new ol.Attribution({
  html: '&copy; ' + '<a href="http://www.google.cn/maps">谷歌地图</a> ' + 'contributors.'
});



var index$2 = Object.freeze({
	Baidu: Baidu,
	Gaode: Gaode,
	Google: Google
});

var BASE_CLASS_NAME = {
  CLASS_HIDDEN: 'ole-hidden',
  CLASS_SELECTABLE: 'ole-selectable',
  CLASS_UNSELECTABLE: 'ole-unselectable',
  CLASS_CONTROL: 'ole-control'
};

var UNITS = {
  DEGREES: 'degrees',
  FEET: 'ft',
  METERS: 'm',
  PIXELS: 'pixels',
  TILE_PIXELS: 'tile-pixels',
  USFEET: 'us-ft',
  METERS_PER_UNIT: {}
};

UNITS.METERS_PER_UNIT[UNITS.DEGREES] = 2 * Math.PI * 6370997 / 360;
UNITS.METERS_PER_UNIT[UNITS.FEET] = 0.3048;
UNITS.METERS_PER_UNIT[UNITS.METERS] = 1;
UNITS.METERS_PER_UNIT[UNITS.USFEET] = 1200 / 3937;

var OVERVIEWMAP = {
  MIN_RATIO: 0.1,
  MAX_RATIO: 0.75
};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var screenfull = createCommonjsModule(function (module) {
/*!
* screenfull
* v3.3.2 - 2017-10-27
* (c) Sindre Sorhus; MIT License
*/
(function () {
	var document = typeof window !== 'undefined' && typeof window.document !== 'undefined' ? window.document : {};
	var isCommonjs = 'object' !== 'undefined' && module.exports;
	var keyboardAllowed = typeof Element !== 'undefined' && 'ALLOW_KEYBOARD_INPUT' in Element;

	var fn = (function () {
		var val;

		var fnMap = [
			[
				'requestFullscreen',
				'exitFullscreen',
				'fullscreenElement',
				'fullscreenEnabled',
				'fullscreenchange',
				'fullscreenerror'
			],
			// New WebKit
			[
				'webkitRequestFullscreen',
				'webkitExitFullscreen',
				'webkitFullscreenElement',
				'webkitFullscreenEnabled',
				'webkitfullscreenchange',
				'webkitfullscreenerror'

			],
			// Old WebKit (Safari 5.1)
			[
				'webkitRequestFullScreen',
				'webkitCancelFullScreen',
				'webkitCurrentFullScreenElement',
				'webkitCancelFullScreen',
				'webkitfullscreenchange',
				'webkitfullscreenerror'

			],
			[
				'mozRequestFullScreen',
				'mozCancelFullScreen',
				'mozFullScreenElement',
				'mozFullScreenEnabled',
				'mozfullscreenchange',
				'mozfullscreenerror'
			],
			[
				'msRequestFullscreen',
				'msExitFullscreen',
				'msFullscreenElement',
				'msFullscreenEnabled',
				'MSFullscreenChange',
				'MSFullscreenError'
			]
		];

		var i = 0;
		var l = fnMap.length;
		var ret = {};

		for (; i < l; i++) {
			val = fnMap[i];
			if (val && val[1] in document) {
				for (i = 0; i < val.length; i++) {
					ret[fnMap[0][i]] = val[i];
				}
				return ret;
			}
		}

		return false;
	})();

	var eventNameMap = {
		change: fn.fullscreenchange,
		error: fn.fullscreenerror
	};

	var screenfull = {
		request: function (elem) {
			var request = fn.requestFullscreen;

			elem = elem || document.documentElement;

			// Work around Safari 5.1 bug: reports support for
			// keyboard in fullscreen even though it doesn't.
			// Browser sniffing, since the alternative with
			// setTimeout is even worse.
			if (/ Version\/5\.1(?:\.\d+)? Safari\//.test(navigator.userAgent)) {
				elem[request]();
			} else {
				elem[request](keyboardAllowed && Element.ALLOW_KEYBOARD_INPUT);
			}
		},
		exit: function () {
			document[fn.exitFullscreen]();
		},
		toggle: function (elem) {
			if (this.isFullscreen) {
				this.exit();
			} else {
				this.request(elem);
			}
		},
		onchange: function (callback) {
			this.on('change', callback);
		},
		onerror: function (callback) {
			this.on('error', callback);
		},
		on: function (event, callback) {
			var eventName = eventNameMap[event];
			if (eventName) {
				document.addEventListener(eventName, callback, false);
			}
		},
		off: function (event, callback) {
			var eventName = eventNameMap[event];
			if (eventName) {
				document.removeEventListener(eventName, callback, false);
			}
		},
		raw: fn
	};

	if (!fn) {
		if (isCommonjs) {
			module.exports = false;
		} else {
			window.screenfull = false;
		}

		return;
	}

	Object.defineProperties(screenfull, {
		isFullscreen: {
			get: function () {
				return Boolean(document[fn.fullscreenElement]);
			}
		},
		element: {
			enumerable: true,
			get: function () {
				return document[fn.fullscreenElement];
			}
		},
		enabled: {
			enumerable: true,
			get: function () {
				// Coerce to boolean in case of old WebKit
				return Boolean(document[fn.fullscreenEnabled]);
			}
		}
	});

	if (isCommonjs) {
		module.exports = screenfull;
	} else {
		window.screenfull = screenfull;
	}
})();
});

var FullScreen = function (_ol$control$Control) {
  inherits(FullScreen, _ol$control$Control);

  function FullScreen() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, FullScreen);

    var label = options.label !== undefined ? options.label : '\u2922';
    var labelActive = options.labelActive !== undefined ? options.labelActive : '\xD7';
    var className = options.className !== undefined ? options.className : 'ole-control-full-screen';
    var element = create('div', className + ' ' + BASE_CLASS_NAME.CLASS_UNSELECTABLE);
    var inner = create('span', className + '-inner', element);
    inner.setAttribute('title', '全屏');
    inner.innerHTML = label;

    var _this = possibleConstructorReturn(this, _ol$control$Control.call(this, {
      element: element,
      target: options.target
    }));

    _this.label = label;

    _this.labelActive = labelActive;

    _this.keys_ = options.keys !== undefined ? options.keys : false;

    _this.size_ = options.size !== undefined ? options.size : [16, 16];

    _this.source_ = options.source;

    on(element, 'click', _this.handleClick_, _this);
    return _this;
  }

  FullScreen.prototype.handleClick_ = function handleClick_(event) {
    var _this2 = this;

    event.preventDefault();
    var map = this.getMap();
    if (map) {
      var element = null;
      if (this.source_) {
        element = typeof this.source_ === 'string' ? document.getElementById(this.source_) : this.source_;
      } else {
        element = this.getMap().getTargetElement();
      }
      if (screenfull.enabled) {
        screenfull.toggle(element);
        screenfull.on('change', function () {
          if (screenfull.isFullscreen) {
            _this2.element.firstElementChild.innerHTML = _this2.labelActive;
          } else {
            _this2.element.firstElementChild.innerHTML = _this2.label;
          }
        });
      }
    }
  };

  return FullScreen;
}(ol.control.Control);

var Loading = function (_ol$control$Control) {
  inherits(Loading, _ol$control$Control);

  function Loading() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, Loading);

    var className = options.className !== undefined ? options.className : 'ole-loading-panel';
    var widget = options['widget'] ? options['widget'] : 'animatedGif';
    var elementDom = widget === 'animatedGif' ? 'span' : 'progress';
    var element = create(elementDom, className + ' ' + BASE_CLASS_NAME.CLASS_UNSELECTABLE);

    var _this = possibleConstructorReturn(this, _ol$control$Control.call(this, {
      element: element,
      target: options['target']
    }));

    _this.mapListeners = [];

    _this.tileListeners = [];

    _this.loadStatus_ = false;

    _this.isFirstRander = true;

    _this.loadProgress_ = [0, 1];

    _this.widget = widget;

    if (options['progressMode']) {
      if (['tile', 'layer'].indexOf(options['progressMode']) === -1) {
        throw Error('不支持的进度条模式');
      }
      _this.loadProgressByTile_ = options['progressMode'] === 'layer' ? !(options['progressMode'] === 'layer') : true;
    }

    _this.showPanel = typeof options['showPanel'] === 'boolean' ? options['showPanel'] : true;
    if (_this.widget === 'progressBar') {
      var div = create('div', 'ole-progress-bar');
      create('span', '', div);
    }
    _this.onCustomStart = options['onStart'] ? options['onStart'] : false;
    _this.onCustomProgress = options['onProgress'] ? options['onProgress'] : false;
    _this.onCustomEnd = options['onEnd'] ? options['onEnd'] : false;
    return _this;
  }

  Loading.prototype.setup = function setup() {
    var _this2 = this;

    if (!this.getMap()) return;
    this.setDomPosition();
    this.getMap().on('change:size', this.setDomPosition, this);
    var pointerDown = this.getMap().on('pointerdown', this.hide(), this);
    var beforeRander = this.getMap().on('precompose', function () {
      if (_this2.isFirstRander) {
        _this2.isFirstRander = false;
        _this2.registerLayersLoadEvents_();
        _this2.show();
        if (_this2.onCustomStart) {
          var args = [];
          _this2.onCustomStart.apply(_this2, args);
        }
      }
    });
    var afterRander = this.getMap().on('postrender', function () {
      _this2.updateLoadStatus_();
      if (_this2.loadStatus_) {
        if (_this2.onCustomEnd) {
          var args = [];
          _this2.onCustomEnd.apply(_this2, args);
        }
        _this2.hide();
      }
    });
    this.mapListeners.push(pointerDown);
    this.mapListeners.push(beforeRander);
    this.mapListeners.push(afterRander);
  };

  Loading.prototype.setDomPosition = function setDomPosition() {
    var size = this.getMap().getSize();
    if (!size) return;
    var domSize = [this.element.clientWidth, this.element.clientHeight];
    setStyle(this.element, {
      left: String(Math.round((size[0] - domSize[0]) / 2)) + 'px',
      bottom: String(Math.round((size[1] - domSize[1]) / 2)) + 'px'
    });
  };

  Loading.prototype.updateSourceLoadStatus_ = function updateSourceLoadStatus_(source) {
    return Math.round(source.loaded / source.loading * 100) === 100;
  };

  Loading.prototype.registerLayerLoadEvents_ = function registerLayerLoadEvents_(layer) {
    var that = this;
    layer.getSource().on('tileloadstart', function (event) {
      if (that.loadStatus_) {
        that.loadStatus_ = false;
        that.loadProgress_ = [0, 1];
        if (that.widget === 'progressBar') {
          that.element.value = that.loadProgress_[0];
          that.element.max = that.loadProgress_[1];
        }
        that.show();
        if (that.onCustomStart) {
          var args = [];
          that.onCustomStart.apply(that, args);
        }
      }
      this.loading = this.loading ? this.loading + 1 : 1;
      this.isLoaded = that.updateSourceLoadStatus_(this);
      if (that.loadProgressByTile_) {
        this.loadProgress_[1] += 1;
        if (this.widget === 'progressBar') {
          that.element.max = that.loadProgress_[1];
          var progressBarDiv = that.element.getElementsByClassName('ole-progress-bar');
          if (progressBarDiv.length > 0) progressBarDiv[0].children()[0].width = String(parseInt(100 * that.progress(), 0)) + '%';
        }
      }
    });
    layer.getSource().on(['tileloadend', 'tileloaderror'], function (e) {
      if (e.tile.getState() === 3) {
        console.warn('Loading tile failed for resource \'' + e.tile.src_ + '\'');
      }
      this.loaded = this.loaded ? this.loaded + 1 : 1;
      this.isLoaded = that.updateSourceLoadStatus_(this);
      if (that.loadProgressByTile_) {
        that.loadProgress_[0] += 1;
        if (that.widget === 'progressBar') {
          that.element.value = that.loadProgress_[0];
          var progressBarDiv = this.element.getElementsByClassName('ole-progress-bar');
          if (progressBarDiv.length > 0) {
            progressBarDiv[0].children()[0].width = String(parseInt(100 * that.progress(), 0)) + '%';
          }
        }
        if (that.onCustomProgress) {
          that.onCustomProgress.apply(that, that.loadProgress_);
        }
      }
    });
  };

  Loading.prototype.registerLayersLoadEvents_ = function registerLayersLoadEvents_() {
    var groups = this.getMap().getLayers().getArray();
    for (var i = 0; i < groups.length; i++) {
      var layer = groups[i];
      if (layer instanceof ol.layer.Group) {
        var layers = layer.getLayers().getArray();
        for (var j = 0; j < layers.length; j++) {
          var l = layers[j];
          if (!(l instanceof ol.layer.Vector)) {
            this.tileListeners.push(this.registerLayerLoadEvents_(l));
          }
        }
      } else if (layer instanceof ol.layer.Layer) {
        if (!(layer instanceof ol.layer.Vector)) {
          this.tileListeners.push(this.registerLayerLoadEvents_(layer));
        }
      }
    }
  };

  Loading.prototype.updateLoadStatus_ = function updateLoadStatus_() {
    var loadStatusArray = [];
    var groups = this.getMap().getLayers().getArray();
    for (var i = 0; i < groups.length; i++) {
      var layer = groups[i];
      if (layer) {
        if (layer instanceof ol.layer.Group) {
          var layers = layer.getLayers().getArray();
          for (var j = 0; j < layers.length; j++) {
            var l = layers[j];
            if (l && l.getSource() && !(l instanceof ol.layer.Vector) && l.getSource().hasOwnProperty('isLoaded')) {
              loadStatusArray.push(l.getSource().isLoaded);
            }
          }
        } else if (layer.getSource() && layer.getSource().hasOwnProperty('isLoaded')) {
          loadStatusArray.push(layer.getSource().isLoaded);
        }
      }
    }
    this.loadStatus_ = loadStatusArray.indexOf(false) === -1 && loadStatusArray.indexOf(true) !== -1;
    if (!this.loadProgressByTile_) {
      var count = {};
      loadStatusArray.forEach(function (i) {
        count[i] = (count[i] || 0) + 1;
      });
      var loaded = count[true] ? count[true] : 0;

      if (loaded > this.loadProgress_[0]) {
        this.loadProgress_ = [loaded, loadStatusArray.length];
        if (this.widget === 'progressBar') {
          this.element.max = this.loadProgress_[1];
          this.element.value = this.loadProgress_[0];
        }
        if (this.onCustomProgress) this.onCustomProgress.apply(this, this.loadProgress_);
      }
    }
  };

  Loading.prototype.show = function show() {
    if (this.showPanel) {
      this.element.style.display = 'block';
    }
  };

  Loading.prototype.hide = function hide() {
    if (this.showPanel) {
      this.element.style.display = 'none';
    }
  };

  Loading.prototype.progressDetails = function progressDetails() {
    return this.loadProgress_;
  };

  Loading.prototype.progress = function progress() {
    return this.loadProgress_[0] / this.loadProgress_[1];
  };

  Loading.prototype.setMap = function setMap(map) {
    var _this3 = this;

    if (this.mapListeners && this.mapListeners.length > 0) {
      this.mapListeners.forEach(function (listener) {
        _this3.getMap().unByKey(listener);
      });
    }
    this.mapListeners.length = 0;
    _ol$control$Control.prototype.setMap.call(this, map);
    if (map) {
      this.setup();
    }
  };

  return Loading;
}(ol.control.Control);

var ZoomMenu = function (_ol$control$Control) {
  inherits(ZoomMenu, _ol$control$Control);

  function ZoomMenu() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, ZoomMenu);

    var className = options.className !== undefined ? options.className : 'ole-control-zoom';

    var delta = options.delta !== undefined ? options.delta : 1;

    var element_ = create('div', className + ' ' + BASE_CLASS_NAME.CLASS_UNSELECTABLE);

    var zoomIn = create('span', 'zoom-in', element_);
    zoomIn.setAttribute('title', '放大');
    zoomIn.innerHTML = '+';
    var zoomOut = create('span', 'zoom-out', element_);
    zoomOut.setAttribute('title', '缩小');
    zoomOut.innerHTML = '\u2212';

    var duration_ = options.duration !== undefined ? options.duration : 250;

    var _this = possibleConstructorReturn(this, _ol$control$Control.call(this, {
      element: element_,
      target: options.target
    }));

    _this.set('duration', duration_);
    on(zoomIn, 'click', _this.handleClick_.bind(_this, delta));
    on(zoomOut, 'click', _this.handleClick_.bind(_this, -delta));
    return _this;
  }

  ZoomMenu.prototype.handleClick_ = function handleClick_(delta, event) {
    event.preventDefault();
    this.zoomByDelta_(delta);
  };

  ZoomMenu.prototype.zoomByDelta_ = function zoomByDelta_(delta) {
    var map = this.getMap();
    var view = map.getView();
    if (!view) {
      throw new Error('can not get view!');
    } else {
      var currentResolution = view.getResolution();
      if (currentResolution) {
        var newResolution = view.constrainResolution(currentResolution, delta);
        if (this.get('duration') > 0) {
          if (view.getAnimating()) {
            view.cancelAnimations();
          }
          view.animate({
            resolution: newResolution,
            duration: this.get('duration'),
            easing: ol.easing.easeOut
          });
        } else {
          view.setResolution(newResolution);
        }
      }
    }
  };

  return ZoomMenu;
}(ol.control.Control);

var ScaleLine = function (_ol$control$Control) {
  inherits(ScaleLine, _ol$control$Control);

  function ScaleLine() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, ScaleLine);

    var className = options.className !== undefined ? options.className : 'ole-scale-line-control';

    var element_ = create('div', className + ' ' + BASE_CLASS_NAME.CLASS_UNSELECTABLE);

    var innerElement_ = create('div', className + '-inner', element_);

    var render = options.render ? options.render : ScaleLine.render;

    var _this = possibleConstructorReturn(this, _ol$control$Control.call(this, {
      element: element_,
      render: render,
      target: options.target
    }));

    _this.viewState_ = null;

    _this.minWidth_ = options.minWidth !== undefined ? options.minWidth : 64;

    _this.renderedVisible_ = false;

    _this.renderedWidth_ = undefined;

    _this.renderedHTML_ = '';

    _this.innerElement_ = innerElement_;

    on(_this, 'change:' + ScaleLine.Property_.UNITS, _this.handleUnitsChanged_, _this);
    _this.setUnits(options.units || ScaleLine.ScaleLineUnits.METRIC);
    return _this;
  }

  ScaleLine.prototype.getUnits = function getUnits() {
    return this.get(ScaleLine.Property_.UNITS);
  };

  ScaleLine.prototype.handleUnitsChanged_ = function handleUnitsChanged_() {
    this.updateElement_();
  };

  ScaleLine.prototype.setUnits = function setUnits(units) {
    this.set(ScaleLine.Property_.UNITS, units);
  };

  ScaleLine.prototype.updateElement_ = function updateElement_() {
    var viewState = this.viewState_;
    if (!viewState) {
      if (this.renderedVisible_) {
        this.element.style.display = 'none';
        this.renderedVisible_ = false;
      }
      return;
    }
    var _ref = [viewState.center, viewState.projection],
        center = _ref[0],
        projection = _ref[1];

    var units = this.getUnits();
    var pointResolutionUnits = units === ScaleLine.ScaleLineUnits.DEGREES ? UNITS.DEGREES : UNITS.METERS;
    var pointResolution = ol.proj.getPointResolution(projection, viewState.resolution, center, pointResolutionUnits);
    var nominalCount = this.minWidth_ * pointResolution;
    var suffix = '';
    if (units === ScaleLine.ScaleLineUnits.DEGREES) {
      var metersPerDegree = ol.proj.METERS_PER_UNIT[UNITS.DEGREES];
      if (projection.getUnits() === UNITS.DEGREES) {
        nominalCount *= metersPerDegree;
      } else {
        pointResolution /= metersPerDegree;
      }
      if (nominalCount < metersPerDegree / 60) {
        suffix = '\u2033';
        pointResolution *= 3600;
      } else if (nominalCount < metersPerDegree) {
        suffix = '\u2032';
        pointResolution *= 60;
      } else {
        suffix = '\xB0';
      }
    } else if (units === ScaleLine.ScaleLineUnits.IMPERIAL) {
      if (nominalCount < 0.9144) {
        suffix = 'in';
        pointResolution /= 0.0254;
      } else if (nominalCount < 1609.344) {
        suffix = 'ft';
        pointResolution /= 0.3048;
      } else {
        suffix = 'mi';
        pointResolution /= 1609.344;
      }
    } else if (units === ScaleLine.ScaleLineUnits.NAUTICAL) {
      pointResolution /= 1852;
      suffix = 'nm';
    } else if (units === ScaleLine.ScaleLineUnits.METRIC) {
      if (nominalCount < 0.001) {
        suffix = 'μm';
        pointResolution *= 1000000;
      } else if (nominalCount < 1) {
        suffix = 'mm';
        pointResolution *= 1000;
      } else if (nominalCount < 1000) {
        suffix = 'm';
      } else {
        suffix = 'km';
        pointResolution /= 1000;
      }
    } else if (units === ScaleLine.ScaleLineUnits.US) {
      if (nominalCount < 0.9144) {
        suffix = 'in';
        pointResolution *= 39.37;
      } else if (nominalCount < 1609.344) {
        suffix = 'ft';
        pointResolution /= 0.30480061;
      } else {
        suffix = 'mi';
        pointResolution /= 1609.3472;
      }
    } else if (units === ScaleLine.ScaleLineUnits.CHINESEMETRIC) {
      if (nominalCount < 0.001) {
        suffix = '微米';
        pointResolution *= 1000000;
      } else if (nominalCount < 1) {
        suffix = '毫米';
        pointResolution *= 1000;
      } else if (nominalCount < 1000) {
        suffix = '米';
      } else {
        suffix = '千米';
        pointResolution /= 1000;
      }
    } else {
      ol.asserts.assert(false, 33);
    }

    var i = 3 * Math.floor(Math.log(this.minWidth_ * pointResolution) / Math.log(10));
    var count = undefined,
        width = undefined;

    while (true) {
      count = ScaleLine.LEADING_DIGITS[(i % 3 + 3) % 3] * Math.pow(10, Math.floor(i / 3));
      width = Math.round(count / pointResolution);
      if (isNaN(width)) {
        this.element.style.display = 'none';
        this.renderedVisible_ = false;
        return;
      } else if (width >= this.minWidth_) {
        break;
      }
      ++i;
    }
    var html = count + ' ' + suffix;
    if (this.renderedHTML_ !== html) {
      this.innerElement_.innerHTML = html;
      this.renderedHTML_ = html;
    }
    if (this.renderedWidth_ !== width) {
      this.innerElement_.style.width = width + 'px';
      this.renderedWidth_ = width;
    }
    if (!this.renderedVisible_) {
      this.element.style.display = '';
      this.renderedVisible_ = true;
    }
  };

  return ScaleLine;
}(ol.control.Control);

ScaleLine.render = function (mapEvent) {
  var frameState = mapEvent.frameState;
  if (!frameState) {
    this.viewState_ = null;
  } else {
    this.viewState_ = frameState.viewState;
  }
  this.updateElement_();
};

ScaleLine.LEADING_DIGITS = [1, 2, 5];
ScaleLine.ScaleLineUnits = {
  DEGREES: 'degrees',
  IMPERIAL: 'imperial',
  NAUTICAL: 'nautical',
  METRIC: 'metric',
  CHINESEMETRIC: 'metric_cn',
  US: 'us'
};
ScaleLine.Property_ = {
  UNITS: 'units'
};

var RotateControl = function (_ol$control$Control) {
  inherits(RotateControl, _ol$control$Control);

  function RotateControl() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, RotateControl);

    var className = options.className !== undefined ? options.className : 'ole-rotate-control';
    var element = create('div', className + ' ' + BASE_CLASS_NAME.CLASS_UNSELECTABLE);
    var rButton = create('button', className + '-inner right-button', element);
    var cButton = create('button', className + '-inner center-button', element, className + '-inner-center');
    var lButton = create('button', className + '-inner left-button', element);
    var render = options.render ? options.render : RotateControl.render;

    var _this = possibleConstructorReturn(this, _ol$control$Control.call(this, {
      element: element,
      render: render,
      target: options.target
    }));

    _this.callResetNorth_ = options.resetNorth ? options.resetNorth : undefined;

    _this.duration_ = options.duration !== undefined ? options.duration : 250;

    _this.autoHide_ = options.autoHide !== undefined ? options.autoHide : true;

    _this.rotation_ = undefined;

    _this.label_ = cButton;

    on(rButton, 'click', _this.handleClick_.bind(_this, 'right'));
    on(cButton, 'click', _this.handleClick_.bind(_this, 'center'));
    on(lButton, 'click', _this.handleClick_.bind(_this, 'left'));
    return _this;
  }

  RotateControl.prototype.handleClick_ = function handleClick_(type, event) {
    event.preventDefault();
    this.resetNorth_(type);
  };

  RotateControl.prototype.resetNorth_ = function resetNorth_(type) {
    var rotation = 0;
    if (type === 'center') {
      rotation = 0;
      if (this.callResetNorth_ !== undefined) {
        this.callResetNorth_();
      } else {
        this.rotationView_(rotation, type);
      }
    } else if (type === 'left') {
      rotation = -90;
      this.rotationView_(rotation);
    } else {
      rotation = 90;
      this.rotationView_(rotation);
    }
  };

  RotateControl.prototype.rotationView_ = function rotationView_(rotation, type) {
    var map = this.getMap();
    var view = map.getView();
    var r = type === 'center' ? 0 : view.getRotation() + rotation / 180 * Math.PI;
    if (view && view instanceof ol.View) {
      if (view.getRotation() !== undefined) {
        if (this.duration_ > 0) {
          view.animate({
            rotation: r,
            duration: this.duration_,
            easing: ol.easing.easeOut
          });
        } else {
          view.setRotation(0);
        }
      }
    } else {
      throw new Error('can not get view!');
    }
  };

  return RotateControl;
}(ol.control.Control);

RotateControl.render = function (mapEvent) {
  var frameState = mapEvent.frameState;
  if (!frameState) {
    return;
  }
  var rotation = frameState.viewState.rotation;
  if (rotation !== this.rotation_) {
    var transform = 'rotate(' + rotation + 'rad)';
    if (this.autoHide_) {
      var contains = hasClass(this.element, BASE_CLASS_NAME.CLASS_HIDDEN);
      if (!contains && rotation === 0) {
        addClass(this.element, BASE_CLASS_NAME.CLASS_HIDDEN);
      } else if (contains && rotation !== 0) {
        removeClass(this.element, BASE_CLASS_NAME.CLASS_HIDDEN);
      }
    }
    setStyle(this.label_, {
      transform: transform,
      webkitTransform: transform,
      msTransform: transform
    });
  }
  this.rotation_ = rotation;
};

var OverviewMap = function (_ol$control$Control) {
  inherits(OverviewMap, _ol$control$Control);

  function OverviewMap() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, OverviewMap);

    var className = options.className !== undefined ? options.className : 'ole-overview-map';

    var element = create('div', className + ' ' + BASE_CLASS_NAME.CLASS_UNSELECTABLE);

    var render = options.render ? options.render : OverviewMap.render;

    var _this = possibleConstructorReturn(this, _ol$control$Control.call(this, {
      element: element,
      render: render,
      target: options.target
    }));

    _this.collapsed_ = options.collapsed !== undefined ? options.collapsed : true;

    _this.collapsible_ = options.collapsible !== undefined ? options.collapsible : true;

    if (!_this.collapsible_) {
      _this.collapsed_ = false;
    }

    _this.ovmapDiv_ = create('div', 'ole-overview-map-target', element);

    if (_this.collapsible_) {
      _this.collapsElement_ = create('div', 'ole-overview-map-button', element);
      on(_this.collapsElement_, 'click', _this.handleClick_, _this);
    }

    _this.ovmap_ = new ol.Map({
      controls: new ol.Collection(),
      interactions: new ol.Collection(),
      view: options.view
    });

    _this.addBoxControl_();
    return _this;
  }

  OverviewMap.prototype.addOptionLayers_ = function addOptionLayers_(options) {
    var map = this.ovmap_;
    if (options.layers) {
      options.layers.forEach(function (layer) {
        map.addLayer(layer);
      }, this);
    }
  };

  OverviewMap.prototype.move_ = function move_(event) {
    var overlayBox = this.boxOverlay_.getElement();
    var coordinates = this.ovmap_.getEventCoordinate(OverviewMap.computeDesiredMousePosition(event, overlayBox));
    this.boxOverlay_.setPosition(coordinates);
  };

  OverviewMap.prototype.endMoving_ = function endMoving_(event) {
    var coordinates = this.ovmap_.getEventCoordinate(event);
    this.getMap().getView().setCenter(coordinates);
    off(window, 'mousemove', this.move_, this);
    off(window, 'mouseup', this.endMoving_, this);
  };

  OverviewMap.prototype.addEvent_ = function addEvent_() {
    on(window, 'mousemove', this.move_, this);
    on(window, 'mouseup', this.endMoving_, this);
  };

  OverviewMap.prototype.addBoxControl_ = function addBoxControl_() {
    var box = create('div', 'ole-overview-map-box');
    on(box, 'mousedown', this.addEvent_, this);
    this.boxOverlay_ = new ol.Overlay({
      position: [0, 0],
      positioning: 'bottom-left',
      element: box
    });
    this.ovmap_.addOverlay(this.boxOverlay_);
  };

  OverviewMap.prototype.setMap = function setMap(map) {
    var oldMap = this.getMap();
    if (map === oldMap) {
      return;
    }
    if (oldMap) {
      var oldView = oldMap.getView();
      if (oldView) {
        this.unbindView_(oldView);
      }
      this.ovmap_.setTarget(null);
    }
    _ol$control$Control.prototype.setMap.call(this, map);
    if (map) {
      this.ovmap_.setTarget(this.ovmapDiv_);
      map.on('propertychange', this.handleMapPropertyChange_, this);
      if (this.ovmap_.getLayers().getLength() === 0) {
        this.ovmap_.setLayerGroup(map.getLayerGroup());
      }
      var view = map.getView();
      if (view) {
        this.bindView_(view);
        if (this.isDef(view)) {
          this.ovmap_.updateSize();
          this.resetExtent_();
        }
      }
    }
  };

  OverviewMap.prototype.isDef = function isDef(view) {
    return !!view.getCenter() && view.getResolution() !== undefined;
  };

  OverviewMap.prototype.handleMapPropertyChange_ = function handleMapPropertyChange_(event) {
    if (event.key === 'view') {
      var oldView = event.oldValue;
      if (oldView) {
        this.unbindView_(oldView);
      }
      var newView = this.getMap().getView();
      this.bindView_(newView);
    }
  };

  OverviewMap.prototype.bindView_ = function bindView_(view) {
    view.on('change:rotation', this.handleRotationChanged_, this);
  };

  OverviewMap.prototype.unbindView_ = function unbindView_(view) {
    view.un('change:rotation', this.handleRotationChanged_, this);
  };

  OverviewMap.prototype.handleRotationChanged_ = function handleRotationChanged_() {
    this.ovmap_.getView().setRotation(this.getMap().getView().getRotation());
  };

  OverviewMap.prototype.validateExtent_ = function validateExtent_() {
    var map = this.getMap();
    var ovmap = this.ovmap_;
    var mapSize = map.getSize();
    var view = map.getView();
    var extent = view.calculateExtent(mapSize);
    var ovmapSize = ovmap.getSize();
    var ovview = ovmap.getView();
    var ovextent = ovview.calculateExtent(ovmapSize);
    var topLeftPixel = ovmap.getPixelFromCoordinate(ol.extent.getTopLeft(extent));
    var bottomRightPixel = ovmap.getPixelFromCoordinate(ol.extent.getBottomRight(extent));
    var boxWidth = Math.abs(topLeftPixel[0] - bottomRightPixel[0]);
    var boxHeight = Math.abs(topLeftPixel[1] - bottomRightPixel[1]);
    var ovmapWidth = ovmapSize[0];
    var ovmapHeight = ovmapSize[1];
    if (boxWidth < ovmapWidth * OVERVIEWMAP.MIN_RATIO || boxHeight < ovmapHeight * OVERVIEWMAP.MIN_RATIO || boxWidth > ovmapWidth * OVERVIEWMAP.MAX_RATIO || boxHeight > ovmapHeight * OVERVIEWMAP.MAX_RATIO) {
      this.resetExtent_();
    } else if (!ol.extent.containsExtent(ovextent, extent)) {
      this.recenter_();
    }
  };

  OverviewMap.prototype.resetExtent_ = function resetExtent_() {
    if (OVERVIEWMAP.MAX_RATIO === 0 || OVERVIEWMAP.MIN_RATIO === 0) {
      return;
    }
    var map = this.getMap();
    var ovmap = this.ovmap_;
    var mapSize = map.getSize();
    var view = map.getView();
    var extent = view.calculateExtent(mapSize);
    var ovview = ovmap.getView();
    var steps = Math.log(OVERVIEWMAP.MAX_RATIO / OVERVIEWMAP.MIN_RATIO) / Math.LN2;
    var ratio = 1 / (Math.pow(2, steps / 2) * OVERVIEWMAP.MIN_RATIO);
    this.scaleFromCenter(extent, ratio);
    ovview.fit(extent);
  };

  OverviewMap.prototype.scaleFromCenter = function scaleFromCenter(extent, value) {
    var deltaX = (extent[2] - extent[0]) / 2 * (value - 1);
    var deltaY = (extent[3] - extent[1]) / 2 * (value - 1);
    extent[0] -= deltaX;
    extent[2] += deltaX;
    extent[1] -= deltaY;
    extent[3] += deltaY;
  };

  OverviewMap.prototype.recenter_ = function recenter_() {
    var map = this.getMap();
    var ovmap = this.ovmap_;
    var view = map.getView();
    var ovview = ovmap.getView();
    ovview.setCenter(view.getCenter());
  };

  OverviewMap.prototype.updateBox_ = function updateBox_() {
    var map = this.getMap();
    var ovmap = this.ovmap_;
    var mapSize = map.getSize();
    var view = map.getView();
    var ovview = ovmap.getView();
    var rotation = view.getRotation();
    var overlay = this.boxOverlay_;
    var box = this.boxOverlay_.getElement();
    var extent = view.calculateExtent(mapSize);
    var ovresolution = ovview.getResolution();
    var bottomLeft = ol.extent.getBottomLeft(extent);
    var topRight = ol.extent.getTopRight(extent);
    var rotateBottomLeft = this.calculateCoordinateRotate_(rotation, bottomLeft);
    overlay.setPosition(rotateBottomLeft);
    if (box) {
      setStyle(box, {
        width: Math.abs((bottomLeft[0] - topRight[0]) / ovresolution) + 'px',
        height: Math.abs((topRight[1] - bottomLeft[1]) / ovresolution) + 'px'
      });
    }
  };

  OverviewMap.prototype.calculateCoordinateRotate_ = function calculateCoordinateRotate_(rotation, coordinate) {
    var coordinateRotate = void 0;
    var map = this.getMap();
    var view = map.getView();
    var currentCenter = view.getCenter();
    if (currentCenter) {
      coordinateRotate = [coordinate[0] - currentCenter[0], coordinate[1] - currentCenter[1]];
      ol.coordinate.rotate(coordinateRotate, rotation);
      ol.coordinate.add(coordinateRotate, currentCenter);
    }
    return coordinateRotate;
  };

  OverviewMap.prototype.handleClick_ = function handleClick_(event) {
    event.preventDefault();
    this.handleToggle_(event);
  };

  OverviewMap.prototype.handleToggle_ = function handleToggle_(event) {
    if (this.collapsed_) {
      this.collapsed_ = false;
      event.target.style.backgroundPosition = '-40px -405px';
      this.element.style.width = '17px';
      this.element.style.height = '17px';
    } else {
      this.collapsed_ = true;
      event.target.style.backgroundPosition = '-40px -386px';
      this.element.style.width = '120px';
      this.element.style.height = '120px';
    }
    var ovmap = this.ovmap_;
    if (!this.collapsed_ && !ovmap) {
      ovmap.updateSize();
      this.resetExtent_();
      ovmap.once('postrender', this.updateBox_, this);
    }
  };

  OverviewMap.prototype.getCollapsible = function getCollapsible() {
    return this.collapsible_;
  };

  OverviewMap.prototype.setCollapsible = function setCollapsible(collapsible) {
    if (this.collapsible_ === collapsible) {
      return;
    }
    this.collapsible_ = collapsible;
    if (!collapsible && this.collapsed_) {
      this.handleToggle_();
    }
  };

  OverviewMap.prototype.setCollapsed = function setCollapsed(collapsed) {
    if (!this.collapsible_ || this.collapsed_ === collapsed) {
      return;
    }
    this.handleToggle_();
  };

  OverviewMap.prototype.getCollapsed = function getCollapsed() {
    return this.collapsed_;
  };

  OverviewMap.prototype.getOverviewMap = function getOverviewMap() {
    return this.ovmap_;
  };

  return OverviewMap;
}(ol.control.Control);

OverviewMap.render = function (mapEvent) {
  this.validateExtent_();
  this.updateBox_();
};

OverviewMap.computeDesiredMousePosition = function (mousePosition, overlayBox) {
  return {
    clientX: mousePosition.clientX - overlayBox.offsetWidth / 2,
    clientY: mousePosition.clientY + overlayBox.offsetHeight / 2
  };
};

var MousePosition = function (_ol$control$Control) {
  inherits(MousePosition, _ol$control$Control);

  function MousePosition() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, MousePosition);

    var className_ = options.className !== undefined ? options.className : 'ole-mouse-position';
    var element = create('div', className_ + ' ' + BASE_CLASS_NAME.CLASS_UNSELECTABLE);
    var render = options.render ? options.render : MousePosition.render;

    var _this = possibleConstructorReturn(this, _ol$control$Control.call(this, {
      element: element,
      render: render,
      target: options.target
    }));

    _this.on('change:' + MousePosition.Property_.PROJECTION, _this.handleProjectionChanged_, _this);

    if (options.coordinateFormat) {
      _this.setCoordinateFormat(options.coordinateFormat);
    }
    if (options.projection) {
      _this.setProjection(options.projection);
    }

    if (options.units) {
      _this.setUnits(options.units);
    }

    _this.undefinedHTML_ = options.undefinedHTML !== undefined ? options.undefinedHTML : '';

    _this.renderedHTML_ = element.innerHTML;

    _this.mapProjection_ = null;

    _this.transform_ = null;

    _this.lastMouseMovePixel_ = null;

    _this.followMouse_ = options['followMouse'] === true ? options['followMouse'] : false;

    _this.popver_ = null;

    _this._bounds = null;

    _this.className_ = className_;
    return _this;
  }

  MousePosition.prototype.handleProjectionChanged_ = function handleProjectionChanged_() {
    this.transform_ = null;
  };

  MousePosition.prototype.getCoordinateFormat = function getCoordinateFormat() {
    return this.get(MousePosition.Property_.COORDINATE_FORMAT);
  };

  MousePosition.prototype.getProjection = function getProjection() {
    return this.get(MousePosition.Property_.PROJECTION);
  };

  MousePosition.prototype.handleMouseMove = function handleMouseMove(event) {
    var map = this.getMap();
    if (map) {
      this.lastMouseMovePixel_ = map.getEventPixel(event);
      if (this.lastMouseMovePixel_) {
        if (this.followMouse_) {
          this.followMousePopver_(event);
        } else {
          this.updateHTML_(this.lastMouseMovePixel_);
        }
      }
    }
  };

  MousePosition.prototype.followMousePopver_ = function followMousePopver_() {
    var html = this.getHTML_(this.lastMouseMovePixel_);
    var map = this.getMap();
    var coordinates = map.getCoordinateFromPixel(this.lastMouseMovePixel_);
    if (!this.popver_) {
      var ele = create('div', this.className_ + '_overlay');
      ele.innerHTML = html;
      this.popver_ = new ol.Overlay({
        element: ele,
        offset: [10, 0],
        position: coordinates,
        positioning: 'center-left'
      });
      map.addOverlay(this.popver_);
      map.render();
    } else {
      var _ele = this.popver_.getElement();
      _ele.innerHTML = html;
      if (_ele.offsetWidth >= this._bounds.width - this.lastMouseMovePixel_[0]) {
        this.popver_.setPositioning('center-right');
        this.popver_.setOffset([-10, 0]);
      } else {
        this.popver_.setPositioning('center-left');
        this.popver_.setOffset([10, 0]);
      }
      this.popver_.setPosition(coordinates);
      this.popver_.setElement(_ele);
    }
  };

  MousePosition.prototype.handleMouseOut = function handleMouseOut(event) {
    this.updateHTML_(null);
    this.lastMouseMovePixel_ = null;
  };

  MousePosition.prototype.setMap = function setMap(map) {
    _ol$control$Control.prototype.setMap.call(this, map);
    if (map) {
      var viewport = map.getViewport();
      this._bounds = map.getTargetElement().getBoundingClientRect();
      on(viewport, 'mousemove', this.handleMouseMove, this);
      on(viewport, 'mouseout', this.handleMouseOut, this);
    }
  };

  MousePosition.prototype.setCoordinateFormat = function setCoordinateFormat(format) {
    this.set(MousePosition.Property_.COORDINATE_FORMAT, format);
  };

  MousePosition.prototype.setProjection = function setProjection(projection) {
    this.set(MousePosition.Property_.PROJECTION, ol.proj.get(projection));
  };

  MousePosition.prototype.setUnits = function setUnits(units) {
    this.set(MousePosition.Property_.PROJECTION, units);
  };

  MousePosition.prototype.updateHTML_ = function updateHTML_(pixel) {
    var html = this.getHTML_(pixel);
    if (!this.renderedHTML_ || html !== this.renderedHTML_) {
      this.element.innerHTML = html;
      this.renderedHTML_ = html;
    }
  };

  MousePosition.prototype.getHTML_ = function getHTML_(pixel) {
    var html = this.undefinedHTML_;
    if (pixel && this.mapProjection_) {
      if (!this.transform_) {
        var projection = this.getProjection();
        if (projection) {
          this.transform_ = ol.proj.getTransformFromProjections(this.mapProjection_, projection);
        } else {
          this.transform_ = MousePosition.identityTransform;
        }
      }
      var map = this.getMap();
      var coordinate = map.getCoordinateFromPixel(pixel);
      if (coordinate) {
        this.transform_(coordinate, coordinate);
        var coordinateFormat = this.getCoordinateFormat();
        if (coordinateFormat) {
          html = coordinateFormat(coordinate);
        } else {
          html = MousePosition.Property_.UNITS[0] + '：' + coordinate[0] + ' ' + MousePosition.Property_.UNITS[1] + '：' + coordinate[1];
        }
      }
    }
    return html;
  };

  return MousePosition;
}(ol.control.Control);

MousePosition.Property_ = {
  PROJECTION: 'projection',
  COORDINATE_FORMAT: 'coordinateFormat',
  UNITS: ['经度', '纬度']
};

MousePosition.render = function (mapEvent) {
  var frameState = mapEvent.frameState;
  if (!frameState) {
    this.mapProjection_ = null;
  } else {
    if (this.mapProjection_ !== frameState.viewState.projection) {
      this.mapProjection_ = frameState.viewState.projection;
      this.transform_ = null;
    }
  }
  if (this.getMap() && this.lastMouseMovePixel_) {
    if (this.followMouse_) {
      this.followMousePopver_(this.lastMouseMovePixel_);
    } else {
      this.updateHTML_(this.lastMouseMovePixel_);
    }
  }
};

MousePosition.identityTransform = function (input, output, dimension) {
  if (output !== undefined && input !== output) {
    for (var i = 0, ii = input.length; i < ii; ++i) {
      output[i] = input[i];
    }
    input = output;
  }
  return input;
};

var getAllLayersInternal = function getAllLayersInternal(layers) {
  var _target = [];
  if (layers.length > 0) {
    layers.forEach(function (layer) {
      if (layer instanceof ol.layer.Group) {
        var _layers = layer.getLayers().getArray();
        var _layer = getAllLayersInternal(_layers);
        if (_layer) {
          _target = _target.concat(_layer);
        }
      } else {
        _target.push(layer);
      }
    });
  }
  return _target;
};

var getAllLayers = function getAllLayers(map) {
  var targetLayers = [];
  if (map) {
    var layers = map.getLayers().getArray();
    targetLayers = getAllLayersInternal(layers);
  }
  return targetLayers;
};

var getBaseLayerByLayerName = function getBaseLayerByLayerName(layerName) {
  var currentLayer = null;
  var layers = getLayersArrayByKeyValue('isBaseLayer', true);
  if (layers && layers.length > 0) {
    layers.every(function (layer) {
      if (layer.get('layerName') === layerName) {
        currentLayer = layer;
        return false;
      } else {
        return true;
      }
    });
  }
  return currentLayer;
};

var getBaseLayers = function getBaseLayers() {
  return getLayersArrayByKeyValue('isBaseLayer', true);
};

var getLayerByLayerName = function getLayerByLayerName(map, layerName) {
  var targetLayer = null;
  if (map) {
    var layers = map.getLayers().getArray();
    targetLayer = getLayerInternal(layers, 'layerName', layerName);
  }
  return targetLayer;
};

var getLayerInternal = function getLayerInternal(layers, key, value) {
  var _target = null;
  if (layers.length > 0) {
    layers.every(function (layer) {
      if (layer instanceof ol.layer.Group) {
        var _layers2 = layer.getLayers().getArray();
        _target = getLayerInternal(_layers2, key, value);
        if (_target) {
          return false;
        } else {
          return true;
        }
      } else if (layer.get(key) === value) {
        _target = layer;
        return false;
      } else {
        return true;
      }
    });
  }
  return _target;
};

var getLayersArrayInternal = function getLayersArrayInternal(layers, key, value) {
  var _target = [];
  if (layers.length > 0) {
    layers.forEach(function (layer) {
      if (layer instanceof ol.layer.Group) {
        var _layers3 = layer.getLayers().getArray();
        var _layer = getLayersArrayInternal(_layers3, key, value);
        if (_layer) {
          _target = _target.concat(_layer);
        }
      } else if (layer.get(key) === value) {
        _target.push(layer);
      }
    });
  }
  return _target;
};

var getLayerByKeyValue = function getLayerByKeyValue(map, key, value) {
  var targetLayer = null;
  if (map) {
    var layers = map.getLayers().getArray();
    targetLayer = getLayerInternal(layers, key, value);
  }
  return targetLayer;
};

var getLayersArrayByKeyValue = function getLayersArrayByKeyValue(map, key, value) {
  var targetLayers = [];
  if (map) {
    var layers = map.getLayers().getArray();
    targetLayers = getLayersArrayInternal(layers, key, value);
  }
  return targetLayers;
};

var getLayerByFeature = function getLayerByFeature(map, feature) {
  var targetLayer = void 0;
  if (map && feature instanceof ol.Feature) {
    var layers = map.getLayers().getArray();
    targetLayer = _getLayerByFeatureInternal(layers, feature);
  }
  return targetLayer;
};

var _getLayerByFeatureInternal = function _getLayerByFeatureInternal(layers, feature) {
  var _target = void 0;
  layers.every(function (layer) {
    if (layer && layer instanceof ol.layer.Vector && layer.getSource) {
      var source = layer.getSource();
      if (source.getFeatures) {
        var features = source.getFeatures();
        features.every(function (feat) {
          if (feat === feature) {
            _target = layer;
            return false;
          } else {
            return true;
          }
        });
      }
      return false;
    } else if (layer instanceof ol.layer.Group) {
      var _layers4 = layer.getLayers().getArray();
      _target = _getLayerByFeatureInternal(_layers4, feature);
      if (_target) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  });
  return _target;
};

var createVectorLayer = function createVectorLayer(map, layerName, params) {
  if (map) {
    var vectorLayer = getLayerByLayerName(map, layerName);
    if (!(vectorLayer instanceof ol.layer.Vector)) {
      vectorLayer = null;
    }
    if (!vectorLayer) {
      if (params && params.create) {
        vectorLayer = new ol.layer.Vector({
          layerName: layerName,
          params: params,
          layerType: 'vector',
          source: new ol.source.Vector({
            wrapX: false
          }),
          style: new ol.style.Style({
            fill: new ol.style.Fill({
              color: 'rgba(67, 110, 238, 0.4)'
            }),
            stroke: new ol.style.Stroke({
              color: '#4781d9',
              width: 2
            }),
            image: new ol.style.Circle({
              radius: 7,
              fill: new ol.style.Fill({
                color: '#ffcc33'
              })
            })
          }),
          zIndex: params['zIndex']
        });
      }
    }
    if (map && vectorLayer) {
      if (params && params.hasOwnProperty('selectable')) {
        vectorLayer.set('selectable', params.selectable);
      }

      var _vectorLayer = getLayerByLayerName(map, layerName);
      if (!_vectorLayer || !(_vectorLayer instanceof ol.layer.Vector)) {
        map.addLayer(vectorLayer);
      }
    }
    return vectorLayer;
  }
};



var layerUtils = Object.freeze({
	getBaseLayers: getBaseLayers,
	getAllLayers: getAllLayers,
	getLayerByFeature: getLayerByFeature,
	getBaseLayerByLayerName: getBaseLayerByLayerName,
	getLayerByLayerName: getLayerByLayerName,
	getLayerInternal: getLayerInternal,
	getLayersArrayInternal: getLayersArrayInternal,
	getLayerByKeyValue: getLayerByKeyValue,
	getLayersArrayByKeyValue: getLayersArrayByKeyValue,
	createVectorLayer: createVectorLayer
});

var LayerSwitcher = function (_ol$control$Control) {
  inherits(LayerSwitcher, _ol$control$Control);

  function LayerSwitcher() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, LayerSwitcher);

    var className_ = options.className !== undefined ? options.className : 'ole-layer-switcher';

    var element_ = create('div', className_ + ' ' + BASE_CLASS_NAME.CLASS_UNSELECTABLE);

    var _this = possibleConstructorReturn(this, _ol$control$Control.call(this, {
      element: element_,
      target: options['target']
    }));

    _this.options = options;

    _this.className_ = className_;

    on(element_, 'mouseover', _this.contentMouseOver_, _this);
    on(element_, 'mouseout', _this.contentMouseOut_, _this);

    _this.options['itemWidth'] = _this.options['itemWidth'] === 'number' ? _this.options['itemWidth'] : 86;

    _this.baseLayers_ = [];

    _this.labelLayers_ = [];

    _this.baseLayerKey = _this.options['baseLayerKey'] ? _this.options['baseLayerKey'] : 'isBaseLayer';

    _this.isDefaultKey = _this.options['isDefaultKey'] ? _this.options['isDefaultKey'] : 'isDefault';

    _this.labelAliasKey = _this.options['labelAlias'] ? _this.options['labelAlias'] : 'layerName';

    _this.labelLayerKey = _this.options['labelLayerKey'] ? _this.options['labelLayerKey'] : 'isLabelLayer';

    _this.isActionSelected_ = false;

    _this.forcedUpdate = _this.options['forcedUpdate'];

    _this.options['itemHeight'] = typeof _this.options['itemHeight'] === 'number' ? _this.options['itemHeight'] : 60;

    _this.options['key'] = _this.options['key'] ? _this.options['key'] : 'layerName';
    if (_this.labelLayerKey === _this.baseLayerKey) {
      throw new Error('标注图层关键字不能和底图相同！');
    }

    _this.innerElement_ = create('ul', className_ + '-ul-inner', element_, className_ + '-ul-inner');

    if (_this.options['layers'] && Array.isArray(_this.options['layers']) && _this.options['layers'].length > 0) {
      _this.initDomInternal(_this.options['layers'], className_, _this.options['key']);
    } else {
      _this.element.style.display = 'none';
    }
    return _this;
  }

  LayerSwitcher.prototype.initDomInternal = function initDomInternal(layers, className, key) {
    var _this2 = this;

    var width = this.options['itemWidth'];
    var height = this.options['itemHeight'];
    var length = layers.length;
    this.innerElement_.style.width = width + (length - 1) * 10 + 'px';
    this.innerElement_.style.height = height + 'px';
    layers.forEach(function (item, index) {
      if (item && item[key]) {
        var li_ = create('li', className + '-li-inner', _this2.innerElement_, className + '-li' + index + '-inner');
        setStyle(li_, {
          background: 'url(' + item['icon'] + ') 0px 0px no-repeat',
          width: width + 'px',
          height: height + 'px',
          zIndex: index + 1,
          right: '0px',
          marginRight: (length - 1 - index) * 10 + 'px'
        });
        li_.setAttribute('data-name', item[key]);
        on(li_, 'click', _this2.handleClick_, _this2);
        if (item['name']) {
          var name_ = create('span', 'layer-name', li_);
          name_.setAttribute('data-name', item[key]);
          name_.innerHTML = item['name'];
        }
        if (!_this2.isActionSelected_) {
          if (item[_this2.isDefaultKey]) {
            addClass(li_, 'selected-item');
            _this2.isActionSelected_ = true;
          }
        }
        if (!_this2.isActionSelected_ && index === length - 1) {
          addClass(li_, 'selected-item');
          _this2.isActionSelected_ = true;
        }
      }
    });
  };

  LayerSwitcher.prototype.contentMouseOver_ = function contentMouseOver_(event) {
    var length = this.options['layers'].length;
    if (length > 0) {
      for (var i = 0; i < length - 1; i++) {
        var item = getElement(this.className_ + '-li' + i + '-inner');
        if (item) {
          setStyle(item, {
            marginRight: '0px',
            zIndex: '',
            right: (length - 1 - i) * (10 + this.options['itemWidth']) + 'px'
          });
        }
      }
      setStyle(this.innerElement_, 'width', this.options['itemWidth'] * length + 10 * (length - 1) + 'px');
    }
  };

  LayerSwitcher.prototype.contentMouseOut_ = function contentMouseOut_(event) {
    var length = this.options['layers'].length;
    if (length > 0) {
      for (var i = 0; i < length - 1; i++) {
        var item = getElement(this.className_ + '-li' + i + '-inner');
        if (item) {
          setStyle(item, {
            marginRight: (length - 1 - i) * 10 + 'px',
            zIndex: i + 1,
            right: '0px'
          });
        }
      }
      setStyle(this.innerElement_, 'width', this.options['itemWidth'] + (length - 1) * 10 + 'px');
    }
  };

  LayerSwitcher.prototype.handleClick_ = function handleClick_(event) {
    var value = event.target.getAttribute('data-name');
    this.switcher(this.options['key'], value);
  };

  LayerSwitcher.prototype.updateBaseLayer_ = function updateBaseLayer_() {
    if (!this.getMap()) return;
    this.baseLayers_ = getLayersArrayByKeyValue(this.getMap(), this.baseLayerKey, true);
    this.labelLayers_ = getLayersArrayByKeyValue(this.getMap(), this.labelLayerKey, true);
    if (this.baseLayers_ && this.baseLayers_.length > 0) {
      this.baseLayers_.filter(function (_item) {
        return !!_item;
      });
    }
    if (this.labelLayers_ && this.labelLayers_.length > 0) {
      this.labelLayers_.filter(function (_item) {
        return !!_item;
      });
    }
  };

  LayerSwitcher.prototype.switcher = function switcher(key, value) {
    var _this3 = this;

    if (this.forcedUpdate) {
      this.updateBaseLayer_();
    }
    if (this.baseLayers_.length > 0 && this.baseLayers_.length === this.options['layers'].length) {
      if (this.labelLayers_ && this.labelLayers_.length > 0) {
        this.labelLayers_.forEach(function (labelLayer) {
          if (labelLayer && labelLayer.get(_this3.labelAliasKey) === value) {
            labelLayer.setVisible(true);
          } else {
            labelLayer.setVisible(false);
          }
        });
      }
      this.baseLayers_.forEach(function (layer) {
        if (layer && layer.get(key) === value) {
          layer.setVisible(true);
          layer.set(_this3.isDefaultKey, true);
        } else {
          layer.setVisible(false);
          layer.set(_this3.isDefaultKey, false);
        }
      });
      var length = this.options['layers'].length;
      if (length > 0) {
        for (var i = 0; i < length; i++) {
          var item = getElement(this.className_ + '-li' + i + '-inner');
          if (item && item.getAttribute('data-name') === value) {
            addClass(item, 'selected-item');
          } else {
            removeClass(item, 'selected-item');
          }
        }
      }
    } else {
      throw new Error('请检查是否存在底图获取底图数量是否和配置相同！');
    }
  };

  LayerSwitcher.prototype.setMap = function setMap(map) {
    _ol$control$Control.prototype.setMap.call(this, map);
    if (map && map instanceof ol.Map) {
      this.updateBaseLayer_();
    }
  };

  return LayerSwitcher;
}(ol.control.Control);

var ContextMenu = function (_ol$control$Control) {
  inherits(ContextMenu, _ol$control$Control);

  function ContextMenu() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, ContextMenu);

    var className_ = options.className !== undefined ? options.className : 'ole-context-menu-content';

    var element_ = create('div', className_ + ' ' + BASE_CLASS_NAME.CLASS_UNSELECTABLE);
    setStyle(element_, 'display', 'none');

    var _this = possibleConstructorReturn(this, _ol$control$Control.call(this, {
      element: element_,
      target: options['target']
    }));

    _this.options = options;

    _this.className_ = className_;

    _this.mapContent = null;

    _this.pixel = [];

    _this.itemWidth = typeof _this.options['itemWidth'] === 'number' ? _this.options['itemWidth'] : 160;

    _this.itemHeight = typeof _this.options['itemHeight'] === 'number' ? _this.options['itemHeight'] : 30;
    return _this;
  }

  ContextMenu.prototype.initDomInternal = function initDomInternal(items) {
    this.htmlUtils(items, '', this.element);
    if (this.getMap()) {
      this.mapContent = this.getMap().getViewport();
      on(this.mapContent, 'contextmenu', this.mouseDownHandle_, this);
    }
  };

  ContextMenu.prototype.mouseDownHandle_ = function mouseDownHandle_(event) {
    var _this2 = this;

    var that = this;
    stopPropagation(event);
    preventDefault(event);
    if (event.button === 2) {
      that.pixel = this.getMap().getEventPixel(event);
      that.dispatchEvent({
        type: 'before-show',
        target: this,
        event: event
      });
      window.setTimeout(function () {
        that.show(that.pixel);
        that.dispatchEvent({
          type: 'show',
          target: _this2,
          event: event
        });
      }, 50);
    }
    on(event.target, 'mousedown', function () {
      that.hide();
      that.dispatchEvent({
        type: 'hide',
        target: this,
        event: event
      });
    }, this, true);
  };

  ContextMenu.prototype.show = function show(position) {
    setStyle(this.element, {
      display: 'block',
      top: position[1] + 'px',
      left: position[0] + 'px'
    });
    var aDoc = this.getMap().getSize();
    var maxWidth = aDoc[0] - this.element.offsetWidth;
    var maxHeight = aDoc[1] - this.element.offsetHeight;
    if (this.element.offsetTop > maxHeight) {
      setStyle(this.element, {
        top: maxHeight + 'px'
      });
    }
    if (this.element.offsetLeft > maxWidth) {
      setStyle(this.element, {
        left: maxWidth + 'px'
      });
    }
  };

  ContextMenu.prototype.hide = function hide() {
    this.element.style.display = 'none';
    this.pixel = [];
  };

  ContextMenu.prototype.htmlUtils = function htmlUtils(items, index, content, isOffset) {
    var _this3 = this;

    var ulList = null;
    if (items && Array.isArray(items) && items.length > 0) {
      ulList = create('ul', this.className_ + '-ul' + index + '-inner', content, this.className_ + '-ul' + index + '-inner');
      if (isOffset) {
        setStyle(ulList, {
          position: 'absolute',
          top: '0px',
          left: this.itemWidth + 20 + 'px'
        });
      }
      items.forEach(function (item, index_) {
        if (item && item['name'] && item['alias']) {
          var numList = index + '-' + index_;
          var li_ = create('li', _this3.className_ + '-li-' + numList + '-inner', ulList, _this3.className_ + '-li-' + numList + '-inner');
          setStyle(li_, {
            width: _this3.itemWidth + 'px',
            height: _this3.itemHeight + 'px',
            lineHeight: _this3.itemHeight + 'px'
          });
          li_.setAttribute('data-name', item['alias']);
          on(li_, 'click', _this3.handleItemClick_.bind(_this3, item), _this3);
          if (item['icon']) {
            var span_ = create('span', 'li-icon-content', li_);
            if (item['iconType'] === 'iconfont') {
              var fontName = item['fontName'] ? item['fontName'] : 'iconfont';
              addClass(span_, fontName + ' ' + item['icon']);
              if (item['iconColor']) {
                span_.style.color = item['iconColor'];
              }
            } else {
              span_.style.background = 'url(' + item['icon'] + ') 0px 0px no-repeat';
            }
          }
          var name_ = create('span', 'li-name-content', li_);
          name_.innerHTML = item['name'];
          if (item['showLine']) {
            li_.style.borderBottom = '1px solid #CCCCCC';
          }
          if (item['items']) {
            _this3.htmlUtils(item['items'], numList, li_, true);
            on(li_, 'mouseenter', _this3.handleItemMouseOver_, _this3);
            on(li_, 'mouseleave', _this3.handleItemMouseOut_, _this3);
          }
        }
      });
    }
    return ulList;
  };

  ContextMenu.prototype.updateElement_ = function updateElement_(type, item, items) {
    var child_ = getElement(this.className_ + '-ul' + '-inner');
    var cloneItems = cloneDeep(this.options['items']);
    var afterItems = null;
    switch (type) {
      case 'pop':
        this.element.removeChild(child_);
        afterItems = cloneItems.pop();
        this.htmlUtils(cloneItems, '', this.element);
        break;
      case 'push':
        this.element.removeChild(child_);
        afterItems = cloneItems = cloneItems.push(item);
        this.htmlUtils(cloneItems, '', this.element);
        break;
      case 'shift':
        this.element.removeChild(child_);
        afterItems = cloneItems.shift();
        this.htmlUtils(cloneItems, '', this.element);
        break;
      case 'unshift':
        this.element.removeChild(child_);
        afterItems = cloneItems = cloneItems.unshift(item);
        this.htmlUtils(cloneItems, '', this.element);
        break;
      case 'reverse':
        this.element.removeChild(child_);
        afterItems = cloneItems.reverse();
        this.htmlUtils(cloneItems, '', this.element);
        break;
      default:
        this.element.removeChild(child_);
        afterItems = items;
        this.htmlUtils(items, '', this.element);
    }
    return afterItems;
  };

  ContextMenu.prototype.getCurrentPixel = function getCurrentPixel() {
    return this.pixel;
  };

  ContextMenu.prototype.getCurrentCoordinates = function getCurrentCoordinates() {
    return this.getMap().getCoordinateFromPixel(this.getCurrentPixel());
  };

  ContextMenu.prototype.handleItemClick_ = function handleItemClick_(item, event) {
    var _this4 = this;

    stopPropagation(event);
    if (item && item['callback'] && typeof item['callback'] === 'function') {
      item['callback']({
        type: 'item-click',
        target: this,
        event: event,
        source: item,
        pixel: this.getCurrentPixel(),
        coordinates: this.getCurrentCoordinates()
      });
    }
    this.dispatchEvent({
      type: 'item-click',
      event: event,
      source: item,
      pixel: this.getCurrentPixel(),
      coordinates: this.getCurrentCoordinates()
    });
    window.setTimeout(function () {
      _this4.hide();
    }, 50);
  };

  ContextMenu.prototype.handleItemMouseOver_ = function handleItemMouseOver_(event) {
    stopPropagation(event);
    if (event.target && event.target.childNodes) {
      var elements = Array.prototype.slice.call(event.target.childNodes, 0);
      if (elements && elements.length > 0) {
        elements.every(function (ele) {
          if (ele && ele.nodeName.toLowerCase() === 'ul') {
            ele.style.display = 'block';
            return false;
          } else {
            return true;
          }
        });
      }
    }
  };

  ContextMenu.prototype.handleItemMouseOut_ = function handleItemMouseOut_(event) {
    stopPropagation(event);
    if (event.target && event.target.childNodes) {
      var elements = Array.prototype.slice.call(event.target.childNodes, 0);
      if (elements && elements.length > 0) {
        elements.every(function (ele) {
          if (ele && ele.nodeName.toLowerCase() === 'ul') {
            ele.style.display = 'none';
            return false;
          } else {
            return true;
          }
        });
      }
    }
  };

  ContextMenu.prototype.setMap = function setMap(map) {
    _ol$control$Control.prototype.setMap.call(this, map);
    if (map && map instanceof ol.Map) {
      this.initDomInternal(this.options['items']);
    }
  };

  ContextMenu.prototype.pop = function pop() {
    return this.updateElement_('pop');
  };

  ContextMenu.prototype.push = function push(item) {
    if (item && (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object') {
      return this.updateElement_('push', item);
    } else {
      throw new Error('传入的不是对象');
    }
  };

  ContextMenu.prototype.shift = function shift() {
    return this.updateElement_('shift');
  };

  ContextMenu.prototype.reverse = function reverse() {
    return this.updateElement_('reverse');
  };

  ContextMenu.prototype.unshift = function unshift(item) {
    if (item && (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object') {
      return this.updateElement_('unshift', item);
    } else {
      throw new Error('传入的不是对象');
    }
  };

  ContextMenu.prototype.update = function update(items) {
    if (items && Array.isArray(items) && items.length > 0) {
      this.updateElement_('', '', items);
    } else {
      throw new Error('传入的数组有误！');
    }
  };

  ContextMenu.prototype.updateOption = function updateOption(items) {
    if (items && Array.isArray(items) && items.length > 0) {
      this.options['items'] = items;
      this.updateElement_('', '', items);
    } else {
      throw new Error('传入的数组有误！');
    }
  };

  return ContextMenu;
}(ol.control.Control);

var CompareLayer = function (_ol$control$Control) {
  inherits(CompareLayer, _ol$control$Control);

  function CompareLayer(beforeMap, afterMap) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck(this, CompareLayer);

    var className = options.className !== undefined ? options.className : 'ole-control-compare';

    var element_ = create('div', className + ' ' + BASE_CLASS_NAME.CLASS_UNSELECTABLE);

    var innerElement_ = create('div', className + '-inner', element_);

    var _this = possibleConstructorReturn(this, _ol$control$Control.call(this, {
      element: element_,
      target: options['target']
    }));

    if (beforeMap && afterMap) {
      _this.beforeMap = beforeMap;
      _this.afterMap = afterMap;
    } else {
      throw new Error('图层必须传入！');
    }

    _this.orderLayerZindex();

    _this.initPosition = options['initPosition'] !== undefined ? options['initPosition'] : 0.5;

    _this.dragging_ = false;

    _this.previousX_ = null;

    _this.previousY_ = null;

    on(innerElement_, 'pointerdown', _this.handleDraggerStart_, _this);
    on(innerElement_, 'pointermove', _this.handleDraggerDrag_, _this);
    on(innerElement_, 'pointerup', _this.handleDraggerEnd_, _this);
    on(window, 'pointerup', _this.handleDraggerEnd_, _this);
    return _this;
  }

  CompareLayer.prototype.initControl = function initControl() {
    if (!this.getMap()) return;
    this._bounds = this.getMap().getTargetElement().getBoundingClientRect();
    this.percent = 0.5;
    this._setPosition(this._bounds.width, this._bounds.width / 2);
    this.getMap().on('change:size', this.resize, this);
    this.clipLayer();
  };

  CompareLayer.prototype.handleDraggerStart_ = function handleDraggerStart_(event) {
    if (!this.dragging_ && event.target) {
      this.previousX_ = event.clientX;
      this.previousY_ = event.clientY;
      this.dragging_ = true;
    }
  };

  CompareLayer.prototype.handleDraggerDrag_ = function handleDraggerDrag_(event) {
    if (this.dragging_) {
      this._bounds = this.getMap().getTargetElement().getBoundingClientRect();
      this._setPosition(this._bounds.width, this._getX(event));
      this.previousX_ = event.clientX;
      this.previousY_ = event.clientY;
    }
  };

  CompareLayer.prototype.handleDraggerEnd_ = function handleDraggerEnd_(event) {
    if (this.dragging_) {
      this.dragging_ = false;
      this.previousX_ = undefined;
      this.previousY_ = undefined;
    }
  };

  CompareLayer.prototype.clipLayer = function clipLayer() {
    var that = this;
    this.getMap().un('precompose', this.precompose);
    this.getMap().un('postcompose', this.postcompose);
    this.precompose = this.beforeMap.on('precompose', function (event) {
      var ctx = event.context;
      var width = ctx.canvas.width * that.initPosition;
      ctx.save();
      ctx.beginPath();
      ctx.rect(width, 0, ctx.canvas.width - width, ctx.canvas.height);
      ctx.clip();
    });
    this.postcompose = this.beforeMap.on('postcompose', function (event) {
      var ctx = event.context;
      ctx.restore();
    });
  };

  CompareLayer.prototype._setPosition = function _setPosition(sourceWidth, value) {
    var pos = 'translate(' + value + 'px, 0)';
    this.element.style.transform = pos;
    this.element.style.WebkitTransform = pos;
    this._x = value;
    this.percent = value / sourceWidth;
    this.initPosition = value / sourceWidth;
    this.getMap().render();
  };

  CompareLayer.prototype.resize = function resize() {
    this._bounds = this.getMap().getTargetElement().getBoundingClientRect();
    this._setPosition(this._bounds.width, this._bounds.width * this.percent);
  };

  CompareLayer.prototype._getX = function _getX(e) {
    e = e.touches ? e.touches[0] : e;
    var x = e.clientX - this._bounds.left;
    if (x < 0) x = 0;
    if (x > this._bounds.width) x = this._bounds.width;
    return x;
  };

  CompareLayer.prototype.setMap = function setMap(map) {
    _ol$control$Control.prototype.setMap.call(this, map);
    if (map && map instanceof ol.Map) {
      map.render();
      this.initControl();
    }
  };

  CompareLayer.prototype.setBeforeLayet = function setBeforeLayet(beforeMap) {
    if (beforeMap) {
      this.beforeMap = beforeMap;
      this.orderLayerZindex();
    } else {
      throw Error('设置图层错误！');
    }
  };

  CompareLayer.prototype.setAfterLayer = function setAfterLayer(afterMap) {
    if (afterMap) {
      this.afterMap = afterMap;
      this.orderLayerZindex();
    } else {
      throw Error('设置图层错误！');
    }
  };

  CompareLayer.prototype.orderLayerZindex = function orderLayerZindex() {
    if (this.afterMap && this.beforeMap) {
      var afterMapIndex = this.afterMap.getZIndex();
      var beforeMapIndex = this.beforeMap.getZIndex();
      var max = Math.max(afterMapIndex, beforeMapIndex);
      var min = Math.min(afterMapIndex, beforeMapIndex);
      if (max === min) {
        max = max + 1;
      }
      this.beforeMap.setZIndex(max);
      this.afterMap.setZIndex(min);
    }
  };

  return CompareLayer;
}(ol.control.Control);

var ZoomSlider = function (_ol$control$Control) {
  inherits(ZoomSlider, _ol$control$Control);

  function ZoomSlider() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, ZoomSlider);

    var className = options.className !== undefined ? options.className : 'ole-zoom-slider';

    var element = create('div', className + ' ' + BASE_CLASS_NAME.CLASS_UNSELECTABLE);

    var translateContent = create('div', 'ole-zoom-slider-translate-content' + ' ' + BASE_CLASS_NAME.CLASS_SELECTABLE, element);

    var silderContent = create('div', 'ole-zoom-slider-content' + ' ' + BASE_CLASS_NAME.CLASS_SELECTABLE, element);

    var translateN = create('div', 'ole-zoom-slider-button ole-zoom-slider-translate-n' + ' ' + BASE_CLASS_NAME.CLASS_SELECTABLE, translateContent);
    translateN.setAttribute('title', '向上平移');
    var translateS = create('div', 'ole-zoom-slider-button ole-zoom-slider-translate-s' + ' ' + BASE_CLASS_NAME.CLASS_SELECTABLE, translateContent);
    translateS.setAttribute('title', '向下平移');
    var translateW = create('div', 'ole-zoom-slider-button ole-zoom-slider-translate-w' + ' ' + BASE_CLASS_NAME.CLASS_SELECTABLE, translateContent);
    translateW.setAttribute('title', '向左平移');
    var translateE = create('div', 'ole-zoom-slider-button ole-zoom-slider-translate-e' + ' ' + BASE_CLASS_NAME.CLASS_SELECTABLE, translateContent);
    translateE.setAttribute('title', '向右平移');
    var zoomIn = create('div', 'ole-zoom-slider-zoom-in' + ' ' + BASE_CLASS_NAME.CLASS_SELECTABLE, silderContent);
    zoomIn.setAttribute('title', '放大');
    var zoomOut = create('div', 'ole-zoom-slider-zoom-out' + ' ' + BASE_CLASS_NAME.CLASS_SELECTABLE, silderContent);
    zoomOut.setAttribute('title', '缩小');
    var slider = create('div', 'ole-zoom-slider-zoom-slider' + ' ' + BASE_CLASS_NAME.CLASS_SELECTABLE, silderContent);
    create('div', 'slider-background-top' + ' ' + BASE_CLASS_NAME.CLASS_SELECTABLE, slider);
    var sliderBackgroundBottom = create('div', 'slider-background-bottom' + ' ' + BASE_CLASS_NAME.CLASS_SELECTABLE, slider);
    var sliderBackgroundMask = create('div', 'slider-background-mask' + ' ' + BASE_CLASS_NAME.CLASS_SELECTABLE, slider);
    sliderBackgroundMask.setAttribute('title', '缩放到此级别');
    var sliderBar = create('div', 'slider-bar' + ' ' + BASE_CLASS_NAME.CLASS_SELECTABLE, slider, 'slider-bar');
    sliderBar.setAttribute('title', '滑动缩放地图');
    var render = options['render'] ? options['render'] : ZoomSlider.render;

    var _this = possibleConstructorReturn(this, _ol$control$Control.call(this, {
      element: element,
      render: render,
      target: options['target']
    }));

    _this.currentResolution_ = undefined;

    _this.direction_ = ZoomSlider.Direction_.VERTICAL;

    _this.dragging_ = false;

    _this.heightLimit_ = 0;

    _this.widthLimit_ = 0;

    _this.previousX_ = null;

    _this.previousY_ = null;

    _this.thumbSize_ = null;

    _this.sliderInitialized_ = false;

    _this.duration_ = options['duration'] !== undefined ? options['duration'] : 200;

    _this.viewHint = {
      ANIMATING: 0,
      INTERACTING: 1
    };

    _this.pixelDelta_ = options['pixelDelta'] !== undefined ? options['pixelDelta'] : 128;

    _this.silderContent = silderContent;

    _this.sliderBackgroundBottom = sliderBackgroundBottom;

    on(translateN, 'click', _this.handletranslateClick_.bind(_this, 'translateN'), _this);
    on(translateS, 'click', _this.handletranslateClick_.bind(_this, 'translateS'), _this);
    on(translateW, 'click', _this.handletranslateClick_.bind(_this, 'translateW'), _this);
    on(translateE, 'click', _this.handletranslateClick_.bind(_this, 'translateE'), _this);
    on(zoomIn, 'click', _this.handleZoomClick_.bind(_this, 1), _this);
    on(zoomOut, 'click', _this.handleZoomClick_.bind(_this, -1), _this);
    on(silderContent, 'pointerdown', _this.handleDraggerStart_, _this);
    on(silderContent, 'pointermove', _this.handleDraggerDrag_, _this);
    on(silderContent, 'pointerup', _this.handleDraggerEnd_, _this);
    on(silderContent, 'click', _this.handleContainerClick_, _this);
    on(sliderBar, 'click', stopPropagation);
    return _this;
  }

  ZoomSlider.prototype.handleZoomClick_ = function handleZoomClick_(delta, event) {
    preventDefault(event);
    this.zoomByDelta_(delta);
  };

  ZoomSlider.prototype.handletranslateClick_ = function handletranslateClick_(type, event) {
    preventDefault(event);
    var view = this.getMap().getView();
    var mapUnitsDelta = view.getResolution() * this.pixelDelta_;
    var deltaX = 0,
        deltaY = 0;

    switch (type) {
      case 'translateN':
        deltaY = mapUnitsDelta;
        break;
      case 'translateS':
        deltaY = -mapUnitsDelta;
        break;
      case 'translateW':
        deltaX = mapUnitsDelta;
        break;
      case 'translateE':
        deltaX = -mapUnitsDelta;
        break;
    }
    var delta = [deltaX, deltaY];
    ol.coordinate.rotate(delta, view.getRotation());
    this.pan(view, delta, this.duration_);
  };

  ZoomSlider.prototype.pan = function pan(view, delta, optDuration) {
    var currentCenter = view.getCenter();
    if (currentCenter) {
      var center = view.constrainCenter([currentCenter[0] + delta[0], currentCenter[1] + delta[1]]);
      if (optDuration) {
        view.animate({
          duration: optDuration,
          easing: ol.easing.linear,
          center: center
        });
      } else {
        view.setCenter(center);
      }
    }
  };

  ZoomSlider.prototype.zoomByDelta_ = function zoomByDelta_(delta) {
    var view = this.getMap().getView();
    if (view && view instanceof ol.View) {
      var currentResolution = view.getResolution();
      if (currentResolution) {
        var newResolution = view.constrainResolution(currentResolution, delta);
        if (this.duration_ > 0) {
          if (view.getAnimating()) {
            view.cancelAnimations();
          }
          view.animate({
            resolution: newResolution,
            duration: this.duration_,
            easing: ol.easing.easeOut
          });
        } else {
          view.setResolution(newResolution);
        }
      }
    }
  };

  ZoomSlider.prototype.setMap = function setMap(map) {
    _ol$control$Control.prototype.setMap.call(this, map);
    if (map) {
      map.render();
    }
  };

  ZoomSlider.prototype.disposeInternal = function disposeInternal() {
    on(this.silderContent, 'pointercancel', function (event) {}, this);
    _ol$control$Control.prototype.disposeInternal.call(this);
  };

  ZoomSlider.prototype.initSlider_ = function initSlider_() {
    var container = this.silderContent;
    var containerSize = {
      width: container.offsetWidth, height: container.offsetHeight
    };
    var thumb = getElement('slider-bar');
    var thumbWidth = thumb.offsetWidth + parseFloat(getStyle(thumb, 'marginRight')) + parseFloat(getStyle(thumb, 'marginLeft'));
    var thumbHeight = thumb.offsetHeight + parseFloat(getStyle(thumb, 'marginTop')) + parseFloat(getStyle(thumb, 'marginBottom'));
    this.thumbSize_ = [thumbWidth, thumbHeight];
    if (containerSize.width > containerSize.height) {
      this.direction_ = ZoomSlider.Direction_.HORIZONTAL;
      this.widthLimit_ = containerSize.width - thumbWidth;
    } else {
      this.direction_ = ZoomSlider.Direction_.VERTICAL;
      this.heightLimit_ = containerSize.height - thumbHeight;
    }
    this.sliderInitialized_ = true;
  };

  ZoomSlider.prototype.handleContainerClick_ = function handleContainerClick_(event) {
    var view = this.getMap().getView();
    var relativePosition = this.getRelativePosition_(event.offsetX - this.thumbSize_[0] / 2, event.offsetY - this.thumbSize_[1] / 2);
    var resolution = this.getResolutionForPosition_(relativePosition);
    view.animate({
      resolution: view.constrainResolution(resolution),
      duration: this.duration_,
      easing: ol.easing.easeOut
    });
  };

  ZoomSlider.prototype.handleDraggerStart_ = function handleDraggerStart_(event) {
    if (!this.dragging_ && event.target === getElement('slider-bar')) {
      this.previousX_ = event.clientX;
      this.previousY_ = event.clientY;
      this.dragging_ = true;
    }
  };

  ZoomSlider.prototype.handleDraggerDrag_ = function handleDraggerDrag_(event) {
    if (this.dragging_) {
      var element = getElement('slider-bar');
      var deltaX = event.clientX - this.previousX_ + parseInt(element.style.left, 10);
      var deltaY = event.clientY - this.previousY_ + parseInt(element.style.top, 10);
      var relativePosition = this.getRelativePosition_(deltaX, deltaY);
      this.currentResolution_ = this.getResolutionForPosition_(relativePosition);
      this.getMap().getView().setResolution(this.currentResolution_);
      this.setThumbPosition_(this.currentResolution_);
      this.previousX_ = event.clientX;
      this.previousY_ = event.clientY;
    }
  };

  ZoomSlider.prototype.handleDraggerEnd_ = function handleDraggerEnd_(event) {
    if (this.dragging_) {
      var view = this.getMap().getView();
      view.animate({
        resolution: view.constrainResolution(this.currentResolution_),
        duration: this.duration_,
        easing: ol.easing.easeOut
      });
      this.dragging_ = false;
      this.previousX_ = undefined;
      this.previousY_ = undefined;
    }
  };

  ZoomSlider.prototype.setThumbPosition_ = function setThumbPosition_(res) {
    var position = this.getPositionForResolution_(res);
    var thumb = getElement('slider-bar');
    if (this.direction_ === ZoomSlider.Direction_.HORIZONTAL) {
      thumb.style.left = this.widthLimit_ * position + 'px';
      this.sliderBackgroundBottom.style.width = this.widthLimit_ - (this.widthLimit_ * position - 5) + 'px';
    } else {
      thumb.style.top = this.heightLimit_ * position + 'px';
      this.sliderBackgroundBottom.style.height = this.heightLimit_ - (this.heightLimit_ * position - 5) + 'px';
    }
  };

  ZoomSlider.prototype.getRelativePosition_ = function getRelativePosition_(x, y) {
    var amount = void 0;
    if (this.direction_ === ZoomSlider.Direction_.HORIZONTAL) {
      amount = x / this.widthLimit_;
    } else {
      amount = y / this.heightLimit_;
    }
    return Math.min(Math.max(amount, 0), 1);
  };

  ZoomSlider.prototype.getResolutionForPosition_ = function getResolutionForPosition_(position) {
    var view = this.getMap().getView();
    if (view && view instanceof ol.View) {
      return this.getResolutionForValueFunction(1 - position);
    }
  };

  ZoomSlider.prototype.getValueForResolutionFunction = function getValueForResolutionFunction(resolution, optPower) {
    var power = optPower || 2;
    var view = this.getMap().getView();
    var maxResolution = view.getMaxResolution();
    var minResolution = view.getMinResolution();
    var max = Math.log(maxResolution / minResolution) / Math.log(power);
    return Math.log(maxResolution / resolution) / Math.log(power) / max;
  };

  ZoomSlider.prototype.getResolutionForValueFunction = function getResolutionForValueFunction(value, optPower) {
    var power = optPower || 2;
    var view = this.getMap().getView();
    var maxResolution = view.getMaxResolution();
    var minResolution = view.getMinResolution();
    var max = Math.log(maxResolution / minResolution) / Math.log(power);
    return maxResolution / Math.pow(power, value * max);
  };

  ZoomSlider.prototype.getPositionForResolution_ = function getPositionForResolution_(res) {
    var view = this.getMap().getView();
    if (view && view instanceof ol.View) {
      return 1 - this.getValueForResolutionFunction(res);
    }
  };

  return ZoomSlider;
}(ol.control.Control);

ZoomSlider.render = function (mapEvent) {
  if (!mapEvent.frameState) {
    return;
  }
  if (!this.sliderInitialized_) {
    this.initSlider_();
  }
  var res = mapEvent.frameState.viewState.resolution;
  if (res !== this.currentResolution_) {
    this.currentResolution_ = res;
    this.setThumbPosition_(res);
  }
};

ZoomSlider.Direction_ = {
  VERTICAL: 0,
  HORIZONTAL: 1
};



var index$3 = Object.freeze({
	Loading: Loading,
	FullScreen: FullScreen,
	ZoomMenu: ZoomMenu,
	ScaleLine: ScaleLine,
	RotateControl: RotateControl,
	OverviewMap: OverviewMap,
	MousePosition: MousePosition,
	LayerSwitcher: LayerSwitcher,
	ContextMenu: ContextMenu,
	CompareLayer: CompareLayer,
	ZoomSlider: ZoomSlider
});

var LayerSpyglass = function (_ol$interaction$Point) {
  inherits(LayerSpyglass, _ol$interaction$Point);

  function LayerSpyglass() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, LayerSpyglass);

    var _this = possibleConstructorReturn(this, _ol$interaction$Point.call(this, {
      handleEvent: LayerSpyglass.handleEvent_,
      handleMoveEvent: LayerSpyglass.handleMoveEvent_
    }));

    if (options['spyLayer']) {
      _this.spyLayer = options['spyLayer'];
    } else {
      throw new Error('图层必须传入！');
    }

    _this._currentLayerIndex = null;

    _this.radius = typeof options['radius'] === 'number' ? options['radius'] : 75;

    _this.minRadius = typeof options['minRadius'] === 'number' ? options['minRadius'] : 150;

    _this.maxRadius = typeof options['maxRadius'] === 'number' ? options['maxRadius'] : 25;

    _this.lineWidth = typeof options['lineWidth'] === 'number' ? options['lineWidth'] : 5;

    _this.strokeStyle = options['strokeStyle'] ? options['strokeStyle'] : 'rgba(0, 0, 0, 0.5)';

    _this.zoomInKeyCode = options['zoomInKeyCode'] !== undefined ? options['zoomInKeyCode'] : 38;

    _this.zoomOutKeyCode = options['zoomOutKeyCode'] !== undefined ? options['zoomOutKeyCode'] : 40;

    _this.mousePosition = null;
    return _this;
  }

  LayerSpyglass.prototype.initEvents_ = function initEvents_() {
    if (this.getMap()) {
      on(this.getMap().getTargetElement(), 'mouseout', this.handleMouseOut_, this);
      on(document, 'keydown', this.handleKeyDown_, this);
      var layers = this.getMap().getLayers().getArray();
      var layerIndexs = [];
      this._currentLayerIndex = this.spyLayer.getZIndex();
      layers.every(function (layer) {
        layerIndexs.push(layer.getZIndex());
      });
      var maxIndex = Math.max.apply(Math, layerIndexs);

      this.spyLayer.setZIndex(maxIndex + 10);
      this.spyLayer.setVisible(true);

      this.spyLayer.on('precompose', this.handlePrecompose_, this);

      this.spyLayer.on('postcompose', this.handlePostcompose_, this);
    }
  };

  LayerSpyglass.prototype.handleMouseOut_ = function handleMouseOut_(event) {
    this.mousePosition = null;
    this.getMap().render();
  };

  LayerSpyglass.prototype.handleKeyDown_ = function handleKeyDown_(event) {
    preventDefault(event);
    if (event.which === this.zoomInKeyCode) {
      this.radius = Math.min(this.radius + 5, 150);
    } else if (event.which === this.zoomOutKeyCode) {
      this.radius = Math.max(this.radius - 5, 25);
    }
    this.getMap().render();
  };

  LayerSpyglass.prototype.handlePrecompose_ = function handlePrecompose_(event) {
    var ctx = event.context;
    var pixelRatio = event.frameState.pixelRatio;
    ctx.save();
    ctx.beginPath();
    if (this.mousePosition) {
      ctx.arc(this.mousePosition[0] * pixelRatio, this.mousePosition[1] * pixelRatio, this.radius * pixelRatio, 0, 2 * Math.PI);
      ctx.lineWidth = this.lineWidth * pixelRatio;
      ctx.strokeStyle = this.strokeStyle;
      ctx.stroke();
    }
    ctx.clip();
  };

  LayerSpyglass.prototype.handlePostcompose_ = function handlePostcompose_(event) {
    var ctx = event.context;
    ctx.restore();
  };

  LayerSpyglass.prototype.setMap = function setMap(map) {
    if (map && map instanceof ol.Map) {
      _ol$interaction$Point.prototype.setMap.call(this, map);
      this.initEvents_();
    } else {
      off(this.getMap().getTargetElement(), 'mouseout', this.handleMouseOut_, this);
      off(document, 'keydown', this.handleKeyDown_, this);

      this.spyLayer.un('precompose', this.handlePrecompose_, this);

      this.spyLayer.un('postcompose', this.handlePostcompose_, this);
      this.spyLayer.setVisible(false);
      this.spyLayer.setZIndex(this._currentLayerIndex);
      this._currentLayerIndex = null;
      _ol$interaction$Point.prototype.setMap.call(this, map);
    }
  };

  return LayerSpyglass;
}(ol.interaction.Pointer);

LayerSpyglass.handleMoveEvent_ = function (mapBrowserEvent) {
  this.mousePosition = mapBrowserEvent['pixel'];
  this.getMap().render();
};

LayerSpyglass.handleEvent_ = function (evt) {
  return ol.interaction.Pointer.handleEvent.call(this, evt);
};

var LayerMagnify = function (_ol$interaction$Point) {
  inherits(LayerMagnify, _ol$interaction$Point);

  function LayerMagnify() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, LayerMagnify);

    var _this = possibleConstructorReturn(this, _ol$interaction$Point.call(this, {
      handleEvent: LayerMagnify.handleEvent_,
      handleMoveEvent: LayerMagnify.handleMoveEvent_
    }));

    if (options['magnifyLayer']) {
      _this.magnifyLayer = options['magnifyLayer'];
    } else {
      throw new Error('图层必须传入！');
    }

    _this._currentLayerIndex = null;

    _this.radius = typeof options['radius'] === 'number' ? options['radius'] : 75;

    _this.minRadius = typeof options['minRadius'] === 'number' ? options['minRadius'] : 150;

    _this.maxRadius = typeof options['maxRadius'] === 'number' ? options['maxRadius'] : 25;

    _this.lineWidth = typeof options['lineWidth'] === 'number' ? options['lineWidth'] : 2;

    _this.strokeStyle = options['strokeStyle'] ? options['strokeStyle'] : 'rgba(0, 0, 0, 0.5)';

    _this.zoomInKeyCode = options['zoomInKeyCode'] !== undefined ? options['zoomInKeyCode'] : 38;

    _this.zoomOutKeyCode = options['zoomOutKeyCode'] !== undefined ? options['zoomOutKeyCode'] : 40;

    _this.mousePosition = null;
    return _this;
  }

  LayerMagnify.prototype.initEvents_ = function initEvents_() {
    if (this.getMap()) {
      on(this.getMap().getTargetElement(), 'mouseout', this.handleMouseOut_, this);
      on(document, 'keydown', this.handleKeyDown_, this);

      this.magnifyLayer.on('postcompose', this.handlePostcompose_, this);
    }
  };

  LayerMagnify.prototype.handleMouseOut_ = function handleMouseOut_(event) {
    this.mousePosition = null;
    this.getMap().render();
  };

  LayerMagnify.prototype.handleKeyDown_ = function handleKeyDown_(event) {
    preventDefault(event);
    if (event.which === this.zoomInKeyCode) {
      this.radius = Math.min(this.radius + 5, 150);
    } else if (event.which === this.zoomOutKeyCode) {
      this.radius = Math.max(this.radius - 5, 25);
    }
    this.getMap().render();
  };

  LayerMagnify.prototype.handlePostcompose_ = function handlePostcompose_(event) {
    if (this.mousePosition) {
      var _ref = [event.context, event.frameState.pixelRatio],
          context = _ref[0],
          pixelRatio = _ref[1];

      var half = this.radius * pixelRatio;
      var centerX = this.mousePosition[0] * pixelRatio,
          centerY = this.mousePosition[1] * pixelRatio;
      var originX = centerX - half,
          originY = centerY - half,
          size = 2 * half + 1;

      var sourceData = context.getImageData(originX, originY, size, size).data;
      var dest = context.createImageData(size, size);
      var destData = dest.data;
      for (var j = 0; j < size; ++j) {
        for (var i = 0; i < size; ++i) {
          var dI = i - half;
          var dJ = j - half;
          var dist = Math.sqrt(dI * dI + dJ * dJ);
          var sourceI = i;
          var sourceJ = j;
          if (dist < half) {
            sourceI = Math.round(half + dI / 2);
            sourceJ = Math.round(half + dJ / 2);
          }
          var destOffset = (j * size + i) * 4;
          var sourceOffset = (sourceJ * size + sourceI) * 4;
          destData[destOffset] = sourceData[sourceOffset];
          destData[destOffset + 1] = sourceData[sourceOffset + 1];
          destData[destOffset + 2] = sourceData[sourceOffset + 2];
          destData[destOffset + 3] = sourceData[sourceOffset + 3];
        }
      }
      context.beginPath();
      context.arc(centerX, centerY, half, 0, 2 * Math.PI, false);
      context.lineWidth = this.lineWidth * pixelRatio;
      context.strokeStyle = this.strokeStyle;
      context.putImageData(dest, originX, originY);
      context.stroke();
      context.restore();
    }
  };

  LayerMagnify.prototype.setMap = function setMap(map) {
    if (map && map instanceof ol.Map) {
      _ol$interaction$Point.prototype.setMap.call(this, map);
      this.initEvents_();
    } else {
      off(this.getMap().getTargetElement(), 'mouseout', this.handleMouseOut_, this);
      off(document, 'keydown', this.handleKeyDown_, this);

      this.magnifyLayer.un('postcompose', this.handlePostcompose_, this);
      _ol$interaction$Point.prototype.setMap.call(this, map);
    }
  };

  return LayerMagnify;
}(ol.interaction.Pointer);

LayerMagnify.handleMoveEvent_ = function (mapBrowserEvent) {
  this.mousePosition = mapBrowserEvent['pixel'];
  this.getMap().render();
};

LayerMagnify.handleEvent_ = function (evt) {
  return ol.interaction.Pointer.handleEvent.call(this, evt);
};

var StyleFactory = function StyleFactory() {
  classCallCheck(this, StyleFactory);
};

StyleFactory.getStyle = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var style = new ol.style.Style({});
  if (options['geometry'] && options['geometry'] instanceof ol.geom.Geometry) {
    style.setGeometry(options['geometry']);
  }
  if (options['zIndex'] && typeof options['zIndex'] === 'number') {
    style.setZIndex(options['zIndex']);
  }
  if (options['fill'] && _typeof(options['fill']) === 'object') {
    style.setFill(StyleFactory._getFill(options['fill']));
  }
  if (options['image'] && _typeof(options['image']) === 'object') {
    style.setImage(StyleFactory._getImage(options['image']));
  }
  if (options['stroke'] && _typeof(options['stroke']) === 'object') {
    style.setStroke(StyleFactory._getStroke(options['stroke']));
  }
  if (options['text'] && _typeof(options['text']) === 'object') {
    style.setText(StyleFactory._getText(options['text']));
  }
  return style;
};

StyleFactory._getRegularShape = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return new ol.style.RegularShape({
    fill: StyleFactory._getFill(options['fill']) || undefined,
    points: typeof options['points'] === 'number' ? options['points'] : 1,
    radius: typeof options['radius'] === 'number' ? options['radius'] : undefined,
    radius1: typeof options['radius1'] === 'number' ? options['radius1'] : undefined,
    radius2: typeof options['radius2'] === 'number' ? options['radius2'] : undefined,
    angle: typeof options['angle'] === 'number' ? options['angle'] : 0,
    snapToPixel: typeof options['snapToPixel'] === 'boolean' ? options['snapToPixel'] : true,
    stroke: StyleFactory._getStroke(options['stroke']) || undefined,
    rotation: typeof options['rotation'] === 'number' ? options['rotation'] : 0,
    rotateWithView: typeof options['rotateWithView'] === 'boolean' ? options['rotateWithView'] : false,
    atlasManager: options['atlasManager'] ? options['atlasManager'] : undefined
  });
};

StyleFactory._getImage = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var image = void 0;
  if (options['type'] === 'icon') {
    image = StyleFactory._getIcon(options['image']);
  } else {
    image = StyleFactory._getRegularShape(options['image']);
  }
  return image;
};

StyleFactory._getIcon = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return new ol.style.Icon({
    anchor: options['imageAnchor'] ? options['imageAnchor'] : [0.5, 0.5],
    anchorXUnits: options['imageAnchorXUnits'] ? options['imageAnchorXUnits'] : 'fraction',
    anchorYUnits: options['imageAnchorYUnits'] ? options['imageAnchorYUnits'] : 'fraction',
    anchorOrigin: options['imageAnchorOrigin'] ? options['imageAnchorYUnits'] : 'top-left',
    color: options['imageColor'] ? options['imageColor'] : undefined,
    crossOrigin: options['crossOrigin'] ? options['crossOrigin'] : undefined,
    img: options['img'] ? options['img'] : undefined,
    offset: options['offset'] && Array.isArray(options['offset']) && options['offset'].length === 2 ? options['offset'] : [0, 0],
    offsetOrigin: options['offsetOrigin'] ? options['offsetOrigin'] : 'top-left',
    scale: typeof options['scale'] === 'number' ? options['scale'] : 1,
    snapToPixel: typeof options['snapToPixel'] === 'boolean' ? options['snapToPixel'] : true,
    rotateWithView: typeof options['rotateWithView'] === 'boolean' ? options['rotateWithView'] : false,
    opacity: typeof options['imageOpacity'] === 'number' ? options['imageOpacity'] : 1,
    rotation: typeof options['imageRotation'] === 'number' ? options['imageRotation'] : 0,
    size: options['size'] && Array.isArray(options['size']) && options['size'].length === 2 ? options['size'] : undefined,
    imgSize: options['imgSize'] && Array.isArray(options['imgSize']) && options['imgSize'].length === 2 ? options['imgSize'] : undefined,
    src: options['imageSrc'] ? options['imageSrc'] : undefined
  });
};

StyleFactory._getStroke = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return new ol.style.Stroke({
    color: options['strokeColor'] ? options['strokeColor'] : undefined,
    lineCap: options['strokeLineCap'] && typeof options['strokeLineCap'] === 'string' ? options['strokeLineCap'] : 'round',
    lineJoin: options['strokeLineJoin'] && typeof options['strokeLineJoin'] === 'string' ? options['strokeLineJoin'] : 'round',
    lineDash: options['strokeLineDash'] ? options['strokeLineDash'] : undefined,
    lineDashOffset: typeof options['strokeLineDashOffset'] === 'number' ? options['strokeLineDashOffset'] : '0',
    miterLimit: typeof options['strokeMiterLimit'] === 'number' ? options['strokeMiterLimit'] : 10,
    width: typeof options['strokeWidth'] === 'number' ? options['strokeWidth'] : 1
  });
};

StyleFactory._getText = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return new ol.style.Text({
    font: options['textFont'] && typeof options['textFont'] === 'string' ? options['textFont'] : '10px sans-serif',
    offsetX: typeof options['textOffsetX'] === 'number' ? options['textOffsetX'] : 0,
    offsetY: typeof options['textOffsetY'] === 'number' ? options['textOffsetY'] : 0,
    scale: typeof options['textScale'] === 'number' ? options['textScale'] : undefined,
    rotation: typeof options['textRotation'] === 'number' ? options['textRotation'] : 0,
    text: options['text'] && typeof options['text'] === 'string' ? options['text'] : undefined,
    textAlign: options['textAlign'] && typeof options['textAlign'] === 'string' ? options['textAlign'] : 'start',
    textBaseline: options['textBaseline'] && typeof options['textBaseline'] === 'string' ? options['textBaseline'] : 'alphabetic',
    rotateWithView: typeof options['rotateWithView'] === 'boolean' ? options['rotateWithView'] : false,
    fill: StyleFactory._getFill(options['textFill']),
    stroke: StyleFactory._getStroke(options['textStroke'])
  });
};

StyleFactory._getFill = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return new ol.style.Fill({
    color: options['fillColor'] ? options['fillColor'] : undefined
  });
};

var FreeHandCircle = function (_ol$interaction$Point) {
  inherits(FreeHandCircle, _ol$interaction$Point);

  function FreeHandCircle() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, FreeHandCircle);

    var _this = possibleConstructorReturn(this, _ol$interaction$Point.call(this, {
      handleMoveEvent: FreeHandCircle.handleMoveEvent_,
      handleDownEvent: FreeHandCircle.handleDownEvent_,
      handleUpEvent: FreeHandCircle.handleUpEvent_,
      handleDragEvent: FreeHandCircle.handleDragEvent_
    }));

    _this.options = options;

    _this.wgs84Sphere = new ol.Sphere(typeof options['sphere'] === 'number' ? options['sphere'] : 6378137);

    _this.layerName = options['layerName'] || 'FREE_HAND_CIRCLE';

    _this.centerStyle = options['centerStyle'] || null;

    _this.layer = null;

    _this.radius = '';

    _this.center_ = [];

    _this.isMouseDown = false;

    _this.isDraging = false;

    _this.cursor_ = 'pointer';

    _this.drawStart_ = false;

    _this.previousCursor_ = undefined;

    _this.coordinate_ = null;

    _this.feature_ = null;

    _this.textOverlay = null;

    _this.circleFeature = null;

    _this.centerFeature = null;

    _this.labelFeature = null;

    _this.style_ = {
      fill: {
        fillColor: 'rgba(67, 110, 238, 0)'
      },
      stroke: {
        strokeColor: 'rgba(249, 185, 154, 1)',
        strokeWidth: 2.5
      },
      image: {
        type: '',
        image: {
          fill: {
            fillColor: 'rgba(255, 255, 255, 0.8)'
          },
          points: Infinity,
          radius: 4,
          stroke: {
            strokeColor: 'rgba(255, 0, 0, 1)',
            strokeWidth: 1.5
          }
        }
      }
    };
    if (options['style'] && _typeof(options['style']) === 'object') {
      _this.style_ = options['style'];
    }
    return _this;
  }

  FreeHandCircle.prototype.initDrawInteraction = function initDrawInteraction() {
    if (!this.getMap()) return;
    var style_ = StyleFactory.getStyle(this.style_);
    this.draw = new ol.interaction.Draw({
      type: 'Circle',
      style: style_
    });
    this.draw.set('uuid', uuid());
    this.getMap().addInteraction(this.draw);
    this.draw.on('drawstart', this.drawStartHandle_, this);
    this.draw.on('drawend', this.drawEndHandle_, this);
  };

  FreeHandCircle.prototype.removeLastInteraction_ = function removeLastInteraction_() {
    if (!this.getMap()) return;
    this.draw.un('drawstart', this.drawStartHandle_, this);
    this.draw.un('drawend', this.drawEndHandle_, this);
    this.getMap().removeInteraction(this.draw);
  };

  FreeHandCircle.prototype.drawStartHandle_ = function drawStartHandle_(event) {
    this.drawStart_ = true;
  };

  FreeHandCircle.prototype.drawEndHandle_ = function drawEndHandle_(event) {
    if (event && event.feature) {
      var geom_ = event.feature.getGeometry();
      this.center_ = geom_.getCenter();
      var coordinates = geom_.getLastCoordinate();
      this.radius = this.mathRadius(this.center_, coordinates);
      this.createCircle(this.center_, this.radius);
    }
    this.removeLastInteraction_();
    this.drawStart_ = false;
  };

  FreeHandCircle.prototype.createCircle = function createCircle(center, radius) {
    var _this2 = this;

    if (!this.getMap()) return;
    var style_ = StyleFactory.getStyle(this.style_);
    if (!this.layer) {
      this.layer = createVectorLayer(this.getMap(), this.layerName, {
        create: true
      });
      this.layer.setStyle(style_);
    }
    var params = this.transformCenterAndRadius_(center, radius);
    if (!this.circleFeature) {
      this.circleFeature = new ol.Feature({
        geometry: new ol.geom.Circle(params['center'], params['radius'])
      });
      var _uuid = this.draw && this.draw.get('uuid') ? this.draw.get('uuid') : uuid();
      this.circleFeature.set('uuid', _uuid);
      this.layer.getSource().addFeature(this.circleFeature);
      this.circleFeature.getGeometry().on('change', function (evt) {
        var geom = evt.target;
        var coordinates = geom.getLastCoordinate();
        _this2.center_ = geom.getCenter();
        _this2.radius = _this2.mathRadius(_this2.center_, coordinates);
        _this2.addLabelFeature_(_this2.center_, 'center');
        _this2.addLabelFeature_(coordinates, 'endLabel');
        _this2.drawTextLabel_(_this2.radius + ' m', coordinates);
        if (_this2.drawStart_ || !(_this2.isMouseDown && _this2.isDraging)) {
          _this2.dispatchEvent({
            type: 'changeend',
            target: _this2,
            geometry: geom
          });
        }
      });
      this.circleFeature.getGeometry().dispatchEvent('change');
    } else {
      this.circleFeature.getGeometry().setCenterAndRadius(params['center'], params['radius']);
    }
  };

  FreeHandCircle.prototype.transformCenterAndRadius_ = function transformCenterAndRadius_(center, radius) {
    var center_ = ol.proj.transform(center, this._getProjectionCode(), 'EPSG:4326');
    var sourceGeom = new ol.geom.Circle(center_, this.transformRadius(center_, radius));
    var trans_ = sourceGeom.transform('EPSG:4326', this._getProjectionCode());
    return {
      center: trans_.getCenter(),
      radius: trans_.getRadius()
    };
  };

  FreeHandCircle.prototype.addLabelFeature_ = function addLabelFeature_(coordinates, type) {
    if (type === 'center') {
      if (!this.centerFeature) {
        this.centerFeature = new ol.Feature({
          uuid: this.circleFeature.get('uuid'),
          geometry: new ol.geom.Point(coordinates)
        });
        if (this.centerStyle) {
          var _style = StyleFactory.getStyle(this.centerStyle);
          this.centerFeature.setStyle(_style);
        }
        this.layer.getSource().addFeature(this.centerFeature);
      } else {
        this.centerFeature.setGeometry(new ol.geom.Point(coordinates));
      }
    } else {
      if (!this.labelFeature) {
        this.labelFeature = new ol.Feature({
          uuid: this.circleFeature.get('uuid'),
          geometry: new ol.geom.Point(coordinates)
        });
        var _style2 = StyleFactory.getStyle({
          image: {
            type: 'icon',
            image: {
              imageSrc: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAATCAYAAAGCZu9cAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTAyQjQ0OTk5MUZGMTFFN0JCMzdENDYyNTY0RDI4MzAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTAyQjQ0OUE5MUZGMTFFN0JCMzdENDYyNTY0RDI4MzAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBMDJCNDQ5NzkxRkYxMUU3QkIzN0Q0NjI1NjREMjgzMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBMDJCNDQ5ODkxRkYxMUU3QkIzN0Q0NjI1NjREMjgzMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Poms414AAAUoSURBVHjaYmxqamJg+PTJn+H//0gGBoYVtT09G1iADMm86uoNDBAQDsSMTEDi+bPHj9/9//eP4dWzZx9AMgABxAjW/vHjCrA6fv4Ixo8fPvwHAgYYYObi4rpnZmoaCLSAYfKUKSIAAcQA0nJkz54nP3/8+I+OTx858hykG2SZiJ6JifS7N28YXEqvMCDTqlpaEiCjAQIIYjkDAwvQAd0gJ0OtfAl0SD5EgoFBubys7A4DJsjr7OoC+unjxyXfv38HGw2ikdmcv36dZ2Lg4Dj5/etXhlXlEgwgGoX948cMJgZ29obZEybs5+TmZuDg5ARjEHt2f/8+Bj6+mQABBHMkI8PPn8YO9vbrbZydZZADCB0wMjIynDx06NnuLVscgR65VVtbCw4ODoYvX+aU1tScNraykgG578ePHwwOhRfANAzD+CB5PVNTqdLm5psMHz70gQwGGSLG8O+fyvcvX+B+8ai8AbYVxgdhEACJw/jfgOqBwAoW5sxA2gdoalVmebnZD6BNhAA7BwfDjK6uMwwCApZA7/wBxctfIN4IFNg9feZMTSBbCYi5cej/BsQPgPgaUP0XmCBAAMECFhK437+LMvz6lQtkq2JoB4U2IyPIn1OBAfoGJgwKWBYomxOYEFaVtbR4srKxMTPgih1gzABBfWtp6XagS7xhwqCAZWP4/HlGZUeHDzD6mP/8/s3w588f7Bgk9/s3I1CtFzAM5yEbouYTHOz+6+dPuGJQUgRhXPxfv34xRKWmBiIbog7MHiK/gbaAMCx6NzcpM8DEQGxYFMPEpBUUBIBBwAszhPPHt29//gBNB+H1NbJgDTA+DIMASA7G//v7939gAH+FGfLm6L59T0DOhNkCyjiBLY/hfBAbJAbjg9SePnr0CVDvP5ghVy5dv77q65cvH/8Cix2Yv5cVi2Bl//37F4S/Hd6/vxAWJqAofsbAyrp26ZIlDDrq6mFmtrZS3Dw8nNhiGJiaf549fvzZuXPnmhl4eDYgGwJy0nmgQS+v3Lt3EIjFQKUbFjNA6l4D8VUGTk64V0AAIMCQUywk1YIM/vVLDJhlE4EZ09vAzExMUU2ND5hfmAUEBdkZiASfP3369e3r1z9PHz78curwYZDlG4CJdQYwMt4hqwOleJhvYA7gBAacBsPXrx2egYG6RhYWEv/+/WMgFwgKC3OBaA0dHRFnb28FRiYm02sXLhRsWLbsEtBBsUAHPUdWzwKNZBFgKHjKiImVx9bWav6FJmxswK38Gpje1alFkhwIqGpriwJznfPmVasOXzl/PgXomAPIDuEHYh1gVMT5hIUp/gQWa9hKaa+a23D2thZVcHZGByBxkDqYg0B8dPAXWJa4BwQoXgElNAYGW+QczAuuy/794+Hm5maD5Q1kjOyIjfUKDNjUwDBIHtnx6PKgkAaWWUx8AgJ8wHaAKHKIgMroXwwsLM8e3b//QUxKSgjdt2uqpMF0SNtTBv/GByhiyAAkj67nN5pZzMzMDO/fvv326ePHG8jFNMgh74H4HjA/7li9aBF/YESErpS8vAiwvYARRStKxeBsbFGDTx5U8QKLf4aP799/XDpr1hlg1Z8Hqj2QHQKqia6DQ4WP79v69etNgBWPRUBUlJKMggLYQaASCJSD8NXw2OoVJiBmZmEBtibYGd69fv1h+Zw5d4BlzWJgSMwHqviCnmtg1SIohT0G6roAxPs2bNsmAWxmqAPDVhHoCn4g5iM5DzMyfmZgYnoLjPZLQDN3ACu6u0DRD9DkgAIAomQEZFjvy7gAAAAASUVORK5CYII='
            }
          }
        });
        this.labelFeature.set('free-hand-circle-lable', true);
        this.labelFeature.setStyle(_style2);
        this.layer.getSource().addFeature(this.labelFeature);
      } else {
        this.labelFeature.setGeometry(new ol.geom.Point(coordinates));
      }
    }
  };

  FreeHandCircle.prototype.drawTextLabel_ = function drawTextLabel_(text, coordinates) {
    if (!this.textOverlay) {
      var editor = document.createElement('span');
      editor.className = 'ole-free-hand-circle-label';
      editor.innerHTML = text;
      this.textOverlay = new ol.Overlay({
        element: editor,
        position: coordinates,
        positioning: 'center-left',
        offset: [20, 0]
      });
      this.getMap().addOverlay(this.textOverlay);
    } else {
      var element = this.textOverlay.getElement();
      element.innerHTML = text;
      this.textOverlay.setPosition(coordinates);
      this.getMap().render();
    }
  };

  FreeHandCircle.prototype.getImageSrc_ = function getImageSrc_(text) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    var width = ctx.measureText(text).width;
    var height = 20;
    canvas.width = width + 8;
    canvas.height = height + 4;
    ctx.fillText(text, 2, 10);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
    var image = canvas.toDataURL('image/.png', 1);
    return image;
  };

  FreeHandCircle.prototype.transformRadius = function transformRadius(center, meterRadius) {
    try {
      var lastCoords = this.wgs84Sphere.offset(center, meterRadius, 270 / 360 * 2 * Math.PI);var ptx = center[0] - lastCoords[0],
          pty = center[1] - lastCoords[1];

      var transformRadiu = Math.sqrt(Math.pow(ptx, 2) + Math.pow(pty, 2));
      return transformRadiu;
    } catch (e) {
      console.log(e);
    }
  };

  FreeHandCircle.prototype.mathRadius = function mathRadius(center, coords) {
    var radius_ = '';
    if (center && coords) {
      var c1 = ol.proj.transform(this.center_, this._getProjectionCode(), 'EPSG:4326');
      var c2 = ol.proj.transform(coords, this._getProjectionCode(), 'EPSG:4326');
      var radius = this.wgs84Sphere.haversineDistance(c1, c2);
      if (this.options['maxRadius'] && radius > this.options['maxRadius']) {
        radius_ = this.options['maxRadius'] - 1;
      } else if (this.options['minRadius'] && radius < this.options['minRadius']) {
        radius_ = this.options['minRadius'] - 1;
      } else {
        radius_ = radius;
      }
      radius_ = Math.floor(radius_) + 1;
    }
    return radius_;
  };

  FreeHandCircle.prototype._getProjectionCode = function _getProjectionCode() {
    var code = '';
    if (this.getMap()) {
      code = this.getMap().getView().getProjection().getCode();
    } else {
      code = 'EPSG:3857';
    }
    return code;
  };

  FreeHandCircle.prototype.setRadius = function setRadius(radius) {
    if (this.circleFeature && this.circleFeature.getGeometry()) {
      var geom = this.circleFeature.getGeometry();
      var params = this.transformCenterAndRadius_(this.center_, radius);
      geom.setCenterAndRadius(params['center'], params['radius']);
      geom.dispatchEvent('change');
    } else {
      throw new Error('未创建Circle实例。');
    }
  };

  FreeHandCircle.prototype.setCenter = function setCenter(center) {
    if (this.circleFeature && this.circleFeature.getGeometry()) {
      var geom = this.circleFeature.getGeometry();
      var params = this.transformCenterAndRadius_(center, this.radius);
      geom.setCenterAndRadius(params['center'], params['radius']);
      geom.dispatchEvent('change');
    } else {
      throw new Error('未创建Circle实例。');
    }
  };

  FreeHandCircle.prototype.setCenterRadius = function setCenterRadius(center, radius) {
    if (this.circleFeature && this.circleFeature.getGeometry()) {
      var geom = this.circleFeature.getGeometry();
      var params = this.transformCenterAndRadius_(center, radius);
      geom.setCenterAndRadius(params['center'], params['radius']);
      geom.dispatchEvent('change');
    } else {
      throw new Error('未创建Circle实例。');
    }
  };

  FreeHandCircle.prototype.setActive = function setActive(active) {
    _ol$interaction$Point.prototype.setActive.call(this, active);
  };

  FreeHandCircle.prototype.destroy = function destroy() {
    if (this.draw) {
      this.removeLastInteraction_();
    }
    if (this.textOverlay && this.textOverlay instanceof ol.Overlay) {
      this.getMap().removeOverlay(this.textOverlay);
      this.textOverlay = null;
    }
    if (this.layer) {
      this.layer.getSource().clear();
      this.circleFeature = null;
      this.centerFeature = null;
      this.labelFeature = null;
    }
    this.coordinate_ = null;
    this.feature_ = null;
    this.drawStart_ = false;
    this.center_ = [];
    this.radius = '';
    this.isDraging = false;
    this.isMouseDown = false;
  };

  return FreeHandCircle;
}(ol.interaction.Pointer);

FreeHandCircle.handleMoveEvent_ = function (mapBrowserEvent) {
  if (this.cursor_) {
    var map = mapBrowserEvent.map;
    var feature = map.forEachFeatureAtPixel(mapBrowserEvent.pixel, function (feature) {
      return feature;
    });
    var element = map.getTargetElement();
    if (feature && feature.get('free-hand-circle-lable')) {
      if (element.style.cursor !== this.cursor_) {
        this.previousCursor_ = element.style.cursor;
        element.style.cursor = this.cursor_;
      }
    } else if (this.previousCursor_ !== undefined) {
      element.style.cursor = this.previousCursor_;
      this.previousCursor_ = undefined;
    }
  }
};

FreeHandCircle.handleDownEvent_ = function (mapBrowserEvent) {
  this.isMouseDown = true;
  if (!this.drawStart_ && mapBrowserEvent.originalEvent.button === 0) {
    var map = mapBrowserEvent.map;
    var feature = map.forEachFeatureAtPixel(mapBrowserEvent.pixel, function (feature) {
      return feature;
    });
    if (feature && feature.get('free-hand-circle-lable')) {
      this.coordinate_ = mapBrowserEvent.coordinate;
      this.feature_ = feature;
    }
    return !!this.feature_;
  }
};

FreeHandCircle.handleUpEvent_ = function (mapBrowserEvent) {
  if (this.feature_ && this.coordinate_ && this.isDraging) {
    this.dispatchEvent({
      type: 'changeend',
      target: this,
      geometry: this.circleFeature.getGeometry()
    });
  }
  this.coordinate_ = null;
  this.feature_ = null;
  this.isMouseDown = false;
  this.isDraging = false;
  return false;
};

FreeHandCircle.handleDragEvent_ = function (mapBrowserEvent) {
  if (!this.coordinate_ || !this.feature_) {
    return;
  }
  this.isDraging = true;
  var deltaX = mapBrowserEvent.coordinate[0] - this.coordinate_[0];
  var deltaY = 0;
  var geometry = this.feature_.getGeometry();
  geometry.translate(deltaX, deltaY);
  this.coordinate_[0] = mapBrowserEvent.coordinate[0];
  this.coordinate_[1] = mapBrowserEvent.coordinate[1];
  this.createCircle(this.center_, this.mathRadius(this.center_, geometry.getCoordinates()));
};

var MeasureTool = function (_ol$interaction$Point) {
  inherits(MeasureTool, _ol$interaction$Point);

  function MeasureTool() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, MeasureTool);

    var _this = possibleConstructorReturn(this, _ol$interaction$Point.call(this, {
      handleMoveEvent: MeasureTool.handleMoveEvent_,
      handleDownEvent: MeasureTool.handleDownEvent_,
      handleDragEvent: MeasureTool.handleDragEvent_
    }));

    _this.options = options;

    _this.wgs84Sphere = new ol.Sphere(typeof options['sphere'] === 'number' ? options['sphere'] : 6378137);

    _this.measureTypes = {
      measureLength: {
        name: 'measureLength',
        type: 'LineString'
      },
      measureArea: {
        name: 'measureArea',
        type: 'Polygon'
      },
      measureCircle: {
        name: 'measureCircle',
        type: 'Circle'
      }
    };

    _this.measureType = '';

    _this.freehand = false;

    _this.isGeodesic = options['isGeodesic'] === false ? options['isGeodesic'] : true;

    _this.layerName = options['layerName'] || 'measureTool';

    _this.layer = null;

    _this.draw = null;

    _this.isActive_ = false;

    _this.clickCount = '';

    _this.drawStyle = {
      fill: {
        fillColor: 'rgba(67, 110, 238, 0.4)'
      },
      stroke: {
        strokeColor: 'rgba(249, 185, 154, 1)',
        strokeWidth: 2.5
      },
      image: {
        type: '',
        image: {
          fill: {
            fillColor: 'rgba(255, 255, 255, 0.8)'
          },
          points: Infinity,
          radius: 4,
          stroke: {
            strokeColor: 'rgba(255, 0, 0, 1)',
            strokeWidth: 1.5
          }
        }
      }
    };
    if (options['drawStyle'] && _typeof(options['drawStyle']) === 'object') {
      _this.drawStyle = options['drawStyle'];
    }

    _this.finshStyle = {
      fill: {
        fillColor: 'rgba(67, 110, 238, 0.4)'
      },
      stroke: {
        strokeColor: 'rgba(253, 128, 68, 1)',
        strokeWidth: 3
      },
      image: {
        type: '',
        image: {
          fill: {
            fillColor: 'rgba(255, 255, 255, 0.8)'
          },
          points: Infinity,
          radius: 4,
          stroke: {
            strokeColor: 'rgba(255, 0, 0, 1)',
            strokeWidth: 1.5
          }
        }
      }
    };
    if (options['finshStyle'] && _typeof(options['finshStyle']) === 'object') {
      _this.finshStyle = options['finshStyle'];
    }

    _this.cursor_ = 'default';

    _this.previousCursor_ = undefined;

    _this.doubleClickZoom = null;
    return _this;
  }

  MeasureTool.prototype.addDrawInteractions_ = function addDrawInteractions_(type) {
    var style_ = StyleFactory.getStyle(this.drawStyle);
    this.draw = new ol.interaction.Draw({
      type: type,
      style: style_,
      freehand: this.freehand
    });
    this.draw.set('uuid', uuid());
    this.getMap().addInteraction(this.draw);
    this.draw.on('drawstart', this.drawStartHandle_, this);
    this.draw.on('drawend', this.drawEndHandle_, this);
    if (type === 'LineString' && !this.freehand) {
      this.getMap().on('singleclick', this.drawClickHandle_, this);
    }
  };

  MeasureTool.prototype.drawClickHandle_ = function drawClickHandle_(event) {
    if (this.drawStart_ && !event.dragging) {
      if (!this.clickCount) {
        this.clickCount = uuid();
        this.draw.set('measureResult', '起点');
      }
      this.addMeasurecircle(event.coordinate);
      this.addMeasureOverlay(event.coordinate, this.draw.get('measureResult'));
    }
  };

  MeasureTool.prototype.addMeasurecircle = function addMeasurecircle(coordinate) {
    var feature = new ol.Feature({
      uuid: this.draw.get('uuid'),
      geometry: new ol.geom.Point(coordinate)
    });
    this.layer.getSource().addFeature(feature);
  };

  MeasureTool.prototype.drawStartHandle_ = function drawStartHandle_(event) {
    var _this2 = this;

    var that = this;
    this.drawStart_ = true;
    event.feature.getGeometry().on('change', function (evt) {
      var geom = evt.target;
      if (geom instanceof ol.geom.LineString) {
        var output = that.formatData(geom);
        that.draw.set('measureResult', output);
      } else if (geom instanceof ol.geom.Polygon) {
        var area = _this2.formatData(geom);
        that.draw.set('measureResult', area);
      } else if (geom instanceof ol.geom.Circle) {
        var _area = _this2.formatData(geom);
        that.draw.set('measureResult', _area);
      }
    });
  };

  MeasureTool.prototype.drawEndHandle_ = function drawEndHandle_(event) {
    this.drawEnd_ = true;
    var feature = event.feature;
    feature.set('uuid', this.draw.get('uuid'));
    this.layer.getSource().addFeature(feature);
    var coordinates = feature.getGeometry().getLastCoordinate();
    if (this.measureTypes.measureLength['name'] === this.measureType) {
      this.addMeasurecircle(coordinates);
      this.addMeasureOverlay(coordinates, this.draw.get('measureResult'), 'length');
    } else if (this.measureTypes.measureArea['name'] === this.measureType) {
      var center = ol.extent.getCenter(feature.getGeometry().getExtent());
      this.addMeasureOverlay(center, this.draw.get('measureResult'), 'area');
    } else if (this.measureTypes.measureCircle['name'] === this.measureType) {
      var _center = ol.extent.getCenter(feature.getGeometry().getExtent());
      this.addMeasureOverlay(_center, this.draw.get('measureResult'), 'circle');
    }
    this.addMeasureRemoveButton(coordinates);
    this.setTool(false);
    this.dispatchEvent('measureEnd');
  };

  MeasureTool.prototype.beforeDrawPointClickHandler = function beforeDrawPointClickHandler(event) {
    if (!this.measureHelpTooltip && this.getTool()) {
      var helpTooltipElement = document.createElement('span');
      if (this.measureTypes.measureLength['name'] === this.measureType) {
        helpTooltipElement.className = 'ole-measure-tool ole-measure-tool-length';
        if (this.freehand) {
          helpTooltipElement.innerHTML = '按下鼠标拖拽开始测量';
        } else {
          helpTooltipElement.innerHTML = '单击开始测距';
        }
      } else if (this.measureTypes.measureArea['name'] === this.measureType) {
        helpTooltipElement.className = 'ole-measure-tool ole-measure-tool-area';
        if (this.freehand) {
          helpTooltipElement.innerHTML = '按下鼠标拖拽开始测量';
        } else {
          helpTooltipElement.innerHTML = '单击开始测面';
        }
      } else if (this.measureTypes.measureCircle['name'] === this.measureType) {
        helpTooltipElement.className = 'ole-measure-tool ole-measure-tool-area';
        if (this.freehand) {
          helpTooltipElement.innerHTML = '按下鼠标拖拽开始测量';
        } else {
          helpTooltipElement.innerHTML = '单击开始测方圆面积';
        }
      }
      this.measureHelpTooltip = new ol.Overlay({
        element: helpTooltipElement,
        offset: [15, 0],
        positioning: 'center-left'
      });
      this.measureHelpTooltip.set('layerName', this.layerName);
      this.getMap().addOverlay(this.measureHelpTooltip);
    } else if (this.measureHelpTooltip && this.measureHelpTooltip instanceof ol.Overlay) {
      this.measureHelpTooltip.setPosition(event.coordinate);
    }
  };

  MeasureTool.prototype.afterDrawPointClickHandler = function afterDrawPointClickHandler(event) {
    var helpTooltipElement = this.measureHelpTooltip.getElement();
    if (this.measureTypes.measureLength['name'] === this.measureType) {
      helpTooltipElement.className = 'ole-measure-tool-move ole-measure-tool-length';
      var length = this.draw.get('measureResult');
      helpTooltipElement.innerHTML = '<span>总长：' + '<span class="measure-result">' + length + '</span>' + '</span><br>' + '<span class="tool-tip">单击确定地点，双击结束</span>';
    } else if (this.measureTypes.measureArea['name'] === this.measureType) {
      helpTooltipElement.className = 'ole-measure-tool-move ole-measure-tool-area';
      var area = this.draw.get('measureResult');
      helpTooltipElement.innerHTML = '<span>总面积：' + '<span class="measure-result">' + area + '</span>' + '</span><br>' + '<span class="tool-tip">单击确定地点，双击结束</span>';
    } else if (this.measureTypes.measureCircle['name'] === this.measureType) {
      helpTooltipElement.className = 'ole-measure-tool-move ole-measure-tool-area';
      var _area2 = this.draw.get('measureResult');
      helpTooltipElement.innerHTML = '<span>总面积：' + '<span class="measure-result">' + _area2 + '</span>' + '</span><br>' + '<span class="tool-tip">单击确定地点，双击结束</span>';
    }
    this.measureHelpTooltip.setPosition(event.coordinate);
    this.getMap().render();
  };

  MeasureTool.prototype.afterDragHandler_ = function afterDragHandler_(event) {
    var helpTooltipElement = this.measureHelpTooltip.getElement();
    if (this.measureTypes.measureLength['name'] === this.measureType) {
      helpTooltipElement.className = 'ole-measure-tool-move ole-measure-tool-length';
      var length = this.draw.get('measureResult');
      helpTooltipElement.innerHTML = '<span>总长：' + '<span class="measure-result">' + length + '</span>' + '</span><br>' + '<span class="tool-tip">松开鼠标按键结束测量</span>';
    } else if (this.measureTypes.measureArea['name'] === this.measureType) {
      helpTooltipElement.className = 'ole-measure-tool-move ole-measure-tool-area';
      var area = this.draw.get('measureResult');
      helpTooltipElement.innerHTML = '<span>总面积：' + '<span class="measure-result">' + area + '</span>' + '</span><br>' + '<span class="tool-tip">松开鼠标按键结束测量</span>';
    } else if (this.measureTypes.measureCircle['name'] === this.measureType) {
      helpTooltipElement.className = 'ole-measure-tool-move ole-measure-tool-area';
      var _area3 = this.draw.get('measureResult');
      helpTooltipElement.innerHTML = '<span>总面积：' + '<span class="measure-result">' + _area3 + '</span>' + '</span><br>' + '<span class="tool-tip">松开鼠标按键结束测量</span>';
    }
    this.measureHelpTooltip.setPosition(event.coordinate);
    this.getMap().render();
  };

  MeasureTool.prototype.addMeasureOverlay = function addMeasureOverlay(coordinate, length, type) {
    var measureResult = document.createElement('span');
    var measureOverlay = null;
    if (type === 'length') {
      measureResult.className = 'ole-measure-tool-end-overlay-label';
      measureResult.innerHTML = "总长：<span class='measure-end-label'>" + length + '</span>';
      measureOverlay = new ol.Overlay({
        element: measureResult,
        position: coordinate,
        offset: [10, 10],
        positioning: 'top-left'
      });
    } else if (type === 'area') {
      measureResult.className = 'ole-measure-tool-area-overlay-label';
      measureResult.innerHTML = '<span class="measure-label">' + length + '</span>';
      measureOverlay = new ol.Overlay({
        element: measureResult,
        position: coordinate,
        positioning: 'center-center'
      });
    } else if (type === 'circle') {
      measureResult.className = 'ole-measure-tool-area-overlay-label';
      measureResult.innerHTML = '<span class="measure-label">' + length + '</span>';
      measureOverlay = new ol.Overlay({
        element: measureResult,
        position: coordinate,
        positioning: 'center-center'
      });
    } else {
      measureResult.className = 'ole-measure-tool-overlay-label';
      measureResult.innerHTML = length;
      measureOverlay = new ol.Overlay({
        element: measureResult,
        position: coordinate,
        offset: [10, 0],
        positioning: 'center-left'
      });
    }
    measureOverlay.set('layerName', this.layerName);
    measureOverlay.set('uuid', this.draw.get('uuid'));
    this.getMap().addOverlay(measureOverlay);
    this.getMap().render();
  };

  MeasureTool.prototype.addMeasureRemoveButton = function addMeasureRemoveButton(coordinate) {
    var that = this;
    var imageButton = document.createElement('img');
    imageButton.src = this.options['removeButtonSrc'] ? this.options['removeButtonSrc'] : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NEYzMzc1RDY3RDU1MTFFNUFDNDJFNjQ4NUUwMzRDRDYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NEYzMzc1RDc3RDU1MTFFNUFDNDJFNjQ4NUUwMzRDRDYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0RjMzNzVENDdENTUxMUU1QUM0MkU2NDg1RTAzNENENiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0RjMzNzVENTdENTUxMUU1QUM0MkU2NDg1RTAzNENENiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsDx84AAAAC3SURBVHjavJIxDoMwDEV/ok5wDCbu0DvAdUBIwMLFSs/AxDXY6tZ2SCGVUikd+ifn20+2k5hHVd0AXJGmGQw+UyWMxY8KQGpbUNcB23aYHIsnuSgIy8dlAQ2DgwWSmD0YE5ReAq5pQOMIrKsDRByjKGC/dsxz2L7XQgU8JB7n4qDoY6SYF4J+p72T7/zeOXqr03SMx8XnsTUX7UgElKVCyDK3s8Tsae6sv/8ceceZ6jr1k99fAgwAsZy0Sa2HgDcAAAAASUVORK5CYII=';
    imageButton.style.cursor = 'pointer';
    imageButton.title = '清除测量结果';
    imageButton.uuid_ = this.draw.get('uuid');
    imageButton.onclick = function (event) {
      that.removeMeasure_(this.uuid_);
    };
    var closeBtn = new ol.Overlay({
      element: imageButton,
      offset: [8, 0],
      position: coordinate,
      positioning: 'center-left'
    });
    closeBtn.set('uuid', this.draw.get('uuid'));
    closeBtn.set('layerName', this.layerName);
    this.getMap().addOverlay(closeBtn);
    this.getMap().render();
  };

  MeasureTool.prototype.removeMeasure_ = function removeMeasure_(uuid) {
    var overlays = this.getMap().getOverlays().getArray();
    if (overlays && Array.isArray(overlays)) {
      var length = overlays.length;

      for (var j = 0, i = 0; j < length; j++) {
        i++;
        if (overlays[length - i] && overlays[length - i] instanceof ol.Overlay && overlays[length - i].get('uuid') === uuid) {
          this.getMap().removeOverlay(overlays[length - i]);
        }
      }
    }
    if (this.layer && this.layer.getSource()) {
      var source = this.layer.getSource();
      var features = source.getFeatures();
      features.forEach(function (feat) {
        if (feat.get('uuid') === uuid) {
          source.removeFeature(feat);
        }
      }, this);
    }
  };

  MeasureTool.prototype.setTool = function setTool(active, key, freehand) {
    this.removeLastInteraction_();
    if (active && key && this.measureTypes.hasOwnProperty(key)) {
      this.isActive_ = active;
      this.freehand = freehand;
      this.measureType = key;
      if (!this.layer) {
        var _style = StyleFactory.getStyle(this.finshStyle);
        this.layer = createVectorLayer(this.getMap(), this.layerName, {
          create: true
        });
        this.layer.setStyle(_style);
      }
      this.addDrawInteractions_(this.measureTypes[key]['type']);
    }
  };

  MeasureTool.prototype.removeLastInteraction_ = function removeLastInteraction_() {
    this.isActive_ = false;
    this.freehand = false;
    this.drawStart_ = false;
    if (this.draw) {
      this.draw.un('drawstart', this.drawStartHandle_, this);
      this.draw.un('drawend', this.drawEndHandle_, this);
      this.getMap().un('singleclick', this.drawClickHandle_, this);
      if (this.measureHelpTooltip && this.measureHelpTooltip instanceof ol.Overlay) {
        this.getMap().removeOverlay(this.measureHelpTooltip);
        this.measureHelpTooltip = null;
      }
      this.clickCount = '';
      this.disActionInteraction();
      this.getMap().removeInteraction(this.draw);
      this.measureType = '';
    }
  };

  MeasureTool.prototype.getTool = function getTool() {
    return this.isActive_;
  };

  MeasureTool.prototype.setActive = function setActive(active) {
    _ol$interaction$Point.prototype.setActive.call(this, active);
  };

  MeasureTool.prototype.disActionInteraction = function disActionInteraction() {
    var _this3 = this;

    this.doubleClickZoom = this.getDoubleClickZoomInteraction();
    var active = this.doubleClickZoom.getActive();
    this.doubleClickZoom.setActive(false);
    window.setTimeout(function () {
      _this3.doubleClickZoom.setActive(active);
    }, 200);
  };

  MeasureTool.prototype.getDoubleClickZoomInteraction = function getDoubleClickZoomInteraction() {
    var _this4 = this;

    if (!this.doubleClickZoom) {
      var items = this.getMap().getInteractions().getArray();
      items.every(function (item) {
        if (item && item instanceof ol.interaction.DoubleClickZoom) {
          _this4.doubleClickZoom = item;
          return false;
        } else {
          return true;
        }
      });
    }
    return this.doubleClickZoom;
  };

  MeasureTool.prototype.formatData = function formatData(geom) {
    var output = 0;
    if (geom) {
      if (this.measureTypes.measureLength['name'] === this.measureType) {
        if (this.isGeodesic) {
          var _ref = [geom.getCoordinates(), 0],
              coordinates = _ref[0],
              length = _ref[1];

          var sourceProj = this.getMap().getView().getProjection();
          for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
            var c1 = ol.proj.transform(coordinates[i], sourceProj, 'EPSG:4326');
            var c2 = ol.proj.transform(coordinates[i + 1], sourceProj, 'EPSG:4326');
            length += this.wgs84Sphere.haversineDistance(c1, c2);
          }
          if (length > 100) {
            output = Math.round(length / 1000 * 100) / 100 + ' ' + '公里';
          } else {
            output = Math.round(length * 100) / 100 + ' ' + '米';
          }
        } else {
          output = Math.round(geom.getLength() * 100) / 100;
        }
      } else if (this.measureType === 'measureArea') {
        if (this.isGeodesic) {
          var _sourceProj = this.getMap().getView().getProjection();
          var geometry = geom.clone().transform(_sourceProj, 'EPSG:4326');
          var _coordinates = geometry.getLinearRing(0).getCoordinates();
          var area = Math.abs(this.wgs84Sphere.geodesicArea(_coordinates));
          if (area > 10000000000) {
            output = Math.round(area / (1000 * 1000 * 10000) * 100) / 100 + ' ' + '万平方公里';
          } else if (area > 1000000 && area < 10000000000) {
            output = Math.round(area / (1000 * 1000) * 100) / 100 + ' ' + '平方公里';
          } else {
            output = Math.round(area * 100) / 100 + ' ' + '平方米';
          }
        } else {
          output = geom.getArea();
        }
      } else if (this.measureType === 'measureCircle') {
        var _sourceProj2 = this.getMap().getView().getProjection();
        var circle = geom.clone().transform(_sourceProj2, 'EPSG:4326');
        var polygon = ol.geom.Polygon.fromCircle(circle, 64, 0);
        if (this.isGeodesic) {
          var _coordinates2 = polygon.getLinearRing(0).getCoordinates();
          var _area4 = Math.abs(this.wgs84Sphere.geodesicArea(_coordinates2));
          if (_area4 > 10000000000) {
            output = Math.round(_area4 / (1000 * 1000 * 10000) * 100) / 100 + ' ' + '万平方公里';
          } else if (_area4 > 1000000 && _area4 < 10000000000) {
            output = Math.round(_area4 / (1000 * 1000) * 100) / 100 + ' ' + '平方公里';
          } else {
            output = Math.round(_area4 * 100) / 100 + ' ' + '平方米';
          }
        } else {
          output = polygon.getArea();
        }
      }
    }
    return output;
  };

  return MeasureTool;
}(ol.interaction.Pointer);

MeasureTool.handleMoveEvent_ = function (mapBrowserEvent) {
  if (this.getTool()) {
    if (this.drawStart_ && !mapBrowserEvent.dragging && this.measureType === this.measureTypes.measureCircle['name']) {
      this.afterDrawPointClickHandler(mapBrowserEvent);
    } else if (!this.drawStart_ && !mapBrowserEvent.dragging) {
      this.beforeDrawPointClickHandler(mapBrowserEvent);
    } else if (this.drawStart_ && !mapBrowserEvent.dragging) {
      this.afterDrawPointClickHandler(mapBrowserEvent);
    } else if (this.freehand && this.drawStart_ && mapBrowserEvent.dragging) {
      this.afterDragHandler_(mapBrowserEvent);
    }
  }
};

MeasureTool.handleDownEvent_ = function (mapBrowserEvent) {
  if (this.freehand) {
    console.log(mapBrowserEvent);
  }
};

MeasureTool.handleDragEvent_ = function (mapBrowserEvent) {
  if (this.freehand) {
    console.log(mapBrowserEvent);
  }
};



var index$4 = Object.freeze({
	MeasureTool: MeasureTool,
	LayerMagnify: LayerMagnify,
	LayerSpyglass: LayerSpyglass,
	FreeHandCircle: FreeHandCircle
});

var Popover = function (_ol$Overlay) {
  inherits(Popover, _ol$Overlay);

  function Popover() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, Popover);

    var _uuid = options['id'] || uuid();
    var _layerName = options['layerName'] || 'popover-feature-layer';
    var _className = options['className'] || 'ole-js-popup';
    var container = create('div', _className + ' ' + BASE_CLASS_NAME.CLASS_SELECTABLE);
    var content = create('div', _className + '-content', container);

    var _this = possibleConstructorReturn(this, _ol$Overlay.call(this, {
      element: container,
      stopEvent: options['stopEvent'] !== undefined ? options['stopEvent'] : true,
      offset: options['offset'] !== undefined ? options['offset'] : [0, 0],
      position: options['position'],
      positioning: options['positioning'],
      id: _uuid,
      autoPan: options['autoPan'],
      autoPanAnimation: options['autoPanAnimation'] || { duration: 1000 },
      autoPanMargin: options['autoPanMargin'],
      insertFirst: options.hasOwnProperty('insertFirst') ? options.insertFirst : false
    }));

    _this.set('layerName', _layerName);

    _this.uuid = _uuid;

    if (options['markIcon']) {
      _this.markIcon = options['markIcon'];
    } else {
      _this.markIcon = 'data:image;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAcCAYAAAC6YTVCAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAA7BWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMTQgNzkuMTUxNDgxLCAyMDEzLzAzLzEzLTEyOjA5OjE1ICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgKE1hY2ludG9zaCk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMTYtMDQtMDdUMTE6MDM6MzkrMDg6MDA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxNi0wNC0wN1QyMDozMDoxNSswODowMDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMTYtMDQtMDdUMjA6MzA6MTUrMDg6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDxwaG90b3Nob3A6SUNDUHJvZmlsZT5zUkdCIElFQzYxOTY2LTIuMTwvcGhvdG9zaG9wOklDQ1Byb2ZpbGU+CiAgICAgICAgIDx4bXBNTTpJbnN0YW5jZUlEPnhtcC5paWQ6MDk1Y2NlYjctNjUzMC00YjlhLTkzMWMtZjFlNGVkMDFkMjNkPC94bXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD54bXAuZGlkOjU5MmJmNDUyLTlhOWEtNDBiYS04YWUzLWQxZTVlZDg4MDVmZjwveG1wTU06RG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD54bXAuZGlkOjU5MmJmNDUyLTlhOWEtNDBiYS04YWUzLWQxZTVlZDg4MDVmZjwveG1wTU06T3JpZ2luYWxEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06SGlzdG9yeT4KICAgICAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmNyZWF0ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDo1OTJiZjQ1Mi05YTlhLTQwYmEtOGFlMy1kMWU1ZWQ4ODA1ZmY8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTYtMDQtMDdUMTE6MDM6MzkrMDg6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAoTWFjaW50b3NoKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmNvbnZlcnRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6cGFyYW1ldGVycz5mcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nPC9zdEV2dDpwYXJhbWV0ZXJzPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDowOTVjY2ViNy02NTMwLTRiOWEtOTMxYy1mMWU0ZWQwMWQyM2Q8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTYtMDQtMDdUMjA6MzA6MTUrMDg6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAoTWFjaW50b3NoKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT4xPC9leGlmOkNvbG9yU3BhY2U+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj4xMzwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj4yODwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+u0hEhgAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAB/klEQVR42pSSP08UYRDGf89lAWNi4h/kOkxItCFqYSkQSipqPwAWgIXkEv0Wl1gctn4Tw3ImlBAqaA4t9DaSnMZEip13x+Levds7ciCTzCab93memXlm9Ht1FSRwB7SE2MZ9GfQQ8RN8H6eFaOMCOeqtrAAkDh+ALWLIwUU1doG3QJ5YMHB9BDY0M83M2hrh21fs8Ah3B0H8bOFMI3+dmIWXgg2A6acvmFlfxy8u6G1u4hHuw2obgk+JmW2XD8XxMVNHR+QnJ+RmA2SVKHijs+fPukAdNFCmBHn0aGQ0vid5bvVSQiVawqNEVSqSZxMLlgH1qpxiP16a4EOai/PEcvsMvOqrll6PzFDyUH9PqQ7nHy0h9hmZiMu/7kgCWK5ZYW2z0ApWEMwIIYymGRYCRREIZq0QrJ0UVoDYoW/f1rCnSyV3gR1wdFCfG6Lcl5C2gRVgFuccPEVqAe2BUQdz9cqh9W368u79jyzrdjuds/lGmj6o+o0cuY+urtlsAniWZZx1OnSzTHt7eyOYGhPCuXTl15N0BWsiaXhTNyH5mPP/RZpY50ojJpe6ZqabGoEm9leTRDWHFB9MNY6pVZq5Dyw0Go3F/hkKIdI0XQQW4rsAkkh6DNwZHynu9lbMe8AscFr282ScNCH+VEmKSneB28BUNKkAcuAv8AvoAf5vALfw5dErL2VFAAAAAElFTkSuQmCC';
    }

    if (options['showCloser']) {
      var closer = create('div', _className + '-closer', container);
      closer.innerHTML = '+';
      on(closer, 'click', _this.handleCloseClick, _this);
    }
    if (options['showMinimize']) {
      var minimize = create('div', _className + '-minimize', container);
      minimize.innerHTML = '_';
      on(minimize, 'click', _this.showMinimize, _this);
    }
    if (options['properties']) {
      _this.setProperties(options['properties']);
    }

    _this.minimizeText = options['minimizeText'] || '我的标记';

    _this.miniOverLay = null;

    _this._showMarkFeature = options['showMarkFeature'] || false;
    _this.container = container;
    _this.content = content;
    return _this;
  }

  Popover.prototype.handleCloseClick = function handleCloseClick(event) {
    stopPropagation(event);
    if (!this.getMap()) return;
    var layer = getLayerByLayerName(this.getMap(), this.get('layerName'));
    layer.getSource().removeFeature(this.markFeature);
    this.markFeature = null;
    this.getMap().removeOverlay(this);
  };

  Popover.prototype.showMinimize = function showMinimize(event) {
    var _this2 = this;

    stopPropagation(event);
    if (!this.getMap()) return;
    if (this._showMarkFeature) {
      if (!this.miniOverLay) {
        var element = create('span', 'ole-marker-minimize-panel');
        element.setAttribute('data-state', 'block');
        this.container.style.display = 'none';
        var eventListener = function eventListener(event) {
          var e = !event ? window.event : event;
          stopPropagation(e);
          _this2.container.style.display = 'block';
          _this2.miniOverLay.getElement().style.display = 'none';
          _this2.miniOverLay.getElement().setAttribute('data-state', 'none');
        };
        off(element, 'click', eventListener, this);
        on(element, 'click', eventListener, this);
        var label = create('label', 'ole-marker-minimize-label', element);
        label.innerText = this.minimizeText;
        label.setAttribute('title', this.minimizeText);
        this.miniOverLay = new ol.Overlay({
          element: element,
          stopEvent: true,
          offset: [0, 0],
          id: this.uuid + '_minimize',
          position: this.coords
        });
        this.getMap().addOverlay(this.miniOverLay);
      } else {
        this.miniOverLay.getElement().style.display = 'block';
        this.container.style.display = 'none';
        this.miniOverLay.getElement().setAttribute('data-state', 'block');
        this.miniOverLay.setPosition(this.coords);
      }
    }
  };

  Popover.prototype.show = function show(coordinates, html) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (options['dataProjection'] && options['featureProjection']) {
      var geom = new ol.geom.Point(coordinates);
      this.coords = geom.transform(options['dataProjection'], options['featureProjection']).getCoordinates();
    } else {
      this.coords = coordinates;
    }
    if (html instanceof HTMLElement) {
      this.content.innerHTML = '';
      this.content.appendChild(html);
    } else {
      this.content.innerHTML = html;
    }
    setStyle(this.container, 'display', 'block');
    this.content.scrollTop = 0;
    if (this._showMarkFeature) {
      this.showMarkFeature(this.coords);
    }
    if (this.markFeature) {
      var size = this.markFeature.getStyle().getImage().getSize() || options['size'] || [13, 28];
      if (size && this.get('offset')) {
        var offset_ = [this.getOffset()[0], this.getOffset()[1] - size[1]];
        this.setOffset(offset_);
      }
    }
    this.setPosition(this.coords);
    this.updateSize();
    return this;
  };

  Popover.prototype.showMarkFeature = function showMarkFeature(coordinates) {
    var _this3 = this;

    if (!this.getMap() || !coordinates || coordinates.length < 2) return;
    this.markFeature = new ol.Feature({
      params: {
        moveable: true
      },
      geometry: new ol.geom.Point(coordinates)
    });
    this.set('markFeature', this.markFeature);
    var style = StyleFactory.getStyle({
      image: {
        type: 'icon',
        image: {
          imageAnchor: [0.5, 1],
          imageAnchorXUnits: 'fraction',
          imageAnchorYUnits: 'fraction',
          imageOpacity: 1,
          imageSrc: this.markIcon
        }
      }
    });
    this.markFeature.setId(this.uuid);
    this.markFeature.setStyle(style);
    this.markFeature.on('featureMove', function (event) {
      var coords = _this3.markFeature.getGeometry().getCoordinates();
      _this3.coords = coords;
      _this3.setPosition(coords);
      if (_this3.miniOverLay) {
        _this3.miniOverLay.setPosition(_this3.coords);
      }
    });
    var layer = createVectorLayer(this.getMap(), this.get('layerName'), {
      create: true
    });
    if (layer && layer instanceof ol.layer.Vector) {
      layer.getSource().addFeature(this.markFeature);
    }
  };

  Popover.prototype.hide = function hide(clear) {
    setStyle(this.container, 'display', 'none');
    if (this.getMap() && clear && this && this.uuid) {
      this.getMap().removeOverlay(this);
    }
    return this;
  };

  Popover.prototype.updateSize = function updateSize() {
    if (this.container) {
      setStyle(this.container, {
        marginLeft: -this.container.clientWidth / 2 - 1 + 'px',
        display: 'block',
        opacity: 1,
        scrollTop: 0
      });
    }
    this.getMap() && this.getMap().render();
    return this;
  };

  Popover.prototype.isOpened = function isOpened() {
    return this.container.style.display === 'block';
  };

  Popover.prototype.isTouchDevice_ = function isTouchDevice_() {
    try {
      document.createEvent('TouchEvent');
      return true;
    } catch (e) {
      return false;
    }
  };

  Popover.prototype.enableTouchScroll_ = function enableTouchScroll_(elm) {
    if (this.isTouchDevice_()) {
      var scrollStartPos = 0;
      on(elm, 'touchstart', function (event) {
        scrollStartPos = this.scrollTop + event.touches[0].pageY;
      }, this);
      on(elm, 'touchmove', function (event) {
        this.scrollTop = scrollStartPos - event.touches[0].pageY;
      }, this);
    }
  };

  return Popover;
}(ol.Overlay);

var Geofence = function (_ol$Object) {
  inherits(Geofence, _ol$Object);

  Geofence._add = function _add(source, item) {
    if (Array.isArray(source)) {
      if (source.indexOf(item) > -1) {
        throw new Error('禁止添加相同id的数据');
      } else {
        source.push(item);
        return false;
      }
    } else {
      throw new Error('不是数组！');
    }
  };

  function Geofence() {
    classCallCheck(this, Geofence);

    var _this = possibleConstructorReturn(this, _ol$Object.call(this));

    _this.geofences_ = [];
    _this.geofencesIds_ = [];
    return _this;
  }

  Geofence.prototype.addGeofence = function addGeofence(geom, options) {
    if (geom && (geom instanceof ol.geom.Polygon || geom instanceof ol.geom.Circle)) {
      if (geom.get('id')) {
        Geofence._add(this.geofencesIds_, geom.get('id'));
        this.geofences_.push(geom);
      } else {
        geom.set('id', uuid());
        Geofence._add(this.geofencesIds_, geom.get('id'));
        this.geofences_.push(geom);
      }
    } else {
      throw new Error('传入的不是面数据!');
    }
  };

  Geofence.prototype.getAllGeofences = function getAllGeofences() {};

  Geofence.prototype.getGeofence = function getGeofence() {};

  Geofence.prototype.queryGeofence = function queryGeofence() {};

  Geofence.prototype.clear = function clear() {};

  Geofence.prototype.creatWatcherInternel = function creatWatcherInternel() {};

  Geofence.prototype.addVisitors = function addVisitors(features) {};

  Geofence.prototype.updateVisitor = function updateVisitor(visitor) {
    if (this.geofences_.length > 0 && visitor instanceof ol.Feature) {
      if (visitor.get('isEnter') === undefined) visitor.set('isEnter', false);
      for (var i = 0; i < this.geofences_.length; i++) {
        var fence = this.geofences_[i];
        var isEnter = visitor.get('isEnter');
        var coordinates = visitor.getGeometry().getCoordinates();
        var _isIntersects = fence.intersectsCoordinate(coordinates);
        if (isEnter && _isIntersects) {
          this.actionDwell(visitor, fence);
        } else if (!isEnter && _isIntersects) {
          this.actionEnter(visitor, fence);
        } else if (isEnter && !_isIntersects) {
          this.actionLeave(visitor, fence);
        }
      }
    }
  };

  Geofence.prototype.actionEnter = function actionEnter(visitor, fence) {
    visitor.set('isEnter', true);
    this.dispatchEvent({
      type: 'enter',
      target: this,
      visitor: visitor,
      geoFences: fence
    });
  };

  Geofence.prototype.actionLeave = function actionLeave(visitor, fence) {
    visitor.set('isEnter', false);
    this.dispatchEvent({
      type: 'leave',
      target: this,
      visitorId: visitor,
      geoFences: fence
    });
  };

  Geofence.prototype.actionDwell = function actionDwell(visitor, fence) {
    this.dispatchEvent({
      type: 'dwell',
      target: this,
      visitor: visitor,
      geoFences: fence
    });
  };

  Geofence.prototype.removeVisitor = function removeVisitor() {};

  Geofence.prototype.clearVisitors = function clearVisitors() {};

  return Geofence;
}(ol.Object);

exports.utils = index;
exports.layer = index$1;
exports.source = index$2;
exports.control = index$3;
exports.interaction = index$4;
exports.layerUtils = layerUtils;
exports.StyleFactory = StyleFactory;
exports.Popover = Popover;
exports.Geofence = Geofence;
exports.CanvasLayer = CanvasLayer;
exports.DozensLayer = DozensLayer;
exports.Baidu = Baidu;
exports.Gaode = Gaode;
exports.Google = Google;
exports.Loading = Loading;
exports.FullScreen = FullScreen;
exports.ZoomMenu = ZoomMenu;
exports.ScaleLine = ScaleLine;
exports.RotateControl = RotateControl;
exports.OverviewMap = OverviewMap;
exports.MousePosition = MousePosition;
exports.LayerSwitcher = LayerSwitcher;
exports.ContextMenu = ContextMenu;
exports.CompareLayer = CompareLayer;
exports.ZoomSlider = ZoomSlider;
exports.MeasureTool = MeasureTool;
exports.LayerMagnify = LayerMagnify;
exports.LayerSpyglass = LayerSpyglass;
exports.FreeHandCircle = FreeHandCircle;

Object.defineProperty(exports, '__esModule', { value: true });

})));
