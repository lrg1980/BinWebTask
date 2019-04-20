exports.proyectosInicio = (req, res) => {
     res.render('index', {
          nombrePagina: 'BinwebTask'
     });
}

exports.formularioProyecto = (req, res) => {
     res.render('nuevoProyecto', {
          nombrePagina: 'Nuevo Proyecto'
     })
}