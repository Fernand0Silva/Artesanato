const express = require('express');
const { fazerLogin,buscarDados,getlistarDados} = require('../Controllers/LoginController');
const router = express.Router();

router.post('/', fazerLogin);
router.post('/buscarDados',buscarDados); 
router.get('/',getlistarDados); 

module.exports = router;