import teams from '../database/models/teams';
import matches from '../database/models/matches';

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
}

export default MatchesService;
