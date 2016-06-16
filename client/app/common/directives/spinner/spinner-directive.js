(function () {

  'use strict';

  angular.module('skywarriorApp')
    .directive('spinner', function () {
      return {
        transclude: true,
        restrict: 'E',
        replace: true,
        scope: {
          isLoading: '='
        },
        template: '<div><ng-include src="\'assets/images/ripple.svg\'"></ng-include></div>'
      };
    });

})();
