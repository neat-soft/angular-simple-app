/**
 * Created by mirko on 25.10.15..
 */

'use strict';

angular.module('skywarriorApp')
  .controller('InventoryCtrl', function ($scope, $state, items, ItemServiceNew, UserService, notification, userUtil) {
    $scope.items = items;
    $scope.putOnSale = putOnSale;
    $scope.requestTrade = requestTrade;
    $scope.isTradeUrlSet = userUtil.isTradeUrlSet;
    $scope.toggle = toggle;
    $scope.updateItem = updateItem;

    $scope.selectItem = selectItem;
    $scope.selectedItem = null;
    $scope.index = null;

    $scope.isDisabled = isDisabled;


    function isDisabled() {
      return !$scope.selectedItem;
    }

    function selectItem(selectedItem, $index) {
      if ($scope.index === $index) {
        $scope.selectedItem = null;
        $scope.index = null;
        return;
      }
      $scope.selectedItem = selectedItem;
      $scope.index = $index;
    }

    function updateItem(item) {
      ItemServiceNew.update(item).then(function (response) {
        $state.reload();
      })
    }

    function toggle(idx) {
      var pos = $scope.selection.indexOf(idx);
      if (pos == -1) {
        $scope.selection.push(idx);
      } else {
        $scope.selection.splice(pos, 1);
      }
    }


    function putOnSale() {
      $scope.isRequestPending = true;
      if (!$scope.selectedItem) {
        return;
      }
      ItemServiceNew.putOnSale($scope.selectedItem.steam_id)
        .then(function (response) {
          notification.success('Item put on sale');
          $state.reload('inventory').then(function () {
            $scope.isRequestPending = false;
          });
        })
        .catch(function (error) {
          notification.error(error);
          $scope.isRequestPending = false;
        })
    }

    function requestTrade() {
      $scope.isRequestPending = true;
      if (!$scope.selectedItem) {
        return;
      }
      UserService.createBuyOffer($scope.selectedItem)
        .then(function (response) {
          notification.info(response.data.message);
          $state.reload('inventory').then(function () {
            $scope.isRequestPending = false;
          });
        })
        .catch(function (error) {
          notification.error(error);
          $scope.isRequestPending = false;
        });
    }


  });
