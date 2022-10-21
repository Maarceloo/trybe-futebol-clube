import { DataTypes, Model } from 'sequelize';
import db from '.';

class users extends Model {
  id: number;
  role: string;
  email: string;
  password: string;
}

users.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  role: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default users;
