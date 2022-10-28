import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardController = new LeaderboardController();
const leaderboardRouter = Router();

leaderboardRouter.get('/home', leaderboardController.leaderboardHome);
leaderboardRouter.get('/away', leaderboardController.leaderboardaway);

export default leaderboardRouter;
