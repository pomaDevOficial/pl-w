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
exports.publicacionLibro = exports.putPublicacionE = exports.postPublicacionLibro = exports.getListaPublicaciones = exports.postPublicacionLibre = void 0;
const IConnection_database_1 = __importDefault(require("../database/IConnection.database"));
const postPublicacionLibre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_autor, id_categoria, id_etiqueta, contenido } = req.body;
    try {
        console.log(req.body);
        const pLE = yield IConnection_database_1.default.editorial.create({
            data: {
                id_autor: parseInt(id_autor),
                fecha_registro: new Date(),
                id_estado: 1
            }
        });
        const pLL = yield IConnection_database_1.default.pl_libre.create({
            data: {
                id_editorial_pl: pLE.id_editorial_pl,
                id_etiqueta,
                contenido,
                id_categoria
            }
        });
        res.status(200).json({ msj: 'Publicacion libre publicado' });
    }
    catch (error) {
        res.status(500).json({ msj: 'Error al crear publicacion' });
    }
});
exports.postPublicacionLibre = postPublicacionLibre;
const getListaPublicaciones = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const publicaciones = yield IConnection_database_1.default.editorial.findMany({
            where: {
                id_estado: 1
            },
            orderBy: {
                fecha_registro: 'desc'
            },
            select: {
                id_editorial_pl: true,
                id_autor: true,
                autor: {
                    select: {
                        foto_perfil: true,
                        foto_portada: true,
                        usuario: {
                            select: {
                                persona: {
                                    select: {
                                        nombre: true,
                                        apellido_paterno: true
                                    }
                                }
                            }
                        }
                    }
                },
                fecha_registro: true,
                comentario: {
                    where: {
                        id_estado: 1,
                    },
                    orderBy: {
                        id_comentario: 'desc'
                    },
                    select: {
                        fecha_registro: true,
                        contenido: true,
                        id_autor: true,
                        id_comentario: true,
                        autor: {
                            select: {
                                foto_perfil: true,
                                usuario: {
                                    select: {
                                        persona: {
                                            select: {
                                                nombre: true,
                                                apellido_paterno: true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                pl_libre: {
                    select: {
                        contenido: true,
                        categoria: {
                            select: {
                                descripcion: true
                            }
                        },
                        etiqueta: {
                            select: {
                                nombre: true,
                                id_etiqueta: true
                            }
                        }
                    }
                }, cap_pl_ln: {
                    select: {
                        id_editorial_pl: true,
                        contenido: true,
                        nombre_capitulo: true,
                        nro_capitulo: true,
                        pl_nl: {
                            select: {
                                titulo: true,
                                descripcion: true,
                                genero: {
                                    select: {
                                        nombre: true,
                                        id_genero: true,
                                    }
                                },
                                categoria: {
                                    select: {
                                        descripcion: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        res.status(200).json(publicaciones);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getListaPublicaciones = getListaPublicaciones;
const postPublicacionLibro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_autor, id_categoria, id_genero, contenido, descripcion, titulo, nro_capitulo, nombre_capitulo } = req.body;
    console.log(req.body);
    try {
        const plEdR = yield IConnection_database_1.default.editorial.create({
            data: {
                id_autor: parseInt(id_autor),
                fecha_registro: new Date(),
                id_estado: 1
            }
        });
        const plLibroR = yield IConnection_database_1.default.pl_nl.create({
            data: {
                id_categoria,
                id_genero,
                titulo,
                descripcion,
                estado: 'publicado'
            }
        });
        const capituloR = yield IConnection_database_1.default.cap_pl_ln.create({
            data: {
                id_editorial_pl: plEdR.id_editorial_pl,
                id_pl_ln: plLibroR.id_pl_ln,
                nro_capitulo,
                nombre_capitulo,
                contenido
            }
        });
        res.status(200).json({ msj: 'Se registro el libro' });
    }
    catch (error) {
        res.status(500).json({ msj: 'Error en servidor' });
    }
});
exports.postPublicacionLibro = postPublicacionLibro;
const putPublicacionE = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { id_estado } = req.body;
    try {
        const putC = yield IConnection_database_1.default.editorial.updateMany({
            where: {
                id_editorial_pl: parseInt(id)
            },
            data: {
                id_estado
            }
        });
        res.status(200).json('Elimincion de la publicacion');
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.putPublicacionE = putPublicacionE;
const publicacionLibro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vl = yield IConnection_database_1.default.pl_nl.findMany({
            where: {
                estado: 'publicado'
            },
            select: {
                id_pl_ln: true,
                cap_pl_ln: {
                    select: {
                        nro_capitulo: true,
                        editorial: {
                            select: {
                                fecha_registro: true,
                                autor: {
                                    select: {
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
                                }
                            }
                        }
                    }
                },
                titulo: true,
                descripcion: true,
                genero: {
                    select: {
                        nombre: true,
                        id_genero: true,
                    }
                },
                categoria: {
                    select: {
                        descripcion: true
                    }
                }
            }
        });
        res.status(200).json(vl);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.publicacionLibro = publicacionLibro;
