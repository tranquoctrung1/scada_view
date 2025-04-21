const ChannelModel = require('../../model/Channel.js');
const SiteModel = require('../../model/site');
const ConditionIconModel = require('../../model/ConditionIcon.js');
const mongoose = require('mongoose');

module.exports.GetChannelByLoggerId = async function (req, res) {
    const loggerid = req.params.loggerid;

    let site = await SiteModel.find({ LoggerId: loggerid });
    let conditionIcon = await ConditionIconModel.find({});

    let minfirst = 21;
    let minsecond = 15;
    let minthird = 0;
    let timeconnect = 12;

    if (conditionIcon.length > 0) {
        let findMinfirst = conditionIcon.find((el) => el.Name === 'minfirst');

        if (findMinfirst !== undefined) {
            minfirst = findMinfirst.Value;
        }

        let findMinsecond = conditionIcon.find((el) => el.Name === 'minsecond');

        if (findMinsecond !== undefined) {
            minsecond = findMinsecond.Value;
        }
        let findMinthird = conditionIcon.find((el) => el.Name === 'minthird');

        if (findMinthird !== undefined) {
            minthird = findMinthird.Value;
        }
        let findTimeconnect = conditionIcon.find(
            (el) => el.Name === 'timeconnect',
        );

        if (findTimeconnect !== undefined) {
            timeconnect = findTimeconnect.Value;
        }
    }

    let nowTime = new Date(Date.now());

    let timeDelay = 60;

    if (site.length > 0) {
        if (
            site[0].TimeDelay != 'null' &&
            site[0].TimeDelay != null &&
            site[0].timeDelay != undefined
        ) {
            timeDelay = site[0].TimeDelay;
        }
    }

    let currentQuantityForward = 0;
    let currentQuantityReverse = 0;
    let zeroQuantityForward = 0;
    let zeroQuantityReverse = 0;

    let channelForward = '';
    let channelReverse = '';
    let commonDate = null;

    let channels = await ChannelModel.find({ LoggerId: loggerid }).sort({
        ChannelName: 1,
    });

    let result = [];

    for (let channel of channels) {
        let isError = false;
        let status;
        if (isError == false) {
            if (channel.TimeStamp != null) {
                let diff = Math.round(
                    (Date.now() - channel.TimeStamp.getTime()) / 1000 / 60,
                );
                if (diff > timeDelay * timeconnect) {
                    status = 6;
                    isError = true;
                }
            }
        }
        if (isError == false) {
            if (channel.Pressure1 == true || channel.Pressure2 == true) {
                if (channel.LastValue != null) {
                    if (channel.LastValue > minfirst) {
                        status = 1;
                        isError = true;
                    } else if (channel.LastValue > minsecond) {
                        status = 2;
                        isError = true;
                    } else if (channel.LastValue >= minthird) {
                        status = 3;
                        isError = true;
                    }
                }
            }
        }

        if (isError == false) {
            status = 0;
        }

        if (channel.ForwardFlow == true) {
            channelForward = channel.ChannelId;
            if (channel.TimeStamp != null) {
                commonDate = new Date(channel.TimeStamp);
            }

            if (channel.LastIndex != null) {
                //currentQuantityForward = channel.LastIndex;
            }
        } else if (channel.ReverseFlow == true) {
            channelReverse = channel.ChannelId;
            if (commonDate == null) {
                if (channel.TimeStamp != null) {
                    commonDate = new Date(channel.TimeStamp);
                }
            }
            if (channel.LastIndex != null) {
                //currentQuantityReverse = channel.LastIndex;
            }
        }

        let obj = { ...channel._doc };
        obj.Status = status;
        obj.allowChart = true;
        result.push(obj);
    }

    if (site.length > 0) {
        let quantity = 0;

        let objChannelQuantity = {};
        objChannelQuantity.ChannelId = site[0].LoggerId + '_102';
        objChannelQuantity.ChannelName = 'SLN';
        objChannelQuantity.LoggerId = site[0].LoggerId;
        objChannelQuantity.Unit = 'm3';
        objChannelQuantity.Pressure1 = false;
        objChannelQuantity.Pressure2 = false;
        objChannelQuantity.ForwardFlow = false;
        objChannelQuantity.ReverseFlow = false;
        objChannelQuantity.IndexTimeStamp = null;
        objChannelQuantity.LastIndex = 0;
        objChannelQuantity.BaseLine = null;
        objChannelQuantity.BaseMin = null;
        objChannelQuantity.BaseMax = null;
        objChannelQuantity.OtherChannel = true;
        objChannelQuantity.DisplayOnLabel = true;
        objChannelQuantity.Status = null;
        objChannelQuantity.allowChart = false;
        objChannelQuantity.OpenCloseChannel = false;

        if (commonDate != null) {
            let zeroHour = new Date(
                commonDate.getFullYear(),
                commonDate.getMonth(),
                commonDate.getDate(),
                0,
                0,
                0,
            );
            let oneHour = new Date(
                commonDate.getFullYear(),
                commonDate.getMonth(),
                commonDate.getDate(),
                1,
                0,
                0,
            );

            if (channelForward != '') {
                const DataLoggerSchema = new mongoose.Schema({
                    TimeStamp: Date,
                    Value: Number,
                });

                delete mongoose.models.DataLogger;

                const DataLogger = mongoose.model(
                    'DataLogger',
                    DataLoggerSchema,
                    't_Index_Logger_' + channelForward,
                );

                let value = await DataLogger.find({
                    TimeStamp: { $gte: zeroHour, $lt: oneHour },
                })
                    .sort({ TimeStamp: 1 })
                    .limit(1);

                if (value.length > 0) {
                    if (value[0].Value != null) {
                        zeroQuantityForward = value[0].Value;
                    }
                }

                let value2 = await DataLogger.find({})
                    .sort({ TimeStamp: -1 })
                    .limit(1);

                if (value2.length > 0) {
                    if (value2[0].Value != null) {
                        currentQuantityForward = value2[0].Value;
                    }
                }
            }

            if (channelReverse != '') {
                const DataLoggerSchema = new mongoose.Schema({
                    TimeStamp: Date,
                    Value: Number,
                });

                delete mongoose.models.DataLogger;

                const DataLogger = mongoose.model(
                    'DataLogger',
                    DataLoggerSchema,
                    't_Index_Logger_' + channelReverse,
                );

                let value = await DataLogger.find({
                    TimeStamp: { $gte: zeroHour, $lt: oneHour },
                })
                    .sort({ TimeStamp: 1 })
                    .limit(1);

                if (value.length > 0) {
                    if (value[0].Value != null) {
                        zeroQuantityReverse = value[0].Value;
                    }
                }

                let value2 = await DataLogger.find({})
                    .sort({ TimeStamp: -1 })
                    .limit(1);

                if (value2.length > 0) {
                    if (value2[0].Value != null) {
                        currentQuantityReverse = value2[0].Value;
                    }
                }
            }

            quantity =
                currentQuantityForward -
                currentQuantityReverse -
                (zeroQuantityForward - zeroQuantityReverse);
            if (quantity < 0) {
                quantity = 0;
            }

            objChannelQuantity.LastValue = quantity.toFixed(2);
            objChannelQuantity.TimeStamp = commonDate;

            result.push(objChannelQuantity);
        }
    }

    res.json(result);
};

module.exports.GetAllChannel = async function (req, res) {
    let loggerid = req.params.loggerid;
    res.json(await ChannelModel.find({ LoggerId: loggerid }));
};

module.exports.GetChannelByChannelId = async function (req, res) {
    let channelid = req.params.channelid;

    let result = await ChannelModel.find({ ChannelId: channelid });

    res.json(result);
};

module.exports.GetChannelConfigSWOC = async function (req, res) {
    const result = [];

    const data = await ChannelModel.find({}).sort({ ChannelId: 1 });

    for (const item of data) {
        const obj = {};
        obj.LoggerId = item.LoggerId;
        obj.channelId = item.ChannelId;
        obj.Name = item.ChannelName;
        obj.Meansure = item.Unit;
        obj.HHAlarmCfg = item.BaseMax;
        obj.HAlarmCfg = null;
        obj.LLAlarmCfg = item.BaseMin;
        obj.LAlarmCfg = null;

        result.push(obj);
    }

    res.status(200).json(result);
};

module.exports.GetLastDataChannelConfigSWOC = async function (req, res) {
    const result = [];

    const data = await ChannelModel.find({}).sort({ ChannelId: 1 });

    for (const item of data) {
        const obj = {};
        obj.LoggerId = item.LoggerId;
        obj.channelId = item.ChannelId;
        obj.LastValue = item.LastValue;
        obj.TimeStamp = item.TimeStamp;

        result.push(obj);
    }

    res.status(200).json(result);
};

module.exports.InsertChannelConfig = async function (req, res) {
    let channelid = req.params.channelid;
    if (channelid == 'null') {
        channelid = '';
    }
    let loggerid = req.params.loggerid;
    if (loggerid == 'null') {
        loggerid = '';
    }
    let channelname = req.params.channelname;
    if (channelname == 'null') {
        channelname = '';
    }
    let unit = req.params.unit;
    if (unit == 'null') {
        unit = '';
    } else if (unit == 'm3_h') {
        unit = 'm3/h';
    }
    let pressure1 = req.params.pressure1;
    let pressure2 = req.params.pressure2;
    let forwardFlow = req.params.forwardFlow;
    let reverseFlow = req.params.reverseFlow;
    let batSolarChannel = req.params.batSolarChannel;
    let batMetterChannel = req.params.batMetterChannel;
    let batLoggerChannel = req.params.batLoggerChannel;
    let openCloseChannel = req.params.openCloseChannel;
    let baseLine = req.params.baseLine;
    if (baseLine == 'null') {
        baseLine = null;
    }
    let baseMin = req.params.baseMin;
    if (baseMin == 'null') {
        baseMin = null;
    }
    let baseMax = req.params.baseMax;
    if (baseMax == 'null') {
        baseMax = null;
    }
    let batThreshold = req.params.batThreshold;
    if (batThreshold == 'null') {
        batThreshold = null;
    }
    let otherChannel = req.params.otherChannel;
    let fromHour = req.params.fromHour;
    if (fromHour == 'null') {
        fromHour = null;
    }
    let toHour = req.params.toHour;
    if (toHour == 'null') {
        toHour = null;
    }

    let check = await ChannelModel.find({ ChannelId: channelid });

    if (check.length == 0) {
        let result = await ChannelModel.insertMany([
            {
                ChannelId: channelid,
                LoggerId: loggerid,
                ChannelName: channelname,
                Unit: unit,
                Pressure1: pressure1,
                Pressure2: pressure2,
                ForwardFlow: forwardFlow,
                ReverseFlow: reverseFlow,
                BaseLine: baseLine,
                BaseMax: baseMax,
                BaseMin: baseMin,
                OtherChannel: otherChannel,
                IndexTimeStamp: null,
                LastIndex: null,
                LastValue: null,
                TimeStamp: null,
                BatSolarChannel: batSolarChannel,
                BatLoggerChannel: batLoggerChannel,
                BatMetterChannel: batMetterChannel,
                BatThreshold: batThreshold,
                OpenCloseChannel: openCloseChannel,
                FromHour: fromHour,
                ToHour: toHour,
            },
        ]);

        if (result.length > 0) {
            const DataLoggerSchema = new mongoose.Schema({
                TimeStamp: Date,
                Value: Number,
            });

            DataLoggerSchema.index({ TimeStamp: 1 });

            delete mongoose.models.DataLogger;

            const DataLogger = mongoose.model(
                'DataLogger',
                DataLoggerSchema,
                't_Data_Logger_' + channelid,
            );

            await DataLogger.createCollection();

            const DataLoggerSchema2 = new mongoose.Schema({
                TimeStamp: Date,
                Value: Number,
            });

            DataLoggerSchema2.index({ TimeStamp: 1 });

            delete mongoose.models.DataLogger2;

            const DataLogger2 = mongoose.model(
                'DataLogger2',
                DataLoggerSchema2,
                't_Index_Logger_' + channelid,
            );

            await DataLogger2.createCollection();

            res.json(result[0]._id);
        } else {
            res.json(0);
        }
    } else {
        res.json(0);
    }
};

module.exports.UpdateChannelConfig = async function (req, res) {
    let id = req.params.id;
    if (id == 'null') {
        id = '';
    }

    let channelid = req.params.channelid;
    if (channelid == 'null') {
        channelid = '';
    }
    let loggerid = req.params.loggerid;
    if (loggerid == 'null') {
        loggerid = '';
    }
    let channelname = req.params.channelname;
    if (channelname == 'null') {
        channelname = '';
    }
    let unit = req.params.unit;
    if (unit == 'null') {
        unit = '';
    } else if (unit == 'm3_h') {
        unit = 'm3/h';
    }
    let pressure1 = req.params.pressure1;
    let pressure2 = req.params.pressure2;
    let forwardFlow = req.params.forwardFlow;
    let reverseFlow = req.params.reverseFlow;
    let batSolarChannel = req.params.batSolarChannel;
    let batMetterChannel = req.params.batMetterChannel;
    let batLoggerChannel = req.params.batLoggerChannel;
    let openCloseChannel = req.params.openCloseChannel;
    let baseLine = req.params.baseLine;
    if (baseLine == 'null') {
        baseLine = null;
    }
    let baseMin = req.params.baseMin;
    if (baseMin == 'null') {
        baseMin = null;
    }
    let baseMax = req.params.baseMax;
    if (baseMax == 'null') {
        baseMax = null;
    }
    let batThreshold = req.params.batThreshold;
    if (batThreshold == 'null') {
        batThreshold = null;
    }
    let otherChannel = req.params.otherChannel;
    let fromHour = req.params.fromHour;
    if (fromHour == 'null') {
        fromHour = null;
    }
    let toHour = req.params.toHour;
    if (toHour == 'null') {
        toHour = null;
    }

    let result = await ChannelModel.updateOne(
        { _id: id },
        {
            ChannelId: channelid,
            LoggerId: loggerid,
            ChannelName: channelname,
            Unit: unit,
            Pressure1: pressure1,
            Pressure2: pressure2,
            ForwardFlow: forwardFlow,
            ReverseFlow: reverseFlow,
            BaseLine: baseLine,
            BaseMax: baseMax,
            BaseMin: baseMin,
            OtherChannel: otherChannel,
            BatSolarChannel: batSolarChannel,
            BatLoggerChannel: batLoggerChannel,
            BatMetterChannel: batMetterChannel,
            BatThreshold: batThreshold,
            FromHour: fromHour,
            ToHour: toHour,
            OpenCloseChannel: openCloseChannel,
        },
    );

    res.json(result.nModified);
};

module.exports.DeleteChannelConfig = async function (req, res) {
    let id = req.params.id;
    let channelid = req.params.channelid;
    if (id == 'null') {
        id = '';
    }

    let result = await ChannelModel.deleteOne({
        _id: id,
    });

    const DataLoggerSchema = new mongoose.Schema({
        TimeStamp: Date,
        Value: Number,
    });

    if (channelid != 'null') {
        mongoose.connection.db.dropCollection(
            't_Data_Logger_' + channelid,
            function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);
                }
            },
        );
        mongoose.connection.db.dropCollection(
            't_Index_Logger_' + channelid,
            function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);
                }
            },
        );
    }

    res.json(result.deletedCount);
};

module.exports.GetChannelCard = async function (req, res) {
    let siteid = req.params.siteid;
    let start = req.params.start;
    let end = req.params.end;

    let startDate = new Date(parseInt(start));
    let endDate = new Date(parseInt(end));

    let result = [];

    let site = await SiteModel.find({ SiteId: siteid });

    if (site.length > 0) {
        let channels = await ChannelModel.find({ LoggerId: site[0].LoggerId });

        for (let channel of channels) {
            let obj = {};
            obj.ChannelName = channel.ChannelName || null;
            obj.ChannelId = channel.ChannelId || null;
            obj.Unit = channel.Unit || null;
            obj.TimeStamp = channel.TimeStamp || null;
            obj.LastValue = channel.LastValue || null;

            const DataLoggerSchema = new mongoose.Schema({
                TimeStamp: Date,
                Value: Number,
            });

            delete mongoose.models.DataLogger;

            const DataLogger = mongoose.model(
                'DataLogger',
                DataLoggerSchema,
                't_Data_Logger_' + channel.ChannelId,
            );

            // get value for this time
            let minValue = await DataLogger.find({
                TimeStamp: { $gte: startDate, $lte: endDate },
            })
                .sort({ Value: 1 })
                .limit(1);

            let maxValue = await DataLogger.find({
                TimeStamp: { $gte: startDate, $lte: endDate },
            })
                .sort({ Value: -1 })
                .limit(1);

            if (maxValue.length > 0) {
                obj.MaxValue = maxValue[0].Value;
            } else {
                obj.MaxValue = null;
            }
            if (minValue.length > 0) {
                obj.MinValue = minValue[0].Value;
            } else {
                obj.MinValue = null;
            }

            result.push(obj);
        }
    }
    res.json(result);
};

module.exports.GetChannelBySiteId = async function (req, res) {
    let siteid = req.params.siteid;

    let site = await SiteModel.find({ SiteId: siteid });

    if (site.length > 0) {
        let channels = await ChannelModel.find({ LoggerId: site[0].LoggerId });

        res.json(channels);
    }
    res.json([]);
};

module.exports.GetCurrentTimeStampBySiteId = async function (req, res) {
    let siteid = req.params.siteid;

    let site = await SiteModel.find({ SiteId: siteid });

    if (site.length > 0) {
        let channels = await ChannelModel.find({ LoggerId: site[0].LoggerId });

        for (let channel of channels) {
            const DataLoggerSchema = new mongoose.Schema({
                TimeStamp: Date,
                Value: Number,
            });

            delete mongoose.models.DataLogger;

            const DataLogger = mongoose.model(
                'DataLogger',
                DataLoggerSchema,
                't_Data_Logger_' + channel.ChannelId,
            );

            // query

            let result = await DataLogger.find()
                .sort({ TimeStamp: -1 })
                .limit(1);
            if (result.length > 0) {
                result[0].TimeStamp.setHours(
                    result[0].TimeStamp.getHours() - 7,
                );
                res.json(result);
                break;
            }
        }
    }
    res.json([]);
};
