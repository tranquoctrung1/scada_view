const mongoose = require('mongoose');

var alarmSchema = new mongoose.Schema({
    TimeStamp: Date,
    SiteId: String,
    Location: String,
    DisplayGroup: String,
    ChannelName: String,
    Value: Number,
    BaseMin: Number,
    BaseMax: Number,
    Content: String,
});

var Alarm = mongoose.model('Alarm', alarmSchema, 't_Alarm_Config');

module.exports = Alarm;
