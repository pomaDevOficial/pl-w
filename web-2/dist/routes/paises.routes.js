"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerPaises = void 0;
const express_1 = require("express");
const paise_controllers_1 = require("../controllers/paise.controllers");
const routerPaises = (0, express_1.Router)();
exports.routerPaises = routerPaises;
routerPaises.get('/', paise_controllers_1.getPaises);
