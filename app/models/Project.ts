import { ObjectId } from "mongodb";
import ProjectInterface from '../interfaces/ProjectInterface';
export default class Project implements ProjectInterface {
    public _id:ObjectId;
    public name:string;
    public description: string;
    public link: string;
    public technologies: object[];
    public repositorie: string | string[];
    constructor(project:ProjectInterface){
        this._id = project._id;
        this.name = project.name;
        this.description = project.description;
        this.link = project.link;
        this.technologies = project.technologies;
        this.repositorie = project.repositorie;
    }
}