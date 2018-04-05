/**
 * Created by en7b33_r00t on 4/8/17.
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
var userController = require('./user.controller');

//database connection
mongoose.connect('mongodb://cyborg_root:pass123$@ds149800.mlab.com:49800/pharmacy',function(){
    console.log('connection successful');
}, function(error){
    console.log(error);
});

//port for the server to listen on
var port = process.env.PORT || 9001;

app.listen(port, function(){
    console.log("Listening on port "+port);
});

//user routes
app.get('/users', userController.users)
app.get('/users/:username', userController.userByUsername);
app.post('/users',userController.addUser);
app.put('/users/:username', userController.updateUser);
app.delete('/users/:username', userController.deleteUser);
app.post('/authenticate', userController.authenticate);
app.get('/me', userController.me);

//log routes
app.get('/logs', userController.getAllLogs);
app.post('/logs', userController.addLog);

//for testing
module.exports = app;



