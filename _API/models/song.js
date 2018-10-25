const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const songSchema = new Schema({
    artist:String,
    title:String,
    location : [ 
        {discID:String,
        file:String,
        trackNo:String} ],
    christmas : Boolean    
    
});

module.exports = mongoose.model('Song',songSchema);