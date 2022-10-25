import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

class TeamController {
  public service: TeamService;

  constructor() {
    this.service = new TeamService();
  }

  public getAllTeam = async (req: Request, res: Response) => {
    const allTeams = await this.service.TeamGetAll();

    if (!allTeams) return res.status(401).json({ message: 'empty object' });

    return res.status(200).json(allTeams);
  };

  public getIdTeam = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await this.service.TeamGetId(id);

    if (!team) return res.status(401).json({ message: 'empty object' });

    return res.status(200).json(team);
  };
}

export default TeamController;
