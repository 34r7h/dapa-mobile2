angular.module('app.services', [])
	.service('Ui', ['$window', function ($window) {
		var ui = {
			dHeight: $window.innerHeight,
			dWidth: $window.innerWidth,
			formModel: [
				/*
				 * validations: object of {camelCased html5 errors}
				 * condition: string id of another question that must be true on the scope*/
				{
					name: 'About you',
					complete: 15,
					questions: [
						{
							id: 'firstName',
							name: 'First Name',
							type: 'input',
							placeholder: 'What is your given name?',
							subtype: 'text',
							validations: {
								maxLength: 60
							}
						},
						{
							id: 'lastName',
							name: 'Last Name',
							type: 'input',
							placeholder: 'What is your family name?',
							subtype: 'text',
							validations: {
								maxLength: 60
							}
						},
						{
							id: 'country',
							name: 'Country of Residence',
							type: 'input',
							placeholder: 'The country you currently live in',
							subtype: 'text',
							validations: {
								maxLength: 40
							}
						},
						{
							id: 'country',
							name: 'Country of Residence',
							type: 'input',
							placeholder: 'The country you currently live in',
							subtype: 'text',
							validations: {
								maxLength: 40
							}
						},
						{
							id: 'state',
							name: 'State of Residence',
							type: 'input',
							placeholder: 'The state you currently live in',
							subtype: 'text'
						},
						{
							id: 'age',
							name: 'Client/User Age',
							type: 'input',
							placeholder: 'How old are you?',
							subtype: 'number',
							validations: {max: 150}
						}
					]
				},
				{
					name: 'Your family',
					complete: 30,
					questions: [
						{
							id: 'married',
							name: 'Are you married or single',
							type: 'bool',
							answers: {
								true: 'Married',
								false: 'Single'
							},
							subtype: 'radio'
						},
						{
							id: 'citizenSpouse',
							name: 'U.S. Citizen Spouse',
							type: 'bool',
							answers: {
								true: 'Yes',
								false: 'No'
							},
							placeholder: 'Is your spouse a citizen of the U.S.?',
							subtype: 'radio',
							condition: 'married'
						},
						{
							id: 'residentSpouse',
							name: 'Legal Permanent Resident Spouse',
							type: 'bool',
							answers: {
								true: 'Yes',
								false: 'No'
							},
							placeholder: 'Is your spouse a legal permanent resident of the U.S.?',
							subtype: 'radio',
							condition: 'married'
						},
						{
							id: 'citizenParent',
							name: 'U.S. Citizen Parent',
							type: 'bool',
							answers: {
								true: 'Yes',
								false: 'No'
							},
							placeholder: 'Are any of your parents citizens of the U.S.?',
							subtype: 'radio'
						},
						{
							id: 'citizenChildren',
							name: 'U.S. Citizen Children',
							type: 'bool',
							answers: {
								true: 'Yes',
								false: 'No'
							},
							placeholder: 'Are any of your children citizens of the U.S.?',
							subtype: 'radio'
						},
						{
							id: 'oldestChild',
							name: 'Oldest U.S. Citizen Child’s Age',
							type: 'input',
							placeholder: 'Age of your oldest child U.S. citizen?',
							subtype: 'number',
							validations: {max: 150},
							condition: 'citizenChildren'
						},
						{
							id: 'residentParent',
							name: 'Legal Permanent Resident Parent',
							type: 'bool',
							answers: {
								true: 'Yes',
								false: 'No'
							},
							placeholder: 'Are any of your parents legal permanent residents of the U.S.?',
							subtype: 'radio'
						},
						{
							id: 'citizenSibling',
							name: 'Do you have a living U.S. Citizen brother or sister?',
							type: 'bool',
							answers: {
								true: 'Yes',
								false: 'No'
							},
							subtype: 'radio'
						}
					]
				},
				{
					name: 'Legal history',
					complete: 60,
					questions: [
						{
							id: 'drugHistory',
							name: 'Have you been convicted of a drug related crime in any country?',
							type: 'bool',
							answers: {
								true: 'Yes',
								false: 'No'
							},
							placeholder: '(not including possession of less than 30 grams of marijuana)',
							subtype: 'radio'
						},
						{
							id: 'murderHistory',
							name: 'Have you been convicted of murder?',
							type: 'bool',
							answers: {
								true: 'Yes',
								false: 'No'
							},
							subtype: 'radio'
						},
						{
							id: 'fraudHistory',
							name: 'Have you ever falsely claimed to be a U.S. citizen?',
							type: 'bool',
							answers: {
								true: 'Yes',
								false: 'No'
							},
							subtype: 'radio'
						}
					]
				},
				{
					name: 'Border History',
					complete: 100,
					questions: [
						{
							id: 'deportationHistory',
							name: 'Have you been deported or removed from the USA? ',
							type: 'bool',
							answers: {
								true: 'Yes',
								false: 'No'
							},
							subtype: 'radio'
						},
						{
							id: 'deportationNumber',
							name: 'How many times have you been deported or removed from the USA?',
							type: 'input',
							placeholder: '1',
							subtype: 'number',
							condition: 'deportationHistory',
							validations: {
								max: 100
							}
						},
						{
							id: 'lastDeportation',
							name: 'What is the date of your last deportation?',
							type: 'input',
							subtype: 'date',
							placeholder: 'When were you last deported?',
							condition: 'deportationHistory'
						},
						{
							id: 'borderAssist',
							name: 'Have you ever assisted any person, other than your child who was under the age of 18 years old, to illegally cross the border into the USA?',
							type: 'bool',
							answers: {
								true: 'Yes',
								false: 'No'
							},
							subtype: 'radio'
						},
						{
							id: 'illegalCrossing',
							name: 'How many different times have you illegally crossed the border into the USA?',
							type: 'input',
							placeholder: '1',
							subtype: 'number',
							validations: {
								max: 100
							}
						},
						{
							id: 'lastEntry',
							name: 'Was your last entry into the USA with a Visa or other documented authorization?',
							type: 'bool',
							answers: {
								true: 'Yes',
								false: 'No'
							},
							subtype: 'radio'
						}
					]
				}
			]
		};
		return ui;
	}])
	.service('Api', ['$ionicHistory', '$http', '$state', '$window', 'Ui', '$firebaseObject', '$firebaseArray', '$firebaseAuth', 'Firebase', '$stateParams', function ($ionicHistory, $http, $state, $window, Ui, $firebaseObject, $firebaseArray, $firebaseAuth, Firebase, $stateParams) {

		var localStorage = $window.localStorage;
		console.log(localStorage);
		var baseUrl = 'http://api.bealeandassociates.com';
/*

		// Firebase Mock API init
		var fb = Firebase;
		var dapaRef = 'https://irthos.firebaseio.com/dapa';
		var fbRef = new fb(dapaRef);
*/

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
			go: function (state, formId, section) {
				console.log(arguments);
				formId ? $state.go(state, {formId: formId, section: section}) :
					$state.go(state);
				console.log($stateParams)
			},
			register: function (user) {

				/*
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
				 */

				// Main API
				$http.post(baseUrl + '/users', {
					user: user
				}).success(function (data) {
					// api.userData = data;
					// localStorage.setItem('data', JSON.stringify(data));
					Ui.success = true;
				}).error(function (data) {
					Ui.error = data.errors;
					console.error('error', data);
				});

			},
			login: function (user) {
				console.log('logging in');
				api.go('dapa.forms');
				/*

				 // Firebase Mock API
				 var fbAuth = $firebaseAuth(fbRef);
				 fbAuth.$authWithPassword({
				 email: user.email,
				 password: user.password
				 }).then(function (authData) {
				 Ui.back = false;
				 api.userData = authData;
				 localStorage.setItem('data', JSON.stringify(authData));
				 var fbArray = $firebaseArray(fbRef.child('users/' + api.userData.uid + '/forms'));
				 fbArray.$loaded().then(function (forms) {
				 api.forms = forms;
				 localStorage.setItem('forms', JSON.stringify(forms));
				 });
				 }).catch(function (error) {
				 console.error("Authentication failed:", error);
				 });
				 */

				// Main API
				$http.post(baseUrl + '/sessions', {
					session: user
				}).success(function (data) {
					console.log(data);
					Ui.back = false;
					api.userData = data;
					localStorage.setItem('data', JSON.stringify(data));
					api.go('dapa.forms');
				}).error(function (data) {
					Ui.error = data.errors;
					console.error('error', Ui.error)
				});

			},
			logout: function () {
				/*

				 // Firebase Mock API
				 var fbAuth = $firebaseAuth(fbRef);
				 localStorage.clear();
				 api.userData = null;
				 fbAuth.$unauth();
				 */
				localStorage.clear();
				// Main API
				$http.delete(baseUrl + '/sessions/' + api.userData.auth_token, {
					headers: {
						Authorization: api.userData.auth_token
					}
				}).success(function () {
					api.userData = {};
				}).error(function (data) {
					console.error('error', data)
				});
			},
			updateUser: function (user) {
				/*

				 // Firebase Mock API
				 var fbObject = $firebaseObject(fbRef.child('users'));
				 fbObject.$loaded().then(function (data) {
				 api.userData = data;
				 localStorage.setItem('data', JSON.stringify(data));
				 data[api.userData.uid] = user;
				 data.$save();
				 });
				 */

				// Main API
				$http.put(baseUrl + '/users/' + api.userData.id, {
					headers: {
						'Content-Type': 'application/json',
						Authorization: api.userData.auth_token
					},
					user: user
				}).success(function (data) {
					api.userData = data;
					localStorage.setItem('data', JSON.stringify(data));
				}).error(function (data) {
					console.error('error', data)
				});

			},
			createForm: function () {
				// Mock Firebase API
				console.log('saving new form', api.userData.id);
				api.forms.push({
					timestamp: Date.now(),
					progress: 1
				});
				api.currentForm = api.forms[api.forms.length - 1];
				localStorage.setItem('forms', JSON.stringify(api.normalize('arr', api.forms)));

				localStorage.setItem('currentForm', JSON.stringify(api.normalize('obj', api.currentForm)));

				/*var fbArray = $firebaseArray(fbRef.child('users/' + api.userData.id + '/forms'));*/
				/*fbArray.$loaded().then(function (forms) {
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
				 });*/
			},
			updateForm: function (id, form) {
				console.log('form update in progress', arguments);
				api.forms[id] = form;
				api.updateUser(api.userData);
				localStorage.setItem('forms', JSON.stringify(api.normalize('arr', api.forms)));
				localStorage.setItem('currentForm', JSON.stringify(api.normalize('obj', form)));

				/*
				 // Firebase Mock API
				 var fbObject = $firebaseObject(fbRef.child('users/' + api.userData.uid + '/forms'));
				 fbObject.$loaded(function (data) {
				 console.log(data);
				 angular.forEach(form, function (question, key) {
				 data[id][key] = question;
				 });
				 fbObject.$save();
				 localStorage.setItem('forms', JSON.stringify(api.normalize('arr', fbObject)));
				 localStorage.setItem('currentForm', JSON.stringify(api.normalize('obj', data[id])));
				 }, function (error) {
				 console.log(error);
				 });*/
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
			},
			navigateForm: function (direction) {
				direction === 'back' ? (
					Ui.back = true,
						api.currentForm.progress == 1 ?
							api.go('dapa.forms') :
							(api.go('dapa.newForm', api.currentForm.timestamp, api.currentForm.progress - 1), api.currentForm.progress = api.currentForm.progress - 1, Ui.formState = Ui.formModel[api.currentForm.progress - 1]
							)
				) :
					(
							Ui.back = false,
							api.currentForm.progress > Ui.formModel.length ?
								api.go('dapa.forms') :
								(api.go('dapa.newForm', api.forms.indexOf(api.currentForm), api.currentForm.progress + 1), api.currentForm.progress = api.currentForm.progress + 1, Ui.formState = Ui.formModel[api.currentForm.progress - 1]
								)
					);

				api.updateForm(api.currentForm.timestamp, api.currentForm);
			},
			setUserData: function () {

				localStorage.data ?
						api.userData = JSON.parse(localStorage.data)
						: api.go('dapa.welcome');

				api.forms = localStorage.forms ? JSON.parse(localStorage.forms) : [];

				/*if (api.userData) {
					var fbArray = $firebaseArray(fbRef.child('users/' + api.userData.id + '/forms'));
					fbArray.$loaded().then(function (forms) {
						api.forms = api.userData.forms || [];
						localStorage.setItem('forms', JSON.stringify(forms));
					});
				}*/

				if (api.forms[0]) {
					api.currentForm = api.forms[api.forms.length - 1];
				}


				console.log(api);

			}
		};
		api.setUserData();
		return api;
	}]);

