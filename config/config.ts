
const path = require('path')
require('dotenv').config({path:path.resolve(__dirname, "../.env")})
import ConnectionParams from "../app/interfaces/ConnectionParams"
const {env} = process
const config = {
    mongoConnectionParams: (enviroment:string, db:string):ConnectionParams => {
        const connections:any = {
            "prod" : {
                "projects":{
                    password:'pVFlhjCLDU7WmcTu',
                    databaseName:"projects",
                    databaseUser:'projectsclusterts'
                }
            },
            "dev":{
                "projects":{
                    password:'pVFlhjCLDU7WmcTu',
                    databaseName:"projects",
                    databaseUser:'projectsclusterts'
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