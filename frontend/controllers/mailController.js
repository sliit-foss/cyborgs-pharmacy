/**
 * Created by ishan on 5/4/17.
 */

angular.module('mailController',[])

.controller('mailCtrl',['EMail','$state','$stateParams',function (EMail) {
    const app = this;
    app.sendData = JSON.parse(localStorage.getItem('rowData'));
    app.mailMessage = "Dear Officer,\n\nThe Quantities of the below Drugs are Low. \nName: "+app.sendData.dName+
            "\nCategory: "+app.sendData.dCategory+"\nPrice: "+app.sendData.dPrice+"\nQuantity in hand: "+app.sendData.dQuantity+
            "\nPlease be kind enough to send us new stocks.\n\nBest Regards,\nChief Pharmacist."

    app.mailSubject = "Drug Reorder Request For "+app.sendData.dName;
    app.receiveAddress = "ishanyapa@gmail.com";
    app.sendAddress = "shalanicuty@gmail.com"

    app.mailSendData = {};
    app.mailSendData.from = app.sendAddress;
    app.mailSendData.to = app.receiveAddress;
    app.mailSendData.subject = app.mailSubject;
    app.mailSendData.text = app.mailMessage;

    app.sendEMail = function () {
        EMail.sendNewMail(app.mailSendData).then(function (res) {
            if(res.data.message=="error"){
                app.errorMessage = "E mail cannot be sent !";
                app.successMessage = null;
            }else {
                app.errorMessage = null;
                app.successMessage ="E mail sent !";
            }
        })
    }



}])