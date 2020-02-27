"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var path = require('path');
const app = express_1.default();
const port = 3000;
const staticPath = path.resolve(__dirname, '..', '..', 'dist', 'front-end', 'public');
console.log('Serving sttaic files at ', staticPath);
app.use(express_1.default.static(staticPath));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
