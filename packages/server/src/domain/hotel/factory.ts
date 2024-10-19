import {Db} from "mongodb";
import HotelService from "./service";
import {HotelDataAccess} from "./dataAccess";
import {MemoryCache} from "../cache/MemoryCache";

function createHotelService(db: Db) {
  const dao = new HotelDataAccess(db);
  const cache = new MemoryCache();
  return new HotelService(dao, cache);
}

export default createHotelService;
