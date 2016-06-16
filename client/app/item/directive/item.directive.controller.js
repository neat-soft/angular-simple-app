/**
 * Created by mirko on 22.1.16..
 */

(function () {
  'use strict';

  angular.module('skywarriorApp')
    .controller('ItemDirectiveCtrl', itemDirectiveCtrl);

  itemDirectiveCtrl.$inject = ['ItemSharedService', 'Auth'];

  function itemDirectiveCtrl(ItemSharedService, Auth) {
    var vm = this;
    vm.isOwner = ItemSharedService.isOwner;
    vm.isLoggedIn = Auth.isLoggedIn();

    //////////////////////////////////////////////////


  }

})();
