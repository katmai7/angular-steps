'use strict';

function stepsButtonDirective(action) {
    angular.module('vig-angular-steps')
        .directive(action, function() {
            return {
                restrict: 'A',
                replace: false,
                require: '^steps',
                link: function($scope, $element, $attrs, steps) {
                    $element.on("click", function(e) {
                        e.preventDefault();
                        $scope.$apply(function() {
                            $scope.$eval($attrs[action]);
                            steps[action.replace("steps", "").toLowerCase()]();
                        });
                    });
                }
            };
        });
};

stepsButtonDirective('stepsNext');
stepsButtonDirective('stepsPrevious');