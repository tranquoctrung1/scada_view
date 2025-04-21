const ValveStateModel = require('../../model/ValveState');

module.exports.GetRequestStateByLoggerId = async (req, res) => {
    const loggerid = req.params.loggerid;

    res.json(await ValveStateModel.find({ LoggerId: loggerid }));
};

module.exports.UpdateRequestState = async (req, res) => {
    const state = req.body;

    const check = await ValveStateModel.find({ LoggerId: state.LoggerId });

    if (check.length <= 0) {
        let temp = await ValveStateModel.insertMany([
            { LoggerId: state.LoggerId, RequestState: state.RequestState },
        ]);

        if (temp.length > 0) {
            res.json(temp[0]._id);
        } else {
            res.json('');
        }
    } else {
        let result = await ValveStateModel.updateOne(
            { LoggerId: state.LoggerId },
            { RequestState: state.RequestState },
        );

        res.json(result.nModified);
    }
};
