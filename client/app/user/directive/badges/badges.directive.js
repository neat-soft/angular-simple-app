/**
 * Created by mirko on 7.2.16..
 */

(function () {
  'use strict';
  angular.module('skywarriorApp')
    .directive('swBadges', itemDirective);

  itemDirective.$inject = [];

  function itemDirective() {
    return {
      restrict: 'E',
      scope: {
        user : '='
      },
      templateUrl: 'app/user/directive/badges/badges.template.html',
      controller: 'BadgesDirectiveCtrl',
      controllerAs: 'vm',
      bindToController: true
    }
  }

})();
