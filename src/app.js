require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

//configuracion servidor
app.set('port', process.env.PORT)

//middelwares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false})) //para recibir json en las peticiones del navegador

//routes
app.use(require('./routes/index.routes'));

//conexion base de datos
mongoose.connect(process.env.URLDB, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then(db => {
    console.log(`conectado correctamente a la base de datos administradora`)
})
.catch(err => console.log(`error al conectar base de datos administradora `+err))

//Start server
app.listen(app.get('port'),() => {
    console.log('server on port',app.get('port'))
})