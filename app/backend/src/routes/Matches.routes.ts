import { Router } from 'express';
import { jwtValidate } from '../middlewares/jwt';
import MatchesController from '../controllers/MatchesController';

const matchesController = new MatchesController();
const matchesRouter = Router();

matchesRouter.get('/', matchesController.getAllMatches);
matchesRouter.post('/', jwtValidate, matchesController.matcheSaveInProgress);

export default matchesRouter;
