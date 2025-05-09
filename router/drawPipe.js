const express = require('express');
const router = express.Router();
const drawPipeController = require('../controller/drawPipe');
const authMiddleware = require('../middleware/auth');

//router.get('/', authMiddleware.auth ,mapController.map);
router.get('/', drawPipeController.map);
module.exports = router;
