import type { BaseStore } from '../store/BaseStore';
import { MemoryStore } from '../store/MemoryStore.js';
import type { ClientOptions } from './ClientOptions';

const defaultOptions: ClientOptions = {
  cacheStrategy: 'memory',
};

export class Client {
  private readonly options: ClientOptions;

  private readonly store: BaseStore;

  public constructor(options: ClientOptions) {
    this.options = { ...defaultOptions, ...options };

    switch (this.options.cacheStrategy) {
      case 'memory':
        this.store = new MemoryStore(this.options.defaultCacheTime);
        break;
      case 'redis':
        throw new Error('Redis cache strategy is not yet implemented.');
      case 'disk':
        throw new Error('Disk cache strategy is not yet implemented.');
    }
  }

  public connect() {
    return true;
  }
}
