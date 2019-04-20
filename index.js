const express = require('express');
const routes = require('./routes');
const path = require('path');

// crear una app de express

const app = express();

// Donde cargar los archivos estáticos
app.use(express.static('public'));

// Habilitar Pug Template Engine
app.set('view engine', 'pug');
// Añadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'));
// ruta para el home
app.use('/', routes() );

app.listen(7500);