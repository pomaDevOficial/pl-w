"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerSeguidores = void 0;
const express_1 = require("express");
const seguidor_controllers_1 = require("../controllers/seguidor.controllers");
const routerSeguidores = (0, express_1.Router)();
exports.routerSeguidores = routerSeguidores;
routerSeguidores.get('/', seguidor_controllers_1.getSeguidores);
routerSeguidores.post('/', seguidor_controllers_1.postSeguidor);
