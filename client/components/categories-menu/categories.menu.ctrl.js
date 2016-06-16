/**
 * Created by mirko on 25.7.15..
 */
(function () {
  'use strict';

  angular.module('skywarriorApp')
    .controller('CategoriesMenuCtrl', categoriesMenuCtrl);

  categoriesMenuCtrl.$inject = ['$state'];

  function categoriesMenuCtrl($state) {
    var vm = this;
    vm.searchItem = searchItem;

    ////////////////////////////////////////////////////////////////

    function searchItem() {
      $state.go('search.query', {q: vm.search, status: 'on sale'}).then(function () {
        vm.search = '';
      });
    }
  }

})();
