import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import { IMatcheBoard } from '../interfaces/Matche';
import ITeam from '../interfaces/Team';
import LeaderboardUtilsHome from '../utils/LeaderboardUtilsHome';
import LeaderboardUtilsAway from '../utils/LeaderboardUtilsAway';
import Leaderboard from '../utils/Leaderboard';
import ITime from '../interfaces/Time';

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

  public leaderboardaway = async (req: Request, res: Response) => {
    const { matchesFinish, allTeams } = await this.service.homeTeamLeaderboardFalse();
    const result = await LeaderboardUtilsAway(matchesFinish as IMatcheBoard[], allTeams as ITeam[]);
    return res.status(200).json(result);
  };

  public leaderboard = async (req: Request, res: Response) => {
    const { matchesFinish, allTeams } = await this.service.homeTeamLeaderboardFalse();

    const gamesAway = await
    LeaderboardUtilsAway(matchesFinish as IMatcheBoard[], allTeams as ITeam[]);

    const gamesHome = await
    LeaderboardUtilsHome(matchesFinish as IMatcheBoard[], allTeams as ITeam[]);

    const result = await
    Leaderboard(gamesHome as ITime[], gamesAway as ITime[]);

    return res.status(200).json(result);
  };
}
export default LeaderboardController;
