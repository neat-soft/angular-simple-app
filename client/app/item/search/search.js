/**
 * Created by mirko on 5.12.15..
 */
(function () {
  'use strict';
  angular.module('skywarriorApp')
    .config(function ($stateProvider) {
      $stateProvider
        .state('search', {
          url: '/search',
          abstract: true,
          templateUrl: 'app/item/search/search.html',
          controller: 'SearchController',
          controllerAs: 'vm'
        })
        .state('search.query', {
          url: '/query?q',
          params: {
            sort: '-created_at',
            status: 'on sale'
          },
          templateUrl: 'app/item/search/search.result.html',
          controller: 'SearchResultController',
          controllerAs: 'vm'
        })
        .state('search.result', {
          parent: 'search',
          url: '/:trigger',
          params: {
            sort: '-created_at',
            status: 'on sale', // default value
            type: null,
            exterior: null,
            weapon: null,
            itemSet: null,
            quality: null,
            priceFrom: null,
            priceTo: null,
            added: null
          },
          templateUrl: 'app/item/search/search.result.html',
          controller: 'SearchResultController',
          controllerAs: 'vm'
        });
    })
})();
