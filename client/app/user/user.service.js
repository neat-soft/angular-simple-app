/**
 * Created by mirko on 16.12.15..
 */
(function () {
  'use strict';

  angular.module('skywarriorApp')
    .factory('UserService', userService);

  userService.$inject = ['$http', 'ItemTransformator'];

  function userService($http, ItemTransformator) {

    return {
      get: get,
      getById: getById,
      getSteamInventory: getSteamInventory,
      getLocalInventory: getLocalInventory,
      createSellOffer: createSellOffer,
      createBuyOffer: createBuyOffer,
      update: update,
      statement: statement,
      getPendingWithdrawals: getPendingWithdrawals,
      createWithdrawal: createWithdrawal,
      deleteWithdrawal: deleteWithdrawal,
      cancelWithdrawal: cancelWithdrawal
    };

    //////////////////////////////////////////////////////////////////////

    function get() {
      return $http.get('/api/users/me');
    }

    function getById(id) {
      return $http.get('/api/users/' + id);
    }

    function getSteamInventory() {
      return $http.get('/api/users/inventory/steam').then(function (response) {
        ItemTransformator.transform(response.data);
        return response;
      });
    }

    function getLocalInventory() {
      return $http.get('/api/users/inventory/local')
    }

    function createSellOffer(item) {
      return $http.post('/api/users/steam/buyOffer', item);
    }

    function createBuyOffer(item) {
      return $http.post('/api/users/steam/sellOffer', item);
    }

    function update(user) {
      return $http.post('/api/users/' + user.steam_user_id, user);
    }

    function statement() {
      return $http.get('/api/statements/');
    }

    function getPendingWithdrawals() {
      return $http.get('/api/withdrawals');
    }

    function createWithdrawal(withdrawal) {
      return $http.post('/api/withdrawals/', withdrawal);
    }

    function cancelWithdrawal(withdrawalId) {
      return $http.post('/api/withdrawals/cancel', {id: withdrawalId});
    }


    function deleteWithdrawal(withdrawalId) {
      return $http.delete('/api/withdrawals/' + withdrawalId);
    }

  }

})();
