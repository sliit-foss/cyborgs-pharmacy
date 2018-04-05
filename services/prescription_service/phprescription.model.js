/**
 * Created by Aadil on 6/28/2017.
 */
'use strict'

const mongoose = require('mongoose');

const phPrescriptionSchema = new mongoose.Schema({
    phpId:{ type:Number, required: true, unique:true},
    dName:{ type:String, required: true},
    phName:{ type:String, required: true},
    pName:{ type:String, required: true},
    pAge:{ type:Number, required: true},
    date:{ type:Date, required: true},
    deliveredDrugs:[]
});

const phPrescription = mongoose.model('phPrescription',phPrescriptionSchema);

module.exports = phPrescription;