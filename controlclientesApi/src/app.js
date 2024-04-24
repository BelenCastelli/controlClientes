const express = require('express');
const cors = require('cors');
const clientesRouter = require('./router/clientes.router')
const userRouter = require('./router/user.router')
const errorHandling = require('./error/errorHandling');

const app = express();

app.set('port', process.env.PORT || 3000)

app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use((req, res, next) => {
    console.log('Solicitud recibida:', req.method, req.url);
    console.log('Encabezados:', req.headers);
    next();
});
app.use(clientesRouter);
app.use(userRouter);
app.use((req, res, next) =>{
    res.status(404).json({error:true, code: 404, message: 'Endpoint doesnt found'})
})

app.use(errorHandling);

module.exports = app; 