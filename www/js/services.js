angular.module('app.services', [])

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

