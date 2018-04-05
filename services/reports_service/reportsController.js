/**
 * Created by owner on 4/29/2017.
 */
'use strict'

const drug = require('./drug');
const batch = require('./batch');
const phPrescription = require('./phprescription');

//view all drugs
exports.viewAllDrugs = function(req, res){
    drug.find({})
        .exec(function(err, drugs){
            if(err){
                res.send('error has occured');
            }
            else{
                res.json(drugs);
            }
        })
};

//delete expired batch

exports.deleteExpiredBatch = function(req,res){
    batch.find({ bId: req.params.bId }).remove().exec(function(err,data){
        if(err){
            res.json({ message: "Could not delete"});
        }else{
            res.json({ message: "Batch deleted!"});
        }
    })
};


//view all batches
exports.viewAllBatches = function(req, res){
    batch.find({})
        .exec(function(err, batches){
            if(err){
                res.send('error has occured');
            }
            else{
                res.json(batches);
            }
        })
};

//view batch by batchNumber
exports.viewBatchesByName = function(req, res){
    batch.find({bNumber:req.body.batchnumber})
        .exec(function(err, batches){
            if(err){
                res.send('error has occured');
            }
            else{
                res.json(batches);
            }
        })
};

//view all drugs to be expired
exports.viewBatchesToBeExpiredByDate = function(req, res){
    var reqDate = req.params.id;
    batch.find({
        bExpire:{$lt:new Date(reqDate)}
    })
        .exec(function(err, batches){
            if(err){
                res.send('error has occured');
            }
            else{
                res.json(req);
            }
        })
};

exports.viewBatchesToBeExpired = function(req, res){
    var reqDate = req.body.date;
    batch.find({
        bExpire:{$lt:new Date(reqDate)}
    })
        .exec(function(err, batches){
            if(err){
                res.send('error has occured');
            }
            else{
                res.json(batches);
            }
        })

};


//view all drugs to be expired
exports.viewUsage = function(req, res){
    phPrescription.aggregate(
        {
            "$project": {
                "y": {
                    "$year": "$date"
                },
                "m": {
                    "$month": "$date"
                }
            }
        },
        {
            "$group": {
                "_id": {
                    "year": "$y",
                    "month": "$m"
                },
                count: {
                    "$sum": 1
                }
            }
        })

        .exec(function(err, usages){
            if(err){
                res.send('error has occured' + err);
            }
            else{
                res.json(usages);
            }
        })

};



