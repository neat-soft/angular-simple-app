/**
 * Created by mirko on 26.9.15..
 */
(function () {
  'use strict';

  angular.module('skywarriorApp')
    .factory('errorInterceptor', function ($q, $rootScope, notification) {
      return {
        responseError: function (response) {
          // FIXME create some kind of message service
          if (response.status >= 500) {
            $rootScope.$broadcast('message.error', response);
            notification.error(response.data.error || response.data.message || 'Something went wrong, if you encounter this problem again, please send us email with details', 'Oh this is embarrassing.');
          }
          return $q.reject(response);
        }
      };
    });

})();
