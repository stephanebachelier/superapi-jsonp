(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("superapi-jsonp", [], factory);
	else if(typeof exports === 'object')
		exports["superapi-jsonp"] = factory();
	else
		root["superapi-jsonp"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = jsonp;
	function load(src, async) {
	  var s = document.createElement('script');
	
	  s.src = src;
	  if (typeof async === 'boolean') {
	    s.async = async;
	  }
	  (document.head || document.body).appendChild(s);
	  return s;
	}
	
	function callbackName() {
	  return 'jsonp' + Date.now() + parseInt(Math.random() * 1000, 10);
	}
	
	function serialize(name, callback) {
	  return (callback || 'callback') + '=' + encodeURIComponent(name);
	}
	
	function url(url, name, callback) {
	  var separator = url.indexOf('?') > -1 ? '&' : '?';
	
	  return [url, serialize(name, callback)].join(separator);
	}
	
	function jsonp(config) {
	  return function (req, next, service) {
	    if (service) {
	      var useJsonp = !service.use || service.use && service.use.jsonp !== false;
	
	      if (!useJsonp) {
	        return null;
	      }
	    }
	
	    return new Promise(function (resolve) {
	      var script = void 0;
	      var name = callbackName();
	
	      window[name] = function (json) {
	        // cleanup after the call
	        delete window[name];
	        script.parentNode.removeChild(script);
	        // execute provided callback
	        resolve(json);
	      };
	
	      script = load(url(req.url, name, 'callback'), true);
	    });
	  };
	}
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=superapi-jsonp.js.map