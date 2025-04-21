const express = require('express');
const router = express.Router();
const FlowDayController = require('../controller/flowDay.js');

router.get('/', FlowDayController.flowDay);

module.exports = router;
