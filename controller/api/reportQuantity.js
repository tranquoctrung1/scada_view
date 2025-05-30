const mongoose = require('mongoose');
const SiteModel = require('../../model/site');
const ChannelModel = require('../../model/Channel.js');
const DataManualModel = require('../../model/DataManual');

module.exports.GetQuantityHourReport = async function (req, res) {
    let start = req.params.start;
    let end = req.params.end;
    let siteid = req.params.siteid;

    let result = [];

    let startDate = new Date(parseInt(start));
    let endDate = new Date(parseInt(end));

    let spaceHour = (endDate.getTime() - startDate.getTime()) / (1000 * 3600);
    spaceHour += 1;

    let site = await SiteModel.find({ SiteId: siteid });
    if (site.length > 0) {
        if (site[0].LoggerId != null && site[0].LoggerId != undefined) {
            let listChannels = await ChannelModel.find({
                $and: [
                    { LoggerId: site[0].LoggerId },
                    {
                        $or: [
                            { ForwardFlow: { $eq: true } },
                            { ReverseFlow: { $eq: true } },
                        ],
                    },
                ],
            });

            for (let i = 0; i < spaceHour; i++) {
                let t = new Date(startDate);
                let t2 = new Date(startDate);
                let t3 = new Date(startDate);
                t.setHours(t.getHours() + i - 1);
                t2.setHours(t2.getHours() + i);
                t3.setHours(t3.getHours() + i + 1);

                let obj = {};

                obj.TimeStamp = t2;
                obj.Value = 0;

                let indexManual = await DataManualModel.find({
                    SiteId: site[0].SiteId,
                    TimeStamp: t2,
                });

                if (indexManual.length > 0) {
                    obj.Value = indexManual[0].Value;
                    obj.ForwardFlowBefore = {};
                    obj.ForwardFlowBefore.TimeStamp = t;
                    obj.ForwardFlowBefore.Value = 0;

                    obj.ForwardFlowAfter = {};
                    obj.ForwardFlowAfter.TimeStamp = t2;
                    obj.ForwardFlowAfter.Value = 0;

                    obj.ReverseFlowBefore = {};
                    obj.ReverseFlowBefore.TimeStamp = t;
                    obj.ReverseFlowBefore.Value = 0;

                    obj.ReverseFlowAfter = {};
                    obj.ReverseFlowAfter.TimeStamp = t2;
                    obj.ReverseFlowAfter.Value = 0;

                    result.push(obj);
                } else {
                    obj.ForwardFlowBefore = {};
                    obj.ForwardFlowBefore.TimeStamp = t;
                    obj.ForwardFlowBefore.Value = 0;

                    obj.ForwardFlowAfter = {};
                    obj.ForwardFlowAfter.TimeStamp = t2;
                    obj.ForwardFlowAfter.Value = 0;

                    obj.ReverseFlowBefore = {};
                    obj.ReverseFlowBefore.TimeStamp = t;
                    obj.ReverseFlowBefore.Value = 0;

                    obj.ReverseFlowAfter = {};
                    obj.ReverseFlowAfter.TimeStamp = t2;
                    obj.ReverseFlowAfter.Value = 0;

                    for (let channel of listChannels) {
                        const DataLoggerSchema = new mongoose.Schema({
                            TimeStamp: Date,
                            Value: Number,
                        });

                        delete mongoose.models.DataLogger;

                        const DataLogger = mongoose.model(
                            'DataLogger',
                            DataLoggerSchema,
                            't_Index_Logger_' + channel.ChannelId,
                        );

                        let value = await DataLogger.find({
                            TimeStamp: { $gte: t, $lt: t2 },
                        })
                            .sort({ TimeStamp: 1 })
                            .limit(1);

                        let value2 = await DataLogger.find({
                            TimeStamp: { $gte: t2, $lt: t3 },
                        })
                            .sort({ TimeStamp: 1 })
                            .limit(1);

                        if (channel.ForwardFlow == true) {
                            if (value.length > 0) {
                                obj.ForwardFlowBefore.Value =
                                    value[0].Value.toFixed(2);
                            }

                            if (value2.length > 0) {
                                obj.ForwardFlowAfter.Value =
                                    value2[0].Value.toFixed(2);
                            }
                        } else if (channel.ReverseFlow == true) {
                            if (value.length > 0) {
                                obj.ReverseFlowBefore.Value =
                                    value[0].Value.toFixed(2);
                            }

                            if (value2.length > 0) {
                                obj.ReverseFlowAfter.Value =
                                    value2[0].Value.toFixed(2);
                            }
                        }
                    }

                    let indexForwardAfter =
                        obj.ForwardFlowAfter != undefined
                            ? obj.ForwardFlowAfter.Value
                            : 0;
                    let indexReverseAfter =
                        obj.ReverseFlowAfter != undefined
                            ? obj.ReverseFlowAfter.Value
                            : 0;
                    let indexForwardBefore =
                        obj.ForwardFlowBefore != undefined
                            ? obj.ForwardFlowBefore.Value
                            : 0;
                    let indexReverseBefore =
                        obj.ReverseFlowBefore != undefined
                            ? obj.ReverseFlowBefore.Value
                            : 0;

                    if (
                        indexForwardAfter == 0 &&
                        indexReverseAfter == 0 &&
                        indexForwardBefore < indexReverseBefore
                    ) {
                        obj.Value = 0;
                    } else {
                        obj.Value =
                            indexForwardAfter -
                            indexReverseAfter -
                            (indexForwardBefore - indexReverseBefore);

                        if (obj.Value < 0) {
                            obj.Value = 0;
                        }
                    }

                    result.push(obj);
                }
            }
        }
    }

    res.json(result);
};

module.exports.GetQuantityDayReport = async function (req, res) {
    let start = req.params.start;
    let end = req.params.end;
    let siteid = req.params.siteid;

    let result = [];

    let startDate = new Date(parseInt(start));
    let endDate = new Date(parseInt(end));

    let spaceDay =
        (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
    spaceDay += 1;

    let site = await SiteModel.find({ SiteId: siteid });
    if (site.length > 0) {
        if (site[0].LoggerId != null && site[0].LoggerId != undefined) {
            let listChannels = await ChannelModel.find({
                $and: [
                    { LoggerId: site[0].LoggerId },
                    {
                        $or: [
                            { ForwardFlow: { $eq: true } },
                            { ReverseFlow: { $eq: true } },
                        ],
                    },
                ],
            });

            let startHour = 0;

            try {
                startHour = site[0].StartHour;
            } catch (err) {
                console.log(err);
            }

            for (let i = 0; i < spaceDay; i++) {
                let t = new Date(startDate);
                let t2 = new Date(startDate);
                let t3 = new Date(startDate);
                let t4 = new Date(startDate);
                t3.setDate(t3.getDate() + i);
                t3.setHours(t3.getHours() + startHour);
                t.setDate(t.getDate() + i);
                t.setHours(t.getHours() + startHour);
                t2.setDate(t2.getDate() + i + 1);
                t2.setHours(t2.getHours() + startHour);
                t4.setDate(t4.getDate() + i + 2);
                t4.setHours(t4.getHours() + startHour);
                let obj = {};

                obj.TimeStamp = t3;
                obj.Value = 0;

                let indexManual = await DataManualModel.find({
                    SiteId: site[0].SiteId,
                    TimeStamp: t3,
                });

                if (indexManual.length > 0) {
                    obj.Value = indexManual[0].Value;
                    obj.ForwardFlowBefore = {};
                    obj.ForwardFlowBefore.TimeStamp = t;
                    obj.ForwardFlowBefore.Value = 0;

                    obj.ForwardFlowAfter = {};
                    obj.ForwardFlowAfter.TimeStamp = t2;
                    obj.ForwardFlowAfter.Value = 0;

                    obj.ReverseFlowBefore = {};
                    obj.ReverseFlowBefore.TimeStamp = t;
                    obj.ReverseFlowBefore.Value = 0;

                    obj.ReverseFlowAfter = {};
                    obj.ReverseFlowAfter.TimeStamp = t2;
                    obj.ReverseFlowAfter.Value = 0;

                    result.push(obj);
                } else {
                    obj.ForwardFlowBefore = {};
                    obj.ForwardFlowBefore.TimeStamp = t;
                    obj.ForwardFlowBefore.Value = 0;

                    obj.ForwardFlowAfter = {};
                    obj.ForwardFlowAfter.TimeStamp = t2;
                    obj.ForwardFlowAfter.Value = 0;

                    obj.ReverseFlowBefore = {};
                    obj.ReverseFlowBefore.TimeStamp = t;
                    obj.ReverseFlowBefore.Value = 0;

                    obj.ReverseFlowAfter = {};
                    obj.ReverseFlowAfter.TimeStamp = t2;
                    obj.ReverseFlowAfter.Value = 0;

                    for (let channel of listChannels) {
                        const DataLoggerSchema = new mongoose.Schema({
                            TimeStamp: Date,
                            Value: Number,
                        });

                        delete mongoose.models.DataLogger;

                        const DataLogger = mongoose.model(
                            'DataLogger',
                            DataLoggerSchema,
                            't_Index_Logger_' + channel.ChannelId,
                        );

                        let value = await DataLogger.find({
                            TimeStamp: { $gte: t, $lt: t2 },
                        })
                            .sort({ TimeStamp: 1 })
                            .limit(1);

                        let value2 = await DataLogger.find({
                            TimeStamp: { $gte: t2, $lt: t4 },
                        })
                            .sort({ TimeStamp: 1 })
                            .limit(1);

                        if (channel.ForwardFlow == true) {
                            if (value != undefined && value.length > 0) {
                                obj.ForwardFlowBefore.Value =
                                    value[0].Value.toFixed(2);
                            }

                            if (value2 != undefined && value2.length > 0) {
                                obj.ForwardFlowAfter.Value =
                                    value2[0].Value.toFixed(2);
                            }
                        } else if (channel.ReverseFlow == true) {
                            if (value != undefined && value.length > 0) {
                                obj.ReverseFlowBefore.Value =
                                    value[0].Value.toFixed(2);
                            }

                            if (value2 != undefined && value2.length > 0) {
                                obj.ReverseFlowAfter.Value =
                                    value2[0].Value.toFixed(2);
                            }
                        }
                    }

                    let indexForwardAfter =
                        obj.ForwardFlowAfter != undefined
                            ? obj.ForwardFlowAfter.Value
                            : 0;
                    let indexReverseAfter =
                        obj.ReverseFlowAfter != undefined
                            ? obj.ReverseFlowAfter.Value
                            : 0;
                    let indexForwardBefore =
                        obj.ForwardFlowBefore != undefined
                            ? obj.ForwardFlowBefore.Value
                            : 0;
                    let indexReverseBefore =
                        obj.ReverseFlowBefore != undefined
                            ? obj.ReverseFlowBefore.Value
                            : 0;

                    if (
                        indexForwardAfter == 0 &&
                        indexReverseAfter == 0 &&
                        indexForwardBefore < indexReverseBefore
                    ) {
                        obj.Value = 0;
                    } else {
                        obj.Value =
                            indexForwardAfter -
                            indexReverseAfter -
                            (indexForwardBefore - indexReverseBefore);

                        if (obj.Value < 0) {
                            obj.Value = 0;
                        }
                    }

                    result.push(obj);
                }
            }
        }
    }

    res.json(result);
};

module.exports.GetQuantityMonthReport = async function (req, res) {
    let start = req.params.start;
    let end = req.params.end;
    let siteid = req.params.siteid;

    let result = [];

    let startDate = new Date(parseInt(start));
    let endDate = new Date(parseInt(end));

    let spaceMonth = (endDate.getFullYear() - startDate.getFullYear()) * 12;
    spaceMonth -= startDate.getMonth();
    spaceMonth += endDate.getMonth();
    spaceMonth += 1;

    let site = await SiteModel.find({ SiteId: siteid });
    if (site.length > 0) {
        if (site[0].LoggerId != null && site[0].LoggerId != undefined) {
            let listChannels = await ChannelModel.find({
                $and: [
                    { LoggerId: site[0].LoggerId },
                    {
                        $or: [
                            { ForwardFlow: { $eq: true } },
                            { ReverseFlow: { $eq: true } },
                        ],
                    },
                ],
            });

            let startDay = 0;
            let startHour = 0;

            try {
                startDay = site[0].StartDay;
            } catch (err) {
                console.log(err);
            }

            try {
                startHour = site[0].StartHour;
            } catch (err) {
                console.log(err);
            }

            for (let i = 0; i < spaceMonth; i++) {
                let t = new Date(startDate);
                let t2 = new Date(startDate);
                let t3 = new Date(startDate);
                let t4 = new Date(startDate);
                t3.setMonth(t3.getMonth() + i);
                t3.setDate(t.getDate() + startDay - 1);
                t3.setHours(t3.getHours() + startHour);
                t.setMonth(t.getMonth() + i);
                t.setDate(t.getDate() + startDay - 1);
                t.setHours(t.getHours() + startHour);
                t2.setMonth(t2.getMonth() + i + 1);
                t2.setDate(t2.getDate() + startDay - 1);
                t2.setHours(t2.getHours() + startHour);
                t4.setMonth(t4.getMonth() + i + 2);
                t4.setDate(t4.getDate() + startDay - 1);
                t4.setHours(t4.getHours() + startHour);

                let obj = {};

                obj.TimeStamp = t3;
                obj.Value = 0;

                let indexManual = await DataManualModel.find({
                    SiteId: site[0].SiteId,
                    TimeStamp: t3,
                });

                if (indexManual.length > 0) {
                    obj.Value = indexManual[0].Value;
                    obj.ForwardFlowBefore = {};
                    obj.ForwardFlowBefore.TimeStamp = t;
                    obj.ForwardFlowBefore.Value = 0;

                    obj.ForwardFlowAfter = {};
                    obj.ForwardFlowAfter.TimeStamp = t2;
                    obj.ForwardFlowAfter.Value = 0;

                    obj.ReverseFlowBefore = {};
                    obj.ReverseFlowBefore.TimeStamp = t;
                    obj.ReverseFlowBefore.Value = 0;

                    obj.ReverseFlowAfter = {};
                    obj.ReverseFlowAfter.TimeStamp = t2;
                    obj.ReverseFlowAfter.Value = 0;

                    result.push(obj);
                } else {
                    obj.ForwardFlowBefore = {};
                    obj.ForwardFlowBefore.TimeStamp = t;
                    obj.ForwardFlowBefore.Value = 0;

                    obj.ForwardFlowAfter = {};
                    obj.ForwardFlowAfter.TimeStamp = t2;
                    obj.ForwardFlowAfter.Value = 0;

                    obj.ReverseFlowBefore = {};
                    obj.ReverseFlowBefore.TimeStamp = t;
                    obj.ReverseFlowBefore.Value = 0;

                    obj.ReverseFlowAfter = {};
                    obj.ReverseFlowAfter.TimeStamp = t2;
                    obj.ReverseFlowAfter.Value = 0;
                    for (let channel of listChannels) {
                        const DataLoggerSchema = new mongoose.Schema({
                            TimeStamp: Date,
                            Value: Number,
                        });

                        delete mongoose.models.DataLogger;

                        const DataLogger = mongoose.model(
                            'DataLogger',
                            DataLoggerSchema,
                            't_Index_Logger_' + channel.ChannelId,
                        );

                        let value = await DataLogger.find({
                            TimeStamp: { $gte: t, $lte: t2 },
                        })
                            .sort({ TimeStamp: 1 })
                            .limit(1);

                        let value2 = await DataLogger.find({
                            TimeStamp: { $gte: t2, $lt: t4 },
                        })
                            .sort({ TimeStamp: 1 })
                            .limit(1);

                        if (channel.ForwardFlow == true) {
                            if (value.length > 0) {
                                obj.ForwardFlowBefore.Value =
                                    value[0].Value.toFixed(2);
                            }

                            if (value2.length > 0) {
                                obj.ForwardFlowAfter.Value =
                                    value2[0].Value.toFixed(2);
                            }
                        } else if (channel.ReverseFlow == true) {
                            if (value.length > 0) {
                                obj.ReverseFlowBefore.Value =
                                    value[0].Value.toFixed(2);
                            }
                            if (value2.length > 0) {
                                obj.ReverseFlowAfter.Value =
                                    value2[0].Value.toFixed(2);
                            }
                        }
                    }

                    let indexForwardAfter =
                        obj.ForwardFlowAfter != undefined
                            ? obj.ForwardFlowAfter.Value
                            : 0;
                    let indexReverseAfter =
                        obj.ReverseFlowAfter != undefined
                            ? obj.ReverseFlowAfter.Value
                            : 0;
                    let indexForwardBefore =
                        obj.ForwardFlowBefore != undefined
                            ? obj.ForwardFlowBefore.Value
                            : 0;
                    let indexReverseBefore =
                        obj.ReverseFlowBefore != undefined
                            ? obj.ReverseFlowBefore.Value
                            : 0;

                    if (
                        indexForwardAfter == 0 &&
                        indexReverseAfter == 0 &&
                        indexForwardBefore < indexReverseBefore
                    ) {
                        obj.Value = 0;
                    } else {
                        obj.Value =
                            indexForwardAfter -
                            indexReverseAfter -
                            (indexForwardBefore - indexReverseBefore);

                        if (obj.Value < 0) {
                            obj.Value = 0;
                        }
                    }

                    result.push(obj);
                }
            }
        }
    }

    res.json(result);
};

module.exports.GetQuantityYearReport = async function (req, res) {
    let start = req.params.start;
    let end = req.params.end;
    let siteid = req.params.siteid;

    let result = [];

    let startDate = new Date(parseInt(start));
    let endDate = new Date(parseInt(end));

    let spaceYear = endDate.getFullYear() - startDate.getFullYear();
    spaceYear += 1;

    let site = await SiteModel.find({ SiteId: siteid });
    if (site.length > 0) {
        if (site[0].LoggerId != null && site[0].LoggerId != undefined) {
            let listChannels = await ChannelModel.find({
                $and: [
                    { LoggerId: site[0].LoggerId },
                    {
                        $or: [
                            { ForwardFlow: { $eq: true } },
                            { ReverseFlow: { $eq: true } },
                        ],
                    },
                ],
            });

            let startDay = 0;
            let startHour = 0;

            try {
                startDay = site[0].StartDay;
            } catch (err) {
                console.log(err);
            }

            try {
                startHour = site[0].StartHour;
            } catch (err) {
                console.log(err);
            }

            for (let i = 0; i < spaceYear; i++) {
                let t = new Date(startDate);
                let t2 = new Date(startDate);
                let t3 = new Date(startDate);
                let t4 = new Date(startDate);
                t3.setFullYear(t3.getFullYear() + i);
                t3.setDate(t3.getDate() + startDay - 1);
                t3.setHours(t.getHours() + startHour);
                t.setFullYear(t.getFullYear() + i - 1);
                t.setDate(t.getDate() + startDay - 1);
                t.setHours(t.getHours() + startHour);
                t2.setFullYear(t2.getFullYear() + i);
                t2.setDate(t2.getDate() + startDay - 1);
                t2.setHours(t2.getHours() + startHour);
                t4.setFullYear(t4.getFullYear() + i + 1);
                t4.setDate(t4.getDate() + startDay - 1);
                t4.setHours(t4.getHours() + startHour);

                let obj = {};

                obj.TimeStamp = t3;
                obj.Value = 0;

                let indexManual = await DataManualModel.find({
                    SiteId: site[0].SiteId,
                    TimeStamp: t3,
                });

                if (indexManual.length > 0) {
                    obj.Value = indexManual[0].Value;
                    obj.ForwardFlowBefore = {};
                    obj.ForwardFlowBefore.TimeStamp = t;
                    obj.ForwardFlowBefore.Value = 0;

                    obj.ForwardFlowAfter = {};
                    obj.ForwardFlowAfter.TimeStamp = t2;
                    obj.ForwardFlowAfter.Value = 0;

                    obj.ReverseFlowBefore = {};
                    obj.ReverseFlowBefore.TimeStamp = t;
                    obj.ReverseFlowBefore.Value = 0;

                    obj.ReverseFlowAfter = {};
                    obj.ReverseFlowAfter.TimeStamp = t2;
                    obj.ReverseFlowAfter.Value = 0;

                    result.push(obj);
                } else {
                    obj.ForwardFlowBefore = {};
                    obj.ForwardFlowBefore.TimeStamp = t;
                    obj.ForwardFlowBefore.Value = 0;

                    obj.ForwardFlowAfter = {};
                    obj.ForwardFlowAfter.TimeStamp = t2;
                    obj.ForwardFlowAfter.Value = 0;

                    obj.ReverseFlowBefore = {};
                    obj.ReverseFlowBefore.TimeStamp = t;
                    obj.ReverseFlowBefore.Value = 0;

                    obj.ReverseFlowAfter = {};
                    obj.ReverseFlowAfter.TimeStamp = t2;
                    obj.ReverseFlowAfter.Value = 0;

                    for (let channel of listChannels) {
                        const DataLoggerSchema = new mongoose.Schema({
                            TimeStamp: Date,
                            Value: Number,
                        });

                        delete mongoose.models.DataLogger;

                        const DataLogger = mongoose.model(
                            'DataLogger',
                            DataLoggerSchema,
                            't_Index_Logger_' + channel.ChannelId,
                        );

                        let value = await DataLogger.find({
                            TimeStamp: { $gte: t, $lte: t2 },
                        })
                            .sort({ TimeStamp: 1 })
                            .limit(1);

                        let value2 = await DataLogger.find({
                            TimeStamp: { $gte: t2, $lt: t4 },
                        })
                            .sort({ TimeStamp: 1 })
                            .limit(1);

                        if (channel.ForwardFlow == true) {
                            if (value.length > 0) {
                                obj.ForwardFlowBefore.Value =
                                    value[0].Value.toFixed(2);
                            }

                            if (value2.length > 0) {
                                obj.ForwardFlowAfter.Value =
                                    value2[0].Value.toFixed(2);
                            }
                        } else if (channel.ReverseFlow == true) {
                            if (value.length > 0) {
                                obj.ReverseFlowBefore.Value =
                                    value[0].Value.toFixed(2);
                            }

                            if (value2.length > 0) {
                                obj.ReverseFlowAfter.Value =
                                    value2[0].Value.toFixed(2);
                            }
                        }
                    }

                    let indexForwardAfter =
                        obj.ForwardFlowAfter != undefined
                            ? obj.ForwardFlowAfter.Value
                            : 0;
                    let indexReverseAfter =
                        obj.ReverseFlowAfter != undefined
                            ? obj.ReverseFlowAfter.Value
                            : 0;
                    let indexForwardBefore =
                        obj.ForwardFlowBefore != undefined
                            ? obj.ForwardFlowBefore.Value
                            : 0;
                    let indexReverseBefore =
                        obj.ReverseFlowBefore != undefined
                            ? obj.ReverseFlowBefore.Value
                            : 0;

                    if (
                        indexForwardAfter == 0 &&
                        indexReverseAfter == 0 &&
                        indexForwardBefore < indexReverseBefore
                    ) {
                        obj.Value = 0;
                    } else {
                        obj.Value =
                            indexForwardAfter -
                            indexReverseAfter -
                            (indexForwardBefore - indexReverseBefore);

                        if (obj.Value < 0) {
                            obj.Value = 0;
                        }
                    }

                    result.push(obj);
                }
            }
        }
    }

    res.json(result);
};

module.exports.GetQuantityHourTotalSite = async function (req, res) {
    try {
        let result = [];

        let now = new Date(Date.now());

        let startDate = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            7,
            0,
            0,
        );
        let endDate = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            now.getHours(),
            0,
            0,
        );
        endDate.setHours(endDate.getHours() + 7);

        let spaceHour =
            (endDate.getTime() - startDate.getTime()) / (1000 * 3600);
        spaceHour += 1;

        let sites = await SiteModel.find({ IsDisplay: true });
        if (sites.length > 0) {
            for (let i = 0; i < spaceHour; i++) {
                let t = new Date(startDate);
                let t2 = new Date(startDate);
                let t3 = new Date(startDate);
                t.setHours(t.getHours() + i - 1);
                t2.setHours(t2.getHours() + i);
                t3.setHours(t3.getHours() + i + 1);

                let obj = {};

                obj.TimeStamp = t2;
                obj.Value = 0;

                for (const site of sites) {
                    if (site.LoggerId != null && site.LoggerId != undefined) {
                        let listChannels = await ChannelModel.find({
                            $and: [
                                { LoggerId: site.LoggerId },
                                {
                                    $or: [
                                        { ForwardFlow: { $eq: true } },
                                        { ReverseFlow: { $eq: true } },
                                    ],
                                },
                            ],
                        });

                        let indexManual = await DataManualModel.find({
                            SiteId: site.SiteId,
                            TimeStamp: t2,
                        });

                        if (indexManual.length > 0) {
                            obj.Value += indexManual[0].Value;
                            obj.ForwardFlowBefore = {};
                            obj.ForwardFlowBefore.TimeStamp = t;
                            obj.ForwardFlowBefore.Value = 0;

                            obj.ForwardFlowAfter = {};
                            obj.ForwardFlowAfter.TimeStamp = t2;
                            obj.ForwardFlowAfter.Value = 0;

                            obj.ReverseFlowBefore = {};
                            obj.ReverseFlowBefore.TimeStamp = t;
                            obj.ReverseFlowBefore.Value = 0;

                            obj.ReverseFlowAfter = {};
                            obj.ReverseFlowAfter.TimeStamp = t2;
                            obj.ReverseFlowAfter.Value = 0;
                        } else {
                            obj.ForwardFlowBefore = {};
                            obj.ForwardFlowBefore.TimeStamp = t;
                            obj.ForwardFlowBefore.Value = 0;

                            obj.ForwardFlowAfter = {};
                            obj.ForwardFlowAfter.TimeStamp = t2;
                            obj.ForwardFlowAfter.Value = 0;

                            obj.ReverseFlowBefore = {};
                            obj.ReverseFlowBefore.TimeStamp = t;
                            obj.ReverseFlowBefore.Value = 0;

                            obj.ReverseFlowAfter = {};
                            obj.ReverseFlowAfter.TimeStamp = t2;
                            obj.ReverseFlowAfter.Value = 0;

                            for (let channel of listChannels) {
                                const DataLoggerSchema = new mongoose.Schema({
                                    TimeStamp: Date,
                                    Value: Number,
                                });

                                delete mongoose.models.DataLogger;

                                const DataLogger = mongoose.model(
                                    'DataLogger',
                                    DataLoggerSchema,
                                    't_Index_Logger_' + channel.ChannelId,
                                );

                                let value = await DataLogger.find({
                                    TimeStamp: { $gte: t, $lt: t2 },
                                })
                                    .sort({ TimeStamp: 1 })
                                    .limit(1);

                                let value2 = await DataLogger.find({
                                    TimeStamp: { $gte: t2, $lt: t3 },
                                })
                                    .sort({ TimeStamp: 1 })
                                    .limit(1);

                                if (channel.ForwardFlow == true) {
                                    if (value.length > 0) {
                                        obj.ForwardFlowBefore.Value =
                                            value[0].Value.toFixed(2);
                                    }

                                    if (value2.length > 0) {
                                        obj.ForwardFlowAfter.Value =
                                            value2[0].Value.toFixed(2);
                                    }
                                } else if (channel.ReverseFlow == true) {
                                    if (value.length > 0) {
                                        obj.ReverseFlowBefore.Value =
                                            value[0].Value.toFixed(2);
                                    }

                                    if (value2.length > 0) {
                                        obj.ReverseFlowAfter.Value =
                                            value2[0].Value.toFixed(2);
                                    }
                                }
                            }

                            let indexForwardAfter =
                                obj.ForwardFlowAfter != undefined
                                    ? obj.ForwardFlowAfter.Value
                                    : 0;
                            let indexReverseAfter =
                                obj.ReverseFlowAfter != undefined
                                    ? obj.ReverseFlowAfter.Value
                                    : 0;
                            let indexForwardBefore =
                                obj.ForwardFlowBefore != undefined
                                    ? obj.ForwardFlowBefore.Value
                                    : 0;
                            let indexReverseBefore =
                                obj.ReverseFlowBefore != undefined
                                    ? obj.ReverseFlowBefore.Value
                                    : 0;

                            if (
                                indexForwardAfter == 0 &&
                                indexReverseAfter == 0 &&
                                indexForwardBefore < indexReverseBefore
                            ) {
                                obj.Value += 0;
                            } else {
                                let value =
                                    indexForwardAfter -
                                    indexReverseAfter -
                                    (indexForwardBefore - indexReverseBefore);

                                if (value < 0) {
                                    obj.Value += 0;
                                } else {
                                    obj.Value += value;
                                }
                            }
                        }
                    }
                }

                if (obj.Value !== null) {
                    obj.Value = parseFloat(obj.Value.toFixed(2));
                }
                result.push(obj);
            }
        }

        res.status(200).json(result);
    } catch (err) {
        console.log(err);
    }
};

module.exports.GetQuantityDayTotalSite = async function (req, res) {
    try {
        let result = [];

        let now = new Date(Date.now());

        let startDate = new Date(now.getFullYear(), now.getMonth(), 1, 7, 0, 0);
        let endDate = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            7,
            0,
            0,
        );

        let spaceDay =
            (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
        spaceDay += 1;

        let sites = await SiteModel.find({ IsDisplay: true });
        if (sites.length > 0) {
            for (let i = 0; i < spaceDay; i++) {
                let t = new Date(startDate);
                let t2 = new Date(startDate);
                let t3 = new Date(startDate);
                let t4 = new Date(startDate);
                t3.setDate(t3.getDate() + i);

                t.setDate(t.getDate() + i);

                t2.setDate(t2.getDate() + i + 1);

                t4.setDate(t4.getDate() + i + 2);

                let obj = {};

                obj.TimeStamp = t3;
                obj.Value = 0;

                for (const site of sites) {
                    let tt = new Date(t);
                    let tt2 = new Date(t2);
                    let tt3 = new Date(t3);
                    let tt4 = new Date(t4);

                    if (site.LoggerId != null && site.LoggerId != undefined) {
                        let listChannels = await ChannelModel.find({
                            $and: [
                                { LoggerId: site.LoggerId },
                                {
                                    $or: [
                                        { ForwardFlow: { $eq: true } },
                                        { ReverseFlow: { $eq: true } },
                                    ],
                                },
                            ],
                        });

                        let startHour = 0;

                        try {
                            startHour = site.StartHour;
                        } catch (err) {
                            console.log(err);
                        }

                        tt.setHours(tt.getHours() + startHour);
                        tt2.setHours(tt2.getHours() + startHour);
                        tt3.setHours(tt3.getHours() + startHour);
                        tt4.setHours(tt4.getHours() + startHour);

                        let indexManual = await DataManualModel.find({
                            SiteId: site.SiteId,
                            TimeStamp: tt3,
                        });

                        if (indexManual.length > 0) {
                            obj.Value += indexManual[0].Value;
                            obj.ForwardFlowBefore = {};
                            obj.ForwardFlowBefore.TimeStamp = tt;
                            obj.ForwardFlowBefore.Value = 0;

                            obj.ForwardFlowAfter = {};
                            obj.ForwardFlowAfter.TimeStamp = tt2;
                            obj.ForwardFlowAfter.Value = 0;

                            obj.ReverseFlowBefore = {};
                            obj.ReverseFlowBefore.TimeStamp = tt;
                            obj.ReverseFlowBefore.Value = 0;

                            obj.ReverseFlowAfter = {};
                            obj.ReverseFlowAfter.TimeStamp = tt2;
                            obj.ReverseFlowAfter.Value = 0;
                        } else {
                            obj.ForwardFlowBefore = {};
                            obj.ForwardFlowBefore.TimeStamp = tt;
                            obj.ForwardFlowBefore.Value = 0;

                            obj.ForwardFlowAfter = {};
                            obj.ForwardFlowAfter.TimeStamp = tt2;
                            obj.ForwardFlowAfter.Value = 0;

                            obj.ReverseFlowBefore = {};
                            obj.ReverseFlowBefore.TimeStamp = tt;
                            obj.ReverseFlowBefore.Value = 0;

                            obj.ReverseFlowAfter = {};
                            obj.ReverseFlowAfter.TimeStamp = tt2;
                            obj.ReverseFlowAfter.Value = 0;

                            for (let channel of listChannels) {
                                const DataLoggerSchema = new mongoose.Schema({
                                    TimeStamp: Date,
                                    Value: Number,
                                });

                                delete mongoose.models.DataLogger;

                                const DataLogger = mongoose.model(
                                    'DataLogger',
                                    DataLoggerSchema,
                                    't_Index_Logger_' + channel.ChannelId,
                                );

                                let value = await DataLogger.find({
                                    TimeStamp: { $gte: tt, $lt: tt2 },
                                })
                                    .sort({ TimeStamp: 1 })
                                    .limit(1);

                                let value2 = await DataLogger.find({
                                    TimeStamp: { $gte: tt2, $lt: tt4 },
                                })
                                    .sort({ TimeStamp: 1 })
                                    .limit(1);

                                if (channel.ForwardFlow == true) {
                                    if (
                                        value != undefined &&
                                        value.length > 0
                                    ) {
                                        obj.ForwardFlowBefore.Value =
                                            value[0].Value.toFixed(2);
                                    }

                                    if (
                                        value2 != undefined &&
                                        value2.length > 0
                                    ) {
                                        obj.ForwardFlowAfter.Value =
                                            value2[0].Value.toFixed(2);
                                    }
                                } else if (channel.ReverseFlow == true) {
                                    if (
                                        value != undefined &&
                                        value.length > 0
                                    ) {
                                        obj.ReverseFlowBefore.Value =
                                            value[0].Value.toFixed(2);
                                    }

                                    if (
                                        value2 != undefined &&
                                        value2.length > 0
                                    ) {
                                        obj.ReverseFlowAfter.Value =
                                            value2[0].Value.toFixed(2);
                                    }
                                }
                            }

                            let indexForwardAfter =
                                obj.ForwardFlowAfter != undefined
                                    ? obj.ForwardFlowAfter.Value
                                    : 0;
                            let indexReverseAfter =
                                obj.ReverseFlowAfter != undefined
                                    ? obj.ReverseFlowAfter.Value
                                    : 0;
                            let indexForwardBefore =
                                obj.ForwardFlowBefore != undefined
                                    ? obj.ForwardFlowBefore.Value
                                    : 0;
                            let indexReverseBefore =
                                obj.ReverseFlowBefore != undefined
                                    ? obj.ReverseFlowBefore.Value
                                    : 0;

                            if (
                                indexForwardAfter == 0 &&
                                indexReverseAfter == 0 &&
                                indexForwardBefore < indexReverseBefore
                            ) {
                                obj.Value += 0;
                            } else {
                                let value =
                                    indexForwardAfter -
                                    indexReverseAfter -
                                    (indexForwardBefore - indexReverseBefore);

                                if (value < 0) {
                                    obj.Value += 0;
                                } else {
                                    obj.Value += value;
                                }
                            }
                        }
                    }
                }
                if (obj.Value !== null) {
                    obj.Value = parseFloat(obj.Value.toFixed(2));
                }
                result.push(obj);
            }
        }

        res.status(200).json(result);
    } catch (err) {
        console.log(err);
    }
};

module.exports.GetQuantityMonthTotalSite = async function (req, res) {
    try {
        let result = [];

        let now = new Date(Date.now());

        let startDate = new Date(now.getFullYear(), 0, 1, 7, 0, 0);
        let endDate = new Date(now.getFullYear(), now.getMonth(), 1, 7, 0, 0);

        let spaceMonth = (endDate.getFullYear() - startDate.getFullYear()) * 12;
        spaceMonth -= startDate.getMonth();
        spaceMonth += endDate.getMonth();
        spaceMonth += 1;

        let sites = await SiteModel.find({ IsDisplay: true });
        if (sites.length > 0) {
            for (let i = 0; i < spaceMonth; i++) {
                let t = new Date(startDate);
                let t2 = new Date(startDate);
                let t3 = new Date(startDate);
                let t4 = new Date(startDate);
                t3.setMonth(t3.getMonth() + i);

                t.setMonth(t.getMonth() + i);

                t2.setMonth(t2.getMonth() + i + 1);

                t4.setMonth(t4.getMonth() + i + 2);

                let obj = {};

                obj.TimeStamp = t3;
                obj.Value = 0;

                for (const site of sites) {
                    let tt = new Date(t);
                    let tt2 = new Date(t2);
                    let tt3 = new Date(t3);
                    let tt4 = new Date(t4);

                    if (site.LoggerId != null && site.LoggerId != undefined) {
                        let listChannels = await ChannelModel.find({
                            $and: [
                                { LoggerId: site.LoggerId },
                                {
                                    $or: [
                                        { ForwardFlow: { $eq: true } },
                                        { ReverseFlow: { $eq: true } },
                                    ],
                                },
                            ],
                        });

                        let startDay = 0;
                        let startHour = 0;

                        try {
                            startDay = site.StartDay;
                        } catch (err) {
                            console.log(err);
                        }

                        try {
                            startHour = site.StartHour;
                        } catch (err) {
                            console.log(err);
                        }

                        tt.setHours(tt.getHours() + startHour);
                        tt.setDate(tt.getDate() + startDay - 1);
                        tt2.setHours(tt2.getHours() + startHour);
                        tt2.setDate(tt2.getDate() + startDay - 1);
                        tt3.setHours(tt3.getHours() + startHour);
                        tt3.setDate(tt3.getDate() + startDay - 1);
                        tt4.setHours(tt4.getHours() + startHour);
                        tt4.setDate(tt4.getDate() + startDay - 1);

                        let indexManual = await DataManualModel.find({
                            SiteId: site.SiteId,
                            TimeStamp: t3,
                        });

                        if (indexManual.length > 0) {
                            obj.Value += indexManual[0].Value;
                            obj.ForwardFlowBefore = {};
                            obj.ForwardFlowBefore.TimeStamp = tt;
                            obj.ForwardFlowBefore.Value = 0;

                            obj.ForwardFlowAfter = {};
                            obj.ForwardFlowAfter.TimeStamp = tt2;
                            obj.ForwardFlowAfter.Value = 0;

                            obj.ReverseFlowBefore = {};
                            obj.ReverseFlowBefore.TimeStamp = tt;
                            obj.ReverseFlowBefore.Value = 0;

                            obj.ReverseFlowAfter = {};
                            obj.ReverseFlowAfter.TimeStamp = tt2;
                            obj.ReverseFlowAfter.Value = 0;
                        } else {
                            obj.ForwardFlowBefore = {};
                            obj.ForwardFlowBefore.TimeStamp = tt;
                            obj.ForwardFlowBefore.Value = 0;

                            obj.ForwardFlowAfter = {};
                            obj.ForwardFlowAfter.TimeStamp = tt2;
                            obj.ForwardFlowAfter.Value = 0;

                            obj.ReverseFlowBefore = {};
                            obj.ReverseFlowBefore.TimeStamp = tt;
                            obj.ReverseFlowBefore.Value = 0;

                            obj.ReverseFlowAfter = {};
                            obj.ReverseFlowAfter.TimeStamp = tt2;
                            obj.ReverseFlowAfter.Value = 0;

                            for (let channel of listChannels) {
                                const DataLoggerSchema = new mongoose.Schema({
                                    TimeStamp: Date,
                                    Value: Number,
                                });

                                delete mongoose.models.DataLogger;

                                const DataLogger = mongoose.model(
                                    'DataLogger',
                                    DataLoggerSchema,
                                    't_Index_Logger_' + channel.ChannelId,
                                );

                                let value = await DataLogger.find({
                                    TimeStamp: { $gte: tt, $lt: tt2 },
                                })
                                    .sort({ TimeStamp: 1 })
                                    .limit(1);

                                let value2 = await DataLogger.find({
                                    TimeStamp: { $gte: tt2, $lt: tt4 },
                                })
                                    .sort({ TimeStamp: 1 })
                                    .limit(1);

                                if (channel.ForwardFlow == true) {
                                    if (
                                        value != undefined &&
                                        value.length > 0
                                    ) {
                                        obj.ForwardFlowBefore.Value =
                                            value[0].Value.toFixed(2);
                                    }

                                    if (
                                        value2 != undefined &&
                                        value2.length > 0
                                    ) {
                                        obj.ForwardFlowAfter.Value =
                                            value2[0].Value.toFixed(2);
                                    }
                                } else if (channel.ReverseFlow == true) {
                                    if (
                                        value != undefined &&
                                        value.length > 0
                                    ) {
                                        obj.ReverseFlowBefore.Value =
                                            value[0].Value.toFixed(2);
                                    }

                                    if (
                                        value2 != undefined &&
                                        value2.length > 0
                                    ) {
                                        obj.ReverseFlowAfter.Value =
                                            value2[0].Value.toFixed(2);
                                    }
                                }
                            }

                            let indexForwardAfter =
                                obj.ForwardFlowAfter != undefined
                                    ? obj.ForwardFlowAfter.Value
                                    : 0;
                            let indexReverseAfter =
                                obj.ReverseFlowAfter != undefined
                                    ? obj.ReverseFlowAfter.Value
                                    : 0;
                            let indexForwardBefore =
                                obj.ForwardFlowBefore != undefined
                                    ? obj.ForwardFlowBefore.Value
                                    : 0;
                            let indexReverseBefore =
                                obj.ReverseFlowBefore != undefined
                                    ? obj.ReverseFlowBefore.Value
                                    : 0;

                            if (
                                indexForwardAfter == 0 &&
                                indexReverseAfter == 0 &&
                                indexForwardBefore < indexReverseBefore
                            ) {
                                obj.Value += 0;
                            } else {
                                let value =
                                    indexForwardAfter -
                                    indexReverseAfter -
                                    (indexForwardBefore - indexReverseBefore);

                                if (value < 0) {
                                    obj.Value += 0;
                                } else {
                                    obj.Value += value;
                                }
                            }
                        }
                    }
                }
                if (obj.Value !== null) {
                    obj.Value = parseFloat(obj.Value.toFixed(2));
                }
                result.push(obj);
            }
        }

        res.status(200).json(result);
    } catch (err) {
        console.log(err);
    }
};
