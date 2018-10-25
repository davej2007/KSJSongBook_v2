const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requestSchema = new Schema({
    partyID : String,
    team    : {  type:mongoose.Schema.Types.ObjectId, ref : 'Team'},    
    song    : {  type:mongoose.Schema.Types.ObjectId, ref : 'Song'},
    singers : [String],
    status  : Number,
    created : Date
});

module.exports = mongoose.model('Request',requestSchema);