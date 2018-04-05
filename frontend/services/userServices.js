/**
 * Created by ntban_000 on 5/3/2017.
 */

angular.module('userServices',[])

.factory('User', ['$http', 'Conf', function($http, Conf){
    const userFactory = [];

    //get all users
    userFactory.getUsers = function(){
        return $http.get(Conf.auth_service.concat('/users')).then(function(data){
            return data;
        }).catch(function(err){
            return err;
        })
    }

    //get user by username
    userFactory.getUserByUsername = function(uname){
        return $http.get(Conf.auth_service.concat('/users/').concat(uname)).then(function(data){
            return data;
        }).catch(function(err){
            return err;
        })
    }

    //create new user
    userFactory.addUser = function(data) {
        return $http.post(Conf.auth_service.concat('/users'),data).then(function(data){
            return data;
        }).catch(function(err){
            return err;
        })
    }

    //update user
    userFactory.updateUser = function(uname,data){
        return $http.put(Conf.auth_service.concat('/users/').concat(uname),data).then(function(data){
            return data;
        }).catch(function(err){
            return data;
        })
    }

    //delete user record
    userFactory.deleteUser = function(username){
        return $http.delete(Conf.auth_service.concat('/users/').concat(username)).then(function(data){
            return data;
        }).catch(function(err){
            return err;
        })
    }

    return userFactory;
}])


.factory('UserData', [function(){
    const userDataFac = {};
    var user_data;

    userDataFac.setData = function(data){
        user_data = data;
    }

    userDataFac.getData = function(){
        return user_data;
    }

    return userDataFac;
}])

//   user logs
.factory('UserLogs',['$injector','Conf',function($injector,Conf){
    const userLogsFactory = {};

    //get all logs
    userLogsFactory.getAllLogs = function(){
        return $injector.get('$http').get(Conf.auth_service.concat('/logs')).then(function(data){
            return data;
        }).catch(function(err){
            return err;
        })
    }

    //add new log
    userLogsFactory.addLog = function(data){
        const send = {};
        send.description = data;
        return $injector.get('$http').post(Conf.auth_service.concat('/logs'),send).then(function(data){
            return data;
        }).catch(function(err){
            console.log(err);
            return err;
        })
    }

    return userLogsFactory;
}])

//intercept requests and send logs
.factory('LogInterceptor', ['UserLogs','Conf','$rootScope', function(UserLogs,Conf,$rootScope){
    const logInterceptFactory = {};
    const fact = this;
    if($rootScope.user){
        fact.uname = $rootScope.user.data.name;
        console.log($rootScope.user);
    }
    logInterceptFactory.request = function(req){
        //auth service requests
        if(req.url==Conf.auth_service.concat('/authenticate')){
            UserLogs.addLog("User logged into the system");
        }else if(req.url==Conf.auth_service.concat('/users')&&req.method=="POST"){
            UserLogs.addLog("Added the user "+req.data.username+" to the system");
        }else if(req.url.startsWith(Conf.auth_service.concat('/users'))&&req.method=="PUT"){
            UserLogs.addLog("Updated the user "+req.url.split('/')[4]);
        }else if(req.url.startsWith(Conf.auth_service.concat('/users'))&&req.method=="DELETE"){
            UserLogs.addLog("Deleted the user "+req.url.split('/')[4]);
        }
        //drug service requests
        else if(req.url.startsWith(Conf.drug_service.concat('/drug'))&&req.method=="POST"){
            UserLogs.addLog("Added a new drug to the system");
        }else if(req.url.startsWith(Conf.drug_service.concat('/drug'))&&req.method=="PUT"){
            UserLogs.addLog("Updated a drug in the system");
        }
        //batch routes
        else if(req.url.startsWith(Conf.drug_service.concat('/batch'))&&req.method=="POST"){
            UserLogs.addLog("Added a new batch to the system");
        }
        //prescriptions
        else if(req.url.startsWith(Conf.prescription_service.concat('/prescription/pharmacist'))&&req.method=="POST"){
            UserLogs.addLog("Pharmacist added a new prescription to the system");
        }
        else if(req.url.startsWith(Conf.prescription_service.concat('/prescription/doctor'))&&req.method=="POST"){
            UserLogs.addLog("Doctor added a new prescription to the system");
        }

        return req;
    }
    return logInterceptFactory;
}])