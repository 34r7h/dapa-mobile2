angular.module('app.services', [])
	.service('Api', ['$ionicHistory', '$http', '$state', '$window', 'Ui', function ($ionicHistory, $http, $state, $window, Ui) {

		var localStorage = $window.localStorage;
		var baseUrl = 'http://api.bealeandassociates.com';

		var api = {

			// util
			normalize: function (format, data) {
				/*This function is used to strip out hidden data from JSON objects and arrays to prevent circular ref errors. If format === 'obj' then it returns an object, else returns an array.*/
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
			go: function (state, formId, section) {
				/*Helper function for routing because ui-sref on click happens before the necessary functions are fired. Handles true bookmark-able routing */
				formId ? $state.go(state, {formId: formId, section: section}) :
					$state.go(state);
			},
			navigateForm: function (direction) {
				/* Keeps track of position in a form, saves the current progress, and sets the right animation direction (when 'direction' argument is set to 'back', the app animates from the left.) */
				direction === 'back' ? (
					Ui.back = true,
						api.currentForm.progress == 1 ?
							api.go('dapa.forms') :
							(api.go('dapa.form', api.currentForm.timestamp, api.currentForm.progress - 1), api.currentForm.progress = api.currentForm.progress - 1, Ui.formState = Ui.formModel[api.currentForm.progress - 1]
							)
				) :
					(
						Ui.back = false,
							api.currentForm.progress > Ui.formModel.length ?
								api.go('dapa.forms') :
								(api.go('dapa.form', api.currentForm.timestamp, api.currentForm.progress + 1), api.currentForm.progress = api.currentForm.progress + 1, Ui.formState = Ui.formModel[api.currentForm.progress - 1]
								)
					);

				api.updateForm(api.forms.indexOf(api.currentForm), api.currentForm);
			},
			syncData: function () {
				/* Syncs the scope with local storage for a user and their forms, else sends the user to the welcome page */
				localStorage.data ?
					(
						api.userData = JSON.parse(localStorage.data),
							api.updateUser(api.userData),
							api.forms = JSON.parse(api.userData.first_name)
					)
					: api.go('dapa.welcome');

				localStorage.currentForm ?
					(
						api.currentForm = JSON.parse(localStorage.currentForm)
					)
					: null;
			},

			// app
			recover: function (email) {
				/* Handles password recovery and success/error handling */
				$http.post(
					baseUrl + '/users/password',
					{
						user: {
							email: email
						}
					},
					{
						headers: {
							'Content-Type': 'application/json'
						}
					}).success(function (data) {
					Ui.showRecoverConfirmation = true;
					Ui.confirmProfileChange = true;
					Ui.message = data.message;
				}).error(function (data) {
					console.error('error', data);
					Ui.error = data;
					Ui.showRecoverConfirmation = true;
				});
			},
			register: function (user) {
				/* Creates a request to make a new user on the server */
				$http.post(baseUrl + '/users', {
					user: user
				}).success(function () {
					Ui.success = true;
				}).error(function (data) {
					Ui.error = data.errors;
					console.error('error', data);
				});

			},
			login: function (user) {
				/* Logs in, set's user data and localStorage (using the property first_name to hold created forms, as a temporary measure) */
				$http.post(
					baseUrl + '/sessions',
					{
						session: user
					}
				).then(
					function (data) {
						Ui.back = false;
						api.userData = data.data;
						localStorage.setItem('data', JSON.stringify(data.data));
						api.forms = api.userData.first_name ? JSON.parse(api.userData.first_name) : [];
						api.go('dapa.forms');
					},
					function (data) {
						Ui.error = data.data.errors;
						console.error('error', Ui.error)
					}
				);
			},
			logout: function () {
				/* clears localStorage and userData to remove the auth token from the user's browser */
				localStorage.clear();
				$http.delete(
					baseUrl + '/sessions',
					{
						headers: {
							'Content-Type': 'application/json',
							'Authorization': api.userData.auth_token
						}
					}
				).then(
					function () {
						api.userData = {}
					},
					function (data) {
						console.error('error', data)
					}
				);
			},
			updateUser: function (user) {
				/* This is the main update function since user data and their forms are saved to the user object. On success, it updates api.userData and localStorage with the returned user object */
				localStorage.setItem('data', JSON.stringify(user));
				$http.put(
					baseUrl + '/users/' + api.userData.id,
						user,
					{
						headers: {
							'Content-Type': 'application/json',
							'Authorization': api.userData.auth_token
						}

					}).success(function (data) {
					api.userData = data;
					localStorage.setItem('data', JSON.stringify(data));
				}).error(function (data) {
					data.errors === 'Not authenticated' ? api.go('dapa.login') : null;
				});

			},
			createForm: function () {
				/* Makes a new form on the scope and localStorage. Doesn't save to the server until a user enters info and updates the form via updateForm */
				!api.forms ? api.forms = [] : null;
				api.currentForm = {
					timestamp: Date.now(),
					progress: 1
				};
				api.forms.push(api.currentForm);
				localStorage.setItem('forms', JSON.stringify(api.normalize('arr', api.forms)));
				localStorage.setItem('currentForm', JSON.stringify(api.normalize('obj', api.currentForm)));

			},
			updateForm: function (index, form) {
				/* Prepares (JSON.stringifies) a form to be updated via updateUser */
				api.forms[index] = form;
				api.userData.first_name = JSON.stringify(api.forms);
				api.updateUser(api.userData);
				localStorage.setItem('forms', JSON.stringify(api.forms));
			},
			removeForm: function (index) {
				/* Removes a form from scope, localStorage, and the server */
				api.forms.splice(index, 1);
				api.userData.first_name = JSON.stringify(api.forms);
				api.updateUser(api.userData);

			},
			submitForm: function (form) {
				/* Sends a complete form to the server and handles the success/error callbacks. */
				/* TODO: figure out why this method works sometimes but throws a 500 error others */
				$http.post(
					baseUrl + '/users/' + api.userData.id + '/screening_forms',
					{
						screening_form: form
					},
						{
							headers: {
								'Content-Type': 'application/json',
								'Authorization': api.userData.auth_token
							}

						}).success(function (data) {
					console.log(data);
					Ui.message = data.message;
					Ui.confirmSubmitForm = true;
					Ui.success = true;
				}).error(function (data) {
					Ui.error = data.errors;
					console.error('error', data);
				});
			}
		};
		api.syncData();
		return api;
	}]);

