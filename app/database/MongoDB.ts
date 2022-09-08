import { MongoClient } from 'mongodb'
import ConnectionParams from '../interfaces/ConnectionParams';

export default class MongoDB {
    public databaseUser:string | undefined;
    public databaseName:string | undefined;
    public password:string | undefined;
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
        if(!this.databaseName || !this.databaseUser || !this.password) return false;
        this.connString = this.connectionStructure.replace(/<user>/, this.databaseUser)
                                                  .replace(/<password>/,this.password)
                                                  .replace(/<database>/,this.databaseName);
        return true;
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

    public openConnection = async () => {
        try {
            console.log('\t Connected!')
            return await this.client?.connect();
        } catch (error) {
            console.log(error)
            this.isConnected = false
            return false;
        }
    }

    public closeConnection = () => {
        console.log('\t Connection closed!')
        this.client?.close();
    }
   
}