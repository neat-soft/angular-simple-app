(function () {

  'use strict';

  angular.module('skywarriorApp')
    .controller('SettingsCtrl', function ($rootScope, $scope, UserService, Auth, notification, $window) {
      $scope.updateUserInfo = updateUserInfo;
      $scope.isRequestPending = false;
      activate();

      //////////////////////////////////////////////////////////////////////////////////

      function activate() {
        $scope.isRequestPending = true;
        UserService.get().then(function (response) {
          $scope.user = response.data;
          $scope.user.referralLink = $window.location.origin + '/?ref='+$scope.user.referral_code;
          $scope.isRequestPending = false;
        });
      }

      function updateUserInfo() {
        $scope.isRequestPending = true;
        UserService.update($scope.user)
          .success(function (updatedUser) {
            $scope.user = updatedUser;
            Auth.setCurrentUser(updatedUser);
            notification.success('User has been updated');
            $rootScope.$broadcast('user:refreshData');
            $scope.isRequestPending = false;
          })
          .catch(function (error) {
            notification.error('Could not update user. Try again later');
            $scope.isRequestPending = false;
          })
      }


    });
})();
