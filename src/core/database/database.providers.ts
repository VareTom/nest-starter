import { Sequelize } from 'sequelize-typescript';
import { Logger } from '@nestjs/common';

// Config
import configuration from 'src/core/config/configuration';

// Constants
import { DEVELOPMENT, SEQUELIZE } from '../constants';

// Entities
import { User } from 'src/core/entities/user.entity';

export const databaseProviders = [{
  provide: SEQUELIZE,
  useFactory: async () => {
    const dbConfig = configuration()[process.env.NODE_ENV].db;
    const sequelize = new Sequelize(dbConfig);
    sequelize.addModels([
      User
    ]);
    if (process.env.NODE_ENV === DEVELOPMENT) {
      await sequelize.sync({alter: true})
        .then(() => {
          Logger.log(`Database models is synchronized with MySQL.`, 'Sequelize');
        });
    }
    return sequelize;
  },
}];
