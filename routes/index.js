const express = require('express');
const router = express.Router();
// Importar el controlador
const proyectosController = require('../controllers/proyectosController');

module.exports = function () {
     // ruta generales
     router.get('/', proyectosController.proyectosInicio);
     // Ruta a página Nuevo Proyecto
     router.get('/nuevo-proyecto', proyectosController.formularioProyecto);
     return router;
}
