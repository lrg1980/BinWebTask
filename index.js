const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// Helpers para crear funciones personalizadas
const helpers = require('./helpers');

// crear la conexion a la BD
const db = require('./config/db');

// importar el modelo
require('./models/Proyectos');


db.sync()
     .then(() => console.log('Conectado'))
     .catch(error => console.log(error))

// crear una app de express
const app = express();

// Agregamos express validator a toda la aplicacion
app.use(expressValidator());

// Donde cargar los archivos estáticos
app.use(express.static('public'));

// Habilitar Pug Template Engine
app.set('view engine', 'pug');

// Añadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));

// Pasar var dump a la aplicacion
app.use((req, res, next) => {
     res.locals.vardump = helpers.vardump;
     next();
});

// habilitar bodyParser para leer datos del Formulario
app.use(bodyParser.urlencoded({ extended: true }));

// ruta para el home
app.use('/', routes() );

app.listen(7500);