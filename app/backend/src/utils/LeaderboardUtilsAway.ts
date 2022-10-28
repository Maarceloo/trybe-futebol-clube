import ITime from '../interfaces/Time';
import { IMatcheBoard } from '../interfaces/Matche';
import ITeam from '../interfaces/Team';
import {
  totalEmpates,
  golHome,
  golAway,
  totalDerrotasHome,
  totalVitoriasHome,
  classificacaoSort } from './LeaderboardUtilsHome';

const totalPoints = (partidasTime: IMatcheBoard[]) => {
  const points = partidasTime.reduce((acc, game) => {
    if (game.homeTeamGoals < game.awayTeamGoals) return acc + 3;
    if (game.homeTeamGoals === game.awayTeamGoals) return acc + 1;
    return acc;
  }, 0);
  return points;
};

const efficiency = (partidasTime: IMatcheBoard[]) => {
  const points = totalPoints(partidasTime);
  const partidas = partidasTime.length;
  const result = ((points / (partidas * 3)) * 100).toFixed(2);
  return result;
};

const LeaderboardUtilsAway = async (matchesFinish: IMatcheBoard[], allTeams: ITeam[]) => {
  const classificacao: ITime[] = await allTeams.map((time) => {
    const partidasTime = matchesFinish.filter((iten) => iten.awayTeam === time.id);
    const result: ITime = {
      name: time.teamName,
      totalPoints: totalPoints(partidasTime),
      totalGames: partidasTime.length,
      totalVictories: totalDerrotasHome(partidasTime),
      totalDraws: totalEmpates(partidasTime),
      totalLosses: totalVitoriasHome(partidasTime),
      goalsFavor: golAway(partidasTime),
      goalsOwn: golHome(partidasTime),
      goalsBalance: golAway(partidasTime) - golHome(partidasTime),
      efficiency: efficiency(partidasTime),
    };
    return result;
  });
  return classificacaoSort(classificacao);
};

export default LeaderboardUtilsAway;
