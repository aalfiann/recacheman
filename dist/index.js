"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var index_exports = {};
__export(index_exports, {
  default: () => Cacheman
});
module.exports = __toCommonJS(index_exports);
var import_ms = __toESM(require("ms"));
const engines = ["memory", "redis", "mongo", "file"];
class CachemanError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}
function maybePromised(_this, callback, wrapped) {
  if (typeof callback === "function") {
    wrapped(callback);
    return _this;
  } else {
    const _Promise = _this.options.Promise ?? Promise;
    if (typeof _Promise !== "function") {
      throw new CachemanError(
        "Promises not available: Please ensure native Promise is available before creating a Cacheman object or use the callback interface"
      );
    }
    return new _Promise((resolve, reject) => {
      try {
        wrapped((err, value) => {
          if (err) {
            reject(err);
          } else {
            resolve(value);
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  }
}
class Cacheman {
  /**
   * Class constructor method.
   *
   * @param {String} name
   * @param {Object} [options]
   * @return {Cacheman} this
   * @api public
   */
  constructor(name, options = {}) {
    if (name && "object" === typeof name) {
      options = name;
      name = null;
    }
    const _Promise = options.Promise ?? Promise;
    let {
      prefix = "cacheman",
      engine = "memory",
      delimiter = ":",
      ttl = 60
    } = options;
    if ("string" === typeof ttl) {
      ttl = Math.round((0, import_ms.default)(ttl) / 1e3);
    }
    prefix = [prefix, name || "cache", ""].join(delimiter);
    this.options = { Promise: _Promise, delimiter, prefix, ttl, count: 1e3, ...options };
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
  engine(engine, options) {
    if (!arguments.length) return this._engine;
    const type = typeof engine;
    if (!/string|function|object/.test(type)) {
      throw new CachemanError("Invalid engine format, engine must be a String, Function or a valid engine instance");
    }
    if ("string" === type) {
      let Engine;
      if (~Cacheman.engines.indexOf(engine)) {
        engine = `recacheman-${engine}`;
      }
      try {
        Engine = require(engine);
      } catch (e) {
        if (e.code === "MODULE_NOT_FOUND") {
          throw new CachemanError(`Missing required npm module ${engine}`);
        } else {
          throw e;
        }
      }
      this._engine = new Engine(options || this.options, this);
    } else if ("object" === type) {
      ["get", "set", "del", "clear"].forEach((key) => {
        if ("function" !== typeof engine[key]) {
          throw new CachemanError("Invalid engine format, must be a valid engine instance");
        }
      });
      this._engine = engine;
    } else {
      this._engine = engine(options || this.options, this);
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
  key(key) {
    if (Array.isArray(key)) {
      key = key.join(this.options.delimiter);
    }
    return this.options.engine === "redis" ? key : this._prefix + key;
  }
  /**
   * Sets up namespace middleware.
   *
   * @return {Cacheman} this
   * @api public
   */
  use(fn) {
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
  run(key, data, ttl, fn) {
    const fns = this._fns.slice(0);
    if (!fns.length) return fn(null);
    const go = (i) => {
      fns[i](key, data, ttl, (err, _data, _ttl, _force) => {
        if (err) return fn(err);
        if (!fns[i + 1]) return fn(null, _data, _ttl, _force);
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
  cache(key, data, ttl, fn) {
    if ("function" === typeof ttl) {
      fn = ttl;
      ttl = null;
    }
    return maybePromised(this, fn, (fn2) => {
      this.get(key, (err, res) => {
        this.run(key, res, ttl, (_err, _data, _ttl, _force) => {
          if (err || _err) return fn2(err || _err);
          let force = false;
          if ("undefined" !== typeof _data) {
            force = true;
            data = _data;
          }
          if ("undefined" !== typeof _ttl) {
            force = true;
            ttl = _ttl;
          }
          if ("undefined" === typeof res || force) {
            return this.set(key, data, ttl, fn2);
          }
          fn2(null, res);
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
  get(key, fn) {
    return maybePromised(this, fn, (fn2) => this._engine.get(this.key(key), fn2));
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
  set(key, data, ttl, fn) {
    if ("function" === typeof ttl) {
      fn = ttl;
      ttl = null;
    }
    if ("string" === typeof ttl) {
      ttl = Math.round((0, import_ms.default)(ttl) / 1e3);
    }
    return maybePromised(this, fn, (fn2) => {
      if ("string" !== typeof key && !Array.isArray(key)) {
        return process.nextTick(() => {
          fn2(new CachemanError("Invalid key, key must be a string or array."));
        });
      }
      if ("undefined" === typeof data) {
        return process.nextTick(fn2);
      }
      return this._engine.set(this.key(key), data, ttl || this._ttl, fn2);
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
  del(key, fn) {
    if ("function" === typeof key) {
      fn = key;
      key = "";
    }
    return maybePromised(this, fn, (fn2) => this._engine.del(this.key(key), fn2));
  }
  /**
   * Clear all entries.
   *
   * @param {String} key
   * @param {Function} [fn]
   * @return {Cacheman} this
   * @api public
   */
  clear(fn) {
    return maybePromised(this, fn, (fn2) => this._engine.clear(fn2));
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
  wrap(key, work, ttl, fn) {
    if ("function" !== typeof work && "function" === typeof ttl) {
      [ttl, work] = [work, ttl];
    }
    if ("function" === typeof ttl) {
      fn = ttl;
      ttl = null;
    }
    return maybePromised(this, fn, (fn2) => {
      this.get(key, (err, res) => {
        if (err || res) return fn2(err, res);
        let next = (err2, data) => {
          if (err2) return fn2(err2);
          this.set(key, data, ttl, (err3) => {
            fn2(err3, data);
          });
          next = () => {
            process.nextTick(() => {
              throw new CachemanError("callback called twice");
            });
          };
        };
        if (work.length >= 1) {
          const result = work((err2, data) => next(err2, data));
          if ("undefined" !== typeof result) {
            process.nextTick(() => {
              throw new CachemanError("return value cannot be used when callback argument is used");
            });
          }
        } else {
          try {
            const result = work();
            if ("object" === typeof result && "function" === typeof result.then) {
              result.then((value) => next(null, value)).then(null, (err2) => next(err2));
            } else {
              next(null, result);
            }
          } catch (err2) {
            next(err2);
          }
        }
      });
    });
  }
}
Cacheman.engines = engines;

module.exports = module.exports.default || module.exports;