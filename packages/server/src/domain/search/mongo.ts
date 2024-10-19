import {Db} from "mongodb";
import {ISearchEngine, SearchResult} from "./ISearchEngine";


export class MongoSearch implements ISearchEngine {
    private db: Db;

    constructor(db: Db) {
        this.db = db;
    }

    async search(query: string, limit: number): Promise<SearchResult> {
        try {
            const results = await this.db.collection('hotels').aggregate([
                {
                    $match: {
                        hotel_name: {$regex: query, $options: 'i'},
                    },
                },
                {$limit: limit},
                {$project: {_id: 1, hotel_name: 1, country: 1}},
                {$addFields: {collection: "hotels"}},
                {
                    $unionWith: {
                        coll: "cities",
                        pipeline: [
                            {$match: {name: {$regex: query, $options: 'i'}}},
                            {$project: {_id: 1, name: 1}},
                            {$addFields: {collection: "cities"}},
                            {$limit: limit},
                        ],
                    },
                },
                {
                    $unionWith: {
                        coll: "countries",
                        pipeline: [
                            {$match: {country: {$regex: query, $options: 'i'}}},
                            {$project: {_id: 1, country: 1}},
                            {$addFields: {collection: "countries"}},
                            {$limit: limit},
                        ],
                    },
                },
                {
                    $facet: {
                        hotels: [{$match: {collection: "hotels"}}],
                        cities: [{$match: {collection: "cities"}}],
                        countries: [{$match: {collection: "countries"}}],
                    },
                },
            ]).toArray();

            if (results.length === 0) {
                console.log("No results found");
                return {hotels: [], cities: [], countries: []};
            }

            const groupedResults = {
                hotels: results[0].hotels.map(({collection, ...rest}) => rest),
                cities: results[0].cities.map(({collection, ...rest}) => rest),
                countries: results[0].countries.map(({collection, ...rest}) => rest),
            };
            return groupedResults;
        } catch (error) {
            console.error('Error running aggregation:', error);
            throw error;
        }
    }
}