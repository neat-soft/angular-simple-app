/**
 * Created by mirko on 26.9.15..
 */

'use strict';

angular.module('skywarriorApp')
  .factory('authInterceptor', function ($rootScope, $q, $cookies, $injector) {
    var state;
    var notification = $injector.get('notification');

    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookies.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookies.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to main
      responseError: function (response) {
        if (response.status === 401) {
          (state || (state = $injector.get('$state'))).go('main');
          // reset user
          var Auth = $injector.get('Auth');
          Auth.setCurrentUser({});
          // remove any stale tokens
          $cookies.remove('token');
          return $q.reject(response);
        }

        if (response.status === 418) {
          notification.error('You are banned!');
        }
        return $q.reject(response);
      }
    };
  });
