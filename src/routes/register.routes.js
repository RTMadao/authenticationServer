const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/usuario')
const router = express.Router()

router.post('/',(req, res, next) => {
    const token = req.headers['access-token'];

    if (token) {
      jwt.verify(token, process.env.SEED_AUTENTICACION, (err, decoded) => {      
        if (err) {
          return res.json({ mensaje: 'Token inválida' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.send({ 
          mensaje: 'Token no proveída.' 
      });
    }
} ,async (req, res) => {
    try {
        const usuario = new User({
            nombre: req.body.nombre,
            password: bcrypt.hashSync(req.body.password, 10),
            restaurant: req.body.restaurant
        });
        console.log(usuario);
        const respuesta = await usuario.save()

        res.json({
            ok: true,
            usuario: respuesta
        });

    } catch (error) {
        res.status(500).json({ok: false, error: error})
    }

})

module.exports = router