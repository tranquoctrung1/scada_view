const mongoose = require('mongoose');

var ConditionIconShcema = new mongoose.Schema({
    Name: String,
    Value: Number,
});

var ConditionIcon = mongoose.model(
    'ConditionIcon',
    ConditionIconShcema,
    't_ConditionIcon',
);

module.exports = ConditionIcon;
