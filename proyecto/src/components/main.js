// src/main.js

import { rutas } from "../routes/Rutas.js";
import { renderHeader } from "./components/header.js";
import * as categoriasController from "./views/categorias/categoriasController.js";
import * as productosController from "./views/productos/productosController.js";


const head = document.querySelector(".home__header");
renderHeader(head);

window.addEventListener("hashchange", () => {
  router();
});

window.addEventListener("DOMContentLoaded", () => {
  router();
});

// Función que separa el hash en path y query
function parseHash() {
  const raw = location.hash.slice(1); // sin el #
  const [path, queryString] = raw.split("?");
  
  // Parseamos query
  const query = {};
  if (queryString) {
    queryString.split("&").forEach(param => {
      const [key, value] = param.split("=");
      query[key] = decodeURIComponent(value);
    });
  }

  return { path, query };
}

// El enrutador central
async function router() {
  const main = document.querySelector("main");
  const { path, query } = parseHash();

  // Para rutas vacías redireccionamos a home
  if (!path || path === "/") {
    location.hash = "#categorias";
    return;
  }

  // Dividir path en segmentos
  const segments = path.split("/");

  // Rutas simples
  if (segments.length === 1) {
    const name = segments[0];

    const ruta = rutas.find(r => r.nombre === name);
    if (ruta) {
      await cargarVista(ruta.path);
      if (ruta.controlador) {
        ruta.controlador.rellenar();
      }
      return;
    }
  }

  // Rutas con subrutas
  if (segments.length === 2) {
    const [base, action] = segments;

    if (base === "categorias" && action === "crear") {
      await cargarVista("./src/views/crear/index.html");
      return;
    }

    if (base === "categorias" && action === "editar") {
      const id = query.id;
      if (!id) {
        main.textContent = "Error: Falta el ID para editar";
        return;
      }

      // Guardamos el ID en variable global
      setIdGlobal(id);

      await cargarVista("./src/views/crear/index.html");
      return;
    }
  }

  // Si nada matchea → 404
  main.textContent = "404 - Página no encontrada";
}

// Carga la vista HTML
async function cargarVista(ruta) {
  const main = document.querySelector("main");
  try {
    const res = await fetch(ruta);
    const html = await res.text();
    main.innerHTML = html;
  } catch (error) {
    console.error("Error cargando vista:", error);
    main.textContent = "Error al cargar la vista.";
  }
}