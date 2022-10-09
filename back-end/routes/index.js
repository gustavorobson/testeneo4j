'use strict';

const express = require('express');

const router = express.Router();

// Importação das demais rotas
router.use('/usuario', require('./usuario'));
router.use('/apontamento', require('./apontamento'));
module.exports = router;