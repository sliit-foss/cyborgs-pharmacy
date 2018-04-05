'use strict';

angular.module('cyborgPharmacy', [
    'ngAnimate',
    'cyborgPharmacy.routes',
    'cyborgPharmacy.confService',

    //services
    'authServices',
    'userServices',
    'drugServices',
    'reportsServices',
    'dprescriptionServices',
    'phprescriptionServices',
    'mailServices',

    //controllers
    'userController',
    'dashboardController',
    'adminController',
    'drugController',
    'reportsController',
    'prescriptionController',
    'mailController',
    'batchController'

])

.config(function($httpProvider){
    $httpProvider.interceptors.push('AuthInterceptors');
    $httpProvider.interceptors.push('LogInterceptor');
})


.run( ['$rootScope','$location','Auth', function($rootScope, $location, Auth) {

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
        if(toState.authenticated==true){
            if(!Auth.isLoggedIn()){
                event.preventDefault();
                $location.path('/login');
            }else{
                //get user data
                Auth.getUser().then(function(data){
                    if(data){
                        $rootScope.user = data;
                    }else{
                        $location.path('/login');
                    }
                })
                if(toState.permissions){
                    if($rootScope.user){
                        if($rootScope.user.data.permission != toState.permissions[0] && $rootScope.user.data.permission=='chief'){
                            //add more permission checks here
                            $location.path('/drugs');
                        }else if($rootScope.user.data.permission != toState.permissions[0] && $rootScope.user.data.permission=='user'){
                            $location.path('/prescription/pharmacist/addPhprescription');
                        }else if($rootScope.user.data.permission != toState.permissions[0] && $rootScope.user.data.permission=='doctor'){
                            $location.path('/prescription/doctor');
                        }
                    }else{
                        $location.path('/login');
                    }
                }
            }
        }else if (toState.authenticated==false){
            if(Auth.isLoggedIn()){
                event.preventDefault();
                $location.path('/');
            }
        }

    })
}]);