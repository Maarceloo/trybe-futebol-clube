import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import { IMatcheBoard } from '../interfaces/Matche';
import ITeam from '../interfaces/Team';
import LeaderboardUtilsHome from '../utils/LeaderboardUtils';

class LeaderboardController {
  public service: LeaderboardService;

  constructor() {
    this.service = new LeaderboardService();
  }

  public leaderboardHome = async (req: Request, res: Response) => {
    const { matchesFinish, allTeams } = await this.service.homeTeamLeaderboardFalse();
    const result = await LeaderboardUtilsHome(matchesFinish as IMatcheBoard[], allTeams as ITeam[]);
    return res.status(200).json(result);
  };
}
export default LeaderboardController;
