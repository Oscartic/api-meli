const express = require('express');
const get = require('../controllers/products/get.controller');
const list = require('../controllers/products/list.controller');

const router = express.Router();

router.get('/items', list);
router.get('/items/:id', get);

module.exports = router;