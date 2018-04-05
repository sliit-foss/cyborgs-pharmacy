/**
 * Created by root on 6/28/17.
 */
angular.module('cyborgPharmacy.confService',[])

.factory('Conf', [function(){
    const con = {};

    con.auth_service = "http://34.212.63.160";
    con.drug_service = "http://35.164.154.55";
    con.prescription_service = "http://35.165.38.138";
    con.report_service = "http://34.212.249.156";
    //set your service URIs here
    //http://35.164.154.55
    return con;
}])