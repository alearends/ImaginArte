mostrar();

//-----------------------Navbar
const links = document.querySelectorAll("nav div ul li a");
const currentURL = window.location.href;

for (const link of links) {
  if (link.href === currentURL) {
    link.classList.add("active");
  }
}

function openMenu(){
  let menu = document.getElementById('navbar-search');

  if(menu.classList.contains('hidden')){
    menu.classList.remove('hidden');
  }else{
    menu.classList.add('hidden');
  }
}

//-----------------------Insertar Datos

function insertar() {
  let nombre = document.getElementById("nombre").value;
  let autor = document.getElementById("autor").value;
  let sintesis = document.getElementById("sintesis").value;
  let profesion = document.getElementById("profesion").value;
  let portada = document.getElementById("portada").value;

  let nuevoObjeto = {
    nombre: nombre,
    autor: autor,
    sintesis: sintesis,
    profesion: profesion,
    portada: portada,
  };

  fetch("/lista", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevoObjeto),
  });
  mostrar();
}

function limpiarCampos() {
  document.getElementById("nombre").value = "";
  document.getElementById("autor").value = "";
  document.getElementById("sintesis").value = "";
  document.getElementById("profesion").value = "";
  document.getElementById("portada").value = "";
}


function editarAutor(index) {
  const autorElement = document.getElementById(`autorEditar${index}`);
  autorElement.contentEditable = true;
  autorElement.focus();
}

function editarNombre(index) {
  const nombreElement = document.getElementById(`nombreEditar${index}`);
  nombreElement.contentEditable = true;
  nombreElement.focus();
}

function editarProfesion(index) {
  const profesionElement = document.getElementById(`profesionEditar${index}`);
  profesionElement.contentEditable = true;
  profesionElement.focus();
}

function editarSintesis(index) {
  const sintesisElement = document.getElementById(`sintesisEditar${index}`);
  sintesisElement.contentEditable = true;
  sintesisElement.focus();
}

function editarPortada(index) {
  const portadaElement = document.getElementById(`imagenEditar${index}`);
  const portadaEditarElement = document.getElementById(`portadaEditar${index}`);
  portadaEditarElement.style.display = "inline-block";
  portadaEditarElement.classList.remove("hidden");
  portadaEditarElement.value = portadaElement.getAttribute(src=`./build/assets/`+`portadaEditar${index}`);
  portadaEditarElement.classList.add("w-full", "text-left", "transition", "duration-1000", "ease-in-out", "transform", "-translate-y-2");
  portadaEditarElement.focus();
}

function guardarCambios(index) {
  const autorElement = document.getElementById(`autorEditar${index}`);
  const nombreElement = document.getElementById(`nombreEditar${index}`);
  const profesionElement = document.getElementById(`profesionEditar${index}`);
  const sintesisElement = document.getElementById(`sintesisEditar${index}`);
  const portadaEditarElement = document.getElementById(`portadaEditar${index}`);

  const nuevo = {
    autor: autorElement.textContent || autor,
    nombre: nombreElement.textContent || nombre,
    profesion: profesionElement.textContent,
    sintesis: sintesisElement.textContent || sintesis,
    portada: portadaEditarElement.value
  };
  console.log(`la portada es ${portada}`)

  fetch("/lista", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevo),
  }).then(() => {
    mostrar();
  });
}

function borrarThisCard(index) {
  const nombre = document.getElementById(`cardBorrar${index}`).value;
  fetch("/lista", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nombre: nombre }),
  })
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      mostrar();
    });
}

function mostrar() {
  fetch("/lista", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function mostrarRespuesta(respuesta) {
      return respuesta.json();
    })
    .then(function mostrarDatos(datos) {
      let frontend = ``;
      for (let i = 0; i < datos.length; i++) {
        frontend += `
        <div class="flex flex-col w-full lg:w-1/3 text-center text-white lg:rounded-t-2xl" style="border: 5px orange solid; margin: 5px 2px">
        <img src="./build/assets/${datos[i].portada}" alt="${datos[i].nombre}" class="w-full h-auto text-white mb-2 lg:rounded-t-2xl">
        <div class="flex flex-col justify-around">
        <div class="flex flex-row justify-between ml-2"></div> 
          <input type="text" id="portadaEditar${i}" class="hidden text-black " placeholder="Nueva portada">
          <button class="relative w-fit bg-blue-500 text-white p-2 rounded hover:bg-gray-600 hover:border hover:border-black m-2 transition duration-700 ease-in-out ..." onclick="editarPortada(${i})">✏️</button>
            <div class="flex flex-row justify-between ml-2">
              <h4 class="lg:mb-2 text-lg lg:text-2xl font-normal" style="color: orange" id="nombreEditar${i}" onblur="guardarCambios(${i})" contentEditable="false">${datos[i].nombre}</h4>
              
            </div>
            <div class="flex flex-row justify-between ml-2">
              <p class="lg:mb-2 text-lg lg:text-2xl font-normal text-white" id="autorEditar${i}" onblur="guardarCambios(${i})" contentEditable="false">${datos[i].autor}</p>
              <button class="top-0 bg-blue-500 text-white p-2 rounded hover:bg-gray-600 hover:border hover:border-black m-2 transition duration-700 ease-in-out ..." onclick="editarAutor(${i})">✏️</button>
            </div>
            <div class="flex flex-row justify-between ml-2">
              <p class="lg:mb-2 text-lg lg:text-xl font-light text-white" id="profesionEditar${i}" onblur="guardarCambios(${i})" contentEditable="false">${datos[i].profesion}</p>
              <button class="top-0 bg-blue-500 text-white p-2 rounded hover:bg-gray-600 hover:border hover:border-black m-2 transition duration-700 ease-in-out ..." onclick="editarProfesion(${i})">✏️</button>
            </div>
            <div class="flex flex-row justify-between ml-2">
              <p style="text-align: left; color: white" id="sintesisEditar${i}" onblur="guardarCambios(${i})" contentEditable="false">${datos[i].sintesis}</p>
              <button class="top-0 bg-blue-500 text-white p-2 rounded hover:bg-gray-600 hover:border hover:border-black m-2 transition duration-700 ease-in-out ..." onclick="editarSintesis(${i})">✏️</button>
            </div>
            </div>
            <button class="top-0 bg-blue-500 text-white p-2 rounded hover:bg-gray-600 hover:border hover:border-black m-2 transition duration-300 ease-in-out ..." onclick="guardarCambios(${i})">Guardar ediciones 💾</button>
            <input type="hidden" id="cardBorrar${i}" name="cardBorrar" value="${datos[i].nombre}">
            <button class="top-0 bg-blue-500 text-white p-2 rounded hover:bg-gray-600 hover:border hover:border-black m-2 transition duration-300 ease-in-out ..." onclick="borrarThisCard(${i})">Borrar 🗑️</button>
          </div>
        </div>`;
      }
      document.getElementById("print").innerHTML = frontend;
    });
}



//-----------------------Big

function openNewPage(nombre) {
  let puerto = 7001;
  let conexion = `?=`
  // Abrir una página web diferente con la misma imagen pero más grande
  window.open(`http://localhost:${puerto}/libro.html`+ conexion + nombre);
  mostrarSoloUnLibro(nombre);
}

function mostrarSoloUnLibro(nombre) {
  fetch("/lista/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function mostrarRespuesta(respuesta) {
      return respuesta.json();
    })
    .then(function mostrarDatos(datos) {
      const libro = datos.find((elemento) => elemento.nombre === nombre);
      let frontendBig = ``;
      if (libro) {
        frontendBig = `
        <div class="flex flex-col w-full lg:w-1/3 text-center text-white lg:rounded-t-2xl" style="border: 5px orange solid; margin: 5px 2px">
          <input type="image" src="./build/assets/${libro.portada}" alt="${libro.nombre}" class="w-full h-auto text-white mb-2 lg:rounded-t-2xl" onclick="openNewPage('${libro.nombre}')">
          <div class="flex flex-col justify-around">
            <h4 class="lg:mb-2 text-lg lg:text-2xl font-normal" style="color: orange">${libro.nombre}</h4>
            <p class="lg:mb-2 text-lg lg:text-2xl font-normal text-white">${libro.autor}</p>
            <p class="lg:mb-2 text-lg lg:text-xl font-light text-white">para ${libro.profesion}</p>
          </div>
          <p style="text-align: center; color: white">${libro.sintesis}</p>
          <button class="top-0 bg-blue-500 text-white p-2 rounded hover:bg-gray-600 hover:border hover:border-black m-2" onclick="openNewPage('${libro.nombre}')">Saber +</button>
        </div>
        `;
        document.getElementById("printUno").innerHTML = frontendBig;
      } else {
        console.log(`El libro '${nombre}' no existe.`);
      }
    });
}



//-----------------------estructura web para DOM

const navbar = `
<header class="top-2 z-50">
<nav class="bg-opacity-5 border-gray-200 h-36">
    <div
        class="container relative max-w-screen-xl flex flex-row mt-2 px-10 py-2 justify-between items-center lg:gap-44 lg:justify-around lg:mx-auto lg:pr-0 lg:p-2">
        <div class="flex flex-col md:hidden rounded-lg border-2 border-yellow-400 " onclick="openMenu();">
            <img class="z-10 w-10 " src="./build/assets/menu-sharp.svg">
        </div>
        <div class="w-32">
            <a href="./index.html" class="flex flex-col items-center px-4">
                <img src="./build/assets/libro.png" alt="ImaginArte"
                    class="rounded-full border-3 border-gray-600">
            </a>
            <div class="flex flex-col justify-center">
                <h1 class="self-center whitespace-nowrap text-2xl text-white">
                    ImaginArte</h1>
            </div>
        </div>
        <div id="navbar-search"
            class="items-center justify-around hidden absolute top-48  md:w-full md:flex md:flex-row md:relative md:top-0 ">
            <ul
                class="flex flex-col md:px-4 mt-0.5 font-medium border-2 border-yellow-400 rounded-lg  bg-opacity-20 md:p-0 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-opacity-5">
                <li>
                    <a href="./incluye.html"
                        class="block py-0.5 pl-3 pr-4 font-bold text-lg md:text-xl text-white hover:text-yellow-400 rounded md:hover:bg-transparent md:hover:text-yellow-400 transition duration-300 ease-in-out md:p-0">Incluye
                        +</a>
                </li>
                <li>
                    <a href="./edita.html"
                        class="block py-0.5 pl-3 pr-4 font-bold text-lg md:text-xl text-white hover:text-yellow-400 rounded hover:bg-transparent md:hover:bg-transparent md:hover:text-yellow-400 transition duration-300 ease-in-out md:p-0">Edita
                        +</a>
                </li>
                <li>
                    <a href="./AboutUs.html"
                        class="block py-0.5 pl-3 pr-4 font-bold text-lg md:text-xl text-white hover:text-yellow-400 rounded hover:bg-transparent md:hover:bg-transparent md:hover:text-yellow-400 transition duration-300 ease-in-out md:p-0">Conoce
                        +</a>
                </li>
            </ul>
        </div>
    </div>
</nav>
</header>
`;

const hero = `
<section id="hero" class="relative flex mt-3 lg:mt-2 pb-0">
<div
    class="container max-w-screen-xl mt-5 flex  flex-col-reverse px-10 py-2 justify-center items-center lg:flex lg:flex-row lg:justify-around lg:mx-auto lg:pr-0 lg:p-2">
    <div class="flex flex-col justify-end items-center text-center w-full h-auto">
        <h2 class="text-center mt-2 mb-2 mx-0 font-bold text-xl lg:text-3xl  lg:mb-4" style="color: orange">Letras cosechan
            sueños
        </h2>
        <p class="lg:mb-2 text-lg lg:text-2xl font-normal text-white"> Sueña con ser astronauta explorando el vasto
            universo. Es un Manager experto en Gestión de Riesgos y superación de desafíos</p>
    </div>
    <div class="flex justify-around">
        <img src="./build/assets/astronauta2.png" alt="" class="w-4/5">
    </div>
</div>
</section>
`;

const galeria = `
<section class="relative flex mt-5 pb-0">
<div
    class="container max-w-screen-xl flex flex-col px-10 py-2 justify-between items-center lg:mx-auto lg:pr-0 lg:p-2">
    <h3 class="text-left mb-1 mx-0 font-bold text-xl lg:text-3xl" style="color: orange">Libros Recomendados</h3>
    <div id="print" class="flex flex-wrap justify-between lg:border-2 lg:border-white w-full h-auto"><span
            class="text-white text-center">Aqui va el "print"</span></div>
</div>
</section>
`;

const footer = `
<footer class="relative flex">
<div
    class="container relative max-w-screen-xl flex flex-row my-5 py-2 justify-around items-center lg:gap-44 lg:justify-between lg:mx-auto lg:pr-0 lg:p-2">
    <article class="flex flex-col">
        <img src="./build/assets/libro.png" alt="ImaginArte" class="w-24 rounded-full border-3 border-gray-600">
        <address class="text-sm text-center leading-1 text-white pt-2">ImaginArte <br> +34 600400129</address>
    </article>
    <article class="flex flex-col items-end">
        <a href="./index.html" class="text-white font-bold py-0 my-0">Imagina<span style="color: orange"> +</span></a>
        <a href="./incluye.html" class="text-white font-bold pt-2 my-0">Incluye<span style="color: orange"> +</span></a>
        <a href="./edita.html" class="text-white font-bold pt-2 my-0">Edita<span style="color: orange"> +</span></a>
        <a href="./AboutUs.html" class="text-white font-bold pt-2 my-0">Conoce<span style="color: orange"> +</span></a>
    </article>
</div>
</footer>
`;