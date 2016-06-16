/**
 * Created by mirko on 19.1.16..
 */
(function () {
  'use strict';

  angular.module('skywarrior.notification', [])
    .config(configure)
    .factory('notification', notificationFactory);

  notificationFactory.$inject = [];

  function notificationFactory() {
    return {
      success: function (message, title, overrideOptions) {
        title = title || 'Success';
        toastr.success(message, title, overrideOptions)
      },

      error: function (message, title, overrideOptions) {
        title = title || 'Error';
        toastr.error(message, title, overrideOptions)
      },

      info: function (message, title, overrideOptions) {
        title = title || 'Info';
        toastr.info(message, title, overrideOptions)

      },

      warning: function (message, title, overrideOptions) {
        title = title || 'Warning';
        toastr.warning(message, title, overrideOptions)
      }

    }
  }

  function configure() {
    toastr.options = {
      closeButton: false,
      debug: false,
      newestOnTop: false,
      progressBar: false,
      positionClass: 'toast-bottom-right',
      preventDuplicates: false,
      onclick: null,
      showDuration: '300',
      hideDuration: '1000',
      timeOut: '5000',
      extendedTimeOut: '1000',
      showEasing: 'swing',
      hideEasing: 'linear',
      showMethod: 'fadeIn',
      hideMethod: 'fadeOut'
    }
  }

})();
