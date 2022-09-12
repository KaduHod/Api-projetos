import { MongoClient } from 'mongodb'
import {ConnectionParams} from '../interfaces/database';

export default class MongoDB {
    public databaseUser:string ;
    public databaseName:string ;
    public password:string ;
    private connectionStructure:string;
    private connString:string;
    public client:MongoClient;

    constructor(connParams:ConnectionParams){
        this.databaseUser = connParams.databaseUser;
        this.databaseName = connParams.databaseName;
        this.password     = connParams.password;
        this.connectionStructure = 'mongodb+srv://<user>:<password>@<database>.6gkk5mk.mongodb.net/?retryWrites=true&w=majority';
        this.connString = this.setConnectionString();
        this.client = this.setClient();
        
    }
    public setConnectionString():string{
        return this.connectionStructure.replace(/<user>/, this.databaseUser)
                                            .replace(/<password>/,this.password)
                                            .replace(/<database>/,this.databaseName);
    }
    async connect():Promise<void>{
        await this.client.connect();
    }
    setClient():MongoClient{
        return new MongoClient(this.connString)
    }
}