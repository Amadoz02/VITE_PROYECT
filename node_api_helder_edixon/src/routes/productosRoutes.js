import express from "express";

import ProductoController from "../controllers/ProductoController.js";
import { camposProducto } from "../middlewares/productos/index.js";
import { parcialesProducto } from "../middlewares/productos/parcialesProducto.js";

const router = express.Router();

// Obtener todos los productos
router.get("/", ProductoController.getAllProductos);

// Obtener un producto por ID
router.get("/:id", ProductoController.getProductoById);

// Crear un nuevo producto
router.post("/", camposProducto, ProductoController.createProducto);

router.put("/:id", camposProducto, ProductoController.updateProducto);

// Actualizar un producto
router.patch("/:id", parcialesProducto, ProductoController.updateProducto);

// Eliminar un producto
router.delete("/:id", ProductoController.deleteProduct);

export default router;