/**
 * Created by Aadil on 6/28/2017.
 */
'use strict'

const mongoose = require('mongoose');

const dPrescriptionSchema = new mongoose.Schema({
    dpId:{ type:Number, required: true, unique:true},
    dName:{ type:String, required: true},
    pName:{ type:String, required: true},
    pAge:{ type:Number, required: true},
    date:{ type:Date, required: true},
    availableDrugs:[],
    unavailableDrugs:[]
});

const dPrescription = mongoose.model('dPrescription',dPrescriptionSchema);

module.exports = dPrescription;