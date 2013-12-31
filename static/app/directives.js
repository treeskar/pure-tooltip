(function(){
	'use strict';

	angular
		.module('Directives', [])
		.directive('header', ['Constant',function(Constant){
			return {
				restrict: 'A',
				replace: true,
				scope: {
					activePage: '=page'
				},
				link: function(scope, attr){
				},
				templateUrl: 'header-tpl.html'
			};
		}]);
}());