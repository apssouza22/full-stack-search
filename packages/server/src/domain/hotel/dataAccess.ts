import {Db, ObjectId} from "mongodb";

export interface Hotel {
    _id: string;
    hotel_name: string;
    chain_name: string;
    addressline1: string;
    addressline2: string;
    zipcode: string;
    city: string;
    state: string;
    country: string;
    countryisocode: string;
    star_rating: number;
}

export class HotelDataAccess {
    private db: Db;

    constructor(db: Db) {
        this.db = db;
    }

    async getHotels(): Promise<Hotel[]> {
        const collection = this.db.collection('hotels');
        let docs = await collection.find().toArray();
        if (!docs) {
            return [];
        }
        return docs.map(doc => {
            return transformHotel(doc)
        });
    }

    async findHotelById(id: string): Promise<Hotel | null> {
        const collection = this.db.collection('hotels');
        const doc = await collection.findOne({_id: new ObjectId(id)});
        if (!doc) {
            return null
        }
        return transformHotel(doc);
    }
}


function transformHotel(doc: any) {
    return {
        _id: doc._id.toHexString(),
        hotel_name: doc.hotel_name,
        chain_name: doc.chain_name,
        addressline1: doc.addressline1,
        addressline2: doc.addressline2,
        zipcode: doc.zipcode,
        city: doc.city,
        state: doc.state,
        country: doc.country,
        countryisocode: doc.countryisocode,
        star_rating: doc.star_rating
    };
}

