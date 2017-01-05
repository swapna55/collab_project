'use strict';
console.log("Friendservice starts")
 
app.factory('FriendService', ['$http', '$q','$rootScope', function($http, $q,$rootScope){
	
	console.log("FriendService...")
	
	var BASE_URL='http://localhost:8070/CollaborationBack'
    return {
         
		getMyFriends: function() {
                    return $http.get(BASE_URL+'/myFriends')
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                   null
                            );
            },
   /* 		getMyFriendRequest: function() {
                return $http.get(BASE_URL+'/myFriendRequest')
                        .then(
                                function(response){
                                    return response.data;
                                }, 
                               null
                        );
        },

             
*/            sendFriendRequest: function(friendid){
                    return $http.get(BASE_URL+'/addFriend/'+friendid)
                            .then(
                                    function(response){
                                    	console.log('add a friend');
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while adding friend');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
          /*  updateFriendRequest: function(friend, id){
                    return $http.put(BASE_URL+'/friend/'+id, friend)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while updating friend');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
          */   
         /*   deleteFriend: function(id){
                    return $http delete(BASE_URL+'/friend/'+id)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while deleting friend');
                                        return $q.reject(errResponse);
                                    }
                            );
            }
            
           
         */
    };
 
}]);/**
 * 
 */