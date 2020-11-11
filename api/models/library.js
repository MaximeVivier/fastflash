const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const librarySchema = new Schema({
    id: Number,
    recto_def:String,
    verso_def:String,
});

module.exports = mongoose.model('Library', librarySchema);