/**
 * Created by mirko on 14.11.15..
 */
(function () {
  'use strict';

  angular.module('skywarriorApp')
    .filter('swMoney', function ($filter) {
      var currency = $filter('currency');
      return function (amount) {
        amount = amount / 100;
        return currency(amount, '$', 2);
      }
    });
})();
