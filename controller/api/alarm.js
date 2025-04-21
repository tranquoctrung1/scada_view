const AlarmModel = require('../../model/Alarm');
const SiteModel = require('../../model/site');
const ChannelModel = require('../../model/Channel');
const ConditionIconModel = require('../../model/ConditionIcon');

module.exports.GetAlarmForDay = async function (req, res) {
    let timestart = new Date();
    timestart.setHours(timestart.getHours() + 6);
    let timeend = new Date();
    timeend.setHours(timeend.getHours() + 7);

    let result = await AlarmModel.find({
        TimeStamp: { $gte: timestart, $lte: timeend },
    }).sort({ TimeStamp: -1 });

    let temp = [];

    for (let item of result) {
        if (
            item.SiteId != '' &&
            item.SiteId != null &&
            item.SiteId != undefined
        ) {
            let find = temp.find((el) => el.SiteId == item.SiteId);

            if (temp.length == 0 || find == undefined) {
                temp.push(item);
            }
        }
    }

    res.json(temp);
};

module.exports.GetAlarm = async function (req, res) {
    let timestart = new Date();
    timestart.setDate(timestart.getDate() - 7);
    timestart.setHours(timestart.getHours() + 7);
    let timeend = new Date();
    timeend.setHours(timeend.getHours() + 7);

    let result = await AlarmModel.find({
        TimeStamp: { $gte: timestart, $lte: timeend },
    }).sort({ TimeStamp: -1 });

    let temp = [];

    for (let item of result) {
        if (
            item.SiteId != '' &&
            item.SiteId != null &&
            item.SiteId != undefined
        ) {
            let find = temp.find((el) => el.SiteId == item.SiteId);

            if (temp.length == 0 || find == undefined) {
                temp.push(item);
            }
        }
    }

    res.json(temp);
};

module.exports.GetCommonAlarm = async function (req, res) {
    let timestart = new Date();
    timestart.setDate(timestart.getDate() - 7);
    timestart.setHours(timestart.getHours() + 7);
    let timeend = new Date();
    timeend.setHours(timeend.getHours() + 7);

    let result = await AlarmModel.find({
        TimeStamp: { $gte: timestart, $lte: timeend },
    }).sort({ TimeStamp: -1 });

    let temp = [];

    for (let item of result) {
        if (
            item.SiteId != '' &&
            item.SiteId != null &&
            item.SiteId != undefined
        ) {
            let find = temp.find((el) => el.SiteId == item.SiteId);

            if (temp.length == 0 || find == undefined) {
                item.Status = 1;
                temp.push(item);
            }
        }
    }

    let sites = await SiteModel.find({ IsDisplay: true });

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

    let timeDelay = 60;

    if (sites.length > 0) {
        for (let site of sites) {
            if (site.length > 0) {
                if (
                    site[0].TimeDelay != 'null' &&
                    site[0].TimeDelay != null &&
                    site[0].timeDelay != undefined
                ) {
                    timeDelay = site[0].TimeDelay;
                }
            }

            let channels = await ChannelModel.find({ LoggerId: site.LoggerId });
            if (channels.length > 0) {
                let isError = false;
                for (let channel of channels) {
                    if (isError == false) {
                        if (channel.TimeStamp != null) {
                            let diff = Math.round(
                                (Date.now() - channel.TimeStamp.getTime()) /
                                    1000 /
                                    60,
                            );
                            if (diff > timeDelay * timeconnect) {
                                let find = temp.find(
                                    (el) => el.SiteId == site.SiteId,
                                );

                                if (temp.length == 0 || find == undefined) {
                                    let obj = {};
                                    obj.TimeStamp = channel.TimeStamp;
                                    obj.SiteId = site.SiteId;
                                    obj.Location = site.Location;
                                    obj.DisplayGroup = site.DisplayGroup;
                                    obj.ChannelName = '';
                                    obj.Value = null;
                                    obj.BaseMin = null;
                                    obj.BaseMax = null;
                                    obj.Content = 'Mất tín hiệu (> 12h)';
                                    obj.Status = 2;

                                    temp.push(obj);
                                }

                                isError = true;
                            }
                        }
                    }
                }

                let channelPressure = channels.filter(
                    (el) => el.Pressure1 == true || el.Pressure2 == true,
                );

                if (channelPressure.length > 0) {
                    let find = temp.find((el) => el.SiteId == site.SiteId);

                    if (temp.length == 0 || find == undefined) {
                        let obj = {};
                        obj.TimeStamp = new Date();
                        obj.SiteId = site.SiteId;
                        obj.Location = site.Location;
                        obj.DisplayGroup = site.DisplayGroup;
                        obj.ChannelName = '';
                        obj.Value = null;
                        obj.BaseMin = null;
                        obj.BaseMax = null;
                        obj.Content = 'Không có kênh áp lực';
                        obj.Status = 3;

                        temp.push(obj);
                    }
                }
            }
        }
    }

    res.json(temp);
};
