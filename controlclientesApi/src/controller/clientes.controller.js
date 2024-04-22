const {mongoose } = require('mongoose');
const ClienteSchema = require('../model/clientes')

function getStart(req, res){
    res.json({error:false, code: 200, message: 'Punto de inicio'})
}

function getClients(req, res){
    let respuesta; 

    ClienteSchema.find()
        .then(function(clientes) {
            if(clientes.length == 0){
                respuesta = {error: false, codigo:200, message: 'clientes'}
            } else {
                 return ClienteSchema.aggregate([
                    {$sort: {nombre: 1}}
                ])
            }
        })

        .then(function(clientesOrdenados){
            console.log(clientesOrdenados);
            respuesta = {error: false, codigo: 200, data: clientesOrdenados}
            res.json(respuesta)
        })

        .catch(error => {
            console.log(`Error ${error}`);
            respuesta = { error: true, codigo: 500, message: 'Error en el servidor' };
            res.status(500).json(respuesta); 
        })
}

function postClient(req, res){
    let respuesta;
    let cliente = new ClienteSchema(
        {
            apellido: req.body.apellido,
            email: req.body.email,
            nombre: req.body.nombre,
            saldo: req.body.saldo
        }
    )
    if(cliente){
        ClienteSchema.create(cliente)
        .then(function(cliente) {
            console.log(cliente);
            respuesta = {error: false, codigo:200, mensaje: 'Dato insertado correctamente', data: cliente}
            res.json(respuesta);
            mongoose.disconnect();
        })
        .catch(error => {
            console.log(error);
            respuesta = {error: true, codigo: 500, mensaje:'Error en la validación de los datos insertados'};
            res.json(respuesta);
        })
    } else {
        respuesta = {error: true, codigo:200, mensaje:'Error en el servidor'}
        res.status(400).json(respuesta)
    }



}

module.exports = {getStart, postClient, getClients}