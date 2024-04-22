const {Schema, model} = require('mongoose')

const ClienteSchema = new Schema (
    {
        apellido: String, 
        email: String, 
        nombre: String, 
        saldo: Number
    }
)

module.exports = model('clientes', ClienteSchema, 'clientes')