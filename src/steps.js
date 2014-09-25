'use strict';

angular.module('vig-angular-steps').directive('steps', function($compile) {
	return {
		restrict: 'EA',
		// templateUrl: function(element, attrs) {
		// 	return attrs.template || "src/steps.html";
		// },
		template: '<form name="stepsform">'
				    +'<div class="wizard clearfix">'
				        +'<ul class="steps">'
				            +'<li ng-class="{active: settings.currentStep === {{$index + 1}} }" ng-repeat="step in steps" ng-click="goToStep($index + 1, stepsform.$valid)">'
				                +'<span  class="badge" ng-class="{\'badge-info\':settings.currentStep === {{$index + 1}}, \'badge-success\': settings.currentStep > {{$index + 1}} }">{{$index + 1}}</span>'
				                +'{{step.title}}'
				            +'</li>'
				        +'</ul>'
				        +'<div class="actions visible-lg-block">'
				            +'<button type="button" class="btn btn-white btn-xs btn-prev" ng-click="prevStep()" ng-disabled="settings.currentStep == 1 || stepsform.$invalid">Prev</button>'
				            +'<button type="button" class="btn btn-white btn-xs btn-next" ng-click="nextStep()" ng-disabled="settings.currentStep == steps.length || stepsform.$invalid">Next</button>'
				        +'</div>'
				    +'</div>'
				    +'<div class="step-content" ng-transclude>'
				    +'</div>'
				+'</form>',
		scope: {
			settings: '=?'
		},
		transclude: true,
		priority: 2000,
		compile: function compile(cElement, cAttrs, transclude) {
			console.log('Parent compile')
			// console.log(cElement[0].outerHTML)
			return {
				pre: function preLink($scope, element, attrs) {
					console.log('parent preLink')
					// console.log(element[0].outerHTML)

				},
				post: function postLink($scope, element, attrs) {
					// $compile(element.contents(), transclude)($scope);
					console.log('parent postlink')
					// console.log(element[0].outerHTML)
				}
			}
		},
		controller: ['$scope', '$element',
			function($scope, $element) {

				//default settings
				if(!$scope.settings){
					$scope.settings = {
						currentStep : 1,
						formName : 'steps'
					};
				}

				//number of steps
				$scope.steps = [];

				this.addStep = function(step) {
					$scope.steps.push(step);
					if ($scope.steps.length === 1) {
						$scope.goToStep($scope.steps[0]);
					}

					return $scope.steps.length;
				};

				this.getSettings = function() {
					return $scope.settings;
				};

				$scope.goToStep = function(stepNum, canSet) {
					console.log('click click');
					console.log(stepNum);
					canSet = typeof canSet != undefined? canSet : true;
					if (stepNum !== $scope.settings.currentStep 
						&& (stepNum <= $scope.steps.length && stepNum > 0) 
						&& canSet) {
						$scope.settings.currentStep = stepNum;
					}
				};

				$scope.nextStep = function() {
					if ($scope.settings.currentStep < $scope.steps.length) {
						$scope.settings.currentStep += 1;
						console.log($scope.settings.currentStep)
					}
				};

				$scope.prevStep = function() {
					if ($scope.settings.currentStep > 1) {
						$scope.settings.currentStep -= 1;
					}
				};

			}
		]
	};
});