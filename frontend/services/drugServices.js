/**
 * Created by ishan on 5/3/17.
 */

angular.module('drugServices',[])

.factory('Drug',['$http','Conf',function ($http,Conf) {
    const drugFactory = [];

    drugFactory.getAllDrugs = function () {
        return $http.get(Conf.drug_service.concat('/drug')).then(function (data) {
            return data;
        })
    }

    drugFactory.getAllCategories = function () {
        return $http.get(Conf.drug_service.concat('/drug/category')).then(function (data) {
            return data;
        })
    }

    drugFactory.addNewDrug = function (data) {
        return $http.post(Conf.drug_service.concat('/drug'),data).then(function (res) {
            return res;
        })
    }
    drugFactory.updateDrug = function (data) {
        return $http.put(Conf.drug_service.concat('/drug'),data).then(function (res) {
            return res;
        })
    }

    drugFactory.getDrugNameByCategory = function (data) {
        return $http.get(Conf.drug_service.concat('/drug/name/'+data)).then(function (res) {
            return res;
        })
    }

    drugFactory.getDrugDetailsByName = function (data) {
        return $http.get(Conf.drug_service.concat('/drug/details/'+data)).then(function (res) {
            return res;
        })
    }

    drugFactory.addNewBatch = function (data) {
        return $http.post(Conf.drug_service.concat('/batch'), data).then(function (res) {
            return res;
        })
    }
    return drugFactory;
}])