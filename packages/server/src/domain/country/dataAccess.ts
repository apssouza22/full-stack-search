import {Db, ObjectId} from "mongodb";

export interface Country {
    _id: string;
    country: string;
    countryisocode: string;
}

export class CountryDataAccess {
    private db: Db;

    constructor(db: Db) {
        this.db = db;
    }

    async findCountryById(id: string): Promise<Country | null> {
        const collection = this.db.collection('countries');
        let doc = await collection.findOne({_id: new ObjectId(id)});
        if (!doc) {
            return null
        }
        return {
            _id: doc._id.toHexString(),
            country: doc.country,
            countryisocode: doc.countryisocode
        };
    }
}
