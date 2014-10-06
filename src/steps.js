'use strict';

angular.module('vig-angular-steps').directive('steps', function() {

	//default data
	var defaultFormName = "stepsForm",
		defaultSettings = {
			currentStep: 1
		};

	return {
		restrict: 'EA',
		// templateUrl: function(element, attrs) {
		// 	return attrs.template || "src/steps.html";
		// },
		template: '<form name="stepsForm">'
				    +'<div class="wizard clearfix">'
				        +'<ul class="steps">'
				            +'<li ng-class="{active: settings.currentStep === {{$index + 1}} }" ng-repeat="step in steps" ng-click="goTo($index + 1, stepsForm.$valid)">'
				                +'<span  class="badge" ng-class="{\'badge-info\':settings.currentStep === {{$index + 1}}, \'badge-success\': settings.currentStep > {{$index + 1}} }">{{$index + 1}}</span>'
				                +'{{step.title}}'
				            +'</li>'
				        +'</ul>'
				        +'<div class="actions visible-lg-block">'
				            +'<button type="button" class="btn btn-white btn-xs btn-prev" ng-click="previous()" ng-disabled="settings.currentStep == 1 || stepsForm.$invalid">Prev</button>'
				            +'<button type="button" class="btn btn-white btn-xs btn-next" ng-click="next()" ng-disabled="settings.currentStep == steps.length || stepsForm.$invalid">Next</button>'
				        +'</div>'
				    +'</div>'
				    +'<div class="step-content" ng-transclude>'
				    +'</div>'
				+'</form>',
		scope: {
			settings: '=?'
		},
		transclude: true,
		compile: function compile(cElement, cAttrs, transclude) {
			return {
				pre: angular.noop,
				post: function postLink($scope, $element, $attrs) {
					$scope.settings.mainForm = $scope[defaultFormName];
					$scope.settings.stepForm = $scope.formStep;
				}
			}
		},

		controller: ['$scope', '$element',
			function($scope, $element) {

				$scope.settings = angular.extend(defaultSettings, $scope.settings);

				//number of steps
				$scope.steps = [];

				this.addStep = function(step) {
					$scope.steps.push(step);
					if ($scope.steps.length === 1) {
						$scope.goTo($scope.steps[0]);
					}

					return $scope.steps.length;
				};

				this.getSettings = function() {
					return $scope.settings;
				};

				$scope.goTo = this.goTo = function(stepNum, canSet) {
					canSet = typeof canSet != undefined? canSet : true;
					if (stepNum !== $scope.settings.currentStep 
						&& (stepNum <= $scope.steps.length && stepNum > 0) 
						&& canSet) {
						$scope.settings.currentStep = stepNum;
					}
				};

				$scope.next = this.next = function() {
					if ($scope.settings.currentStep < $scope.steps.length) {
						$scope.settings.currentStep += 1;
					}
					console.log($scope.settings.currentStep);
				};

				$scope.previous = this.previous = function() {
					if ($scope.settings.currentStep > 1) {
						$scope.settings.currentStep -= 1;
					}
					console.log($scope.settings.currentStep);
				};

			}
		]
	};
});