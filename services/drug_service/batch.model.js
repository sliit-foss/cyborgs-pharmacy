/**
 * Created by ishan on 4/28/17.
 */
'use strict';

const mongoose = require('mongoose');

const batchScema = new mongoose.Schema({
    'bId':{type:Number, required:true, unique:true},
    'bNumber':{type:String, required:true},
    'drugName':{type:String, required:true},
    'bType':{type:String, required:true},
    'bAdded':{type:Date, required:true},
    'bManufac':{type:Date, required:true},
    'bExpire':{type:Date, required:true},
    'bQuantity':{type:Number, required:true}
});

const Batch = mongoose.model('Batch',batchScema);

module.exports = Batch;