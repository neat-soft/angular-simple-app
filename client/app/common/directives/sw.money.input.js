/**
 * Created by mirko on 8.12.15..
 */
(function () {
  'use strict';
  angular.module('skywarriorApp')
    .directive('swMoneyInput', swMoneyInput);

  swMoneyInput.$inject = ['$filter'];

  function swMoneyInput($filter) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: linkFn
    };

    function linkFn(scope, element, attrs, ngModelCtrl) {
      ngModelCtrl.$formatters.push(function (modelValue) {
        if (modelValue === 0) {
          return Number(modelValue).toString();
        }
        var number = modelValue / 100;
        return $filter('number')(number, 2);
      });

      ngModelCtrl.$parsers.push(function (viewValue) {
        return viewValue * 100;
      });

    }


  }

})();
