const {mongoose } = require('mongoose');
const ClienteSchema = require('../model/clientes')
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    console.log(req.headers['authorization']);

    if (!token) return res.status(401).send({ error: true, message: 'Token no proporcionado' });

    jwt.verify(token, 'secreto', (err, user) => {
        console.log(err);
        if (err) return res.status(403).send({ error: true, message: 'Token inválido' });
        req.user = user;
        next();
    });
}

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
            respuesta = {error: false, codigo:200, mensaje: 'Cliente insertado correctamente', data: cliente}
            res.json(respuesta);
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

function getCliente(req, res){
    let respuesta; 
    let _id = req.query._id

    ClienteSchema.findById(_id)
    .then((cliente) => {
        console.log(cliente);
        respuesta = {error: false, codigo: 200, mensaje: 'Cliente recuperado correctamente', data: cliente}
        res.json(respuesta)
    })
}

function putcliente(req, res){
    let respuesta; 
    let cliente = new ClienteSchema(
        {
            apellido: req.body.apellido,
            email: req.body.email,
            nombre: req.body.nombre,
            saldo: req.body.saldo,
            _id: req.body._id
        }
    )
    if(cliente){
        ClienteSchema.findByIdAndUpdate(cliente.id, {nombre: cliente.nombre, apellido: cliente.apellido, 
            email: req.body.email, saldo: cliente.saldo})
        .then((cliente) => {
        respuesta = {error: false, codigo: 200, mensaje: 'Cliente modificado correctamente'}
        res.json(respuesta)
        })
        .catch(error => {

            respuesta = {error: true, codigo: 500, mensaje:'Error en la validación de los datos modificados'};
            res.json(respuesta);
        })
    } else {
        respuesta = {error: true, codigo:200, mensaje:'Error en el servidor'}
        res.status(400).json(respuesta)
    }
}

function deleteCliente(req, res){
    let respuesta; 
    let _id = req.body._id
    ClienteSchema.findByIdAndDelete(_id)
    .then((cliente) => {
        console.log(cliente);
        respuesta = {error: false, codigo: 200, mensaje: 'Cliente eliminado correctamente'}
        res.json(respuesta)
    })
}

module.exports = {authenticateToken,getStart, postClient, getClients, getCliente,putcliente, deleteCliente}