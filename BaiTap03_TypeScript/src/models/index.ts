'use strict';

import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import process from 'process';
import configFile from '../config/config.json';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const config: any = (configFile as any)[env];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db: any = {};

let sequelize: Sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable] as string, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    // Models are still authored in JS, export default is a function (sequelize, DataTypes)
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const defineModel = require(path.join(__dirname, file));
    const model = defineModel(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

