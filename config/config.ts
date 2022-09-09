
const path = require('path')
require('dotenv').config({path:path.resolve(__dirname, "../.env")})
import ConnectionParams from "../app/interfaces/ConnectionParams"
const {env} = process
const config = {
    mongoConnectionParams: (enviroment:string, db:string):ConnectionParams => {
        const connections:any = {
            "prod" : {
                "projects":{
                    password:"",
                    databaseName:"",
                    databaseUser:""
                }
            },
            "dev":{
                "projects":{
                    password: env.DB_PASSWORD ?? "",
                    databaseName:env.DB_NAME ?? "",
                    databaseUser:env.DB_USER ?? ""
                }
            }
        }
        return connections[enviroment][db];
    }
}
const dbConnParams = config.mongoConnectionParams(process.env.ENVIROMENT??"", process.env.DB_NAME??"");
export {
    dbConnParams
};