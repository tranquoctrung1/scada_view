const SiteModel = require('../../model/site');
const ChannelModel = require('../../model/Channel.js');
const UserModel = require('../../model/user');
const ConsumerSiteModel = require('../../model/consumerSite');
const StaffSiteModel = require('../../model/staffSite');
const ConditionIconModel = require('../../model/ConditionIcon.js');

module.exports.GetStatusSite = async function (req, res) {
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
            });
        } else {
            listSite = [];
        }
        //listSite = await SiteModel.find({ StaffId: user.StaffId });
    } else {
        listSite = await SiteModel.find({ IsDisplay: true });
    }

    let result = {};
    result.totalSite = 0;
    result.totalSiteHasValue = 0;
    result.totalSiteActing = 0;
    result.totalSiteDelay = 0;
    result.totalSiteNoValue = 0;
    result.totalSiteAlarm = 0;

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

    if (listSite.length > 0) {
        result.totalSite = listSite.length;

        for (let site of listSite) {
            let channels = await ChannelModel.find({ LoggerId: site.LoggerId });

            if (
                site.TimeDelay != 'null' &&
                site.TimeDelay != null &&
                site.TimeDelay != undefined
            ) {
                timeDelay = site.TimeDelay;
            }

            let isError = false;
            let noValue = 0;

            for (let channel of channels) {
                if (isError == false) {
                    if (
                        channel.TimeStamp == null ||
                        channel.TimeStamp == undefined
                    ) {
                        noValue += 1;
                    } else {
                        if (
                            Math.round(
                                (Date.now() - channel.TimeStamp.getTime()) /
                                    1000 /
                                    60,
                            ) >
                            60 * timeconnect
                        ) {
                            if (
                                site.IsValve === false ||
                                site.IsValve === undefined ||
                                site.IsValve === null
                            ) {
                                result.totalSiteDelay += 1;
                                isError = true;
                            }
                        } else {
                            let isOverflow = false;
                            if (isOverflow == false) {
                                if (channel.BaseMin != null) {
                                    if (channel.LastValue < channel.BaseMin) {
                                        result.totalSiteAlarm += 1;
                                        isOverflow = true;
                                        isError = true;
                                    }
                                }
                            }
                            if (isOverflow == false) {
                                if (channel.BaseMax != null) {
                                    if (channel.LastValue > channel.BaseMax) {
                                        result.totalSiteAlarm += 1;
                                        isOverflow = true;
                                        isError = true;
                                    }
                                }
                            }
                            if (isOverflow == false) {
                                if (channel.Baseline != null) {
                                    if (channel.LastValue > channel.BaseLine) {
                                        result.totalSiteAlarm += 1;
                                        isOverflow = true;
                                        isError = true;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            if (noValue == channels.length) {
                result.totalSiteNoValue += 1;
            } else {
                result.totalSiteHasValue += 1;
                if (isError == false) {
                    result.totalSiteActing += 1;
                }
            }
        }
    }

    res.json(result);
};
