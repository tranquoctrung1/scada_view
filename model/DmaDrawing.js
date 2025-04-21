const mongoose = require('mongoose');

var dmaDrawingSchema = new mongoose.Schema({
    type: String,
    name: String,
});

var DMADrawing = mongoose.model(
    'DMADrawing',
    dmaDrawingSchema,
    't_DMA_Drawing',
);

module.exports = DMADrawing;
