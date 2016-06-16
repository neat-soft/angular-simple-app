/**
 * Created by mirko on 7.1.16..
 */

(function () {
  'use strict';

  angular.module('skywarriorApp')
    .filter('to_trusted', ['$sce', function ($sce) {
      return function (text) {
        return $sce.trustAsHtml(text);
      };
    }]);
})();
