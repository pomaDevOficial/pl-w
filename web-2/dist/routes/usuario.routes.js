"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerUsuario = void 0;
const express_1 = require("express");
const usuario_controller_1 = require("../controllers/usuario.controller");
const routerUsuario = (0, express_1.Router)();
exports.routerUsuario = routerUsuario;
routerUsuario.post('/', usuario_controller_1.postUsuario);
routerUsuario.post('/login', usuario_controller_1.postUsuarioLogin);
