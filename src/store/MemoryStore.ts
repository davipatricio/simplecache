import { setTimeout } from 'node:timers';
import { BaseStore } from './BaseStore.js';

export class MemoryStore extends BaseStore {
  private data: Map<string, any> = new Map();

  public constructor(public defaultCacheTime?: number) {
    super();
  }

  public async clear() {
    this.data.clear();
  }

  public async delete(key: string) {
    this.data.delete(key);
  }

  public async get<T>(key: string): Promise<T> {
    return this.data.get(key);
  }

  public async set<T>(
    key: string,
    value: T,
    expiresIn = this.defaultCacheTime,
  ) {
    this.data.set(key, value);

    if (
      typeof this.defaultCacheTime !== 'number' ||
      this.defaultCacheTime === 0 ||
      typeof expiresIn !== 'number' ||
      expiresIn === 0
    ) {
      return;
    }

    setTimeout(async () => {
      await this.delete(key);
    }, expiresIn).unref();
  }
}
