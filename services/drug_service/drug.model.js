/**
 * Created by ishan on 4/27/17.
 */
'use strict';

const mongoose = require('mongoose');

const drugSchema = new mongoose.Schema({
    "dId":{type:Number, required:true, unique:true},
    "dCategory":{type:String, required:true},
    "dName":{type:String, required:true},
    "dPrice":{type:Number, required:true},
    "dUnit":{type:String, required:true},
    "dangerLevel":{type:Number, required:true},
    "reorderLevel":{type:Number, required:true},
    "dQuantity":{type:Number, required:false, default:0},
    "dDosage":{type:String, required:false},
    "dFrequency":{type:String, required:false},
    "dRemarks":{type:String, required:false}
});

const Drug = mongoose.model('Drug',drugSchema);

module.exports = Drug;


