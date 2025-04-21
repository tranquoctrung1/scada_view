const express = require('express');
const router = express.Router();
const mapDMAController = require('../controller/mapDMA');
const authMiddleware = require('../middleware/auth');

//router.get('/', authMiddleware.auth ,mapController.map);
router.get('/', mapDMAController.map);
module.exports = router;
