const mongoose = require('mongoose')
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator')

//se crea el esquema
let usuarioSchema = new Schema({ 
    nombre: { 
        type: String, 
        unique: true,
        required: [true, 'El nombre de Usuario es necesario'] 
    },
    password: { 
        type: String,
        required: [true, 'La contraseña es Obligatoria'] 
    },
    restaurant: {
        type: String,
        required: [true, 'Se debe establecer el restaurante al que pertenece']
    }
}) 

//se elimina la contraseña del objeto al retornar respuesta al usuario
usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

//se agrega pluguin de validacion unica
usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} ya existe en el sistema'
})

module.exports = mongoose.model('usuarios', usuarioSchema)