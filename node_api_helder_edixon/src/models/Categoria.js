import connection from "../utils/db.js";

class Categoria {
  
  // Método para obtener todas las categorías
  async getAll() {
    try {
      const [rows] = await connection.query("SELECT * FROM categorias");
      return rows; // Retorna las categorías obtenidas
    } catch (error) {
      throw new Error("Error al obtener las categorías");
    }
  }

  // Método para obtener una categoría por su id
  async getById(id) {
    try {
      const [rows] = await connection.query(
        "SELECT * FROM categorias WHERE id = ?",
        [id]
      );
      if (rows.length === 0) {
        // Retorna un array vacío si no se encuentra la categoría
        return [];
      }
      // Retorna la categoría encontrada
      return rows[0];
    } catch (error) {
      throw new Error("Error al obtener la categoría");
    }
  }

  // Método para crear una nueva categoría
  async create(nombre, descripcion) {
    try {
      const [result] = await connection.query(
        "INSERT INTO categorias (nombre, descripcion) VALUES (?,?)",
        [nombre, descripcion]
      );
      if (result.affectedRows === 0) {
        return null; // Retorna null si no se pudo crear la categoría
      }
      // Retorna la nueva categoría creada
      return { id: result.insertId, nombre, descripcion };
    } catch (error) {
      throw new Error("Error al crear la categoría");
    }
  }

  // Método para actualizar una categoría
  async update(id, campos) {
    try {
      let query = "UPDATE categorias SET ";
      let params = [];

      // Construimos dinámicamente la consulta de actualización solo con los campos proporcionados
      for (const [key, value] of Object.entries(campos)) {
        query += `${key} = ?, `;
        params.push(value);
      }

      // Eliminamos la última coma y espacio de la consulta
      query = query.slice(0, -2);

      // Añadimos la condición WHERE para seleccionar el producto por su ID
      query += " WHERE id = ?";
      params.push(id);
      const [result] = await connection.query(query, params);
      return result.affectedRows > 0 ? { id, ...campos } : null;
    } catch (error) {
      throw new Error("Error al actualizar la categoría");
    }
  }

  // Método para eliminar una categoría
  async delete(categoriaId) {
    // Procedemos con la eliminación si no está relacionada
    const [result] = await connection.query(
      "DELETE FROM categorias WHERE id = ?",
      [categoriaId]
    );

    if (result.affectedRows === 0) {
      return {
        error: true,
        mensaje: "No se pudo eliminar la categoría, ocurrio un error inesperado.",
      };
    }

    return {
      error: false,
      mensaje: "Categoría eliminada exitosamente.",
    };
  }

  // Método para listar los productos de una categoría
  async productos(categoriaId) {
    const [rows] = await connection.query(
      "SELECT * FROM productos WHERE categoria_id = ?",
      [categoriaId]
    );
    return rows;
  }
}

export default Categoria;
