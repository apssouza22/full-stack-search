import {Db, MongoClient} from "mongodb";

let client: MongoClient;

export const connectToDatabase = async (url: string):Promise<Db> => {
    if (!client) {
        client = new MongoClient(url);
        await client.connect();
        console.log('Successfully connected to MongoDB!');
    }
    return client.db();
};

export const closeDatabaseConnection = async () => {
    if (client) {
        await client.close();
    }
};