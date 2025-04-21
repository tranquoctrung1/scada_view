const express = require('express');
const router = express.Router();
const PipeController = require('../controller/pipe');

router.get('/', PipeController.Pipe);
module.exports = router;
