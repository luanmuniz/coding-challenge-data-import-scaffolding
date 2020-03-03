"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const vessel_1 = __importDefault(require("./vessel"));
exports.Vessel = vessel_1.default;
const port_call_1 = __importDefault(require("./port-call"));
exports.PortCall = port_call_1.default;
const orm = new sequelize_typescript_1.Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false
});
orm.addModels([vessel_1.default, port_call_1.default]);
vessel_1.default.findAll().then(v => console.log(v));
