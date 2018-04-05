/**
 * Created by Aadil on 6/28/2017.
 */
var express     = require('express');
var mongoose    = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//allow cross origin resource sharing
app.use(cors());

//controller
var prescriptionController = require('./prescription.controller');

//database connection
mongoose.connect('mongodb://cyborg_root:pass123$@ds149800.mlab.com:49800/pharmacy',function(){
    console.log('connection successful');
}, function(error){
    console.log(error);
});

//port for the server to listen on
var port = process.env.PORT || 9003;

app.listen(port, function(){
    console.log("Listening on port "+port);
});

//user routes
app.post('/prescription/pharmacist',prescriptionController.addPHprescription);
app.post('/prescription/doctor',prescriptionController.addDprescription);
app.get('/prescription/doctor/:number',prescriptionController.getDPrescriptionDetails);
app.get('/prescription/pharmacist/:number',prescriptionController.getPhPrescriptionDetails);
app.get('/prescription/doctor/dname/:name',prescriptionController.getDprescriptionByDocName);
app.get('/prescription/doctor/pname/:name',prescriptionController.getDprescriptionByPatientName);
app.get('/prescription/doctor/date/:date',prescriptionController.getDprescriptionByDate);
app.get('/prescription/pharmacist/date/:date',prescriptionController.getPhprescriptionByDate);
app.get('/prescription/pharmacist/dname/:name',prescriptionController.getPhprescriptionByDocName);
app.get('/prescription/pharmacist/pname/:name',prescriptionController.getPhprescriptionByPatientName);
app.get('/prescription/pharmacist/phname/:name',prescriptionController.getPhprescriptionByPharmacistName);
app.get('/prescription/doctor',prescriptionController.getDocPrescription);
app.get('/prescription/pharmacist',prescriptionController.getPhPrescription);
//app.get('/dprescription/:number',prescriptionController.getDocPrescriptionDetail);

module.exports = app;