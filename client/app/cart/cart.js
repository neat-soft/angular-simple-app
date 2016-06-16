/**
 * Created by mirko on 22.9.15..
 */
'use strict';

angular.module('skywarriorApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('cart', {
        url: '/checkout',
        templateUrl: 'app/cart/cart.html',
        controller: 'CartController',
        authenticate: true
      });
  });
