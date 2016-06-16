'use strict';

angular.module('skywarriorApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('portfolio', {
        url: '/dashboard',
        templateUrl: 'app/user/dashboard/dashboard.html',
        controller: 'DashboardCtrl',
        authenticate: true
      })
      .state('inventory', {
        url: '/inventory',
        templateUrl: 'app/user/inventory/inventory.html',
        controller: 'InventoryCtrl',
        resolve: {
          items: function (UserService) {
            return UserService.getLocalInventory().then(function (response) {
              return response.data;
            })
          }
        }
      })
      .state('profile', {
        url: '/profile/{id}',
        templateUrl: 'app/user/profile/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'vm',
        resolve: {
          user: function (UserService, $stateParams) {
            return UserService.getById($stateParams.id)
              .then(function (response) {
                return response.data;
              });
          }
        }
      })
      .state('statement', {
        url: '/statement',
        templateUrl: 'app/user/statement/statement.html',
        controller: 'StatementCtrl',
        controllerAs: 'vm',
        authenticate: true
      })
      .state('withdrawals', {
        url: '/withdrawal',
        templateUrl: 'app/user/withdrawal/withdrawals.html',
        controller: 'WithdrawalCtrl',
        controllerAs: 'vm',
        authenticate: true
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/user/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      })
      .state('logout', {
        url: '/logout?referrer',
        referrer: 'main',
        template: '',
        controller: function ($state, Auth) {
          var referrer = $state.params.referrer ||
            $state.current.referrer ||
            'main';
          Auth.logout();
          $state.go(referrer);
        }
      });
  })
  .run(function ($rootScope) {
    $rootScope.$on('$stateChangeStart', function (event, next, nextParams, current) {
      if (next.name === 'logout' && current && current.name && !current.authenticate) {
        next.referrer = current.name;
      }
    });
  });
