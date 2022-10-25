import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const teamController = new TeamController();
const teamRouter = Router();

teamRouter.get('/', teamController.getAllTeam);

export default teamRouter;
