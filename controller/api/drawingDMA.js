const DMADrawing = require('../../model/DmaDrawing');

module.exports.GetDmaDrawing = async (req, res) => {
    res.json(await DMADrawing.find({}));
};

module.exports.Insert = async (req, res) => {
    let data = req.body;

    let check = await DMADrawing.find({
        'properties.IDKVCN': data.properties.IDKVCN,
    });

    if (check.length == 0) {
        let result = await DMADrawing.insertMany([data]);

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
    let data = req.body;
    let result = await DMADrawing.updateOne(
        { _id: data._id },
        { $set: { geometry: data.geometry, properties: data.properties } },
    );

    if (result.modifiedCount > 0) {
        res.json(1);
    } else {
        res.json(0);
    }
};

module.exports.Delete = async (req, res) => {
    let data = req.body;
    let result = await DMADrawing.deleteOne({ _id: data._id });

    if (result.deletedCount > 0) {
        res.json(1);
    } else {
        res.json(0);
    }
};
