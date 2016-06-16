/**
 * Created by mirko on 21.9.15..
 */

'use strict';

angular.module('skywarriorApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('item', {
        url: '/item/:id',
        controller: 'ItemCtrl',
        templateUrl: 'app/item/item.html',
        resolve: {
          item: function (ItemServiceNew, $stateParams) {
            return ItemServiceNew.getById($stateParams.id)
              .then(function (response) {
                return response.data;
              })
              .catch(function (error) {
              })
          }
        }
      });
  });
