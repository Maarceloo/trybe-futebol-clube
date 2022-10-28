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

export const totalVitoriasHome = (partidasTime: IMatcheBoard[]) => {
  const vitorias = partidasTime.reduce((acc, game) => {
    if (game.homeTeamGoals > game.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);
  return vitorias;
};

export const totalEmpates = (partidasTime: IMatcheBoard[]) => {
  const empates = partidasTime.reduce((acc, game) => {
    if (game.homeTeamGoals === game.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);
  return empates;
};

export const totalDerrotasHome = (partidasTime: IMatcheBoard[]) => {
  const derrotas = partidasTime.reduce((acc, game) => {
    if (game.homeTeamGoals < game.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);
  return derrotas;
};

export const golHome = (partidasTime: IMatcheBoard[]) => {
  const gols = partidasTime.reduce((acc, game) => acc + game.homeTeamGoals, 0);
  return gols;
};

export const golAway = (partidasTime: IMatcheBoard[]) => {
  const gols = partidasTime.reduce((acc, game) => acc + game.awayTeamGoals, 0);
  return gols;
};

const efficiency = (partidasTime: IMatcheBoard[]) => {
  const points = totalPoints(partidasTime);
  const partidas = partidasTime.length;
  const result = ((points / (partidas * 3)) * 100).toFixed(2);
  return result;
};

export const classificacaoSort = (classificacao: ITime[]) => {
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
      totalVictories: totalVitoriasHome(partidasTime),
      totalDraws: totalEmpates(partidasTime),
      totalLosses: totalDerrotasHome(partidasTime),
      goalsFavor: golHome(partidasTime),
      goalsOwn: golAway(partidasTime),
      goalsBalance: golHome(partidasTime) - golAway(partidasTime),
      efficiency: efficiency(partidasTime),
    };
    return result;
  });
  return classificacaoSort(classificacao);
};

export default LeaderboardUtilsHome;
