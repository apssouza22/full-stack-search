import {ICache} from "./ICache";

export class MemoryCache implements ICache {

    // TODO: Implement time to life for cache

    private index: string;

    constructor(index: string) {
        this.index = index;
    }

    private cache: Map<string, string> = new Map();

    async get(key: string): Promise<any | null> {
        return this.cache.get(`${this.index}-${key}`) || null;
    }

    async set(key: string, value: any): Promise<void> {
        this.cache.set(`${this.index}-${key}`, value);
    }

    async del(key: string): Promise<void> {
        this.cache.delete(key);
    }

    async flush(): Promise<void> {
        this.cache.clear();
    }
}