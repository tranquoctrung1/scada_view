const express = require('express');
const router = express.Router();
const VanControllerController = require('../controller/vanController');

router.get('/', VanControllerController.VanController);

module.exports = router;
