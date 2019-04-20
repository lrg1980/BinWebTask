const express = require('express');
const router = express.Router();
// Importar el controlador
const proyectosController = require('../controllers/proyectosController');

module.exports = function () {
     // ruta generales
     router.get('/', proyectosController.proyectosInicio);
     return router;
     
}
