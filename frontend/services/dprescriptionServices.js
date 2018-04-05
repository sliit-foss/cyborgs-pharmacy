/**
 * Created by Aadil on 5/4/2017.
 */
angular.module('dprescriptionServices',[])

    .factory('dPrescription', ['$http','Conf', function($http,Conf){
        const dprescriptionFactory = [];

        dprescriptionFactory.addAadil = function(etho){
            return $http.post(Conf.prescription_service.concat('/prescription/doctor'), etho).then(function(data){
                return data;
            })
        };

        dprescriptionFactory.getDocPrescription = function(){
            return $http.get(Conf.prescription_service.concat('/prescription/doctor')).then(function(data){
                return data;
            })
        };
        dprescriptionFactory.getDPrescriptionDetails = function(number){
            return $http.get(Conf.prescription_service.concat('/prescription/doctor/' + number)).then(function(data){
                return data;
            })
        };
        dprescriptionFactory.getDprescriptionByDocName = function(name){
            return $http.get(Conf.prescription_service.concat('/prescription/doctor/dname/' + name)).then(function(data){
                return data;
            })
        };
        dprescriptionFactory.getDprescriptionByPatientName = function(name){
            return $http.get(Conf.prescription_service.concat('/prescription/doctor/pname/' + name)).then(function(data){
                return data;
            })
        };
        dprescriptionFactory.getDprescriptionByDate = function(date){
            return $http.get(Conf.prescription_service.concat('/prescription/doctor/date/' + date)).then(function(data){
                return data;
            })
        };
        dprescriptionFactory.addDprescription = function(data){
            return $http.post(Conf.prescription_service.concat('/prescription/doctor'),data).then(function(data){
                return data;
            })
        };
        return dprescriptionFactory;
    }])