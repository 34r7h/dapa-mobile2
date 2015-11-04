angular.module('app.services', [])
.service('Ui', ['$window', function ($window) {
		var ui = {
			dHeight: $window.innerHeight,
			dWidth: $window.innerWidth
		};
		return ui;
	}])
.service('Api', ['$ionicHistory', '$http', '$firebaseObject', '$firebaseArray', '$firebaseAuth', 'Firebase', '$state', function($ionicHistory, $http, $firebaseObject, $firebaseArray, $firebaseAuth, Firebase, $state){
		var baseUrl = 'http://api.dapa.dev:3000';
		var api = {};

		var fb = Firebase;
		var dapaRef = 'https://irthos.firebaseio.com/dapa';
		var fbRef = new fb(dapaRef);

		var api = {
			go: function (state) {
				$state.go(state);
			},
			register: function (user) {

				/*
				*
				  *  Mock User Creation using Firebase
				*
				* */

				var fbAuth = $firebaseAuth(fbRef);
				fbAuth.$createUser({
					email: user.email,
					password: user.password
				}).then(function() {
					return fbAuth.$authWithPassword({
						email: user.email,
						password: user.password
					});
				}).then(function(authData) {
					var fbObject = $firebaseObject(fbRef.child('users'));
					fbObject.$loaded().then(function () {
						fbObject[authData.uid] = user;
						fbObject.$save().then(function () {
							api.setUserData();

						});
					})

				}).catch(function(error) {
					console.error("Error: ", error);
				});
				/*
				*
					*  End Mock DB
				*
				* */


				console.log('Registering', user);
				$http.post(baseUrl + '/users', {
					headers:{

					},
					user: user
				}).success(function (data) {
					console.log('success',data);
				}).error(function (data) {
					console.error('error', data)
				});
			},
			login: function (user) {


				/*
				*
					*  Mock login using Firebase
				*
				* */

				var fbAuth = $firebaseAuth(fbRef);
				fbAuth.$authWithPassword({
					email: user.email,
					password: user.password
				}).then(function (authData) {
					api.setUserData();
				}).catch(function(error) {
					console.error("Authentication failed:", error);
				});

				/*
				*
					*  End Mock login using Firebase
				*
				* */

				console.log('logging in', user);
				$http.post(baseUrl + '/sessions', {
					headers:{

					},
					session: user
				}).success(function (data) {
					console.log('success',data);
				}).error(function (data) {
					console.error('error', data)
				});
			},
			logout: function () {
				var fbAuth = $firebaseAuth(fbRef);
				api.userData = null;
				api.auth = null;
				fbAuth.$unauth()
			},
			updateUser: function (user) {
				/*
				*
				*  Mock update via Firebase
				*
				* */

				var fbObject = $firebaseObject(fbRef.child('users'));
				fbObject.$loaded().then(function (data) {
					console.log(api.auth.uid);
					data[api.auth.uid] = user;
					data.$save();
				});

				/*
				*
			 	*  End mock update via Firebase
				*
				*
				* */
			},
			setUserData: function () {
				var fbAuth = $firebaseAuth(fbRef);
				var auth = fbAuth.$getAuth();
				if(auth){
					api.userData = $firebaseObject(fbRef.child('users/'+ auth.uid));
					api.auth = auth;
				} else {
					console.log('not logged in');
				}
			}
		};
		api.setUserData();
		return api;
}]);

