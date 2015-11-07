angular.module('app.services', [])
.service('Ui', ['$window', function ($window) {
		var ui = {
			dHeight: $window.innerHeight,
			dWidth: $window.innerWidth
		};
		return ui;
	}])
.service('Api', ['$ionicHistory', '$http', '$state', '$window', 'Ui', function($ionicHistory, $http, $state, $window, Ui){
		var localStorage = $window.localStorage;
		console.log($window.localStorage);

	var baseUrl = 'http://api.dapa.dev:3000';

		var api = {
			go: function (state) {
				$state.go(state);
			},
			register: function (user) {
				console.log('Registering', user);
				$http.post(baseUrl + '/users', {
					user: user
				}).success(function (data) {
					api.userData = data;
					api.auth = data;
					localStorage.setItem('data', JSON.stringify(data));
					Ui.success = true;
					console.log('success',data);
				}).error(function (data) {
					Ui.error = data.errors;
					console.error('error', data);
				});
			},
			login: function (user) {

				console.log('logging in', user);
				$http.post(baseUrl + '/sessions', {
					session: user
				}).success(function (data) {
					Ui.back = false;
					console.log('success', data);
					api.userData = data;
					api.auth = data;
					localStorage.setItem('data', JSON.stringify(data));
					api.go('dapa.form');
				}).error(function (data) {
					Ui.error = 'Wrong email / password combination';
					console.error('error', Ui.error)
				});
			},
			logout: function () {

				// DELETE /sessions/:id - Logout

				console.log('logging out', api.auth.email);
				$http.delete(baseUrl + '/sessions/' + api.auth.auth_token, {
					headers:{
						Authorization: api.auth.auth_token
					}
				}).success(function (data) {
					localStorage.clear();
					api.userData = null;
					api.auth = null;
					console.log('success',data);
				}).error(function (data) {
					console.error('error', data)
				});

				/*/!*
				*
				* Mock logout via firebase
				*
				* *!/
				var fbAuth = $firebaseAuth(fbRef);
				api.userData = null;
				api.auth = null;
				fbAuth.$unauth();
				/!*
				*
				*
				*
				* *!/*/
			},
			updateUser: function (user) {

				console.log('updating', user);
				$http.put(baseUrl + '/users/' + api.auth.auth_token, {
					headers:{
						Authorization: api.auth.auth_token

					},
					user: user
				}).success(function (data) {
					console.log('success', data);
					api.userData = data;
					api.auth = data;
					localStorage.setItem('data', JSON.stringify(data));
				}).error(function (data) {
					console.error('error', data)
				});

			},
			setUserData: function () {

				localStorage.data ? (
						api.auth = JSON.parse(localStorage.data),
						api.userData = JSON.parse(localStorage.data)
				) : api.go('dapa.welcome');


			}
		};
		api.setUserData();
		return api;
}]);

