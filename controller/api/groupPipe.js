const GroupPipeModel = require('../../model/GroupPipe');

module.exports.GetGroupPipes = async (req, res) => {
    try {
        let result = await GroupPipeModel.find({}).sort({ GroupPipeId: 1 });

        res.json(result);
    } catch (err) {
        console.log(err);
    }
};

module.exports.GetGroupPipeByGroupPipeId = async (req, res) => {
    try {
        let groupPipeId = req.params.groupPipeId;

        let result = await GroupPipeModel.find({
            GroupPipeId: groupPipeId,
        }).sort({ GroupPipeId: 1 });

        res.json(result);
    } catch (err) {
        console.log(err);
    }
};

module.exports.Insert = async (req, res) => {
    try {
        let groupPipe = req.body;

        let check = await GroupPipeModel.find({
            GroupPipeId: groupPipe.GroupPipeId,
        });

        if (check.length === 0) {
            let result = await GroupPipeModel.insertMany([groupPipe]);

            if (result.length > 0) {
                res.json(result[0]._id);
            } else {
                res.json(0);
            }
        } else {
            res.json(0);
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports.Update = async (req, res) => {
    let groupPipe = req.body;

    let result = await GroupPipeModel.updateMany(
        { _id: groupPipe._id },
        {
            $set: {
                GroupPipeId: groupPipe.GroupPipeId,
                Name: groupPipe.Name,
                Description: groupPipe.Description,
                Color: groupPipe.Color,
                SiteIdStart: groupPipe.SiteIdStart,
                SiteIdEnd: groupPipe.SiteIdEnd,
            },
        },
    );

    res.json(result.nModified);
};

module.exports.Delete = async (req, res) => {
    let groupPipe = req.body;

    let result = await GroupPipeModel.deleteMany({
        _id: groupPipe._id,
    });

    res.json(result.deletedCount);
};
