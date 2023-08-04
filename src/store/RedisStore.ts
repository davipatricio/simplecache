import type { RedisClientType } from 'redis';
import { createClient } from 'redis';
import { BaseStore } from './BaseStore.js';

export class RedisStore extends BaseStore {
  private readonly redis: RedisClientType;

  public constructor(
    url: string,
    public defaultCacheTime?: number,
  ) {
    super();

    this.redis = createClient({ url });
    void this.redis.connect();
  }

  public async clear() {
    for (const key of await this.redis.keys('*')) {
      await this.redis.del(key);
    }
  }

  public async delete(key: string) {
    await this.redis.del(key);
  }

  public async get<T>(key: string): Promise<T | undefined> {
    const data = await this.redis.get(key);

    if (data === null) {
      return undefined;
    }

    return JSON.parse(data) as T;
  }

  public async set<T>(
    key: string,
    value: T,
    expiresIn = this.defaultCacheTime,
  ) {
    const shouldExpire =
      typeof this.defaultCacheTime === 'number' &&
      this.defaultCacheTime !== 0 &&
      typeof expiresIn === 'number' &&
      expiresIn !== 0;

    await this.redis.set(key, JSON.stringify(value), {
      EX: shouldExpire ? expiresIn / 1_000 : undefined,
    });
  }
}
