const mongoose = require('mongoose');

var DeviceMeterSchema = new mongoose.Schema({
    Serial: String,
    DatePushStock: Date,
    Producer: String,
    Branch: String,
    Model: String,
    Status: String,
    Note: String,
    IsInstall: Boolean,
    urlUploadFile: String,
});

var DeviceMeter = mongoose.model('DeviceMeter', DeviceMeterSchema, 't_Meter');

module.exports = DeviceMeter;
