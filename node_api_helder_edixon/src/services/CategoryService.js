import Categoria from "../models/Categoria.js";

class CategoryService { 

  static async getCategories()
  { 
    try {
      const categoriaInstance = new Categoria();
      const categorias = await categoriaInstance.getAll();
      // Validamos si no hay categorías      
      if (categorias.length === 0) {
        return {
          error: true,
          code: 404,
          message: "No hay categorías registradas",
        };
      }      
      // Retornamos las categorías obtenidas
      return {
        error: false,
        code: 200,
        message: "Categorías obtenidas correctamente",
        data: categorias,
      };
    } catch (error) {      
      return {
        error: true,
        code: 500,
        message: "Error al obtener las categorías",
      };
    }
  }

  static async getCategoryById(id) {
    try {
      const categoriaInstance = new Categoria();
      const categoria = await categoriaInstance.getById(id);
      // Validamos si no hay categorías
      if (categoria.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Categoría no encontrada",
        };
      }
      // Consultamos los productos asociados a la categoría
      const productos = await categoriaInstance.productos(id);
      // Agregamos la propiedad productos al objeto categoría
      categoria.productos = productos;
      // Retornamos la categoría obtenida
      return {
        error: false,
        code: 200,
        message: "Categoría obtenida correctamente",
        data: categoria,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error al obtener la categoría",
      };
    }
  }

  static async createCategory(nombre, descripcion) {
    try {
      const categoriaInstance = new Categoria();
      const categoria = await categoriaInstance.create(nombre, descripcion);
      // Validamos si no se pudo crear la categoría      
      if (categoria === null) {
        return {
          error: true,
          code: 400,
          message: "Error al crear la categoría",
        };
      }   
      // Retornamos la nueva categoría creada
      return {
        error: false,
        code: 201,
        message: "Categoría creada correctamente",
        data: categoria,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al crear la categoría",
      };
    }
  }

  static async updateCategory(id, campos) { 
    try {
      const categoriaInstance = new Categoria();
      // Consultamos la categoría por id
      const categoriaExistente = await categoriaInstance.getById(id);
      // Validamos si no existe la categoría
      if (categoriaExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Categoría no encontrada",
        };
      }
      const categoria = await categoriaInstance.update(id, campos); 
      // Validamos si no se pudo actualizar la categoría
      if (categoria === null) {
        return {
          error: true,
          code: 400,
          message: "Error al actualizar la categoría",
        };
      }      
      // Retornamos la categoría actualizada
      return {
        error: false,
        code: 200,
        message: "Categoría actualizada correctamente",
        data: categoria,
      };
    } catch (error) {
      return {
        error: true,
        code: 500,
        message: "Error interno al actualizar la categoría",
      };
    } 
  }

  static async deleteCategory(id) { 
    try {
      const categoriaInstance = new Categoria();
      // Consultamos la categoría por id
      const categoriaExistente = await categoriaInstance.getById(id);
      // Validamos si no existe la categoría
      if (categoriaExistente.length === 0) {
        return {
          error: true,
          code: 404,
          message: "Categoría no encontrada",
        };
      }
      // Consultamos los productos asociados a la categoría
      const productos = await categoriaInstance.productos(id);
      // Validamos si la categoría tiene productos asociados
      if (productos.length > 0) {
        return {
          error: true,
          code: 400,
          message: "No se puede eliminar la categoría, tiene productos asociados",
        };
      }
      // Procedemos a eliminar la categoría      
      const resultado = await categoriaInstance.delete(id); 
      // Validamos si no se pudo eliminar la categoría
      if (resultado.error) {
        return {
          error: true,
          code: 400,
          message: resultado.mensaje,
        };
      }      
      // Retornamos la respuesta de eliminación
      return {
        error: false,
        code: 200,
        message: "Categoría eliminada correctamente",
        data: categoriaExistente,
      };
    } catch (error) {
      console.log(error);
      
      return {
        error: true,
        code: 500,
        message: "Error interno al eliminar la categoría",
      };
    }
  }

}

export default CategoryService;