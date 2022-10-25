import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

class MatchesController {
  public service: MatchesService;

  constructor() {
    this.service = new MatchesService();
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
    const newMatche = await this.service.saveMatcheInProgress({ ...req.body, inProgress: true });
    return res.status(201).json(newMatche);
  };
}

export default MatchesController;
