import { Request, Response } from "express";
import ProjectRepository from "../../repository/ProjectRepository";
import MongoDB from "../../database/MongoDB";
import ConnectionParams from "../../interfaces/ConnectionParams";
import { Db } from "mongodb";
require('dotenv');

class ProjectController {
    public insertMyProjects = (request:Request, response:Response):Response => {
        const {env} = process;
        const connParams:ConnectionParams = {
            password:env.DB_PASSWORD ?? "",
            databaseName:env.DB_NAME ?? "",
            databaseUser:env.DB_USER ?? ""
        }
        const db = new MongoDB(connParams);
            db.setConnectionString();
            db.setClient();      
        let message = "";
        try {
            const projectRepository = new ProjectRepository(db)
            console.log(projectRepository)
            projectRepository.insertMyProjects();
            message = 'Tudo certo!';
            response.status(200);
            response.header('Content-type','application/json; charset=utf-8');
        } catch (error) {
            response.status(500);
            response.header('Content-type','application/json; charset=utf-8');
            message = 'Erro';
        }finally{
            db.closeConnection();
            return response.send({message : message ?? "Erro"});
        }
    }

    public listProjects = async (request:Request, response:Response):Promise<Response> => 
    {
        const {env} = process;
        const connParams:ConnectionParams = {
            password: env.DB_PASSWORD ?? "",
            databaseName:env.DB_NAME ?? "",
            databaseUser:env.DB_USER ?? ""
        }
        const db = new MongoDB(connParams);
            db.setConnectionString();
            db.setClient();      
        let message = "";
        let data = "Sem registros!";
        let err:any = false;
        try {
            const projectRepository = new ProjectRepository(db);
            const projects = await projectRepository.all();
            message = 'Tudo certo';
            data = projects;
            response.status(200);
            response.header('Content-type','application/json; charset=utf-8');
        } catch (error) {
            err = error
            response.status(404);
            response.header('Content-type','application/json; charset=utf-8');
            message = 'Erro';
        }finally{
            return response.send({message : message ?? "Erro", err, data});
        }
    }
}

export default new ProjectController;