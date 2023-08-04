import { setTimeout } from 'node:timers';
import { BaseStore } from './BaseStore.js';

export class MemoryStore extends BaseStore {
  public data: Record<string, any> = {};

  public constructor(public defaultCacheTime?: number) {
    super();
  }

  public async get<T>(key: string): Promise<T> {
    return this.data[key];
  }

  public async set<T>(key: string, value: T, expiresIn?: number) {
    this.data[key] = value;

    if (
      expiresIn ||
      this.defaultCacheTime === undefined ||
      this.defaultCacheTime === 0
    )
      return;

    setTimeout(() => {
      this.data[key] = undefined;
    }, expiresIn ?? this.defaultCacheTime).unref();
  }

  public async delete(key: string) {
    this.data[key] = undefined;
  }

  public async clear() {
    this.data = {};
  }
}
