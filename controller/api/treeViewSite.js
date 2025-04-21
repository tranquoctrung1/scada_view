const SiteModel = require('../../model/site');
const UserModel = require('../../model/user');
const ConsumerSiteModel = require('../../model/consumerSite');
const StaffSiteModel = require('../../model/staffSite');
const ChannelConfigModel = require('../../model/Channel');

module.exports.GetSiteTreView = async function (req, res) {
    const userid = req.params.userid;
    let dataPayload = [];

    let user = await UserModel.findOne({ Username: userid });
    let listChannel = await ChannelConfigModel.find({});

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

    if (listSite.length > 0) {
        for (let s of listSite) {
            let index = 0;
            let hasDisplayGroup = false;
            let obj = {};
            if (dataPayload.length != 0) {
                for (let item of dataPayload) {
                    if (item.hasOwnProperty('DisplayGroup')) {
                        if (s.DisplayGroup == item.DisplayGroup) {
                            hasDisplayGroup = true;
                            break;
                        } else {
                            index += 1;
                        }
                    }
                }
                if (!hasDisplayGroup == true) {
                    obj.DisplayGroup = s.DisplayGroup;
                    obj.LoggerId = s.LoggerId;
                    obj.data = [];
                }
            } else {
                obj.DisplayGroup = s.DisplayGroup;
                obj.LoggerId = s.LoggerId;
                obj.data = [];
            }

            let logger;

            if (
                s.LoggerId != null &&
                s.LoggerId != undefined &&
                s.LoggerId.trim() != ''
            ) {
                logger = s.LoggerId.trim();
            } else {
                logger = 'nothing';
            }

            let channels = listChannel.filter((el) => el.LoggerId === logger);

            if (hasDisplayGroup == true) {
                if (channels.length > 0) {
                    let obj2 = {};
                    obj2.name = s.SiteId;
                    obj2.location = s.Location;
                    obj2.loggerid = s.LoggerId;
                    obj2.data = [];

                    for (let item of channels) {
                        obj2.data.push({
                            ChannelName: item.ChannelName,
                            ChannelId: item.ChannelId,
                        });
                    }
                    dataPayload[index].data.push(obj2);
                }
            } else {
                if (channels.length > 0) {
                    let obj2 = {};
                    obj2.name = s.SiteId;
                    obj2.location = s.Location;
                    obj2.loggerid = s.LoggerId;
                    obj2.data = [];

                    for (let item of channels) {
                        obj2.data.push({
                            ChannelName: item.ChannelName,
                            ChannelId: item.ChannelId,
                        });
                    }
                    obj.data.push(obj2);
                    dataPayload.push(obj);
                }
            }
        }
    }

    res.json(dataPayload);
};
