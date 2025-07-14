import { rutas } from "../routes/Rutas.js";
import { renderHeader } from "./header.js";


window.addEventListener("hashchange", () => {
    const vista = location.hash.slice(1);
    validarVistas(vista);
});
const head=document.querySelector(".home__header");
renderHeader(head);

const validarVistas=async (vista)=>{
    try {
        for (let i = 0; i < rutas.length; i++) {
            if (rutas[i].nombre === vista) {
                await cargarVista(rutas[i].path);
                cargaControler(rutas[i].controlador)
                return;
            }
            
        }
    } catch (error) {
        console.error(error);
        
    }
}

const cargarVista = async (ruta) => {
    try {
        if (!ruta) {
            main.textContent="no se carga vista"
            return;
        }
        const respuesta = await fetch(ruta);
        const html = await respuesta.text();
        document.querySelector("main").innerHTML = html;
        //cargarle el controlador al main
        // .controller()

    } catch (error) {
        console.error(error);
    }
};
const cargaControler=(controlador)=>{
    const controller= controlador;
    controller.rellenar();

}

 window.addEventListener("DOMContentLoaded",()=>{

    const vista = location.hash.slice(1);
    validarVistas(vista);
});