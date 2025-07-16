import "../../styles/styles.css"

export async function rellenar() {
    try {
        const respuesta = await fetch("http://localhost:8080/api/categorias");
        const resultado = await respuesta.json();
        const categorias = resultado.data;
        const mainElement = document.querySelector("main");

        if (!mainElement) {
            throw new Error('No se encontró el "main"');
        }
        
        let content = `
            <button class="boton boton--crear"><a href="#categorias/crear" class="texto">Agregar Nuevo</a></button>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Botones</th>
                    </tr>
                </thead>
                <tbody>
        `;

        categorias.forEach(cat => {
            content += `
                <tr data-id="${cat.id}">
                    <td>${cat.nombre}</td>
                    <td>${cat.descripcion}</td>
                    <td>
                        <button class="boton boton--editar"><a href="#categorias/actualizar/" class="texto">Actualizar</a></button>
                        <button class="boton boton--eliminar">Eliminar</button>
                    </td>
                </tr>
            `;
        });

        content += `
                </tbody>
            </table>
        `;

        mainElement.innerHTML = content;

        // Agregar evento a todos los botones eliminar
        const botonesEliminar = mainElement.querySelectorAll(".boton--eliminar");

        botonesEliminar.forEach(boton => {
            boton.addEventListener("click", async (e) => {
                // Evitar comportamiento por defecto si es necesario
                e.preventDefault();

                // Obtener el <tr> padre para sacar el ID
                const fila = e.target.closest("tr");
                const idCategoria = fila?.dataset.id;

                if (!idCategoria) {
                    alert("No se pudo identificar la categoría a eliminar.");
                    return;
                }

                // Confirmar eliminación
                const confirmar = confirm("¿Estás seguro que deseas eliminar esta categoría?");
                if (!confirmar) return;

                try {
                    const respuestaDelete = await fetch(`http://localhost:8080/api/categorias/${idCategoria}`, {
                        method: "DELETE",
                    });

                    if (!respuestaDelete.ok) {
                        throw new Error("Error al eliminar la categoría: tienes productios asociados");
                    }

                    // Recargar la tabla
                    await rellenar();

                } catch (error) {
                    alert("Error al eliminar: " + error.message);
                }
            });
        });

        console.log("Categorías:", categorias);
    } catch (error) {
        console.error("Ocurrió un error al cargar las categorías:", error);
    }
}
