/**
 * Created by ishan on 7/1/17.
 */
const mongoose = require('mongoose');
const drug = require('./drug.model');
const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('./server');
const should = chai.should();

chai.use(chaiHttp);

describe('Drugs', function(){
    this.timeout(15000);
//    test GET route
    describe('GET drugs', function(){
        //get all the drugs
        it('should get all the drugs', function(done){
            chai.request(server)
                .get('/drug')
                .end(function(err,res){
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                })
        })

        //get drug by the drugName
        it('should get the drug details by drugName', function(done){
            chai.request(server)
                .get('/drug/details/Acitretin (Soriatane) 50mg')
                .end(function(err,res){
                    res.should.have.status(200);
                    res.body[0].should.have.property('dId').eql(1);
                    res.body[0].should.have.property('dName').eql('Acitretin (Soriatane) 50mg');
                    res.body[0].should.have.property('dCategory').eql('Narcotics');
                    res.body[0].should.have.property('dPrice');
                    res.body[0].should.have.property('dUnit').eql('Tab');
                    done();
                })
        })

        it('should get the drug categories',function (done) {
            chai.request(server)
                .get('/drug/category')
                .end(function (err,res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                })
        })

        it('should get the drug names',function (done) {
            chai.request(server)
                .get('/drug/name')
                .end(function (err,res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                })
        })

        it('should not post a drug without drugName',function (done) {
            let drug = {
                "dCategory":"Narcotics",
                "dPrice":10,
                "dUnit":"Tab",
                "dangerLevel":1000,
                "reorderLevel":1500,
                "dRemarks":"",
                "dQuantity":0
            }

            chai.request(server)
                .post('/drug')
                .send(drug)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    done();
                });
        })
    })


})