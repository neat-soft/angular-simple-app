/**
 * Created by mirko on 17.8.15..
 */

'use strict';

angular.module('skywarriorApp')
  .controller('DepositMoneyCtrl', function ($scope, Auth, $http, $window, notification) {

    var uploadValues = [{value: 10}, {value: 15}, {value: 20}, {value: 25}, {value: 30}, {value: 50}, {value: 60}, {value: 70}, {value: 80}, {value: 90}, {value: 100}, {value: 150}, {value: 200}, {value: 350}, {value: 500}];

    $scope.user = Auth.getCurrentUser();
    $scope.token = Auth.getToken();
    $scope.uploadValues = uploadValues;
    $scope.selectedValue = 0;
    $scope.select = selectValue;
    $scope.makeDeposit = makeDeposit;
    $scope.selectedAmount = uploadValues[$scope.selectedValue].value;
    $scope.isRequestPending = false;

    /**  ----------------------------------------------------------------------- **/
    function makeDeposit() {
      if (!$scope.selectedAmount) {
        return;
      }
      $scope.isRequestPending = true;
      $http.post('/payment/paypal/deposit', {amount: $scope.selectedAmount})
        .success(function (response) {
          $window.location.href = response.approval_url;
        })
        .catch(function (response) {
          // if user wants to upload money but account is not verified
          notification.error(response.data.message, 'Upload failed', {
            tapToDismiss: false,
            closeButton: true,
            timeOut: 0,
            extendedTimeOut: 0
          });
        })
        .finally(function () {
          $scope.isRequestPending = false;
        })
    }

    function selectValue(index) {
      $scope.selectedValue = index;
      $scope.selectedAmount = uploadValues[$scope.selectedValue].value;
    }

  });

