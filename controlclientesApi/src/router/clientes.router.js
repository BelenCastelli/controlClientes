const {Router} = require('express');
const router = Router();
const clientesCtrl = require('../controller/clientes.controller'); 
const authenticateToken = require('../controller/clientes.controller').authenticateToken;


router.get('/', clientesCtrl.getStart);
router.get('/clientes',  clientesCtrl.getClients)
router.get('/cliente',  clientesCtrl.getCliente)
router.post('/clientes', clientesCtrl.postClient)
router.put('/cliente',  clientesCtrl.putcliente)
router.delete('/cliente', clientesCtrl.deleteCliente)
module.exports = router