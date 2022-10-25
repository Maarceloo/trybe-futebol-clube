import teams from '../database/models/teams';
import matches from '../database/models/matches';
import IMatcheCreate from '../interfaces/Matche';

class MatchesService {
  public matchesGetAll = async () => {
    const allMatches = await matches.findAll({
      include: [
        {
          model: teams,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: teams,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    });
    return allMatches;
  };

  public saveMatcheInProgress = async (body: IMatcheCreate) => {
    const newMatche = await matches.create(body);
    return newMatche;
  };

  public changeInprogressMatche = async (id: string, inProgress: boolean) => {
    const result = await matches.update({ inProgress }, { where: { id } });
    return result;
  };
}

export default MatchesService;
