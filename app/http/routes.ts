import express from 'express';
import ProjectController from './controllers/projectController';
import ConnectionParams from '../interfaces/ConnectionParams';
import MongoDB from '../database/MongoDB';
import ProjectRepository from '../repository/ProjectRepository';
import { Request, Response } from 'express';
import { readBuilderProgram } from 'typescript';

const Routes = express.Router();

Routes.get('/list', ProjectController.listProjects);

Routes.get('/', async( request:Request ,response:Response ):Promise<Response> => {
    const {env} = process;
        const connParams:ConnectionParams = {
            password: env.DB_PASSWORD ?? "",
            databaseName:env.DB_NAME ?? "",
            databaseUser:env.DB_USER ?? ""
        }
    const db = new MongoDB(connParams);
    
    const proRepo = new ProjectRepository(db);
    console.log(db)
    const data = await proRepo.CorrigirTesto()
    return response.send({data})
})
//Routes.get('/inserir-meus-projetos', ProjectController.insertMyProjects)

export default Routes;