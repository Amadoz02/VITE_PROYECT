// src/routes/Rutas.js
import * as categoriasController from "../views/categorias/categoriasController.js";
import * as productosController from "../views/productos/productosController.js";

export let rutas = {
   inicio : {
    path: "home/index.html",
    controller: homeController,
    private: false
 },   
 categorias :{
  "/":   {
    path: "categories/index.html",
    controller: categoriaController,
    private: false,
   },
  crear:    {
    path: "categories/crear.html",
    controller: categoriaController,
    private: false,
   },
  editar:   {
    path: "categories/crear.html",
    controller: categoriaController,
    private: false,
   }
 },   
 productos : "?",
 login: {
    path: "login/index.html",
    controller: loginController ,
    private: false
 },
 registro:{
    path: "registro/index.html",
    controller: registroController ,
    private: false
 }
};

console.log(" helder gay")
