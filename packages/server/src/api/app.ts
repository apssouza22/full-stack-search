import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import routes from "./routes";
import {connectToDatabase} from "../config/db";
import createHotelService from "../domain/hotel/factory";
import createCountryService from "../domain/country/factory";
import createCityService from "../domain/city/factory";
import createSearchService from "../domain/search/factory";
import {errorHandler} from "./commons";

dotenv.config();

if (process.env.NODE_ENV !== 'production' && !process.env.DATABASE_URL) {
    await import('../config/startAndSeedMemoryDB');
}
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

let db = await connectToDatabase(process.env.DATABASE_URL);
const hotelService = createHotelService(db);
const countryService = createCountryService(db);
const cityService = createCityService(db);
const searchService = createSearchService(db);

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.set("hotelService", hotelService);
app.set("cityService", cityService);
app.set("countryService", countryService);
app.set("searchService", searchService);

export default app;
