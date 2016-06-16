/**
 * Created by mirko on 4.12.15..
 */
(function () {
  'use strict';
  angular.module('skywarriorApp')
    .factory('util', util);

  util.$inject = ['$q', '$http'];

  function util($q, $http) {
    return {
      $q: $q,
      $http: $http
    };

  }

})();
