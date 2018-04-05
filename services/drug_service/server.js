/**
 * Created by ishan on 6/28/17.
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
var drugController = require('./drug.controller');
var batchController = require('./batch.controller');

//database connection
mongoose.connect('mongodb://cyborg_root:pass123$@ds149800.mlab.com:49800/pharmacy',function(){
    console.log('connection successful');
}, function(error){
    console.log(error);
});

//port for the server to listen on
var port = process.env.PORT || 9002;

app.listen(port, function(){
    console.log("Listening on port "+port);
});

//drug routes
app.get('/drug/details/:id',drugController.getDrugDetails);
app.get('/drug/name/:id',drugController.getDrugNamesByCat);
app.get('/drug/category',drugController.getCatList);
app.get('/drug/name',drugController.getDrugNames);
app.post('/drug',drugController.addNewDrug);
app.put('/drug',drugController.updateDrug);
app.get('/drug',drugController.getAllDrugDetails);
app.post('/drug/mail',drugController.sendMail);

//batch routes
app.post('/batch',batchController.addBatch);

//for testing
module.exports = app;