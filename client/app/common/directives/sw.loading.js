/**
 * Created by mirko on 5.1.16..
 */
/*(function () {
  'use strict';

  angular.module('skywarriorApp').
    directive('loader', loader);

  loader.$inject = ['$http'];

  function loader($http) {
    return {
      restrict: 'C',
      link: function (scope, element) {
        scope.isLoading = function () {
          return $http.pendingRequests.length > 0;
        };
        scope.$watch(scope.isLoading, function (value) {
          if (value) {
            element.removeClass('ng-hide');
          } else {
            element.addClass('ng-hide');
          }
        });
      }
    };
  }
})();*/
