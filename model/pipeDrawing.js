const mongoose = require('mongoose');

var PipeDrawingSchema = new mongoose.Schema({
    type: String,
});

var PipeDrawing = mongoose.model(
    'PipeDrawing',
    PipeDrawingSchema,
    't_Pipe_Drawing',
);

module.exports = PipeDrawing;
