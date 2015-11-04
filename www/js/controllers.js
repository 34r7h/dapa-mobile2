angular.module('app.controllers', [])
  
.controller('dapaCtrl', function($scope, Api, Ui) {
		var vm = this;
		vm.api = Api;
		vm.ui = Ui;
		vm.user = vm.api.userData;
		console.log('api',vm.api);
	vm.api.login({email:'i@o.io', password:'o'});
	//$scope.api = Api;
});