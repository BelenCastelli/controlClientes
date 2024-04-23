const {Schema, model} = require('mongoose')

const ClienteSchema = new Schema (
    {
        nombre: String, 
        apellido: String, 
        email: String, 
        saldo: Number
    }
)

module.exports = model('clientes', ClienteSchema, 'clientes')