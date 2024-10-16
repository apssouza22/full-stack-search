import {CountryDataAccess} from "./dataAccess";

export class CountryService {
    private dao: CountryDataAccess;

    constructor(dao: CountryDataAccess) {
        this.dao = dao;
    }

    async getCountryById(id: string) {
        return this.dao.findCountryById(id);
    }
}