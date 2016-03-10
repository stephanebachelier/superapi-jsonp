'use strict'

function load (src, async) {
  const s = document.createElement('script')
  s.src = src
  if (typeof async === 'boolean') {
    s.async = async
  }
  (document.head || document.body).appendChild(s)
  return s
}

function callbackName () {
  return 'jsonp' + Date.now() + parseInt(Math.random() * 1000)
}

function serialize (name, callback) {
  return (callback || 'callback') + '=' + encodeURIComponent(name)
}

function url (url, name, callback) {
  const separator = url.indexOf('?') > -1 ? '&' : '?'

  return [url, serialize(name, callback)].join(separator)
}

export default (config) => {
  return (req, next, service) => {
    if (service) {
      const useJsonp = !service.use || (service.use && (service.use.jsonp !== false))

      if (!useJsonp) {
        return null
      }
    }

    return new Promise(function (resolve) {
      let script
      const name = callbackName()

      window[name] = function (json) {
        // cleanup after the call
        delete window[name]
        script.parentNode.removeChild(script)
        // execute provided callback
        resolve(json)
      }

      script = load(url(req.url, name, 'callback'), true)
    })
  }
}
