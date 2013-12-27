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
				templateUrl: Constant.resource.tpl+'header-tpl.html'
			};
		}]);
}());