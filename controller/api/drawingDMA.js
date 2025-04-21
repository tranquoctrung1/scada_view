const DMADrawing = require('../../model/DmaDrawing');

module.exports.GetDmaDrawing = async (req, res) => {
    res.json(await DMADrawing.find({}));
};
