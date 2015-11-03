angular.module('app.controllers', [])
  
.controller('dapaCtrl', function($scope, Api, Ui) {
		var vm = this;
		vm.api = Api;
		vm.ui = Ui;
		vm.user = vm.api.userData;
		//$scope.api = Api;
});