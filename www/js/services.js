angular.module('app.services', [])
	.service('Ui', ['$window', function ($window) {
		var ui = {
			dHeight: $window.innerHeight,
			dWidth: $window.innerWidth,
			formModel: [
				{
					name: 'About you',
					complete: 15,
					questions: [
						{
							id: 'first_name',
							name: 'the applicant\'s first name',
							type: 'input',
							placeholder: 'Your first name',
							subtype: 'text'
						},
						{
							id: 'last_name',
							name: 'the applicant\'s last name',
							type: 'input',
							placeholder: 'Your last name',
							subtype: 'text'
						},
						{
							id: 'home_number',
							name: 'home',
							type: 'input',
							placeholder: 'Your home phone number',
							subtype: 'tel'
						},
						{
							id: 'mobile_number',
							name: 'mobile',
							type: 'input',
							placeholder: 'Your mobile phone number',
							subtype: 'tel'
						}

					]
				},
				{
					name: 'About you',
					complete: 30,
					questions: [
						{
							id: 'a_number',
							name: 'a#',
							type: 'input',
							placeholder: 'Your A# number',
							subtype: 'text'
						},
						{
							id: 'ssn',
							name: 'ssn',
							type: 'input',
							placeholder: 'Your Social Security number',
							subtype: 'number'
						},
						{
							id: 'passport',
							name: 'passport',
							type: 'input',
							placeholder: 'Your passport number',
							subtype: 'number'
						},
						{
							id: 'dob',
							name: 'date of birth',
							type: 'input',
							placeholder: 'Your date of birthday',
							subtype: 'date'
						}
					]
				},
				{
					name: 'About you',
					complete: 45
				},
				{
					name: 'Marital status',
					complete: 60
				},
				{
					name: 'Information about your children',
					complete: 75
				},
				{
					name: 'Immigration status',
					complete: 90
				},
				{
					name: 'Immigration status',
					complete: 100
				}
			]
		};
		return ui;
	}])
	.service('Api', ['$ionicHistory', '$http', '$state', '$window', 'Ui', '$firebaseObject', '$firebaseArray', '$firebaseAuth', 'Firebase', function ($ionicHistory, $http, $state, $window, Ui, $firebaseObject, $firebaseArray, $firebaseAuth, Firebase) {

		var localStorage = $window.localStorage;
		console.log($window.localStorage);

		var baseUrl = 'http://api.dapa.dev';

		// Firebase Mock API init
		var fb = Firebase;
		var dapaRef = 'https://irthos.firebaseio.com/dapa';
		var fbRef = new fb(dapaRef);

		var api = {
			normalize: function (format, data) {
				if (format === 'obj') {
					var newObj = {};
					angular.forEach(data, function (val, key) {
						newObj[key] = val;
					});
					return newObj;
				} else {
					var newArr = [];
					angular.forEach(data, function (val) {
						newArr.push(val);
					});
					return newArr;
				}

			},
			go: function (state) {
				$state.go(state);
			},
			register: function (user) {

				// Firebase Mock API
				var fbAuth = $firebaseAuth(fbRef);
				fbAuth.$createUser({
					email: user.email,
					password: user.password
				}).then(function () {
					return fbAuth.$authWithPassword({
						email: user.email,
						password: user.password
					});
				}).then(function (authData) {
					var fbObject = $firebaseObject(fbRef.child('users'));
					fbObject.$loaded().then(function () {
						fbObject[authData.uid] = user;
						fbObject.$save().then(function () {
							api.setUserData();
							Ui.success = true;
						});
					})
				}).catch(function (error) {
					console.error("Error: ", error);
				});

				// Main API
				/*$http.post(baseUrl + '/users', {
				 user: user
				 }).success(function (data) {
				 api.userData = data;
				 api.auth = data;
				 localStorage.setItem('data', JSON.stringify(data));
				 Ui.success = true;
				 }).error(function (data) {
				 Ui.error = data.errors;
				 console.error('error', data);
				 });*/

			},
			login: function (user) {
				console.log('logging in');
				api.go('dapa.forms');

				// Firebase Mock API
				var fbAuth = $firebaseAuth(fbRef);
				fbAuth.$authWithPassword({
					email: user.email,
					password: user.password
				}).then(function (authData) {
					Ui.back = false;
					api.userData = authData;
					api.auth = authData;
					localStorage.setItem('data', JSON.stringify(authData));
					var fbArray = $firebaseArray(fbRef.child('users/' + api.userData.uid + '/forms'));
					fbArray.$loaded().then(function (forms) {
						api.forms = forms;
						localStorage.setItem('forms', JSON.stringify(forms));
					});
				}).catch(function (error) {
					console.error("Authentication failed:", error);
				});

				// Main API
				/*$http.post(baseUrl + '/sessions', {
				 session: user
				 }).success(function (data) {
				 Ui.back = false;
				 api.userData = data;
				 api.auth = data;
				 localStorage.setItem('data', JSON.stringify(data));
				 api.go('dapa.form');
				 }).error(function (data) {
				 Ui.error = data.errors;
				 console.error('error', Ui.error)
				 });*/

			},
			logout: function () {

				// Firebase Mock API
				var fbAuth = $firebaseAuth(fbRef);
				localStorage.clear();
				api.userData = null;
				api.auth = null;
				fbAuth.$unauth();

				// Main API
				/*$http.delete(baseUrl + '/sessions/' + api.auth.auth_token, {
				 headers:{
				 Authorization: api.auth.auth_token
				 }
				 }).success(function (data) {
				 localStorage.clear();
				 api.userData = null;
				 api.auth = null;
				 }).error(function (data) {
				 console.error('error', data)
				 });*/
			},
			updateUser: function (user) {

				// Firebase Mock API
				var fbObject = $firebaseObject(fbRef.child('users'));
				fbObject.$loaded().then(function (data) {
					api.userData = data;
					api.auth = data;
					localStorage.setItem('data', JSON.stringify(data));
					data[api.userData.uid] = user;
					data.$save();
				});

				// Main API
				/*$http.put(baseUrl + '/users/' + api.auth.auth_token, {
				 headers:{
				 Authorization: api.auth.auth_token

				 },
				 user: user
				 }).success(function (data) {
				 api.userData = data;
				 api.auth = data;
				 localStorage.setItem('data', JSON.stringify(data));
				 }).error(function (data) {
				 console.error('error', data)
				 });*/

			},
			setUserData: function () {

				localStorage.data ?
						(api.auth = JSON.parse(localStorage.data),
					api.userData = JSON.parse(localStorage.data))
						: api.go('dapa.welcome');

				localStorage.forms ?
					(api.forms = JSON.parse(localStorage.forms), api.currentForm = api.forms[api.forms.length - 1])
					: null;

				if (api.userData) {
					var fbArray = $firebaseArray(fbRef.child('users/' + api.userData.uid + '/forms'));
					fbArray.$loaded().then(function (forms) {
						api.forms = forms;
						localStorage.setItem('forms', JSON.stringify(forms));
					});
				}


				console.log(api);

			},
			createForm: function () {
				// Mock Firebase API
				console.log('saving new form', api.userData.uid);
				var fbArray = $firebaseArray(fbRef.child('users/' + api.userData.uid + '/forms'));
				fbArray.$loaded().then(function (forms) {
					console.log('yo selfs', forms);
					forms.$add({
						timestamp: Date.now(),
						progress: 1
					}).then(function (newForm) {
						api.forms = [];
						angular.forEach(forms, function (form) {
							api.forms.push(form);
						});
						api.currentForm = api.forms[api.forms.length - 1];
						localStorage.setItem('forms', JSON.stringify(api.normalize('arr', api.forms)));

						localStorage.setItem('currentForm', JSON.stringify(api.normalize('obj', api.currentForm)));

					});
				});
			},
			updateForm: function (id, form) {
				console.log('form update in progress', arguments);

				// Firebase Mock API
				var fbObject = $firebaseObject(fbRef.child('users/'+ api.userData.uid +'/forms'));
				fbObject.$loaded(function(data){
					console.log(data);
					angular.forEach(form, function (question, key) {
						data[id][key] = question;
					});
					fbObject.$save();
					localStorage.setItem('forms', JSON.stringify(api.normalize('arr', fbObject)));
					localStorage.setItem('currentForm', JSON.stringify(api.normalize('obj', data[id])));
				}, function (error) {
					console.log(error);
				});
			},
			removeForm: function (index) {
				console.log('removing form', index);
				// Firebase Mock API
				var fbArray = $firebaseArray(fbRef.child('users/' + api.userData.uid + '/forms'));
				fbArray.$loaded().then(function (data) {
					var form = data[index];
					data.$remove(form);
					api.forms = data;
				});

			}
		};
		api.setUserData();
		return api;
	}]);

