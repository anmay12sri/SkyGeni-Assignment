const express = require('express');
const { getAccountIndustryData } = require('../controllers/accountIndustrycontroller');

const router = express.Router();

router.get('/', getAccountIndustryData);

module.exports = router;
