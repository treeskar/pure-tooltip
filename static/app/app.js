(function(){
	'use strict';

	angular
		.module('app',['ngAnimate','ngRoute', 'Controllers', 'Directives'])
		.constant('Constant', {
			resource: {
				tpl: '/partials/'
			}
		})
		.config([
			'$locationProvider',
			'$routeProvider',
			'$logProvider',
			'Constant',
			function($locationProvider, $routeProvider, $logProvider, Constant){
				$locationProvider.html5Mode(true);
				$logProvider.debugEnabled(true);

				$routeProvider
					.when('/demo', {
						controller: 'demoCtrl',
						templateUrl: Constant.resource.tpl+'demo-tpl.html'
					})
					.when('/diy', {
						controller: 'diyCtrl',
						templateUrl: Constant.resource.tpl+'diy-tpl.html'
					})
					.otherwise({
						redirectTo: '/demo'
					});
			}
		]);
}());
