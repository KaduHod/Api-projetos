import express from 'express';
import ProjectController from './controllers/projectController';
import ConnectionParams from '../interfaces/ConnectionParams';
import MongoDB from '../database/MongoDB';
import ProjectRepository from '../repository/ProjectRepository';
import { Request, Response } from 'express';


const Routes = express.Router();

Routes.get('/list', ProjectController.listProjects);
// Routes.post('/update/{id}', ProjectController.update);
Routes.get('/:projectId', ProjectController.get);

export default Routes;