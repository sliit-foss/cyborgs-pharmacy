/**
 * Created by ntban_000 on 4/28/2017.
 */

angular.module('authServices',[])

.factory('Auth',['$http','AuthToken','$q', 'Conf', function($http,AuthToken,$q, Conf){
    const authFactory = {};

    //authenticate user
    authFactory.login = function(loginData){
        return $http.post(Conf.auth_service.concat('/authenticate'), loginData).then(function(data){
            AuthToken.setToken(data.data.token);
            return data;
        });
    }

    //check if the user is logged in
    //check if the token exists in the local storage
    authFactory.isLoggedIn = function(){
        if(AuthToken.getToken()){
            return true;
        }else{
            return false;
        }
    }

    //logout user
    authFactory.logout = function(){
        AuthToken.setToken();
    }

    //get user details
    authFactory.getUser = function(){
        if(AuthToken.getToken()){
            return $http.get(Conf.auth_service.concat('/me'));
        }else{
            $q.reject({ message: 'User token not set'});
        }
    }

    return authFactory;
}])

    //Auth Token factory -> set and remove tokens from local storage
.factory('AuthToken',['$window',function($window){
   const tokenFactory = {};
   //store token in local storage
   tokenFactory.setToken = function(token){
       if(token){
           $window.localStorage.setItem('token',token);
       }else{
           $window.localStorage.removeItem('token');
       }
   }
   //get token from local storage
   tokenFactory.getToken = function(){
       return $window.localStorage.getItem('token');
   }
   return tokenFactory;
}])

//tokens in requests
.factory('AuthInterceptors', ['AuthToken', function(AuthToken){
    const authInterceptorsFactory = {};

    authInterceptorsFactory.request = function(req){
        const token = AuthToken.getToken();
        if(token){
            req.headers['x-access-token'] = token;
        }
        return req;
    }
    return authInterceptorsFactory;
}])
