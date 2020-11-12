const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/usuario')
const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const usuario = await User.findOne({nombre: req.body.nombre})
        if (!usuario) res.status(400).json({ok: false, error: 'El usuario es incorrecto'})
        else {
            if (!bcrypt.compareSync(req.body.password, usuario.password)){
                res.status(400).json({ok: false, error: 'La contraseña es incorrecto'})
            }
            else {
                const token = jwt.sign({ usuario: usuario }, process.env.SEED_AUTENTICACION, {
                    expiresIn: process.env.CADUCIDAD_TOKEN
                })
        
                res.json({
                    ok: true,
                    usuario: usuario,
                    token: token
                })
            }    
        }
    } catch (error) {
        res.status(500).json({ok: false, error: error})
    }

})

module.exports = router

