const express = require('express');
const router = express.Router();
const MeterController = require('../controller/meter');

router.get('/', MeterController.meter);

module.exports = router;
