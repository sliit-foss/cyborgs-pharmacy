/**
 * Created by root on 7/1/17.
 */
const mongoose = require('mongoose');

//dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server')
const should = chai.should();

chai.use(chaiHttp);

describe('Logs', function(){
//    test GET
    describe('GET logs', function(){
        //get all the logs
        it('should get all the logs', function(done){
            chai.request(server)
                .get('/logs')
                .end(function(err,res){
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                })
        })
    })
})

