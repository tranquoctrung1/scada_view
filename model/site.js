const mongoose = require('mongoose');

var siteSchema = new mongoose.Schema({
    SiteId: String,
    Location: String,
    Latitude: String,
    Longitude: String,
    DisplayGroup: String,
    ConsumerId: String,
    LoggerId: String,
    StartDay: Number,
    StartHour: Number,
    Status: String,
    PipeSize: Number,
    Interval: Number,
    Available: String,
    TimeDelay: Number,
    Note: String,
    OtherDevice: Boolean,
    IsDisplay: Boolean,
    IsValve: Boolean,
    IsConnectPipe: Boolean,
    MeterSerial: String,
    LoggerSerial: String,
});

var Site = mongoose.model('Site', siteSchema, 't_Sites');

module.exports = Site;
