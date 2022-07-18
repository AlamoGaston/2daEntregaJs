/*
-1) En la primer pagina se va a ingresar usuario y contraseña y luego al tocar el boton ingresar pase a la siguiente
pagina automaticamente, ya que no tengo una base de datos
-2) En la pagina de cotizacion de elije uno o mas seguros acorde a la suma del total de vehiculos que
se quiere asegurar, se pulsa en boton "Abonar" y pasa a la siguiente pagina
-3)En la ultima pagina muestra el total y se elije la forma de pago


/*--CLASES--*/
class Seguro {
  constructor(id, nombreTipo, imagen, precio) {
    this.id = id;
    this.nombreTipo = nombreTipo;
    this.imagen = imagen;
    this.precio = precio;
  }
}

class segElegido {
  constructor(id) {
    this.id = id;
    this.seguros = [];
  }

  calcularTotal() {
    let total = 0;
    for (let i = 0; i < this.seguros.length; i++) {
      total = total + this.seguros[i].precio;
    }
    return total;
  }
}

/*--FUNCIONES--*/

function renderCard(seguro) {
  let cardRendered = `
    <div class="card m-3" style="width: 18rem">
        <img src="./IMG/${seguro.imagen}" class="card-img-top" alt="..." />
        <div class="card-body">
            <h5 class="card-title">${seguro.id}.${seguro.nombreTipo}</h5>
            <p class="card-text">$ ${seguro.precio}</p>
            <a href="#" class="btn d-grid gap-2 btn-primary botonDeEleccion" id="${seguro.id}">Elegir</a> 
        </div>
    </div>`;
  return cardRendered;
}

function borrarSeleccion() {
  let divSeleccion = document.querySelector("#seleccion");
  divSeleccion.innerHTML = "";
}

function cambiarSeleccion(seleccion) {
  let divSeleccion = document.querySelector("#seleccion");
  seleccion.seguros.forEach((seguro) => {
    divSeleccion.innerHTML += renderCard(seguro);
  });
  divSeleccion.innerHTML += `
  <h2>Total a pagar: $ ${seleccion.calcularTotal()}</h2>
  `;
}

function renovarStorage() {
  localStorage.removeItem("seleccion");
  localStorage.setItem("seleccion", JSON.stringify(seleccion));
}

/*--Cargar seleccion en storage--*/

window.addEventListener(`DOMContentLoaded`, (e) => {
  let storage = JSON.parse(localStorage.getItem("seleccion"));
  let seleccionGuardada = new segElegido(storage.id, storage.seguros);
  storage.seguros.forEach((seguro) => {
    seleccionGuardada.seguros.push(seguro);
  });
  console.log(seleccionGuardada);
  borrarSeleccion();
  cambiarSeleccion(seleccionGuardada);
});

/*--CATALOGO--*/

let catalogoSeguros = [];
let seguro1 = new Seguro(1, "Moto Responsabilidad civil", "moto1.jpg", 500);
let seguro2 = new Seguro(2, "Moto Contra todo riesgo", "moto2.jpg", 1000);
let seguro3 = new Seguro(3, "Auto Responsabilidad civil", "coche1.jpg", 750);
let seguro4 = new Seguro(4, "Auto Contra todo riesgo", "coche2.jpg", 2000);
let seguro5 = new Seguro(
  5,
  "Camion Responsabilidad civil",
  "camion1.jpg",
  1000
);
let seguro6 = new Seguro(6, "Camion Contra todo riesgo", "camion2.jpg", 5000);
catalogoSeguros.push(seguro1);
catalogoSeguros.push(seguro2);
catalogoSeguros.push(seguro3);
catalogoSeguros.push(seguro4);
catalogoSeguros.push(seguro5);
catalogoSeguros.push(seguro6);

/*-- Generar mis tarjetas de seguros--*/
let cardsDiv = document.querySelector("#cards");
catalogoSeguros.forEach((seguro) => {
  cardsDiv.innerHTML += renderCard(seguro);
});

/*--Ingresar la seleccion de un seguro--*/

let seleccion = new segElegido(1);
let botones = document.querySelectorAll(".botonDeEleccion");
let arrayDeBotones = Array.from(botones);
arrayDeBotones.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    let seguroSeleccionado = catalogoSeguros.find(
      (seguro) => seguro.id == e.target.id
    );
    seleccion.seguros.push(seguroSeleccionado);
    borrarSeleccion();
    cambiarSeleccion(seleccion);
    renovarStorage();
  });
});

/*--Formilario inicial--*/

let formulario = document.getElementById("formulario");
let inputUsuario = document.getElementById("inputUsuario");
let inputPassword = document.getElementById("inputPassword");

formulario.onsubmit = (event) => validarFomrulario(event);
function validarFomrulario(event) {
  event.preventDefault();
  console.log(event.target);
  console.log("Ingreso el usuario");
  console.log(inputUsuario.value);
  console.log(inputPassword.value);
  formulario.reset();
}
