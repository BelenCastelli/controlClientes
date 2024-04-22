const {Router} = require('express');
const router = Router();
const clientesCtrl = require('../controller/clientes.controller'); 


router.get('/', clientesCtrl.getStart);
router.get('/clientes', clientesCtrl.getClients)
router.post('/clientes', clientesCtrl.postClient)

module.exports = router