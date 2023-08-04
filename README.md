# SimpleCache - Lightweight Caching Library

SimpleCache is a powerful and lightweight caching library built in TypeScript that supports various storage backends like memory, Redis, or disk. It is designed to provide a seamless caching experience for your applications, allowing you to boost performance and reduce redundant operations efficiently.

## Features
- **Simple Interface**: Intuitive and easy-to-use API that allows developers to quickly integrate caching into their applications.
- **Multiple Storage Backends**: Support for different storage backends, including memory, Redis, or disk, providing flexibility in choosing the best caching strategy for your needs.
- **TTL (Time-to-Live) Support**: Set expiration times for cached items to ensure data stays fresh and relevant.
- **Lightweight**: Designed to be minimalistic and efficient, ensuring minimal overhead and optimal performance.
- **Made with TypeScript**: The entire library is built with TypeScript, providing type safety and great editor support.

## Usage

Using SimpleCache is straightforward. First, import the library and create an instance of the cache with your desired storage backend:

```ts
import { Client } from 'simplecache';

const client = new Client({ cacheStrategy: 'redis', defaultCacheTime: 60000 });
await client.connect();

await client.set('key', 'value');
await client.set('key-expires-in-15s', 'value', 15000);

const value = await client.get('key');
if (value !== undefined) {
  console.log('Cached Value:', value);
} else {
  console.log('Value not found in the cache.');
}

await client.delete('key');
await client.clear();
```

You can use the `set` method to store values in the cache. You can specify an optional cache time (in milliseconds) as the third argument, which will override the default cache time.

To retrieve values from the cache, use the `get` method.

The `delete` method allows you to remove a specific key-value pair from the cache, while the `clear` method clears the entire cache.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
