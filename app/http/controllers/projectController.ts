import { Request, Response } from "express";
import ProjectRepository from "../../repository/ProjectRepository";
import MongoDB from "../../database/MongoDB";
import ConnectionParams from "../../interfaces/ConnectionParams";
require('dotenv');

class ProjectController {
    public insertMyProjects = (request:Request, response:Response):Response => {
        const connParams:ConnectionParams = {
            password:process.env.DB_PASSWORD,
            databaseName:process.env.DB_NAME,
            databaseUser:process.env.DB_USER
        }
        const db = new MongoDB(connParams);
            db.setConnectionString();
            db.setClient();
            
        response.status(200);
        response.header('Content-type','application/json; charset=utf-8');
        const projectRepository = new ProjectRepository(db)
        projectRepository.insertMyProjects();
        return response.send({message : 'Hello world'});
    }

}

export default new ProjectController;