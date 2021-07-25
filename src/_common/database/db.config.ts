import { Dialect } from 'sequelize/types';

export interface IDatabaseConfig {
  username: string;
  password: string;
  database: string;
  options: {
    dialect: Dialect;
    host: string;
    port: number;
  }
}

export const dbConfig: IDatabaseConfig = {
  database: 'marketguru',
  username: 'postgres',
  password: 'postgres',
  options: {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
  },
};