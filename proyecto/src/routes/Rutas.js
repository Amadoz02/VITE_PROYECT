// import rellenar from "./src/views/categorias/controladorCat.js";
import * as controladorCat from "../views/categorias/controladorCat.js";
import * as controladorPro from "../views/productos/controladorPro.js";
// import controladorProd from "../views/productos/controladorPro.js";
export let rutas=[
    {
    nombre:"categorias",
    path:"./src/views/categorias/index.html",
    controlador:controladorCat
    },
    {
    nombre:"productos",
    path:"./src/views/productos/index.html",
    controlador:controladorPro
    },
    {
    nombre:"crear",
    path:"./src/views/crear/index.html",
    controlador:""
    }
];