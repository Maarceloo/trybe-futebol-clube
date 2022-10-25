import { DataTypes, Model } from 'sequelize';
import db from '.';
import teams from './teams';

class matches extends Model {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

matches.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: DataTypes.INTEGER,
  homeTeamGoals: DataTypes.INTEGER,
  awayTeam: DataTypes.INTEGER,
  awayTeamGoals: DataTypes.INTEGER,
  inProgress: DataTypes.BOOLEAN,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

matches.belongsTo(teams, { foreignKey: 'homeTeam', as: 'teamHome' });
matches.belongsTo(teams, { foreignKey: 'awayTeam', as: 'teamAway' });

teams.hasMany(matches, { foreignKey: 'homeTeam', as: 'home' });
teams.hasMany(matches, { foreignKey: 'awayTeam', as: 'away' });

export default matches;
