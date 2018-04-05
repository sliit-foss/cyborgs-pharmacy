/**
 * Created by ishan on 6/30/17.
 */

angular.module('batchController',[])

.controller('batchCtrl',['Drug','$scope',function (Drug,$scope) {
    const app = this;

    app.cartons = false;
    app.bottles = false;
    app.tablets = false;
    app.liquid = false;
    app.bbottles = false;
    app.bcards = false;
    app.quantity = 0;
    app.dquantity = 1;
    app.set = {};
    app.cats = [];
    app.batchData = {};
    app.drugNames2= [];
    app.successMessage = null;
    app.errorMessage = null;

    Drug.getAllCategories().then(function (res) {
        app.cats = res.data;
    })

    app.setType = function (val) {
        if(val=="cartons"){
            app.cartons = true;
            app.bottles = false;
            app.batchData.bType = val;
        } else if(val == "bottles"){
            app.bottles = true;
            app.cartons = false;
            app.batchData.bType = val;
        }
    }

    app.setContent = function (val) {
        if(val == "tablets"){
            app.tablets = true;
            app.liquid = false;
        }else if(val == "liquid"){
            app.tablets = false;
            app.liquid = true;
        }
    }
    
    app.setContentType = function (val) {
        if(val == "bbottles"){
            app.bbottles = true;
            app.bcards = false;
        }else if (val == "bcards"){
            app.bbottles = false;
            app.bcards = true;
        }
    }

    app.calculateQuantity = function (data) {
        app.quantity = 0;
        app.dquantity = 1;

       for(var item in data){
            app.dquantity = app.dquantity * data[item];
       }
        app.quantity = app.dquantity;
        app.batchData.bQuantity = app.quantity;
    }

    app.changeCategory = function () {
        Drug.getDrugNameByCategory(app.batchData.dCategory).then(function (res) {
            app.drugNames2 = res.data;
        })
    }
    
    app.addBatch = function () {

        if(app.batchData.bQuantity ==0){
            app.successMessage = null;
            app.errorMessage = "Batch Cannot be Added !";
        } else{
            Drug.addNewBatch(app.batchData).then(function (res) {
                if(res.data.message == "success"){
                    app.successMessage = "Batch Added successfully !";
                    app.cartons = false;
                    app.bottles = false;
                    app.tablets = false;
                    app.liquid = false;
                    app.bbottles = false;
                    app.bcards = false;
                    app.errorMessage = null;
                    app.batchData = null;
                    app.quantity = 0;
                    $scope.addBatchForm.$setPristine();
                    $scope.addBatchForm.$setUntouched();
                } else{
                    app.successMessage = null;
                    app.errorMessage = "Batch Cannot be Added !";
                }
            })
        }


    }




}])