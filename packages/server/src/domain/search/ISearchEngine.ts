import {City} from "../city/dataAccess";
import {Hotel} from "../hotel/dataAccess";
import {Country} from "../country/dataAccess";

export interface ISearchEngine {
    search(query: string, limit: number): Promise<SearchResult>;
}

export type SearchResult = { cities: City[]; hotels: Hotel[]; countries: Country[]; };
