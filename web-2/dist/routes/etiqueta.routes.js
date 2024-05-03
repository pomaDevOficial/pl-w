"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerEtiqueta = void 0;
const express_1 = require("express");
const etiqueta_controllers_1 = require("../controllers/etiqueta.controllers");
const routerEtiqueta = (0, express_1.Router)();
exports.routerEtiqueta = routerEtiqueta;
routerEtiqueta.get('/', etiqueta_controllers_1.getEtiqueta);
