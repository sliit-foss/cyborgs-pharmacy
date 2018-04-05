/**
 * Created by owner on 5/4/2017.
 */
angular.module('reportsController',[])



.controller('reportsCtrl',['Reports',function(Reports){
    const app = this;
    app.batchs = [];
    app.prescriptions = [];
    app.allBatchs = [];
    app.dataOfGraph = [];
    app.reqDate ={};
    app.status = false;





    app.getToBeExpiredBatches1 = function (date) {

        Reports.getToBeExpiredBatches(date).then(function (res) {
            if(res.data.length == 0)
                app.status = true;
            else
                app.status = false;
            app.batchs = res.data;
        })
    };

    //delete a expired batch
    app.deleteBatch = function(bId){
        console.log('function running');
       Reports.deleteExpiredBatch(bId).then(function(res){
            console.log(res);
        })
    };



    Reports.getAllPrescription().then(function (res) {
        var date = new Date().getFullYear();
       app.prescriptions = res.data;

//get count from database and store
        for(var item in app.prescriptions){

            if(app.prescriptions[item]._id.year == date){
                if(app.prescriptions[item]._id.month == 1)
                    app.dataOfGraph[0]=app.prescriptions[item].count;
                if(app.prescriptions[item]._id.month == 2)
                    app.dataOfGraph[1]=app.prescriptions[item].count;
                if(app.prescriptions[item]._id.month == 3)
                    app.dataOfGraph[2]=app.prescriptions[item].count;
                if(app.prescriptions[item]._id.month == 4)
                    app.dataOfGraph[3]=app.prescriptions[item].count;
                if(app.prescriptions[item]._id.month == 5)
                    app.dataOfGraph[4]=app.prescriptions[item].count;
                if(app.prescriptions[item]._id.month == 6)
                    app.dataOfGraph[5]=app.prescriptions[item].count;
                if(app.prescriptions[item]._id.month == 7)
                    app.dataOfGraph[6]=app.prescriptions[item].count;
                if(app.prescriptions[item]._id.month == 8)
                    app.dataOfGraph[7]=app.prescriptions[item].count;
                if(app.prescriptions[item]._id.month == 9)
                    app.dataOfGraph[8]=app.prescriptions[item].count;
                if(app.prescriptions[item]._id.month == 10)
                    app.dataOfGraph[9]=app.prescriptions[item].count;
                if(app.prescriptions[item]._id.month == 11)
                    app.dataOfGraph[10]=app.prescriptions[item].count;
                if(app.prescriptions[item]._id.month == 12)
                    app.dataOfGraph[11]=app.prescriptions[item].count;
            }
        }

        //generate graph
        var ctx = document.getElementById("myChart").getContext('2d');
        ctx.height = 500;
        Chart.defaults.global.responsive = true;
        Chart.defaults.global.animationSteps = 200;

        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Jan", "Feb", "March", "Apr", "May", "June","July","Aug","Sep","Oct","Nov","Des"],
                datasets: [{
                    label: 'Monthly Drugs Dispensation '+ date,
                    data: app.dataOfGraph,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                },
                responsive:true,width:500,
                height:300,

            }
        });
    });


    Reports.getAllBatchs().then(function (res) {
        app.allBatchs = res.data;
    });




    app.saveasPdf = function(id){
         html2canvas(document.getElementById(id), {
            onrendered: function (canvas) {
                var data = canvas.toDataURL();
                var docDefinition = {
                    content: [{
                        image: data,
                        width: 500,
                    }]
                };
                pdfMake.createPdf(docDefinition).download("usageDetails.pdf");
            }
        });
    }
}]);