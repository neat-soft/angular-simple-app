/**
 * Created by mirko on 1.2.16..
 */

(function () {
  'use strict';

  angular.module('skywarriorApp')
    .factory('userUtil', userUtil);

  userUtil.$inject = ['Auth'];

  function userUtil(Auth) {
    return {
      isTradeUrlSet: isTradeUrlSet
    };

    /////////////////////////////////////////////////////////////////

    function isTradeUrlSet() {
      var user = Auth.getCurrentUser();
      return !!(user.trade_url && user.trade_url != '');
    }
  }


})();
