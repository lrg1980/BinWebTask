const express = require('express');
const router = express.Router();
// Importar express validator
const { body } = require('express-validator/check');
// Importar el controlador
const proyectosController = require('../controllers/proyectosController');

module.exports = function () {
     // ruta generales
     router.get('/', proyectosController.proyectosInicio);
     // Ruta a página Nuevo Proyecto
     router.get('/nuevo-proyecto', proyectosController.formularioProyecto);
     router.post('/nuevo-proyecto',
          // Chequeo de nombre en campo formulario
          body('nombre').not().isEmpty().trim().escape(), 
          proyectosController.nuevoProyecto);
     
     // Listar proyectos
     router.get('/proyectos/:url', proyectosController.proyectoPorUrl);

     // Actualizar proyecto
     router.get('/proyecto/editar/:id', proyectosController.formularioEditar);
     // Guardar el nombre nuevo del proyecto
     router.post('/nuevo-proyecto/:id',
     // Chequeo de nombre en campo formulario
          body('nombre').not().isEmpty().trim().escape(), 
          proyectosController.actualizarProyecto);
     
     return router;
}
