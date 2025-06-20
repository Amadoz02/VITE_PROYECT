import { campos } from "./campos.js";
import { ResponseProvider } from "../../providers/ResponseProvider.js";


export const camposRegistro = (req, res, next) => {
  // Arreglo para almacenar los errores de validación
  const errors = [];
  // Validar cada campo según las reglas definidas
  // Recorremos el arreglo de campos a validar
  for (const campo of campos) {
    const {
      name, //Nombre del campo a validar
      required, // Si el campo es requerido
      minLength, // si el campo tiene un tamaño mínimo
      maxLength, // si el campo tiene un tamaño máximo
      type, // tipo de dato del campo
    } = campo;

    // Capturamos el valor del campo del body de la petición
    const value = req.body[name];
    // Validar si el campo es requerido y está vacío
    if (required && (!value || value.trim() === "")) {
      errors.push({
        campo: name,
        message: `El campo ${name} es obligatorio y no puede estar vacío.`,
      });
      // Si el campo es requerido y está vacío, continuamos al siguiente campo, evitando el resto de validaciones
      continue;
    }
    // Validar que el campo cumpla con el tamaño minimo permitido
    if (minLength && value && value.length < minLength) {
      errors.push({
        campo: name,
        message: `El campo ${name} debe tener al menos ${minLength} caracteres.`,
      });
      // Si el campo no cumple con el tamaño mínimo, continuamos al siguiente campo, evitando el resto de validaciones
      continue;
    }
    // Validar que el campo cumpla con el tamaño máximo permitido
    if (maxLength && value && value.length > maxLength) {
      errors.push({
        campo: name,
        message: `El campo ${name} no puede tener más de ${maxLength} caracteres.`,
      });
      // Si el campo no cumple con el tamaño máximo, continuamos al siguiente campo, evitando el resto de validaciones
      continue;
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

  // Si hay errores, devolver una respuesta con los errores
  if (errors.length > 0) {
    // Retornamos y Llamamos el provider para centralizar los mensajes de respuesta
    return ResponseProvider.error(res, "Error de validación", 400, errors);
  }
  // Si todo está bien, pasamos al siguiente middleware o controlador
  next();
}