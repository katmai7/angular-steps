'use strict';

angular.module('vig-angular-steps').directive('stepItem', function($compile) {
	return {
		restrict: 'EA',
		template: '<ng-form ng-if="stepNum == settings.currentStep" name="step-{{stepNum}}">{{test}}<div ng-transclude>' + '</div></ng-form>',
		scope: {
			title: '@',
			current: '@'
		},
		transclude: true,
		// replace: true,
		priority: 1500,
		require: '^steps',
		controller: ['$scope',
			function($scope) {
				console.log('child scope');

			}
		],
		compile: function compile(cElement, cAttrs, transclude) {
			console.log('Child  compile')
			// console.log(cElement[0].outerHTML)
			return {
				pre: function preLink($scope, element, attrs, steps) {
					$scope.stepNum = steps.addStep($scope);

					$scope.settings = steps.getSettings();

					console.log('Child  prelink')
					// console.log(element[0].outerHTML)
				},
				post: function($scope, element, attrs, steps) {
					console.log('Child  postLink')
					// console.log(element[0].outerHTML)
				}
			}
		}
	};
});