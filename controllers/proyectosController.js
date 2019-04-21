const Proyectos = require('../models/Proyectos');


exports.proyectosInicio = async (req, res) => {
     const proyectos = await Proyectos.findAll();

     res.render('index', {
          nombrePagina: 'BinwebTask',
          proyectos
     });
}

exports.formularioProyecto = async (req, res) => {
     const proyectos = await Proyectos.findAll();
     res.render('nuevoProyecto', {
          nombrePagina: 'Nuevo Proyecto',
          proyectos
     })
}
exports.nuevoProyecto = async (req, res) => {
     const proyectos = await Proyectos.findAll();
     // enviar a la consola lo que el usuario escriba.
     // console.log(req.body);

     // validar que tengamos algo en el input
     const { nombre } = req.body;

     let errores = [];

     if(!nombre) {
          errores.push({'texto': 'Agrega un nombre al proyecto'})
     }

     // si hay errores
     if(errores.length > 0) {
          res.render('nuevoProyecto', {
               nombrePagina : 'Nuevo Proyecto',
               errores,
               proyectos
          })
     } else {
          // no hay errores
          // Insertar en la BD.
          
          const proyecto = await Proyectos.create({ nombre });
          res.redirect('/');
     }
}

exports.proyectoPorUrl = async (req, res) => {
     const proyectos = await Proyectos.findAll();

     const proyecto = await Proyectos.findOne({
          where: {
               url: req.params.url
          }
     });

     if (!proyecto) return next();

     // console.log(proyecto);

     // res.send('OK');

     // render a la vista
     res.render('tareas', {
          nombrePagina: 'Tareas del Proyecto',
          proyecto,
          proyectos
     })
}
