'use strict';

angular.module('vig-angular-steps').directive('stepItem', function($compile) {
	return {
		restrict: 'EA',
		template: '<ng-form ng-if="stepNum == settings.currentStep" name="stepForm"><div ng-transclude></div></ng-form>',
		scope: {
			title: '@',
			onInitStep: '&'
		},
		transclude: true,
		require: '^steps',
		compile: function compile(cElement, cAttrs, transclude) {
			return {
				pre: function preLink($scope, $element, $attrs, steps) {
				},
				post: function postLink($scope, $element, $attrs, steps) {
					$scope.stepNum = steps.addStep($scope);

					$scope.settings = steps.getSettings();
				}
			}
		}
	};
});