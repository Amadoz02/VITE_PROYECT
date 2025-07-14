export async function rellenar() {
  try {
    // Obtener todas las categorías y productos en paralelo para optimizar tiempos
    const [respuestaCategorias, respuestaProductos] = await Promise.all([
      fetch("http://localhost:8080/api/categorias"),
      fetch("http://localhost:8080/api/productos"),
    ]);

    if (!respuestaCategorias.ok || !respuestaProductos.ok) {
      throw new Error("Error al obtener datos del servidor");
    }

    const resultadoCategorias = await respuestaCategorias.json();
    const resultadoProductos = await respuestaProductos.json();

    const categorias = resultadoCategorias.data;
    const productos = resultadoProductos.data;

    const mainElement = document.querySelector("main");
    if (!mainElement) {
      throw new Error('No se encontró el elemento "main"');
    }

    let content = `
      <button class="boton boton--crear"><a href="#crear" class="texto">Agregar Nuevo</a></button>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
    `;

    // Usa map para crear cada fila, mejora la legibilidad
    content += productos.map(producto => {
      const categoria = categorias.find(c => c.id === producto.categoria_id);
      const nombreCat = categoria ? categoria.nombre : "Sin categoría";

      return `
        <tr data-id="${producto.id}">
          <td>${producto.nombre}</td>
          <td>${producto.descripcion}</td>
          <td>${producto.precio}</td>
          <td>${nombreCat}</td>
          <td>
            <button class="boton boton--editar"><a href="#actualizar" class="texto">Actualizar</a></button>
            <button class="boton boton--eliminar">Eliminar</button>
          </td>
        </tr>
      `;
    }).join("");

    content += `
        </tbody>
      </table>
    `;

    mainElement.innerHTML = content;

    // Delegación de eventos para manejar los botones eliminar (más eficiente)
    mainElement.addEventListener("click", async (e) => {
      if (!e.target.closest(".boton--eliminar")) return;

      e.preventDefault();

      const botonEliminar = e.target.closest(".boton--eliminar");
      const fila = botonEliminar.closest("tr");
      const idProducto = fila?.dataset.id;

      if (!idProducto) {
        alert("No se pudo identificar el producto a eliminar.");
        return;
      }

      const confirmar = confirm("¿Estás seguro que deseas eliminar este producto?");
      if (!confirmar) return;

      try {
        const respuestaDelete = await fetch(`http://localhost:8080/api/productos/${idProducto}`, {
          method: "DELETE",
        });

        if (!respuestaDelete.ok) {
          throw new Error("No se pudo eliminar el producto");
        }

        // Recargar la tabla
        await rellenar();

      } catch (error) {
        alert("Error al eliminar: " + error.message);
      }
    });

  } catch (error) {
    console.error("Ocurrió un error al cargar los productos:", error);
  }
}
