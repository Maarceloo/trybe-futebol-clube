import { Request, Response } from 'express';
import TeamService from '../services/TeamService';
import MatchesService from '../services/MatchesService';

class MatchesController {
  public service: MatchesService;
  public teamService: TeamService;

  constructor() {
    this.service = new MatchesService();
    this.teamService = new TeamService();
  }

  public getAllMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    const matches = await this.service.matchesGetAll();

    if (inProgress === 'true') {
      const result = matches.filter((jogo) => jogo.inProgress === true);
      // console.log('retornou true');
      return res.status(200).json(result);
    }

    if (inProgress === 'false') {
      const result = matches.filter((jogo) => jogo.inProgress === false);
      // console.log('retornou false');
      return res.status(200).json(result);
    }
    // console.log('retornou todos');
    return res.status(200).json(matches);
  };

  public matcheSaveInProgress = async (req: Request, res: Response) => {
    // body.user inserido pelo jwt, para remover descomente.
    // delete req.body.user;
    const { homeTeam, awayTeam } = req.body;
    const teamHome = await this.teamService.TeamGetId(homeTeam);
    const teamAway = await this.teamService.TeamGetId(awayTeam);

    if (!teamHome || !teamAway) {
      return res
        .status(404)
        .json({ message: 'There is no team with such id!' });
    }

    const newMatche = await this.service.saveMatcheInProgress({
      ...req.body,
      inProgress: true,
    });

    return res.status(201).json(newMatche);
  };

  public changeMatcheInprogrees = async (req: Request, res: Response) => {
    const { id } = req.params;
    const inProgress = false;
    await this.service.changeInprogressMatche(id, inProgress);
    return res.status(200).json({ message: 'Finished' });
  };
}

export default MatchesController;
