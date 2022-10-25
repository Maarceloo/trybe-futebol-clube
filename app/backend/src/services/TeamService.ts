import teams from '../database/models/teams';
import ITeam from '../interfaces/Team';

class TeamService {
  public TeamGetAll = async (): Promise<ITeam[]> => {
    const allTeams = await teams.findAll();
    return allTeams;
  };
}

export default TeamService;
