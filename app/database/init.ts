import {DB} from "./db";
import ConnectionParams from '../interfaces/ConnectionParams'
import { MongoClient } from "mongodb";
var db:any = null;


const initialize = async ():Promise<MongoClient | any> => {
    try {
        if(db){
            console.log('Conexão ja realizada')
            return true;
        }
        console.log('\tInciando conexão com o banco de dados')
        const connParams:ConnectionParams = {
            password: process.env.DB_PASSWORD ?? "",
            databaseName: process.env.DB_NAME ?? "",
            databaseUser: process.env.DB_USER ?? ""
        }
        console.log('Parametros de conexão', connParams);
        const mongo:DB = new DB(connParams);
        await mongo.connect()
        db = mongo;
        console.log('\tConexão realizada!')
        return mongo.client;
    } catch (error) {
        console.log('\t====Erro====')
        console.log(error)
        db = false;
        return false;
    }
}
const getDb =  async ()=>{
    if(!db) console.log('Erro ao chamar banco de dados');
    console.log(db, 'aquiii2')
    return db.client;
}

export {
    getDb,
    initialize
}