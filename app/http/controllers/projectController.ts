import { Request, Response } from "express";
import ProjectRepository from "../../repository/ProjectRepository";
import { Collection, ObjectId } from "mongodb";
require('dotenv');

class ProjectController {
    public insertMyProjects = (request:Request, response:Response):Response => {    
        let message = "";
        try {
            const projectRepository = new ProjectRepository()
            projectRepository.insertMyProjects();
            message = 'Tudo certo!';
            response.status(200);
            response.header('Content-type','application/json; charset=utf-8');
        } catch (error) {
            response.status(500);
            response.header('Content-type','application/json; charset=utf-8');
            message = 'Erro';
        }finally{
            return response.send({message : message ?? "Erro"});
        }
    }

    public listProjects = async (request:Request, response:Response):Promise<Response> => 
    { 
        let message = "";
        let data:Collection | string = "Sem registros!";
        let err:any = false;
        try {
            const projectRepository = new ProjectRepository();
            const projects = await projectRepository.all();
            message = 'Tudo certo';
            data = projects;
            response.status(200);
            response.header('Content-type','application/json; charset=utf-8');
        } catch (error) {
            err = error
            console.log(error)
            response.status(404);
            response.header('Content-type','application/json; charset=utf-8');
            message = 'Erro';
        }finally{
            return response.send({message : message ?? "Erro", err, data});
        }
    }
    // public update = async (request:Request, response:Response):Promise<Response> => {
    // }
    public get = async (request:Request, response:Response):Promise<Response> => {
        const {projectId} = request.params
        // const _id = new ObjectId(projectId);
        try {
            const projectRepository = new ProjectRepository()
            const project = await projectRepository.getProject(new ObjectId(projectId));
            response.status(200);
            response.header('Content-type','application/json; charset=utf-8');
            return response.send(project);
        } catch (error) {
            response.status(404);
            response.header('Content-type','application/json; charset=utf-8');
            return response.send(error);
        }
    }
}

export default new ProjectController;