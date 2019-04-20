const express = require('express');
const router = express.Router();
// Importar el controlador
const proyectosController = require('./controllers/proyectosController');

module.exports = function () {
     // ruta generales
     router.get('/', proyectosController.proyectosInicio);
     router.get('/nosotros', proyectosController.proyectosNosotros);
     return router;
     
}
