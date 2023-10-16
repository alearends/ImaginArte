// Levantar y hacer funcionar el servidor
const express = require("express"); // importas express
const app = express(); // ejecutas las funcionalidades de express
const puerto = 7001; // indicas el puerto


// Uso de una carpeta estática llamada public
app.use(express.static("public"));
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

// Uso de json y capacidad de enviar info por body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const lista = require("./array");

// Diseñando rutas
// TIPO GET
app.get("/lista/print", (req, res) => {

  res.send(lista);
});

app.get("/lista", (req, res) => {
  res.send(lista);
});

// POST, PUT Y DELETE

app.post("/lista", (req, res) => {
  let objetoNuevo = {
    nombre: req.body.nombre,
    autor: req.body.autor,
    sintesis: req.body.sintesis,
    profesion: req.body.profesion,
    portada: req.body.portada,
  };

  lista.push(objetoNuevo);

  let frontend = `<div id="print" style="display: flex; flex-wrap: wrap">`;
      for (let i = 0; i < datos.length; i++) {
        frontend += `
        <div style="display: flex; flex-direction: column; width: 30%; border: 5px yellow solid; margin: 0 5px; text-align: center">
          <img src="./build/assets/${lista[i].portada}" alt="${lista[i].nombre}" style="width: 100%; height=auto">
          <div style="display: flex; flex-direction: row; justify-content: space-evenly; color: white>
            <h2>${lista[i].nombre}</h2>
            <p>${lista[i].autor}</p>
            <p>para ${lista[i].profesion}</p>
          </div>
          <p style="text-align: center">${lista[i].sintesis}</p>
        </div>`;
      }
      frontend += `</div>`;
  res.send(lista);
});

app.put("/lista", (req, res) => {
  let nombre = req.body.nombre;
  let autor = req.body.autor;
  let sintesis = req.body.sintesis;
  let profesion = req.body.profesion;
  let portada = req.body.portada;

  let objetoExistente = lista.find((objeto) => objeto.nombre === nombre);

  if (objetoExistente) {
    // Actualizar los valores modificados del objeto existente
    if (autor) objetoExistente.autor = autor;
    if (sintesis) objetoExistente.sintesis = sintesis;
    if (profesion) objetoExistente.profesion = profesion;
    if (portada) objetoExistente.portada = portada;
  } else {
    // Agregar un nuevo objeto a la lista
    let nuevo = {
      autor: autor,
      nombre: nombre,
      profesion: profesion,
      sintesis: sintesis,
      portada: portada
    };
    lista.push(nuevo);
  }

  res.send(lista);
});



app.delete("/lista", (req, res) => {
  let nombre = req.body.nombre;
  console.log(nombre);
  for (let i = 0; i < lista.length; i++) {
    if (nombre === lista[i].nombre) {
      console.log("ya casi me borran!"+nombre)
      lista.splice(i, 1);
    }
  }
  res.send(lista);
});

app.get("/contacto/:about", (req, res) => {
  let parametro = req.params.about;
  res.send(`<h1>Hola ${parametro}</h1>`);
});

app.get("/query", (req, res) => {
  let nombre = req.query.nombre;
  let autor = req.query.autor;
  res.send(`<h1>Hola ${nombre} ${autor}</h1>`);
});

// Uso del puerto
app.listen(puerto, () => {
  console.log(`esto corre por el puerto ${puerto}`);
});


