export const esValido = (e) => {
  e.preventDefault();
  // console.log(e.target.children);
  const obj = {};
  const campos = [...e.target].filter((elemento) => {
    return elemento.hasAttribute("required");
  });
  const radios = [...campos].filter((elemento) => {
    return elemento.type === "radio";
  });
  const checkbox = [...campos].filter((elemento) => {
    return elemento.type === "checkbox";
  });
  const campo_radio = radios.find((radio) => radio.checked) || [];
  if (campo_radio.length === 0) {
    obj[radios[0].name] = "";
  } else {
    obj[radios[0].name] = campo_radio.value;
  }
  const campo_checkbox = checkbox.filter((e) => e.checked);
  if (campo_checkbox.length < 3) {
    obj[checkbox[0].name] = "";
  } else {
    obj[checkbox[0].name] = [...campo_checkbox].map(e => e.value);
  }

  campos.forEach((campo) => {
    switch (campo.tagName){
      case "INPUT":
        if (campo.type == "text" || campo.type == "number" || campo.type == "password" || campo.type == "tel") {
          obj[campo.name] = campo.value;
          if (campo.value.trim() === "") {
            campo.classList.add("error");
          }
        }
        break;
      case "SELECT":
        obj[campo.name] = campo.selectedIndex;
        if (campo.selectedIndex === 0) {
          campo.classList.add("error");
        }
      default:
        break;
    }
  });
  return obj;
};
//usuario
//ciudades
//generos
//lenguajes
//todo unido(usuario y lenguajes)