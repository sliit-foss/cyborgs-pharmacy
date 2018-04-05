/**
 * Created by ishan on 4/27/17.
 */
'use strict'

const drug = require('./drug.model');
const nodemailer = require('nodemailer');

exports.getAllDrugDetails= function (req,res) {
    drug.find({},function (err,docs) {
        if(err){
            console.log(err);
        }
        res.json(docs);
    })
};

exports.getDrugDetails= function (req,res) {
    var id = req.params.id;
    drug.find({'dName':id},function (err,docs) {
        if(err){
            console.log(err);
        }
        res.json(docs);
    })
};

exports.getDrugNamesByCat = function (req,res) {
    var category = req.params.id;

    drug.find({'dCategory':category},function (err,data) {
        if(err){
            console.log(err);
        }
        var obj = [];
        for (var i=0;i<data.length;i++){
            obj[i]={'dId':data[i].dId,'dName':data[i].dName};
        }

        res.json(obj);
    })
};

exports.getCatList = function (req,res) {
    drug.find({}).distinct('dCategory',function (err,data) {
        if(err){
            console.log(err);
        }
        res.json(data);
    });

};

exports.getDrugNames = function (req,res) {
    drug.find({}).distinct('dName',function (err,names) {
        if(err){
            console.log(err);
        }
        res.json(names);
    });
};

exports.addNewDrug = function (req,res) {

    drug.find({},function(err,data){
        var lastId=0;
        if(err){
            var msg = {
                "message":"error"
            }
            res.send(msg);
            return;
        }

        for(var j=0;j<data.length;j++){
            lastId=data[j].dId;
        }
        lastId++;
        var data2 = req.body;
        data2.dId = lastId;
        var newDrug = new drug(data2)

        newDrug.save(function (err) {
            if(err){
                res.send(err);
                return;
            }

            var msg = {
                "message":"success"
            }
            res.send(msg);
        });
    });


};

exports.updateDrug = function (req,res) {
    console.log(req.body)
    drug.update({dId:req.body.dId},{
        $set:{
            dPrice:req.body.dPrice,
            dangerLevel:req.body.dangerLevel,
            reorderLevel:req.body.reorderLevel,
            dRemarks:req.body.dRemarks
        }
    },function (err,data) {
            if(err){
                var msg = {
                    "message":"error"
                }
                console.log(err);
                res.send(msg);
                return;
            }
            var msg = {
                "message":"success"
            }
            res.send(msg);
    })
}


exports.sendMail = function (req,res) {
    let transporter = nodemailer.createTransport({
        service:"Gmail",
        secure: true, // secure:true for port 465, secure:false for port 587
        auth: {
            user: 'shalanicuty@gmail.com',
            pass: 'cats4ever2009'
        }
    });

    let mailOptions = {
        "from":req.body.from,
        "to":req.body.to,
        "subject":req.body.subject,
        "text":req.body.text
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            var msg ={
                "message":"error"
            }
            console.log(error);
            res.send(msg);
            return;
        }

        var msg ={
            "message":"success"
    }
        res.send(msg);

    });
}