const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');

// crear la conexion a la BD
const db = require('./config/db');

// importar el modelo
require('./models/Proyectos');


db.sync()
     .then(() => console.log('Conectado'))
     .catch(error => console.log(error))

// crear una app de express

const app = express();

// Donde cargar los archivos estáticos
app.use(express.static('public'));

// Habilitar Pug Template Engine
app.set('view engine', 'pug');

// Añadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

// habilitar bodyParser para leer datos del Formulario
app.use(bodyParser.urlencoded({ extended: true }));

// ruta para el home
app.use('/', routes() );

app.listen(7500);