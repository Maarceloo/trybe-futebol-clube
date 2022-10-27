import TeamService from './TeamService';
import MatchesService from './MatchesService';

class LeaderboardService {
  public service: MatchesService;
  public serviceTeam: TeamService;

  constructor() {
    this.service = new MatchesService();
    this.serviceTeam = new TeamService();
  }

  public homeTeamLeaderboardFalse = async () => {
    const allMatches = await this.service.matchesGetAll();
    const matchesFinish = allMatches.filter((partida) => partida.inProgress === false);

    return matchesFinish;
  };
}

export default LeaderboardService;
