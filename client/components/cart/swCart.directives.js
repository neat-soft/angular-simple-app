/**
 * Created by mirko on 23.9.15..
 */

'use strict';


angular.module('swCart.directives', ['swCart.fulfilment'])

  .directive('swCartAddtocart', ['swCart', function (swCart) {
    return {
      restrict: 'E',
      controller: 'CartController',
      scope: {
        id: '@',
        name: '@',
        quantity: '@',
        quantityMax: '@',
        price: '@',
        data: '=',
        customClass: '@'
      },
      transclude: true,
      templateUrl: function (element, attrs) {
        if (typeof attrs.templateUrl == 'undefined') {
          return 'components/cart/template/addtocart.html';
        } else {
          return attrs.templateUrl;
        }
      },
      link: function (scope, element, attrs) {
        scope.attrs = attrs;
        scope.isDisabled = false;
        scope.inCart = function () {
          return swCart.getItemById(attrs.id);
        };

        scope.addItemToCart = function (id, name, price, q, data) {
          scope.isDisabled = true;
          swCart.addItem(id, name, price, q, data).finally(function () {
            scope.isDisabled = false;
          })
        };

        if (scope.inCart()) {
          scope.q = swCart.getItemById(attrs.id).getQuantity();
        } else {
          scope.q = parseInt(scope.quantity);
        }

        scope.qtyOpt = [];
        for (var i = 1; i <= scope.quantityMax; i++) {
          scope.qtyOpt.push(i);
        }


      }

    };
  }])

  .directive('swCart', [function () {
    return {
      restrict: 'E',
      controller: 'CartController',
      scope: {},
      templateUrl: function (element, attrs) {
        if (typeof attrs.templateUrl == 'undefined') {
          return 'components/cart/template/cart.html';
        } else {
          return attrs.templateUrl;
        }
      },
      link: function (scope, element, attrs) {

      }
    };
  }])

  .directive('swCartSummary', [function () {
    return {
      restrict: 'E',
      controller: 'CartController',
      scope: {},
      transclude: true,
      templateUrl: function (element, attrs) {
        if (typeof attrs.templateUrl == 'undefined') {
          return 'components/cart/template/summary.html';
        } else {
          return attrs.templateUrl;
        }
      }
    };
  }])

  .directive('swCartCheckout', [function () {
    return {
      restrict: 'E',
      controller: ('CartController', ['$rootScope', '$scope', 'swCart', 'fulfilmentProvider', '$state', 'notification', function ($rootScope, $scope, swCart, fulfilmentProvider, $state, notification) {
        $scope.swCart = swCart;

        $scope.checkout = function () {
          fulfilmentProvider.setService($scope.service);
          fulfilmentProvider.setSettings($scope.settings);
          fulfilmentProvider.checkout()
            .success(function (data, status, headers, config) {
              if (data && data.code === 4000) {
                notification.warning('<a href="/upload">Click here to deposit money</a>', data.message);
                return;
              }
              swCart.empty();
              notification.success('You have successfully bought items');
              $state.go('inventory');
            })
            .error(function (data, status, headers, config) {
              if (status === 4000) {
                $state.go('deposit');
              }
            });
        }
      }]),
      scope: {
        service: '@',
        settings: '='
      },
      transclude: true,
      templateUrl: function (element, attrs) {
        if (typeof attrs.templateUrl == 'undefined') {
          return 'components/cart/template/checkout.html';
        } else {
          return attrs.templateUrl;
        }
      }
    };
  }]);
