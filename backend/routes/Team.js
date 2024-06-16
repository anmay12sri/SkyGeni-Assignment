const express = require('express');
const { getTeamData } = require('../controllers/Teamcontroller');

const router = express.Router();

// Define the route handler for GET request
router.get('/', getTeamData);

module.exports = router;
