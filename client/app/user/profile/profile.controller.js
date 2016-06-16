/**
 * Created by Vojkan on 10/19/2015.
 */

(function () {

  'use strict';

  angular.module('skywarriorApp')
    .controller('ProfileCtrl', profileCtrl);

  profileCtrl.$inject = ['$stateParams', 'ItemServiceNew', 'user'];

  function profileCtrl($stateParams, ItemServiceNew, user) {
    var vm = this;
    vm.user = user;

    activate();

    //////////////////////////////////////////////////////////////////////////////////////////

    function activate() {
      ItemServiceNew.get({user_id: $stateParams.id, status: 'on sale'})
        .success(function (items) {
          vm.items = items;
        })
    }

  }


})();
