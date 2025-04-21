const mongoose = require('mongoose');

module.exports.GetDataLoggerWithTime = async function (req, res) {
    const channelid = req.params.channelid;
    const start = req.params.start;
    const end = req.params.end;
    const desc = req.params.desc;

    let startDate = new Date(parseInt(start));
    let endDate = new Date(parseInt(end));

    const DataLoggerSchema = new mongoose.Schema({
        TimeStamp: Date,
        Value: Number,
    });

    delete mongoose.models.DataLogger;

    const DataLogger = mongoose.model(
        'DataLogger',
        DataLoggerSchema,
        't_Data_Logger_' + channelid,
    );

    // query

    let result;

    if (desc == 1) {
        result = await DataLogger.find({
            TimeStamp: { $gte: startDate, $lte: endDate },
        }).sort({ TimeStamp: -1 });
    } else {
        result = await DataLogger.find({
            TimeStamp: { $gte: startDate, $lte: endDate },
        }).sort({ TimeStamp: 1 });
    }

    res.json(result);
};

module.exports.GetCurrentTimeStamp = async function (req, res) {
    let channelid = req.params.channelid;

    const DataLoggerSchema = new mongoose.Schema({
        TimeStamp: Date,
        Value: Number,
    });

    delete mongoose.models.DataLogger;

    const DataLogger = mongoose.model(
        'DataLogger',
        DataLoggerSchema,
        't_Data_Logger_' + channelid,
    );

    // query

    let result = await DataLogger.find().sort({ TimeStamp: -1 }).limit(1);

    res.json(result);
};

module.exports.GetBeginTimeStamp = async function (req, res) {
    let channelid = req.params.channelid;

    const DataLoggerSchema = new mongoose.Schema({
        TimeStamp: Date,
        Value: Number,
    });

    delete mongoose.models.DataLogger;

    const DataLogger = mongoose.model(
        'DataLogger',
        DataLoggerSchema,
        't_Data_Logger_' + channelid,
    );

    // query

    let result = await DataLogger.find().sort({ TimeStamp: 1 }).limit(1);

    res.json(result);
};

module.exports.GetDataLoggerByTimeStampSWOC = async function (req, res) {
    const { channelid, start, end } = req.query;

    let startDate = new Date(parseInt(start));
    let endDate = new Date(parseInt(end));

    const DataLoggerSchema = new mongoose.Schema({
        TimeStamp: Date,
        Value: Number,
    });

    delete mongoose.models.DataLogger;

    const DataLogger = mongoose.model(
        'DataLogger',
        DataLoggerSchema,
        't_Data_Logger_' + channelid,
    );

    const result = [];

    const data = await DataLogger.find({
        TimeStamp: { $gte: startDate, $lte: endDate },
    }).sort({ TimeStamp: 1 });

    for (const item of data) {
        const obj = {};
        obj.Value = item.Value;
        obj.TimeStamp = item.TimeStamp;

        result.push(obj);
    }

    res.status(200).json(result);
};
