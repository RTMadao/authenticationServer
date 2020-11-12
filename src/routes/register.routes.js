const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../model/usuario')
const router = express.Router()

router.post('/',async (req, res) => {
    try {
        const usuario = new User({
            nombre: req.body.nombre,
            password: bcrypt.hashSync(req.body.password, 10),
            restaurant: req.body.restaurant
        });
        
        const respuesta = await usuario.save()

        res.json({
            ok: true,
            usuario: respuesta
        });

    } catch (error) {
      console.log(error);
      res.status(500).json({ok: false, error})
    }
})

module.exports = router