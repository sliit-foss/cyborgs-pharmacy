/**
 * Created by root on 6/30/17.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogSchema = new Schema({
    description: { type:String, required:true },
    date: { type:String, required:true },
    time: { type:String, required:true }
})

module.exports = mongoose.model('Log', LogSchema);