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
