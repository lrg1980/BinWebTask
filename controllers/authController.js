const passport = require('passport')
const Usuarios = require('../models/Usuarios')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const crypto = require('crypto')
const bcrypt = require('bcrypt-nodejs')


exports.autenticarUsuario = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/iniciar-sesion',
  failureFlash: true,
  badRequestMessage: 'Ambos campos son obligatorios'
})

// Función para revisar si el usuario está logueado o no
exports.usuarioAutenticado = (req, res, next) => {
  // si el usuario está autenticado, adelante
  if (req.isAuthenticated()) {
    return next()
  }
  // si no está autenticado, redirigir al formulario
  return res.redirect('/iniciar-sesion')
}

// funcion para cerrar sesion
exports.cerrarSesion = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/iniciar-sesion') // al cerrar sesión nos lleva al login
  })
}
// genera un token si el usuario es válido
exports.enviarToken = async (req, res) => {
  // verificar que el usuario existe
  const { email } = req.body
  const usuario = await Usuarios.findOne({ where: { email } })

  // si no existe el usuario
  if (!usuario) {
    req.flash('error', 'No existe esa cuenta')
    res.redirect('/reestablecer')
    // res.render('reestablecer', {
    //   nombrePagina: 'Reestablecer tu contraseña',
    //   mensajes: req.flash()
  }

  // usuario existe
  usuario.token = crypto.randomBytes(20).toString('hex')
  // expiracion
  usuario.expiracion = Date.now() + 3600000

  // guardarlos en la bd
  await usuario.save()

  // url de reset
  const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token}`
  console.log(resetUrl)
}

exports.validarToken = async (req, res) => {
  const usuario = await Usuarios.findOne({
    where: { token: req.params.token }
  })

  // si no hay usuario
  if (!usuario) {
    req.flash('error', 'Correo electrónico no válido')
    res.redirect('/reestablecer')
  }

  // Formulario para generar el password
  res.render('resetPassword', {
    nombrePagina: 'Restablecer contraseña'
  })
}
// cambiar el password por uno nuevo
exports.actualizarPassword = async (req, res) => {
  // Verifica el token válido pero también la fecha de expiración
  const usuario = await Usuarios.findOne({
    where: {
      token: req.params.token,
      expiracion: {
        [Op.gte] : Date.now()
      }
    }
  })
  // verificamos si el usuario existe
  if (!usuario) {
    req.flash('error', 'No válido')
    res.redirect('/reestablecer')
  }
  // Hasheando el nuevo password válido
  usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  usuario.token = null
  usuario.expiracion = null

  // guardamos el nuevo password
  await usuario.save()

  req.flash('correcto', 'Tu contraseña se ha cambiado con éxito')
  res.redirect('/iniciar-sesion')
}
