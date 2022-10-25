import { Router } from 'express';
import { jwtValidate } from '../middlewares/jwt';
import MatchesController from '../controllers/MatchesController';
import teamsValidate from '../middlewares/Matche.validate';

const matchesController = new MatchesController();
const matchesRouter = Router();

matchesRouter.get('/', matchesController.getAllMatches);
matchesRouter.post('/', jwtValidate, teamsValidate, matchesController.matcheSaveInProgress);
matchesRouter.patch('/:id/finish', matchesController.changeMatcheInprogrees);
matchesRouter.patch('/:id', matchesController.changeMatche);

export default matchesRouter;
