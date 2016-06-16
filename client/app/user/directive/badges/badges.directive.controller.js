/**
 * Created by mirko on 7.2.16..
 */

(function () {
  'use strict';

  angular.module('skywarriorApp')
    .controller('BadgesDirectiveCtrl', badgesDirectiveCtrl);

  badgesDirectiveCtrl.$inject = [];

  function badgesDirectiveCtrl() {
    var vm = this;

    var now = moment();
    var created_at = moment(vm.user.created_at);
    vm.daysSinceRegistration = now.diff(created_at, 'days');

    //////////////////////////////////////////////////
  }

})();
