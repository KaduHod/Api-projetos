import { Document, ObjectId } from 'mongodb';
import ProjectInterface from '../interfaces/ProjectInterface';
import { getDb } from '../database/init';
import {projects} from './projects.local';

export default class ProjectRepository {
    public client:any;
    public collection:any;

    constructor(){
        this.collection = getDb({database:'api-projects', collection:"projects"});
    }

    public static allLocal = ():object[] => {
        return projects;
    }

    public all = async ():Promise<Document | any>  => {
        try {
            const cursor = this.collection.find();
            return cursor.toArray();
        } catch (error) {
            return error
        }
    }
    public getProject = async (projectId:ObjectId):Promise<Document | any> =>
    {
        try {
            const data = await this.collection.findOne({_id:projectId});
            return data;
        } catch (error) {
            console.log(error)
            return error;
        }
        
    }
}