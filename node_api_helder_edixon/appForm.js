import {esValido} from "./modulo.js";
//Variables
const formulario = document.querySelector("form");
const nombre = document.querySelector("[name=nombre]");
const apellido = document.querySelector("[name=apellido]");
const telefono = document.querySelector("[name=telefono]");
const documento = document.querySelector("[name=documento]");
const usuario = document.querySelector("[name=usuario]");
const contrasena = document.querySelector("[name=contrasena]");
const politicas = document.querySelector("[name=politicas]");
const boton = document.querySelector("#btn_validar");

const usuarios = document.querySelector("#usuarios");

//Funciones
const validar = (event) => {
  const valores = [nombre, apellido, telefono, documento, usuario, contrasena];
  const valoresString = [
    "nombre",
    "apellido",
    "telefono",
    "documento",
    "usuario",
    "contraseña",
  ];
  event.preventDefault();
  let cont = 0;
  let focus = 0;
  let mensaje = "Ingrese correctamente: ";
  for (let x = 0; x < valores.length; x++) {
    if (valores[x].value.trim() === "")
    {
    if(valores[x].nextElementSibling) valores[x].nextElementSibling.remove();
    if (cont > 0) {
      mensaje += ", " + valoresString[x];
    } else {
      mensaje += " " + valoresString[x];
      cont++;
    }
    valores[x].style.border = "2px solid red";
    if (focus == 0) {
      valores[x].focus();
      focus++;
    }
    let aviso = document.createElement("span");
    aviso.classList.add("avisoError");
    aviso.textContent = `El campo ${valoresString[x]} es Obligatorio`;
    valores[x].insertAdjacentElement("afterend", aviso);
    }
    // else formulario.addEventListener("submit", esValido);
  }
  if (mensaje != "Ingrese correctamente: ") alert(mensaje);
};
const letras = (event) => {
  const regexp = /^[a-zA-Z]$/;
  if (!regexp.test(event.key) && event.key !== "Backspace" && event.key !== "Tab") {
    event.preventDefault();
  }
    if (event.target.value.length >= 10) {
      event.preventDefault();
  }
};
const numeros = (event) => {
  if (!/^\d$/.test(event.key) && event.key !== "Backspace" && event.key !== "Tab") {
    event.preventDefault();
  }
  if (event.target.value.length >= 10) {
    event.preventDefault();
  }
};
const limpiar = (event) => {
  if (event.target.value !== "") {
    event.target.classList.remove("error")
    event.target.style.border = "0px";
    if (event.target.nextElementSibling) {
      event.target.nextElementSibling.remove();
    }
  }
}
const acepta = () => {
  if (!politicas.checked) {
    boton.setAttribute("disabled", "");
  }
  else {
    boton.removeAttribute('disabled');
  }
}
const isValid = (e) => {
  let data = esValido(e)
  console.log(data);
}
//Eventos
addEventListener("DOMContentLoaded",acepta);
politicas.addEventListener('change',acepta)
formulario.addEventListener("submit", isValid);
// formulario.addEventListener("submit", validar);
// nombre.addEventListener("keydown", letras);
// apellido.addEventListener("keydown", letras);
// telefono.addEventListener("keydown", numeros);
// documento.addEventListener("keydown", numeros);
// nombre.addEventListener("blur", limpiar);
// apellido.addEventListener("blur", limpiar);
// telefono.addEventListener("blur", limpiar);
// documento.addEventListener("blur", limpiar);
// usuario.addEventListener("blur", limpiar);
// contrasena.addEventListener("blur", limpiar);
