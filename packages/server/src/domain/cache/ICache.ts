export interface ICache {
    get(key: string): Promise<any | null>;
    set(key: string, value: any): Promise<void>;
    del(key: string): Promise<void>;
    flush(): Promise<void>;
}