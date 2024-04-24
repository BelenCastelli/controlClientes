const {Router} = require('express');
const router = Router();
const userCrtl = require('../controller/user.controller')

router.post('/login', userCrtl.login)

module.exports = router