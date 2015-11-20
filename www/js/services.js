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
						/*{
							id: 'first_name',
							name: 'First Name',
							type: 'input',
							placeholder: 'What is your given name?',
							subtype: 'text',
							validations: {
								maxLength: 60
							}
						},
						{
							id: 'last_name',
							name: 'Last Name',
							type: 'input',
							placeholder: 'What is your family name?',
							subtype: 'text',
							validations: {
								maxLength: 60
							}
						},*/
						{
							id: 'country_of_residence',
							name: 'Country of Residence',
							type: 'input',
							placeholder: 'The country you currently live in',
							subtype: 'text',
							validations: {
								maxLength: 40
							},
							required: true
						},
						{
							id: 'currently_living_usa',
							name: 'Currently living in USA?',
							type: 'bool',
							placeholder: 'Are you currently living in the USA?',
							answers: {
								true: 'Yes',
								false: 'No'
							}
						},
						{
							id: 'state_of_residence',
							name: 'State of Residence',
							type: 'input',
							placeholder: 'The state you currently live in',
							subtype: 'text',
							required: true
						},
						{
							id: 'client_user_age',
							name: 'Client/User Age',
							type: 'input',
							placeholder: 'How old are you?',
							subtype: 'number',
							validations: {max: 150},
							required: true
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
							id: 'us_citizen_spouse',
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
							id: 'legal_permanent_resident_spouse',
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
							id: 'us_citizen_parent',
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
							id: 'us_citizen_children',
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
							id: 'oldest_us_citizen_childs_age',
							name: 'Oldest U.S. Citizen Child’s Age',
							type: 'input',
							placeholder: 'Age of your oldest child U.S. citizen?',
							subtype: 'number',
							validations: {max: 150},
							condition: 'us_citizen_children',
							required: true
						},
						{
							id: 'legal_permanent_resident_parent',
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
							id: 'living_us_citizen_brother_sister',
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
							id: 'convicted_drug_related_crime_any_country',
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
							id: 'convicted_murder',
							name: 'Have you been convicted of murder?',
							type: 'bool',
							answers: {
								true: 'Yes',
								false: 'No'
							},
							subtype: 'radio'
						},
						{
							id: 'falsely_claimed_usa_citizen',
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
							id: 'deported_removed_from_usa',
							name: 'Have you been deported or removed from the USA? ',
							type: 'bool',
							answers: {
								true: 'Yes',
								false: 'No'
							},
							subtype: 'radio'
						},
						{
							id: 'times_reported_removed',
							name: 'How many times have you been deported or removed from the USA?',
							type: 'input',
							placeholder: '1',
							subtype: 'number',
							condition: 'deported_removed_from_usa',
							validations: {
								max: 100
							},
							required: true

						},
						{
							id: 'last_deported_date',
							name: 'What is the date of your last deportation?',
							type: 'input',
							subtype: 'date',
							placeholder: 'When were you last deported?',
							condition: 'deported_removed_from_usa',
							required: true
						},
						{
							id: 'illegally_assisted_other_under_18',
							name: 'Have you ever assisted any person, other than your child who was under the age of 18 years old, to illegally cross the border into the USA?',
							type: 'bool',
							answers: {
								true: 'Yes',
								false: 'No'
							},
							subtype: 'radio'
						},
						{
							id: 'times_illegaly_crossed_into_usa',
							name: 'How many different times have you illegally crossed the border into the USA?',
							type: 'input',
							placeholder: '1',
							subtype: 'number',
							validations: {
								max: 100
							}
						},
						{
							id: 'last_entry_usa_authorized',
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
	.service('Api', ['$ionicHistory', '$http', '$state', '$window', 'Ui', function ($ionicHistory, $http, $state, $window, Ui) {

		var localStorage = $window.localStorage;
		var baseUrl = 'http://api.bealeandassociates.com';

		var api = {

			// util
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
				formId ? $state.go(state, {formId: formId, section: section}) :
					$state.go(state);
			},
			navigateForm: function (direction) {
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
				api.forms[index] = form;
				api.userData.first_name = JSON.stringify(api.forms);
				api.updateUser(api.userData);
				localStorage.setItem('forms', JSON.stringify(api.forms));
			},
			removeForm: function (index) {
				api.forms.splice(index, 1);
				api.userData.first_name = JSON.stringify(api.forms);
				api.updateUser(api.userData);

			},
			submitForm: function (form) {
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

