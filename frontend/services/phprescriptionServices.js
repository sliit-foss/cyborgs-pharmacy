/**
 * Created by Aadil on 5/4/2017.
 */
angular.module('phprescriptionServices',[])

    .factory('phPrescription', ['$http','Conf', function($http,Conf){
        const phprescriptionFactory = [];

        phprescriptionFactory.getPhPrescription = function(){
            return $http.get(Conf.prescription_service.concat('/prescription/pharmacist')).then(function(data){
                return data;
            })
        };
        phprescriptionFactory.getPhPrescriptionDetails = function(number){
            return $http.get(Conf.prescription_service.concat('/prescription/pharmacist/' + number)).then(function(data){
                return data;
            })
        };
        phprescriptionFactory.getPhprescriptionByDate = function(date){
            return $http.get(Conf.prescription_service.concat('/prescription/pharmacist/date/' + date)).then(function(data){
                return data;
            })
        };
        phprescriptionFactory.getPhprescriptionByDocName = function(name){
            return $http.get(Conf.prescription_service.concat('/prescription/pharmacist/dname/' + name)).then(function(data){
                return data;
            })
        };
        phprescriptionFactory.getPhprescriptionByPatientName = function(name){
            return $http.get(Conf.prescription_service.concat('/prescription/pharmacist/pname/' + name)).then(function(data){
                return data;
            })
        };
        phprescriptionFactory.getPhprescriptionByPharmacistName = function(name){
            return $http.get(Conf.prescription_service.concat('/prescription/pharmacist' + name)).then(function(data){
                return data;
            })
        };
        phprescriptionFactory.addPHprescription = function(data){
            return $http.post(Conf.prescription_service.concat('/prescription/pharmacist'),data).then(function(data){
                return data;
            })
        };

        return phprescriptionFactory;
    }])