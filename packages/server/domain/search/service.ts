import {ICache} from "../cache/ICache";
import {ISearchEngine, SearchResult} from "./ISearchEngine";

export class SearchService {
    private readonly maxResults = 5;
    private dao: ISearchEngine;
    private cache: ICache;

    constructor(dao: ISearchEngine, cache: ICache) {
        this.dao = dao;
        this.cache = cache;
    }

    async search(query: string): Promise<SearchResult> {
        const cacheKey = `${query}`;

        const cached = await this.cache.get(cacheKey);
        if (cached) {
            return cached;
        }

        const result: SearchResult = await this.dao.search(query, this.maxResults);
        await this.cache.set(cacheKey, result);
        return result;
    }
}