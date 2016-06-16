/**
 * Created by mirko on 22.1.16..
 */
(function () {
  'use strict';
  angular.module('skywarriorApp')
    .directive('swItem', itemDirective);

  itemDirective.$inject = [];

  function itemDirective() {
    return {
      restrict: 'E',
      scope: {
        item : '='
      },
      templateUrl: 'app/item/directive/item.directive.html',
      controller: 'ItemDirectiveCtrl',
      controllerAs: 'vm',
      bindToController: true
    }
  }

})();
