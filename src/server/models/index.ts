
import { Sequelize } from 'sequelize-typescript';
import Vessel from './vessel';
import PortCall from './port-call';
import { DATABASE_URL } from '../conf';

const orm = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  logging: false
});

orm.addModels([Vessel, PortCall]);

export {Vessel, PortCall}