const SiteModel = require('../../model/site');
const UserModel = require('../../model/user');
const ConsumerSiteModel = require('../../model/consumerSite');
const StaffSiteModel = require('../../model/staffSite');
const ChannelModel = require('../../model/Channel');
const ConditionIconModel = require('../../model/ConditionIcon');
const mongoose = require('mongoose');
const DeviceLoggerModel = require('../../model/DeviceLogger');
const DeviceMeterModel = require('../../model/DeviceMeter');

module.exports.GetAllSite = async function (req, res) {
    let result = await SiteModel.find({}).sort({
        SiteId: 1,
    });

    res.json(result);
};

module.exports.GetSiteByUid = async function (req, res) {
    const userid = req.params.userid;

    let user = await UserModel.findOne({ Username: userid });

    let listSite;

    if (user.Role == 'admin') {
        listSite = await SiteModel.find({ IsDisplay: true });
    } else if (user.Role == 'consumer') {
        let listIdSite = await ConsumerSiteModel.find(
            { IdUser: user._id },
            { IdSite: 1, _id: 0 },
        );

        let list = [];

        for (let item of listIdSite) {
            list.push(item.IdSite);
        }

        if (listIdSite.length > 0) {
            listSite = await SiteModel.find({
                _id: { $in: list },
                IsDisplay: true,
                IsConnectPipe: false,
            });
        } else {
            listSite = [];
        }

        //listSite = await SiteModel.find({ ConsumerId: user.ConsumerId });
    } else if (user.Role == 'staff') {
        let listIdSite = await StaffSiteModel.find(
            { IdUser: user._id },
            { IdSite: 1, _id: 0 },
        );

        let list = [];

        for (let item of listIdSite) {
            list.push(item.IdSite);
        }

        if (listIdSite.length > 0) {
            listSite = await SiteModel.find({
                _id: { $in: list },
                IsDisplay: true,
                IsConnectPipe: false,
            });
        } else {
            listSite = [];
        }
        //listSite = await SiteModel.find({ StaffId: user.StaffId });
    } else {
        listSite = await SiteModel.find({
            IsDisplay: true,
            IsConnectPipe: false,
        });
    }

    const result = [];

    for (const site of listSite) {
        const obj = { ...site._doc };

        const deviceLogger = await DeviceLoggerModel.find({
            Serial: site.LoggerSerial,
        });
        const deviceMeter = await DeviceMeterModel.find({
            Serial: site.MeterSerial,
        });

        if (deviceLogger.length > 0) {
            obj.DeviceLogger = deviceLogger[0];
        } else {
            obj.DeviceLogger = null;
        }
        if (deviceMeter.length > 0) {
            obj.DeviceMeter = deviceMeter[0];
        } else {
            obj.DeviceMeter = null;
        }

        result.push(obj);
    }

    res.json(result);
};

module.exports.GetSiteByUid2 = async function (req, res) {
    const userid = req.params.userid;

    let user = await UserModel.findOne({ Username: userid });

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

    let result = [];

    let listSite;

    if (user.Role == 'admin') {
        listSite = await SiteModel.find({ IsDisplay: true });
    } else if (user.Role == 'consumer') {
        let listIdSite = await ConsumerSiteModel.find(
            { IdUser: user._id },
            { IdSite: 1, _id: 0 },
        );

        let list = [];

        for (let item of listIdSite) {
            list.push(item.IdSite);
        }

        if (listIdSite.length > 0) {
            listSite = await SiteModel.find({
                _id: { $in: list },
                IsDisplay: true,
                IsConnectPipe: false,
            });
        } else {
            listSite = [];
        }

        //listSite = await SiteModel.find({ ConsumerId: user.ConsumerId });
    } else if (user.Role == 'staff') {
        let listIdSite = await StaffSiteModel.find(
            { IdUser: user._id },
            { IdSite: 1, _id: 0 },
        );

        let list = [];

        for (let item of listIdSite) {
            list.push(item.IdSite);
        }

        if (listIdSite.length > 0) {
            listSite = await SiteModel.find({
                _id: { $in: list },
                IsDisplay: true,
                IsConnectPipe: false,
            });
        } else {
            listSite = [];
        }
        //listSite = await SiteModel.find({ StaffId: user.StaffId });
    } else {
        listSite = await SiteModel.find({
            IsDisplay: true,
            IsConnectPipe: false,
        });
    }

    for (const site of listSite) {
        if (
            site.LoggerId !== null &&
            site.LoggerId !== undefined &&
            site.LoggerId !== ''
        ) {
            let nowTime = new Date(Date.now());

            let tempResult = { ...site._doc };
            tempResult.ListChannel = [];

            let timeDelay = 60;

            if (
                site.TimeDelay != 'null' &&
                site.TimeDelay != null &&
                site.timeDelay != undefined
            ) {
                timeDelay = site[0].TimeDelay;
            }

            let currentQuantityForward = 0;
            let currentQuantityReverse = 0;
            let zeroQuantityForward = 0;
            let zeroQuantityReverse = 0;

            let channelForward = '';
            let channelReverse = '';
            let commonDate = null;

            let channels = await ChannelModel.find({
                LoggerId: site.LoggerId,
            }).sort({
                ChannelName: 1,
            });

            for (let channel of channels) {
                let isError = false;
                let status;
                if (isError == false) {
                    if (channel.TimeStamp != null) {
                        let diff = Math.round(
                            (Date.now() - channel.TimeStamp.getTime()) /
                                1000 /
                                60,
                        );
                        if (diff > timeDelay * timeconnect) {
                            status = 6;
                            isError = true;
                        }
                    }
                }
                if (isError == false) {
                    if (
                        channel.Pressure1 == true ||
                        channel.Pressure2 == true
                    ) {
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
                tempResult.ListChannel.push(obj);
            }

            if (site) {
                let quantity = 0;

                let objChannelQuantity = {};
                objChannelQuantity.ChannelId = site.LoggerId + '_102';
                objChannelQuantity.ChannelName = 'SLN';
                objChannelQuantity.LoggerId = site.LoggerId;
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

                    tempResult.ListChannel.push(objChannelQuantity);
                }
            }
            result.push(tempResult);
        }
    }

    res.json(result);
};

module.exports.GetSiteByDisplayGroup = async function (req, res) {
    const displayGroup = req.params.displayGroup;

    res.json(
        await SiteModel.find({
            DisplayGroup: displayGroup,
            IsConnectPipe: false,
        }),
    );
};

module.exports.GetSiteBySiteId = async function (req, res) {
    const siteid = req.params.siteid;

    res.json(await SiteModel.find({ SiteId: siteid, IsConnectPipe: false }));
};

module.exports.GetSiteForSWOC = async function (req, res) {
    const result = [];

    const data = await SiteModel.find({ IsConnectPipe: false }).sort({
        SiteId: 1,
    });

    for (const item of data) {
        const obj = {};
        obj.Name = item.SiteId;
        obj.LoggerId = item.LoggerId;
        obj.Model = null;
        obj.localInstall = item.Location;
        obj.Latitude = item.Latitude;
        obj.Longitude = item.Longitude;
        obj.roleOfLogger = null;
        obj.Status = null;

        result.push(obj);
    }

    res.status(200).json(result);
};

module.exports.InsertSite = async function (req, res) {
    const data = req.body;

    let check = await SiteModel.find({ SiteId: data.SiteId });

    if (check.length == 0) {
        let result = await SiteModel.insertMany([
            {
                SiteId: data.SiteId,
                Location: data.Location,
                Latitude: data.Latitude,
                Longitude: data.Longitude,
                DisplayGroup: data.DisplayGroup,
                LoggerId: data.LoggerId,
                StartDay: data.StartDay,
                StartHour: data.StartHour,
                Status: data.Status,
                PipeSize: data.PipeSize,
                InterVal: data.Interval,
                Available: data.Available,
                TimeDelay: data.TimeDelay,
                Note: data.Note.replaceAll('|', '/'),
                OtherDevice: data.OtherDevice,
                IsDisplay: data.IsDisplay,
                IsValve: data.IsValve,
                IsConnectPipe: data.IsConnectPipe,
                MeterSerial: data.MeterSerial,
                LoggerSerial: data.LoggerSerial,
            },
        ]);

        if (result.length > 0) {
            res.json(result[0]._id);
        } else {
            res.json(0);
        }
    } else {
        res.json(0);
    }
};

module.exports.UpdateSite = async function (req, res) {
    const data = req.body;

    let result = await SiteModel.updateOne(
        { _id: data._id },
        {
            SiteId: data.SiteId,
            Location: data.Location,
            Latitude: data.Latitude,
            Longitude: data.Longitude,
            DisplayGroup: data.DisplayGroup,
            LoggerId: data.LoggerId,
            StartDay: data.StartDay,
            StartHour: data.StartHour,
            Status: data.Status,
            PipeSize: data.PipeSize,
            InterVal: data.Interval,
            Available: data.Available,
            TimeDelay: data.TimeDelay,
            Note: data.Note.replaceAll('|', '/'),
            OtherDevice: data.OtherDevice,
            IsDisplay: data.IsDisplay,
            IsValve: data.IsValve,
            IsConnectPipe: data.IsConnectPipe,
            MeterSerial: data.MeterSerial,
            LoggerSerial: data.LoggerSerial,
        },
    );

    res.json(result.nModified);
};

module.exports.DeleteSite = async function (req, res) {
    let id = req.params.id;
    if (id == 'null') {
        id = '';
    }

    let result = await SiteModel.deleteOne({ _id: id });

    let result2 = await ConsumerSiteModel.deleteOne({ IdSite: id });

    let result3 = await StaffSiteModel.deleteOne({ IdSite: id });

    res.json(result.deletedCount);
};

module.exports.UpdateNoteBySiteId = async function (req, res) {
    let { id, note } = req.body;

    let result = await SiteModel.updateOne({ _id: id }, { Note: note });

    res.json(result.nModified);
};
