const PipeModel = require('../../model/Pipe');

module.exports.GetPipes = async (req, res) => {
    let result = await PipeModel.find({}).sort({ PipeId: 1 });

    res.json(result);
};

module.exports.GetPipeByPipeId = async (req, res) => {
    let pipeid = req.params.pipeid;

    let result = await PipeModel.find({ PipeId: pipeid }).sort({ PipeId: 1 });

    res.json(result);
};

module.exports.Insert = async (req, res) => {
    let pipe = req.body;

    pipe.SetPrioritize =
        pipe.SetPrioritize !== undefined
            ? +pipe.SetPrioritize
            : pipe.SetPrioritize;

    let check = await PipeModel.find({
        PipeId: pipe.PipeId,
    });

    if (check.length === 0) {
        let result = await PipeModel.insertMany([pipe]);

        if (result.length > 0) {
            res.json(result[0]._id);
        } else {
            res.json(0);
        }
    } else {
        res.json(0);
    }
};

module.exports.Update = async (req, res) => {
    try {
        let pipe = req.body;

        let result = await PipeModel.updateMany(
            { _id: pipe._id },
            {
                $set: {
                    PipeId: pipe.PipeId,
                    Name: pipe.Name,
                    Description: pipe.Description,
                    GroupPipeId: pipe.GroupPipeId,
                    Size: pipe.Size,
                    Length: pipe.Length,
                    TypeChannelAlarm: pipe.TypeChannelAlarm,
                    BaseMax: pipe.BaseMax,
                    BaseMin: pipe.BaseMin,
                    ColorBaseMax: pipe.ColorBaseMax,
                    ColorBaseMin: pipe.ColorBaseMin,
                    SetPrioritize:
                        pipe.SetPrioritize !== undefined
                            ? +pipe.SetPrioritize
                            : pipe.SetPrioritize,
                },
            },
        );

        res.json(result.nModified);
    } catch (error) {
        console.log(error);
    }
};

module.exports.Delete = async (req, res) => {
    let pipe = req.body;

    let result = await PipeModel.deleteOne({
        _id: pipe._id,
    });

    res.json(result.deletedCount);
};
