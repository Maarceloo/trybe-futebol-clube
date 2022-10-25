import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

class TeamController {
  public service: TeamService;

  constructor() {
    this.service = new TeamService();
  }

  public getAllTeam = async (req: Request, res: Response) => {
    const allTeams = await this.service.TeamGetAll();

    if (!allTeams) return res.status(401).json({ message: 'vazio' });

    return res.status(200).json(allTeams);
  };
}

export default TeamController;
