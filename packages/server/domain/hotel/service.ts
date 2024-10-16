import {HotelDataAccess} from "./dataAccess";
import {ICache} from "../cache/ICache";

export default class HotelService {
    private dao: HotelDataAccess;
    private cache: ICache;

    constructor(db: HotelDataAccess, cache: ICache) {
        this.dao = db;
        this.cache = cache;
    }

    async getHotels(): Promise<any[]> {
        return await this.dao.getHotels();
    }

    async search(term: String): Promise<any[]> {
        const cacheKey = `hotels-${term}`;
        const cached = await this.cache.get(cacheKey);
        if (cached) {
            return cached;
        }

        const hotels = await this.dao.getHotels();
        await this.cache.set(cacheKey, hotels);
        return hotels;
    }

    async getHotelById(id: string) {
        return await this.dao.findHotelById(id);
    }
}
