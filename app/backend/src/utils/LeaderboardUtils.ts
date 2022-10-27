// import matches from '../database/models/matches';
// import teams from '../database/models/teams';
import ITime from '../interfaces/Time';
import { IMatcheBoard } from '../interfaces/Matche';

const loarderBoardMap = (partida: IMatcheBoard) => {
  const obj: ITime = {
    name: 'partida.teamHome?.teamName',
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: '',
  };
  return obj;
};

const LeaderboardUtils = (matchesFinish: IMatcheBoard[]) => {
  const result: ITime[] = matchesFinish.map((partida) => loarderBoardMap(partida));
  return result;
};

export default LeaderboardUtils;
