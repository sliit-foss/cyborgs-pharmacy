/**
 * Created by Aadil on 7/1/2017.
 */
/**
 * Created by Aadil on 7/1/2017.
 */
const mongoose = require('mongoose');
const phPrescription = require('./phprescription.model');

//dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server')
const should = chai.should();

chai.use(chaiHttp);

describe('phPrescriptions', function(){
    this.timeout(15000);
//    test GET route
    describe('GET phprescriptions', function(){

        it('should get all the doctor prescriptions', function(done){
            chai.request(server)
                .get('/prescription/pharmacist')
                .end(function(err,res){
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                })
        })

        //get doctor prescription by the id
        it('should get the doctor prescription by id', function(done){
            chai.request(server)
                .get('/prescription/pharmacist/1')
                .end(function(err,res){
                    res.should.have.status(200);
                    res.body.should.have.property('dpId').eql(1);
                    res.body.should.have.property('dName').eql('Sahan');
                    res.body.should.have.property('phName').eql('Gayan');
                    res.body.should.have.property('pName').eql('Perera');
                    res.body.should.have.property('pAge').eql(45);
                    res.body.should.have.property('date');
                    res.body.should.have.property('deliveredDrugs');
                    done();
                })
        })
        //get doctor prescription by doctor name
        it('should get the doctor prescription by id', function(done){
            chai.request(server)
                .get('/prescription/pharmacist/pname/Perera')
                .end(function(err,res){
                    res.should.have.status(200);
                    res.should.have.status(200);
                    res.body.should.have.property('dpId').eql(1);
                    res.body.should.have.property('dName').eql('Sahan');
                    res.body.should.have.property('phName').eql('Gayan');
                    res.body.should.have.property('pName').eql('Perera');
                    res.body.should.have.property('pAge').eql(45);
                    res.body.should.have.property('date');
                    res.body.should.have.property('deliveredDrugs');
                    done();
                })
        })
    })

})