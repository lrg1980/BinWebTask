const express = require('express')
const routes = require('./routes')
const path = require('path')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const flash = require('connect-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const passport = require('./config/passport')

// Helpers para crear funciones personalizadas
const helpers = require('./helpers')

// crear la conexion a la BD
const db = require('./config/db')

// importar el modelo
require('./models/Proyectos')
require('./models/Tareas')
require('./models/Usuarios')

db.sync()
  .then(() => console.log('Conectado'))
  .catch(error => console.log(error))

// crear una app de express
const app = express()

// Donde cargar los archivos estáticos
app.use(express.static('public'))

// Habilitar Pug Template Engine
app.set('view engine', 'pug')

// habilitar bodyParser para leer datos del Formulario
app.use(bodyParser.urlencoded({ extended: true }))

// Agregamos express validator a toda la aplicacion
app.use(expressValidator())

// Añadir la carpeta de las vistas
app.set('views', path.join(__dirname, './views'))

// agregar flash messages
app.use(flash())

app.use(cookieParser())

// Crear sesiones que nos permiten mantener autenticacion
app.use(session({
  secret: 'supersecreto',
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

// Pasar var dump a la aplicacion
app.use((req, res, next) => {
  res.locals.vardump = helpers.vardump
  res.locals.mensajes = req.flash()
  res.locals.usuario = { ...req.user } || null
  next()
})

// ruta para el home
app.use('/', routes())

app.listen(7500)