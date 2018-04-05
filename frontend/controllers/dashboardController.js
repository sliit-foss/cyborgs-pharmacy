/**
 * Created by ntban_000 on 4/28/2017.
 */
angular.module('dashboardController',[])

.controller('dashboardCtrl',['Auth','$location','$rootScope',function(Auth,$location,$rootScope){
    const app = this;
    app.username = $rootScope.user.data.name;
    app.permission = $rootScope.user.data.permission;
    console.log($rootScope.user.data);
    if(app.permission=="chief"){
        app.permission_title="Chief Pharmacist";
        app.chief_show = true;
    }
    if(app.permission=="user"){
        app.permission_title="Assistant Pharmacist";
        app.user_show = true;
    }
    if(app.permission=="doctor"){
        app.permission_title="Doctor";
        app.doctor_show = true;
    }
    app.logout = function(){
        Auth.logout();
        $location.path('/login');
    }
}])