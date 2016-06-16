/**
 * Created by mirko on 17.8.15..
 */
'use strict';

angular.module('skywarriorApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('payment', {
        abstract: true,
        url: '/payment'
      })
      .state('deposit', {
        url: '/upload',
        templateUrl: 'app/payment/deposit.money.html',
        controller: 'DepositMoneyCtrl'
      })
  });
