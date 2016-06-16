/**
 * Created by mirko on 20.8.15..
 */

'use strict';

angular.module('skywarriorApp')
  .controller('DashboardCtrl', function ($scope, $state, $uibModal, ItemServiceNew, Auth, userUtil, notification) {
    $scope.openSellSkinModal = openSellSkinModal;
    $scope.cancelSale = cancelSale;
    $scope.selection = [];
    $scope.toggle = toggle;
    $scope.isDisabled = isDisabled;
    $scope.user = Auth.getCurrentUser();
    $scope.isTradeUrlSet = userUtil.isTradeUrlSet;
    $scope.isRequestPending = false;

    activate();

    $scope.$on('open-sell-modal', function () {
      openSellSkinModal();
    });

    /** ------------------------------------------------------------- **/

    function activate() {
      $scope.isLoading = true;
      $scope.isRequestPending = true;
      return ItemServiceNew.get({user_id: $scope.user.steam_user_id, status: 'on sale'}).then(function (response) {
        $scope.sellingItems = response.data;
      }).finally(function () {
        $scope.isLoading = false;
        $scope.isRequestPending = false;
      })
    }

    function isDisabled() {
      return $scope.selection.length === 0;
    }

    function cancelSale() {
      $scope.isRequestPending = true;
      var selectedItems = _.at($scope.sellingItems, $scope.selection);
      var selectedItemIds = _.map(selectedItems, 'steam_id');
      ItemServiceNew.returnItems(selectedItemIds)
        .then(function (response) {
          notification.success('Item successfully canceled!');
          $state.reload('portfolio').then(function () {
            $scope.isRequestPending = false;
          });
        })
        .catch(function (error) {
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

    function openSellSkinModal() {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/user/dashboard/sell.skin.modal.html',
        controller: 'SellSkinCtrl',
        controllerAs: 'vm',
        bindToController: true,
        size: 'lg'
      });
      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
      });
    }

  });

