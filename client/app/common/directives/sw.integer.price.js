/**
 * Created by mirko on 12.1.16..
 */
(function () {
  angular.module('skywarriorApp')
    .directive('swIntegerPrice', swIntegerPrice);

  swIntegerPrice.$inject = [];

  function swIntegerPrice() {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function (scope, element, attr, ctrl) {

        ctrl.$formatters.push(function (val) {
          if (val) {
            if (val === 0) {
              return 0;
            }
            return parseInt(val / 100);
          }
          return 0;
        });

        ctrl.$parsers.push(function (val) {
          if (val) {
            var digits = val.replace(/[^0-9]/g, '');

            if (digits !== val) {
              ctrl.$setViewValue(digits);
              ctrl.$render();
            }
            return parseInt(digits * 100, 10);
          }
          return 0;
        });

        element.bind('keypress', function (event) {
          if (event.keyCode === 32) {
            event.preventDefault();
          }
        });

      }

    };
  }

})();
