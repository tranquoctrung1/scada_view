const mongoose = require('mongoose');

var groupPipeSchema = new mongoose.Schema({
    GroupPipeId: String,
    Name: String,
    Description: String,
    Color: String,
    SiteIdStart: String,
    SiteIdEnd: String,
});

var GroupPipe = mongoose.model('GroupPipe', groupPipeSchema, 't_GroupPipe');

module.exports = GroupPipe;
