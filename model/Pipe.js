const mongoose = require('mongoose');

var PipeSchema = new mongoose.Schema({
    PipeId: String,
    Name: String,
    Description: String,
    GroupPipeId: String,
    Size: Number,
    Length: Number,
    TypeChannelAlarm: String,
    BaseMin: Number,
    BaseMax: Number,
    ColorBaseMax: String,
    ColorBaseMin: String,
    SetPrioritize: Number,
});

var Pipe = mongoose.model('Pipe', PipeSchema, 't_Pipe');

module.exports = Pipe;
