type Callback<T = any> = (err: Error | null, result?: T) => void;

export interface CachemanOptions {
  prefix?: string;
  engine?: any;
  delimiter?: string;
  ttl?: number | string;
  count?: number;
  Promise?: typeof Promise;
  [key: string]: any;
}

export type MiddlewareFn = (
  key: string,
  data: any,
  ttl: number | string,
  next: (err: Error | null, data?: any, ttl?: number | string, force?: boolean) => void
) => void;

export default class Cacheman {
  constructor();
  constructor(name: string);
  constructor(options: CachemanOptions);
  constructor(name: string, options: CachemanOptions);

  static engines: string[];

  engine(name?: any, options?: any): this;

  key(key: string | string[]): string;

  use(fn: MiddlewareFn): this;

  get<T = any>(key: string): Promise<T | null>;
  get<T = any>(key: string, fn: Callback<T | null>): this;

  set<T = any>(key: string | string[], data: T, ttl?: number | string): Promise<T>;
  set<T = any>(key: string | string[], data: T, ttl: number | string, fn: Callback<T>): this;
  set<T = any>(key: string | string[], data: T, fn: Callback<T>): this;

  del(key: string): Promise<void>;
  del(key: string, fn: Callback<void>): this;

  clear(): Promise<void>;
  clear(fn: Callback<void>): this;

  cache<T = any>(key: string, data: T, ttl?: number | string): Promise<T>;
  cache<T = any>(key: string, data: T, ttl: number | string, fn: Callback<T>): this;
  cache<T = any>(key: string, data: T, fn: Callback<T>): this;
  cache<T = any>(key: string, data: T, ttl: number | string, fn: (err: Error | null) => void): this;

  wrap<T = any>(key: string, work: (callback: Callback<T>) => void, ttl: number | string, fn: Callback<T>): this;
  wrap<T = any>(key: string, work: () => T | Promise<T> | void, ttl: number | string, fn: Callback<T>): this;
  wrap<T = any>(key: string, work: (callback: Callback<T>) => void, ttl: number | string): Promise<T>;
  wrap<T = any>(key: string, work: () => T | Promise<T> | void, ttl?: number | string): Promise<T>;
  wrap<T = any>(key: string, ttl: number | string, work: (callback: Callback<T>) => void): Promise<T>;
  wrap<T = any>(key: string, ttl: number | string, work: () => T | Promise<T> | void): Promise<T>;
}
