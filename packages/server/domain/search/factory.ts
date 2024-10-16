import {Db} from "mongodb";
import {SearchService} from "./service";
import {MongoSearch} from "./mongo";
import {MemoryCache} from "../cache/MemoryCache";

function createService(db: Db) {
    const dao = new MongoSearch(db);
    const cache = new MemoryCache("search");
    return new SearchService(dao, cache);
}

export default createService;
