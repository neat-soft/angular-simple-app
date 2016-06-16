/**
 * Created by mirko on 17.8.15..
 */

'use strict';

angular.module('skywarriorApp')
  .factory('PayPal', function ($http, $window) {

    return {
      depositMoney: depositMoney
    };

    /** ------------------------ IMPLEMENTATION -------------------- **/

    function depositMoney(upload) {
      $window.location.href = '/payment/paypal/deposit';
    }


  });
