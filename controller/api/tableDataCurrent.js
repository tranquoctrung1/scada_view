const mongoose = require("mongoose");
const SiteModel = require("../../model/site");
const UserModel = require("../../model/user");
const ChannelModel = require("../../model/Channel.js");
const ConsumerSiteModel = require("../../model/consumerSite");
const StaffSiteModel = require("../../model/staffSite");

module.exports.GetTableDataCurrent = async function (req, res) {
  const userid = req.params.userid;

  let user = await UserModel.findOne({ Username: userid });

  let listSite;

  if (user.Role == "admin") {
    listSite = await SiteModel.find({});
  } else if (user.Role == "consumer") {
    let listIdSite = await ConsumerSiteModel.find(
      { IdUser: user._id },
      { IdSite: 1, _id: 0 }
    );

    let list = [];

    for (let item of listIdSite) {
      list.push(item.IdSite);
    }

    if (listIdSite.length > 0) {
      listSites = await SiteModel.find({ _id: { $in: list } });
    } else {
      listSite = [];
    }

    //listSite = await SiteModel.find({ ConsumerId: user.ConsumerId });
  } else if (user.Role == "staff") {
    let listIdSite = await StaffSiteModel.find(
      { IdUser: user._id },
      { IdSite: 1, _id: 0 }
    );

    let list = [];

    for (let item of listIdSite) {
      list.push(item.IdSite);
    }

    if (listIdSite.length > 0) {
      listSite = await SiteModel.find({ _id: { $in: list } });
    } else {
      listSite = [];
    }
    //listSite = await SiteModel.find({ StaffId: user.StaffId });
  } else {
    listSite = await SiteModel.find({});
  }

  let result = [];

  for (let site of listSite) {
    let listChannels = await ChannelModel.find({ LoggerId: site.LoggerId });

    let obj = {};
    obj.SiteId = site.SiteId;
    obj.Location = site.Location;
    obj.LoggerId = site.LoggerId;
    obj.ListChannel = [];

    for (let channel of listChannels) {
      let obj2 = {};
      obj2.ChannelId = channel.ChannelId;
      obj2.ChannelName = channel.ChannelName;
      obj2.TimeStamp = channel.TimeStamp;
      obj2.Value = channel.LastValue;
      obj2.Unit = channel.Unit;

      obj.ListChannel.push(obj2);
    }

    result.push(obj);
  }

  res.json(result);
};
