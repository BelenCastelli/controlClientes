const {mongoose, Schema} = require('mongoose')
const User = require('../model/user')
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign({ id: user._id }, 'secreto', { expiresIn: '1h' });
};

function login (req, res) {
    let respuesta; 
    let user = {
        email: req.body.email,
        password: req.body.password
    }
    User.findOne(user)
    .then((user) => {
        if (!user) {
            respuesta = { error: true, codigo: 401, mensaje: 'Credenciales inválidas' };
            return res.status(401).json(respuesta);
        } 
        const token = generateToken(user);
        respuesta = {error: false, codigo: 200, mensaje: 'Inicio de sesión correcto', data: user, token}
        res.json(respuesta)
        
    })

    .catch((error) => {
        console.error('Error en el inicio de sesión:', error);
        respuesta = { error: true, codigo: 500, mensaje: 'Error en el servidor' };
        res.status(500).json(respuesta);
    });

}

module.exports = {generateToken,login}
