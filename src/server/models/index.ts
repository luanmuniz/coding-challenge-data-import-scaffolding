
import { Sequelize } from 'sequelize-typescript';
import Vessel from './vessel';
import PortCall from './port-call';

const orm = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false
});

orm.addModels([Vessel, PortCall]);

Vessel.findAll().then(v => console.log(v))

export {Vessel, PortCall}