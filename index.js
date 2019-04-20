const express = require('express');
const routes = require('./routes');

// crear una app de express

const app = express();

// ruta para el home
app.use('/', routes() );

app.listen(7500);