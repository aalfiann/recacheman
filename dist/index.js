'use strict';

/**
 * Module dependencies.
 */
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ms = _interopRequireDefault(require("ms"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
/**
 * Module constants.
 */

var engines = ['memory', 'redis', 'mongo', 'file'];

/**
 * Cacheman base error class.
 *
 * @constructor
 * @param {String} message
 * @api private
 */
var CachemanError = /*#__PURE__*/function (_Error) {
  _inherits(CachemanError, _Error);
  var _super = _createSuper(CachemanError);
  function CachemanError(message) {
    var _this2;
    _classCallCheck(this, CachemanError);
    _this2 = _super.call(this, message);
    _this2.name = _this2.constructor.name;
    _this2.message = message;
    Error.captureStackTrace(_assertThisInitialized(_this2), _this2.constructor);
    return _this2;
  }
  return _createClass(CachemanError);
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Helper to allow all async methods to support both callbacks and promises
 */
function maybePromised(_this, callback, wrapped) {
  if ('function' === typeof callback) {
    // Call wrapped with unmodified callback
    wrapped(callback);

    // Return `this` to keep the same behaviour Cacheman had before promises were added
    return _this;
  } else {
    var _Promise = _this.options.Promise;
    if ('function' !== typeof _Promise) {
      throw new CachemanError('Promises not available: Please polyfill native Promise before creating a Cacheman object, pass a Promise library as a Cacheman option, or use the callback interface');
    }
    if (_Promise.fromCallback) {
      // Bluebird's fromCallback, this is faster than new Promise
      return _Promise.fromCallback(wrapped);
    }

    // Standard new Promise based wrapper for native Promises
    return new _Promise(function (resolve, reject) {
      wrapped(function (err, value) {
        if (err) {
          reject(err);
        } else {
          resolve(value);
        }
      });
    });
  }
}

/**
 * Cacheman constructor.
 *
 * @param {String} name
 * @param {Object} options
 * @api public
 */
var Cacheman = /*#__PURE__*/function () {
  /**
   * Class constructor method.
   *
   * @param {String} name
   * @param {Object} [options]
   * @return {Cacheman} this
   * @api public
   */

  function Cacheman(name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, Cacheman);
    if (name && 'object' === _typeof(name)) {
      options = name;
      name = null;
    }
    var _Promise = options.Promise || function () {
      try {
        return Promise;
      } catch (e) {}
    }();
    var _options = options,
      _options$prefix = _options.prefix,
      prefix = _options$prefix === void 0 ? 'cacheman' : _options$prefix,
      _options$engine = _options.engine,
      engine = _options$engine === void 0 ? 'memory' : _options$engine,
      _options$delimiter = _options.delimiter,
      delimiter = _options$delimiter === void 0 ? ':' : _options$delimiter,
      _options$ttl = _options.ttl,
      ttl = _options$ttl === void 0 ? 60 : _options$ttl;
    if ('string' === typeof ttl) {
      ttl = Math.round((0, _ms["default"])(ttl) / 1000);
    }
    prefix = [prefix, name || 'cache', ''].join(delimiter);
    this.options = _objectSpread(_objectSpread({}, options), {}, {
      Promise: _Promise,
      delimiter: delimiter,
      prefix: prefix,
      ttl: ttl,
      count: 1000
    });
    this._prefix = prefix;
    this._ttl = ttl;
    this._fns = [];
    this.engine(engine);
  }

  /**
   * Set get engine.
   *
   * @param {String} engine
   * @param {Object} options
   * @return {Cacheman} this
   * @api public
   */
  _createClass(Cacheman, [{
    key: "engine",
    value: function engine(_engine, options) {
      if (!arguments.length) return this._engine;
      var type = _typeof(_engine);
      if (!/string|function|object/.test(type)) {
        throw new CachemanError('Invalid engine format, engine must be a String, Function or a valid engine instance');
      }
      if ('string' === type) {
        var Engine;
        if (~Cacheman.engines.indexOf(_engine)) {
          _engine = "recacheman-".concat(_engine);
        }
        try {
          Engine = require(_engine);
        } catch (e) {
          if (e.code === 'MODULE_NOT_FOUND') {
            throw new CachemanError("Missing required npm module ".concat(_engine));
          } else {
            throw e;
          }
        }
        this._engine = new Engine(options || this.options, this);
      } else if ('object' === type) {
        ['get', 'set', 'del', 'clear'].forEach(function (key) {
          if ('function' !== typeof _engine[key]) {
            throw new CachemanError('Invalid engine format, must be a valid engine instance');
          }
        });
        this._engine = _engine;
      } else {
        this._engine = _engine(options || this.options, this);
      }
      return this;
    }

    /**
     * Wrap key with prefix.
     *
     * @param {String} key
     * @return {String}
     * @api private
     */
  }, {
    key: "key",
    value: function key(_key) {
      if (Array.isArray(_key)) {
        _key = _key.join(this.options.delimiter);
      }
      return this.options.engine === 'redis' ? _key : this._prefix + _key;
    }

    /**
     * Sets up namespace middleware.
     *
     * @return {Cacheman} this
     * @api public
     */
  }, {
    key: "use",
    value: function use(fn) {
      this._fns.push(fn);
      return this;
    }

    /**
     * Executes the cache middleware.
     *
     * @param {String} key
     * @param {Mixed} data
     * @param {Number} ttl
     * @param {Function} fn
     * @api private
     */
  }, {
    key: "run",
    value: function run(key, data, ttl, fn) {
      var fns = this._fns.slice(0);
      if (!fns.length) return fn(null);
      var go = function go(i) {
        fns[i](key, data, ttl, function (err, _data, _ttl, _force) {
          // upon error, short-circuit
          if (err) return fn(err);

          // if no middleware left, summon callback
          if (!fns[i + 1]) return fn(null, _data, _ttl, _force);

          // go on to next
          go(i + 1);
        });
      };
      go(0);
    }

    /**
     * Set an entry.
     *
     * @param {String} key
     * @param {Mixed} data
     * @param {Number} ttl
     * @param {Function} [fn]
     * @return {Cacheman} this
     * @api public
     */
  }, {
    key: "cache",
    value: function cache(key, data, ttl, fn) {
      var _this3 = this;
      if ('function' === typeof ttl) {
        fn = ttl;
        ttl = null;
      }
      return maybePromised(this, fn, function (fn) {
        _this3.get(key, function (err, res) {
          _this3.run(key, res, ttl, function (_err, _data, _ttl, _force) {
            if (err || _err) return fn(err || _err);
            var force = false;
            if ('undefined' !== typeof _data) {
              force = true;
              data = _data;
            }
            if ('undefined' !== typeof _ttl) {
              force = true;
              ttl = _ttl;
            }
            if ('undefined' === typeof res || force) {
              return _this3.set(key, data, ttl, fn);
            }
            fn(null, res);
          });
        });
      });
    }

    /**
     * Get an entry.
     *
     * @param {String} key
     * @param {Function} [fn]
     * @return {Cacheman} this
     * @api public
     */
  }, {
    key: "get",
    value: function get(key, fn) {
      var _this4 = this;
      return maybePromised(this, fn, function (fn) {
        return _this4._engine.get(_this4.key(key), fn);
      });
    }

    /**
     * Set an entry.
     *
     * @param {String} key
     * @param {Mixed} data
     * @param {Number} ttl
     * @param {Function} [fn]
     * @return {Cacheman} this
     * @api public
     */
  }, {
    key: "set",
    value: function set(key, data, ttl, fn) {
      var _this5 = this;
      if ('function' === typeof ttl) {
        fn = ttl;
        ttl = null;
      }
      if ('string' === typeof ttl) {
        ttl = Math.round((0, _ms["default"])(ttl) / 1000);
      }
      return maybePromised(this, fn, function (fn) {
        if ('string' !== typeof key && !Array.isArray(key)) {
          return process.nextTick(function () {
            fn(new CachemanError('Invalid key, key must be a string or array.'));
          });
        }
        if ('undefined' === typeof data) {
          return process.nextTick(fn);
        }
        return _this5._engine.set(_this5.key(key), data, ttl || _this5._ttl, fn);
      });
    }

    /**
     * Delete an entry.
     *
     * @param {String} key
     * @param {Function} [fn]
     * @return {Cacheman} this
     * @api public
     */
  }, {
    key: "del",
    value: function del(key, fn) {
      var _this6 = this;
      if ('function' === typeof key) {
        fn = key;
        key = '';
      }
      return maybePromised(this, fn, function (fn) {
        return _this6._engine.del(_this6.key(key), fn);
      });
    }

    /**
     * Clear all entries.
     *
     * @param {String} key
     * @param {Function} [fn]
     * @return {Cacheman} this
     * @api public
     */
  }, {
    key: "clear",
    value: function clear(fn) {
      var _this7 = this;
      return maybePromised(this, fn, function (fn) {
        return _this7._engine.clear(fn);
      });
    }

    /**
     * Wraps a function in cache. I.e., the first time the function is run,
     * its results are stored in cache so subsequent calls retrieve from cache
     * instead of calling the function.
     *
     * @param {String} key
     * @param {Function} work
     * @param {Number} ttl
     * @param {Function} [fn]
     * @api public
     */
  }, {
    key: "wrap",
    value: function wrap(key, work, ttl, fn) {
      var _this8 = this;
      // Allow work and ttl to be passed in the oposite order to make promises nicer
      if ('function' !== typeof work && 'function' === typeof ttl) {
        var _ref = [work, ttl];
        ttl = _ref[0];
        work = _ref[1];
      }
      if ('function' === typeof ttl) {
        fn = ttl;
        ttl = null;
      }
      return maybePromised(this, fn, function (fn) {
        _this8.get(key, function (err, res) {
          if (err || res) return fn(err, res);
          var _next = function next(err, data) {
            if (err) return fn(err);
            _this8.set(key, data, ttl, function (err) {
              fn(err, data);
            });

            // Don't allow callbacks to be called twice
            _next = function next() {
              process.nextTick(function () {
                throw new CachemanError('callback called twice');
              });
            };
          };
          if (work.length >= 1) {
            var result = work(function (err, data) {
              return _next(err, data);
            });
            if ('undefined' !== typeof result) {
              process.nextTick(function () {
                throw new CachemanError('return value cannot be used when callback argument is used');
              });
            }
          } else {
            try {
              var _result = work();
              if ('object' === _typeof(_result) && 'function' === typeof _result.then) {
                _result.then(function (value) {
                  return _next(null, value);
                }).then(null, function (err) {
                  return _next(err);
                });
              } else {
                _next(null, _result);
              }
            } catch (err) {
              _next(err);
            }
          }
        });
      });
    }
  }]);
  return Cacheman;
}();
exports["default"] = Cacheman;
Cacheman.engines = engines;
module.exports = exports.default;