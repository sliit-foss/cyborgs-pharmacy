/**
 * Created by ishan on 5/4/17.
 */

angular.module('mailServices',[])

    .factory('EMail',['$http','Conf',function ($http,Conf) {
        const mailFactory = [];

        mailFactory.sendNewMail = function (data) {
            return $http.post(Conf.drug_service.concat('/drug/mail'),data).then(function (res) {
                return res;
            })
        }
        return mailFactory;
    }])


