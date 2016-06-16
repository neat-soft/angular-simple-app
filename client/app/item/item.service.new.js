/**
 * Created by mirko on 4.12.15..
 */
(function () {
  'use strict';
  angular.module('skywarriorApp')
    .factory('ItemServiceNew', itemService);

  itemService.$inject = ['$http'];

  function itemService($http) {
    return {
      get: get,
      getById: getById,
      getItemPrice: getItemPrice,
      update: update,
      putOnSale: putOnSale,
      returnItems: returnItems,
      count: count
    };

    function get(params) {
      return $http.get('/api/items', params ? {params: params} : null);
    }

    function getById(itemId) {
      return $http.get('/api/items/' + itemId);
    }

    function getItemPrice(itemMarketHashName) {
      return $http.get('/api/items/' + itemMarketHashName + '/price');
    }

    function update(item) {
      return $http.put('/api/items/' + item.steam_id, item);
    }

    function putOnSale(itemId) {
      return $http.put('/api/items', {status: 'on sale'}, {params: {id: itemId}});
    }

    function returnItems(itemIds) {
      return $http.put('/api/items', {status: 'returned'}, {params: {id: itemIds}});
    }

    function count() {
      return $http.get('/api/items/count/items').then(function (response) {
        return response.data;
      });
    }


  }


})();
