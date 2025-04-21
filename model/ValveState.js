const mongoose = require('mongoose');

var ValveSchema = new mongoose.Schema({
    LoggerId: String,
    RequestState: Number,
});

var Valve = mongoose.model('Valve', ValveSchema, 't_Valve_State');

module.exports = Valve;
