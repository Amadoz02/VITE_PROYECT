import  Producto  from "../models/Producto.js";
import { ResponseProvider } from "../providers/ResponseProvider.js";
import ProductService from "../services/ProductService.js";

class ProductoController{

  // Obtener todos los productos
  static getAllProductos = async (req, res) => {
    try {
      const response = await ProductService.getProducts();
      // Validamos si no hay productos
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      }
      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code
      );
    } catch (error) {
      return ResponseProvider.error(
        res,
        "Error interno en el servidor",
        500
      );
    }
  };

  // Obtener un producto por su ID
  static getProductoById = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para obtener el producto por su ID
      const response = await ProductService.getProductById(id);
      // Validamos si no hay producto
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      }
      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code
      );
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(
        res,
        "Error interno en el servidor",
        500
      );
    }
  };

  // Crear un nuevo producto
  static createProducto = async (req, res) => {  
    const { nombre, descripcion, precio, categoria_id } = req.body;  
    try {
      // Llamamos el método crear del modelo
      const producto = await ProductService.createProduct(
        nombre,
        descripcion,
        precio,
        categoria_id
      );
      // Validamos que la respuesta no tenga error
      if (producto.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(
          res,
          producto.message,
          producto.code
        );
      }
      // Retornamos el producto creado
      return ResponseProvider.success(
        res,
        producto,
        "Producto creado correctamente",
        201
      );
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(
        res,
        "Error interno al crear el producto",
        500
      );
    }
  };

  // Actualizar un producto
  static updateProducto = async (req, res) => {
    const { id } = req.params;
    const campos = req.body;
    try {
      // Creamos una instancia de producto
      const OBJProducto = new Producto(id, campos);
      // Llamamos al método actualizar del modelo
      const producto = await ProductService.updateProduct(
        id,
        campos
      );
      // Validamos si no se pudo actualizar el producto
      if (producto === null) {
        return ResponseProvider.error(
          res,
          "Error al actualizar el producto",
          400
        );
      }
      // Retornamos el producto actualizado
      return ResponseProvider.success(
        res,
        producto,
        "Producto actualizado correctamente",
        200
      );
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(
        res,
        "Error interno al actualizar el producto",
        500
      );
    }
  };

  // Eliminar un producto
  static deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
      // Llamamos al servicio para eliminar el producto por su ID
      const response = await ProductService.deleteProduct(id);
      // Validamos si no se pudo eliminar el producto
      if (response.error) {
        // Llamamos el provider para centralizar los mensajes de respuesta
        return ResponseProvider.error(
          res,
          response.message,
          response.code
        );
      }
      // Retornamos el producto eliminado
      return ResponseProvider.success(
        res,
        response.data,
        response.message,
        response.code
      );
    } catch (error) {
      // Llamamos el provider para centralizar los mensajes de respuesta
      return ResponseProvider.error(
        res,
        "Error interno al eliminar el producto",
        500
      );
    }
  }

}

export default ProductoController;
