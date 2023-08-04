/**
 * Options for the client
 */
interface BaseClientOptions {
  /**
   * Which cache strategy to use
   */
  cacheStrategy?: 'disk' | 'memory' | 'redis';
  /**
   * How much time the items will be cached in milliseconds
   *
   * @default 60000
   */
  defaultCacheTime?: number;
}

interface RedisClientOptions extends BaseClientOptions {
  /**
   * Which cache strategy to use
   */
  cacheStrategy: 'redis';
  /**
   * Redis connection string
   *
   * @example redis://localhost:6379
   * @example redis://user:pass@localhost:6379
   */
  redisUrl: string;
}

interface DiskClientOptions extends BaseClientOptions {
  /**
   * Path to the cache file
   *
   * @default .cache/simplecache.json
   */
  cacheFile?: string;
  /**
   * Which cache strategy to use
   */
  cacheStrategy: 'disk';
}

interface MemoryClientOptions extends BaseClientOptions {
  /**
   * Which cache strategy to use
   */
  cacheStrategy: 'memory';
}

export type ClientOptions =
  | DiskClientOptions
  | MemoryClientOptions
  | RedisClientOptions;
