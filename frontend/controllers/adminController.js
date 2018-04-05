/**
 * Created by ntban_000 on 4/29/2017.
 */
angular.module('adminController',[])

.controller('adminCtrl',['Auth','$rootScope','$location', function(Auth, $rootScope, $location){
    const app = this;

    if($rootScope.user){
        app.username = $rootScope.user.data.name;
        app.user_permission = $rootScope.user.data.permission;
    }else{
        Auth.logout();
        $location.path('/login');
    }

    app.logout = function(){
        Auth.logout();
        $location.path('/login');
    }


}])