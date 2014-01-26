(function(){
	'use strict';

	angular
		.module('Directives', [])
		.directive('demoTooltip', ['$document', '$window', function($document, $window){
			return {
				restrict: 'A',
				replace: true,
				priority: 10,
				link: function(scope, elm, attr){
					scope.text = 'Pure CSS Tooltip';
					scope.data = {};
					scope.tooltipStyle = '';
					// implement affix
					if(typeof scope.tooltip === 'undefined'){
						return;
					}
					if(scope.tooltip.affix){
						$document.bind('scroll', function(e){
							if($window.scrollY > 50){
								elm.addClass('affix');
							} else {
								elm.removeClass('affix');
							}
						});
					}
					scope.$watch('tooltip', function(){
						if(typeof scope.tooltip === 'undefined'){
							return;
						}
						scope.tooltipStyle = ''+
							'#wrapper header h1.tooltip-head {'+
								'background-color: '+scope.tooltip.boxColor+';'+
								'border-radius: '+scope.tooltip.boxRadius+'px;'+
								'box-shadow: 0 0 '+scope.tooltip.boxShadowSize+'px '+scope.tooltip.boxShadowColor+';'+
								'color: '+scope.tooltip.textColor+';'+
								'font-size: '+Math.round(scope.tooltip.textSize*2.15)+'px;'+
								'text-shadow: 0 0 '+scope.tooltip.textShadowSize+'px '+scope.tooltip.textShadowColor+';'+
							'}'+
							'#wrapper header h1.tooltip-head:after {' +
								'border-width: '+scope.tooltip.triangleSize+'px;'+
								'border-top-color: '+scope.tooltip.boxColor+';'+
							'}';
					}, true);

				},
				template: '' +
					'<div>' +
						'<style ng-bind-html="tooltipStyle"></style>' +
						'<h1 '+
							'class="tooltip-head" ' +
							'contenteditable="true" ' +
						'>{{ text }}</h1>'+
					'</div>'
			};
		}])
		.directive('header', ['Constant',function(Constant){
			return {
				restrict: 'A',
				replace: true,
				priority: 20,
				link: function(scope, attr){
				},
				templateUrl: 'header-tpl.html'
			};
		}]);
}());