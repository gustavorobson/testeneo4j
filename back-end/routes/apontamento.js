'use strict';

const express = require('express');
const controllers = require('../controllers');
const apontamentoController = require('../controllers/apontamento');

const router = express.Router();



router.get('/list', async (req, res) => {
    controllers.execute(req, res, await apontamentoController.list);
});

router.post('/insert', async (req, res) => {
    controllers.execute(req, res, await apontamentoController.insert);
});

router.delete('/delete/:id', async (req, res) => {
    controllers.execute(req, res, await apontamentoController.delete);
});


router.put('/update', async (req, res) => {
    controllers.execute(req, res, await apontamentoController.update);
});

module.exports = router;