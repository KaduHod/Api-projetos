import { ObjectId } from "mongodb";
export default interface ProjectInterface {
    _id:ObjectId | number;
    name:string;
    description:string;
    link:string;
    technologies:object[];
    repositorie:string | string[];
}