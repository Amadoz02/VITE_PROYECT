import { ResponseProvider } from "../../providers/ResponseProvider.js";
// Campos personalizados para validar el login
const campos = [
  {
    name: "email",
    required: true,
    minLength: 6,
    maxLength: 40,
    type: "email",
  },
  {
    name: "password",
    required: true,
    minLength: 6,
    maxLength: 40,
  },
];

export const camposLogin = (req, res, next) => { 
  // Arreglo para almacenar los errores de validación
  const errors = [];

  // Recorremos el arreglo de campos a validar
  for (const campo of campos) {
    const { name, required, type } = campo;
    // Capturamos el valor del campo del body de la petición
    const value = req.body[name];
    // Validar si el campo es requerido y está vacío
    if (required && (!value || value.trim() === "")) {
      errors.push({
        campo: name,
        message: `El campo ${name} es obligatorio y no puede estar vacío.`,
      });
    }
    // Validar que el campo sea del tipo requerido en los campos de validación
    if (type === "email" && value) {
      // Validar que el campo sea un email válido
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regexEmail.test(value)) {
        errors.push({
          campo: name,
          message: `El campo ${name} no es un email válido.`,
        });
        // Si el campo no es un email válido, continuamos al siguiente campo, evitando el resto de validaciones
        continue;
      }
    }
  }

  // Si hay errores, respondemos con un error
  if (errors.length > 0) {
    return ResponseProvider.error(res, "Error en los campos", 400, errors);
  }

  // Si no hay errores, continuamos con la siguiente función middleware
  next();
}