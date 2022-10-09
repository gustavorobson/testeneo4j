'use strict';

const express = require('express');
const controllers = require('../controllers');
const usuarioController = require('../controllers/usuario');

const router = express.Router();



router.get('/list', async (req, res) => {
    controllers.execute(req, res, await usuarioController.list);
});

router.post('/insert', async (req, res) => {
    controllers.execute(req, res, await usuarioController.insert);
});

router.delete('/delete/:id', async (req, res) => {
    controllers.execute(req, res, await usuarioController.delete);
});


router.put('/update', async (req, res) => {
    controllers.execute(req, res, await usuarioController.update);
});

module.exports = router;