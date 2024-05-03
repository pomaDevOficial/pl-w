"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerGenero = void 0;
const express_1 = require("express");
const genero_controllers_1 = require("../controllers/genero.controllers");
const routerGenero = (0, express_1.Router)();
exports.routerGenero = routerGenero;
routerGenero.get('/', genero_controllers_1.getGeneros);
