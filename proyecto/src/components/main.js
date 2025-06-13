import { rutas } from "../routes/Rutas";



const cargar=()=> window.addEventListener("hashchange", () => {
    const vista = location.hash.slice(1);
    validarVistas(vista);
});

const validarVistas=(vista)=>{
    try {
        for (let i = 0; i < rutas.length; i++) {
            if (rutas[i].nombre === vista) {
                cargarVista(rutas[i].path);
                return;
                
            }
            
        }
    } catch (error) {
        console.error(error);
        
    }
}

const cargarVista = async (ruta) => {
    try {
        const respuesta = await(await fetch(ruta)).text();
        // const html = await respuesta.text();
        document.querySelector("main").innerHTML = respuesta;
    } catch (error) {
        console.error(error);
    }
};

// window.addEventListener("DOMContentLoaded",()=>{
//     validarVistas(location.hash.slice(1));
// });