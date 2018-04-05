/**
 * Created by root on 7/1/17.
 */
const mongoose = require('mongoose');
const User = require('./user.model');

//dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server')
const should = chai.should();

chai.use(chaiHttp);

describe('Users', function(){
    this.timeout(15000);
    //    test POST
    describe('POST users', function(){
        //    add new user
        it('should add new user', function(done){
            const user = new User({username:"mpb123", name:"Malith", email:"mpbandara@hotmail.com", password:"P@$$malithpb123", permission:"admin"});
            user.save(function(err,user){
                chai.request(server)
                    .get('/users/'+user.username)
                    .end(function(err,res){
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('email');
                        res.body.should.have.property('name');
                        res.body.should.have.property('username');
                        res.body.should.have.property('password');
                        res.body.should.have.property('permission');
                        done();
                    })
            })
        })

        //try to add a user with an existing username
        it('should not add new user with existing username', function(done){
            const user_err = new User({username:"mpb123", name:"Malith", email:"mpb123@hotmail.com", password:"P@$$malithpb123", permission:"admin"})
            user_err.save(function(err,data){
                err.should.have.property('code').eql(11000);
            })
        })

        //try to add a user with an existing username
        it('should not add new user with existing email', function(done){
            const user_err = new User({username:"mpb1234", name:"Malith", email:"mpb123@hotmail.com", password:"P@$$malithpb123", permission:"admin"})
            user_err.save(function(err,data){
                err.should.have.property('code').eql(11000);
            })
        })

    })
//    test GET route
    describe('GET users', function(){
        //get all the users
        it('should get all the users', function(done){
            chai.request(server)
                .get('/users')
                .end(function(err,res){
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                })
        })

        //get user by the username
        it('should get the user by username', function(done){
            chai.request(server)
                .get('/users/mpb123')
                .end(function(err,res){
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('email').eql('mpbandara@hotmail.com');
                    res.body.should.have.property('name').eql('Malith');
                    res.body.should.have.property('username').eql('mpb123');
                    res.body.should.have.property('password');
                    res.body.should.have.property('permission').eql('admin');
                    done();
                })
        })
    })

//    test PUT route
    describe('PUT users', function(){
    //update user with username mpb123
        it('should update user given the username and fields', function(done){
            const user = new User({username:"ntb456", name:"Nandun", email:"ntbandara@hotmail.com", password:"P@$$nandnuntb123", permission:"chief"});
            user.save(function(err,user){
                chai.request(server)
                    .put('/users/'+user.username)
                    .send({username:"ntb456", name:"Nandun", email:"ntbandara@hotmail.com", password:"P@$$nandnuntb123", permission:"admin"})
                    .end(function(err,res){
                        res.should.have.status(201);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('User updated!');
                        done();
                    })
            })
        })
    })

//    test DELETE route
    describe('DELETE users', function(){
    //    delete user with username mpb123
        it('should delete user given the username', function(done){
            chai.request(server)
                .delete('/users/mpb123')
                .end(function(err,res){
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('User deleted!');
                    done();
                })
        })

        //    delete user with username ntb456
        it('should delete user given the username ntb456', function(done){
            chai.request(server)
                .delete('/users/ntb456')
                .end(function(err,res){
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('User deleted!');
                    done();
                })
        })
    })


})
