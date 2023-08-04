import { setTimeout } from 'node:timers';
import { BaseStore } from './BaseStore.js';

export class MemoryStore extends BaseStore {
  public data: Map<string, any> = new Map();

  public constructor(public defaultCacheTime?: number) {
    super();
  }

  public async get<T>(key: string): Promise<T> {
    return this.data.get(key);
  }

  public async set<T>(key: string, value: T, expiresIn?: number) {
    this.data.set(key, value);

    if (!expiresIn || !this.defaultCacheTime) return;

    setTimeout(async () => {
      await this.delete(key);
    }, expiresIn ?? this.defaultCacheTime).unref();
  }

  public async delete(key: string) {
    this.data.delete(key);
  }

  public async clear() {
    this.data.clear();
  }
}
