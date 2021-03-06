
import { Sequelize } from 'sequelize-typescript';
import Vessel from './vessel';
import PortCall from './port-call';
import { DATABASE_URL, IS_PRODUCTION } from '../conf';

const orm = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: IS_PRODUCTION,
    rejectUnauthorized: IS_PRODUCTION
  }
});

orm.addModels([Vessel, PortCall]);

export {Vessel, PortCall}