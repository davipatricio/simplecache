export class BaseStore {
  /**
   * This method is used to set a value in the cache.
   *
   * @param key The key to set the value under.
   * @param value The value to set.
   * @param expiresIn The time in milliseconds for the value to expire. Defaults to {@link BaseClientOptions.defaultCacheTime}.
   */
  public async set<T>(key: string, value: T, expiresIn?: number) {
    throw new Error('Method not implemented.');
  }

  /**
   * This method is used to get a value from the cache.
   *
   * @param key The key to get the value for.
   * @returns The value if it exists, otherwise undefined.
   */
  public async get<T>(key: string): Promise<T | undefined> {
    throw new Error('Method not implemented.');
  }

  /**
   * This method is used to delete a value from the cache.
   *
   * @param key The key to delete the value for.
   */
  public async delete(key: string) {
    throw new Error('Method not implemented.');
  }

  /**
   * This method is used to clear the entire cache.
   */
  public async clear() {
    throw new Error('Method not implemented.');
  }
}
