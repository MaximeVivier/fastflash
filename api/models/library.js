const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const librarySchema = new Schema({
    name: String,
    recto_type:String,
    verso_type:String,

});

module.exports = mongoose.model('Library', librarySchema);