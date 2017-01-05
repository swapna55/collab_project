'use strict';
console.log("UserController...")
app
		.controller(
				'UserController',
				[
						'$scope',
						'UserService',
						'$location',
						'$rootScope',
						'$cookieStore',
						'$http',
						function($scope, UserService, $location, $rootScope,$cookieStore,
								$http) {
							console.log("starts the UserController ")
							var self = this;
							self.Userdetails = {
								userid : '',
								username : '',
								password : '',
								contact : '',
								address : '',
								email : '',
								is_online : '',
								Role : '',
								errorcode : '',
								errormessage : ''
							};
							self.users = [];

							self.fetchAllUsers = function() {
								console.log("fetch users")
								UserService
										.fetchAllUsers()
										.then(
												function(d) {
													self.users = d;
												},
												function(errResponse) {
													console
															.error('Error while fetching Users');
												});
							};
							
							//self.fatchAllUsers();

							self.createUser = function(Userdetails) {
								console.log("createUser...")
								UserService
										.createUser(Userdetails)
										.then(
												self.fetchAllUsers,
												function(errResponse) {
													console
															.error('Error while creating User.');
												});
							};
							//setting profile
							self.myProfile = function() {
								console.log("myProfile...")
								UserService
										.myProfile()
										.then(
												function(d) {
													self.Userdetails = d;
													$location.path("/myProfile")
												},
												function(errResponse) {
													console
															.error('Error while fetch profile.');
												});
							};
//updation of user by userid
							self.updateUser = function(Userdetails, userid) {
								console.log("updateUser...")
								UserService
										.updateUser(Userdetails, userid)
										.then(
												self.fetchAllUsers,
												function(errResponse) {
													console
															.error('Error while updating User.');
												});
							};
//authenticating user by using userid and password
							self.authenticate = function(Userdetails) {
								console.log("authenticate...")
								UserService
										.authenticate(Userdetails)
										.then(

												function(d) {

													self.Userdetails = d;
													console
															.log("Userdetails.errorcode: "
																	+ self.Userdetails.errorcode)
													if (self.Userdetails.errorcode == "404")

													{
														alert(self.Userdetails.errormessage)

														self.Userdetails.userid = "";
														self.Userdetails.password = "";

													} else {
														console
																.log("Valid credentials. Navigating to home page")
														$rootScope.currentUser = self.Userdetails
														
														$http.defaults.headers.common['Authorization'] = 'Basic '
																+ $rootScope.currentUser;
														$cookieStore
																.put(
																		'currentUser',
																		$rootScope.currentUser);
														/*.put(
																'loggedIn',
																$rootScope.loggedIn);*/
														$location.path('/');

													}

												},
												function(errResponse) {

													console
															.error('Error while authenticate Users');
												});
							};
							/*controller('UserController', function($scope) {
								   $scope.currentUser= false;
								   $scope.login = function() { 
								     $scope.currentUser= true;
								  }
								})

*/
//self.logout
							self.logout = function() {
								console.log("logout")
								UserService.logout()
								$rootScope.currentUser = {};
								$cookieStore.remove('currentUser');
								
								$location.path('/');
							}
//deleting user by using userid
							self.deleteUser = function(userid) {
								console.log("UserController...")
								UserService
										.deleteUser(userid)
										.then(
												self.fetchAllUsers,
												function(errResponse) {
													console
															.error('Error while deleting User.');
												});
							};

							// self.fetchAllUsers();

							self.login = function() {
								{
									console.log('login validation????????',
											self.Userdetails);
									self.authenticate(self.Userdetails);
								}

							};
//saving userdetails
							self.submit = function() {
								{
									console.log('Saving New User', self.Userdetails);
									self.createUser(self.Userdetails);
								}
								self.reset();
							};

					//resetting the userdetails form
							self.reset = function() {
								self.Userdetails = {
									userid : '',
									username : '',
									password : '',
									contact : '',
									address : '',
									email : '',
									is_online : '',
									errorcode : '',
									errormessage : ''
								};
								$scope.myForm.$setPristine(); // reset Form
							};

							} ]);