import express from 'express';
import ProjectController from './controllers/projectController';
const Routes = express.Router();
Routes.get('/list', ProjectController.listProjects);
Routes.get('/list-local', ProjectController.listProjectsLocal);
Routes.get('/:projectId', ProjectController.get);
export default Routes;