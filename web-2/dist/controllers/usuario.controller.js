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
exports.postUsuarioLogin = exports.postUsuario = void 0;
const IConnection_database_1 = __importDefault(require("../database/IConnection.database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, correo, password, apellido } = req.body;
        const [ap, am] = apellido.split(' ');
        const validarCorreo = yield IConnection_database_1.default.usuario.findMany({
            where: { correo }
        });
        console.log(validarCorreo);
        if (validarCorreo.length > 0)
            return res.status(200).json({ msj: 'Correo ya existe' });
        const personaI = yield IConnection_database_1.default.persona.create({
            data: {
                nombre,
                apellido_paterno: ap,
                apellido_materno: am
            }
        });
        const usuarioI = yield IConnection_database_1.default.usuario.create({
            data: {
                correo,
                contrasenia: bcrypt_1.default.hashSync(password, 10),
                id_persona: personaI.id_persona,
                verificacion_email: false,
                id_estado: 1
            }
        });
        const imFP = ['imagenes/app-1.jpg', 'imagenes/app-2.jpg', 'imagenes/app-3.jpg', 'imagenes/app-4.jpg', 'imagenes/app-5.jpg'];
        const s = Math.floor(Math.random() * imFP.length);
        const im = imFP[s];
        const autor = yield IConnection_database_1.default.autor.create({
            data: {
                id_usuario: usuarioI.id_usuario,
                nick_name: 'Untitled',
                foto_perfil: im,
                foto_portada: 'imagenes/app-portada.jpg'
            }
        });
        const token = jsonwebtoken_1.default.sign({ username: correo }, process.env.SECRET || 'poma2088', { expiresIn: '1Hour' });
        res.status(200).json({ token, id: autor.id_autor });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.postUsuario = postUsuario;
const postUsuarioLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, password } = req.body;
    try {
        const ValidarCorreo = yield IConnection_database_1.default.usuario.findFirst({
            where: { correo }
        });
        if (!ValidarCorreo)
            return res.status(404).json({ msj: 'Correo ingreado no corresponde a un correo valido' });
        const validarContraseña = bcrypt_1.default.compareSync(password, ValidarCorreo.contrasenia);
        if (!validarContraseña)
            return res.status(404).json({ msj: 'Contraseña incorrecta' });
        const autor = yield IConnection_database_1.default.autor.findFirst({
            where: {
                id_usuario: ValidarCorreo.id_usuario
            }, select: {
                id_autor: true,
            }
        });
        const tokenL = jsonwebtoken_1.default.sign({ username: correo }, process.env.SECRET || 'poma200', { expiresIn: '1h' });
        res.status(200).json({ tokenL, id: autor === null || autor === void 0 ? void 0 : autor.id_autor });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.postUsuarioLogin = postUsuarioLogin;
