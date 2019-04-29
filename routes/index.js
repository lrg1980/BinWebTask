const express = require('express')
const router = express.Router()
// Importar express validator
const { body } = require('express-validator/check')
// Importar el controlador
const proyectosController = require('../controllers/proyectosController')
const tareasController = require('../controllers/tareasController')
const usuariosController = require('../controllers/usuariosController')
const authController = require('../controllers/authController')

module.exports = function () {
  // ruta generales
  router.get('/',
    authController.usuarioAutenticado,
    proyectosController.proyectosInicio)

  // Ruta a página Nuevo Proyecto
  router.get('/nuevo-proyecto',
    authController.usuarioAutenticado,
    proyectosController.formularioProyecto)
  router.post('/nuevo-proyecto',
    authController.usuarioAutenticado,
    // Chequeo de nombre en campo formulario
    body('nombre').not().isEmpty().trim().escape(),
    proyectosController.nuevoProyecto)
 
  // Listar proyectos
  router.get('/proyectos/:url',
    authController.usuarioAutenticado,
    proyectosController.proyectoPorUrl)

  // Actualizar proyecto
  router.get('/proyecto/editar/:id',
    authController.usuarioAutenticado,
    proyectosController.formularioEditar)
  // Guardar el nombre nuevo del proyecto
  router.post('/nuevo-proyecto/:id',
    authController.usuarioAutenticado,
    // Chequeo de nombre en campo formulario
    body('nombre').not().isEmpty().trim().escape(),
    proyectosController.actualizarProyecto)

  // Eliminar Proyecto
  router.delete('/proyectos/:url',
    authController.usuarioAutenticado,
    proyectosController.eliminarProyecto)

  // Tareas
  router.post('/proyectos/:url',
    authController.usuarioAutenticado,
    tareasController.agregarTarea)

  // Actualizar Tarea
  router.patch('/tareas/:id',
    authController.usuarioAutenticado,
    tareasController.actualizarTarea)

  // Eliminar Tarea
  router.delete('/tareas/:id',
    authController.usuarioAutenticado,
    tareasController.eliminarTarea)

  // Crear nueva cuenta
  router.get('/crear-cuenta', usuariosController.formCrearCuenta)
  router.post('/crear-cuenta', usuariosController.crearCuenta)
  router.get('/confirmar/:correo', usuariosController.confirmarCuenta)

  // Iniciar sesion
  router.get('/iniciar-sesion', usuariosController.formIniciarSesion)
  router.post('/iniciar-sesion', authController.autenticarUsuario)

  // Cerrar sesion
  router.get('/cerrar-sesion', authController.cerrarSesion)

  // Reestrablecer tu contraseña
  router.get('/reestablecer', usuariosController.formResetPassword)
  router.post('/reestablecer', authController.enviarToken)
  router.get('/reestablecer/:token', authController.validarToken)
  router.post('/reestablecer/:token', authController.actualizarPassword)

  return router
}
