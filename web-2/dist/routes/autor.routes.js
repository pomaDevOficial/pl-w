"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerAutor = void 0;
const express_1 = require("express");
const autor_controllers_1 = require("../controllers/autor.controllers");
const routerAutor = (0, express_1.Router)();
exports.routerAutor = routerAutor;
routerAutor.get('/', autor_controllers_1.getAutores);
routerAutor.post('/nombre/:nombre', autor_controllers_1.getAutoresName);
routerAutor.post('/seguir', autor_controllers_1.postSeguir);
routerAutor.get('/followers/:id', autor_controllers_1.getFollowerUsuarioID);
routerAutor.put('/seguir', autor_controllers_1.putSeguidor);
routerAutor.post('/seguir/insert', autor_controllers_1.postSeguidorInsert);
routerAutor.get('/informacion/:id', autor_controllers_1.getInformacionAutor);
