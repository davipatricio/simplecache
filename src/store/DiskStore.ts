import { mkdirSync } from 'node:fs';
import { writeFile, readFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { setTimeout } from 'node:timers';
import { BaseStore } from './BaseStore.js';

export class DiskStore extends BaseStore {
  public constructor(
    private readonly path: string,
    public defaultCacheTime?: number,
  ) {
    super();

    void this.setup();
  }

  private async setup() {
    mkdirSync(dirname(this.path), { recursive: true });
    void this.clear();
  }

  public async clear() {
    await writeFile(this.path, '{}');
  }

  public async delete(key: string) {
    const data = await this.readCacheFile();
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete data[key];
    await writeFile(this.path, JSON.stringify(data));
  }

  public async get<T>(key: string): Promise<T> {
    const data = await this.readCacheFile();
    return data[key] as T;
  }

  public async set<T>(
    key: string,
    value: T,
    expiresIn = this.defaultCacheTime,
  ) {
    const data = await this.readCacheFile();
    data[key] = value;

    await writeFile(this.path, JSON.stringify(data));

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

  private async readCacheFile() {
    const data = await readFile(this.path, 'utf8');
    return JSON.parse(data.toString());
  }
}
