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
exports.putReaccion = exports.postReacciones = exports.getReacciones = void 0;
const IConnection_database_1 = __importDefault(require("../database/IConnection.database"));
const getReacciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const autorReacciones = yield IConnection_database_1.default.reaccion.findMany({
            where: {
                id_autor: parseInt(id),
            }
        });
        res.status(200).json(autorReacciones);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getReacciones = getReacciones;
const postReacciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_autor, id_editorial } = req.body;
    try {
        yield IConnection_database_1.default.reaccion.create({
            data: {
                id_autor: parseInt(id_autor),
                id_editorial: parseInt(id_editorial),
                estado: 1
            }
        });
        res.status(200).json({ message: "Reaccion creada" });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.postReacciones = postReacciones;
const putReaccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_editorial, estado } = req.body;
    const { id } = req.params;
    try {
        const s = yield IConnection_database_1.default.reaccion.updateMany({
            data: {
                estado: estado
            }, where: {
                id_autor: parseInt(id),
                id_editorial: parseInt(id_editorial)
            }
        });
        console.log(s);
        res.status(200).json({ msj: 'Actualizado' });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.putReaccion = putReaccion;
