import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';

const teamController = new MatchesController();
const matchesRouter = Router();

matchesRouter.get('/', teamController.getAllMatches);

export default matchesRouter;
