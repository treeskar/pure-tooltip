(function(){
	'use strict';

	angular
		.module('app',['ngAnimate','ngRoute', 'ngSanitize', 'Controllers', 'colorpicker.module', 'Directives'])
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
						templateUrl: 'demo.html'
					})
					.when('/diy', {
						controller: 'diyCtrl',
						templateUrl: 'diy.html'
					})
					.otherwise({
						redirectTo: '/demo'
					});
			}
		]);
}());
