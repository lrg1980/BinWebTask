const express = require('express');
const router = express.Router();

module.exports = function () {
     // ruta generales
     router.get('/', (req, res) => {
          res.send("Estamos en Index");
     });
     router.get('/nosotros', (req, res) => {
          res.send("Estamos en Nosotros");
     });
     return router;
     
}
