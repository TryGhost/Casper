(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

/* global document window */
var layer1 = require('@tryghost/members-layer1');

module.exports = function layer2(options) {
  var authUrl = "".concat(options.membersUrl, "/auth");
  var gatewayUrl = "".concat(options.membersUrl, "/gateway");
  var container = options.container;
  var members = layer1({
    gatewayUrl: gatewayUrl,
    container: container
  });
  var loadAuth = loadFrame(authUrl, container).then(function (frame) {
    frame.style.position = 'fixed';
    frame.style.width = '100%';
    frame.style.height = '100%';
    frame.style.background = 'transparent';
    frame.style.top = '0';
    frame.style['z-index'] = '9999';
    return frame;
  });

  function openAuth(hash) {
    var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    return loadAuth.then(function (frame) {
      return new Promise(function (resolve) {
        frame.src = "".concat(authUrl, "#").concat(hash, "?").concat(query);
        frame.style.display = 'block';
        window.addEventListener('message', function messageListener(event) {
          if (event.source !== frame.contentWindow) {
            return;
          }

          if (!event.data || event.data.msg !== 'pls-close-auth-popup') {
            return;
          }

          window.removeEventListener('message', messageListener);
          frame.style.display = 'none';
          resolve(!!event.data.success);
        });
      });
    });
  }

  function resetPassword(_ref) {
    var token = _ref.token;
    var query = "token=".concat(token);
    return openAuth('reset-password', query);
  }

  function signin() {
    return openAuth('signin');
  }

  function upgrade() {
    return openAuth('upgrade');
  }

  function getToken(_ref2) {
    var audience = _ref2.audience;
    return members.getToken({
      audience: audience
    });
  }

  function signout() {
    return members.signout();
  }

  return Object.assign(members.bus, {
    getToken: getToken,
    signout: signout,
    signin: signin,
    upgrade: upgrade,
    resetPassword: resetPassword
  });
};

function loadFrame(src) {
  var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;
  return new Promise(function (resolve) {
    var frame = document.createElement('iframe');
    frame.style.display = 'none';
    frame.src = src;

    frame.onload = function () {
      resolve(frame);
    };

    container.appendChild(frame);
  });
}

},{"@tryghost/members-layer1":2}],2:[function(require,module,exports){
"use strict";

/* global document */
var layer0 = require('@tryghost/members-layer0');

var events = require('minivents');

module.exports = function layer1(options) {
  var members = {
    getToken: getToken,
    signout: signout,
    signin: signin,
    signup: signup,
    requestPasswordReset: requestPasswordReset,
    resetPassword: resetPassword,
    verifyEmail: verifyEmail,
    bus: new events()
  };
  var loadGateway = loadFrame(options.gatewayUrl, options.container).then(function (frame) {
    var gateway = layer0(frame);
    var init = gatewayFn('init');
    gateway.listen(function (data) {
      members.bus.emit(data.event, data.payload);
    });
    return init(gateway).then(function () {
      return gateway;
    });
  });

  function getToken(_ref) {
    var audience = _ref.audience;
    return loadGateway.then(gatewayFn('getToken', {
      audience: audience
    }));
  }

  function signout() {
    return loadGateway.then(gatewayFn('signout'));
  }

  function signin(_ref2) {
    var email = _ref2.email,
        password = _ref2.password;
    return loadGateway.then(gatewayFn('signin', {
      email: email,
      password: password
    }));
  }

  function signup(_ref3) {
    var name = _ref3.name,
        email = _ref3.email,
        password = _ref3.password;
    return loadGateway.then(gatewayFn('signin', {
      name: name,
      email: email,
      password: password
    }));
  }

  function requestPasswordReset(_ref4) {
    var email = _ref4.email;
    return loadGateway.then(gatewayFn('request-password-reset', {
      email: email
    }));
  }

  function resetPassword(_ref5) {
    var token = _ref5.token,
        password = _ref5.password;
    return loadGateway.then(gatewayFn('reset-password', {
      token: token,
      password: password
    }));
  }

  function verifyEmail(_ref6) {
    var token = _ref6.token;
    return loadGateway.then(gatewayFn('verify-email', {
      token: token
    }));
  }

  return members;
};

function gatewayFn(method) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return function (gateway) {
    return new Promise(function (resolve, reject) {
      gateway.call(method, opts, function (err, res) {
        if (err) {
          reject(err);
        }

        resolve(res);
      });
    });
  };
}

function loadFrame(src) {
  var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;
  return new Promise(function (resolve) {
    var frame = document.createElement('iframe');
    frame.style.display = 'none';
    frame.src = src;

    frame.onload = function () {
      resolve(frame);
    };

    container.appendChild(frame);
  });
}

},{"@tryghost/members-layer0":3,"minivents":4}],3:[function(require,module,exports){
"use strict";

/* globals window */
module.exports = function layer0(frame) {
  var getuid = function (i) {
    return function () {
      return i += 1;
    };
  }(1);

  var origin = new URL(frame.getAttribute('src')).origin;
  var handlers = {};

  var listener = function listener() {};

  window.addEventListener('message', function (event) {
    if (event.origin !== origin) {
      return;
    }

    if (!event.data || !event.data.uid) {
      if (event.data.event) {
        return listener(event.data);
      }

      return;
    }

    var handler = handlers[event.data.uid];

    if (!handler) {
      return;
    }

    delete handlers[event.data.uid];
    handler(event.data.error, event.data.data);
  });

  function call(method, options, cb) {
    var uid = getuid();
    var data = {
      uid: uid,
      method: method,
      options: options
    };
    handlers[uid] = cb;
    frame.contentWindow.postMessage(data, origin);
  }

  function listen(fn) {
    listener = fn;
  }

  return {
    call: call,
    listen: listen
  };
};

},{}],4:[function(require,module,exports){
"use strict";

module.exports = function (n) {
  var t = {},
      e = [];
  n = n || this, n.on = function (e, r, l) {
    return (t[e] = t[e] || []).push([r, l]), n;
  }, n.off = function (r, l) {
    r || (t = {});

    for (var o = t[r] || e, u = o.length = l ? o.length : 0; u--;) {
      l == o[u][0] && o.splice(u, 1);
    }

    return n;
  }, n.emit = function (r) {
    for (var l, o = t[r] || e, u = o.length > 0 ? o.slice(0, o.length) : o, i = 0; l = u[i++];) {
      l[0].apply(l[1], e.slice.call(arguments, 1));
    }

    return n;
  };
};

},{}],5:[function(require,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
  * domready (c) Dustin Diaz 2014 - License MIT
  */
!function (name, definition) {
  if (typeof module != 'undefined') module.exports = definition();else if (typeof define == 'function' && _typeof(define.amd) == 'object') define(definition);else this[name] = definition();
}('domready', function () {
  var fns = [],
      _listener,
      doc = document,
      hack = doc.documentElement.doScroll,
      domContentLoaded = 'DOMContentLoaded',
      loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState);

  if (!loaded) doc.addEventListener(domContentLoaded, _listener = function listener() {
    doc.removeEventListener(domContentLoaded, _listener);
    loaded = 1;

    while (_listener = fns.shift()) {
      _listener();
    }
  });
  return function (fn) {
    loaded ? setTimeout(fn, 0) : fns.push(fn);
  };
});

},{}],6:[function(require,module,exports){
"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/* global window document atob */
var domready = require('domready');

var layer2 = require('@tryghost/members-layer2');

domready(setupMembersListeners);

function reload(success) {
  if (success) {
    window.location.reload();
  }
}

var log = function log(x) {
  return window['con' + 'sole']['l' + 'og'](x);
};

function setupMembersListeners() {
  var members = layer2({
    membersUrl: window.membersUrl
  });
  var tokenAudience = new URL(window.location.href).origin;

  var _ref = window.location.hash.match(/^#([^?]+)\??(.*)$/) || [],
      _ref2 = _slicedToArray(_ref, 3),
      hashMatch = _ref2[0],
      hash = _ref2[1],
      query = _ref2[2];

  if (hashMatch && hash === 'reset-password') {
    var _ref3 = query.match(/token=([a-zA-Z0-9-_]+.[a-zA-Z0-9-_]+.[a-zA-Z0-9-_]+)/) || [],
        _ref4 = _slicedToArray(_ref3, 2),
        tokenMatch = _ref4[0],
        token = _ref4[1];

    if (tokenMatch) {
      return members.resetPassword({
        token: token
      }).then(function (success) {
        window.location.hash = '';
        return success;
      }).then(reload);
    }
  }

  var signinEls = document.querySelectorAll('[data-members-signin]');
  var upgradeEls = document.querySelectorAll('[data-members-upgrade]');
  var signoutEls = document.querySelectorAll('[data-members-signout]');
  members.on('signedin', function () {
    log('signedin event');
    var currentCookies = document.cookie;

    var _ref5 = currentCookies.match(/member=([a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]*)/) || [null],
        _ref6 = _slicedToArray(_ref5, 2),
        hasCurrentToken = _ref6[0],
        currentToken = _ref6[1]; // eslint-disable-line no-unused-vars


    if (currentToken && isTokenExpired(currentToken)) {
      return members.signout();
    }

    members.getToken({
      audience: tokenAudience
    }).then(function (token) {
      log('Setting the cookie from signedin event');
      document.cookie = 'member=' + token;
    });
  });
  members.on('signedout', function () {
    document.cookie = 'member=null';
  });

  function signout(event) {
    event.preventDefault();
    members.signout().then(function () {
      document.cookie = 'member=null';
      return true;
    }).then(reload);
  }

  function signin(event) {
    event.preventDefault();
    members.signin().then(function () {
      return members.getToken({
        audience: tokenAudience
      }).then(function (token) {
        document.cookie = 'member=' + token;
        return true;
      });
    }).then(reload);
  }

  function upgrade(event) {
    event.preventDefault();
    members.upgrade().then(reload);
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = signinEls[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var el = _step.value;
      el.addEventListener('click', signin);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = upgradeEls[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _el = _step2.value;

      _el.addEventListener('click', upgrade);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = signoutEls[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var _el2 = _step3.value;

      _el2.addEventListener('click', signout);
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }
}

function isTokenExpired(token) {
  var claims = getClaims(token);

  if (!claims) {
    return true;
  }

  var expiry = claims.exp * 1000;
  var now = Date.now();

  if (expiry < now) {
    return true;
  }

  return false;
}

function getClaims(token) {
  try {
    var _token$split = token.split('.'),
        _token$split2 = _slicedToArray(_token$split, 3),
        header = _token$split2[0],
        claims = _token$split2[1],
        signature = _token$split2[2]; // eslint-disable-line no-unused-vars


    var parsedClaims = JSON.parse(atob(claims.replace('+', '-').replace('/', '_')));
    return parsedClaims;
  } catch (e) {
    return null;
  }
}

},{"@tryghost/members-layer2":1,"domready":5}]},{},[6]);
