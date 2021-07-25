import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { dbConfig } from './db.config';
import { User } from '../../user/entities';
import { Dialect } from 'sequelize/types';

export const dbProvider = [{
  provide: Sequelize,
  useFactory: async () => {
    const options: SequelizeOptions = {
      dialect: 'postgres' as Dialect,
      host: dbConfig.options.host,
      port: dbConfig.options.port,
      omitNull: true,
      username: dbConfig.username,
      password: dbConfig.password,
      database: dbConfig.database,
    }
    const sequelize = new Sequelize(options);
    sequelize.addModels([User]);
    await sequelize.sync();
    return sequelize;
  },
}];