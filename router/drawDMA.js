const express = require('express');
const router = express.Router();
const drawDMAController = require('../controller/drawDMA');
const authMiddleware = require('../middleware/auth');

//router.get('/', authMiddleware.auth ,mapController.map);
router.get('/', drawDMAController.map);
module.exports = router;
