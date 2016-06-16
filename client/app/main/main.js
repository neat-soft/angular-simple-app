'use strict';

angular.module('skywarriorApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        resolve: {
          countObject: function (ItemServiceNew) {
            return ItemServiceNew.count();
          }
        }
      })
      .state('privacy', {
        url:'/privacy',
        templateUrl: 'app/main/privacy.html'
      })
      .state('howItWorks', {
        url:'/how-it-works',
        templateUrl: 'app/main/how_it_works.html'
      })
      .state('terms', {
        url:'/terms',
        templateUrl: 'app/main/terms.html'
      })
  });
