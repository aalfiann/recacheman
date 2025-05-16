import { expectType } from 'tsd';
import Cacheman from '../lib/index.js';
import { MiddlewareFn } from '../lib/index.js';

const cache = new Cacheman('test', {});

expectType<Cacheman>(new Cacheman());
expectType<Cacheman>(new Cacheman('todo'));
expectType<Cacheman>(new Cacheman({ ttl: 90 }));
expectType<Cacheman>(new Cacheman('todo', { ttl: 90 }));

// get
expectType<Promise<any>>(cache.get('key'));
expectType<Cacheman>(
  cache.get('key', (err: Error | null, data: any) => {
    if (err) return console.log(err);
    console.log(data);
  })
);

// set
expectType<Promise<number>>(cache.set<number>('key1', 1));
expectType<Promise<string>>(cache.set<string>('key2', '2'));
expectType<Promise<string>>(cache.set<string>('key3', '3', 30));
expectType<Promise<string>>(cache.set<string>('key4', '4', '30s'));

expectType<Cacheman>(
  cache.set<string>('key5', '5', (err: Error | null, data?: string) => {
    if (err) return console.log(err);
    console.log(data);
  })
);
expectType<Cacheman>(
  cache.set<number>('key6', 6, (err: Error | null, data?: number) => {
    if (err) return console.log(err);
    console.log(data);
  })
);
expectType<Cacheman>(
  cache.set<string>('key7', '7', 30, (err: Error | null, data?: string) => {
    if (err) return console.log(err);
    console.log(data);
  })
);
expectType<Cacheman>(
  cache.set<string>('key8', '8', '30s', (err: Error | null, data?: string) => {
    if (err) return console.log(err);
    console.log(data);
  })
);
expectType<Cacheman>(
  cache.set<number>('key9', 9, '30s', (err: Error | null, data?: number) => {
    if (err) return console.log(err);
    console.log(data);
  })
);

expectType<Promise<object>>(cache.set<object>('obj1', {a: 'foo'}));
expectType<Promise<object>>(cache.set<object>('obj2', {a: 'foo'}, 30));
expectType<Promise<object>>(cache.set<object>('obj3', {a: 'foo'}, '30s'));

expectType<Cacheman>(
  cache.set<object>('obj4', {a: 'bar'}, (err: Error | null, data?: object) => {
    if (err) return console.log(err);
    console.log(data);
  })
);
expectType<Cacheman>(
  cache.set<object>('obj5', {a: 'bar'}, (err: Error | null, data?: object) => {
    if (err) return console.log(err);
    console.log(data);
  })
);
expectType<Cacheman>(
  cache.set<object>('obj6', {a: 'bar'}, 30, (err: Error | null, data?: object) => {
    if (err) return console.log(err);
    console.log(data);
  })
);

// array key - callback
expectType<Cacheman>(
  cache.set<object>(['foo', 'bar'], { a: 'baz' }, (err: Error | null, data?: object) => {
    if (err) return console.log(err);
    console.log(data);
  })
);

// array key - promise
expectType<Promise<object>>(
  cache.set<object>(['foo', 'bar'], { a: 'baz' })
);

// del
expectType<Promise<void>>(cache.del('key1'));
expectType<Cacheman>(
  cache.del('key2', (err: Error | null) => {
    if (err) return console.log(err);
  })
);

// clear
expectType<Promise<void>>(cache.clear());
expectType<Cacheman>(
  cache.clear((err: Error | null) => {
    if (err) return console.log(err);
  })
);

// cache with callback-style
expectType<Cacheman>(
  cache.cache<{ a: string }>('foo', { a: 'bar' }, '45s', (err: Error | null) => {
    if (err) throw err;
  })
);

// cache with promise
expectType<Promise<{ a: string }>>(
  cache.cache('foo', { a: 'bar' }, '45s')
);

// wrap
type Callback<T> = (err: Error | null, result?: T) => void;

// wrap with callback-style
expectType<Cacheman>(
  cache.wrap(
    'foo',
    function work(callback: (err: Error | null, result?: { a: string }) => void) {
      callback(null, { a: 'foo' });
    },
    '45s',
    (err: Error | null, data?: { a: string }) => {
      if (err) return console.log(err);
      console.log(data);
    }
  )
);

// wrap with promise-style
expectType<Promise<{ a: string }>>(
  cache.wrap('bar', () => {
    return { a: 'bar' };
  }, '45s')
);

expectType<Cacheman>(
  cache.wrap(
    'foo',
    function work(callback: Callback<{ a: string }>) {
      callback(null, { a: 'foo' });
    },
    '45s',
    (err: Error | null, data?: { a: string }) => {
      if (err) return console.error(err);
      console.log(data);
    }
  )
);

expectType<Promise<{ a: string }>>(
  cache.wrap('foo', function work(callback: Callback<{ a: string }>) {
    callback(null, { a: 'foo' });
  }, '45s')
);

expectType<Promise<{ a: string }>>(
  cache.wrap(
    'foo',
    '45s',
    () => Promise.resolve({ a: 'foo' })
  )
);

expectType<Promise<{ a: string }>>(
  cache.wrap('foo', '45s', () => ({ a: 'foo' }))
);

// middleware
// middleware that forces TTL
function expireInMiddleware(expireIn: number | string): (MiddlewareFn) {
  return function (key, data, ttl, next) {
    next(null, data, expireIn);
  };
}

cache.use(expireInMiddleware('10s'));

// middleware that overwrites the value
function overwriteMiddleware<T>(val: T): MiddlewareFn {
  return function (key, data, ttl, next) {
    next(null, val, ttl);
  };
}

cache.use(overwriteMiddleware({ a: 'foo' }));

// middleware that stops cache on error
function errorMiddleware(): MiddlewareFn {
  return function (key, data, ttl, next) {
    next(new Error('There was an error'));
  };
}

cache.use(errorMiddleware());
