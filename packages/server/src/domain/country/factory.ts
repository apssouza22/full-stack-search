import {Db} from "mongodb";
import {CountryService} from "./service";
import {CountryDataAccess} from "./dataAccess";

function createService(db: Db) {
    const dao = new CountryDataAccess(db);
    return new CountryService(dao);
}

export default createService;
