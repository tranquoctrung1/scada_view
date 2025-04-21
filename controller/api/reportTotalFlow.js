const ChannelModel = require('../../model/Channel.js');
const SiteModel = require('../../model/site');
const mongoose = require('mongoose');

module.exports.GetDataReportTotalFlow = async (req, res) => {
    let resultReturned = [];

    try {
        const { start } = req.query;

        let timeStart = new Date(parseInt(start));
        let timeEnd = new Date(parseInt(start));
        timeEnd.setDate(timeEnd.getDate() + 1);

        let sites = await SiteModel.find({});

        if (sites.length > 0) {
            for (let site of sites) {
                if (
                    site.LoggerId !== undefined &&
                    site.LoggerId !== null &&
                    site.LoggerId !== ''
                ) {
                    let channels = await ChannelModel.find({
                        LoggerId: site.LoggerId,
                        ForwardFlow: true,
                    });

                    if (channels.length > 0) {
                        for (let channel of channels) {
                            if (
                                channel.ChannelId !== undefined &&
                                channel.ChannelId !== null &&
                                channel.ChannelId !== ''
                            ) {
                                if (
                                    site.LoggerId === '1397' ||
                                    site.LoggerId === '1199' ||
                                    site.LoggerId === '1479' ||
                                    site.LoggerId === '1226' ||
                                    site.LoggerId === '1362' ||
                                    site.LoggerId === '1216' ||
                                    site.LoggerId === '1493'
                                ) {
                                    channel.ChannelId = site.LoggerId + '_03';
                                }

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

                                let result = await DataLogger.find({
                                    TimeStamp: {
                                        $gte: timeStart,
                                        $lt: timeEnd,
                                    },

                                    $expr: {
                                        $and: [
                                            {
                                                $eq: [
                                                    { $minute: '$TimeStamp' },
                                                    0,
                                                ],
                                            },
                                            {
                                                $eq: [
                                                    { $second: '$TimeStamp' },
                                                    0,
                                                ],
                                            },
                                        ],
                                    },
                                });

                                if (result.length > 0) {
                                    let obj = {};
                                    obj.LoggerId = site.LoggerId;

                                    obj.Data = result;

                                    resultReturned.push(obj);
                                }
                            }
                        }
                    }
                }
            }
        }
    } catch (e) {
        console.log(e);
    }

    res.json(resultReturned);
};
