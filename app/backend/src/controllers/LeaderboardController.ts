import { Request, Response } from 'express';
import LeaderboardUtils from '../utils/LeaderboardUtils';
import LeaderboardService from '../services/LeaderboardService';
import { IMatcheBoard } from '../interfaces/Matche';

class LeaderboardController {
  public service: LeaderboardService;

  constructor() {
    this.service = new LeaderboardService();
  }

  public leaderboardHome = async (req: Request, res: Response) => {
    const matchesFinish = await this.service.homeTeamLeaderboardFalse();
    const result = await LeaderboardUtils(matchesFinish as IMatcheBoard[]);
    return res.status(200).json(result);
  };
}
export default LeaderboardController;
