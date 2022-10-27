// import matches from '../database/models/matches';
// import teams from '../database/models/teams';
import ITime from '../interfaces/Time';
import { IMatcheBoard } from '../interfaces/Matche';
import ITeam from '../interfaces/Team';

const totalPoints = (partidasTime: IMatcheBoard[]) => {
  const points = partidasTime.reduce((acc, game) => {
    if (game.homeTeamGoals > game.awayTeamGoals) return acc + 3;
    if (game.homeTeamGoals === game.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);
  return points;
};

const totalVitorias = (partidasTime: IMatcheBoard[]) => {
  const vitorias = partidasTime.reduce((acc, game) => {
    if (game.homeTeamGoals > game.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);
  return vitorias;
};

const totalEmpates = (partidasTime: IMatcheBoard[]) => {
  const empates = partidasTime.reduce((acc, game) => {
    if (game.homeTeamGoals === game.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);
  return empates;
};

const totalDerrotas = (partidasTime: IMatcheBoard[]) => {
  const derrotas = partidasTime.reduce((acc, game) => {
    if (game.homeTeamGoals < game.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);
  return derrotas;
};

const golsPro = (partidasTime: IMatcheBoard[]) => {
  const gols = partidasTime.reduce((acc, game) => acc + game.homeTeamGoals, 0);
  return gols;
};

const golsContra = (partidasTime: IMatcheBoard[]) => {
  const gols = partidasTime.reduce((acc, game) => acc + game.awayTeamGoals, 0);
  return gols;
};

const goalsBalance = (partidasTime: IMatcheBoard[]) => {
  const golsHome = golsPro(partidasTime);
  const golsAway = golsContra(partidasTime);
  const result = golsHome - golsAway;
  return result;
};

const efficiency = (partidasTime: IMatcheBoard[]) => {
  const points = totalPoints(partidasTime);
  const partidas = partidasTime.length;
  const result = ((points / (partidas * 3)) * 100).toFixed(2);
  return result;
};

const classificacaoSort = (classificacao: ITime[]) => {
  const sort = classificacao.sort((a, b) =>
    b.totalPoints - a.totalPoints || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn);
  return sort;
};

const LeaderboardUtilsHome = async (matchesFinish: IMatcheBoard[], allTeams: ITeam[]) => {
  const classificacao: ITime[] = await allTeams.map((time) => {
    const partidasTime = matchesFinish.filter((iten) => iten.homeTeam === time.id);

    const result: ITime = {
      name: time.teamName,
      totalPoints: totalPoints(partidasTime),
      totalGames: partidasTime.length,
      totalVictories: totalVitorias(partidasTime),
      totalDraws: totalEmpates(partidasTime),
      totalLosses: totalDerrotas(partidasTime),
      goalsFavor: golsPro(partidasTime),
      goalsOwn: golsContra(partidasTime),
      goalsBalance: goalsBalance(partidasTime),
      efficiency: efficiency(partidasTime),
    };
    return result;
  });
  return classificacaoSort(classificacao);
};

export default LeaderboardUtilsHome;
