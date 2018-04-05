/**
 * Created by Aadil on 7/1/2017.
 */
const mongoose = require('mongoose');
const dPrescription = require('./dprescription.model');

//dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server')
const should = chai.should();

chai.use(chaiHttp);

describe('dPrescriptions', function(){
    this.timeout(15000);
//    test GET route
    describe('GET dprescriptions', function(){

        it('should get all the doctor prescriptions', function(done){
            chai.request(server)
                .get('/prescription/doctor')
                .end(function(err,res){
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                })
        })

        //get doctor prescription by the id
        it('should get the doctor prescription by id', function(done){
            chai.request(server)
                .get('/prescription/doctor/1')
                .end(function(err,res){
                    res.should.have.status(200);
                    res.body.should.have.property('dpId').eql(1);
                    res.body.should.have.property('dName').eql('Sahan');
                    res.body.should.have.property('pName').eql('Perera');
                    res.body.should.have.property('pAge').eql(45);
                    res.body.should.have.property('date');
                    res.body.should.have.property('availableDrugs');
                    res.body.should.have.property('unavailableDrugs');
                    done();
                })
        })
        //get doctor prescription by doctor name
        it('should get the doctor prescription by id', function(done){
            chai.request(server)
                .get('/prescription/doctor/pname/Perera')
                .end(function(err,res){
                    res.should.have.status(200);
                    res.body.should.have.property('dpId').eql(1);
                    res.body.should.have.property('dName').eql('Sahan');
                    res.body.should.have.property('pName').eql('Perera');
                    res.body.should.have.property('pAge').eql(45);
                    res.body.should.have.property('date');
                    res.body.should.have.property('availableDrugs');
                    res.body.should.have.property('unavailableDrugs');
                    done();
                })
        })
    })

})