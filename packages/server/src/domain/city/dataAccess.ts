import {Db, ObjectId} from "mongodb";

export interface City {
    _id: string;
    name: string;
}

export class CityDataAccess {
    private db: Db;

    constructor(db: Db) {
        this.db = db;
    }

    async findCountryById(id: string): Promise<City | null> {
        const collection = this.db.collection('cities');
        const doc = await collection.findOne({_id: new ObjectId(id)});
        if (!doc) {
            return null;
        }

        return {
            _id: doc._id.toString(),
            name: doc.name
        };
    }
}
