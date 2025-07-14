// import rellenar from "./src/views/categorias/controladorCat.js";
import * as categoriasController from "../views/categorias/categoriasController.js";
import * as productosController from "../views/productos/productosController.js";
// import controladorProd from "../views/productos/controladorPro.js";


export let rutas=[
    {
    nombre:"categorias",
    path:"./src/views/categorias/index.html",
    controlador:categoriasController
    },
    {
    nombre:"productos",
    path:"./src/views/productos/index.html",
    controlador:productosController
    },
    {
    nombre:"crear",
    path:"./src/views/crear/index.html",
    controlador:""
    }
];
