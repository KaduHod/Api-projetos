import { MongoClient } from 'mongodb'
import ConnectionParams from '../interfaces/ConnectionParams';

export default class MongoDB {
    public databaseUser:string ;
    public databaseName:string ;
    public password:string ;
    public client:MongoClient | null;
    public isConnected:boolean;
    private connectionStructure:string;
    private connString:string;

    constructor(connectionParams:ConnectionParams){
        this.databaseUser = connectionParams.databaseUser;
        this.databaseName = connectionParams.databaseName;
        this.password     = connectionParams.password;
        this.connectionStructure = 'mongodb+srv://<user>:<password>@<database>.6gkk5mk.mongodb.net/?retryWrites=true&w=majority';
        this.connString = '';
        this.client = null;
        this.isConnected = false;
    }

    public setConnectionString = ():boolean => {
        try {
            this.connString = this.connectionStructure.replace(/<user>/, this.databaseUser)
                                                  .replace(/<password>/,this.password)
                                                  .replace(/<database>/,this.databaseName);
                                                  return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    public setClient = ():boolean => {
        try {
            this.client = new MongoClient(this.connString);
            return true;
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    public getClient(){
        if(!this.client) this.setClient();
        return this.client;
    }

    public openConnection = async ():Promise<boolean> => {
        try {
            console.log('\t Connected!')
            this.isConnected = true;
            await this.client?.connect();
            return true;
        } catch (error) {
            console.log('\t Connection closed!')
            console.log(error)
            this.isConnected = false
            return false;
        }
    }

    public closeConnection = () => {
        console.log('\t Connection closed!')
        this.isConnected = false;
        this.client?.close();
    }
   
}