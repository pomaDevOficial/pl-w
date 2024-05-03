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
exports.DeleteComentario = exports.postComentario = void 0;
const IConnection_database_1 = __importDefault(require("../database/IConnection.database"));
const postComentario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_autor, id_editorial, contenido } = req.body;
    try {
        const cI = yield IConnection_database_1.default.comentario.create({
            data: {
                id_autor: parseInt(id_autor),
                id_editorial: parseInt(id_editorial),
                fecha_registro: new Date(),
                contenido: contenido,
                id_estado: 1,
            }
        });
        res.status(200).json({
            ok: true,
            comentario: cI
        });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.postComentario = postComentario;
const DeleteComentario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { id_estado } = req.body;
    try {
        const putC = yield IConnection_database_1.default.comentario.updateMany({
            where: {
                id_comentario: parseInt(id)
            },
            data: {
                id_estado
            }
        });
        res.status(200).json('correcto');
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.DeleteComentario = DeleteComentario;
