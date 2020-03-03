"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const models_1 = require("./models");
const import_service_1 = require("./import-service");
var path = require('path');
const app = express_1.default();
const port = 3000;
const staticPath = path.resolve(__dirname, '..', '..', 'dist', 'front-end', 'public');
console.log('Serving sttaic files at ', staticPath);
app.use(express_1.default.static(staticPath));
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Example app listening on port ${port}!`);
    yield import_service_1.importVesselsIntoLocalDatabase();
    import_service_1.importSingleVessel();
}));
app.get('/api/vessels', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const vessels = yield models_1.Vessel.findAll();
    res.send(vessels || []);
}));
