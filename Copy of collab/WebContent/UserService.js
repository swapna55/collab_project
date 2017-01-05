'use strict';
 
app.factory('UserService', ['$http', '$q','$rootScope', function($http, $q,$rootScope){
	
	console.log("UserService...")
	
	var BASE_URL='http://localhost:8070/CollaborationBack'
		
    return {
        //fetching all users 
            fetchAllUsers: function() {
            	console.log("fetching users ")
                    return $http.get(BASE_URL+'/users')
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while fetching UserDetailss');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
            //calling fetch all users
            myProfile: function() {
            	console.log("user profile creation ")
                    return $http.get(BASE_URL+'/myProfile')
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while fetching profile');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
          //to create user   
            createUser: function(user){
            	console.log("creation of user")
                    return $http.post(BASE_URL+'/createusers/', user)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while creating user');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             //updating userid from userdetails
            updateUser: function(Userdetails, userid){
            	console.log("updation of user ")
                    return $http.put(BASE_URL+'/user/', user)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while updating user');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
              //logout
            logout: function(){
            	
          console.log('logout....')
                return $http.post(BASE_URL+'/user/logout/')
                        .then(
                                function(response){
                                    return response.data;
                                }, 
                              null
                        );
        },
        
        
            //authenticating user
            authenticate: function(Userdetails){
            	   console.log("Calling the method authenticate with the user :"+Userdetails)
          		 
                return $http.post(BASE_URL+'/user/authenticate/',Userdetails)
                        .then(
                                function(response){
                                    return response.data;
                                }, 
                               null
                        );
        }
         
    };
 
}]);