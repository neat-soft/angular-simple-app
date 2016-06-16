/**
 * Created by mirko on 6.10.15..
 */


angular.module('skywarriorApp')
  .directive('validNumber', function () {
    return {
      require: '?ngModel',
      link: function (scope, element, attrs, ngModelCtrl) {
        if (!ngModelCtrl) {
          return;
        }

        ngModelCtrl.$parsers.push(function (val) {
          if (angular.isUndefined(val)) {
            val = '';
          }
          var clean = val.replace(/[^0-9\.]/g, '');
          var decimalCheck = clean.split('.');
          if (!angular.isUndefined(decimalCheck[1])) {
            decimalCheck[1] = decimalCheck[1].slice(0, 2);
            clean = decimalCheck[0] + '.' + decimalCheck[1];
          }
          if (val !== clean) {
            ngModelCtrl.$setViewValue(clean);
            ngModelCtrl.$render();
          }
          return clean;
        });

        element.bind('keypress', function (event) {
          if (event.keyCode === 32) {
            event.preventDefault();
          }
        });
      }
    };
  });
