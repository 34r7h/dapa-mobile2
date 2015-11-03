var fb = Firebase;
var dapaRef = 'https://irthos.firebaseio.com/dapa';
fbRef = new fb(dapaRef);

angular.module('app.services', [])
.service('Ui', ['$window', function ($window) {
		var ui = {
			dHeight: $window.innerHeight,
			dWidth: $window.innerWidth
		};
		return ui;
	}])
.service('Api', ['$ionicHistory', '$http', '$firebaseObject', '$firebaseArray', '$firebaseAuth', function($ionicHistory, $http, $firebaseObject, $firebaseArray, $firebaseAuth){
		var baseUrl = 'http://api.dapa.dev:3000';
		var api = {
			fbTest: function (data) {
				var fbObject = $firebaseObject(fbRef);
				fbObject.$loaded().then(function () {
					fbObject['test'] = data;
					fbObject.$save();
				})
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
				}).then(function(userData) {
					console.log("User " + userData.uid + " created successfully!");
					return fbAuth.$authWithPassword({
						email: user.email,
						password: user.password
					});
				}).then(function(authData) {
					console.log("Logged in as:", authData.uid);
					user.password = null;
					var fbObject = $firebaseObject(fbRef.child('users'));
					fbObject.$loaded().then(function () {
						fbObject[authData.uid] = user;
						fbObject.$save();
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
			}
		};
		return api;
}]);

