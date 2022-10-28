import ITime from '../interfaces/Time';
import { classificacaoSort } from './LeaderboardUtilsHome';

const efficiency = (timeDentro: ITime, timeFora: ITime) => {
  const points = timeDentro.totalPoints + timeFora.totalPoints;
  const partidas = timeDentro.totalGames + timeFora.totalGames;
  const eficiencia = ((points / (partidas * 3)) * 100).toFixed(2);
  return { points, partidas, eficiencia };
};

const golsBalance = (timeDentro: ITime, timeFora: ITime) => {
  const golsFeitos = timeDentro.goalsFavor + timeFora.goalsFavor;
  const golsContra = timeDentro.goalsOwn + timeFora.goalsOwn;
  const saldoGols = golsFeitos - golsContra;
  return { golsFeitos, saldoGols, golsContra };
};

const resultadoTime = (timeDentro: ITime, timeFora: ITime) => {
  const { points, partidas, eficiencia } = efficiency(timeDentro as ITime, timeFora as ITime);
  const { golsFeitos, saldoGols, golsContra } = golsBalance(timeDentro as ITime, timeFora as ITime);
  const result: ITime = {
    name: timeDentro.name,
    totalPoints: points,
    totalGames: partidas,
    totalVictories: timeDentro.totalVictories + timeFora.totalVictories,
    totalDraws: timeDentro.totalDraws + timeFora.totalDraws,
    totalLosses: timeDentro.totalLosses + timeFora.totalLosses,
    goalsFavor: golsFeitos,
    goalsOwn: golsContra,
    goalsBalance: saldoGols,
    efficiency: eficiencia,
  };
  return result;
};

const Leaderboard = (gamesHome: ITime[], gamesAway: ITime[]) => {
  const resultado: ITime[] = gamesHome.map((timeDentro) => {
    const [timeFora] = gamesAway.filter(
      (TimeAway) => timeDentro.name === TimeAway.name,
    );
    return resultadoTime(timeDentro as ITime, timeFora as unknown as ITime);
  });
  return classificacaoSort(resultado);
};

export default Leaderboard;
