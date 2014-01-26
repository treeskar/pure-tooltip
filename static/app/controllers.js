(function(){
	'use strict';

	angular.module('Controllers', [])
		.controller('demoCtrl', ['$scope', function($scope){
			$scope.activePage = 'demo';
		}])
		.controller('diyCtrl', ['$scope', function($scope){
			$scope.activePage = 'diy';
			$scope.data = {};

			$scope.tooltip = {
				boxColor: 'rgba(0, 0, 0, 0.8)',
				boxRadius: 0,
				boxShadowColor: 'rgba(0, 0, 0, 0.5)',
				boxShadowSize: 30,
				triangleSize: 32,
				textColor: '#FFF',
				textSize: 15,
				textShadowColor: '#000000',
				textShadowSize: 16,
				attribute: 'tooltip',
				affix: true
			};
		}]);
}());