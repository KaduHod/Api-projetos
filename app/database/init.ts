import MongoDB from "./MongoDB";
import ConnectionParams from '../interfaces/ConnectionParams'
import { MongoClient } from "mongodb";
var db:MongoClient | boolean;


const initialize = async ():Promise<void> => {
    try {
        if(db){
            console.log('Conexão ja realizada')
            return;
        }
        console.log('\tInciando conexão com o banco de dados')
        const connParams:ConnectionParams = {
            password: process.env.DB_PASSWORD ?? "",
            databaseName: process.env.DB_NAME ?? "",
            databaseUser: process.env.DB_USER ?? ""
        }
        console.log('Parametros de conexão', connParams);
        const mongo = new MongoDB(connParams);
        mongo.setConnectionString();
        await mongo.openConnection();
        mongo.setClient();
        db = mongo.client;
    } catch (error) {
        console.log('\t====Erro====')
        console.log(error)
        db = false;
    }
}

const getDb =  async ()=>{
    if(!db) console.log('Erro ao chamar banco de dados');
    console.log(db)
    return db;
}

export {
    getDb,
    initialize
}