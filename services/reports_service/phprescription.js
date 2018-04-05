/**
 * Created by Aadil on 4/29/2017.
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
    deliveredDrugs:[],
    undeliveredDrugs:[]
});

const phPrescription = mongoose.model('phPrescription',phPrescriptionSchema);

module.exports = phPrescription;