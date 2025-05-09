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
    let data = req.body;

    let result = await PipeModel.insertMany([data]);

    if (result.length > 0) {
        res.json(result[0]._id);
    } else {
        res.json(0);
    }
};

module.exports.Update = async (req, res) => {
    let data = req.body;
    let result = await PipeModel.findByIdAndUpdate(data._id, data);

    if (result.modifiedCount > 0) {
        res.json(1);
    } else {
        res.json(0);
    }
};

module.exports.Delete = async (req, res) => {
    let data = req.body;
    let result = await PipeModel.deleteOne({ _id: data._id });

    if (result.deletedCount > 0) {
        res.json(1);
    } else {
        res.json(0);
    }
};
