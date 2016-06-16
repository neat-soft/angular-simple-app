'use strict';

angular.module('skywarriorApp')
  .controller('NavbarCtrl', function ($rootScope, $scope, $state, Auth, $window, $location, swCart, UserService, userUtil) {
    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.user = Auth.getCurrentUser();
    $scope.isTradeUrlSet = userUtil.isTradeUrlSet;
    $scope.swCart = swCart;
    $scope.authenticate = authenticate;
    $scope.sellASkinClickAction = sellASkinClickAction;

    ////////////////////////////////////////////////////

    function sellASkinClickAction() {
      if (Auth.isLoggedIn()) {
        return $state.go('portfolio').then(function () {
          $scope.$broadcast('open-sell-modal');
        });
      }
      authenticate();
    }

    $rootScope.$on('swCart:expired', function () {
    });

    $rootScope.$on('user:refreshData', function () {
      return UserService.get().success(function (user) {
        Auth.setCurrentUser(user);
        return $scope.user = user;
      })
    });

    function authenticate() {
      $window.location.href = '/auth/steam';
    }

  });
