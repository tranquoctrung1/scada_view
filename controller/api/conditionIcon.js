const ConditionIconModel = require('../../model/ConditionIcon');

module.exports.GetConditionIcon = async function (req, res) {
    res.json(await ConditionIconModel.find({}));
};

module.exports.Insert = async function (req, res) {
    const data = req.body;

    let check = await ConditionIconModel.find({ Name: data.Name });

    if (check.length == 0) {
        let result = await ConditionIconModel.insertMany([
            { Name: data.Name, Value: data.Value },
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

module.exports.Update = async function (req, res) {
    const data = req.body;

    let result = await ConditionIconModel.updateOne(
        { Name: data.Name },
        { Value: data.Value },
    );

    res.json(result.nModified);
};

module.exports.Delete = async function (req, res) {
    const data = req.body;

    let result = await ConditionIconModel.deleteOne({ Name: data.Name });

    res.json(result.deletedCount);
};
