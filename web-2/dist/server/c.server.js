"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
// import sharp from 'sharp'
// import { etiqueta } from '../../dist/generate/client/index';
const base_routes_1 = require("./base.routes");
class App {
    constructor() {
        this.api = '/api/v1/';
        this.imagesFolder = path_1.default.join(__dirname, '../public/imagenes');
        this.rutaApi = {
            usuario: this.api + "usuario",
            autor: this.api + "autor",
            pais: this.api + "pais",
            publicacion: this.api + "publicacion",
            comentario: this.api + "comentario",
            seguidores: this.api + "seguidores",
            persona: this.api + "persona",
            categoria: this.api + "categoria",
            etiqueta: this.api + "etiqueta",
            reaccion: this.api + 'reaccion',
            genero: this.api + "genero",
            favoritos: this.api + "favoritos",
            imagenes: '/imagenes',
        };
        this.app = (0, express_1.default)();
        this.puerto = process.env.PORT;
        this.middlewares();
        this.routes();
    }
    static init() {
        return new App();
    }
    Start(calbak) {
        this.app.listen(this.puerto, () => {
            console.log(`Servidor Express en ejecución en el puerto  http://localhost:${this.puerto}`);
            calbak();
        });
    }
    middlewares() {
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.json());
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use((_req, res, next) => {
            res.setHeader('Cache-Control', 'no-store');
            res.header("Access-Control-Allow-Origin", "*"); // Permitir solicitudes desde cualquier origen
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            next();
        });
        // this.app.use(this.rutaApi.imagenes, (req, res, next)=>{
        //     const rutaImagen = `${this.imagesFolder}${req.url}`
        //     sharp(rutaImagen)
        //     .resize(800)
        //     .toBuffer((err,buffer)=>{
        //         if(err){
        //             return next()
        //         }
        //         res.setHeader('Content-Type', 'image/jpeg')
        //         res.send(buffer)
        //     })
        // })
    }
    routes() {
        this.app.use(this.rutaApi.imagenes, express_1.default.static(this.imagesFolder));
        this.app.use(this.rutaApi.autor, base_routes_1.routerAutor);
        this.app.use(this.rutaApi.pais, base_routes_1.routerPaises);
        this.app.use(this.rutaApi.genero, base_routes_1.routerGenero);
        this.app.use(this.rutaApi.usuario, base_routes_1.routerUsuario);
        this.app.use(this.rutaApi.persona, base_routes_1.routerPersona);
        this.app.use(this.rutaApi.etiqueta, base_routes_1.routerEtiqueta);
        this.app.use(this.rutaApi.categoria, base_routes_1.routerCategoria);
        this.app.use(this.rutaApi.seguidores, base_routes_1.routerSeguidores);
        this.app.use(this.rutaApi.comentario, base_routes_1.routerComentario);
        this.app.use(this.rutaApi.publicacion, base_routes_1.routerPublicacion);
        this.app.use(this.rutaApi.reaccion, base_routes_1.routerReaciones);
    }
}
exports.App = App;
