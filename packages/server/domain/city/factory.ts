import {Db} from "mongodb";
import {CityService} from "./service";
import {CityDataAccess} from "./dataAccess";

function createService(db: Db) {
    const dao = new CityDataAccess(db);
    return new CityService(dao);
}

export default createService;
