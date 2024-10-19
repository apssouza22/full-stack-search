import {MemoryCache} from "../cache/MemoryCache";
import {CityDataAccess} from "./dataAccess";

export class CityService {
    private dao: CityDataAccess;

    constructor(dao: CityDataAccess) {
        this.dao = dao;
    }

    async getCityById(id: string) {
        return this.dao.findCountryById(id);
    }
}