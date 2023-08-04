import { BaseStore } from '../store/BaseStore.js';
import { DiskStore } from '../store/DiskStore.js';
import { MemoryStore } from '../store/MemoryStore.js';
import type { ClientOptions } from './ClientOptions.js';

const defaultOptions: ClientOptions = {
  cacheStrategy: 'memory',
};

export class Client extends BaseStore {
  private readonly options: ClientOptions;

  public readonly store: BaseStore;

  public constructor(options: ClientOptions) {
    super();

    // this is a hack, so that we can use the client in the base store
    this.setClient(this);

    this.options = { ...defaultOptions, ...options };

    switch (this.options.cacheStrategy) {
      case 'memory':
        this.store = new MemoryStore(this.options.defaultCacheTime);
        break;
      case 'redis':
        throw new Error('Redis cache strategy is not yet implemented.');
      case 'disk':
        this.store = new DiskStore(
          this.options.cacheFile ?? './.cache/simplecache.json',
          this.options.defaultCacheTime,
        );
    }
  }

  public connect() {
    return true;
  }
}
