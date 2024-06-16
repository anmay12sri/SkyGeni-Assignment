const express = require('express');
const { getCustomerTypeData } = require('../controllers/customerTypecontroller');

const router = express.Router();

router.get('/', getCustomerTypeData);

module.exports = router;
