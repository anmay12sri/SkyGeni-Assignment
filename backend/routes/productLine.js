const express = require('express');
const { getProductLineData } = require('../controllers/productLinecontroller');

const router = express.Router();

router.get('/', getProductLineData);

module.exports = router;
