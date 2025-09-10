import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface UserAttrs {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  address?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

type UserCreationAttrs = Optional<UserAttrs, 'id' | 'address' | 'createdAt' | 'updatedAt'>;

export class User extends Model<UserAttrs, UserCreationAttrs> implements UserAttrs {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public address!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    firstName: { type: DataTypes.STRING(100), allowNull: false },
    lastName: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(150), allowNull: false, unique: true },
    address: { type: DataTypes.STRING(255), allowNull: true }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'Users'
  }
);
