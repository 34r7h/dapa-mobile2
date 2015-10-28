angular.module('app.controllers', [])
  
.controller('dapaCtrl', function($scope, Api) {
		var vm = this;
		vm.api = Api;
		//$scope.api = Api;
});