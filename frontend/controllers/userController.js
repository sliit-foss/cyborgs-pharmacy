/**
 * Created by ntban_000 on 4/28/2017.
 */
angular.module('userController', [])

.controller('loginCtrl', ['Auth','$timeout','$location','$rootScope', function(Auth,$timeout,$location,$rootScope){
    const app = this;
    app.login_tries = 3;
    //user login function
    app.doLogin = function(loginData){
        if(app.loginData.username==""||app.loginData.username==undefined){
            app.errorMessage = "Please enter your Username";
        }else if(app.loginData.password==""||app.loginData.password==undefined){
            app.errorMessage = "Please provide your Password";
        }else{
            Auth.login(app.loginData).then(function(data){
                //if successful, login user, show redirect message and take user to next view
                if(data.data.success){
                    //error message to be shown if user is not validated
                    app.errorMessage = null;
                    //show success message
                    app.successMessage = data.data.message+" Redirecting...";
                    $timeout(function(){
                        Auth.getUser().then(function(data){
                            //set user data to the root scope to be shared within the application
                            $rootScope.user = data;
                            //check user permissions
                            //if the user is an admin take him/her to the administrator view
                            //else take the user to the general user view
                            //Dev:add more conditions to check for more permissions
                            if(data.data.permission=="admin"){
                                $location.path('/admin/users');
                            }else if(data.data.permission=="chief"){
                                $location.path('/drugs');
                            }else if(data.data.permission=="user"){
                                $location.path('/prescription/pharmacist/addPhprescription');
                            }else if(data.data.permission=="doctor"){
                                $location.path('/prescription/doctor/addDprescription');
                            }
                        })
                    },2000);
                }else{
                    //set the error message to be shown if the user validation is not successful
                    if(app.login_tries>1){
                        app.login_tries--;
                        app.errorMessage = data.data.message+" You have "+app.login_tries+" attempts left.";
                    }else{
                        app.errorMessage = "Try again in 30 seconds";
                        document.getElementById('username').disabled = true;
                        document.getElementById('password').disabled = true;
                        document.getElementById('submitBtn').disabled = true;
                        $timeout(function(){
                            app.errorMessage = null;
                            document.getElementById('username').disabled = false;
                            document.getElementById('password').disabled = false;
                            document.getElementById('submitBtn').disabled = false;
                            app.login_tries=3;
                        },30000);
                    }
                }
            })
        }
    }
}])

.controller('admin_usersController',['User','UserData','$location','$timeout', function(User,UserData,$location,$timeout){
    const app = this;
    app.users;
    app.filter='name';
    app.order = 'username';

    app.password_strength = 30;
    app.password_confirm = false;

    //retreive all the registered users
    User.getUsers().then(function(data){
        app.users = data.data;
    })

    //add new user
    app.regData = {};
    app.addUser = function(regData){
        //validate user entered data
        //username validation
        if(app.regData.username==""||app.regData.username==undefined)
            app.error_message = "Please enter a username!";
        //name validation for null or undefined
        else if (app.regData.name==""||app.regData.name==undefined)
            app.error_message = "Please enter a name";
        //name validation for invalid names
        else if (!app.regData.name.match('^[a-zA-Z ]+$'))
            app.error_message = "Please enter a valid name";
        //null or undefined email
        else if (app.regData.email==""||app.regData.email==undefined)
            app.error_message = "Please enter an email address";
        //valid email address
        else if (!app.regData.email.match('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'))
            app.error_message = "Please enter a valid email address";
        //password validation (null or undefined)
        else if (app.regData.password==""||app.regData.password==undefined)
            app.error_message = "Please enter a password";
        //check password confirmation
        else if (app.regData.password!=app.regData.password_confirm)
            app.error_message = "Please confirm your password";
        //check password strength
        else if (app.regData.password_strength==30)
            app.error_message = "Your password is not strong enough";
        //check for permissions
        else if (app.regData.permission==""||app.regData.permission==undefined)
            app.error_message = "Please set user permission";
        else{
            //hide error messages if any
            app.error_message = null;
            User.addUser(regData).then(function(data){
                console.log(data);
                if(data.data.success){
                    //user created successfully and is redirected to view of all users
                    app.success_message = data.data.message;
                    $timeout(function(){
                        $location.path('/admin/users');
                    },2000);
                }else{
                    //user creation is unsuccessful
                    //error message is displayed
                    app.error_message = data.data.message;
                }
            })
        }
    }

    //check  password confirmation
    app.checkPasswordConfirm = function(){
        if(app.regData.password==app.regData.password_confirm)
            app.password_confirm = true;
        else app.password_confirm = false;
    }

    //password strength
    app.pwd_weak = false;
    app.pwd_good = false;
    app.pwd_strong = false;
    //check password strength
    app.checkPasswordStrength = function(){
        // if(app.regData.password.match('^(?=.*[A-Z].*[A-Z])(?=.*[a-z].*[a-z].*[a-z])$')){
        //     app.password_strength = 30;
        //     app.password_strength_message = "Week";
        // }
        // else if (app.regData.password.match('^(?=.*[A-Z].*[A-Z])(?=.*[a-z].*[a-z].*[a-z]).{8}$')) {
        //     app.password_strength = 50;
        //     app.password_strength_message = "Good";
        // }
        // else if (app.regData.password.match('^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$')){
        //     app.password_strength = 100;
        //     app.password_strength_message = "Excellent";
        // }
        // else {
        //     app.password_strength = 0;
        // }
        if(app.regData.password.match('^[a-zA-Z]{0,8}$')){
            app.pwd_weak = true;
            app.pwd_good = false;
            app.pwd_strong = false;
        }
        else if (app.regData.password.match('^[a-zA-Z0-9]{8,12}$')) {
            app.pwd_weak = false;
            app.pwd_good = true;
            app.pwd_strong = false;
        }
        else if (app.regData.password.match('^[a-zA-Z0-9!@#$%^&*]{8,}$')){
            app.pwd_weak = false;
            app.pwd_good = false;
            app.pwd_strong = true;
        }
    }

    //set selected permission to registration data
    app.setPermission = function(permission){
        app.regData.permission = permission;
    }

    //delete a user
    app.deleteUser = function(username){
        User.deleteUser(username).then(function(data){
            app.loadData();
        })
    }

    //function to retreive all the registered users
    app.loadData = function(){
        User.getUsers().then(function(data){
            app.users = data.data;
        })
    }

    //share data and load the update user view
    app.gotoUpdate = function(username){
        UserData.setData(username);
        $location.path('/admin/updateUser');
    }

    //set filter in search
    app.setFilter = function(filter){
        app.filter = filter;
    }

    //set order by
    app.setOrderBy = function(order){
        app.order = order;
    }

}])

.controller('admin_updateUserController',['UserData', 'User','$location','$timeout', function(UserData,User,$location,$timeout){
    const app = this;
    app.regData = {};
    //if user data is not set, redirect the user back to the list of users
    //else load the form data
    if(!UserData.getData()){
        $location.path('/admin/users');
    }else{
        app.username = UserData.getData();
        User.getUserByUsername(app.username).then(function(data){
            //load form data
            app.regData.name = data.data.name;
            app.regData.email = data.data.email;
            //load permission on form
            if(data.data.permission=='admin')
                document.getElementById('admin').checked = true;
            else if(data.data.permission=='chief')
                document.getElementById('chief').checked = true;
            else if(data.data.permission=='user')
                document.getElementById('assistant').checked = true;

        }).catch(function(err){
            //store error on data load
            app.data_load_error = err;
        })

    }

    app.update = function(){
        //validate entered data
        //name validation for null or undefined
        if (app.regData.name==""||app.regData.name==undefined)
            app.error_message = "Please enter a name";
        //name validation for invalid names
        else if (!app.regData.name.match('^[a-zA-Z ]+$'))
            app.error_message = "Please enter a valid name";
        //null or undefined email
        else if (app.regData.email==""||app.regData.email==undefined)
            app.error_message = "Please enter an email address";
        //valid email address
        else if (!app.regData.email.match('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'))
            app.error_message = "Please enter a valid email address";
        else if (app.regData.permission==""||app.regData.permission==undefined)
            app.error_message = "Please set user permission";
        else{
            //hide error messages if any
            app.error_message = null;
            User.updateUser(app.username, app.regData).then(function(data){
                //show success message and redirect user to the view of all users
                app.success_message = data.data.message;
                $timeout(function(){
                    $location.path('/admin/users');
                },2000);
            }).catch(function(err){
                //update unsuccessful
                //display error message
                app.error_message = data.data.message;
            })
        }
    }

    //set selected permission to update data
    app.setPermission = function(permission){
        app.regData.permission = permission;
    }

}])

.controller('admin_UserLogsController',['UserLogs',function(UserLogs){
    const app = this;
    UserLogs.getAllLogs().then(function(data){
        app.logs = data.data.reverse();
    }).catch(function(err){
        app.log_err = err;
    })
}])

