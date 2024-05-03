"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerCategoria = void 0;
const express_1 = require("express");
const categoria_controllers_1 = require("../controllers/categoria.controllers");
const routerCategoria = (0, express_1.Router)();
exports.routerCategoria = routerCategoria;
routerCategoria.get('/', categoria_controllers_1.getCategorias);
