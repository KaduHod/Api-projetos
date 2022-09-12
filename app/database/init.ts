import DB from "./MongoDB";
import {DatabaseConfig, ConnectionParams} from '../interfaces/database'
var db:DB | null = null;
export const initialize = async ():Promise<boolean> => {
    try {
        if(db){
            console.log('Already connected!')
            return true;
        }
        console.log('\tConnecting...')
        const connParams:ConnectionParams = {
            password: process.env.DB_PASSWORD ?? "",
            databaseName: process.env.DB_NAME ?? "",
            databaseUser: process.env.DB_USER ?? ""
        }
        const mongo:DB = new DB(connParams);
        await mongo.connect()
        db = mongo;
        console.log('\tConnected!')
        return true;
    } catch (error) {
        console.log('\t====Error====')
        console.log(error)
        db = null;
        return false;
    }
}
export const getDb = (dbConfig:DatabaseConfig):any =>{
    if(!db) console.log("Database instance null!");
    let _db = db?.client.db(dbConfig.database)
    let _collection = _db?.collection(dbConfig.collection)
    return _collection;
}