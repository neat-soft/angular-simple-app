'use strict';

angular.module('skywarriorApp')
  .controller('MainCtrl', function ($rootScope, $scope, swCart, User, ItemServiceNew, countObject) {
    $scope.countObject = countObject;
    $scope.itemsOnSale = [];

    $scope.itemsByLabel = 'By Price';
    $scope.findItemsByPrice = findItemsByPrice;
    $scope.findItemsByDate = findItemsByDate;
    $scope.loadMore = loadMore;

    var FETCH_LIMIT_SIZE = 10;
    var startPosition = 0;

    /**************************** IMPLEMENTATION *******************************/

    function loadMore(params) {
      if ($scope.countObject.count >= startPosition) {
        $scope.isLoading = true;
        params = _.merge({sort: '-user_price', status: 'on sale', limit: FETCH_LIMIT_SIZE, skip: startPosition}, params);
        ItemServiceNew.get(params)
          .then(function (items) {
            $scope.itemsOnSale = $scope.itemsOnSale.concat(items.data);

          })
          .catch(function (error) {
          })
          .finally(function(){
            $scope.isLoading = false;
          });

        startPosition += FETCH_LIMIT_SIZE;
      }
    }

    function refreshAndLoad(params) {
      startPosition = 0;
      $scope.itemsOnSale = [];
      loadMore(params);
    }

    function findItemsByPrice() {
      $scope.itemsByLabel = 'By Price';
      refreshAndLoad({sort: '-user_price'});
    }

    function findItemsByDate() {
      $scope.itemsByLabel = 'By Date';
      refreshAndLoad({sort: '-created_at'});
    }

  });
