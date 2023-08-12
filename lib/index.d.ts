/**
 * Cacheman constructor.
 *
 * @param {String} name
 * @param {Object} options
 * @api public
 */
export default class Cacheman {
    /**
     * Class constructor method.
     *
     * @param {String} name
     * @param {Object} [options]
     * @return {Cacheman} this
     * @api public
     */
    constructor(name: string, options?: {});
    /**
     * Set get engine.
     *
     * @param {String} engine
     * @param {Object} options
     * @return {Cacheman} this
     * @api public
     */
    engine(engine: string, options: object): this;
    /**
     * Wrap key with prefix.
     *
     * @param {String} key
     * @return {String}
     * @api private
     */
    key(key: string): string;
    /**
     * Sets up namespace middleware.
     *
     * @return {Cacheman} this
     * @api public
     */
    use(fn: Function): this;
    /**
     * Executes the cache middleware.
     *
     * @param {String} key
     * @param {Mixed} data
     * @param {Number} ttl
     * @param {Function} fn
     * @api private
     */
    run(key: string, data: any, ttl?: string|number, fn?: Function): this;
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
    cache(key: string, data: any, ttl?: string|number, fn?: Function): this;
    /**
     * Get an entry.
     *
     * @param {String} key
     * @param {Function} [fn]
     * @return {Cacheman} this
     * @api public
     */
    get(key: string, fn?: Function): this;
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
    set(key: string, data: any, ttl?: string|number, fn?: Function): this;
    /**
     * Delete an entry.
     *
     * @param {String} key
     * @param {Function} [fn]
     * @return {Cacheman} this
     * @api public
     */
    del(key: string, fn?: Function): this;
    /**
     * Clear all entries.
     *
     * @param {String} key
     * @param {Function} [fn]
     * @return {Cacheman} this
     * @api public
     */
    clear(fn?: Function): this;
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
    wrap(key: string, work: any, ttl?: string|number, fn?: Function): this;
}

