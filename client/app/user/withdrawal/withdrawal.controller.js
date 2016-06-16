/**
 * Created by Vojkan on 1/31/2016.
 */

(function () {
  'use strict';

  angular.module('skywarriorApp')
    .controller('WithdrawalCtrl', statementCtrl);

  statementCtrl.$inject = ['$rootScope', 'UserService', 'notification', 'Modal'];

  function statementCtrl($rootScope, UserService, notification, Modal) {
    var vm = this;
    vm.editEmail = false;
    vm.makeWithdrawalDisabled = false;
    vm.update = updateUserInfo;
    vm.makeWithdrawal = makeWithdrawal;
    vm.cancelWithdrawal = Modal.confirm.cancel(cancelWithdrawal);
    vm.changeEmail = changeEmail;
    vm.cancelEditEmail = cancelEditEmail;
    vm.isRequestPending = false;

    activate();

    ////////////////////////////////////////////////
    function activate() {
      return UserService.get()
        .then(function (response) {
          return vm.user = response.data;
        })
        .then(function (user) {
          initWithdrawal(user);
        })
        .then(function () {
          return UserService.getPendingWithdrawals()
            .success(function (withdrawals) {
              return vm.pendingWithdrawals = withdrawals;
            })
            .error(function (error) {
              vm.pendingWithdrawals = [];
            })
        })
        .catch(function (error) {
        })
    }

    function makeWithdrawal() {
      vm.isRequestPending = true;
      vm.makeWithdrawalDisabled = true;
      UserService.createWithdrawal(vm.withdrawal)
        .success(function (withdrawal) {
          notification.success('Withdrawal has been created.');
          addToPendingWithdrawals(withdrawal);
          initWithdrawal();
          $rootScope.$broadcast('user:refreshData');
        })
        .error(function (error) {
          notification.error(error.message);
        })
        .finally(function () {
          vm.makeWithdrawalDisabled = false;
          vm.isRequestPending = true;
        })
    }

    function cancelWithdrawal(withdrawalId) {
      vm.isRequestPending = true;
      UserService.cancelWithdrawal(withdrawalId)
        .success(function (response) {
          vm.pendingWithdrawals = vm.pendingWithdrawals.filter(function (withdrawal) {
            return withdrawal._id !== withdrawalId;
          });
          notification.success('Withdrawal has been canceled');
          $rootScope.$broadcast('user:refreshData');
        })
        .error(function (error) {
          notification.error(error);
        })
        .finally(function () {
          vm.isRequestPending = true;
        })
    }

    function initWithdrawal() {
      vm.withdrawal = {
        status: 'pending',
        amount: 0,
        user_id: vm.user.steam_user_id || null,
        withdrawal_email: vm.user.withdrawal_email
      };
    }

    function updateUserInfo() {
      vm.isRequestPending = true;
      vm.user.withdrawal_email = vm.withdrawal_email;
      UserService.update(vm.user)
        .success(function (updatedUser) {
          vm.user = updatedUser;
          vm.withdrawal.withdrawal_email = vm.user.withdrawal_email;
          $rootScope.$broadcast('user:refreshData', updatedUser);
          notification.success('User has been updated');
          cancelEditEmail();
          vm.isRequestPending = false;
        })
        .catch(function (error) {
          notification.error('Could not update user. Try again later');
          vm.isRequestPending = false;
        })
    }

    function addToPendingWithdrawals(withdrawal) {
      if (!vm.pendingWithdrawals) {
        vm.pendingWithdrawals = [];
      }
      vm.pendingWithdrawals.push(withdrawal);
    }

    function changeEmail() {
      vm.edit = true;
      vm.withdrawal_email = angular.copy(vm.user.withdrawal_email);
    }

    function cancelEditEmail() {
      vm.edit = false;
      vm.withdrawal_email = null;
    }



  }

})();
