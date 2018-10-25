const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const partySchema = new Schema({
    partyName:String,
    partyDate:String,
    partyType:String,
    partyPin:String,
    description:String,
    christmas:Boolean
});

module.exports = mongoose.model('Party',partySchema);