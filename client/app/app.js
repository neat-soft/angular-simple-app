'use strict';

var myApp = angular.module('skywarriorApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngAnimate',
  'skywarrior.notification',
  'ui.router',
  'ui.bootstrap',
  'swCart',
  'angular-loading-bar',
  'infinite-scroll',
  'timer',
  'updateMeta'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $compileProvider) {
    $urlRouterProvider
      .otherwise('/');

    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|mailto|steam):/);

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
    $httpProvider.interceptors.push('errorInterceptor');
    $httpProvider.useApplyAsync(true);
  })

  .run(function ($rootScope, Auth, $cookies, notification, $window) {
    handleCookies($cookies, notification);
    redirectToMainIfNotLoggedIn($rootScope, Auth, $window);
  });


/**
 * Redirect to login if route requires auth and the user is not logged in
 * @param $rootScope
 * @param Auth
 * @param $state
 */
function redirectToMainIfNotLoggedIn($rootScope, Auth, $window) {
  $rootScope.$on('$stateChangeStart', function (event, next) {
    if (next.authenticate) {
      if (!Auth.isLoggedIn()) {
        event.preventDefault();
        $window.location.href = '/auth/steam';
      }
    }
  });
}

function handleCookies($cookies, notification) {
  var message = $cookies.get('message');
  if (message) {
    notification.warning(message);
  }
  var error = $cookies.get('error');
  if (error) {
    notification.error(error);
  }
}
