'use strict';

angular.module('vig-angular-steps').directive('stepItem', function($compile) {
	return {
		restrict: 'EA',
		template: '<ng-form ng-if="stepNum == settings.currentStep" name="stepForm"><div ng-transclude></div></ng-form>',
		scope: {
			title: '@'
		},
		transclude: true,
		priority: 1500,
		require: '^steps',
		compile: function compile(cElement, cAttrs, transclude) {
			console.log('Child  compile')
			return {
				pre: function preLink($scope, element, attrs, steps) {
					console.log('Child  prelink')
				},
				post: function postLink($scope, element, attrs, steps) {
					console.log('Child  postLink')

					$scope.stepNum = steps.addStep($scope);

					$scope.settings = steps.getSettings();
					console.log('AAAAAAAAAAAAAAAAAAA')
					console.log($scope)
				}
			}
		}
	};
});