/**
 * Created by mirko on 1.9.15..
 */
(function () {
  'use strict';

  angular.module('skywarriorApp')
    .controller('SellSkinCtrl', sellSkinCtrl);

  sellSkinCtrl.$inject = ['$scope','ItemServiceNew', 'UserService', 'notification', '$uibModalInstance'];

  function sellSkinCtrl($scope, ItemServiceNew, UserService, notification) {
    var vm = this;
    vm.selectedIndex = 0;
    vm.selectItem = selectItem;
    vm.placeItem = placeItem;
    vm.calculateAmount = calculateAmount;

    activate();

    /**************************** IMPLEMENTATION *******************************/

    function activate() {
      vm.isInventoryLoading = true;
      vm.isItemLoading = true;
      vm.isRequestPending = true;
      return getUserInventory()
        .then(selectFirstItemFromInventory())
        .then(function (item) {
          ItemServiceNew.getItemPrice(item.market_hash_name).success(function (price) {
            _.assign(vm.selectedItem, {steam_price: price, user_price: price});
            //  vm.userReceivedAmount = vm.selectedItem.user_price - (vm.selectedItem.user_price * 0.1); VRATI FEE
            vm.userReceivedAmount = vm.selectedItem.user_price;
          }).finally(function () {
            vm.isItemLoading = false;
            vm.isRequestPending = false;
          });
        });
    }


    function getUserInventory() {
      return UserService.getSteamInventory().then(function (response) {
        vm.items = response.data;
        return vm.items;
      }).finally(function () {
        vm.isInventoryLoading = false;
      });
    }

    function selectFirstItemFromInventory() {
      return function (items) {
        if (items && !_.isEmpty(items)) {
          vm.selectedItem = items[0];
          return vm.selectedItem;
        }
      }
    }


    function selectItem(_item, index) {
      vm.isItemLoading = true;
      ItemServiceNew.getItemPrice(_item.market_hash_name).success(function (price) {
        _.assign(_item, {steam_price: price, user_price: price});
        vm.selectedItem = _item;
        vm.selectedIndex = index;
        //  vm.userReceivedAmount = vm.selectedItem.user_price - (vm.selectedItem.user_price * 0.1); VRATI FEE
        vm.userReceivedAmount = vm.selectedItem.user_price;
      }).finally(function () {
        vm.isItemLoading = false;
      });
    }

    function calculateAmount() {
      //  vm.userReceivedAmount = vm.selectedItem.user_price - (vm.selectedItem.user_price * 0.1); VRATI FEE
      vm.userReceivedAmount = vm.selectedItem.user_price;
    }

    function placeItem(item) {
      vm.isRequestPending = true;
      UserService.createSellOffer(item)
        .then(function (response) {
          notification.info(response.data.message, '', {tapToDismiss: false, closeButton : true, timeOut: 0, extendedTimeOut: 0});
          return $scope.$close(response);
        })
        .then(function (response) {
        })
        .catch(function (error) {
          notification.error(error.data.message);
        })
        .finally(function () {
          vm.isRequestPending = false;
        })
    }
  }
})();
