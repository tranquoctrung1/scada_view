const DeviceMeterModel = require('../../model/DeviceMeter');

module.exports.GetAllDeviceMeter = async function (req, res) {
    let result = await DeviceMeterModel.find({});

    res.json(result);
};

module.exports.GetDeviceMeterBySerial = async function (req, res) {
    let serial = req.params.serial;

    let result = await DeviceMeterModel.find({ Serial: serial });

    res.json(result);
};

module.exports.InsertDeviceMeter = async function (req, res) {
    let serial = req.params.serial;
    if (serial == 'null') {
        serial = '';
    }
    let date = req.params.datePushStock;
    if (date == 'null' || date == 'NaN') {
        date = new Date(Date.now());
    } else {
        date = new Date(parseInt(date));
    }

    let producer = req.params.producer;
    if (producer == 'null') {
        producer = '';
    }
    let branch = req.params.branch;
    if (branch == 'null') {
        branch = '';
    }
    let model = req.params.model;
    if (model == 'null') {
        model = '';
    }
    let status = req.params.status;
    if (status == 'null') {
        status = '';
    }
    let note = req.params.note;
    if (note == 'null') {
        note = '';
    }
    let isInstall = req.params.isInstall;
    if (isInstall == 'null') {
        isInstall = false;
    }
    let urlUploadFile = req.params.urlUploadFile;
    if (isInstall == 'null') {
        isInstall = '';
    }

    let check = await DeviceMeterModel.find({ Serial: serial });

    if (check.length == 0) {
        let result = await DeviceMeterModel.insertMany([
            {
                Serial: serial,
                DatePushStock: date,
                Producer: producer,
                Branch: branch,
                Model: model,
                Status: status,
                Note: note,
                IsInstall: isInstall,
                urlUploadFile: urlUploadFile,
            },
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

module.exports.UpdateDeviceMeter = async function (req, res) {
    let id = req.params.id;
    let serial = req.params.serial;
    if (serial == 'null') {
        serial = '';
    }
    let date = req.params.datePushStock;
    if (date == 'null' || date == 'NaN') {
        date = new Date(Date.now());
    } else {
        date = new Date(parseInt(date));
    }

    let producer = req.params.producer;
    if (producer == 'null') {
        producer = '';
    }
    let branch = req.params.branch;
    if (branch == 'null') {
        branch = '';
    }
    let model = req.params.model;
    if (model == 'null') {
        model = '';
    }
    let status = req.params.status;
    if (status == 'null') {
        status = '';
    }
    let note = req.params.note;
    if (note == 'null') {
        note = '';
    }
    let isInstall = req.params.isInstall;
    if (isInstall == 'null') {
        isInstall = false;
    }
    let urlUploadFile = req.params.urlUploadFile;
    if (isInstall == 'null') {
        isInstall = '';
    }

    let result = await DeviceMeterModel.updateOne(
        { _id: id },
        {
            Serial: serial,
            DatePushStock: date,
            Producer: producer,
            Branch: branch,
            Model: model,
            Status: status,
            Note: note,
            IsInstall: isInstall,
            urlUploadFile: urlUploadFile,
        },
    );

    res.json(result.nModified);
};

module.exports.DeleteDeviceMeter = async function (req, res) {
    let id = req.params.id;

    let result = await DeviceMeterModel.deleteOne({
        _id: id,
    });

    res.json(result.deletedCount);
};
