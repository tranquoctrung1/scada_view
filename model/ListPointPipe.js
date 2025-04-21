const mongoose = require('mongoose');

var ListPointPipeSchema = new mongoose.Schema({
    GroupPipeId: String,
    PipeId: String,
    STT: Number,
});

var ListPointPipe = mongoose.model(
    'ListPointPipe',
    ListPointPipeSchema,
    't_ListPointPipe',
);

module.exports = ListPointPipe;
