/**
 * Created by mirko on 16.8.15..
 */

angular.module('skywarriorApp')
  .directive('categoriesMenu', function () {
    return {
      templateUrl: 'components/categories-menu/categories-menu.html',
      restrict: 'E',
      controller: 'CategoriesMenuCtrl',
      controllerAs: 'vm'
    };
  });
