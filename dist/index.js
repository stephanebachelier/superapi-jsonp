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