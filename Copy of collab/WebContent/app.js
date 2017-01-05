var app=angular.module('myApp', ['ngRoute','ngCookies']);

app.config(function($routeProvider) {
	  $routeProvider

	 /* .when('/', {
	    templateUrl : 'index.html',
	    
	   
	  })*/
	  
	    .when('/', {
	    templateUrl : 'Home.html',
	    controller  : 'HomeCtrl'
	    
	   
	  })
	
	   /*  .when('/friend',{
		  templateUrl : 'c_friend/Friend.html',
		  controller  : 'AbtCtrl'
	  })
	
	  
	*/ .when('/about',{
		  templateUrl : 'About.html',
		  controller  : 'AboutCtrl'
	  })
	  .when('/Login',{
		  templateUrl : 'login.html',
		  controller  : 'UserController'
	  })
	  .when('/Register', {
		    templateUrl : 'register.html',
		    controller  : 'UserController'
		  })
		.when('/myprofile', {
		    templateUrl : 'my_profile.html',
		    controller  : 'UserController'
		  })
		  .when('/searchFriend', {
		    templateUrl : 'search_friend.html',
		    controller  : 'FriendController'
		  })

		  .when('/viewFriend', {
		    templateUrl : 'view_friend.html',
		    controller  : 'FriendController'
		  })
		   .when('/chat', {
    templateUrl : 'c_chat/chat.html',
    controller  : 'ChatController'
  })
 
  .when('/listBlog', {
    templateUrl : 'c_blog/list_blog.html',
    controller  : 'BlogController'
  })
  .when('/createBlog', {
    templateUrl : 'c_blog/create_blog.html',
    controller  : 'BlogController'
  })
 .when('/viewBlog', {
    templateUrl : 'c_blog/view_blog.html',
    controller  : 'BlogController'
  })
   .when('/viewBlog2', {
    templateUrl : 'c_blog/view_blog2.html',
    controller  : 'BlogController'
  })

 .when('/comment', {
    templateUrl : 'c_blog/comment_blog.html',
    controller  : 'BlogController'
  })


.when('/createForum', {
    templateUrl : 'c_forum/create_forum.html',
    controller  : 'ForumController'
  })
 .when('/viewForum', {
    templateUrl : 'c_forum/view_forum.html',
    controller  : 'ForumController'
  })


		

	  .otherwise({redirectTo:'/'});
	  
	  
	  
	});
app.run(function ($rootScope, $location, $cookieStore, $http){

	$rootScope.$on('$locationChangeStart', function(event, next, current){
	console.log("$locationChangeStart")
	//redirect to login page if not logged in and typing to access a restricted page

	var restrictedPage=$.inArray($location.path(), ['/createForum','/viewForum']) ===-1;
	console.log("restrictedPage:" +restrictedPage)
	var loggedIn=$rootScope.currentUser.userid;
	console.log("loggedIn:"+loggedIn)
	if(!restrictedPage & !loggedIn){
	console.log("Navigating to login page:")
	alert("You are not logged and so you can't do this operation")
	$location.path('/Login');
	}
	});

	//keep user logged in after page refresh
	$rootScope.currentUser = $cookieStore.get('currentUser') || {};
	if($rootScope.currentUser){
	$http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.currentUser;
	
	}
});


/*app.controller('HomeCtrl',function($scope)
		{
	$scope.message="Home page";
		});
*/