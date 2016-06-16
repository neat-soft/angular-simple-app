/**
 * Created by mirko on 28.9.15..
 */
'use strict';

(function (angular, $) {
  return angular.module('swNoty', []).provider('Noty', function () {
    var settings = $.noty.defaults;

    return {
      settings: settings,
      $get: function () {
        var callNoty = function (newSettings) {
          return noty(newSettings || {});
        };

        return {
          show: function (message, type) {
            callNoty({text: message || settings.text, type: type || settings.type});
          },

          showAlert: function (message) {
            callNoty({text: message || settings.text, type: "alert"});
          },

          showSuccess: function (message) {
            callNoty({text: message || settings.text, type: "success"});
          },

          showError: function (message) {
            callNoty({text: message, type: "error"});
          },

          closeAll: function () {
            return $.noty.closeAll()
          },
          clearShowQueue: function () {
            return $.noty.clearQueue();
          }.bind(this)
        }
      }

    };
  })
}(angular, jQuery));
