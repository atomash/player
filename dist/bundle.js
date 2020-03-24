/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ts_player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ts/player */ \"./src/ts/player.ts\");\n\r\nwindow.DemoPlayer = _ts_player__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (_ts_player__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/scss/style.scss":
/*!*****************************!*\
  !*** ./src/scss/style.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/scss/style.scss?");

/***/ }),

/***/ "./src/ts/createPlayer.ts":
/*!********************************!*\
  !*** ./src/ts/createPlayer.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return createPlayer; });\nfunction createPlayer(opt) {\r\n    var block = document.createElement('div');\r\n    block.classList.add('player');\r\n    block.insertAdjacentHTML('afterbegin', \"\\n    <div class=\\\"player-visualizer\\\"></div>\\n      <div class=\\\"player-wrap\\\">\\n      \\n      <div class=\\\"player-item\\\"><span class=\\\"audio-title\\\">unknown</span></div>\\n      <div class=\\\"player-item\\\"><div class=\\\"play-btn\\\"><i class=\\\"icon-play\\\"></i></div></div>\\n      <div class=\\\"player-item\\\">\\n        <div class=\\\"wrap\\\">\\n        <span id=\\\"time\\\">00:00</span>\\n            <input type=\\\"range\\\" min=\\\"0\\\" max=\\\"100\\\" value=\\\"0\\\" class=\\\"range current-time-range\\\" data-range=\\\"current-time-range\\\" />\\n          <span id=\\\"duration\\\">00:00</span>\\n        </div>\\n\\n    </div>\\n      <div class=\\\"player-item \\\"> \\n        <div class=\\\"wrap volume\\\">\\n        <span><i class=\\\"icon-volume-off\\\"></i></span>\\n            <input type=\\\"range\\\" min=\\\"0\\\" max=\\\"100\\\" value=\\\"50\\\" class=\\\"range volume-range\\\" data-range=\\\"volume-range\\\" />\\n          <span><i class=\\\"icon-volume-up\\\"></i></span>\\n        </div></div>\\n      </div>\\n    \");\r\n    opt.render.appendChild(block);\r\n    return block;\r\n}\r\n\n\n//# sourceURL=webpack:///./src/ts/createPlayer.ts?");

/***/ }),

/***/ "./src/ts/events.ts":
/*!**************************!*\
  !*** ./src/ts/events.ts ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar Events = (function () {\r\n    function Events() {\r\n        this.events = {};\r\n    }\r\n    Events.prototype.on = function (name, fn) {\r\n        if (!this.events[name]) {\r\n            this.events[name] = [];\r\n        }\r\n        this.events[name].push(fn);\r\n    };\r\n    Events.prototype.emit = function (name) {\r\n        var params = [];\r\n        for (var _i = 1; _i < arguments.length; _i++) {\r\n            params[_i - 1] = arguments[_i];\r\n        }\r\n        if (this.events[name]) {\r\n            this.events[name].forEach(function (fn) { return fn.apply(void 0, params); });\r\n        }\r\n    };\r\n    return Events;\r\n}());\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Events);\r\n\n\n//# sourceURL=webpack:///./src/ts/events.ts?");

/***/ }),

/***/ "./src/ts/player.ts":
/*!**************************!*\
  !*** ./src/ts/player.ts ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./events */ \"./src/ts/events.ts\");\n/* harmony import */ var _createPlayer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createPlayer */ \"./src/ts/createPlayer.ts\");\n/* harmony import */ var _utils_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/index */ \"./src/ts/utils/index.ts\");\n\r\n\r\n\r\nvar Player = (function () {\r\n    function Player(opt) {\r\n        this.audio = new Audio();\r\n        this.event = new _events__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n        this.$player = Object(_createPlayer__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(opt);\r\n        this.currentTime = 0;\r\n        this.duration = 0;\r\n        this.currentTimeRange = 0;\r\n        this.volume = 0.5;\r\n        this.formattedDuration = '00:00';\r\n        this.formattedCurrentTime = '00:00';\r\n        this.currentTimePercentage = 0;\r\n        this.init();\r\n    }\r\n    Player.prototype.init = function () {\r\n        this.audio.onloadeddata = this.audioLoaded.bind(this);\r\n        this.audio.ontimeupdate = this.listening.bind(this);\r\n        this.audio.volume = this.volume;\r\n        this.initCurrentTimeRange();\r\n        this.initVolume();\r\n        this.$player\r\n            .querySelector('.play-btn')\r\n            .addEventListener('click', this.togglePlay.bind(this));\r\n    };\r\n    Player.prototype.audioLoaded = function () {\r\n        this.event.emit('onSetAudio');\r\n        if (this.audio.duration) {\r\n            this.$player.querySelector('.current-time-range').disabled = false;\r\n        }\r\n        else {\r\n            this.$player.querySelector('.current-time-range').disabled = true;\r\n        }\r\n        this.formattedDuration = Object(_utils_index__WEBPACK_IMPORTED_MODULE_2__[\"formatTime\"])(this.audio.duration);\r\n        this.$player.querySelector('#duration').innerHTML = this.formattedDuration;\r\n    };\r\n    Player.prototype.initCurrentTimeRange = function () {\r\n        var currentTimeRange = this.$player.querySelector('.current-time-range');\r\n        if (!this.audio.duration) {\r\n            currentTimeRange.disabled = true;\r\n        }\r\n        currentTimeRange.addEventListener('input', this.rangeChange.bind(this));\r\n        Object(_utils_index__WEBPACK_IMPORTED_MODULE_2__[\"updateRange\"])(this.currentTimeRange, currentTimeRange);\r\n    };\r\n    Player.prototype.initVolume = function () {\r\n        var volumeRange = this.$player.querySelector('.volume-range');\r\n        volumeRange.addEventListener('input', this.rangeChange.bind(this));\r\n        Object(_utils_index__WEBPACK_IMPORTED_MODULE_2__[\"updateRange\"])(this.volume * 100, volumeRange);\r\n    };\r\n    Player.prototype.rangeChange = function (e) {\r\n        var val = Number(e.target.value);\r\n        if (e.target.dataset.range === 'current-time-range') {\r\n            this.currentTimeRange = val;\r\n            this.event.emit('onCurrentTimeRange', this.currentTimeRange);\r\n        }\r\n        if (e.target.dataset.range === 'volume-range') {\r\n            this.volume = val / 100;\r\n            this.event.emit('onVolume', this.volume);\r\n            this.audio.volume = this.volume;\r\n        }\r\n        Object(_utils_index__WEBPACK_IMPORTED_MODULE_2__[\"updateRange\"])(val, e.target);\r\n    };\r\n    Player.prototype.updateCurrentTimeRange = function () {\r\n        var currentTimeRange = this.$player.querySelector('.current-time-range');\r\n        this.formattedCurrentTime = Object(_utils_index__WEBPACK_IMPORTED_MODULE_2__[\"formatTime\"])(this.audio.currentTime);\r\n        this.$player.querySelector('#time').innerHTML = this.formattedCurrentTime;\r\n        this.currentTimePercentage = Object(_utils_index__WEBPACK_IMPORTED_MODULE_2__[\"getPercentage\"])(this.audio.currentTime, this.audio.duration);\r\n        currentTimeRange.value = \"\" + this.currentTimePercentage;\r\n        Object(_utils_index__WEBPACK_IMPORTED_MODULE_2__[\"updateRange\"])(this.currentTimePercentage, currentTimeRange);\r\n    };\r\n    Player.prototype.listening = function () {\r\n        if (!this.audio.paused) {\r\n            this.updateCurrentTimeRange();\r\n            this.event.emit('onListening', {\r\n                currentTime: this.audio.currentTime,\r\n                duration: this.audio.duration,\r\n                formattedDuration: Object(_utils_index__WEBPACK_IMPORTED_MODULE_2__[\"formatTime\"])(this.audio.duration),\r\n                currentTimePercentage: Object(_utils_index__WEBPACK_IMPORTED_MODULE_2__[\"getPercentage\"])(this.audio.currentTime, this.audio.duration),\r\n                formattedCurrentTime: Object(_utils_index__WEBPACK_IMPORTED_MODULE_2__[\"formatTime\"])(this.audio.currentTime)\r\n            });\r\n        }\r\n    };\r\n    Player.prototype.play = function () {\r\n        this.audio.play();\r\n        this.event.emit('onPlay');\r\n        this.$player.querySelector('.icon-play').className = 'icon-pause';\r\n    };\r\n    Player.prototype.pause = function () {\r\n        this.audio.pause();\r\n        this.event.emit('onPause');\r\n        this.$player.querySelector('.icon-pause').className = 'icon-play';\r\n    };\r\n    Player.prototype.togglePlay = function () {\r\n        if (this.audio.duration) {\r\n            this.audio.paused ? this.play() : this.pause();\r\n        }\r\n    };\r\n    Player.prototype.setAudio = function (src) {\r\n        this.audio.setAttribute('src', src);\r\n        this.audio.load();\r\n    };\r\n    return Player;\r\n}());\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Player);\r\n\n\n//# sourceURL=webpack:///./src/ts/player.ts?");

/***/ }),

/***/ "./src/ts/utils/index.ts":
/*!*******************************!*\
  !*** ./src/ts/utils/index.ts ***!
  \*******************************/
/*! exports provided: updateRange, formatTime, getPercentage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateRange\", function() { return updateRange; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"formatTime\", function() { return formatTime; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getPercentage\", function() { return getPercentage; });\nfunction updateRange(val, target) {\r\n    target.style['background'] =\r\n        'linear-gradient(to right, #22211f 0%, #22211f ' +\r\n            val +\r\n            '%, rgb(214, 214, 214) ' +\r\n            val +\r\n            '%, rgb(214, 214, 214)';\r\n}\r\nfunction formatTime(time) {\r\n    var mins = Math.floor(time / 60);\r\n    if (mins < 10) {\r\n        mins = '0' + String(mins);\r\n    }\r\n    var secs = Math.floor(time % 60);\r\n    if (secs < 10) {\r\n        secs = '0' + String(secs);\r\n    }\r\n    return mins + \":\" + secs;\r\n}\r\nfunction getPercentage(portion, total) {\r\n    return Math.round((portion / total) * 100);\r\n}\r\n\n\n//# sourceURL=webpack:///./src/ts/utils/index.ts?");

/***/ }),

/***/ 0:
/*!**************************************************!*\
  !*** multi ./src/index.ts ./src/scss/style.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./src/index.ts */\"./src/index.ts\");\nmodule.exports = __webpack_require__(/*! ./src/scss/style.scss */\"./src/scss/style.scss\");\n\n\n//# sourceURL=webpack:///multi_./src/index.ts_./src/scss/style.scss?");

/***/ })

/******/ });