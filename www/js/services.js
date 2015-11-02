angular.module('app.services', [])
.service('Ui', ['$window', function ($window) {
		var ui = {
			dHeight: $window.innerHeight,
			dWidth: $window.innerWidth
		};
		return ui;
	}])
.service('Api', ['$ionicHistory', '$http', function($ionicHistory, $http){
		var baseUrl = 'http://api.dapa.dev:3000';
		var api = {
			register: function (user) {
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

