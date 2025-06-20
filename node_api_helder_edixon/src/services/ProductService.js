import Categoria from "../models/Categoria.js";
import Producto from "../models/Producto.js";

class ProductService{

  static async getProducts() { 
    try {
      // Creamos la instancia del modelo producto
      const OBJProducto = new Producto();
      // Llamamos el método listar
      const productos = await OBJProducto.getAll();
      // Validamos si no hay productos
      if (productos.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay productos registrados",
        };
      }
      // Retornamos los productos obtenidos
      return {
        error: false,
        code: 200,
        message: "Productos obtenidos correctamente",
        data: productos,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return {
        error: true,
        code: 500,
        message: "Error al obtener los productos",
      };
    }
  }

  static async getProductById(id) { 
    try {
      // Creamos la instancia del modelo producto
      const OBJProducto = new Producto();
      // Llamamos el método consultar por ID
      const producto = await OBJProducto.getById(id);
      // Validamos si no hay producto
      if (producto.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Producto no encontrado",
        };
      }
      // Retornamos el producto obtenido
      return {
        error: false,
        code: 200,
        message: "Producto obtenido correctamente",
        data: producto,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return {
        error: true,
        code: 500,
        message: "Error al obtener el producto",
      };
    }
  }

  static async createProduct(nombre, descripcion, precio, categoria_id) { 
    try {
      // Validamos que el id de la categoría este registrado
      const OBJCategoria = new Categoria();
      // Consultamos la categoría por ID
      const categoria = await OBJCategoria.getById(categoria_id);
      // Validamos si no hay categoría
      if (categoria.length === 0) {
        return {
          error: true,
          code: 404,
          message: "El id de la categoría no existe",
        };
      }
      // Creamos la instancia del modelo producto
      const OBJProducto = new Producto();
      // Llamamos el método crear
      const productoCreado = await OBJProducto.create(
        nombre,
        descripcion,
        precio,
        categoria_id
      );
      // Retornamos el producto creado
      return {
        error: false,
        code: 201,
        message: "Producto creado correctamente",
        data: productoCreado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return {
        error: true,
        code: 500,
        message: "Error al crear el producto",
      };
    }
  }

  static async updateProduct(id, campos) { 
    try {
      // Creamos la instancia del modelo producto
      const OBJProducto = new Producto();
      // Llamamos el método actualizar
      const productoActualizado = await OBJProducto.update(id, campos);
      // Validamos si no se pudo actualizar el producto
      if (productoActualizado === null) {
        return {
          error: true,
          code: 400,
          message: "Error al actualizar el producto",
        };
      }
      // Retornamos el producto actualizado
      return {
        error: false,
        code: 200,
        message: "Producto actualizado correctamente",
        data: productoActualizado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return {
        error: true,
        code: 500,
        message: "Error al actualizar el producto",
      };
    }
  } 

  static async deleteProduct(id) { 
    try {
      // Creamos la instancia del modelo producto
      const OBJProducto = new Producto();
      // Llamamos el método eliminar
      const productoEliminado = await OBJProducto.delete(id);
      // Validamos si no se pudo eliminar el producto
      if (productoEliminado === null) {
        return {
          error: true,
          code: 400,
          message: "Error al eliminar el producto",
        };
      }
      // Retornamos el producto eliminado
      return {
        error: false,
        code: 200,
        message: "Producto eliminado correctamente",
        data: productoEliminado,
      };
    } catch (error) {
      // Retornamos un error en caso de excepción
      return {
        error: true,
        code: 500,
        message: "Error al eliminar el producto",
      };
    }
  }
}

export default ProductService;