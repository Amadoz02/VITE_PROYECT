// import rellenar from "./src/views/categorias/controladorCat.js";
import * as controladorCat from "../views/categorias/controladorCat.js";
import * as controladorPro from "../views/productos/controladorPro.js";
// import controladorProd from "../views/productos/controladorPro.js";


export let rutas=[
    {
    nombre:"",
    path:"",
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

export const entrutador=(hash)=>{//esta funcion ver si una ruta existe, si no existe la ruta, debe crear una ruta nueva
    try {
        rutas.nombre=hash;
        rutas.path=`./src/views/${hash}/index.html`;
        rutas.controlador=hash+Controlador;

        

        
    } catch (error) {
        console.log(error);
    }
}