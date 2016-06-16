/**
 * Created by mirko on 6.12.15..
 */
(function () {

  'use strict';

  angular.module('skywarriorApp')
    .controller('SearchResultController', searchResultController);

  searchResultController.$inject = ['$stateParams', 'ItemServiceNew'];

  function searchResultController($stateParams, ItemServiceNew) {
    var vm = this;

    activate();

    //////////////////////////////////////////
    function activate() {
      vm.isLoading = true;
      dontMixTypeParamsWithOther();
      return ItemServiceNew.get($stateParams)
        .then(function (response) {
          vm.items = response.data;
          vm.isLoading = false;
          return vm.items;
        })
        .catch(function (error) {
          vm.items = [];
          vm.isLoading = false;
          return vm.items;
        });
    }

    function dontMixTypeParamsWithOther() {
      if ($stateParams.weapon || $stateParams.itemSet || $stateParams.exterior || $stateParams.quality || $stateParams.q) {
        resetType();
      }
    }

    function resetType() {
      $stateParams.type = null;
    }
  }

})();
