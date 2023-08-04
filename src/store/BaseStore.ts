import type { Client } from '../client/Client.js';

export class BaseStore {
  private client!: Client;

  /**
   * This method is used to clear the entire cache.
   */
  public async clear() {
    if (!this.client) throw new Error('Method not implemented.');
    await this.client.store.clear();
  }

  /**
   * This method is used to delete a value from the cache.
   *
   * @param key The key to delete the value for.
   */
  public async delete(key: string) {
    if (!this.client) throw new Error('Method not implemented.');
    await this.client.store.delete(key);
  }

  /**
   * This method is used to get a value from the cache.
   *
   * @param key The key to get the value for.
   * @returns The value if it exists, otherwise undefined.
   */
  public async get<T>(key: string): Promise<T | undefined> {
    if (!this.client) throw new Error('Method not implemented.');
    return this.client.store.get<T>(key);
  }

  /**
   * This method is used to set a value in the cache.
   *
   * @param key The key to set the value under.
   * @param value The value to set.
   * @param expiresIn The time in milliseconds for the value to expire. Defaults to {@link BaseClientOptions.defaultCacheTime}.
   */
  public async set<T>(key: string, value: T, expiresIn?: number) {
    if (!this.client) throw new Error('Method not implemented.');
    await this.client.store.set<T>(key, value, expiresIn);
  }

  /**
   * @private
   */
  protected setClient(client: Client) {
    this.client = client;
  }
}
