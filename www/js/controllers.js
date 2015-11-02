angular.module('app.controllers', [])
  
.controller('dapaCtrl', function($scope, Api, Ui) {
		var vm = this;
		vm.api = Api;
		vm.ui = Ui;
		//$scope.api = Api;
});