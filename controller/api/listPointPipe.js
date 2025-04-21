const ListPointPipeModel = require('../../model/ListPointPipe');
const SiteModel = require('../../model/site');
const PipeModel = require('../../model/Pipe');

module.exports.GetListPointPipes = async (req, res) => {
    let result = await ListPointPipeModel.find({}).sort({ STT: 1 });

    res.json(result);
};

module.exports.GetListPointPipeByPipeId = async (req, res) => {
    let pipeid = req.params.pipeid;

    let result = await ListPointPipeModel.find({ PipeId: pipeid }).sort({
        STT: 1,
    });

    res.json(result);
};

module.exports.GetListPointPermissionPipe = async (req, res) => {
    let pipeid = req.params.pipeid;

    let listIdSite = await ListPointPipeModel.find({ PipeId: pipeid });

    let list = [];

    for (let item of listIdSite) {
        list.push(item.PointId);
    }

    if (listIdSite.length > 0) {
        let result = await SiteModel.find({ _id: { $in: list } });

        res.json(result);
    } else {
        res.json([]);
    }
};

module.exports.GetPipePermissionGroupPipe = async (req, res) => {
    let result = [];

    let grouppipeid = req.params.grouppipeid;

    let listPipeId = await ListPointPipeModel.find({
        GroupPipeId: grouppipeid,
    });

    let list = [];

    for (let item of listPipeId) {
        list.push(item.PipeId);
    }

    console.log(list);

    if (listPipeId.length > 0) {
        result = await PipeModel.find({ _id: { $in: list } });
    } else {
        result = [];
    }

    let returnValue = [];

    if (result.length > 0) {
        for (const item of result) {
            const t = JSON.parse(JSON.stringify(item));
            const obj = {
                PipeId: t._id,
                PipeName: t.features[0].properties.OBJECTID,
            };

            returnValue.push(obj);
        }
    }

    res.json(returnValue);
};

module.exports.GetListPointNotPermissionPipe = async (req, res) => {
    let pipeid = req.params.pipeid;

    let listIdSite = await ListPointPipeModel.find({ PipeId: pipeid });

    let list = [];

    for (let item of listIdSite) {
        list.push(item.PointId);
    }

    if (listIdSite.length > 0) {
        let result = await SiteModel.find({ _id: { $nin: list } });

        res.json(result);
    } else {
        res.json(await SiteModel.find({}).sort({ SiteId: 1 }));
    }
};

module.exports.GetPipeNotPermissionGroupPipe = async (req, res) => {
    try {
        let result = [];

        let grouppipeid = req.params.grouppipeid;

        let listPipeId = await ListPointPipeModel.find({
            GroupPipeId: grouppipeid,
        });

        let list = [];

        for (let item of listPipeId) {
            list.push(item.PipeId);
        }

        if (listPipeId.length > 0) {
            result = await PipeModel.find({ _id: { $nin: list } });
        } else {
            result = await PipeModel.find({}).sort({ _id: 1 });
        }

        let returnValue = [];

        if (result.length > 0) {
            for (const item of result) {
                const t = JSON.parse(JSON.stringify(item));
                const obj = {
                    PipeId: t._id,
                    PipeName: t.features[0].properties.OBJECTID,
                };

                returnValue.push(obj);
            }
        }

        res.json(returnValue);
    } catch (err) {
        console.log(err);
    }
};

module.exports.Update = async (req, res) => {
    try {
        let list = req.body;

        await ListPointPipeModel.deleteMany({ GroupPipeId: list.GroupPipeId });

        const result = await ListPointPipeModel.insertMany(list.Data);

        res.json(result.length);
    } catch (err) {
        console.log(err);
    }
};
