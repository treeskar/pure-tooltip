(function(){
	'use strict';

	angular.module('Controllers', [])
		.controller('demoCtrl', ['$scope', function($scope){
			$scope.page = 'demo';
		}])
		.controller('diyCtrl', ['$scope', function($scope){
			$scope.page = 'diy';
		}]);
}());