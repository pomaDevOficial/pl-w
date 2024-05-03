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
exports.getInformacionAutor = exports.getFollowerUsuarioID = exports.postSeguidorInsert = exports.postSeguir = exports.putSeguidor = exports.getAutoresName = exports.getAutores = void 0;
const IConnection_database_1 = __importDefault(require("../database/IConnection.database"));
// import {PrismaClient} from '@prisma/client'
// const connec = new PrismaClient()
const getAutores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const autores = yield IConnection_database_1.default.autor.findMany({
            select: {
                usuario: {
                    select: {
                        id_usuario: true,
                        persona: {
                            select: {
                                nombre: true
                            }
                        }
                    }
                }
            }
        });
        res.status(200).json(autores);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getAutores = getAutores;
const getAutoresName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre } = req.params;
    const { id_a } = req.body;
    try {
        const au = yield IConnection_database_1.default.autor.findMany({
            where: {
                usuario: {
                    persona: {
                        nombre: {
                            contains: nombre
                        }
                    }
                }
            },
            select: {
                id_autor: true,
                usuario: {
                    select: {
                        persona: {
                            select: {
                                nombre: true
                            }
                        }
                    }
                }
            }
        });
        const listSeguidore = yield IConnection_database_1.default.seguido.findMany({
            where: {
                id_user_seguido: parseInt(id_a)
            },
            select: {
                id_user_seguidor: true,
                id_seguimiento: true
            }
        });
        console.log(req.body);
        console.log(listSeguidore);
        res.status(200).json({ au, listSeguidore });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getAutoresName = getAutoresName;
const putSeguidor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_user_seguido, id_user_seguidor, id_seguimiento } = req.body;
    try {
        const s = yield IConnection_database_1.default.seguido.updateMany({
            data: {
                id_seguimiento: parseInt(id_seguimiento)
            }, where: {
                id_user_seguido: parseInt(id_user_seguido),
                id_user_seguidor: parseInt(id_user_seguidor)
            }
        });
        const aSeguidorList = yield IConnection_database_1.default.seguido.findMany({
            where: {
                id_user_seguido: parseInt(id_user_seguido)
            },
            select: {
                id_user_seguidor: true,
                id_seguimiento: true
            }
        });
        console.log(s);
        res.status(200).json({ msj: 'Actualizado', aSeguidorList });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.putSeguidor = putSeguidor;
const postSeguir = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, usuarioId, id_s } = req.body;
    console.log(req.body);
    try {
        const vFollower = yield IConnection_database_1.default.seguido.findMany({
            where: {
                id_user_seguidor: id,
                id_user_seguido: parseInt(usuarioId)
            }, select: {
                id_seguimiento: true,
                id_seguido: true
            }
        });
        console.log(vFollower);
        const Foll = vFollower.length > 0;
        if (!Foll) {
            console.log("insert");
            const follower = yield IConnection_database_1.default.seguido.create({
                data: {
                    id_user_seguidor: id,
                    id_user_seguido: parseInt(usuarioId),
                    id_seguimiento: id_s
                }
            });
            return res.status(200).json(follower);
        }
        console.log('aptualizar');
        let ds = vFollower.map(a => a.id_seguimiento);
        console.log(ds);
        const newIdSeguimiento = ds.includes(1) ? 2 : 1;
        console.log(newIdSeguimiento);
        const vUpdate = yield IConnection_database_1.default.seguido.updateMany({
            where: {
                id_user_seguidor: id,
                id_user_seguido: parseInt(usuarioId)
            },
            data: {
                id_seguimiento: newIdSeguimiento
            }
        });
        // console.log(vFollower)
        const ms = (ds.includes(1) ? 'Siguendo la cuenta' : 'Dejando se seguir');
        return res.status(200).json({ msj: ms });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.postSeguir = postSeguir;
const postSeguidorInsert = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_user_seguidor, id_seguimiento, id_user_seguido } = req.body;
    try {
        yield IConnection_database_1.default.seguido.create({
            data: {
                id_user_seguidor: parseInt(id_user_seguidor),
                id_user_seguido: parseInt(id_user_seguido),
                id_seguimiento: parseInt(id_seguimiento)
            }
        });
        const list = yield IConnection_database_1.default.seguido.findMany({
            where: {
                id_user_seguido: parseInt(id_user_seguido)
            },
            select: {
                id_user_seguidor: true,
                id_seguimiento: true
            }
        });
        res.status(200).json(list);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.postSeguidorInsert = postSeguidorInsert;
const getFollowerUsuarioID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const listSeguidore = yield IConnection_database_1.default.seguido.findMany({
            where: {
                id_user_seguido: parseInt(id)
            },
            select: {
                id_user_seguidor: true,
                id_seguimiento: true
            }
        });
        console.log(listSeguidore);
        res.status(200).json(listSeguidore);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getFollowerUsuarioID = getFollowerUsuarioID;
const getInformacionAutor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const autor = yield IConnection_database_1.default.autor.findFirst({
            where: {
                id_autor: parseInt(id)
            },
            select: {
                id_autor: true,
                foto_perfil: true,
                foto_portada: true,
                nick_name: true,
                usuario: {
                    select: {
                        id_usuario: true,
                        persona: {
                            select: {
                                nombre: true,
                                apellido_paterno: true,
                                apellido_materno: true
                            }
                        }
                    }
                }
            }
        });
        res.status(200).json(autor);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getInformacionAutor = getInformacionAutor;
