import teams from '../database/models/teams';
import ITeam from '../interfaces/Team';

class TeamService {
  public TeamGetAll = async (): Promise<ITeam[]> => teams.findAll();

  public TeamGetId = async (id: string): Promise<ITeam | null> => teams.findByPk(id);
}

export default TeamService;
